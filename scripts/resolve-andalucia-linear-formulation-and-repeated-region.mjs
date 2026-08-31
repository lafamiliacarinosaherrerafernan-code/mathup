// Four complete official exercises, checked on the PDF pages (PDFium where
// Poppler's Symbol substitution was defective). No historical answer is used.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
import {cases as pentagons,solve as solvePentagon} from './resolve-andalucia-linear-range-pentagon.mjs';
export const cases=[
 {index:243,kind:'linear-nutrition-formulation-and-separate-triangle',constraints:[[-1,0,0],[1,-2,2],[1,1,5]],objective:[4,3,0],domain:{x:[0,5],y:[-2,6]},labels:['x ≥ 0','x ≤ 2y + 2','x + y ≤ 5'],literals:['600 g de','200 g de proteínas','300 g de','600 g de proteínas','1800 g de','2400 g de proteínas','0.50 euros','0.25 euros','x ≤ 2y+2','x+ y≤5','4x + 3y']},
 {index:622,kind:'linear-pentagon-range-exclusion',constraints:[[-1,-1,-2],[1,3,15],[3,-1,15],[-1,0,0],[0,-1,0]],objective:[3,1,0],domain:{x:[0,7],y:[0,6]},labels:['x + y ≥ 2','x + 3y ≤ 15','3x − y ≤ 15','x ≥ 0','y ≥ 0'],literals:['x + y ≥ 2','x + 3y ≤ 15','3x − y ≤ 15','x ≥ 0, y ≥ 0','3x + y','F (x, y) = 30']},
 {index:908,kind:'linear-four-sided-maximum',constraints:[[1,1,15],[1,-2,0],[0,-1,0],[0,1,6],[-1,0,0]],objective:[8,5,0],domain:{x:[0,11],y:[0,7]},labels:['x + y ≤ 15','x ≤ 2y','y ≥ 0','y ≤ 6','x ≥ 0'],literals:['x + y ≤ 15','x ≤ 2 y','0 ≤ y ≤ 6','x ≥ 0','8x + 5y']},
 {...pentagons[1],index:967,kind:'linear-same-pentagon-different-subpart-order',literals:['x  2 y  11','x  2y  5','3x  y  18','x  0 y  0','5.5 , 2','2x  3y']},
];
const vertex=(p,c,answer,wrong,steps,graph=true)=>{const r=part(p,answer,wrong,['Perder una frontera o imponer positividad no pedida.','Despejar incorrectamente una intersección.','Aceptar puntos que incumplen alguna restricción.'],steps,'EXHAUSTIVE_BOUNDARY_INTERSECTIONS_AND_FEASIBILITY',derive(c));if(graph)r.visual=rationalGraph(c);return r;};
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===243){assert.equal(p.length,2);return[
 part(p[0],'Minimizar C=0,50x+0,25y; 2x+y≥6; x+3y≥12; x≥0; y≥0.',[
  'Minimizar C=0,50x+0,25y; 2x+y≤6; x+3y≥12; x≥0; y≥0.',
  'Minimizar C=0,50x+0,25y; 2x+y≥6; 3x+y≥12; x≥0; y≥0.',
  'Maximizar C=0,50x+0,25y; 2x+y≥6; x+3y≥12; x≥0; y≥0.',
 ],['Interpretar una necesidad mínima como una cota superior.','Intercambiar los aportes proteicos del maíz y el pienso.','Maximizar un gasto que el problema pide minimizar.'],[
  ['Definimos las variables en kilogramos por oveja y día. No se exige que sean enteras.','x: kg de maíz; y: kg de pienso; x,y≥0'],
  ['Cada kilogramo de maíz aporta 600 gramos de hidratos y cada kilogramo de pienso aporta 300.','Hidratos=600x+300y gramos'],
  ['La oveja necesita al menos 1800 gramos; dividimos toda la desigualdad entre 300.','600x+300y≥1800 ⇔ 2x+y≥6'],
  ['Contabilizamos las proteínas con sus propios coeficientes, sin intercambiarlos con los hidratos.','Proteínas=200x+600y gramos'],
  ['La necesidad mínima de proteínas es 2400 gramos; dividimos entre 200.','200x+600y≥2400 ⇔ x+3y≥12'],
  ['Multiplicamos los kilogramos por sus precios para obtener el gasto diario en euros.','C(x,y)=0,50x+0,25y'],
  ['El objetivo es minimizar el gasto bajo ambas restricciones y la no negatividad. El apartado pide plantear sin resolver; no se calculan cantidades óptimas.','min C; 2x+y≥6; x+3y≥12; x,y≥0'],
 ],'SOURCE_UNITS_AND_LINEAR_MODEL_EQUIVALENCE',{carbohydrates:[600,300,1800],proteins:[200,600,2400],cost:[.5,.25],variables:'continuous kg',requested:'formulation only'}),
 vertex(p[1],c,'Vértices (0;−1), (4;1), (0;5); máximo 19 en (4;1).',[
  'Vértices (0;0), (4;1), (0;5); máximo 19 en (4;1).',
  'Vértices (0;−1), (4;1), (0;5); máximo 15 en (0;5).',
  'Vértices (0;−1), (1;4), (0;5); máximo 16 en (1;4).',
 ],[
  ['Este apartado define un recinto distinto del modelo alimentario: no se trasladan las restricciones del apartado a).','x≥0; y≥frac{x−2}{2}; y≤5−x'],
  ['En x=0 las fronteras oblicuas determinan los dos extremos verticales. No se impone y≥0.','A=(0;−1); C=(0;5)'],
  ['Intersecamos las fronteras oblicuas para obtener el tercer vértice.','x=2y+2; x+y=5 ⇒ 3y=3 ⇒ B=(4;1)'],
  ['Sustituyendo la cota inferior en la superior se comprueba que la región termina en x=4.','frac{x−2}{2}≤5−x ⇔ x≤4'],
  ['La gráfica muestra el triángulo cerrado. Evaluamos la función en los tres vértices.','F(A)=−3; F(B)=16+3=19; F(C)=15'],
  ['El mayor valor es 19. Una combinación no negativa de las restricciones lo confirma en todo el recinto.','19−F=frac{1}{3}(2−x+2y)+frac{11}{3}(5−x−y)≥0'],
  ['La igualdad exige simultáneamente ambas fronteras oblicuas; el máximo es único.','x−2y=2; x+y=5 ⇒ (x,y)=(4;1)'],
 ])];}
 if(c.index===622){assert.equal(p.length,3);return[
 vertex(p[0],c,'Vértices (0;2), (2;0), (5;0), (6;3), (0;5).',[
  'Vértices (0;0), (2;0), (5;0), (6;3), (0;5).',
  'Vértices (0;2), (2;0), (5;0), (3;6), (0;5).',
  'Vértices (0;2), (2;0), (15;0), (6;3), (0;15).',
 ],[
  ['Despejamos y e intersectamos todos los semiplanos del primer cuadrante.','max(0;2−x;3x−15)≤y≤frac{15−x}{3}; x≥0'],
  ['Sobre el eje vertical las condiciones exigen 2≤y≤5.','A=(0;2); E=(0;5)'],
  ['Sobre el eje horizontal las condiciones exigen 2≤x≤5.','B=(2;0); C=(5;0)'],
  ['Intersecamos las otras dos rectas oblicuas: sumando la primera con tres veces la segunda eliminamos y.','x+3y=15; 3x−y=15 ⇒ 10x=60 ⇒ D=(6;3)'],
  ['Los cruces de x+y=2 con las otras rectas no son factibles: tienen alguna coordenada negativa.','x+y=2; x+3y=15 ⇒ (−frac{9}{2};frac{13}{2}); x+y=2; 3x−y=15 ⇒ (frac{17}{4};−frac{9}{4})'],
  ['Comprobamos las tres expresiones en los cinco vértices.','(x+y;x+3y;3x−y): A=(2;6;−2), B=(2;2;6), C=(5;5;15), D=(9;15;15), E=(5;15;−5)'],
  ['Todos satisfacen los signos exigidos y las cotas. Unimos A–B–C–D–E y sombreamos su interior, incluyendo el borde.','(2;2): 4≥2; 8≤15; 4≤15; x,y≥0'],
 ]),
 part(p[1],'Máximo 21 en (6;3); mínimo 2 en (0;2).',[
  'Máximo 15 en (5;0); mínimo 2 en (0;2).',
  'Máximo 21 en (6;3); mínimo 0 en (0;0).',
  'Máximo 21 en (6;3); mínimo 6 en (2;0).',
 ],['Considerar solo vértices del eje horizontal.','Admitir el origen aunque incumple x+y≥2.','Omitir el vértice (0;2) al buscar el mínimo.'],[
  ['La función lineal se evalúa en todos los vértices del recinto cerrado y acotado.','F=3x+y'],
  ['Calculamos los valores en los vértices inferiores.','F(A)=2; F(B)=6; F(C)=15'],
  ['Calculamos los restantes valores y los comparamos.','F(D)=21; F(E)=5; 2<5<6<15<21'],
  ['La cota inferior tiene una demostración independiente mediante holguras no negativas.','F−2=(x+y−2)+2x≥0'],
  ['La igualdad inferior exige x=0 y x+y=2; por tanto el mínimo es único.','F mínimo=2 en A=(0;2)'],
  ['Una combinación de las otras dos restricciones demuestra la cota superior global.','21−F=frac{3}{5}(15−x−3y)+frac{4}{5}(15−3x+y)≥0'],
  ['Ambas holguras se anulan únicamente en D.','F máximo=21 en D=(6;3)'],
 ],'EXACT_VERTEX_VALUES_AND_DUAL_BOUNDS',v),
 part(p[2],'No: para todo punto del recinto F(x,y)≤21<30.',[
  'Sí: el punto (10;0) pertenece al recinto y F(10,0)=30.',
  'Sí: el punto (5;15) pertenece al recinto y F(5,15)=30.',
  'No: para todo punto del recinto F(x,y)≥30.',
 ],['Resolver la ecuación de nivel sin comprobar 3x−y≤15.','Usar un punto que incumple x+3y≤15.','Confundir una cota superior con una inferior.'],[
  ['Buscamos la compatibilidad del nivel 30 con todas las restricciones, no solo una solución de la ecuación.','3x+y=30'],
  ['La cota superior del apartado anterior vale en todo el recinto.','21−(3x+y)=frac{3}{5}(15−x−3y)+frac{4}{5}(15−3x+y)≥0'],
  ['Si se impusiera el nivel 30, el lado izquierdo sería negativo, en contradicción con las holguras no negativas.','21−30=−9<0'],
  ['Por ejemplo, (10;0) satisface el nivel, pero no pertenece al recinto.','3·10−0=30>15'],
  ['También (5;15) satisface el nivel, pero incumple otra restricción.','5+3·15=50>15'],
  ['El máximo alcanzable es 21, por lo que no existe ningún punto factible con valor 30.','30>21 ⇒ nivel 30 exterior al recinto'],
 ],'LEVEL_EXCLUSION_BY_GLOBAL_UPPER_BOUND',{maximum:21,requested:30,possible:false})];}
 if(c.index===908){assert.equal(p.length,3);const vertices='Vértices (0;0), (10;5), (9;6), (0;6).',wrong=['Vértices (0;0), (15;0), (9;6), (0;6).','Vértices (0;0), (12;6), (9;6), (0;6).','Vértices (0;0), (5;10), (9;6), (0;6).'];return[
 vertex(p[0],c,vertices,wrong,[
  ['Las restricciones sitúan la región entre dos horizontales y a la derecha del eje vertical.','0≤y≤6; x≥0'],
  ['Las dos restricciones oblicuas proporcionan cotas superiores para x.','0≤x≤min(2y;15−y)'],
  ['Determinamos dónde cambia la cota más restrictiva.','2y=15−y ⇒ y=5; x=10'],
  ['Para ordenadas de 0 a 5 domina x≤2y; entre 5 y 6 domina x≤15−y.','0≤y≤5: x≤2y; 5≤y≤6: x≤15−y'],
  ['Las fronteras en x=0 aportan dos vértices y la horizontal y=6 aporta el vértice superior derecho.','A=(0;0); D=(0;6); C=(9;6); B=(10;5)'],
  ['La gráfica une A–B–C–D. No se incluye (15;0), porque incumple x≤2y.','(2;2): 4≤15; 2≤4; 0≤2≤6'],
 ]),
 vertex(p[1],c,vertices,wrong,[
  ['Intersecamos x=0 con y=0 y con y=6.','A=(0;0); D=(0;6)'],
  ['Intersecamos las dos rectas oblicuas.','x=2y; x+y=15 ⇒ 3y=15 ⇒ B=(10;5)'],
  ['Intersecamos la recta x+y=15 con y=6.','x=15−6=9 ⇒ C=(9;6)'],
  ['El cruce de x=2y con y=6 no pertenece al recinto.','(12;6): x+y=18>15'],
  ['El corte (15;0) de x+y=15 con el eje horizontal tampoco es factible.','15>2·0'],
  ['Verificamos los cuatro vértices en las restricciones oblicuas y la franja.','(x+y;x−2y;y): A=(0;0;0), B=(15;0;5), C=(15;−3;6), D=(6;−12;6)'],
 ],false),
 part(p[2],'Máximo 105 en (10;5).',['Máximo 102 en (9;6).','Máximo 30 en (0;6).','Máximo 126 en (12;6).'],['Elegir el punto de mayor ordenada sin comparar la función.','Omitir los vértices con abscisa positiva.','Evaluar un cruce que no satisface x+y≤15.'],[
  ['Calculamos el objetivo en el polígono cerrado y acotado.','F(x,y)=8x+5y'],
  ['Evaluamos los vértices del eje vertical.','F(A)=0; F(D)=30'],
  ['Evaluamos los otros dos vértices.','F(B)=80+25=105; F(C)=72+30=102'],
  ['El máximo entre los valores de los vértices es 105.','0<30<102<105'],
  ['Una combinación no negativa de restricciones demuestra que ningún punto interior supera ese valor.','105−F=7(15−x−y)+(2y−x)≥0'],
  ['La igualdad exige las dos fronteras oblicuas; el máximo es único.','x+y=15; x=2y ⇒ (x,y)=(10;5)'],
 ],'EXACT_MAXIMUM_DUAL_CERTIFICATE',v)];}
 assert.equal(c.index,967);assert.equal(p.length,3);
 // The inspected official statement has the identical five constraints and
 // objective as queue491 but asks membership before extrema. Reuse the
 // demonstrated mathematics, never an answer matched merely by ID/name.
 assert.deepEqual(c.constraints,pentagons[1].constraints);assert.deepEqual(c.objective,pentagons[1].objective);
 const reordered=`a) ${p[0].prompt}\nb) ${p[2].prompt}\nc) ${p[1].prompt}`;
 const base=solvePentagon({...c,index:491},reordered);
 return [base[0],base[2],base[1]].map((r,i)=>({...r,partId:p[i].id,prompt:p[i].prompt}));
}
export function buildFormulationRepeatedBatch(id='batch-0300',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFormulationRepeatedBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0300-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0300.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
