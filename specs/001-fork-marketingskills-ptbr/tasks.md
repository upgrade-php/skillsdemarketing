---

description: "Task list template for feature implementation"
---

# Tasks: Fork do Catálogo MarketingSkills em pt-BR

**Input**: Design documents from `specs/001-fork-marketingskills-ptbr/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md (all present)

**Tests**: Não solicitados explicitamente na spec. `node --test` para os dois scripts
novos está incluído como tarefa de implementação (plan.md § Testing), não como
gate TDD.

**Organization**: Tarefas agrupadas por user story (P1/P2/P3 da spec), para permitir
implementação e teste independentes de cada uma.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências pendentes)
- **[Story]**: A qual user story a tarefa pertence (US1, US2, US3)
- Caminhos de arquivo exatos em cada descrição

## Path Conventions

Projeto único (sem frontend/backend) — caminhos relativos à raiz do repositório,
conforme `plan.md` § Project Structure.

---

## Phase 1: Setup

**Purpose**: Inicialização do ambiente antes de trazer qualquer conteúdo do upstream

- [ ] T001 Configurar remote `upstream` apontando para
  `https://github.com/coreyhaines31/marketingskills.git` (FR-001)
- [ ] T002 [P] Confirmar Node.js LTS (20+) disponível localmente e no runner de CI
  para os scripts novos (research.md § Stack técnica)
- [ ] T003 [P] Criar `scripts/categories.json` com um objeto JSON vazio `{}` como
  esqueleto (data-model.md § Mapeamento de categorias)
- [ ] T004 [P] Criar `GLOSSARY.md` com cabeçalho e tabela vazia (colunas: termo en,
  tradução pt-BR, notas de uso) (data-model.md § Entrada de glossário, FR-013)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Trazer o conteúdo base do upstream para o fork — nenhuma user story
pode começar sem isso, pois não há skills, docs ou plugin manifest para adaptar,
sincronizar ou exportar

**🚨 CRITICAL**: Nenhuma tarefa de user story pode começar até esta fase terminar

- [ ] T005 Importar `skills/`, `tools/`, `scripts/sync-partners.mjs`,
  `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `partners.json`,
  `README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `LICENSE`,
  `VERSIONS.md` de `upstream/main` para o fork, preservando a estrutura de pastas
  (bloqueia todas as user stories)
- [ ] T006 Registrar a SHA do `upstream/main` importada em `.specify/sync-state.json`
  (campos `last_synced_sha`, `last_synced_at`) (data-model.md § Registro de
  sincronização) (depende de T005)
- [ ] T007 Reconciliar o `CONTRIBUTING.md` já existente no fork (fluxo de
  branch/PR) com o `CONTRIBUTING.md` importado do upstream (guia de autoria de
  skill) em um único arquivo coerente (depende de T005)
- [ ] T008 Remover/neutralizar `partners.json`, `tools/PARTNERS.md` e o bloco
  `<!-- PARTNERS:START/END -->` do `README.md` importado; não executar
  `scripts/sync-partners.mjs` no fork (Princípio III, FR-010) (depende de T005)

**Checkpoint**: conteúdo base do upstream presente no fork — as 3 user stories
podem começar (em paralelo, se houver capacidade).

---

## Phase 3: User Story 1 - Instalar e usar o catálogo adaptado em pt-BR (Priority: P1) 🎯 MVP

**Goal**: Um profissional de marketing brasileiro instala o catálogo com o mesmo
comando do original e aciona skills adaptadas com gatilhos em português natural.

**Independent Test**: Instalar o fork via `npx skills add <fork>` (ou
`/plugin marketplace add`) em ambiente limpo, confirmar instalação sem erro, e
acionar uma skill adaptada com frase em português natural.

### Documentação (User Story 1)

- [ ] T009 [US1] Traduzir `README.md` para pt-BR, com nota de atribuição
  não-oficial, link e crédito ao repositório original, e licença MIT visível no
  topo (FR-002, FR-009) (depende de T005, T008)
- [ ] T010 [P] [US1] Traduzir `CLAUDE.md` para pt-BR (FR-009) (depende de T005)
- [ ] T011 [P] [US1] Traduzir `AGENTS.md` para pt-BR (FR-009) (depende de T005)
- [ ] T012 [US1] Traduzir o conteúdo de autoria de skill herdado dentro do
  `CONTRIBUTING.md` reconciliado para pt-BR (FR-009) (depende de T007)
