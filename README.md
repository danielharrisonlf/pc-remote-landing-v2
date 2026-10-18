# PC Remote | Landing page

Landing page do PC Remote em React 19, TypeScript e Vite. A apresentação usa benefícios, capturas reais dos aplicativos, exploração de funcionalidades por teclado, comparação documentada e downloads diretos.

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
- [Android v0.6.3-kotlin](https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v0.6.3-kotlin)

Versões de avaliação: APK com chave debug e instalador Windows sem Authenticode. Linux disponível por compilação, sem pacote publicado.

## Publicação

Projeto Vercel existente `pc-remote-landing-v2`, conectado ao repositório separado da landing. Publicação pela CLI: `npx vercel --prod --yes`.
