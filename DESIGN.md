# PC Remote: apresentação do produto

## Direção

Redesign completo da apresentação para usuários domésticos de Android e Windows. A página explica tarefas e benefícios antes de detalhes de arquitetura. Sistema visual próprio em CSS, com a marca oficial preservada; não implementa um design system de terceiros.

Configuração da skill: DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 4. Layout variado, leitura familiar e animação apenas para indicar mudança da ferramenta selecionada. O tema escuro é uma restrição explícita do briefing.

## Auditoria do estado anterior

- Hero abstrato: “Seu computador. Sua rede. Seu controle.”
- Pareamento ilustrado em HTML ocupava o espaço de demonstração do produto.
- Faixa de cores e RAM estimada tinham mais destaque que funcionalidades.
- Lista de recursos sem imagens, tipografia pequena em mobile.
- Links diretos, hashes e perguntas em `details` já existiam e foram mantidos.
- Âncoras existentes `top`, `recursos`, `comparar`, `seguranca`, `downloads` e `faq` preservadas.
- SEO mantém português, descrição, favicon e finalidade; título atualizado e canonical/Open Graph adicionados.

## Hierarquia

1. Hero: tarefas concretas, Windows e Android com download direto, capturas reais.
2. Explorador: mídia, touchpad/teclado, arquivos, clipboard e energia. Tabs com navegação por setas, Home e End.
3. Benefícios: funciona pela LAN, sem conta e gratuito/código aberto.
4. Instalação em três ações, sem transformar a verificação por cores em argumento principal de venda.
5. Comparação por finalidade, rede, conta, cobrança, plataformas e pareamento. Fontes oficiais disponíveis.
6. Segurança com evidência do botão Interromper e detalhes técnicos recolhidos.
7. Downloads, QR, hashes, condições da versão de avaliação e Linux via compilação.
8. FAQ baseado nas dúvidas e limites reais.

## Tokens

Geist variável local, títulos 30-60 px, texto principal 14-17 px, auxiliares 11-13 px. Contêiner até 1240 px; gutters 20/32/48 px. Superfície Obsidian, texto Ice, um único acento Cyan. Componentes com raios 8/16 px; screenshots preservam seus próprios cantos. Cabeçalho sticky no nível 20; skip link no nível 100.

## Evidência e honestidade

As imagens são capturas das versões 0.6.0/0.6.1 obtidas em QA dos aplicativos reais. A interface dentro delas não foi inventada ou recolorida. `public/screenshots/sources.json` registra os arquivos de origem, dimensões e tamanho. O script de preparação apenas redimensiona e converte para WebP.

Sem promessa de latência zero, segurança absoluta ou RAM sem benchmark. TeamViewer/AnyDesk também têm LAN; Unified Remote também é local. Linux tem implementação, mas não há .deb publicado e a validação em hardware/Wayland permanece limitada. APK de avaliação usa debug; EXE sem Authenticode. Hashes e versões estão em `src/content.ts`.

Nenhum registro de memória durável foi criado: Semantica não está disponível nesta sessão.
