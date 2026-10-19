import { useState, useMemo } from 'react'
import { AndroidLogo } from '@phosphor-icons/react/dist/csr/AndroidLogo'
import { ArrowClockwise } from '@phosphor-icons/react/dist/csr/ArrowClockwise'
import { ArrowLeft } from '@phosphor-icons/react/dist/csr/ArrowLeft'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { CaretDown } from '@phosphor-icons/react/dist/csr/CaretDown'
import { CaretRight } from '@phosphor-icons/react/dist/csr/CaretRight'
import { Clock } from '@phosphor-icons/react/dist/csr/Clock'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { LinuxLogo } from '@phosphor-icons/react/dist/csr/LinuxLogo'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { Package } from '@phosphor-icons/react/dist/csr/Package'
import { Sparkle } from '@phosphor-icons/react/dist/csr/Sparkle'
import { Tag } from '@phosphor-icons/react/dist/csr/Tag'
import { WindowsLogo } from '@phosphor-icons/react/dist/csr/WindowsLogo'
import { X } from '@phosphor-icons/react/dist/csr/X'
import { useReleases, formatDatePt, formatRelativeTime, type ReleaseItem, type ReleaseAsset } from './releasesData'
import { MarkdownBody } from './MarkdownBody'

interface ReleasesProps {
  onBackToHome: () => void
}

type PlatformFilter = 'all' | 'windows' | 'linux' | 'android'

function PlatformIcon({ platform, size = 18 }: { platform: string; size?: number }) {
  if (platform === 'windows') return <WindowsLogo size={size} aria-label="Windows" />
  if (platform === 'linux') return <LinuxLogo size={size} aria-label="Ubuntu Linux" />
  if (platform === 'android') return <AndroidLogo size={size} aria-label="Android" />
  return <Package size={size} aria-label="Multiplataforma" />
}

function PlatformLabel(platform: string) {
  if (platform === 'windows') return 'Windows'
  if (platform === 'linux') return 'Ubuntu Linux'
  if (platform === 'android') return 'Android'
  return 'Desktop'
}

function AssetButton({ asset }: { asset: ReleaseAsset }) {
  const isExe = asset.name.endsWith('.exe')
  const isDeb = asset.name.endsWith('.deb')
  const isApk = asset.name.endsWith('.apk')
  const isTar = asset.name.endsWith('.tar.gz')
  const isTxt = asset.name.endsWith('.txt') || asset.name.endsWith('.sig') || asset.name.endsWith('.json')

  let label = asset.name
  let isPrimary = false

  if (isExe) {
    label = `Instalador Windows (${asset.sizeFormatted})`
    isPrimary = true
  } else if (isDeb) {
    label = `Pacote Ubuntu .deb (${asset.sizeFormatted})`
    isPrimary = true
  } else if (isApk) {
    const unminified = asset.name.includes('unminified')
    label = unminified ? `APK Não minificado (${asset.sizeFormatted})` : `APK Android (${asset.sizeFormatted})`
    isPrimary = !unminified
  } else if (isTar) {
    label = `Pacote compactado .tar.gz (${asset.sizeFormatted})`
  } else if (isTxt) {
    label = `${asset.name} (${asset.sizeFormatted})`
  }

  if (isTxt) {
    return (
      <a
        href={asset.downloadUrl}
        className="release-asset-secondary"
        target="_blank"
        rel="noreferrer"
        title={`Baixar ${asset.name}`}
      >
        <DownloadSimple size={14} />
        <span>{label}</span>
      </a>
    )
  }

  return (
    <a
      href={asset.downloadUrl}
      className={`release-asset-btn ${isPrimary ? 'primary' : 'secondary'}`}
      download
    >
      <DownloadSimple size={16} />
      <span>{label}</span>
    </a>
  )
}

