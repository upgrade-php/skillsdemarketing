// scripts/sync-diff.test.mjs
//
// Testes para computeDiff() de scripts/sync-diff.mjs usando o test runner
// nativo do Node (node --test) e um repositório git de teste local (fixture
// criada e destruída a cada teste — nunca toca o repositório real ou o
// remote upstream).
//
// Roda com: node --test scripts/sync-diff.test.mjs

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { computeDiff } from "./sync-diff.mjs";

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function initFixtureRepo() {
  const dir = mkdtempSync(join(tmpdir(), "sync-diff-fixture-"));
  git(dir, ["init", "-q"]);
  git(dir, ["config", "user.email", "test@example.com"]);
  git(dir, ["config", "user.name", "Test"]);

  mkdirSync(join(dir, "skills", "cro"), { recursive: true });
  writeFileSync(join(dir, "skills", "cro", "SKILL.md"), "---\nname: cro\n---\nv1\n", "utf8");
  git(dir, ["add", "."]);
  git(dir, ["commit", "-q", "-m", "chore: initial"]);
  const baseSha = git(dir, ["rev-parse", "HEAD"]);

  return { dir, baseSha };
}

test("computeDiff detecta skill modificada entre duas revisões", () => {
  const { dir, baseSha } = initFixtureRepo();
  try {
    writeFileSync(join(dir, "skills", "cro", "SKILL.md"), "---\nname: cro\n---\nv2\n", "utf8");
    git(dir, ["add", "."]);
    git(dir, ["commit", "-q", "-m", "feat: update cro"]);
    const headSha = git(dir, ["rev-parse", "HEAD"]);

    const changes = computeDiff({ fromSha: baseSha, toRef: headSha, cwd: dir });
    assert.deepEqual(changes, [{ skill: "cro", status: "modificada", path: "skills/cro/SKILL.md" }]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("computeDiff detecta skill nova (adicionada)", () => {
  const { dir, baseSha } = initFixtureRepo();
  try {
    mkdirSync(join(dir, "skills", "pricing"), { recursive: true });
    writeFileSync(join(dir, "skills", "pricing", "SKILL.md"), "---\nname: pricing\n---\n", "utf8");
    git(dir, ["add", "."]);
    git(dir, ["commit", "-q", "-m", "feat: add pricing"]);
    const headSha = git(dir, ["rev-parse", "HEAD"]);

    const changes = computeDiff({ fromSha: baseSha, toRef: headSha, cwd: dir });
    assert.deepEqual(changes, [{ skill: "pricing", status: "adicionada", path: "skills/pricing/SKILL.md" }]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("computeDiff detecta skill removida", () => {
  const { dir, baseSha } = initFixtureRepo();
  try {
    git(dir, ["rm", "-q", "skills/cro/SKILL.md"]);
    git(dir, ["commit", "-q", "-m", "chore: remove cro"]);
    const headSha = git(dir, ["rev-parse", "HEAD"]);

    const changes = computeDiff({ fromSha: baseSha, toRef: headSha, cwd: dir });
    assert.deepEqual(changes, [{ skill: "cro", status: "removida", path: "skills/cro/SKILL.md" }]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("computeDiff não retorna nada quando as revisões são idênticas", () => {
  const { dir, baseSha } = initFixtureRepo();
  try {
    const changes = computeDiff({ fromSha: baseSha, toRef: baseSha, cwd: dir });
    assert.deepEqual(changes, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("computeDiff ignora mudanças fora de skills/*/SKILL.md", () => {
  const { dir, baseSha } = initFixtureRepo();
  try {
    writeFileSync(join(dir, "README.md"), "# fixture\n", "utf8");
    git(dir, ["add", "."]);
    git(dir, ["commit", "-q", "-m", "docs: readme"]);
    const headSha = git(dir, ["rev-parse", "HEAD"]);

    const changes = computeDiff({ fromSha: baseSha, toRef: headSha, cwd: dir });
    assert.deepEqual(changes, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
