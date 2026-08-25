import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import test from "node:test";
import {
  documentExerciseId,
  documentSubpartId,
  sha256
} from "../catalog/pau-documentary/pau-document-identities.mjs";

const root = resolve(import.meta.dirname, "..");
const contractDirectory = join(root, "catalog", "pau-documentary");
const contracts = [
  "mathup.pau-document.v1.schema.json",
  "mathup.pau-exam-structure.v1.schema.json",
  "mathup.pau-document-exercise.v1.schema.json",
  "mathup.pau-document-subpart.v1.schema.json",
  "mathup.pau-reconciliation-decision.v1.schema.json",
  "mathup.pau-segmentation-redirect.v1.schema.json"
];

test("los seis contratos documentales son JSON Schema 2020-12 versionados", () => {
  for (const file of contracts) {
    const schema = JSON.parse(readFileSync(join(contractDirectory, file), "utf8"));
    assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
    assert.ok(schema.$id.includes("mathup.es/schemas/"));
    assert.equal(schema.type, "object");
    assert.ok(schema.required.length > 0);
  }
});

test("la identidad documental depende del hash, materia, pregunta y alternativa", () => {
  const documentHash = sha256("documento oficial");
  const first = documentExerciseId({ documentHash, subject: "Matemáticas II", questionKey: "4", alternativeKey: "4.1" });
  const repeated = documentExerciseId({ alternativeKey: "4.1", questionKey: "4", subject: "Matemáticas II", documentHash });
  const other = documentExerciseId({ documentHash, subject: "Matemáticas II", questionKey: "4", alternativeKey: "4.2" });
  assert.equal(first, repeated);
  assert.notEqual(first, other);
  assert.match(first, /^pau-ex-[0-9a-f]{32}$/);
});

test("los apartados tienen identidad estable dentro de su ejercicio", () => {
  const id = "pau-ex-0123456789abcdef0123456789abcdef";
  assert.equal(documentSubpartId(id, "a)"), documentSubpartId(id, "A"));
  assert.notEqual(documentSubpartId(id, "a)"), documentSubpartId(id, "b)"));
});
