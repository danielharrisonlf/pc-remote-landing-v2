import { useState } from 'react'

const links = {
  windows: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v0.6.4/pc-remote-desktop-0.6.4-x64-setup.exe',
  windowsRelease: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4',
  android: 'https://github.com/danielharrisonlf/pc-remote-android/releases/download/v0.6.3-kotlin/pc-remote-android-kotlin-0.6.3-evaluation.apk',
  androidRelease: 'https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v0.6.3-kotlin',
  desktopRepo: 'https://github.com/danielharrisonlf/pc-remote-desktop',
  protocol: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/PROTOCOL.md',
  security: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/SECURITY-AUDIT.md',
  releases: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases',
}
const hashes = {
  windows: '3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c',
  android: '673890551e02d89f5b8448ab0cf25b0500a9416782d4c102299b6c0347fea3f9',
}

const comparison = [
  { name: 'Controle pela LAN sem internet', pc: 'Sim', remote: 'Acesso remoto pela internet; LAN direta também pode ser usada', unified: 'Sim, servidor local', phone: 'Mesma rede Wi-Fi necessária' },
  { name: 'Conta para parear em casa', pc: 'Não', remote: 'Opcional em conexões diretas', unified: 'Não para uso local', phone: 'Conta Microsoft' },
  { name: 'Mouse, teclado e mídia', pc: 'Sim', remote: 'Controle da sessão remota', unified: 'Sim', phone: 'Recursos de telefone e notificações' },
  { name: 'Verificação visual da conexão', pc: 'Código temporário + faixa SAS', remote: 'ID e permissões de acesso', unified: 'Senha de acesso', phone: 'QR vinculado à conta' },
  { name: 'Desktop para Linux', pc: 'Ubuntu', remote: 'Sim', unified: 'Sim', phone: 'Não' },
  { name: 'Preço', pc: 'Gratuito e código aberto', remote: 'Planos variam; uso pessoal pode ser gratuito', unified: 'Versões Free e Pro', phone: 'Gratuito com Windows' },
]

const rivals = [
  { id: 'remote', name: 'TeamViewer / AnyDesk' },
  { id: 'unified', name: 'Unified Remote' },
  { id: 'phone', name: 'Phone Link' },
] as const

const features = [
  { n: '01', title: 'Touchpad que responde', text: 'Deslize, toque, role e digite pelo Android. O PC recebe ações de entrada tipadas pela rede local; não é preciso transmitir a tela inteira.' },
  { n: '02', title: 'Arquivos de um lado ao outro', text: 'Envie arquivos de até 1 GB em blocos de 64 KiB. O recebimento confere SHA-256 e preserva o aviso do SmartScreen no Windows.' },
  { n: '03', title: 'Área de transferência ao vivo', text: 'Texto e imagens copiados podem sincronizar nos dois sentidos. O conteúdo não vira histórico em disco.' },
  { n: '04', title: 'Mídia e volume no mesmo lugar', text: 'Controle o player ativo no Windows ou Linux. Busque uma música no YouTube e abra no navegador padrão.' },
  { n: '05', title: 'Energia com confirmação', text: 'Bloqueie, suspenda ou desligue agora ou mais tarde. O PC avisa antes; programas não são fechados à força.' },
]

const colors = ['#f6cf52', '#e97455', '#c75a9c', '#7658c4', '#4183d0', '#37a990', '#9dbb50', '#e99f43']

function Brand() {
  return <a className="brand" href="#top" aria-label="PC Remote, início"><img src="/brand/symbol.svg" width="36" height="36" alt="" /><span>PC Remote</span></a>
}

function HashControl({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  async function copyHash() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return <div className="hash-control"><div><span>SHA-256</span><button onClick={copyHash} type="button" aria-live="polite">{copied ? 'Copiado' : 'Copiar hash'}</button></div><code>{value}</code></div>
}

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="header-inner"><Brand /><nav className={open ? 'nav nav-open' : 'nav'} aria-label="Navegação principal">
    <a href="#recursos" onClick={() => setOpen(false)}>Recursos</a><a href="#comparar" onClick={() => setOpen(false)}>Comparar</a><a href="#seguranca" onClick={() => setOpen(false)}>Segurança</a><a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
  </nav><div className="header-actions"><a className="source-link" href={links.desktopRepo} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a className="button button-small" href="#downloads">Baixar grátis <span aria-hidden="true">↘</span></a></div><button className="menu-button" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? 'Fechar' : 'Menu'}</button></div></header>
}

