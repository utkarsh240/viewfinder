import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const root = process.cwd()
const inputDir = path.join(root, 'public', 'portfolio')
const sizes = [640, 1024, 1600]

/**
 * Return output filename given an input file, width, and extension.
 */
function buildOutputPath(filePath, width, newExt) {
  const dir = path.dirname(filePath)
  const ext = path.extname(filePath)
  const base = path.basename(filePath, ext)
  return path.join(dir, `${base}-w${width}${newExt}`)
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function optimizeOne(file) {
  const inPath = path.join(inputDir, file)
  const stat = await fs.stat(inPath)
  if (!stat.isFile()) return

  const ext = path.extname(file).toLowerCase()
  // skip already-generated responsive files (they contain -w{width})
  if (/-w\d+/i.test(file)) return
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return

  const input = sharp(inPath)
  const metadata = await input.metadata()

  for (const width of sizes) {
    const targetWidth = Math.min(width, metadata.width || width)
    // webp
    const outWebp = buildOutputPath(inPath, targetWidth, '.webp')
    if (!(await fileExists(outWebp))) {
      await sharp(inPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outWebp)
      console.log('created', path.basename(outWebp))
    }
    // jpg
    const outJpg = buildOutputPath(inPath, targetWidth, '.jpg')
    if (!(await fileExists(outJpg))) {
      await sharp(inPath)
        .resize({ width: targetWidth, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(outJpg)
      console.log('created', path.basename(outJpg))
    }
  }
}

async function main() {
  await fs.mkdir(inputDir, { recursive: true })
  const files = await fs.readdir(inputDir)
  for (const file of files) {
    try {
      await optimizeOne(file)
    } catch (err) {
      console.error('Failed to optimize', file, err?.message)
    }
  }

  // create manifest containing only original/source images (exclude generated -w variants)
  try {
    const all = await fs.readdir(inputDir)
    const originals = []
    for (const f of all) {
      const ext = path.extname(f).toLowerCase()
      if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue
      if (/-w\d+/i.test(f)) continue
      const p = path.join(inputDir, f)
      const s = await fs.stat(p)
      if (s.isFile()) originals.push(f)
    }
    const manifestPath = path.join(root, 'public', 'portfolio.json')
    await fs.writeFile(manifestPath, JSON.stringify(originals, null, 2), 'utf8')
    console.log('Wrote image manifest to', manifestPath)
  } catch (err) {
    console.error('Failed to write portfolio manifest', err?.message)
  }

  console.log('Image optimization complete')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


