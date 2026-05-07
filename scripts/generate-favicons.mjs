// Generate favicons from /public/logo.png
// Crops the leftmost square (the GS droplet mark) and emits:
//   src/app/icon.png         (32x32 — Next.js auto links it)
//   src/app/apple-icon.png   (180x180 — Apple touch icon)
//   src/app/icon.svg         (skipped, png is fine)
//   public/favicon-16.png, favicon-32.png, favicon-192.png, favicon-512.png
// Then writes a multi-size favicon.ico into src/app/favicon.ico via png-to-ico.

import sharp from 'sharp'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const logo = path.join(root, 'public', 'logo.png')

const meta = await sharp(logo).metadata()
console.log(`Source logo: ${meta.width}x${meta.height}`)

// The GS droplet icon occupies roughly the left ~23% of the wide logo (1751x434).
// Crop just the icon (no text), into a tight square, then resize for each favicon size.
const iconWidth = Math.min(meta.height, Math.round(meta.width * 0.235))
const iconHeight = meta.height
const cropLeft = 0
const cropTop = 0

// Pre-crop the icon into a square buffer (with transparent padding to make it square)
const baseSquareSize = Math.max(iconWidth, iconHeight)
const xOffset = Math.round((baseSquareSize - iconWidth) / 2)
const yOffset = Math.round((baseSquareSize - iconHeight) / 2)

const iconRect = await sharp(logo)
  .extract({ left: cropLeft, top: cropTop, width: iconWidth, height: iconHeight })
  .toBuffer()

const iconSquare = await sharp({
  create: {
    width: baseSquareSize,
    height: baseSquareSize,
    channels: 4,
    background: { r: 255, g: 255, b: 255, alpha: 0 },
  },
})
  .composite([{ input: iconRect, top: yOffset, left: xOffset }])
  .png()
  .toBuffer()

async function makeSquareIcon(size) {
  // Resize the pre-built square icon and add a small transparent margin so
  // the mark doesn't touch the favicon edge.
  const padding = Math.max(1, Math.round(size * 0.06))
  const inner = size - padding * 2
  const resized = await sharp(iconSquare)
    .resize(inner, inner, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer()
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    },
  })
    .composite([{ input: resized, top: padding, left: padding }])
    .png()
    .toBuffer()
}

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true })
}

const appDir = path.join(root, 'src', 'app')
const publicDir = path.join(root, 'public')
await ensureDir(appDir)
await ensureDir(publicDir)

// Next.js auto-detected icons in app/
await writeFile(path.join(appDir, 'icon.png'), await makeSquareIcon(512))
await writeFile(path.join(appDir, 'apple-icon.png'), await makeSquareIcon(180))

// Public favicons (extra coverage)
await writeFile(path.join(publicDir, 'favicon-16.png'), await makeSquareIcon(16))
await writeFile(path.join(publicDir, 'favicon-32.png'), await makeSquareIcon(32))
await writeFile(path.join(publicDir, 'favicon-192.png'), await makeSquareIcon(192))
await writeFile(path.join(publicDir, 'favicon-512.png'), await makeSquareIcon(512))

// Build multi-size .ico (16, 32, 48) for legacy browsers
let icoBuffer
try {
  const pngToIco = (await import('png-to-ico')).default
  const sizes = await Promise.all([16, 32, 48].map(makeSquareIcon))
  icoBuffer = await pngToIco(sizes)
} catch (e) {
  console.warn('png-to-ico not installed, skipping .ico generation. Install with: npm i -D png-to-ico')
}
if (icoBuffer) {
  await writeFile(path.join(appDir, 'favicon.ico'), icoBuffer)
  await writeFile(path.join(publicDir, 'favicon.ico'), icoBuffer)
  console.log('✔ Wrote favicon.ico (16/32/48 multi-size)')
}

console.log('✔ Wrote src/app/icon.png (512)')
console.log('✔ Wrote src/app/apple-icon.png (180)')
console.log('✔ Wrote public/favicon-{16,32,192,512}.png')
console.log('Done.')
