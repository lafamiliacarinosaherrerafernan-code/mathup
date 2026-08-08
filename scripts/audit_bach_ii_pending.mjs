import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const year = String(process.argv[2] || "").trim();
const courseFilter = String(process.argv[3] || "").trim();

const context = {
  window: {},
  console,
  setTimeout,
  clearTimeout
};
context.window.window = context.window;
vm.createContext(context);

const scripts = [
  "data/ccss-ii-blocks.js",
  "data/mates-ii-blocks.js",
  "data/ccss-ii-block-answers.js",
  "data/bach-ii-exam-data.js",
  "data/mates-ii-runtime-fixes.js",
  "data/bach-ii-bank-normalization.js",
  "data/bach-ii-variety-expansion.js",
  "data/bach-ii-complete-answer-bank.js",
  "data/bach-ii-complete-answer-bank-2025.js"
];

for (const relative of scripts) {
  const filename = path.join(root, relative);
  if (!fs.existsSync(filename)) continue;
  vm.runInContext(fs.readFileSync(filename, "utf8"), context, { filename });
}

const complete = (payload) => (
  Array.isArray(payload?.options)
  && payload.options.length === 4
  && Number.isInteger(payload.correct)
  && payload.correct >= 0
  && payload.correct < 4
  && String(payload.solution || "").trim()
);

const raw = (paragraphs) => (paragraphs || [])
  .map((paragraph) => String(paragraph?.plain || "").trim())
  .filter(Boolean)
  .join("\n");

const definitions = [
  {
    course: "mates-ii",
    banks: context.window.MATES_II_BLOCK_EXERCISES || {},
    answers: context.window.MATES_II_EXAM_ANSWERS || {}
  },
  {
    course: "ccss-ii",
    banks: context.window.CCSS_II_BLOCK_EXERCISES || {},
    answers: context.window.CCSS_II_BLOCK_ANSWERS || {}
  }
];

const rows = [];
for (const definition of definitions) {
  if (courseFilter && definition.course !== courseFilter) continue;
  for (const [block, exercises] of Object.entries(definition.banks)) {
    for (const exercise of exercises || []) {
  const convocatoria = String(
    exercise.convocatoria || exercise.call || exercise.source || ""
  );
      if (year && !convocatoria.includes(year)) continue;
      const authored = definition.answers[exercise.id]
        || definition.answers[exercise.importedId]
        || {};
      const parts = exercise.parts?.length
        ? exercise.parts
        : [{ label: "Resultado", paragraphs: exercise.statement || [] }];
      for (const part of parts) {
        const payload = authored[part.label] || authored.Resultado;
        if (complete(payload)) continue;
        rows.push({
          course: definition.course,
          block,
          id: exercise.id,
          importedId: exercise.importedId || "",
          convocatoria,
          statement: raw(exercise.statement),
          label: part.label,
          part: raw(part.paragraphs)
        });
      }
    }
  }
}

console.log(JSON.stringify({
  year: year || null,
  course: courseFilter || null,
  count: rows.length,
  rows
}, null, 2));
