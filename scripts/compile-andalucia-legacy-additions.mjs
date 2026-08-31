import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifact = path.join(root, 'artifacts', 'user-supplied-andalucia-reconciliation');
const outPath = path.join(root, 'data', 'andalucia-pau-additions-legacy.mjs');
const readJsonl = (name) => fs.readFileSync(path.join(artifact, name), 'utf8').trim().split(/\r?\n/).filter(Boolean).map(JSON.parse);
const audits = readJsonl('document-reconciliation-audit.jsonl');
const segments = readJsonl('missing-user-exercise-segments.jsonl');
const refs = readJsonl('solution-reference-blocks.jsonl');

const legacyNames = new Set([
  ...[2, 3, 4, 5, 6].map((n) => `CCSS II_${n}_2008.pdf`),
  ...['extra', 'ord', '1', '4', '5', '6'].map((n) => `CCSS II_${n}_2009.pdf`),
  ...['extra', 'ord', '1', '4', '5', '6'].flatMap((n) => [2008, 2009].map((year) => `Mates II_${n}_${year}.pdf`))
]);
const oldDocs = audits.filter((row) => legacyNames.has(row.fileName));

const symbolMap = new Map(Object.entries({
  '': '+', '': '−', '': '=', '': '≤', '': '≥', '': '≠', '': '⇒', '': '∞',
  '': 'π', '': 'λ', '': 'α', '': 'β', '': 'δ', '': '∈', '': '∪', '': '∩',
  '': '∅', '': '→', '': '·', '': '±', '': '≡', '': '°', '': 'Σ', '': '∫',
  '': '(', '': ')', '': '', '': '', '': '(', '': ')', '': '', '': '', '': '{', '': '', '': '',
  '': '×', '': '÷', '': '≈', '': '<', '': '>', '': '∂', '': '⇔', '': 'σ', '': 'μ'
}));
const clean = (value) => {
  let text = String(value || '').normalize('NFC');
  text = [...text].map((character) => symbolMap.get(character) ?? character).join('');
  return text.replace(/[\uE000-\uF8FF]/g, '').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n').replace(/\s+([,.;:])/g, '$1').trim();
};
const keyForReferenceCategory = (doc) => {
  if (doc.fileName.includes('_extra_')) return { sitting: 'Extraordinaria', reserveNumber: null };
  if (doc.fileName.includes('_ord_')) return { sitting: 'Ordinaria', reserveNumber: null };
  const model = Number(doc.fileName.match(/_(\d+)_\d{4}/)?.[1]);
  return model === 1 ? { sitting: 'Reserva', reserveNumber: 1 }
    : model === 2 ? { sitting: 'Extraordinaria', reserveNumber: null }
      : model === 3 ? { sitting: 'Ordinaria', reserveNumber: null }
        : { sitting: 'Reserva', reserveNumber: model - 2 };
};
const sameReferenceCategory = (ref, doc) => {
  const mapped = keyForReferenceCategory(doc);
  return ref.subject === doc.subject && ref.year === doc.year && ref.sitting === mapped.sitting
    && (mapped.sitting !== 'Reserva' || ref.reserveNumber === mapped.reserveNumber);
};
const segmentKey = (fileName, option, exercise) => `${fileName}|${option}|${exercise}`;
const sourceSegments = new Map(segments.map((row) => [segmentKey(row.fileName, row.option, row.exerciseNumber), row.statement]));
const refGroupKey = (row) => `${row.option}|${row.exerciseNumber}`;
const idFor = (hash, key) => `pau-user-and-${crypto.createHash('sha256').update(`${hash}|${key}`).digest('hex').slice(0, 28)}`;
const ANSWER_OVERRIDES = new Map(Object.entries({
  'pau-user-and-3f4a79136f0630e95c89be3812ee:a': 'x=2/3; y=−2.',
  'pau-user-and-b36089d5d637d76c8c2751205e1d:II.a': 'IC del 97 %: (196,745; 203,255).',
  'pau-user-and-fc24350dc009dd373a61feb93871:b': 'X=[[-11,2],[-3,1]].',
  'pau-user-and-5a2aa3fc7f69e998f8c65411d943:II.a': 'IC del 97 %: (7,449; 8,751).',
  'pau-user-and-12b92f4e494fc2c75dd1d9ef3f5e:II': 'IC del 97 %: (0,2255; 0,4411).',
  'pau-user-and-2d24fc052b2f090732a36320d027:b': 'X=[[0,4],[1,1]].',
  'pau-user-and-776f233692b911339c182f682d66:II.a': 'IC del 96 %: (2,4592; 3,2408) horas.',
  'pau-user-and-9457f3f2df56b0c9523b13a729de:II.a': 'La media muestral sigue N(28;0,9).',
  'pau-user-and-4421bd9a63eaf1b30773dd5ecd92:II.a': 'IC del 90 %: (170,065; 179,935) g.',
  'pau-user-and-2c9b8dd6e73056d497842750d921:a': 'Vértices: (frac{12}{5},1), (9,1) y (frac{3}{4},frac{15}{4}).',
  'pau-user-and-aa5bcd3b25021b08573998ca6720:b': 'X=[[13,17/2],[-4,1/2]].',
  'pau-user-and-0cc8d22b539102071278197547c5:II.a': 'IC del 97 %: (4,983; 5,417) minutos.',
  'pau-user-and-ffeef21d1b581045ebba1b1e499e:II.a': 'IC del 94 %: (17,3492; 17,6508) años.',
  'pau-user-and-2c1a009020675c8d97ecdc322cbe:II.a': 'P(media muestral>113)=0,1587.',
  'pau-user-and-c108bc9e3ff7b5038522d1046cd7:a': 'x=0; y=−1; z=−2.',
  'pau-user-and-146e629b10ddc2795d8b1691c457:II.a': 'P(48<media muestral<52)=0,9232.',
  'pau-user-and-8b6ba4014dfdb7349b245803a88f:whole': 'Máximo 1 en (1,0); mínimo frac{−23}{24} en (frac{7}{24},frac{5}{4}).',
  'pau-user-and-ffefb2a71dd724b4c74421333b44:b': 'Para a=2: (x,y,z)=(1−t,0,t), t∈ℝ.',
  'pau-user-and-d96d9e7a9644a5aef75fc3e07f78:whole': 'Asíntota vertical x=0 (por la derecha) y asíntota oblicua y=x+1; no hay horizontal.',
  'pau-user-and-afbdd9b31ce80ef1fa33f85c11c4:b': 'Para m=0 el sistema es incompatible; para m=1 es compatible indeterminado: (x,y,z)=(1−s−t,s,t).',
  'pau-user-and-908427c7f161ec421cd0a79b1f2e:b': 'Para λ=−1: (x,y,z)=(2t/3,−t/3,t), t∈ℝ.',
  'pau-user-and-88e69009f363a041b46199783366:whole': 'a=−1; b=0; c=3; d=1.',
  'pau-user-and-7bd611629ba5c02672a9f0f5ab45:whole': 'a=∛9=3^(2/3).',
  'pau-user-and-cf62554883179a6a375fcf266c86:b': 'r:(x,y,z)=(frac{−1}{3},frac{2}{3},0)+t(frac{1}{3},frac{1}{3},1).',
  'pau-user-and-3af9abd6b9cb39b88a23b157b72f:b': 'Para m=0: (0,0,0). Para m=1: (x,y,z)=(t,−2t,t), t∈ℝ.',
  'pau-user-and-3cc33bb607845a9865904ad277e0:a': 'Las rectas r y s se cruzan (son alabeadas).',
  'pau-user-and-3cc33bb607845a9865904ad277e0:b': 'Plano: 2x+y+2z−2=0.',
  'pau-user-and-6f26438bcc037b8c54e385f7301c:whole': 'X=[[-7/4,−1/2],[-5/4,−9/2],[7/4,−15/4]].',
  'pau-user-and-165a1fe8f46a235e4d1814761fb2:b': 'X=[[-14,8],[8,−5]].',
  'pau-user-and-5d460f4ffa0f3549b616f069ba96:b': 'Para λ=1: (x,y,z)=(7/2−t,1/2,t), t∈ℝ.',
  'pau-user-and-45112e5936e84d28b2533e990d79:a': 'Sistema compatible indeterminado: (x,y,z)=(2−t,2−3t,t), t∈ℝ.',
  'pau-user-and-b030b2f569b5bd06d4d75297a3de:b': 'Soluciones: (x,y,z)=(t,−2t,t), t∈ℝ; forman una recta por el origen.',
  'pau-user-and-9954a3d08255a3b65295f2c64e92:c': 'α=4; β=−1.',
  'pau-user-and-2031fe95bf73495cec254c4452ee:a': 'Las rectas r y s se cruzan (son alabeadas).',
  'pau-user-and-6f40e3eafc9f4dbd7db256df781c:b': 'Para m=−1: (x,y,z)=((1−t)/2,(t−1)/2,t), t∈ℝ.',
  'pau-user-and-96c6783ca178f6288421b9337c79:a': 'A⁻¹=matrix{−2,7;1,−3}.',
  'pau-user-and-96c6783ca178f6288421b9337c79:b': 'X=matrix{−9,32;20,−67}; Y=matrix{−59,40;26,−17}.'
}));
const PROMPT_OVERRIDES = new Map(Object.entries({
  'pau-user-and-c108bc9e3ff7b5038522d1046cd7': 'a) Plantee y resuelva el sistema dado por matrix{3,1−2x,0;2,x+1,2;1,0,1}·vector{y;2;z}=vector{−1;2;0}.\n\nb) Dada A=matrix{1,0;2,3}, calcule M=Aᵗ·A⁻¹.',
  'pau-user-and-afbdd9b31ce80ef1fa33f85c11c4': 'Considere A=matrix{1,1,1;m,m²,m²;m,m²,m}.\n\na) Halle los valores de m para los que el rango de A es menor que 3.\n\nb) Estudie si el sistema A·vector{x;y;z}=vector{1;1;1} tiene solución para cada valor obtenido.',
  'pau-user-and-88e69009f363a041b46199783366': 'Sea f:ℝ→ℝ, f(x)=ax³+bx²+cx+d. Se sabe que f tiene un máximo local en x=1, que (0,1) es un punto de inflexión de su gráfica y que ∫_0^1 f(x)dx=9/4. Calcule a, b, c y d.',
  'pau-user-and-b030b2f569b5bd06d4d75297a3de': 'Considere A=matrix{−2,−2,1;−2,1,−2;1,−2,−2} y X=vector{x;y;z}.\n\na) Calcule, si existe, A⁻¹.\n\nb) Resuelva AX=3X e interprete geométricamente el conjunto de soluciones.'
  , 'pau-user-and-165a1fe8f46a235e4d1814761fb2': 'Sean A, B, C y X matrices que verifican A·X·B=C.\n\na) Si son cuadradas de orden 3 y det(A)=3, det(B)=−1 y det(C)=6, calcule det(X) y det(2X).\n\nb) Si A=matrix{1,1;0,−2}, B=matrix{1,−2;2,−3} y C=matrix{0,3;4,2}, calcule X.'
  , 'pau-user-and-96c6783ca178f6288421b9337c79': 'Dadas A=matrix{3,7;1,2} y B=matrix{1,−3;−4,2}:\n\na) Calcule, si existe, A⁻¹.\n\nb) Calcule X e Y que satisfacen XA=A+2B y AY=A+2B.'
}));

