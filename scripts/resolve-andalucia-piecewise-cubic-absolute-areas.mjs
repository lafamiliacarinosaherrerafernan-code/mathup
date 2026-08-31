import fs from'node:fs';import assert from'node:assert/strict';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
[930,'74b067b81be20aa0262a0cc58795f3b25488aa9c749d825b7b33f656dd1ae089',1,'NONE.3','08957986bb6035fef5ddc9225e41a3f8928a2e7e3fc1c785f51a9934b4b1a65e',0],
[942,'8b1971b90e1195617d7664a4841fb315183966683c3fab945fc7d484c7c54c8b',1,'NONE.3','c540168f04970bde6f497e8986d25648e95db74bacfd8c5a061d901af1d3efaf',0],
[970,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',1,'A.4','7b89c1ae266556929588efee3bb779a0c44ae58ea1c69a89403f163678b8594c',0]];
export const statements={930:'Se considera la función f(x)=cases{frac{1}{x} si x≤−1;−3x²+4 si −1<x<1;2x−1 si x≥1}.\na) Estudie la continuidad y derivabilidad de la función f en todo su dominio.\nb) Represente gráficamente la función f.\nc) Calcule el área de la región limitada por la gráfica de la función f, el eje de abscisas y las rectas x=0 y x=3.',942:'a) Se considera la función f(x)=x³+ax²+bx+c, con a, b y c números reales. Calcule los valores a, b y c, sabiendo que la gráfica de f posee un extremo relativo en el punto de abscisa x=3 y que la pendiente de la recta tangente a la gráfica de f en el punto P(0,18) es −3.\nb) Calcule el área del recinto acotado, limitado por la gráfica de la función g(x)=x³−4x²−3x+18 y el eje de abscisas.',970:'Considera las funciones f,g:ℝ→ℝ definidas por f(x)=|x²−1| y g(x)=x+5.\na) Calcula los puntos de corte de las gráficas de ambas funciones y esboza el recinto que determinan.\nb) Determina el área del recinto anterior.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PIECEWISE_CUBIC_ABSOLUTE_AREA_LAYOUT']]:[];
export const cases=[{index:930,slot:3,literals:['2x − 1','x = 3'],subject:'ccss'},{index:942,slot:3,literals:['𝑃(0,18)','−3','𝑥3 − 4𝑥2'],subject:'ccss'},{index:970,slot:3,literals:['|x2 − 1|','x + 5'],subject:'mates'}];
export const piecewise=x=>x<=-1?1/x:x<1?-3*x*x+4:2*x-1,cubic=x=>x*x*x-4*x*x-3*x+18,absolute=x=>Math.abs(x*x-1);
export const proof=c=>({930:{limitsAtMinus1:[-1,1],valueAtMinus1:-1,limitsAt1:[1,1],derivativesAt1:[-6,2],areas:[3,6],area:9},942:{coefficients:[-4,-3,18],roots:[-2,3],doubleRoot:3,primitive:'x^4/4-4*x^3/3-3*x^2/2+18*x',area:625/12},970:{intersections:[[-2,3],[3,8]],breaks:[-1,1],areas:[13/6,26/3,22/3],area:109/6}}[c.index]);
export const graphs=Object.fromEntries([930,942,970].map(index=>[index,{plotVersion:'piecewise-cubic-absolute-areas-v1',index}]));
export function renderPiecewiseCubicAbsolute(g){assert.deepEqual(g,graphs[g.index]);const index=g.index,[xmin,xmax,ymin,ymax,ystep]=index===930?[-4,3.5,-2,6,1]:index===942?[-2.3,3.5,-10,22,5]:[-2.5,3.5,-1,12,2],X=x=>65+620*(x-xmin)/(xmax-xmin),Y=y=>325-285*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:501},(_,i)=>{const x=a+(b-a)*i/500;return pt(x,f(x));}).join(' ');let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-label="Gráfica derivada de las fórmulas oficiales; recinto sombreado"><rect width="760" height="430" fill="white"/>';
for(let x=Math.ceil(xmin);x<=xmax;x++)s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)}" stroke="#e2e7ed"/><text x="${X(x)}" y="347" text-anchor="middle" font-size="17">${x}</text>`;
for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep)s+=`<path d="M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e2e7ed"/><text x="48" y="${Y(y)+5}" text-anchor="end" font-size="17">${y}</text>`;
const shade=(f,h,a,b)=>`<polygon points="${trace(f,a,b)} ${trace(h,b,a)}" fill="#ceeaf4"/>`,curve=(f,a,b,color='#075597')=>`<polyline points="${trace(f,a,b)}" stroke="${color}" fill="none" stroke-width="3"/>`,mark=(x,y,open=false)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${open?'white':'#075597'}" stroke="#075597" stroke-width="2"/>`;
if(index===930){s+=shade(x=>-3*x*x+4,()=>0,0,1)+shade(x=>2*x-1,()=>0,1,3);s+=curve(x=>1/x,xmin,-1)+curve(x=>-3*x*x+4,-1,1)+curve(x=>2*x-1,1,xmax)+mark(-1,-1)+mark(-1,1,true)+mark(1,1)+mark(0,4);}
if(index===942)s+=shade(cubic,()=>0,-2,3)+curve(cubic,xmin,xmax)+mark(-2,0)+mark(3,0);
if(index===970){s+=shade(x=>x+5,absolute,-2,3)+curve(absolute,xmin,-1)+curve(absolute,-1,1)+curve(absolute,1,xmax)+curve(x=>x+5,xmin,xmax,'#a52d3c')+mark(-2,3)+mark(3,8);}
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/>`;
const labels=index===930?['Ramas: hipérbola; parábola; recta. Sombreado: 0 ≤ x ≤ 3.','En x=−1: punto cerrado (−1;−1) y abierto (−1;1).']:index===942?['g(x)=x³−4x²−3x+18; recinto entre −2 y 3.','Raíz simple −2; raíz doble 3, tangencia con el eje.']:['f(x)=|x²−1| (azul); g(x)=x+5 (rojo).','Cortes (−2;3), (3;8); cambios de rama en −1 y 1.'];
return s+`<text x="45" y="382" font-size="18">${labels[0]}</text><text x="45" y="412" font-size="18">${labels[1]}</text></svg>`;}
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_PIECEWISE_SIGNS_DIFFERENTIATION_AND_QUADRATURE',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 930:return[mk(0,'Continua salvo en x=−1; derivable salvo en x=−1 y x=1.',['Continua en ℝ; derivable salvo en x=−1 y x=1.','Discontinua en x=−1 y x=1; derivable fuera de esos puntos.','Continua salvo en x=−1; derivable en todos los demás puntos.'],['Confundir la rama 1/x con la constante 1 y omitir el salto.','Confundir un cambio de pendiente con una discontinuidad de la función.','No comparar las derivadas laterales en uno.'],[
['Cada fórmula es continua y derivable en el interior de su tramo; 1/x solo se usa para x≤−1 y no introduce un hueco en cero.','Dom f=ℝ; puntos de unión: −1 y 1'],
['Calculamos los dos límites laterales y el valor de la función en la primera unión.','lim_{x→−1⁻}f(x)=−1=f(−1); lim_{x→−1⁺}f(x)=−3+4=1'],
['Los límites distintos prueban discontinuidad de salto; por ello tampoco existe derivada allí.','−1≠1 ⇒ f no es continua ni derivable en x=−1'],
['En la segunda unión sí coinciden ambos límites y el valor asignado.','lim_{x→1⁻}f(x)=1; lim_{x→1⁺}f(x)=1=f(1)'],
['Derivamos cada rama y comparamos las pendientes laterales en uno.','f′=−frac{1}{x²} si x<−1; f′=−6x si −1<x<1; f′=2 si x>1; f′₋(1)=−6≠2=f′₊(1)'],
['Concluimos separadamente continuidad y derivabilidad.','Continuidad: ℝ∖{−1}; derivabilidad: ℝ∖{−1,1}'],
]),mk(1,'Hipérbola negativa hasta (−1,−1) cerrado; arco parabólico con (−1,1) abierto y vértice (0,4); recta desde (1,1) de pendiente 2.',['Rama constante y=1 hasta x=−1; arco parabólico con vértice (0,4); recta desde (1,1) de pendiente 2.','Hipérbola negativa hasta (−1,−1); arco parabólico abierto hacia arriba con vértice (0,4); recta desde (1,1) de pendiente 2.','Hipérbola negativa hasta (−1,−1); arco parabólico con vértice (0,4); recta desde (1,3) de pendiente 2.'],['Leer la fracción 1/x como la constante uno.','Cambiar el signo del coeficiente cuadrático.','Cambiar −1 por +1 en la rama lineal.'],[
['Dibujamos cada fórmula solo en su intervalo, sin unir artificialmente puntos a través del salto.','x≤−1: y=frac{1}{x}'],
['La hipérbola es negativa, tiende a cero por debajo hacia la izquierda y termina en un punto incluido.','lim_{x→−∞}frac{1}{x}=0⁻; f(−1)=−1'],
['La rama central es una parábola cóncava hacia abajo, con máximo en su vértice.','y=−3x²+4; vértice (0,4); valores límite 1 en x=−1 y x=1'],
['El extremo izquierdo de esa parábola es abierto; el punto de la derecha queda incluido por la tercera fórmula.','(−1,1) abierto; (1,1) cerrado'],
['La tercera rama es una semirrecta ascendente a partir de uno.','y=2x−1 para x≥1; puntos (1,1),(2,3),(3,5)'],
['La gráfica adjunta conserva el salto, el vértice y el cambio de pendiente, y sombrea la región del apartado siguiente.','f(−2)=−frac{1}{2}; f(0)=4; f(2)=3'],
],true),mk(2,'Área=9 u².',['Área=6 u².','Área=3 u².','Área=18 u².'],['Omitir el área del tramo parabólico.','Omitir el área del tramo lineal.','Duplicar toda el área sin motivo.'],[
['Entre cero y tres la función es positiva, pero cambia de fórmula en uno.','−3x²+4≥1 en [0,1]; 2x−1≥1 en [1,3]'],
['Dividimos la integral en ese cambio de fórmula.','A=∫_{0}^{1}(−3x²+4)dx+∫_{1}^{3}(2x−1)dx'],
['La primera primitiva se obtiene integrando el polinomio término a término.','H₁(x)=−x³+4x; A₁=H₁(1)−H₁(0)=−1+4=3'],
['La segunda primitiva se evalúa conservando el extremo inferior.','H₂(x)=x²−x; A₂=(9−3)−(1−1)=6'],
['Sumamos las dos regiones positivas y expresamos unidades de superficie.','A=3+6=9 u²'],
['Comprobamos las primitivas por derivación; el segundo recinto es además un trapecio de bases 1 y 5 y anchura 2.','H₁′=−3x²+4; H₂′=2x−1; frac{1+5}{2}·2=6'],
],true)];
case 942:return[mk(0,'a=−4, b=−3, c=18.',['a=−5, b=3, c=18.','a=4, b=−3, c=18.','a=−4, b=−3, c=0.'],['Tomar positiva la pendiente tangente y resolver con ese signo.','Cambiar el signo al despejar el coeficiente cuadrático.','Olvidar que el punto dado pertenece a la gráfica.'],[
['El punto P pertenece a la gráfica; sustituimos su abscisa y ordenada.','f(0)=c=18'],
['La pendiente de la tangente es el valor de la derivada en la abscisa de contacto.','f′(x)=3x²+2ax+b; f′(0)=b=−3'],
['Un extremo relativo de un polinomio requiere derivada nula.','f′(3)=27+6a+b=0'],
['Sustituimos b y despejamos a.','27+6a−3=0 ⇒ 6a=−24 ⇒ a=−4'],
['Comprobamos que el punto crítico es realmente un extremo y no solo una derivada nula.','f″(x)=6x−8; f″(3)=10>0 ⇒ mínimo relativo'],
['Las tres condiciones originales se cumplen simultáneamente.','f(0)=18; f′(0)=−3; f′(3)=27−24−3=0'],
]),mk(1,'Área=frac{625}{12} u².',['Área=−frac{625}{12} u².','Área=frac{625}{6} u².','Área=frac{625}{24} u².'],['Invertir los extremos de integración.','Contar el mismo recinto dos veces por la raíz doble.','Dividir el área entre dos como si fuera un triángulo.'],[
['Factorizamos para localizar los cortes con el eje horizontal.','g(x)=(x−3)²(x+2) ⇒ raíces −2 y 3; la raíz 3 es doble'],
['Entre las raíces el cuadrado es no negativo y x+2 es positivo. La gráfica adjunta delimita el único recinto acotado.','g(x)>0 para −2<x<3; A=∫_{−2}^{3}g(x)dx'],
['Integramos término a término utilizando primitivas inmediatas.','H(x)=frac{x⁴}{4}−frac{4x³}{3}−frac{3x²}{2}+18x'],
['Evaluamos separadamente ambos extremos para controlar los signos.','H(3)=frac{99}{4}; H(−2)=−frac{82}{3}'],
['Aplicamos la regla de Barrow y reducimos a denominador común.','A=frac{99}{4}+frac{82}{3}=frac{297+328}{12}=frac{625}{12} u²'],
['Verificamos la derivada de la primitiva y la positividad del resultado; no cambiamos de signo en la raíz doble.','H′(x)=x³−4x²−3x+18; A≈52,08333 u²'],
],true)];
case 970:return[mk(0,'Cortes (−2,3) y (3,8); la recta queda por encima de f en el recinto.',['Cortes (−3,2) y (2,7); la recta queda por encima de f en el recinto.','Cortes (−2,3) y (3,8); f queda por encima de la recta en el recinto.','Cortes (−1,4) y (1,6); la recta queda por encima de f en el recinto.'],['Cambiar el signo del término lineal al resolver la ecuación de corte.','Invertir las curvas superior e inferior.','Confundir los cambios de rama con intersecciones.'],[
['El valor absoluto cambia la fórmula donde x²−1 es negativo.','f(x)=x²−1 para x≤−1 o x≥1; f(x)=1−x² para −1≤x≤1'],
['En las ramas exteriores igualamos con la recta y comprobamos que ambas raíces pertenecen a esas ramas.','x²−1=x+5 ⇒ x²−x−6=(x−3)(x+2)=0 ⇒ x=−2,3'],
['En la rama central la ecuación no tiene raíces reales.','1−x²=x+5 ⇒ x²+x+4=0; Δ=1−16=−15<0'],
['Calculamos las ordenadas con la recta.','g(−2)=3; g(3)=8 ⇒ cortes (−2,3),(3,8)'],
['Esbozamos la rama exterior izquierda decreciente, la derecha creciente y el arco central, conservando las esquinas.','f(−1)=f(1)=0; f(0)=1; g(x)=x+5'],
['La recta queda encima: en el tramo central x²+x+4 siempre es positivo, y en los exteriores la diferencia se anula solo en los extremos.','g−f=(3−x)(x+2) fuera de [−1,1]; g−f=x²+x+4 dentro'],
],true),mk(1,'Área=frac{109}{6} u².',['Área=frac{125}{6} u².','Área=frac{19}{2} u².','Área=frac{109}{3} u².'],['Quitar el valor absoluto sin cambiar la rama entre −1 y 1.','Olvidar el área de la rama central.','Duplicar el área total por una simetría inexistente del recinto.'],[
['Dividimos en los dos cambios de rama, manteniendo recta menos curva.','A=∫_{−2}^{−1}(−x²+x+6)dx+∫_{−1}^{1}(x²+x+4)dx+∫_{1}^{3}(−x²+x+6)dx'],
['Obtenemos una primitiva para cada tipo de integrando.','H(x)=−frac{x³}{3}+frac{x²}{2}+6x; J(x)=frac{x³}{3}+frac{x²}{2}+4x'],
['Evaluamos la primera zona.','H(−1)=−frac{31}{6}; H(−2)=−frac{22}{3}; A₁=frac{13}{6}'],
['Evaluamos la zona central, con su fórmula distinta.','J(1)=frac{29}{6}; J(−1)=−frac{23}{6}; A₂=frac{26}{3}'],
['Evaluamos la tercera zona y sumamos las tres áreas positivas.','H(3)=frac{27}{2}; H(1)=frac{37}{6}; A₃=frac{22}{3}; A=frac{13+52+44}{6}=frac{109}{6} u²'],
['Comprobamos que las primitivas derivan en las diferencias correctas y que la cuadratura independiente da la misma área.','H′=−x²+x+6; J′=x²+x+4; A≈18,16667 u²'],
],true)];default:throw Error('Unknown area case');}}
export function buildPiecewiseCubicAbsoluteBatch(id='batch-0456',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.subject==='mates'?'Integrales definidas y áreas':'Derivadas';x.secondaryTopics=c.subject==='mates'?[]:['Continuidad','Integrales definidas y áreas'];x.block='Análisis';x.examSlot=3;x[c.subject==='mates'?'matesEvidence':'calculusEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.subject==='mates'?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':'SOURCE_BOUND_PIECEWISE_CUBIC_ABSOLUTE_AREAS'};x.qualityGates.pedagogical='FULL_PIECEWISE_METHOD_WITH_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPiecewiseCubicAbsoluteBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0456-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0456.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
