import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:1225,literals:['25 empresas','120','386 €','229 €'],constraints:[[-1,0,-25],[2,-1,0],[1,1,120],[0,-1,0]],objective:[386,229,0],domain:{x:[0,50],y:[0,110]},labels:['x≥25','y≥2x','x+y≤120','y≥0'],optimum:[40,80],extreme:33760,dual:[0,157/3,844/3,0]},
 {index:1385,literals:['transporte marítimo','tantos viajes o más','ciudades costeras europeas'],constraints:[[1,0,14],[-1,1,0],[-1,-1,-10],[1,1,24],[-1,0,0],[0,-1,0]],objective:[15000,17000,0],domain:{x:[0,17],y:[0,15]},labels:['x≤14','y≤x','x+y≥10','x+y≤24','x≥0','y≥0'],optimum:[12,12],extreme:384000,dual:[0,1000,0,16000,0,0]},
 {index:1409,literals:['350 euros','550 euros','50 cajas de gambas','180 de langostinos','50 contenedores'],constraints:[[-2,-1,-50],[-3,-5,-180],[1,1,50],[-1,0,0],[0,-1,0]],objective:[350,550,0],domain:{x:[0,45],y:[0,55]},labels:['2x+y≥50','3x+5y≥180','x+y≤50','x≥0','y≥0'],optimum:[10,30],extreme:20000,minimize:true,dual:[100/7,750/7,0,0,0]},
 {index:1460,literals:['50 𝑔 de oro','40 𝑔 de','25 𝑔 de plata','150 €','200 €'],constraints:[[1,2,50],[2,1,40],[0,1,25],[-1,0,0],[0,-1,0]],objective:[150,200,0],domain:{x:[0,24],y:[0,30]},labels:['x+2y≤50','2x+y≤40','y≤25','x≥0','y≥0'],optimum:[10,20],extreme:5500,dual:[250/3,100/3,0,0,0]},
 {index:1566,literals:['0.4 €','0.1 €','3000 litros','1200 litros'],constraints:[[1,-2,0],[1,1,3000],[1,0,1200],[-1,0,0],[0,-1,0]],objective:[.4,.1,0],domain:{x:[0,1500],y:[0,3300]},labels:['x≤2y','x+y≤3000','x≤1200','x≥0','y≥0'],optimum:[1200,1800],extreme:660,dual:[0,.1,.3,0,0],continuous:true},
 {index:1598,literals:['2kg de madera','4 horas de trabajo','7kg de madera','9 horas','40€','15€'],constraints:[[2,1,7],[4,1,9],[-1,-1,-3],[-1,0,0],[0,-1,0]],objective:[40,15,0],domain:{x:[0,4],y:[0,8]},labels:['2x+y≤7','4x+y≤9','x+y≥3','x≥0','y≥0'],optimum:[1,5],extreme:115,dual:[10,5,0,0,0]},
];
export function solve(c,text){const v={...derive(c),constraints:c.constraints,objective:c.objective,optimum:c.optimum,extreme:c.extreme,dual:c.dual,minimize:!!c.minimize};const mk=(a,w,reasons,steps,extra={})=>part({id:'whole',prompt:text},a,w,reasons,steps,'ALL_FEASIBLE_VERTICES_AND_INDEPENDENT_DUAL_CERTIFICATE',{...v,...extra});let p;
 if(c.index===1225)p=mk('40 empresas y 80 particulares; beneficio máximo 33 760 €.',[
 '25 empresas y 95 particulares; beneficio máximo 31 405 €.','25 empresas y 50 particulares; beneficio máximo 21 100 €.','80 empresas y 40 particulares; beneficio máximo 40 040 €.'
 ],['Elegir el mínimo de empresas sin comparar el beneficio total.','Conformarse con ambos mínimos sin utilizar la capacidad.','Invertir la proporción exigida de particulares respecto a empresas.'],[
 ['Definimos los números de clientes, que han de ser enteros.','x=empresas; y=particulares; x,y≥0'],
 ['Traducimos cada condición sin invertir la comparación de clientes.','x≥25; y≥2x; x+y≤120'],
 ['Formulamos el beneficio y representamos los tres semiplanos.','Maximizar Z=386x+229y'],
 ['La frontera x=25 corta el mínimo de particulares y el límite total.','A=(25;50); B=(25;95)'],
 ['El cruce de la proporción con la capacidad da el tercer vértice.','y=2x; x+y=120 ⇒ 3x=120 ⇒ C=(40;80)'],
 ['Evaluamos los tres vértices del triángulo factible.','Z(A)=21100; Z(B)=31405; Z(C)=33760'],
 ['Una combinación no negativa de las restricciones confirma la cota global.','Z=frac{844}{3}(x+y)+frac{157}{3}(2x−y)≤frac{844}{3}·120=33760'],
 ['La igualdad exige agotar la capacidad y cumplir y=2x; el resultado es entero y respeta el mínimo de empresas.','40≥25; 80=2·40; 40+80=120'],
 ['Interpretamos las cantidades y el beneficio anual del modelo.','40 empresas y 80 particulares; 386·40+229·80=33760 €'],
 ],{wrongPoints:[[25,95],[25,50],[80,40]]});
 if(c.index===1385)p=mk('12 viajes del barco B₁ y 12 del B₂; beneficio máximo 384 000 €.',[
 '14 viajes del barco B₁ y 10 del B₂; beneficio máximo 380 000 €.','10 viajes del barco B₁ y 14 del B₂; beneficio máximo 388 000 €.','14 viajes del barco B₁ y 14 del B₂; beneficio máximo 448 000 €.'
 ],['Agotar el límite de B₁ sin comparar con el barco más rentable.','Invertir la condición de que B₁ haga al menos tantos viajes como B₂.','Omitir el máximo conjunto de veinticuatro viajes.'],[
 ['El PDF oficial permite recuperar las cifras y subíndices ausentes en la extracción histórica. Definimos cantidades enteras.','x=viajes de B₁; y=viajes de B₂'],
 ['Formulamos el límite propio de B₁ y la comparación entre barcos.','x≤14; x≥y; x,y≥0'],
 ['La suma de viajes está acotada por abajo y por arriba.','10≤x+y≤24'],
 ['Escribimos el beneficio por viaje y representamos la región común.','Maximizar Z=15000x+17000y'],
 ['Intersecamos las fronteras para obtener los cinco vértices.','(10;0), (14;0), (14;10), (12;12), (5;5)'],
 ['Los cruces oblicuos se obtienen imponiendo igualdad entre barcos y el total de viajes.','x=y, x+y=24 ⇒ (12;12); x=y, x+y=10 ⇒ (5;5)'],
 ['Comparamos el beneficio en los tres primeros vértices.','150000; 210000; 380000'],
 ['Completamos la comparación en los dos vértices restantes.','384000; 160000'],
 ['Reescribimos el beneficio usando total y diferencia de viajes.','Z=16000(x+y)+1000(y−x)'],
 ['Como la diferencia no es positiva y el total no supera veinticuatro, obtenemos una cota global.','Z≤16000·24=384000'],
 ['La igualdad exige total veinticuatro y diferencia cero. Se cumplen todas las condiciones y la integridad.','x=y=12; 12≤14; total=24; beneficio=384000 €'],
 ],{wrongPoints:[[14,10],[10,14],[14,14]]});
 if(c.index===1409)p=mk('10 contenedores de A y 30 de B; coste mínimo 20 000 €.',[
 '35 contenedores de A y 15 de B; coste mínimo 20 500 €.','0 contenedores de A y 50 de B; coste mínimo 27 500 €.','30 contenedores de A y 10 de B; coste mínimo 16 000 €.'
 ],['Elegir el vértice de capacidad máxima sin comparar costes.','Comprar únicamente al mayorista B.','Intercambiar las cantidades e incumplir los langostinos mínimos.'],[
 ['Definimos cantidades enteras de contenedores de cada mayorista.','x=contenedores de A; y=contenedores de B'],
 ['Las cantidades de cajas son necesidades mínimas, no disponibilidades máximas.','Gambas: 2x+y≥50; langostinos: 3x+5y≥180'],
 ['Añadimos capacidad, no negatividad y el coste que hay que minimizar.','x+y≤50; x,y≥0; C=350x+550y'],
 ['Representamos los semiplanos: la región está por encima de ambas necesidades y por debajo de la capacidad.','y≥50−2x; y≥36−3x/5; y≤50−x'],
 ['Intersecamos las dos necesidades.','2x+y=50; 3x+5y=180 ⇒ 10x+5y=250 ⇒ 7x=70 ⇒ (10;30)'],
 ['Intersecamos cada necesidad con la capacidad para completar el triángulo.','2x+y=50, x+y=50 ⇒ (0;50); 3x+5y=180, x+y=50 ⇒ (35;15)'],
 ['Evaluamos el coste en los tres vértices.','C(10;30)=20000; C(0;50)=27500; C(35;15)=20500'],
 ['Una combinación positiva de las necesidades demuestra la cota inferior global.','C=frac{100}{7}(2x+y)+frac{750}{7}(3x+5y)≥20000'],
 ['La igualdad exige satisfacer exactamente ambas necesidades; la solución es entera y cabe en el almacén.','Gambas=50; langostinos=180; contenedores=40≤50; coste=20000 €'],
 ],{wrongPoints:[[35,15],[0,50],[30,10]]});
 if(c.index===1460)p=mk('10 pulseras A y 20 B; ingreso máximo 5500 €; sobran 0 g de oro, 0 g de platino y 5 g de plata.',[
 '20 pulseras A y 0 B; ingreso máximo 3000 €; sobran 30 g de oro, 0 g de platino y 25 g de plata.',
 '0 pulseras A y 25 B; ingreso máximo 5000 €; sobran 0 g de oro, 15 g de platino y 0 g de plata.',
 '10 pulseras A y 20 B; ingreso máximo 5500 €; sobran 0 g de oro, 0 g de platino y 0 g de plata.'
 ],['Fabricar solo A sin comparar la combinación mixta.','Fabricar solo B para agotar la plata.','Suponer que todo óptimo agota necesariamente los tres metales.'],[
 ['Definimos las cantidades enteras de los dos tipos de pulsera.','x=pulseras A; y=pulseras B'],
 ['Contabilizamos por separado oro, platino y plata.','x+2y≤50; 2x+y≤40; y≤25; x,y≥0'],
 ['Formulamos el ingreso y representamos la región. La plata coincide con el corte del oro sobre el eje y.','Maximizar Z=150x+200y'],
 ['Hallamos los vértices de los ejes y la intersección de oro y platino.','(0;0), (20;0), (10;20), (0;25)'],
 ['Resolvemos las fronteras activas para la combinación mixta.','x+2y=50; 2x+y=40 ⇒ y=20; x=10'],
 ['Comparamos los ingresos en los cuatro vértices.','0; 3000; 5500; 5000 euros'],
 ['Una cota global certifica el máximo y su unicidad.','Z=frac{250}{3}(x+2y)+frac{100}{3}(2x+y)≤5500'],
 ['Calculamos el consumo de cada metal en el óptimo.','Oro=10+40=50 g; platino=20+20=40 g; plata=20 g'],
 ['Restamos los consumos de las disponibilidades sin borrar la holgura de la plata.','Sobrantes: oro=0 g; platino=0 g; plata=25−20=5 g'],
 ],{wrongPoints:[[20,0],[0,25]],leftover:[0,0,5]});
 if(c.index===1566)p=mk('1200 litros de leche entera y 1800 de desnatada; beneficio máximo 660 € diarios.',[
 '1200 litros de leche entera y 600 de desnatada; beneficio máximo 540 € diarios.',
 '0 litros de leche entera y 3000 de desnatada; beneficio máximo 300 € diarios.',
 '1800 litros de leche entera y 1200 de desnatada; beneficio máximo 840 € diarios.'
 ],['Agotar la leche entera pero dejar capacidad libre.','Envasar únicamente desnatada sin comparar ingresos.','Intercambiar las cantidades y superar la leche entera disponible.'],[
 ['Definimos cantidades de producto medidas en litros; no añadimos una restricción entera que el enunciado no exige.','x=litros de entera; y=litros de desnatada; x,y≥0'],
 ['Traducimos la relación tecnológica en el sentido indicado.','x≤2y'],
 ['Añadimos capacidad total y disponibilidad específica de entera.','x+y≤3000; x≤1200'],
 ['Escribimos el beneficio diario y representamos la intersección de restricciones.','Maximizar Z=0,4x+0,1y'],
 ['Los vértices se obtienen de los ejes y de x=1200 con las dos fronteras oblicuas.','(0;0), (1200;600), (1200;1800), (0;3000)'],
 ['Evaluamos todos los vértices.','Z=0; 540; 660; 300 euros'],
 ['Una cota global evita limitar la comprobación a cantidades enteras de litros.','Z=0,1(x+y)+0,3x≤0,1·3000+0,3·1200=660'],
 ['Para alcanzar la igualdad se agotan capacidad y entera; la relación tecnológica se cumple.','x=1200; y=1800; 1200≤2·1800'],
 ['Interpretamos el óptimo en litros y beneficio diario.','0,4·1200+0,1·1800=480+180=660 €'],
 ],{wrongPoints:[[1200,600],[0,3000],[1800,1200]],continuousQuantities:true});
 if(c.index===1598)p=mk('1 juego de ajedrez y 5 de dominó; ganancia máxima 115 € diarios.',[
 '0 juegos de ajedrez y 7 de dominó; ganancia máxima 105 € diarios.',
 '2 juegos de ajedrez y 1 de dominó; ganancia máxima 95 € diarios.',
 '2 juegos de ajedrez y 3 de dominó; ganancia máxima 125 € diarios.'
 ],['Fabricar solo dominós sin comparar la combinación mixta.','Quedarse en el mínimo total de juegos.','Comprobar madera pero omitir el exceso de horas.'],[
 ['Definimos números enteros no negativos de juegos fabricados.','x=ajedreces; y=dominós'],
 ['Formulamos las disponibilidades de madera y tiempo.','2x+y≤7; 4x+y≤9'],
 ['El mínimo de producción es una cota inferior del total, no de cada tipo.','x+y≥3; x,y≥0'],
 ['Escribimos la ganancia y representamos los semiplanos.','Maximizar Z=40x+15y'],
 ['Sobre el eje y queda el segmento entre tres y siete. No hay puntos factibles sobre el eje x.','x=0 ⇒ 3≤y≤7; y=0 exigiría x≥3 y x≤9/4'],
 ['Las intersecciones relevantes completan el cuadrilátero.','2x+y=7, 4x+y=9 ⇒ (1;5); 4x+y=9, x+y=3 ⇒ (2;1)'],
 ['Evaluamos todos los vértices, que son enteros.','Z(0;3)=45; Z(0;7)=105; Z(1;5)=115; Z(2;1)=95'],
 ['Una cota independiente prueba que ningún otro punto puede mejorar el resultado.','Z=10(2x+y)+5(4x+y)≤10·7+5·9=115'],
 ['La igualdad exige agotar ambos recursos. Comprobamos el mínimo de juegos.','x=1; y=5; madera=7 kg; tiempo=9 h; total=6≥3'],
 ],{wrongPoints:[[0,7],[2,1],[2,3]]});
 assert.ok(p);p.visual=rationalGraph(c);return[p];
}
export function buildClientsLogisticsBatch(id='batch-0345',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(x.parts.length===1&&x.parts[0].partId==='whole'){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Optimización','Región factible'];x.qualityGates.pedagogical='OFFICIAL_SOURCE_ALL_RESOURCE_CONSTRAINTS_COMPLETE_VERTICES_AND_GLOBAL_DUAL';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildClientsLogisticsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0345-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0345.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
