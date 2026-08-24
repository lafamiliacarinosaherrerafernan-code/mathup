import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(root, "artifacts", "fase2", "runs", "run-a");
const outputDir = path.join(root, "artifacts", "fase2a");
const reportPath = path.join(root, "docs", "FASE-2A-RECUPERACION-RESPUESTAS-SOLUCIONES-MATHUP.md");
const inventoryPath = path.join(root, "docs", "FASE-0-INVENTARIO-CATALOGO-MATHUP.json");
const pdftotext = "C:\\Program Files\\Git\\clangarm64\\bin\\pdftotext.exe";
const antiword = "C:\\Program Files\\Git\\clangarm64\\bin\\antiword.exe";
const unzip = "C:\\Program Files\\Git\\usr\\bin\\unzip.exe";

const clean = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const fold = (value) => clean(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const semantic = (value) => fold(value).normalize("NFKC").replace(/[^a-z0-9áéíóúüñ∞≤≥=+\-*/^()]+/giu, " ").replace(/\s+/g, " ").trim();
const rel = (file) => path.relative(root, file).replaceAll("\\", "/");
const sha = (value) => crypto.createHash("sha256").update(String(value ?? "")).digest("hex");
const readJsonl = (file) => fs.readFileSync(file, "utf8").trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
const writeJsonl = (file, values) => fs.writeFileSync(file, `${values.map((value) => JSON.stringify(value)).join("\n")}\n`, "utf8");

function corePauId(value) {
  return (String(value ?? "").match(/(?:mates2|ccss2)-[a-z0-9]+-[0-9a-f]{12}/i) || [""])[0].toLowerCase();
}

function allPauIds(value) {
  return [...String(value ?? "").matchAll(/(?:mates2|ccss2)-[a-z0-9-]+/gi)].map((match) => match[0].replace(/[|,)]+$/g, "").toLowerCase());
}

function answerBankCoordinates(record) {
  const match = String(record.sourcePath || "").match(/(?:MATES_II_EXAM_ANSWERS|CCSS_II_BLOCK_ANSWERS)\.((?:mates2|ccss2)-[^.]+)\.(.+)$/i);
  if (!match) return null;
  return { key: match[1].toLowerCase(), part: clean(match[2]) || "Resultado" };
}

function valuesConflict(records) {
  const byPart = new Map();
  for (const record of records) {
    const coordinates = answerBankCoordinates(record);
    const part = coordinates?.part || record.currentId || "Resultado";
    if (!byPart.has(part)) byPart.set(part, { answers: new Set(), solutions: new Set() });
    const group = byPart.get(part);
    if (clean(record.answer)) group.answers.add(semantic(record.answer));
    if (clean(record.solution)) group.solutions.add(semantic(record.solution));
  }
  return [...byPart.values()].some((group) => group.answers.size > 1 || group.solutions.size > 1);
}

function candidateAnchors(exercise) {
  const values = [exercise.content?.statement?.plainText, ...(exercise.content?.statement?.blocks || []).flatMap((block) => [block?.value, block?.sourceLiteral])]
    .map(semantic).filter((value) => value.length >= 45);
  const unique = [...new Set(values)];
  const anchors = [];
  for (const value of unique) {
    let reduced = value;
    const half = Math.floor(value.length / 2);
    if (half > 40 && value.slice(0, half).trim() === value.slice(value.length - half).trim()) reduced = value.slice(0, half).trim();
    anchors.push(reduced.slice(0, Math.min(110, reduced.length)));
  }
  return [...new Set(anchors)].filter((value) => value.length >= 45);
}

function buildAutomaton(anchorRows) {
  const nodes = [{ next: new Map(), fail: 0, outputs: [] }];
  for (const row of anchorRows) {
    let state = 0;
    for (const char of row.anchor) {
      if (!nodes[state].next.has(char)) {
        nodes[state].next.set(char, nodes.length);
        nodes.push({ next: new Map(), fail: 0, outputs: [] });
      }
      state = nodes[state].next.get(char);
    }
    nodes[state].outputs.push(row.candidateId);
  }
  const queue = [];
  for (const child of nodes[0].next.values()) queue.push(child);
  for (let index = 0; index < queue.length; index += 1) {
    const state = queue[index];
    for (const [char, child] of nodes[state].next) {
      queue.push(child);
      let failure = nodes[state].fail;
      while (failure && !nodes[failure].next.has(char)) failure = nodes[failure].fail;
      nodes[child].fail = nodes[failure].next.get(char) ?? 0;
      nodes[child].outputs.push(...nodes[nodes[child].fail].outputs);
    }
  }
  return { nodes };
}

