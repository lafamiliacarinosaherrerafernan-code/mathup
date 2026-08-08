import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inventoryRoot = path.join(projectRoot, "documentos", "Inventario variedad retos");
const pendingPath = path.join(inventoryRoot, "pendientes-revision-visual.json");
const pending = JSON.parse(fs.readFileSync(pendingPath, "utf8"));

// Resoluciones verificadas contra el texto extraído y, cuando corresponde,
// contra la disposición visual de la fuente. Mantenerlas por id evita que una
// regeneración del inventario vuelva a dejar estos casos en revisión manual.
const manualOverrides = {
  "1bach-ccss-estadistica-unidimensional-y-bidimensional-23a696332e9a":
    "listo-para-conversion-didactica",
  "1bach-mates-derivadas-4273cde883ff":
    "descartar-fragmento-de-solucion",
  "1bach-mates-trigonometria-401fad40a6ba":
    "reconstruir-con-apoyo-visual",
  "1eso-semejanza-pitagoras-y-areas-d9708aa6154a":
    "reconstruir-con-apoyo-visual",
  "4eso-b-trigonometria-0e97fe2d426a":
    "descartar-titulo-o-texto-no-autonomo"
};

function categoryFor(item) {
  if (manualOverrides[item.id]) return manualOverrides[item.id];
  const reasons = new Set(item.reviewReasons || []);
  const text = String(item.text || "").replace(/\s+/g, " ").trim();
  const looksLikeHeading =
    text.length < 90 &&
    !/[¿?]/.test(text) &&
    !/\b(calcula|resuelve|halla|determina|obt[eé]n|representa|simplifica|demuestra|estudia|razona|explica|averigua|indica)\b/i.test(text);

  if (reasons.has("fragmento-de-solucion")) return "descartar-fragmento-de-solucion";
  if (reasons.has("sin-consigna-autonoma") && looksLikeHeading) {
    return "descartar-titulo-o-texto-no-autonomo";
  }
  if (item.sourceHasVisualElements && reasons.has("enunciado-posiblemente-truncado")) {
    return "reconstruir-con-apoyo-visual";
  }
  if (reasons.has("enunciado-posiblemente-truncado")) return "unir-con-fragmento-contiguo";
  if (reasons.has("sin-consigna-autonoma")) return "revisar-consigna-y-contexto";
  return "revision-manual";
}

const triaged = pending.map((item) => ({ ...item, triageCategory: categoryFor(item) }));
const byCategory = Object.entries(
  triaged.reduce((acc, item) => {
    acc[item.triageCategory] = (acc[item.triageCategory] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b[1] - a[1]);

const byTopic = Object.values(
  triaged.reduce((acc, item) => {
    const key = `${item.courseId}::${item.theme}`;
    acc[key] ||= {
      courseId: item.courseId,
      course: item.course,
      theme: item.theme,
      total: 0,
      categories: {}
    };
    acc[key].total += 1;
    acc[key].categories[item.triageCategory] =
      (acc[key].categories[item.triageCategory] || 0) + 1;
    return acc;
  }, {})
).sort((a, b) => b.total - a.total || `${a.course} ${a.theme}`.localeCompare(`${b.course} ${b.theme}`, "es"));

const payload = {
  generatedAt: new Date().toISOString(),
  total: triaged.length,
  byCategory: Object.fromEntries(byCategory),
  byTopic,
  items: triaged
};

fs.writeFileSync(
  path.join(inventoryRoot, "triaje-pendientes.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
  "utf8"
);

const lines = [
  "# Triaje de fragmentos pendientes",
  "",
  `Generado: ${payload.generatedAt}.`,
  "",
  "Este informe separa ejercicios que requieren reconstrucción de títulos, restos de solución y textos que no constituyen una pregunta autónoma. Ninguno de estos fragmentos se publica automáticamente en la aplicación.",
  "",
  "## Clasificación",
  "",
  ...byCategory.map(([category, count]) => `- ${category}: **${count}**.`),
  "",
  "## Pendientes por tema",
  "",
  "| Curso | Tema | Total | Listos para conversión | Reconstrucción visual | Unión de fragmentos | Revisión de contexto | Descartables |",
  "|---|---|---:|---:|---:|---:|---:|---:|",
  ...byTopic.map((row) => {
    const categories = row.categories;
    const discard =
      (categories["descartar-titulo-o-texto-no-autonomo"] || 0) +
      (categories["descartar-fragmento-de-solucion"] || 0);
    return `| ${row.course} | ${row.theme} | ${row.total} | ${categories["listo-para-conversion-didactica"] || 0} | ${categories["reconstruir-con-apoyo-visual"] || 0} | ${categories["unir-con-fragmento-contiguo"] || 0} | ${(categories["revisar-consigna-y-contexto"] || 0) + (categories["revision-manual"] || 0)} | ${discard} |`;
  }),
  ""
];

fs.writeFileSync(
  path.join(inventoryRoot, "TRIAJE PENDIENTES.md"),
  `${lines.join("\n")}\n`,
  "utf8"
);

console.log(JSON.stringify({ total: payload.total, byCategory: payload.byCategory }, null, 2));
