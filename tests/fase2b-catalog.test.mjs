import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { CONTRACTS, entityRevisionId, resolvePersistentExerciseId, sha256, stableStringify } from "../catalog/v2/canonical-entities.mjs";
import { materializeSessionExercise } from "../catalog/v2/materialize-session-exercise.mjs";
import { validateAnswer, validateDeliveryTemplate, validateDistractorSet, validateExerciseV2, validateIdentityRedirect, validateSessionExercise, validateSolution } from "../catalog/v2/validate-canonical-entities.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const RUN = path.join(ROOT, "artifacts/fase2b/runs/run-a");
const json = (name) => JSON.parse(fs.readFileSync(path.join(RUN, name), "utf8"));
const jsonl = (name) => fs.readFileSync(path.join(RUN, name), "utf8").trim().split(/\r?\n/u).filter(Boolean).map(JSON.parse);
const exercises = jsonl("exercise-v2.jsonl");
const answers = jsonl("answer-records.jsonl");
const solutions = jsonl("solution-records.jsonl");
const templates = jsonl("delivery-templates.jsonl");
const distractors = jsonl("distractor-sets.jsonl");
const redirects = jsonl("identity-redirects.jsonl");
const recovery = jsonl("pau-recovery-decisions.jsonl");
const sources = jsonl("source-reconciliation.jsonl");
const educational = jsonl("educational-content-reconciliation.jsonl");

function assertTopLevelSchema(name, rows) {
  const schema = JSON.parse(fs.readFileSync(path.join(ROOT, `catalog/v2/${name}.schema.json`), "utf8"));
  const allowed = new Set(Object.keys(schema.properties));
  for (const row of rows) {
    assert.deepEqual(Object.keys(row).filter((key) => !allowed.has(key)), []);
    assert.deepEqual(schema.required.filter((key) => !(key in row)), []);
  }
}