- [ ] T013 [US1] Revisar e testar a seção de instalação do `README.md` traduzido
  (`npx skills add`, `/plugin marketplace add`) contra o fork real (FR-009, SC-002)
  (depende de T009)

### Adaptação das skills — lote core (alta prioridade, ~15, Fase 2 do PRD)

> Cada tarefa: manter `name` inalterado (kebab-case, inglês); reescrever
> `description` e corpo em pt-BR natural, adaptado ao contexto brasileiro (Pix,
> WhatsApp, infoproduto, LGPD onde aplicável), sem tradução literal; preservar
> blocos de código/caminhos/identificadores técnicos inalterados; `references/*.md`
> e `evals/evals.json` permanecem inalterados nesta feature (FR-003–FR-006,
> research.md § Escopo de adaptação). Revisão e aprovação do mantenedor antes do
> merge conforme FR-011 (fluxo de branch + PR já estabelecido no repositório).

- [ ] T014 [P] [US1] Adaptar `skills/cro/SKILL.md` ao pt-BR
- [ ] T015 [P] [US1] Adaptar `skills/copywriting/SKILL.md` ao pt-BR
- [ ] T016 [P] [US1] Adaptar `skills/seo-audit/SKILL.md` ao pt-BR
- [ ] T017 [P] [US1] Adaptar `skills/emails/SKILL.md` ao pt-BR
- [ ] T018 [P] [US1] Adaptar `skills/social/SKILL.md` ao pt-BR
- [ ] T019 [P] [US1] Adaptar `skills/ads/SKILL.md` ao pt-BR
- [ ] T020 [P] [US1] Adaptar `skills/analytics/SKILL.md` ao pt-BR
- [ ] T021 [P] [US1] Adaptar `skills/pricing/SKILL.md` ao pt-BR
- [ ] T022 [P] [US1] Adaptar `skills/launch/SKILL.md` ao pt-BR
- [ ] T023 [P] [US1] Adaptar `skills/onboarding/SKILL.md` ao pt-BR
- [ ] T024 [P] [US1] Adaptar `skills/signup/SKILL.md` ao pt-BR
- [ ] T025 [P] [US1] Adaptar `skills/popups/SKILL.md` ao pt-BR
- [ ] T026 [P] [US1] Adaptar `skills/copy-editing/SKILL.md` ao pt-BR
- [ ] T027 [P] [US1] Adaptar `skills/content-strategy/SKILL.md` ao pt-BR
- [ ] T028 [P] [US1] Adaptar `skills/customer-research/SKILL.md` ao pt-BR

### Adaptação das skills — lote restante (35, Fase 3 do PRD)

> Mesmos critérios do lote core acima (FR-003–FR-006).

