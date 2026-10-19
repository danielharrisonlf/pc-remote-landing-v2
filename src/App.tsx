import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { AndroidLogo } from '@phosphor-icons/react/dist/csr/AndroidLogo'
import { ArrowDown } from '@phosphor-icons/react/dist/csr/ArrowDown'
import { ArrowRight } from '@phosphor-icons/react/dist/csr/ArrowRight'
import { ArrowUpRight } from '@phosphor-icons/react/dist/csr/ArrowUpRight'
import { Check } from '@phosphor-icons/react/dist/csr/Check'
import { ClipboardText } from '@phosphor-icons/react/dist/csr/ClipboardText'
import { Copy } from '@phosphor-icons/react/dist/csr/Copy'
import { CursorClick } from '@phosphor-icons/react/dist/csr/CursorClick'
import { Desktop } from '@phosphor-icons/react/dist/csr/Desktop'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { FolderSimple } from '@phosphor-icons/react/dist/csr/FolderSimple'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { LinuxLogo } from '@phosphor-icons/react/dist/csr/LinuxLogo'
import { List } from '@phosphor-icons/react/dist/csr/List'
import { LockKey } from '@phosphor-icons/react/dist/csr/LockKey'
import { MagnifyingGlassPlus } from '@phosphor-icons/react/dist/csr/MagnifyingGlassPlus'
import { Moon } from '@phosphor-icons/react/dist/csr/Moon'
import { PlayPause } from '@phosphor-icons/react/dist/csr/PlayPause'
import { Power } from '@phosphor-icons/react/dist/csr/Power'
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { Sun } from '@phosphor-icons/react/dist/csr/Sun'
import { WifiHigh } from '@phosphor-icons/react/dist/csr/WifiHigh'
import { WindowsLogo } from '@phosphor-icons/react/dist/csr/WindowsLogo'
import { X } from '@phosphor-icons/react/dist/csr/X'
import { links, hashes, comparison, comparisonSources } from './content'
import { useTheme } from './theme'
import Screenshot from './Screenshot'

function Brand() {
  return <a className="brand" href="#top" aria-label="PC Remote, início"><span className="brand-mark"><img src="/brand/symbol.svg" width="56" height="56" alt="" /></span><span>PC Remote</span></a>
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return <button className="theme-toggle" type="button" role="switch" aria-checked={theme === 'dark'} aria-label="Tema escuro" title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'} onClick={toggle}><Sun className="theme-sun" size={19} /><Moon className="theme-moon" size={19} /></button>
}

function Header() {
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
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('pointerdown', outside); window.removeEventListener('resize', resize) }
  }, [open])
  return <header ref={header} className="site-header"><div className="shell header-inner">
    <Brand />
    <nav id="main-navigation" className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegação principal">
      {[['recursos', 'Recursos'], ['diferenciais', 'Diferenciais'], ['comparar', 'Comparar'], ['seguranca', 'Segurança'], ['faq', 'FAQ']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <div className="header-actions"><a className="github-link" href={links.desktopRepo} target="_blank" rel="noreferrer" aria-label="Código do PC Remote no GitHub"><GithubLogo size={21} /></a><ThemeToggle /><a className="button small header-download" href="#downloads" onClick={() => setOpen(false)}>Baixar grátis <ArrowDown size={15} /></a></div>
    <button ref={menuButton} className="menu-button" type="button" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <List size={23} />}</button>
  </div></header>
}

function PhoneScreenshot({ name, alt, priority = false, className = '' }: { name: string; alt: string; priority?: boolean; className?: string }) {
  return <div className={`phone ${name === 'clipboard' ? 'phone-tall' : ''} ${className}`}><Screenshot name={name} width={640} height={name === 'clipboard' ? 1422 : 1138} alt={alt} priority={priority} /></div>
}

