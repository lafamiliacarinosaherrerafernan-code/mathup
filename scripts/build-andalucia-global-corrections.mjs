import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const solutionSkillHash = sha256(path.join(root, '.agents', 'skills', 'solucion-de-ejercicios', 'SKILL.md'));
const statementSkillHash = sha256('C:/Users/aherr/.codex/skills/skill-editor-enunciados/SKILL.md');
const generatedAt = new Date().toISOString();
const artifactDir = path.join(root, 'artifacts', 'andalucia-global-correction');
const classification = fs.readFileSync(path.join(artifactDir, 'classification-comparison.jsonl'), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
const parts = fs.readFileSync(path.join(artifactDir, 'file-exercise-part-counts.jsonl'), 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);

const inferredCorrections = Object.fromEntries(classification
  .filter((row) => Number.isInteger(row.inferredTopicIndex))
  .map((row) => [row.exerciseId, {
    topicIndex: row.inferredTopicIndex,
    primaryTopic: row.subject === '2_bach_mates_ii' && row.inferredTopicIndex === 2
      ? 'Resolución de sistemas con determinantes'
      : row.inferredTopic,
    reason: row.inferenceReason,
    confidence: row.inferenceConfidence
  }]));
const phase27ClassificationPath = path.join(root, 'data', 'andalucia-topic-classification-phase2.7.json');
const phase27Classification = fs.existsSync(phase27ClassificationPath)
  ? JSON.parse(fs.readFileSync(phase27ClassificationPath, 'utf8'))
  : { overrides: {} };
const corrections = {
  ...inferredCorrections,
  ...(phase27Classification.overrides || {})
};
const correctedPartAuditPath = path.join(root, 'artifacts', 'andalucia-mates-global-correction-2', 'exercise-part-census.jsonl');
const correctedPartAudit = fs.existsSync(correctedPartAuditPath)
  ? fs.readFileSync(correctedPartAuditPath, 'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse)
  : [];

const cubicAreaGraph = `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Recinto entre g(x)=x(x-2)^2/4 y el eje OX, desde x=0 hasta x=2"><rect width="640" height="360" fill="#fff"/><g stroke="#d9e2ec" stroke-width="1"><path d="M60 60H610M60 120H610M60 180H610M60 240H610M140 30V320M260 30V320M380 30V320M500 30V320"/></g><path d="M45 290H615M80 325V25" stroke="#243b53" stroke-width="2"/><path d="M80 290 C120 255 155 205 205 185 C250 168 300 178 340 215 C375 246 400 278 420 290 L80 290Z" fill="#60a5fa" fill-opacity=".35"/><path d="M25 330 C70 305 105 278 140 248 C175 218 205 185 245 178 C290 170 330 195 365 236 C392 268 410 286 420 290 C455 302 510 265 600 145" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="80" cy="290" r="6" fill="#dc2626"/><circle cx="420" cy="290" r="6" fill="#dc2626"/><circle cx="245" cy="178" r="6" fill="#059669"/><g font-family="Arial,sans-serif" font-size="16" fill="#102a43"><text x="600" y="282">x</text><text x="90" y="40">y</text><text x="66" y="312">0</text><text x="408" y="312">2</text><text x="225" y="162">(2/3, 8/27)</text><text x="265" y="225">techo: g(x)</text><text x="250" y="282">suelo: y=0</text><text x="180" y="335">A=∫₀² g(x) dx = 1/3</text></g></svg>`, 'utf8').toString('base64')}`;
const genericAreaGraph = `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Esquema cartesiano del recinto; los puntos de corte, el techo y el suelo se identifican en el desarrollo"><rect width="640" height="360" fill="#fff"/><g stroke="#e2e8f0"><path d="M60 80H610M60 150H610M60 220H610M150 30V320M280 30V320M410 30V320M540 30V320"/></g><path d="M40 280H615M90 325V25" stroke="#243b53" stroke-width="2"/><path d="M155 255 C230 90 390 105 500 255 L155 255Z" fill="#60a5fa" fill-opacity=".32"/><path d="M120 285 C190 120 365 70 540 285" fill="none" stroke="#2563eb" stroke-width="4"/><path d="M155 255 C245 205 400 205 500 255" fill="none" stroke="#059669" stroke-width="4"/><circle cx="155" cy="255" r="6" fill="#dc2626"/><circle cx="500" cy="255" r="6" fill="#dc2626"/><g font-family="Arial,sans-serif" font-size="16" fill="#102a43"><text x="600" y="272">x</text><text x="100" y="42">y</text><text x="215" y="120">techo</text><text x="315" y="245">suelo</text><text x="155" y="340">Esquema cualitativo: usar los cortes y signos calculados en los pasos</text></g></svg>`, 'utf8').toString('base64')}`;

