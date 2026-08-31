import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[[255,'bc1068e6e486699f6a6ed03adf4046983e887ae29f788c4576c2ffeaa551689d',1,'4','6dec38f419e870417e5a24edfe766f4e14e8402b34d2fa0b83828f5342903861',0]];
export const statements={255:'Considera la función f:[0,+∞)→ℝ definida por f(x)=xe^x.\na) Esboza el recinto limitado por la gráfica de f y las rectas x=2, y=x. (1 punto)\nb) Determina el área del recinto anterior. (1,5 puntos)'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_EXPONENTIAL_LINEAR_REGION_SOURCE_LAYOUT']]:[];
export const cases=[{index:255,literals:['f (x) = xex','x = 2, y = x']}];
export const graph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'mates-exponential-linear-region-v1',index:255,xRange:[0,2.2],yRange:[0,17],region:[0,2],points:[[0,0],[2,2],[2,2*Math.exp(2)]]};
export const f=x=>x*Math.exp(x),g=x=>x;
export function renderExponentialLinearRegion(q){assert.deepEqual(q,graph);const X=x=>65+630*x/2.2,Y=y=>335-310*y/17,P=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(fn,a,b)=>Array.from({length:501},(_,i)=>{const x=a+(b-a)*i/500;return P(x,fn(x));}).join(' ');let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" role="img" aria-label="Recinto entre y=x por debajo, y=x por e elevado a x por encima, desde cero hasta dos"><rect width="760" height="440" fill="white"/>';
 for(const y of [0,4,8,12,16])s+=`<path d="M${P(0,y)} L${P(2.2,y)}" stroke="#dfe6ee"/><text x="53" y="${Y(y)+4}" text-anchor="end" font-size="15">${y}</text>`;
 s+=`<polygon points="${trace(f,0,2)} ${trace(g,2,0)}" fill="#c3e7ef"/><path d="M${P(0,17)} L${P(0,0)} L${P(2.2,0)}" stroke="#333" fill="none"/><path d="M${P(2,0)} L${P(2,16.5)}" stroke="#555" stroke-dasharray="5 4"/>`;
 for(const[fn,color]of [[f,'#075597'],[g,'#a52d3c']])s+=`<polyline points="${trace(fn,0,2.1)}" fill="none" stroke="${color}" stroke-width="3"/>`;
 for(const[x,y]of q.points)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#223344"/>`;
 for(const x of [0,.5,1,1.5,2])s+=`<text x="${X(x)}" y="357" text-anchor="middle" font-size="15">${x}</text>`;
 return s+'<text x="65" y="390" fill="#075597" font-size="18">f(x)=x·eˣ; curva superior en 0&lt;x≤2</text><text x="65" y="417" fill="#a52d3c" font-size="18">y=x; recta inferior; frontera derecha: x=2</text></svg>';
}
export const proof=()=>({intersection:[0,0],rightBoundary:[[2,2],[2,2*Math.exp(2)]],area:Math.exp(2)-1});
export function solve(){const ps=officialParts(statements[255]),mk=(i,a,d,e,s)=>{const p=part(ps[i],a,d,e,s,'EXACT_INTERSECTIONS_DERIVATIVE_AND_INDEPENDENT_NUMERICAL_QUADRATURE',proof());p.visual=structuredClone(graph);return p;};return[mk(0,'Recinto: 0≤x≤2; x≤y≤xe^x.',['Recinto: 0≤x≤2; xe^x≤y≤x.','Recinto: 0≤x≤1; x≤y≤xe^x.','Recinto: 0≤x≤2; 0≤y≤xe^x.'],['Invertir el orden de la curva y la recta.','Usar uno en lugar de dos como frontera vertical.','Sustituir la recta y=x por el eje horizontal.'],[
['Igualamos la curva con la recta para localizar dónde se cierra el recinto a la izquierda.','xe^x=x ⇒ x(e^x−1)=0 ⇒ x=0'],
['Ambas condiciones producen el mismo punto y no dos intersecciones distintas.','e^x=1 ⇒ x=0; intersección: (0;0)'],
['La curva es creciente y convexa en su dominio, lo que permite esbozarla sin confundirla con la recta.','f′(x)=e^x(x+1)>0; f″(x)=e^x(x+2)>0 para x≥0'],
['Para x positivo la exponencial es mayor que uno: la curva queda por encima de la recta.','xe^x−x=x(e^x−1)>0 para x>0'],
['La frontera vertical x=2 corta la recta y la curva en dos alturas distintas que deben unirse.','(2;2) y (2;2e²)'],
['El gráfico adjunto sombrea solo el recinto limitado por las tres fronteras oficiales. La tangencia en el origen no elimina el recinto.','0≤x≤2; x≤y≤xe^x; f′(0)=1'],
]),mk(1,'Área=e²−1 u².',['Área=e²+1 u².','Área=e²−3 u².','Área=1−e² u².'],['Integrar únicamente la curva y no restar el área bajo y=x.','Omitir la evaluación no nula de la primitiva en cero.','Invertir superior e inferior en la integral.'],[
['Usamos el recinto demostrado, con la curva por encima de la recta en todo el intervalo.','A=∫_0^2(xe^x−x)dx'],
['Para integrar el producto elegimos integración por partes; indicamos la elección y su diferencial.','u=x; dv=e^x dx; du=dx; v=e^x'],
['Aplicamos la fórmula por partes y luego integramos el término de la recta.','∫xe^x dx=xe^x−e^x+C\nH(x)=(x−1)e^x−frac{x²}{2}'],
['Evaluamos la primitiva en ambos extremos: en cero no vale cero.','H(2)=e²−2; H(0)=−1'],
['Restamos las evaluaciones, conservamos las unidades de superficie y comprobamos el signo positivo.','A=(e²−2)−(−1)=e²−1≈6,389056 u²'],
['Verificamos derivando la primitiva y mediante la descomposición en el área bajo cada frontera.','H′(x)=e^x+(x−1)e^x−x=xe^x−x\n∫_0^2xe^x dx=e²+1; ∫_0^2x dx=2'],
])];}
export function buildExponentialLinearRegionBatch(id='batch-0399',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Aplicaciones de integrales'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExponentialLinearRegionBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0399-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0399.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