function Hero() {
  return <section className="hero shell" id="top">
    <div className="hero-copy">
      <a className="hero-source" href={links.desktopRepo} target="_blank" rel="noreferrer">Grátis e código aberto <ArrowUpRight size={15} /></a>
      <h1>Seu Android vira<br /><span>o controle do PC.</span></h1>
      <p className="hero-description">Mouse, teclado, mídia e arquivos. Controle o computador pelo Android, na mesma rede Wi-Fi.</p>
      <div className="hero-actions"><a className="button" href={links.android}><AndroidLogo size={21} /><span>Baixar Android</span></a><a className="button secondary" href={links.windows}><WindowsLogo size={21} /><span>Baixar Windows</span></a></div>
      <div className="hero-help"><a className="hero-setup-link" href="#como-funciona">Como instalar nos dois aparelhos <ArrowRight size={15} /></a><a className="hero-ubuntu-link text-link" href="#ubuntu-download"><LinuxLogo size={18} />Usa Ubuntu? <ArrowRight size={15} /></a></div>
    </div>
    <figure className="hero-product">
      <div className="product-scene"><div className="desktop-shot"><Screenshot name="desktop" alt="Painel do Windows com celular conectado e controles rápidos" width={1260} height={966} priority /></div><PhoneScreenshot name="media" priority alt="Android com busca no YouTube e controles de mídia" /></div>
      <figcaption><MagnifyingGlassPlus size={16} />Telas reais do app. Toque para ampliar.</figcaption>
    </figure>
  </section>
}

const tools = [
  { id: 'media', label: 'Mídia e volume', icon: PlayPause, title: 'O filme continua. Você fica no sofá.', description: 'Pause, troque de faixa e ajuste o volume do computador sem levantar. Escolha o player ativo ou pesquise no YouTube pelo celular.', bullets: ['Reproduzir, pausar, avançar e voltar', 'Volume e mudo do computador', 'Busca no YouTube abre no navegador do PC'], note: 'Os controles disponíveis dependem do player. O app mostra quais ações são compatíveis.', alt: 'Tela real de mídia com seleção de player, botão de pausa e busca no YouTube', metric: 'Seu entretenimento, ao alcance da mão.' },
  { id: 'touchpad', label: 'Mouse e teclado', icon: CursorClick, title: 'O mouse ficou longe? Use o celular.', description: 'Transforme a tela do Android em touchpad. Navegue, role páginas e digite na janela aberta no computador.', bullets: ['Um dedo move o cursor; um toque clica', 'Dois dedos rolam e abrem o menu de contexto', 'Teclado e atalhos como Enter, Tab e Esc'], note: 'O PC Remote controla a janela em foco. Não transmite a tela do computador para o celular.', alt: 'Touchpad real ativado no Android com gestos, teclas rápidas e botões de clique', metric: 'Cursor, gestos e digitação. No mesmo app.' },
  { id: 'files', label: 'Arquivos', icon: FolderSimple, title: 'Do celular para o PC. E de volta.', description: 'Envie uma foto, um documento ou um arquivo grande pela rede local. Sem cabo, sem e-mail para você mesmo e sem upload na nuvem.', bullets: ['Até 1 GB por arquivo, nos dois sentidos', 'Acompanhe o progresso e cancele quando quiser', 'Arquivos recebidos ficam na pasta PC Remote'], note: 'A integridade é conferida por SHA-256. No Windows, os avisos de segurança de arquivos recebidos são preservados.', alt: 'Transferência real de um arquivo de 1 GB entre celular e computador com progresso e opção de cancelar', metric: 'Até 1 GB por arquivo.' },
  { id: 'clipboard', label: 'Copiar e colar', icon: ClipboardText, title: 'Copie aqui. Continue no outro aparelho.', description: 'Leve links, trechos de texto e imagens de um dispositivo ao outro. Ative a sincronização ou envie manualmente quando precisar.', bullets: ['Textos e imagens nos dois sentidos', 'PNG e JPEG de até 32 MB', 'Pause a sincronização no PC ou no Android'], note: 'Sem histórico de conteúdo em disco. O Android pode limitar a leitura automática em segundo plano.', alt: 'Tela real da área de transferência com uma imagem recebida do PC e botão de copiar no celular', metric: 'Menos troca de telas. Menos retrabalho.' },
  { id: 'power', label: 'Energia', icon: Power, title: 'Terminou por hoje? Desligue pelo celular.', description: 'Bloqueie, suspenda ou desligue o computador à distância dentro de casa. Prefere esperar? Deixe a ação agendada.', bullets: ['Ações imediatas ou agendadas de 15 min a 2 h', 'Cancele pelo celular ou pelo computador', 'Programas não são fechados à força'], note: 'Arquivos não salvos podem impedir o desligamento. O desktop informa quando existe uma ação agendada.', alt: 'Tela real de energia do PC com desligamento agendado em 15 minutos e ações de bloquear, suspender e reiniciar', metric: 'Você escolhe a hora de encerrar.' },
]

