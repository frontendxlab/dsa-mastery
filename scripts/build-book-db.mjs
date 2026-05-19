// scripts/build-book-db.mjs
// Run with: node --experimental-strip-types scripts/build-book-db.mjs
//
// Reads book data (metadata + problems) from TypeScript sources,
// builds data/book_problems.db, public/data/books/{slug}.json, public/data/books/{slug}.csv

import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const root = path.resolve(__dirname, '..')

// ── Import book data from TypeScript ─────────────────────────────────────
let BOOKS
try {
  const mod = await import('../src/data/books.ts')
  BOOKS = mod.BOOKS
} catch (e) {
  console.error('Failed to import books.ts – did you use --experimental-strip-types?')
  console.error(e)
  process.exit(1)
}

// ── Load core problems DB for cross-referencing ──────────────────────────
const coreDbPath = path.join(root, 'data', 'problems.db')
const coreDbExists = fs.existsSync(coreDbPath)
let coreDb = null
let coreIndex = new Map() // url -> { name, platform }

if (coreDbExists) {
  coreDb = new DatabaseSync(coreDbPath)
  const rows = coreDb.prepare('SELECT url, name, platform FROM problems').all()
  for (const r of rows) {
    coreIndex.set(r.url, { name: r.name, platform: r.platform })
  }
  console.log(`  Core DB: ${coreIndex.size} problems loaded for cross-referencing`)
}

// ── Fuzzy title matcher ─────────────────────────────────────
function normalizeForMatch(s) {
  return s.toLowerCase()
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ').trim()
}

function tokenize(s) {
  return s.split(/\s+/).filter(t => t.length > 2)
}

function buildMatchIndex(coreIndex) {
  const titleIndex = new Map()
  const tokenIndex = new Map()
  for (const [url, { name, platform }] of coreIndex) {
    const norm = normalizeForMatch(name)
    titleIndex.set(norm, { url, name, platform })
    const tokens = tokenize(norm)
    for (const token of tokens) {
      if (!tokenIndex.has(token)) tokenIndex.set(token, [])
      tokenIndex.get(token).push({ url, name, platform, norm })
    }
  }
  return { titleIndex, tokenIndex }
}

function fuzzyMatchBookProblem(problemTitle, titleIndex, tokenIndex, coreIndex) {
  const norm = normalizeForMatch(problemTitle)

  if (titleIndex.has(norm)) return titleIndex.get(norm)

  const tokens = tokenize(norm)
  if (tokens.length === 0) return null

  const candidates = new Map()
  for (const token of tokens) {
    const matches = tokenIndex.get(token) || []
    for (const m of matches) {
      if (!candidates.has(m.url)) {
        candidates.set(m.url, { ...m, count: 0, total: tokens.length })
      }
      candidates.get(m.url).count++
    }
  }

  let best = null
  let bestScore = 0
  for (const [, c] of candidates) {
    const score = c.count / c.total
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }

  if (best && bestScore >= 0.5) return { url: best.url, name: best.name, platform: best.platform }

  const numMatch = problemTitle.match(/(\d{3,})/)
  if (numMatch) {
    const num = numMatch[1]
    for (const [url, { name, platform }] of coreIndex) {
      if (name.startsWith(num + '.') || name.startsWith(num + ')')) {
        return { url, name, platform }
      }
    }
  }

  return null
}

let matchIndex = null
if (coreIndex.size > 0) {
  matchIndex = buildMatchIndex(coreIndex)
  console.log(`  Match index built: ${matchIndex.titleIndex.size} unique titles, ${matchIndex.tokenIndex.size} unique tokens`)
}

// ── Load curated problem matches ───────────────────────────
const curatedMatchesPath = path.join(root, 'src', 'data', 'book_matches.json')
let curatedMatches = []
if (fs.existsSync(curatedMatchesPath)) {
  try {
    curatedMatches = JSON.parse(fs.readFileSync(curatedMatchesPath, 'utf-8'))
    console.log(`  Curated matches loaded: ${curatedMatches.length}`)
  } catch (e) {
    console.error(`  Failed to load curated matches: ${e.message}`)
  }
}
const curatedByBook = new Map() // book -> Map<problem_id -> match>
for (const m of curatedMatches) {
  if (!curatedByBook.has(m.book)) curatedByBook.set(m.book, new Map())
  curatedByBook.get(m.book).set(m.problem_id, m)
}

