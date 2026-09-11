#!/usr/bin/env node
// scripts/sync-diff.mjs
//
// Mostra quais skills mudaram no upstream (coreyhaines31/marketingskills)
// desde a última sincronização registrada, para que o mantenedor saiba o
// que revisar e adaptar (FR-014).
//
// Node.js puro, sem dependências. Não faz merge nem aplica nenhuma mudança
// automaticamente — apenas lista o que mudou. Cabe ao mantenedor decidir o
// que e como adaptar (Princípio I: Adaptação Fiel, não tradução literal).
//
// Uso:
//   node scripts/sync-diff.mjs                 # lista o diff desde o último sync
//   node scripts/sync-diff.mjs --confirm        # lista o diff E, se não houver
//                                                 mudanças pendentes de leitura,
//                                                 atualiza last_synced_sha para o
//                                                 upstream/main atual (T069)
//
// Pré-requisito: um remote `upstream` apontando para
// coreyhaines31/marketingskills (ver FR-001, README.md § Contribuindo).

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const STATE_PATH = join(ROOT, ".specify", "sync-state.json");
const UPSTREAM_REMOTE = "upstream";
const UPSTREAM_BRANCH = `${UPSTREAM_REMOTE}/main`;
const WATCHED_GLOB = "skills/*/SKILL.md";

function run(args, cwd = ROOT) {
  return execFileSync("git", args, { cwd, encoding: "utf8" }).trim();
}

function readState() {
  if (!existsSync(STATE_PATH)) {
    throw new Error(
      `${STATE_PATH} não encontrado. Rode a sincronização inicial antes (ver data-model.md § Registro de sincronização).`
    );
  }
  return JSON.parse(readFileSync(STATE_PATH, "utf8"));
}

function writeState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "utf8");
}

/**
 * Roda `git diff --name-status` entre a SHA sincronizada e o upstream/main
 * atual, restrito a skills/{skill}/SKILL.md, e devolve uma lista estruturada
 * de mudanças por skill.
 */
export function computeDiff({ fromSha, toRef = UPSTREAM_BRANCH, cwd = ROOT } = {}) {
  const output = run(
    ["diff", "--name-status", fromSha, toRef, "--", WATCHED_GLOB],
    cwd
  );

  if (!output) return [];

  const STATUS_LABEL = {
    A: "adicionada",
    M: "modificada",
    D: "removida",
    R: "renomeada",
  };

  return output
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("\t");
      const statusCode = parts[0][0]; // R100 -> "R"
      const path = parts[parts.length - 1];
      const match = path.match(/^skills\/([^/]+)\/SKILL\.md$/);
      return {
        skill: match ? match[1] : path,
        status: STATUS_LABEL[statusCode] || statusCode,
        path,
      };
    });
}

function main() {
  const confirm = process.argv.includes("--confirm");

  const state = readState();
  if (!state.last_synced_sha) {
    console.error(`${STATE_PATH} não tem 'last_synced_sha'. Corrija o arquivo antes de continuar.`);
    process.exit(1);
  }

  try {
    run(["fetch", UPSTREAM_REMOTE]);
  } catch (err) {
    console.error(
      `Não foi possível rodar 'git fetch ${UPSTREAM_REMOTE}'. Confirme que o remote existe ` +
        `('git remote add upstream https://github.com/coreyhaines31/marketingskills.git').`
    );
    console.error(err.message);
    process.exit(1);
  }

  const currentUpstreamSha = run(["rev-parse", UPSTREAM_BRANCH]);

  if (currentUpstreamSha === state.last_synced_sha) {
    console.log("Nenhuma mudança no upstream desde a última sincronização.");
    return;
  }

  const changes = computeDiff({ fromSha: state.last_synced_sha, toRef: UPSTREAM_BRANCH });

  if (changes.length === 0) {
    console.log(
      `O upstream avançou (${state.last_synced_sha.slice(0, 7)} → ${currentUpstreamSha.slice(0, 7)}), ` +
        "mas nenhum SKILL.md foi alterado nesse intervalo."
    );
  } else {
    console.log(
      `Skills alteradas no upstream desde ${state.last_synced_sha.slice(0, 7)} ` +
        `(até ${currentUpstreamSha.slice(0, 7)}):\n`
    );
    for (const change of changes) {
      console.log(`  [${change.status}] ${change.skill}`);
    }
    console.log(
      `\n${changes.length} skill(s) para revisar. Adapte cada uma manualmente ` +
        "(Princípio I — não copie o texto em inglês direto)."
    );
  }

  if (confirm) {
    writeState({ ...state, last_synced_sha: currentUpstreamSha, last_synced_at: new Date().toISOString() });
    console.log(`\n.specify/sync-state.json atualizado — last_synced_sha = ${currentUpstreamSha}`);
  } else if (changes.length > 0) {
    console.log(
      "\nDepois de tratar o diff acima, rode `node scripts/sync-diff.mjs --confirm` " +
        "para marcar esta SHA como sincronizada."
    );
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main();
}
