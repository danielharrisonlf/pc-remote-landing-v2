export const links = {
  windows: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v0.6.4/pc-remote-desktop-0.6.4-x64-setup.exe',
  windowsRelease: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4',
  android: 'https://github.com/danielharrisonlf/pc-remote-android/releases/download/v0.6.3-kotlin/pc-remote-android-kotlin-0.6.3-evaluation.apk',
  androidRelease: 'https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v0.6.3-kotlin',
  desktopRepo: 'https://github.com/danielharrisonlf/pc-remote-desktop',
  protocol: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/PROTOCOL.md',
  security: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/SECURITY-AUDIT.md',
  releases: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases',
  changelog: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/releases/0.6.4-ubuntu.1.md',
  installation: 'https://github.com/danielharrisonlf/pc-remote-desktop#baixar-e-instalar--windows-064',
  linux: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v0.6.4-ubuntu.1/pc-remote-desktop-0.6.4-amd64.deb',
  linuxBundle: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v0.6.4-ubuntu.1/pc-remote-ubuntu-0.6.4-amd64.tar.gz',
  linuxRelease: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4-ubuntu.1',
  linuxGuide: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/UBUNTU.md',
}
export const hashes = {
  windows: '3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c',
  android: '673890551e02d89f5b8448ab0cf25b0500a9416782d4c102299b6c0347fea3f9',
  linux: '591407a13b30059fd3309d5687fcb897fc8cd6263916563da44c1a9bde91dea4',
}
export const comparison = [
  { label: 'Feito para', pc: 'Controlar o PC pelo Android', remote: 'Acessar e operar uma sessão remota', unified: 'Usar o celular como controle', phone: 'Usar funções do celular no PC' },
  { label: 'Conexão local', pc: 'LAN por padrão, sem internet', remote: 'Modo LAN disponível; depende de configuração', unified: 'Servidor local na rede', phone: 'Wi-Fi e Bluetooth, conforme o recurso' },
  { label: 'Conta para começar', pc: 'Não precisa', remote: 'Varia por produto e modo de conexão', unified: 'Não exige conta de nuvem no uso local', phone: 'Conta Microsoft' },
  { label: 'Modelo de uso', pc: 'Gratuito e código aberto', remote: 'Uso pessoal e planos pagos; consulte as condições', unified: 'Free e Full com compra única', phone: 'Incluído no Windows' },
  { label: 'Computador', pc: 'Windows; Ubuntu 22.04, 24.04 e 26.04 LTS (.deb)', remote: 'Windows, macOS e Linux', unified: 'Windows, macOS e Linux', phone: 'Windows' },
  { label: 'Pareamento', pc: 'QR ou código + confirmação no PC', remote: 'ID, permissões e modos de acesso', unified: 'Servidor local; senha configurável', phone: 'QR e conta Microsoft' },
]
export const comparisonSources = [
  ['TeamViewer: uso pela LAN', 'https://www.teamviewer.com/apac/global/support/knowledge-base/teamviewer-remote/remote-control/use-teamviewer-remote-in-lan/'],
  ['AnyDesk: conexão local', 'https://support.anydesk.com/docs/anydesk-is-slow-despite-having-a-lan-connection'],
  ['Unified Remote: recursos e edições', 'https://www.unifiedremote.com/features'],
  ['Unified Remote: segurança local', 'https://help.unifiedremote.com/article/15-can-anyone-access-my-computer'],
  ['Microsoft: requisitos do Vínculo com Celular', 'https://support.microsoft.com/en-gb/windows/apps/phonelink/phone-link-requirements-and-setup'],
]