// ── Helpers ──────────────────────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function csvEscape(val) {
  if (val == null) return ''
  const s = String(val)
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

// ── Build parameters ────────────────────────────────────────────────────
const dbDir = path.join(root, 'data')
const publicBooksDir = path.join(root, 'public', 'data', 'books')
ensureDir(dbDir)
ensureDir(publicBooksDir)

const dbPath = path.join(dbDir, 'book_problems.db')
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath)
const db = new DatabaseSync(dbPath)

// ── Schema ──────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE book_problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_slug TEXT NOT NULL,
    chapter_num TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    chapter_page INTEGER,
    chapter_summary TEXT,
    problem_id TEXT NOT NULL,
    title TEXT NOT NULL,
    page INTEGER,
    difficulty TEXT,
    hint TEXT,
    tags TEXT DEFAULT '[]',
    lc_num INTEGER,
    platform TEXT,
    url TEXT,
    match_url TEXT,
    match_title TEXT,
    match_platform TEXT,
    problem_type TEXT DEFAULT 'exercise',
    UNIQUE(book_slug, problem_id)
  )
`)
db.exec('CREATE INDEX idx_bp_book_slug ON book_problems(book_slug)')
db.exec('CREATE INDEX idx_bp_difficulty ON book_problems(difficulty)')
db.exec('CREATE INDEX idx_bp_match_url ON book_problems(match_url)')

const insertProblem = db.prepare(`
  INSERT INTO book_problems
    (book_slug, chapter_num, chapter_title, chapter_page, chapter_summary,
     problem_id, title, page, difficulty, hint, tags,
     lc_num, platform, url, match_url, match_title, match_platform, problem_type)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

let totalProblems = 0
let totalMatched = 0
const perBookOutput = {}

// ── Process each book ────────────────────────────────────────────────────
for (const book of BOOKS) {
  const slug = book.slug
  const chapters = book.chapters || []
  let bookProblemCount = 0
  let bookMatched = 0

  const insertBatch = []
  for (const ch of chapters) {
    const problems = ch.problems || []
    for (const p of problems) {
      // Cross-reference with core DB
      let matchUrl = p.matchUrl || null
      let matchTitle = p.matchTitle || null
      let matchPlatform = p.matchPlatform || null

      if (!matchUrl && p.url && coreIndex.has(p.url)) {
        matchUrl = p.url
        matchTitle = coreIndex.get(p.url).name
        matchPlatform = coreIndex.get(p.url).platform
      }
      if (!matchUrl && p.lcNum) {
        const lcUrl = `https://leetcode.com/problems/?search=${p.lcNum}`
        if (coreIndex.has(lcUrl)) {
          matchUrl = lcUrl
          matchTitle = coreIndex.get(lcUrl).name
          matchPlatform = 'LeetCode'
        } else {
          matchUrl = lcUrl
          matchPlatform = 'LeetCode'
        }
      }

      if (!matchUrl && matchIndex) {
        const fuzzy = fuzzyMatchBookProblem(p.title, matchIndex.titleIndex, matchIndex.tokenIndex, coreIndex)
        if (fuzzy) {
          matchUrl = fuzzy.url
          matchTitle = fuzzy.name
          matchPlatform = fuzzy.platform
        }
      }

      if (!matchUrl && curatedByBook.has(slug) && curatedByBook.get(slug).has(p.id)) {
        const curated = curatedByBook.get(slug).get(p.id)
        matchUrl = curated.matchUrl
        matchTitle = curated.matchTitle || null
        matchPlatform = curated.matchPlatform || null
      }

      if (matchUrl) bookMatched++

      insertBatch.push([
        slug,
        String(ch.num),
        ch.title,
        ch.page || null,
        ch.summary || null,
        p.id,
        p.title,
        p.page || null,
        p.difficulty || null,
        p.hint || null,
        JSON.stringify(p.tags || []),
        p.lcNum || null,
        p.platform || matchPlatform || null,
        p.url || (matchUrl !== (p.url || null) ? matchUrl : null) || null,
        matchUrl,
        matchTitle,
        matchPlatform,
        'exercise',
      ])
      bookProblemCount++
    }
  }

  // Batch insert
  db.exec('BEGIN TRANSACTION')
  for (const row of insertBatch) {
    insertProblem.run(...row)
  }
  db.exec('COMMIT')

  totalProblems += bookProblemCount
  totalMatched += bookMatched

  // Build the structured output for this book (same format as before)
  const outputChapters = []
  for (const ch of chapters) {
    const chProblems = (ch.problems || []).map(p => {
      const entry = {
        id: p.id,
        title: p.title,
        type: 'exercise',
      }
      if (p.page) entry.page = p.page
      if (p.difficulty) entry.difficulty = p.difficulty
      if (p.tags && p.tags.length) entry.tags = p.tags
      if (p.hint) entry.hint = p.hint
      if (p.url) entry.url = p.url
      if (p.lcNum) entry.lcNum = p.lcNum

      // Add match info if cross-referenced
      const rowIndex = insertBatch.findIndex(r =>
        r[0] === slug && r[5] === p.id
      )
      if (rowIndex !== -1) {
        const row = insertBatch[rowIndex]
        const mUrl = row[13] // match_url
        const mTitle = row[14] // match_title
        const mPlatform = row[15] // match_platform
        if (mUrl && mUrl !== p.url) entry.matchUrl = mUrl
        if (mTitle) entry.matchTitle = mTitle
        if (mPlatform && mPlatform !== p.platform) entry.matchPlatform = mPlatform
      }

      return entry
    })

    outputChapters.push({
      num: ch.num,
      title: ch.title,
      page: ch.page,
      problems: chProblems,
    })
  }

  perBookOutput[slug] = {
    slug: book.slug,
    title: book.title,
    shortTitle: book.shortTitle,
    author: book.author,
    edition: book.edition,
    year: book.year,
    color: book.color,
    accentColor: book.accentColor,
    description: book.description,
    coverUrl: book.coverUrl,
    tags: book.tags,
    totalProblems: book.totalProblems,
    chapters: outputChapters,
    totalExtracted: bookProblemCount,
    matchedToDb: bookMatched,
  }
}

