import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventoryRoot = path.join(projectRoot, "documentos", "Inventario variedad retos");

const readJson = (name) =>
  JSON.parse(fs.readFileSync(path.join(inventoryRoot, name), "utf8"));

const canonical = readJson("catalogo-canonico.json");
const pending = readJson("pendientes-revision-visual.json");
const active = readJson("cobertura-activa.json");

function normalized(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function rowKey(courseId, theme) {
  return `${courseId}::${normalized(theme)}`;
}

function addCount(map, key, field, amount = 1) {
  const row = map.get(key) || {};
  row[field] = (row[field] || 0) + amount;
  map.set(key, row);
}

const counts = new Map();
canonical.forEach((item) => {
  const key = rowKey(item.courseId, item.theme);
  addCount(counts, key, "originalReady");
  if (item.activeInApp) addCount(counts, key, "originalPlayable");
  else addCount(counts, key, "originalReferenceOnly");
});
pending.forEach((item) => {
  addCount(counts, rowKey(item.courseId, item.theme), "pendingReview");
});

const activeRows = [
  ...active.eso.map((row) => ({ ...row, surface: "Retos ESO" })),
  ...active.firstBach.map((row) => ({ ...row, surface: "Retos 1.º Bachillerato" })),
];

const rows = activeRows.map((runtime) => {
  const source = counts.get(rowKey(runtime.courseId, runtime.theme)) || {};
  return {
    courseId: runtime.courseId,
    course: runtime.course,
    theme: runtime.theme,
    level: runtime.level || "Curso",
    surface: runtime.surface,
    originalReady: source.originalReady || 0,
    originalPlayable: source.originalPlayable || 0,
    originalReferenceOnly: source.originalReferenceOnly || 0,
    pendingReview: source.pendingReview || 0,
    runtimeIdentities: runtime.activeIdentities,
    runtimeStructures: runtime.activeStructures,
    runtimeValid: runtime.invalidQuestions === 0,
    runtimeMeetsVarietyTarget:
      runtime.activeIdentities >= runtime.identityTarget &&
      runtime.activeStructures >= runtime.structureTarget,
  };
});

const topicRows = new Map();
rows.forEach((row) => {
  const key = rowKey(row.courseId, row.theme);
  const current = topicRows.get(key) || {
    courseId: row.courseId,
    course: row.course,
    theme: row.theme,
    originalReady: row.originalReady,
    originalPlayable: row.originalPlayable,
    originalReferenceOnly: row.originalReferenceOnly,
    pendingReview: row.pendingReview,
    minimumRuntimeIdentities: Infinity,
    minimumRuntimeStructures: Infinity,
    runtimeValid: true,
    runtimeMeetsVarietyTarget: true,
  };
  current.minimumRuntimeIdentities = Math.min(
    current.minimumRuntimeIdentities,
    row.runtimeIdentities
  );
  current.minimumRuntimeStructures = Math.min(
    current.minimumRuntimeStructures,
    row.runtimeStructures
  );
  current.runtimeValid &&= row.runtimeValid;
  current.runtimeMeetsVarietyTarget &&= row.runtimeMeetsVarietyTarget;
  topicRows.set(key, current);
});

const topics = [...topicRows.values()].sort((a, b) =>
  `${a.course} ${a.theme}`.localeCompare(`${b.course} ${b.theme}`, "es")
);

const summary = {
  auditedTopics: topics.length,
  originalCanonicalExercises: canonical.length,
  originalPlayableExercises: canonical.filter((item) => item.activeInApp).length,
  originalReferenceOnlyExercises: canonical.filter((item) => !item.activeInApp).length,
  pendingReviewFragments: pending.length,
  topicsMeetingRuntimeVariety: topics.filter((row) => row.runtimeMeetsVarietyTarget).length,
  topicsWithValidRuntimeQuestions: topics.filter((row) => row.runtimeValid).length,
  noRepeatFailures: active.summary.noRepeatFailures,
  adventureFailures: active.summary.adventureFailures,
  examFailures: active.summary.examFailures,
  topicsWithoutPlayableOriginals: topics.filter((row) => row.originalPlayable === 0).length,
};

const payload = {
  generatedAt: new Date().toISOString(),
  definitions: {
    originalPlayable:
      "Enunciado procedente de los documentos del usuario, convertido a pregunta interactiva con respuesta y solución.",
    originalReferenceOnly:
      "Enunciado original extraído y clasificado, pero todavía no publicado como pregunta interactiva validada.",
    pendingReview:
      "Fragmento que necesita reconstrucción visual, unión con su consigna o revisión de notación antes de utilizarse.",
    runtimeIdentities:
      "Preguntas distintas disponibles actualmente en la aplicación, incluidas las variantes generadas y validadas.",
  },
  summary,
  topics,
};

fs.writeFileSync(
  path.join(inventoryRoot, "conexion-fuentes-aplicacion.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
  "utf8"
);

const md = [];
md.push("# Conexión entre fuentes y aplicación");
md.push("");
md.push(`Generado: ${payload.generatedAt}`);
md.push("");
md.push("## Resultado comprobado");
md.push("");
md.push(
  `- Temas auditados de ESO y 1.º de Bachillerato: **${summary.auditedTopics}**.`
);
md.push(
  `- Temas que cumplen el objetivo de variedad activa: **${summary.topicsMeetingRuntimeVariety}/${summary.auditedTopics}**.`
);
md.push(
  `- Fallos de repetición detectados en retos: **${summary.noRepeatFailures}**; en aventura: **${summary.adventureFailures}**; en exámenes: **${summary.examFailures}**.`
);
md.push(
  `- Enunciados originales canónicos extraídos: **${summary.originalCanonicalExercises}**.`
);
md.push(
  `- Enunciados originales ya interactivos y validados: **${summary.originalPlayableExercises}**.`
);
md.push(
  `- Enunciados originales clasificados que aún son solo referencia: **${summary.originalReferenceOnlyExercises}**.`
);
md.push(
  `- Fragmentos pendientes de reconstrucción o revisión: **${summary.pendingReviewFragments}**.`
);
md.push("");
md.push(
  "> La variedad activa y la ausencia de repeticiones están comprobadas. Eso no significa que todos los enunciados extraídos estén ya publicados: los elementos de referencia y los pendientes no se introducen en la aplicación hasta disponer de opciones, solución completa y notación verificadas."
);
md.push("");
md.push("## Cobertura por tema");
md.push("");
md.push(
  "| Curso | Tema | Originales listos | Originales interactivos | Solo referencia | Pendientes | Mín. preguntas activas | Mín. estructuras |"
);
md.push("|---|---|---:|---:|---:|---:|---:|---:|");
topics.forEach((row) => {
  md.push(
    `| ${row.course} | ${row.theme} | ${row.originalReady} | ${row.originalPlayable} | ${row.originalReferenceOnly} | ${row.pendingReview} | ${row.minimumRuntimeIdentities} | ${row.minimumRuntimeStructures} |`
  );
});
md.push("");

fs.writeFileSync(
  path.join(inventoryRoot, "CONEXIÓN FUENTES APLICACIÓN.md"),
  `${md.join("\n")}\n`,
  "utf8"
);

console.log(JSON.stringify(summary, null, 2));
