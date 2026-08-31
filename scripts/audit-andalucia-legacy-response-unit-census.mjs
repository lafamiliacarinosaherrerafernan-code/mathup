import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { additionsLegacy } from '../data/andalucia-pau-additions-legacy.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = process.env.CODEX_GIT_PATH || 'git';
const parseModule = (source) => {
  const context = {};
  vm.runInNewContext(source.replace(/^export const additionsLegacy\s*=/, 'globalThis.additionsLegacy ='), context);
  return context.additionsLegacy;
};
const historicalSource = execFileSync(git, ['show', 'HEAD:data/andalucia-pau-additions-legacy.mjs'], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
const historical = parseModule(historicalSource);
if (!Array.isArray(historical)) throw new Error('No se pudo leer el censo histórico desde HEAD.');

const ids = (records) => records.flatMap((record) => record.parts.map((part) => part.id));
// La expectativa 328 procedía de contar textualmente todas las propiedades
// `id`, incluida una copia encerrada en un comentario de bloque. El módulo
// ejecutado ya exponía 327 unidades. Se conservan ambos censos para que la
// diferencia sea reproducible y no se confunda con un ejercicio perdido.
const historicalIds = [...historicalSource.matchAll(/^\s+"id":\s+"([^"]+)"/gm)].map((match) => match[1]);
const historicalExecutableIds = ids(historical);
const currentIds = ids(additionsLegacy);
const frequencies = historicalIds.reduce((map, id) => map.set(id, (map.get(id) || 0) + 1), new Map());
const duplicatedHistoricalIds = [...frequencies].filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));

const report = {
  schemaVersion: 'mathup.andalucia.legacy-response-unit-census.v1',
  definition: 'Unidades de respuesta (apartados) de los 162 ejercicios procedentes de los 23 documentos heredados de 2008-2009.',
  historical: { totalTextualOccurrences: historicalIds.length, executableOccurrences: historicalExecutableIds.length, uniqueIds: new Set(historicalIds).size, ids: historicalIds },
  current: { totalOccurrences: currentIds.length, uniqueIds: new Set(currentIds).size, ids: currentIds },
  difference: {
    duplicatedHistoricalIds,
    missingFromCurrent: [...new Set(historicalIds)].filter((id) => !currentIds.includes(id)),
    addedInCurrent: [...new Set(currentIds)].filter((id) => !historicalIds.includes(id)),
    cause: 'El total histórico contaba dos veces un mismo ID de apartado; no faltaba ningún ejercicio ni unidad lógica.'
  }
};

const output = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation', 'legacy-response-unit-census-328-vs-327.json');
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output: path.relative(root, output), historicalTextual: report.historical.totalTextualOccurrences, historicalExecutable: report.historical.executableOccurrences, historicalUnique: report.historical.uniqueIds, current: report.current.totalOccurrences, currentUnique: report.current.uniqueIds, duplicatedHistoricalIds }));
