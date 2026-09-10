# Research: Fork do Catálogo MarketingSkills em pt-BR

**Method**: inspeção direta do repositório upstream (`coreyhaines31/marketingskills`,
branch `main`) via `gh api`, em vez de assumir a estrutura descrita no PRD. Todas as
decisões abaixo resolvem os pontos marcados como incerto na spec ou no PRD.

## Estrutura real do repositório upstream

O PRD descreve o escopo como "50 skills + docs do repo" e menciona genericamente
`scripts/*.mjs`. A inspeção real mostra uma estrutura mais rica:

- `skills/<nome>/SKILL.md` — 50 arquivos, confirmando a contagem do PRD.
- `skills/<nome>/references/*.md` — documentação de apoio por skill (guias,
  templates, benchmarks). Presente na maioria das skills, variando em volume.
- `skills/<nome>/evals/evals.json` — casos de teste/avaliação por skill, em inglês.
- `skills/<nome>/assets/*` — alguns skills têm assets adicionais (ex.: templates HTML).
- `tools/clis/*.js` (~80 arquivos) e `tools/integrations/*.md` (~80 arquivos) —
  confirma a existência de código JS real na pasta `tools/`, o que já havia motivado
  a configuração do CodeQL.
- `scripts/sync-partners.mjs` — o único `.mjs` do repositório; gera o bloco de
  parceiros no README a partir de `partners.json`.
- `.github/scripts/sync-skills.js` + `.github/workflows/sync-skills.yml` — regenera
  `marketplace.json`, `plugin.json` e a tabela de skills do README sempre que
  `skills/**` muda. Não lida com categorias (ver abaixo).
- `.github/workflows/validate-skill.yml` — valida o frontmatter de cada `SKILL.md`
  alterado em push/PR, via matrix por skill alterada, usando a action de terceiros
  `Flash-Brew-Digital/validate-skill@v1`.
- `validate-skills.sh` e `validate-skills-official.sh` (raiz) — scripts shell para
  rodar a mesma validação localmente (o segundo usa a lib oficial
  `agentskills/skills-ref`, instalável via `uv`, já disponível neste ambiente).
- Nenhum `package.json` — todo o JavaScript do repositório roda com Node.js puro,
  sem dependências externas.

**Correção em relação ao PRD**: a validação de frontmatter não é um `scripts/*.mjs`
próprio — é uma GitHub Action de terceiros (CI) + dois scripts shell (uso local). Isso
não muda nenhum requisito da spec, só a forma como FR-012 deve ser implementado.

## Decision: Escopo de adaptação por skill

- **Decision**: v1 adapta apenas `SKILL.md` (frontmatter + corpo) de cada skill.
  `references/*.md`, `evals/evals.json` e `assets/*` são copiados como estão do
  upstream, sem tradução, nesta feature.
- **Rationale**: FR-003 da spec já delimita o escopo a "seu `SKILL.md`" — este
  achado apenas confirma que a estrutura real tem mais arquivos por skill do que o
  PRD sugeria, e que traduzir tudo multiplicaria o esforço em várias vezes (um
  `references/` por skill pode ter de 1 a 10 arquivos). Título "Escopo v1: 50 skills"
  do PRD é compatível com "50 `SKILL.md`", não com "50 pastas completas traduzidas".
- **Alternatives considered**: adaptar também `references/*.md` — rejeitado para v1
  por multiplicar o volume de conteúdo a revisar pelo revisor único, sem meta de
  lançamento correspondente no PRD; fica como candidato natural para uma fase
  futura (não registrado como requisito nesta spec).

## Decision: Origem da "categoria" de cada skill

- **Decision**: a categoria de cada skill é extraída do diagrama de 7 categorias já
  existente no README do upstream (SEO & Content, CRO, Content & Copy, Paid &
  Measurement, Growth & Retention, Sales & GTM, Strategy), transcrito uma vez para
  um mapeamento estruturado mantido no fork (`scripts/categories.json` ou
  equivalente), com os nomes das categorias traduzidos para pt-BR.
- **Rationale**: a spec já havia decidido (via `/speckit-clarify`) reaproveitar a
  categorização existente em vez de criar uma nova taxonomia. A inspeção real mostra
  que essa categorização **não é um campo de frontmatter** — `SKILL.md` só tem
  `name`, `description` e `metadata.version`. As categorias existem apenas como um
  diagrama ASCII manual no README, sem forma machine-readable. Não há como
  "herdar" isso automaticamente; precisa ser transcrito uma vez para um arquivo
  estruturado no fork, que passa a ser a fonte de verdade para o export (FR-015) e
  para os metadados do catálogo.
