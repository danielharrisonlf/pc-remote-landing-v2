import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { AndroidLogo } from '@phosphor-icons/react/dist/csr/AndroidLogo'
import { ArrowDown } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowUp } from '@phosphor-icons/react/dist/csr/ArrowUp'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Camera } from '@phosphor-icons/react/dist/csr/Camera'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import { ArrowsLeftRight } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight'
import { Copy } from '@phosphor-icons/react/dist/csr/Copy'
import { CursorClick } from '@phosphor-icons/react/dist/csr/CursorClick'
import { Desktop } from '@phosphor-icons/react/dist/csr/Desktop'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { LinuxLogo } from '@phosphor-icons/react/dist/csr/LinuxLogo'
import { List } from '@phosphor-icons/react/dist/csr/List'
import { LockKey } from '@phosphor-icons/react/dist/csr/LockKey'
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassPlus'
import { Moon } from '@phosphor-icons/react/dist/csr/Moon'
import { PlayPause } from '@phosphor-icons/react/dist/csr/PlayPause'
import { PresentationChart } from '@phosphor-icons/react/dist/csr/PresentationChart'
import { Plus } from '@phosphor-icons/react/dist/csr/Plus'
import { Power } from '@phosphor-icons/react/dist/csr/Power'
import { Scan } from '@phosphor-icons/react/dist/csr/Scan'
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { Sun } from '@phosphor-icons/react/dist/csr/Sun'
import { Tag } from '@phosphor-icons/react/dist/csr/Tag'
import { WifiHigh } from '@phosphor-icons/react/dist/csr/WifiHigh'
import { WindowsLogo } from '@phosphor-icons/react/dist/csr/WindowsLogo'
import { X } from '@phosphor-icons/react/dist/csr/X'
import { links, hashes, versions, comparison, comparisonSources } from './content'
import { initialReleases } from './releasesData'
import { useTheme } from './theme'
import Screenshot from './Screenshot'
import { Releases } from './Releases'

const markInk = 'M 37.00 30.20 L 71.00 30.20 C 73.81 30.20 76.10 32.49 76.10 35.30 L 76.10 40.40 C 76.10 42.20 75.16 43.87 73.62 44.80 L 58.67 53.86 C 55.80 55.61 52.20 55.61 49.33 53.86 L 34.38 44.80 C 32.84 43.87 31.90 42.20 31.90 40.40 L 31.90 35.30 C 31.90 32.49 34.19 30.20 37.00 30.20 Z M 42.10 37.00 L 42.10 39.55 L 54.00 46.77 L 65.90 39.55 L 65.90 37.00 L 42.10 37.00 Z'
const markAccent = 'M 49.33 54.14 C 52.20 52.39 55.80 52.39 58.67 54.14 L 73.62 63.20 C 75.16 64.13 76.10 65.80 76.10 67.60 L 76.10 72.70 C 76.10 75.51 73.81 77.80 71.00 77.80 L 37.00 77.80 C 34.19 77.80 31.90 75.51 31.90 72.70 L 31.90 67.60 C 31.90 65.80 32.84 64.13 34.38 63.20 L 49.33 54.14 Z M 65.90 71.00 L 65.90 68.45 L 54.00 61.23 L 42.10 68.45 L 42.10 71.00 L 65.90 71.00 Z'

function BrandMark() {
  const gradient = `brand-cyan-${useId().replace(/[^\w-]/g, '')}`
  return (
    <svg className="brand-mark" viewBox="0 0 108 108" width="36" height="36" aria-hidden="true">
      <defs><linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00E5FF" /><stop offset="1" stopColor="#0284C7" /></linearGradient></defs>
      <rect className="brand-tile" x="1" y="1" width="106" height="106" rx="25" />
      <g transform="translate(-14.04 -14.04) scale(1.26)">
        <path className="brand-ink" fillRule="evenodd" d={markInk} />
        <path fill={`url(#${gradient})`} fillRule="evenodd" d={markAccent} />
      </g>
    </svg>
  )
}

function Brand({ onClick }: { onClick: () => void }) {
  return (
    <a className="brand" href="#top" aria-label="PC Remote, início" onClick={(e) => { e.preventDefault(); onClick() }}>
      <BrandMark />
      <span>PC Remote</span>
    </a>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      className="theme-toggle"
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Tema escuro"
      title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      onClick={toggle}
    >
      <Sun className="theme-sun" size={18} />
      <Moon className="theme-moon" size={18} />
    </button>
  )
}