function DeviceDemo() {
  const [paired, setPaired] = useState(false)
  return <div className="demo-wrap" aria-label="Prévia ilustrativa do pareamento local">
    <div className="demo-index"><span>SESSÃO LOCAL</span><span>01 / 02</span></div>
    <div className="demo-scene">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="demo-word" aria-hidden="true">LAN</div>
      <div className="screen-frame">
        <div className="screen-top"><span className="window-dots"><i /><i /><i /></span><span>PC REMOTE <b>·</b> WINDOWS</span><span className="online-dot">LOCAL</span></div>
        <div className="screen-body"><div className="screen-aside"><span className="aside-mark">PR</span><span className="aside-line active" /><span className="aside-line" /><span className="aside-line" /><span className="aside-line short" /></div>
          <div className="screen-content"><div className="screen-greeting">Dispositivos</div><div className="screen-pc"><div className="pc-glyph"><span /></div><div><strong>DESKTOP-DANI</strong><small>Pronto para parear · Wi-Fi local</small></div><span className="signal">●</span></div><div className="screen-code-label">CÓDIGO TEMPORÁRIO</div><div className="screen-code">48 <span>—</span> 26 <span>—</span> 91 <span>—</span> 07</div><div className="fingerprint" aria-label="Faixa ilustrativa de verificação com oito cores">{colors.map((color, i) => <i key={i} style={{ backgroundColor: color }} />)}</div><div className="screen-foot"><span>TCP · 43127</span><span>SEM RELAY</span></div></div>
        </div>
        <div className="screen-stand"><i /></div>
      </div>
      <div className="phone-frame"><div className="phone-speaker" /><div className="phone-ui"><div className="phone-status"><span>9:41</span><span>●●●  Wi-Fi</span></div><div className="phone-kicker">PC REMOTE</div><strong>Confirme<br />o pareamento</strong><p>Compare as cores com a tela do computador.</p><div className="phone-code">48 26 91 07</div><div className="fingerprint phone-fingerprint" aria-hidden="true">{colors.map((color, i) => <i key={i} style={{ backgroundColor: color }} />)}</div><button className={paired ? 'pair-button paired' : 'pair-button'} onClick={() => setPaired(!paired)}>{paired ? 'Conexão aprovada ✓' : 'As cores conferem'}</button></div></div>
      <div className="connector" aria-hidden="true"><span /><span /><span /></div>
    </div>
    <div className="demo-caption"><span>MESMO CÓDIGO. MESMA REDE.</span><span>SEM SERVIDOR NO MEIO</span></div>
  </div>
}

function Hero() {
  return <section className="hero page-shell" id="top"><div className="hero-copy"><p className="eyebrow"><span className="live-mark" /> NOVO · VERSÃO 0.6.4 <span className="eyebrow-divider">/</span> CÓDIGO ABERTO</p><h1>Seu computador.<br /><em>Sua rede.</em><br />Seu controle.</h1><p className="hero-lede">O Android vira touchpad, teclado e controle de mídia para o seu PC. A conexão acontece na sua rede local, sem conta e sem mensalidade.</p><div className="hero-ctas"><a className="button button-primary" href={links.windows}>Baixar para Windows <span className="button-meta">.EXE · X64</span><span aria-hidden="true">↗</span></a><a className="text-cta" href="#downloads">Android e Linux <span aria-hidden="true">↓</span></a></div><p className="hero-note">Grátis para usar <span>·</span> Sem cadastro <span>·</span> Windows + Ubuntu</p></div><DeviceDemo /><div className="hero-bottom"><span>CONTROLE LOCAL, SEM INTERMEDIÁRIOS</span><span>01 — PARA QUEM JÁ ESTÁ NA MESMA REDE</span></div></section>
}

function ProofLine() {
  return <section className="proof-line" aria-label="Resumo técnico"><div className="proof-inner"><div><span className="proof-number">~25–40</span><span className="proof-unit">MB RAM</span><small>desktop nativo em Rust</small></div><div><span className="proof-number">100%</span><span className="proof-unit">LAN</span><small>controle sem internet</small></div><div><span className="proof-number">8</span><span className="proof-unit">CORES</span><small>verificação visual do par</small></div><div className="proof-engine"><span>TAURI V2 <b>+</b> RUST</span><small>Windows · Linux Ubuntu</small></div></div></section>
}

