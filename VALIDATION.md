# Verificação do redesign

Verificação local em 18/10/2026, sobre o build de produção servido pelo Vite Preview.

## Checks

- `npm run build`: TypeScript, build Vite, build de renderização e geração de HTML estático aprovados.
- `npm run lint`: aprovado.
- `git diff --check`: aprovado.
- Auditoria visual anterior em 375, 390, 768 e 1280 px: identificou screenshots pequenas, abas ilegíveis, comparativo denso e texto Linux comprimido. Correções registradas em `DESIGN.md`.
- Cinco ferramentas com painel e imagem correspondentes; seletor nativo mobile e tabs desktop com setas, Home e End.
- Matriz Playwright de 24 cenários: claro e escuro em 320, 375, 390, 640, 767, 768, 1000, 1024, 1099, 1100, 1280 e 1920 px. Zero falhas, overflow ou erros de JavaScript. Menu (Escape e clique fora), seletores, hashes expandidos, modal ajustado/original e CTA móvel verificados.
- Menu mobile, links âncora, comparação mobile, perguntas expansíveis e URLs de downloads verificados.
- Imagens reais otimizadas para WebP, com texto alternativo e dimensões; fonte Geist local.
- HTML sem dependência de JS para conteúdo inicial; sem telemetria ou requisições de terceiros para renderizar.
- Axe Core WCAG 2 A/AA e 2.1 AA em 375 e 1280 px, claro e escuro, página e imagem ampliada: zero violações automatizadas nas oito combinações. Não substitui avaliação humana completa.
- Tema aplicado antes da primeira pintura, com preferência persistida; fallback funcional quando armazenamento não está disponível.
- Preferência do sistema, mudança de preferência do sistema, persistência após reload, sincronização entre abas e armazenamento bloqueado verificados em `theme-behavior.json`.

## Lighthouse mobile

| Categoria | Score |
| --- | ---: |
| Performance | 98 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

LCP: 2,3 s. CLS: inferior a 0,001. Medição de laboratório local, não garantia de resultado em todas as redes ou aparelhos. Não representa dados reais de usuários.

Relatório bruto e evidências de navegador desta revisão estão no workspace pai em `../artifacts/landing-refinement/`: `lighthouse-mobile.json`, `axe-review.json`, capturas e verificações independentes. A evidência anterior permanece em `../artifacts/landing-redesign/`. Esses arquivos não fazem parte do bundle público.

## Limites de produto preservados na copy

- O app não transmite a tela nem permite acesso externo à LAN.
- O Android restringe clipboard em segundo plano e nem todos os players aceitam todas as ações.
- A versão publicada ainda é de avaliação; APK debug e EXE sem Authenticode.
- Ubuntu com `.deb` amd64 e instalador compactado publicados como pré-release; validação em um desktop GNOME Wayland real pendente.
- Comparativo usa documentação oficial e não afirma que concorrentes dependem sempre da nuvem.

## Atualização dos downloads Ubuntu, 18/10/2026

- `npm run lint`, `npm run build` (TypeScript, cliente, SSR e HTML estático) e `git diff --check` aprovados.
- Oito cenários Playwright sobre o build de produção: 320, 390, 768 e 1280 px, nos temas claro e escuro, sem overflow horizontal ou erros de JavaScript.
- Âncora do hero para Ubuntu, URLs exatas do `.deb` e `.tar.gz`, comando `bash install-ubuntu.sh`, hash expandido e FAQ Ubuntu verificados.
- Hash do `.deb` conferido com a release pública: `591407a13b30059fd3309d5687fcb897fc8cd6263916563da44c1a9bde91dea4`.
- Capturas do bloco Ubuntu em 390 e 1280 px, claro e escuro, inspecionadas. O texto apresenta a pré-release e a pendência de validação em GNOME Wayland real.
- Evidências em `../artifacts/landing-ubuntu/browser-checks.json`, `qa-final.log` e capturas correspondentes. O navegador Orca perdeu a conexão durante a primeira inspeção; a verificação foi concluída em Chromium pelo Playwright.

As métricas Lighthouse e a matriz Axe acima pertencem ao redesign anterior; não foram medidas novamente para esta alteração de conteúdo e downloads.

## Mobile, zoom e domínio, 19/10/2026

- `npm run lint`, `npm run build` (TypeScript, cliente, SSR e HTML estático) e `git diff --check` aprovados. O build cliente transforma 84 módulos com imports de ícones individuais; nenhuma dependência de aplicativo foi adicionada.
- Auditoria inicial da página publicada e local em 320, 360, 390, 440, 768, 1024 e 1440 px: o recorte horizontal da captura enviada não foi reproduzido. A primeira captura do app se estendia abaixo da dobra; isso não era perda de conteúdo.
- A validação adicional identificou problemas reproduzíveis: `min-width: 320px` impedia reflow em viewport CSS de 220 px; o guia de instalação usava `nowrap`; e os rótulos do menu em duas colunas eram cortados com texto ampliado. Corrigidos com largura flexível, quebra de texto e menu mobile em uma coluna.
- Matriz Chromium/Playwright do candidato: sete larguras (320/360/390/440/768/1024/1440), claro e escuro, sem overflow de documento nem erros de JavaScript. Preview de produção com HTML inicial antes do JavaScript, sem erro de hidratação em 320/440/1024, nos dois temas.
- Regressão final após os ajustes: 440/1440 claro e escuro; 220 × 478 CSS com DPR 2 (simulação do reflow de uma área física de 440 × 956 a 200%); texto ampliado a 200% em 320 e 440, com estilos-base capturados antes da alteração. Sem corte horizontal, sobreposição da marca ou controles fora da viewport. O menu, Escape e restauração de foco passaram também nesses casos.
- Hero de 848 px em viewport 440 × 956, abaixo do cabeçalho de 69 px: captura real inteira e downloads visíveis. O conteúdo continua rolável nas telas menores; não ocultamos overflow do documento para passar no teste.
- Menu (Escape e clique fora), seletor de funcionalidades, tabs com setas/Home/End, modal com fechamento por botão/Escape e foco devolvido, temas persistidos, cópia dos três hashes e links de download conferidos.
- Downloads APK 0.6.5, Windows, `.deb` e `.tar.gz` responderam HTTP 200. O APK Android tem 726.185 bytes e SHA-256 `55480613150f71cdb90a82fba7acef278a8ab0f40492dfedd09432e0993d9197`. QR regenerado para o mesmo link; SVG carregado corretamente, visível no desktop e oculto no mobile. O payload do QR não foi decodificado independentemente nesta rodada.
- Revisão estática independente aprovou CSS, SSR, imports de ícones, versão/hash e redirecionamento condicionado ao host antigo. Canonical, Open Graph, robots e sitemap apontam para `pc-remote-app.vercel.app`.
- Evidências desta rodada: `../artifacts/qa/landing-mobile/` (matrizes, screenshots, fluxos, logs de build e lint). As medições Lighthouse e Axe históricas acima não foram repetidas; não são resultados deste refinamento. A emulação não substitui testes em todos os celulares físicos.
- Semantica indisponível; memória durável não registrada.