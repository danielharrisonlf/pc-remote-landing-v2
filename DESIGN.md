# PC Remote: apresentação do produto

## Direção

Redesign completo da apresentação para usuários domésticos de Android e Windows. A página explica tarefas e benefícios antes de detalhes de arquitetura. Sistema visual próprio em CSS, com a marca oficial preservada; não implementa um design system de terceiros.

Configuração da skill: DESIGN_VARIANCE 6, MOTION_INTENSITY 3, VISUAL_DENSITY 4. Layout variado, leitura familiar e animação apenas para indicar mudança da ferramenta selecionada. A solicitação posterior inclui tema claro e escuro: a primeira visita segue o sistema e o seletor persiste a escolha.

## Refinamento mobile e temas, 18/10/2026

A auditoria visual encontrou problemas que uma checagem de overflow não detectava: screenshots pequenas demais no hero, cinco abas de 67 px com texto de 10 px, tabela de cinco colunas no tablet e texto Linux comprimido em 92 px.

- Hero empilhado abaixo de 1100 px; abaixo de 768 px exibe a captura Android maior, sem sobrepor miniaturas ilegíveis.
- Fonte de corpo 14-18 px, metadados 12-13 px e controles de toque com pelo menos 44 px.
- Seletor nativo de ferramentas no mobile; tabs com teclado no desktop. Atalhos adicionais permitem descobrir todos os recursos.
- Comparação em cartões abaixo de 1001 px, com seleção do concorrente. A tabela completa permanece no desktop.
- Bloco Linux usa duas linhas em mobile, sem comprimir o parágrafo entre ícone e link.
- Capturas abrem em dialog nativo, com ajuste à tela, tamanho original, rolagem e fechamento por Escape. Não alteram as cores do aplicativo real.
- Toggle claro/escuro acessível com `role=switch`, preferência do sistema, persistência e sincronização entre abas. Script inicial aplica o tema antes da pintura; o HTML estático continua hidratando sem divergência.
- Tokens semânticos substituem cores fixas para superfícies, texto, bordas e ações. O acento de texto no tema claro é mais escuro para manter contraste.
- CTA móvel aparece após o hero e fica oculto durante a seção de downloads. Conteúdo principal mantém downloads diretos.
- A copy explica o controle do PC pelo Android, o benefício de não ir até a mesa e a necessidade de instalar nos dois aparelhos. Não promete tempo de instalação, risco zero ou compatibilidade Linux ainda não validada.

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
7. Downloads, QR, hashes, condições da versão de avaliação e Ubuntu em `.deb` e instalador compactado.
8. FAQ baseado nas dúvidas e limites reais.

## Tokens

Geist variável local, títulos 30-60 px, texto principal 14-17 px, auxiliares 11-13 px. Contêiner até 1240 px; gutters 20/32/48 px. Superfície Obsidian, texto Ice, um único acento Cyan. Componentes com raios 8/16 px; screenshots preservam seus próprios cantos. Cabeçalho sticky no nível 20; skip link no nível 100.

## Evidência e honestidade

As imagens são capturas das versões 0.6.0/0.6.1 obtidas em QA dos aplicativos reais. A interface dentro delas não foi inventada ou recolorida. `public/screenshots/sources.json` registra os arquivos de origem, dimensões e tamanho. O script de preparação apenas redimensiona e converte para WebP.

Sem promessa de latência zero, segurança absoluta ou RAM sem benchmark. TeamViewer/AnyDesk também têm LAN; Unified Remote também é local. A pré-release Ubuntu oferece `.deb` amd64 e instalador compactado para 22.04, 24.04 e 26.04 LTS, com instalação e abertura validadas nas três versões. A autorização e o controle em um desktop GNOME Wayland real permanecem pendentes, com essa condição visível no bloco de download. APK de avaliação usa debug; EXE sem Authenticode. Hashes e versões estão em `src/content.ts`.

## Downloads Ubuntu, 18/10/2026

O aviso de compilação foi substituído por downloads da release `v0.6.4-ubuntu.1`. O hero aponta para o bloco Ubuntu; os downloads principais de Windows e Android mantêm suas posições. O bloco Ubuntu mostra as três versões LTS, arquitetura amd64, comando do instalador, autorização no Wayland, condição de pré-release, hash verificável, guia e release oficial. No mobile, ações ficam abaixo do texto e o código pode quebrar linha; a âncora considera o cabeçalho para manter o título acessível. Comparação, FAQ e descrição de busca refletem o pacote publicado.