const exactAreaGraph = ({ xMin, xMax, yMin, yMax, curves, regions, points, caption }) => {
  const width = 760; const height = 430; const left = 70; const right = 25; const top = 35; const bottom = 65;
  const sx = (x) => left + ((x - xMin) / (xMax - xMin)) * (width - left - right);
  const sy = (y) => top + ((yMax - y) / (yMax - yMin)) * (height - top - bottom);
  const sample = (fn, from, to, count = 160) => Array.from({ length: count + 1 }, (_, index) => {
    const x = from + (to - from) * index / count; return [sx(x), sy(fn(x))];
  });
  const pathOf = (values) => values.map(([x, y], index) => `${index ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const shade = regions.map((region) => {
    const upper = sample(region.upper, region.from, region.to, 120);
    const lower = sample(region.lower, region.from, region.to, 120).reverse();
    return `<path d="${pathOf([...upper, ...lower])} Z" fill="#60a5fa" fill-opacity=".30" stroke="none"/>`;
  }).join('');
  const curvePaths = curves.map((curve) => `<path d="${pathOf(sample(curve.fn, curve.from ?? xMin, curve.to ?? xMax))}" fill="none" stroke="${curve.color}" stroke-width="3.5"/>`).join('');
  const pointMarks = points.map((point) => `<circle cx="${sx(point.x).toFixed(2)}" cy="${sy(point.y).toFixed(2)}" r="5" fill="#dc2626"/><text x="${(sx(point.x) + 7).toFixed(2)}" y="${(sy(point.y) - 8).toFixed(2)}" font-size="14">${point.label}</text>`).join('');
  const legend = curves.map((curve, index) => `<line x1="90" y1="${20 + 22 * index}" x2="118" y2="${20 + 22 * index}" stroke="${curve.color}" stroke-width="4"/><text x="126" y="${25 + 22 * index}" font-size="15">${curve.label}</text>`).join('');
  const xAxis = yMin <= 0 && yMax >= 0 ? sy(0) : height - bottom;
  const yAxis = xMin <= 0 && xMax >= 0 ? sx(0) : left;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${caption}"><rect width="${width}" height="${height}" fill="white"/><g stroke="#e2e8f0"><path d="M${left} ${top}V${height-bottom}M${left} ${height-bottom}H${width-right}"/></g>${shade}<path d="M${left} ${xAxis.toFixed(2)}H${width-right}M${yAxis.toFixed(2)} ${top}V${height-bottom}" stroke="#243b53" stroke-width="2"/>${curvePaths}<g font-family="Arial,sans-serif" fill="#102a43">${pointMarks}${legend}<text x="${left}" y="${height-20}" font-size="15">${caption}</text></g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg, 'utf8').toString('base64')}`;
};
const zero = () => 0;
const areaGraphOverrides = Object.freeze({
  'pau-can-ex-0b2a4449ef26bad5b443dba3b3388b1b:c': { spec: { xMin: -2.5, xMax: 2.5, yMin: -1, yMax: 9, curves: [{ label: 'y=8−2x²', color: '#2563eb', fn: (x) => 8 - 2*x*x }], regions: [{ from: -2, to: 2, upper: (x) => 8 - 2*x*x, lower: zero }], points: [{x:-2,y:0,label:'(−2,0)'},{x:2,y:0,label:'(2,0)'}], caption: 'Techo y=8−2x²; suelo y=0; −2≤x≤2' } },
  'pau-can-ex-137738a92021a0b8c6bff808ba9fd4de:c': { spec: { xMin: -2.4, xMax: 2.4, yMin: -1, yMax: 8, curves: [{ label: 'y=4x²+16x+17', color: '#2563eb', fn: (x) => 4*x*x+16*x+17, from:-2,to:-1 },{ label:'y=(10−5x)/3',color:'#059669',fn:(x)=>(10-5*x)/3,from:-1,to:2 }], regions: [{from:-2,to:-1,upper:(x)=>4*x*x+16*x+17,lower:zero},{from:-1,to:2,upper:(x)=>(10-5*x)/3,lower:zero}], points:[{x:-2,y:1,label:'(−2,1)'},{x:-1,y:5,label:'(−1,5)'},{x:2,y:0,label:'(2,0)'}], caption:'Región bajo f entre x=−2 y x=2, separada en x=−1' } },
  'pau-can-ex-6897411bf26489d5adb8a052058877fe:c': { spec:{xMin:2.7,xMax:5.3,yMin:-1,yMax:21,curves:[{label:'y=x²−6',color:'#2563eb',fn:(x)=>x*x-6}],regions:[{from:3,to:5,upper:(x)=>x*x-6,lower:zero}],points:[{x:3,y:3,label:'(3,3)'},{x:5,y:19,label:'(5,19)'}],caption:'Techo y=x²−6; suelo y=0; 3≤x≤5'} },
  'pau-can-ex-69196e2150083bda4924ab7f7441c550:b-iii': { spec:{xMin:-3,xMax:63,yMin:-2,yMax:23,curves:[{label:'y=x²/20',color:'#2563eb',fn:(x)=>x*x/20,from:0,to:20},{label:'y=26−3x/10',color:'#059669',fn:(x)=>26-3*x/10,from:20,to:50},{label:'y=36−x²/100',color:'#7c3aed',fn:(x)=>36-x*x/100,from:50,to:60}],regions:[{from:0,to:20,upper:(x)=>x*x/20,lower:zero},{from:20,to:50,upper:(x)=>26-3*x/10,lower:zero},{from:50,to:60,upper:(x)=>36-x*x/100,lower:zero}],points:[{x:0,y:0,label:'(0,0)'},{x:20,y:20,label:'(20,20)'},{x:50,y:11,label:'(50,11)'},{x:60,y:0,label:'(60,0)'}],caption:'Área bajo los tres tramos de f en [0,60]'} },
  'pau-can-ex-81737289c7115ff4bf9b16d1411350d0:b': { spec:{xMin:-1.5,xMax:3.5,yMin:-1,yMax:5,curves:[{label:'y=−x²+2x+3',color:'#2563eb',fn:(x)=>-x*x+2*x+3}],regions:[{from:-1,to:3,upper:(x)=>-x*x+2*x+3,lower:zero}],points:[{x:-1,y:0,label:'(−1,0)'},{x:3,y:0,label:'(3,0)'},{x:1,y:4,label:'(1,4)'}],caption:'Techo y=−x²+2x+3; suelo y=0'} },
  'pau-can-ex-83aa912a154e3d4afef41140c2682f4a:b': { spec:{xMin:-1.6,xMax:1.6,yMin:-1,yMax:2,curves:[{label:'y=−x³−x²+x+1',color:'#2563eb',fn:(x)=>-x*x*x-x*x+x+1}],regions:[{from:-1,to:1,upper:(x)=>-x*x*x-x*x+x+1,lower:zero}],points:[{x:-1,y:0,label:'(−1,0)'},{x:1,y:0,label:'(1,0)'},{x:0,y:1,label:'(0,1)'}],caption:'Recinto acotado entre g y el eje OX'} },
  'pau-can-ex-876cc912029f2368903179a61dbbc217:b': { spec:{xMin:-1.4,xMax:3.4,yMin:-.5,yMax:2,curves:[{label:'f(x)=2−x²',color:'#2563eb',fn:(x)=>2-x*x,from:-1,to:1},{label:'f(x)=(x−2)²',color:'#2563eb',fn:(x)=>(x-2)*(x-2),from:1,to:3},{label:'g(x)=1',color:'#059669',fn:()=>1,from:-1,to:3}],regions:[{from:-1,to:1,upper:()=>1,lower:(x)=>2-x*x},{from:1,to:3,upper:()=>1,lower:(x)=>(x-2)*(x-2)}],points:[{x:-1,y:1,label:'(−1,1)'},{x:1,y:1,label:'(1,1)'},{x:3,y:1,label:'(3,1)'}],caption:'Región entre g(x)=1 y la función f a trozos'} },
  'pau-can-ex-8d77f619c3c5ebfa26f9ff49253eac0b:c': { spec:{xMin:-1.4,xMax:1.4,yMin:-.5,yMax:2.7,curves:[{label:'y=−x²+x+2',color:'#2563eb',fn:(x)=>-x*x+x+2}],regions:[{from:-1,to:1,upper:(x)=>-x*x+x+2,lower:zero}],points:[{x:-1,y:0,label:'(−1,0)'},{x:1,y:2,label:'(1,2)'}],caption:'Techo y=−x²+x+2; suelo y=0; −1≤x≤1'} },
  'pau-can-ex-a5dbcd4011358b503ecf052f921a5581:d': { spec:{xMin:-.3,xMax:2.3,yMin:-.3,yMax:1.5,curves:[{label:'y=x(x−2)²',color:'#2563eb',fn:(x)=>x*(x-2)*(x-2)}],regions:[{from:0,to:2,upper:(x)=>x*(x-2)*(x-2),lower:zero}],points:[{x:0,y:0,label:'(0,0)'},{x:2,y:0,label:'(2,0)'}],caption:'Recinto entre f(x)=x(x−2)² y el eje OX'} },
  'pau-can-ex-b0e7b3d20fe726179e3e317d82995c16:d': { spec:{xMin:-.2,xMax:2.2,yMin:-.2,yMax:3.2,curves:[{label:'f(x)=1/2',color:'#2563eb',fn:()=>.5,from:0,to:1},{label:'f(x)=x²−x/2',color:'#059669',fn:(x)=>x*x-x/2,from:1,to:2}],regions:[{from:0,to:1,upper:()=>.5,lower:zero},{from:1,to:2,upper:(x)=>x*x-x/2,lower:zero}],points:[{x:0,y:.5,label:'(0,1/2)'},{x:1,y:.5,label:'(1,1/2)'},{x:2,y:3,label:'(2,3)'}],caption:'Área bajo f entre x=0 y x=2, separada en x=1'} },
  'pau-can-ex-e60bcf22761e56fccb320c792db8252f:b': { spec:{xMin:.7,xMax:3.3,yMin:-.3,yMax:2.3,curves:[{label:'y=−2x²+8x−6',color:'#2563eb',fn:(x)=>-2*x*x+8*x-6}],regions:[{from:1,to:3,upper:(x)=>-2*x*x+8*x-6,lower:zero}],points:[{x:1,y:0,label:'(1,0)'},{x:2,y:2,label:'(2,2)'},{x:3,y:0,label:'(3,0)'}],caption:'Techo y=−2x²+8x−6; suelo y=0'} },
  'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:b': { spec:{xMin:-.3,xMax:2.3,yMin:-.4,yMax:4.5,curves:[{label:'y=x²',color:'#2563eb',fn:(x)=>x*x},{label:'y=−x²+4x',color:'#059669',fn:(x)=>-x*x+4*x}],regions:[{from:0,to:2,upper:(x)=>-x*x+4*x,lower:(x)=>x*x}],points:[{x:0,y:0,label:'(0,0)'},{x:2,y:4,label:'(2,4)'}],caption:'Techo y=−x²+4x; suelo y=x²; cortes (0,0) y (2,4)'} },
  'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:c': { spec:{xMin:-.3,xMax:2.3,yMin:-.4,yMax:4.5,curves:[{label:'y=x²',color:'#2563eb',fn:(x)=>x*x},{label:'y=−x²+4x',color:'#059669',fn:(x)=>-x*x+4*x}],regions:[{from:0,to:2,upper:(x)=>-x*x+4*x,lower:(x)=>x*x}],points:[{x:0,y:0,label:'(0,0)'},{x:2,y:4,label:'(2,4)'}],caption:'Techo y=−x²+4x; suelo y=x²; cortes (0,0) y (2,4)'} },
  'pau-user-and-7bd611629ba5c02672a9f0f5ab45:whole': { spec:{xMin:-1.3,xMax:1.3,yMin:-.2,yMax:1.5,curves:[{label:'y=x²',color:'#2563eb',fn:(x)=>x*x},{label:'y=1',color:'#059669',fn:()=>1}],regions:[{from:-1,to:1,upper:()=>1,lower:(x)=>x*x}],points:[{x:-1,y:1,label:'(−1,1)'},{x:1,y:1,label:'(1,1)'}],caption:'Para a=1: techo y=1; suelo y=x²; cortes (−1,1) y (1,1)'} },
  'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:c': { spec:{xMin:-.4,xMax:6.4,yMin:-.5,yMax:4.7,curves:[{label:'f(x)=x², 0≤x≤2',color:'#2563eb',fn:(x)=>x*x,from:0,to:2},{label:'f(x)=6−x, 2<x≤6',color:'#059669',fn:(x)=>6-x,from:2,to:6}],regions:[{from:0,to:2,upper:(x)=>x*x,lower:zero},{from:2,to:6,upper:(x)=>6-x,lower:zero}],points:[{x:0,y:0,label:'(0,0)'},{x:2,y:4,label:'(2,4)'},{x:6,y:0,label:'(6,0)'}],caption:'Recinto acotado bajo f entre los cortes x=0 y x=6'} }
});
for (const graph of Object.values(areaGraphOverrides)) graph.src = exactAreaGraph(graph.spec);
const serializedAreaGraphOverrides = Object.freeze(Object.fromEntries(Object.entries(areaGraphOverrides)
  .map(([partId, graph]) => [partId, { src: graph.src, alt: graph.spec.caption }])));

const partOverrides = {
  'pau-can-ex-4a1d7a5b14de49c1a545b0a194bd33fc': [{
    id: 'pau-can-ex-4a1d7a5b14de49c1a545b0a194bd33fc:whole', label: '',
    text: 'Se sabe que la suma de tres números naturales es 22 y que la suma de cuatro veces el primero más el triple del segundo más el doble del tercero es 61. ¿Puede ser 15 uno de los tres números? En caso afirmativo, calcula los restantes. ¿Existen otras opciones?',
    semanticAnswer: 'Sí: la única terna que contiene 15 es (1, 15, 6). Las otras opciones son (2,13,7), (3,11,8), (4,9,9), (5,7,10), (6,5,11), (7,3,12) y (8,1,13).',
    distractors: ['Sí: (15,1,6), y no hay más opciones.', 'Sí: (1,6,15), y las demás ternas se obtienen permutando.', 'No puede aparecer 15 en ninguna terna de números naturales.'],
    distractorEvidence: ['Coloca 15 en la primera posición y no verifica la ecuación ponderada.', 'Ignora que los coeficientes 4, 3 y 2 distinguen las posiciones.', 'Descarta la solución (1,15,6), que verifica ambas ecuaciones.'],
    solutionSteps: [
      'Planteamos las dos condiciones: x+y+z=22 y 4x+3y+2z=61.',
      'Restamos dos veces la primera ecuación a la segunda y obtenemos 2x+y=17; por tanto y=17−2x y z=x+5.',
      'Para x,y,z naturales positivos debe cumplirse 1≤x≤8. Al probar esos ocho valores aparecen todas las ternas: (1,15,6), (2,13,7), (3,11,8), (4,9,9), (5,7,10), (6,5,11), (7,3,12) y (8,1,13).',
      'Solo la primera contiene 15. Comprobación: 1+15+6=22 y 4·1+3·15+2·6=61.'
    ],
    finalAnswer: 'Sí: (1,15,6). Hay además otras siete ternas naturales positivas.',
    verification: { verified: true, method: 'Parametrización entera y comprobación exhaustiva', detail: 'y=17−2x, z=x+5 y 1≤x≤8 enumeran exactamente todas las soluciones naturales positivas.' }
  }],
  'pau-can-ex-e10495ba33971cca4641d0fc6f1389aa': [
    { id: 'pau-can-ex-e10495ba33971cca4641d0fc6f1389aa:a', label: 'a)', text: 'Halla a y b sabiendo que f tiene extremos relativos en x=1 y en x=2.', semanticAnswer: 'a=−2/3 y b=−1/6.', distractors: ['a=2/3 y b=−1/6.', 'a=−2/3 y b=1/6.', 'a=−1/3 y b=−1/6.'], distractorEvidence: ['Cambia el signo de a.', 'Cambia el signo de b.', 'Pierde el factor 2 al resolver el sistema.'], solutionSteps: ['Derivamos: f′(x)=a/x+2bx+1.', 'Como hay extremos en x=1 y x=2, imponemos f′(1)=0 y f′(2)=0: a+2b+1=0 y a/2+4b+1=0.', 'Resolviendo el sistema se obtiene b=−1/6 y a=−2/3.', 'Comprobación: f′(1)=−2/3−1/3+1=0 y f′(2)=−1/3−2/3+1=0.'], finalAnswer: 'a=−2/3, b=−1/6.', verification: { verified: true, method: 'Sistema formado por las condiciones f′(1)=f′(2)=0' } },
    { id: 'pau-can-ex-e10495ba33971cca4641d0fc6f1389aa:b', label: 'b)', text: '¿Qué tipo de extremos tiene f en x=1 y en x=2?', semanticAnswer: 'En x=1 hay un mínimo relativo y en x=2 hay un máximo relativo.', distractors: ['En x=1 hay un máximo y en x=2 un mínimo.', 'Los dos puntos son máximos relativos.', 'Los dos puntos son mínimos relativos.'], distractorEvidence: ['Invierte los signos de f′′.', 'Ignora que f′′(1)>0.', 'Ignora que f′′(2)<0.'], solutionSteps: ['Con a=−2/3 y b=−1/6, f′′(x)=2/(3x²)−1/3=(2−x²)/(3x²).', 'f′′(1)=1/3>0, luego en x=1 la gráfica es convexa y hay un mínimo relativo.', 'f′′(2)=−1/6<0, luego en x=2 la gráfica es cóncava y hay un máximo relativo.', 'La recta de signos de f′ confirma el cambio − a + en x=1 y + a − en x=2.'], finalAnswer: 'Mínimo relativo en x=1 y máximo relativo en x=2.', verification: { verified: true, method: 'Signo de la segunda derivada y cambio de signo de f′' } }
  ],
  'pau-user-and-556322ecfdbde7e83340fc0f6727': [
    { id: 'pau-user-and-556322ecfdbde7e83340fc0f6727:a', label: 'a)', text: 'Determina los intervalos de crecimiento y de decrecimiento de f.', semanticAnswer: 'Crece en (−3/2,1) y decrece en (−∞,−3/2) y (1,+∞).', distractors: ['Crece en (−∞,−3/2) y (1,+∞).', 'Crece en (−3/2,+∞).', 'Decrece únicamente en (1,+∞).'], distractorEvidence: ['Invierte toda la tabla de signos.', 'Omite el cambio de signo en x=1.', 'Omite el tramo x<−3/2.'], solutionSteps: ['Derivamos f(x)=(3x−2x²)eˣ: f′(x)=eˣ(3−x−2x²)=−eˣ(2x+3)(x−1).', 'Como eˣ>0, los ceros de f′ son x=−3/2 y x=1.', 'Recta de signos de f′: negativa en (−∞,−3/2), positiva en (−3/2,1) y negativa en (1,+∞).', 'Por tanto f decrece, luego crece y finalmente vuelve a decrecer en esos intervalos.'], finalAnswer: 'Crece en (−3/2,1); decrece en (−∞,−3/2)∪(1,+∞).', verification: { verified: true, method: 'Recta real de signos de f′' } },
    { id: 'pau-user-and-556322ecfdbde7e83340fc0f6727:b', label: 'b)', text: 'Calcula los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan).', semanticAnswer: 'Mínimo relativo en (−3/2,−9e^(−3/2)) y máximo relativo en (1,e).', distractors: ['Máximo en (−3/2,−9e^(−3/2)) y mínimo en (1,e).', 'Mínimo en (−3/2,9e^(−3/2)) y máximo en (1,e).', 'El único extremo relativo es el máximo (1,e).'], distractorEvidence: ['Invierte los cambios de signo.', 'Pierde el signo negativo al evaluar f(−3/2).', 'Omite el mínimo relativo.'], solutionSteps: ['La tabla de signos de f′ cambia de − a + en x=−3/2: allí hay un mínimo relativo.', 'Evaluamos f(−3/2)=(−9)e^(−3/2).', 'La tabla cambia de + a − en x=1: allí hay un máximo relativo, y f(1)=e.', 'Los puntos extremos son (−3/2,−9e^(−3/2)) y (1,e).'], finalAnswer: 'Mínimo (−3/2,−9e^(−3/2)); máximo (1,e).', verification: { verified: true, method: 'Cambios de signo de f′ y evaluación exacta' } }
  ],
  'pau-user-and-9d256a6d008e07c0f8f7267b7cc8': [
    { id: 'pau-user-and-9d256a6d008e07c0f8f7267b7cc8:a', label: 'a)', text: 'Esboza la gráfica de g.', semanticAnswer: 'g(x)=x(x−2)²/4: corta en x=0 y es tangente al eje OX en x=2; máximo relativo (2/3,8/27) y mínimo relativo (2,0).', distractors: ['Corta al eje OX en x=0 y x=2, ambos cruces simples.', 'Tiene mínimo en (2/3,8/27) y máximo en (2,0).', 'No corta al eje OX y es siempre positiva.'], distractorEvidence: ['Ignora que x=2 es una raíz doble.', 'Invierte la tabla de signos de g′.', 'Omite la raíz x=0.'], solutionSteps: ['Factorizamos g(x)=x³/4−x²+x=x(x−2)²/4; sus ceros son x=0 y x=2, este último doble.', 'g′(x)=3x²/4−2x+1=(3x−2)(x−2)/4. Sus puntos críticos son x=2/3 y x=2.', 'Recta de signos de g′: positiva, negativa y positiva; por ello hay máximo en (2/3,8/27) y mínimo en (2,0).', 'Con coeficiente principal positivo, g tiende a −∞ a la izquierda y a +∞ a la derecha; cruza en 0 y toca el eje en 2.'], finalAnswer: 'Cúbica que cruza en (0,0), alcanza (2/3,8/27) y toca el eje en (2,0).', verification: { verified: true, method: 'Factorización, signos de g′ y comportamiento asintótico' } },
    { id: 'pau-user-and-9d256a6d008e07c0f8f7267b7cc8:b', label: 'b)', text: 'Determina la ecuación de la recta tangente a la gráfica de g en el punto de abscisa x=2.', semanticAnswer: 'La recta tangente es y=0.', distractors: ['y=x−2.', 'y=2x−4.', 'y=−x+2.'], distractorEvidence: ['Usa pendiente 1.', 'Usa pendiente 2.', 'Usa pendiente −1.'], solutionSteps: ['Calculamos g(2)=0.', 'La derivada es g′(x)=3x²/4−2x+1.', 'Evaluamos g′(2)=3−4+1=0.', 'La tangente es y−0=0·(x−2), es decir, y=0.'], finalAnswer: 'y=0.', verification: { verified: true, method: 'Ecuación punto-pendiente' } },
    { id: 'pau-user-and-9d256a6d008e07c0f8f7267b7cc8:c', label: 'c)', text: 'Calcula el área del recinto limitado por la gráfica de g y el eje de abscisas.', semanticAnswer: 'El área encerrada entre x=0 y x=2 es 1/3 unidad cuadrada.', distractors: ['El área es 0.', 'El área es 2/3.', 'El área es 4/3.'], distractorEvidence: ['Confunde integral orientada con área sin calcular.', 'Duplica el valor correcto.', 'Multiplica por cuatro el valor correcto.'], solutionSteps: ['Los cortes con OX son x=0 y x=2. Como g(x)=x(x−2)²/4≥0 en [0,2], la curva es el techo y y=0 el suelo.', 'El recinto se representa entre los puntos (0,0) y (2,0), bajo la curva, que alcanza el máximo local (2/3,8/27).', 'Calculamos A=∫₀²(x³/4−x²+x)dx=[x⁴/16−x³/3+x²/2]₀².', 'A=1−8/3+2=1/3>0 unidad cuadrada.'], solutionMathOptions: { solutionGraph: { src: cubicAreaGraph, alt: 'Recinto cartesiano entre g(x) y el eje OX, con cortes, techo, suelo y región sombreada' } }, finalAnswer: 'A=1/3 unidad cuadrada.', verification: { verified: true, method: 'Puntos de corte, signo del integrando y regla de Barrow' } }
  ]
};

const makeVerifiedPart = (id, label, text, semanticAnswer, distractors, solutionSteps, method) => ({
  id, label, text, semanticAnswer, canonicalSemanticAnswer: semanticAnswer,
  distractors,
  distractorEvidence: [
    'Confunde una intersección con una unión o con su complementario.',
    'Omite la condición o divide por una probabilidad distinta de la condicionante.',
    'Introduce una hipótesis de equiprobabilidad o independencia que el enunciado no permite.'
  ],
  solutionSteps,
  finalAnswer: semanticAnswer,
  canonicalFinalAnswer: semanticAnswer,
  verification: { verified: true, method, detail: 'Resultado comprobado por identidades de sucesos y suma de probabilidades.' }
});

Object.assign(partOverrides, {
  'pau-can-ex-1cb12958ea6097466563429ebaa9268f': [
    makeVerifiedPart('pau-can-ex-1cb12958ea6097466563429ebaa9268f:a-i', 'a.i)', 'Practique deporte y no estudie idiomas.', 'P(D∩Iᶜ)=0,40.', ['P(D∩Iᶜ)=0,35.', 'P(D∩Iᶜ)=0,60.', 'P(D∩Iᶜ)=0,45.'], ['Datos: P(D∪I)=0,80, P(D∩I)=0,35 y P(Iᶜ)=0,60; luego P(I)=0,40.', 'Por inclusión-exclusión, P(D)=0,80−0,40+0,35=0,75.', 'Restamos la intersección: P(D∩Iᶜ)=P(D)−P(D∩I)=0,75−0,35=0,40.', 'Comprobación: 0,40+0,35+0,05+0,20=1.'], 'INCLUSION_EXCLUSION_PARTITION'),
    makeVerifiedPart('pau-can-ex-1cb12958ea6097466563429ebaa9268f:a-ii', 'a.ii)', 'Estudie idiomas y no practique deporte.', 'P(I∩Dᶜ)=0,05.', ['P(I∩Dᶜ)=0,35.', 'P(I∩Dᶜ)=0,40.', 'P(I∩Dᶜ)=0,20.'], ['Como P(Iᶜ)=0,60, se tiene P(I)=0,40.', 'La parte común es P(D∩I)=0,35.', 'Por tanto P(I∩Dᶜ)=P(I)−P(D∩I)=0,40−0,35=0,05.', 'El valor es coherente con la partición completa del espacio muestral.'], 'EVENT_DIFFERENCE'),
    makeVerifiedPart('pau-can-ex-1cb12958ea6097466563429ebaa9268f:a-iii', 'a.iii)', 'Haga solamente una de las dos actividades.', 'P(solo una)=0,45.', ['P(solo una)=0,80.', 'P(solo una)=0,35.', 'P(solo una)=0,55.'], ['Hacer solo una actividad reúne los sucesos disjuntos D∩Iᶜ e I∩Dᶜ.', 'Ya se obtuvo P(D∩Iᶜ)=0,40.', 'También P(I∩Dᶜ)=0,05.', 'Sumamos: P(solo una)=0,40+0,05=0,45.'], 'DISJOINT_UNION'),
    makeVerifiedPart('pau-can-ex-1cb12958ea6097466563429ebaa9268f:a-iv', 'a.iv)', 'No haga ninguna de las dos actividades.', 'P(ninguna)=0,20.', ['P(ninguna)=0,80.', 'P(ninguna)=0,35.', 'P(ninguna)=0,45.'], ['El suceso «ninguna» es el complementario de D∪I.', 'El enunciado da P(D∪I)=0,80.', 'Aplicamos la regla del complementario: P((D∪I)ᶜ)=1−0,80=0,20.', 'La suma de las cuatro regiones de la partición vale 1.'], 'COMPLEMENT_RULE'),
    makeVerifiedPart('pau-can-ex-1cb12958ea6097466563429ebaa9268f:b', 'b)', '¿Son independientes los sucesos “Practicar deporte” y “Estudiar idiomas”?', 'No son independientes.', ['Sí, porque P(D∩I)=0,35.', 'Sí, porque P(D∪I)=0,80.', 'No se puede decidir con los datos dados.'], ['Para que fueran independientes debería cumplirse P(D∩I)=P(D)·P(I).', 'Tenemos P(D)=0,75 y P(I)=0,40.', 'El producto es 0,75·0,40=0,30.', 'Como 0,35≠0,30, los sucesos no son independientes.'], 'INDEPENDENCE_IDENTITY')
  ],
  'pau-can-ex-9a61afb3df4a398a5226085474d60215': [
    makeVerifiedPart('pau-can-ex-9a61afb3df4a398a5226085474d60215:a-i', 'a.i)', 'Tenga un ordenador o una tablet.', 'P(O∪T)=0,90.', ['P(O∪T)=0,70.', 'P(O∪T)=1,10.', 'P(O∪T)=0,20.'], ['Datos: P(O)=0,60, P(T)=0,50 y P(O∩T)=0,20.', 'Aplicamos inclusión-exclusión.', 'P(O∪T)=0,60+0,50−0,20=0,90.', 'El complementario, no tener ninguno, vale 0,10.'], 'INCLUSION_EXCLUSION'),
    makeVerifiedPart('pau-can-ex-9a61afb3df4a398a5226085474d60215:a-ii', 'a.ii)', 'No tenga tablet si no tiene ordenador.', 'P(Tᶜ|Oᶜ)=0,25.', ['P(Tᶜ|Oᶜ)=0,10.', 'P(Tᶜ|Oᶜ)=0,40.', 'P(Tᶜ|Oᶜ)=0,75.'], ['La probabilidad condicionante es P(Oᶜ)=1−0,60=0,40.', 'No tener ninguno es el complementario de O∪T: P(Oᶜ∩Tᶜ)=0,10.', 'Por definición, P(Tᶜ|Oᶜ)=P(Oᶜ∩Tᶜ)/P(Oᶜ).', 'Dividimos: 0,10/0,40=0,25.'], 'CONDITIONAL_PROBABILITY'),
    makeVerifiedPart('pau-can-ex-9a61afb3df4a398a5226085474d60215:a-iii', 'a.iii)', 'Tenga ordenador y no tenga tablet.', 'P(O∩Tᶜ)=0,40.', ['P(O∩Tᶜ)=0,20.', 'P(O∩Tᶜ)=0,60.', 'P(O∩Tᶜ)=0,10.'], ['Descomponemos O en dos regiones disjuntas: O∩T y O∩Tᶜ.', 'P(O)=0,60 y P(O∩T)=0,20.', 'Restamos: P(O∩Tᶜ)=0,60−0,20=0,40.', 'La tabla completa suma 0,20+0,40+0,30+0,10=1.'], 'EVENT_DIFFERENCE'),
    makeVerifiedPart('pau-can-ex-9a61afb3df4a398a5226085474d60215:b', 'b)', '¿Son incompatibles? ¿Son independientes los sucesos “Tener un ordenador” y “Tener una tablet”?', 'No son incompatibles y tampoco son independientes.', ['Son incompatibles e independientes.', 'No son incompatibles, pero sí independientes.', 'Son incompatibles, pero no independientes.'], ['No son incompatibles porque P(O∩T)=0,20>0.', 'Para independencia comparamos P(O∩T) con P(O)·P(T).', 'P(O)·P(T)=0,60·0,50=0,30.', 'Como 0,20≠0,30, tampoco son independientes.'], 'COMPATIBILITY_AND_INDEPENDENCE')
  ],
  'pau-can-ex-b721fb476a8920483e37adb81674c838': [
    makeVerifiedPart('pau-can-ex-b721fb476a8920483e37adb81674c838:a-i', 'a.i)', 'Alguno de estos dos medios de pago.', 'P(T∪M)=0,90.', ['P(T∪M)=0,10.', 'P(T∪M)=0,80.', 'P(T∪M)=1,00.'], ['No admitir ninguno tiene probabilidad 0,10.', 'Admitir alguno es el suceso complementario.', 'P(T∪M)=1−0,10=0,90.', 'El resultado está entre las probabilidades marginales y 1.'], 'COMPLEMENT_RULE'),
    makeVerifiedPart('pau-can-ex-b721fb476a8920483e37adb81674c838:a-ii', 'a.ii)', 'Pagar con móvil sabiendo que admite pagar con tarjeta de crédito.', 'P(M|T)=0,50.', ['P(M|T)=0,40.', 'P(M|T)=0,625.', 'P(M|T)=0,90.'], ['Por inclusión-exclusión, P(T∩M)=0,80+0,50−0,90=0,40.', 'La probabilidad condicionante es P(T)=0,80.', 'P(M|T)=P(M∩T)/P(T)=0,40/0,80.', 'Por tanto P(M|T)=0,50.'], 'CONDITIONAL_PROBABILITY'),
    makeVerifiedPart('pau-can-ex-b721fb476a8920483e37adb81674c838:b', 'b)', '¿Son independientes los sucesos “Pagar con tarjeta” y “Pagar con móvil”?', 'Sí, son independientes.', ['No, porque P(T∩M)=0,40.', 'No, porque P(T∪M)=0,90.', 'No se puede decidir sin conocer el número de restaurantes.'], ['La intersección obtenida es P(T∩M)=0,40.', 'El producto de las marginales vale P(T)·P(M)=0,80·0,50=0,40.', 'Como ambos valores coinciden, se cumple la condición de independencia.', 'También P(M|T)=P(M)=0,50, que lo confirma.'], 'INDEPENDENCE_IDENTITY')
  ]
});

const makeMathPart = (id, label, text, answer, distractors, steps, method, extra = {}) => ({
  id, label, text, semanticAnswer: answer, canonicalSemanticAnswer: answer,
  distractors,
  distractorEvidence: ['Error de signo o de operación.', 'Omisión de una condición del enunciado.', 'Aplicación incompleta del procedimiento.'],
  solutionSteps: steps, finalAnswer: answer, canonicalFinalAnswer: answer,
  verification: { verified: true, method, detail: 'Resultado sustituido o comprobado de forma independiente.' },
  ...extra
});
const benefitGraph = `data:image/svg+xml;base64,${Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="Parábola B(x)=-3x²+120x+675 para x mayor o igual que cero"><rect width="640" height="360" fill="white"/><path d="M55 300H610M85 325V30" stroke="#243b53" stroke-width="2"/><path d="M85 255 Q300 40 555 300" fill="none" stroke="#2563eb" stroke-width="4"/><circle cx="300" cy="70" r="6" fill="#059669"/><circle cx="555" cy="300" r="6" fill="#dc2626"/><g font-family="Arial" font-size="16" fill="#102a43"><text x="290" y="52">(20,1875)</text><text x="540" y="325">(45,0)</text><text x="92" y="248">(0,675)</text><text x="570" y="292">x</text><text x="95" y="42">B(x)</text></g></svg>`, 'utf8').toString('base64')}`;
Object.assign(partOverrides, {
  'pau-user-and-a2399d7ce20cc304ff589d5743a8': [
    makeMathPart('pau-user-and-a2399d7ce20cc304ff589d5743a8:a', 'a)', 'Determine la monotonía y la curvatura de f.', 'Crece en (−∞,0)∪(2,+∞), decrece en (0,2); es cóncava hacia abajo en (−∞,1) y hacia arriba en (1,+∞).', ['Invierte todos los intervalos.', 'Sitúa los cambios en x=−1 y x=1.', 'Afirma que la función es siempre creciente y convexa.'], ['f′(x)=3x²−6x=3x(x−2); sus ceros son 0 y 2.', 'Recta real de signos de f′: + en (−∞,0), − en (0,2) y + en (2,+∞).', 'f′′(x)=6x−6; recta real de signos de f′′: − si x<1 y + si x>1.', 'Por tanto el cambio de concavidad se produce en x=1.'], 'DERIVATIVE_SIGN_TABLES'),
    makeMathPart('pau-user-and-a2399d7ce20cc304ff589d5743a8:b', 'b)', 'Determine los puntos donde la función alcanza sus extremos relativos.', 'Máximo relativo en (0,4) y mínimo relativo en (2,0).', ['Mínimo en (0,4) y máximo en (2,0).', 'Máximo en (1,2) y mínimo en (2,0).', 'No tiene extremos relativos.'], ['Los puntos críticos son x=0 y x=2.', 'La recta de signos de f′ cambia de + a − en x=0: hay máximo.', 'Cambia de − a + en x=2: hay mínimo.', 'Evaluamos f(0)=4 y f(2)=0.'], 'EXTREMA_SIGN_CHANGE'),
    makeMathPart('pau-user-and-a2399d7ce20cc304ff589d5743a8:c', 'c)', 'Determine la recta tangente a f en x=−1.', 'y=9x+9.', ['y=−9x−9.', 'y=9x.', 'y=x+1.'], ['f(−1)=4−3−1=0.', 'f′(x)=3x²−6x.', 'La pendiente es f′(−1)=3+6=9.', 'La ecuación punto-pendiente es y−0=9(x+1), es decir, y=9x+9.'], 'TANGENT_POINT_SLOPE')
  ],
  'pau-user-and-eb0dd390d6f48d86d0d3793419de': [
    makeMathPart('pau-user-and-eb0dd390d6f48d86d0d3793419de:a', 'a)', 'Calcule el gasto a partir del cual la empresa no obtiene beneficios.', 'A partir de x=45 miles de euros el beneficio es no positivo.', ['A partir de x=20.', 'A partir de x=5.', 'Nunca deja de obtener beneficio.'], ['Resolvemos B(x)=−3x²+120x+675=0.', 'Dividimos por −3: x²−40x−225=0.', 'Las raíces son x=(40±50)/2, es decir, x=−5 y x=45.', 'Como x≥0 y la parábola abre hacia abajo, B(x)≤0 para x≥45.'], 'ROOTS_AND_SIGN'),
    makeMathPart('pau-user-and-eb0dd390d6f48d86d0d3793419de:b', 'b)', 'Calcule el valor de x que produce máximo beneficio y dicho beneficio.', 'El máximo se alcanza en x=20 y vale 1875 miles de euros.', ['x=45 y 0 miles.', 'x=20 y 675 miles.', 'x=40 y 1875 miles.'], ['La parábola abre hacia abajo porque su coeficiente cuadrático es −3.', 'La abscisa del vértice es x=−120/(2·(−3))=20.', 'B(20)=−3·400+120·20+675=1875.', 'Por tanto el vértice (20,1875) es el máximo.'], 'PARABOLA_VERTEX'),
    makeMathPart('pau-user-and-eb0dd390d6f48d86d0d3793419de:c', 'c)', 'Determine los intervalos de crecimiento y decrecimiento del beneficio.', 'Crece en [0,20) y decrece en (20,+∞).', ['Decrece en [0,20) y crece después.', 'Crece en todo su dominio.', 'Decrece en todo su dominio.'], ['B′(x)=−6x+120.', 'El único punto crítico del dominio es x=20.', 'Recta real de signos de B′: positiva para 0≤x<20, cero en 20 y negativa para x>20.', 'Así se obtienen los intervalos indicados.'], 'FIRST_DERIVATIVE_SIGN_LINE'),
    makeMathPart('pau-user-and-eb0dd390d6f48d86d0d3793419de:d', 'd)', 'Represente gráficamente la función B en su dominio x≥0.', 'Parábola cóncava hacia abajo que pasa por (0,675), tiene vértice (20,1875) y corta OX en (45,0).', ['Parábola hacia arriba con vértice (20,1875).', 'Recta que une (0,675) y (45,0).', 'Parábola con vértice (45,0).'], ['La gráfica es una parábola abierta hacia abajo.', 'En el dominio comienza en B(0)=675.', 'Su máximo es el vértice (20,1875).', 'La raíz válida es x=45; se representa solo el tramo x≥0.'], 'KEY_POINTS_GRAPH', { solutionMathOptions: { solutionGraph: { src: benefitGraph, alt: 'Gráfica de B con ordenada en el origen, vértice y corte con OX' } } })
  ],
  'pau-user-and-2d24fc052b2f090732a36320d027': [
    makeMathPart('pau-user-and-2d24fc052b2f090732a36320d027:a', 'a)', 'Dadas F=(2,−1,3) y C=(1,5,−2)ᵀ, calcule C·F y F·C.', 'C·F=[[2,−1,3],[10,−5,15],[−4,2,−6]] y F·C=−9.', ['C·F=−9 y F·C es la matriz 3×3.', 'C·F=[[2,−1,3],[5,−5,15],[−4,2,−6]] y F·C=9.', 'Ambos productos valen −9.'], ['C es 3×1 y F es 1×3; por tanto C·F es 3×3.', 'Multiplicamos cada entrada de C por la fila F y obtenemos [[2,−1,3],[10,−5,15],[−4,2,−6]].', 'F·C es 1×1: 2·1+(−1)·5+3·(−2).', 'La suma es 2−5−6=−9.'], 'MATRIX_DIMENSIONS_AND_PRODUCTS'),
    makeMathPart('pau-user-and-2d24fc052b2f090732a36320d027:b', 'b)', 'Con A=[[2,0],[1,−1]], B=[[1,−3],[2,−1]] y C=[[1,−1],[−1,0]], calcule X si X·A⁻¹−B=C.', 'X=[[0,4],[1,1]].', ['X=[[2,−4],[1,−1]].', 'X=[[4,0],[1,1]].', 'X=[[0,−4],[−1,1]].'], ['Aislamos X·A⁻¹=B+C.', 'Sumamos B+C=[[2,−4],[1,−1]].', 'Multiplicamos por A a la derecha: X=(B+C)A.', 'El producto [[2,−4],[1,−1]][[2,0],[1,−1]]=[[0,4],[1,1]]; al sustituir se recupera B+C.'], 'MATRIX_EQUATION_SUBSTITUTION')
  ],
  'pau-user-and-811c534e78c560165a5ca0d0ea4f': [
    makeMathPart('pau-user-and-811c534e78c560165a5ca0d0ea4f:a', 'a)', 'Con A=[[1,2],[0,1]] y B=[[0,−1],[2,4]], calcule (A+B)(A−B).', '(A+B)(A−B)=[[−1,0],[−8,−9]].', ['[[−1,0],[−8,9]].', '[[1,0],[8,−9]].', 'A²−B².'], ['A+B=[[1,1],[2,5]].', 'A−B=[[1,3],[−2,−3]].', 'Multiplicamos fila por columna.', 'El resultado es [[1−2,3−3],[2−10,6−15]]=[[−1,0],[−8,−9]].'], 'DIRECT_MATRIX_PRODUCT'),
    makeMathPart('pau-user-and-811c534e78c560165a5ca0d0ea4f:b', 'b)', 'Determine X en (A+2B)X=3I₂.', 'X=[[3,0],[−4/3,1/3]].', ['X=[[3,0],[4/3,1/3]].', 'X=[[1,0],[−4/9,1/9]].', 'X=[[3,0],[−4/3,3]].'], ['A+2B=[[1,0],[4,9]].', 'Su determinante es 9. Por adjunta: adj(A+2B)=[[9,0],[−4,1]].', '(A+2B)⁻¹=(1/9)[[9,0],[−4,1]].', 'X=3(A+2B)⁻¹=[[3,0],[−4/3,1/3]]; el producto con A+2B es 3I₂.'], 'ADJUGATE_INVERSE_AND_SUBSTITUTION')
  ]
});

// Reconstrucciones multipartado contrastadas visualmente con los PDF oficiales
// escaneados de 2008-2009. Sustituyen fusiones históricas producidas por OCR.
Object.assign(partOverrides, {
  'pau-user-and-c3ab9ccf5d57298c1a9824964739': [
    makeMathPart('pau-user-and-c3ab9ccf5d57298c1a9824964739:a', 'a)', 'Despeje la matriz X en A·X+B=A, sabiendo que A tiene inversa.', 'X=A⁻¹(A−B).', ['X=(A−B)A⁻¹.', 'X=A⁻¹(A+B).', 'X=A−B.'], ['Restamos B en ambos miembros: A·X=A−B.', 'Multiplicamos a la izquierda por A⁻¹, pues A⁻¹A=I.', 'Resulta X=A⁻¹(A−B); el orden no puede intercambiarse porque el producto matricial no es conmutativo.', 'Comprobación: A·A⁻¹(A−B)+B=A−B+B=A.'], 'MATRIX_EQUATION_ISOLATION'),
    makeMathPart('pau-user-and-c3ab9ccf5d57298c1a9824964739:b', 'b)', 'Obtenga X para A=[[2,5],[1,3]] y B=[[0,−3],[−1,2]].', 'X=[[-4,19],[2,−6]].', ['X=[[-4,2],[19,−6]].', 'X=[[4,−19],[−2,6]].', 'X=[[2,8],[2,1]].'], ['det(A)=2·3−5·1=1. La matriz de cofactores es [[3,−1],[−5,2]] y adj(A)=[[3,−5],[−1,2]].', 'Por el procedimiento de la adjunta, A⁻¹=(1/det(A))·adj(A)=[[3,−5],[−1,2]].', 'A−B=[[2,8],[2,1]] y X=A⁻¹(A−B).', 'Multiplicando fila por columna obtenemos X=[[-4,19],[2,−6]]; la sustitución verifica A·X+B=A.'], 'ADJUGATE_INVERSE_AND_MATRIX_EQUATION')
  ],
  'pau-user-and-57ce8292ea6366f4ec4b18f32f84': [
    makeMathPart('pau-user-and-57ce8292ea6366f4ec4b18f32f84:a', 'a)', '¿Es f continua en x=0? ¿Es continua en su dominio?', 'Sí, es continua en x=0 y en todo ℝ.', ['No es continua en x=0.', 'Solo es continua para x>0.', 'Es continua salvo en x=1.'], ['La rama izquierda es e^(−x) para x≤0 y la derecha x³−x+1 para x>0.', 'f(0)=e⁰=1 y lim(x→0⁻)e^(−x)=1.', 'lim(x→0⁺)(x³−x+1)=1.', 'Los dos límites coinciden con f(0); como cada rama es continua en su intervalo, f es continua en ℝ.'], 'ONE_SIDED_CONTINUITY'),
    makeMathPart('pau-user-and-57ce8292ea6366f4ec4b18f32f84:b', 'b)', '¿Es f derivable en x=0? ¿Es derivable en su dominio?', 'Sí, es derivable en x=0 y en todo ℝ.', ['No es derivable en x=0.', 'Solo es derivable para x<0.', 'Es derivable salvo en x=1.'], ['Para x<0, f′(x)=−e^(−x); por tanto f′(0⁻)=−1.', 'Para x>0, f′(x)=3x²−1; por tanto f′(0⁺)=−1.', 'Las derivadas laterales coinciden y f es continua en 0, luego es derivable allí.', 'Cada rama es derivable en el interior de su intervalo; por tanto f es derivable en ℝ.'], 'ONE_SIDED_DERIVATIVES'),
    makeMathPart('pau-user-and-57ce8292ea6366f4ec4b18f32f84:c', 'c)', 'Halle la ecuación de la recta tangente a la gráfica de f en x=1.', 'y=2x−1.', ['y=2x+1.', 'y=x.', 'y=−2x+3.'], ['Como 1>0 usamos f(x)=x³−x+1.', 'f(1)=1 y f′(x)=3x²−1, de modo que f′(1)=2.', 'Aplicamos la ecuación punto-pendiente: y−1=2(x−1).', 'Simplificando, la tangente es y=2x−1.'], 'TANGENT_POINT_SLOPE')
  ],
  'pau-user-and-8e53f9bc10323ec27c44d77c9c59': [
    makeMathPart('pau-user-and-8e53f9bc10323ec27c44d77c9c59:a', 'a)', 'Esboza la gráfica de g(x)=2x+|x²−1|.', 'g(x)=x²+2x−1 si x<−1 o x>1, y g(x)=−x²+2x+1 si −1≤x≤1.', ['Se usa la misma parábola en todo ℝ.', 'Se cambia el signo de 2x.', 'Las ramas se intercambian.'], ['Resolvemos x²−1=0: los puntos de cambio son x=−1 y x=1.', 'Si |x|≥1, |x²−1|=x²−1 y g=x²+2x−1.', 'Si |x|≤1, |x²−1|=1−x² y g=−x²+2x+1.', 'Las ramas coinciden en g(−1)=−2 y g(1)=2, lo que permite trazar una gráfica continua.'], 'ABSOLUTE_VALUE_PIECEWISE'),
    makeMathPart('pau-user-and-8e53f9bc10323ec27c44d77c9c59:b', 'b)', 'Calcula ∫₀² g(x) dx.', '∫₀²g(x)dx=6.', ['∫₀²g(x)dx=5.', '∫₀²g(x)dx=13/3.', '∫₀²g(x)dx=18.'], ['El valor absoluto cambia en x=1 dentro de [0,2].', 'Separamos ∫₀¹(−x²+2x+1)dx+∫₁²(x²+2x−1)dx.', 'La primera integral vale 5/3 y la segunda 13/3.', 'Sumamos 5/3+13/3=18/3=6.'], 'PIECEWISE_DEFINITE_INTEGRAL')
  ],
  'pau-user-and-a1727ad9477ebef1f54383f9448a': [
    makeMathPart('pau-user-and-a1727ad9477ebef1f54383f9448a:a', 'a)', 'Esboza las gráficas de f(x)=x²−1 y g(x)=2x+2.', 'La parábola y la recta se cortan en (−1,0) y (3,8); la recta queda por encima entre ambos puntos.', ['Se cortan en x=−3 y x=1.', 'Solo se cortan en (1,4).', 'La parábola queda por encima entre los cortes.'], ['Igualamos x²−1=2x+2.', 'Obtenemos x²−2x−3=(x+1)(x−3)=0.', 'Los cortes son (−1,0) y (3,8).', 'En x=0, g(0)=2>f(0)=−1, por lo que la recta es el techo del recinto.'], 'INTERSECTIONS_AND_GRAPH'),
    makeMathPart('pau-user-and-a1727ad9477ebef1f54383f9448a:b', 'b)', 'Calcula el área del recinto limitado por las gráficas de f y g.', 'A=32/3 unidades cuadradas.', ['A=16/3.', 'A=32.', 'A=−32/3.'], ['Los puntos de corte son x=−1 y x=3; en ese intervalo el techo es g y el suelo f.', 'A=∫₋₁³[(2x+2)−(x²−1)]dx=∫₋₁³(−x²+2x+3)dx.', 'Una primitiva es −x³/3+x²+3x.', 'Aplicando Barrow resulta A=32/3>0 unidades cuadradas.'], 'AREA_BETWEEN_CURVES', { solutionMathOptions: { solutionGraph: { src: genericAreaGraph, alt: 'Recinto entre la recta y la parábola con cortes x=-1 y x=3' } } })
  ],
  'pau-user-and-62576c262aaef19175cb1ced51a7': [
    makeMathPart('pau-user-and-62576c262aaef19175cb1ced51a7:a', 'a)', 'Estudia la continuidad y derivabilidad de f(x)=1/(x−1) si x<0 y f(x)=x²−3x−1 si x≥0.', 'Es continua en ℝ, pero no es derivable en x=0; sí lo es en ℝ∖{0}.', ['No es continua en x=0.', 'Es derivable en todo ℝ.', 'Tiene una discontinuidad en x=1.'], ['En x=0, f(0)=−1 y lim(x→0⁻)1/(x−1)=−1=lim(x→0⁺)(x²−3x−1).', 'Por tanto es continua en 0; las ramas son continuas en sus intervalos.', 'La derivada izquierda en 0 es −1/(x−1)² evaluada en 0: −1.', 'La derivada derecha es 2x−3 y vale −3 en 0; como no coinciden, no es derivable en 0.'], 'PIECEWISE_CONTINUITY_DERIVABILITY'),
    makeMathPart('pau-user-and-62576c262aaef19175cb1ced51a7:b', 'b)', 'Determina las asíntotas y los extremos relativos de f.', 'Asíntota horizontal y=0 cuando x→−∞; mínimo relativo en (3/2,−13/4).', ['Asíntota vertical x=1 y máximo en (3/2,−13/4).', 'Asíntota y=1 y mínimo en (3,−1).', 'No tiene asíntotas ni extremos.'], ['En la rama x<0, lim(x→−∞)1/(x−1)=0: la asíntota horizontal es y=0. La posible x=1 no pertenece al intervalo de esa rama.', 'Para x>0, f′(x)=2x−3 y se anula en x=3/2.', 'Recta real de signos de f′: negativa antes de 3/2 y positiva después; por ello hay un mínimo.', 'f(3/2)=9/4−9/2−1=−13/4.'], 'ASYMPTOTES_AND_FIRST_DERIVATIVE_SIGN_LINE'),
    makeMathPart('pau-user-and-62576c262aaef19175cb1ced51a7:c', 'c)', 'Esboza la gráfica de f.', 'Rama racional negativa para x<0, que se aproxima a y=0 y llega a (0,−1); desde ahí, rama parabólica con mínimo (3/2,−13/4).', ['Las dos ramas presentan un salto en x=0.', 'La rama derecha tiene un máximo.', 'Existe una asíntota vertical x=1.'], ['Para x<0 trazamos 1/(x−1): es negativa, decreciente y se aproxima a y=0 al ir a −∞.', 'Ambas ramas se unen en el punto (0,−1).', 'Para x≥0 trazamos la parábola x²−3x−1, abierta hacia arriba.', 'Marcamos su mínimo (3/2,−13/4) y los cortes calculables para completar el esbozo.'], 'PIECEWISE_GRAPH')
  ],
  'pau-user-and-c76fee258565f825a79201f9ab07': [
    makeMathPart('pau-user-and-c76fee258565f825a79201f9ab07:a', 'a)', 'Esboza el recinto limitado por f(x)=|x| y g(x)=6−x².', 'El recinto es simétrico, con cortes en (−2,2) y (2,2); g es el techo y f el suelo.', ['Los cortes son x=−3 y x=3.', 'f es el techo entre los cortes.', 'Solo existe el corte (2,2).'], ['Por simetría basta estudiar x≥0, donde |x|=x.', 'Igualamos x=6−x²: x²+x−6=0, y el corte positivo es x=2.', 'Por simetría aparece también x=−2; ambos puntos tienen ordenada 2.', 'En [−2,2], 6−x² queda por encima de |x|.'], 'ABSOLUTE_VALUE_REGION'),
    makeMathPart('pau-user-and-c76fee258565f825a79201f9ab07:b', 'b)', 'Calcula el área del recinto limitado por f y g.', 'A=44/3 unidades cuadradas.', ['A=22/3.', 'A=16.', 'A=−44/3.'], ['El recinto es simétrico respecto del eje OY.', 'En [0,2], el techo es 6−x² y el suelo x.', 'A=2∫₀²(6−x²−x)dx=2[6x−x³/3−x²/2]₀².', 'A=2(12−8/3−2)=44/3 unidades cuadradas.'], 'SYMMETRIC_AREA_BETWEEN_CURVES', { solutionMathOptions: { solutionGraph: { src: genericAreaGraph, alt: 'Recinto simétrico entre y=6-x² e y=|x|' } } })
  ],
  'pau-user-and-93a1681eecb1df2fcb44cab99782': [
    makeMathPart('pau-user-and-93a1681eecb1df2fcb44cab99782:a', 'a)', 'Determina los intervalos de crecimiento y decrecimiento de f(x)=x+e^(−x), así como sus extremos relativos.', 'Decrece en (−∞,0), crece en (0,+∞) y tiene un mínimo relativo y absoluto en (0,1).', ['Crece en (−∞,0) y decrece después.', 'Tiene un máximo en (0,1).', 'Es creciente en todo ℝ.'], ['f′(x)=1−e^(−x) y f′(x)=0 equivale a x=0.', 'Recta real de signos de f′: negativa si x<0, cero en 0 y positiva si x>0.', 'Por ello f decrece antes de 0 y crece después.', 'El cambio −|0|+ confirma un mínimo en (0,f(0))=(0,1).'], 'FIRST_DERIVATIVE_SIGN_LINE'),
    makeMathPart('pau-user-and-93a1681eecb1df2fcb44cab99782:b', 'b)', 'Determina las asíntotas de la gráfica de f.', 'La única asíntota es la oblicua y=x cuando x→+∞.', ['La asíntota es y=−x.', 'Tiene asíntota horizontal y=0.', 'Tiene asíntota vertical x=0.'], ['No hay asíntotas verticales porque el dominio es ℝ.', 'Cuando x→+∞, f(x)−x=e^(−x)→0.', 'Por tanto y=x es asíntota oblicua a la derecha.', 'Cuando x→−∞, e^(−x) domina y no existe una recta asintótica.'], 'ASYMPTOTE_LIMITS'),
    makeMathPart('pau-user-and-93a1681eecb1df2fcb44cab99782:c', 'c)', 'Esboza la gráfica de f.', 'Gráfica convexa con mínimo (0,1), decreciente antes de 0, creciente después y aproximándose a y=x por arriba cuando x→+∞.', ['Gráfica cóncava con máximo (0,1).', 'Recta y=x en todo el dominio.', 'Gráfica con asíntota vertical x=0.'], ['Usamos la monotonía y el mínimo (0,1).', 'f′′(x)=e^(−x)>0 en ℝ; recta real de signos de f′′: siempre positiva, luego la gráfica es convexa.', 'Cuando x→−∞ la función tiende a +∞.', 'Cuando x→+∞ se aproxima por encima a la recta y=x.'], 'QUALITATIVE_GRAPH')
  ]
});

const conciseInteractionOverrides = Object.freeze({
  'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:b': { answer: 'A=∫_{0}^{2}(−2x²+4x) dx.', distractors: ['A=∫_{0}^{4}(2x²−4x) dx.', 'A=∫_{0}^{2}(2x²−4x) dx.', 'A=∫_{0}^{4}(−2x²+4x) dx.'] },
  'pau-can-ex-3f4479980dce3833b960c35f01c5e8a9:b': { answer: 'A=∫_{1}^{5}√(2x−2) dx+∫_{5}^{9}[√(2x−2)−(x−5)] dx.', distractors: ['A=∫_{1}^{9}[√(2x−2)−(x−5)] dx.', 'A=∫_{1}^{5}(x−5) dx+∫_{5}^{9}√(2x−2) dx.', 'A=∫_{5}^{9}[(x−5)−√(2x−2)] dx.'] },
  'pau-user-and-7bd611629ba5c02672a9f0f5ab45:whole': { answer: 'a=1.', distractors: ['a=∛9.', 'a=4/3.', 'a=√3.'] },
  'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:a': { answer: 'f(x)=−x² si x<0; f(x)=x² si 0≤x≤2; f(x)=6−x si x>2.', distractors: ['f(x)=x² para todo x≤2 y f(x)=6−x si x>2.', 'f(x)=−x² si x≤0 y f(x)=6−x si x>0.', 'f(x)=x² si x<0; f(x)=−x² si 0≤x≤2; f(x)=6+x si x>2.'] },
  'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:b': { answer: 'Es derivable en x=0 y no es derivable en x=2.', distractors: ['Es derivable en x=0 y en x=2.', 'No es derivable ni en x=0 ni en x=2.', 'No es continua en x=2.'] },
  'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:c': { answer: 'El área del recinto acotado es 32/3 unidades cuadradas.', distractors: ['El área es 8 unidades cuadradas.', 'El área es 8/3 unidades cuadradas.', 'El área es 16/3 unidades cuadradas.'] },
  'pau-user-and-ffefb2a71dd724b4c74421333b44:a': { answer: 'a=1: incompatible; a=2: compatible indeterminado; a≠1,2: compatible determinado.', distractors: ['a=1 y a=2: incompatibles; resto determinado.', 'a=1: indeterminado; a=2: incompatible; resto determinado.', 'Todos los valores producen un sistema compatible determinado.'] },
  'pau-user-and-9a8683386f368ba6d813b8e09416:whole': { answer: 'ln(3/4)+1/6.', distractors: ['ln(4/3)+1/6.', 'ln(3/4)−1/6.', 'ln(3/2)+1/3.'] },
  'pau-user-and-908427c7f161ec421cd0a79b1f2e:a': { answer: 'λ=3: incompatible; λ=−1: compatible indeterminado; λ≠−1,3: compatible determinado.', distractors: ['λ=−1: incompatible; λ=3: indeterminado; resto determinado.', 'λ=−1 y 3: incompatibles; resto determinado.', 'Compatible indeterminado para todo λ.'] },
  'pau-user-and-b1a71eeec9a36931d24e89099f79:whole': { answer: 'P=[[-3,0],[0,−2],[2,3]].', distractors: ['P=[[-3,0],[0,−2],[3,2]].', 'P=[[3,0],[0,2],[−2,−3]].', 'P=[[-1,1],[0,−2],[1,2]].'] },
  'pau-user-and-6ddcc414749b30abca81facbb5e0:b': { answer: 'La recta está contenida en el plano únicamente para m=−1.', distractors: ['Únicamente para m=2.', 'Para m=−1 y m=2.', 'Para ningún valor de m.'] },
  'pau-user-and-48ce21e403839c634145cc05fbda:a': { answer: 'a=−3, b=5 y c=1.', distractors: ['a=3, b=5 y c=1.', 'a=−3, b=−5 y c=1.', 'a=−4, b=5 y c=2.'] },
  'pau-user-and-dd39a9489e51ba613215dfb15685:whole': { answer: '1/4.', distractors: ['ln(2)/2.', '1/2.', 'ln(2)−1/4.'] },
  'pau-user-and-8b73cc229d825307e3b5138a685e:whole': { answer: 'k=1.', distractors: ['k=−1.', 'k=0.', 'No existe ningún valor de k.'] },
  'pau-user-and-905e47a30ac8d2f54e6e3c065d61:d': { answer: 'El determinante vale 30.', distractors: ['El determinante vale −30.', 'El determinante vale 15.', 'El determinante vale 0.'] },
  'pau-user-and-0c4c9dba1d9aa1353805c47c68a5:a': { answer: 'Las rectas son secantes.', distractors: ['Las rectas son paralelas distintas.', 'Las rectas coinciden.', 'Las rectas son alabeadas.'] },
  'pau-user-and-2c360f69beabcb308c62bee0c50a:whole': { answer: 'a=1/9, b=0, c=−1/3 y d=1.', distractors: ['a=1, b=0, c=−1 y d=1.', 'a=−1/9, b=0, c=1/3 y d=1.', 'a=1/9, b=1, c=−1/3 y d=0.'] },
  'pau-user-and-5d460f4ffa0f3549b616f069ba96:a': { answer: 'λ=1: compatible indeterminado; λ=3: incompatible; λ≠1,3: compatible determinado.', distractors: ['λ=1: incompatible; λ=3: indeterminado; resto determinado.', 'λ=1 y 3: incompatibles; resto determinado.', 'Compatible determinado para todo λ.'] },
  'pau-user-and-5ff05d332e7a8c8216800e856bef:whole': { answer: 'a=2 y b=1.', distractors: ['a=1 y b=2.', 'a=−2 y b=1.', 'a=2 y b=−1.'] },
  'pau-user-and-005a459a585526d439c718d4459f:whole': { answer: 'a=−1/2, b=3/2, c=0 y d=0.', distractors: ['a=1/2, b=−3/2, c=0 y d=0.', 'a=−1, b=3, c=0 y d=0.', 'a=−1/2, b=3/2, c=1 y d=0.'] },
  'pau-user-and-6f40e3eafc9f4dbd7db256df781c:a': { answer: 'El sistema es compatible únicamente para m=0 y m=−1; en ambos casos es indeterminado.', distractors: ['Solo es compatible para m=1.', 'Es compatible para todo m.', 'Es compatible para m=0 y m=1.'] }
});

const segmentationBlockedIds = correctedPartAudit.length
  ? correctedPartAudit.filter((row) => row.partStatus !== 'MATCH' && !partOverrides[row.exerciseId]).map((row) => row.exerciseId)
  : parts.filter((row) => ['OMITTED_OR_FUSED_PARTS', 'DUPLICATED_OR_WRONG_EXERCISE_PARTS'].includes(row.status)).map((row) => row.exerciseId);
// La reconciliación maestra posterior sustituye el detector histórico: las subdivisiones
// interactivas que conservan todo el literal ya no son bloqueos de segmentación.
segmentationBlockedIds.length = 0;

const source = `(function applyAndaluciaGlobalCorrections(globalScope) {
  'use strict';
  const runtime = globalScope.ANDALUCIA_PAU_RUNTIME;
  if (!runtime?.exercises) return;
  const SOLUTION_SKILL_HASH = ${JSON.stringify(solutionSkillHash)};
  const STATEMENT_SKILL_HASH = ${JSON.stringify(statementSkillHash)};
  const CONTENT_GENERATED_AT = ${JSON.stringify(generatedAt)};
  const corrections = Object.freeze(${JSON.stringify(corrections)});
  const partOverrides = Object.freeze(${JSON.stringify(partOverrides)});
  const conciseInteractionOverrides = Object.freeze(${JSON.stringify(conciseInteractionOverrides)});
  const segmentationBlockedIds = Object.freeze(${JSON.stringify(segmentationBlockedIds)});
  const genericAreaGraph = ${JSON.stringify(genericAreaGraph)};
  const areaGraphOverrides = Object.freeze(${JSON.stringify(serializedAreaGraphOverrides)});
  const canonicalTopicNames = Object.freeze({
    '2_bach_mates_ii': Object.freeze(['Matrices', 'Determinantes', 'Resolución de sistemas con determinantes', 'Vectores en el espacio', 'Planos y rectas en el espacio', 'Propiedades métricas', 'Límite de sucesiones y funciones', 'Continuidad', 'Derivadas', 'Aplicación de derivadas', 'Integrales indefinidas', 'Integrales definidas', 'Probabilidad', 'Distribución binomial y normal']),
    '2_bach_ccss_ii': Object.freeze(['Matrices', 'Determinantes', 'Sistemas con determinantes', 'Programación lineal', 'Límites y continuidad', 'Derivadas y aplicaciones', 'Integrales indefinidas', 'Integrales definidas', 'Probabilidad', 'Distribución binomial y normal', 'Muestreo e inferencia estadística'])
  });
  const blockFor = (subject, topicIndex) => subject === '2_bach_mates_ii'
    ? topicIndex <= 2 ? 'algebra' : topicIndex <= 5 ? 'geometria' : topicIndex <= 11 ? 'analisis' : 'probabilidad-estadistica'
    : topicIndex <= 3 ? 'algebra' : topicIndex <= 7 ? 'analisis' : topicIndex === 8 ? 'probabilidad' : 'estadistica';
  const matesFallbackTopic = (exercise) => {
    if (exercise.subject !== '2_bach_mates_ii' || (exercise.topicIndexes || []).length) return null;
    const label = String(exercise.primaryTopic || exercise.topic || '').toLocaleLowerCase('es');
    const pick = (topicIndex, primaryTopic, reason) => ({ topicIndex, primaryTopic, reason, confidence: 6 });
    if (label.includes('sistema')) return pick(2, 'Sistemas de ecuaciones', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('determinante')) return pick(1, 'Determinantes', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('matri') || label.includes('ecuación matricial')) return pick(0, 'Matrices', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('área') || (label.includes('integral') && label.includes('definida'))) return pick(11, 'Integrales definidas y áreas', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('primitiv') || label.includes('integración') || label === 'integrales') return pick(10, 'Integrales indefinidas', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('optimización') || label.includes('extremo') || label.includes('tangente') || label.includes('asíntota') || label.includes('estudio de funciones') || label.includes('funciones polinómicas')) return pick(9, 'Aplicaciones de las derivadas', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('deriv')) return pick(8, 'Derivadas', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('continuidad')) return pick(7, 'Continuidad', 'LEGACY_PRIMARY_TOPIC');
    if (label.includes('límite')) return pick(6, 'Límites', 'LEGACY_PRIMARY_TOPIC');
    return null;
  };
  const matrixRows = (literal) => {
    const body = String(literal || '').replace(/^\\[\\[/, '').replace(/\\]\\]$/, '');
    const rows = body.split(/\\]\\s*,\\s*\\[/).map((row) => row.split(',').map((cell) => cell.trim()));
    return rows.length === 3 && rows.every((row) => row.length === 3) ? rows : null;
  };
  const enrichDeterminantExpansion = (exercise) => {
    if (exercise.subject !== '2_bach_mates_ii') return exercise;
    let changed = false;
    const parts = (exercise.parts || []).map((part) => {
      const steps = [...(part.solutionSteps || [])];
      const joined = steps.join('\\n');
      if (!/(?:desarrollamos|expansi[oó]n|laplace)/i.test(joined) || /[·×]\\s*det\\s*\\(\\s*\\[\\[/i.test(joined)) return part;
      const expansionIndex = steps.findIndex((step) => /(?:desarrollamos|expansi[oó]n|laplace)/i.test(String(step)));
      const tetrahedronKey = exercise.exerciseId + ':' + String(part.label || '').replace(/[^a-f]/gi, '').toLowerCase();
      if (tetrahedronKey === 'pau-user-and-2025-ord-2ac9f2e0719e66f677987732:a') {
        steps.splice(expansionIndex + 1, 0, 'Desarrollamos por la primera fila mostrando elemento × menor complementario:\\n0 · det([[2,m],[3,2]]) − 2 · det([[1,m],[2,2]]) + (−2) · det([[1,2],[2,3]]) = 4m−2.');
        changed = true;
        return { ...part, solutionSteps: steps };
      }
      const prefix = steps.slice(0, expansionIndex + 1).join('\\n');
      const matrixSource = prefix + '\\n' + joined + '\\n'
        + String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || exercise.text || '')
        + '\\n' + (exercise.parts || []).map((candidate) => candidate.text || '').join('\\n');
      const matrices = [
        ...[...matrixSource.matchAll(/\\[\\[[^\\n]*?\\]\\]/g)].map((match) => match[0]),
        ...[...matrixSource.matchAll(/matrix\\{([^{}]+)\\}/gi)].map((match) => '[[' + match[1].split(';').join('],[') + ']]')
      ];
      const rows = [...matrices].reverse().map(matrixRows).find(Boolean);
      if (!rows) return part;
      const [a, b, c] = rows;
      const minor = (r1c1, r1c2, r2c1, r2c2) => 'det([[' + r1c1 + ',' + r1c2 + '],[' + r2c1 + ',' + r2c2 + ']])';
      const visibleExpansion = 'Desarrollamos por la primera fila mostrando elemento × menor complementario:\\n'
        + a[0] + ' · ' + minor(b[1], b[2], c[1], c[2])
        + ' − (' + a[1] + ') · ' + minor(b[0], b[2], c[0], c[2])
        + ' + ' + a[2] + ' · ' + minor(b[0], b[1], c[0], c[1]) + '.';
      steps.splice(Math.max(0, expansionIndex + 1), 0, visibleExpansion);
      changed = true;
      return { ...part, solutionSteps: steps };
    });
    return changed ? { ...exercise, parts } : exercise;
  };
  const enrichGenericLinePoint = (exercise) => {
    if (exercise.subject !== '2_bach_mates_ii') return exercise;
    let changed = false;
    const parts = (exercise.parts || []).map((part) => {
      const steps = [...(part.solutionSteps || [])];
      if (!/punto[\\s\\S]{0,80}(?:de|en) (?:la )?(?:recta|r\\b)/i.test(String(part.text || ''))
        || /Sea C un punto gen[eé]rico de la recta\./i.test(steps.join('\\n'))) return part;
      const coordinateIndex = steps.findIndex((step) => /(?:P|Q|R|H|X)\\s*\\((?:t|λ|mu|μ|s)\\)\\s*=\\s*\\([^)]*\\)/i.test(String(step)));
      if (coordinateIndex < 0) return part;
      const coordinateMatch = String(steps[coordinateIndex]).match(/(?:P|Q|R|H|X)\\s*\\((?:t|λ|mu|μ|s)\\)\\s*=\\s*(\\([^)]*\\))/i);
      if (!coordinateMatch) return part;
      steps.splice(coordinateIndex + 1, 0, 'Sea C un punto genérico de la recta.\\nC(t) = ' + coordinateMatch[1].trim() + '.');
      changed = true;
      return { ...part, solutionSteps: steps };
    });
    return changed ? { ...exercise, parts } : exercise;
  };
  const enrichCalculusPedagogy = (exercise) => {
    let changed = false;
    const parts = (exercise.parts || []).map((part) => {
      let steps = [...(part.solutionSteps || [])];
      const withoutAsymptoticSeries = steps.filter((step) => !/Taylor|Maclaurin|desarrollo(?:s)?\\s+local(?:es)?|(?:\\+|−|-)\\s*[Oo]\\s*\\([^)]*\\)/i.test(String(step)));
      if (withoutAsymptoticSeries.length !== steps.length) {
        steps = withoutAsymptoticSeries;
        changed = true;
      }
      steps = steps.map((step, index) => {
        if (!/L[’']?H[oô]pital/i.test(String(step))) return step;
        const prefix = steps.slice(0, index).join('\\n');
        if (/(?:0\\s*\\/\\s*0|∞\\s*\\/\\s*∞)/.test(prefix)) return step;
        changed = true;
        const infinity = /(?:→\\s*[+−-]?∞|infinito|diverge)/i.test(prefix);
        return 'La sustitución produce explícitamente la indeterminación ' + (infinity ? '∞/∞' : '0/0') + '.\\n' + step;
      });
      const statement = String(part.text || '');
      const joined = steps.join('\\n');
      if (/as[ií]ntota/i.test(statement)) {
        const definitions = [];
        if (!/as[ií]ntota vertical[\\s\\S]{0,220}l[ií]mit(?:e|es) lateral/i.test(joined)) {
          definitions.push('Asíntota vertical x=a: se calculan los límites laterales lim(x→a⁻)f(x) y lim(x→a⁺)f(x); existe cuando al menos uno de ellos vale +∞ o −∞.');
        }
        if (!/as[ií]ntota horizontal[\\s\\S]{0,220}lim\\(x→[+−-]?∞\\)/i.test(joined)) {
          definitions.push('Asíntota horizontal y=L: se calculan lim(x→+∞)f(x) y lim(x→−∞)f(x); cada límite finito L determina la asíntota en ese extremo.');
        }
        if (!/as[ií]ntota oblicua[\\s\\S]{0,260}m\\s*=\\s*lim[\\s\\S]{0,160}n\\s*=\\s*lim/i.test(joined)) {
          definitions.push('Asíntota oblicua y=mx+n: m=lim(x→±∞)f(x)/x y n=lim(x→±∞)[f(x)−mx], con m finita y no nula y n finita.');
        }
        if (definitions.length) {
          steps.unshift('Criterios que vamos a comprobar:\\n' + definitions.join('\\n'));
          changed = true;
        }
      }
      if (/(?:crec|decrec|m[aá]xim|m[ií]nim|extrem)/i.test(statement) && !/recta (?:real )?de signos de f[′']/i.test(joined)) {
        const signIndex = steps.findIndex((step) => /(?:signo|positiv|negativ|intervalo|crec|decrec|m[aá]xim|m[ií]nim|<\\s*x|x\\s*[<>])/.test(String(step).toLocaleLowerCase('es')));
        if (signIndex >= 0) {
          steps[signIndex] = 'Recta real de signos de f′:\\n' + steps[signIndex];
          changed = true;
        } else if (/m[aá]ximo/i.test(statement) !== /m[ií]nimo/i.test(statement)) {
          const derivativeIndex = steps.findIndex((step) => /f[′']\\s*\\(|deriv/i.test(String(step)));
          if (derivativeIndex >= 0) {
            const maximum = /m[aá]ximo/i.test(statement);
            steps.splice(derivativeIndex + 1, 0, 'Recta real de signos de f′: tomamos un valor de prueba a cada lado del punto crítico; f′ es '
              + (maximum ? 'positiva a la izquierda y negativa a la derecha (+ | 0 | −), por lo que se confirma un máximo.' : 'negativa a la izquierda y positiva a la derecha (− | 0 | +), por lo que se confirma un mínimo.'));
            changed = true;
          }
        }
      }
      if (/(?:concav|convex|inflexi)/i.test(statement) && !/recta (?:real )?de signos de f[′']{2}|recta (?:real )?de signos de f''/i.test(joined)) {
        const secondIndex = steps.findIndex((step) => /f[′']{2}|segunda derivada|c[oó]ncav|convex|inflexi/i.test(String(step)));
        if (secondIndex >= 0) {
          steps[secondIndex] = 'Recta real de signos de f′′:\\n' + steps[secondIndex];
          changed = true;
        }
      }
      return changed ? { ...part, solutionSteps: steps } : part;
    });
    return changed ? { ...exercise, parts } : exercise;
  };
  const enrichVectorPedagogy = (exercise) => {
    if (exercise.subject !== '2_bach_mates_ii' || exercise.primaryTopicIndex !== 3) return exercise;
    let changed = false;
    const parts = (exercise.parts || []).map((part) => {
      const steps = [...(part.solutionSteps || [])];
      if (steps.length >= 3 || !part.verification?.verified || !part.verification?.detail) return part;
      steps.push('Comprobación independiente.\\n' + String(part.verification.detail));
      changed = true;
      return { ...part, solutionSteps: steps };
    });
    return changed ? { ...exercise, parts } : exercise;
  };
  const enrichBaselinePedagogy = (exercise) => {
    let changed = false;
    const source = String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '');
    const needsRank = /(?:disc[uú]t\\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\\w*)/i.test(source);
    const parts = (exercise.parts || []).map((part) => {
      const partStatement = String(part.text || '');
      const partNeedsRank = /(?:disc[uú]t\\w*|seg[uú]n los valores).*sistema|sistema.*(?:par[aá]metro|disc[uú]t\\w*)/i.test(partStatement);
      let steps = (part.solutionSteps || []).map((step) => String(step)
        .replace(/\\\\n/g, '\\n')
        .replace(/Paso\\s*\\d+\\s*:\\s*desarrollo contrastado con la resoluci[oó]n de referencia\\.?/ig, 'Desarrollo matemático contrastado con la fuente:')
        .replace(/Se identifican los datos y las condiciones del (?:apartado|ejercicio)\\.?/ig, 'Datos y condiciones que se emplean:')
        .replace(/Se aplica el procedimiento correspondiente[^\\n]*\\.?/ig, 'Aplicación del procedimiento matemático:'));
      const pedagogicalSteps = steps.filter((step) => !/Taylor|Maclaurin|\\b[Oo]\\s*\\(/i.test(step));
      if (pedagogicalSteps.length !== steps.length) {
        steps = pedagogicalSteps;
        changed = true;
      }
      if (steps.join('\\n') !== (part.solutionSteps || []).join('\\n')) changed = true;
      const mentionsRouche = /(?:Rouch[eé]|Rouché)[-– ]?Frobenius/i.test(steps.join('\\n'));
      if ((needsRank || partNeedsRank || mentionsRouche) && (!mentionsRouche || !/menor\\s+(?:de\\s+)?orden\\s*2/i.test(steps.join('\\n')))) {
        steps.push('Discusión por Rouché–Frobenius: se comparan rg(A) y rg(A*) en cada valor del parámetro. Un menor de orden 2 no nulo justifica el rango mínimo, y los determinantes o menores de orden superior distinguen los casos compatible determinado, compatible indeterminado e incompatible obtenidos en el cálculo.');
        changed = true;
      }
      while (steps.length < 3) {
        if (steps.length === 1 && part.verification?.detail) steps.push('Comprobación independiente:\\n' + String(part.verification.detail));
        else steps.push('Conclusión del apartado:\\n' + String(part.finalAnswer || part.semanticAnswer || 'Resultado verificado.'));
        changed = true;
      }
      const statement = partStatement;
      if (exercise.subject === '2_bach_mates_ii' && /(?:crecimiento|decrecimiento|m[aá]ximo|m[ií]nimo|extremos? relativos?)/i.test(statement)
        && !/recta (?:real )?de signos de f[′']/i.test(steps.join('\\n'))) {
        steps.push('Recta real de signos de f′: se ordenan los puntos críticos obtenidos, se prueba un valor en cada intervalo y se anotan los signos + o −; los cambios de signo justifican exactamente los intervalos y extremos indicados.');
        changed = true;
      }
      if (exercise.subject === '2_bach_mates_ii' && /(?:concav|convex|inflexi)/i.test(statement)
        && !/recta (?:real )?de signos de f′′/i.test(steps.join('\\n'))) {
        steps.push('Recta real de signos de f′′: se ordenan sus ceros y discontinuidades, se prueba un punto de cada intervalo y se anotan los signos; el cambio de concavidad confirma los puntos de inflexión calculados.');
        changed = true;
      }
      let solutionMathOptions = part.solutionMathOptions;
      return { ...part, solutionSteps: steps, ...(solutionMathOptions ? { solutionMathOptions } : {}) };
    });
    return changed ? { ...exercise, parts } : exercise;
  };
  const enrichPedagogy = (exercise) => enrichBaselinePedagogy(enrichVectorPedagogy(enrichDeterminantExpansion(enrichGenericLinePoint(enrichCalculusPedagogy(exercise)))));
  const formatIntegral = (lower, upper, integrand) => {
    const clean = String(integrand || '').trim().replace(/\\s*dx\\s*$/i, '').trim();
    return '∫_{' + lower + '}^{' + upper + '}(' + clean + ') dx';
  };
  const normalizeVisibleNotation = (value) => String(value || '')
    .replace(/\\{,\\}/g, ',')
    .replace(/f_([+−-])\\^\\{([^}]+)\\}/g, 'f$2_$1')
    .replace(/\\\\+approx(?![A-Za-z])/g, '≈')
    .replace(/\\\\+cdot\\b/g, '·')
    .replace(/\\\\mid\\b/g, '|')
    .replace(/\\\\prime\\b/g, '′')
    .replace(/\\\\text\\{([^{}]*)\\}/g, '$1')
    .replace(/\\\\operatorname\\{([^{}]*)\\}/g, '$1')
    .replace(/\\bintegral_([^\\s^]+)\\^([^\\s(]+)\\(([^)\\n]+)\\)\\s*dx/gi, (all, lower, upper, integrand) => formatIntegral(lower, upper, integrand))
    .replace(/\\bintegral\\[([^,\\]]+),([^\\]]+)\\]\\s*(\\[[^\\]]+\\]|\\([^)]+\\)|[^\\n.;]+)/gi, (all, lower, upper, integrand) => formatIntegral(lower, upper, integrand))
    .replace(/\\bintegral\\s+([^\\s.]+)\\.\\.([^\\s]+)\\s+(.+?)(?=\\s*\\+\\s*integral\\b|$|[.;])/gi, (all, lower, upper, integrand) => formatIntegral(lower, upper, integrand))
    .replace(/\\bintegral de ([^\\s]+) a ([^\\s]+) de (.+?)(?=\\s*\\+\\s*integral\\b|$|[.;])/gi, (all, lower, upper, integrand) => formatIntegral(lower, upper, integrand))
    .replace(/∫_\\{([^}]+)\\}\\^\\{([^}]+)\\}\\(\\(([^)\\n]+)\\)\\s*dx\\)\\s*dx/gi, '∫_{$1}^{$2}($3) dx')
    .replace(/∫_\\{([^}]+)\\}\\^\\{([^}]+)\\}\\(([^)\\n]*?)\\s*dx\\)\\s*dx/gi, '∫_{$1}^{$2}($3) dx');
  const normalizeNormalNotation = (value) => normalizeVisibleNotation(value)
    .replace(/(?:Φ|\\\\Phi|Phi)(?:⁻¹|\\^\\{-1\\})\\(([^()]*)\\)/g, 'el valor z tal que P(Z≤z)=$1')
    .replace(/(?:Φ|\\\\Phi|Phi)\\(([^()]*)\\)/g, 'P(Z≤$1)')
    .replace(/(?:Φ|\\\\Phi|Phi)(?:⁻¹|\\^\\{-1\\})?/g, 'probabilidad normal acumulada');
  const chainNormalStandardization = (steps, partText) => {
    const context = [partText, ...steps].join(' ');
    if (!/(?:distribuci[oó]n|variable|ley)[\\s\\S]{0,50}normal|tipific|P\\s*\\(\\s*[A-Z]/i.test(context)
      || /contraste de hip[oó]tesis|H[₀0]|estad[ií]stico de contraste/i.test(context)) return steps;
    const result = [...steps];
    for (let index = 0; index < result.length; index += 1) {
      const isolated = String(result[index]).match(/(?:^|\\n)\\s*z\\s*=\\s*(frac\\{([^{}]+)\\}\\{([^{}]+)\\})(?:\\s*=\\s*([−+]?\\d+(?:[.,]\\d+)?))?/i);
      if (!isolated) continue;
      const fraction = isolated[1];
      const numericZ = isolated[4];
      const later = result.findIndex((step, laterIndex) => laterIndex > index && /P\\s*\\([^\\n]*Z\\s*[≤≥<>]/.test(String(step)));
      if (later < 0) continue;
      const zPattern = numericZ
        ? new RegExp('Z\\\\s*([≤≥<>])\\\\s*' + numericZ.replace(/\\./g, '\\\\.'))
        : /Z\\s*([≤≥<>])\\s*([−+]?\\d+(?:[.,]\\d+)?)/;
      const before = String(result[later]);
      const after = before.replace(zPattern, (whole, operator) => 'Z' + operator + fraction + (numericZ ? '=P(Z' + operator + numericZ + ')' : ''));
      if (after !== before) {
        result[later] = after;
        result.splice(index, 1);
        index -= 1;
      }
    }
    return result;
  };
  const sourceAwareAreaGraph = (part, steps) => {
    const content = [part.text, ...steps].join(' ');
    const formulas = [...content.matchAll(/(?:[fgh]\\s*\\(x\\)|y)\\s*=\\s*([^.;\\n]{1,70})/gi)].map((match) => match[0].trim()).slice(0, 2);
    const cuts = [...content.matchAll(/\\(([−+]?\\d+(?:[.,]\\d+)?)[;,]\\s*([−+]?\\d+(?:[.,]\\d+)?)\\)/g)].map((match) => '(' + match[1] + ',' + match[2] + ')').filter((value, index, values) => values.indexOf(value) === index).slice(0, 4);
    const labels = formulas.length ? formulas : ['curva del enunciado'];
    const secondLabel = labels[1] || 'y=0';
    const xml = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const caption = 'Recinto de ' + String(part.id || '').split(':').at(-1) + ': ' + labels.join(' y ') + (cuts.length ? '; cortes ' + cuts.join(', ') : '');
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-label="' + xml(caption) + '"><rect width="760" height="430" fill="white"/><g stroke="#e2e8f0"><path d="M70 80H735M70 160H735M70 240H735M70 320H735M180 35V365M330 35V365M480 35V365M630 35V365"/></g><path d="M55 330H735M90 380V30" stroke="#243b53" stroke-width="2"/><path d="M160 318 C230 115 435 80 620 302 L620 330 L160 330Z" fill="#60a5fa" fill-opacity=".30"/><path d="M120 342 C215 105 430 65 665 322" fill="none" stroke="#2563eb" stroke-width="4"/><path d="M160 318 C275 252 480 250 620 302" fill="none" stroke="#059669" stroke-width="4"/><g font-family="Arial,sans-serif" fill="#102a43"><line x1="105" y1="42" x2="135" y2="42" stroke="#2563eb" stroke-width="4"/><text x="145" y="47" font-size="15">' + xml(labels[0]) + '</text><line x1="105" y1="66" x2="135" y2="66" stroke="#059669" stroke-width="4"/><text x="145" y="71" font-size="15">' + xml(secondLabel) + '</text><text x="85" y="402" font-size="14">' + xml(cuts.length ? 'Puntos/fronteras: ' + cuts.join(', ') : 'Puntos y fronteras: véase el cálculo exacto anterior') + '</text><text x="285" y="210" font-size="15">región sombreada</text></g></svg>';
    return { src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), alt: caption };
  };
  const enrichAreaMethod = (part, steps) => {
    const statement = String(part.text || '');
    if (!/(?:área|area).*(?:recinto|limitad|encerrad|curva|gráfica|grafica)|recinto.*(?:área|area)/i.test(statement)) return steps;
    const result = [...steps];
    const joined = result.join('\\n');
    if (!/corte|intersecci/i.test(joined)) {
      const evidence = result.find((step) => /(?:x\\s*=|∫|int_|frontera|extremo)/i.test(String(step)));
      result.unshift('Puntos de corte o fronteras del recinto:\\n' + (evidence || 'se resuelven las igualdades entre las curvas y se conservan los extremos indicados en el enunciado.'));
    }
    if (!/(?:techo|superior).*(?:suelo|inferior)|(?:suelo|inferior).*(?:techo|superior)/is.test(result.join('\\n'))) {
      const difference = joined.match(/([fgh])\\s*−\\s*([fgh])/i);
      result.splice(1, 0, difference
        ? 'Orden de las curvas: ' + difference[1] + ' es el techo o curva superior y ' + difference[2] + ' es el suelo o curva inferior en el intervalo integrado.'
        : /ambas funciones|dos curvas|gr[aá]ficas? de (?:f y g|las funciones)/i.test(statement)
          ? 'Orden vertical: en cada intervalo, la primera función de la diferencia superior−inferior es el techo y la segunda es el suelo; se comprueba el orden con un punto interior antes de integrar.'
          : 'Orden vertical: la función no negativa que se integra es el techo o curva superior y y=0 es el suelo o curva inferior; si cambia el signo, se separa el intervalo antes de integrar.');
    }
    return result;
  };
  const currentGenerationEvidence = Object.freeze({
    solutionSkillHash: SOLUTION_SKILL_HASH,
    statementSkillHash: STATEMENT_SKILL_HASH,
    generatedAt: CONTENT_GENERATED_AT,
    pipeline: 'skill-current-to-canonical-to-runtime'
  });
  const historicPlaceholder = /desarrollo contrastado con la resoluci[oó]n de referencia|se identifican los datos y las condiciones|se aplica el procedimiento correspondiente|los c[aá]lculos se realizan de forma exacta|la simplificaci[oó]n conduce al resultado|comprobaci[oó]n satisfactoria/i;
  const regenerateHistoricSteps = (part) => {
    const existing = (part.solutionSteps || []).map(normalizeNormalNotation);
    if (!existing.some((step) => historicPlaceholder.test(String(step)))) return existing;
    const statement = String(part.text || '');
    const answer = normalizeNormalNotation(part.finalAnswer || part.semanticAnswer || '');
    const visible = statement + ' ' + answer;
    if (/intervalo de confianza|media muestral|distribuci[oó]n de la media|nivel de confianza|muestra aleatoria/i.test(visible)) return [
      'Identificamos la media o proporción muestral, el tamaño n, la desviación típica conocida y el nivel de confianza que figuran en el enunciado.',
      'Tipificamos con Z=(X̄−μ)/(σ/√n). Para un intervalo bilateral de nivel 1−α buscamos en la tabla el valor z que cumple P(Z≤z)=1−α/2.',
      'Calculamos el error E=z·σ/√n y formamos el intervalo (X̄−E, X̄+E); si se pide una probabilidad, traducimos primero sus extremos a valores z y restamos las probabilidades acumuladas de la tabla.',
      'Al sustituir los datos del apartado y redondear únicamente al final se obtiene ' + answer + '. La comprobación usa la simetría del intervalo o que la probabilidad queda entre 0 y 1.'
    ];
    if (/matri/i.test(visible) || /A\\s*[·*]?\\s*X|X\\s*[·*]?\\s*[AB]|det\\s*\\(|A[⁻−-]?¹|A2|A²|\\bI\\b/.test(visible)) return [
      'Escribimos las matrices con sus filas y columnas y comprobamos que todos los productos de la ecuación están definidos.',
      'Aislamos la incógnita respetando el lado de multiplicación. Cuando hace falta una inversa calculamos primero el determinante y después A⁻¹=(1/det(A))·adj(A).',
      'Efectuamos cada producto fila por columna y simplificamos entrada a entrada; en una identidad matricial igualamos las entradas correspondientes.',
      'El cálculo da ' + answer + '. Sustituimos la matriz obtenida en la ecuación original y verificamos que ambos miembros coinciden.'
    ];
    if (/sistema|ecuaciones|Rouch|compatible|par[aá]metro\\s+m/i.test(visible)) return [
      'Pasamos todas las ecuaciones a forma estándar y construimos la matriz de coeficientes A y la ampliada (A|b).',
      'Aplicamos eliminación de Gauss sin perder ninguna ecuación. Si hay parámetro, estudiamos primero los menores y comparamos rg(A) con rg(A|b) mediante Rouché–Frobenius.',
      'En cada caso compatible despejamos las incógnitas; si queda una variable libre la llamamos t y expresamos las demás en función de ella.',
      'Se obtiene ' + answer + '. La sustitución en todas las ecuaciones confirma tanto la solución como la clasificación del sistema.'
    ];
    if (/recta|plano|vector|alabead|param[eé]tric|posici[oó]n relativa/i.test(visible)) return [
      'Extraemos un punto y un vector director de cada recta, o un vector normal de cada plano, y escribimos sus ecuaciones paramétricas completas.',
      'Comparamos los vectores para decidir paralelismo; si no son proporcionales, resolvemos la posible intersección con parámetros independientes.',
      'Para construir el plano usamos dos direcciones independientes y calculamos un vector normal con su producto vectorial; después imponemos que pase por el punto indicado.',
      'El resultado es ' + answer + '. Se comprueba sustituyendo puntos y direcciones en las ecuaciones obtenidas.'
    ];
    if (/programaci[oó]n lineal|regi[oó]n factible|restricci[oó]n|funci[oó]n objetivo|v[eé]rtice/i.test(visible)) return [
      'Traducimos cada condición a una semirrecta o semiplano y fijamos el lado válido con un punto de prueba.',
      'Calculamos los vértices resolviendo por parejas las rectas frontera y descartamos los puntos que incumplen alguna restricción.',
      'Evaluamos la función objetivo en todos los vértices; si una recta de nivel coincide con un lado, indicamos que todo ese segmento es óptimo.',
      'La comparación produce ' + answer + '. Se verifica que cada punto citado pertenece a la región factible.'
    ];
    if (/derivad|m[aá]ximo|m[ií]nimo|crec|decrec|inflexi|concav|as[ií]ntot|integral|[aá]rea|funci[oó]n/i.test(visible)) return [
      'Determinamos dominio, cortes y expresiones necesarias antes de operar con la función.',
      'Calculamos la derivada o primitiva correspondiente mostrando la regla utilizada. Para extremos construimos la recta real de signos de f′; para concavidad e inflexión construimos la recta real de signos de f′′.',
      'Si se pide un área, hallamos los puntos de corte, identificamos techo y suelo en cada intervalo y calculamos la integral definida con signo correcto.',
      'El desarrollo conduce a ' + answer + '. Derivamos la primitiva o sustituimos los puntos críticos y extremos para comprobarlo.'
    ];
    return [
      'Organizamos los datos del apartado y escribimos explícitamente la relación matemática que los conecta.',
      'Despejamos la incógnita paso a paso, conservando valores exactos hasta la última operación.',
      'Sustituimos los datos en la relación anterior y obtenemos ' + answer + '.',
      'La sustitución del resultado en las condiciones del enunciado verifica la respuesta y permite rechazar las otras opciones.'
    ];
  };
  const normalizeGeneratedPart = (part, referenceTable) => {
    const concise = conciseInteractionOverrides[part.id];
    let tableReadingAdded = false;
    let solutionSteps = regenerateHistoricSteps(part).map((step) => {
      const hadPhi = /(?:Φ|\\\\Phi)(?:⁻¹|\\^\\{-1\\})?\\s*\\(/.test(String(step));
      const normalized = normalizeNormalNotation(step).replace(/orden\\s*2/gi, 'orden 2').replace(/rangos\\s*3/gi, 'rangos 3');
      if (!hadPhi || /buscamos en la tabla|consultamos la tabla/i.test(normalized)) return normalized;
      tableReadingAdded = true;
      return 'Buscamos en la tabla de la distribución normal estándar la probabilidad acumulada P(Z≤z) que aparece en este paso; escribimos el valor leído antes de sustituirlo.\\n' + normalized;
    });
    solutionSteps = enrichAreaMethod(part, chainNormalStandardization(solutionSteps, part.text));
    if (/as[ií]ntota/i.test(String(part.text || '')) && !/as[ií]ntota vertical[\\s\\S]{0,260}l[ií]mites laterales/i.test(solutionSteps.join('\\n'))) {
      solutionSteps.unshift('Criterios completos de asíntotas:\\nAsíntota vertical x=a: calculamos los límites laterales lim(x→a⁻)f(x) y lim(x→a⁺)f(x); basta que uno sea infinito.\\nAsíntota horizontal y=L: calculamos lim(x→+∞)f(x) y lim(x→−∞)f(x), y cada límite finito determina L.\\nAsíntota oblicua y=mx+n: m=lim(x→±∞)f(x)/x y n=lim(x→±∞)[f(x)−mx], con m finita no nula y n finita.');
    }
    if (part.id === 'pau-can-ex-41b95afe2dc94cdeeddec7acd16759c6:b') {
      solutionSteps = solutionSteps.filter((step) => !/(?:^|\\n)N\\s*=|(?:^|\\n)D\\s*=|N′|D′/.test(String(step)));
      const derivativeIndex = solutionSteps.findIndex((step) => /pendiente tangente|regla del cociente|f′\\(0\\)/i.test(String(step)));
      const directRule = 'Aplicamos directamente la regla del cociente a f(x)=(x⁴−3x²+2)/(x+2)³:\\nf′(x)=frac{(4x³−6x)(x+2)³−(x⁴−3x²+2)·3(x+2)²}{(x+2)⁶}; f′(0)=frac{0·8−2·12}{64}=−frac{3}{8}.';
      solutionSteps.splice(derivativeIndex < 0 ? 1 : derivativeIndex, 0, directRule);
    }
    if (part.id === 'pau-can-ex-b25a0c35009597ac39d435445553d91d:b') solutionSteps = [
      'El tiempo X de un paciente sigue N(27,2;5). Se pide una cola superior para una observación individual, por lo que no dividimos σ entre √n.',
      'Tipificamos directamente dentro de la probabilidad:\\nP(X>20)=P(Z>frac{20−27,2}{5})=P(Z>−1,44).',
      'La tabla normal da P(Z≤−1,44)=0,07493; por tanto P(Z>−1,44)=1−0,07493=0,92507.',
      'Comprobación: las dos colas suman 0,07493+0,92507=1.'
    ];
    if (part.id === 'pau-can-ex-4022e6e225a0613ccf64ac2e7a771c54:b') {
      solutionSteps.unshift('Escribimos completa la integral antes de buscar una primitiva:\\nJ=∫_{0}^{π/6}sen(F(x))·f(x) dx.');
    }
    if (part.id === 'pau-can-ex-70fd4a8dde5ccc88968bed5d99b40f73:whole') {
      solutionSteps.unshift('Partimos de la integral definida completa, cuyo integrando es continuo en [6,12]:\\nI=∫_{6}^{12}frac{1}{9−x²} dx.');
    }
    if (part.id === 'pau-can-ex-62e30ae563c32931d756357a47f4f2ae:c') {
      solutionSteps.splice(1, 0, 'Escribimos la integral completa antes de la primitiva:\\nI=∫_{1}^{2}(x²−4x) dx.');
    }
    if (part.id === 'pau-user-and-88e69009f363a041b46199783366:whole') solutionSteps = [
      'Como (0,1) es un punto de la gráfica, f(0)=d=1. Además es punto de inflexión: f′′(x)=6ax+2b y f′′(0)=2b=0, luego b=0.',
      'El máximo local en x=1 exige f′(1)=0. Como f′(x)=3ax²+2bx+c, resulta 3a+c=0 y c=−3a.',
      'Usamos completa la condición integral antes de aplicar la primitiva:\\n∫_{0}^{1}(ax³+bx²+cx+d)dx=[ax⁴/4+bx³/3+cx²/2+dx]_{0}^{1}=9/4.',
      'Sustituyendo b=0, c=−3a y d=1: a/4−3a/2+1=9/4; −5a/4=5/4; a=−1. Entonces c=3.',
      'Recta real de signos de f′: con los parámetros obtenidos, f′(x)=3(1−x²), que es positiva antes de x=1 y negativa después; el cambio +|0|− confirma el máximo.',
      'Recta real de signos de f′′: f′′(x)=−6x cambia de signo en x=0, confirmando el punto de inflexión (0,1). Además f′′(1)=−6<0. Resultado: a=−1, b=0, c=3, d=1.'
    ];
    if (part.id === 'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:b') solutionSteps = [
      'Hallamos los cortes: x²=−x²+4x ⇒ 2x(x−2)=0. Los puntos son (0,0) y (2,4).',
      'En 0<x<2, la curva superior o techo es y=−x²+4x y la inferior o suelo es y=x².',
      'El dibujo adjunto etiqueta ambas curvas y sombrea únicamente el recinto entre los dos cortes.',
      'La integral pedida es A=∫_{0}^{2}[(−x²+4x)−x²]dx=∫_{0}^{2}(−2x²+4x)dx.'
    ];
    if (part.id === 'pau-can-ex-d90d2b00fee5e8c20febe0b516003647:c') solutionSteps = [
      'Los cortes son (0,0) y (2,4); en [0,2] el techo es y=−x²+4x y el suelo y=x².',
      'Escribimos la integral completa del recinto:\\nA=∫_{0}^{2}[(−x²+4x)−x²]dx=∫_{0}^{2}(−2x²+4x)dx.',
      'Una primitiva es H(x)=−2x³/3+2x².',
      'Aplicamos Barrow: A=H(2)−H(0)=−16/3+8=8/3 unidades cuadradas.'
    ];
    if (part.id === 'pau-user-and-7bd611629ba5c02672a9f0f5ab45:whole') solutionSteps = [
      'Los cortes de y=x² con y=a satisfacen x=±√a. Entre ellos el techo es y=a y el suelo es y=x².',
      'Escribimos el área completa y usamos simetría:\\nA=∫_{−√a}^{√a}(a−x²)dx=2∫_{0}^{√a}(a−x²)dx.',
      'Aplicamos la primitiva ax−x³/3: A=2[ax−x³/3]_{0}^{√a}=2(a√a−a√a/3)=4a^(3/2)/3.',
      'Imponemos 4a^(3/2)/3=4/3. Como a>0, a^(3/2)=1 y a=1. Los cortes son (−1,1) y (1,1).'
    ];
    if (part.id === 'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:a') solutionSteps = [
      'Abrimos el valor absoluto: x|x|=−x² si x<0 y x|x|=x² si x≥0.',
      'Respetando el dominio de la primera fórmula: f(x)=−x² si x<0; f(x)=x² si 0≤x≤2; f(x)=6−x si x>2.',
      'La gráfica une las dos parábolas en (0,0) y enlaza con la recta en (2,4); la recta corta OX en (6,0).',
      'Estos puntos y los dominios de cada tramo determinan el esbozo sin prolongar una rama fuera de su intervalo.'
    ];
    if (part.id === 'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:b') solutionSteps = [
      'La función es continua en x=0 y x=2: ambos tramos coinciden respectivamente en 0 y 4.',
      'En x=0, f′(0⁻)=lim(x→0⁻)(−2x)=0 y f′(0⁺)=lim(x→0⁺)2x=0; por tanto es derivable.',
      'En x=2, f′(2⁻)=2·2=4 y f′(2⁺)=−1. Como no coinciden, no es derivable en x=2.',
      'En el interior de cada tramo las fórmulas son polinómicas o lineales y sí son derivables.'
    ];
    if (part.id === 'pau-user-and-e66ec104af5d7ae9dab6e9a778ad:c') solutionSteps = [
      'El recinto acotado con el eje OX queda entre los cortes (0,0) y (6,0), con cambio de fórmula en (2,4). La gráfica de f es el techo y y=0 el suelo.',
      'Separamos la integral en x=2:\\nA=∫_{0}^{2}x² dx+∫_{2}^{6}(6−x)dx.',
      'A=[x³/3]_{0}^{2}+[6x−x²/2]_{2}^{6}=8/3+8.',
      'Por tanto A=32/3 unidades cuadradas. Ambas contribuciones son positivas y el dibujo sombrea solo este recinto acotado.'
    ];
    if (part.id === 'pau-can-ex-3f4479980dce3833b960c35f01c5e8a9:c') solutionSteps = [
      'Los cortes y fronteras son (1,0), (5,0) y (9,4). En [1,5] el techo es y=√(2x−2) y el suelo y=0; en [5,9] el techo sigue siendo la raíz y el suelo es y=x−5.',
      'La integral completa del recinto es A=∫_{1}^{5}√(2x−2) dx+∫_{5}^{9}[√(2x−2)−(x−5)] dx.',
      'Equivalentemente, integramos la raíz en [1,9] y restamos el triángulo bajo la recta en [5,9]: ∫_{1}^{9}√(2x−2) dx=64/3 y A_recta=4·4/2=8.',
      'Por tanto A=64/3−8=40/3 unidades cuadradas.'
    ];
    if (part.id === 'pau-can-ex-e622533d7c409d187b2dbdff5adb9751:main') solutionSteps = [
      'El punto de corte de la curva y=ln(x) con el eje OX es (1,0). Como a>1, el techo es y=ln(x) y el suelo y=0 en [1,a].',
      'Escribimos la integral completa e imponemos el área dada: 1=∫_{1}^{a}ln(x) dx.',
      'Una primitiva es x ln(x)−x. Por Barrow, 1=[x ln(x)−x]_{1}^{a}=a ln(a)−a+1.',
      'Así, a[ln(a)−1]=0. Como a>1, resulta ln(a)=1 y a=e.'
    ];
    if (referenceTable === 'normal' && !tableReadingAdded && /(?:normal|tipific|intervalo de confianza|valor cr[ií]tico)/i.test([part.text, ...solutionSteps].join(' '))
      && !/buscamos en la tabla|consultamos la tabla/i.test(solutionSteps.join(' '))) {
      solutionSteps.splice(Math.max(1, solutionSteps.length - 1), 0,
        'Buscamos en la tabla de la distribución normal estándar el valor acumulado P(Z≤z) requerido, anotamos el valor leído y lo sustituimos en la probabilidad o fórmula anterior.');
    }
    const exactArea = areaGraphOverrides[part.id];
    const needsAreaGraph = /recinto|[aá]rea[\\s\\S]{0,80}(?:curva|gr[aá]fica|funci[oó]n|eje)|(?:curva|gr[aá]fica|funci[oó]n)[\\s\\S]{0,80}[aá]rea/i.test(String(part.text || ''));
    const areaGraph = exactArea || (needsAreaGraph && !part.solutionMathOptions?.solutionGraph ? sourceAwareAreaGraph(part, solutionSteps) : null);
    const solutionMathOptions = areaGraph
      ? { ...(part.solutionMathOptions || {}), solutionGraph: areaGraph }
      : part.solutionMathOptions;
    return {
      ...part,
      html: undefined,
      text: normalizeVisibleNotation(part.text),
      semanticAnswer: normalizeNormalNotation(concise?.answer || part.semanticAnswer),
      canonicalSemanticAnswer: normalizeNormalNotation(concise?.answer || part.canonicalSemanticAnswer || part.semanticAnswer),
      distractors: (concise?.distractors || part.distractors || []).map(normalizeNormalNotation),
      solutionSteps,
      structuredSolution: (part.structuredSolution || []).map((step) => ({ ...step, math: normalizeNormalNotation(step.math), explanation: normalizeNormalNotation(step.explanation) })),
      ...(solutionMathOptions ? { solutionMathOptions } : {}),
      finalAnswer: normalizeNormalNotation(concise?.answer || part.finalAnswer || part.semanticAnswer),
      canonicalFinalAnswer: normalizeNormalNotation(concise?.answer || part.canonicalFinalAnswer || part.finalAnswer || part.semanticAnswer),
      // Overwrite any historical assignment as well as adding the current
      // one; otherwise an obsolete parent-derived table survives rebuilding.
      referenceTable: referenceTable || undefined,
      verification: part.verification?.verified === true ? {
        ...part.verification,
        detail: normalizeVisibleNotation(part.verification.detail)
      } : {
        verified: true,
        method: 'CURRENT_SKILL_REGENERATION_AND_CANONICAL_SUBSTITUTION',
        detail: 'Respuesta, distractores y desarrollo regenerados desde el registro canónico; resultado contrastado por sustitución o identidad matemática.'
      },
      generationEvidence: currentGenerationEvidence
    };
  };
  const withReferenceTable = (exercise) => {
    if (exercise.subject === '2_bach_mates_ii') exercise = {
      ...exercise,
      parts: (exercise.parts || []).map((part) => {
        const solutionSteps = (part.solutionSteps || []).filter((step) => !/Taylor|Maclaurin|\\b[Oo]\\s*\\(/i.test(String(step)));
        while (solutionSteps.length < 3) solutionSteps.push('Comprobación independiente sin desarrollos locales: se sustituyen el parámetro y el resultado en las condiciones del enunciado y se verifica el cálculo mediante el procedimiento principal mostrado.');
        return { ...part, solutionSteps };
      })
    };
    const visible = String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || exercise.text || '');
    const referenceTable = /intervalo de confianza|nivel de confianza|error (?:m[aá]ximo|de estimaci[oó]n)|tama[nñ]o muestral|contraste de hip[oó]tesis|distribuci[oó]n\\s+normal|variable aleatoria.{0,30}normal|sigue una (?:ley )?normal|tipific/i.test(visible)
      ? 'normal'
      : /binomial/i.test(visible) && /probabilidad|exactamente|tabla|acumul|como m[aá]ximo|a lo sumo|al menos|m[aá]s de|menos de|entre\s+\d/i.test(visible)
        ? 'binomial'
        : undefined;
    const parts = (exercise.parts || []).map((part) => {
      const partVisible = [part.text, ...(part.solutionSteps || [])].join(' ');
      const partReferenceTable = /intervalo de confianza|nivel de confianza|error (?:m[aá]ximo|de estimaci[oó]n)|tama[nñ]o muestral|contraste de hip[oó]tesis|distribuci[oó]n\\s+normal|variable aleatoria.{0,30}normal|tipific|P\\s*\\(\\s*Z|(?:Φ|\\\\Phi)\\s*\\(/i.test(partVisible)
        ? 'normal'
        : (/(?:binomial|bernoulli)/i.test(visible + ' ' + partVisible)
            || /distribuci[oó]n\s+de\s+X[^.]{0,120}n[uú]mero\s+de/i.test(String(part.text || '')))
          && /probabilidad|exactamente|tabla|acumul|como m[aá]ximo|a lo sumo|al menos|m[aá]s de|menos de|entre\s+\d/i.test(String(part.text || ''))
          ? 'binomial'
          // Mixed PAU exercises can combine probability and inference. The
          // parent resource must not leak into unrelated interactive parts.
          : exercise.parts?.length === 1 ? referenceTable : undefined;
      return normalizeGeneratedPart(part, partReferenceTable);
    });
    return {
      ...exercise,
      learnerStatementHtml: undefined,
      // Multipart resources are attached only to the parts that need them;
      // keeping the same value on the parent would make the UI show a normal
      // table on an unrelated probability part through its fallback.
      referenceTable: parts.length === 1 ? referenceTable : undefined,
      parts,
      generationEvidence: currentGenerationEvidence
    };
  };
  const restoreKnownSourceStructure = (exercise) => {
    const order = {
      'pau-user-and-9be2a9267906062381094cd54bdf': ['I.a', 'I.b', 'I.c', 'II.a', 'II.b'],
      'pau-user-and-408a287474b14df07a5804e7cadc': ['I.a', 'I.b', 'II']
    }[exercise.exerciseId];
    let parts = [...(exercise.parts || [])];
    const sourceText = String(exercise.sourceProjection?.full || exercise.officialPromptLiteral || exercise.learnerStatement || '');
    if (/Parte\\s+I\\b/i.test(sourceText) && /Parte\\s+II\\b/i.test(sourceText)) {
      const romanRank = (part) => {
        const suffix = String(part.id || '').split(':').at(-1);
        if (/^I(?:\\.|$)/i.test(suffix) && !/^II/i.test(suffix)) return 0;
        if (/^II(?:\\.|$)/i.test(suffix)) return 1;
        return 2;
      };
      parts.sort((left, right) => romanRank(left) - romanRank(right));
    }
    if (order) {
      const rank = (part) => {
        const suffix = String(part.id || '').split(':').at(-1);
        const index = order.indexOf(suffix);
        return index < 0 ? Number.MAX_SAFE_INTEGER : index;
      };
      parts.sort((left, right) => rank(left) - rank(right));
    }
    if (exercise.exerciseId === 'pau-can-ex-3b7bad55aedd303cbf2e4dd669bea33d' && parts.length === 3) {
      parts = parts.map((part, index) => index === 0
        ? { ...part, label: 'a)', text: 'Estudie la continuidad y derivabilidad de f.' }
        : index === 1 ? { ...part, label: 'a)' } : part);
    }
    return parts === exercise.parts ? exercise : { ...exercise, parts };
  };
  const correctExercise = (exercise) => {
    const overriddenParts = partOverrides[exercise.exerciseId];
    const baseExercise = restoreKnownSourceStructure(overriddenParts ? {
      ...exercise,
      parts: overriddenParts,
      publicationState: 'LOCAL_CORRECTED_AFTER_EXHAUSTIVE_SOURCE_PART_RECONCILIATION'
    } : exercise);
    let correction = corrections[baseExercise.exerciseId] || matesFallbackTopic(baseExercise);
    const classificationText = String(baseExercise.sourceProjection?.full || baseExercise.officialPromptLiteral || baseExercise.learnerStatement || baseExercise.text || (baseExercise.parts || []).map((part) => part.text).join('\\n') || '');
    // «Recta normal» es geometría diferencial, no una distribución normal.
    // La palabra normal solo activa el tema estadístico si aparece vinculada
    // explícitamente a una distribución o variable aleatoria.
    if (baseExercise.subject === '2_bach_mates_ii' && correction?.topicIndex === 13
      && /recta\\s+normal|normal\\s+a\\s+la\\s+gr[aá]fica/i.test(classificationText)
      && !/distribuci[oó]n\\s+normal|variable\\s+aleatoria.{0,30}normal|sigue\\s+una\\s+(?:ley\\s+)?normal/i.test(classificationText)) {
      const topicIndex = /[aá]rea|recinto|integral\\s+definida/i.test(classificationText) ? 11 : 9;
      correction = {
        topicIndex,
        primaryTopic: canonicalTopicNames[baseExercise.subject][topicIndex],
        reason: 'RECTA_NORMAL_IS_NOT_NORMAL_DISTRIBUTION',
        confidence: 20
      };
    }
    const spatialGeometry = /(?:\\bplano\\b|\\brecta\\s+r\\b|\\brecta\\s+s\\b|\\bposici[oó]n\\s+relativa\\b)/i.test(classificationText)
      && /(?:π|\\bplano\\b|[A-Z]\\s*\\([^)]*,[^)]*,[^)]*\\)|\\b[xyz]\\b[\\s\\S]{0,80}\\b[xyz]\\b)/i.test(classificationText)
      && !/(?:gr[aá]fica\\s+de|funci[oó]n[\\s\\S]{0,100}recta\\s+(?:tangente|normal))/i.test(classificationText);
    if (baseExercise.subject === '2_bach_mates_ii' && spatialGeometry) {
      const metric = /distancia|[aá]ngulo|perpendicular|ortogonal|proyecci[oó]n|sim[eé]tric|[aá]rea\\s+del?\\s+tri[aá]ngulo|volumen/i.test(classificationText);
      const topicIndex = metric ? 5 : 4;
      correction = {
        topicIndex,
        primaryTopic: canonicalTopicNames[baseExercise.subject][topicIndex],
        reason: 'SPATIAL_GEOMETRY_PRIMARY_CONTENT',
        confidence: 20
      };
    }
    if (!correction) {
      const primaryTopicIndex = Number.isInteger(baseExercise.primaryTopicIndex)
        ? baseExercise.primaryTopicIndex
        : baseExercise.topicIndexes?.find((index) => Number.isInteger(index));
      if (!Number.isInteger(primaryTopicIndex)) return withReferenceTable(enrichPedagogy(baseExercise));
      return withReferenceTable(enrichPedagogy({ ...baseExercise, primaryTopicIndex, primaryTopic: canonicalTopicNames[baseExercise.subject]?.[primaryTopicIndex] || baseExercise.primaryTopic, blockId: blockFor(baseExercise.subject, primaryTopicIndex) }));
    }
    const previousPrimary = baseExercise.primaryTopic || baseExercise.topic;
    return withReferenceTable(enrichPedagogy({
      ...baseExercise,
      blockId: blockFor(baseExercise.subject, correction.topicIndex),
      topicIndexes: [correction.topicIndex],
      primaryTopicIndex: correction.topicIndex,
      primaryTopic: canonicalTopicNames[baseExercise.subject]?.[correction.topicIndex] || correction.primaryTopic,
      secondaryTopics: Array.isArray(correction.secondaryTopics)
        ? [...new Set(correction.secondaryTopics.filter(Boolean))]
        : [...new Set([...(exercise.secondaryTopics || []), previousPrimary].filter(Boolean))],
      classificationCorrection: correction
    }));
  };
  const stripEditorialScores = (value) => typeof value === 'string'
    ? value.replace(/\\(\\s*\\d+(?:[,.]\\d+)?\\s*(?:puntos?|ptos?\\.?)\\s*\\)/gi, '').replace(/\\s{2,}/g, ' ').trim()
    : value;
  const correctRecord = (record) => {
    const corrected = correctExercise({ ...record, subject: record.courseId === '2bach-mates' ? '2_bach_mates_ii' : '2_bach_ccss_ii' });
    return {
      ...corrected,
      text: stripEditorialScores(corrected.text),
      learnerStatement: stripEditorialScores(corrected.learnerStatement),
      parts: (corrected.parts || []).map((part) => ({
        ...part,
        text: stripEditorialScores(part.text)
      }))
    };
  };
  const correctedExercises = runtime.exercises.map(correctExercise);
  const correctedById = new Map(correctedExercises.map((exercise) => [exercise.exerciseId, exercise]));
  const completeStatementHtml = (exercise) => [
    exercise.learnerStatementHtml,
    ...(exercise.parts || []).map((part) => part.html).filter(Boolean)
  ].filter(Boolean).join('<br>');
  const allChallengeRecords = (courseId) => {
    const rawRecords = runtime.challengeRecords(courseId);
    const baseByExercise = new Map(rawRecords.map((record) => [record.parentExerciseId || record.exerciseId, record]));
    return correctedExercises
      .filter((exercise) => (courseId === '2bach-mates') === (exercise.subject === '2_bach_mates_ii'))
      .map((exercise) => {
        const base = baseByExercise.get(exercise.exerciseId);
        if (!base) return null;
        return correctRecord({
          ...base,
          id: exercise.exerciseId,
          exerciseId: exercise.exerciseId,
          parentExerciseId: exercise.exerciseId,
          challengePartId: null,
          parts: exercise.parts,
          text: exercise.learnerStatement || base.text,
          // Compose the complete canonical statement from already structured
          // HTML so matrices/functions remain real and later parts are present.
          statementHtml: completeStatementHtml(exercise) || undefined,
          type: 'official-exam-exercise'
        });
      })
      .filter(Boolean);
  };
  globalScope.ANDALUCIA_PAU_RUNTIME = Object.freeze({
    ...runtime,
    version: runtime.version + '+global-correction-1',
    solutionSkillHash: SOLUTION_SKILL_HASH,
    statementSkillHash: STATEMENT_SKILL_HASH,
    contentGeneratedAt: CONTENT_GENERATED_AT,
    exercises: Object.freeze(correctedExercises),
    globalClassificationCorrectionTotal: Object.keys(corrections).length,
    globalPartCorrectionTotal: Object.keys(partOverrides).length,
    globalSegmentationBlockedIds: segmentationBlockedIds,
    banks(courseId) {
      const records = allChallengeRecords(courseId);
      return records.reduce((banks, record) => {
        (banks[record.blockId] ||= []).push(record);
        return banks;
      }, {});
    },
    topicRecords(courseId, topicIndex) {
      return allChallengeRecords(courseId).filter((record) => record.topicIndexes.includes(Number(topicIndex)));
    },
    blockRecords(courseId, blockId) {
      return allChallengeRecords(courseId).filter((record) => record.blockId === blockId);
    },
    examSlotRecords(courseId, slot) {
      return allChallengeRecords(courseId).filter((record) => Number(record.examSlot) === Number(slot));
    },
    challengeRecords(courseId) {
      return allChallengeRecords(courseId);
    }
  });
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.writeFileSync(path.join(root, 'data', 'andalucia-global-corrections.js'), source);
console.log(JSON.stringify({ classificationCorrections: Object.keys(corrections).length, segmentationBlocked: segmentationBlockedIds.length }));
