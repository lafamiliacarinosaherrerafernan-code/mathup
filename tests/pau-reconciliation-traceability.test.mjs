import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const run = join(root, "artifacts", "pau-documentary-reconciliation", "runs", "run-a");
const lines = (file) => readFileSync(join(run, file), "utf8").trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);

test("las 3.491 representaciones tienen una decisión documental", () => {
  const decisions = lines("reconciliation-decisions.jsonl");
  assert.equal(decisions.length, 3491);
  assert.equal(new Set(decisions.map((decision) => decision.exerciseId)).size, 3491);
});

test("se conservan 15.527 sourceRecordId sin pérdida", () => {
  const sourceRecords = lines("source-record-reconciliation.jsonl");
  assert.equal(sourceRecords.length, 15527);
  assert.equal(new Set(sourceRecords.map((record) => record.sourceRecordId)).size, 15527);
  assert.ok(sourceRecords.every((record) => record.status === "PRESERVED"));
});

test("el censo contiene 132 PDF con SHA-256 y páginas", () => {
  const documents = lines("document-registry.jsonl");
  assert.equal(documents.length, 132);
  assert.ok(documents.every((document) => /^[0-9a-f]{64}$/.test(document.documentHash)));
  assert.ok(documents.every((document) => document.pageCount >= 1));
});

test("Matemáticas II y CCSS II no se fusionan", () => {
  const documents = lines("document-registry.jsonl");
  const subjects = new Set(documents.map((document) => document.subject));
  assert.ok(subjects.has("Matemáticas II"));
  assert.ok(subjects.has("Matemáticas Aplicadas a las CCSS II"));
});