function Features() {
  const [selected, setSelected] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const tool = tools[selected]
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
    <div className="section-title"><p className="eyebrow">Um controle para o seu dia a dia</p><h2>Faça pelo celular.<br />Fique onde você está.</h2><p>Do vídeo no sofá ao arquivo que você precisa no PC. Escolha o que quer fazer.</p></div>
    <label className="feature-picker">O que você quer controlar?<select value={selected} onChange={e => setSelected(Number(e.target.value))}>{tools.map((item, i) => <option key={item.id} value={i}>{item.label}</option>)}</select></label>
    <div className="feature-tabs" role="tablist" aria-label="Funcionalidades do PC Remote">{tools.map((item, i) => <button ref={el => { refs.current[i] = el }} key={item.id} id={`tab-${item.id}`} aria-selected={selected === i} aria-controls="feature-panel" tabIndex={selected === i ? 0 : -1} role="tab" onKeyDown={e => navigateTabs(e, i)} onClick={() => setSelected(i)}><item.icon size={21} /><span>{item.label}</span></button>)}</div>
    <div className="feature-panel" id="feature-panel" role="tabpanel" aria-label={tool.label} tabIndex={0}>
      <div className="feature-copy" key={`copy-${tool.id}`}><span className="feature-kind"><tool.icon size={22} />{tool.label}</span><h3>{tool.title}</h3><p>{tool.description}</p><ul className="check-list">{tool.bullets.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul><a className="text-link" href="#downloads">Baixar e começar a usar <ArrowRight size={18} /></a><details className="feature-note"><summary>Detalhes e compatibilidade</summary><p>{tool.note}</p></details></div>
      <figure className="feature-visual" key={tool.id}><PhoneScreenshot name={tool.id} alt={tool.alt} /><figcaption>{tool.metric}</figcaption></figure>
    </div>
    <div className="feature-shortcuts" aria-label="Explorar outros recursos">{tools.map((item, i) => <button type="button" key={item.id} className={selected === i ? 'selected' : ''} aria-pressed={selected === i} onClick={() => { setSelected(i); document.getElementById('recursos')?.scrollIntoView({ block: 'start' }) }}><item.icon size={20} /><span>{item.label}</span><ArrowUpRight size={15} /></button>)}</div>
  </section>
}

function Benefits() {
  return <section className="section benefits-section" id="diferenciais"><div className="shell"><div className="section-title"><h2>Sem conta.<br />Sem mensalidade.</h2><p>O que você precisa para usar já é seu: um PC, um Android e a sua rede.</p></div><div className="benefits-grid">
    <article className="benefit-main"><WifiHigh size={32} /><h3>Se o Wi-Fi funciona,<br />o controle continua.</h3><p>A internet pode cair. Com os dois aparelhos na mesma rede, você continua usando mouse, mídia, arquivos e área de transferência.</p><span className="benefit-detail">Conexão direta pela LAN. Sem servidor externo de controle.</span></article>
    <article><LockKey size={26} /><h3>Sem criar mais uma conta.</h3><p>Sem login, senha de serviço ou e-mail. Você autoriza o celular diretamente no computador.</p></article>
    <article><GithubLogo size={26} /><h3>Todas as ferramentas. Zero mensalidade.</h3><p>Mouse, mídia, arquivos e mais, sem anúncios nem limite de sessão. Código aberto para você conferir.</p><a className="text-link" href={links.desktopRepo} target="_blank" rel="noreferrer">Explorar o código <ArrowUpRight size={16} /></a></article>
  </div><div className="engineering-note"><Desktop size={22} /><p><strong>Feito para controlar, sem transmitir a tela inteira.</strong> Desktop em Tauri v2 + Rust e Android nativo. Só as ações e os dados necessários passam pela sua rede.</p></div></div></section>
}

function HowItWorks() {
  return <section className="section shell" id="como-funciona"><div className="section-title"><h2>Baixe nos dois.<br />Pareie e comece.</h2><p>Sem login. O pareamento é feito diretamente entre os aparelhos.</p></div><ol className="steps">
    <li><span className="step-number">1</span><h3>Instale nos dois aparelhos</h3><p>Baixe o instalador para Windows ou Ubuntu e o APK no Android. Abra os aplicativos.</p><a className="text-link" href="#downloads">Ver downloads <ArrowRight size={16} /></a></li>
    <li><span className="step-number">2</span><h3>Encontre seu computador</h3><p>No PC, toque em “Parear celular”. No Android, leia o QR ou digite o código de 8 dígitos.</p></li>
    <li><span className="step-number">3</span><h3>Confirme e comece a usar</h3><p>No pareamento por código, compare a faixa de verificação. Aprove o pedido no PC e abra a ferramenta que quiser.</p></li>
  </ol></section>
}

function Comparison() {
  const [rival, setRival] = useState<'remote' | 'unified' | 'phone'>('remote')
  const names = { remote: 'TeamViewer / AnyDesk', unified: 'Unified Remote', phone: 'Vínculo com Celular' }
  return <section className="section comparison-section" id="comparar"><div className="shell"><div className="section-title"><h2>Escolha o controle<br />que faz sentido para você.</h2><p>Quer usar o PC pelo celular dentro de casa? Compare as opções pelo que elas realmente oferecem.</p></div>
    <label className="comparison-select">Comparar PC Remote com<select value={rival} onChange={e => setRival(e.target.value as typeof rival)}><option value="remote">TeamViewer / AnyDesk</option><option value="unified">Unified Remote</option><option value="phone">Vínculo com Celular</option></select></label>
    <div className="table-wrap"><table><caption className="sr-only">Comparativo de finalidade, rede, conta, preço e plataformas</caption><thead><tr><th scope="col">O que muda</th><th scope="col" className="pc-column">PC Remote</th><th scope="col">TeamViewer / AnyDesk</th><th scope="col">Unified Remote</th><th scope="col">Vínculo com Celular</th></tr></thead><tbody>{comparison.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td className="pc-column">{row.pc}</td><td>{row.remote}</td><td>{row.unified}</td><td>{row.phone}</td></tr>)}</tbody></table></div>
    <div className="comparison-cards" aria-label={`PC Remote comparado com ${names[rival]}`}>{comparison.map(row => <article key={row.label}><h3>{row.label}</h3><div className="comparison-answer our-answer"><span>PC Remote</span><p><Check size={17} />{row.pc}</p></div><div className="comparison-answer"><span>{names[rival]}</span><p>{row[rival]}</p></div></article>)}</div>
    <p className="comparison-note">TeamViewer e AnyDesk também oferecem conexão LAN. O Unified Remote também funciona localmente. A escolha depende do uso e da edição.</p>
    <details className="sources"><summary>Fontes e critérios do comparativo</summary><p>Resumo da documentação oficial consultada em 17/10/2026. Recursos e condições podem mudar. Não comparamos RAM ou coleta de dados sem uma medição equivalente.</p><div>{comparisonSources.map(([label, url]) => <a href={url} key={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14} /></a>)}</div></details>
  </div></section>
}