function ReleaseCard({
  release,
  isLatestForPlatform,
  defaultExpanded = false
}: {
  release: ReleaseItem
  isLatestForPlatform: boolean
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const relative = formatRelativeTime(release.publishedAt)
  const dateFormatted = formatDatePt(release.publishedAt)

  const primaryAssets = release.assets.filter(a => !a.name.endsWith('.sig') && !a.name.endsWith('.json') && !a.name.endsWith('.txt'))
  const secondaryAssets = release.assets.filter(a => a.name.endsWith('.txt') || a.name.endsWith('.sig') || a.name.endsWith('.json'))

  return (
    <article className={`release-card ${isLatestForPlatform ? 'is-latest' : ''}`} id={release.tag}>
      <header className="release-card-header">
        <div className="release-card-meta">
          <span className={`platform-pill platform-${release.platform}`}>
            <PlatformIcon platform={release.platform} size={16} />
            <span>{PlatformLabel(release.platform)}</span>
          </span>

          <span className="release-tag-pill">
            <Tag size={14} />
            <code>{release.tag}</code>
          </span>

          {isLatestForPlatform && (
            <span className="release-status-badge latest">
              <Sparkle size={13} weight="fill" />
              <span>Mais recente</span>
            </span>
          )}

          {release.prerelease ? (
            <span className="release-status-badge prerelease">Pré-release</span>
          ) : (
            <span className="release-status-badge stable">Estável</span>
          )}

          <time className="release-date" dateTime={release.publishedAt} title={release.publishedAt}>
            <Clock size={14} />
            <span>{dateFormatted}</span>
            {relative && <span className="relative-tag">({relative})</span>}
          </time>
        </div>

        <h3 className="release-title">{release.name}</h3>
      </header>

      {release.body && (
        <div className="release-notes-wrapper">
          <button
            type="button"
            className="release-toggle-btn"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? <CaretDown size={16} /> : <CaretRight size={16} />}
            <span>{expanded ? 'Recolher notas da versão' : 'Ver notas de lançamento e changelog'}</span>
          </button>

          {expanded && (
            <div className="release-body-container">
              <MarkdownBody content={release.body} />
            </div>
          )}
        </div>
      )}

      {primaryAssets.length > 0 && (
        <div className="release-downloads-bar">
          <span className="release-downloads-label">Downloads diretos:</span>
          <div className="release-assets-list">
            {primaryAssets.map(asset => (
              <AssetButton key={asset.name} asset={asset} />
            ))}
          </div>
        </div>
      )}

      <footer className="release-card-footer">
        {secondaryAssets.length > 0 && (
          <div className="release-secondary-assets">
            <span>Hashes e assinaturas:</span>
            {secondaryAssets.map(asset => (
              <AssetButton key={asset.name} asset={asset} />
            ))}
          </div>
        )}

        <a
          href={release.htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="release-github-link"
        >
          <GithubLogo size={16} />
          <span>Ver release no GitHub</span>
          <ArrowUpRight size={14} />
        </a>
      </footer>
    </article>
  )
}

export function Releases({ onBackToHome }: ReleasesProps) {
  const { releases, isRefreshing, lastSync, syncError, refreshNow } = useReleases()
  const [platform, setPlatform] = useState<PlatformFilter>('all')
  const [search, setSearch] = useState('')
  const [includePrereleases, setIncludePrereleases] = useState(true)
  const [expandAll, setExpandAll] = useState(false)

  // Identify latest per platform
  const latestWindowsTag = useMemo(() => {
    return releases.find(r => r.platform === 'windows' && !r.prerelease)?.tag || ''
  }, [releases])

  const latestLinuxTag = useMemo(() => {
    return releases.find(r => r.platform === 'linux')?.tag || ''
  }, [releases])

  const latestAndroidTag = useMemo(() => {
    return releases.find(r => r.platform === 'android' && !r.prerelease)?.tag || ''
  }, [releases])

  // Filtered releases
  const filtered = useMemo(() => {
    return releases.filter(r => {
      // Platform filter
      if (platform !== 'all' && r.platform !== platform) {
        return false
      }

      // Pre-release filter
      if (!includePrereleases && r.prerelease) {
        return false
      }

      // Search filter
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchTag = r.tag.toLowerCase().includes(query)
        const matchName = r.name.toLowerCase().includes(query)
        const matchBody = r.body.toLowerCase().includes(query)
        const matchAssets = r.assets.some(a => a.name.toLowerCase().includes(query))
        return matchTag || matchName || matchBody || matchAssets
      }

      return true
    })
  }, [releases, platform, includePrereleases, search])

  const counts = useMemo(() => {
    return {
      all: releases.length,
      windows: releases.filter(r => r.platform === 'windows').length,
      linux: releases.filter(r => r.platform === 'linux').length,
      android: releases.filter(r => r.platform === 'android').length
    }
  }, [releases])

  return (
    <div className="releases-page shell" id="releases-top">
      {/* Top back navigation */}
      <div className="releases-nav-bar">
        <button
          type="button"
          className="releases-back-btn"
          onClick={onBackToHome}
          aria-label="Voltar para a página inicial"
        >
          <ArrowLeft size={18} />
          <span>Voltar para a página inicial</span>
        </button>

        <div className="releases-sync-wrapper">
          {lastSync && (
            <span className="releases-sync-time">
              Sincronizado {formatRelativeTime(lastSync.toISOString())}
            </span>
          )}
          <button
            type="button"
            className={`releases-sync-btn ${isRefreshing ? 'is-spinning' : ''}`}
            onClick={refreshNow}
            disabled={isRefreshing}
            title="Sincronizar com as últimas releases do GitHub"
          >
            <ArrowClockwise size={16} />
            <span>{isRefreshing ? 'Buscando atualizações...' : 'Sincronizar com GitHub'}</span>
          </button>
        </div>
      </div>

      {syncError && (
        <div className="releases-sync-banner" role="status">
          <p>{syncError}</p>
        </div>
      )}

      {/* Hero / Header */}
      <header className="releases-hero">
        <p className="eyebrow">PC Remote · Changelog & Releases</p>
        <h1>Histórico de Atualizações</h1>
        <p className="releases-hero-desc">
          Acompanhe todas as versões lançadas para Windows, Ubuntu Linux e Android.
          Notas completas de cada versão, instaladores executáveis e pacotes oficiais prontos para download.
        </p>

        {/* Quick Highlights Summary */}
        <div className="releases-summary-grid">
          <div className="releases-summary-card">
            <span className="summary-title">Versões publicadas</span>
            <span className="summary-val">{releases.length} releases</span>
            <span className="summary-sub">Windows, Linux e Android</span>
          </div>

          <div className="releases-summary-card">
            <span className="summary-title">Windows mais recente</span>
            <span className="summary-val">{latestWindowsTag || 'v0.6.4'}</span>
            <span className="summary-sub">Instalador .exe para Windows 10/11</span>
          </div>

          <div className="releases-summary-card">
            <span className="summary-title">Ubuntu mais recente</span>
            <span className="summary-val">{latestLinuxTag || 'v0.6.4-ubuntu.1'}</span>
            <span className="summary-sub">Pacote .deb para Ubuntu LTS</span>
          </div>

          <div className="releases-summary-card">
            <span className="summary-title">Android mais recente</span>
            <span className="summary-val">{latestAndroidTag || 'v0.6.5-kotlin'}</span>
            <span className="summary-sub">APK nativo para Android 7+</span>
          </div>
        </div>
      </header>

      {/* Controls / Filter Bar */}
      <section className="releases-toolbar" aria-label="Filtros de versões">
        <div className="releases-search-box">
          <MagnifyingGlass size={18} className="search-icon" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por versão, recurso ou palavra-chave (ex: wayland, wol, 0.6.4)..."
            aria-label="Buscar versões"
            className="releases-search-input"
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch('')}
              aria-label="Limpar busca"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="releases-filters-row">
          <div className="platform-filter-tabs" role="tablist" aria-label="Filtrar por plataforma">
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'all'}
              className={`filter-tab ${platform === 'all' ? 'active' : ''}`}
              onClick={() => setPlatform('all')}
            >
              <span>Todas ({counts.all})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'windows'}
              className={`filter-tab ${platform === 'windows' ? 'active' : ''}`}
              onClick={() => setPlatform('windows')}
            >
              <WindowsLogo size={16} />
              <span>Windows ({counts.windows})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'linux'}
              className={`filter-tab ${platform === 'linux' ? 'active' : ''}`}
              onClick={() => setPlatform('linux')}
            >
              <LinuxLogo size={16} />
              <span>Ubuntu ({counts.linux})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={platform === 'android'}
              className={`filter-tab ${platform === 'android' ? 'active' : ''}`}
              onClick={() => setPlatform('android')}
            >
              <AndroidLogo size={16} />
              <span>Android ({counts.android})</span>
            </button>
          </div>

          <div className="releases-toggles-group">
            <label className="prerelease-checkbox-label">
              <input
                type="checkbox"
                checked={includePrereleases}
                onChange={e => setIncludePrereleases(e.target.checked)}
              />
              <span>Incluir pré-releases</span>
            </label>

            <button
              type="button"
              className="expand-all-btn"
              onClick={() => setExpandAll(!expandAll)}
            >
              {expandAll ? 'Recolher notas' : 'Expandir notas'}
            </button>
          </div>
        </div>
      </section>

      {/* Results status */}
      <div className="releases-count-status">
        <span>Exibindo <strong>{filtered.length}</strong> de {releases.length} atualizações</span>
        {search && <span> para "{search}"</span>}
      </div>

      {/* Release Timeline / Cards */}
      {filtered.length === 0 ? (
        <div className="releases-empty-state">
          <Package size={48} />
          <h3>Nenhuma versão encontrada</h3>
          <p>Não encontramos atualizações com os filtros selecionados.</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setSearch('')
              setPlatform('all')
              setIncludePrereleases(true)
            }}
          >
            Limpar filtros e busca
          </button>
        </div>
      ) : (
        <div className="releases-list">
          {filtered.map(release => {
            const isLatest =
              (release.platform === 'windows' && release.tag === latestWindowsTag) ||
              (release.platform === 'linux' && release.tag === latestLinuxTag) ||
              (release.platform === 'android' && release.tag === latestAndroidTag)

            return (
              <ReleaseCard
                key={release.id}
                release={release}
                isLatestForPlatform={isLatest}
                defaultExpanded={expandAll || isLatest}
              />
            )
          })}
        </div>
      )}

      {/* Bottom CTA to return */}
      <footer className="releases-bottom-cta">
        <h3>Pronto para usar o PC Remote?</h3>
        <p>Baixe gratuitamente nos dois aparelhos e conecte pelo Wi-Fi local.</p>
        <button
          type="button"
          className="button"
          onClick={onBackToHome}
        >
          <span>Ir para a página inicial e downloads</span>
          <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
        </button>
      </footer>
    </div>
  )
}
