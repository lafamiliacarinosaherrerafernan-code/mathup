// Whole official exercises, solved from their page-inspected statements.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:1240,kind:'linear-negative-ordinate-face',constraints:[[1,1,4],[-1,1,2],[-1,-3,-2],[0,1,2]],objective:[1,1,0],domain:{x:[-2,6],y:[-2,3]},labels:['x + y ≤ 4','x − y ≥ −2','x + 3y ≥ 2','y ≤ 2'],literals:['x+y ≤ 4','x − y ≥ −2','x + 3y ≥ 2','y≤2','(4, −0.75)','F (x, y) = x + y'],verticesText:'(−1;1), (5;−1), (2;2), (0;2)',wrongVertices:['(1;1), (5;−1), (2;2), (0;2)','(−1;1), (5;1), (2;2), (0;2)','(−1;1), (5;−1), (1;3), (0;2)']},
 {index:1356,kind:'linear-low-level-face',constraints:[[-1,1,3],[-1,-5,-3],[2,7,30],[0,-1,0]],objective:[1,-1,0],domain:{x:[-3,16],y:[0,5]},labels:['y ≤ x + 3','x + 5y ≥ 3','2x + 7y ≤ 30','y ≥ 0'],literals:['y ≤ x + 3','x + 5y ≥ 3','2x + 7 y ≤ 30','y ≥ 0','(5, 3)','F (x , y)= x − y'],verticesText:'(−2;1), (3;0), (15;0), (1;4)',wrongVertices:['(2;1), (3;0), (15;0), (1;4)','(−2;1), (3;0), (30;0), (1;4)','(−2;1), (3;0), (15;0), (4;1)']},
 {index:1330,kind:'linear-diet-optimal-segment',constraints:[[1,1,4],[-3,-1,-4],[-1,-2,-3],[-1,0,0],[0,-1,0]],objective:[6,12,0],domain:{x:[0,5],y:[0,5]},labels:['x + y ≤ 4','3x + y ≥ 4','x + 2y ≥ 3','x ≥ 0','y ≥ 0'],literals:['cuesta 6 €','3 unidades de proteínas','1 de calorías','cuesta 12 €','1 unidad de proteínas y 2 de','más de 4 kg','4 unidades de proteínas y 3 de calorías'],verticesText:'(0;4), (1;1), (3;0), (4;0)'},
];
const vertex=(p,c,steps)=>{const r=part(p,`Vértices ${c.verticesText}.`,c.wrongVertices.map(s=>`Vértices ${s}.`),['Perder el signo de una coordenada.','Despejar incorrectamente una intersección.','Conservar un cruce no factible o invertir coordenadas.'],steps,'EXHAUSTIVE_BOUNDARIES_AND_ALL_CONSTRAINTS',derive(c));r.visual=rationalGraph(c);return r;};
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===1240){assert.equal(p.length,3);return[
 vertex(p[0],c,[
  ['Despejamos las cuatro desigualdades para identificar sus semiplanos, sin añadir positividad no exigida.','y≤4−x; y≤x+2; y≥frac{2−x}{3}; y≤2'],
  ['La frontera inferior y la cota y≤x+2 se cortan en el extremo izquierdo.','x+2=frac{2−x}{3} ⇒ 4x=−4 ⇒ A=(−1;1)'],
  ['La frontera inferior y la cota y≤4−x se cortan en el extremo derecho.','4−x=frac{2−x}{3} ⇒ 2x=10 ⇒ B=(5;−1)'],
  ['La horizontal superior corta las otras dos cotas superiores.','y=2 ⇒ C=(2;2) y D=(0;2)'],
  ['El cruce de las dos cotas oblicuas no es factible, porque supera la horizontal.','4−x=x+2 ⇒ (1;3); 3>2'],
  ['El cruce de la horizontal con la frontera inferior tampoco cumple todas las restricciones.','y=2; x+3y=2 ⇒ (−4;2); x−y=−6<−2'],
  ['Los cuatro vértices restantes satisfacen todas las desigualdades. La gráfica sombrea su intersección cerrada y acotada.','A=(−1;1); B=(5;−1); C=(2;2); D=(0;2)'],
 ]),
 part(p[1],'No pertenece: x+3y=1,75<2.',['Sí pertenece: cumple las cuatro restricciones.','No pertenece: y=−0,75 incumple una supuesta condición y≥0.','No pertenece: x−y=4,75<−2.'],['Omitir la tercera desigualdad.','Añadir una restricción que el enunciado no impone.','Invertir una comparación numérica.'],[
  ['Para pertenecer a la región deben cumplirse las cuatro desigualdades, incluidas las que no son cotas superiores.','P=(4;−0,75)'],
  ['Comprobamos la primera restricción.','x+y=4−0,75=3,25≤4'],
  ['Comprobamos la segunda, recordando el signo menos delante de la ordenada.','x−y=4−(−0,75)=4,75≥−2'],
  ['Comprobamos la tercera y encontramos una infracción.','x+3y=4−2,25=1,75<2'],
  ['La cuarta sí se cumple; no repara la infracción anterior.','y=−0,75≤2'],
  ['Una sola condición incumplida basta. No rechazamos la ordenada negativa por sí misma: el recinto sí contiene puntos con y<0.','P no pertenece porque x+3y<2'],
 ],'FOUR_POINT_CONSTRAINT_SUBSTITUTIONS',{point:[4,-.75],lhs:[3.25,4.75,1.75,-.75],belongs:false}),
 part(p[2],'Máximo 4 en todo el segmento (5;−1)–(2;2); mínimo 0 en (−1;1).',['Máximo 4 solo en (2;2); mínimo 0 en (−1;1).','Máximo 4 en todo el segmento (5;−1)–(2;2); mínimo 2 en (0;2).','Máximo 4 en todo el segmento (−1;1)–(0;2); mínimo 0 en (−1;1).'],['Ignorar la arista completa de máximos.','Omitir el vértice que da el mínimo.','Asociar el máximo a la arista equivocada.'],[
  ['Evaluamos F en cada vértice del polígono.','F(A)=−1+1=0; F(B)=5−1=4; F(C)=2+2=4; F(D)=0+2=2'],
  ['La restricción x+y≤4 proporciona directamente la cota superior en toda la región.','F≤4'],
  ['La igualdad se obtiene sobre la frontera x+y=4. Sustituimos y=4−x en las otras condiciones.','2x−4≥−2; 12−2x≥2; 4−x≤2'],
  ['Combinando las condiciones se obtiene todo el segmento, no solo sus extremos.','2≤x≤5; y=4−x'],
  ['Sumar las dos restricciones inferiores demuestra la cota inferior independientemente de la tabla de vértices.','F=frac{x−y+2}{2}+frac{x+3y−2}{2}≥0'],
  ['Para que F=0 deben anularse ambas holguras, lo que fija el mínimo único.','x−y=−2; x+3y=2 ⇒ (x;y)=(−1;1)'],
  ['Conservamos tanto la unicidad del mínimo como todos los máximos.','F mínimo=0 en A; F máximo=4 en BC'],
 ],'GLOBAL_DUAL_BOUNDS_AND_COMPLETE_OPTIMAL_FACE',v)];}
 if(c.index===1356){assert.equal(p.length,3);return[
 vertex(p[0],c,[
  ['Escribimos las cotas sobre y y mantenemos también y≥0.','y≤x+3; y≥frac{3−x}{5}; y≤frac{30−2x}{7}; y≥0'],
  ['Sobre el eje horizontal, las restricciones acotan x por ambos lados.','y=0 ⇒ 3≤x≤15 ⇒ B=(3;0), C=(15;0)'],
  ['El encuentro de la primera cota superior y la cota inferior produce el vértice izquierdo.','x+3=frac{3−x}{5} ⇒ 6x=−12 ⇒ x=−2; y=1'],
  ['El encuentro de las dos cotas superiores produce el vértice más alto.','x+3=frac{30−2x}{7} ⇒ 9x=9 ⇒ D=(1;4)'],
  ['El cruce de la otra cota inferior con la segunda superior queda bajo el eje y=0 y se descarta.','x+5y=3; 2x+7y=30 ⇒ y=−8; x=43'],
  ['Comprobamos todos los vértices por sustitución. La región es el cuadrilátero limitado por las cuatro fronteras.','A=(−2;1); B=(3;0); C=(15;0); D=(1;4)'],
 ]),
 part(p[1],'No pertenece: 2x+7y=31>30.',['Sí pertenece: cumple las cuatro restricciones.','No pertenece: y=3>x+3=8.','No pertenece: x+5y=20<3.'],['No verificar la tercera restricción.','Invertir la comparación de la primera condición.','Invertir la comparación de la segunda condición.'],[
  ['Comprobamos por separado las cuatro restricciones en el punto indicado.','P=(5;3)'],
  ['La primera condición sí se cumple.','3≤5+3=8'],
  ['La segunda también.','5+5·3=20≥3'],
  ['La tercera no se cumple.','2·5+7·3=31>30'],
  ['La ordenada sí es no negativa, pero eso no elimina la infracción anterior.','3≥0'],
  ['Concluimos usando la intersección de semiplanos, que exige satisfacer todas las restricciones.','P no pertenece al recinto'],
 ],'FOUR_POINT_CONSTRAINT_SUBSTITUTIONS',{point:[5,3],lhs:[3,20,31,3],belongs:false}),
 part(p[2],'Mínimo −3 en todo el segmento (−2;1)–(1;4); máximo 15 en (15;0).',['Mínimo −3 solo en (−2;1); máximo 15 en (15;0).','Mínimo −3 en todo el segmento (−2;1)–(1;4); máximo 3 en (3;0).','Mínimo 3 en (3;0); máximo 15 en (15;0).'],['Omitir los demás puntos de la arista mínima.','Elegir un valor positivo sin compararlo con el mayor.','Descartar indebidamente los valores negativos.'],[
  ['Evaluamos el objetivo en los cuatro vértices.','F(A)=−2−1=−3; F(B)=3; F(C)=15; F(D)=1−4=−3'],
  ['La primera restricción implica directamente una cota inferior para F.','y≤x+3 ⇒ F=x−y≥−3'],
  ['La igualdad exige y=x+3; sustituimos esta ecuación en las otras condiciones.','x+5(x+3)≥3 ⇒ x≥−2; 2x+7(x+3)≤30 ⇒ x≤1'],
  ['La ordenada es no negativa a lo largo de ese segmento. Todos sus puntos alcanzan el mínimo.','−2≤x≤1; y=x+3≥1'],
  ['Una combinación de holguras demuestra una cota superior global.','15−F=frac{30−2x−7y}{2}+frac{9y}{2}≥0'],
  ['Para alcanzar 15 deben anularse ambas holguras. Eso determina un único vértice.','y=0; 2x+7y=30 ⇒ x=15'],
  ['Indicamos las ubicaciones completas de los extremos.','F mínimo=−3 en AD; F máximo=15 solo en C'],
 ],'GLOBAL_DUAL_BOUNDS_AND_COMPLETE_OPTIMAL_FACE',v)];}
 assert.equal(c.index,1330);assert.equal(p.length,2);const a=part(p[0],'Minimizar 6x+12y; x+y≤4; 3x+y≥4; x+2y≥3; x,y≥0.',['Minimizar 6x+12y; x+y≤4; x+3y≥4; 2x+y≥3; x,y≥0.','Minimizar 6x+12y; x+y≥4; 3x+y≥4; x+2y≥3; x,y≥0.','Minimizar 12x+6y; x+y≤4; 3x+y≥4; x+2y≥3; x,y≥0.'],['Intercambiar los aportes de los alimentos.','Invertir el límite máximo de masa.','Intercambiar los precios por kilogramo.'],[
  ['Definimos las variables como cantidades semanales de cada alimento, en kilogramos. No se exige que sean enteras.','x=kg de lácteos; y=kg de pescado; x,y≥0'],
  ['El coste es la suma del precio de cada alimento multiplicado por su cantidad. Debemos minimizarlo.','C=6x+12y'],
  ['No tomar más de cuatro kilogramos significa una cota superior, no inferior.','x+y≤4'],
  ['Cada kilogramo de lácteos aporta tres unidades de proteínas y cada kilogramo de pescado una.','3x+y≥4'],
  ['Los aportes calóricos son una y dos unidades por kilogramo, respectivamente.','x+2y≥3'],
  ['Reunimos las restricciones y el objetivo, manteniendo las unidades y el sentido de cada desigualdad.','Minimizar C=6x+12y sujeto a x+y≤4; 3x+y≥4; x+2y≥3; x,y≥0'],
 ],'SOURCE_COEFFICIENTS_DIMENSIONS_AND_CONSTRAINT_POLARITIES',{prices:[6,12],protein:[3,1],calories:[1,2],maximumKg:4,minimumProtein:4,minimumCalories:3});
 const b=part(p[1],'Coste mínimo 18 €: todas las dietas x+2y=3 con 1≤x≤3 (x lácteos, y pescado, en kg).',['Coste mínimo 18 €: únicamente x=3, y=0 kg.','Coste mínimo 18 €: únicamente x=1, y=1 kg.','Coste mínimo 24 €: únicamente x=4, y=0 kg.'],['Ignorar las mezclas que también alcanzan el mínimo.','Ignorar el segmento de mezclas igualmente óptimas.','Elegir una dieta factible, pero más cara.'],[
  ['Despejamos las rectas frontera para representar la región del primer cuadrante.','y≤4−x; y≥4−3x; y≥frac{3−x}{2}; x,y≥0'],
  ['Sobre los ejes obtenemos los vértices (0;4), (3;0) y (4;0).','x=0 ⇒ y=4; y=0 ⇒ 3≤x≤4'],
  ['Intersecamos las dos restricciones de nutrientes para hallar el cuarto vértice.','3x+y=4; x+2y=3 ⇒ 5x=5 ⇒ (x;y)=(1;1)'],
  ['Evaluamos el coste en cada vértice de la región dibujada.','C(0;4)=48; C(1;1)=18; C(3;0)=18; C(4;0)=24'],
  ['El mínimo se repite en dos vértices. La restricción de calorías demuestra por sí sola que ningún punto puede abaratarlo.','C=6(x+2y)≥6·3=18 €'],
  ['Para alcanzar el mínimo se exige x+2y=3. Sustituimos y=(3−x)/2 en la condición proteica.','3x+frac{3−x}{2}≥4 ⇒ 5x≥5 ⇒ x≥1'],
  ['La no negatividad exige x≤3. El límite de masa se cumple en todo ese intervalo.','1≤x≤3; y=frac{3−x}{2}; x+y=frac{x+3}{2}≤3≤4'],
  ['Existen infinitas dietas óptimas. Por ejemplo, dos kilogramos de lácteos y medio kilogramo de pescado cumplen todo.','(x;y)=(2;0,5): proteínas=6,5≥4; calorías=3; masa=2,5≤4; coste=18 €'],
 ],'EXACT_DIET_COEFFICIENTS_AND_CONTINUOUS_OPTIMAL_FACE',v);b.visual=rationalGraph(c);return[a,b];
}
export function buildDietFacesBatch(id='batch-0298',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDietFacesBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0298-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0298.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
