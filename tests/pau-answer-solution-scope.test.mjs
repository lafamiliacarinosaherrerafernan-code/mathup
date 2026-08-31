import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const pathValue = join(root, "artifacts", "pau-documentary-reconciliation", "runs", "run-a", "answer-solution-scopes.jsonl");
const scopes = readFileSync(pathValue, "utf8").trim().split(/\r?\n/).map(JSON.parse);

test("las cuatro parejas del caso 1 generan ocho ámbitos separados", () => {
  assert.equal(scopes.length, 8);
  assert.equal(scopes.filter((scope) => scope.entityType === "ANSWER").length, 4);
  assert.equal(scopes.filter((scope) => scope.entityType === "SOLUTION").length, 4);
  assert.equal(new Set(scopes.map((scope) => scope.documentSubpartId)).size, 4);
});

test("cada ámbito conserva hashes y sourceRecordId", () => {
  for (const scope of scopes) {
    assert.match(scope.sourceRecordId, /^src-/);
    assert.match(scope.sourceImmutableHash, /^[0-9a-f]{64}$/);
    assert.match(scope.runtimeFixesHash, /^[0-9a-f]{64}$/);
    assert.equal(scope.rule, "EXACT_HISTORICAL_SUBPART_KEY_AND_OFFICIAL_DOCUMENT_STRUCTURE");
  }
});
