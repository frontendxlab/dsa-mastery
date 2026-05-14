import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public', 'data')
fs.mkdirSync(publicDir, { recursive: true })

const skipDirs = new Set([
  'node_modules', 'public', 'src', 'dist', '.git', '.vscode',
  '.repowise', '.playwright-mcp', '.rtk', '.claude', 'docs',
  'scripts', 'references', 'components', '.tanstack',
])

const topics = fs.readdirSync(root).filter(
  (d) => {
    try {
      return fs.statSync(path.join(root, d)).isDirectory() && !skipDirs.has(d)
    } catch { return false }
  },
)

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

const index = []
let totalProcessed = 0

for (const topic of topics) {
  const dir = path.join(root, topic)
  let csvFile
  try {
    csvFile = fs.readdirSync(dir).find((f) => f.startsWith('all_') && f.endsWith('_problems.csv'))
  } catch { continue }
  if (!csvFile) continue

  const raw = fs.readFileSync(path.join(dir, csvFile), 'utf-8')
  const lines = raw.trim().split('\n').filter(Boolean)
  if (lines.length < 2) continue

  const dataLines = lines.slice(1)
  const problems = dataLines.map((line) => {
    const cols = parseCSVLine(line)
    return {
      platform: cols[0] ?? '',
      name: cols[2] ?? '',
      url: cols[3] ?? '',
      difficulty: cols[4] ?? '',
      keyConcept: cols[5] ?? '',
    }
  })

  const platforms = [...new Set(problems.map((p) => p.platform).filter(Boolean))]
  const difficulties = {}
  for (const p of problems) {
    const d = p.difficulty || 'N/A'
    difficulties[d] = (difficulties[d] || 0) + 1
  }

  const output = { total: problems.length, platforms, difficulties, problems }
  fs.writeFileSync(path.join(publicDir, `${topic}.json`), JSON.stringify(output), 'utf-8')

  index.push({
    slug: topic,
    total: problems.length,
    platforms: platforms.length,
  })

  totalProcessed += problems.length
  console.log(`  ${topic}: ${problems.length} problems -> public/data/${topic}.json`)
}

fs.writeFileSync(path.join(publicDir, 'index.json'), JSON.stringify(index), 'utf-8')
console.log(`\nDone. ${totalProcessed} problems across ${index.length} topics.`)
