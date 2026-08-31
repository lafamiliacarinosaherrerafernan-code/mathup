import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:39,literals:['7x−y≥−10','x+y≤2','3x−5y≤14','F(x, y)=2x+3y'],constraints:[[-7,1,10],[1,1,2],[3,-5,14]],objective:[2,3,0],domain:{x:[-4,5],y:[-6,5]},labels:['7x−y≥−10','x+y≤2','3x−5y≤14'],maxPoint:[-1,3],minPoint:[-2,-4],max:7,min:-16,maxDual:[1/8,23/8,0],minDual:[19/32,0,23/32]},
 {index:47,literals:['2 metros de tela y 5 botones','3 metros de tela, 2 botones y 1 cremallera','1050 metros','1250 botones','300 cremalleras','30 euros','50 euros'],constraints:[[2,3,1050],[5,2,1250],[0,1,300],[-1,0,0],[0,-1,0]],objective:[30,50,0],domain:{x:[0,280],y:[0,350]},labels:['2x+3y≤1050','5x+2y≤1250','y≤300','x≥0','y≥0'],maxPoint:[75,300],max:17250,maxDual:[15,0,5,0,0]},
];
export function solve(c,text){const pp=c.index===47?[{id:'whole',prompt:text}]:officialParts(text),e={...derive(c),constraints:c.constraints,objective:c.objective,maxPoint:c.maxPoint,minPoint:c.minPoint,maxDual:c.maxDual,minDual:c.minDual};
 const mk=(i,a,w,why,s,extra={})=>part(pp[i],a,w,why,s,'EXACT_OFFICIAL_HALFPLANES_VERTEX_ENUMERATION_AND_DUAL_BOUNDS',{...e,...extra});let out;
 if(c.index===39)out=[
 mk(0,'Triángulo cerrado con vértices (−2;−4), (−1;3), (3;−1).',[
  'Triángulo cerrado con vértices (2;4), (−1;3), (3;−1).','Triángulo cerrado con vértices (−2;−4), (1;−3), (3;−1).','Triángulo cerrado con vértices (−2;−4), (−1;3), (−1;3).'
 ],['Perder los signos al intersecar la primera y tercera fronteras.','Cambiar ambos signos del cruce de las dos cotas superiores.','Intercambiar las coordenadas del tercer vértice, repitiendo otro punto.'],[
  ['Despejamos las tres desigualdades; no imponemos que las coordenadas sean positivas.','y≤7x+10; y≤2−x; y≥frac{3x−14}{5}'],
  ['El recinto queda por debajo de las dos primeras rectas y por encima de la tercera.','frac{3x−14}{5}≤y≤min(7x+10;2−x)'],
  ['Intersecamos las dos fronteras superiores.','7x+10=2−x ⇒ 8x=−8 ⇒ x=−1; y=3'],
  ['Intersecamos la primera cota superior con la inferior.','35x+50=3x−14 ⇒ 32x=−64 ⇒ x=−2; y=−4'],
  ['Intersecamos la segunda cota superior con la inferior.','10−5x=3x−14 ⇒ 8x=24 ⇒ x=3; y=−1'],
  ['Comprobamos el semiplano restante en cada cruce.','(−1;3): −18≤14; (−2;−4): −6≤2; (3;−1): 22≥−10'],
  ['El origen cumple las tres desigualdades estrictamente y permite identificar el interior sombreado.','0>−10; 0<2; 0<14'],
  ['Las tres rectas cierran un triángulo, incluidos sus lados por las desigualdades no estrictas.','Vértices: (−2;−4), (−1;3), (3;−1)'],
 ],{wrongVertices:[[[2,4],[-1,3],[3,-1]],[[-2,-4],[1,-3],[3,-1]],[[-2,-4],[-1,3],[-1,3]]]}),
 mk(1,'Máximo 7 en (−1;3); mínimo −16 en (−2;−4).',[
  'Máximo 3 en (3;−1); mínimo −16 en (−2;−4).','Máximo 7 en (−1;3); mínimo 3 en (3;−1).','Máximo 16 en (−2;−4); mínimo −7 en (−1;3).'
 ],['Elegir la mayor abscisa sin evaluar toda la función.','Omitir el vértice con ambas coordenadas negativas.','Cambiar el signo de la función objetivo.'],[
  ['La función lineal alcanza sus extremos en los vértices del triángulo cerrado y acotado.','F(x,y)=2x+3y'],
  ['Evaluamos el vértice inferior izquierdo conservando ambos signos.','F(−2;−4)=−4−12=−16'],
  ['Evaluamos los otros dos vértices.','F(−1;3)=−2+9=7; F(3;−1)=6−3=3'],
  ['Comparamos los tres resultados, no solo las coordenadas.','−16<3<7'],
  ['Una combinación positiva de restricciones demuestra el máximo en todo el recinto.','F=frac{1}{8}(−7x+y)+frac{23}{8}(x+y)≤7'],
  ['Otra combinación demuestra independientemente el mínimo.','−F=frac{19}{32}(−7x+y)+frac{23}{32}(3x−5y)≤16'],
  ['Las cotas se alcanzan en los vértices indicados; las fronteras activas se cortan en un único punto para cada extremo.','Máximo 7 en (−1;3); mínimo −16 en (−2;−4)'],
 ],{wrongExtrema:[[3,-16],[7,3],[16,-7]]}),
 ];
 if(c.index===47)out=[mk(0,'75 camisas y 300 pantalones; beneficio máximo 17 250 euros.',[
  '150 camisas y 250 pantalones; beneficio máximo 17 000 euros.','0 camisas y 300 pantalones; beneficio máximo 15 000 euros.','0 camisas y 350 pantalones; beneficio máximo 17 500 euros.'
 ],['Elegir el cruce de tela y botones sin comparar la frontera de cremalleras.','Fabricar solo pantalones e ignorar la tela sobrante.','Ignorar que solo existen trescientas cremalleras.'],[
  ['Definimos cantidades enteras no negativas y sus beneficios unitarios.','x=camisas; y=pantalones; Z=30x+50y'],
  ['La tela y los botones imponen restricciones distintas.','2x+3y≤1050; 5x+2y≤1250'],
  ['Cada pantalón necesita una cremallera; las camisas no la consumen.','y≤300; x≥0; y≥0'],
  ['Los ejes y la cota de pantalones proporcionan tres vértices.','(0;0), (250;0), (0;300)'],
  ['En la frontera de trescientos pantalones, la tela permite setenta y cinco camisas.','2x+900=1050 ⇒ x=75; 5·75+600=975≤1250'],
  ['Intersecamos tela y botones eliminando x.','10x+15y=5250; 10x+4y=2500 ⇒ 11y=2750'],
  ['Completamos el cruce y verificamos la cota de cremalleras.','y=250; x=150; 250≤300'],
  ['Evaluamos el beneficio en los cinco vértices del recinto.','Z(0;0)=0; Z(250;0)=7500; Z(150;250)=17000'],
  ['El punto sobre la frontera de cremalleras supera los otros valores.','Z(75;300)=17250; Z(0;300)=15000'],
  ['Verificamos globalmente mediante una combinación positiva de recursos.','Z=15(2x+3y)+5y≤15·1050+5·300=17250'],
  ['La propuesta es entera, alcanza la cota y deja doscientos setenta y cinco botones sin utilizar.','Tela=1050; botones=975; cremalleras=300; beneficio=17250 euros'],
 ],{wrongPoints:[[150,250],[0,300],[0,350]]})];
 assert.ok(out);out[0].visual=rationalGraph(c);return out;
}
export function buildDocLinearFinalBatch(id='batch-0360',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(!x.sourceSubparts.length)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas/programación lineal';x.examSlot=2;x.qualityGates.pedagogical='DOC_SOURCE_ALL_VERTICES_AND_INDEPENDENT_DUAL_BOUNDS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocLinearFinalBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0360-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0360.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
