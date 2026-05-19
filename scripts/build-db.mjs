import { DatabaseSync } from 'node:sqlite'
import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public', 'data')
fs.mkdirSync(publicDir, { recursive: true })
fs.mkdirSync(path.join(root, 'data'), { recursive: true })

const skipDirs = new Set([
  'node_modules', 'public', 'src', 'dist', '.git', '.vscode',
  '.repowise', '.playwright-mcp', '.rtk', '.claude', 'docs',
  'scripts', 'references', 'components', '.tanstack', 'tests',
  'test-results', '.planning', '.agents', '.cursor', '.wrangler',
  'books', 'user-data', 'dist',
])

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { inQuotes = !inQuotes; continue }
    if (ch === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''))
      current = ''
      continue
    }
    current += ch
  }
  result.push(current.trim().replace(/^"|"$/g, ''))
  return result
}

function normalizeURL(url) {
  if (!url) return ''
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '').toLowerCase()
    const pathname = u.pathname.replace(/\/+$/, '')
    return `${u.protocol}//${host}${pathname}`
  } catch {
    return url.replace(/\/+$/, '').toLowerCase().trim()
  }
}

function parseDifficulty(text) {
  const t = (text || 'N/A').trim()
  const n = parseInt(t, 10)
  if (!isNaN(n)) {
    if (n >= 800) return { text: t, rating: n }
    if (n >= 1 && n <= 5) return { text: t, rating: null }
    return { text: t, rating: n }
  }
  return { text: t, rating: null }
}

// ─── Scan all directories for CSV files ──────────────────────────────────────

const dirs = fs.readdirSync(root).filter(d => {
  try { return fs.statSync(path.join(root, d)).isDirectory() && !skipDirs.has(d) }
  catch { return false }
})

const csvFiles = []
for (const dir of dirs) {
  const dirPath = path.join(root, dir)
  try {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv'))
    for (const file of files) {
      csvFiles.push({ topic: dir, file, path: path.join(dirPath, file) })
    }
  } catch { /* skip unreadable dirs */ }
}

csvFiles.sort((a, b) => a.path.localeCompare(b.path))

// ─── Parse all CSVs, deduplicate by normalized URL ──────────────────────────

const problemMap = new Map()
let totalRows = 0
let totalDeduped = 0
const topicTotals = {}

for (const { topic, file, path: csvPath } of csvFiles) {
  const raw = fs.readFileSync(csvPath, 'utf-8')
  const lines = raw.split('\n').map(l => l.replace(/\r$/, '')).filter(Boolean)
  if (lines.length < 2) continue

  const dataLines = lines.slice(1)
  const topicCount = dataLines.length
  topicTotals[topic] = (topicTotals[topic] || 0) + topicCount
  let topicDeduped = 0

  for (const line of dataLines) {
    const cols = parseCSVLine(line)
    if (cols.length < 4) continue

    const url = (cols[3] || '').trim()
    if (!url) continue
    totalRows++

    const normUrl = normalizeURL(url)
    const platform = (cols[0] || '').trim()
    const name = (cols[2] || '').trim()
    const difficulty = (cols[4] || '').trim()
    const category = (cols[1] || '').trim()
    const keyConcept = (cols[5] || '').trim()
    const chapter = cols.length > 6 ? (cols[6] || '').trim() : null

    if (problemMap.has(normUrl)) {
      totalDeduped++
      topicDeduped++
      const existing = problemMap.get(normUrl)
      if (category && !existing.tags.includes(category)) existing.tags.push(category)
      if (!existing.source_files.includes(file)) existing.source_files.push(file)
      if (keyConcept) {
        const concepts = existing.key_concept.split(/[;,]\s*/).map(s => s.trim()).filter(Boolean)
        const newConceptsSet = new Set(concepts)
        for (const c of keyConcept.split(/[;,]\s*/)) {
          const tc = c.trim()
          if (tc && !newConceptsSet.has(tc)) newConceptsSet.add(tc)
        }
        existing.key_concept = [...newConceptsSet].join(', ')
      }
    } else {
      problemMap.set(normUrl, {
        url: normUrl,
        url_original: url,
        platform,
        name,
        difficulty_text: difficulty,
        difficulty_rating: parseDifficulty(difficulty).rating,
        primary_category: category,
        tags: category ? [category] : [],
        key_concept: keyConcept,
        source_files: [file],
        chapter,
      })
    }
  }
}

// ─── Write SQLite database ───────────────────────────────────────────────────

const dbPath = path.join(root, 'data', 'problems.db')
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath)
const db = new DatabaseSync(dbPath)

db.exec(`
  CREATE TABLE problems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL UNIQUE,
    url_original TEXT NOT NULL DEFAULT '',
    platform TEXT NOT NULL DEFAULT '',
    name TEXT NOT NULL DEFAULT '',
    difficulty_text TEXT NOT NULL DEFAULT '',
    difficulty_rating INTEGER,
    primary_category TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '[]',
    key_concept TEXT NOT NULL DEFAULT '',
    source_files TEXT NOT NULL DEFAULT '[]',
    chapter TEXT
  )
`)
db.exec('CREATE INDEX idx_platform ON problems(platform)')
db.exec('CREATE INDEX idx_primary_category ON problems(primary_category)')
db.exec('CREATE INDEX idx_difficulty_rating ON problems(difficulty_rating)')
db.exec('CREATE INDEX idx_url ON problems(url)')

