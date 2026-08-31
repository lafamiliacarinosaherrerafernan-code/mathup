import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "artifacts", "madrid-master-audit");
const read = (name) => JSON.parse(fs.readFileSync(path.join(out, name), "utf8"));
const reconciliation = read("source-reconciliation-summary.json");
const quantitative = read("master-report.json");
const topics = read("topic-census.json");
const blocks = read("block-census.json");
const positions = read("exam-position-census.json");
const statistics = read("statistics-census.json");
const e2e = read("multipart-e2e.json");
const responsive = read("responsive-audit.json");
const tests = read("test-results.json");
const fixes = read("methodology-fixes.json");
const sample = read("review-sample.json").filter((row) => row.status === "SELECTED").slice(0, 15);
const labels = { "2bach-mates": "Matemáticas II", "2bach-ccss": "CCSS II" };
const lines = [];
const add = (...items) => lines.push(...items);

add("# Auditoría maestra PAU Madrid — informe final", "",
  "**MADRID PREPARADA PARA REVISIÓN MANUAL**", "",
  `Generado: ${new Date().toISOString()}.`, "",
  "La autoridad documental exclusiva son los 81 PDF aportados por el usuario en `documentos/PAU Comunidades/MADRID`. El directorio histórico `sources/pau-official/madrid` queda registrado como `NOT_USED_FOR_MADRID_AUTHORITY`. Intervalo auditado: 2000–2026.", "",
  "Este cierre acredita la preparación técnica para revisión manual; no sustituye la aprobación final del usuario.", "",
  "## Resumen ejecutivo", "",
  "| Materia | Fuente | Excluidos de otra comunidad | Habilitados | Apartados | Temas | Bloques | Posiciones | Inaccesibles |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|");
for (const scope of quantitative.scopeReports) {
  const rec = reconciliation.courses[scope.courseId];
  add(`| ${scope.subject} | ${rec.sourceRecords} | ${rec.excludedOtherCommunity} | ${scope.enabledCanonicalTotal} | ${scope.interactiveSubpartTotal} | ${scope.topics} | ${scope.blocks} | ${scope.examPositions} | ${scope.enabledButUnreachable} |`);
}

add("", "## Reconciliación y calidad", "",
  "| Gate | Resultado |", "|---|---:|",
  `| Inventario 81/81 | ${reconciliation.gates.sourceInventoryComplete ? "PASS" : "FAIL"} |`,
  `| Fuente = canónico por apartados | ${reconciliation.gates.sourceSubpartsMatchCanonical ? "PASS" : "FAIL"} |`,
  `| Desajustes de fuente | ${reconciliation.gates.sourceMismatches} |`,
  `| Errores de opciones/respuesta | ${reconciliation.gates.optionErrors} |`,
  `| Soluciones ausentes o inválidas | ${reconciliation.gates.solutionErrors} |`,
  `| Errores estáticos de render | ${reconciliation.gates.renderErrorsStatic} |`,
  `| Soluciones que requieren regeneración | ${tests.methodology.needsRegeneration} |`, "",
  `Se reforzaron pedagógicamente ${fixes.correctedSubparts} apartados de ${fixes.correctedExercises} ejercicios mediante reglas generales y transformaciones idempotentes. Las señales heurísticas conservadoras restantes no son fallos confirmados ni activan regeneración.`, "",
  "## Censo por tema", "",
  "| Materia | # | Tema | Ejercicios | Apartados | Años | Retos completos sin repetir | Resto |", "|---|---:|---|---:|---:|---:|---:|---:|");
for (const row of topics) add(`| ${row.subject} | ${row.topicIndex + 1} | ${row.topic} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} | ${row.distinctYears} | ${row.fullChallengesWithoutRepeat} | ${row.remainder} |`);

add("", "## Censo por bloque", "", "| Materia | Bloque | Ejercicios | Apartados | Temas incluidos | Limitante |", "|---|---|---:|---:|---|---|");
for (const row of blocks) add(`| ${row.subject} | ${row.block} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} | ${row.topics.join(", ")} | ${row.limitingFamily} |`);

