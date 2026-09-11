# Implementation Plan: Fork do Catálogo MarketingSkills em pt-BR

**Branch**: `001-fork-marketingskills-ptbr` | **Date**: 2026-09-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-fork-marketingskills-ptbr/spec.md`

## Summary

Adaptar as 50 skills do catálogo `coreyhaines31/marketingskills` (MIT) para pt-BR
sem reescrever a metodologia de cada uma, preservando compatibilidade técnica com o
instalador (`npx skills add`) e o Plugin Marketplace. Além da adaptação de conteúdo
(processo de revisão, fora do escopo de "código" deste plano), a feature entrega três
peças de tooling novas, todas em Node.js puro sem dependências externas, espelhando a
filosofia zero-dependência do repositório original: um script de diff contra o
upstream (`scripts/sync-diff.mjs`, FR-014), um gerador do export estruturado do
catálogo (`scripts/generate-catalog.mjs`, FR-015) e um novo status check de CI que
reusa a action de validação de frontmatter já usada pelo upstream
(`Flash-Brew-Digital/validate-skill@v1`, FR-012).

## Technical Context

**Language/Version**: Node.js LTS (20+) — mesma stack do upstream, que não tem
`package.json` nem dependências externas (ver `research.md`).

**Primary Dependencies**: Nenhuma dependência de terceiros nos scripts novos (só
módulos nativos `fs`, `path`, `child_process`). CI reusa a GitHub Action de terceiros
`Flash-Brew-Digital/validate-skill@v1`, já usada pelo upstream.

**Storage**: N/A — sem banco de dados. Todas as entidades são arquivos versionados
(Markdown, JSON) no próprio repositório; ver `data-model.md`.

**Testing**: `node --test` para os dois scripts novos (sem framework externo,
mesma filosofia zero-dependência); validação de frontmatter via a action de CI
herdada do upstream (matrix por skill alterada) + scripts shell herdados
(`validate-skills.sh`, `validate-skills-official.sh`) para checagem manual local.

**Target Platform**: GitHub Actions (`ubuntu-slim`, mesmo runner do upstream) para
CI; scripts rodam localmente via Node.js em qualquer SO (incluindo a máquina Windows
do mantenedor).

**Project Type**: Repositório de conteúdo (catálogo de skills) com tooling de
manutenção leve — não é um serviço/aplicação; sem frontend/backend.

**Performance Goals**: Sem meta de performance de sistema. SC-002 (instalação em
menos de 5 minutos) é governado pela ferramenta externa `npx skills` já mantida pelo
upstream, não por código desta feature. Os scripts novos devem rodar em segundos
contra 50 skills — suficiente para uso interativo pelo mantenedor.

**Constraints**: MUST NOT modificar `scripts/sync-partners.mjs` ou reintroduzir
conteúdo de `partners.json`/`tools/PARTNERS.md` (Princípio III); MUST preservar
`name` kebab-case e frontmatter válido em toda skill adaptada (Princípio II); os
scripts novos MUST seguir a mesma convenção zero-dependência do upstream, para
minimizar atrito em sincronizações futuras (Princípio V).

**Scale/Scope**: 50 skills no lançamento (SC-001); scripts devem suportar
confortavelmente 100+ skills sem mudança de abordagem.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Gate | Resultado |
|---|---|---|
| I. Adaptação Fiel, Não Tradução Literal | O plano não prescreve reescrever a metodologia de nenhuma skill; escopo de tooling é só suporte ao processo de adaptação | PASS |
| II. Compatibilidade Técnica Preservada | Novo CI de frontmatter (FR-012) reforça — não afrouxa — a garantia de `name`/YAML válidos; scripts não tocam a estrutura de pastas existente | PASS |
| III. Atribuição e Licença | `scripts/sync-partners.mjs` e `partners.json`/`tools/PARTNERS.md` explicitamente fora do escopo de qualquer script novo (research.md, data-model.md) | PASS |
| IV. Revisão Única Antes do Merge | Nenhuma mudança na exigência de aprovação da ruleset da `main` (`required_approving_review_count: 0` já reflete revisor único); novos CI checks são adicionais, não substituem a revisão humana | PASS |
| V. Sincronização Periódica com o Upstream | `sync-diff.mjs` é executado sob demanda pelo mantenedor (FR-014), não um listener contínuo — mantém sincronização periódica, não tempo real | PASS |

Nenhuma violação — `Complexity Tracking` fica vazio (ver seção abaixo).

**Post-Phase 1 re-check**: `data-model.md`, `contracts/catalog-export.schema.json` e
`quickstart.md` não introduzem nenhuma dependência nova, banco de dados, ou processo
de revisão adicional além do já coberto acima. Gates continuam PASS.

## Project Structure

### Documentation (this feature)

```text
specs/001-fork-marketingskills-ptbr/
├── plan.md              # Este arquivo
├── research.md          # Fase 0 — achados da inspeção do upstream
├── data-model.md         # Fase 1 — forma de cada entidade (todas são arquivos)
├── quickstart.md         # Fase 1 — roteiro de validação das 3 User Stories
├── contracts/
│   └── catalog-export.schema.json   # Fase 1 — contrato do catalog.json (User Story 3)
└── tasks.md              # Fase 2 — gerado por /speckit-tasks (não por este comando)
```

### Source Code (repository root)

```text
skills/<nome>/SKILL.md          # Conteúdo adaptado (frontmatter + corpo) — 50 diretórios,
                                  # layout herdado do upstream, sem mudança estrutural
skills/<nome>/references/*.md   # Herdado do upstream, sem tradução nesta feature
skills/<nome>/evals/evals.json  # Herdado do upstream, sem tradução nesta feature
skills/<nome>/assets/*          # Herdado do upstream, quando existir

tools/                           # Herdado do upstream, inalterado (código em inglês,
                                  # coberto pelo CodeQL já configurado no repositório)

scripts/
├── sync-diff.mjs               # NOVO — FR-014
├── generate-catalog.mjs        # NOVO — FR-015
├── categories.json             # NOVO — mapeamento de categoria por skill (data-model.md)
└── sync-partners.mjs           # Herdado do upstream — MUST NOT ser executado/mantido (Princípio III)

.claude-plugin/
├── marketplace.json            # Herdado/adaptado do upstream (FR-008)
└── plugin.json                 # Herdado/adaptado do upstream (FR-008)

.specify/
└── sync-state.json             # NOVO — estado versionado (compartilhado pelo time) do último sync
                                  # (corrigido durante /speckit-implement — ver data-model.md)

GLOSSARY.md                      # NOVO — FR-013
README.md / CLAUDE.md / AGENTS.md / CONTRIBUTING.md   # Traduzidos (FR-009), já existentes no fork

.github/workflows/
├── validate-skill.yml          # NOVO — FR-012, reusa Flash-Brew-Digital/validate-skill@v1
├── ci.yml                      # Existente (pre-commit) — sem mudança
└── codeql.yml                  # Existente — sem mudança

catalog.json                     # NOVO — gerado por scripts/generate-catalog.mjs, versionado (FR-015)
```

**Structure Decision**: projeto único (sem frontend/backend) — o repositório em si
*é* o produto entregue por esta feature. A estrutura acima estende o layout já
herdado do upstream (`skills/`, `tools/`, `scripts/`, `.claude-plugin/`) em vez de
introduzir uma reorganização, conforme Princípio II (compatibilidade técnica) e
Princípio V (sincronização — menos divergência estrutural, mais fácil sincronizar).

## Complexity Tracking

*Vazio — nenhum gate do Constitution Check foi violado.*