const insert = db.prepare(`
  INSERT INTO problems (url, url_original, platform, name, difficulty_text, difficulty_rating, primary_category, tags, key_concept, source_files, chapter)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

db.exec('BEGIN TRANSACTION')
for (const p of problemMap.values()) {
  insert.run(
    p.url, p.url_original, p.platform, p.name,
    p.difficulty_text, p.difficulty_rating,
    p.primary_category, JSON.stringify(p.tags),
    p.key_concept, JSON.stringify(p.source_files),
    p.chapter,
  )
}
db.exec('COMMIT')

// ─── Generate JSON files for pages (deduplicated) ───────────────────────────

const allProblems = [...problemMap.values()]

// Group problems by topic (source folder)
const topicProblems = {}
for (const p of problemMap.values()) {
  const topics = [...new Set(p.source_files.map(f => {
    const dir = csvFiles.find(c => c.file === f)?.topic
    return dir || 'miscellaneous'
  }))]
  for (const t of topics) {
    if (!topicProblems[t]) topicProblems[t] = []
    topicProblems[t].push(p)
  }
}

// Write per-topic JSON files
for (const [topic, problems] of Object.entries(topicProblems)) {
  const platforms = [...new Set(problems.map(p => p.platform).filter(Boolean))]
  const difficulties = {}
  for (const p of problems) {
    const d = p.difficulty_text || 'N/A'
    difficulties[d] = (difficulties[d] || 0) + 1
  }
  const output = {
    total: problems.length,
    platforms,
    difficulties,
    problems: problems.map(p => ({
      platform: p.platform,
      name: p.name,
      url: p.url_original || p.url,
      difficulty: p.difficulty_text,
      keyConcept: p.key_concept,
    })),
  }
  fs.writeFileSync(path.join(publicDir, `${topic}.json`), JSON.stringify(output), 'utf-8')
}

// Write all-problems.json for the explore page (deduplicated flat list, single source of truth)
const allPlatforms = [...new Set(allProblems.map(p => p.platform).filter(Boolean))]
const allDifficulties = {}
for (const p of allProblems) {
  const d = p.difficulty_text || 'N/A'
  allDifficulties[d] = (allDifficulties[d] || 0) + 1
}
const allOutput = {
  total: allProblems.length,
  platforms: allPlatforms,
  difficulties: allDifficulties,
  problems: allProblems.map(p => {
    const topicSlugs = [...new Set(p.source_files.map(f => {
      const cf = csvFiles.find(c => c.file === f)
      return cf ? cf.topic : 'miscellaneous'
    }))]
    return {
      id: p.url,
      platform: p.platform,
      name: p.name,
      url: p.url_original || p.url,
      difficulty: p.difficulty_text,
      difficulty_rating: p.difficulty_rating,
      keyConcept: p.key_concept,
      tags: p.tags,
      topic_slug: topicSlugs[0] || 'miscellaneous',
      topic_slugs: topicSlugs,
    }
  }),
}
fs.writeFileSync(path.join(publicDir, 'all-problems.json'), JSON.stringify(allOutput), 'utf-8')

// Write index.json (topic info for the landing page)
const index = Object.entries(topicProblems).map(([slug, problems]) => ({
  slug,
  total: problems.length,
  platforms: [...new Set(problems.map(p => p.platform).filter(Boolean))].length,
}))
index.sort((a, b) => b.total - a.total)
fs.writeFileSync(path.join(publicDir, 'index.json'), JSON.stringify(index), 'utf-8')

// Generate build-time stats for the landing page (deduplicated counts)
const allPlatformsCount = allPlatforms.length
const statsTs = `export const totalProblems = ${allProblems.length}\n`
  + `export const uniquePlatforms = ${allPlatformsCount}\n`
  + `export const totalTopics = ${Object.keys(topicProblems).length}\n`
fs.writeFileSync(path.join(root, 'src', 'data', 'problem-stats.ts'), statsTs, 'utf-8')

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log()
console.log('── Build DB Summary ──────────────────────────────────────────')
console.log(`  CSV files scanned: ${csvFiles.length}`)
console.log(`  Total rows read:   ${totalRows.toLocaleString()}`)
console.log(`  Duplicates removed: ${totalDeduped.toLocaleString()}`)
console.log(`  Unique problems:   ${allProblems.length.toLocaleString()}`)
console.log(`  Topics:            ${Object.keys(topicProblems).length}`)
console.log(`  DB:                data/problems.db`)
console.log(`  JSON files:        public/data/ (${Object.keys(topicProblems).length + 2} files)`)
console.log('───────────────────────────────────────────────────────────────')

db.close()
