import fs from'node:fs';import assert from'node:assert/strict';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [993,'ec6fd00d0daee547aa6128f3f6e1099278ee551f7f80917b331a1772764317b3',2,'B.2','82ec08a68dfd1800c01d979899150d9430d98e4fac6bbd3ef22df97097b83f09',0],
 [999,'ac80a164e049669cd01083ca5adaddfa90efbf556b050de2d99f294ab55670c9',1,'A.2','cd426b3d82f9b902f3df53110fa38ce4547c725536e0704c9c5cfc4a9ca16ba1',0],
 [1010,'5feecf28b9fa5a5f948bccfd561e04d39ec91c87e40f27baca54281076136f87',2,'B.2','0e67abaa1c6ce13aaa563a780317d7cc333f0436d24ae6151550324f7ce4f0bf',0],
];
export const statements={993:'Sea la función f(x)=frac{1}{3}x³+frac{1}{2}x²−2x+3.\na) Determine sus máximos y mínimos relativos.\nb) Consideremos la función g(x)=f′(x). Calcule la ecuación de la recta tangente a la gráfica de la función g(x), en el punto de abscisa x=2.\nc) Dibuje la gráfica de g(x) y de la recta tangente calculada en b).',999:'Sea la función f(x)=cases{1,x≤0;−x²+1,0<x<4;x²−8x+17,x≥4}.\na) Represente gráficamente la función f.\nb) Estudie su continuidad y derivabilidad.\nc) Calcule f′(1) y f′(5).',1010:'Sean f,g:ℝ→ℝ las funciones definidas por f(x)=−frac{1}{4}x²+4 y g(x)=x²−1.\na) Halla la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=−2.\nb) Esboza el recinto limitado por las gráficas de ambas funciones y la recta y=x+5. Calcula el área de este recinto.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_TANGENT_PIECEWISE_REGIONS_LAYOUT']]:[];
export const cases=[{index:993,subject:'ccss',slot:3,literals:['g(x) = f','x = 2','Dibuje la gráfica']},{index:999,subject:'ccss',slot:3,literals:['Represente gráficamente','derivabilidad','f ´(5)']},{index:1010,subject:'mates',slot:3,literals:['g(x) = x2 − 1','x = −2','y = x + 5']}];
export const f993=x=>x**3/3+x*x/2-2*x+3,g993=x=>x*x+x-2,jump999=x=>x<=0?1:x<4?-x*x+1:x*x-8*x+17,f1010=x=>-x*x/4+4,g1010=x=>x*x-1;
export const proof=c=>({993:{maximum:[-2,19/3],minimum:[1,11/6],derivativeRoots:[-2,1],gVertex:[-.5,-2.25],tangent:[5,-6],contact:[2,4]},999:{breakpoints:[0,4],atZero:{limits:[1,1],derivatives:[0,0]},atFour:{limits:[-15,1],value:1},derivatives:[-2,2]},1010:{tangent:[1,5],contact:[-2,3],intersectionsFG:[[-2,3],[2,3]],intersectionsLineG:[[-2,3],[3,8]],areas:[16/3,13/6],area:15/2}}[c.index]);
export const graphs=Object.fromEntries(cases.map(c=>[c.index,{plotVersion:'tangent-piecewise-regions-v1',index:c.index}]));
export function renderTangentPiecewiseRegions(g){assert.deepEqual(g,graphs[g.index]);const i=g.index,[xmin,xmax,ymin,ymax,ys]=i===993?[-3,3,-5,11,2]:i===999?[-2,7,-17,12,5]:[-2.5,3.5,-2,12,2],X=x=>65+620*(x-xmin)/(xmax-xmin),Y=y=>325-285*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:501},(_,n)=>{const x=a+(b-a)*n/500;return pt(x,f(x));}).join(' '),curve=(f,a,b,color)=>`<polyline points="${trace(f,a,b)}" stroke="${color}" fill="none" stroke-width="3"/>`,mark=(x,y,open=false)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${open?'white':'#075597'}" stroke="#075597" stroke-width="2"/>`;
let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-label="Gráfica calculada desde las fórmulas oficiales"><rect width="760" height="430" fill="white"/>';
for(let x=Math.ceil(xmin);x<=xmax;x++)s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="347" text-anchor="middle" font-size="17">${x}</text>`;
for(let y=Math.ceil(ymin/ys)*ys;y<=ymax;y+=ys)s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="48" y="${Y(y)+5}" text-anchor="end" font-size="17">${y}</text>`;
if(i===993){s+=curve(g993,xmin,xmax,'#075597')+curve(x=>5*x-6,.2,3,'#a52d3c')+mark(-.5,-2.25)+mark(-2,0)+mark(1,0)+mark(2,4);}
if(i===999){s+=curve(()=>1,xmin,0,'#075597')+curve(x=>-x*x+1,0,4,'#075597')+curve(x=>x*x-8*x+17,4,xmax,'#075597')+mark(0,1)+mark(4,-15,true)+mark(4,1);}
if(i===1010){const shade=(h,a,b)=>`<polygon points="${trace(x=>x+5,a,b)} ${trace(h,b,a)}" fill="#ceeaf4"/>`;s+=shade(f1010,-2,2)+shade(g1010,2,3)+curve(f1010,xmin,xmax,'#075597')+curve(g1010,xmin,xmax,'#16805c')+curve(x=>x+5,xmin,xmax,'#a52d3c')+mark(-2,3)+mark(2,3)+mark(3,8);}
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/>`;
const labels=i===993?['g(x)=x²+x−2 (azul); tangente y=5x−6 (rojo).','Vértice (−0,5;−2,25); tangencia (2;4).']:i===999?['y=1; y=−x²+1; y=(x−4)²+1, en sus tramos.','En x=4: (4;−15) abierto y (4;1) cerrado.']:['f azul; g verde; recta roja. Recinto entre las tres curvas.','Límite inferior: f hasta x=2; g desde x=2 hasta x=3.'];return s+`<text x="45" y="382" font-size="18">${labels[0]}</text><text x="45" y="412" font-size="18">${labels[1]}</text></svg>`;}
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,r,s,visual=false)=>{const p=part(ps[i],a,d,r,s,'INDEPENDENT_DERIVATIVES_BRANCH_LIMITS_AND_QUADRATURE',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 993:return[mk(0,'Máximo relativo: (−2,frac{19}{3}); mínimo relativo: (1,frac{11}{6}).',['Máximo relativo: (1,frac{11}{6}); mínimo relativo: (−2,frac{19}{3}).','Máximo relativo: (−2,0); mínimo relativo: (1,0).','Máximo relativo: (−1,frac{31}{6}); mínimo relativo: (2,frac{11}{3}).'],['Intercambiar el signo del cambio de monotonía.','Dar como ordenadas los valores de la derivada en vez de los de f.','Resolver la ecuación crítica con el signo lineal invertido.'],[
 ['Derivamos el polinomio término a término; los extremos deben ser puntos críticos.','f′(x)=x²+x−2'],
 ['Factorizamos la derivada e igualamos a cero.','f′(x)=(x+2)(x−1)=0 ⇒ x=−2,1'],
 ['Estudiamos el signo en los tres intervalos separados por las raíces.','f′>0 en (−∞,−2); f′<0 en (−2,1); f′>0 en (1,∞)'],
 ['El cambio de creciente a decreciente es máximo, y el contrario es mínimo.','Máximo en x=−2; mínimo en x=1'],
 ['Evaluamos la función original para obtener las ordenadas.','f(−2)=−frac{8}{3}+2+4+3=frac{19}{3}; f(1)=frac{1}{3}+frac{1}{2}−2+3=frac{11}{6}'],
 ['Contrastamos la clasificación con la segunda derivada.','f″(x)=2x+1; f″(−2)=−3<0; f″(1)=3>0'],
 ]),mk(1,'y=5x−6.',['y=4x−4.','y=5x+6.','y=5x+4.'],['Usar g(2) como pendiente en vez de g′(2).','Cambiar el signo del término independiente.','Usar la ordenada como término independiente.'],[
 ['Se pide la tangente de g, no de la función cúbica f.','g(x)=f′(x)=x²+x−2'],
 ['Calculamos el punto de la gráfica de g en abscisa dos.','g(2)=4+2−2=4 ⇒ P=(2,4)'],
 ['Derivamos g para obtener la pendiente.','g′(x)=2x+1; g′(2)=5'],
 ['Aplicamos la forma punto-pendiente.','y−4=5(x−2)'],
 ['Despejamos y y comprobamos que pasa por el punto correcto.','y=5x−6; y(2)=4'],
 ['La diferencia entre la parábola y la recta tiene raíz doble en la tangencia.','g(x)−(5x−6)=x²−4x+4=(x−2)²'],
 ]),mk(2,'Parábola abierta hacia arriba, vértice (−frac{1}{2},−frac{9}{4}), cortes x=−2,1; recta y=5x−6 tangente en (2,4).',['Parábola abierta hacia abajo, vértice (−frac{1}{2},−frac{9}{4}), cortes x=−2,1; recta y=5x−6.','Parábola abierta hacia arriba, vértice (frac{1}{2},−frac{9}{4}), cortes x=−1,2; recta y=5x−6.','Parábola abierta hacia arriba, vértice (−frac{1}{2},−frac{9}{4}), cortes x=−2,1; recta y=4x−4.'],['Invertir la concavidad de g.','Cambiar el signo del término lineal de g.','Dibujar una secante con pendiente equivocada.'],[
 ['La gráfica que dibujamos es g, una parábola con coeficiente cuadrático positivo.','g(x)=x²+x−2'],
 ['Completamos el cuadrado para localizar el vértice.','g(x)=(x+frac{1}{2})²−frac{9}{4} ⇒ V=(−frac{1}{2},−frac{9}{4})'],
 ['Marcamos sus intersecciones con los ejes.','g(x)=(x+2)(x−1); cortes (−2,0),(1,0),(0,−2)'],
 ['Trazamos la recta por el punto de tangencia con su pendiente ya calculada.','y=5x−6; pasa por (2,4) y (1,−1)'],
 ['Comprobamos que la recta queda debajo y toca solo en x=2.','g(x)−(5x−6)=(x−2)²≥0'],
 ['La gráfica adjunta conserva vértice, cortes y tangencia, sin confundir g con f.','g′(2)=5; g(2)=4'],
 ],true)];
case 999:return[mk(0,'Semirrecta y=1 hasta x=0; parábola y=−x²+1 en (0,4); parábola y=(x−4)²+1 desde (4,1), con (4,−15) abierto.',['Semirrecta y=1 hasta x=0; recta y=−x+1 en (0,4); parábola y=(x−4)²+1 desde (4,1).','Semirrecta y=1 hasta x=0; parábola y=x²+1 en (0,4); parábola y=(x−4)²+1 desde (4,1).','Semirrecta y=1 hasta x=0; parábola y=−x²+1 en (0,4); la última parábola comienza en (4,−15).'],['Perder el exponente dos de la rama central.','Cambiar el signo del coeficiente cuadrático.','Forzar continuidad en cuatro alterando el valor oficial.'],[
 ['El primer tramo es horizontal y contiene su extremo derecho.','x≤0 ⇒ f(x)=1; punto (0,1) incluido'],
 ['En el tramo central usamos el exponente cuadrático visible en el documento oficial.','0<x<4 ⇒ f(x)=−x²+1; puntos (1,0),(2,−3),(3,−8)'],
 ['La parábola central baja hasta un límite que no está incluido.','lim_{x→4⁻}f(x)=−16+1=−15; (4,−15) abierto'],
 ['Completamos el cuadrado en el tercer tramo para localizar su vértice.','x²−8x+17=(x−4)²+1 ⇒ vértice (4,1)'],
 ['El tercer tramo incluye el vértice y crece hacia la derecha.','x≥4; puntos (4,1),(5,2),(6,5)'],
 ['La gráfica adjunta mantiene el salto en cuatro y no dibuja un segmento vertical que una las ramas.','f(4)=1≠−15; f(0)=1'],
 ],true),mk(1,'Continua y derivable en ℝ∖{4}; en x=4 presenta salto y no es derivable.',['Continua en ℝ; no derivable solo en x=4.','Continua salvo en 0 y 4; no derivable en 0 ni en 4.','Continua salvo en 4; no derivable en 0 ni en 4.'],['No comprobar los límites laterales en cuatro.','Confundir cambio de fórmula con discontinuidad.','No comprobar que ambas derivadas en cero son nulas.'],[
 ['Los tres tramos son polinomios; solo debemos revisar sus uniones.','Puntos a estudiar: x=0 y x=4'],
 ['En cero los límites y el valor coinciden.','lim_{x→0⁻}f(x)=1; lim_{x→0⁺}(−x²+1)=1=f(0)'],
 ['Las derivadas laterales en cero también coinciden.','f′₋(0)=0; f′₊(0)=lim_{x→0⁺}(−2x)=0 ⇒ f′(0)=0'],
 ['En cuatro calculamos separadamente los límites con sus fórmulas.','lim_{x→4⁻}f(x)=−15; lim_{x→4⁺}f(x)=1=f(4)'],
 ['Un salto de la función impide la derivabilidad, independientemente de las derivadas de cada rama.','−15≠1 ⇒ discontinuidad de salto en x=4 ⇒ no derivable'],
 ['Escribimos el conjunto final y la derivada donde existe.','f′(x)=cases{0,x≤0;−2x,0<x<4;2x−8,x>4}; dominio de f′:ℝ∖{4}'],
 ]),mk(2,'f′(1)=−2; f′(5)=2.',['f′(1)=−1; f′(5)=2.','f′(1)=2; f′(5)=2.','f′(1)=−2; f′(5)=10.'],['Leer la rama central como lineal.','Perder el signo negativo de la parábola central.','Olvidar la derivada del término −8x.'],[
 ['Uno pertenece al tramo abierto central, y cinco al último tramo.','0<1<4; 5>4'],
 ['Derivamos la fórmula central sin usar los otros tramos.','f′(x)=−2x para 0<x<4'],
 ['Evaluamos esa derivada en uno.','f′(1)=−2·1=−2'],
 ['Derivamos la fórmula del tramo final.','f′(x)=2x−8 para x>4'],
 ['Evaluamos la derivada en cinco.','f′(5)=2·5−8=2'],
 ['Los signos concuerdan con la gráfica: la rama central decrece y la última crece tras su vértice.','f′(1)<0; f′(5)>0'],
 ])];
case 1010:return[mk(0,'y=x+5.',['y=−x+1.','y=x+3.','y=−frac{1}{2}x+2.'],['Perder el signo de la abscisa al calcular la pendiente.','Usar f(−2) como término independiente.','Confundir la derivada con una pendiente constante sin evaluarla.'],[
 ['Evaluamos la función en la abscisa oficial de tangencia.','f(−2)=−frac{1}{4}·4+4=3 ⇒ P=(−2,3)'],
 ['Derivamos la parábola para encontrar la pendiente tangente.','f′(x)=−frac{x}{2}'],
 ['Sustituimos la abscisa, cuidando los dos signos negativos.','m=f′(−2)=1'],
 ['Aplicamos la forma punto-pendiente.','y−3=1(x+2)'],
 ['Simplificamos y comprobamos el punto.','y=x+5; y(−2)=3'],
 ['La diferencia entre recta y parábola se anula con multiplicidad dos.','x+5−f(x)=frac{(x+2)²}{4}≥0'],
 ]),mk(1,'Área=frac{15}{2} u²; recinto bajo y=x+5, sobre f en [−2,2] y sobre g en [2,3].',['Área=frac{40}{3} u²; recinto entre f y g en [−2,2].','Área=frac{125}{6} u²; recinto entre la recta y g en [−2,3].','Área=frac{16}{3} u²; solo la zona entre la recta y f en [−2,2].'],['Tomar el recinto que no tiene a la recta como frontera.','Incluir además el recinto inferior entre las dos parábolas.','Omitir la porción entre x=2 y x=3.'],[
 ['Localizamos todas las intersecciones para identificar el recinto que utiliza las tres curvas como frontera.','f=g ⇒ x=−2,2; g=x+5 ⇒ x=−2,3; f=x+5 ⇒ x=−2'],
 ['Calculamos los vértices curvos y ordenamos los límites; el dibujo adjunto sombrea solo el recinto pedido.','(−2,3),(2,3),(3,8); arriba: recta; abajo: f hasta 2, g desde 2'],
 ['Partimos el área donde cambia la frontera inferior.','A=∫_{−2}^{2}(frac{x²}{4}+x+1)dx+∫_{2}^{3}(−x²+x+6)dx'],
 ['La primera diferencia es un cuadrado dividido entre cuatro. Integramos y evaluamos.','H(x)=frac{x³}{12}+frac{x²}{2}+x; H(2)−H(−2)=frac{16}{3}'],
 ['Integramos la segunda diferencia y sumamos ambas cantidades positivas.','J(x)=−frac{x³}{3}+frac{x²}{2}+6x; J(3)−J(2)=frac{13}{6}; A=frac{32+13}{6}=frac{15}{2} u²'],
 ['Contrastamos restando al recinto recta–g el recinto inferior f–g; no contamos dos veces ninguna zona.','∫_{−2}^{3}(x+5−g)dx=frac{125}{6}; ∫_{−2}^{2}(f−g)dx=frac{40}{3}; frac{125}{6}−frac{40}{3}=frac{15}{2}'],
 ],true)];default:throw Error('Unknown tangent/piecewise/region source');}}
export function buildTangentPiecewiseRegionsBatch(id='batch-0462',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.subject==='mates'?'Integrales definidas y áreas':'Derivadas';x.secondaryTopics=c.subject==='mates'?['Derivadas']:['Continuidad'];x.block='Análisis';x.examSlot=3;x[c.subject==='mates'?'matesEvidence':'calculusEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.subject==='mates'?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':'SOURCE_BOUND_TANGENTS_PIECEWISE_GRAPHS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildTangentPiecewiseRegionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0462-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0462.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
