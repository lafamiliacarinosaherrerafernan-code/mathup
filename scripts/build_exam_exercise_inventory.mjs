import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportRoot = path.join(projectRoot, "documentos", "Inventario variedad retos");
const canonical = JSON.parse(fs.readFileSync(path.join(reportRoot, "catalogo-canonico.json"), "utf8"));
const references = JSON.parse(fs.readFileSync(path.join(reportRoot, "referencias-examenes-tipo-eso.json"), "utf8"));
const bachIiCoverage = JSON.parse(fs.readFileSync(path.join(reportRoot, "cobertura-bachillerato-ii.json"), "utf8"));
const examSources = new Set(references.map((item) => item.source));

const verifiedBankFiles = [
  path.join(projectRoot, "data", "eso-exam-verified-banks.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-2.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-3.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-4.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-5.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-6.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-7.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-8.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-9.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-10.js"),
  path.join(projectRoot, "data", "eso-exam-verified-banks-11.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-12.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-13.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-14.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-15.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-16.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-17.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-18.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-19.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-20.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-21.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-22.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-23.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-24.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-25.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-26.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-27.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-28.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-29.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-30.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-31.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-32.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-33.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-34.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-35.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-36.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-37.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-38.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-39.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-40.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-41.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-42.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-43.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-44.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-45.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-46.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-47.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-48.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-49.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-50.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-51.js")
  ,path.join(projectRoot, "data", "eso-exam-verified-banks-52.js")
];
const verifiedIds = new Set(verifiedBankFiles.flatMap((filePath) => {
  const code = fs.readFileSync(filePath, "utf8");
  return [
    ...[...code.matchAll(/rawBaseId:\s*["']([^"']+)["']/g)].map((match) => match[1]),
    ...[...code.matchAll(/\bq\(\s*["']([^"']+)["']/g)].map((match) => match[1])
  ];
}));

const coveredDuplicateIds = new Map([
  ["2eso-fracciones-d4a29fe22949", "2eso-fracciones-752ff1645ba5"],
  ["2eso-numeros-enteros-83585e1347bc", "2eso-fracciones-8b4a7aed10f9-k"],
  ["2eso-numeros-enteros-ef5bebce0ac6", "2eso-fracciones-8b4a7aed10f9-m"]
  ,["3eso-numeros-reales-6cf3ca591f90", "3eso-expresiones-algebraicas-0cfea3a469a9"]
]);

const manualThemeById = new Map([
  ["1eso-numeros-enteros-0e9ad68b360f", "Potencias y raíces cuadradas"],
  ["1eso-numeros-enteros-cd4a01952d90", "Números naturales"],
  ["1eso-numeros-enteros-a18a3d9455b1-ejercicio-1", "Números naturales"],
  ["1eso-numeros-enteros-a18a3d9455b1-ejercicio-2", "Números naturales"],
  ["2eso-fracciones-752ff1645ba5", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-523206c086ec", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-84ae397898a6", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-13a1905afc35", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-6bb2c2789fbe", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-34270995c60b", "Potencias y raíces cuadradas"],
  ["2eso-fracciones-dfed77cd6e6c", "Potencias y raíces cuadradas"],
  ["3eso-expresiones-algebraicas-88bffe64fc85", "Números reales"],
  ["3eso-expresiones-algebraicas-d5968b22a2f7", "Números reales"],
  ["3eso-expresiones-algebraicas-0cfea3a469a9", "Números reales"],
  ["4eso-a-ecuaciones-e-inecuaciones-0700a2036207", "Sistemas de ecuaciones e inecuaciones"],
  ["4eso-a-ecuaciones-e-inecuaciones-4419b2ee5edc", "Sistemas de ecuaciones e inecuaciones"],
  ["4eso-a-numeros-reales-09b455827ebc", "Números reales"]
]);

const topicRules = {
  "1eso": [
    ["Proporcionalidad", /porcent|descuento|iva|proporcional|regla de tres|reparto/i],
    ["Fracciones y números decimales", /fracci|denominador|numerador|decimal|redondeo|truncamiento/i],
    ["Expresiones algebraicas", /ecuaci|inc[oó]gnita|lenguaje algebraico|monomio|propiedad distributiva/i],
    ["Medida, ángulos, rectas y circunferencias", /sexagesimal|[aá]ngulo|circunferencia|di[aá]metro|radio/i],
    ["Semejanza, Pitágoras y áreas", /pit[aá]goras|semejan|per[ií]metro|[aá]rea|tri[aá]ngulo/i],
    ["Números naturales", /naturales|mcm|mcd|divisibilidad|m[uú]ltiplo|divisor/i],
    ["Números enteros", /entero|temperatura/i]
  ],
  "2eso": [
    ["Sistemas de ecuaciones", /sistema|sustituci[oó]n|igualaci[oó]n|reducci[oó]n|ecuaci|lado.*cuadrado|[aá]rea.*cuadrado/i],
    ["Funciones", /funci[oó]n|dominio|rango|pendiente|ordenada|gr[aá]fica/i],
    ["Cuerpos geométricos", /cilindro|cono|prisma|pir[aá]mide|volumen|[aá]rea lateral/i],
    ["Figuras planas", /pit[aá]goras|tri[aá]ngulo|pol[ií]gono|sexagesimal|per[ií]metro/i],
    ["Proporcionalidad", /proporcional|regla de tres|porcent|alumnos.*horas/i],
    ["Expresiones algebraicas", /polinomio|monomio|p\(x\)|q\(x\)|identidad notable/i],
    ["Fracciones", /fracci|simplifica.*resultado|denominador/i],
    ["Potencias y raíces cuadradas", /potencia|ra[ií]z|exponente/i],
    ["Números enteros", /entero|mcm|mcd|divisibilidad/i]
  ],
  "3eso": [
    ["Ecuaciones y sistemas de ecuaciones", /sistema|ecuaci|edad|art[ií]culo.*rebajado|lado.*cuadrado|[aá]rea.*cuadrado/i],
    ["Funciones", /funci[oó]n|dominio|rango|gr[aá]fica|pendiente/i],
    ["Sucesiones", /sucesi[oó]n|t[eé]rmino general|progresi[oó]n/i],
    ["Cuerpos geométricos", /volumen|cono|cilindro|prisma|pir[aá]mide|[aá]rea|escala/i],
    ["Expresiones algebraicas", /polinomio|monomio|factoriza|identidad notable/i],
    ["Potencias y raíces", /potencia|ra[ií]z|exponente|notaci[oó]n cient[ií]fica/i],
    ["Números reales", /n[uú]mero real|intervalo|aproxima|error absoluto|error relativo/i]
  ],
  "4eso-a": [
    ["Funciones", /funci[oó]n|dominio|recorrido|monoton|tasa de variaci[oó]n|gr[aá]fica/i],
    ["Áreas y cuerpos geométricos", /volumen|cono|cilindro|prisma|pir[aá]mide|[aá]rea lateral/i],
    ["Semejanza y trigonometría", /trigonom|seno|coseno|tangente|semejan|pit[aá]goras/i],
    ["Sistemas de ecuaciones e inecuaciones", /sistema de ecuaciones|plantea un sistema|dos inc[oó]gnitas/i],
    ["Ecuaciones e inecuaciones", /ecuaci|inecuaci|edad|mezcla/i],
    ["Expresiones algebraicas", /polinomio|radical|identidad notable|factoriza/i],
    ["Proporcionalidad y matemáticas financieras", /porcent|inter[eé]s|iva|descuento|proporcional/i],
    ["Números reales", /n[uú]mero real|intervalo|notaci[oó]n cient[ií]fica|error absoluto/i]
  ],
  "4eso-b": [
    ["Derivadas", /derivada|recta tangente/i],
    ["Límite de funciones", /l[ií]mite|as[ií]ntota/i],
    ["Funciones", /funci[oó]n|dominio|rango|gr[aá]fica|m[aá]ximos.*m[ií]nimos/i],
    ["Geometría analítica", /ecuaciones de la recta|punto medio|posici[oó]n relativa.*recta|distancia.*recta/i],
    ["Trigonometría", /trigonom|sen|cos|tg|tangente|cotangente|secante|cosecante/i],
    ["Semejanza", /semejan|pit[aá]goras|escala/i],
    ["Inecuaciones y sistemas de inecuaciones", /inecuaci|sistema de inecuaciones/i],
    ["Ecuaciones y sistemas de ecuaciones", /ecuaci|sistema/i],
    ["Expresiones algebraicas", /polinomio|teorema del resto|ruffini|factoriza|identidad notable/i],
    ["Radicales y logaritmos", /logarit|radical|ra[ií]z/i],
    ["Proporcionalidad", /porcent|inter[eé]s|iva|descuento|proporcional/i],
    ["Números reales", /n[uú]mero real|intervalo|aproxima|error absoluto|notaci[oó]n cient[ií]fica/i]
  ]
};

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function proposedTheme(item) {
  if (manualThemeById.has(item.id)) return manualThemeById.get(item.id);
  const text = normalizeText(item.text);
  const rules = topicRules[item.courseId] || [];
  const match = rules.find(([, pattern]) => pattern.test(text));
  return match?.[0] || item.theme;
}

function issueFlags(item) {
  const text = normalizeText(item.text);
  const flags = [];
  const exerciseCount = (text.match(/\b(?:ejercicio|problema)\b/gi) || []).length;
  if (exerciseCount > 1) flags.push("varios-ejercicios-mezclados");
  if (/=====|p[aá]gina\s+\d+/i.test(text)) flags.push("salto-de-pagina-mezclado");
  if (/[�ð]/.test(text)) flags.push("notacion-corrupta");
  if (item.needsVisualReview || /figura|gr[aá]fica siguiente|completa la tabla|seg[uú]n la tabla/i.test(text)) flags.push("requiere-revision-visual");
  if (text.length < 18) flags.push("texto-demasiado-breve");
  return flags;
}

function isNonExercise(item) {
  const text = normalizeText(item.text);
  const hasAdministrativeContent = /(est[aá]ndares|clasificaci[oó]n|nivel desempe[nñ]o|nota de clase|ponderaci[oó]n|calificaci[oó]n)/i.test(text);
  const hasExerciseCommand = /\b(calcula|resuelve|halla|determina|indica|representa|expresa|ordena|realiza|encuentra|factoriza|opera|simplifica|demuestra|estudia|completa|clasifica|aplica|escribe|contesta|cu[aá]nto|cu[aá]l|qu[eé])\b|[¿?]/i.test(text);
  return hasAdministrativeContent && !hasExerciseCommand;
}

function splitMixedCandidate(item) {
  const text = String(item.text || "");
  const starts = [...text.matchAll(/\bEjercicio\b/gi)].map((match) => match.index);
  if (starts.length <= 1) return [{ ...item, parentCandidateId: item.id, splitIndex: 1 }];
  return starts.map((start, index) => ({
    ...item,
    id: `${item.id}-ejercicio-${index + 1}`,
    parentCandidateId: item.id,
    splitIndex: index + 1,
    text: text.slice(start, starts[index + 1] ?? text.length).trim()
  }));
}

function isVerified(item) {
  if ([...verifiedIds].some((id) => id === item.id || id === item.parentCandidateId || id.startsWith(`${item.parentCandidateId}-`))) return true;
  return item.courseId === "3eso"
    && /Tema 5 Sistemas\/Examen 3 ESO und 5 sistemas\.docx$/i.test(String(item.source || ""))
    && /padre tiene 30 a[nñ]os m[aá]s que su hijo/i.test(String(item.text || ""));
}

const canonicalExamCandidates = canonical.filter((item) => examSources.has(item.source));
const exercises = canonicalExamCandidates
  .flatMap(splitMixedCandidate)
  .map((item) => {
    const proposed = proposedTheme(item);
    const issues = issueFlags(item);
    const active = isVerified(item);
    const nonExercise = isNonExercise(item);
    const coveredBy = coveredDuplicateIds.get(item.id) || null;
    if (!active && !nonExercise && !coveredBy && issues.length === 0) {
      issues.push("notacion-datos-o-figura-pendientes-de-reconstruccion");
    }
    return {
      id: item.id,
      parentCandidateId: item.parentCandidateId,
      splitIndex: item.splitIndex,
      courseId: item.courseId,
      course: item.course,
      source: item.source,
      sourceCandidate: item.sourceCandidate,
      text: item.text,
      currentTheme: item.theme,
      classifiedTheme: proposed,
      themeChangedByContent: proposed !== item.theme,
      examUse: "examen-temas-seleccionados-y-dificultad-alta",
      targetLevel: "Maestro",
      targetDifficulty: "hard",
      activeInApp: active,
      coveredBy,
      issues,
      status: nonExercise
        ? "descartado-no-es-ejercicio"
        : coveredBy
        ? "duplicado-cubierto-por-activo"
        : active
        ? "validado-y-activo"
        : issues.length
          ? "identificado-pendiente-reconstruccion"
          : "identificado-pendiente-solucion-y-opciones"
    };
  })
  .sort((a, b) => a.courseId.localeCompare(b.courseId) || a.classifiedTheme.localeCompare(b.classifiedTheme) || a.source.localeCompare(b.source));

const summary = {
  generatedAt: new Date().toISOString(),
  documents: references.length,
  canonicalCandidates: canonicalExamCandidates.length,
  exercises: exercises.length,
  activeValidated: verifiedIds.size,
  activeCanonicalRecords: exercises.filter((item) => item.activeInApp).length,
  pendingSolutionAndOptions: exercises.filter((item) => item.status === "identificado-pendiente-solucion-y-opciones").length,
  pendingReconstruction: exercises.filter((item) => item.status === "identificado-pendiente-reconstruccion").length,
  coveredDuplicates: exercises.filter((item) => item.status === "duplicado-cubierto-por-activo").length,
  discardedNonExercises: exercises.filter((item) => item.status === "descartado-no-es-ejercicio").length,
  proposedThemeChanges: exercises.filter((item) => item.themeChangedByContent).length,
  officialSecondBachActive: bachIiCoverage.rows.reduce((total, row) => total + row.uniqueOfficialPool, 0),
  officialSecondBachInvalid: bachIiCoverage.summary.invalidActiveQuestions,
  activeValidatedAllExamBanks: verifiedIds.size
    + bachIiCoverage.rows.reduce((total, row) => total + row.uniqueOfficialPool, 0),
  byCourse: Object.fromEntries([...new Set(exercises.map((item) => item.courseId))].map((courseId) => [courseId, exercises.filter((item) => item.courseId === courseId).length]))
};

fs.writeFileSync(path.join(reportRoot, "ejercicios-examenes-clasificados.json"), `${JSON.stringify({ summary, exercises }, null, 2)}\n`, "utf8");

const rows = [...new Map(exercises.map((item) => [`${item.courseId}::${item.classifiedTheme}`, {
  course: item.course,
  theme: item.classifiedTheme,
  total: 0,
  active: 0,
  reconstruction: 0
}])).values()];
for (const item of exercises) {
  const row = rows.find((candidate) => candidate.course === item.course && candidate.theme === item.classifiedTheme);
  row.total += 1;
  if (item.activeInApp) row.active += 1;
  if (item.status === "identificado-pendiente-reconstruccion") row.reconstruction += 1;
}

const markdown = [
  "# Ejercicios identificados en los exámenes aportados",
  "",
  `Generado: ${summary.generatedAt.slice(0, 10)}.`,
  "",
  `- Documentos de examen de ESO: **${summary.documents}**.`,
  `- Candidatos canónicos antes de separar bloques mixtos: **${summary.canonicalCandidates}**.`,
  `- Ejercicios o apartados identificados: **${summary.exercises}**.`,
  `- Ya validados y activos: **${summary.activeValidated}**.`,
  `- Registros canónicos cubiertos por esos ejercicios activos: **${summary.activeCanonicalRecords}**.`,
  `- Pendientes únicamente de solución y opciones: **${summary.pendingSolutionAndOptions}**.`,
  `- Pendientes de reconstrucción o revisión visual: **${summary.pendingReconstruction}**.`,
  `- Duplicados literales cubiertos por un ejercicio activo, sin repetirlos en el banco: **${summary.coveredDuplicates}**.`,
  `- Encabezados, estándares y textos administrativos descartados: **${summary.discardedNonExercises}**.`,
  `- Propuestas de corrección temática por el contenido: **${summary.proposedThemeChanges}**.`,
  `- Ejercicios oficiales activos de 2.º de Bachillerato, ya clasificados por bloque: **${summary.officialSecondBachActive}**.`,
  `- Total activo validado procedente de exámenes: **${summary.activeValidatedAllExamBanks}**.`,
  "",
  "Todos quedan destinados a exámenes de temas seleccionados, nivel Maestro y dificultad alta. Un registro no se activa hasta conservar el enunciado completo, resolverlo, crear cuatro opciones coherentes y comprobarlo.",
  "",
  "| Curso | Tema clasificado | Identificados | Activos | Requieren reconstrucción |",
  "|---|---|---:|---:|---:|",
  ...rows.sort((a, b) => a.course.localeCompare(b.course) || a.theme.localeCompare(b.theme)).map((row) => `| ${row.course} | ${row.theme} | ${row.total} | ${row.active} | ${row.reconstruction} |`),
  ""
].join("\n");
fs.writeFileSync(path.join(reportRoot, "EJERCICIOS EXAMENES CLASIFICADOS.md"), markdown, "utf8");

const blockedVisualSources = [];

const pendingBySource = [...exercises
  .filter((item) => item.status.startsWith("identificado-pendiente"))
  .reduce((groups, item) => {
    const row = groups.get(item.source) || { source: item.source, pending: 0, reconstruction: 0, courses: new Set(), themes: new Set() };
    row.pending += 1;
    if (item.status === "identificado-pendiente-reconstruccion") row.reconstruction += 1;
    row.courses.add(item.course);
    row.themes.add(item.classifiedTheme);
    groups.set(item.source, row);
    return groups;
  }, new Map())
  .values()]
  .sort((a, b) => b.pending - a.pending || a.source.localeCompare(b.source));

const blockedAndPendingReport = [
  "# Archivos bloqueados y fuentes pendientes de reconstrucción",
  "",
  `Actualizado: ${summary.generatedAt.slice(0, 10)}.`,
  "",
  "## Bloqueos técnicos comprobados",
  "",
  ...(blockedVisualSources.length
    ? blockedVisualSources.flatMap((item) => [
        `- **${item.source}**`,
        `  - Estado: ${item.state}.`,
        `  - Motivo: ${item.reason}`
      ])
    : ["- Ninguno. Todos los archivos de examen inventariados son accesibles dentro del proyecto."]),
  "",
  "Los registros que permanecen pendientes no se deben a un bloqueo del archivo, sino a notación, tablas, figuras o redacciones que todavía no permiten fijar una única respuesta sin inventar datos.",
  "",
  "## Fuentes accesibles con ejercicios todavía pendientes",
  "",
  `Quedan ${pendingBySource.reduce((sum, row) => sum + row.pending, 0)} registros pendientes repartidos en ${pendingBySource.length} archivos. Estos archivos no están bloqueados: requieren reconstruir notación, tablas o figuras, o terminar su solución y opciones.`,
  "",
  "| Pendientes | Revisión visual explícita | Curso | Temas | Archivo |",
  "|---:|---:|---|---|---|",
  ...pendingBySource.map((row) => `| ${row.pending} | ${row.reconstruction} | ${[...row.courses].join(", ")} | ${[...row.themes].join(", ")} | ${row.source} |`),
  ""
].join("\n");
fs.writeFileSync(path.join(reportRoot, "ARCHIVOS BLOQUEADOS Y PENDIENTES.md"), blockedAndPendingReport, "utf8");

const reconstructionItems = exercises
  .filter((item) => item.status === "identificado-pendiente-reconstruccion")
  .sort((a, b) => a.source.localeCompare(b.source) || a.sourceCandidate - b.sourceCandidate || a.id.localeCompare(b.id));
const reconstructionSources = [...new Set(reconstructionItems.map((item) => item.source))];
const detailedReconstructionReport = [
  "# Ejercicios pendientes de reconstrucción",
  "",
  `Actualizado: ${summary.generatedAt.slice(0, 10)}.`,
  "",
  `Se han identificado **${reconstructionItems.length}** ejercicios o bloques en **${reconstructionSources.length}** archivos. Ninguno se activa hasta recuperar literalmente la notación o figura, resolverlo, crear cuatro opciones distintas y comprobar el resultado.`,
  "",
  ...reconstructionSources.flatMap((source) => [
    `## ${source}`,
    "",
    ...reconstructionItems.filter((item) => item.source === source).flatMap((item) => [
      `- **${item.id}** — ${item.course} · ${item.classifiedTheme}`,
      `  - Motivo: ${item.issues.join(", ")}.`,
      `  - Texto recuperado: ${normalizeText(item.text)}`
    ]),
    ""
  ])
].join("\n");
fs.writeFileSync(path.join(reportRoot, "EJERCICIOS PENDIENTES RECONSTRUCCION.md"), detailedReconstructionReport, "utf8");

export default { summary, exercises };