- [ ] T029 [P] [US1] Adaptar `skills/ab-testing/SKILL.md` ao pt-BR
- [ ] T030 [P] [US1] Adaptar `skills/ad-creative/SKILL.md` ao pt-BR
- [ ] T031 [P] [US1] Adaptar `skills/ai-seo/SKILL.md` ao pt-BR
- [ ] T032 [P] [US1] Adaptar `skills/aso/SKILL.md` ao pt-BR
- [ ] T033 [P] [US1] Adaptar `skills/attribution/SKILL.md` ao pt-BR
- [ ] T034 [P] [US1] Adaptar `skills/churn-prevention/SKILL.md` ao pt-BR
- [ ] T035 [P] [US1] Adaptar `skills/co-marketing/SKILL.md` ao pt-BR
- [ ] T036 [P] [US1] Adaptar `skills/cold-email/SKILL.md` ao pt-BR
- [ ] T037 [P] [US1] Adaptar `skills/community-marketing/SKILL.md` ao pt-BR
- [ ] T038 [P] [US1] Adaptar `skills/competitor-profiling/SKILL.md` ao pt-BR
- [ ] T039 [P] [US1] Adaptar `skills/competitors/SKILL.md` ao pt-BR
- [ ] T040 [P] [US1] Adaptar `skills/directory-submissions/SKILL.md` ao pt-BR
- [ ] T041 [P] [US1] Adaptar `skills/events/SKILL.md` ao pt-BR
- [ ] T042 [P] [US1] Adaptar `skills/free-tools/SKILL.md` ao pt-BR
- [ ] T043 [P] [US1] Adaptar `skills/image/SKILL.md` ao pt-BR
- [ ] T044 [P] [US1] Adaptar `skills/influencer-marketing/SKILL.md` ao pt-BR
- [ ] T045 [P] [US1] Adaptar `skills/lead-magnets/SKILL.md` ao pt-BR
- [ ] T046 [P] [US1] Adaptar `skills/marketing-council/SKILL.md` ao pt-BR
- [ ] T047 [P] [US1] Adaptar `skills/marketing-ideas/SKILL.md` ao pt-BR
- [ ] T048 [P] [US1] Adaptar `skills/marketing-loops/SKILL.md` ao pt-BR
- [ ] T049 [P] [US1] Adaptar `skills/marketing-plan/SKILL.md` ao pt-BR
- [ ] T050 [P] [US1] Adaptar `skills/marketing-psychology/SKILL.md` ao pt-BR
- [ ] T051 [P] [US1] Adaptar `skills/offers/SKILL.md` ao pt-BR
- [ ] T052 [P] [US1] Adaptar `skills/paywalls/SKILL.md` ao pt-BR
- [ ] T053 [P] [US1] Adaptar `skills/product-marketing/SKILL.md` ao pt-BR
- [ ] T054 [P] [US1] Adaptar `skills/programmatic-seo/SKILL.md` ao pt-BR
- [ ] T055 [P] [US1] Adaptar `skills/prospecting/SKILL.md` ao pt-BR
- [ ] T056 [P] [US1] Adaptar `skills/public-relations/SKILL.md` ao pt-BR
- [ ] T057 [P] [US1] Adaptar `skills/referrals/SKILL.md` ao pt-BR
- [ ] T058 [P] [US1] Adaptar `skills/revops/SKILL.md` ao pt-BR
- [ ] T059 [P] [US1] Adaptar `skills/sales-enablement/SKILL.md` ao pt-BR
- [ ] T060 [P] [US1] Adaptar `skills/schema/SKILL.md` ao pt-BR
- [ ] T061 [P] [US1] Adaptar `skills/site-architecture/SKILL.md` ao pt-BR
- [ ] T062 [P] [US1] Adaptar `skills/sms/SKILL.md` ao pt-BR
- [ ] T063 [P] [US1] Adaptar `skills/video/SKILL.md` ao pt-BR

### Validação (User Story 1)

- [ ] T064 [US1] Validar User Story 1 via `quickstart.md` § User Story 1 —
  instalação ponta a ponta em ambiente limpo (< 5 min, SC-002) e acionamento da
  skill `cro` com frase em pt-BR natural (depende de T009–T063)

**Checkpoint**: User Story 1 completa e testável de forma independente — MVP
pronto para demonstração.

---

## Phase 4: User Story 2 - Sincronizar o fork com o upstream (Priority: P2)

**Goal**: O mantenedor identifica rapidamente o que mudou no upstream desde a
última sincronização e mantém consistência terminológica via glossário.

**Independent Test**: Configurar o remote `upstream`, gerar o diff de skills
alteradas desde a última sincronização, confirmar que o glossário resolve os
termos já usados nas skills adaptadas.

### Implementação (User Story 2)

- [ ] T065 [P] [US2] Implementar `scripts/sync-diff.mjs`: lê
  `.specify/sync-state.json` (`last_synced_sha`), roda `git fetch upstream`,
  compara `upstream/main` contra essa SHA restrito a `skills/**/SKILL.md`, imprime
  a lista de skills alteradas (adicionadas/modificadas/removidas) (FR-014,
  research.md § Script de sincronização) (depende de T006)
- [ ] T066 [US2] Implementar a atualização de `.specify/sync-state.json`
  (`last_synced_sha`) após o mantenedor confirmar que tratou o diff (data-model.md
  § Registro de sincronização) (depende de T065)
- [ ] T067 [P] [US2] Adicionar `node --test` cobrindo `sync-diff.mjs` com um
  repositório git de teste (fixture local) simulando skills alteradas (plan.md §
  Testing) (depende de T065)
