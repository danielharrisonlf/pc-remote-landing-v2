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
