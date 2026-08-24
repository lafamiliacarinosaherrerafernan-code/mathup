import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildP0Representation,
  P0_RAW_LATEX_TARGETS,
  sha256,
} from '../catalog/normalization/fase2d-p0-latex-correction.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const phase2dRoot = path.join(ROOT, 'artifacts/fase2d/runs/run-a');
const outputRoot = path.join(ROOT, 'artifacts/fase2d-p0-latex');
const readJsonl = (file) => fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const stable = (value) => value && typeof value === 'object'
  ? Array.isArray(value)
    ? `[${value.map(stable).join(',')}]`
    : `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`
  : JSON.stringify(value);
const writeJsonl = (file, rows) => fs.writeFileSync(file, `${rows.map(stable).join('\n')}\n`, 'utf8');

fs.mkdirSync(path.join(outputRoot, 'after/screenshots'), { recursive: true });
const targetIds = new Set(Object.keys(P0_RAW_LATEX_TARGETS));
const population = readJsonl(path.join(phase2dRoot, 'population.jsonl'))
  .filter((row) => targetIds.has(row.visualEntityId))
  .sort((a, b) => a.visualEntityId.localeCompare(b.visualEntityId));
if (population.length !== 3) throw new Error(`Se esperaban 3 entidades y se localizaron ${population.length}`);

const representations = population.map(buildP0Representation);
const beforeDecisions = readJsonl(path.join(phase2dRoot, 'visual-decisions.jsonl'))
  .filter((row) => targetIds.has(row.visualEntityId));
const beforeGeometry = readJsonl(path.join(phase2dRoot, 'geometry-results.jsonl'))
  .filter((row) => targetIds.has(row.visualEntityId));
const beforeScreenshots = readJsonl(path.join(phase2dRoot, 'screenshots/manifest.jsonl'))
  .filter((row) => targetIds.has(row.visualEntityId));

const diagnosis = population.map((row) => ({
  schemaVersion: 'mathup.fase2d-p0.diagnosis.v1',
  visualEntityId: row.visualEntityId,
  exerciseId: row.exerciseId,
  entityId: row.entityId,
  entityType: row.entityType,
  originalLiteral: row.literal,
  originalLiteralHash: row.literalHash,
  existingRepresentation: row.representationKind,
  sourceFile: row.sourceFile,
  sourcePath: row.sourcePath,
  sourceRecordIds: row.sourceRecordIds,
  cause: 'El documento preservado se insertaba como textContent en el arnés aislado; la representación derivada no materializaba los comandos exactos \\frac{entero}{entero}.',
  defectLayer: 'DERIVED_VISUAL_REPRESENTATION',
  sourceDefectForThisP0: false,
  normalizationDefectForThisP0: false,
  reversibleRepresentationAvailable: true,
}));

writeJsonl(path.join(outputRoot, 'diagnosis.jsonl'), diagnosis);
writeJsonl(path.join(outputRoot, 'representations.jsonl'), representations);
writeJsonl(path.join(outputRoot, 'before-geometry.jsonl'), beforeGeometry);
writeJsonl(path.join(outputRoot, 'before-decisions.jsonl'), beforeDecisions);
writeJsonl(path.join(outputRoot, 'before-screenshots-manifest.jsonl'), beforeScreenshots.map((row) => ({
  ...row,
  evidenceRole: 'BEFORE',
  existingVersionedArtifact: true,
})));
fs.writeFileSync(path.join(outputRoot, 'input-manifest.json'), `${stable({
  schemaVersion: 'mathup.fase2d-p0.input-manifest.v1',
  targetVisualEntityIds: [...targetIds].sort(),
  sourcePopulation: 'artifacts/fase2d/runs/run-a/population.jsonl',
  sourcePopulationHash: sha256(fs.readFileSync(path.join(phase2dRoot, 'population.jsonl'))),
  representationsDigest: sha256(representations.map(stable).join('\n')),
  productionImports: 0,
  productionWrites: 0,
})}\n`, 'utf8');
process.stdout.write(`P0_PREPARED entities=${population.length} representations=${representations.length}\n`);
