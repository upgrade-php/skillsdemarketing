// scripts/generate-catalog.test.mjs
//
// Testes para scripts/generate-catalog.mjs usando o test runner nativo do
// Node (node --test). Sem dependências externas.
//
// Roda com: node --test scripts/generate-catalog.test.mjs

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildCatalog, deriveShortDescription } from "./generate-catalog.mjs";

function makeFixture() {
  const root = mkdtempSync(join(tmpdir(), "catalog-fixture-"));
  const skillsDir = join(root, "skills");
  mkdirSync(skillsDir);

  function writeSkill(name, description) {
    const dir = join(skillsDir, name);
    mkdirSync(dir);
    writeFileSync(
      join(dir, "SKILL.md"),
      `---\nname: ${name}\ndescription: "${description}"\nmetadata:\n  version: 1.0.0\n---\n\n# ${name}\n`,
      "utf8"
    );
  }

  writeSkill("cro", "Quando o usuário quiser otimizar conversões. Use também para landing pages.");
  writeSkill(
    "offers",
    "Uma description propositalmente muito longa para forçar o truncamento no limite de duzentos caracteres do contrato, repetindo bastante texto até passar do limite estabelecido pelo schema de exportação do catálogo de skills adaptadas para o mercado brasileiro sem ponto final logo"
  );

  const categoriesPath = join(root, "categories.json");
  writeFileSync(
    categoriesPath,
    JSON.stringify(
      {
        cro: "Otimização de Conversão",
        offers: "Estratégia e Monetização",
      },
      null,
      2
    ),
    "utf8"
  );

  return { root, skillsDir, categoriesPath };
}

test("buildCatalog produz entradas válidas ordenadas por nome", () => {
  const { root, skillsDir, categoriesPath } = makeFixture();
  try {
    const entries = buildCatalog({ skillsDir, categoriesPath });

    assert.equal(entries.length, 2);
    assert.deepEqual(
      entries.map((e) => e.name),
      ["cro", "offers"]
    );
    assert.equal(entries[0].category, "Otimização de Conversão");
    assert.ok(entries[0].description.length <= 200);
    assert.ok(entries[1].description.length <= 200);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("buildCatalog falha quando uma skill não tem categoria mapeada", () => {
  const { root, skillsDir, categoriesPath } = makeFixture();
  try {
    // remove a categoria de 'offers' do mapeamento
    writeFileSync(categoriesPath, JSON.stringify({ cro: "Otimização de Conversão" }, null, 2), "utf8");
    assert.throws(() => buildCatalog({ skillsDir, categoriesPath }), /offers: sem entrada em scripts\/categories\.json/s);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("deriveShortDescription mantém a primeira frase quando já é curta", () => {
  const short = deriveShortDescription("Otimize a taxa de conversão de qualquer página ou formulário.");
  assert.equal(short, "Otimize a taxa de conversão de qualquer página ou formulário.");
});

test("deriveShortDescription trunca no limite de palavra com reticências quando excede 200 chars", () => {
  const long = "a".repeat(50) + " " + "b".repeat(200); // sem pontuação de frase, > 200 chars
  const short = deriveShortDescription(long);
  assert.ok(short.length <= 200, `esperado <=200, recebeu ${short.length}`);
  assert.ok(short.endsWith("..."));
});
