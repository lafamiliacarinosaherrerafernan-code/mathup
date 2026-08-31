import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { validateSolutionRecord, materializeChoices } from "../catalog/solution-quality/solution-quality.mjs";

const root = process.cwd();
const args = new Map(process.argv.slice(2).map((arg) => arg.split("=", 2)));
const phase = args.get("--phase") || "final";
const output = path.resolve(root, args.get("--output") || `artifacts/solution-skill-master-audit/${phase}.json`);
const skillPath = path.join(root, ".agents/skills/solucion-de-ejercicios/SKILL.md");
const skill = fs.readFileSync(skillPath, "utf8");

const clauses = {
  literalStatement: /Conservar el enunciado íntegro y literal/i,
  independentResolution: /Resolver el ejercicio de forma independiente/i,
  noUndefined: /`undefined`.*nunca|nunca.*`undefined`/is,
  noRawTex: /\\\(.*no.*alumno|alumno.*no.*\\\(/is,
  structuredOutput: /contrato estructurado.*salida|salida.*contrato estructurado/is,
  noFallback: /prohibido.*(?:fallback|relleno)|(?:fallback|relleno).*prohibido/is,
  distractorUniqueness: /distractores.*(?:duplicad|equivalent)/is,
  deterministicShuffle: /barajad.*determinist|determinist.*barajad/is,
  noFixedLetter: /respuesta correcta.*(?:letra|A\/B\/C\/D).*no|no.*respuesta correcta.*(?:letra|A\/B\/C\/D)/is,
  matiNoLhopital: /1\.º Bachillerato[\s\S]{0,2000}L['’]Hôpital.*(?:no|prohib)/i,
  ccssNoLhopital: /CCSS II[\s\S]{0,2500}L['’]Hôpital.*(?:no|prohib)/i,
  matiiConditionalLhopital: /Matemáticas II[\s\S]{0,5000}L['’]Hôpital[\s\S]{0,800}(?:0\/0|∞\/∞)/i,
};

const clauseResults = Object.fromEntries(Object.entries(clauses).map(([name, regex]) => [name, regex.test(skill)]));
const validRecord = {
  exerciseId: "sentinel-matii-1", coursePolicy: "matematicas_ii", statement: "Calcular el límite.",
  answer: "2", steps: [{ explanation: "Se simplifica la expresión.", math: "x+x=2x" }], finalAnswer: "2",
  verification: "La sustitución confirma el resultado.", methods: [], multipleChoice: true,
  distractors: ["1", "3", "4"], attemptSeed: "attempt-1",
};
const invalidRecords = [
  { ...validRecord, exerciseId: "raw", statement: "Calcula \\(x+1\\) y undefined" },
  { ...validRecord, exerciseId: "mati-lh", coursePolicy: "matematicas_i", methods: ["LHOPITAL"] },
  { ...validRecord, exerciseId: "ccss-lh", coursePolicy: "ccss_ii", methods: ["LHOPITAL"] },
  { ...validRecord, exerciseId: "matii-bad-lh", methods: ["LHOPITAL"], indeterminateForm: "0_TIMES_INFINITY" },
  { ...validRecord, exerciseId: "param", isParametricSystem: true, methods: ["GAUSS"] },
  { ...validRecord, exerciseId: "dupes", distractors: ["2", "3", "4"] },
  { ...validRecord, exerciseId: "no-steps", steps: [] },
  { ...validRecord, exerciseId: "mismatch", finalAnswer: "7" },
];
const sentinel = {
  validAccepted: validateSolutionRecord(validRecord).valid,
  invalidRejected: invalidRecords.map((record) => ({ id: record.exerciseId, rejected: !validateSolutionRecord(record).valid, errors: validateSolutionRecord(record).errors.map((e) => e.code) })),
};
const distribution = [0, 0, 0, 0];
for (let i = 0; i < 1000; i += 1) distribution[materializeChoices({ correctAnswer: "4", distractors: ["3", "5", "6"], attemptSeed: `attempt-${i}`, exerciseId: "distribution" }).correctIndex] += 1;

const report = {
  contract: "mathup.solution-skill-audit.v1", phase, generatedAt: new Date().toISOString(),
  skill: { path: path.relative(root, skillPath).replaceAll("\\", "/"), sha256: crypto.createHash("sha256").update(skill).digest("hex") },
  clauseResults, clausePass: Object.values(clauseResults).filter(Boolean).length, clauseTotal: Object.keys(clauseResults).length,
  sentinel, distribution,
  allSentinelsPass: sentinel.validAccepted && sentinel.invalidRejected.every((item) => item.rejected),
};
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
