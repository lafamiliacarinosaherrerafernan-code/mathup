import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const infographicDir = path.join(projectRoot, "Infografías 1º Bachillerato CCSSI");
const backupDir = path.join(infographicDir, "_originales_antes_renumeracion_2026-08-09");

const replacements = [
  {
    file: "10-Derivadas - Infografía.pdf",
    before: "[ (9) ] TJ",
    after: "[(10)] TJ ",
    positionBefore: "1 0 0 1 260.21 773.04 Tm",
    positionAfter: "1 0 0 1 252.17 773.04 Tm",
    fontBefore: "/F1-0 15.96 Tf\n1 0 0 1 252.17 773.04 Tm",
    fontAfter: "/F2+0 15.96 Tf\n1 0 0 1 252.17 773.04 Tm"
  },
  {
    file: "11-Aplicación de derivadas - Infografía.pdf",
    before: "[ (10) ] TJ",
    after: "[ (11) ] TJ"
  },
  {
    file: "12-Combinatoria - Infografía.pdf",
    before: "[ (10) ] TJ",
    after: "[ (12) ] TJ",
    fontBefore: "/F1-0 15.96 Tf\n1 0 0 1 242.81 773.04 Tm",
    fontAfter: "/F2+0 15.96 Tf\n1 0 0 1 242.81 773.04 Tm"
  }
];

function occurrences(haystack, needle) {
  let count = 0;
  let cursor = 0;
  while ((cursor = haystack.indexOf(needle, cursor)) !== -1) {
    count += 1;
    cursor += needle.length;
  }
  return count;
}

export function renumberCcssIInfographics() {
  fs.mkdirSync(backupDir, { recursive: true });
  const report = [];

  for (const replacement of replacements) {
    const filePath = path.join(infographicDir, replacement.file);
    const backupPath = path.join(backupDir, replacement.file);
    const original = fs.readFileSync(filePath);
    const source = original.toString("latin1");

    if (!fs.existsSync(backupPath)) fs.copyFileSync(filePath, backupPath);

    const beforeCount = occurrences(source, replacement.before);
    const afterCount = occurrences(source, replacement.after);
    if (!((beforeCount === 1 && afterCount === 0) || (beforeCount === 0 && afterCount === 1))
        || replacement.before.length !== replacement.after.length) {
      throw new Error(`No se puede corregir de forma segura ${replacement.file}: coincidencias=${beforeCount}`);
    }

    let correctedSource = beforeCount === 1 ? source.replace(replacement.before, replacement.after) : source;
    if (replacement.positionBefore) {
      const oldPositionCount = occurrences(correctedSource, replacement.positionBefore);
      const newPositionCount = occurrences(correctedSource, replacement.positionAfter);
      if (!((oldPositionCount === 1 && newPositionCount === 0) || (oldPositionCount === 0 && newPositionCount === 1))
          || replacement.positionBefore.length !== replacement.positionAfter.length) {
        throw new Error(`No se puede recolocar de forma segura ${replacement.file}: coincidencias=${oldPositionCount}`);
      }
      if (oldPositionCount === 1) correctedSource = correctedSource.replace(replacement.positionBefore, replacement.positionAfter);
    }
    if (replacement.fontBefore) {
      const oldFontCount = occurrences(correctedSource, replacement.fontBefore);
      const newFontCount = occurrences(correctedSource, replacement.fontAfter);
      if (!((oldFontCount === 1 && newFontCount === 0) || (oldFontCount === 0 && newFontCount === 1))
          || replacement.fontBefore.length !== replacement.fontAfter.length) {
        throw new Error(`No se puede cambiar de fuente de forma segura ${replacement.file}: coincidencias=${oldFontCount}`);
      }
      if (oldFontCount === 1) correctedSource = correctedSource.replace(replacement.fontBefore, replacement.fontAfter);
    }

    const corrected = Buffer.from(correctedSource, "latin1");
    if (corrected.length !== original.length) {
      throw new Error(`La longitud de ${replacement.file} cambiaría y rompería su tabla xref.`);
    }

    const temporaryPath = `${filePath}.codex-renumbering`;
    if (!corrected.equals(original)) {
      fs.writeFileSync(temporaryPath, corrected);
      fs.renameSync(temporaryPath, filePath);
      report.push({ file: replacement.file, status: "corrected", bytes: corrected.length });
    } else {
      report.push({ file: replacement.file, status: "already-correct", bytes: corrected.length });
    }
  }

  return { backupDir, report };
}

if (import.meta.url === `file://${fileURLToPath(import.meta.url).replaceAll("\\", "/")}`) {
  console.log(JSON.stringify(renumberCcssIInfographics(), null, 2));
}
