# Data Model: Fork do Catálogo MarketingSkills em pt-BR

Não há banco de dados nesta feature — todas as "entidades" são arquivos versionados
no repositório. Este documento define a forma concreta de cada uma, derivada das
entidades-chave da spec (`spec.md` § Key Entities) e das decisões em `research.md`.

## Skill

Fonte de verdade: `skills/<name>/SKILL.md` (um por skill, 50 no lançamento).

| Campo | Tipo | Regra |
|---|---|---|
| `name` (frontmatter) | string, kebab-case | Idêntico ao upstream; MUST NOT ser traduzido (FR-004) |
| `description` (frontmatter) | string, pt-BR | Adaptada, não traduzida literalmente (FR-003); mantém os gatilhos de invocação em português natural |
| `metadata.version` (frontmatter) | string (semver) | Herdado do upstream no momento da adaptação |
| corpo (Markdown) | texto | Adaptado ao contexto brasileiro (FR-005); blocos de código/paths MUST NOT ser traduzidos (FR-006) |
| categoria | string, pt-BR | Não é um campo do `SKILL.md` — ver entidade **Mapeamento de categorias** |
| status de adaptação | enum: `pendente` \| `adaptada` \| `revisada` | Rastreado no processo de PR (não em um campo persistido no arquivo) — uma skill "revisada" é uma cujo PR de adaptação foi aprovado e mergeado (FR-011) |

Arquivos irmãos herdados sem tradução nesta feature (ver `research.md` § Escopo de
adaptação): `references/*.md`, `evals/evals.json`, `assets/*`.

## Mapeamento de categorias

Fonte de verdade: `scripts/categories.json` (novo, criado nesta feature — ver
`research.md` § Origem da categoria).

```json
{
  "cro": "Otimização de Conversão",
  "signup": "Otimização de Conversão",
  "seo-audit": "SEO e Descoberta",
  "...": "..."
}
```

| Campo | Tipo | Regra |
|---|---|---|
| chave | string | `name` da skill (kebab-case, igual ao frontmatter) |
| valor | string, pt-BR | Uma das 9 categorias traduzidas da seção "Skill Categories" do README upstream (Otimização de Conversão, Conteúdo e Copy, SEO e Descoberta, Pago e Distribuição, Mensuração e Testes, Retenção, Engenharia de Crescimento, Estratégia e Monetização, Vendas e RevOps). **Correção de design feita durante `/speckit-implement`**: a versão original deste documento citava 7 categorias vindas do diagrama ASCII do README (uma visualização de dependências entre skills, incompleta como taxonomia); a seção "## Skill Categories" do mesmo README é a fonte correta — mais completa — com 9 categorias. Mesmo essa seção não cobria as 50 skills atuais (18 skills mais novas não listadas); as 18 restantes foram categorizadas por analogia ao tipo de tarefa de cada uma, seguindo o mesmo padrão das 32 já categorizadas pelo upstream. |

Toda skill MUST ter uma entrada aqui antes de aparecer no `catalog.json` (FR-015) —
o script de export (`generate-catalog.mjs`) MUST falhar de forma clara se uma skill
adaptada não tiver categoria mapeada, em vez de omiti-la silenciosamente.

## Entrada de glossário

Fonte de verdade: `GLOSSARY.md` (novo, raiz do repositório).

| Campo | Tipo | Regra |
|---|---|---|
| termo (en) | string | Termo em inglês usado no domínio de marketing (ex.: "funnel") |
| tradução (pt-BR) | string | Tradução padronizada usada em todas as skills (ex.: "funil") |
| notas de uso | string, opcional | Contexto/ambiguidades (ex.: quando manter o termo em inglês por já ser de uso comum no mercado BR) |

Formato: tabela Markdown simples, uma linha por termo, ordenada alfabeticamente pelo
termo em inglês (FR-013, SHOULD).

## Registro de sincronização

Fonte de verdade: `.specify/sync-state.json` (novo — **versionado** no repositório,
diferente de `.specify/feature.json`: representa até onde o fork já foi sincronizado
com o upstream, estado compartilhado pela equipe/CI, não algo específico de uma
máquina. Correção de design feita durante `/speckit-implement`: a primeira versão
deste documento descrevia o arquivo como local/não versionado, o que tornaria o
diff de sincronização inútil em um clone novo ou execução de CI sem histórico local).

```json
{
  "last_synced_sha": "abc123...",
  "last_synced_at": "2026-09-10T00:00:00Z"
}
```

| Campo | Tipo | Regra |
|---|---|---|
| `last_synced_sha` | string, git SHA | Commit do `upstream/main` até onde o fork já foi comparado/adaptado |
| `last_synced_at` | string, ISO 8601 | Quando a última sincronização foi registrada |

O script `sync-diff.mjs` (FR-014) lê este arquivo, compara `upstream/main` contra
`last_synced_sha`, imprime as skills alteradas, e — após o mantenedor confirmar que
tratou o diff — atualiza `last_synced_sha` para a SHA atual do `upstream/main`.

## Entrada de export do catálogo

Fonte de verdade: `catalog.json` (novo, versionado na raiz do repositório — gerado
por `scripts/generate-catalog.mjs`, nunca editado manualmente, FR-015).

```json
[
  {
    "name": "cro",
    "category": "CRO",
    "description": "Otimize a taxa de conversão de qualquer página ou formulário."
  }
]
```

| Campo | Tipo | Regra |
|---|---|---|
| `name` | string, kebab-case | Igual ao `name` do frontmatter da skill |
| `category` | string, pt-BR | Do **Mapeamento de categorias** |
| `description` | string, pt-BR, curta | Resumo curto derivado da `description` do frontmatter (não o texto completo do gatilho — ver `contracts/catalog-export.schema.json` para o limite de tamanho) |

Ver `contracts/catalog-export.schema.json` para o contrato formal consumido pelo
site skillsdemarketing.com.br (User Story 3).
