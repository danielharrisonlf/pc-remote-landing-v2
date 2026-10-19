import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const targetFile = join(__dirname, '../src/data/releases.json')

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function detectPlatform(repo, tag, name, assets) {
  if (repo === 'android') return 'android'
  const hasDeb = assets.some(a => a.name.endsWith('.deb') || a.name.includes('ubuntu'))
  const hasExe = assets.some(a => a.name.endsWith('.exe'))
  if (hasDeb && !hasExe) return 'linux'
  if (hasExe && !hasDeb) return 'windows'
  return 'desktop'
}

async function sync() {
  console.log('Fetching releases from GitHub API...')
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'pc-remote-landing-sync'
  }

  const [deskRes, andRes] = await Promise.all([
    fetch('https://api.github.com/repos/danielharrisonlf/pc-remote-desktop/releases?per_page=100', { headers }),
    fetch('https://api.github.com/repos/danielharrisonlf/pc-remote-android/releases?per_page=100', { headers })
  ])

  if (!deskRes.ok || !andRes.ok) {
    throw new Error(`GitHub API error: desktop=${deskRes.status}, android=${andRes.status}`)
  }

  const desk = await deskRes.json()
  const and = await andRes.json()

  const all = []

  for (const r of desk) {
    const assets = (r.assets || []).map(a => ({
      name: a.name,
      size: a.size,
      sizeFormatted: formatBytes(a.size),
      downloadUrl: a.browser_download_url
    }))

    all.push({
      id: 'desktop-' + r.id,
      repo: 'desktop',
      platform: detectPlatform('desktop', r.tag_name, r.name, assets),
      tag: r.tag_name,
      name: r.name || r.tag_name,
      publishedAt: r.published_at,
      prerelease: Boolean(r.prerelease),
      htmlUrl: r.html_url,
      body: r.body || '',
      assets
    })
  }

  for (const r of and) {
    const assets = (r.assets || []).map(a => ({
      name: a.name,
      size: a.size,
      sizeFormatted: formatBytes(a.size),
      downloadUrl: a.browser_download_url
    }))

    all.push({
      id: 'android-' + r.id,
      repo: 'android',
      platform: 'android',
      tag: r.tag_name,
      name: r.name || r.tag_name,
      publishedAt: r.published_at,
      prerelease: Boolean(r.prerelease),
      htmlUrl: r.html_url,
      body: r.body || '',
      assets
    })
  }

  all.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  await mkdir(dirname(targetFile), { recursive: true })
  await writeFile(targetFile, JSON.stringify(all, null, 2), 'utf8')
  console.log(`Saved ${all.length} releases to ${targetFile}`)
}

sync().catch(err => {
  console.error('Failed to sync releases:', err)
  process.exit(1)
})
