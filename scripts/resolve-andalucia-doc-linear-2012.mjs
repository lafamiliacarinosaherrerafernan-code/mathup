import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {nativeSourceEvidence} from './resolve-andalucia-doc-derivatives-2012.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:4,literals:['60m^{2}','4m^{2}','3m^{2}','mínimo 3','doble','60 euros','40 euros'],constraints:[[4,3,60],[-1,0,-3],[2,-1,0]],objective:[60,40,0],domain:{x:[0,8],y:[0,20]},labels:['4x+3y≤60','x≥3','y≥2x'],optimum:[6,12],extreme:840,dual:[14,0,2]},
 {index:12,literals:['y+2x≥2','2y−3x≥−3','3y−x≤6','F(x, y)=2x−y'],constraints:[[-2,-1,-2],[3,-2,3],[-1,3,6]],objective:[2,-1,0],domain:{x:[0,4],y:[0,4]},labels:['y+2x≥2','2y−3x≥−3','3y−x≤6'],optimum:[0,2],extreme:-2,minimize:true,dual:[5/7,0,4/7]},
 {index:13,literals:['1200 euros','0.60 euros/kg','0.90 euros/kg','1.35 euros/kg','1500 kg'],constraints:[[3,5,6000],[1,1,1500],[-1,0,0],[0,-1,0]],objective:[.3,.35,0],domain:{x:[0,1700],y:[0,1700]},labels:['3x+5y≤6000','x+y≤1500','x≥0','y≥0'],optimum:[750,750],extreme:487.5,dual:[.025,.225,0,0]},
 {index:24,literals:['3x+4y≥28','5x+2y≤42','x−y≥0','(7, 3)','F(x, y)=3x−2y+6'],constraints:[[-3,-4,-28],[5,2,42],[-1,1,0]],objective:[3,-2,6],domain:{x:[0,10],y:[0,8]},labels:['3x+4y≥28','5x+2y≤42','x≥y'],optimum:[8,1],extreme:28,dual:[8/7,9/7,0]},
];
const reasons=['Usar un cruce que incumple una restricción.','Intercambiar coordenadas o signos de una frontera.','Elegir otro vértice sin comparar la función completa.'];
export function solve(c,text){const p=[4,13].includes(c.index)?[{id:'whole',prompt:text}]:officialParts(text),v={...derive(c),constraints:c.constraints,objective:c.objective,optimum:c.optimum,extreme:c.extreme,dual:c.dual,minimize:!!c.minimize};
 const mk=(k,a,w,s,e={})=>part(p[k],a,w,reasons,s,'OFFICIAL_DOC_EXACT_INTERSECTIONS_AND_DUAL_CERTIFICATE',{...v,...e});let out;
 if(c.index===4)out=[mk(0,'6 estanterías grandes y 12 pequeñas; beneficio máximo 840 €.',[
 '3 estanterías grandes y 16 pequeñas; beneficio máximo 820 €.','3 estanterías grandes y 6 pequeñas; beneficio máximo 420 €.','9 estanterías grandes y 8 pequeñas; beneficio máximo 860 €.'
 ],[
 ['Definimos cantidades enteras de estanterías y su beneficio.','x=grandes; y=pequeñas; Z=60x+40y'],
 ['La madera disponible limita la suma de superficies necesarias.','4x+3y≤60'],
 ['Traducimos el mínimo de grandes y la proporción exigida.','x≥3; y≥2x'],
 ['Representamos las tres rectas y sus semiplanos; forman un triángulo cerrado.','x=3; y=2x; y=20−frac{4}{3}x'],
 ['Intersecamos el mínimo de grandes con la proporción mínima.','x=3; y=2·3=6 ⇒ (3;6)'],
 ['Intersecamos el mínimo de grandes con el uso total de madera.','12+3y=60 ⇒ y=16 ⇒ (3;16)'],
 ['El tercer vértice se obtiene al imponer la proporción sobre la frontera de madera.','4x+6x=60 ⇒ x=6; y=12'],
 ['Evaluamos la función en todos los vértices.','Z(3;6)=420; Z(3;16)=820; Z(6;12)=840'],
 ['Una cota independiente confirma que ningún punto puede mejorar el resultado.','Z=14(4x+3y)+2(2x−y)≤14·60=840'],
 ['La combinación elegida es entera, alcanza la cota y cumple los mínimos.','4·6+3·12=60; 6≥3; 12=2·6'],
 ],{wrongPoints:[[3,16],[3,6],[9,8]]})];
 if(c.index===12){const vertices='(0;2), (1;0), (3;3)',wrong=['(0;−2), (1;0), (3;3)','(0;2), (0;1), (3;3)','(0;2), (1;0), (3;−3)'];out=[
 mk(0,`Triángulo cerrado con vértices ${vertices}.`,wrong.map(x=>`Triángulo cerrado con vértices ${x}.`),[
 ['Despejamos las tres desigualdades. Al dividir por un número negativo cambiamos el sentido.','y≥2−2x; y≥frac{3x−3}{2}; y≤frac{x+6}{3}'],
 ['El recinto está por encima de las dos primeras rectas y por debajo de la tercera.','Máximo de las cotas inferiores ≤ y ≤ cota superior'],
 ['Las dos primeras fronteras se cruzan sobre el eje horizontal.','2−2x=frac{3x−3}{2} ⇒ 4−4x=3x−3 ⇒ x=1; y=0'],
 ['Primera y tercera se cruzan sobre el eje vertical.','2−2x=frac{x+6}{3} ⇒ 6−6x=x+6 ⇒ x=0; y=2'],
 ['Segunda y tercera cierran el triángulo.','frac{3x−3}{2}=frac{x+6}{3} ⇒ 9x−9=2x+12 ⇒ (3;3)'],
 ['Un punto interior fija la zona sombreada y comprueba todas las restricciones.','(1;2): 4≥2; 1≥−3; 5≤6'],
 ],{vertices:[[0,2],[1,0],[3,3]],wrongVertices:[[[0,-2],[1,0],[3,3]],[[0,2],[0,1],[3,3]],[[0,2],[1,0],[3,-3]]]}),
 mk(1,`Vértices ${vertices}.`,wrong.map(x=>`Vértices ${x}.`),[
 ['Resolvemos las fronteras de dos en dos; no añadimos restricciones de signo que no figuran.','2x+y=2; 3x−2y=3; −x+3y=6'],
 ['Para las primeras dos, sustituimos y=2−2x.','3x−2(2−2x)=3 ⇒ 7x=7 ⇒ (1;0)'],
 ['Para primera y tercera, volvemos a sustituir.','−x+3(2−2x)=6 ⇒ −7x=0 ⇒ (0;2)'],
 ['Para segunda y tercera, eliminamos y multiplicando por tres y dos.','9x−6y=9; −2x+6y=12 ⇒ 7x=21 ⇒ (3;3)'],
 ['Comprobamos el tercer semiplano en cada cruce.','(1;0): −1≤6; (0;2): 4≥−3; (3;3): 9≥2'],
 ['Los tres puntos son distintos y no alineados, y cada lado es frontera del recinto.','Vértices: (0;2), (1;0), (3;3)'],
 ],{vertices:[[0,2],[1,0],[3,3]],wrongVertices:[[[0,-2],[1,0],[3,3]],[[0,2],[0,1],[3,3]],[[0,2],[1,0],[3,-3]]]}),
 mk(2,'Mínimo −2 en (0;2).',['Mínimo 2 en (1;0).','Mínimo 3 en (3;3).','Mínimo −3 en (3;3).'],[
 ['La función lineal alcanza un mínimo en este triángulo cerrado.','F(x,y)=2x−y'],
 ['Evaluamos el vértice del eje vertical.','F(0;2)=−2'],
 ['Evaluamos los otros dos vértices.','F(1;0)=2; F(3;3)=3'],
 ['Comparamos los valores; el menor es único entre los vértices.','−2<2<3'],
 ['Una combinación de holguras no negativas demuestra la cota en todo el recinto.','F+2=frac{5}{7}(2x+y−2)+frac{4}{7}(6+x−3y)≥0'],
 ['La igualdad exige que ambas holguras se anulen; el cruce es único.','2x+y=2; −x+3y=6 ⇒ (0;2)'],
 ],{wrongExtrema:[2,3,-3]})];}
 if(c.index===13)out=[mk(0,'750 kg de A y 750 kg de B; beneficio máximo 487,50 €.',[
 '1 500 kg de A y 0 kg de B; beneficio máximo 450 €.','0 kg de A y 1 200 kg de B; beneficio máximo 420 €.','1 000 kg de A y 600 kg de B; beneficio máximo 510 €.'
 ],[
 ['Definimos las cantidades de manzanas que se compran, en kilogramos no negativos.','x=kg de A; y=kg de B; x,y≥0'],
 ['Formulamos presupuesto y capacidad del vehículo.','0,60x+y≤1200; x+y≤1500'],
 ['El beneficio unitario es venta menos compra, no el precio de venta completo.','A: 0,90−0,60=0,30; B: 1,35−1=0,35'],
 ['Maximizamos el beneficio total y representamos los semiplanos.','Z=0,30x+0,35y; 3x+5y≤6000'],
 ['Los ejes y el origen proporcionan tres vértices factibles.','(0;0), (1500;0), (0;1200)'],
 ['En el cruce de presupuesto y capacidad restamos las ecuaciones.','x+y=1500; 0,60x+y=1200 ⇒ 0,40x=300'],
 ['Despejamos las dos cantidades.','x=750; y=1500−750=750'],
 ['Comparamos el objetivo en los cuatro vértices.','Z=0; 450; 420; 487,50 euros'],
 ['Una combinación de las restricciones verifica el máximo global.','Z=0,125(0,60x+y)+0,225(x+y)≤487,50'],
 ['La propuesta usa todo el dinero y toda la capacidad, alcanzando la cota.','0,60·750+750=1200; 750+750=1500'],
 ],{wrongPoints:[[1500,0],[0,1200],[1000,600]]})];
 if(c.index===24)out=[
 mk(0,'Sí: (7;3) satisface las tres inecuaciones.',[
 'No: (7;3) incumple la primera inecuación.','No: (7;3) incumple la segunda inecuación.','No: (7;3) incumple la tercera inecuación.'
 ],[
 ['La pertenencia exige cumplir simultáneamente todas las restricciones.','x=7; y=3'],
 ['Sustituimos en la primera expresión.','3·7+4·3=33≥28'],
 ['Sustituimos en la segunda.','5·7+2·3=41≤42'],
 ['Comprobamos la tercera sin invertir su sentido.','7−3=4≥0'],
 ['Todas las desigualdades se satisfacen estrictamente.','33−28=5>0; 42−41=1>0; 7−3=4>0'],
 ['Por tanto es un punto interior, no un vértice ni un punto exterior.','(7;3) pertenece al recinto'],
 ],{testPoint:[7,3],slacks:[5,1,4]}),
 mk(1,'Triángulo con vértices (4;4), (8;1), (6;6).',[
 'Triángulo con vértices (4;4), (1;8), (6;6).','Triángulo con vértices (−4;−4), (8;1), (6;6).','Triángulo con vértices (4;4), (8;1), (7;3).'
 ],[
 ['Despejamos las restricciones para determinar los semiplanos de la gráfica.','y≥7−frac{3}{4}x; y≤21−frac{5}{2}x; y≤x'],
 ['El cruce de primera y tercera fronteras tiene coordenadas iguales.','3x+4x=28 ⇒ x=y=4'],
 ['En el cruce de segunda y tercera ocurre lo mismo.','5x+2x=42 ⇒ x=y=6'],
 ['Duplicamos la segunda frontera para eliminar y con la primera.','10x+4y=84; 3x+4y=28 ⇒ 7x=56'],
 ['Despejamos la ordenada del tercer vértice.','x=8; 40+2y=42 ⇒ y=1'],
 ['Comprobamos el semiplano restante en cada cruce y el interior mediante el apartado anterior.','(4;4): 28≤42; (6;6): 42≥28; (8;1): 7≥0'],
 ],{vertices:[[4,4],[8,1],[6,6]],wrongVertices:[[[4,4],[1,8],[6,6]],[[-4,-4],[8,1],[6,6]],[[4,4],[8,1],[7,3]]]}),
 mk(2,'Máximo 28 en (8;1).',['Máximo 10 en (4;4).','Máximo 12 en (6;6).','Máximo 22 en (8;1).'],[
 ['Evaluamos la función afín completa, incluido el término independiente.','F(x,y)=3x−2y+6'],
 ['Sustituimos los vértices con coordenadas iguales.','F(4;4)=12−8+6=10; F(6;6)=18−12+6=12'],
 ['Evaluamos el cruce de las dos fronteras oblicuas.','F(8;1)=24−2+6=28'],
 ['El mayor valor se alcanza únicamente en ese vértice.','28>12>10'],
 ['Comprobamos globalmente mediante holguras no negativas.','28−F=frac{8}{7}(3x+4y−28)+frac{9}{7}(42−5x−2y)≥0'],
 ['La igualdad requiere ambas fronteras activas y determina el único máximo.','3x+4y=28; 5x+2y=42 ⇒ (8;1)'],
 ],{wrongExtrema:[10,12,22]})];
 assert.ok(out);out[c.index===24?1:0].visual=rationalGraph(c);return out;
}
export function buildDocLinearBatch(id='batch-0354',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({nativeSourceEvidence:nativeSourceEvidence(x.exerciseId),parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(!x.sourceSubparts.length)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Región factible','Optimización'];x.qualityGates.pedagogical='DOC_BOUND_ALL_SUBPARTS_EXACT_POLYGON_DUAL_AND_CONTEXT';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDocLinearBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0354-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0354.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
