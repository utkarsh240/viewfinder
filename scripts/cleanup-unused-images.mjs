import fs from 'fs/promises'
import path from 'path'

const root = process.cwd()
const portfolioDir = path.join(root, 'public', 'portfolio')
const appFile = path.join(root, 'src', 'App.jsx')

function getRootBase(filename) {
  const { name } = path.parse(filename)
  return name.replace(/-w\d+$/i, '')
}

async function loadUsedRoots() {
  const src = await fs.readFile(appFile, 'utf8')
  const arrMatch = src.match(/const\s+imageFiles\s*=\s*\[([\s\S]*?)\]/m)
  if (!arrMatch) return new Set()
  const inner = arrMatch[1]
  const files = []
  const regex = /"([^"]+)"|'([^']+)'/g
  let m
  while ((m = regex.exec(inner)) !== null) {
    const val = (m[1] || m[2])?.trim()
    if (val) files.push(val)
  }
  const roots = files.map((f) => getRootBase(f))
  return new Set(roots)
}

async function cleanup() {
  const usedRoots = await loadUsedRoots()
  const files = await fs.readdir(portfolioDir)
  let removed = 0
  for (const file of files) {
    const rootBase = getRootBase(file)
    if (!usedRoots.has(rootBase)) {
      await fs.unlink(path.join(portfolioDir, file)).catch(() => {})
      removed += 1
      console.log('removed', file)
    }
  }
  console.log(`Cleanup complete. Removed ${removed} files.`)
}

cleanup().catch((e) => {
  console.error(e)
  process.exit(1)
})


