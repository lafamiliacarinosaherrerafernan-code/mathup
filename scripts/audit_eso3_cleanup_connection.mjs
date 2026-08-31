import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
globalThis.window = globalThis;

const load = async (relative, token) => import(`${pathToFileURL(path.join(root, relative)).href}?audit=${token}`);
const titles = [
  "Números reales", "Potencias y raíces", "Expresiones algebraicas",
  "Ecuaciones y sistemas de ecuaciones", "Proporcionalidad", "Sucesiones",
  "Cuerpos geométricos", "Funciones", "Estadística", "Probabilidad"
];

globalThis.MargaritaEsoExamVerified = undefined;
const dataFiles = await fs.readdir(path.join(root, "data"));
const verifiedFiles = dataFiles
  .filter((name) => /^eso-exam-verified-banks(?:-\d+)?\.js$/.test(name))
  .sort((left, right) => Number(left.match(/-(\d+)\.js$/)?.[1] || 0) - Number(right.match(/-(\d+)\.js$/)?.[1] || 0));
for (const [index, name] of verifiedFiles.entries()) await load(`data/${name}`, `verified-${index}`);
await load("data/eso3-exam-metadata-normalization.js", "metadata");

globalThis.MargaritaEsoOriginalPractice = undefined;
await load("data/eso3-original-practice-banks.js", "originals");

const originalByTopic = titles.map((title) => globalThis.MargaritaEsoOriginalPractice.all("3eso", title));
const verifiedByTopic = titles.map((title) => globalThis.MargaritaEsoExamVerified.build("3eso", title));
const originals = originalByTopic.flat();
const verified = verifiedByTopic.flat();
const appSource = await fs.readFile(path.join(root, "app.js"), "utf8");
const indexSource = await fs.readFile(path.join(root, "index.html"), "utf8");
const modelFunction = appSource.match(/function threeEsoModelBank\(lower\) \{[\s\S]*?\n\}/)?.[0] || "";

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const expectedOriginalCounts = [4, 4, 4, 4, 29, 4, 23, 24, 25, 8];
assert(originals.length === 129, `Se esperaban 129 originales y se obtuvieron ${originals.length}.`);
assert(originalByTopic.every((items, index) => items.length === expectedOriginalCounts[index]), `Recuento inesperado por tema: ${originalByTopic.map((items) => items.length).join(", ")}.`);
assert(originalByTopic.every((items) => items.length > 0), "Hay algún tema sin originales conectados.");
assert(originals.every((item) => item.courseId === "3eso"), "Existe un original con courseId distinto de 3eso.");
assert(originals.every((item) => item.practiceEligible === true && item.examEligible === false), "Hay un original sin separación práctica/examen.");
assert(originals.every((item) => item.options?.length === 4 && new Set(item.options).size === 4), "Hay opciones incompletas o duplicadas.");
assert(originals.every((item) => item.correct === 0 && /Resultado final:/i.test(item.solution || "")), "Hay soluciones sin resultado final o índice correcto incoherente.");
assert([...originals, ...verified].every((item) => !/4.?\s*ESO|fourEso/i.test(`${item.source || ""} ${item.sourceDocument || ""}`)), "Se detectó procedencia de 4.º ESO.");
assert(verified.every((item) => item.courseId === "3eso" && item.topicId?.startsWith("3eso:") && Number.isInteger(item.topicIndex)), "La metadata de exámenes no está normalizada.");
assert(!/fourEso|4eso/i.test(modelFunction), "threeEsoModelBank todavía referencia 4.º ESO.");

assert(originals.every((item) => !/(soluci|resuelt)/i.test(item.sourceDocument || "")), "Hay un ejercicio procedente de un documento de soluciones.");
assert(appSource.includes("MargaritaEsoOriginalPractice?.build"), "app.js no usa el constructor del banco original de ESO.");
assert(indexSource.includes("data/eso3-original-practice-banks.js"), "index.html no carga el banco original de 3 ESO.");

