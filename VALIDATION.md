# Verificação do redesign

Verificação local em 17/10/2026, sobre o build de produção servido pelo Vite Preview.

## Checks

- `npm run build`: TypeScript, build Vite, build de renderização e geração de HTML estático aprovados.
- `npm run lint`: aprovado.
- `git diff --check`: aprovado.
- Playwright independente em 375, 768, 1280 e 1920 px: sem overflow horizontal global.
- Cinco ferramentas com painel e imagem correspondentes; teclado com setas, Home e End.
- Menu mobile, links âncora, comparação mobile, perguntas expansíveis e URLs de downloads verificados.
- Imagens reais otimizadas para WebP, com texto alternativo e dimensões; fonte Geist local.
- HTML sem dependência de JS para conteúdo inicial; sem telemetria ou requisições de terceiros para renderizar.

## Lighthouse mobile

| Categoria | Score |
| --- | ---: |
| Performance | 97 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

LCP: 2,4 s. CLS: 0. Medição de laboratório local, não garantia de resultado em todas as redes ou aparelhos. Não representa dados reais de usuários.

Relatório bruto e evidências de navegador estão no workspace pai em `../artifacts/landing-redesign/`: `lighthouse-mobile-final.json`, `qa-independent-results-prod.json` e capturas de responsividade. Não fazem parte do bundle público.

## Limites de produto preservados na copy

- O app não transmite a tela nem permite acesso externo à LAN.
- O Android restringe clipboard em segundo plano e nem todos os players aceitam todas as ações.
- A versão publicada ainda é de avaliação; APK debug e EXE sem Authenticode.
- Linux via código; pacote .deb não publicado.
- Comparativo usa documentação oficial e não afirma que concorrentes dependem sempre da nuvem.