- [ ] T068 [US2] Popular `GLOSSARY.md` com os termos já usados nas skills
  adaptadas na User Story 1 (CRO, ICP, funil, ativação etc.) (FR-013, Acceptance
  Scenario 3) (depende de T004, T014–T063)

### Validação (User Story 2)

- [ ] T069 [US2] Validar User Story 2 via `quickstart.md` § User Story 2
  (`git remote -v`, `node scripts/sync-diff.mjs`, consulta ao `GLOSSARY.md`)
  (depende de T065–T068)

**Checkpoint**: User Stories 1 e 2 funcionam de forma independente.

---

## Phase 5: User Story 3 - Consumir metadados estruturados do catálogo (Priority: P3)

**Goal**: O responsável pelo site consome um export estruturado (nome, categoria,
descrição curta) de cada skill adaptada, sem reimplementar a extração.

**Independent Test**: Gerar o export a partir do estado atual do catálogo e
validar que contém nome, categoria e descrição curta para cada skill publicada,
sem depender do site existir.

### Implementação (User Story 3)

- [ ] T070 [US3] Preencher `scripts/categories.json` mapeando as 50 skills às 7
  categorias traduzidas do diagrama do README upstream (SEO e Conteúdo, CRO,
  Conteúdo e Copy, Pago e Mensuração, Crescimento e Retenção, Vendas e GTM,
  Estratégia) (data-model.md § Mapeamento de categorias) (depende de T005 —
  precisa apenas dos nomes das skills, não da adaptação pt-BR completa)
- [ ] T071 [P] [US3] Implementar `scripts/generate-catalog.mjs`: lê
  `skills/*/SKILL.md`, extrai `name` e `description` do frontmatter, cruza com
  `scripts/categories.json`, escreve `catalog.json` na raiz do repositório
  validando contra `contracts/catalog-export.schema.json` (campos obrigatórios
  `name`/`category`/`category` restrito ao enum de 7 valores/`description` com
  `maxLength: 200`) (FR-015, research.md § Script de export) (depende de T005)
- [ ] T072 [US3] Rodar `node scripts/generate-catalog.mjs` e commitar o
  `catalog.json` gerado (FR-015) (depende de T070, T071)
- [ ] T073 [P] [US3] Adicionar `node --test` cobrindo `generate-catalog.mjs`,
  validando a saída contra `contracts/catalog-export.schema.json` (plan.md §
  Testing) (depende de T071)

### Validação (User Story 3)

- [ ] T074 [US3] Validar User Story 3 via `quickstart.md` § User Story 3 (gerar
  `catalog.json`, adicionar uma skill nova a `scripts/categories.json`, confirmar
  que reaparece no export sem edição manual) (depende de T070–T073)

**Checkpoint**: as 3 user stories funcionam de forma independente.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Fechar os requisitos que atravessam todas as user stories

- [ ] T075 Criar `.github/workflows/validate-skill.yml` reusando
  `Flash-Brew-Digital/validate-skill@v1`, com detecção de skills alteradas via
  `git diff` no PR (mesmo padrão do workflow `validate-skill.yml` do upstream)
  (FR-012, research.md § Mecanismo de validação) (depende de T005)
- [ ] T076 Adicionar o novo check de validação de frontmatter à lista
  `required_status_checks` da ruleset da `main` no GitHub, ao lado do
  `pre-commit (hygiene + markdownlint)` já obrigatório (FR-012, Clarifications
  2026-09-10) (depende de T075)
- [ ] T077 [P] Confirmar que `validate-skills.sh` e `validate-skills-official.sh`
  (herdados, uso local) continuam funcionando sem modificação contra o catálogo
  adaptado (depende de T005, T014–T063)
- [ ] T078 Rodar `quickstart.md` de ponta a ponta (as 3 user stories em sequência)
  como validação final antes do lançamento (depende de T064, T069, T074)
