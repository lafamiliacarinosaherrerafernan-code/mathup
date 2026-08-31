import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[286,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',2,'6','c722cce02a66e6e62eebbb59e0c3303ed782c145d6ec72bbddcd2d852945b728',0],
[287,'3e3680996f6975a212fbb2b33f5105e444c7be584e0bcaee89f5405cd6fff1ac',2,'B.2','c514076900be10590039a060cdd042a3b2f89755b855dc39a0044837eaa5a0b4',0],
[296,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',1,'A.3','1c4a5527c1b4f8a39a9b0ee74dc5f93f12753034bf5ea585df2ea163aa7288ca',0]];
export const statements={
286:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=−4x+2 y g(x)=−x²+2x+c.\na) Halla el valor de c sabiendo que sus gráficas se cortan en el punto en el que g alcanza su máximo. (1 punto)\nb) Para c=−3, calcula el área de la región limitada por ambas gráficas. (1,5 puntos)',
287:'Sea la función f:ℝ→ℝ dada por f(x)=xe^{−x²}.\na) [1,25 puntos] Calcula los puntos de corte de la gráfica de f con los ejes coordenados y los extremos relativos de f (abscisas en los que se obtienen y valores que se alcanzan).\nb) [1,25 puntos] Determina a>0 de manera que frac{1}{4} sea el área del recinto determinado por la gráfica de f en el intervalo [0,a] y el eje de abscisas.',
296:'Considera la función f:ℝ→ℝ, definida por f(x)=x|x−1|. Calcula el área del recinto limitado por la gráfica de dicha función y su recta tangente en el punto de abscisa x=0.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_GAUSSIAN_TANGENT_AREAS_SOURCE_LAYOUT']]:[];
export const cases=[{index:286,literals:['−4x + 2','−x2 + 2x + c']},{index:287,literals:['xe−x2','intervalo [0, a]']},{index:296,literals:['x|x − 1|','x = 0'],whole:true}];
export const proof=c=>({286:{c:-3,roots:[1,5],area:32/3},287:{roots:[0],minimum:[-1/Math.sqrt(2),-1/Math.sqrt(2*Math.E)],maximum:[1/Math.sqrt(2),1/Math.sqrt(2*Math.E)],a:Math.sqrt(Math.log(2)),area:.25},296:{tangent:[1,0],roots:[0,2],pieceAreas:[1/3,2/3],area:1}}[c.index]);
export const graphs=Object.fromEntries(cases.map(c=>[c.index,{plotVersion:'mates-gaussian-tangent-areas-v1',index:c.index}]));
export function renderGaussianTangentArea(g){assert.deepEqual(g,graphs[g.index]);const data={286:{domain:[.5,5.5],range:[-24,2],a:1,b:5,top:x=>-x*x+2*x-3,bottom:x=>-4*x+2,labels:['g(x)=−x²+2x−3','f(x)=−4x+2; 1≤x≤5']},287:{domain:[0,1.5],range:[-.1,.6],a:0,b:Math.sqrt(Math.log(2)),top:x=>x*Math.exp(-x*x),bottom:()=>0,labels:['f(x)=x·exp(−x²)','0≤x≤√ln(2); área=1/4']},296:{domain:[-.1,2.2],range:[-.2,2.8],a:0,b:2,top:x=>x,bottom:x=>x*Math.abs(x-1),labels:['Tangente y=x','f(x)=x|x−1|; 0≤x≤2']}}[g.index];const X=x=>65+625*(x-data.domain[0])/(data.domain[1]-data.domain[0]),Y=y=>330-295*(y-data.range[0])/(data.range[1]-data.range[0]),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:401},(_,i)=>{const x=a+(b-a)*i/400;return pt(x,f(x));}).join(' ');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" role="img" aria-label="${data.labels.join('; ')}"><rect width="760" height="440" fill="white"/><polygon points="${trace(data.top,data.a,data.b)} ${trace(data.bottom,data.b,data.a)}" fill="#c7e8ef"/><path d="M65 330 L690 330 M65 35 L65 330" stroke="#555" fill="none"/><polyline points="${trace(data.top,data.domain[0],data.domain[1])}" fill="none" stroke="#075597" stroke-width="3"/><polyline points="${trace(data.bottom,data.domain[0],data.domain[1])}" fill="none" stroke="#a52d3c" stroke-width="3"/><path d="M${pt(data.a,data.bottom(data.a))} L${pt(data.a,data.top(data.a))} M${pt(data.b,data.bottom(data.b))} L${pt(data.b,data.top(data.b))}" stroke="#444" stroke-dasharray="5 4"/><text x="${X(data.a)}" y="355" text-anchor="middle" font-size="16">${data.a.toFixed(3)}</text><text x="${X(data.b)}" y="355" text-anchor="middle" font-size="16">${data.b.toFixed(3)}</text><text x="65" y="390" fill="#075597" font-size="18">${data.labels[0]}</text><text x="65" y="418" fill="#a52d3c" font-size="18">${data.labels[1]}</text></svg>`;}
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_AREA_WITH_INDEPENDENT_QUADRATURE_DERIVATIVE_AND_INTERSECTIONS',proof(c));let result;switch(c.index){
case 286:result=[mk(0,'c=−3.',['c=−2.','c=3.','c=1.'],['Igualar c directamente con la ordenada de la recta sin sumar el término uno de g(1).','Cambiar el signo al despejar el parámetro.','Tomar la abscisa del vértice como valor del parámetro.'],[
['La parábola abre hacia abajo, por lo que su vértice es un máximo absoluto.','g′(x)=−2x+2; g″(x)=−2<0'],
['Localizamos la abscisa del máximo anulando la primera derivada.','−2x+2=0 ⇒ x=1'],
['El punto de corte debe tener esa misma abscisa. Evaluamos la recta.','f(1)=−4+2=−2'],
['Evaluamos la parábola y hacemos coincidir las ordenadas.','g(1)=−1+2+c=1+c; 1+c=−2'],
['Despejamos el parámetro conservando el signo.','c=−3'],
['Comprobamos que ambas gráficas pasan por el vértice encontrado.','f(1)=g(1)=−2; g(x)=−(x−1)²−2≤−2'],
]),mk(1,'Área=frac{32}{3} u².',['Área=−frac{32}{3} u².','Área=frac{16}{3} u².','Área=frac{64}{3} u².'],['Invertir el orden de las curvas en la integral.','Contar solo la mitad simétrica del recinto.','Duplicar un recinto que ya se ha integrado completo.'],[
['Con c igual a menos tres, igualamos las funciones para localizar los extremos del recinto.','−x²+2x−3=−4x+2 ⇒ x²−6x+5=0'],
['Factorizamos y obtenemos los dos puntos de intersección.','(x−1)(x−5)=0; x=1 o x=5'],
['La diferencia entre parábola y recta es positiva entre las raíces.','g−f=−x²+6x−5=4−(x−3)²≥0 en [1;5]'],
['El área se calcula integrando la curva superior menos la inferior.','A=∫_1^5(−x²+6x−5)dx'],
['Evaluamos una primitiva en ambos extremos.','H(x)=−frac{x³}{3}+3x²−5x\nH(5)=frac{25}{3}; H(1)=−frac{7}{3}; A=frac{32}{3} u²'],
['La traslación t igual a x menos tres permite comprobar el resultado mediante simetría.','A=∫_{−2}^2(4−t²)dt=2(8−frac{8}{3})=frac{32}{3}'],
])];break;
case 287:result=[mk(0,'Corte: (0;0). Mínimo: (−frac{1}{√2};−frac{1}{√(2e)}). Máximo: (frac{1}{√2};frac{1}{√(2e)}).',['Corte: (0;0). Máximo: (−frac{1}{√2};−frac{1}{√(2e)}). Mínimo: (frac{1}{√2};frac{1}{√(2e)}).','Corte: (0;0). Mínimo: (−1;−frac{1}{e}). Máximo: (1;frac{1}{e}).','Corte: (0;0). Mínimo: (−frac{1}{√2};−frac{1}{√2}). Máximo: (frac{1}{√2};frac{1}{√2}).'],['Invertir el cambio de signo de la derivada.','Perder el factor dos de la regla de la cadena.','Omitir el factor exponencial al evaluar las ordenadas.'],[
['La exponencial es siempre positiva; el producto solo se anula cuando x es cero. El corte con el eje vertical es el mismo punto.','xe^{−x²}=0 ⇔ x=0; f(0)=0'],
['Aplicamos producto y cadena, manteniendo el factor menos dos x.','f′(x)=e^{−x²}−2x²e^{−x²}=e^{−x²}(1−2x²)'],
['El factor exponencial no se anula, por lo que los puntos críticos vienen del polinomio.','1−2x²=0 ⇒ x=±frac{1}{√2}'],
['La derivada es negativa fuera de los puntos críticos y positiva entre ellos.','Decrece: (−∞;−frac{1}{√2}) y (frac{1}{√2};+∞); crece: (−frac{1}{√2};frac{1}{√2})'],
['El cambio de decrecer a crecer da el mínimo negativo; el de crecer a decrecer da el máximo positivo. Calculamos sus ordenadas.','f(±frac{1}{√2})=±frac{e^{−1/2}}{√2}=±frac{1}{√(2e)}'],
['La segunda derivada confirma ambos tipos: en cada punto crítico solo queda el término menos cuatro x multiplicado por una exponencial positiva.','f″(x)=e^{−x²}(4x³−6x); en x²=frac{1}{2}: f″=−4xe^{−x²}'],
]),mk(1,'a=√ln(2).',['a=ln(2).','a=√ln(4).','a=√ln(frac{4}{3}).'],['Olvidar la raíz cuadrada al despejar a.','Perder el factor un medio de la primitiva.','Usar como objetivo un área de un octavo.'],[
['Como a es positivo, el integrando es no negativo entre cero y a. El área coincide con la integral sin cambio de signo.','A(a)=∫_0^a xe^{−x²}dx'],
['Usamos u igual a menos x cuadrado; su diferencial contiene el factor menos dos.','u=−x²; du=−2x dx; H(x)=−frac{1}{2}e^{−x²}'],
['Evaluamos la primitiva para expresar el área en función del extremo.','A(a)=H(a)−H(0)=frac{1−e^{−a²}}{2}'],
['Imponemos el área oficial de un cuarto y despejamos la exponencial.','frac{1−e^{−a²}}{2}=frac{1}{4} ⇒ e^{−a²}=frac{1}{2}'],
['Tomamos logaritmos y elegimos únicamente la raíz positiva.','−a²=−ln(2) ⇒ a=√ln(2)'],
['La sustitución verifica el área y su derivada positiva para a mayor que cero demuestra unicidad.','A(√ln(2))=frac{1−1/2}{2}=frac{1}{4}; A′(a)=ae^{−a²}>0'],
])];break;
case 296:result=[mk(0,'Área=1 u².',['Área=frac{2}{3} u².','Área=frac{8}{3} u².','Área=frac{1}{3} u².'],['Omitir el tramo anterior a uno.','Usar la rama x menos x cuadrado en todo el intervalo.','Omitir el tramo posterior a uno.'],[
['El valor absoluto cambia de expresión en uno. Es imprescindible separar las ramas antes de derivar o integrar.','f(x)=piecewise{x−x² si x<1;x²−x si x≥1}'],
['El punto cero pertenece a la primera rama. Su valor y derivada determinan la tangente.','f(0)=0; f′(0)=1 ⇒ tangente: y=x'],
['Resolvemos los cortes con la tangente en cada rama, respetando sus intervalos.','x−x²=x ⇒ x=0; x²−x=x ⇒ x=2 en x≥1'],
['La recta queda por encima en todo el recinto. Dividimos el área donde cambia la fórmula.','A=∫_0^1 x²dx+∫_1^2(2x−x²)dx'],
['Evaluamos ambas integrales y sumamos sus contribuciones positivas.','A₁=frac{1}{3}; H(x)=x²−frac{x³}{3}\nA₂=H(2)−H(1)=frac{4}{3}−frac{2}{3}=frac{2}{3}; A=1 u²'],
['Verificamos el signo en cada tramo y que el valor absoluto se ha respetado. Las dos ramas coinciden en uno.','x²≥0 en [0;1]; x(2−x)≥0 en [1;2]; f(1)=0'],
])];break;
default:throw Error('Unknown official case');}result[result.length-1].visual=graphs[c.index];return result;}
export function buildGaussianTangentAreasBatch(id='batch-0406',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=['Aplicaciones de derivadas'];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};if(x.correctionEvidence.parameters.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildGaussianTangentAreasBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0406-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0406.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
