import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[344,'230940d6cbc11bf5fecc13ec9f908a84e47b6f5f6c7a1c8c573c8cacae38078e',1,'A.2','df3aacc1998a011564e51940c242204199bcb8b9435da4debfd7fdb6bb4b5170',0],
[361,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',1,'A.2','6f22d7f78d93b7f7ca43f5688aab469f81cc4624751e3f496f5c9923caadb017',0],
[367,'2e7f18e72d9070431873805beca2a6b861457bf0e1d4979e0b6f18700fa4e2ce',1,'2','4caa4966ae057b87852a90348ef2a05d5a6747ff6f01db9f6fd3ac8e12cf92b6',0],
[368,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',2,'B.2','516e1076b987f59f91c42fc608fc60539463d6c1bb0343b9e48fd71d65e00b05',0]];
export const statements={
344:'Sean f:ℝ→ℝ y g:ℝ→ℝ las funciones definidas por f(x)=4−3|x| y g(x)=x².\na) [1 punto] Esboza las gráficas de f y g. Determina sus puntos de corte.\nb) [1,5 puntos] Calcula el área del recinto limitado por las gráficas de f y g.',
361:'Sea f:(−1,+∞)→ℝ la función definida por f(x)=ln(x+1), donde ln denota la función logaritmo neperiano.\na) [0,75 puntos] Esboza el recinto limitado por la gráfica de f, el eje OY y la recta y=1. Calcula los puntos de corte de las gráficas.\nb) [1,75 puntos] Halla el área del recinto anterior.',
367:'Sea la función f:ℝ→ℝ definida por f(x)=(x−1)².\na) [0,75 puntos] Esboza el recinto acotado y limitado por la gráfica de f y la recta y=a con a>0.\nb) [1,75 puntos] Calcula a>0 para que el área del recinto acotado y limitado por la gráfica de f y la recta y=a sea frac{4}{3} unidades cuadradas.',
368:'Sea f:ℝ→ℝ la función definida por f(x)=frac{9−x²}{4}.\na) [0,75 puntos] Halla la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1.\nb) [1,75 puntos] Esboza el recinto limitado por la gráfica de f, la recta x+2y=5 y el eje de abscisas. Calcula el área de dicho recinto.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LOG_PARABOLA_AREAS_SOURCE_LAYOUT']]:[];
export const cases=[{index:344,slot:3,literals:['4 − 3|x|','g(x) = x2']},{index:361,slot:3,literals:['ln(x + 1)','y = 1']},{index:367,slot:3,literals:['(x − 1)2','a > 0']},{index:368,slot:3,literals:['abscisa x = 1','x+2y = 5']}];
export const proof=c=>({344:{cuts:[[-1,1],[1,1]],area:13/3},361:{cuts:[[0,0],[0,1],[Math.E-1,1]],area:Math.E-2},367:{areaCoefficient:4/3,a:1,cuts:[0,2]},368:{tangent:[-.5,2.5],cuts:[[1,2],[3,0],[5,0]],areas:[2/3,1],area:5/3}}[c.index]);
export const graphs=Object.fromEntries(cases.map(c=>[c.index,{plotVersion:'mates-log-parabola-areas-v1',index:c.index}]));
export function graphModel(index){switch(index){
case 344:return{domain:[-1.5,1.5,-1,5],curves:[{label:'f(x)=4−3|x|',fn:x=>4-3*Math.abs(x)},{label:'g(x)=x²',fn:x=>x*x}],regions:[{a:-1,b:1,upper:x=>4-3*Math.abs(x),lower:x=>x*x}],marks:[[-1,1,'(−1;1)'],[1,1,'(1;1)']],caption:'Recinto simétrico respecto al eje Y; vértice de f en (0;4).'};
case 361:return{domain:[0,2,-.1,1.3],curves:[{label:'f(x)=ln(x+1)',fn:x=>Math.log1p(x)},{label:'y=1',fn:()=>1}],regions:[{a:0,b:Math.E-1,upper:()=>1,lower:x=>Math.log1p(x)}],marks:[[0,0,'(0;0)'],[0,1,'(0;1)'],[Math.E-1,1,'(e−1;1)']],caption:'La frontera izquierda es el eje OY.'};
case 367:return{domain:[-1.4,1.4,-.1,1.6],curves:[{label:'v=u²',fn:u=>u*u},{label:'v=1',fn:()=>1}],regions:[{a:-1,b:1,upper:()=>1,lower:u=>u*u}],marks:[[-1,1,'x=1−√a'],[1,1,'x=1+√a']],caption:'Coordenadas normalizadas: u=(x−1)/√a; v=y/a; a>0.',xAxis:'u',yAxis:'v'};
case 368:return{domain:[.5,5.5,-.3,2.7],curves:[{label:'f(x)=(9−x²)/4',fn:x=>(9-x*x)/4},{label:'y=(5−x)/2',fn:x=>(5-x)/2}],regions:[{a:1,b:3,upper:x=>(5-x)/2,lower:x=>(9-x*x)/4},{a:3,b:5,upper:x=>(5-x)/2,lower:()=>0}],marks:[[1,2,'(1;2)'],[3,0,'(3;0)'],[5,0,'(5;0)']],caption:'El recinto usa la parábola de x=1 a x=3 y el eje X de x=3 a x=5.'};
default:throw Error('Unrecognized source-bound graph');}}
export function renderLogParabolaAreas(g){assert.deepEqual(g,graphs[g.index]);const m=graphModel(g.index),[xl,xr,yl,yr]=m.domain,X=x=>65+610*(x-xl)/(xr-xl),Y=y=>310-265*(y-yl)/(yr-yl),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:401},(_,i)=>{const x=a+(b-a)*i/400;return pt(x,f(x));}).join(' ');let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 455" role="img" aria-label="Gráfica del recinto del ejercicio oficial"><rect width="760" height="455" fill="white"/><defs><clipPath id="plot-clip"><rect x="65" y="45" width="610" height="265"/></clipPath></defs><g clip-path="url(#plot-clip)">';
for(const r of m.regions)s+=`<polygon points="${trace(r.upper,r.a,r.b)} ${trace(r.lower,r.b,r.a)}" fill="#d3eefa"/>`;
for(let x=Math.ceil(xl);x<=xr;x++)s+=`<path d="M${pt(x,yl)} L${pt(x,yr)}" stroke="#dce4eb"/>`;
for(let y=Math.ceil(yl);y<=yr;y++)s+=`<path d="M${pt(xl,y)} L${pt(xr,y)}" stroke="#dce4eb"/>`;
for(const [i,c]of m.curves.entries())s+=`<polyline points="${trace(c.fn,xl,xr)}" stroke="${i?'#b03743':'#075597'}" stroke-width="3" fill="none"/>`;
s+='</g>';s+=`<path d="M${pt(xl,0)} L${pt(xr,0)}" stroke="#333"/>`;
if(xl<=0&&xr>=0)s+=`<path d="M${pt(0,yl)} L${pt(0,yr)}" stroke="#333"/>`;
for(let x=Math.ceil(xl);x<=xr;x++)s+=`<text x="${X(x)}" y="333" text-anchor="middle" font-size="16">${x}</text>`;
for(let y=Math.ceil(yl);y<=yr;y++)s+=`<text x="54" y="${Y(y)+5}" text-anchor="end" font-size="16">${y}</text>`;
for(const[x,y,label]of m.marks)s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="#253449"/><text x="${X(x)}" y="${Y(y)-13}" font-size="17" text-anchor="${x===0?'start':'middle'}">${label}</text>`;
s+=`<text x="690" y="${Y(0)+5}" font-size="17">${m.xAxis||'x'}</text><text x="38" y="35" font-size="17">${m.yAxis||'y'}</text><text x="45" y="377" font-size="19">${m.curves.map(c=>c.label).join(' ; ')}</text><text x="45" y="414" font-size="16">${m.caption}</text></svg>`;return s;}
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_AREA_QUADRATURE_AND_INTERSECTIONS',proof(c));switch(c.index){
case 344:return[mk(0,'Cortes: (−1;1) y (1;1).',['Cortes: (−4;16) y (4;16).','Cortes: (−1;−1) y (1;−1).','Cortes: (−frac{4}{3};0) y (frac{4}{3};0).'],['Aceptar la raíz negativa al resolver para |x| y luego tomar su módulo.','Cambiar el signo de la ordenada al sustituir en la parábola.','Confundir cortes con el eje X y cortes entre las dos curvas.'],[
['Ambas funciones son pares. La primera tiene dos ramas rectas y la segunda es una parábola.','f(x)=4+3x si x≤0; f(x)=4−3x si x≥0; g(x)=x²'],
['Igualamos las funciones. Introducimos t=|x|, que no puede ser negativo.','4−3|x|=x² ⇒ t²+3t−4=0; t≥0'],
['Factorizamos y descartamos la raíz incompatible con la definición de t.','(t+4)(t−1)=0 ⇒ t=1; t=−4 no es admisible'],
['Recuperamos las dos abscisas y evaluamos sus ordenadas.','|x|=1 ⇒ x=−1 o x=1; g(−1)=g(1)=1'],
['El esbozo adjunto muestra el vértice de la V invertida, la parábola y el recinto sombreado.','f(0)=4; g(0)=0; f(x)>g(x) para −1<x<1'],
['Comprobamos cada corte en las dos expresiones originales, no solo en la ecuación auxiliar.','f(±1)=4−3=1=g(±1); cortes (−1;1), (1;1)'],
]),mk(1,'Área=frac{13}{3} u².',['Área=frac{13}{6} u².','Área=frac{14}{3} u².','Área=−frac{13}{3} u².'],['Calcular solo la mitad derecha y olvidar la simetría.','Extender 4−3x al semieje negativo sin respetar el valor absoluto.','Integrar la curva inferior menos la superior.'],[
['Los cortes anteriores delimitan el recinto y la función f queda por encima de g.','−1≤x≤1; f(x)−g(x)=4−3|x|−x²≥0'],
['La diferencia es par, de modo que calculamos la mitad derecha y duplicamos.','A=2∫_{0}^{1} (4−3x−x²)dx'],
['En este intervalo |x|=x. Integramos cada potencia usando la regla de aumento del exponente.','H(x)=4x−frac{3x²}{2}−frac{x³}{3}'],
['Aplicamos Barrow a la mitad del recinto y conservamos el factor dos.','A=2[H(1)−H(0)]=2(4−frac{3}{2}−frac{1}{3})'],
['Reducimos a común denominador y expresamos una superficie positiva.','A=2·frac{13}{6}=frac{13}{3} u²'],
['Como comprobación independiente, en la mitad izquierda se integra 4+3x−x² y se obtiene la misma cantidad.','∫_{−1}^{0} (4+3x−x²)dx=frac{13}{6}; A=frac{13}{6}+frac{13}{6}'],
])];
case 361:return[mk(0,'Cortes: (0;0), (0;1) y (e−1;1).',['Cortes: (0;0), (0;1) y (e;1).','Cortes: (0;0), (0;1) y (e−1;0).','Cortes: (0;1), (0;2) y (e−1;1).'],['Olvidar el desplazamiento x+1 al despejar el logaritmo.','Usar la ordenada del eje X en el corte con y=1.','Suponer un desplazamiento vertical que no tiene la función.'],[
['El dominio es x>−1 y el logaritmo es creciente. Identificamos las tres fronteras del recinto.','f(x)=ln(x+1); f′(x)=frac{1}{x+1}>0; fronteras x=0, y=1, y=f(x)'],
['Para el corte de la curva con OY sustituimos x=0.','f(0)=ln(1)=0 ⇒ P=(0;0)'],
['La recta horizontal y=1 corta al eje OY en su ordenada constante.','x=0, y=1 ⇒ Q=(0;1)'],
['Para el corte entre curva y recta usamos que el logaritmo neperiano y la exponencial son funciones inversas.','ln(x+1)=1 ⇒ x+1=e ⇒ R=(e−1;1)'],
['El dibujo adjunto muestra la región sobre la curva y bajo la recta, cerrada a la izquierda por OY.','0≤x≤e−1; ln(x+1)≤y≤1'],
['Verificamos los tres extremos y el orden de las fronteras, usando la monotonía.','ln(1)=0; ln(e)=1; 0≤ln(x+1)≤1 en [0;e−1]'],
]),mk(1,'Área=(e−2) u².',['Área=(e−1) u².','Área=(2−e) u².','Área=1 u².'],['Usar el rectángulo completo y no restar la región bajo el logaritmo.','Cambiar el orden de las curvas.','Confundir la integral del logaritmo con el área pedida.'],[
['Integramos la frontera superior menos la inferior, entre los dos valores de x que cierran el recinto.','A=∫_{0}^{e−1} (1−ln(x+1))dx'],
['Para integrar el logaritmo hacemos u=x+1 y aplicamos integración por partes.','∫ ln(u)du=u ln(u)−∫1du=u ln(u)−u+C'],
['Volvemos a x y escribimos una primitiva de la diferencia, manteniendo ambos sumandos lineales.','H(x)=x−(x+1)ln(x+1)+(x+1)'],
['Evaluamos en los límites usando ln(e)=1 y ln(1)=0.','H(e−1)=e−1; H(0)=1'],
['Aplicamos Barrow y expresamos el resultado como área.','A=H(e−1)−H(0)=e−2≈0,71828 u²'],
['Comprobamos integrando horizontalmente: a altura y, la anchura es e elevado a y menos uno.','x=eʸ−1; A=∫_{0}^{1} (eʸ−1)dy=[eʸ−y]₀¹=e−2'],
])];
case 367:return[mk(0,'Recinto: 1−√a≤x≤1+√a, (x−1)²≤y≤a.',['Recinto: 1−a≤x≤1+a, (x−1)²≤y≤a.','Recinto: −1−√a≤x≤−1+√a, (x−1)²≤y≤a.','Recinto: 1−√a≤x≤1+√a, a≤y≤(x−1)².'],['Olvidar la raíz al resolver una ecuación cuadrática.','Desplazar el eje de simetría a x=−1 en lugar de x=1.','Invertir las fronteras superior e inferior dentro del recinto.'],[
['La gráfica es una parábola que abre hacia arriba y tiene el vértice en x=1.','f(x)=(x−1)²≥0; V=(1;0); eje de simetría x=1'],
['Igualamos la parábola a la recta horizontal. Como a>0, existen dos cortes diferentes.','(x−1)²=a ⇒ x−1=±√a'],
['Obtenemos los extremos laterales y su ordenada común.','P=(1−√a;a); Q=(1+√a;a)'],
['Entre esos extremos el cuadrado no excede a. La recta queda arriba y la parábola abajo.','1−√a≤x≤1+√a ⇒ (x−1)²≤a'],
['El esbozo adjunto usa coordenadas normalizadas para representar cualquier a positivo, sin fijarlo arbitrariamente.','u=frac{x−1}{√a}; v=frac{y}{a}; −1≤u≤1; u²≤v≤1'],
['Comprobamos los cortes por sustitución y la anchura positiva del recinto.','(±√a)²=a; anchura=(1+√a)−(1−√a)=2√a>0'],
]),mk(1,'a=1.',['a=2^{2/3}.','a=(frac{1}{2})^{2/3}.','a=(frac{4}{3})^{2/3}.'],['Calcular solo media región y no duplicarla.','Duplicar dos veces por simetría.','Omitir el coeficiente 4/3 del área en función de a.'],[
['La altura de la región es a menos el cuadrado. Trasladamos el eje de simetría mediante u=x−1.','A(a)=∫_{1−√a}^{1+√a} (a−(x−1)²)dx=∫_{−√a}^{√a} (a−u²)du'],
['La función integrada es par; calculamos de cero a la raíz de a y multiplicamos por dos.','A(a)=2∫_{0}^{√a} (a−u²)du'],
['Integramos y evaluamos, conservando que a es constante respecto de u.','H(u)=a·u−frac{u³}{3}; A(a)=2(H(√a)−H(0))=2(a√a−frac{a√a}{3})'],
['Simplificamos la expresión del área e imponemos el valor pedido por la fuente.','A(a)=frac{4}{3}a√a; frac{4}{3}a√a=frac{4}{3}'],
['Como a>0, elevamos a dos tercios o usamos la monotonía estricta de a elevado a tres medios.','a^{3/2}=1 ⇒ a=1'],
['Verificamos con a=1 en los límites originales: de x=0 a x=2 el área es la requerida.','∫_{0}^{2} (1−(x−1)²)dx=frac{4}{3}; a=1>0'],
])];
case 368:return[mk(0,'Tangente: y=−frac{x}{2}+frac{5}{2}.',['Tangente: y=frac{x}{2}+frac{3}{2}.','Tangente: y=−2x+4.','Tangente: y=−frac{x}{2}+2.'],['Cambiar el signo de la derivada y conservar el punto.','Usar la pendiente recíproca en vez de la derivada.','Olvidar el desplazamiento horizontal en la ecuación punto-pendiente.'],[
['Evaluamos la función en la abscisa dada para obtener el punto de tangencia.','f(1)=frac{9−1}{4}=2 ⇒ P=(1;2)'],
['Derivamos el polinomio dividido por cuatro y evaluamos en x=1.','f′(x)=−frac{x}{2}; f′(1)=−frac{1}{2}'],
['Escribimos la ecuación punto-pendiente de la recta tangente.','y−2=−frac{1}{2}(x−1)'],
['Despejamos y sin perder el término que procede del desplazamiento.','y=−frac{x}{2}+frac{1}{2}+2=−frac{x}{2}+frac{5}{2}'],
['La forma implícita coincide con la recta indicada en el apartado siguiente.','x+2y=5'],
['Comprobamos el paso por el punto y que la diferencia recta menos curva tiene una raíz doble en la abscisa de contacto.','frac{5−x}{2}−frac{9−x²}{4}=frac{(x−1)²}{4}; y(1)=2'],
]),mk(1,'Área=frac{5}{3} u².',['Área=frac{2}{3} u².','Área=1 u².','Área=frac{10}{3} u².'],['Omitir la zona limitada por la recta y el eje X.','Omitir la zona entre tangente y parábola.','Duplicar por una simetría que no tiene este recinto.'],[
['Identificamos los extremos del recinto que utiliza las tres fronteras, no solo la región bajo la parábola.','Tangencia (1;2); f(3)=0; r(5)=0; r(x)=frac{5−x}{2}'],
['De x=1 a x=3, la frontera inferior es la parábola; de x=3 a x=5 es el eje X. El dibujo muestra ambas partes.','A=A₁+A₂; A₁=∫_{1}^{3} (r(x)−f(x))dx; A₂=∫_{3}^{5} r(x)dx'],
['La diferencia entre recta y parábola es un cuadrado dividido por cuatro, por lo que no cambia de signo.','r(x)−f(x)=frac{x²−2x+1}{4}=frac{(x−1)²}{4}'],
['Integramos la primera región mediante una potencia desplazada.','A₁=[frac{(x−1)³}{12}]₁³=frac{8}{12}=frac{2}{3}'],
['La segunda región es un triángulo de base dos y altura uno; coincide con la integral de la recta.','A₂=frac{(5−3)·r(3)}{2}=frac{2·1}{2}=1; A=frac{2}{3}+1=frac{5}{3} u²'],
['Verificamos la parte triangular por Barrow, independiente del cálculo geométrico, y sumamos superficies positivas.','∫_{3}^{5} frac{5−x}{2}dx=[frac{5x}{2}−frac{x²}{4}]₃⁵=1; A>0'],
])];default:throw Error('Unknown official case');}}
export function buildLogParabolaAreasBatch(id='batch-0420',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic='Integrales definidas y áreas';x.secondaryTopics=c.index===368?['Aplicaciones de derivadas']:[];x.block='Análisis';x.examSlot=3;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};for(const p of x.parts)p.visual=graphs[c.index];x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLogParabolaAreasBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0420-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0420.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
