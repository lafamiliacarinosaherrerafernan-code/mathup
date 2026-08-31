// Three official, page-inspected problems. Rational vertices and complete
// optimal faces are retained; there is no assumption of integer variables.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {regionGraph,renderGeneralRegionGraph} from './resolve-andalucia-linear-edge-and-formulation.mjs';
export const cases=[
 {index:113,kind:'linear-rational-extrema',constraints:[[-4,-2,-5],[2,5,10],[2,2,6],[-1,0,0],[0,-1,0]],objective:[1,2,0],domain:{x:[0,4],y:[0,3]},labels:['4x + 2y ≥ 5','2x + 5y ≤ 10','2x + 2y ≤ 6','x ≥ 0','y ≥ 0'],literals:['4 x \uf02b 2y \uf0b3 5','2x \uf02b 5y \uf0a3 10','2x \uf02b 2y \uf0a3 6','F(x, y) \uf03d x \uf02b 2y'],verticesText:'(frac{5}{4};0), (3;0), (frac{5}{3};frac{4}{3}), (frac{5}{16};frac{15}{8})',wrongVertices:['(frac{5}{4};0), (3;0), (frac{4}{3};frac{5}{3}), (frac{5}{16};frac{15}{8})','(frac{5}{4};0), (3;0), (frac{5}{3};frac{4}{3}), (frac{5}{8};frac{15}{16})','(frac{5}{4};0), (5;0), (frac{5}{3};frac{4}{3}), (frac{5}{16};frac{15}{8})']},
 {index:158,kind:'linear-rational-maximum',constraints:[[1,-3,8],[-3,-2,-15],[1,3,12],[-1,0,0],[0,-1,0]],objective:[5,9,0],domain:{x:[0,11],y:[0,5]},labels:['x − 3y ≤ 8','3x + 2y ≥ 15','x + 3y ≤ 12','x ≥ 0','y ≥ 0'],literals:['x \uf02d 3y \uf0a3 8','3x \uf02b 2y \uf0b3 15','x \uf02b 3y \uf0a3 12','F(x, y) \uf03d 5x \uf02b 9y'],verticesText:'(5;0), (8;0), (10;frac{2}{3}), (3;3)',wrongVertices:['(5;0), (8;0), (10;frac{3}{2}), (3;3)','(5;0), (12;0), (10;frac{2}{3}), (3;3)','(5;0), (8;0), (10;frac{2}{3}), (0;4)']},
 {index:299,kind:'linear-two-optimal-faces',constraints:[[2,-1,-2],[-4,2,10],[5,-1,4],[-1,0,0]],objective:[6,-3,0],domain:{x:[0,4],y:[0,12]},labels:['2x − y ≤ −2','4x − 2y ≥ −10','5x − y ≤ 4','x ≥ 0'],literals:['2x \uf02d y \uf0a3 \uf02d2','4x \uf02d 2 y \uf0b3 \uf02d10','5x \uf02d y \uf0a3 4','F(x, y) \uf03d 6x \uf02d 3y'],verticesText:'(0;2), (2;6), (3;11), (0;5)',wrongVertices:['(0;2), (2;6), (3;11), (0;−5)','(0;2), (2;6), (3;5), (0;5)','(0;2), (6;2), (3;11), (0;5)']},
];
export function rationalPair(x){for(let d=1;d<=64;d++){const n=Math.round(x*d);if(Math.abs(n/d-x)<1e-12)return[n,d];}throw Error('No demonstrated small rational coordinate');}
export function rationalGraph(c){const g=regionGraph(c);g.plotVersion='linear-rational-polygon-v1';g.exactCoordinates=g.vertices.map(v=>v.point.map(rationalPair));return g;}
export function renderRationalGraph(g){
 assert.equal(g.plotVersion,'linear-rational-polygon-v1');
 let svg=renderGeneralRegionGraph({...g,plotVersion:'linear-polygon-general-v1'});
 const num=([n,d],x)=>d===1?`<text x="${x}" y="0">${n}</text>`:`<g transform="translate(${x},0)" font-size="13" text-anchor="middle"><text x="9" y="-9">${n}</text><line x1="-3" x2="21" y1="-4" y2="-4" stroke="#15243b"/><text x="9" y="10">${d}</text></g>`;
 g.vertices.forEach((v,i)=>{const [x,y]=v.point,[rx,ry]=g.exactCoordinates[i];assert.equal(rx[0]/rx[1],x);assert.equal(ry[0]/ry[1],y);svg=svg.replace(`<text x="480" y="${225+i*27}">${v.label} = (${x}; ${y})</text>`,`<g transform="translate(480,${235+i*36})"><text>${v.label} = (</text>${num(rx,47)}<text x="80">;</text>${num(ry,96)}<text x="132">)</text></g>`);});
 return svg;
}
const vertexReasons=['Alterar una coordenada al resolver las fronteras.','Usar un corte o coordenada que no satisface todas las restricciones.','Confundir un cruce de rectas con un vértice factible.'];
const vertexPart=(p,c,steps,graphical=true)=>{const r=part(p,`Vértices ${c.verticesText}.`,c.wrongVertices.map(x=>`Vértices ${x}.`),vertexReasons,steps,'LINEAR_EXACT_INTERSECTIONS_AND_ALL_INEQUALITIES',derive(c));if(graphical)r.visual=rationalGraph(c);return r;};
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===113){assert.equal(p.length,2);return[
 vertexPart(p[0],c,[
  ['Dibujamos las rectas frontera y seleccionamos los semiplanos. La primera impone una cota inferior; las otras dos, superiores.','y≥frac{5}{2}−2x; y≤2−frac{2}{5}x; y≤3−x; x,y≥0'],
  ['Sobre el eje x, las restricciones exigen x≥5/4 y x≤3. Así obtenemos la base del polígono.','y=0 ⇒ frac{5}{4}≤x≤3 ⇒ A=(frac{5}{4};0), B=(3;0)'],
  ['Intersecamos las dos fronteras superiores. Al restar sus ecuaciones eliminamos x.','2x+5y=10; 2x+2y=6 ⇒ 3y=4 ⇒ y=frac{4}{3}; x=frac{5}{3} ⇒ C=(frac{5}{3};frac{4}{3})'],
  ['Intersecamos la primera frontera con la segunda. Multiplicamos la segunda por 2 y restamos la primera.','4x+2y=5; 4x+10y=20 ⇒ 8y=15 ⇒ y=frac{15}{8}; x=frac{5}{16} ⇒ D=(frac{5}{16};frac{15}{8})'],
  ['Descartamos el cruce restante porque tiene abscisa negativa. El eje y tampoco contiene puntos válidos: exigiría y≥5/2 e y≤2.','4x+2y=5; 2x+2y=6 ⇒ x=−frac{1}{2}<0'],
  ['Comprobamos todos los vértices por sustitución y conservamos las fracciones exactas.','(4x+2y;2x+5y;2x+2y): A=(5;frac{5}{2};frac{5}{2}), B=(12;6;6), C=(frac{28}{3};10;6), D=(5;10;frac{35}{8})'],
  ['Un punto interior confirma qué zona sombrear; la gráfica muestra la región común cerrada y acotada.','(1;1): 6≥5; 7≤10; 4≤6; x,y≥0'],
 ]),
 part(p[1],'Mínimo frac{5}{4} en (frac{5}{4};0); máximo frac{13}{3} en (frac{5}{3};frac{4}{3}).',[
  'Mínimo frac{5}{4} en (frac{5}{4};0); máximo frac{65}{16} en (frac{5}{16};frac{15}{8}).',
  'Mínimo 3 en (3;0); máximo frac{13}{3} en (frac{5}{3};frac{4}{3}).',
  'Mínimo frac{13}{3} en (frac{5}{3};frac{4}{3}); máximo frac{5}{4} en (frac{5}{4};0).'],[
  'Elegir el vértice de mayor ordenada sin comparar la función completa.','Omitir el vértice A al comparar mínimos.','Intercambiar mínimo y máximo.'],[
  ['La función es lineal y la región es un polígono cerrado y acotado. Evaluamos todos sus vértices.','F(x,y)=x+2y'],
  ['Sustituimos los dos vértices sobre el eje x.','F(A)=frac{5}{4}; F(B)=3'],
  ['Sustituimos los otros dos y sumamos con denominador común.','F(C)=frac{5}{3}+frac{8}{3}=frac{13}{3}; F(D)=frac{5}{16}+frac{30}{8}=frac{65}{16}'],
  ['Comparamos sin redondear: el mínimo y máximo son únicos.','frac{5}{4}<3<frac{65}{16}<frac{13}{3}; 65·3=195<208=13·16'],
  ['Una cota global independiente demuestra el mínimo. La igualdad exige y=0 y 4x+2y=5.','F−frac{5}{4}=frac{4x+2y−5}{4}+frac{3y}{2}≥0'],
  ['Otra combinación de holguras demuestra el máximo y exige que ambas fronteras se corten en C.','frac{13}{3}−F=frac{10−2x−5y}{3}+frac{6−2x−2y}{6}≥0'],
 ],'LINEAR_RATIONAL_EXTREMA_AND_DUAL_CERTIFICATES',v)];}
 if(c.index===158){assert.equal(p.length,3);return[
 vertexPart(p[0],c,[
  ['Despejamos y en las tres restricciones. Al dividir por un número negativo invertimos el sentido.','y≥frac{x−8}{3}; y≥frac{15−3x}{2}; y≤frac{12−x}{3}; x,y≥0'],
  ['La región queda por encima de las dos cotas inferiores y del eje x, y por debajo de la superior.','y≥0; y≥frac{x−8}{3}; y≥frac{15−3x}{2}'],
  ['Sobre el eje x, las restricciones delimitan un segmento.','y=0 ⇒ 5≤x≤8'],
  ['Las rectas oblicuas y ese segmento delimitan cuatro lados. Calcularemos cada intersección en el apartado siguiente.','A=(5;0); B=(8;0); C=(10;frac{2}{3}); D=(3;3)'],
  ['Descartamos el eje y: las cotas inferior y superior serían incompatibles.','x=0 ⇒ y≥frac{15}{2} y y≤4'],
  ['Comprobamos un punto interior para fijar la zona sombreada.','(6;1): 3≤8; 20≥15; 9≤12; x,y≥0'],
 ]),
 vertexPart(p[1],c,[
  ['La segunda frontera corta el eje x en A.','y=0; 3x=15 ⇒ A=(5;0)'],
  ['La primera frontera corta el eje x en B.','y=0; x=8 ⇒ B=(8;0)'],
  ['Sumamos primera y tercera fronteras para obtener C.','x−3y=8; x+3y=12 ⇒ 2x=20 ⇒ x=10; y=frac{2}{3}'],
  ['Resolvemos segunda y tercera fronteras. Eliminamos y multiplicando por 3 y 2.','3x+2y=15; x+3y=12 ⇒ 9x+6y=45; 2x+6y=24 ⇒ 7x=21 ⇒ D=(3;3)'],
  ['El cruce de las dos fronteras inferiores tiene y negativa y queda descartado.','x−3y=8; 3x+2y=15 ⇒ y=−frac{9}{11}<0'],
  ['Sustituimos los cuatro vértices en las expresiones originales.','(x−3y;3x+2y;x+3y): A=(5;15;5), B=(8;24;8), C=(8;frac{94}{3};12), D=(−6;15;12)'],
 ],false),
 part(p[2],'Máximo 56 en (10;frac{2}{3}).',['Máximo 42 en (3;3).','Máximo 40 en (8;0).','Máximo 25 en (5;0).'],[
  'Elegir el vértice con mayor y sin ponderar x.','Limitarse al extremo del eje x.','Confundir el valor mínimo entre vértices con el máximo.'],[
  ['Evaluamos la función en los cuatro vértices; el polígono es cerrado y acotado.','F=5x+9y'],
  ['Calculamos los valores en A y B.','F(A)=25; F(B)=40'],
  ['Calculamos el valor en C sin redondear la fracción.','F(C)=5·10+9·frac{2}{3}=50+6=56'],
  ['Evaluamos D y comparamos todos los valores.','F(D)=15+27=42; 25<40<42<56'],
  ['El máximo está en C. Una cota global independiente lo confirma para todos los puntos, no solo para los vértices.','56−F=(8−x+3y)+4(12−x−3y)≥0'],
  ['La igualdad exige que ambas holguras sean cero. Su único cruce factible es C.','x−3y=8; x+3y=12 ⇒ (x,y)=(10;frac{2}{3})'],
 ],'LINEAR_MAXIMUM_AND_GLOBAL_DUAL_BOUND',v)];}
 assert.equal(c.index,299);assert.equal(p.length,2);return[
 vertexPart(p[0],c,[
  ['Despejamos y respetando el cambio de sentido al dividir por coeficientes negativos.','y≥2x+2; y≤2x+5; y≥5x−4; x≥0'],
  ['Las dos primeras rectas son paralelas; el recinto está entre ellas, sobre la tercera y a la derecha del eje y.','2x+2≤y≤2x+5; y≥5x−4'],
  ['El eje y proporciona dos vértices.','x=0 ⇒ 2≤y≤5 ⇒ A=(0;2), D=(0;5)'],
  ['La primera cota inferior se cruza con la tercera frontera en B.','2x+2=5x−4 ⇒ 3x=6 ⇒ B=(2;6)'],
  ['La tercera frontera alcanza la superior en C.','5x−4=2x+5 ⇒ 3x=9 ⇒ C=(3;11)'],
  ['Las cotas fuerzan x≤3. El recinto cerrado y acotado tiene los cuatro segmentos que muestra la gráfica.','5x−4≤2x+5 ⇒ x≤3'],
  ['Verificamos todos los vértices en las restricciones, no solo en las dos fronteras que los generan.','(2x−y;4x−2y;5x−y): A=(−2;−4;−2), B=(−2;−4;4), C=(−5;−10;4), D=(−5;−10;−5)'],
 ]),
 part(p[1],'Máximo −6 en todo el segmento (0;2)–(2;6); mínimo −15 en todo el segmento (0;5)–(3;11).',[
  'Máximo −6 solo en (0;2); mínimo −15 solo en (0;5).',
  'Máximo −15 en todo el segmento (0;5)–(3;11); mínimo −6 en todo el segmento (0;2)–(2;6).',
  'Máximo 6 en todo el segmento (0;2)–(2;6); mínimo 15 en todo el segmento (0;5)–(3;11).'],[
  'Omitir los restantes puntos de ambas aristas óptimas.','Intercambiar máximos y mínimos de números negativos.','Cambiar el signo al sustituir la ordenada.'],[
  ['Evaluamos la función en todos los vértices.','F(x,y)=6x−3y; F(A)=−6; F(B)=12−18=−6; F(C)=18−33=−15; F(D)=−15'],
  ['Los empates se producen entre vértices consecutivos. La función lineal es constante en cada una de esas aristas.','F=−3(y−2x)'],
  ['En la arista inferior y−2x vale 2; todos sus puntos maximizan F.','y=2x+2, 0≤x≤2 ⇒ F=−6'],
  ['En la arista superior y−2x vale 5; todos sus puntos minimizan F.','y=2x+5, 0≤x≤3 ⇒ F=−15'],
  ['Expresamos todos los maximizadores con un parámetro y comprobamos la tercera desigualdad.','(x,y)=(2t;2+4t), 0≤t≤1; 5x−y=6t−2≤4'],
  ['Expresamos todos los minimizadores y comprobamos esa misma restricción.','(x,y)=(3t;5+6t), 0≤t≤1; 5x−y=9t−5≤4'],
  ['Una verificación global obtiene ambos extremos directamente de las holguras de las dos rectas paralelas.','−6−F=3(y−2x−2)≥0; F+15=3(2x+5−y)≥0'],
  ['Por tanto, no basta con nombrar un vértice: hay infinitos puntos óptimos en cada uno de los dos segmentos.','−15≤F(x,y)≤−6'],
 ],'LINEAR_TWO_COMPLETE_OPTIMAL_FACES',{...v,maximumFace:{from:[0,2],to:[2,6],value:-6},minimumFace:{from:[0,5],to:[3,11],value:-15}})];
}
export function buildRationalFacesBatch(id='batch-0293',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRationalFacesBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0293-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0293.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0),answers:r.batch.records.map(r=>r.parts.map(p=>p.answer))}));}
