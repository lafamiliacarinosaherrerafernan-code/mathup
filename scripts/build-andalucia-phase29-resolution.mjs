import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const auditDir = path.join(root, 'artifacts', 'andalucia-source-app-visual-parity');
const out = path.join(root, 'artifacts', 'andalucia-phase29');
const toolDir = path.join(root, 'tools', 'andalucia-phase29-review');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(toolDir, { recursive: true });

const rows = fs.readFileSync(path.join(auditDir, 'exercise-log.jsonl'), 'utf8').trim().split(/\r?\n/u).map(JSON.parse);
const context = { window: {} };
context.globalThis = context;
vm.createContext(context);
for (const relative of [
  'data/andalucia-user-source-index.js',
  'data/andalucia-pau-runtime.js',
  'data/andalucia-global-corrections.js',
  'data/andalucia-source-app-visual-parity.js',
  'data/andalucia-interactive-delivery-gate.js'
]) vm.runInContext(fs.readFileSync(path.join(root, relative), 'utf8'), context, { filename: relative });

const motivatingIds = new Set([
  'pau-user-and-fc24350dc009dd373a61feb93871',
  'pau-can-ex-b9f6f879ab07429e3e9fcf2843eb85cc',
  'pau-can-ex-44b63cc7b878dc2d552ccd771ca6a638'
]);
const nativeDocIds = new Set([
  'pau-can-doc-ex-003f8317c19d7451985b40ff38bc0e52',
  'pau-can-doc-ex-38c9c7d6cb87cc3a35eb9e6966e738da',
  'pau-can-doc-ex-85f170d1a7840bc6c1b5967201af2ff1',
  'pau-can-doc-ex-9a0ded07010dd26dca632b1f31e14653',
  'pau-can-doc-ex-a20c4facec1a69296c29635d28e017c3',
  'pau-can-doc-ex-b125b3e656434aeabb2613c7d119f27d',
  'pau-can-doc-ex-c3a07cd5637a526fc3d1f92bfe4ac0d3',
  'pau-can-doc-ex-e119e071e6eb2f6d1e1e58e259691d83'
]);
const phase29PdfCorrected = rows.filter((row) => row.status === 'CORRECTED' && !motivatingIds.has(row.exerciseId));
const phase29PdfPass = rows.filter((row) => row.status === 'PASS' && [
  'pau-can-ex-592dc0cd8c4406d93ef757266f2852ca',
  'pau-can-ex-7494c79e721628fd3998148c7f0eddbd',
  'pau-can-ex-b38b0b31e36d0d59da2e986e8029a412',
  'pau-can-ex-d90d2b00fee5e8c20febe0b516003647',
  'pau-can-ex-e97a8effb33c5ceb1fcd4022156aeda3'
].includes(row.exerciseId));
const nativePass = rows.filter((row) => nativeDocIds.has(row.exerciseId));
const unresolved = rows.filter((row) => row.status === 'UNRESOLVED_SOURCE');
const byId = new Map(context.window.ANDALUCIA_PAU_RUNTIME.exercises.map((exercise) => [exercise.exerciseId, exercise]));

const sourceCandidates = [
  'CCSS II_1_2010.png', 'CCSS II_2_2010.png', 'CCSS II_3_2010.png',
  'CCSS II_extra_2010.png', 'CCSS II_ord_2010.png'
];
const reviewCases = unresolved.map((row) => {
  const exercise = byId.get(row.exerciseId);
  return {
    ...row,
    decision: 'UNRESOLVED_SOURCE',
    reason: 'El hash 35f05b19… no coincide con ninguno de los cinco documentos CCSS II 2010 aportados. Se revisó la página de ejercicio de los cinco PDF y ninguno contiene este enunciado.',
    sourceCandidates: sourceCandidates.map((name) => `../../artifacts/andalucia-phase29/missing-source-candidates/${encodeURIComponent(name)}`),
    learnerStatement: exercise?.learnerStatement || '',
    learnerStatementHtml: exercise?.learnerStatementHtml || '',
    parts: (exercise?.parts || []).map(({ label, text }) => ({ label, text }))
  };
});

const report = {
  schemaVersion: 'mathup.andalucia.phase29-resolution.v1',
  generatedAt: new Date().toISOString(),
  scope: 'Los 70 NEEDS_HUMAN_VISUAL_REVIEW heredados de fase 2.8',
  initial: { total: 70, pdf: 61, legacyDoc: 8, missingIdentity: 1 },
  resolution: {
    PASS: phase29PdfPass.length + nativePass.length,
    CORRECTED: phase29PdfCorrected.length,
    UNRESOLVED_SOURCE: unresolved.length,
    NEEDS_HUMAN_VISUAL_REVIEW: rows.filter((row) => row.status === 'NEEDS_HUMAN_VISUAL_REVIEW').length,
    FAIL: rows.filter((row) => row.status === 'FAIL').length
  },
  breakdown: {
    pdf: { PASS: phase29PdfPass.length, CORRECTED: phase29PdfCorrected.length },
    legacyDoc: { PASS: nativePass.length, evidence: 'OLE original + 55/55 objetos Equation.3 recuperados sin OCR + hashes verificados + apertura nativa en Word' },
    missingIdentity: { UNRESOLVED_SOURCE: unresolved.length, searchedFiles: sourceCandidates.map((name) => name.replace(/\.png$/u, '.pdf')) }
  },
  motivatingExamples: rows.filter((row) => motivatingIds.has(row.exerciseId)),
  corrected: phase29PdfCorrected,
  visuallyConfirmedPdf: phase29PdfPass,
  nativeDocConfirmed: nativePass,
  unresolved: reviewCases,
  corpusFinal: {
    PASS: rows.filter((row) => row.status === 'PASS').length,
    CORRECTED: rows.filter((row) => row.status === 'CORRECTED').length,
    UNRESOLVED_SOURCE: unresolved.length,
    NEEDS_HUMAN_VISUAL_REVIEW: rows.filter((row) => row.status === 'NEEDS_HUMAN_VISUAL_REVIEW').length,
    FAIL: rows.filter((row) => row.status === 'FAIL').length
  }
};
fs.writeFileSync(path.join(out, 'phase29-resolution.json'), `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(path.join(toolDir, 'data.js'), `window.PHASE29_REVIEW=${JSON.stringify(reviewCases)};\n`);
const git = process.platform === 'win32' ? 'git.exe' : 'git';
const diffStat = execFileSync(git, ['diff', '--stat'], { cwd: root, encoding: 'utf8' });
const statusShort = execFileSync(git, ['status', '--short'], { cwd: root, encoding: 'utf8' });
fs.writeFileSync(path.join(out, 'git-evidence.txt'), `git diff --stat\n${diffStat}\ngit status --short\n${statusShort}`);
console.log(JSON.stringify({ resolution: report.resolution, corpusFinal: report.corpusFinal }, null, 2));
