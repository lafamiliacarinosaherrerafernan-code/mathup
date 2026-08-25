import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { inventoryConstructions, parseMtef3, sha256, toLatex, toMathAst, toMathMl } from "./mtef3-recovery.mjs";

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
}

export function stableJson(value) {
  return `${JSON.stringify(stable(value))}\n`;
}

export function readJsonl(filePath) {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/u).filter(Boolean).map(JSON.parse);
}

export function semanticHash(records) {
  return sha256(records.slice().sort((a, b) => String(a.objectId).localeCompare(String(b.objectId))).map(stableJson).join(""));
}

function assertFileHash(filePath, expected, label) {
  const actual = sha256(fs.readFileSync(filePath));
  if (actual !== expected) throw new Error(`${label} hash mismatch: ${filePath}`);
  return actual;
}

function associateExercise(native, exercises) {
  const candidates = exercises.filter((exercise) => exercise.documentId === native.documentId
    && exercise.traceability.rangeStart <= native.fieldStartCp
    && exercise.traceability.rangeEnd >= native.fieldEndCp);
  if (candidates.length !== 1) throw new Error(`${native.objectId}: expected one exercise association, got ${candidates.length}`);
  const exercise = candidates[0];
  const ordered = (exercise.subparts ?? []).slice().sort((a, b) => a.characterOffset - b.characterOffset);
  const preceding = ordered.filter((part) => part.characterOffset <= native.fieldStartCp).at(-1);
  const next = ordered.find((part) => part.characterOffset > native.fieldStartCp);
  const subpart = preceding && (!next || native.fieldStartCp < next.characterOffset) ? preceding.label : null;
  const objectBlockIndex = exercise.rawBlocks.findIndex((block) => block.type === "document-object" && block.objectId === native.objectId);
  if (objectBlockIndex < 0) throw new Error(`${native.objectId}: object missing from associated exercise blocks`);
  const before = exercise.rawBlocks.slice(0, objectBlockIndex).reverse().find((block) => block.type === "text")?.text ?? "";
  const after = exercise.rawBlocks.slice(objectBlockIndex + 1).find((block) => block.type === "text")?.text ?? "";
  return {
    documentExerciseId: exercise.documentExerciseId,
    option: exercise.option,
    exerciseNumber: exercise.exerciseNumber,
    subpart,
    scope: subpart ? "SUBPART" : "EXERCISE",
    sourceRange: { startCp: native.fieldStartCp, separatorCp: native.fieldSeparatorCp, endCp: native.fieldEndCp },
    context: { before: before.slice(-240), after: after.slice(0, 240) }
  };
}

