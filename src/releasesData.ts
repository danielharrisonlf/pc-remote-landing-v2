import { useState, useEffect, useCallback } from 'react'
import rawReleases from './data/releases.json'

export interface ReleaseAsset {
  name: string
  size: number
  sizeFormatted: string
  downloadUrl: string
}

export type PlatformType = 'windows' | 'linux' | 'android' | 'desktop'

export interface ReleaseItem {
  id: string
  repo: 'desktop' | 'android'
  platform: PlatformType
  tag: string
  name: string
  publishedAt: string
  prerelease: boolean
  htmlUrl: string
  body: string
  assets: ReleaseAsset[]
}

export const initialReleases: ReleaseItem[] = rawReleases as ReleaseItem[]

function formatBytes(bytes: number) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

function detectPlatform(repo: string, assets: { name: string }[]): PlatformType {
  if (repo === 'android') return 'android'
  const hasDeb = assets.some(a => a.name.endsWith('.deb') || a.name.includes('ubuntu'))
  const hasExe = assets.some(a => a.name.endsWith('.exe'))
  if (hasDeb && !hasExe) return 'linux'
  if (hasExe && !hasDeb) return 'windows'
  return 'desktop'
}

export function formatDatePt(isoDate: string): string {
  try {
    const date = new Date(isoDate)
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  } catch {
    return isoDate.slice(0, 10)
  }
}

export function formatRelativeTime(isoDate: string): string {
  try {
    const diff = Date.now() - new Date(isoDate).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return `há ${Math.max(1, minutes)} min`
    if (hours < 24) return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`
    if (days < 30) return `há ${days} ${days === 1 ? 'dia' : 'dias'}`
    const months = Math.floor(days / 30)
    return `há ${months} ${months === 1 ? 'mês' : 'meses'}`
  } catch {
    return ''
  }
}

export function useReleases() {
  const [releases, setReleases] = useState<ReleaseItem[]>(initialReleases)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncError, setSyncError] = useState<string | null>(null)

  const refreshFromGithub = useCallback(async () => {
    if (typeof window === 'undefined') return
    setIsRefreshing(true)
    setSyncError(null)

    try {
      const headers = { 'Accept': 'application/vnd.github.v3+json' }
      const [deskRes, andRes] = await Promise.all([
        fetch('https://api.github.com/repos/danielharrisonlf/pc-remote-desktop/releases?per_page=100', { headers }),
        fetch('https://api.github.com/repos/danielharrisonlf/pc-remote-android/releases?per_page=100', { headers })
      ])

      if (!deskRes.ok || !andRes.ok) {
        throw new Error(`Limite da API do GitHub atingido ou indisponível (Desktop: ${deskRes.status}, Android: ${andRes.status}). Exibindo histórico em cache.`)
      }

      const desk = await deskRes.json()
      const and = await andRes.json()

      const all: ReleaseItem[] = []

      for (const r of desk) {
        const assets: ReleaseAsset[] = (r.assets || []).map((a: { name: string; size: number; browser_download_url: string }) => ({
          name: a.name,
          size: a.size,
          sizeFormatted: formatBytes(a.size),
          downloadUrl: a.browser_download_url
        }))

        all.push({
          id: 'desktop-' + r.id,
          repo: 'desktop',
          platform: detectPlatform('desktop', assets),
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
        const assets: ReleaseAsset[] = (r.assets || []).map((a: { name: string; size: number; browser_download_url: string }) => ({
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
      setReleases(all)
      setLastSync(new Date())
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao buscar atualizações'
      setSyncError(msg)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    // Only attempt background refresh once after mount if in browser
    const timer = setTimeout(() => {
      refreshFromGithub()
    }, 2500)
    return () => clearTimeout(timer)
  }, [refreshFromGithub])

  return {
    releases,
    isRefreshing,
    lastSync,
    syncError,
    refreshNow: refreshFromGithub
  }
}