function scanAutomaton(text, automaton) {
  const found = new Set();
  let state = 0;
  for (const char of text) {
    while (state && !automaton.nodes[state].next.has(char)) state = automaton.nodes[state].fail;
    state = automaton.nodes[state].next.get(char) ?? 0;
    for (const candidateId of automaton.nodes[state].outputs) found.add(candidateId);
  }
  return found;
}

function walk(directory, result = []) {
  if (!fs.existsSync(directory)) return result;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(full, result);
    else result.push(full);
  }
  return result;
}

function extractDocument(file) {
  const extension = path.extname(file).toLowerCase();
  try {
    if ([".txt", ".md", ".csv"].includes(extension)) return fs.readFileSync(file, "utf8");
    if (extension === ".pdf" && fs.existsSync(pdftotext)) return execFileSync(pdftotext, ["-enc", "UTF-8", "-layout", file, "-"], { encoding: "utf8", timeout: 30000, maxBuffer: 40 * 1024 * 1024 });
    if (extension === ".doc" && fs.existsSync(antiword)) return execFileSync(antiword, [file], { encoding: "utf8", timeout: 30000, maxBuffer: 40 * 1024 * 1024 });
    if (extension === ".docx" && fs.existsSync(unzip)) {
      const xml = execFileSync(unzip, ["-p", file, "word/document.xml"], { encoding: "utf8", timeout: 30000, maxBuffer: 40 * 1024 * 1024 });
      return xml.replace(/<w:tab\/?[^>]*>/g, "\t").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    }
  } catch (error) {
    return { error: clean(error.message) };
  }
  return "";
}

function isRelevantDocument(file) {
  const relative = rel(file);
  const extension = path.extname(file).toLowerCase();
  if (![".pdf", ".doc", ".docx", ".txt", ".md", ".csv"].includes(extension)) return false;
  return /(?:2º?\s*bach|2bach|ccss\s*ii|matem[aá]ticas\s*ii|pau|evau|selectividad|ex[aá]menes?\s+castilla|_ex(?:jun|jul|sep)|examenes?)/i.test(relative);
}

function isSolutionDocument(file) {
  return /soluci|resuelt|respuesta|answer|resoluci/i.test(rel(file));
}

function subjectOf(courseId) {
  return courseId === "2bach-mates" ? "Matemáticas II" : courseId === "2bach-ccss" ? "CCSS II" : "Matemáticas I";
}

function table(rows, columns) {
  const header = `| ${columns.join(" | ")} |`;
  const rule = `| ${columns.map(() => "---").join(" | ")} |`;
  return [header, rule, ...rows.map((row) => `| ${columns.map((column) => String(row[column] ?? "").replace(/\|/g, "\\|")).join(" | ")} |`)].join("\n");
}

fs.mkdirSync(outputDir, { recursive: true });
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const records = inventory.records;
const inventoryById = new Map(records.map((record) => [record.inventoryId, record]));
const candidates = readJsonl(path.join(runDir, "canonical-candidates.jsonl"));
const validations = new Map(readJsonl(path.join(runDir, "validation-results.jsonl")).map((row) => [row.candidateId, row]));

const missingPau = candidates.filter(({ candidateId, exercise }) => {
  const codes = new Set((validations.get(candidateId)?.diagnostics || []).map((item) => item.code));
  return ["2bach-mates", "2bach-ccss"].includes(exercise.classification?.courseId) && codes.has("ANSWER_MISSING") && codes.has("SOLUTION_MISSING");
});
if (missingPau.length !== 3226) throw new Error(`Se esperaban 3226 candidatos PAU sin respuesta/solución y se localizaron ${missingPau.length}.`);