const expandedTopics = [originalByTopic[4], originalByTopic[7], originalByTopic[8]].flat();
const visualExercises = expandedTopics.filter((item) => item.requiresVisual);
const tableExercises = expandedTopics.filter((item) => /<table\b/i.test(item.statementHtml || ""));
assert(visualExercises.length === 15, `Se esperaban 15 ejercicios visuales en los temas ampliados y se obtuvieron ${visualExercises.length}.`);
assert(tableExercises.length === 14, `Se esperaban 14 ejercicios con tablas fieles y se obtuvieron ${tableExercises.length}.`);
assert(!originalByTopic[4].some((item) => /inter[eé]s|capital\s+final|rédito/i.test(`${item.text || ""} ${item.subtopic || ""}`)), "Se ha introducido interés en el Tema 5.");
assert(new Set(originalByTopic[4].map((item) => item.structureId)).size === 29, "Proporcionalidad contiene estructuras duplicadas.");
assert(new Set(originalByTopic[7].map((item) => item.structureId)).size === 24, "Funciones contiene estructuras duplicadas.");
assert(new Set(originalByTopic[8].map((item) => item.structureId)).size === 25, "Estadística contiene estructuras duplicadas.");

const compoundExercises = originalByTopic[4].filter((item) => item.tags?.includes("proporcionalidad-compuesta"));
const allDirectCompound = compoundExercises.filter((item) => item.tags?.includes("todas-directas"));
const mixedCompound = compoundExercises.filter((item) => item.tags?.includes("mixta-directa-inversa"));
assert(compoundExercises.length === 8, `Se esperaban 8 ejercicios de proporcionalidad compuesta y se obtuvieron ${compoundExercises.length}.`);
assert(allDirectCompound.length === 4, `Se esperaban 4 ejercicios compuestos con relaciones directas y se obtuvieron ${allDirectCompound.length}.`);
assert(mixedCompound.length === 4, `Se esperaban 4 ejercicios compuestos mixtos y se obtuvieron ${mixedCompound.length}.`);

assert(
  originalByTopic[4].some((item) =>
    item.rawBaseId === "3eso-original-prop-painters" &&
    /cuatro pintores/i.test(item.text || "") &&
    item.options?.includes("7,5 casas")
  ),
  "El problema de los pintores no conserva fielmente cuatro pintores y 7,5 casas."
);

const requiredAssets = [
  "funciones-es-funcion.png",
  "funciones-dominio-recorrido.png",
  "funciones-facturacion-anual.png",
  "funciones-coches-distancia-tiempo.png",
  "funciones-recta-decreciente.png",
  "funciones-recta-horizontal.png",
  "funciones-parabola.png",
  "estadistica-comida-preferida.png",
  "cuerpos-giro-semicirculo.png",
  "cuerpos-cubo-4-5.png",
  "cuerpos-prisma-pentagonal.png",
  "cuerpos-piramide-cuadrada-altura-7-9.png",
  "cuerpos-prisma-hexagonal.png",
  "cuerpos-piramide-pentagonal.png",
  "cuerpos-esfera-radio-9.png",
  "cuerpos-cono-diametro-14-altura-15.png",
  "cuerpos-cilindro-diametro-8-altura-16-5.png",
  "cuerpos-cilindro-semiesfera.png",
  "cuerpos-prisma-piramide-hexagonal.png",
  "cuerpos-casa-compuesta.png",
  "cuerpos-pulsera-hueca.png",
  "cuerpos-deposito-cilindro-semiesfera.png"
];
for (const asset of requiredAssets) {
  const assetPath = path.join(root, "assets", "exercises", "3eso", "originals", asset);
  assert(await fs.stat(assetPath).then((stat) => stat.size > 0).catch(() => false), `Falta el recurso visual ${asset}.`);
}

