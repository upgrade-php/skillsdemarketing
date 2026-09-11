# Contribuindo

Obrigado pelo interesse em contribuir com o Skills de Marketing PT-BR! Este guia
cobre tanto o processo de repositório (branches, commits) quanto como adaptar ou
adicionar uma skill.

## Fluxo de branches e Pull Request

A `main` é protegida: mudanças só entram via Pull Request (push direto é
bloqueado pela ruleset do repositório).

1. Crie uma branch a partir da `main`. Sem convenção rígida de prefixo por
   enquanto — use algo descritivo, ex.: `feat/adapta-skill-cro`,
   `docs/glossario`, `ci/ajusta-workflow`.
2. Commit(s) na branch seguindo [Conventional Commits](#mensagens-de-commit).
3. Abra o PR (`gh pr create` ou pela interface do GitHub). O CI roda
   automaticamente:
   - **CI** (`pre-commit`) — hygiene checks + markdownlint.
   - **Skill frontmatter validation** — valida o frontmatter de todo `SKILL.md`
     alterado (ver [Adaptando ou adicionando uma skill](#adaptando-ou-adicionando-uma-skill)).
   - **CodeQL** — análise estática de código (relevante para `tools/*` e
     `scripts/*.mjs`, herdados do repositório original).
4. Com os checks obrigatórios verdes, faça o merge. Não há exigência de aprovação
   formal de um segundo revisor configurada na ruleset hoje — reflete o
   Princípio IV da [constituição](.specify/memory/constitution.md)
   (revisor único, v1). Isso é reavaliado se/quando houver um segundo
   colaborador com acesso ao repo.

## Mensagens de commit

Este repositório segue [Conventional Commits](https://www.conventionalcommits.org/).
Um hook de `commit-msg` (via [pre-commit](https://pre-commit.com)) valida a
mensagem automaticamente — commits fora do padrão são recusados.

Formato:

```text
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

Tipos aceitos neste repositório:

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade ou skill/documento adicionado |
| `fix` | Correção de erro |
| `docs` | Mudança só de documentação (README, PRD, constituição, etc.) |
| `style` | Formatação, sem mudança de conteúdo/lógica |
| `refactor` | Reestruturação sem mudar comportamento |
| `perf` | Melhoria de performance |
| `test` | Testes |
| `build` | Build, dependências, empacotamento |
| `ci` | Configuração de integração contínua |
| `chore` | Manutenção geral (tooling, config, etc.) |
| `revert` | Reversão de um commit anterior |

Exemplos:

```text
feat(skills): adapta skill cro ao contexto brasileiro
docs: atualiza glossário de termos pt-BR ↔ en
chore: configura hooks de pre-commit
fix(frontmatter): corrige chave name divergente em seo-audit
```

Mudança que quebra compatibilidade: acrescente `!` após o tipo/escopo
(`feat!: ...`) ou uma linha `BREAKING CHANGE:` no rodapé.

## Setup local

```powershell
uv tool install pre-commit
pre-commit install   # instala os hooks de pre-commit e commit-msg
```

Depois disso, todo `git commit` roda as checagens de higiene/markdown e
valida a mensagem automaticamente. Para rodar manualmente em todos os
arquivos: `pre-commit run --all-files`.

## Adaptando ou adicionando uma skill

Este repositório partiu do catálogo original em inglês
([coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills))
— o fork foi a iniciativa inicial. A primeira versão foi **adaptar** as skills
existentes ao pt-BR, mas isso não impede adicionar skills novas, desde que não
dupliquem uma já presente no catálogo.

Também é nossa responsabilidade evoluir as skills existentes a partir da nossa
visão e proposta de valor, sem nos prender ao fork original.

Para sugerir uma skill nova, [abra uma issue](https://github.com/upgrade-php/skillsdemarketing/issues/new)
neste repositório.

### Adaptando uma skill existente

1. Leia a skill original (`skills/<nome>/SKILL.md`) por completo antes de mexer.
2. Reescreva `description` e o corpo em português natural, adaptado ao contexto
   brasileiro (Pix, WhatsApp, infoproduto, LGPD onde aplicável) — **não** é
   tradução literal.
3. **MUST NOT** mudar: a chave `name` (kebab-case, inglês, idêntica ao nome da
   pasta), blocos de código, caminhos de arquivo, identificadores técnicos.
4. `references/*.md`, `evals/evals.json` e `assets/*` permanecem inalterados
   nesta fase — fora do escopo de adaptação atual.
5. Consulte o [`GLOSSARY.md`](GLOSSARY.md) para manter os termos consistentes com
   as demais skills já adaptadas.
6. Abra um PR só com essa skill (ou um pequeno lote relacionado) — cada PR passa
   pelo check automático de frontmatter e pela sua revisão antes do merge.

### Convenções de estrutura (herdadas do original)

```text
skills/nome-da-skill/
├── SKILL.md           # Obrigatório — frontmatter (name, description) + instruções
├── references/        # Opcional — documentação de apoio
├── evals/              # Opcional — casos de teste/avaliação
└── assets/             # Opcional — templates, imagens, dados
```

- **Nome da pasta**: minúsculo, só hífens (ex.: `emails`).
- **Campo `name`**: MUST ser idêntico ao nome da pasta.
- **`description`**: 1-1024 caracteres, incluindo os gatilhos de invocação em
  português natural.

## Checklist de qualidade da skill

- [ ] `name` idêntico ao nome da pasta, inalterado em relação ao original
- [ ] `description` e corpo em pt-BR natural, sem tradução literal
- [ ] Nenhum bloco de código, caminho ou identificador técnico traduzido
- [ ] Termos consistentes com o [`GLOSSARY.md`](GLOSSARY.md)
- [ ] Nenhum dado sensível ou credencial

## Dúvidas?

Abra uma issue neste repositório.
