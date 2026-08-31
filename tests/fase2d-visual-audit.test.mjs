import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { automatedDecisionFor, buildGroups, readJson, readJsonl, VIEWPORTS } from '../catalog/visual-audit/fase2d-visual-audit.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const RUN = path.join(ROOT, 'artifacts/fase2d/runs/run-a');

test('censa las 7.067 entidades reales y las cuatro resoluciones', () => {
  const population = readJsonl(path.join(RUN, 'population.jsonl'));
  const geometry = readJsonl(path.join(RUN, 'geometry-results.jsonl'));
  assert.equal(population.length, 7067);
  assert.equal(geometry.length, 28268);
  assert.deepEqual([...new Set(geometry.map((row) => row.viewport))].sort((a,b)=>a-b), VIEWPORTS);
  const counts = Map.groupBy(geometry, (row) => row.visualEntityId);
  assert.equal(counts.size, 7067);
  assert.ok([...counts.values()].every((rows) => rows.length === 4));
});

test('conserva enunciados, respuestas y soluciones reales de todos los cursos previstos', () => {
  const population = readJsonl(path.join(RUN, 'population.jsonl'));
  assert.deepEqual(Object.fromEntries([...Map.groupBy(population,(row)=>row.entityType)].map(([key,value])=>[key,value.length]).sort()), {
    answer:2211, solution:1079, statement:3777,
  });
  const courses = new Set(population.map((row) => row.courseId));
  for (const course of ['1eso','2eso','3eso','4eso-a','4eso-b','1bach-mates','1bach-ccss','2bach-mates','2bach-ccss']) assert.ok(courses.has(course));
});

test('ningún resultado automático concede aprobación humana definitiva', () => {
  const decisions = readJsonl(path.join(RUN, 'visual-decisions.jsonl'));
  assert.equal(decisions.length, 7067);
  assert.ok(decisions.every((row) => row.humanDecision === 'PENDING_HUMAN_REVIEW'));
  assert.ok(decisions.every((row) => row.finalVisualPass === false));
  assert.ok(decisions.every((row) => row.editorialStatus !== 'VISUAL_PASS'));
});

test('los grupos homogéneos solo reúnen representaciones exactamente equivalentes', () => {
  const population = readJsonl(path.join(RUN, 'population.jsonl'));
  const groups = buildGroups(population);
  const byId = new Map(population.map((row) => [row.visualEntityId, row]));
  for (const group of groups) {
    const signatures = new Set(group.memberVisualEntityIds.map((id) => byId.get(id).renderSignature));
    assert.equal(signatures.size, 1);
    if (group.memberCount > 1) assert.equal(group.propagationAllowedOnlyAfterHumanRepresentativePass, true);
  }
});

test('los controles negativos detectan recorte, contenido crudo y recursos ausentes', () => {
  const entity = { visualEntityId:'negative-control', entityId:'e', exerciseId:'x' };
  const base = VIEWPORTS.map((viewport) => ({ viewport, overflow:false, clipped:false, overlap:false, hidden:false, rawJson:false, rawLatex:false, missingGlyph:false, resourceError:false, measurementError:false }));
  const clean = automatedDecisionFor(entity, base);
  assert.equal(clean.automationStatus, 'AUTOMATED_VISUAL_PASS');
  assert.equal(clean.editorialStatus, 'MANUAL_REVIEW_REQUIRED');
  assert.equal(clean.finalVisualPass, false);
  const raw = automatedDecisionFor(entity, base.map((row,index)=>index===0?{...row,rawLatex:true}:row));
  assert.equal(raw.automationStatus, 'AUTOMATED_VISUAL_FAIL');
  assert.deepEqual(raw.automationIssueCodes, ['RAW_LATEX_VISIBLE']);
  const source = automatedDecisionFor(entity, base.map((row,index)=>index===0?{...row,resourceError:true}:row));
  assert.equal(source.editorialStatus, 'SOURCE_REVIEW_REQUIRED');
});

test('mantiene la línea base y aísla producción', () => {
  const manifest = readJson(path.join(RUN, 'input-manifest.json'));
  assert.deepEqual(manifest.baselines, { inaccessibleExercises:607, originalExercises:6712, sourceRecords:15527, visualEntities:7067 });
  assert.equal(manifest.harness.productionImports, 0);
  assert.equal(manifest.harness.networkRequired, false);
  const rollback = readJson(path.join(ROOT, 'artifacts/fase2d/rollback-trial.json'));
  assert.equal(rollback.passed, true);
  assert.equal(rollback.productionWrites, 0);
  assert.equal(rollback.supabaseWrites, 0);
});

test('la segunda corrida y el orden inverso son reproducibles', () => {
  const result = readJson(path.join(ROOT, 'artifacts/fase2d/reproducibility-summary.json'));
  assert.equal(result.passed, true);
  assert.ok(Object.values(result.repeated).every(Boolean));
  assert.ok(Object.values(result.orderInvariant).every(Boolean));
});

test('solo conserva las capturas selectivas previstas y permite regenerar el resto', () => {
  const summary = readJson(path.join(RUN, 'screenshot-summary.json'));
  assert.equal(summary.selectedEntities, 48);
  assert.equal(summary.screenshotsRetained, 102);
  assert.equal(summary.contactSheetsRetained, 70);
  assert.equal(summary.contactSheetEntities, 6958);
  assert.equal(summary.totalPersistentPng, 172);
  assert.equal(summary.totalPersistentPngBytes, 61405842);
  assert.equal(summary.fullCensusScreenshotsPersisted, false);
  assert.equal(summary.allOtherExecutionsRegenerableFromManifest, true);
  assert.equal(readJsonl(path.join(RUN, 'screenshots/manifest.jsonl')).length, 102);
  assert.equal(readJsonl(path.join(RUN, 'screenshots/contact-sheets/manifest.jsonl')).length, 70);
});
