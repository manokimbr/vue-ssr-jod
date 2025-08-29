// Node 22 ESM
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.resolve(ROOT, 'jod/memory')
const OUT_FILE = path.resolve(OUT_DIR, 'structure.json')

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', '.cache', '.vercel', '.render', '.idea'])
const IGNORE_FILES = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'])

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const result = []
  for (const e of entries) {
    if (IGNORE_DIRS.has(e.name)) continue
    if (e.isDirectory()) {
      result.push({
        name: e.name,
        type: 'dir',
        children: await walk(path.join(dir, e.name)),
      })
    } else {
      if (IGNORE_FILES.has(e.name)) continue
      const full = path.join(dir, e.name)
      const stat = await fs.stat(full)
      result.push({
        name: e.name,
        type: 'file',
        size: stat.size,
        mtime: stat.mtime.toISOString(),
        rel: path.relative(ROOT, full)
      })
    }
  }
  // ordena por diretórios primeiro, depois nome
  result.sort((a,b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'dir' ? -1 : 1))
  return result
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const tree = await walk(ROOT)
  const summary = {
    project: path.basename(ROOT),
    generatedAt: new Date().toISOString(),
    root: tree,
  }
  await fs.writeFile(OUT_FILE, JSON.stringify(summary, null, 2), 'utf8')
  console.log(`🧠 SSR Awareness saved → ${path.relative(ROOT, OUT_FILE)}`)
}

main().catch(err => {
  console.error('Awareness error:', err)
  process.exit(1)
})
