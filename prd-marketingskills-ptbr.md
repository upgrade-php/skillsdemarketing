# MarketingSkills PT-BR

**PRD · Rascunho para aprovação**

Fork do catálogo de agent skills de marketing ([coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)) adaptado — não apenas traduzido — ao contexto de empreendedores brasileiros.

| | |
|---|---|
| **Repositório original** | <https://github.com/coreyhaines31/marketingskills> |
| **Fork pt-BR** | <https://github.com/upgrade-php/skillsdemarketing> |
| **Licença** | MIT |
| **Escopo v1** | 50 skills + docs do repo |
| **Data** | 10 set 2026 |
| **Autor** | vpp.filho |

---

## Proposta de valor

> Para **empreendedores brasileiros que usam agentes de IA para executar tarefas de marketing que não dominam** — que precisam produzir com mais qualidade sem virar especialistas em cada disciplina — o **Skills de Marketing** é uma biblioteca de skills adaptadas ao contexto brasileiro que fornece ao agente de IA processos e critérios de nível sênior para orientar a execução dessas tarefas.
>
> **Diferente de** usar uma IA generalista com prompts improvisados, o Skills de Marketing instala no agente a especialização necessária para executar marketing com mais método, consistência e qualidade.

---

## 1. Problema

Profissionais de marketing e agências brasileiras que usam agentes de IA (Claude Code, Cursor) não têm acesso, em português, ao catálogo open-source mais completo de instruções de marketing disponível hoje — `marketingskills`, 50 skills mantidas ativamente por Corey Haines, MIT.

Toda a documentação, os exemplos e os gatilhos de invocação estão em inglês. Isso cria fricção para quem pensa e escreve em português — a skill não é acionada nas próprias palavras do usuário — e limita a adoção entre times que já usam agentes no dia a dia. Sem uma versão em pt-BR, cada equipe recria suas próprias instruções ad-hoc, perdendo o benefício de um catálogo testado e mantido pela comunidade.

## 2. Objetivos

- **G1 · Catálogo** — Fork público com as 50 skills 100% adaptadas ao contexto brasileiro — não apenas traduzidas —, ids técnicos preservados para compatibilidade com o instalador (`npx skills add`) e o Plugin Marketplace.
- **G2 · Distribuição** — Fork serve de fonte de conteúdo para o catálogo navegável do skillsdemarketing.com.br.
- **G3 · Manutenção** — Processo replicável de sincronização com o upstream — defasagem alvo ≤ 14 dias após cada atualização do original.
- **G4 · Fidelidade** — Nenhuma skill perde instruções, gatilhos ou exemplos na adaptação — precisão técnica e estratégica preservada.
- **G5 · Adoção** — Tornar-se referência citável na comunidade de marketing BR (meta de estrelas/instalações a definir 30 dias pós-lançamento).

## 3. Não-objetivos

- **Scripts e lógica de validação** (`scripts/*.mjs`) permanecem em inglês — são código, não conteúdo de skill.
- **Reescrever a metodologia** de cada skill. Adaptamos exemplos, canais e contexto à realidade brasileira (Pix, WhatsApp, infoproduto, LGPD) — não mudamos a lógica estratégica por trás de cada skill.
- **Construir o site skillsdemarketing.com.br.** O fork é a fonte de conteúdo; a interface pública é um projeto à parte.
- **Administrar o programa de parceiros** do original. O bloco de patrocinadores (Converly, Ploy) não é replicado no fork — sem acordo comercial equivalente no Brasil.
- **Paridade em tempo real** com o upstream — sincronização é periódica (G3), não instantânea.

## 4. Histórias de usuário

### Mantenedor(a) do fork

- Como mantenedor(a), quero um **remote upstream** configurado e um processo de diff documentado, para identificar rapidamente o que mudou no original desde a última sincronização.
- Como mantenedor(a), quero um **glossário de termos** (CRO, ICP, funil, ativação...) para manter consistência entre as 50 skills.
- Como mantenedor(a), quero que o **frontmatter YAML** continue sendo lido corretamente pelos agentes após a adaptação, para não quebrar a instalação.

### Profissional de marketing BR

- Como usuário de Claude Code, quero instalar as skills em português com o **mesmo comando** (`npx skills add`) apontando para o fork, sem fricção adicional.
- Como redator(a)/growth, quero que os **gatilhos de invocação** estejam em português natural, para a skill ser acionada nas minhas próprias palavras.
- Como usuário que não domina inglês técnico, quero exemplos e explicações em **português claro**, sem tradução literal, para confiar nas recomendações.

### Marca skillsdemarketing.com.br

- Como responsável pelo site, quero cada skill com **metadados estruturados** (categoria, nome, descrição curta) para popular um catálogo navegável.
- Como responsável pela marca, quero uma **nota de atribuição clara** ao projeto original — autor, licença MIT, link — para dar crédito correto.

## 5. Exemplo de adaptação

Trecho real da skill `cro` hoje no repositório original, e como o frontmatter e o corpo devem ficar após a adaptação — preservando a chave técnica `name` e a estrutura YAML.

**Original (en) — `skills/cro/SKILL.md`**

```yaml
name: cro
description: "When the user wants to optimize, improve, or increase
conversions on any marketing page or form... Also use when the user
says 'CRO,' 'conversion rate optimization,' 'this page isn't
converting'..."

## Initial Assessment
Before providing recommendations, identify:
1. Page Type
2. Primary Conversion Goal
3. Traffic Context
```

