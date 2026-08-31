import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'artifacts', 'andalucia-runtime-skill-chain');
fs.mkdirSync(out, { recursive: true });

const context = { window: {} };
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-source-app-visual-parity.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const runtime = context.window.ANDALUCIA_PAU_RUNTIME;
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const staleSolutionPattern = /desarrollo contrastado con la resoluci[oó]n de referencia|se identifican los datos y las condiciones|se aplica el procedimiento correspondiente|los c[aá]lculos se realizan de forma exacta|la simplificaci[oó]n conduce al resultado|comprobaci[oó]n satisfactoria/i;
const phiPattern = /(?:\\Phi|Φ)\s*\(/;
const inlineUnitFractionPattern = /(?:\\?frac\s*\{?\s*km\s*\}?\s*\{?\s*h\s*\}?|km\s*\/\s*h\s*(?:\}|\)))/i;
const sourceReferenceOnlyPattern = /^Paso\s+\d+\s*:\s*desarrollo contrastado/im;

const rows = [];
for (const courseId of ['2bach-mates', '2bach-ccss']) {
  for (const exercise of runtime.challengeRecords(courseId)) {
    for (let index = 0; index < exercise.parts.length; index += 1) {
      const part = exercise.parts[index];
      const delivery = runtime.materializePart(part, `skill-chain|${exercise.exerciseId}|${part.id}`);
      const solution = (part.solutionSteps || []).join('\n');
      rows.push({
        courseId,
        exerciseId: exercise.exerciseId,
        subpartId: part.id,
        source: exercise.source,
        year: exercise.year,
        sitting: exercise.sitting,
        detectedSubpartCount: exercise.parts.length,
        generatedQuestionCount: exercise.parts.length,
        correctAnswerCount: part.semanticAnswer ? 1 : 0,
        optionSetCount: delivery.options?.length === 4 ? 1 : 0,
        solutionCount: delivery.solution ? 1 : 0,
        reachableInteractiveSubpartCount: 1,
        staleMaterializedSolution: staleSolutionPattern.test(solution),
        sourceReferenceOnlySolution: sourceReferenceOnlyPattern.test(solution),
        forbiddenPhi: phiPattern.test(solution),
        inlineUnitRenderedAsFraction: inlineUnitFractionPattern.test([part.text, part.semanticAnswer, solution].join('\n')),
        independentOptionSet: new Set(delivery.options || []).size === 4,
        uniqueCorrectOption: (delivery.options || []).filter((_, optionIndex) => optionIndex === delivery.correct).length === 1
      });
    }
  }
}

const summary = {
  schemaVersion: 'mathup.andalucia-runtime-skill-chain.v1',
  generatedAt: new Date().toISOString(),
  skills: {
    solution: {
      path: '.agents/skills/solucion-de-ejercicios/SKILL.md',
      sha256: sha256(path.join(root, '.agents/skills/solucion-de-ejercicios/SKILL.md'))
    },
    statements: {
      path: 'C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md',
      sha256: sha256('C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md')
    }
  },
  enabledExercises: new Set(rows.map((row) => row.exerciseId)).size,
  enabledSubparts: rows.length,
  staleMaterializedSolutions: rows.filter((row) => row.staleMaterializedSolution).length,
  sourceReferenceOnlySolutions: rows.filter((row) => row.sourceReferenceOnlySolution).length,
  forbiddenPhiSolutions: rows.filter((row) => row.forbiddenPhi).length,
  inlineUnitFractions: rows.filter((row) => row.inlineUnitRenderedAsFraction).length,
  contractFailures: rows.filter((row) => !row.independentOptionSet || !row.uniqueCorrectOption || !row.solutionCount).length
};

const phase = process.argv.includes('--before') ? 'before' : process.argv.includes('--after') ? 'after' : 'current';
fs.writeFileSync(path.join(out, `${phase}-rows.jsonl`), `${rows.map((row) => JSON.stringify(row)).join('\n')}\n`);
fs.writeFileSync(path.join(out, `${phase}-summary.json`), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary, null, 2));

export { inlineUnitFractionPattern, phiPattern, rows, sourceReferenceOnlyPattern, staleSolutionPattern, summary };
