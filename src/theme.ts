import { useSyncExternalStore } from 'react'

const storageKey = 'pc-remote-theme'
type Theme = 'light' | 'dark'

function preference(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch { return null }
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0f141c' : '#f8fafc')
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const update = () => {
    apply(preference() ?? (media.matches ? 'dark' : 'light'))
    onChange()
  }
  const storage = (event: StorageEvent) => { if (event.key === storageKey || event.key === null) update() }
  window.addEventListener('pc-remote-theme-change', onChange)
  window.addEventListener('storage', storage)
  media.addEventListener('change', update)
  return () => {
    window.removeEventListener('pc-remote-theme-change', onChange)
    window.removeEventListener('storage', storage)
    media.removeEventListener('change', update)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark', () => 'dark')
  return {
    theme,
    toggle() {
      const next = theme === 'dark' ? 'light' : 'dark'
      apply(next)
      try { localStorage.setItem(storageKey, next) } catch { /* Theme still works for this visit. */ }
      window.dispatchEvent(new Event('pc-remote-theme-change'))
    },
  }
}