- [ ] T079 [P] Registrar a adaptação inicial em `VERSIONS.md` (mantém paridade com
  a convenção de changelog já usada pelo upstream) (depende de T005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sem dependências — pode começar imediatamente
- **Foundational (Phase 2)**: depende do Setup — BLOQUEIA todas as user stories
- **User Stories (Phase 3-5)**: todas dependem da Foundational completa
  - US1 (P1), US2 (P2) e US3 (P3) podem prosseguir em paralelo se houver
    capacidade (US3 só precisa dos nomes das skills de T005, não da adaptação
    completa de US1; US2 precisa parcialmente do conteúdo adaptado de US1 só para
    popular o glossário em T068)
  - Sequencialmente, a ordem de prioridade é P1 → P2 → P3
- **Polish (Phase 6)**: depende das user stories desejadas estarem completas
  (T078 especificamente depende das 3 validações)

### User Story Dependencies

- **User Story 1 (P1)**: depende só da Foundational — sem dependência de US2/US3
- **User Story 2 (P2)**: depende da Foundational; T068 (popular glossário) usa o
  conteúdo adaptado em US1, mas T065-T067 (o script em si) são independentes
- **User Story 3 (P3)**: depende só da Foundational (T005) — não depende de US1
  estar completa, só dos nomes das 50 skills já existirem

### Dentro de cada User Story

- Documentação e scripts antes das tarefas de validação
- Tarefas de adaptação de skill (T014-T063) são todas paralelas entre si — cada
  uma toca um arquivo `SKILL.md` diferente
- Validação (quickstart) por último em cada fase

### Parallel Opportunities

- T002-T004 (Setup) em paralelo
- T010, T011 (traduções de doc) em paralelo entre si
- T014-T063 (as 50 adaptações de skill) inteiramente em paralelo entre si —
  maior bloco de paralelismo da feature
- T065, T067 em paralelo (implementação e teste do sync-diff podem ser
  desenvolvidos por pessoas diferentes, teste depende só da implementação existir)
- T071, T073 em paralelo (mesma lógica)
- T077, T079 em paralelo com o restante do Polish

---

## Parallel Example: User Story 1 (lote core)

```bash
# As 15 adaptações do lote core podem ser despachadas juntas:
Task: "Adaptar skills/cro/SKILL.md ao pt-BR"
Task: "Adaptar skills/copywriting/SKILL.md ao pt-BR"
Task: "Adaptar skills/seo-audit/SKILL.md ao pt-BR"
# ...T017-T028 seguem o mesmo padrão
```

---

## Implementation Strategy

### MVP First (User Story 1 apenas)

1. Completar Fase 1: Setup
2. Completar Fase 2: Foundational (CRÍTICO — bloqueia todas as user stories)
3. Completar Fase 3: User Story 1 (documentação + 50 skills adaptadas)
4. **PARAR e VALIDAR**: rodar `quickstart.md` § User Story 1 de forma independente
5. Lançar o fork nesse ponto já entrega o catálogo instalável em pt-BR (G1)

### Incremental Delivery

1. Setup + Foundational → base do upstream disponível no fork
2. User Story 1 → testar independentemente → **este é o lançamento v1 (G1, G4)**
3. User Story 2 → testar independentemente → processo de manutenção contínua (G3)
4. User Story 3 → testar independentemente → desbloqueia a iniciativa do site (G2)
5. Polish → CI de validação de frontmatter obrigatório (FR-012) fecha o requisito
   restante antes de considerar a v1 "completa" no sentido do PRD (R2 métrica:
   50/50 frontmatters validados)

### Parallel Team Strategy

Com mais de uma pessoa disponível:

1. Uma pessoa completa Setup + Foundational
2. A partir daí:
   - Pessoa A: tradução de docs (T009-T013) + lote core de skills (T014-T028)
   - Pessoa B: lote restante de skills (T029-T063)
   - Pessoa C: scripts de US2/US3 (T065-T074) + Polish (T075-T079), que não
     dependem da adaptação de skill estar terminada (exceto T068, T077, T078)
3. Como revisor único (Princípio IV da constituição), toda PR de adaptação de
   skill ainda passa pela aprovação do mesmo mantenedor antes do merge — o
   paralelismo é na produção do conteúdo, não na revisão

---

## Notes

- [P] = arquivos diferentes, sem dependências pendentes
- [Story] mapeia a tarefa à user story correspondente, para rastreabilidade
- Cada user story é completável e testável de forma independente
- As 50 tarefas de adaptação de skill (T014-T063) seguem individualmente o fluxo
  de branch + PR já estabelecido no repositório (`CONTRIBUTING.md`) — cada uma é
  um PR revisado e aprovado pelo mantenedor (FR-011) antes do merge
- Parar em qualquer checkpoint para validar uma story de forma independente
