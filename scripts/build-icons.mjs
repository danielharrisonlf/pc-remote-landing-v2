import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

// Raster fallbacks for browsers and home screens that ignore the SVG favicon.
// The SVG's dark-scheme block is dropped so every PNG uses the light tile.
const svg = (await readFile(new URL('../public/brand/symbol.svg', import.meta.url), 'utf8'))
  .replace(/@media \(prefers-color-scheme: dark\) \{[\s\S]*?\}\s*\}/, '')
// iOS applies its own corner mask, so the touch icon gets a square, full-bleed tile.
const square = svg.replace('x="1" y="1" width="106" height="106" rx="25" stroke-width="2"', 'x="0" y="0" width="108" height="108" stroke-width="0"')

const outputs = [
  ['favicon-32.png', 32, svg],
  ['apple-touch-icon.png', 180, square],
  ['icon-192.png', 192, svg],
  ['icon-512.png', 512, svg],
]
for (const [name, size, source] of outputs) {
  const png = await sharp(Buffer.from(source), { density: 72 * size / 108 * 4 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()
  await writeFile(new URL(`../public/brand/${name}`, import.meta.url), png)
  console.log(`${name} ${size}px ${png.length} bytes`)
}
