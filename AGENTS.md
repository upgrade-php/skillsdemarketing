# AGENTS.md

Diretrizes para agentes de IA trabalhando neste repositório.

## Visão geral do repositório

Este repositório contém **Agent Skills** para agentes de IA, seguindo a
[especificação Agent Skills](https://agentskills.io/specification.md). As
skills instalam em `.agents/skills/` (padrão cross-agent). Este repo também
funciona como um **marketplace de plugin do Claude Code** via
`.claude-plugin/marketplace.json`.

Este é um **fork não-oficial em português** do catálogo original
[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
— adaptado ao contexto brasileiro, não apenas traduzido. Ver
[`prd-marketingskills-ptbr.md`](prd-marketingskills-ptbr.md) e a
[constituição](.specify/memory/constitution.md) para os princípios que regem a
adaptação.

- **Nome**: Skills de Marketing PT-BR
- **GitHub**: [upgrade-php/skillsdemarketing](https://github.com/upgrade-php/skillsdemarketing)
- **Original**: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (Corey Haines)
- **Licença**: MIT

## Estrutura do repositório

```text
skillsdemarketing/
├── .claude-plugin/
│   └── marketplace.json   # Manifest do marketplace de plugin do Claude Code
├── skills/                # Agent Skills
│   └── nome-da-skill/
│       └── SKILL.md       # Arquivo obrigatório da skill
├── tools/
│   ├── clis/              # Ferramentas CLI Node.js zero-dependência
│   ├── composio/          # Camada de integração Composio
│   ├── integrations/      # Guias de integração de API por ferramenta
│   └── REGISTRY.md        # Índice de ferramentas com capacidades
├── scripts/
│   ├── categories.json    # Mapeamento skill → categoria (fork)
│   ├── sync-diff.mjs      # Diff de skills alteradas no upstream (fork)
│   ├── generate-catalog.mjs # Export estruturado do catálogo (fork)
│   └── sync-partners.mjs  # Herdado do original — NÃO executar neste fork
├── CONTRIBUTING.md
├── GLOSSARY.md             # Glossário pt-BR ↔ en (fork)
├── LICENSE
└── README.md
```

> Herdado do original em inglês, sem tradução nesta fase (fora do escopo de
> adaptação de conteúdo de skill): `tools/`, `scripts/sync-partners.mjs`,
> `skills/*/references/*.md`, `skills/*/evals/evals.json`.

## Comandos de build / lint / teste

**Skills** são só conteúdo (sem etapa de build). Verifique manualmente:

- O frontmatter YAML é válido
- O campo `name` é idêntico ao nome da pasta
- `name` tem 1-64 caracteres, minúsculo, alfanumérico e hífens
- `description` tem 1-1024 caracteres

**Ferramentas CLI** (`tools/clis/*.js`) são scripts Node.js zero-dependência
(Node 18+), herdadas do original. Verifique com:

```bash
node --check tools/clis/<nome>.js   # Checagem de sintaxe
node tools/clis/<nome>.js           # Mostra o uso (sem args = help)
node tools/clis/<nome>.js <cmd> --dry-run  # Preview da requisição sem enviar
```

## Especificação Agent Skills

As skills seguem a [especificação Agent Skills](https://agentskills.io/specification.md).

### Frontmatter obrigatório

```yaml
---
name: nome-da-skill
description: O que a skill faz e quando usá-la. Inclua os gatilhos de invocação em português.
---
```

### Restrições dos campos do frontmatter

| Campo         | Obrigatório | Restrições                                                        |
|---------------|-------------|---------------------------------------------------------------------|
| `name`        | Sim         | 1-64 caracteres, `a-z` minúsculo, números, hífens. Igual à pasta.   |
| `description` | Sim         | 1-1024 caracteres. Descreve o que faz e quando usar — em pt-BR.    |
| `license`     | Não         | Nome da licença (padrão: MIT)                                       |
| `metadata`    | Não         | Pares chave-valor (autor, versão, etc.)                             |

### Regras do campo `name`

- Só letras minúsculas, números e hífens
- Não pode começar ou terminar com hífen
- Sem hífens consecutivos (`--`)
- MUST ser idêntico ao nome da pasta pai — **este campo nunca é traduzido**
  (Princípio II da constituição)

**Válido**: `cro`, `emails`, `ab-testing`
**Inválido**: `Page-CRO`, `-page`, `page--cro`

### Diretórios opcionais da skill

```text
skills/nome-da-skill/
├── SKILL.md        # Obrigatório - instruções principais (<500 linhas)
├── references/     # Opcional - docs detalhados, carregados sob demanda
├── evals/           # Opcional - casos de teste/avaliação
└── assets/          # Opcional - templates, dados
```

## Diretrizes de estilo de escrita (adaptação de skill)

### Estrutura

- Mantenha `SKILL.md` com menos de 500 linhas (detalhes vão para `references/`)
- Use H2 (`##`) para seções principais, H3 (`###`) para subseções
- Use listas com marcadores e numeradas livremente
- Parágrafos curtos (no máximo 2-4 frases)

### Tom

- Direto e instrucional
- Segunda pessoa ("Você é um especialista em otimização de taxa de conversão")
- Profissional, mas acessível
- Português natural do Brasil — não tradução literal do inglês

### Formatação

- Negrito (`**texto**`) para termos-chave
- Blocos de código para exemplos e templates (nunca traduzidos)
- Tabelas para dados de referência
- Sem excesso de emojis

### Princípios de clareza

- Clareza antes de sofisticação
- Específico antes de vago
- Voz ativa antes de passiva
- Uma ideia por seção

### Boas práticas do campo `description`

O `description` é crítico para a skill ser encontrada/acionada. Inclua:

1. O que a skill faz
2. Quando usá-la (gatilhos de invocação em português natural)
3. Skills relacionadas, para delimitar o escopo

```yaml
description: Quando o usuário quiser otimizar conversões em qualquer página de marketing. Use quando o usuário disser "CRO," "taxa de conversão," "essa página não está convertendo." Para fluxos de cadastro, veja signup.
```

## Plugin do Claude Code

Este repositório também funciona como marketplace de plugin. O manifest em
`.claude-plugin/marketplace.json` lista todas as skills para instalação via:

```bash
/plugin marketplace add upgrade-php/skillsdemarketing
/plugin install marketing-skills
```

Veja a [documentação de plugins do Claude Code](https://code.claude.com/docs/en/plugins.md)
para detalhes.

## Fluxo de Git

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para o fluxo de branches, Pull Request e
convenção de mensagens de commit já em vigor neste repositório.

### Checklist de Pull Request (adaptação de skill)

- [ ] `name` idêntico ao nome da pasta, inalterado em relação ao original
- [ ] `name` segue as regras de nomenclatura (minúsculo, hífens, sem `--`)
- [ ] `description` tem 1-1024 caracteres, em pt-BR, com gatilhos de invocação
- [ ] `SKILL.md` tem menos de 500 linhas
- [ ] Nenhum dado sensível ou credencial

## Integrações de ferramentas

Este repositório inclui um registro de ferramentas de marketing compatíveis com
agentes, herdado do original (conteúdo técnico, permanece em inglês).

- **Descoberta de ferramentas**: leia `tools/REGISTRY.md` para ver as
  ferramentas disponíveis e suas capacidades
- **Detalhes de integração**: veja `tools/integrations/{ferramenta}.md` para
  endpoints de API, autenticação e operações comuns
- **Ferramentas com MCP**: ga4, stripe, mailchimp, google-ads, resend, zapier,
  zoominfo, clay, supermetrics, coupler, outreach, crossbeam, introw, composio
- **Composio** (camada de integração): adiciona acesso MCP a ferramentas
  fortemente baseadas em OAuth sem servidor MCP nativo (HubSpot, Salesforce,
  Meta Ads, LinkedIn Ads, Google Sheets, Slack, etc.). Veja
  `tools/integrations/composio.md`

### Quando usar ferramentas

As skills referenciam ferramentas relevantes para implementação. Por exemplo:

- skill `referrals` → guias de rewardful, tolt, dub-co, mention-me
- skill `analytics` → guias de ga4, mixpanel, segment
- skill `emails` → guias de customer-io, mailchimp, resend
- skill `ads` → guias de google-ads, meta-ads, linkedin-ads

## Verificando atualizações

Ao usar qualquer skill deste repositório:

1. **Uma vez por sessão**, no primeiro uso de uma skill, verifique atualizações:
   - Busque `VERSIONS.md` do GitHub: `https://raw.githubusercontent.com/upgrade-php/skillsdemarketing/main/VERSIONS.md`
   - Compare as versões com os arquivos de skill locais

2. **Só avise se for relevante**:
   - 2 ou mais skills têm atualizações, OU
   - Alguma skill teve um bump de versão major (ex.: 1.x para 2.x)

3. **Notificação não-bloqueante** ao final da resposta:

   ```text
   ---
   Atualização de skills disponível: X skills de marketing têm atualizações.
   Diga "atualizar skills" para atualizar automaticamente, ou rode `git pull`
   na sua pasta skillsdemarketing.
   ```

4. **Se o usuário disser "atualizar skills"**:
   - Rode `git pull` no diretório skillsdemarketing
   - Confirme o que foi atualizado

## Categorias de skills

Veja `README.md` para a lista atual de skills organizadas por categoria, e
`scripts/categories.json` para o mapeamento estruturado. Ao adicionar uma
skill nova, siga o padrão de nomenclatura das skills existentes na mesma
categoria.

## Aprimoramentos específicos do Claude Code

Esses padrões são **exclusivos do Claude Code** e não devem ser adicionados
diretamente aos arquivos `SKILL.md`, já que as skills são desenhadas para
serem compatíveis entre agentes (Codex, Cursor, Windsurf, etc.). Aplique-os
localmente nos overrides de `.claude/skills/` do seu próprio projeto.

### Injeção dinâmica de conteúdo com `!`comando``

O Claude Code permite embutir comandos de shell em `SKILL.md` usando a sintaxe
`` !`comando` ``. Quando a skill é invocada, o Claude Code roda o comando e
injeta a saída inline — o modelo vê o resultado, não a instrução.

**Aplicação mais útil: injetar automaticamente o arquivo de contexto de produto**

Em vez de cada skill dizer ao agente "verifique se `.agents/product-marketing.md`
existe e leia-o", você pode injetá-lo automaticamente:

```markdown
Contexto do produto: !`cat .agents/product-marketing.md 2>/dev/null || echo "Nenhum arquivo de contexto de produto encontrado — pergunte ao usuário sobre o produto antes de continuar."`
```

Coloque isso no topo do corpo da skill (depois do frontmatter) para deixar o
contexto disponível de imediato, sem nenhuma etapa de leitura de arquivo.

**Outras injeções úteis:**

```markdown
# Injeta a data de hoje, para skills sensíveis à atualidade
Data de hoje: !`date +%Y-%m-%d`

# Injeta a branch git atual (útil para skills de workflow)
Branch atual: !`git branch --show-current 2>/dev/null`

# Injeta os commits recentes para contexto
Commits recentes: !`git log --oneline -5 2>/dev/null`
```

**Por que isso é exclusivo do Claude Code**: outros agentes que carregam
skills veriam a string literal `` !`comando` `` em vez de executá-la, o que
apareceria como uma instrução incompreensível. Mantenha os arquivos de skill
cross-agent livres dessa sintaxe.