interface HeaderProps {
  activeView: 'home' | 'releases'
  onSelectView: (view: 'home' | 'releases', anchor?: string) => void
}

function Header({ activeView, onSelectView }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() } }
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false) }
    const resize = () => { if (window.matchMedia('(min-width: 1100px)').matches) setOpen(false) }
    document.addEventListener('keydown', escape)
    document.addEventListener('pointerdown', outside)
    window.addEventListener('resize', resize)
    return () => {
      document.removeEventListener('keydown', escape)
      document.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', resize)
    }
  }, [open])

  const handleNav = (view: 'home' | 'releases', anchor?: string) => {
    setOpen(false)
    onSelectView(view, anchor)
  }

  return (
    <header ref={header} className="site-header">
      <div className="shell header-inner">
        <Brand onClick={() => handleNav('home', 'top')} />
        <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal">
          {[
            ['recursos', 'Recursos'],
            ['diferenciais', 'Diferenciais'],
            ['comparar', 'Comparar'],
            ['seguranca', 'Segurança'],
            ['faq', 'FAQ']
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeView === 'home' ? '' : 'nav-external'}
              onClick={(e) => { e.preventDefault(); handleNav('home', id) }}
            >
              {label}
            </a>
          ))}
          <a
            href="#releases"
            className={`nav-link-releases ${activeView === 'releases' ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNav('releases') }}
          >
            <span>Releases</span>
            <span className="nav-link-badge">v{versions.windows}</span>
          </a>
        </nav>
        <div className="header-actions">
          <a className="github-link" href={links.desktopRepo} target="_blank" rel="noreferrer" aria-label="Código do PC Remote no GitHub">
            <GithubLogo size={21} />
          </a>
          <ThemeToggle />
          <a
            className="button small header-download"
            href="#downloads"
            onClick={(e) => { e.preventDefault(); handleNav('home', 'downloads') }}
          >
            Baixar grátis <ArrowDown size={15} />
          </a>
        </div>
        <button
          ref={menuButton}
          className="menu-button"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={open}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={23} /> : <List size={23} />}
        </button>
      </div>
    </header>
  )
}

function PhoneScreenshot({ name, alt, priority = false, badge = true, className = '' }: { name: string; alt: string; priority?: boolean; badge?: boolean; className?: string }) {
  return <Screenshot frame="phone" name={name} width={720} height={1600} alt={alt} badge={badge} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} className={className} />
}

function Hero({ onNavigateReleases }: { onNavigateReleases: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <h1>Controle o PC<br /><span>direto do sofá.</span></h1>
          <p className="hero-description">Pause o filme, passe os slides, digite e desligue o computador pelo Android. Cada comando vai direto pela sua rede Wi-Fi, sem passar por servidor na nuvem.</p>
          <div className="hero-actions">
            <a className="button" href={links.android}><AndroidLogo size={21} /><span>Baixar para Android</span></a>
            <a className="button secondary" href={links.windows}><WindowsLogo size={21} /><span>Baixar para Windows</span></a>
          </div>
          <ul className="hero-proof" aria-label="Por que é diferente">
            <li><WifiHigh size={18} />Funciona na rede de casa, mesmo sem internet</li>
            <li><LockKey size={18} />Sem conta, sem login</li>
            <li><a href={links.desktopRepo} target="_blank" rel="noreferrer"><GithubLogo size={18} />Grátis e de código aberto<ArrowUpRight size={14} /></a></li>
          </ul>
          <div className="hero-help">
            <a className="hero-setup-link" href="#como-funciona">Como funciona em 3 passos <ArrowRight size={15} /></a>
            <a className="hero-ubuntu-link text-link" href="#ubuntu-download"><LinuxLogo size={18} />Usa Ubuntu? <ArrowRight size={15} /></a>
            <a
              className="hero-ubuntu-link text-link"
              href="#releases"
              onClick={(e) => { e.preventDefault(); onNavigateReleases() }}
            >
              <Tag size={17} />Histórico de releases <ArrowRight size={15} />
            </a>
          </div>
        </div>
        <figure className="hero-product">
          <div className="phone-stage">
            <PhoneScreenshot name="deck" badge={false} className="stage-phone stage-left" alt="Deck de Ações no Android com atalhos como mostrar a área de trabalho, capturar a tela e alternar janelas" />
            <PhoneScreenshot name="slides" badge={false} className="stage-phone stage-right" alt="Apresentador de slides no Android com timer, próximo, anterior, tela preta e tela branca" />
            <PhoneScreenshot name="media" priority className="stage-phone stage-front" alt="Tela de mídia no Android tocando uma faixa no PC, com volume do computador em 53%" />
          </div>
          <figcaption><MagnifyingGlassPlus size={16} />Telas reais do app Android {versions.android}. Toque para ampliar.</figcaption>
        </figure>
      </div>
    </section>
  )
}

const tools = [
  { id: 'media', image: 'media', label: 'Mídia e volume', icon: PlayPause, title: 'O filme continua. Você fica no sofá.', description: 'Pause, avance e ajuste o volume do computador sem levantar. Quer ver outra coisa? Pesquise no YouTube pelo celular, até por voz, e o vídeo abre no PC.', bullets: ['Tocar, pausar, avançar e voltar no player ativo', 'Volume e mudo do computador na ponta do dedo', 'Busca no YouTube, digitada ou falada'], note: 'Os controles disponíveis dependem do player. O app apaga os botões que ele não aceita.', alt: 'Tela real de mídia tocando uma faixa no PC, com volume do computador em 53%', metric: 'Seu entretenimento, ao alcance da mão.' },
  { id: 'touchpad', image: 'touchpad', label: 'Mouse e teclado', icon: CursorClick, title: 'O mouse ficou longe? A tela do celular vira touchpad.', description: 'Mova o cursor, role páginas e digite no computador como se estivesse na mesa. Esc, Tab, Enter e Espaço ficam a um toque.', bullets: ['Um dedo move o cursor; um toque clica', 'Dois dedos rolam; toque com dois dedos abre o menu', 'Teclado do Android digita direto no PC'], note: 'O PC Remote controla a janela em foco. Ele não transmite a tela do computador para o celular.', alt: 'Touchpad real no Android com área de gestos, teclas Esc, Tab, Enter e Espaço e botões de clique', metric: 'Cursor, gestos e digitação no mesmo app.' },
  { id: 'controls', image: 'deck', backImage: 'slides', backAlt: 'Apresentador de slides com timer, próximo, anterior, tela preta e tela branca', label: 'Slides e atalhos', icon: PresentationChart, title: 'Apresente sem ficar preso ao notebook.', description: 'Passe os slides andando pela sala, com timer e tela preta para pausar a plateia. No Deck de Ações, um toque mostra a área de trabalho, captura a tela ou fecha a janela.', bullets: ['Próximo e anterior também pelos botões de volume', '12 atalhos do sistema no Deck de Ações', 'Teclado numérico para planilhas e calculadora'], note: 'Os comandos agem na janela em foco no computador. O Deck usa atalhos do próprio sistema operacional.', alt: 'Deck de Ações no Android com doze atalhos, como mostrar a área de trabalho, capturar a tela e alternar janelas', metric: 'Apresentador, atalhos e teclado numérico.' },
  { id: 'transfer', image: 'transfer', label: 'Arquivos e texto', icon: ArrowsLeftRight, title: 'Copiou no PC? Já está no celular.', description: 'Copie um link ou um trecho no computador e cole no Android, ou o contrário. Fotos e documentos vão pela rede de casa, sem cabo, sem e-mail para você mesmo e sem upload.', bullets: ['Área de transferência em tempo real, com texto e imagem', 'Arquivos de até 1 GB nos dois sentidos', 'Integridade conferida por SHA-256'], note: 'Sem histórico do conteúdo copiado em disco. O Android pode limitar a leitura automática com o app em segundo plano; o envio manual continua disponível.', alt: 'Tela Transferir no Android com um texto recebido do PC em tempo real e opções para enviar arquivo e texto', metric: 'Menos troca de aparelho, menos retrabalho.' },
  { id: 'power', image: 'power', label: 'Energia', icon: Power, title: 'Terminou por hoje? Desligue pelo celular.', description: 'Bloqueie, suspenda, reinicie ou desligue o computador sem ir até ele. Prefere esperar o download terminar? Agende para depois.', bullets: ['Bloquear, suspender, reiniciar e desligar', 'Agendamento de 15 min a 2 h, com cancelamento', 'Programas abertos podem pedir para salvar antes'], note: 'Arquivos não salvos podem impedir o desligamento. O app também envia Wake-on-LAN quando a placa de rede e a BIOS do PC permitem ligar pela rede.', alt: 'Tela Conexão no Android com o PC conectado e os botões Bloquear, Suspender, Desligar e Reiniciar', metric: 'Você escolhe a hora de encerrar.' },
]

function Features() {
  const [selected, setSelected] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const tool = tools[selected]
  const tabList = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // Keep the active tab in view when the list scrolls horizontally on phones.
    const list = tabList.current, tab = refs.current[selected]
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [selected])
  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % tools.length
    else if (event.key === 'ArrowLeft') next = (index + tools.length - 1) % tools.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tools.length - 1
    else return
    event.preventDefault(); setSelected(next); refs.current[next]?.focus()
  }
  return <section className="section shell" id="recursos">
    <div className="section-title"><h2>Um app, cinco controles.<br />Todos no seu bolso.</h2><p>Do filme no sofá à apresentação na sala de reunião. Escolha uma tarefa e veja a tela real.</p></div>
    <div className="feature-tabs" ref={tabList} role="tablist" aria-label="Funcionalidades do PC Remote">{tools.map((item, i) => <button ref={el => { refs.current[i] = el }} key={item.id} id={`tab-${item.id}`} aria-selected={selected === i} aria-controls="feature-panel" tabIndex={selected === i ? 0 : -1} role="tab" onKeyDown={e => navigateTabs(e, i)} onClick={() => setSelected(i)}><item.icon size={21} /><span>{item.label}</span></button>)}</div>
    <div className="feature-panel" id="feature-panel" role="tabpanel" aria-label={tool.label} tabIndex={0}>
      <div className="feature-copy" key={`copy-${tool.id}`}><span className="feature-kind"><tool.icon size={22} />{tool.label}</span><h3>{tool.title}</h3><p>{tool.description}</p><ul className="check-list">{tool.bullets.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul><a className="text-link" href="#downloads">Baixar e começar a usar <ArrowRight size={18} /></a><details className="feature-note"><summary>Detalhes e compatibilidade</summary><p>{tool.note}</p></details></div>
      <figure className={`feature-visual${tool.backImage ? ' has-back' : ''}`} key={tool.id}><div className="feature-phones">{tool.backImage && <PhoneScreenshot name={tool.backImage} alt={tool.backAlt ?? ''} badge={false} className="feature-back" />}<PhoneScreenshot name={tool.image} alt={tool.alt} className="feature-front" /></div><figcaption>{tool.metric}</figcaption></figure>
    </div>
    <div className="feature-shortcuts" aria-label="Explorar outros recursos">{tools.map((item, i) => <button type="button" key={item.id} className={selected === i ? 'selected' : ''} aria-pressed={selected === i} onClick={() => { setSelected(i); document.getElementById('recursos')?.scrollIntoView({ block: 'start' }) }}><item.icon size={20} /><span>{item.label}</span><ArrowUpRight size={15} /></button>)}</div>
  </section>
}

function Benefits() {
  return <section className="section benefits-section" id="diferenciais"><div className="shell"><div className="section-title"><h2>Sem conta, sem mensalidade,<br />sem nuvem no meio.</h2><p>Você já tem tudo o que precisa: um PC, um Android e o Wi-Fi de casa. O PC Remote só liga os três.</p></div><div className="benefits-grid">
    <article className="benefit-main"><WifiHigh size={32} /><h3>A internet caiu?<br />O controle continua.</h3><p>Celular e computador conversam direto pela rede de casa. Com os dois no mesmo Wi-Fi, mouse, mídia, arquivos e área de transferência seguem funcionando.</p><span className="benefit-detail">Conexão direta pela LAN, sem servidor externo de controle.</span></article>
    <article><LockKey size={26} /><h3>Nada de cadastro.</h3><p>Sem login, senha de serviço ou e-mail. Você aprova o celular no próprio computador e pronto.</p></article>
    <article><GithubLogo size={26} /><h3>Tudo liberado, de graça.</h3><p>Todas as ferramentas, sem anúncios, sem limite de sessão e sem plano pago. O código é aberto para quem quiser conferir.</p><a className="text-link" href={links.desktopRepo} target="_blank" rel="noreferrer">Ver o código no GitHub <ArrowUpRight size={16} /></a></article>
  </div><div className="engineering-note"><Desktop size={22} /><p><strong>Feito para controlar, não para espelhar a tela.</strong> Desktop em Tauri v2 + Rust e Android nativo em Kotlin. Só os comandos e os dados que você envia passam pela rede.</p></div></div></section>
}

function HowItWorks() {
  return <section className="section shell" id="como-funciona"><div className="section-title"><h2>Três passos e o PC<br />responde ao seu celular.</h2><p>Sem login e sem configurar roteador. O pareamento acontece direto entre os aparelhos.</p></div><ol className="steps">
    <li><span className="step-number">1</span><h3>Instale nos dois aparelhos</h3><p>Baixe o instalador para Windows ou Ubuntu e o APK no Android. Abra os aplicativos.</p><a className="text-link" href="#downloads">Ver downloads <ArrowRight size={16} /></a></li>
    <li><span className="step-number">2</span><h3>Leia o QR Code</h3><p>No PC, clique em “Parear celular”. No Android, aponte a câmera para o QR ou digite o código de 8 dígitos.</p></li>
    <li><span className="step-number">3</span><h3>Aprove e use</h3><p>Confira se as cores batem nos dois aparelhos e permita o pedido no PC. Da próxima vez, ele reconecta sozinho.</p></li>
  </ol></section>
}

function Comparison() {
  const [rival, setRival] = useState<'remote' | 'unified' | 'phone'>('remote')
  const names = { remote: 'TeamViewer / AnyDesk', unified: 'Unified Remote', phone: 'Vínculo com Celular' }
  return <section className="section comparison-section" id="comparar"><div className="shell"><div className="section-title"><h2>Feito para o controle em casa.<br />Não para acesso remoto.</h2><p>Ferramentas de acesso remoto resolvem outro problema. Compare pelo que cada uma realmente oferece.</p></div>
    <label className="comparison-select">Comparar PC Remote com<select value={rival} onChange={e => setRival(e.target.value as typeof rival)}><option value="remote">TeamViewer / AnyDesk</option><option value="unified">Unified Remote</option><option value="phone">Vínculo com Celular</option></select></label>
    <div className="table-wrap"><table><caption className="sr-only">Comparativo de finalidade, rede, conta, preço e plataformas</caption><thead><tr><th scope="col">O que muda</th><th scope="col" className="pc-column">PC Remote</th><th scope="col">TeamViewer / AnyDesk</th><th scope="col">Unified Remote</th><th scope="col">Vínculo com Celular</th></tr></thead><tbody>{comparison.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td className="pc-column">{row.chip && <span className="status-chip"><Check size={13} weight="bold" />{row.chip}</span>}{row.pc}</td><td>{row.remote}</td><td>{row.unified}</td><td>{row.phone}</td></tr>)}</tbody></table></div>
    <div className="comparison-cards" aria-label={`PC Remote comparado com ${names[rival]}`}>{comparison.map(row => <article key={row.label}><h3>{row.label}</h3><div className="comparison-answer our-answer"><span>PC Remote{row.chip && <span className="status-chip"><Check size={13} weight="bold" />{row.chip}</span>}</span><p><Check size={17} />{row.pc}</p></div><div className="comparison-answer"><span>{names[rival]}</span><p>{row[rival]}</p></div></article>)}</div>
    <p className="comparison-note">TeamViewer e AnyDesk também oferecem conexão LAN. O Unified Remote também funciona localmente. A escolha depende do uso e da edição.</p>
    <details className="sources"><summary>Fontes e critérios do comparativo</summary><p>Resumo da documentação oficial consultada em 17/10/2026. Recursos e condições podem mudar. Não comparamos RAM ou coleta de dados sem uma medição equivalente.</p><div>{comparisonSources.map(([label, url]) => <a href={url} key={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14} /></a>)}</div></details>
  </div></section>
}

function Security() {
  return <section className="section shell security-section" id="seguranca"><div className="section-title"><h2>Você autoriza o acesso.<br />Você decide quando parar.</h2><p>Aprove o celular no computador. Se precisar, um clique interrompe mouse, teclado e energia.</p></div><div className="security-layout"><figure className="security-shot"><Screenshot frame="window" name="security" width={1000} height={767} crop={[6, 7, 2]} alt="Mouse, teclado e energia bloqueados no PC após usar Interromper" /><figcaption><MagnifyingGlassPlus size={15} />Toque para ver o botão “Interromper” no app real.</figcaption></figure><div className="security-points">
    <article><ShieldCheck /><div><h3>Conexão criptografada</h3><p>TLS com certificado fixado. Código temporário de 8 dígitos e verificação visual ajudam a identificar o PC correto.</p></div></article>
    <article><LockKey /><div><h3>Seus dados ficam entre os dispositivos</h3><p>Sem servidor de controle na nuvem e sem telemetria de uso. O conteúdo copiado não vira histórico em disco.</p></div></article>
    <article><Desktop /><div><h3>Permissões sob seu controle</h3><p>Funciona na sessão do usuário, sem executar como administrador e sem expor terminal de comandos remotos.</p></div></article>
    <details className="technical-details"><summary>Ver detalhes da arquitetura</summary><p>Chaves protegidas pelo Windows DPAPI, credenciais no Android Keystore e atualizações do desktop verificadas por assinatura Ed25519. A conexão usa TCP 43127; a descoberta opcional usa mDNS.</p><a className="text-link" href={links.security} target="_blank" rel="noreferrer">Ler a auditoria e suas limitações <ArrowUpRight size={16} /></a></details>
  </div></div></section>
}

function HashControl({ value, platform }: { value: string; platform: string }) {
  const [status, setStatus] = useState('')
  async function copy() {
    try { await navigator.clipboard.writeText(value); setStatus('Hash copiado.') }
    catch { setStatus('Não foi possível copiar. Selecione o hash abaixo.') }
  }
  return <details className="hash-control"><summary>Conferir SHA-256</summary><code>{value}</code><button type="button" onClick={copy} aria-label={`Copiar hash SHA-256 do ${platform}`}><Copy size={15} />Copiar hash</button><span role="status">{status}</span></details>
}

function Downloads({ onNavigateReleases }: { onNavigateReleases: () => void }) {
  return (
    <section className="section downloads-section" id="downloads">
      <div className="shell">
        <div className="section-title">
          <h2>Comece agora.<br />É grátis nos dois aparelhos.</h2>
          <p>Instale no computador e no celular, conecte os dois ao mesmo Wi-Fi e pareie pelo QR Code.</p>
        </div>
        <div className="download-grid">
          <article className="download-card">
            <div className="download-top"><WindowsLogo size={30} /><span>1. Instale no PC</span></div>
            <div className="download-heading"><h3>PC Remote para Windows</h3><span>Mouse, mídia, arquivos e energia.</span></div>
            <dl className="download-specs"><div><dt>Sistema</dt><dd>Windows 10 (1809+) e 11, x64</dd></div><div><dt>Pacote</dt><dd>Instalador .exe</dd></div><div><dt>Versão</dt><dd>{versions.windows}</dd></div></dl>
            <a className="button" href={links.windows}><DownloadSimple size={19} />Baixar para Windows</a>
            <a className="release-link" href={links.windowsRelease} target="_blank" rel="noreferrer">Ver release oficial <ArrowUpRight size={14} /></a>
            <HashControl value={hashes.windows} platform="Windows" />
          </article>

          <article className="download-card">
            <div className="download-top"><AndroidLogo size={30} /><span>2. Instale no celular</span></div>
            <div className="download-heading"><h3>PC Remote para Android</h3><span>Seu controle, pronto para conectar.</span></div>
            <dl className="download-specs"><div><dt>Sistema</dt><dd>Android 7 ou superior</dd></div><div><dt>Pacote</dt><dd>APK universal, app nativo</dd></div><div><dt>Versão</dt><dd>{versions.android}</dd></div></dl>
            <a className="button secondary" href={links.android}><DownloadSimple size={19} />Baixar APK Android</a>
            <a className="release-link" href={links.androidRelease} target="_blank" rel="noreferrer">Ver release oficial <ArrowUpRight size={14} /></a>
            <HashControl value={hashes.android} platform="Android" />
          </article>

          <aside className="qr-download" aria-labelledby="qr-title">
            <div className="qr-plate"><img src="/android-apk-qr.svg" width="148" height="148" loading="lazy" decoding="async" alt={`QR code com o link direto para baixar o APK oficial ${versions.android} no Android`} /></div>
            <h3 id="qr-title">Está no computador?</h3>
            <ol className="qr-steps">
              <li><Camera size={17} />Abra a câmera do Android</li>
              <li><Scan size={17} />Aponte para o código</li>
              <li><DownloadSimple size={17} />Toque no link e instale o APK</li>
            </ol>
          </aside>
        </div>

        <div className="install-notes">
          <p><strong>Versão de avaliação.</strong> O Windows pode exibir um aviso do SmartScreen; o instalador ainda não tem Authenticode. O APK usa chave debug e o Android solicita autorização para instalar dessa fonte.</p>
          <a href={links.installation} target="_blank" rel="noreferrer">Guia de instalação Windows <ArrowUpRight size={16} /></a>
        </div>

        <aside className="linux-download" id="ubuntu-download" aria-labelledby="ubuntu-download-title">
          <LinuxLogo size={30} aria-hidden="true" />
          <div className="linux-copy">
            <h3 id="ubuntu-download-title">Ubuntu 22.04, 24.04 e 26.04 LTS</h3>
            <p>Pacote .deb para PC amd64, aplicativo v{versions.linux}. Instale com as dependências necessárias, sem compilar.</p>
            <p>Prefere o instalador compactado? Extraia a pasta e execute <code>bash install-ubuntu.sh</code>.</p>
            <p>No Wayland, abra <strong>Configurações → Controle no Ubuntu → Autorizar controle</strong> no PC Remote e permita mouse e teclado.</p>
            <p className="linux-evaluation"><strong>Pré-release Ubuntu.</strong> Instalação e abertura testadas nas três LTS. O uso em um desktop GNOME Wayland real ainda precisa de validação.</p>
            <HashControl value={hashes.linux} platform="Ubuntu (.deb)" />
          </div>
          <div className="linux-actions">
            <a className="button" href={links.linux}><DownloadSimple size={19} />Baixar Ubuntu .deb</a>
            <a className="text-link" href={links.linuxBundle}>Instalador compactado <DownloadSimple size={16} /></a>
            <a className="text-link" href={links.linuxGuide} target="_blank" rel="noreferrer">Guia do Ubuntu <ArrowUpRight size={16} /></a>
            <a className="text-link" href={links.linuxRelease} target="_blank" rel="noreferrer">Ver pré-release <ArrowUpRight size={16} /></a>
          </div>
        </aside>

        {/* Callout banner to Releases Page */}
        <div className="releases-banner-callout">
          <div className="releases-banner-content">
            <strong>Histórico completo de atualizações</strong>
            <span>Consulte todas as {initialReleases.length} releases lançadas para Windows, Ubuntu e Android, com notas detalhadas de cada versão e downloads diretos de executáveis.</span>
          </div>
          <button
            type="button"
            className="releases-banner-btn"
            onClick={onNavigateReleases}
          >
            <span>Ver histórico de releases</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const faqs = [
    ['Preciso de internet para usar?', 'Depois de baixar e instalar, o controle funciona sem internet. O computador e o celular precisam estar na mesma rede local. O PC pode usar cabo de rede enquanto o Android usa o Wi-Fi do mesmo roteador. A busca no YouTube e o download de atualizações precisam de internet.'],
    ['Consigo ver a tela do PC no celular ou acessar de fora de casa?', 'Não. O PC Remote é um controle local de mouse, teclado, mídia, arquivos, clipboard e energia. Ele não transmite a tela e não oferece conexão pela internet para usar fora da sua rede.'],
    ['Como funciona a instalação no Android?', 'Baixe o APK oficial, abra o arquivo no celular e permita a instalação dessa fonte quando o Android solicitar. Esta versão é de avaliação e usa chave de assinatura debug. Depois, abra o app e pareie com o computador.'],
    ['Funciona no Ubuntu 26.04 LTS?', 'Há um pacote .deb amd64 para Ubuntu 22.04, 24.04 e 26.04 LTS, sem precisar compilar. No Wayland, autorize mouse e teclado nas Configurações do PC Remote e confirme a janela do sistema. A instalação e a abertura passaram nas três LTS; esta pré-release ainda precisa de validação em um desktop GNOME Wayland real. As atualizações no Ubuntu são feitas instalando o novo .deb.'],
    ['É seguro deixar o aplicativo aberto?', 'A conexão exige pareamento e aprovação no PC. O código temporário, a confirmação visual e o certificado fixado ajudam a proteger o acesso. Você pode revogar celulares e usar Interromper para bloquear mouse, teclado e energia. Nenhum software elimina todos os riscos.'],
    ['Por que copiar e colar nem sempre sincroniza em segundo plano?', 'O Android limita a leitura da área de transferência quando outro app está em primeiro plano. Abra o PC Remote ou use o envio manual. Você pode desligar a sincronização a qualquer momento.'],
    ['Funciona com qualquer player de música ou vídeo?', 'O app usa as capacidades que o player publica para o sistema: controles de mídia do Windows e MPRIS no Linux. Nem todo player permite todas as ações. O Android indica quais controles estão disponíveis.'],
    ['Preciso configurar meu roteador ou ter conta?', 'Não é preciso criar conta nem abrir portas no roteador. A comunicação de controle usa TCP 43127 na LAN, com descoberta opcional por mDNS. O firewall pode pedir permissão para a rede privada. Redes de convidados e VPNs podem bloquear a conexão.'],
  ]
  return <section className="section shell faq-section" id="faq"><div className="faq-heading"><h2>Perguntas frequentes.</h2><p>O que vale saber antes de instalar, sem letra miúda.</p><a className="text-link" href={links.installation} target="_blank" rel="noreferrer">Ler a documentação <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<Plus size={18} aria-hidden="true" /></summary><p>{a}</p></details>)}</div></section>
}

function Footer({ onNavigateReleases }: { onNavigateReleases: () => void }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <Brand onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            <p>O controle do PC, no seu bolso.<br />Grátis, local e de código aberto.</p>
          </div>
          <div className="footer-links">
            <a href={links.desktopRepo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
            <a href={links.protocol} target="_blank" rel="noreferrer">Protocolo <ArrowUpRight size={14} /></a>
            <a href={links.changelog} target="_blank" rel="noreferrer">Changelog <ArrowUpRight size={14} /></a>
            <a
              href="#releases"
              onClick={(e) => { e.preventDefault(); onNavigateReleases() }}
            >
              Releases & Changelog <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PC Remote</span>
          <span>Gratuito e de código aberto.</span>
          <a href="#top">Voltar ao início <ArrowUp size={14} /></a>
        </div>
      </div>
    </footer>
  )
}

function MobileDownloadBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.getElementById('top')
    const downloads = document.getElementById('downloads')
    if (!hero || !downloads) return
    let pastHero = false
    let atDownloads = false
    const update = () => setVisible(pastHero && !atDownloads)
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = entry.boundingClientRect.bottom <= 0
        if (entry.target === downloads) atDownloads = entry.isIntersecting
      }
      update()
    })
    observer.observe(hero); observer.observe(downloads)
    return () => observer.disconnect()
  }, [])
  return <aside className={`mobile-download-bar${visible ? ' is-visible' : ''}`} aria-label="Download rápido" aria-hidden={!visible} inert={!visible}><div><strong>PC Remote é grátis</strong><span>Windows, Ubuntu e Android</span></div><a className="button small" href="#downloads">Baixar os apps <ArrowDown size={17} /></a></aside>
}

export default function App() {
  const [view, setView] = useState<'home' | 'releases'>('home')

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash.startsWith('#releases')) {
        setView('releases')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setView('home')
        if (hash && hash !== '#' && hash !== '#top') {
          setTimeout(() => {
            const el = document.querySelector(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 50)
        }
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigateTo = (newView: 'home' | 'releases', anchor?: string) => {
    if (newView === 'releases') {
      window.location.hash = '#releases'
      setView('releases')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (view === 'releases') {
        setView('home')
        window.location.hash = anchor ? `#${anchor}` : '#'
        setTimeout(() => {
          if (anchor) {
            const el = document.getElementById(anchor)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }, 60)
      } else {
        if (anchor) {
          const el = document.getElementById(anchor)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', `#${anchor}`)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          window.history.pushState(null, '', '#')
        }
      }
    }
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header activeView={view} onSelectView={navigateTo} />
      <main id="conteudo">
        {view === 'releases' ? (
          <Releases onBackToHome={() => navigateTo('home')} />
        ) : (
          <>
            <Hero onNavigateReleases={() => navigateTo('releases')} />
            <Features />
            <Benefits />
            <HowItWorks />
            <Comparison />
            <Security />
            <Downloads onNavigateReleases={() => navigateTo('releases')} />
            <Faq />
          </>
        )}
      </main>
      <Footer onNavigateReleases={() => navigateTo('releases')} />
      {view === 'home' && <MobileDownloadBar />}
    </>
  )
}
