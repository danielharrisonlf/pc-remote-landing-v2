import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

// Real app captures from existing release QA. No generated app interfaces.
const root = resolve('..', 'artifacts', 'qa')
const output = resolve('public', 'screenshots')
await mkdir(output, { recursive: true })
const images = [
  ['media', '0.6-e2e/r5-player-card.png', 640],
  ['touchpad', '0.6-e2e/r7-released.png', 640],
  ['files', '0.6-e2e/r3-upload-progress.png', 640],
  ['clipboard', '0.6.1-e2e/61-release-image-from-pc.png', 640],
  ['power', '0.6.1-e2e/05-power-scheduled-phone.png', 640],
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