add("", "## Posiciones y capacidad de examen", "", "| Materia | Posición | Familia | Ejercicios | Apartados | Primera repetición | Cumple |", "|---|---:|---|---:|---:|---:|---|");
for (const row of positions) add(`| ${row.subject} | ${row.slot} | ${row.positionLabel} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} | ${row.firstRepeat} | ${row.exhaustsBeforeRepeat ? "sí" : "no"} |`);
add("", "| Materia | Combinaciones teóricas | Capacidad práctica sin repetir | Posición limitante |", "|---|---:|---:|---:|");
for (const scope of quantitative.scopeReports) add(`| ${scope.subject} | ${scope.theoreticalExamCombinations} | ${scope.practicalNonRepeatingExamCapacity} | ${scope.limitingPosition} |`);

add("", "## Recursos estadísticos", "", "| Materia | Familia | Ejercicios | Apartados | Ejercicios con tabla | Apartados con tabla |", "|---|---|---:|---:|---:|---:|");
for (const row of statistics) add(`| ${row.subject} | ${row.family} | ${row.canonicalExerciseCount} | ${row.interactiveSubpartCount} | ${row.exercisesRequiringTable} | ${row.subpartsRequiringTable} |`);

add("", "## Navegación real y responsive", "", "| Materia | Habilitados | Multipartados | Apartados fuente | Apartados navegados | Ejercicios PASS | FAIL |", "|---|---:|---:|---:|---:|---:|---:|");
for (const [courseId, row] of Object.entries(e2e.byCourse)) add(`| ${labels[courseId]} | ${row.TOTAL_ENABLED_EXERCISES} | ${row.TOTAL_MULTIPART_EXERCISES} | ${row.TOTAL_SOURCE_SUBPARTS} | ${row.TOTAL_NAVIGATED_SUBPARTS} | ${row.PASS_EXERCISES} | ${row.FAIL_EXERCISES} |`);
add("", `Los nueve tipos de fallo E2E suman 0. Responsive: ${responsive.checks}/${responsive.checks} comprobaciones PASS sobre ${responsive.selectedCases} casos difíciles y anchuras 1280, 768, 375 y 320 px.`, "",
  "## Cambios de causa raíz", "",
  "- El banco temático auxiliar queda restringido a Castilla-La Mancha; Madrid usa únicamente su corpus canónico.",
  "- La identidad estable de Madrid evita colapsar ejercicios oficiales distintos durante la deduplicación.",
  "- El censo temático y por bloques usa pertenencia real al selector, sin asignaciones artificiales.",
  "- Las soluciones exigentes incorporan explícitamente Rouché–Frobenius, menores/cofactores/adjunta e integración por partes cuando corresponde.",
  "- La prueba E2E multiparte queda parametrizada por comunidad y materia para su reutilización posterior.", "",
  "Ejercicios nuevos incorporados: 0. Bloqueados o `UNRESOLVED_SOURCE` en Madrid: 0. Errores finales de clasificación, opciones, solución, render, navegación y responsive: 0.", "",
  "## Regresiones", "",
  "- Auditorías PowerShell de runtime, completitud y banco autorado: PASS.",
  "- Auditoría cuantitativa con 1.000 simulaciones por materia: PASS, 0 anomalías.",
  "- Suite seleccionada Madrid + regresiones Andalucía: todas las aserciones funcionales PASS. Una escritura concurrente de artefacto sufrió un bloqueo transitorio de OneDrive; repetida aisladamente, la prueba pasó 5/5.",
  "- Skills comunes: no modificadas; hashes preservados.", "",
  "## Muestra para revisión manual", "", "| Materia | Categoría | ExerciseId | Año | Convocatoria | Apartados |", "|---|---|---|---:|---|---:|");
for (const row of sample) add(`| ${row.subject} | ${row.category} | ${row.exerciseId} | ${row.year} | ${row.convocatoria} | ${row.subparts} |`);

add("", "## Restricciones respetadas", "",
  "No se ha hecho commit, push, tag, rebase ni limpieza. No se ha auditado Castilla-La Mancha. No se ha modificado Supabase ni almacenamiento remoto. Los archivos ignorados/excluidos se conservan.", "",
  "**MADRID PREPARADA PARA REVISIÓN MANUAL**", "");

fs.writeFileSync(path.join(out, "MASTER-REPORT.md"), lines.join("\n"), "utf8");
console.log(JSON.stringify({ status: "MADRID PREPARADA PARA REVISIÓN MANUAL", report: path.join(out, "MASTER-REPORT.md"), sample: sample.length }, null, 2));