function Features() {
  return <section className="section page-shell" id="recursos"><div className="section-heading"><p className="eyebrow">02 / FEITO PARA O DIA A DIA</p><h2>As coisas que você<br /><em>faz no computador.</em></h2><p className="section-intro">Sem compartilhar a tela inteira. Sem montar um servidor remoto. Abra o app e use o celular como controle.</p></div><div className="feature-list">{features.map(item => <article className="feature-row" key={item.n}><span className="feature-number">{item.n}</span><h3>{item.title}</h3><p>{item.text}</p><span className="feature-arrow" aria-hidden="true">↗</span></article>)}</div><div className="panic-strip"><div className="panic-light" /><div><strong>Um botão físico para interromper.</strong><span>No PC, “Interromper” desarma mouse, teclado e energia na hora. Você libera de novo no próprio computador.</span></div><span className="panic-label">SEMPRE SOB SEU CONTROLE</span></div></section>
}

function Comparison() {
  const [rival, setRival] = useState<(typeof rivals)[number]['id']>('remote')
  const key = rival as 'remote' | 'unified' | 'phone'
  return <section className="comparison-section" id="comparar"><div className="page-shell section"><div className="section-heading comparison-heading"><p className="eyebrow">03 / ESCOLHA PELO SEU USO</p><h2>Não é acesso remoto.<br /><em>É controle em casa.</em></h2><p className="section-intro">Ferramentas diferentes resolvem problemas diferentes. Esta comparação destaca como cada uma conecta os dispositivos.</p></div><div className="compare-mobile"><label htmlFor="compare-select">Comparar PC Remote com</label><select id="compare-select" value={rival} onChange={e => setRival(e.target.value as typeof rival)}>{rivals.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><div className="compare-mobile-head"><span>CRITÉRIO</span><span>PC REMOTE</span><span>{rivals.find(item => item.id === rival)?.name}</span></div>{comparison.map(row => <div className="compare-mobile-row" key={row.name}><strong>{row.name}</strong><span>{row.pc}</span><span>{row[key]}</span></div>)}</div><div className="compare-table-wrap"><table className="compare-table"><thead><tr><th>CRITÉRIO</th><th className="pc-col"><img src="/brand/symbol.svg" alt="" width="23" height="23" /> PC REMOTE</th><th>TEAMVIEWER / ANYDESK</th><th>UNIFIED REMOTE</th><th>PHONE LINK</th></tr></thead><tbody>{comparison.map(row => <tr key={row.name}><th scope="row">{row.name}</th><td className="pc-col"><span className="check">✓</span>{row.pc}</td><td>{row.remote}</td><td>{row.unified}</td><td>{row.phone}</td></tr>)}</tbody></table></div><p className="compare-footnote">Recursos e requisitos podem variar por versão, sistema e plano. <a href={links.desktopRepo} target="_blank" rel="noreferrer">Veja o projeto no GitHub ↗</a></p></div></section>
}

function HowItWorks() {
  return <section className="section page-shell how-section"><div className="section-heading"><p className="eyebrow">04 / EM TRÊS PASSOS</p><h2>Perto. Pareado.<br /><em>Pronto.</em></h2></div><ol className="steps"><li><span>01</span><div><h3>Instale os dois apps</h3><p>PC no Windows ou Ubuntu. Celular no Android.</p></div></li><li><span>02</span><div><h3>Conecte à mesma rede</h3><p>Leia o QR ou digite o código de oito números no celular.</p></div></li><li><span>03</span><div><h3>Confira a faixa de cores</h3><p>Se as oito cores forem iguais às do PC, aprove o pareamento. A chave fica protegida no dispositivo.</p></div></li></ol></section>
}

function Security() {
  return <section className="security-section" id="seguranca"><div className="page-shell security-layout"><div><p className="eyebrow">05 / PRIVACIDADE NA ARQUITETURA</p><h2>O caminho mais curto<br />é entre <em>seus aparelhos.</em></h2><p className="security-lede">O desktop aceita controle autenticado na rede local pela TCP 43127. A descoberta pode usar mDNS na UDP 5353. Nada é encaminhado por servidores durante o controle.</p><a className="text-cta" href={links.security} target="_blank" rel="noreferrer">Ler a auditoria de segurança <span aria-hidden="true">↗</span></a></div><ul className="security-points"><li><span>01</span><div><strong>Sem conta, sem telemetria do app</strong><p>O conteúdo da área de transferência não é salvo como histórico em disco.</p></div></li><li><span>02</span><div><strong>Chave protegida pelo Windows</strong><p>Identidade TLS e credenciais usam DPAPI na conta atual do usuário.</p></div></li><li><span>03</span><div><strong>Sem shell remoto</strong><p>O protocolo aceita ações definidas; não oferece terminal, PowerShell ou bash remoto.</p></div></li><li><span>04</span><div><strong>Sem privilégio de administrador</strong><p>Roda na sessão comum do usuário e não instala driver de kernel.</p></div></li><li><span>05</span><div><strong>Atualizações assinadas</strong><p>A assinatura Ed25519 é verificada antes de instalar uma versão nova.</p></div></li></ul></div></section>
}

function Downloads() {
  return <section className="section page-shell downloads-section" id="downloads"><div className="download-head"><div><p className="eyebrow">06 / ESCOLHA SEU DISPOSITIVO</p><h2>Baixe. Instale.<br /><em>Use na sua rede.</em></h2></div><p>Downloads oficiais do GitHub, sem formulário e sem cadastro.</p></div><div className="download-grid"><article className="download-card download-main"><div className="download-topline"><span>PC · WINDOWS</span><span>V0.6.4</span></div><h3>Desktop</h3><p>Instalador x64 para Windows 10 e 11. Sessão de usuário, sem exigir administrador.</p><a className="button button-primary" href={links.windows}>Baixar .EXE <span aria-hidden="true">↗</span></a><a className="release-link" href={links.windowsRelease} target="_blank" rel="noreferrer">Release oficial <span>↗</span></a><HashControl value={hashes.windows} /></article><article className="download-card android-card"><div className="download-topline"><span>CELULAR · ANDROID</span><span>V0.6.3-KOTLIN</span></div><h3>Android</h3><p>APK universal nativo. Android 7 ou superior. Leitor QR incluído.</p><div className="android-action"><div><a className="button button-secondary" href={links.android}>Baixar APK <span aria-hidden="true">↗</span></a><a className="release-link" href={links.androidRelease} target="_blank" rel="noreferrer">Release oficial <span>↗</span></a></div><div className="qr-wrap"><img src="/android-apk-qr.svg" width="82" height="82" alt="QR code para baixar o APK Android" /><span>APONTE A CÂMERA</span></div></div><HashControl value={hashes.android} /></article><article className="download-card linux-card"><div className="download-topline"><span>PC · LINUX</span><span>UBUNTU 22.04+</span></div><h3>Linux</h3><p>Build para Ubuntu 22.04 e 24.04 LTS. Código e instruções no repositório desktop.</p><a className="text-cta" href={`${links.desktopRepo}#compilação-e-empacotamento-no-linux-ubuntu-2204--2404-lts`} target="_blank" rel="noreferrer">Ver instruções <span>↗</span></a></article></div><p className="download-disclaimer">O APK Android é uma build de avaliação assinada com chave debug. Confira os hashes publicados nas releases.</p></section>
}

function Faq() {
  const items = [
    ['Preciso de internet para usar?', 'Não para controlar o PC. Os dois aparelhos precisam estar na mesma rede Wi-Fi ou LAN. Atualizações do app consultam as releases do GitHub.'],
    ['O que o PC Remote consegue controlar?', 'Mouse, teclado, mídia, volume, área de transferência, arquivos e ações de energia compatíveis. Não transmite a tela do computador.'],
    ['Como sei que pareei com o dispositivo certo?', 'Aprove o pedido no computador e confira o código de oito dígitos e a faixa de cores derivada da impressão digital SHA-256 do certificado TLS. Isso ajuda a detectar uma conexão diferente da esperada, mas não elimina todos os riscos de rede.'],
    ['Preciso abrir portas no roteador?', 'Não. O app não configura UPnP nem encaminhamento de portas. O controle usa TCP 43127 na rede local; a descoberta opcional usa mDNS/UDP 5353.'],
    ['O app precisa de administrador?', 'Não. O desktop funciona na sessão do usuário. O firewall pode pedir autorização para redes privadas na primeira execução.'],
  ]
  return <section className="faq-section" id="faq"><div className="page-shell faq-layout"><div><p className="eyebrow">07 / PERGUNTAS DIRETAS</p><h2>Antes de<br /><em>instalar.</em></h2></div><div className="faq-list">{items.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="page-shell footer-main"><Brand /><p>Controle o que é seu.<br /><span>Na sua rede, do seu jeito.</span></p><div className="footer-links"><a href={links.desktopRepo} target="_blank" rel="noreferrer">GitHub ↗</a><a href={links.protocol} target="_blank" rel="noreferrer">Protocolo ↗</a><a href={links.releases} target="_blank" rel="noreferrer">Releases ↗</a></div></div><div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} PC Remote · Código aberto</span><span>FEITO PARA FICAR NA SUA REDE</span></div></footer>
}

export default function App() {
  return <><Header /><main><Hero /><ProofLine /><Features /><Comparison /><HowItWorks /><Security /><Downloads /><Faq /></main><Footer /></>
}
