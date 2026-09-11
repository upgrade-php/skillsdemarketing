#!/usr/bin/env node
// scripts/generate-catalog.mjs
//
// Gera catalog.json na raiz do repositório a partir do frontmatter de cada
// skills/*/SKILL.md, cruzando com scripts/categories.json.
//
// Node.js puro, sem dependências (mesma filosofia zero-dependência do
// upstream). Reaproveita a mesma abordagem de parse de frontmatter simples
// usada pelo tooling do upstream.
//
// Uso:
//   node scripts/generate-catalog.mjs           # escreve catalog.json
//   node scripts/generate-catalog.mjs --check   # não escreve; falha (exit 1)
//                                                 se catalog.json ficaria diferente
//
// Contrato de saída: specs/001-fork-marketingskills-ptbr/contracts/catalog-export.schema.json
// Ver data-model.md § Entrada de export do catálogo.

import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SKILLS_DIR = join(ROOT, "skills");
const CATEGORIES_PATH = join(ROOT, "scripts", "categories.json");
const OUTPUT_PATH = join(ROOT, "catalog.json");

const VALID_CATEGORIES = new Set([
  "Otimização de Conversão",
  "Conteúdo e Copy",
  "SEO e Descoberta",
  "Pago e Distribuição",
  "Mensuração e Testes",
  "Retenção",
  "Engenharia de Crescimento",
  "Estratégia e Monetização",
  "Vendas e RevOps",
]);

const NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Extrai o bloco de frontmatter YAML (entre as duas primeiras linhas `---`)
 * de um SKILL.md e retorna { name, description } fazendo um parse mínimo,
 * suficiente para o formato usado neste catálogo (linhas simples
 * `chave: valor`, com ou sem aspas duplas envolvendo o valor).
 */
function parseFrontmatter(raw, filePath) {
  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== "---") {
    throw new Error(`${filePath}: frontmatter ausente (esperava '---' na linha 1)`);
  }
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) {
    throw new Error(`${filePath}: frontmatter não fechado (sem segundo '---')`);
  }

  let name = null;
  let description = null;

  for (let i = 1; i < end; i++) {
    const line = lines[i];
    if (/^name:\s*/.test(line)) {
      name = line.replace(/^name:\s*/, "").trim();
    } else if (/^description:\s*/.test(line)) {
      let value = line.replace(/^description:\s*/, "").trim();
      if (value.startsWith('"') && value.endsWith('"') && value.length >= 2) {
        value = value.slice(1, -1).replace(/\\"/g, '"');
      }
      description = value;
    }
  }

  if (!name) throw new Error(`${filePath}: campo 'name' não encontrado no frontmatter`);
  if (!description) throw new Error(`${filePath}: campo 'description' não encontrado no frontmatter`);

  return { name, description };
}

/**
 * Deriva um resumo curto (<=200 chars) a partir da description completa do
 * frontmatter (que é o texto completo do gatilho de invocação da skill, não
 * pensado para exibição em um catálogo). Derivação puramente mecânica —
 * pega a primeira frase e, se ainda assim exceder o limite, trunca em um
 * limite de palavra com reticências. Ver data-model.md § Entrada de export
 * do catálogo.
 */
export function deriveShortDescription(description, maxLength = 200) {
  const firstSentenceMatch = description.match(/^[^.!?]*[.!?]/);
  let short = firstSentenceMatch ? firstSentenceMatch[0].trim() : description.trim();

  if (short.length > maxLength) {
    const truncated = short.slice(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(" ");
    short = (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim() + "...";
  }

  return short;
}

export function buildCatalog({ skillsDir = SKILLS_DIR, categoriesPath = CATEGORIES_PATH } = {}) {
  if (!existsSync(categoriesPath)) {
    throw new Error(`Mapeamento de categorias não encontrado: ${categoriesPath}`);
  }
  const categories = JSON.parse(readFileSync(categoriesPath, "utf8"));

  const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const entries = [];
  const errors = [];

  for (const skillName of skillDirs) {
    const skillMdPath = join(skillsDir, skillName, "SKILL.md");
    if (!existsSync(skillMdPath)) {
      errors.push(`${skillName}: SKILL.md não encontrado, pulando`);
      continue;
    }

    const raw = readFileSync(skillMdPath, "utf8");
    let parsed;
    try {
      parsed = parseFrontmatter(raw, skillMdPath);
    } catch (err) {
      errors.push(err.message);
      continue;
    }

    const category = categories[parsed.name];
    if (!category) {
      errors.push(`${parsed.name}: sem entrada em scripts/categories.json`);
      continue;
    }
    if (!VALID_CATEGORIES.has(category)) {
      errors.push(`${parsed.name}: categoria '${category}' não está no enum de 9 valores do contrato`);
      continue;
    }
    if (!NAME_PATTERN.test(parsed.name)) {
      errors.push(`${parsed.name}: nome não bate com o padrão kebab-case exigido pelo contrato`);
      continue;
    }

    const description = deriveShortDescription(parsed.description);
    if (description.length < 1 || description.length > 200) {
      errors.push(`${parsed.name}: description derivada fora do limite de 1-200 chars`);
      continue;
    }

    entries.push({ name: parsed.name, category, description });
  }

  if (errors.length > 0) {
    throw new Error(`Falha ao gerar o catálogo:\n- ${errors.join("\n- ")}`);
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
}

function main() {
  const checkOnly = process.argv.includes("--check");

  let entries;
  try {
    entries = buildCatalog();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const json = JSON.stringify(entries, null, 2) + "\n";

  if (checkOnly) {
    const current = existsSync(OUTPUT_PATH) ? readFileSync(OUTPUT_PATH, "utf8") : null;
    if (current !== json) {
      console.error(
        "catalog.json está desatualizado em relação ao frontmatter das skills. " +
          "Rode `node scripts/generate-catalog.mjs` e commite o resultado."
      );
      process.exit(1);
    }
    console.log(`catalog.json está atualizado (${entries.length} skills).`);
    return;
  }

  writeFileSync(OUTPUT_PATH, json, "utf8");
  console.log(`catalog.json gerado com ${entries.length} skills.`);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main();
}