const proportionalityCoverage = new Set(originalByTopic[4].map((item) => item.exerciseType));
for (const requiredType of ["directa-inversa-no", "completar-tabla-directa", "completar-tabla-inversa", "reparto-directo", "reparto-inverso", "porcentaje-de-cantidad", "hallar-total-desde-porcentaje", "aumento-y-descuento", "produccion-dias-horas", "identificar-relaciones-compuestas", "superficie-horas-trabajadores"]) {
  assert(proportionalityCoverage.has(requiredType), `No aparece realmente el tipo de Proporcionalidad ${requiredType}.`);
}
const functionCoverage = new Set(originalByTopic[7].map((item) => item.exerciseType));
for (const requiredType of ["tabla-de-valores", "completar-tabla-y-obtener-funcion", "identificar-graficas-funcion", "leer-dominio-recorrido-discontinuidad", "maximo-contextual", "intervalos-decrecimiento-contextuales", "ecuaciones-y-pendiente-desde-grafica", "recta-desde-grafica", "ecuacion-de-parabola-desde-grafica", "representar-parabola-desde-expresion", "simetria-y-cortes-algebraicos", "tomar-decision-desde-grafica"]) {
  assert(functionCoverage.has(requiredType), `No aparece realmente el tipo de Funciones ${requiredType}.`);
}
const statisticsCoverage = new Set(originalByTopic[8].map((item) => item.exerciseType));
for (const requiredType of ["media-mediana-moda-desde-tabla", "angulo-sector-desde-frecuencia", "media-ponderada", "total-desde-diagrama-de-barras", "porcentaje-de-categoria-desde-barras", "varianza-y-desviacion-tipica", "frecuencias-relativas-y-acumuladas", "construir-tabla-desde-datos", "calcular-tercer-cuartil", "comparar-media-y-mediana", "construir-tabla-desde-grafico"]) {
  assert(statisticsCoverage.has(requiredType), `No aparece realmente el tipo de Estadística ${requiredType}.`);
}
for (const topicIndex of [4, 7, 8]) {
  const title = titles[topicIndex];
  const expectedApprentice = originalByTopic[topicIndex].filter((item) => item.challengeLevel === "apprentice").length;
  const expectedMaster = originalByTopic[topicIndex].filter((item) => item.challengeLevel === "master").length;
  assert(globalThis.MargaritaEsoOriginalPractice.build("3eso", title, "apprentice").length === expectedApprentice, `${title}: selección Aprendiz incompleta.`);
  assert(globalThis.MargaritaEsoOriginalPractice.build("3eso", title, "master").length === expectedMaster, `${title}: selección Maestro incompleta.`);
}

const statisticsStructures = new Set(originalByTopic[8].map((item) => item.structureId));
const probabilityStructures = new Set(originalByTopic[9].map((item) => item.structureId));
assert(statisticsStructures.size >= 8, "Estadística no alcanza 8 estructuras originales distintas.");
assert(probabilityStructures.size >= 8, "Probabilidad no alcanza 8 estructuras originales distintas.");
const geometryOriginals = originalByTopic[6];
const geometryVerified = verifiedByTopic[6];
const activeGeometryVerified = geometryVerified.filter((item) => item.practiceEligible !== false);
const excludedPlaneVerified = geometryVerified.filter((item) => item.practiceEligible === false);
const quarantinedGeometry = globalThis.MargaritaEsoOriginalPractice.quarantined?.("3eso", "Cuerpos geométricos") || [];
const newGeometryIds = [
  "geo-revolution-semicircle", "geo-cube-volume-lateral", "geo-pentagonal-prism",
  "geo-square-pyramid-height-area", "geo-hexagonal-prism", "geo-pentagonal-pyramid",
  "geo-sphere-radius", "geo-cone-diameter-height", "geo-cylinder-direct",
  "geo-cylinder-hemisphere", "geo-prism-pyramid-compound", "geo-house-prism",
  "geo-gold-bracelet", "geo-capsule-compound", "geo-reservoir-height",
  "geo-half-full-pipe", "geo-cylinder-diameter-from-volume", "geo-pentagonal-pyramid-height"
].map((id) => `3eso-original-${id}`);
assert(geometryOriginals.length === 23, `Cuerpos geométricos: se esperaban 23 originales activos y hay ${geometryOriginals.length}.`);
assert(newGeometryIds.every((id) => geometryOriginals.some((item) => item.rawBaseId === id)), "No están conectadas las 18 estructuras nuevas de Cuerpos geométricos.");
assert(new Set(geometryOriginals.map((item) => item.structureId)).size === geometryOriginals.length, "Cuerpos geométricos contiene identificadores estructurales duplicados.");
assert(geometryOriginals.filter((item) => item.requiresVisual).length === 14, "Cuerpos geométricos debe conservar 14 ejercicios nuevos con figura original.");
assert(activeGeometryVerified.length === 5, `Deben quedar 5 ejercicios verificados tridimensionales en práctica y hay ${activeGeometryVerified.length}.`);
assert(excludedPlaneVerified.length === 6, `Deben excluirse 6 ejercicios verificados de geometría plana y se excluyen ${excludedPlaneVerified.length}.`);
assert(quarantinedGeometry.length === 1 && quarantinedGeometry[0].rawBaseId === "3eso-original-geo-grass-ring", "La corona circular plana no se conserva correctamente en cuarentena.");
assert(!geometryOriginals.some((item) => item.rawBaseId === "3eso-original-geo-grass-ring"), "La corona circular continúa activa en Cuerpos geométricos.");
assert(geometryOriginals.every((item) => item.practiceEligible === true && item.examEligible === false), "Los originales de Cuerpos geométricos no están aislados de examen.");
assert(/geometryDomain/.test(appSource) && /isThirdEsoSolidsPractice/.test(appSource), "La práctica de Cuerpos geométricos no filtra las plantillas planas generadas.");
assert(/generatedThirdEsoGeometryQuestion/.test(appSource) && /stage === 0/.test(appSource) && /stage === 4/.test(appSource), "No se encuentra la progresión propia del Tema 7.");
assert(/I=C₀·R·T\/\(n·100\)/.test(appSource) && /n=12/.test(appSource), "No se encuentra la convención de interés simple del Tema 6.");
assert(/C_F=C₀\(1\+R\/\(100n\)\)\^\(nt\)/.test(appSource), "No se encuentra la fórmula de interés compuesto del Tema 6.");