Nenhum registro de memória durável foi criado: Semantica não está disponível nesta sessão.

## Mobile e domínio público, 19/10/2026

Refinamento da página existente, preservando marca, tipografia Geist, acento cyan, imagens reais, âncoras e interações acessíveis. Configuração aplicada: DESIGN_VARIANCE 5, MOTION_INTENSITY 2, VISUAL_DENSITY 4. A prioridade é leitura e toque no celular; o movimento permanece restrito ao feedback dos controles.

A captura enviada mostrou conteúdo cortado. A auditoria independente do estado publicado e local não reproduziu overflow horizontal em 320, 360, 390, 440, 768, 1024 e 1440 px. Portanto, não atribuímos aquele recorte a uma causa CSS comprovada. O refinamento reduz a altura do primeiro bloco e fortalece o reflow para larguras menores e texto ampliado.

- Cabeçalho mobile com controle de tema de 44 px, marca que pode quebrar linha e menu em uma coluna, posicionado abaixo da altura efetiva do cabeçalho. A página não força largura mínima; o link de instalação também pode quebrar linha com texto ampliado.
- Hero com descrição curta, downloads Android e Windows lado a lado quando cabem, empilhados em 320 px. Instruções e Ubuntu ficam próximos às ações. A versão técnica saiu do hero; versões exatas continuam nos downloads.
- Preview real do app inteiro no primeiro bloco em 440 × 956, com ampliação acessível preservada. Nenhuma interface fictícia ou imagem decorativa nova.
- Colunas com mínimo zero e botões com quebra natural de texto. As ações Ubuntu ocupam a largura inteira no mobile.
- Comparação mobile usa menos caixas aninhadas. O QR aparece no computador; no celular, o download direto ocupa esse papel.
- Modal permite título e controles em linhas separadas; somente a imagem em tamanho real pode ter rolagem horizontal interna.
- A barra móvel observa a saída do hero, sem depender de uma altura fixa de cabeçalho.
- Endereço público limpo `pc-remote-app.vercel.app`, com canonical, Open Graph, sitemap e redirecionamento do host antigo. Os nomes mais curtos estavam ocupados por terceiros.
- Downloads, hash e QR Android atualizados para a 0.6.5 já publicada. O QR foi gerado com qrcode 8.2, correção M e quiet zone de quatro módulos, a partir do mesmo link direto do APK.
- Ícones importados pelos caminhos individuais documentados pelo Phosphor para evitar varrer os milhares de módulos do pacote no build. Sem dependências novas no aplicativo.

As evidências desta rodada ficam em `../artifacts/qa/landing-mobile/`. Memória Semantica indisponível; nenhum registro de memória durável foi criado.
Na publicação, o novo host foi registrado nos domínios do projeto antes da promoção. O domínio antigo usa redirecionamento nativo 308 da Vercel, cobrindo a raiz e preservando caminhos e query strings; o `vercel.json` permanece como fallback para caminhos. A proteção de acesso dos previews foi mantida.
## Design system, molduras e ícone, 19/10/2026

Refatoração do sistema visual preservando marca, Geist, acento cyan, capturas reais, âncoras e interações acessíveis. Configuração aplicada: DESIGN_VARIANCE 5, MOTION_INTENSITY 3, VISUAL_DENSITY 4.