const answerGroups = new Map();
const answerCoreGroups = new Map();
for (const record of records) {
  if (!clean(record.answer) && !clean(record.solution)) continue;
  const coordinates = answerBankCoordinates(record);
  if (!coordinates) continue;
  if (!answerGroups.has(coordinates.key)) answerGroups.set(coordinates.key, []);
  answerGroups.get(coordinates.key).push(record);
  const core = corePauId(coordinates.key);
  if (core) {
    if (!answerCoreGroups.has(core)) answerCoreGroups.set(core, new Set());
    answerCoreGroups.get(core).add(coordinates.key);
  }
}

const auditRows = [];
const auditById = new Map();
for (const candidate of missingPau) {
  const { candidateId, exercise } = candidate;
  const traceRecords = (exercise.traceability?.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
  const keys = new Set();
  for (const value of [exercise.provenance?.pau?.exerciseLabel, exercise.traceability?.originalIdentity, ...(exercise.identity?.legacyIds || [])]) {
    for (const key of allPauIds(value)) keys.add(key);
  }
  for (const record of traceRecords) {
    for (const value of [record.currentId, record.exerciseId, record.rawBaseId, record.templateId, record.sourcePath]) {
      for (const key of allPauIds(value)) keys.add(key);
    }
  }
  const exactKeys = [...keys].filter((key) => answerGroups.has(key));
  const coreKeys = [...new Set([...keys].map(corePauId).filter(Boolean))];
  const partialKeys = [...new Set(coreKeys.flatMap((core) => [...(answerCoreGroups.get(core) || [])]))].filter((key) => !exactKeys.includes(key));
  const exactEvidence = exactKeys.flatMap((key) => answerGroups.get(key) || []);
  const exactConflict = valuesConflict(exactEvidence);
  const row = {
    candidateId,
    exerciseId: exercise.identity?.exerciseId,
    courseId: exercise.classification?.courseId,
    subject: subjectOf(exercise.classification?.courseId),
    statement: exercise.content?.statement?.plainText,
    community: exercise.provenance?.community?.name ?? null,
    year: exercise.provenance?.pau?.year ?? null,
    sitting: exercise.provenance?.pau?.sitting ?? null,
    exerciseLabel: exercise.provenance?.pau?.exerciseLabel ?? null,
    sourceFile: exercise.provenance?.source?.sourceFile ?? null,
    sourcePath: exercise.provenance?.source?.sourcePath ?? null,
    inventoryRecordIds: exercise.traceability?.inventoryRecordIds || [],
    candidateKeys: [...keys].sort(),
    exactAnswerKeys: exactKeys.sort(),
    partialAnswerKeys: partialKeys.sort(),
    exactEvidenceRecordIds: exactEvidence.map((record) => record.inventoryId).sort(),
    exactEvidenceSources: [...new Set(exactEvidence.map((record) => record.sourceFile))].sort(),
    documentMatches: [],
    solutionDocumentMatches: [],
    originalDocumentMatches: [],
    status: exactConflict ? "CONFLICT" : exactKeys.length ? "UNIQUE_MATCH" : partialKeys.length ? "POSSIBLE_MATCH" : "NOT_FOUND",
    reason: exactConflict ? "La misma clave y apartado contienen valores incompatibles." : exactKeys.length ? "Existe una clave PAU exacta en un banco separado de respuestas/soluciones." : partialKeys.length ? "Existe material con la misma clave PAU base, pero la variante exacta no queda demostrada." : "No se encontró respuesta o solución estructurada asociable."
  };
  auditRows.push(row);
  auditById.set(candidateId, row);
}

const anchorRows = missingPau.flatMap(({ candidateId, exercise }) => candidateAnchors(exercise).map((anchor) => ({ candidateId, anchor })));
const automaton = buildAutomaton(anchorRows);
const documentFiles = walk(path.join(root, "documentos")).concat(walk(path.join(root, "_extracted"))).filter(isRelevantDocument);
const documentManifest = [];
for (const file of documentFiles) {
  const extracted = extractDocument(file);
  if (typeof extracted !== "string") {
    documentManifest.push({ file: rel(file), extension: path.extname(file).toLowerCase(), extraction: "ERROR", error: extracted.error, textLength: 0, candidateMatches: 0 });
    continue;
  }
  const normalized = semantic(extracted);
  const matches = normalized.length >= 45 ? scanAutomaton(normalized, automaton) : new Set();
  const solutionLike = isSolutionDocument(file);
  for (const candidateId of matches) {
    const row = auditById.get(candidateId);
    if (!row) continue;
    row.documentMatches.push(rel(file));
    if (solutionLike) row.solutionDocumentMatches.push(rel(file));
    else row.originalDocumentMatches.push(rel(file));
  }
  documentManifest.push({
    file: rel(file), extension: path.extname(file).toLowerCase(), extraction: normalized ? "TEXT" : "NO_TEXT",
    sha256: sha(fs.readFileSync(file)), textLength: extracted.length, candidateMatches: matches.size,
    solutionLike
  });
}

for (const row of auditRows) {
  row.documentMatches = [...new Set(row.documentMatches)].sort();
  row.solutionDocumentMatches = [...new Set(row.solutionDocumentMatches)].sort();
  row.originalDocumentMatches = [...new Set(row.originalDocumentMatches)].sort();
  if (row.status === "NOT_FOUND" && row.solutionDocumentMatches.length) {
    row.status = "POSSIBLE_MATCH";
    row.reason = "El enunciado aparece en un documento de solución/respuestas, pero no hay una vinculación estructurada inequívoca por ejercicio/apartado.";
  }
}

const collisionRows = candidates.filter(({ exercise }) => exercise.classification?.courseId === "1bach-mates" && exercise.publication?.exclusionReasons?.some((code) => ["ANSWER_CONFLICT", "SOLUTION_CONFLICT"].includes(code))).map(({ candidateId, exercise }) => {
  const trace = (exercise.traceability?.inventoryRecordIds || []).map((id) => inventoryById.get(id)).filter(Boolean);
  return {
    candidateId,
    originalIdentity: exercise.traceability?.originalIdentity,
    legacyIds: exercise.identity?.legacyIds || [],
    sourceFiles: [...new Set(trace.map((record) => record.sourceFile))].sort(),
    sourcePaths: trace.map((record) => record.sourcePath).sort(),
    courses: [...new Set(trace.map((record) => record.course))].sort(),
    topics: [...new Set(trace.map((record) => record.topic))].sort(),
    statementFingerprints: [...new Set(trace.map((record) => sha(semantic(record.statement)).slice(0, 16)).filter(Boolean))].sort(),
    answers: [...new Set(trace.map((record) => clean(record.answer)).filter(Boolean))],
    solutions: [...new Set(trace.map((record) => clean(record.solution)).filter(Boolean))],
    collisionCause: "Identidad heredada numérica reutilizada sin espacio de nombres de banco/tema; mezcla registros de fuentes y/o enunciados distintos.",
    proposedIdentityComponents: ["courseId", "subjectId", "source-family/namespace", "topic-or-block", "normalized-statement-hash", "legacy-id-within-source"]
  };
});

const choiceRows = [];
const modalityRows = [];
for (const { candidateId, exercise } of candidates) {
  const diagnostics = validations.get(candidateId)?.diagnostics || [];
  if (diagnostics.some((item) => item.code === "CHOICES_REQUIRED")) {
    choiceRows.push({
      candidateId, courseId: exercise.classification?.courseId, subjectId: exercise.classification?.subjectId,
      answerKind: exercise.answer?.kind, modalities: exercise.modalities || [], provenanceKind: exercise.provenance?.kind,
      isPau: exercise.classification?.stage === "PAU" || exercise.provenance?.kind === "official-pau"
    });
  }
  if (["1bach-mates", "1bach-ccss", "2bach-mates", "2bach-ccss"].includes(exercise.classification?.courseId)) {
    modalityRows.push({ candidateId, courseId: exercise.classification.courseId, modalities: exercise.modalities || [], diagnosticCodes: diagnostics.filter((item) => /MODALIT|CHOICES_REQUIRED/.test(item.code)).map((item) => item.code) });
  }
}

const countBy = (rows, key) => Object.fromEntries([...rows.reduce((map, row) => map.set(row[key], (map.get(row[key]) || 0) + 1), new Map()).entries()].sort());
const statuses = ["UNIQUE_MATCH", "POSSIBLE_MATCH", "CONFLICT", "NOT_FOUND"];
const summaryByCourse = ["2bach-mates", "2bach-ccss"].map((courseId) => {
  const rows = auditRows.filter((row) => row.courseId === courseId);
  return Object.fromEntries([["courseId", courseId], ["subject", subjectOf(courseId)], ["total", rows.length], ...statuses.map((status) => [status, rows.filter((row) => row.status === status).length])]);
});
const totalSummary = Object.fromEntries([["total", auditRows.length], ...statuses.map((status) => [status, auditRows.filter((row) => row.status === status).length])]);
const choiceByCourse = countBy(choiceRows, "courseId");
const solutionSourceCounts = Object.fromEntries([...auditRows.flatMap((row) => row.exactEvidenceSources).reduce((map, source) => map.set(source, (map.get(source) || 0) + 1), new Map()).entries()].sort((a, b) => b[1] - a[1]));
const modalitySummary = ["1bach-mates", "1bach-ccss", "2bach-mates", "2bach-ccss"].map((courseId) => {
  const rows = modalityRows.filter((row) => row.courseId === courseId);
  return {
    courseId, candidates: rows.length,
    noModalities: rows.filter((row) => !row.modalities.length).length,
    modalityErrors: rows.filter((row) => row.diagnosticCodes.some((code) => ["MODALITIES_MISSING", "MODALITY_INVALID", "MODALITY_NOT_ALLOWED_FOR_PROFILE", "MODALITY_UNDEMONSTRATED"].includes(code))).length,
    pauUndeclared: rows.filter((row) => row.diagnosticCodes.includes("PAU_MODALITY_UNDECLARED")).length,
    choicesRequired: rows.filter((row) => row.diagnosticCodes.includes("CHOICES_REQUIRED")).length
  };
});

const summary = {
  generatedAt: new Date().toISOString(), methodVersion: "fase2a-recovery-audit-v1", inputCandidateCount: missingPau.length,
  totals: totalSummary, byCourse: summaryByCourse,
  structuredAnswerBankKeys: answerGroups.size, structuredAnswerEvidenceRecords: [...answerGroups.values()].reduce((sum, rows) => sum + rows.length, 0),
  structuredEvidenceSources: solutionSourceCounts,
  documentsAudited: documentManifest.length,
  documentsWithExtractedText: documentManifest.filter((row) => row.extraction === "TEXT").length,
  documentsWithoutText: documentManifest.filter((row) => row.extraction === "NO_TEXT").length,
  documentExtractionErrors: documentManifest.filter((row) => row.extraction === "ERROR").length,
  candidatesFoundInOriginalDocuments: auditRows.filter((row) => row.originalDocumentMatches.length).length,
  candidatesFoundInSolutionDocuments: auditRows.filter((row) => row.solutionDocumentMatches.length).length,
  choicesRequired: { total: choiceRows.length, byCourse: choiceByCourse, pau: choiceRows.filter((row) => row.isPau).length },
  modalitySummary,
  mathematicsIIdentityCollisions: collisionRows.length
};

writeJsonl(path.join(outputDir, "pau-recovery-classification.jsonl"), auditRows);
writeJson(path.join(outputDir, "pau-recovery-summary.json"), summary);
writeJson(path.join(outputDir, "document-evidence-manifest.json"), documentManifest);
writeJsonl(path.join(outputDir, "mates-i-identity-collisions.jsonl"), collisionRows);
writeJson(path.join(outputDir, "choices-modalities-diagnostic.json"), { choicesRequired: choiceRows, modalitySummary });

const report = `# Fase 2A — Recuperación y diagnóstico de respuestas y soluciones de +MathUp

## Alcance y garantías

Auditoría de solo lectura sobre los bancos, documentos y artefactos existentes. No enlaza respuestas, no modifica candidatos, no corrige contenido y no altera el contrato canónico. La clasificación es deliberadamente conservadora:

- \`UNIQUE_MATCH\`: una clave PAU completa y exacta conduce a un único grupo estructurado de respuestas/soluciones sin incompatibilidades por apartado.
- \`POSSIBLE_MATCH\`: existe material por clave PAU base o en un documento de soluciones, pero la relación ejercicio/apartado no queda demostrada de forma inequívoca.
- \`CONFLICT\`: la misma clave exacta y el mismo apartado contienen valores incompatibles.
- \`NOT_FOUND\`: no se localiza respuesta o solución asociable en las fuentes examinadas.

La presencia literal de un enunciado en un PDF/DOC no se convierte en \`UNIQUE_MATCH\`: sirve como trazabilidad documental y, si el archivo es un solucionario, como evidencia posible. Los archivos sin texto extraíble se registran, pero no se someten a OCR ni Mathpix.

## Resultado de los 3.226 candidatos PAU

${table(summaryByCourse, ["subject", "total", "UNIQUE_MATCH", "POSSIBLE_MATCH", "CONFLICT", "NOT_FOUND"])}

**Total:** ${totalSummary.UNIQUE_MATCH} \`UNIQUE_MATCH\`, ${totalSummary.POSSIBLE_MATCH} \`POSSIBLE_MATCH\`, ${totalSummary.CONFLICT} \`CONFLICT\` y ${totalSummary.NOT_FOUND} \`NOT_FOUND\`.

### Dónde están las coincidencias

Se localizaron ${summary.structuredAnswerEvidenceRecords} registros de evidencia en ${summary.structuredAnswerBankKeys} claves de bancos separados. Fuentes que aportan coincidencias exactas para candidatos auditados:

${table(Object.entries(solutionSourceCounts).map(([source, candidates]) => ({ source, candidates })), ["source", "candidates"])}

Además se inspeccionaron ${summary.documentsAudited} documentos relevantes (${summary.documentsWithExtractedText} con texto extraíble, ${summary.documentsWithoutText} sin texto y ${summary.documentExtractionErrors} con error de extracción). ${summary.candidatesFoundInOriginalDocuments} candidatos aparecen literalmente en documentos no identificados como solucionario y ${summary.candidatesFoundInSolutionDocuments} en archivos cuyo nombre indica solución/respuesta. Estos últimos se mantienen como posibles salvo que exista también clave estructurada exacta.

## Trazabilidad PAU original

Cada fila de \`pau-recovery-classification.jsonl\` conserva comunidad, año, convocatoria, etiqueta de ejercicio, fuente original, \`sourcePath\`, registros del inventario, claves exactas/parciales y documentos coincidentes. Comunidad/año/convocatoria se consideran demostrados solo cuando constan en el candidato y su evidencia de origen; un nombre de archivo o una semejanza textual no rellena metadatos ausentes.

Los documentos oficiales suelen aportar enunciado y coordenadas del examen, no necesariamente solución. Una solución en banco separado se considera inequívoca únicamente cuando comparte la clave PAU completa; la coincidencia por los 12 caracteres de la clave base queda como \`POSSIBLE_MATCH\`.

## Diagnóstico de \`CHOICES_REQUIRED\`

Se reproducen ${choiceRows.length} diagnósticos: ${summary.choicesRequired.pau} corresponden a PAU. Desglose: ${Object.entries(choiceByCourse).map(([course, count]) => `${course}: ${count}`).join("; ")}.

No son, por sí mismos, defectos del enunciado fuente. El validador exige cuatro opciones cuando \`answer.kind === "choice"\` o cuando la modalidad contiene \`practice\`, \`challenge\` o \`adventure\`. El importador conserva evidencias de modalidad heredadas y puede tipar como elección una respuesta todavía ausente; así adelanta al nivel editorial requisitos que pertenecen a la entrega.

Separación recomendada para Fase 2B:

1. **Ejercicio canónico:** enunciado, clasificación y procedencia inmutables.
2. **Respuesta matemática:** valor/criterio correcto independiente de letras y posiciones.
3. **Solución:** desarrollo pedagógico trazable, también independiente de la entrega.
4. **Plantilla de entrega:** modalidad autorizada (abierta, práctica, reto, simulación PAU, etc.) y política de generación/selección de distractores.
5. **Instancia de sesión:** cuatro opciones materializadas y barajadas con semilla por intento. A/B/C/D solo existen aquí; la correcta nunca se almacena permanentemente como A.

Por tanto, un PAU abierto puede ser canónico sin opciones. Solo una plantilla de entrega de elección múltiple exige tres distractores válidos.

## Diagnóstico de modalidades

${table(modalitySummary, ["courseId", "candidates", "noModalities", "modalityErrors", "pauUndeclared", "choicesRequired"])}

- **Matemáticas I y CCSS I:** \`practice\`, \`challenge\`, \`topic-exam\` u \`open-response\` son modalidades de entrega; deben declararse solo con evidencia. La ausencia de opciones no invalida una entrega abierta.
- **Matemáticas II y CCSS II:** \`official-pau\` y los metadatos PAU describen procedencia; \`pau-simulation\`, \`open-response\`, \`practice\`, \`challenge\`, \`topic-exam\` y \`block-exam\` describen entrega. Ser PAU no obliga a una modalidad única ni a A/B/C/D.
- La corrección mínima posterior es impedir que el importador convierta evidencia de uso en obligación de opciones canónicas y permitir que un ejercicio PAU sin evidencia de entrega quede pendiente editorialmente, no transformado en elección artificial.

## Las 30 colisiones de Matemáticas I

Se auditaron ${collisionRows.length} candidatos. El detalle individual figura en \`mates-i-identity-collisions.jsonl\`. La colisión nace de usar identificadores numéricos heredados (por ejemplo, \`0\`, \`1\`, etc.) fuera del espacio de nombres del banco: el mismo número se reutiliza en fuentes, temas y enunciados diferentes.

Clave propuesta, sin aplicarla todavía:

\`courseId + subjectId + source-family/namespace + topic-or-block + normalized-statement-hash + legacy-id-within-source\`.

El hash del enunciado separa ejercicios diferentes; el espacio de nombres evita que un \`id=0\` de un banco colisione con otro. La deduplicación posterior debe seguir comparando contenido matemático para no crear duplicados artificiales.

## Correcciones propuestas para Fase 2B

1. Incorporar una unión explícita y auditable \`exercise PAU key + apartado -> answer bank key + apartado\`; promover solo las ${totalSummary.UNIQUE_MATCH} coincidencias exactas después de validar contenido y codificación.
2. Mantener las ${totalSummary.POSSIBLE_MATCH} coincidencias en una cola de revisión; no unir por clave base, año o semejanza.
3. Resolver cualquier \`CONFLICT\` mediante revisión humana, conservando todas las versiones.
4. Separar procedencia PAU, modalidad de entrega y materialización de opciones.
5. Hacer que \`choices\` sea opcional para el núcleo abierto y obligatorio únicamente en una plantilla/instancia de elección múltiple.
6. Generar distractores fuera del ejercicio canónico, validar equivalencia y barajar con semilla por intento.
7. Sustituir la identidad numérica global de Matemáticas I por la clave compuesta propuesta, con tabla de redirección desde las identidades actuales.
8. No completar comunidad, año, convocatoria, respuesta o solución por inferencia; conservar \`UNKNOWN\` y motivo.

## Limitaciones

- No se aplicó OCR. Los documentos escaneados sin capa de texto permanecen no inspeccionables automáticamente.
- La coincidencia literal puede no detectar notación alterada por conversiones Word/PDF o caracteres deteriorados.
- Un banco de respuestas exacto demuestra una relación técnica por clave, pero antes de publicación todavía requiere validación matemática y revisión de codificación/notación.
- Esta fase diagnostica y propone; no modifica el esquema, el importador ni los datos.

## Artefactos reproducibles

- \`artifacts/fase2a/pau-recovery-classification.jsonl\`
- \`artifacts/fase2a/pau-recovery-summary.json\`
- \`artifacts/fase2a/document-evidence-manifest.json\`
- \`artifacts/fase2a/mates-i-identity-collisions.jsonl\`
- \`artifacts/fase2a/choices-modalities-diagnostic.json\`
- \`scripts/fase2a-audit-recovery.mjs\`
`;

fs.writeFileSync(reportPath, report, "utf8");
console.log(JSON.stringify(summary, null, 2));
