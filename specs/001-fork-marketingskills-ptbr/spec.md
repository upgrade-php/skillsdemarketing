# Feature Specification: Fork do Catálogo MarketingSkills em pt-BR

**Feature Branch**: `001-fork-marketingskills-ptbr`

**Created**: 2026-09-10

**Status**: Draft

**Input**: User description: "leia o arquivo @prd-marketingskills-ptbr.md e crie as especificaçãoes"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Instalar e usar o catálogo adaptado em pt-BR (Priority: P1)

Como profissional de marketing brasileiro usando um agente de IA (Claude Code, Cursor),
quero instalar o catálogo de skills em português com o mesmo comando do repositório
original, com gatilhos e exemplos em português natural, para executar tarefas de
marketing com qualidade sênior sem depender de conteúdo em inglês.

**Why this priority**: É o valor central do produto — sem isso, o fork não entrega nada
que o time BR não pudesse já obter usando o repositório original em inglês. Cobre os
requisitos P0 do PRD (fork configurado, catálogo adaptado, compatibilidade técnica,
documentação traduzida).

**Independent Test**: Pode ser testado integralmente instalando o fork via
`npx skills add <fork>` (ou `/plugin marketplace add`) em um ambiente limpo,
confirmando que a instalação conclui sem erro, e acionando uma skill adaptada com uma
frase em português natural, confirmando que ela responde com o conteúdo adaptado — não
o original em inglês.

**Acceptance Scenarios**:

1. **Given** um agente de IA compatível sem as skills instaladas, **When** o usuário
   roda o comando de instalação apontando para o fork, **Then** todas as skills são
   instaladas sem erro em menos de 5 minutos.
