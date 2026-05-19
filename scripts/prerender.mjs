import { spawn } from 'child_process'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distClient = join(root, 'dist', 'client')
const serverEntry = join(root, 'dist', 'server', 'index.js')

if (!existsSync(serverEntry)) {
  console.error('Server entry not found at', serverEntry)
  process.exit(1)
}

const ROUTES = [
  '/', '/explore', '/learn', '/pattern', '/patterns', '/books', '/about',
  '/books/ctci', '/books/cp4', '/books/cph', '/books/ai', '/books/clrs', '/books/hd',
  '/books/dsamadeasy', '/books/grokking', '/books/progchal', '/books/math4cs',
  '/books/setslogic', '/books/algodaily', '/books/guidetocp', '/books/gamam',
  '/books/progintervexp', '/books/advdsalgo',
]

console.log('Starting server...')
const server = spawn('node', [serverEntry], {
  cwd: root,
  stdio: 'pipe',
  env: { ...process.env, PORT: '4173', NITRO_PORT: '4173', NODE_ENV: 'production' },
})

let serverLog = ''
server.stdout.on('data', d => serverLog += d.toString())
server.stderr.on('data', d => serverLog += d.toString())

// Wait for server to be ready
const BASE = 'http://localhost:4173'
let ready = false
for (let i = 0; i < 40; i++) {
  try {
    const r = await fetch(BASE)
    if (r.ok || r.status === 404 || r.status === 500) {
      ready = true
      break
    }
  } catch {
    await new Promise(r => setTimeout(r, 500))
  }
}

if (!ready) {
  console.error('Server failed to start. Output:')
  console.error(serverLog)
  server.kill()
  process.exit(1)
}

console.log('Server ready!')
console.log('Server log:', serverLog.slice(-500))

let success = 0
let failed = 0

for (const route of ROUTES) {
  try {
    const res = await fetch(`${BASE}${route}`)
    const html = await res.text()

    let filePath = route === '/' ? '/index.html' : `${route.replace(/\/$/, '')}/index.html`
    const fullPath = join(distClient, filePath)
    mkdirSync(dirname(fullPath), { recursive: true })
    writeFileSync(fullPath, html, 'utf-8')
    console.log(`  ✓ ${route} (${res.status}, ${(html.length / 1024).toFixed(0)}KB)`)
    success++
  } catch (e) {
    console.error(`  ✗ ${route}: ${e.message}`)
    failed++
  }
}

server.kill()
console.log(`\nDone: ${success} pages, ${failed} failed`)
