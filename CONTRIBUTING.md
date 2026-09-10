# Contribuindo

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
