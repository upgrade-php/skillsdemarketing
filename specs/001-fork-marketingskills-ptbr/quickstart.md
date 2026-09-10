# Quickstart: validar a feature 001 ponta a ponta

Cenários de validação executáveis para as 3 User Stories da spec. Cada um é
independente — não é preciso rodar todos em sequência.

## Pré-requisitos

- Git configurado com acesso ao fork (`origin`) e ao repositório original
  (`upstream` — ver FR-001).
- Node.js LTS (já disponível neste ambiente).
- Para a validação local de frontmatter (opcional, espelha o CI): `uv` (já
  disponível) ou o script `validate-skills.sh` herdado do upstream.

## User Story 1 — Instalar e usar o catálogo adaptado (P1)

1. Em um diretório limpo, instale o catálogo do fork:

   ```bash
   npx skills add <org>/skillsdemarketing
   ```

2. **Esperado**: instalação conclui sem erro em menos de 5 minutos (SC-002).
3. Abra um agente compatível (ex. Claude Code) e descreva uma tarefa em português
   natural, ex.: *"essa página não está convertendo"*.
4. **Esperado**: a skill `cro` é acionada (Acceptance Scenario 2 da User Story 1).
5. Abra `skills/cro/SKILL.md` no fork instalado e confirme:
   - `name: cro` (inglês, kebab-case, inalterado — FR-004)
   - `description` e corpo em português natural, não tradução literal
   - Nenhum bloco de código ou caminho de arquivo traduzido (FR-006)

## User Story 2 — Sincronizar com o upstream (P2)

1. No repositório do fork:

   ```bash
   git remote -v
   ```

   **Esperado**: `origin` (fork) e `upstream` (`coreyhaines31/marketingskills`)
   ambos listados (Acceptance Scenario 1).

2. Rode o script de diff:

   ```bash
   node scripts/sync-diff.mjs
   ```

   **Esperado**: lista de skills alteradas no `upstream/main` desde
   `.specify/sync-state.json.last_synced_sha`, sem precisar abrir cada arquivo
   manualmente (Acceptance Scenario 2; ver `data-model.md` § Registro de
   sincronização).

3. Abra `GLOSSARY.md` e confirme que os termos usados em uma skill já adaptada (ex.
   CRO, funil, ativação) aparecem com tradução registrada (Acceptance Scenario 3).

## User Story 3 — Consumir metadados estruturados (P3)

1. Gere o export:

   ```bash
   node scripts/generate-catalog.mjs
   ```

2. **Esperado**: `catalog.json` é criado/atualizado na raiz do repositório,
   validando contra `contracts/catalog-export.schema.json` — cada entrada tem
   `name`, `category` e `description` (Acceptance Scenario 1).
3. Adapte uma nova skill (adicione sua entrada em `scripts/categories.json`) e rode
   `generate-catalog.mjs` de novo.
4. **Esperado**: a nova skill aparece em `catalog.json` sem edição manual do arquivo
   (Acceptance Scenario 2).

## Validação de frontmatter (FR-012)

- **No CI**: abra um PR alterando um `SKILL.md` — o status check
  `validate-skill` (novo workflow, ver `research.md` § Mecanismo de validação) MUST
  rodar automaticamente e bloquear o merge se o frontmatter for inválido.
- **Localmente** (opcional, espelha o CI): `bash validate-skills.sh` ou
  `bash validate-skills-official.sh` (herdados do upstream, sem modificação).

## Critérios de sucesso cobertos

| Cenário acima | Success Criteria da spec |
|---|---|
| Instalação (US1, passo 1-2) | SC-002 |
| Skills adaptadas publicadas | SC-001 (validado no lançamento, não neste quickstart) |
| Validação de frontmatter | SC-003 |
| Script de diff (US2, passo 2) | SC-004 (medido ao longo do tempo, não neste quickstart) |
| Export do catálogo (US3) | Suporta User Story 3; sem SC dedicado |
