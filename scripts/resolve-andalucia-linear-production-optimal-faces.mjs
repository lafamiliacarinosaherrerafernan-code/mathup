import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {part,officialParts} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph,renderRationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:580,literals:['Júpiter y Minerva','1000'].slice(0,1),constraints:[[2,1,200],[1,1,160],[1,0,60],[-1,0,0],[0,-1,0]],objective:[30,20,0],labels:['2x+y≤200','x+y≤160','x≤60','x≥0','y≥0'],domain:{x:[0,70],y:[0,180]},optimum:[40,120],extreme:3600,dual:[10,10,0,0,0]},
 {index:797,literals:['lavadoras y frigoríficos','la hora'],constraints:[[2,1,32],[1,0,12],[0,1,16],[-1,0,0],[0,-1,0]],objective:[250/3,125/3,0],labels:['2x+y≤32','x≤12','y≤16','x≥0','y≥0'],domain:{x:[0,14],y:[0,18]},optimum:[8,16],extreme:4000/3,dual:[125/3,0,0,0,0],face:[[8,16],[12,8]],integerFaceCount:5},
 {index:892,literals:['10 unidades','al menos 4 unidades','mucho 2','60 euros','25 euros'],constraints:[[1,1,10],[-1,-1,-4],[1,-1,2],[-1,0,0],[0,-1,0]],objective:[60,25,0],labels:['x+y≤10','x+y≥4','x−y≤2','x≥0','y≥0'],domain:{x:[0,8],y:[0,12]},optimum:[6,4],extreme:460,dual:[42.5,0,17.5,0,0]},
 {index:1252,literals:['20 hectáreas','30000','5500','3000','1500','5000','10000'],constraints:[[-1,0,-20],[0,1,20],[10,11,550],[5,8,300],[0,-1,0]],objective:[5000,10000,0],labels:['x≥20','y≤20','10x+11y≤550','5x+8y≤300','y≥0'],domain:{x:[0,60],y:[0,25]},optimum:[28,20],extreme:340000,dual:[0,2000,0,1000,0],continuous:true},
 {index:1255,literals:['dos productos','fomento del empleo','único producto'],constraints:[[2,1,700],[1,0,260],[-1,-2,-420],[-1,0,0],[0,-1,0]],objective:[800,400,0],labels:['2x+y≤700','x≤260','x+2y≥420','x≥0','y≥0'],domain:{x:[0,300],y:[0,750]},optimum:[0,700],extreme:280000,dual:[400,0,0,0,0],face:[[0,700],[260,180]],integerFaceCount:261},
 {index:1391,literals:['dos tipos de anillos','piedras semipreciosas','al menos'],constraints:[[1,3,200],[2,1,150],[-2,-5,-190],[-1,0,-20],[0,-1,0]],objective:[21,50,0],labels:['x+3y≤200','2x+y≤150','2x+5y≥190','x≥20','y≥0'],domain:{x:[0,80],y:[0,70]},optimum:[50,50],extreme:3550,dual:[15.8,2.6,0,0,0]},
 {index:1589,literals:['iceberg y romana','al menos la mitad','minimizar'],constraints:[[-2,1,0],[1,0,1500],[-1,-1,-900],[1,1,2400],[-1,0,0],[0,-1,0]],objective:[15,18,0],labels:['y≤2x','x≤1500','x+y≥900','x+y≤2400','x≥0','y≥0'],domain:{x:[0,1700],y:[0,1900]},optimum:[900,0],extreme:13500,minimize:true,dual:[0,0,15,0,0,3]},
 {index:1604,literals:['empresa de catering','premium y estándar','beneficio'],constraints:[[2,3,58],[2,1,50],[1,4,60],[-1,0,0],[0,-1,0]],objective:[10.5,5.5,0],labels:['2x+3y≤58','2x+y≤50','x+4y≤60','x≥0','y≥0'],domain:{x:[0,30],y:[0,20]},optimum:[23,4],extreme:263.5,dual:[.125,5.125,0,0,0]},
];
export function optimalFaceGraph(c){assert.ok(c.face);return{...rationalGraph(c),plotVersion:'linear-production-optimal-face-v1',maximumFace:{endpoints:c.face,integerPointCount:c.integerFaceCount,allPointsOptimal:true},caption:c.index===797?'Máximo en 5 puntos enteros: x=8,9,10,11,12; y=32−2x.':'Máximo en 261 puntos enteros: x=0,…,260; y=700−2x.'};}
export function renderOptimalFaceGraph(g){const c=cases.find(c=>c.index===g.index||JSON.stringify(c.face)===JSON.stringify(g.maximumFace?.endpoints));assert.ok(c);assert.deepEqual(g,optimalFaceGraph(c));return renderRationalGraph({...g,plotVersion:'linear-rational-polygon-v1'}).replace('Todos los puntos de la zona sombreada cumplen las restricciones.',g.caption);}
const pointReasons=['Elegir un vértice factible sin comparar todos los valores.','Preferir fabricar un solo producto sin verificar la combinación óptima.','Omitir una de las restricciones de recursos.'];
export function solve(c,text){const proof={...derive(c),constraints:c.constraints,objective:c.objective,optimum:c.optimum,extreme:c.extreme,dual:c.dual,minimize:!!c.minimize};let a,w,s,reasons=pointReasons,extra={};
 if(c.index===580){a='40 botes Júpiter y 120 Minerva; beneficio máximo 3 600 €.';w=['60 botes Júpiter y 80 Minerva; beneficio máximo 3 400 €.','0 botes Júpiter y 160 Minerva; beneficio máximo 3 200 €.','60 botes Júpiter y 100 Minerva; beneficio máximo 3 800 €.'];extra.wrongPoints=[[60,80],[0,160],[60,100]];s=[
 ['Definimos las cantidades enteras de botes de cada nuevo color.','x=Júpiter; y=Minerva; x,y≥0'],
 ['La pintura verde limita ambos productos. Dividimos entre cinco.','10x+5y≤1000 ⇒ 2x+y≤200'],
 ['La morada interviene en ambos colores; la naranja solo en Júpiter.','5x+5y≤800 ⇒ x+y≤160'],
 ['La disponibilidad naranja impone una cota adicional.','5x≤300 ⇒ x≤60'],
 ['Sumamos los beneficios unitarios y representamos los semiplanos.','Maximizar Z=30x+20y'],
 ['Los cortes con ejes y la frontera x=60 proporcionan tres vértices.','(0;0), (60;0), (0;160)'],
 ['Sobre x=60, verde fija y=80. El cruce de verde y morada se obtiene restando.','2x+y=200; x+y=160 ⇒ x=40, y=120'],
 ['Comparamos todos los vértices de la región.','Z(0;0)=0; Z(60;0)=1800; Z(60;80)=3400'],
 ['La combinación mixta del cruce supera las otras posibilidades.','Z(40;120)=3600; Z(0;160)=3200'],
 ['Una cota independiente se obtiene sumando diez veces cada restricción activa.','Z=10(2x+y)+10(x+y)≤3600'],
 ['El óptimo alcanza la cota y respeta también la naranja.','Verde=1000 kg; morada=800 kg; naranja=200≤300 kg'],
 ];}
 if(c.index===797){a='Cinco repartos óptimos: (lavadoras;frigoríficos)=(8;16),(9;14),(10;12),(11;10),(12;8); ingreso frac{4000}{3} €.';w=['Únicamente (lavadoras;frigoríficos)=(8;16); ingreso máximo frac{4000}{3} €.','Únicamente (lavadoras;frigoríficos)=(12;8); ingreso máximo frac{4000}{3} €.','Únicamente (lavadoras;frigoríficos)=(12;16); ingreso máximo frac{5000}{3} €.'];reasons=['Tratar un extremo del segmento óptimo como solución única.','Omitir los otros cuatro repartos enteros que agotan el mismo tiempo.','Sumar los máximos de cada aparato sin respetar el tiempo disponible.'];extra={wrongUniqueClaims:[[8,16],[12,8]],wrongPoints:[[12,16]],integerFaceCount:5};s=[
 ['Definimos cantidades enteras de electrodomésticos.','x=lavadoras; y=frigoríficos; x,y≥0'],
 ['Convertimos toda la disponibilidad a minutos antes de formular.','26 h 40 min=26·60+40=1600 min'],
 ['Aplicamos tiempo y límites de encargo.','100x+50y≤1600; x≤12; y≤16'],
 ['La tarifa es por hora, no por aparato.','Z=frac{50}{60}(100x+50y)=frac{125}{3}(2x+y)'],
 ['El máximo ingreso posible corresponde a ocupar todos los minutos.','2x+y≤32 ⇒ Z≤frac{4000}{3}'],
 ['La recta objetivo es paralela a la frontera de tiempo: no hay un único vértice óptimo.','2x+y=32 ⇒ y=32−2x'],
 ['Los límites de frigoríficos y lavadoras delimitan todo el segmento óptimo.','y≤16 ⇒ x≥8; x≤12 ⇒ 8≤x≤12'],
 ['Imponemos integridad porque no se revisan fracciones de aparatos.','x∈{8,9,10,11,12}'],
 ['Calculamos las ordenadas de las cinco posibilidades.','y∈{16,14,12,10,8}, respectivamente'],
 ['Cada pareja satisface ambas cotas y emplea exactamente mil seiscientos minutos.','100x+50(32−2x)=1600'],
 ['La misma cota es alcanzada en los cinco repartos. Solo redondeamos el importe final.','Z máximo=frac{4000}{3} €≈1333,33 €'],
 ];}
 if(c.index===892){a='6 unidades de A y 4 de B por hora; beneficio máximo 460 € por hora.';w=['0 unidades de A y 10 de B por hora; beneficio máximo 250 € por hora.','3 unidades de A y 1 de B por hora; beneficio máximo 205 € por hora.','8 unidades de A y 2 de B por hora; beneficio máximo 530 € por hora.'];extra.wrongPoints=[[0,10],[3,1],[8,2]];s=[
 ['Definimos la producción horaria entera no negativa.','x=unidades de A; y=unidades de B'],
 ['La producción conjunta tiene un mínimo y un máximo.','4≤x+y≤10'],
 ['La política sanitaria restringe la diferencia; no exige igualdad.','x−y≤2; x,y≥0'],
 ['El beneficio pondera cada medicamento con su margen correspondiente.','Maximizar Z=60x+25y'],
 ['El eje y proporciona dos vértices; el eje x no contiene puntos factibles.','(0;4), (0;10); y=0 exigiría x≥4 y x≤2'],
 ['El cruce de la producción mínima con la diferencia da el tercer vértice.','x+y=4; x−y=2 ⇒ (3;1)'],
 ['El cruce de la producción máxima con la diferencia da el cuarto.','x+y=10; x−y=2 ⇒ (6;4)'],
 ['Evaluamos los cuatro vértices del recinto.','Z(0;4)=100; Z(0;10)=250; Z(3;1)=205; Z(6;4)=460'],
 ['Una combinación de restricciones confirma el máximo de forma independiente.','Z=42,5(x+y)+17,5(x−y)≤460'],
 ['La producción propuesta es entera y alcanza ambas fronteras activas.','6+4=10; 6−4=2; Z=360+100=460'],
 ];}
 if(c.index===1252){a='28 hectáreas de secano y 20 de regadío; producción máxima anual 340 000 kg.';w=['44 hectáreas de secano y 10 de regadío; producción máxima anual 320 000 kg.','55 hectáreas de secano y 0 de regadío; producción máxima anual 275 000 kg.','33 hectáreas de secano y 20 de regadío; producción máxima anual 365 000 kg.'];extra.wrongPoints=[[44,10],[55,0],[33,20]];s=[
 ['Definimos superficies en hectáreas; no hace falta imponer integridad.','x=secano; y=regadío; x≥20, y≥0'],
 ['Solo el regadío consume el agua indicada.','1500y≤30000 ⇒ y≤20'],
 ['Formulamos abono y fitosanitarios, simplificando unidades.','100x+110y≤5500 ⇒ 10x+11y≤550'],
 ['La segunda limitación agrícola tiene coeficientes diferentes.','50x+80y≤3000 ⇒ 5x+8y≤300'],
 ['Maximizamos kilogramos anuales totales.','Z=5000x+10000y'],
 ['La base del polígono queda entre veinte y cincuenta y cinco hectáreas de secano.','(20;0), (55;0)'],
 ['En el cruce de los dos productos agrícolas duplicamos la segunda igualdad y restamos.','10x+16y=600; 10x+11y=550 ⇒ y=10, x=44'],
 ['Con veinte hectáreas regadas, fitosanitarios limita x a veintiocho.','5x+160=300 ⇒ x=28; otro vértice=(20;20)'],
 ['Evaluamos las cinco esquinas de la región.','Z=100000;275000;320000;340000;300000 kg'],
 ['Una cota independiente combina fitosanitarios y agua.','Z=1000(5x+8y)+2000y≤340000'],
 ['Verificamos recursos en el óptimo.','Agua=30000 m³; abono=5000≤5500 kg; fitosanitarios=3000 kg'],
 ];}
 if(c.index===1255){a='Todos los repartos x∈{0,…,260}, y=700−2x; x unidades P₁ e y unidades P₂. Ingreso máximo 280 000 €.';w=['Únicamente x=260, y=180; x unidades P₁ e y unidades P₂. Ingreso máximo 280 000 €.','Únicamente x=0, y=700; x unidades P₁ e y unidades P₂. Ingreso máximo 280 000 €.','Únicamente x=350, y=0; x unidades P₁ e y unidades P₂. Ingreso máximo 280 000 €.'];reasons=['Reducir una familia óptima a su extremo con máximo P₁.','Reducir una familia óptima al único reparto que fabrica solo P₂.','Ignorar el capital y el mínimo de horas contratadas.'];extra={wrongUniqueClaims:[[260,180],[0,700]],wrongPoints:[[350,0]],integerFaceCount:261};s=[
 ['Definimos las cantidades anuales enteras de los dos productos.','x=P₁; y=P₂; x,y≥0'],
 ['Traducimos energía y capital; P₂ no consume capital según el documento.','10x+5y≤3500; 5x≤1300'],
 ['La mano de obra tiene un mínimo para optar a la ayuda.','10x+20y≥4200'],
 ['Simplificamos las tres restricciones.','2x+y≤700; x≤260; x+2y≥420'],
 ['La función de ingresos es proporcional al consumo energético.','Z=800x+400y=400(2x+y)'],
 ['La energía da una cota global; alcanzar el máximo exige agotarla.','Z≤280000; igualdad si y=700−2x'],
 ['Sobre esa recta comprobamos la condición de horas.','x+2y=1400−3x≥420 ⇒ x≤frac{980}{3}'],
 ['La cota de capital es más restrictiva; todos los enteros del intervalo son válidos.','0≤x≤260; y=700−2x≥180'],
 ['El segmento de óptimos une dos vértices de la región.','(0;700) y (260;180)'],
 ['Comparamos también los vértices inferiores para comprobar la representación.','Z(0;210)=84000; Z(260;80)=240000'],
 ['Hay doscientas sesenta y una posibilidades enteras, todas con el mismo ingreso.','x=0,1,…,260; Z=280000 €'],
 ];}
 if(c.index===1391){a='50 anillos del primer tipo y 50 del segundo; venta máxima semanal 3 550 €.';w=['20 anillos del primer tipo y 60 del segundo; venta máxima semanal 3 420 €.','70 anillos del primer tipo y 10 del segundo; venta máxima semanal 1 970 €.','50 anillos del primer tipo y 60 del segundo; venta máxima semanal 4 050 €.'];extra.wrongPoints=[[20,60],[70,10],[50,60]];s=[
 ['Definimos las cantidades enteras semanales.','x=anillos del primer tipo; y=anillos del segundo'],
 ['Las piedras de mayor y menor calidad tienen disponibilidades independientes.','x+3y≤200; 2x+y≤150'],
 ['El tiempo es un mínimo, no un máximo. Dividimos entre diez.','20x+50y≥1900 ⇒ 2x+5y≥190'],
 ['Añadimos el mínimo del primer tipo y formulamos la venta total.','x≥20; y≥0; Z=21x+50y'],
 ['En x=20, el mínimo de tiempo y las piedras de mayor calidad fijan los extremos.','y≥30; y≤60 ⇒ (20;30), (20;60)'],
 ['El cruce de ambas disponibilidades se obtiene eliminando x.','x+3y=200; 2x+y=150 ⇒ 5y=250 ⇒ (50;50)'],
 ['El cruce de tiempo mínimo y piedras de menor calidad completa la región.','2x+5y=190; 2x+y=150 ⇒ y=10, x=70'],
 ['Comparamos los cuatro valores de venta.','Z(20;30)=1920; Z(20;60)=3420'],
 ['La mezcla de cincuenta y cincuenta supera los otros vértices.','Z(50;50)=3550; Z(70;10)=1970'],
 ['Una combinación positiva de los recursos comprueba el óptimo.','Z=15,8(x+3y)+2,6(2x+y)≤3550'],
 ['Verificamos las restricciones no activas y la integridad.','Tiempo=3500≥1900 min; x=50≥20'],
 ];}
 if(c.index===1589){a='900 lechugas iceberg y 0 romanas; consumo mínimo 13 500 litros de agua.';w=['300 lechugas iceberg y 600 romanas; consumo mínimo 15 300 litros de agua.','1500 lechugas iceberg y 0 romanas; consumo mínimo 22 500 litros de agua.','0 lechugas iceberg y 900 romanas; consumo mínimo 16 200 litros de agua.'];extra.wrongPoints=[[300,600],[1500,0],[0,900]];s=[
 ['Definimos cantidades enteras no negativas de lechugas.','x=iceberg; y=romana'],
 ['Iceberg debe representar al menos la mitad de romana, no al revés.','x≥frac{y}{2} ⇒ y≤2x'],
 ['Completamos las cotas de demanda.','x≤1500; 900≤x+y≤2400'],
 ['El agua consumida depende de la variedad.','Minimizar W=15x+18y'],
 ['En el eje x obtenemos dos vértices del recinto.','y=0 ⇒ 900≤x≤1500'],
 ['La frontera y=2x corta las dos cotas totales.','3x=900 ⇒ (300;600); 3x=2400 ⇒ (800;1600)'],
 ['La frontera x=1500 corta la cota total superior en el último vértice.','(1500;900)'],
 ['Evaluamos los cinco vértices en orden alrededor de la región.','W(900;0)=13500; W(1500;0)=22500'],
 ['Los tres vértices restantes requieren más agua.','W(1500;900)=38700; W(800;1600)=40800; W(300;600)=15300'],
 ['Una cota independiente evita depender solo del dibujo.','W=15(x+y)+3y≥15·900=13500'],
 ['La igualdad requiere el total mínimo y ninguna romana; cumple toda la demanda.','x+y=900; y=0 ⇒ x=900≤1500'],
 ];}
 if(c.index===1604){a='23 menús premium y 4 estándar; beneficio máximo semanal 263,50 €.';w=['25 menús premium y 0 estándar; beneficio máximo semanal 262,50 €.','frac{52}{5} menús premium y frac{62}{5} estándar; beneficio máximo semanal 177,40 €.','24 menús premium y 4 estándar; beneficio máximo semanal 274,00 €.'];reasons=['Elegir solo premium y omitir un vértice ligeramente mejor.','Elegir el cruce de cocina y frigorífico e ignorar que las cantidades no son enteras.','Exceder cocina y empaquetado al incrementar premium.'];extra.wrongPoints=[[25,0],[52/5,62/5],[24,4]];s=[
 ['Definimos los menús enteros que se elaboran semanalmente.','x=premium; y=estándar; x,y≥0'],
 ['Cocina y empaquetado imponen restricciones diferentes.','2x+3y≤58; 2x+y≤50'],
 ['Añadimos el volumen frigorífico.','x+4y≤60'],
 ['El beneficio semanal suma los márgenes de cada menú.','Maximizar Z=10,5x+5,5y'],
 ['Los cortes factibles en ejes son veinticinco premium y quince estándar.','(0;0), (25;0), (0;15)'],
 ['Restamos las fronteras de cocina y empaquetado para encontrar su cruce.','2y=8 ⇒ y=4; 2x+4=50 ⇒ x=23'],
 ['El cruce cocina-frigorífico completa el recinto.','2x+3y=58; x+4y=60 ⇒ y=frac{62}{5}, x=frac{52}{5}'],
 ['El cruce empaquetado-frigorífico no es factible por cocina.','(20;10): 2·20+3·10=70>58'],
 ['Evaluamos los cinco vértices de la relajación continua.','Z=0;262,5;263,5;177,4;82,5 euros'],
 ['El mejor vértice es entero. Una cota global independiente confirma que ningún punto entero puede superarlo.','Z=0,125(2x+3y)+5,125(2x+y)≤263,5'],
 ['Comprobamos los tres recursos en el resultado.','Cocina=58 h; empaquetado=50 h; frío=39≤60 dm³'],
 ];}
 assert.ok(a&&s);const ps=c.index===1255?officialParts(text):[{id:'whole',prompt:text}];const out=[part(ps[0],a,w,reasons,s,'OFFICIAL_LINEAR_MODEL_AND_INDEPENDENT_GLOBAL_BOUND',{...proof,...extra})];out[0].visual=c.face?optimalFaceGraph(c):rationalGraph(c);
 if(c.index===1255){assert.equal(ps.length,2);out.push(part(ps[1],'Sí: 0 unidades de P₁ y 700 de P₂; ingreso 280 000 €.',['No: cualquier reparto óptimo debe fabricar ambos productos.','Sí: 350 unidades de P₁ y 0 de P₂; ingreso 280 000 €.','Sí: 260 unidades de P₁ y 0 de P₂; ingreso 208 000 €.'],['Excluir el extremo x=0 de la familia óptima.','Ignorar el capital y las horas mínimas al fabricar solo P₁.','Confundir el máximo de capital con una producción factible y óptima.'],[
 ['Para fabricar solo P₂ imponemos x=0.','y=700; Z=400·700=280000'],
 ['Comprobamos energía y capital en ese extremo.','Energía=3500; capital=0≤1300'],
 ['Las horas contratadas superan su mínimo.','20·700=14000≥4200'],
 ['Para fabricar solo P₁, las horas mínimas exigirían una cantidad incompatible con capital.','y=0 ⇒ x≥420 y x≤260'],
 ['Por tanto, sí se logra el máximo con un único producto, pero solo con P₂.','(x;y)=(0;700)'],
 ],'SINGLE_PRODUCT_ENDPOINT_FEASIBILITY_AND_GLOBAL_OPTIMUM',{endpoint:[0,700],hours:14000,energy:3500,capital:0,onlyP1IncompatibleBounds:[420,260]}));}
 return out;}
export function buildProductionFacesBatch(id='batch-0353',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const c=x.correctionEvidence.parameters;if(c.index!==1255){assert.equal(x.sourceSubparts.length,0);x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';}x.primaryTopic='Programación lineal';x.block='Sistemas/programación lineal';x.examSlot=2;x.secondaryTopics=['Región factible','Optimización'];x.qualityGates.pedagogical='OFFICIAL_PRODUCTION_MODELS_COMPLETE_OPTIMAL_SETS_AND_DUAL_CERTIFICATES';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildProductionFacesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0353-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0353.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
