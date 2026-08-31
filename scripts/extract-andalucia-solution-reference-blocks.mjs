import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'tmp', 'andalucia-solution-references');
const output = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'solution-reference-blocks.jsonl');

const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex');
const normalize = (value) => String(value ?? '')
  .normalize('NFD').replace(/\p{Diacritic}/gu, '')
  .replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();

function topicFromName(name) {
  const rules = [
    ['matrices-y-determinantes', 'Matrices y determinantes'],
    ['sistemas-ecuaciones-lineales', 'Sistemas de ecuaciones lineales'],
    ['espacio-afin-y-euclideo', 'Geometría'],
    ['programacion-lineal', 'Programación lineal'],
    ['funciones', 'Funciones'],
    ['integrales', 'Integrales'],
    ['probabilidad', 'Probabilidad'],
    ['teoria-de-muestras', 'Inferencia'],
    ['contraste-de-hipotesis', 'Contraste de hipótesis']
  ];
  return rules.find(([needle]) => name.includes(needle))?.[1] ?? 'Sin clasificar';
}

function cleanPage(value) {
  return value
    .replace(/^\s*\d+\s*$/gm, '')
    .replace(/^\s*www\.emestrada\.org\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const records = [];
for (const fileName of fs.readdirSync(sourceDir).filter((name) => name.endsWith('.txt')).sort()) {
  const filePath = path.join(sourceDir, fileName);
  const subject = fileName.includes('sociales') ? 'Matemáticas Aplicadas a las CCSS II' : 'Matemáticas II';
  const topic = topicFromName(fileName);
  const pages = fs.readFileSync(filePath, 'utf8').replaceAll('\r\n', '\n').split('\f');
  for (let pageIndex = 1; pageIndex < pages.length; pageIndex += 1) {
    const raw = cleanPage(pages[pageIndex]);
    if (!raw) continue;
    const flat = normalize(raw);
    const heading = flat.match(/(?:MATEMATICAS II|SOCIALES II)\.\s*(20(?:08|09))\.?\s*(JUNIO|SEPTIEMBRE|RESERVA\s*\d+)\.?\s*EJERCICIO\s*(\d+)\.?\s*(?:PARTE\s*(I{1,2})\.?\s*)?OPCION\s*([AB])/i);
    if (!heading) continue;
    const headingNeedle = heading[0];
    const rawNorm = normalize(raw);
    const headingOffset = rawNorm.indexOf(headingNeedle);
    if (headingOffset < 0) continue;
    const resolutionMatch = rawNorm.slice(headingOffset + headingNeedle.length).match(/R\s*E\s*S\s*O\s*L\s*U\s*C\s*I\s*O\s*N/i);
    if (!resolutionMatch) continue;
    const resolutionOffset = headingOffset + headingNeedle.length + resolutionMatch.index + resolutionMatch[0].length;
    const statement = rawNorm.slice(0, headingOffset).trim();
    const solution = rawNorm.slice(resolutionOffset).trim();
    if (!statement || !solution) continue;
    const sittingRaw = heading[2].toUpperCase();
    const sitting = sittingRaw === 'JUNIO' ? 'Ordinaria' : sittingRaw === 'SEPTIEMBRE' ? 'Extraordinaria' : 'Reserva';
    const reserveNumber = sittingRaw.startsWith('RESERVA') ? Number(sittingRaw.match(/\d+/)[0]) : null;
    const referencePart = heading[4]?.toUpperCase() ?? null;
    const key = [subject, heading[1], sitting, reserveNumber ?? '', heading[3], referencePart ?? '', heading[5], topic].join('|');
    records.push({
      schemaVersion: 'mathup.andalucia.solution-reference-block.v1',
      referenceId: `andalucia-solution-ref-${sha256(key).slice(0, 32)}`,
      subject,
      year: Number(heading[1]),
      sitting,
      reserveNumber,
      exerciseNumber: Number(heading[3]),
      referencePart,
      option: heading[5].toUpperCase(),
      topic,
      statement,
      solution,
      source: {
        provider: 'Emestrada',
        localPath: path.relative(root, filePath).replaceAll('\\', '/'),
        page: pageIndex + 1,
        fileSha256: sha256(fs.readFileSync(filePath))
      },
      evidenceOnly: true,
      automaticPromotion: false
    });
  }
}

records.sort((a, b) => a.subject.localeCompare(b.subject) || a.year - b.year || a.sitting.localeCompare(b.sitting) || (a.reserveNumber ?? 0) - (b.reserveNumber ?? 0) || a.exerciseNumber - b.exerciseNumber || a.option.localeCompare(b.option) || a.topic.localeCompare(b.topic));
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, records.map((record) => JSON.stringify(record)).join('\n') + '\n', 'utf8');

const identities = new Map();
for (const record of records) {
  const key = [record.subject, record.year, record.sitting, record.reserveNumber ?? '', record.exerciseNumber, record.referencePart ?? '', record.option].join('|');
  if (!identities.has(key)) identities.set(key, []);
  identities.get(key).push(record.topic);
}
const duplicates = [...identities.entries()].filter(([, topics]) => topics.length > 1);
console.log(JSON.stringify({ records: records.length, identities: identities.size, duplicateIdentities: duplicates.length, bySubject: Object.groupBy(records, (r) => r.subject) }, (key, value) => key === 'bySubject' ? Object.fromEntries(Object.entries(value).map(([subject, rows]) => [subject, rows.length])) : value, 2));
