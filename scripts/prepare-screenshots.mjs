import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// Real app captures from existing release QA. No generated app interfaces.
const root = resolve('..', 'artifacts', 'qa')
const output = resolve('public', 'screenshots')
await mkdir(output, { recursive: true })
// Phone captures: Android 0.6.6-kotlin on a 1080 × 2400 (20:9) emulator, paired with the
// real Windows app; the status bar uses Android demo mode (fixed clock and full signal).
const images = [
  ['media', '0.6.6-landing/media-playing.png', 720],
  ['touchpad', '0.6.6-landing/touchpad.png', 720],
  ['deck', '0.6.6-landing/deck.png', 720],
  ['slides', '0.6.6-landing/slides.png', 720],
  ['numpad', '0.6.6-landing/numpad.png', 720],
  ['transfer', '0.6.6-landing/transfer-clipboard.png', 720],
  ['power', '0.6.6-landing/connection-power.png', 720],
  ['desktop', '0.6.1-e2e/06-pc-overview-scheduled.png', 1260],
  ['security', '0.6.1-e2e/10-pc-interromper.png', 1000],
]
const manifest = []
for (const [name, source, width] of images) {
  const result = await sharp(resolve(root, source)).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(resolve(output, `${name}.webp`))
  manifest.push({ name, source: `../artifacts/qa/${source}`, width: result.width, height: result.height, bytes: result.size })
}
await writeFile(resolve(output, 'sources.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(manifest)
