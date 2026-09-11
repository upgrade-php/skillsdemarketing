# Skills de Marketing PT-BR

> **Fork não-oficial em português** de
> [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
> — adaptado, não apenas traduzido, ao contexto de empreendedores e agências
> brasileiras. Crédito integral pelo catálogo original a **Corey Haines**.
> Licença **[MIT](LICENSE)** preservada.

Uma coleção de skills para agentes de IA focadas em tarefas de marketing. Feita
para profissionais técnicos de marketing e founders que querem que agentes de
código com IA ajudem em otimização de conversão, copywriting, SEO, analytics e
growth engineering. Funciona com Claude Code, OpenAI Codex, Cursor, Windsurf e
qualquer agente compatível com a [especificação Agent Skills](https://agentskills.io).

**Contribuições são bem-vindas!** Encontrou uma forma de melhorar uma skill
adaptada ou uma inconsistência de tradução? [Abra um PR](CONTRIBUTING.md).

Encontrou um problema ou tem uma dúvida? [Abra uma issue](https://github.com/upgrade-php/skillsdemarketing/issues).

## O que são Skills?

Skills são arquivos Markdown que dão a agentes de IA conhecimento especializado
e processos para tarefas específicas. Ao adicionar essas skills ao seu projeto,
seu agente reconhece quando você está trabalhando em uma tarefa de marketing e
aplica os frameworks e boas práticas certas — em português, com exemplos e
gatilhos que fazem sentido para o mercado brasileiro.

## Como as skills se conectam

As skills se referenciam entre si e compartilham contexto. A skill
`product-marketing` é a base — todas as outras a consultam primeiro para
entender seu produto, público e posicionamento antes de agir.

Skills se cruzam entre si, por exemplo:

- `copywriting` ↔ `cro` ↔ `ab-testing`
- `revops` ↔ `sales-enablement` ↔ `cold-email`
- `seo-audit` ↔ `schema` ↔ `ai-seo`
- `customer-research` → `copywriting`, `cro`, `competitors`

Veja a seção **Related Skills** de cada skill para o mapa completo de
dependências.

## Categorias de skills

As 50 skills do catálogo, agrupadas pela mesma categorização do repositório
original (traduzida — ver [`scripts/categories.json`](scripts/categories.json)):

### Otimização de Conversão

- [`cro`](skills/cro/) — páginas e formulários
- [`signup`](skills/signup/) — fluxos de cadastro
- [`onboarding`](skills/onboarding/) — ativação pós-cadastro
- [`popups`](skills/popups/) — modais e overlays
- [`paywalls`](skills/paywalls/) — momentos de upgrade no app

### Conteúdo e Copy

- [`copywriting`](skills/copywriting/) — copy de páginas de marketing
- [`copy-editing`](skills/copy-editing/) — revisão e melhoria de copy existente
- [`cold-email`](skills/cold-email/) — outreach B2B por e-mail
- [`emails`](skills/emails/) — fluxos automatizados de e-mail
- [`social`](skills/social/) — conteúdo para redes sociais
- [`image`](skills/image/) — geração e otimização de imagens
- [`sms`](skills/sms/) — marketing por SMS/MMS
- [`video`](skills/video/) — geração e produção de vídeo
- [`content-strategy`](skills/content-strategy/) — planejamento de conteúdo

### SEO e Descoberta

- [`seo-audit`](skills/seo-audit/) — SEO técnico e on-page
- [`ai-seo`](skills/ai-seo/) — otimização para busca por IA (AEO, GEO, LLMO)
- [`programmatic-seo`](skills/programmatic-seo/) — geração de páginas em escala
- [`site-architecture`](skills/site-architecture/) — hierarquia, navegação, URLs
- [`competitors`](skills/competitors/) — páginas de comparação e alternativas
- [`schema`](skills/schema/) — dados estruturados
- [`aso`](skills/aso/) — otimização para App Store/Google Play
- [`directory-submissions`](skills/directory-submissions/) — submissão a diretórios

### Pago e Distribuição

- [`ads`](skills/ads/) — campanhas no Google, Meta, LinkedIn
- [`events`](skills/events/) — webinars, conferências, patrocínios
- [`ad-creative`](skills/ad-creative/) — geração de criativos de anúncio em escala

### Mensuração e Testes

- [`analytics`](skills/analytics/) — configuração de tracking de eventos
- [`ab-testing`](skills/ab-testing/) — desenho de experimentos
- [`attribution`](skills/attribution/) — modelos de atribuição

### Retenção

- [`churn-prevention`](skills/churn-prevention/) — cancelamento, ofertas de retenção, recuperação de pagamento

### Engenharia de Crescimento

- [`co-marketing`](skills/co-marketing/) — parcerias e campanhas conjuntas
- [`community-marketing`](skills/community-marketing/) — construção de comunidade
- [`free-tools`](skills/free-tools/) — ferramentas e calculadoras gratuitas
- [`influencer-marketing`](skills/influencer-marketing/) — parcerias com criadores
- [`lead-magnets`](skills/lead-magnets/) — iscas digitais para captura de lead
- [`marketing-loops`](skills/marketing-loops/) — loops de marketing recorrentes
- [`public-relations`](skills/public-relations/) — assessoria de imprensa e mídia espontânea
- [`referrals`](skills/referrals/) — programas de indicação e afiliados

### Estratégia e Monetização

- [`marketing-ideas`](skills/marketing-ideas/) — 140 ideias de marketing para SaaS
- [`marketing-psychology`](skills/marketing-psychology/) — modelos mentais e psicologia
- [`launch`](skills/launch/) — lançamentos e anúncios de produto
- [`pricing`](skills/pricing/) — precificação, pacotes e monetização
- [`marketing-council`](skills/marketing-council/) — múltiplas perspectivas de especialistas
- [`marketing-plan`](skills/marketing-plan/) — plano de marketing completo
- [`offers`](skills/offers/) — desenho e melhoria de oferta
- [`product-marketing`](skills/product-marketing/) — contexto de produto/posicionamento
- [`customer-research`](skills/customer-research/) — pesquisa com clientes
- [`competitor-profiling`](skills/competitor-profiling/) — perfil de concorrentes

### Vendas e RevOps

- [`revops`](skills/revops/) — ciclo de vida de lead, pipeline
- [`sales-enablement`](skills/sales-enablement/) — materiais de vendas
- [`prospecting`](skills/prospecting/) — prospecção de leads B2B

## Instalação

### Opção 1: Instalação via CLI (recomendado)

Use [npx skills](https://github.com/vercel-labs/skills) para instalar as skills
diretamente:

```bash
# Instalar todas as skills
npx skills add upgrade-php/skillsdemarketing

# Instalar skills específicas
npx skills add upgrade-php/skillsdemarketing --skill cro copywriting

# Listar skills disponíveis
npx skills add upgrade-php/skillsdemarketing --list
```

A CLI detecta quais agentes você tem instalados e pergunta onde instalar. Para o
Claude Code ela instala em `.claude/skills/`; agentes universais compartilham
`.agents/skills/`.

> [!TIP]
> Se você rodar o comando **de dentro** de uma sessão de agente (por exemplo,
> pedindo ao Claude Code para instalar as skills para você), a CLI roda de forma
> não-interativa e pode instalar só no diretório universal `.agents/skills/`, que
> o Claude Code não lê. Passe o agente explicitamente:
>
> ```bash
> npx skills add upgrade-php/skillsdemarketing -a claude-code
> ```

### Opção 2: Plugin do Claude Code

Instale via sistema de plugins nativo do Claude Code:

```bash
# Adicionar o marketplace
/plugin marketplace add upgrade-php/skillsdemarketing

# Instalar todas as skills de marketing
/plugin install marketing-skills
```

### Opção 3: Clonar e copiar

Clone o repositório inteiro e copie a pasta de skills:

```bash
git clone https://github.com/upgrade-php/skillsdemarketing.git
cp -r skillsdemarketing/skills/* .agents/skills/
```

### Opção 4: Git Submodule

Adicione como submodule para facilitar atualizações:

```bash
git submodule add https://github.com/upgrade-php/skillsdemarketing.git .agents/skillsdemarketing
```

Depois referencie as skills a partir de `.agents/skillsdemarketing/skills/`.

### Opção 5: Fork e personalização

1. Faça um fork deste repositório
2. Personalize as skills para sua necessidade
3. Clone o seu fork nos seus projetos

## Uso

Depois de instaladas, é só pedir ao agente ajuda com tarefas de marketing:

```text
"Me ajuda a otimizar essa landing page para conversão"
→ Aciona a skill cro

"Escreve a copy da home do meu SaaS"
→ Aciona a skill copywriting

"Configura o tracking de GA4 para cadastros"
→ Aciona a skill analytics

"Cria uma sequência de 5 e-mails de boas-vindas"
→ Aciona a skill emails
```

Você também pode invocar skills diretamente:

```text
/cro
/emails
/seo-audit
```

## Contribuindo

Encontrou uma forma de melhorar uma skill? Tem uma inconsistência de adaptação
para reportar? PRs e issues são bem-vindos!

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para as diretrizes de contribuição —
tanto do fluxo de repositório quanto de como adaptar ou revisar uma skill.

## Sobre o mantenedor

Este projeto é mantido por Vicente Pinheiro, estrategista digital com
experiência em engenharia de software, aquisição de clientes e comunicação
persuasiva.

Depois de mais de 15 anos trabalhando com tecnologia e de ter construído e
liderado uma startup de geração de leads, Vicente hoje explora como agentes de
IA podem ampliar a capacidade de empreendedores executarem marketing com mais
método, qualidade e autonomia.

O Skills de Marketing nasce dessa interseção entre tecnologia, estratégia e
marketing: tornar conhecimento especializado mais acessível dentro dos agentes
de IA que já fazem parte do trabalho diário.

Saiba mais em
[vicentepinheiro.com](https://vicentepinheiro.com/?utm_source=github&utm_medium=readme&utm_campaign=skillsdemarketing).

## Licença

[MIT](LICENSE) — use como quiser, como no projeto original.
