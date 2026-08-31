import fs from "node:fs";
import path from "node:path";

const targets = ["app.js", "data/coach-data.js", "coach-services.js"];

const replacements = new Map([
  ["Â¿", "¿"], ["Â¡", "¡"], ["Âº", "º"], ["Âª", "ª"],
  ["Â·", "·"], ["Â²", "²"], ["Â³", "³"], ["â‚¬", "€"],
  ["âˆš", "√"], ["âˆž", "∞"], ["âˆ©", "∩"], ["âˆª", "∪"],
  ["âˆˆ", "∈"], ["âˆ‰", "∉"], ["â‰¤", "≤"], ["â‰¥", "≥"],
  ["â‰ ", "≠"], ["â‰ˆ", "≈"], ["â‡’", "⇒"], ["â†’", "→"],
  ["Î¼", "μ"], ["Ïƒ", "σ"], ["Î»", "λ"],
  ["Ã", "Á"], ["Ã‰", "É"], ["Ã", "Í"], ["Ã“", "Ó"],
  ["Ãš", "Ú"], ["Ãœ", "Ü"], ["Ã‘", "Ñ"], ["Ã¡", "á"],
  ["Ã©", "é"], ["Ã­", "í"], ["Ã³", "ó"], ["Ãº", "ú"],
  ["Ã¼", "ü"], ["Ã±", "ñ"],
  ["Soluci?n", "Solución"], ["soluci?n", "solución"],
  ["Funci?n", "Función"], ["funci?n", "función"],
  ["Ecuaci?n", "Ecuación"], ["ecuaci?n", "ecuación"],
  ["Cuadr?ticas", "Cuadráticas"], ["cuadr?ticas", "cuadráticas"],
  ["Par?bolas", "Parábolas"], ["par?bolas", "parábolas"]
]);

for (const relativePath of targets) {
  const absolutePath = path.resolve(relativePath);
  let source = fs.readFileSync(absolutePath, "utf8");
  let changes = 0;
  for (const [legacy, corrected] of replacements) {
    const occurrences = source.split(legacy).length - 1;
    if (!occurrences) continue;
    source = source.split(legacy).join(corrected);
    changes += occurrences;
  }
  if (changes) fs.writeFileSync(absolutePath, source, "utf8");
  console.log(`${relativePath}: ${changes} correcciones`);
}