test("implementa los siete contratos versionados", () => assert.deepEqual(new Set(Object.values(CONTRACTS)).size, 7));
test("los artefactos cumplen los campos superiores de sus JSON Schema", () => {
  assertTopLevelSchema("mathup.exercise.v2", exercises); assertTopLevelSchema("mathup.answer.v1", answers);
  assertTopLevelSchema("mathup.solution.v1", solutions); assertTopLevelSchema("mathup.delivery-template.v1", templates);
  assertTopLevelSchema("mathup.distractor-set.v1", distractors); assertTopLevelSchema("mathup.identity-redirect.v1", redirects);
});
test("todos los ejercicios v2 superan el núcleo", () => assert.equal(exercises.filter((row) => validateExerciseV2(row).status === "ERROR").length, 0));
test("todas las respuestas cumplen el validador", () => assert.equal(answers.filter((row) => validateAnswer(row).status === "ERROR").length, 0));
test("todas las soluciones cumplen el validador", () => assert.equal(solutions.filter((row) => validateSolution(row).status === "ERROR").length, 0));
test("todos los distractores conservados son válidos", () => assert.equal(distractors.filter((row) => validateDistractorSet(row).status === "ERROR").length, 0));
test("todas las plantillas cumplen referencias", () => {
  const answerIds = new Set(answers.map((row) => row.answerId)); const distractorSetIds = new Set(distractors.map((row) => row.distractorSetId));
  assert.equal(templates.filter((row) => validateDeliveryTemplate(row, { answerIds, distractorSetIds }).status === "ERROR").length, 0);
});
test("un PAU abierto es válido sin opciones", () => {
  const pau = exercises.find((row) => row.classification.stage === "PAU");
  assert.ok(pau); assert.equal("choices" in pau, false); assert.notEqual(validateExerciseV2(pau).status, "ERROR");
});
test("una plantilla abierta no contiene distractores", () => assert.equal(templates.filter((row) => row.interactionKind === "open-response" && row.distractorSetRef).length, 0));
test("una plantilla multiple-choice sin referencias se rechaza", () => assert.equal(validateDeliveryTemplate({ schemaVersion: CONTRACTS.deliveryTemplate, interactionKind: "multiple-choice" }).status, "ERROR"));
test("declarar modalidad no crea opciones en el ejercicio", () => assert.equal(exercises.filter((row) => "choices" in row || "modalities" in row).length, 0));
test("las letras y posiciones no se persisten fuera de sesión", () => {
  const text = stableStringify({ exercises, answers, solutions, templates, distractors });
  assert.equal(/"(?:correctIndex|correctPosition|letter|choices)"\s*:/u.test(text), false);
});
test("una sesión contiene cuatro opciones distintas y una correcta", () => {
  const template = templates.find((row) => row.interactionKind === "multiple-choice"); const answer = answers.find((row) => row.answerId === template.answerRef); const set = distractors.find((row) => row.distractorSetId === template.distractorSetRef);
  const session = materializeSessionExercise(template, answer, set, { attemptId: "test-one", exerciseRevisionId: exercises.find((row) => row.identity.exerciseId === template.exerciseId).identity.revisionId });
  assert.equal(validateSessionExercise(session).status, "OK"); assert.equal(new Set(session.options.map((row) => stableStringify(row.value))).size, 4);
});
test("el mismo intento produce la misma permutación", () => {
  const template = templates.find((row) => row.interactionKind === "multiple-choice"); const answer = answers.find((row) => row.answerId === template.answerRef); const set = distractors.find((row) => row.distractorSetId === template.distractorSetRef); const context = { attemptId: "stable-attempt", exerciseRevisionId: exercises.find((row) => row.identity.exerciseId === template.exerciseId).identity.revisionId };
  assert.deepEqual(materializeSessionExercise(template, answer, set, context), materializeSessionExercise(template, answer, set, context));
});
test("semillas fijas distribuyen la correcta entre A/B/C/D", () => {
  const template = templates.find((row) => row.interactionKind === "multiple-choice"); const answer = answers.find((row) => row.answerId === template.answerRef); const set = distractors.find((row) => row.distractorSetId === template.distractorSetRef); const exerciseRevisionId = exercises.find((row) => row.identity.exerciseId === template.exerciseId).identity.revisionId;
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  for (let index = 0; index < 400; index += 1) counts[materializeSessionExercise(template, answer, set, { attemptId: `distribution-${index}`, exerciseRevisionId }).correctPosition] += 1;
  assert.deepEqual(Object.keys(counts).filter((key) => counts[key] > 60 && counts[key] < 140).sort(), ["A", "B", "C", "D"]);
});
test("se aceptan técnicamente las 1.225 UNIQUE_MATCH", () => assert.equal(recovery.filter((row) => row.decision === "ACCEPTED_TECHNICALLY").length, 1225));
test("ninguna recuperación obtiene aprobación matemática", () => assert.equal(recovery.filter((row) => row.decision === "ACCEPTED_TECHNICALLY" && row.mathematicalReview !== "REQUIRED").length, 0));
test("los 12 posibles no se promueven", () => assert.equal(recovery.filter((row) => row.status === "POSSIBLE_MATCH" && row.decision === "NOT_PROMOTED").length, 12));
test("los 19 conflictos no se promueven", () => assert.equal(recovery.filter((row) => row.status === "CONFLICT" && row.decision === "NOT_PROMOTED").length, 19));
test("los 1.970 no encontrados no se promueven", () => assert.equal(recovery.filter((row) => row.status === "NOT_FOUND" && row.decision === "NOT_PROMOTED").length, 1970));
test("las recuperaciones conservan doble procedencia y clave PAU", () => {
  const recoveredAnswers = answers.filter((row) => row.evidenceStatus === "RECOVERED_UNIQUE");
  assert.equal(recoveredAnswers.length, 1225); assert.equal(recoveredAnswers.every((row) => row.provenance.statementSourceRecordIds?.length && row.provenance.answerSolutionSourceRecordIds?.length && row.provenance.pauKey), true);
});
test("las 30 colisiones originan redirecciones SPLIT válidas", () => {
  const split = redirects.filter((row) => row.redirectKind === "SPLIT"); assert.equal(split.length, 30);
  const ids = new Set(exercises.map((row) => row.identity.exerciseId)); assert.equal(split.filter((row) => validateIdentityRedirect(row, ids).status === "ERROR").length, 0);
});
test("no hay identidades v2 duplicadas", () => assert.equal(new Set(exercises.map((row) => row.identity.exerciseId)).size, exercises.length));
test("un cambio de ruta conserva el ID mediante el registro persistente", () => {
  const seed = { courseId: "1bach-mates", subjectId: "matematicas-i", sourceNamespace: "old/path", topicOrBlock: "derivadas", normalizedStatementHash: "abc", sourceLocalLegacyId: "7" };
  const exerciseId = resolvePersistentExerciseId(seed, []);
  const moved = { ...seed, sourceNamespace: "new/path" };
  assert.equal(resolvePersistentExerciseId(moved, [{ exerciseId, identitySeed: seed }]), exerciseId);
});
test("una revisión mantiene exerciseId y cambia revisionId", () => {
  const exerciseId = exercises[0].identity.exerciseId; assert.notEqual(entityRevisionId(exerciseId, 1), entityRevisionId(exerciseId, 2));
  assert.equal(entityRevisionId(exerciseId, 2).startsWith(exerciseId), true);
});
test("todas las identidades v1 tienen redirección", () => assert.equal(redirects.length, 6680));
test("se conservan 15.527 sourceRecordId", () => assert.deepEqual([sources.length, new Set(sources.map((row) => row.sourceRecordId)).size], [15527, 15527]));
test("se concilian 6.712 originales", () => assert.equal(educational.length, 6712));
test("se conservan 607 inaccesibles", () => assert.equal(educational.filter((row) => !row.accessible).length, 607));
test("Matemáticas II y CCSS II permanecen diferenciadas", () => assert.deepEqual(new Set(exercises.filter((row) => row.classification.stage === "PAU").map((row) => row.classification.subjectId)), new Set(["matematicas-ii", "matematicas-ccss-ii"])));
test("ninguna entidad se publica", () => assert.equal(exercises.filter((row) => row.editorial.publicationGate !== "NOT_PUBLISHED" || row.editorial.publicationStatus !== "NOT_PUBLISHED").length, 0));
test("los manifiestos verifican hashes de entradas inmutables", () => {
  const manifest = json("input-manifest.json"); for (const item of Object.values(manifest)) assert.equal(item.sha256, sha256(fs.readFileSync(path.join(ROOT, item.path))));
});
test("la conciliación declara cobertura completa", () => {
  const summary = json("reconciliation-summary.json"); assert.deepEqual([summary.sourceRecords.actual, summary.educationalOriginals.actual, summary.inaccessible.actual], [15527, 6712, 607]);
});