const report = {
  ok: failures.length === 0,
  verifiedFiles: verifiedFiles.length,
  originalCount: originals.length,
  verifiedCount: verified.length,
  curatedTotal: originals.length + verified.length,
  expandedTopics: {
    proportionality: {
      exercises: originalByTopic[4].length,
      structures: new Set(originalByTopic[4].map((item) => item.structureId)).size,
      tables: originalByTopic[4].filter((item) => /<table\b/i.test(item.statementHtml || "")).length,
      compound: compoundExercises.length,
      compoundAllDirect: allDirectCompound.length,
      compoundMixed: mixedCompound.length,
      compoundAllInverse: compoundExercises.filter((item) => item.tags?.includes("todas-inversas")).length
    },
    functions: { exercises: originalByTopic[7].length, structures: new Set(originalByTopic[7].map((item) => item.structureId)).size, visuals: originalByTopic[7].filter((item) => item.requiresVisual).length, tables: originalByTopic[7].filter((item) => /<table\b/i.test(item.statementHtml || "")).length },
    statistics: { exercises: originalByTopic[8].length, structures: new Set(originalByTopic[8].map((item) => item.structureId)).size, visuals: originalByTopic[8].filter((item) => item.requiresVisual).length, tables: originalByTopic[8].filter((item) => /<table\b/i.test(item.statementHtml || "")).length }
    ,geometry: {
      activeOriginals: geometryOriginals.length,
      newStructures: newGeometryIds.length,
      structures: new Set(geometryOriginals.map((item) => item.structureId)).size,
      visuals: geometryOriginals.filter((item) => item.requiresVisual).length,
      verifiedActiveForPractice: activeGeometryVerified.length,
      verifiedPlaneExcludedFromPractice: excludedPlaneVerified.length,
      quarantinedPlaneOriginals: quarantinedGeometry.length
    }
  },
  perTopic: titles.map((title, index) => ({
    topic: index + 1,
    title,
    before: verifiedByTopic[index].length,
    connected: originalByTopic[index].length,
    total: verifiedByTopic[index].length + originalByTopic[index].length,
    originalStructures: new Set(originalByTopic[index].map((item) => item.structureId)).size,
    apprentice: originalByTopic[index].filter((item) => item.challengeLevel === "apprentice").length,
    master: originalByTopic[index].filter((item) => item.challengeLevel === "master").length
  })),
  failures
};

assert(report.perTopic[4].total === 31, `Tema 5: esperado 31, obtenido ${report.perTopic[4].total}.`);
assert(report.perTopic[7].total === 35, `Tema 8: esperado 35, obtenido ${report.perTopic[7].total}.`);
assert(report.perTopic[8].total === 25, `Tema 9: esperado 25, obtenido ${report.perTopic[8].total}.`);
report.ok = failures.length === 0;

console.log(JSON.stringify(report, null, 2));
if (failures.length) throw new Error(`Auditoría 3.º ESO fallida: ${failures.join(" | ")}`);

export default report;
