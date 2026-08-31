import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:639,literals:['7.5 kg','6.5 kg','49 palas','32 palas'],constraints:[[9,10,750],[2,1,130],[1,0,60],[-1,0,0],[0,-1,0]],objective:[30,20,0],domain:{x:[0,70],y:[0,85]},labels:['9x+10y≤750','2x+y≤130','x≤60','x≥0','y≥0'],optimum:[50,30],maximum:2100,dual:[10/11,120/11,0,0,0]},
 {index:687,literals:['78000','2400','3600','34000','72000','no sea mayor que 10'],constraints:[[2,3,65],[1,-1,10],[-1,1,10],[-1,-1,-10],[-1,0,0],[0,-1,0]],objective:[34000,72000,0],domain:{x:[0,24],y:[0,21]},labels:['2x+3y≤65','x−y≤10','y−x≤10','x+y≥10','x≥0','y≥0'],optimum:[7,17],maximum:1462000,dual:[21200,0,8400,0,0,0]},
 {index:702,literals:['160 m','240 m','250 €','350 €','60 trajes y 50 abrigos'],constraints:[[1,2,160],[1,1,120],[-1,0,0],[0,-1,0]],objective:[250,350,0],domain:{x:[0,140],y:[0,90]},labels:['x+2y≤160','x+y≤120','x≥0','y≥0'],optimum:[80,40],maximum:34000,dual:[100,150,0,0]},
 {index:752,literals:['600 horas','480 horas','150 € y 100 €'],constraints:[[2,3,600],[2,1,480],[-1,0,0],[0,-1,0]],objective:[150,100,0],domain:{x:[0,270],y:[0,220]},labels:['2x+3y≤600','2x+y≤480','x≥0','y≥0'],optimum:[210,60],maximum:37500,dual:[12.5,62.5,0,0]},
 {index:757,literals:['60 horas semanales','4 euros','3 horas y 6 euros','como mínimo, 28'],constraints:[[2,3,60],[-2,-1,-28],[-1,0,0],[0,-1,0]],objective:[4,6,0],domain:{x:[0,34],y:[0,22]},labels:['2x+3y≤60','2x+y≥28','x≥0','y≥0'],optimum:[30,0],maximum:120,dual:[2,0,0,0]},
 {index:858,literals:['500 kg','400 kg','225 kg','2000 euros','3000 euros'],constraints:[[1,2,500],[2,1,400],[0,1,225],[-1,0,0],[0,-1,0]],objective:[2000,3000,0],domain:{x:[0,230],y:[0,260]},labels:['x+2y≤500','2x+y≤400','y≤225','x≥0','y≥0'],optimum:[100,200],maximum:800000,dual:[4000/3,1000/3,0,0,0]},
];
export function integerOptima(c){const hits=[];let best=-Infinity;for(let x=0;x<=c.domain.x[1];x++)for(let y=0;y<=c.domain.y[1];y++){if(!c.constraints.every(([a,b,k])=>a*x+b*y<=k))continue;const z=c.objective[0]*x+c.objective[1]*y;if(z>best){best=z;hits.length=0;}if(z===best)hits.push([x,y]);}return{best,hits};}
export function solve(c,text){const whole={id:'whole',prompt:text},ps=[702,858].includes(c.index)?officialParts(text):[whole],v={...derive(c),constraints:c.constraints,objective:c.objective,dual:c.dual,maximum:c.maximum,optimum:c.optimum};
 const mk=(k,a,w,reasons,steps,extra={})=>part(ps[k],a,w,reasons,steps,'EXACT_POLYGON_VERTICES_DUAL_BOUND_AND_EXHAUSTIVE_INTEGER_CHECK',{...v,...extra});let out;
 if(c.index===639)out=[mk(0,'50 palas A y 30 palas B; máximo 2100 €. La propuesta 49 A y 32 B no es posible.',[
 '60 palas A y 10 palas B; máximo 2000 €. La propuesta 49 A y 32 B no es posible.',
 '50 palas A y 30 palas B; máximo 2100 €. La propuesta 49 A y 32 B sí es posible.',
 '30 palas A y 50 palas B; máximo 1900 €. La propuesta 49 A y 32 B no es posible.'
 ],['Elegir el mayor número de palas A sin comparar todos los vértices.','Comprobar solo la goma EVA y olvidar la fibra de carbono.','Intercambiar las cantidades de los dos modelos.'],[
 ['Definimos cantidades enteras y no negativas y convertimos todos los recursos a gramos.','x=palas A; y=palas B; carbono=7500 g; goma EVA=6500 g'],
 ['Formulamos una restricción independiente por recurso y otra para el límite del modelo A.','90x+100y≤7500; 100x+50y≤6500; x≤60; x,y≥0'],
 ['Simplificamos las restricciones sin cambiar su sentido y escribimos el objetivo.','9x+10y≤750; 2x+y≤130; maximizar Z=30x+20y'],
 ['La figura muestra la intersección de los semiplanos. Sobre los ejes aparecen tres vértices.','O=(0;0), A=(60;0), E=(0;75)'],
 ['Intersecamos el límite x=60 con la frontera más restrictiva y comprobamos carbono.','2·60+y=130 ⇒ B=(60;10); 9·60+10·10=640≤750'],
 ['Intersecamos las dos fronteras de recursos.','9x+10y=750; 2x+y=130 ⇒ 11x=550 ⇒ C=(50;30)'],
 ['Comparamos el objetivo en todos los vértices factibles.','Z(O)=0; Z(A)=1800; Z(B)=2000; Z(C)=2100; Z(E)=1500'],
 ['Una combinación positiva de restricciones demuestra el máximo para toda la región, no solo para los vértices.','Z=frac{10}{11}(9x+10y)+frac{120}{11}(2x+y)≤2100'],
 ['La igualdad exige agotar ambos recursos; la intersección es entera y respeta el límite del modelo A.','x=50; y=30; carbono=7500 g; EVA=6500 g; x≤60'],
 ['Comprobamos por separado la propuesta del enunciado.','Carbono=90·49+100·32=7610 g>7500 g'],
 ['Aunque la goma y el límite de A se cumplen, el exceso de carbono impide fabricar esa combinación.','EVA=100·49+50·32=6500 g; 49≤60; propuesta no factible'],
 ],{wrongPoints:[[60,10],[30,50]],proposal:[49,32],proposalResources:[7610,6500]})];
 if(c.index===687)out=[mk(0,'7 anuncios de radio y 17 de televisión; audiencia máxima 1 462 000 personas.',[
 '19 anuncios de radio y 9 de televisión; audiencia máxima 1 294 000 personas.',
 '0 anuncios de radio y 21 de televisión; audiencia máxima 1 512 000 personas.',
 '7 anuncios de radio y 17 de televisión; audiencia máxima 1 426 000 personas.'
 ],['Elegir el extremo donde predominan los anuncios de radio.','Omitir la restricción sobre la diferencia entre ambos tipos.','Cometer un error de suma al evaluar la audiencia óptima.'],[
 ['Definimos el número de anuncios de cada medio; han de ser enteros y no negativos.','x=anuncios de radio; y=anuncios de televisión'],
 ['Expresamos el presupuesto y lo dividimos entre mil doscientos.','2400x+3600y≤78000 ⇔ 2x+3y≤65'],
 ['La diferencia no mayor que diez debe respetarse en ambos sentidos.','|x−y|≤10 ⇔ x−y≤10 y y−x≤10'],
 ['Añadimos el mínimo de emisiones y la audiencia que el ejercicio atribuye a cada anuncio.','x+y≥10; maximizar Z=34000x+72000y'],
 ['Representamos todos los semiplanos. La frontera de mínimo total corta los ejes en dos vértices.','A=(10;0); B=(0;10)'],
 ['Intersecamos el presupuesto con la frontera donde hay diez anuncios más de radio.','x=y+10; 2(y+10)+3y=65 ⇒ C=(19;9)'],
 ['Intersecamos el presupuesto con la frontera donde hay diez anuncios más de televisión.','y=x+10; 2x+3(x+10)=65 ⇒ D=(7;17)'],
 ['Comparamos la audiencia en los cuatro vértices.','Z(A)=340000; Z(B)=720000; Z(C)=1294000; Z(D)=1462000'],
 ['Reescribimos la audiencia como combinación positiva de presupuesto y diferencia de emisiones.','Z=21200(2x+3y)+8400(y−x)'],
 ['Aplicamos ambas cotas para certificar el resultado en cualquier punto factible.','Z≤21200·65+8400·10=1462000'],
 ['La igualdad obliga a la intersección D. Comprobamos todas las condiciones, incluida la integridad.','x=7; y=17; coste=16800+61200=78000; diferencia=10; total=24≥10'],
 ['Calculamos por separado las audiencias de radio y televisión en el óptimo.','Radio: 7·34000=238000; TV: 17·72000=1224000'],
 ['Concluimos la audiencia máxima según el modelo aditivo indicado en el enunciado.','238000+1224000=1462000 personas'],
 ],{wrongPoints:[[19,9],[0,21]],wrongAudience:1426000})];
 if(c.index===702)out=[mk(0,'80 trajes y 40 abrigos; máximo 34 000 €.',[
 '120 trajes y 0 abrigos; máximo 30 000 €.','0 trajes y 80 abrigos; máximo 28 000 €.','40 trajes y 80 abrigos; máximo 38 000 €.'
 ],['Fabricar solo trajes sin comparar la combinación mixta.','Elegir solo el artículo de mayor ingreso unitario.','Intercambiar las coordenadas e incumplir la pana disponible.'],[
 ['Definimos las unidades que se fabrican; no pueden ser negativas ni fraccionarias.','x=trajes; y=abrigos; x,y enteros no negativos'],
 ['Contabilizamos los dos tejidos por separado.','Pana: x+2y≤160; lana: 2x+2y≤240'],
 ['Simplificamos la lana y formulamos el objetivo de venta señalado por el enunciado.','x+y≤120; maximizar Z=250x+350y'],
 ['Dibujamos las dos fronteras y el primer cuadrante. Los vértices de los ejes son inmediatos.','O=(0;0), A=(120;0), C=(0;80)'],
 ['La intersección de las fronteras se obtiene restando ambas ecuaciones.','x+2y=160; x+y=120 ⇒ y=40; x=80; B=(80;40)'],
 ['Evaluamos todos los vértices.','Z(O)=0; Z(A)=30000; Z(B)=34000; Z(C)=28000'],
 ['Expresamos el beneficio como combinación positiva de las restricciones.','Z=100(x+2y)+150(x+y)'],
 ['Aplicamos las cotas para comprobar el máximo global.','Z≤100·160+150·120=34000'],
 ['La igualdad se alcanza en la intersección y las cantidades son enteras.','80 trajes y 40 abrigos; pana=160 m; lana=240 m; máximo=34000 €'],
 ],{wrongPoints:[[120,0],[0,80],[40,80]]}),mk(1,'Sí: consumen 160 m de pana y 220 m de lana; ingreso 32 500 €, no máximo.',[
 'No: consumen 170 m de pana y 220 m de lana; ingreso 32 500 €, no máximo.',
 'Sí: consumen 160 m de pana y 220 m de lana; ingreso 32 500 €, que sí es máximo.',
 'No: consumen 160 m de pana y 260 m de lana; ingreso 32 500 €, no máximo.'
 ],['Multiplicar incorrectamente el consumo de pana de los abrigos.','Confundir agotar un recurso con alcanzar el óptimo.','Contabilizar incorrectamente la lana por prenda.'],[
 ['Sustituimos la propuesta en el consumo de pana.','x=60; y=50 ⇒ x+2y=60+100=160 m'],
 ['Sustituimos también en el consumo original de lana.','2x+2y=120+100=220 m≤240 m'],
 ['Las dos restricciones y la integridad se cumplen, por lo que la propuesta es posible.','Pana sobrante=0 m; lana sobrante=20 m'],
 ['Calculamos los ingresos de las dos prendas y los sumamos.','Z=250·60+350·50=15000+17500=32500 €'],
 ['Comparamos con el máximo demostrado, no solo con la factibilidad.','32500<34000 ⇒ no es óptima'],
 ['El cambio a la combinación óptima mejora el ingreso sin superar los recursos.','(80;40) produce 1500 € más que (60;50)'],
 ],{proposal:[60,50],resources:[160,220],revenue:32500,shortfall:1500})];
 if(c.index===752)out=[mk(0,'210 alfombras de seda y 60 de lana; máximo 37 500 €.',[
 '240 alfombras de seda y 0 de lana; máximo 36 000 €.','0 alfombras de seda y 200 de lana; máximo 20 000 €.','60 alfombras de seda y 210 de lana; máximo 30 000 €.'
 ],['Usar únicamente la máquina para maximizar el producto más rentable.','Fabricar solo alfombras de lana.','Intercambiar las cantidades e incumplir el trabajo manual disponible.'],[
 ['Definimos cantidades enteras y no negativas de cada tipo.','x=alfombras de seda; y=alfombras de lana'],
 ['El consumo de trabajo manual y de máquina impone restricciones distintas.','Manual: 2x+3y≤600; máquina: 2x+y≤480'],
 ['Formulamos la función a maximizar.','Z=150x+100y; x,y≥0'],
 ['Representamos la región común. En los ejes limitan la máquina y el trabajo manual, respectivamente.','O=(0;0); A=(240;0); C=(0;200)'],
 ['Restamos las fronteras para obtener el vértice mixto.','2x+3y=600; 2x+y=480 ⇒ 2y=120 ⇒ y=60; x=210'],
 ['Comparamos beneficios en los cuatro vértices.','Z(O)=0; Z(A)=36000; Z(B)=37500; Z(C)=20000'],
 ['Expresamos el beneficio como combinación positiva de las dos disponibilidades.','Z=12,5(2x+3y)+62,5(2x+y)'],
 ['La cota global confirma que ningún punto interior mejora el máximo.','Z≤12,5·600+62,5·480=37500'],
 ['La igualdad requiere agotar ambas capacidades. Las cantidades obtenidas son enteras.','Seda=210; lana=60; manual=420+180=600 h; máquina=420+60=480 h'],
 ['Interpretamos el resultado en las unidades solicitadas.','Beneficio máximo mensual=150·210+100·60=37500 €'],
 ],{wrongPoints:[[240,0],[0,200],[60,210]]})];
 if(c.index===757)out=[mk(0,'Nueve combinaciones óptimas: x=30−3k pañuelos, y=2k corbatas, k=0,…,8; máximo 120 €.',[
 'Seis combinaciones óptimas: x=30−3k pañuelos, y=2k corbatas, k=0,…,5; máximo 120 €.',
 'Once combinaciones óptimas: x=30−3k pañuelos, y=2k corbatas, k=0,…,10; máximo 120 €.',
 'Nueve combinaciones óptimas: x=30−2k pañuelos, y=2k corbatas, k=0,…,8; máximo 120 €.'
 ],['Excluir combinaciones válidas del tramo óptimo.','Incluir combinaciones que incumplen el compromiso mínimo.','No compensar tres horas de corbata con la cantidad correcta de pañuelos.'],[
 ['Definimos las cantidades enteras no negativas de cada prenda.','x=pañuelos; y=corbatas'],
 ['Traducimos la capacidad máxima y el compromiso mínimo con sus sentidos correctos.','2x+3y≤60; 2x+y≥28; x,y≥0'],
 ['El beneficio es proporcional exactamente al tiempo trabajado.','Z=4x+6y=2(2x+3y)≤120'],
 ['Representamos la región: el eje y no es factible y el eje x queda acotado entre catorce y treinta.','y=0 ⇒ 14≤x≤30; x=0 exigiría y≥28 e y≤20'],
 ['La intersección de las fronteras completa el triángulo.','2x+3y=60; 2x+y=28 ⇒ y=16; x=6; vértices (14;0), (30;0), (6;16)'],
 ['Evaluamos los vértices y detectamos que el máximo ocupa todo un lado, no un único vértice.','Z(14;0)=56; Z(30;0)=Z(6;16)=120'],
 ['Para alcanzar la cota hay que agotar las horas. La otra restricción limita la porción de la recta.','2x+3y=60; 2x+y=60−2y≥28 ⇒ 0≤y≤16'],
 ['La integridad exige que y sea par; parametrizamos todas las posibilidades, sin omitir ninguna.','y=2k; x=30−3k; k entero; 0≤k≤8'],
 ['Enumeramos las nueve combinaciones óptimas como verificación independiente.','(30;0), (27;2), (24;4), (21;6), (18;8), (15;10), (12;12), (9;14), (6;16)'],
 ['Todas trabajan sesenta horas y cumplen el compromiso. No existe una preferencia adicional en el enunciado.','Beneficio máximo=120 €; cualquiera de las nueve combinaciones anteriores'],
 ],{integerOptima:Array.from({length:9},(_,k)=>[30-3*k,2*k]),optimalFace:[[30,0],[6,16]]})];
 if(c.index===858)out=[mk(0,'100 tapices A y 200 tapices B; máximo 800 000 €.',[
 '50 tapices A y 225 tapices B; máximo 775 000 €.','200 tapices A y 0 tapices B; máximo 400 000 €.','200 tapices A y 100 tapices B; máximo 700 000 €.'
 ],['Elegir el extremo que agota el oro sin comparar todos los ingresos.','Fabricar únicamente tapices A.','Intercambiar las cantidades e incumplir la plata disponible.'],[
 ['Definimos cantidades enteras no negativas y contabilizamos cada hilo por separado.','x=tapices A; y=tapices B'],
 ['Las disponibilidades de seda, plata y oro producen tres restricciones.','Seda: x+2y≤500; plata: 2x+y≤400; oro: y≤225'],
 ['La venta de toda la producción da el objetivo lineal.','Maximizar Z=2000x+3000y; x,y≥0'],
 ['Representamos las fronteras y el primer cuadrante. Los vértices sobre los ejes son inmediatos.','O=(0;0); A=(200;0); E=(0;225)'],
 ['Intersecamos las fronteras de seda y plata.','x+2y=500; 2x+y=400 ⇒ y=200; x=100; B=(100;200)'],
 ['La frontera del oro corta la de seda en el último vértice.','y=225; x+450=500 ⇒ C=(50;225); plata=325≤400'],
 ['Comparamos el objetivo en los cinco vértices.','Z(O)=0; Z(A)=400000; Z(B)=800000; Z(C)=775000; Z(E)=675000'],
 ['Una combinación positiva de las restricciones confirma la cota para todos los puntos.','Z=frac{4000}{3}(x+2y)+frac{1000}{3}(2x+y)≤800000'],
 ['La igualdad exige agotar seda y plata; el óptimo respeta también el oro y es entero.','x=100; y=200; oro usado=200≤225; máximo=800000 €'],
 ],{wrongPoints:[[50,225],[200,0],[200,100]]}),mk(1,'Sobran 0 kg de seda, 0 kg de plata y 25 kg de oro.',[
 'Sobran 0 kg de seda, 0 kg de plata y 0 kg de oro.','Sobran 100 kg de seda, 0 kg de plata y 25 kg de oro.','Sobran 0 kg de seda, 100 kg de plata y 25 kg de oro.'
 ],['Suponer que un óptimo siempre agota todos los recursos.','Contabilizar una sola unidad de seda por tapiz B.','Contabilizar una sola unidad de plata por tapiz A.'],[
 ['Utilizamos la producción óptima demostrada en el apartado anterior.','x=100; y=200'],
 ['Calculamos la seda utilizada y restamos de la cantidad inicial.','Seda: 100+2·200=500 kg; sobrante=500−500=0 kg'],
 ['Calculamos la plata utilizada con el coeficiente dos del tapiz A.','Plata: 2·100+200=400 kg; sobrante=400−400=0 kg'],
 ['Solo los tapices B consumen oro.','Oro: 200 kg; sobrante=225−200=25 kg'],
 ['Las tres holguras son no negativas: se confirma la factibilidad.','Holguras (seda;plata;oro)=(0;0;25) kg'],
 ['No es necesario agotar el oro: la seda y la plata ya impiden aumentar el beneficio.','Las restricciones activas son seda y plata'],
 ],{consumed:[500,400,200],leftover:[0,0,25]})];
 assert.ok(out);out[0].visual=rationalGraph(c);return out;
}
export function buildWorkshopsAdvertisingBatch(id='batch-0344',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){if(x.parts.length===1&&x.parts[0].partId==='whole'){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Optimización','Región factible'];x.qualityGates.pedagogical='SOURCE_READ_RESOURCES_ALL_VERTICES_GLOBAL_BOUND_AND_INTEGER_OPTIMAL_FACE';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildWorkshopsAdvertisingBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0344-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0344.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