- Tokens semânticos em `:root` (escuro) redefinidos só como valores em `[data-theme='light']`: escala de superfície `bg → surface-soft → surface → surface-strong`, `--raised` para o item selecionado (mais claro no escuro, branco no claro), `--chip-*`, `--focus`, cores de plataforma e de aviso por tema. Âmbar e verde não aparecem mais como tinta fixa sobre fundo claro.
- Elevação: `--edge` (luz de borda superior), `--shadow-sm/md/lg` sempre com deslocamento e blur, `--shadow-glow` deslocado sob o CTA primário. Sem halo de deslocamento zero.
- Tipografia fluida com `clamp()` para h1, h2, h3 e texto de apoio; tracking de display -0.035em, entrelinha de corpo 1.65 (antes 1.75–1.9). Piso de 12 px mantido.
- Movimento: 150/200 ms em `cubic-bezier(0.16, 1, 0.3, 1)`. Um único momento autoral: a captura entra em foco (blur → nítido) ao trocar de ferramenta. A troca de tema desliga transições por dois quadros para não piscar a tela.
- Molduras CSS: celular em grafite com borda interna iluminada e teclas laterais; janela Windows com anel fino e sombra profunda, sem barra de título falsa porque a captura já traz a barra real. Selo discreto "App Android" / "App Windows" sobre a borda inferior. O raio da tela foi reduzido para 19/15 px porque raios maiores cortavam o horário da barra de status da captura real.
- Recorte das capturas de desktop apenas nos pixels de outras janelas capturados ao redor (8/8/1 px no painel, 6/7/2 px no Interromper), por CSS com `aspect-ratio`. A interface do app não foi alterada nem recolorida.
- Modal de ampliação com backdrop desfocado (8 px), entrada suave, título com plataforma, alternância por botão ou toque duplo.
- Hero sem eyebrow; a linha "grátis e código aberto" virou parte de três provas verificáveis (rede local, sem conta, código aberto). Não usamos "latência zero" nem "privacidade total": não há benchmark nem garantia que sustente essas frases.
- Explorador: no mobile, o seletor nativo foi trocado por chips roláveis com `role=tablist`, máscara nas bordas e centralização da aba ativa. Teclado (setas, Home, End) inalterado.
- Comparativo com chips de status no PC Remote (rede local, sem conta, código aberto, aprovação no PC), na tabela e nos cartões.
- Downloads: metadados com ponto médio viraram lista de definição (Sistema, Pacote, Versão). As versões vêm de `versions` em `content.ts`, que também monta os links, porque os cartões mostravam 0.6.4/0.6.5 enquanto os links já eram 0.6.5/0.6.6. O QR codificava o APK 0.6.5; foi regenerado (qrcode 1.5.4, correção M, quiet zone de 4 módulos) para o APK 0.6.6 e ganhou três passos de escaneamento. O banner de releases conta os itens do JSON.
- Ícones de texto (`+`, `↑`) substituídos por Phosphor. Barra móvel sempre montada, desliza com `inert` quando oculta, respeita safe areas.
- Ícone: mesma geometria dos dois prismas, tile sangrado (a marca fica maior no favicon), sem filtro de sombra (borrava em 16 px), variante escura por `prefers-color-scheme` no SVG e tile escuro no cabeçalho quando o tema é escuro. PNG 32, apple-touch 180 (quadrado, o iOS aplica a máscara), 192 e 512 com manifest, gerados por `npm run build:icons`. Os ícones dos apps desktop e Android não foram alterados.

## Hero só com o celular e capturas 0.6.6, 19/10/2026

- O hero mostra apenas o celular: a promessa é o Android como controle, e a janela escura do desktop competia com as telas claras do app. O app desktop continua em Segurança, onde a captura prova o botão Interromper.
- Três celulares em palco (Mídia na frente, Deck de Ações e Apresentador atrás), sem rotação, com sombra de chão neutra. Selo de plataforma só no aparelho da frente. No celular, os dois de trás aparecem parcialmente atrás do principal.
- Fundo do hero com grade de pontos mascarada, o mesmo motivo da área do touchpad do app. Sem brilho colorido.
- Novas capturas da 0.6.6-kotlin em AVD Pixel 7 (1080 × 2400, 20:9), pareado com o PC Remote real do Windows. Barra de status em modo demo do Android (relógio 9:41, sinal e bateria cheios); a interface do app não foi alterada. A sessão de mídia é real, com um WAV silencioso chamado "Faixa de demonstração"; o texto em Transferir chegou pela sincronização de clipboard real. Originais em `../artifacts/qa/0.6.6-landing/`.
- Explorador reorganizado pelas abas do próprio app: Mídia, Mouse e teclado, Slides e atalhos (novo: Deck de Ações, Apresentador e teclado numérico, disponíveis desde o desktop 0.6.3), Arquivos e texto (arquivos + clipboard) e Energia. A aba de Controles mostra dois aparelhos no desktop.
- Copy de vendas reescrita em torno de cenas concretas (sofá, apresentação, arquivo que precisa ir para o PC), mantendo os limites: sem "latência zero", sem promessa de tempo de instalação, Wake-on-LAN condicionado à placa de rede e à BIOS.
- Toggle de tema compacto: botão de 40 px (44 px no celular) com o ícone do tema ativo e troca animada; mantém `role=switch`.
- Preload só da captura de mídia, usada em todas as larguras; Open Graph continua com a captura horizontal do desktop.