function Security() {
  return <section className="section shell security-section" id="seguranca"><div className="section-title"><h2>Você autoriza o acesso.<br />Você decide quando parar.</h2><p>Aprove o celular no computador. Se precisar, um clique interrompe mouse, teclado e energia.</p></div><div className="security-layout"><figure className="security-shot"><Screenshot name="security" width={1000} height={767} alt="Mouse, teclado e energia bloqueados no PC após usar Interromper" /><figcaption><MagnifyingGlassPlus size={15} />Toque para ver o botão “Interromper” no app real.</figcaption></figure><div className="security-points">
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

function Downloads() {
  return <section className="section downloads-section" id="downloads"><div className="shell"><div className="section-title"><p className="eyebrow">Windows ou Ubuntu + Android</p><h2>Baixe grátis.<br />Controle seu PC.</h2><p>Instale nos dois aparelhos, conecte à mesma rede e comece a usar.</p></div><div className="download-grid">
    <article className="download-card"><div className="download-top"><WindowsLogo size={30} /><span>1. Instale no PC</span></div><div className="download-heading"><h3>PC Remote para Windows</h3><span>Mouse, mídia, arquivos e energia.</span></div><p>Windows 10 (1809+) e 11 · x64<br />Instalador .exe · v0.6.4</p><a className="button" href={links.windows}><DownloadSimple size={19} />Baixar para Windows</a><a className="release-link" href={links.windowsRelease} target="_blank" rel="noreferrer">Ver release oficial <ArrowUpRight size={14} /></a><HashControl value={hashes.windows} platform="Windows" /></article>
    <article className="download-card"><div className="download-top"><AndroidLogo size={30} /><span>2. Instale no celular</span></div><div className="download-heading"><h3>PC Remote para Android</h3><span>Seu controle, pronto para conectar.</span></div><p>Android 7 ou superior · APK universal<br />App nativo · v0.6.5-kotlin</p><a className="button secondary" href={links.android}><DownloadSimple size={19} />Baixar APK Android</a><a className="release-link" href={links.androidRelease} target="_blank" rel="noreferrer">Ver release oficial <ArrowUpRight size={14} /></a><HashControl value={hashes.android} platform="Android" /></article>
    <aside className="qr-download"><img src="/android-apk-qr.svg" width="144" height="144" loading="lazy" alt="QR code com o link direto para baixar o APK oficial no Android" /><h3>Está no computador?</h3><p>Aponte a câmera do celular para baixar o APK.</p></aside>
  </div><div className="install-notes"><p><strong>Versão de avaliação.</strong> O Windows pode exibir um aviso do SmartScreen; o instalador ainda não tem Authenticode. O APK usa chave debug e o Android solicita autorização para instalar dessa fonte.</p><a href={links.installation} target="_blank" rel="noreferrer">Guia de instalação Windows <ArrowUpRight size={16} /></a></div>
    <aside className="linux-download" id="ubuntu-download" aria-labelledby="ubuntu-download-title">
      <LinuxLogo size={30} aria-hidden="true" />
      <div className="linux-copy">
        <h3 id="ubuntu-download-title">Ubuntu 22.04, 24.04 e 26.04 LTS</h3>
        <p>Pacote .deb para PC amd64 · aplicativo v0.6.4. Instale com as dependências necessárias, sem compilar.</p>
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
    </aside></div></section>
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
  return <section className="section shell faq-section" id="faq"><div className="faq-heading"><h2>Antes de baixar.</h2><p>O que você precisa saber para começar.</p><a className="text-link" href={links.installation} target="_blank" rel="noreferrer">Ler a documentação <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="shell"><div className="footer-main"><div><Brand /><p>Seu PC, mais perto.<br />Mesmo quando você está no sofá.</p></div><div className="footer-links"><a href={links.desktopRepo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a><a href={links.protocol} target="_blank" rel="noreferrer">Protocolo <ArrowUpRight size={14} /></a><a href={links.changelog} target="_blank" rel="noreferrer">Changelog <ArrowUpRight size={14} /></a><a href={links.releases} target="_blank" rel="noreferrer">Releases <ArrowUpRight size={14} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PC Remote</span><span>Gratuito e de código aberto.</span><a href="#top">Voltar ao início ↑</a></div></div></footer>
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
  return visible ? <aside className="mobile-download-bar" aria-label="Download rápido"><div><strong>PC Remote é grátis</strong><span>PC + Android</span></div><a className="button small" href="#downloads">Baixar os apps <ArrowDown size={17} /></a></aside> : null
}

export default function App() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><Features /><Benefits /><HowItWorks /><Comparison /><Security /><Downloads /><Faq /></main><Footer /><MobileDownloadBar /></>
}