**Adaptado (pt-BR)**

```yaml
name: cro
description: "Quando o usuário quiser otimizar, melhorar ou
aumentar conversões em qualquer página ou formulário de marketing...
Use também quando o usuário disser 'CRO,' 'taxa de conversão,' 'essa
página não está convertendo'..."

## Avaliação inicial
Antes de fazer recomendações, identifique:
1. Tipo de página
2. Objetivo principal de conversão
3. Contexto de tráfego
```

## 6. Requisitos

### P0 · Obrigatório

**R1 — Fork configurado**
Fork do repositório criado no GitHub, com remote upstream.

- [ ] Fork público existe em `github.com/upgrade-php/skillsdemarketing`
- [ ] `git remote -v` mostra origin (fork) e upstream (original)
- [ ] README do fork identifica claramente que é uma tradução/adaptação não-oficial, com link e crédito ao repositório original e licença MIT preservada

**R2 — Catálogo adaptado**
As 50 pastas de skills têm seu `SKILL.md` integralmente adaptado ao contexto brasileiro.

- [ ] 50/50 arquivos `SKILL.md` adaptados (frontmatter, corpo, exemplos, gatilhos)
- [ ] Chave `name` mantida em inglês/kebab-case por compatibilidade
- [ ] `description` e corpo 100% em pt-BR natural, sem tradução literal
- [ ] Exemplos, canais e casos adaptados à realidade brasileira (Pix, WhatsApp, infoproduto, LGPD onde aplicável) — não é tradução 1:1
- [ ] Nenhum bloco de código, caminho de arquivo ou variável traduzido indevidamente

**R3 — Compatibilidade técnica**
Estrutura YAML e de pastas preservada sem quebrar instalação.

- [ ] `npx skills add <fork>` instala sem erros
- [ ] `/plugin marketplace add` reconhece o `.claude-plugin/` do fork

**R4 — Documentação do repositório**
README, CLAUDE.md, AGENTS.md e CONTRIBUTING.md traduzidos.

- [ ] Cada documento traduzido e revisado
- [ ] Seção de instalação testada e funcional em pt-BR
- [ ] Link para o repositório original visível no topo do README
- [ ] `partners.json` e `tools/PARTNERS.md` não são replicados — sem bloco de parceiros patrocinados no fork

### P1 · Desejável

- **R5 — Glossário** — Termos de marketing (pt-BR ↔ en) documentados para consistência entre skills.
- **R6 — Processo de sincronização** — Checklist ou script que gera diff das skills alteradas no upstream desde a última sincronização.
- **R7 — Export do catálogo** — JSON estruturado (nome, categoria, descrição curta em pt-BR) para consumo pelo site skillsdemarketing.com.br.

### P2 · Consideração futura

- **R8 — Tradução assistida** — Automatizar parcialmente a tradução de novas skills via IA, com revisão humana obrigatória antes do merge.
- **R9 — Painel de defasagem** — Indicador simples de quantos dias cada skill está atrasada em relação ao upstream.

## 7. Métricas de sucesso

### Indicadores de lançamento

| Métrica | Meta |
|---|---|
| Skills adaptadas no lançamento | 50 / 50 |
| Instalação ponta a ponta sem erros | < 5 min |
| Frontmatter validado (script do repo) | 50 / 50 |

### Indicadores de médio prazo

| Métrica | Meta |
|---|---|
| Defasagem média vs. upstream | ≤ 14 dias |
| Estrelas/forks do repositório pt-BR | baseline em 30 dias |
| Cliques do site para o catálogo | fora de escopo aqui |

## 8. Decisões registradas

- **Fork** — publicado em `github.com/upgrade-php/skillsdemarketing`. *(decidido em 10 set 2026)*
- **Parceiros** — `partners.json` e `tools/PARTNERS.md` não entram no fork; o bloco de patrocinadores (Converly, Ploy) é removido, já que não existe acordo comercial equivalente no Brasil e mantê-lo divulgaria patrocinadores que não são do fork. *(decidido em 10 set 2026)*
- **Revisão** — revisor único: você (vpp.filho) aprova a qualidade de cada skill adaptada antes do merge, sem dupla checagem na v1. *(decidido em 10 set 2026)*

### Aberto

- Vale automatizar parte da tradução (R8) já na v1, ou tudo é revisão manual no primeiro ciclo? *(responsável: engenharia, não bloqueia o lançamento)*

## 9. Fases sugeridas

Sem prazo contratual externo identificado — fasing é uma proposta de sequenciamento, não um compromisso de data.

1. **Setup** — Criar o fork, configurar upstream, definir glossário inicial. Pré-requisito para todo o resto.
2. **Adaptação core (~15 skills)** — cro, copywriting, seo-audit, emails, social, ads, analytics, pricing, launch, onboarding e afins — as de maior uso — + documentação do repositório (R4).
3. **Catálogo completo** — Adaptar as 35 skills restantes até fechar R2 (50/50).
4. **Processo contínuo** — Documentar sincronização com upstream (R6), fechar glossário (R5) e publicar export do catálogo (R7) — desbloqueia a iniciativa do site.

---

*Fonte: [github.com/coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) (MIT)*
