<!--
Sync Impact Report
- Version change: (none) → 1.0.0 (initial ratification)
- Modified principles: n/a (first version)
- Added sections:
  - Core Principles: I. Adaptação Fiel, Não Tradução Literal; II. Compatibilidade Técnica
    Preservada; III. Atribuição e Licença; IV. Revisão Única Antes do Merge;
    V. Sincronização Periódica com o Upstream
  - Escopo e Não-Objetivos
  - Fluxo de Trabalho de Adaptação
  - Governance
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending manual review (verify its Constitution
    Check gates still make sense once the first feature spec exists)
  - .specify/templates/spec-template.md ✅ no direct constitution refs, no changes needed
  - .specify/templates/tasks-template.md ✅ no direct constitution refs, no changes needed
  - .specify/templates/checklist-template.md ✅ no direct constitution refs, no changes needed
- Follow-up TODOs: none — all placeholders resolved from prd-marketingskills-ptbr.md
-->

# MarketingSkills PT-BR Constitution

## Core Principles

### I. Adaptação Fiel, Não Tradução Literal

Cada skill adaptada MUST preservar a precisão técnica e estratégica da metodologia
original — a lógica por trás de cada skill NÃO MUST ser reescrita. Exemplos, canais e
casos MUST ser adaptados à realidade brasileira (Pix, WhatsApp, infoproduto, LGPD onde
aplicável) em vez de traduzidos palavra por palavra. Blocos de código, caminhos de
arquivo e nomes de variáveis MUST permanecer intactos — apenas prosa e exemplos são
adaptados.
**Rationale**: O valor do fork é método de nível sênior em português natural, não uma
tradução automática; perder fidelidade técnica anula o propósito do catálogo (G4, PRD §3).

### II. Compatibilidade Técnica Preservada

A chave `name` de cada skill MUST permanecer em inglês/kebab-case. A estrutura YAML do
frontmatter e a estrutura de pastas MUST permanecer válidas após qualquer adaptação.
Toda alteração MUST manter `npx skills add <fork>` e `/plugin marketplace add`
funcionando sem erros — nenhuma mudança de conteúdo pode quebrar a instalação.
**Rationale**: O catálogo só tem valor se continuar instalável pelos mesmos mecanismos
do projeto original (R3, PRD §6).

### III. Atribuição e Licença

Todo material derivado MUST manter atribuição clara ao repositório original
(`github.com/coreyhaines31/marketingskills`), ao autor e à licença MIT. O README do
fork MUST exibir essa atribuição, com link para o original, de forma visível no topo.
Conteúdo do programa de parceiros do original (`partners.json`, `tools/PARTNERS.md`,
bloco de patrocinadores) MUST NOT ser replicado no fork, por não existir acordo
comercial equivalente no Brasil.
**Rationale**: Licença MIT exige atribuição; divulgar patrocinadores sem vínculo
comercial seria enganoso (R1, R4, decisões registradas em PRD §8).

### IV. Revisão Única Antes do Merge

Nenhuma skill adaptada MUST ser mesclada sem aprovação explícita do mantenedor
designado (vpp.filho). Na v1, essa revisão é de revisor único — não há exigência de
dupla checagem.
**Rationale**: Garante um padrão mínimo de qualidade por skill sem impor um processo de
revisão mais pesado do que o time atual suporta (decisão registrada, PRD §8).

### V. Sincronização Periódica com o Upstream

O fork MUST manter um remote `upstream` apontando para o repositório original. A
defasagem entre o fork e o upstream MUST ser tratada como periódica, com meta de
≤ 14 dias após cada atualização do original — paridade em tempo real é
explicitamente fora de escopo.
**Rationale**: Sincronização real-time não é sustentável para um catálogo mantido por
revisor único; um alvo periódico e documentado é o compromisso realista (G3, PRD §3).

## Escopo e Não-Objetivos

- Scripts e lógica de validação (`scripts/*.mjs`) permanecem em inglês — são código,
  não conteúdo de skill, e MUST NOT ser traduzidos.
- Construir o site `skillsdemarketing.com.br` está fora de escopo deste repositório —
  o fork é a fonte de conteúdo; a interface pública é um projeto à parte.
- Administrar o programa de parceiros do original está fora de escopo (ver Princípio III).
- Reescrever a metodologia estratégica de qualquer skill está fora de escopo (ver
  Princípio I) — apenas adaptação de linguagem, exemplos e contexto.

## Fluxo de Trabalho de Adaptação

- Um glossário de termos de marketing (pt-BR ↔ en — CRO, ICP, funil, ativação, etc.)
  SHOULD ser mantido e consultado para garantir consistência terminológica entre as 50
  skills (R5).
- Todo `SKILL.md` adaptado MUST passar pelo script de validação de frontmatter do
  repositório antes do merge (métrica de lançamento: 50/50 frontmatters validados).
- Exportações estruturadas do catálogo (nome, categoria, descrição curta em pt-BR)
  destinadas ao consumo pelo site SHOULD ser mantidas atualizadas conforme skills são
  adaptadas (R7).

## Governance

Esta constituição prevalece sobre práticas ad-hoc de adaptação e revisão neste
repositório. Emendas MUST ser propostas via atualização deste documento, com a
justificativa da mudança registrada no Sync Impact Report, e MUST ser aprovadas pelo
mantenedor designado (Princípio IV) antes de entrarem em vigor.

Versionamento desta constituição segue semver:

- **MAJOR**: remoção ou redefinição incompatível de princípios/governança existentes.
- **MINOR**: novo princípio ou seção adicionada, ou orientação existente expandida
  materialmente.
- **PATCH**: esclarecimentos, correções de redação, refinamentos não semânticos.

Toda adaptação de skill MUST ser verificada contra os Princípios I–III antes do merge
(Princípio IV cobre o mecanismo de aprovação). Use `CLAUDE.md`/`AGENTS.md` do
repositório para orientação operacional do dia a dia; esta constituição rege apenas os
princípios não-negociáveis do projeto.

**Version**: 1.0.0 | **Ratified**: 2026-09-10 | **Last Amended**: 2026-09-10