// ── Write per-book JSON ─────────────────────────────────────────────────
for (const [slug, output] of Object.entries(perBookOutput)) {
  const jsonPath = path.join(publicBooksDir, `${slug}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2), 'utf-8')
}

// ── Write per-book CSV ──────────────────────────────────────────────────
for (const [slug, output] of Object.entries(perBookOutput)) {
  const csvPath = path.join(publicBooksDir, `${slug}.csv`)
  const header = ['Problem ID', 'Title', 'Chapter', 'Page', 'Difficulty', 'Tags', 'Hint', 'Platform', 'URL', 'Match URL', 'Match Title', 'Match Platform', 'LC #']
  const rows = []
  for (const ch of output.chapters) {
    for (const p of ch.problems) {
      rows.push([
        p.id,
        p.title,
        ch.title,
        p.page ?? '',
        p.difficulty ?? '',
        (p.tags || []).join('; '),
        p.hint ?? '',
        p.platform ?? '',
        p.url ?? '',
        p.matchUrl ?? '',
        p.matchTitle ?? '',
        p.matchPlatform ?? '',
        p.lcNum ?? '',
      ].map(csvEscape).join(','))
    }
  }
  const csvContent = header.map(csvEscape).join(',') + '\n' + rows.join('\n')
  fs.writeFileSync(csvPath, csvContent, 'utf-8')
}

// ── Cleanup ─────────────────────────────────────────────────────────────
db.close()
if (coreDb) coreDb.close()

// ── Summary ─────────────────────────────────────────────────────────────
console.log()
console.log('── Build Book DB Summary ──────────────────────────────────────')
console.log(`  Books processed:     ${BOOKS.length}`)
for (const b of BOOKS) {
  const o = perBookOutput[b.slug]
  console.log(`    ${b.slug}: ${o.totalExtracted} problems, ${o.matchedToDb} matched to core DB`)
}
console.log(`  Total problems:     ${totalProblems}`)
console.log(`  Matched to core DB: ${totalMatched}`)
console.log(`  DB:                 data/book_problems.db`)
console.log(`  JSON files:         public/data/books/ (${Object.keys(perBookOutput).length} files)`)
console.log(`  CSV files:          public/data/books/ (${Object.keys(perBookOutput).length} files)`)
console.log('───────────────────────────────────────────────────────────────')