2. **Given** as skills instaladas a partir do fork, **When** o usuário descreve uma
   tarefa de marketing usando linguagem natural em português (ex.: "essa página não
   está convertendo"), **Then** a skill correspondente (ex.: `cro`) é acionada
   corretamente.
3. **Given** uma skill adaptada, **When** o usuário lê seu conteúdo, **Then** a chave
   técnica `name` está preservada em inglês/kebab-case e nenhum bloco de código ou
   caminho de arquivo foi traduzido indevidamente.
4. **Given** o README do fork, **When** um novo usuário abre o repositório, **Then**
   ele identifica imediatamente que é uma adaptação não-oficial, com crédito e link ao
   projeto original e à licença MIT.

---

### User Story 2 - Sincronizar o fork com o upstream (Priority: P2)

Como mantenedor(a) do fork, quero um processo documentado (remote `upstream` + diff) e
um glossário de termos consistente, para identificar rapidamente o que mudou no
original e manter a defasagem dentro da meta, sem perder consistência terminológica
entre as skills.

**Why this priority**: Depende do catálogo já existir (User Story 1), mas é essencial
para o fork continuar confiável ao longo do tempo — sem isso, o catálogo fica
desatualizado e perde valor rapidamente.

**Independent Test**: Pode ser testado configurando o remote `upstream`, gerando um
diff das skills alteradas desde a última sincronização, e confirmando que o glossário
resolve os termos já usados nas skills adaptadas.

**Acceptance Scenarios**:

1. **Given** o repositório do fork, **When** o mantenedor roda `git remote -v`,
   **Then** tanto `origin` (fork) quanto `upstream` (original) aparecem configurados.
2. **Given** uma atualização no repositório original, **When** o mantenedor executa o
   processo de diff, **Then** a lista de skills alteradas desde a última sincronização
   é identificada sem revisão manual arquivo por arquivo.
3. **Given** o glossário de termos, **When** uma nova skill é adaptada, **Then** os
   termos usados (CRO, ICP, funil, ativação etc.) seguem a tradução já registrada.

---

### User Story 3 - Consumir metadados estruturados do catálogo (Priority: P3)

Como responsável pela marca/site skillsdemarketing.com.br, quero um export estruturado
(nome, categoria, descrição curta em pt-BR) de cada skill adaptada, para popular um
catálogo navegável no site, sem precisar reimplementar a extração de metadados.

**Why this priority**: É o valor mais "downstream" — depende do catálogo (User Story 1)
já estar adaptado, e a construção do site em si é um projeto à parte, fora de escopo
aqui. Esta história cobre apenas a entrega dos dados.

**Independent Test**: Pode ser testado gerando o export a partir do estado atual do
catálogo adaptado e validando que ele contém nome, categoria e descrição curta para
cada skill publicada, sem depender do site existir.

**Acceptance Scenarios**:

1. **Given** o catálogo com skills adaptadas, **When** o export é gerado, **Then** o
   resultado é um arquivo estruturado contendo nome, categoria e descrição curta em
   pt-BR para cada skill publicada.
2. **Given** uma skill recém-adaptada, **When** o export é regenerado, **Then** a nova
   skill aparece no resultado sem exigir edição manual do arquivo de export.

---

### Edge Cases

- O que acontece quando uma skill do upstream muda depois de já ter sido adaptada no
  fork, deixando a adaptação existente desatualizada em relação ao novo conteúdo
  original?
- Como o processo trata uma skill cujo exemplo/contexto brasileiro não tem equivalente
  direto (ex.: um canal ou meio de pagamento sem uso relevante no Brasil)?
- O que acontece se uma nova skill for adicionada no upstream usando um termo que ainda
  não está registrado no glossário?
- Como o processo impede que o bloco de patrocinadores do original seja reintroduzido
  acidentalmente em uma sincronização futura?
- O que acontece se a defasagem em relação ao upstream ultrapassar a meta de 14 dias?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O fork MUST ser um repositório público no GitHub derivado do
  repositório original, com um remote `upstream` configurado apontando para o
  original.
- **FR-002**: O README do fork MUST identificar claramente que se trata de uma
  tradução/adaptação não-oficial, com link e crédito ao repositório original e à
  licença MIT preservada.
- **FR-003**: As 50 skills do catálogo MUST ter seu `SKILL.md` integralmente
  adaptado ao contexto brasileiro — frontmatter, corpo, exemplos e gatilhos em
  português natural, não traduzido literalmente.
- **FR-004**: A chave `name` de cada skill MUST permanecer em inglês/kebab-case,
  inalterada, para preservar a compatibilidade com o instalador.
- **FR-005**: Exemplos, canais e casos de uso de cada skill MUST ser adaptados à
  realidade brasileira (ex.: Pix, WhatsApp, infoproduto, LGPD onde aplicável) sem
  alterar a metodologia estratégica original da skill.
- **FR-006**: Blocos de código, caminhos de arquivo e identificadores técnicos dentro
  do conteúdo das skills MUST NOT ser traduzidos.
- **FR-007**: O catálogo adaptado MUST instalar sem erros via `npx skills add <fork>`.
- **FR-008**: Os metadados de plugin do fork MUST ser reconhecidos por
  `/plugin marketplace add`.
- **FR-009**: A documentação do repositório (README, CLAUDE.md, AGENTS.md,
  CONTRIBUTING.md) MUST estar traduzida para pt-BR, revisada, com a seção de
  instalação testada e funcional.
- **FR-010**: O fork MUST NOT replicar o programa de parceiros do repositório
  original (`partners.json`, `tools/PARTNERS.md` ou qualquer bloco de
  patrocinadores).
- **FR-011**: Cada skill adaptada MUST ser revisada e aprovada pelo mantenedor
  designado antes do merge (processo de revisor único na v1).
- **FR-012**: O frontmatter de cada `SKILL.md` adaptado MUST passar na validação
  automática de frontmatter do repositório antes do merge.
- **FR-013**: Um glossário de termos de marketing (pt-BR ↔ en) SHOULD ser mantido e
  consultado durante a adaptação, para garantir consistência terminológica entre as
  skills.
- **FR-014**: MUST existir um processo documentado (checklist ou script) que
  identifique quais skills mudaram no upstream desde a última sincronização.
- **FR-015**: O fork MUST disponibilizar um export estruturado (nome, categoria,
  descrição curta em pt-BR) do catálogo, apto a ser consumido por um site externo.

### Key Entities

- **Skill**: unidade do catálogo (`SKILL.md`). Atributos: chave técnica `name`
  (kebab-case, preservada em inglês), `description` (pt-BR natural), categoria, corpo
  de instruções, exemplos e gatilhos de invocação em pt-BR, status de adaptação
  (pendente/adaptada/revisada).
- **Entrada de glossário**: termo em inglês, tradução padronizada em pt-BR, notas de
  uso — referenciada durante a adaptação de qualquer skill.
- **Registro de sincronização**: referência à skill/commit do upstream, data em que a
  mudança foi detectada, status (pendente de adaptação / já sincronizada).
- **Entrada de export do catálogo**: nome da skill, categoria, descrição curta em
  pt-BR — consumida pelo site skillsdemarketing.com.br.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 50 de 50 skills adaptadas estão publicadas no lançamento do fork.
- **SC-002**: A instalação ponta a ponta — do comando de instalação até a skill
  pronta para uso — é concluída em menos de 5 minutos, sem erros.
- **SC-003**: 100% (50/50) dos arquivos de skill adaptados passam na validação
  automática de frontmatter.
- **SC-004**: A defasagem média do fork em relação ao upstream permanece igual ou
  abaixo de 14 dias, medida a cada ciclo de sincronização.
- **SC-005**: Um baseline de estrelas/forks do repositório pt-BR está registrado até
  30 dias após o lançamento, para acompanhamento futuro de adoção.
- **SC-006**: 100% das skills adaptadas foram revisadas e aprovadas pelo mantenedor
  designado antes do merge.

## Assumptions

- Scripts e lógica de validação do repositório (`scripts/*.mjs`) permanecem em
  inglês — são código, não conteúdo de skill, e ficam fora do escopo da adaptação.
- Revisor único (o mantenedor do fork) aprova cada skill adaptada antes do merge;
  não há exigência de dupla checagem nesta v1.
- A construção da interface pública do site skillsdemarketing.com.br é um projeto à
  parte; esta feature entrega apenas o catálogo adaptado e, opcionalmente, o export
  estruturado de metadados (User Story 3) que o site consumiria.
- Sincronização com o upstream é periódica (baseada em checklist/diff), não uma
  integração automática ou em tempo real.
- Automatizar parcialmente a tradução de novas skills via IA (mencionado no PRD como
  consideração futura) fica fora do escopo desta especificação; todo o ciclo inicial
  é de revisão manual.
- A infraestrutura de repositório já existente (GitHub, branch protegida exigindo PR,
  CI de hygiene/markdownlint, hooks de pre-commit e Conventional Commits) é reutilizada
  como está; esta feature não a modifica.
