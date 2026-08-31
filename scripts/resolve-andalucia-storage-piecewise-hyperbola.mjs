import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [1050,'9d44d1fc271e59de2e53693497bd48e561a5dbbc3cdda0bcafc13d6d2d73c286',1,'A.2','3ed71a6825ea8ca6eea556e9b7573dcf6f6a30555b432fdb95281db3e69df043',0],
 [1052,'9c3d2d628115a2f20f17b47171106ddd90f214b5f6804bdf9a7dcb7037c75efd',2,'B.2','b2ed291f16ddc0fcc6060b9477aebc10b2ed838ec3fa157e9b92ac1fb781a154',0],
 [1053,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',1,'A.2','f01ef525d26fef4092e62bb0c9a2e3fb6c7e59a5f6e4ea9c7fa8a7c79715ace2',0],
 [1056,'ec6fd00d0daee547aa6128f3f6e1099278ee551f7f80917b331a1772764317b3',1,'A.2','106d2baf993c0a46476e641b8f83f53f92bf1554a93eb03a798bb84599f4514b',0],
];
export const statements={1050:'Un centro de bricolaje, que almacena bidones de pintura de interior y de exterior, cuenta con una capacidad máxima de almacenaje de 160 bidones. Por una cuestión logística, en el almacén deben mantenerse al menos 60 bidones, siendo como mínimo 20 bidones de pintura interior. Además, el número de bidones de pintura exterior almacenados no podrá ser inferior al de pintura interior. Se sabe que el gasto diario por almacenar cada bidón de pintura interior es de 1,50 € y por cada bidón de pintura exterior es de 0,90 €. Calcule cuántos bidones de cada tipo se deben almacenar para que el gasto diario sea mínimo e indique cuánto supone ese gasto mínimo.',1052:'Sea la función f(x)=cases{−x²−2ax+3,x≤1;ax²−6x+5,x>1}.\na) Calcule el valor de a para que f sea continua en x=1.\nb) Para a=1, represente su gráfica y, a la vista de ella, indique su monotonía y las coordenadas de sus extremos locales.',1053:'Sean f y g las funciones definidas por f(x)=2−x y g(x)=frac{2}{x+1} para x≠−1.\na) Calcula los puntos de corte entre las gráficas de f y g.\nb) Esboza las gráficas de f y g sobre los mismos ejes.\nc) Halla el área del recinto limitado por las gráficas de f y g.',1056:'Consideremos la función f(x)=cases{−x²+6x−5,2≤x≤4;−2x+11,4<x≤5}.\na) Estudie la derivabilidad de la función f(x) en el punto de abscisa x=4.\nb) Represente gráficamente la función f(x) e indique dónde alcanza su máximo y su mínimo absolutos. ¿Cuál es el valor del máximo? ¿Y del mínimo?'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_STORAGE_PIECEWISE_HYPERBOLA_LAYOUT']]:[];
export const cases=[{index:1050,slot:2,literals:['160 bidones','60 bidones','1.50€']},{index:1052,slot:3,literals:['2ax + 3','6x + 5','extremos locales']},{index:1053,slot:3,literals:['2 − x','x+1','recinto limitado']},{index:1056,slot:3,literals:['6x − 5','− 2x + 11','extremos'] }];
// The source says máximo/mínimo rather than the summary word extremos.
cases[3].literals=['6x − 5','− 2x + 11','mínimo absolutos'];
export const proof=c=>({1050:{vertices:[[20,40],[20,140],[80,80],[30,30]],costs:[66,156,192,72],minimum:[20,40,66]},1052:{a:1,join:0,derivativesAtJoin:[-4,-4],maximum:[-1,4],minimum:[3,-4]},1053:{intersections:[[0,2],[1,1]],area:1.5-2*Math.log(2),verticalAsymptote:-1,horizontalAsymptote:0},1056:{join:3,derivativesAtJoin:[-2,-2],endpoints:[[2,3],[5,1]],maximum:[3,4],minimum:[5,1]}}[c.index]);
export const graphs=Object.fromEntries(cases.map(c=>[c.index,{plotVersion:'storage-piecewise-hyperbola-v1',index:c.index}]));
export function renderStoragePiecewiseHyperbola(g){assert.deepEqual(g,graphs[g.index]);const i=g.index,[xmin,xmax,ymin,ymax]=i===1050?[0,100,0,180]:i===1052?[-4,6,-6,6]:i===1053?[-4,4,-6,8]:[1.5,5.5,0,5],X=x=>65+650*(x-xmin)/(xmax-xmin),Y=y=>320-280*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:501},(_,j)=>{const x=a+(b-a)*j/500;return pt(x,f(x));}).join(' '),curve=(f,a,b,col)=>`<polyline points="${trace(f,a,b)}" fill="none" stroke="${col}" stroke-width="3"/>`,dot=(x,y,col='#152e59')=>`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${col}"/>`,label=(x,y,t)=>`<text x="${X(x)+8}" y="${Y(y)-8}" font-size="14">${t}</text>`,clip=`storage-piecewise-${i}`;let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 425" role="img" aria-label="Gráfica de las fórmulas oficiales con fronteras y puntos verificados"><rect width="760" height="425" fill="white"/><defs><clipPath id="${clip}"><rect x="65" y="40" width="650" height="280"/></clipPath></defs>`;
for(let k=0;k<=5;k++){const x=xmin+(xmax-xmin)*k/5,y=ymin+(ymax-ymin)*k/5;s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e3e8ee"/><text x="${X(x)}" y="343" text-anchor="middle" font-size="14">${Number(x.toFixed(2))}</text><text x="58" y="${Y(y)+4}" text-anchor="end" font-size="14">${Number(y.toFixed(2))}</text>`;}
s+=`<g clip-path="url(#${clip})">`;
if(i===1050){s+=`<polygon points="${proof({index:i}).vertices.map(p=>pt(...p)).join(' ')}" fill="#ceeedd"/>`+curve(x=>60-x,0,100,'#196697')+curve(x=>160-x,0,100,'#196697')+curve(x=>x,0,100,'#954aba')+`<path d="M${pt(20,0)} L${pt(20,180)}" stroke="#196697" stroke-width="2"/>`+curve(x=>(66-1.5*x)/.9,0,44,'#c82936');for(const p of proof({index:i}).vertices)s+=dot(...p,p[1]===40?'#c82936':'#152e59')+label(...p,`(${p.join(';')})`);}
if(i===1052)s+=curve(x=>-x*x-2*x+3,xmin,1,'#17659b')+curve(x=>x*x-6*x+5,1,xmax,'#a4384b')+dot(-1,4)+label(-1,4,'Máx. (−1;4)')+dot(3,-4)+label(3,-4,'Mín. (3;−4)')+dot(1,0)+label(1,0,'Unión (1;0)');
if(i===1053)s+=`<polygon points="${trace(x=>2-x,0,1)} ${trace(x=>2/(x+1),1,0)}" fill="#cfe8f1"/>`+curve(x=>2-x,xmin,xmax,'#17659b')+curve(x=>2/(x+1),xmin,-1.01,'#a4384b')+curve(x=>2/(x+1),-.99,xmax,'#a4384b')+`<path d="M${pt(-1,ymin)} L${pt(-1,ymax)}" stroke="#666" stroke-dasharray="5 4"/>`+dot(0,2)+label(0,2,'(0;2)')+dot(1,1)+label(1,1,'(1;1)');
if(i===1056)s+=curve(x=>-x*x+6*x-5,2,4,'#17659b')+curve(x=>-2*x+11,4,5,'#a4384b')+[[2,3],[3,4],[4,3],[5,1]].map(p=>dot(...p)+label(...p,`(${p.join(';')})`)).join('');
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)} M${pt(0,ymin)} L${pt(0,ymax)}" stroke="#333"/></g>`;
const labels=i===1050?['x: bidones de interior; y: bidones de exterior.','Verde: región factible; rojo: gasto mínimo de 66 €/día.']:i===1052?['Azul: −x²−2x+3 (x≤1); rojo: x²−6x+5 (x>1).','Crece antes de −1 y después de 3; decrece entre −1 y 3.']:i===1053?['Azul: f(x)=2−x; rojo: g(x)=2/(x+1).','Asíntotas de g: x=−1 e y=0. Área entre x=0 y x=1.']:['Azul: −x²+6x−5 en [2;4]; rojo: −2x+11 en (4;5].','Máximo absoluto: (3;4). Mínimo absoluto: (5;1).'];return s+`<text x="35" y="380" font-size="17">${labels[0]}</text><text x="35" y="408" font-size="17">${labels[1]}</text></svg>`;}
export function solve(c){const ps=c.index===1050?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,r,s,v=false)=>{const p=part(ps[i],a,d,r,s,'INDEPENDENT_VERTEX_ENUMERATION_DERIVATIVES_AND_QUADRATURE',proof(c));if(v)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 1050:return[mk(0,'20 bidones de interior y 40 de exterior; gasto mínimo 66 €/día.',['30 bidones de interior y 30 de exterior; gasto mínimo 72 €/día.','20 bidones de interior y 140 de exterior; gasto mínimo 156 €/día.','80 bidones de interior y 80 de exterior; gasto mínimo 192 €/día.'],['Imponer igualdad de cantidades sin que la restricción lo exija.','Confundir el mínimo de existencias con la capacidad máxima.','Maximizar el gasto en lugar de minimizarlo.'],[
 ['Definimos las cantidades almacenadas y la función que se debe minimizar.','x=bidones de interior; y=bidones de exterior; C=1,50x+0,90y €/día'],
 ['Traducimos las cuatro condiciones y conservamos la no negatividad.','60≤x+y≤160; x≥20; y≥x; x≥0; y≥0'],
 ['Las fronteras son rectas; los semiplanos válidos son su intersección.','y=60−x; y=160−x; x=20; y=x; región sombreada en la gráfica'],
 ['Cortamos x=20 con las dos fronteras de capacidad y existencias.','V₁=(20,40); V₂=(20,140)'],
 ['Cortamos y=x con esas mismas fronteras para completar los vértices.','2x=160 ⇒ V₃=(80,80); 2x=60 ⇒ V₄=(30,30)'],
 ['Evaluamos el gasto en todos los vértices de la región cerrada y acotada.','C(V₁)=30+36=66; C(V₂)=30+126=156; C(V₃)=120+72=192; C(V₄)=45+27=72'],
 ['El menor valor corresponde a veinte bidones de interior y cuarenta de exterior.','C mínimo=66 €/día; 20+40=60≤160; 20≥20; 40≥20'],
 ['Comprobación independiente: reescribimos el objetivo como suma de cotas inferiores.','C=0,90(x+y)+0,60x≥0,90·60+0,60·20=66; igualdad solo si x=20,y=40'],
 ],true)];
case 1052:return[mk(0,'a=1.',['a=0.','a=−1.','a=frac{1}{3}.'],['Omitir los términos del parámetro al igualar ramas.','Cambiar el signo al despejar.','Perder el término constante de la rama derecha.'],[
 ['La continuidad en el punto de unión exige igualar límite izquierdo, valor y límite derecho.','lim_{x→1⁻}f(x)=f(1)=lim_{x→1⁺}f(x)'],
 ['Evaluamos la rama izquierda en uno.','f(1)=−1−2a+3=2−2a'],
 ['Calculamos el límite por la derecha en la rama polinómica.','lim_{x→1⁺}f(x)=a−6+5=a−1'],
 ['Igualamos y despejamos el parámetro.','2−2a=a−1 ⇒ 3=3a ⇒ a=1'],
 ['Comprobamos la coincidencia del valor y de ambos límites.','a=1 ⇒ 2−2a=0=a−1'],
 ['Como las ramas son polinomios, no presentan otras discontinuidades en sus intervalos.','f es continua en ℝ para a=1'],
 ]),mk(1,'Crece en (−∞,−1) y (3,+∞); decrece en (−1,3). Máximo local (−1,4); mínimo local (3,−4).',['Crece en (−1,3); decrece en (−∞,−1) y (3,+∞). Mínimo local (−1,4); máximo local (3,−4).','Crece en (−∞,1) y (3,+∞); decrece en (1,3). Máximo local (1,0); mínimo local (3,−4).','Crece en (−∞,−1) y (3,+∞); decrece en (−1,3). Máximo local (−1,−4); mínimo local (3,4).'],['Invertir los signos de las derivadas y el tipo de extremos.','Confundir el punto de unión con el vértice de la parábola izquierda.','Cambiar los signos de las ordenadas al evaluar.'],[
 ['Sustituimos a=1 y completamos cuadrados para reconocer los vértices de las parábolas.','f(x)=4−(x+1)² si x≤1; f(x)=(x−3)²−4 si x>1'],
 ['Derivamos cada rama y localizamos sus puntos críticos dentro del tramo correspondiente.','f′(x)=−2(x+1) si x<1; f′(x)=2(x−3) si x>1; x=−1,3'],
 ['Analizamos los signos, incluyendo los dos lados de la unión.','f′>0 en (−∞,−1); f′<0 en (−1,1) y (1,3); f′>0 en (3,+∞)'],
 ['En uno no aparece un extremo: las ramas enlazan descendiendo con igual pendiente.','f(1)=0; f′(1⁻)=f′(1⁺)=−4'],
 ['El cambio de creciente a decreciente da el máximo; el cambio inverso da el mínimo.','Máximo local: (−1,f(−1))=(−1,4); mínimo local: (3,f(3))=(3,−4)'],
 ['La gráfica adjunta confirma ambos vértices y la unión. No son extremos absolutos en todo ℝ.','lim_{x→−∞}f(x)=−∞; lim_{x→+∞}f(x)=+∞'],
 ],true)];
case 1053:return[mk(0,'Puntos de corte: (0,2) y (1,1).',['Puntos de corte: (−1,3) y (1,1).','Puntos de corte: (0,0) y (1,1).','Puntos de corte: (−1,3) y (0,2).'],['Aceptar x=−1 aunque no pertenece al dominio de g.','Confundir la abscisa cero con ordenada cero.','Perder la raíz x=1 e introducir el polo x=−1.'],[
 ['Igualamos las funciones en su dominio común.','2−x=frac{2}{x+1}; x≠−1'],
 ['Multiplicamos por el denominador no nulo.','(2−x)(x+1)=2'],
 ['Desarrollamos y reducimos la ecuación.','−x²+x+2=2 ⇒ x−x²=0'],
 ['Factorizamos y obtenemos las dos abscisas admisibles.','x(1−x)=0 ⇒ x=0 o x=1'],
 ['Calculamos las ordenadas en cualquiera de las funciones.','f(0)=2; f(1)=1'],
 ['Verificamos ambas coordenadas en la función racional original.','g(0)=2; g(1)=1 ⇒ (0,2),(1,1)'],
 ]),mk(1,'f es la recta decreciente por (0,2) y (2,0); g es una hipérbola con asíntotas x=−1 e y=0 y ramas negativa/positiva a izquierda/derecha de −1.',['f es la recta creciente por (0,2); g tiene asíntotas x=−1 e y=0.','f es la recta decreciente por (0,2) y (2,0); g tiene asíntotas x=1 e y=0.','f es la recta decreciente por (0,2) y (2,0); g tiene asíntotas x=−1 e y=2.'],['Cambiar el signo de la pendiente de f.','Cambiar el signo del cero del denominador.','Confundir el corte vertical con la asíntota horizontal.'],[
 ['La función lineal tiene pendiente negativa y cortes fáciles de situar.','f(x)=2−x; pendiente −1; cortes (0,2),(2,0)'],
 ['La función racional no está definida donde se anula el denominador.','x=−1; lim_{x→−1⁻}g(x)=−∞; lim_{x→−1⁺}g(x)=+∞'],
 ['Al crecer el valor absoluto de x el cociente se aproxima a cero.','lim_{x→±∞}g(x)=0; asíntota horizontal y=0'],
 ['La derivada muestra que cada rama de la hipérbola es decreciente.','g′(x)=−frac{2}{(x+1)²}<0'],
 ['Situamos las dos intersecciones y el orden de las curvas entre ellas.','f(x)−g(x)=frac{x(1−x)}{x+1}>0 para 0<x<1'],
 ['La gráfica representa las dos ramas sin unirlas a través de la asíntota y sombrea el recinto acotado.','Frontera superior f; frontera inferior g; 0≤x≤1'],
 ],true),mk(2,'Área=frac{3}{2}−2ln(2) u².',['Área=frac{3}{2}+2ln(2) u².','Área=2ln(2)−frac{3}{2} u².','Área=frac{3}{2}−ln(2) u².'],['Sumar las funciones en vez de restarlas.','Invertir el orden superior menos inferior y dar un área negativa.','Olvidar el factor dos en la primitiva racional.'],[
 ['Los cortes delimitan el intervalo del único recinto acotado.','0≤x≤1; f(x)≥g(x)'],
 ['Planteamos superior menos inferior.','A=∫_{0}^{1}(2−x−frac{2}{x+1})dx'],
 ['Integramos por linealidad y usamos que x+1 es positivo en este intervalo.','H(x)=2x−frac{x²}{2}−2ln(x+1)'],
 ['Aplicamos Barrow en el orden extremo superior menos inferior.','A=H(1)−H(0)=2−frac{1}{2}−2ln2'],
 ['Expresamos el resultado positivo.','A=frac{3}{2}−2ln2≈0,11371 u²'],
 ['Comprobamos por derivación y cuadratura independiente de la altura del recinto.','H′(x)=2−x−frac{2}{x+1}; ∫_{0}^{1}frac{x(1−x)}{x+1}dx≈0,11371'],
 ])];
case 1056:return[mk(0,'Es derivable en x=4 y f′(4)=−2.',['Es continua pero no derivable en x=4.','Es derivable en x=4 y f′(4)=2.','Es discontinua en x=4.'],['No comprobar que las derivadas laterales coinciden.','Perder el signo negativo al derivar las dos ramas.','Suponer un salto únicamente por existir dos fórmulas.'],[
 ['La derivabilidad requiere primero continuidad en la unión.','f(4)=−16+24−5=3'],
 ['Calculamos ambos límites laterales.','lim_{x→4⁻}f(x)=3; lim_{x→4⁺}f(x)=−8+11=3'],
 ['La continuidad queda demostrada y calculamos las derivadas de las ramas.','f′(x)=−2x+6 para 2<x<4; f′(x)=−2 para 4<x<5'],
 ['Evaluamos las derivadas laterales.','f′(4⁻)=−8+6=−2; f′(4⁺)=−2'],
 ['Como coinciden, existe la derivada y vale ese número.','f′(4)=−2'],
 ['Comprobamos directamente con el cociente incremental de ambas ramas.','Para h<0: frac{f(4+h)−f(4)}{h}=−2−h; para h>0: −2; ambos límites son −2'],
 ]),mk(1,'Máximo absoluto 4 en x=3; mínimo absoluto 1 en x=5.',['Máximo absoluto 3 en x=2; mínimo absoluto 1 en x=5.','Máximo absoluto 4 en x=3; mínimo absoluto 3 en x=4.','Máximo absoluto 3 en x=4; mínimo absoluto 1 en x=5.'],['Omitir el punto crítico interior al comparar valores.','Omitir el extremo derecho del dominio.','Tomar la unión de tramos como máximo sin estudiar el vértice.'],[
 ['El dominio cerrado permite buscar extremos entre puntos críticos y extremos del intervalo.','Dominio [2,5]; candidatos x=2,3,4,5'],
 ['El primer tramo es una parábola hacia abajo con vértice en tres.','f(x)=4−(x−3)²; f′(x)=−2(x−3)'],
 ['El signo de la derivada y la pendiente del segundo tramo determinan la monotonía.','Crece en (2,3); decrece en (3,4) y (4,5)'],
 ['Evaluamos todos los candidatos, incluida la unión.','f(2)=3; f(3)=4; f(4)=3; f(5)=1'],
 ['Comparamos las ordenadas y damos dónde se alcanzan los extremos absolutos.','Máximo: (3,4); mínimo: (5,1)'],
 ['La gráfica enlaza la parábola con el segmento sin salto y con extremos cerrados; confirma las cotas globales.','1≤f(x)≤4 en [2,5]'],
 ],true)];default:throw Error('Unknown storage/piecewise/hyperbola source');}}
export function buildStoragePiecewiseHyperbolaBatch(id='batch-0470',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1050?'Programación lineal':c.index===1053?'Integrales definidas y áreas':'Derivadas';x.secondaryTopics=c.index===1053?['Límites y continuidad']:[];x.block=c.index===1050?'Sistemas/programación lineal':'Análisis';x.examSlot=c.slot;x[c.index===1050?'linearEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.index===1050?'EXACT_FEASIBLE_POLYGON_VERTICES_AND_OBJECTIVE':c.index===1053?'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_DERIVED_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildStoragePiecewiseHyperbolaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0470-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0470.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