export function recoverEquationObjects({ nativeRegistryPath, exercisesPath, projectRoot, reverseInput = false }) {
  const registry = readJsonl(nativeRegistryPath);
  const exercises = readJsonl(exercisesPath);
  const source = reverseInput ? registry.slice().reverse() : registry;
  const records = source.map((native) => {
    assertFileHash(path.join(projectRoot, native.sourcePath), native.sourceDocumentSha256, "DOC");
    assertFileHash(path.join(projectRoot, native.nativePath), native.nativeSha256, "Equation Native");
    assertFileHash(path.join(projectRoot, native.mtefPath), native.mtefSha256, "MTEF");
    assertFileHash(path.join(projectRoot, native.emfPath), native.emfSha256, "EMF");
    assertFileHash(path.join(projectRoot, native.pngPath), native.pngSha256, "PNG");
    const mtef = fs.readFileSync(path.join(projectRoot, native.mtefPath));
    const recordTree = parseMtef3(mtef);
    const ast = toMathAst(recordTree);
    const latex = toLatex(ast);
    const mathml = toMathMl(ast);
    if (!latex.trim() || !mathml.includes("<math")) throw new Error(`${native.objectId}: empty derived representation`);
    const constructionCounts = Object.fromEntries([...inventoryConstructions(ast)].sort(([a], [b]) => a.localeCompare(b)));
    const exerciseAssociation = associateExercise(native, exercises);
    return {
      schemaVersion: "mathup.equation3-recovery.v1",
      objectId: native.objectId,
      classification: "NATIVE_STRUCTURE_RECOVERED",
      sourceAuthority: {
        sourcePath: native.sourcePath,
        documentId: native.documentId,
        documentSha256: native.sourceDocumentSha256,
        objectClass: "Equation.3",
        oleStorageRoot: native.oleStorageRoot,
        oleStoragePath: native.oleStoragePath,
        nativePath: native.nativePath,
        nativeSha256: native.nativeSha256,
        mtefPath: native.mtefPath,
        mtefSha256: native.mtefSha256,
        emfPath: native.emfPath,
        emfSha256: native.emfSha256,
        pngPath: native.pngPath,
        pngSha256: native.pngSha256,
        mappingEvidence: native.mappingEvidence,
        sprmCPicLocation: native.sprmCPicLocation
      },
      exerciseAssociation,
      nativeFormat: { format: "MTEF", version: recordTree.header.version, platform: recordTree.header.platform, product: recordTree.header.product, productVersion: recordTree.header.productVersion },
      mathAst: ast,
      mathAstSha256: sha256(stableJson(ast)),
      derived: {
        latex,
        latexSha256: sha256(latex),
        mathml,
        mathmlSha256: sha256(mathml)
      },
      constructionCounts,
      roundTrip: {
        mode: "MTEF_PARSE_TO_AST_REPARSE",
        deterministic: true,
        sourceBytesPreserved: true,
        note: "No se reserializa MTEF; la ida/vuelta verificable es lectura repetida del mismo flujo nativo con AST y derivados idénticos."
      },
      visualValidation: {
        evidencePrepared: true,
        officialRaster: native.pngPath,
        derivedRepresentation: "MathML generado desde el AST",
        status: "HUMAN_COMPARISON_PENDING",
        automaticallyIdentical: false,
        substantiveDifferenceDetected: false,
        note: "La equivalencia visual sustantiva no se declara automáticamente; requiere comparar la evidencia oficial con el renderizado."
      }
    };
  });
  return records.sort((a, b) => a.objectId.localeCompare(b.objectId));
}

export function summarizeRecovery(records, exercises) {
  const classifications = {};
  const constructions = {};
  for (const record of records) {
    classifications[record.classification] = (classifications[record.classification] ?? 0) + 1;
    for (const [key, count] of Object.entries(record.constructionCounts)) constructions[key] = (constructions[key] ?? 0) + count;
  }
  const objectIds = new Set(records.map((record) => record.objectId));
  const exercisesWithObjects = exercises.filter((exercise) => exercise.documentObjects.length > 0);
  const structurallyRecovered = exercisesWithObjects.filter((exercise) => exercise.documentObjects.every((id) => objectIds.has(id)));
  const noObjects = exercises.filter((exercise) => exercise.documentObjects.length === 0);
  return {
    schemaVersion: "mathup.equation3-recovery-summary.v1",
    objectsTotal: records.length,
    classifications,
    constructions: Object.fromEntries(Object.entries(constructions).sort(([a], [b]) => a.localeCompare(b))),
    nativeStructureRecovered: classifications.NATIVE_STRUCTURE_RECOVERED ?? 0,
    deterministicConversionRecovered: classifications.DETERMINISTIC_CONVERSION_RECOVERED ?? 0,
    visualTranscriptionRequired: classifications.VISUAL_TRANSCRIPTION_REQUIRED ?? 0,
    ambiguous: classifications.AMBIGUOUS ?? 0,
    unrecoverable: classifications.UNRECOVERABLE ?? 0,
    visualComparison: { identicalCertified: 0, differencesConfirmed: 0, humanComparisonPending: records.length },
    exercises: {
      total: exercises.length,
      withoutEquation3Objects: noObjects.length,
      withEquation3Objects: exercisesWithObjects.length,
      structurallyRecovered: structurallyRecovered.length,
      fullyPreparedForIntegrationNow: noObjects.length,
      stillBlockedPendingVisualComparison: structurallyRecovered.length,
      potentialAfterHumanVisualApproval: exercises.length
    },
    semanticHash: semanticHash(records)
  };
}

export function hashProtectedFiles(projectRoot, relativePaths) {
  return Object.fromEntries(relativePaths.map((relativePath) => [relativePath, crypto.createHash("sha256").update(fs.readFileSync(path.join(projectRoot, relativePath))).digest("hex")]));
}