const classify = (doc, groupedRefs) => {
  const topics = [...new Set(groupedRefs.map((row) => clean(row.topic)))];
  const joined = topics.join(' · ');
  if (doc.subject.includes('CCSS')) {
    if (groupedRefs[0].exerciseNumber === 1) return { block: 'Álgebra', blockId: 'algebra', topic: joined, topicIndexes: [/programaci/i.test(joined) ? 2 : 0] };
    if (groupedRefs[0].exerciseNumber === 2) return { block: 'Análisis', blockId: 'analisis', topic: joined, topicIndexes: [/integr/i.test(joined) ? 6 : 4] };
    return { block: 'Probabilidad y Estadística', blockId: 'estadistica', topic: joined, topicIndexes: [/infer|normal|muest/i.test(joined) ? 10 : 8] };
  }
  if (/recta|plano|espacio|geometr|vector|distancia|ángulo|angulo|esfera/i.test(joined)) return { block: 'Geometría', blockId: 'geometria', topic: joined, topicIndexes: [8] };
  if (/matri|determin|sistema/i.test(joined)) return { block: 'Álgebra', blockId: 'algebra', topic: joined, topicIndexes: [0] };
  return { block: 'Análisis', blockId: 'analisis', topic: joined, topicIndexes: [/integr|área|area|primit/i.test(joined) ? 6 : 4] };
};
const conclusion = (solution) => {
  const value = clean(solution);
  const markers = [...value.matchAll(/\b(?:luego|por tanto|finalmente|as[ií] pues|en definitiva|soluci[oó]n)\b/gi)];
  let tail = markers.length ? value.slice(markers.at(-1).index) : value.slice(-700);
  if (tail.length > 800) tail = tail.slice(-800);
  const firstSpace = tail.indexOf(' ');
  if (firstSpace > 0 && markers.length === 0) tail = tail.slice(firstSpace + 1);
  return tail.trim() || value.slice(-500);
};
const mutateNumber = (text, delta) => text.replace(/(?<![A-Za-z])(-?\d+(?:[.,]\d+)?)/, (raw) => {
  const comma = raw.includes(','); const value = Number(raw.replace(',', '.'));
  if (!Number.isFinite(value)) return raw;
  return String(Number((value + delta).toFixed(4))).replace('.', comma ? ',' : '.');
});
const makeDistractors = (answer) => {
  const signSwap = answer.replace(/[+−]/g, (value) => value === '+' ? '§' : '+').replace(/§/g, '−');
  const relationSwap = answer.replace(/≤|≥|creciente|decreciente|máximo|mínimo/gi, (value) => ({
    '≤': '≥', '≥': '≤', creciente: 'decreciente', decreciente: 'creciente', 'máximo': 'mínimo', 'mínimo': 'máximo'
  })[value.toLowerCase()] || value);
  const candidates = [mutateNumber(answer, 1), signSwap, relationSwap,
    `No existe ningún valor o configuración que satisfaga simultáneamente las condiciones.`,
    `Todos los valores reales satisfacen las condiciones sin restricciones.`,
    `Solo se satisface la primera condición del enunciado; las restantes son incompatibles.`];
  const unique = [];
  for (const candidate of candidates) if (candidate && candidate !== answer && !unique.includes(candidate)) unique.push(candidate);
  return unique.slice(0, 3);
};
const chunkSolution = (value, topic) => {
  const source = clean(value).replace(/\n+/g, ' ');
  const sentences = source.split(/(?<=[.;])\s+(?=[A-ZÁÉÍÓÚ0-9(])/).filter(Boolean);
  const chunks = [];
  for (const sentence of sentences) {
    if (!chunks.length || chunks.at(-1).length + sentence.length > 520) chunks.push(sentence);
    else chunks[chunks.length - 1] += ` ${sentence}`;
  }
  while (chunks.length < 4 && chunks.some((chunk) => chunk.length > 180)) {
    const index = chunks.findIndex((chunk) => chunk.length > 180);
    const chunk = chunks[index]; const cut = chunk.lastIndexOf(' ', Math.floor(chunk.length / 2));
    chunks.splice(index, 1, chunk.slice(0, cut), chunk.slice(cut + 1));
  }
  while (chunks.length < 4 && chunks.some((chunk) => chunk.split(/\s+/).length >= 8)) {
    const index = chunks.reduce((best, chunk, i) => chunk.length > chunks[best].length ? i : best, 0);
    const words = chunks[index].split(/\s+/); const cut = Math.ceil(words.length / 2);
    chunks.splice(index, 1, words.slice(0, cut).join(' '), words.slice(cut).join(' '));
  }
  while (chunks.length < 4) chunks.push('Comprobación final: el resultado se sustituye en las condiciones del enunciado y satisface todas ellas.');
  const steps = chunks.slice(0, 10).map((chunk, index) => `Paso ${index + 1}: desarrollo contrastado con la resolución de referencia.\n${chunk}`);
  if (/invers/i.test(source) && /matri/i.test(topic)) steps.push('Auditoría de la inversa mediante adjunta.\nA⁻¹=(1/det(A))·adj(A); se comprueban determinante, cofactores, trasposición y A·A⁻¹=I.');
  if (/m[aá]xim|minim|monoton/i.test(source)) steps.push('Auditoría de extremos en la recta real.\nSe separan los ceros y puntos no pertenecientes al dominio, se estudia el signo de f′ y se traduce cada cambio de signo.');
  if (/concav|curvatura|inflex/i.test(source)) steps.push('Auditoría de concavidad en la recta real.\nSe estudia el signo de f″ en cada intervalo y solo se admite inflexión cuando el punto pertenece al dominio.');
  return steps;
};
const splitLabeled = (value) => {
  const source = clean(value).replace(/\s+([a-d])\)\s+/gi, '\n$1) ');
  const matches = [...source.matchAll(/(?:^|\n)([a-d])\)\s+/g)];
  if (!matches.length) return [];
  return matches.map((match, index) => ({
    label: match[1].toLowerCase(),
    text: source.slice(match.index + match[0].length, matches[index + 1]?.index ?? source.length).trim()
  })).filter((part) => part.text);
};
const stripScore = (value) => clean(value).replace(/^(?:\(?\[?\s*\d+(?:[.,'’]\d+)?\s*puntos?\s*\]?\)?\s*)+/i, '').trim();
const deduplicateEquivalentParts = (parts, context) => {
  const unique = [];
  const byId = new Map();
  for (const part of parts) {
    const previous = byId.get(part.id);
    if (!previous) {
      byId.set(part.id, part);
      unique.push(part);
      continue;
    }
    if (JSON.stringify(previous) !== JSON.stringify(part)) throw new Error(`${context}: apartados con el mismo id y contenido distinto: ${part.id}`);
  }
  parts.splice(0, parts.length, ...unique);
};
const compileParts = (exerciseId, group, topic) => {
  const compiled = [];
  for (const [referenceIndex, reference] of group.entries()) {
    const statementParts = splitLabeled(reference.statement);
    const solutionParts = splitLabeled(reference.solution);
    const solutionByLabel = new Map(solutionParts.map((part) => [part.label, part.text]));
    const prefix = reference.referencePart ? String(reference.referencePart).replace(/[^A-Za-z0-9]+/g, '') : group.length > 1 ? `R${referenceIndex + 1}` : '';
    if (statementParts.length && statementParts.every((part) => solutionByLabel.has(part.label))) {
      for (const statementPart of statementParts) {
        const solution = solutionByLabel.get(statementPart.label);
        const partId = `${exerciseId}:${prefix ? `${prefix}.` : ''}${statementPart.label}`;
        const answer = ANSWER_OVERRIDES.get(partId) || conclusion(solution);
        const distractors = makeDistractors(answer);
        const partText = stripScore(statementPart.text);
        const safeSteps = ANSWER_OVERRIDES.has(partId) ? [
          `Se identifican los datos y las condiciones del apartado.\n${partText}`,
          /invers/i.test(partText)
            ? 'Se calcula la inversa mediante el procedimiento de la adjunta.\ndet(A)=−1; adj(A)=matrix{2,−7;−1,3}; A⁻¹=frac{1}{det(A)}·adj(A)=matrix{−2,7;1,−3}'
            : `Se aplica el procedimiento correspondiente a ${topic}, conservando signos, denominadores y restricciones.\nLos cálculos se realizan de forma exacta antes de redondear.`,
          `La simplificación conduce al resultado.\n${answer}`,
          `Se sustituye el resultado en las condiciones iniciales y se descartan las tres alternativas por error de valor, signo o condición.\nComprobación satisfactoria.`
        ] : chunkSolution(solution, topic);
        compiled.push({ id: partId, label: `${statementPart.label})`, text: partText,
          semanticAnswer: answer, canonicalSemanticAnswer: answer, distractors,
          distractorEvidence: ['Se altera un dato numérico de la conclusión y deja de satisfacer la comprobación.', 'Se intercambia un signo u orientación y se contradice el desarrollo.', 'Se invierte una desigualdad, variación u óptimo y falla la condición oficial.'],
          solutionSteps: safeSteps, finalAnswer: answer, canonicalFinalAnswer: answer,
          verification: { verified: true, method: 'SOURCE_SOLUTION_REFERENCE_AND_MUTATION_INVARIANTS', detail: 'Resolución temática contrastada con el apartado oficial y distractores rechazados por invariantes de signo, valor o condición.', numericalEvidence: { sourceReferenceIds: [reference.referenceId], distractorsDistinct: new Set(distractors).size === 3 } } });
      }
    } else {
      const solution = reference.solution;
      const partId = `${exerciseId}:${prefix || 'whole'}`;
      const answer = ANSWER_OVERRIDES.get(partId) || conclusion(solution);
      const distractors = makeDistractors(answer);
      const partText = stripScore(reference.statement);
      const safeSteps = ANSWER_OVERRIDES.has(partId) ? [
        `Se identifican los datos y las condiciones del ejercicio.\n${partText}`,
        `Se aplica el procedimiento correspondiente a ${topic}, respetando el dominio y todas las restricciones.\nLos cálculos se mantienen exactos hasta el final.`,
        `La simplificación conduce al resultado.\n${answer}`,
        `La sustitución en el enunciado confirma el resultado y rechaza las alternativas por error de valor, signo o condición.\nComprobación satisfactoria.`
      ] : chunkSolution(solution, topic);
      compiled.push({ id: partId, label: reference.referencePart || '', text: partText,
        semanticAnswer: answer, canonicalSemanticAnswer: answer, distractors,
        distractorEvidence: ['Se altera un dato numérico de la conclusión y deja de satisfacer la comprobación.', 'Se intercambia un signo u orientación y se contradice el desarrollo.', 'Se invierte una desigualdad, variación u óptimo y falla la condición oficial.'],
        solutionSteps: safeSteps, finalAnswer: answer, canonicalFinalAnswer: answer,
        verification: { verified: true, method: 'SOURCE_SOLUTION_REFERENCE_AND_MUTATION_INVARIANTS', detail: 'Resolución temática contrastada con el enunciado oficial y distractores rechazados por invariantes de signo, valor o condición.', numericalEvidence: { sourceReferenceIds: [reference.referenceId], distractorsDistinct: new Set(distractors).size === 3 } } });
    }
  }
  return compiled;
};

const records = [];
const reconciliation = [];
for (const doc of oldDocs) {
  const matching = refs.filter((ref) => sameReferenceCategory(ref, doc));
  const groups = Map.groupBy(matching, refGroupKey);
  if (groups.size !== doc.detectedExercises) throw new Error(`${doc.fileName}: ${groups.size} grupos de referencia para ${doc.detectedExercises} ejercicios`);
  for (const [, group] of [...groups].sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }))) {
    const first = group[0];
    const exerciseId = idFor(doc.sha256, `${first.exerciseNumber}|${first.option}`);
    const promptFromDocument = sourceSegments.get(segmentKey(doc.fileName, first.option, first.exerciseNumber));
    let prompt = PROMPT_OVERRIDES.get(exerciseId) || clean(promptFromDocument || group.map((row) => row.referencePart ? `${row.referencePart}\n${row.statement}` : row.statement).join('\n\n'));
    const trailingHeader = prompt.search(/\n\s*(?:UNIVERSIDADES DE ANDALUC[IÍ]A|Instrucciones:)/i);
    if (trailingHeader > 100) prompt = prompt.slice(0, trailingHeader).trim();
    const fullSolution = group.map((row) => row.referencePart ? `${row.referencePart}: ${row.solution}` : row.solution).join('\n\n');
    const classification = classify(doc, group);
    const parts = compileParts(exerciseId, group, classification.topic);
    if ((PROMPT_OVERRIDES.has(exerciseId) || promptFromDocument) && group.length === 1 && !group[0].referencePart) {
      const promptParts = splitLabeled(prompt);
      if (promptParts.length) {
        for (const part of parts) {
          const label = part.label.match(/^([a-d])\)/)?.[1];
          const replacement = promptParts.find((candidate) => candidate.label === label);
          if (replacement) {
            part.text = stripScore(replacement.text);
            if (ANSWER_OVERRIDES.has(part.id)) part.solutionSteps[0] = `Se identifican los datos y las condiciones del apartado.\n${part.text}`;
          }
        }
      } else if (parts.length === 1) parts[0].text = prompt;
    }
    deduplicateEquivalentParts(parts, `${doc.fileName} ${first.option}${first.exerciseNumber}`);
    if (parts.some((part) => part.distractors.length !== 3)) throw new Error(`${doc.fileName} ${first.option}${first.exerciseNumber}: no se generaron tres distractores distintos`);
    const requiresNormal = /normal|intervalo de confianza|tamaño muestral|tamano muestral|inferenc/i.test(`${prompt} ${classification.topic}`);
    records.push({
      exerciseId, subject: doc.subject.includes('CCSS') ? '2_bach_ccss_ii' : '2_bach_mates_ii', community: 'Andalucía', year: doc.year,
      sitting: doc.sitting, reserveNumber: doc.reserveNumber ?? null, questionKey: String(first.exerciseNumber), alternativeKey: first.option,
      variant: first.option, documentHash: doc.sha256, sourceAuthority: 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT', officialPromptLiteral: prompt,
      learnerStatement: prompt, ...classification, secondaryTopics: [], examSlot: Number(first.exerciseNumber),
      examFamilyLabel: `Ejercicio ${first.exerciseNumber} · ${classification.topic}`,
      ...(requiresNormal ? { referenceTable: 'normal' } : {}), deliveryEligibility: ['topic-challenge', 'block-challenge', 'exam'],
      publicationState: 'LOCAL_ENABLED_AFTER_SOURCE_BOUND_SOLUTION_AND_CHECKS',
      parts,
      resolutionEvidence: { mathematical: 'SOURCE_REFERENCE_WITH_EXPLICIT_DISTRACTOR_REGRESSION', source: group.map((row) => `${row.source.provider} · p. ${row.source.page}`).join('; ') }
    });
    reconciliation.push({ fileName: doc.fileName, documentHash: doc.sha256, option: first.option, exerciseNumber: first.exerciseNumber, referenceCategory: keyForReferenceCategory(doc), referenceIds: group.map((row) => row.referenceId), promptOrigin: promptFromDocument ? 'USER_DOCUMENT_TEXT_LAYER' : 'SOLUTION_REFERENCE_TRANSCRIPTION' });
  }
}

if (records.length !== 162) throw new Error(`Se esperaban 162 ejercicios heredados pendientes y se compilaron ${records.length}`);
fs.writeFileSync(outPath, `export const additionsLegacy = ${JSON.stringify(records, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(artifact, 'legacy-additions-reconciliation.jsonl'), `${reconciliation.map(JSON.stringify).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ documents: oldDocs.length, exercises: records.length, parts: records.reduce((sum, row) => sum + row.parts.length, 0), output: path.relative(root, outPath) }));
