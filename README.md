# PC Remote | Landing page

Landing page do PC Remote em React 19, TypeScript e Vite. A apresentação usa benefícios, capturas reais ampliáveis, exploração de funcionalidades por teclado, comparação documentada e downloads diretos. Inclui temas claro/escuro com preferência persistida e layouts específicos para mobile.

## Desenvolvimento

```powershell
npm ci
npm run dev
```

## Verificação e build

```powershell
npm run lint
npm run build
npm run preview
```

## Conteúdo e assets

- `src/content.ts`: downloads, hashes SHA-256 e fontes do comparativo.
- `src/App.tsx`: seções e interações acessíveis.
- `src/index.css`: tokens, layout responsivo e redução de movimento.
- `public/screenshots/sources.json`: procedência das capturas reais.
- `DESIGN.md`: auditoria, direção e decisões do redesign.

O build gera HTML estático com React no servidor e hidrata as interações no navegador. Conteúdo inicial, links e imagens já estão presentes no HTML entregue. Não há servidor de aplicação nem API de analytics.

As imagens vêm das evidências locais dos apps 0.6.0/0.6.1. Para regenerar os WebP, com os repositórios irmãos presentes: `node scripts/prepare-screenshots.mjs`. Não é necessário para construir ou publicar a landing: os assets otimizados estão versionados.

## Releases

- [Windows v0.6.4](https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4)
- [Android v0.6.5-kotlin](https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v0.6.5-kotlin)
- [Ubuntu v0.6.4-ubuntu.1](https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4-ubuntu.1)

Versões de avaliação: APK com chave debug e instalador Windows sem Authenticode. Ubuntu 22.04, 24.04 e 26.04 LTS com `.deb` amd64, instalador compactado e guia; a pré-release Ubuntu teve instalação e abertura validadas nas três LTS. A autorização e o controle em um desktop GNOME Wayland real permanecem pendentes. Os links diretos e o hash do `.deb` estão em `src/content.ts`.

## Publicação

Projeto Vercel existente `pc-remote-landing-v2`, conectado ao repositório separado da landing. Publicação pela CLI: `npx vercel --prod --yes`.

Endereço público: **https://pc-remote-app.vercel.app/**. O nome interno do projeto e do repositório foi mantido. `vercel.json` redireciona o host antigo para o novo, preservando os caminhos. Ao publicar a mudança de domínio pela primeira vez, ative o alias novo antes de promover o redirecionamento para produção.
