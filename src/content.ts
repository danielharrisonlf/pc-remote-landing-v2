export const versions = { windows: '0.6.5', android: '0.6.6', linux: '0.6.4' }

export const links = {
  windows: `https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v${versions.windows}/pc-remote-desktop-${versions.windows}-x64-setup.exe`,
  windowsRelease: `https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v${versions.windows}`,
  android: `https://github.com/danielharrisonlf/pc-remote-android/releases/download/v${versions.android}-kotlin/pc-remote-android-kotlin-${versions.android}-evaluation.apk`,
  androidRelease: `https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v${versions.android}-kotlin`,
  desktopRepo: 'https://github.com/danielharrisonlf/pc-remote-desktop',
  protocol: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/PROTOCOL.md',
  security: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/SECURITY-AUDIT.md',
  releases: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases',
  changelog: `https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/releases/${versions.windows}.md`,
  installation: 'https://github.com/danielharrisonlf/pc-remote-desktop#baixar-e-instalar--windows-065',
  linux: `https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v${versions.linux}-ubuntu.1/pc-remote-desktop-${versions.linux}-amd64.deb`,
  linuxBundle: `https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v${versions.linux}-ubuntu.1/pc-remote-ubuntu-${versions.linux}-amd64.tar.gz`,
  linuxRelease: `https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v${versions.linux}-ubuntu.1`,
  linuxGuide: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/UBUNTU.md',
}
export const hashes = {
  windows: 'b8b7e997586e19c164945c05a47cebd3f224c64f6abb97d483b23dab3817fb91',
  android: '10c9935a03aca15245f6a4d2cb3fa3f30ece9b32a3e5873f086acb80766fd7c1',
  linux: '591407a13b30059fd3309d5687fcb897fc8cd6263916563da44c1a9bde91dea4',
}
export const comparison: { label: string; chip?: string; pc: string; remote: string; unified: string; phone: string }[] = [
  { label: 'Feito para', pc: 'Controlar o PC pelo Android', remote: 'Acessar e operar uma sessão remota', unified: 'Usar o celular como controle', phone: 'Usar funções do celular no PC' },
  { label: 'Conexão local', chip: 'Só na rede local', pc: 'LAN por padrão, sem internet', remote: 'Modo LAN disponível; depende de configuração', unified: 'Servidor local na rede', phone: 'Wi-Fi e Bluetooth, conforme o recurso' },
  { label: 'Conta para começar', chip: 'Sem conta', pc: 'Não precisa', remote: 'Varia por produto e modo de conexão', unified: 'Não exige conta de nuvem no uso local', phone: 'Conta Microsoft' },
  { label: 'Modelo de uso', chip: 'Código aberto', pc: 'Gratuito e código aberto', remote: 'Uso pessoal e planos pagos; consulte as condições', unified: 'Free e Full com compra única', phone: 'Incluído no Windows' },
  { label: 'Computador', pc: 'Windows; Ubuntu 22.04, 24.04 e 26.04 LTS (.deb)', remote: 'Windows, macOS e Linux', unified: 'Windows, macOS e Linux', phone: 'Windows' },
  { label: 'Pareamento', chip: 'Aprovação no PC', pc: 'QR ou código + confirmação no PC', remote: 'ID, permissões e modos de acesso', unified: 'Servidor local; senha configurável', phone: 'QR e conta Microsoft' },
]
export const comparisonSources = [
  ['TeamViewer: uso pela LAN', 'https://www.teamviewer.com/apac/global/support/knowledge-base/teamviewer-remote/remote-control/use-teamviewer-remote-in-lan/'],
  ['AnyDesk: conexão local', 'https://support.anydesk.com/docs/anydesk-is-slow-despite-having-a-lan-connection'],
  ['Unified Remote: recursos e edições', 'https://www.unifiedremote.com/features'],
  ['Unified Remote: segurança local', 'https://help.unifiedremote.com/article/15-can-anyone-access-my-computer'],
  ['Microsoft: requisitos do Vínculo com Celular', 'https://support.microsoft.com/en-gb/windows/apps/phonelink/phone-link-requirements-and-setup'],
]
