// Runs before `vite` / `vite build` (npm predev / prebuild).
//
// 1. Photos: every image under content/photos/ becomes two WebP files in public/media/
//    (a large one for full view and a thumbnail), plus its size in src/generated/media.json.
//    Unchanged photos are skipped, so repeat runs are fast.
// 2. Display font: GenRyuMin is subset to only the characters used by headings in
//    content/*.yaml, turning a 16 MB font into a small WebFont.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'
import { load as parseYaml } from 'js-yaml'
import subsetFont from 'subset-font'
import heicConvert from 'heic-convert'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const CONTENT = path.join(ROOT, 'content')
const PHOTOS = path.join(CONTENT, 'photos')
const MEDIA = path.join(ROOT, 'public', 'media')
const GENERATED = path.join(ROOT, 'src', 'generated')
const FONT_SRC = path.join(ROOT, 'fonts-src', 'GenRyuMin2TW-R.otf')

const IMAGE_EXT = /\.(jpe?g|png|webp|heic|heif|tiff?)$/i
const LARGE = 2000
const THUMB = 720

const walk = (dir) => fs.existsSync(dir)
  ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
      const p = path.join(dir, e.name)
      return e.isDirectory() ? walk(p) : [p]
    })
  : []

const rel = (p) => path.relative(PHOTOS, p).split(path.sep).join('/')
const mediaBase = (photo) => photo.replace(IMAGE_EXT, '')

async function loadPipeline(file) {
  const pipeline = sharp(file, { failOn: 'none' }).rotate()
  try {
    // Force a decode now so HEIC files sharp cannot read fall through to heic-convert.
    await pipeline.clone().resize(8).toBuffer()
    return pipeline
  } catch (err) {
    if (!/\.hei[cf]$/i.test(file)) throw err
    const jpeg = await heicConvert({ buffer: fs.readFileSync(file), format: 'JPEG', quality: 0.92 })
    return sharp(Buffer.from(jpeg)).rotate()
  }
}

async function buildPhotos() {
  const files = walk(PHOTOS).filter(f => IMAGE_EXT.test(f))
  const manifestPath = path.join(GENERATED, 'media.json')
  const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {}
  const manifest = {}
  let built = 0

  for (const file of files) {
    const key = rel(file)
    const base = path.join(MEDIA, mediaBase(key))
    const largeOut = `${base}.webp`
    const thumbOut = `${base}.thumb.webp`
    const srcTime = fs.statSync(file).mtimeMs
    const fresh = previous[key]
      && fs.existsSync(largeOut) && fs.existsSync(thumbOut)
      && fs.statSync(largeOut).mtimeMs >= srcTime

    if (fresh) {
      manifest[key] = previous[key]
      continue
    }

    fs.mkdirSync(path.dirname(base), { recursive: true })
    const pipeline = await loadPipeline(file)
    const large = await pipeline.clone()
      .resize({ width: LARGE, height: LARGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(largeOut)
    await pipeline.clone()
      .resize({ width: THUMB, height: THUMB, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(thumbOut)
    manifest[key] = { w: large.width, h: large.height }
    built++
  }

  // Remove converted files whose source photo was deleted or renamed.
  const expected = new Set(Object.keys(manifest).flatMap(key => {
    const base = path.join(MEDIA, mediaBase(key))
    return [`${base}.webp`, `${base}.thumb.webp`]
  }))
  for (const out of walk(MEDIA)) {
    if (!out.startsWith(path.join(MEDIA, 'fonts')) && !expected.has(out)) fs.rmSync(out)
  }

  fs.mkdirSync(GENERATED, { recursive: true })
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`[assets] photos: ${files.length} found, ${built} converted`)
  return manifest
}

function loadContent() {
  return walk(CONTENT)
    .filter(f => /\.ya?ml$/.test(f))
    .map(f => ({ file: path.relative(ROOT, f), data: parseYaml(fs.readFileSync(f, 'utf8')) }))
}

function collectStrings(node, visit, key = '') {
  if (typeof node === 'string') visit(node, key)
  else if (Array.isArray(node)) node.forEach(n => collectStrings(n, visit, key))
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      // Locale maps ({ zh, en, ja }) inherit the key of the field that holds them.
      collectStrings(v, visit, ['zh', 'en', 'ja'].includes(k) ? key : k)
    }
  }
}

// A YAML photo path that has no file behind it would ship as a broken image,
// so stop the build and say which file to fix.
function checkPhotoRefs(contents, manifest) {
  const missing = []
  for (const { file, data } of contents) {
    collectStrings(data, (s) => {
      if (IMAGE_EXT.test(s) && !manifest[s]) missing.push(`${file}: ${s}`)
    })
  }
  if (missing.length) {
    console.error('[assets] These photos are listed in content but not found in content/photos/:')
    missing.forEach(m => console.error(`  - ${m}`))
    process.exit(1)
  }
}

// Fields rendered in the display face. Keep in sync with `.display` usage in the CSS.
const DISPLAY_KEYS = new Set(['title', 'name', 'heading', 'quote', 'tagline', 'brand', 'lines', 'value'])

async function buildFont(contents) {
  if (!fs.existsSync(FONT_SRC)) {
    console.warn('[assets] fonts-src/GenRyuMin2TW-R.otf missing; headings fall back to Noto Serif TC')
    return
  }
  const chars = new Set('0123456789・、。，！？「」『』（）〜—–-·｜/ ')
  for (const { file, data } of contents) {
    // Interface text (menus, labels) is short, so all of ui.yaml goes into the subset.
    const everything = file.endsWith('ui.yaml')
    collectStrings(data, (s, key) => {
      if (everything || DISPLAY_KEYS.has(key)) for (const ch of s) chars.add(ch)
    })
  }
  const text = [...chars].sort().join('')
  const hash = crypto.createHash('sha1').update(text).digest('hex').slice(0, 10)
  const outDir = path.join(MEDIA, 'fonts')
  const out = path.join(outDir, 'display.woff2')
  const stamp = path.join(outDir, 'display.hash')
  if (fs.existsSync(out) && fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8') === hash) {
    console.log('[assets] display font: unchanged')
    return
  }
  const subset = await subsetFont(fs.readFileSync(FONT_SRC), text, { targetFormat: 'woff2' })
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(out, subset)
  fs.writeFileSync(stamp, hash)
  console.log(`[assets] display font: ${chars.size} glyphs, ${(subset.length / 1024).toFixed(0)} KB`)
}

const manifest = await buildPhotos()
const contents = loadContent()
checkPhotoRefs(contents, manifest)
await buildFont(contents)
