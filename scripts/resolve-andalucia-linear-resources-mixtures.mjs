import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph,renderRationalGraph,rationalPair} from './resolve-andalucia-linear-rational-and-faces.mjs';import {vertices,feasible} from './resolve-andalucia-linear-region-official.mjs';
export const cases=[
 {index:274,literals:['100 horas','110 horas','70 euros','50 euros'],constraints:[[2,4,100],[5,3,110],[-1,0,0],[0,-1,0]],objective:[70,50,0],domain:{x:[0,25],y:[0,30]},labels:['2x+4y≤100','5x+3y≤110','x≥0','y≥0'],optimum:[10,20],extreme:1700,dual:[20/7,90/7,0,0]},
 {index:382,literals:['900','1400','al menos 1800','600 euros','500 euros','40 collares'],constraints:[[2,1,90],[1,1,70],[-1,-2,-60],[-1,0,0],[0,-1,0]],objective:[600,500,0],domain:{x:[0,50],y:[0,80]},labels:['2x+y≤90','x+y≤70','x+2y≥60','x≥0','y≥0'],optimum:[20,50],extreme:37000,dual:[100,400,0,0,0]},
 {index:443,literals:['400 kg de avellanas','300 kg de nueces','400 kg de almendras','20','40 euros'],constraints:[[2,3,400],[2,1,300],[1,4,400],[-1,0,0],[0,-1,0]],objective:[20,40,0],domain:{x:[0,170],y:[0,120]},labels:['2x+3y≤400','2x+y≤300','x+4y≤400','x≥0','y≥0'],optimum:[80,80],extreme:4800,dual:[8,0,4,0,0]},
 {index:478,literals:['70𝑚2','150𝑚2','60 euros','70 euros'],constraints:[[1,2,70],[3,2,150],[-1,0,0],[0,-1,0]],objective:[60,70,0],domain:{x:[0,60],y:[0,45]},labels:['x+2y≤70','3x+2y≤150','x≥0','y≥0'],optimum:[40,15],extreme:3450,dual:[22.5,12.5,0,0]},
 {index:492,literals:['12 y 40 mesas','tercera','32 €','35 €'],constraints:[[-1,-1,-12],[1,1,40],[-1,3,0],[-1,0,0],[0,-1,0]],objective:[32,35,0],domain:{x:[0,45],y:[0,15]},labels:['x+y≥12','x+y≤40','3y≤x','x≥0','y≥0'],optimum:[30,10],extreme:1310,dual:[0,32.75,.75,0,0]},
 {index:1119,literals:['al menos 10 baterías','más de 10 unidades','150 euros','100 euros','6000 euros','130 euros','140 euros'],constraints:[[3,2,120],[-1,1,10],[-1,-1,-10],[-1,0,0],[0,-1,0]],objective:[130,140,0],domain:{x:[0,45],y:[0,40]},labels:['3x+2y≤120','y−x≤10','x+y≥10','x≥0','y≥0'],optimum:[20,30],extreme:6800,dual:[54,32,0,0,0]},
 {index:1441,literals:['4 g de oro','3 g de oro','48 g de oro','20 de','150 euros','100'],constraints:[[4,3,48],[2,1,20],[-1,0,0],[0,-1,0]],objective:[150,100,0],domain:{x:[0,13],y:[0,20]},labels:['4x+3y≤48','2x+y≤20','x≥0','y≥0'],optimum:[6,8],extreme:1700,dual:[25,25,0,0]},
 {index:1487,literals:['2 unidades de','Calcio y 1 de Hierro','1 de Calcio y 2 de Hierro','1 euro','al\nmenos 2 unidades de Calcio y 2 de Hierro'],constraints:[[-2,-1,-2],[-1,-2,-2],[-1,0,0],[0,-1,0]],objective:[1,1,0],domain:{x:[0,4],y:[0,4]},labels:['2x+y≥2','x+2y≥2','x≥0','y≥0'],optimum:[2/3,2/3],extreme:4/3,dual:[1/3,1/3,0,0],minimize:true,continuous:true},
];
export function feedGraph(c=cases.at(-1)){assert.equal(c.index,1487);const base=rationalGraph(c),clip=[[1,0,4],[0,1,4]],p=vertices([...c.constraints,...clip]).map(row=>row.map(x=>Object.is(x,-0)?0:x));const center=p.reduce((a,b)=>[a[0]+b[0]/p.length,a[1]+b[1]/p.length],[0,0]);return{...base,plotVersion:'linear-feed-unbounded-v1',polygon:p.sort((a,b)=>Math.atan2(a[1]-center[1],a[0]-center[0])-Math.atan2(b[1]-center[1],b[0]-center[0])),viewportOnlyConstraints:clip,recessionDirections:[[1,0],[0,1]],optima:{minimum:{point:c.optimum,value:c.extreme},maximum:{attained:false,unboundedAbove:true}}};}
export function renderFeedGraph(g){assert.deepEqual(g,feedGraph());let svg=renderRationalGraph({...g,plotVersion:'linear-rational-polygon-v1'});svg=svg.replace(/(<polygon[^>]*?)stroke="#147a52" stroke-width="2"/,'$1stroke="none"');return svg.replace('Todos los puntos de la zona sombreada cumplen las restricciones.','Región no acotada: continúa hacia arriba y hacia la derecha.');}
export function solve(c,text){const d=derive(c),proof={...d,constraints:c.constraints,objective:c.objective,optimum:c.optimum,extreme:c.extreme,dual:c.dual,minimize:!!c.minimize};let a,w,reasons,s,extra={};
 if(c.index===274){a='10 unidades de A y 20 de B; beneficio máximo semanal 1 700 €.';w=['22 unidades de A y 0 de B; beneficio máximo semanal 1 540 €.','0 unidades de A y 25 de B; beneficio máximo semanal 1 250 €.','20 unidades de A y 10 de B; beneficio máximo semanal 1 900 €.'];reasons=['Fabricar solo A sin evaluar la combinación mixta.','Fabricar solo B sin comparar todos los vértices.','Intercambiar las cantidades y exceder las horas de la segunda máquina.'];extra.wrongPoints=[[22,0],[0,25],[20,10]];s=[
 ['Definimos cantidades semanales enteras no negativas.','x=unidades de A; y=unidades de B'],
 ['Cada máquina impone una restricción independiente de tiempo.','2x+4y≤100; 5x+3y≤110; x,y≥0'],
 ['El objetivo suma los beneficios unitarios. Dibujamos ambos semiplanos en el primer cuadrante.','Maximizar Z=70x+50y'],
 ['En los ejes, la restricción más exigente fija los cortes válidos.','y=0 ⇒ x≤22; x=0 ⇒ y≤25'],
 ['Para el cruce dividimos la primera igualdad por dos y despejamos x.','x+2y=50 ⇒ x=50−2y'],
 ['Sustituimos en la segunda frontera y resolvemos.','250−10y+3y=110 ⇒ y=20; x=10'],
 ['Comparamos los cuatro vértices de la región.','Z(0;0)=0; Z(22;0)=1540'],
 ['Completamos la comparación de vértices.','Z(0;25)=1250; Z(10;20)=1700'],
 ['Una combinación positiva de las dos restricciones prueba una cota independiente.','Z=frac{20}{7}(2x+4y)+frac{90}{7}(5x+3y)'],
 ['La cota es alcanzable solo agotando los dos tiempos.','Z≤frac{2000+9900}{7}=1700'],
 ['La solución es entera y utiliza exactamente la disponibilidad semanal.','2·10+4·20=100; 5·10+3·20=110'],
 ];}
 if(c.index===382){a='20 collares A y 50 B; beneficio máximo 37 000 €. No es posible fabricar 40 A y 20 B.';w=['0 collares A y 70 B; beneficio máximo 35 000 €. No es posible fabricar 40 A y 20 B.','40 collares A y 10 B; beneficio máximo 29 000 €. No es posible fabricar 40 A y 20 B.','20 collares A y 50 B; beneficio máximo 37 000 €. Sí es posible fabricar 40 A y 20 B.'];reasons=['Elegir solo B sin comparar el vértice mixto.','Activar el mínimo de perlas negras en vez de maximizar el beneficio.','No comprobar la disponibilidad de perlas blancas en la propuesta adicional.'];extra={wrongPoints:[[0,70],[40,10]],additionalPoint:[40,20],whiteAtAdditional:1000};s=[
 ['Definimos números enteros de collares de cada tipo.','x=collares A; y=collares B; x,y≥0'],
 ['Traducimos las disponibilidades máximas de blancas y grises.','20x+10y≤900; 20x+20y≤1400'],
 ['Las negras tienen un consumo mínimo, no un máximo. Dividimos cada desigualdad por su factor común.','2x+y≤90; x+y≤70; x+2y≥60'],
 ['Formulamos el beneficio y representamos la intersección de los semiplanos.','Maximizar Z=600x+500y'],
 ['El eje y aporta los vértices (0;30) y (0;70); en el eje x las condiciones son incompatibles.','y=0 exigiría x≤45 y x≥60'],
 ['El cruce de blancas y grises se obtiene restando las igualdades.','2x+y=90; x+y=70 ⇒ (x;y)=(20;50)'],
 ['El cruce de blancas y negras completa el recinto.','2x+y=90; x+2y=60 ⇒ (x;y)=(40;10)'],
 ['Evaluamos los primeros dos vértices.','Z(0;30)=15000; Z(0;70)=35000'],
 ['Evaluamos los restantes; el mayor beneficio corresponde a veinte A y cincuenta B.','Z(20;50)=37000; Z(40;10)=29000'],
 ['Una cota global verifica el óptimo.','Z=100(2x+y)+400(x+y)≤37000'],
 ['Verificamos recursos en el óptimo: blancas y grises se agotan; negras superan su mínimo.','Blancas=900; grises=1400; negras=3600≥1800'],
 ['La propuesta de cuarenta A y veinte B falla por las perlas blancas.','20·40+10·20=1000>900'],
 ];}
 if(c.index===443){a='80 lotes A y 80 B; ingreso máximo 4 800 €.';w=['125 lotes A y 50 B; ingreso máximo 4 500 €.','0 lotes A y 100 B; ingreso máximo 4 000 €.','100 lotes A y 100 B; ingreso máximo 6 000 €.'];reasons=['Elegir el cruce de avellanas y nueces sin comparar ingresos.','Vender solo B y desaprovechar la combinación mixta.','Omitir restricciones y exceder avellanas y almendras.'];extra.wrongPoints=[[125,50],[0,100],[100,100]];s=[
 ['Definimos cantidades enteras de lotes.','x=lotes A; y=lotes B; x,y≥0'],
 ['Cada fruto seco proporciona su propia cota de consumo.','Avellanas: 2x+3y≤400'],
 ['No confundimos los coeficientes de nueces y almendras.','Nueces: 2x+y≤300; almendras: x+4y≤400'],
 ['Formulamos el ingreso y representamos la intersección de los tres semiplanos.','Maximizar Z=20x+40y'],
 ['Los cortes factibles con los ejes son ciento cincuenta A y cien B.','(0;0), (150;0), (0;100)'],
 ['El cruce de avellanas y nueces se obtiene restando sus ecuaciones.','2x+3y=400; 2x+y=300 ⇒ (125;50)'],
 ['El cruce de avellanas y almendras agota los recursos activos en el óptimo.','2x+3y=400; x+4y=400 ⇒ (80;80)'],
 ['El cruce de nueces y almendras no cumple avellanas, por lo que no es vértice del recinto.','(frac{800}{7};frac{500}{7}): 2x+3y=frac{3100}{7}>400'],
 ['Comparamos ingresos en los cinco vértices.','0; 3000; 4500; 4800; 4000 euros'],
 ['Una combinación positiva de las dos cotas activas certifica el máximo global.','Z=8(2x+3y)+4(x+4y)≤4800'],
 ['Comprobamos el consumo y la condición entera.','Avellanas=400; nueces=240≤300; almendras=400'],
 ];}
 if(c.index===478){a='40 trajes y 15 vestidos; beneficio máximo 3 450 €.';w=['50 trajes y 0 vestidos; beneficio máximo 3 000 €.','0 trajes y 35 vestidos; beneficio máximo 2 450 €.','15 trajes y 40 vestidos; beneficio máximo 3 700 €.'];reasons=['Fabricar solo trajes sin comparar el cruce de restricciones.','Fabricar solo vestidos sin comparar el beneficio mixto.','Intercambiar las cantidades y sobrepasar el lino.'];extra.wrongPoints=[[50,0],[0,35],[15,40]];s=[
 ['Definimos las cantidades enteras no negativas que se confeccionan.','x=trajes; y=vestidos'],
 ['Expresamos los consumos de lino y algodón en metros cuadrados.','x+2y≤70; 3x+2y≤150; x,y≥0'],
 ['El beneficio total utiliza los importes de cada prenda.','Maximizar Z=60x+70y'],
 ['Representamos ambos semiplanos; sus cortes válidos en los ejes son cincuenta y treinta y cinco.','Vértices en ejes: (0;0), (50;0), (0;35)'],
 ['Restamos las dos fronteras para obtener la producción mixta.','3x+2y−(x+2y)=150−70 ⇒ 2x=80'],
 ['Sustituimos x para encontrar vestidos.','x=40; 40+2y=70 ⇒ y=15'],
 ['Comparamos los cuatro vértices de la región factible.','Z=0; 3000; 2450; 3450 euros'],
 ['La combinación positiva de consumos verifica una cota global.','Z=22,5(x+2y)+12,5(3x+2y)'],
 ['Aplicamos disponibilidades y comprobamos igualdad en la solución.','Z≤22,5·70+12,5·150=3450'],
 ['Se agotan exactamente ambos tejidos y las prendas son enteras.','Lino=40+30=70 m²; algodón=120+30=150 m²'],
 ];}
 if(c.index===492){a='30 centros florales y 10 candelabros; ingreso máximo 1 310 €.';w=['40 centros florales y 0 candelabros; ingreso máximo 1 280 €.','10 centros florales y 30 candelabros; ingreso máximo 1 370 €.','9 centros florales y 3 candelabros; ingreso máximo 393 €.'];reasons=['No aprovechar los candelabros más caros hasta la proporción permitida.','Invertir el límite proporcional de candelabros.','Elegir el mínimo de mesas sin comparar con la capacidad máxima.'];extra.wrongPoints=[[40,0],[10,30],[9,3]];s=[
 ['Cada mesa lleva exactamente un artículo; las cantidades son enteras.','x=centros florales; y=candelabros'],
 ['La cantidad de mesas determina una cota inferior y una superior.','12≤x+y≤40; x,y≥0'],
 ['Los candelabros no superan un tercio de los centros.','y≤frac{x}{3} ⇔ 3y≤x'],
 ['Formulamos el ingreso y dibujamos el recinto entre ambas sumas y bajo la proporción.','Maximizar Z=32x+35y'],
 ['Sobre el eje x aparecen los extremos doce y cuarenta.','(12;0), (40;0)'],
 ['La proporción activa x=3y determina los otros dos vértices.','4y=12 ⇒ (9;3); 4y=40 ⇒ (30;10)'],
 ['Evaluamos los cuatro ingresos.','384; 1280; 393; 1310 euros'],
 ['Descomponemos el ingreso en suma y exceso proporcional.','Z=32,75(x+y)+0,75(3y−x)'],
 ['El exceso no es positivo y el total no supera cuarenta.','Z≤32,75·40=1310'],
 ['La igualdad exige cuarenta mesas y proporción máxima, ambas satisfechas.','30+10=40; 3·10=30; ingreso=1310 €'],
 ];}
 if(c.index===1119){a='20 baterías A y 30 B; beneficio máximo semanal 6 800 €.';w=['40 baterías A y 0 B; beneficio máximo semanal 5 200 €.','10 baterías A y 40 B; beneficio máximo semanal 6 900 €.','0 baterías A y 60 B; beneficio máximo semanal 8 400 €.'];reasons=['Fabricar solo A sin comparar el cruce factible.','Confundir y−x≤10 con otra proporción y exceder la diferencia permitida.','Comprobar solo presupuesto y olvidar la diferencia máxima entre tipos.'];extra.wrongPoints=[[40,0],[10,40],[0,60]];s=[
 ['Definimos cantidades enteras no negativas producidas semanalmente.','x=baterías A; y=baterías B'],
 ['La producción mínima es conjunta y la diferencia entre tipos tiene cota superior.','x+y≥10; y−x≤10'],
 ['Dividimos el presupuesto por cincuenta para simplificar sin cambiar la región.','150x+100y≤6000 ⇔ 3x+2y≤120'],
 ['No restamos otra vez los gastos: el enunciado ya proporciona beneficio por batería.','Maximizar Z=130x+140y'],
 ['Representamos los semiplanos. Los ejes aportan los tres vértices siguientes.','(10;0), (40;0), (0;10)'],
 ['El cruce de presupuesto y diferencia máxima da el cuarto vértice.','y=x+10; 3x+2(x+10)=120'],
 ['Resolvemos el sistema.','5x=100 ⇒ x=20; y=30'],
 ['Comparamos el beneficio de los cuatro vértices.','1300; 5200; 1400; 6800 euros'],
 ['Una combinación positiva de presupuesto y diferencia certifica la cota global.','Z=54(3x+2y)+32(y−x)'],
 ['Aplicamos las dos cotas superiores.','Z≤54·120+32·10=6800'],
 ['Verificamos integridad, producción mínima, diferencia y presupuesto.','Total=50≥10; diferencia=10; gasto=6000 €'],
 ];}
 if(c.index===1441){a='6 anillos del primer tipo y 8 del segundo; ingreso máximo 1 700 €.';w=['10 anillos del primer tipo y 0 del segundo; ingreso máximo 1 500 €.','0 anillos del primer tipo y 16 del segundo; ingreso máximo 1 600 €.','8 anillos del primer tipo y 6 del segundo; ingreso máximo 1 800 €.'];reasons=['Agotar la plata fabricando solo el primer tipo.','Agotar el oro fabricando solo el segundo tipo.','Intercambiar la solución e incumplir las dos disponibilidades.'];extra.wrongPoints=[[10,0],[0,16],[8,6]];s=[
 ['Definimos cantidades enteras no negativas de anillos.','x=primer tipo; y=segundo tipo'],
 ['Separamos las restricciones de oro y plata.','4x+3y≤48; 2x+y≤20; x,y≥0'],
 ['La función objetivo es el ingreso por venta.','Maximizar Z=150x+100y'],
 ['Representamos los semiplanos; los cortes factibles con ejes son diez y dieciséis.','(0;0), (10;0), (0;16)'],
 ['Despejamos la plata para sustituir en el oro.','y=20−2x'],
 ['Hallamos el cruce de ambas fronteras.','4x+3(20−2x)=48 ⇒ x=6; y=8'],
 ['Comparamos los cuatro vértices.','Z=0; 1500; 1600; 1700 euros'],
 ['Una combinación positiva de las disponibilidades demuestra la cota global.','Z=25(4x+3y)+25(2x+y)'],
 ['Evaluamos esa cota y verificamos igualdad.','Z≤25·48+25·20=1700'],
 ['Ambos metales se agotan en el resultado entero.','Oro=24+24=48 g; plata=12+8=20 g'],
 ];}
 if(c.index===1487){a='Mezclar frac{2}{3} kg de A y frac{2}{3} kg de B; coste frac{4}{3} €; 2 unidades de calcio y 2 de hierro.';w=['Mezclar 1 kg de A y 1 kg de B; coste 2 €; 3 unidades de calcio y 3 de hierro.','Mezclar frac{1}{2} kg de A y frac{1}{2} kg de B; coste 1 €; frac{3}{2} unidades de calcio y frac{3}{2} de hierro.','Mezclar 0 kg de A y 2 kg de B; coste 2 €; 2 unidades de calcio y 4 de hierro.'];reasons=['Redondear kilogramos sin que el problema exija cantidades enteras.','Minimizar el coste incumpliendo los mínimos nutricionales.','Usar únicamente B sin comparar la mezcla más barata.'];extra={wrongPoints:[[1,1],[.5,.5],[0,2]],nutrients:[2,2],continuousQuantities:true};s=[
 ['Las cantidades son kilogramos y pueden ser fraccionarias.','x=kg de A; y=kg de B; x,y≥0'],
 ['Traducimos los mínimos de nutrientes sin invertir las desigualdades.','Calcio: 2x+y≥2; hierro: x+2y≥2'],
 ['Cada kilogramo cuesta un euro, sea del pienso que sea.','Minimizar C=x+y'],
 ['La región está por encima de ambas rectas; es no acotada hacia arriba y hacia la derecha.','Vértices en ejes: (2;0), (0;2)'],
 ['Para el cruce de las necesidades restamos las igualdades.','2x+y=2; x+2y=2 ⇒ x=y'],
 ['Sustituimos en cualquiera de ellas.','3x=2 ⇒ x=y=frac{2}{3}'],
 ['Comparamos los costes de los tres vértices.','C(2;0)=2; C(0;2)=2; C(frac{2}{3};frac{2}{3})=frac{4}{3}'],
 ['Al ser la región no acotada no basta con mirar vértices: sumamos las necesidades para una cota global.','(2x+y)+(x+2y)≥4 ⇒ 3C≥4'],
 ['La mezcla obtenida alcanza la cota. La igualdad requiere satisfacer exactamente ambos mínimos.','C≥frac{4}{3}; igualdad solo en x=y=frac{2}{3}'],
 ['Calculamos los nutrientes administrados, que también pide el ejercicio.','Calcio=2·frac{2}{3}+frac{2}{3}=2'],
 ['Comprobamos el hierro y conservamos las cantidades exactas.','Hierro=frac{2}{3}+2·frac{2}{3}=2'],
 ];}
 assert.ok(a&&s);const p=part({id:'whole',prompt:text},a,w,reasons,s,'OFFICIAL_LINEAR_MODEL_ALL_VERTICES_PLUS_INDEPENDENT_DUAL_GLOBAL_BOUND',{...proof,...extra});p.visual=c.index===1487?feedGraph(c):rationalGraph(c);return[p];}
export function buildResourcesMixturesBatch(id='batch-0352',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Región factible','Optimización'];x.qualityGates.pedagogical='OFFICIAL_RESOURCE_MODEL_COMPLETE_QUESTIONS_VERTICES_AND_DUAL_CERTIFICATE';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildResourcesMixturesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0352-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0352.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