- **Alternatives considered**: derivar categoria por palavras-chave da `description`
  — rejeitado por ser impreciso e não corresponder à categorização que o mantenedor
  original já validou; esperar por um campo de categoria estruturado no upstream —
  rejeitado porque não há indicação de que isso vá existir, e bloquearia o lançamento.

## Decision: Mecanismo de validação de frontmatter no CI (FR-012)

- **Decision**: reusar a mesma GitHub Action de terceiros que o upstream já usa
  (`Flash-Brew-Digital/validate-skill@v1`), em um novo workflow
  `.github/workflows/validate-skill.yml` no fork, com detecção de skills alteradas
  via `git diff` no PR (mesmo padrão do upstream) e adicionar o job resultante como
  novo status check obrigatório na ruleset da `main`.
- **Rationale**: evita reescrever um validador de frontmatter do zero; mantém
  paridade de comportamento com o upstream (reduz risco de o fork aceitar um
  frontmatter que o original rejeitaria); a action já roda por matrix (uma
  execução por skill alterada), o que mantém o CI rápido mesmo com 50 skills.
- **Alternatives considered**: escrever um validador próprio em Node — rejeitado
  por duplicar trabalho de manutenção sem necessidade; usar os scripts shell locais
  (`validate-skills.sh`) como o check de CI — rejeitado porque eles varrem o
  catálogo inteiro (mais lento, sem granularidade por PR) e são pensados para
  execução manual local, não para matrix de CI.

## Decision: Script de sincronização com o upstream (FR-014)

- **Decision**: `scripts/sync-diff.mjs`, Node.js puro (sem dependências), que:
  1. Lê a última SHA sincronizada de um arquivo de estado versionado
     (`.specify/sync-state.json` — ver `data-model.md`).
  2. Roda `git fetch upstream` e compara `upstream/main` contra essa SHA, restrito a
     `skills/**/SKILL.md`.
  3. Imprime a lista de skills alteradas (adicionadas/modificadas/removidas) desde
     a última sincronização.
- **Rationale**: resolve a clarificação já registrada na spec (script automatizado,
  não checklist manual) com a abordagem mais simples possível — `git diff` entre
  duas revisões — sem precisar de nenhuma dependência externa, mantendo a mesma
  filosofia zero-dependência do upstream.
- **Alternatives considered**: comparar hash de conteúdo por skill em vez de diff de
  git — rejeitado por ser mais complexo sem benefício real, já que o fork tem acesso
  direto ao histórico git do upstream via remote.

## Decision: Script de export do catálogo (FR-015)

- **Decision**: `scripts/generate-catalog.mjs`, Node.js puro, que lê
  `skills/*/SKILL.md` (reaproveitando a mesma lógica de parse de frontmatter do
  `sync-skills.js` do upstream), cruza com `scripts/categories.json` (mapeamento de
  categoria por skill) e escreve `catalog.json` versionado na raiz do repositório.
- **Rationale**: atende à clarificação já registrada (script + arquivo versionado).
  Reaproveitar a lógica de parse do upstream reduz risco de divergência de
  comportamento entre os dois repositórios.
- **Alternatives considered**: gerar o export como parte do mesmo script que
  regenera `marketplace.json`/README (herdado do upstream) — rejeitado para manter
  separação de responsabilidades: a sincronização com o `marketplace.json`/README é
  herdada do upstream (compatibilidade técnica, Princípio II), enquanto o
  `catalog.json` é um artefato novo, específico do fork, não presente no original.

## Decision: Stack técnica para os scripts novos

- **Decision**: Node.js (mesma versão LTS já disponível no ambiente, v20+),
  módulos ES (`.mjs`), sem dependências de terceiros — usando apenas APIs nativas
  (`fs`, `path`, `child_process` para `git`).
- **Rationale**: espelha exatamente a abordagem do upstream (nenhum `package.json`,
  scripts rodam com `node arquivo.mjs` direto). Isso simplifica a manutenção e
  reduz o risco de conflitos de dependência em sincronizações futuras com o
  upstream (Princípio V).
- **Alternatives considered**: TypeScript — rejeitado por exigir passo de build,
  incompatível com a simplicidade zero-dependência do upstream; Python — rejeitado
  por introduzir uma segunda linguagem de tooling sem necessidade, quando o
  ecossistema Node já está presente (CI, `npx skills add`).

## Unknowns resolvidos

Nenhum `[NEEDS CLARIFICATION]` restante. Os pontos que exigiriam pesquisa adicional
(estrutura real do upstream, mecanismo de validação, origem da categoria) foram
todos resolvidos por inspeção direta do repositório, documentada acima.
