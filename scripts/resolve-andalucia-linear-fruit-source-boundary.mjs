// The official page places a matrix from exercise 2 beside the final line
// of exercise 1. Preserve that extraction artifact but exclude it from delivery.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[{index:900,kind:'linear-fruit-and-independent-region',constraints:[[-1,-4,-5],[-1,-2,-4],[7,5,35],[-1,0,0]],objective:[2,1,0],domain:{x:[0,6],y:[0,8]},labels:['x + 4y ≥ 5','x + 2y ≥ 4','7x + 5y ≤ 35','x ≥ 0'],literals:['75 g de arándanos, 100 g de frambuesas','2.40 euros','50 g de frambuesas','1.80 euros','3.75 kg','4 kg','x + 4y ≥ 5','x + 2y ≥ 4','7x + 5y ≤ 35','2x + y']}];
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,2);const v=derive(c);
 const a=part(p[0],'Maximizar 2,4x+1,8y; x+y≤50; 2x+y≤80; x≤2y; x,y enteros no negativos.',[
 'Maximizar 2,4x+1,8y; x+y≤50; x+2y≤80; x≤2y; x,y enteros no negativos.',
 'Maximizar 2,4x+1,8y; x+y≤50; 2x+y≤80; x≥2y; x,y enteros no negativos.',
 'Minimizar 2,4x+1,8y; x+y≤50; 2x+y≤80; x≤2y; x,y enteros no negativos.'
 ],['Intercambiar las cantidades de frambuesas que lleva cada surtido.','Invertir la relación entre surtidos A y B.','Minimizar cuando se pide el beneficio máximo.'],[
 ['Sea x el número de surtidos A e y el de surtidos B; contamos unidades completas.','x,y∈ℤ; x≥0; y≥0'],
 ['Convertimos ambas existencias a gramos para usar las mismas unidades.','3,75 kg=3750 g; 4 kg=4000 g'],
 ['Cada surtido consume 75 g de arándanos; no podemos superar 3750 g.','75x+75y≤3750 ⇒ x+y≤50'],
 ['El tipo A consume 100 g de frambuesas y el B 50 g.','100x+50y≤4000 ⇒ 2x+y≤80'],
 ['El número de surtidos A es menor o igual que el doble de los B.','x≤2y'],
 ['La función objetivo usa los importes indicados en el enunciado, sin introducir costes no dados.','Maximizar B(x,y)=2,4x+1,8y'],
 ['La petición es formular sin resolver: reunimos función objetivo, restricciones e integridad sin buscar aquí el óptimo.','max B; x+y≤50; 2x+y≤80; x≤2y; x,y∈ℤ; x,y≥0'],
 ],'UNIT_CONVERSION_AND_MODEL_EQUIVALENCE',{blueberriesGrams:3750,raspberriesGrams:4000,consumption:[[75,75],[100,50]],integer:true,formulationOnly:true});
 const b=part(p[1],'Vértices (0;2), (3;frac{1}{2}), (5;0), (0;7); mínimo 2 en (0;2).',[
 'Vértices (0;2), (3;frac{1}{2}), (5;0), (0;7); mínimo frac{13}{2} en (3;frac{1}{2}).',
 'Vértices (0;2), (3;frac{1}{2}), (5;0), (0;7); mínimo 10 en (5;0).',
 'Vértices (0;2), (3;frac{1}{2}), (5;0), (0;7); mínimo 7 en (0;7).'
 ],['Elegir el cruce de las dos cotas inferiores sin comparar con el eje y.','Elegir el vértice con menor ordenada sin evaluar 2x+y.','Confundir el extremo superior del eje y con el mínimo.'],[
 ['Este recinto es independiente del modelo de surtidos. Despejamos las cotas de y dadas en su propio apartado.','y≥frac{5−x}{4}; y≥frac{4−x}{2}; y≤7−frac{7}{5}x; x≥0'],
 ['En el eje y, las dos cotas inferiores exigen y≥2 y la superior y≤7.','x=0 ⇒ A=(0;2), D=(0;7)'],
 ['Igualamos las dos fronteras inferiores para hallar su cambio de tramo.','x+4y=5; x+2y=4 ⇒ 2y=1 ⇒ y=frac{1}{2}; x=3 ⇒ B=(3;frac{1}{2})'],
 ['La primera frontera inferior y la superior cierran la región por la derecha.','x+4y=5; 7x+5y=35 ⇒ 23y=0 ⇒ y=0; x=5 ⇒ C=(5;0)'],
 ['El cruce de la otra cota inferior con la superior no es factible.','(frac{50}{9};−frac{7}{9}): x+4y=frac{22}{9}<5'],
 ['Verificamos los cuatro vértices sustituyendo en las tres inecuaciones y en x≥0.','(x+4y;x+2y;7x+5y): A=(8;4;10), B=(5;4;frac{47}{2}), C=(5;5;35), D=(28;14;35)'],
 ['La gráfica muestra la intersección cerrada y acotada. Evaluamos F en sus vértices.','F(A)=2; F(B)=frac{13}{2}; F(C)=10; F(D)=7'],
 ['Una identidad de holguras demuestra la cota inferior en toda la región, no solo en los vértices.','F−2=frac{3}{2}x+frac{1}{2}(x+2y−4)≥0'],
 ['La igualdad exige x=0 y x+2y=4; por tanto el mínimo es único.','x=0; y=2 ⇒ F=2'],
 ],'EXACT_INTERSECTIONS_AND_GLOBAL_DUAL_MINIMUM',v);b.visual=rationalGraph(c);return[a,b];
}
export function buildFruitBoundaryBatch(id='batch-0305',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildFruitBoundaryBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0305-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0305.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:1,parts:2}));}
