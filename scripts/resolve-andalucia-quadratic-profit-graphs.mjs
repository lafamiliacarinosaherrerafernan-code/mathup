import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
export const cases=[{index:1021,literals:['pequeña finca familiar','5000€','miles de'],coefficients:[-15,1.3,-.02],domain:[0,Infinity]},{index:1055,literals:['13500 €','100 unidades','350'],coefficients:[-18000,360,-1],domain:[50,350]}];
export const value=(c,x)=>c.coefficients.reduce((s,a,k)=>s+a*x**k,0);
export const graphs={
 1021:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'quadratic-profit-v1',index:1021,xRange:[0,65],yRange:[-20,10],step:[10,5],axisLabels:['x, miles de kg','B, miles de euros'],pieces:[{range:[0,65],coefficients:[-15,1.3,-.02],leftClosed:true,rightClosed:false,label:'B(x)=−0,02x²+1,3x−15; dominio x≥0 (continúa a la derecha)',color:'#075597'}],points:[{xy:[0,-15],label:'(0;−15)',dx:12,dy:-12},{xy:[15,0],label:'(15;0)',dx:-8,dy:23},{xy:[50,0],label:'(50;0)',dx:10,dy:23},{xy:[32.5,6.125],label:'V(32,5;6,125)',dx:12,dy:-13}]},
 1055:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'quadratic-profit-v1',index:1055,xRange:[40,360],yRange:[-16000,18000],step:[50,5000],axisLabels:['x, unidades','B(x), euros'],pieces:[{range:[50,350],coefficients:[-18000,360,-1],leftClosed:true,rightClosed:true,label:'B(x)=−x²+360x−18000; 50≤x≤350',color:'#075597'}],points:[{xy:[50,-2500],label:'(50;−2500)',dx:12,dy:24},{xy:[60,0],label:'(60;0)',dx:12,dy:-12},{xy:[180,14400],label:'V(180;14400)',dx:12,dy:-14},{xy:[300,0],label:'(300;0)',dx:-12,dy:24},{xy:[350,-14500],label:'(350;−14500)',dx:-12,dy:-12}]},
};
export function renderQuadraticProfitGraph(s){assert.deepEqual(s,graphs[s.index]);return renderPolynomialGraph(s);}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'INDEPENDENT_FACTORIZATION_SQUARE_COMPLETION_AND_SUBSTITUTION',proof);if(graph)p.visual=structuredClone(graphs[c.index]);return p;};
 if(c.index===1021){assert.equal(ps.length,4);return[
 mk(0,'Parábola cóncava; cortes (15;0) y (50;0); vértice (32,5;6,125).',[
 'Parábola cóncava; cortes (−15;0) y (−50;0); vértice (−32,5;6,125).','Parábola convexa; cortes (15;0) y (50;0); vértice (32,5;−6,125).','Parábola cóncava; cortes (25;0) y (40;0); vértice (32,5;6,125).'
 ],['Cambiar el signo de las raíces al factorizar.','Cambiar el signo del coeficiente cuadrático.','Usar las soluciones de B(x)=5 como si fueran ceros de B.'],[
 ['Las dos variables están expresadas en miles. La gráfica se restringe a cantidades no negativas.','B(x)=−0,02x²+1,3x−15; x≥0'],
 ['Para cortar OX, el beneficio debe ser cero. Multiplicamos por menos cincuenta.','B(x)=0 ⇔ x²−65x+750=0'],
 ['Factorizamos y obtenemos los dos cortes.','(x−15)(x−50)=0 ⇒ (15;0), (50;0)'],
 ['Derivamos para hallar el vértice; la segunda derivada determina la concavidad.','B′(x)=−0,04x+1,3=0 ⇒ x=32,5; B″=−0,04<0'],
 ['Evaluamos la ordenada del vértice y el corte con OY.','B(32,5)=6,125; B(0)=−15'],
 ['La forma de cuadrado completo confirma el vértice y la apertura.','B(x)=6,125−0,02(x−32,5)²'],
 ['Dibujamos la curva pasando por los puntos señalados: crece hasta el vértice y luego desciende. La ventana gráfica no limita el dominio.','Dominio [0;+∞); creciente hasta 32,5; decreciente después'],
 ],{roots:[15,50],vertex:[32.5,6.125],yIntercept:-15,wrongRoots:[[-15,-50],[25,40]],concavity:-.04},true),
 mk(1,'La finca no tiene pérdidas para 15≤x≤50 (de 15 000 a 50 000 kg).',[
 'La finca no tiene pérdidas para 0≤x≤15 o x≥50.','La finca no tiene pérdidas para 15<x<50, excluidos ambos extremos.','La finca no tiene pérdidas para 25≤x≤40 (de 25 000 a 40 000 kg).'
 ],['Invertir el signo de la parábola.','Confundir no tener pérdidas con tener beneficio estrictamente positivo.','Imponer cinco mil euros de beneficio en lugar de beneficio no negativo.'],[
 ['No tener pérdidas admite beneficio cero, de modo que debemos resolver una desigualdad no estricta.','B(x)≥0'],
 ['Usamos la factorización exacta con su coeficiente negativo.','B(x)=−0,02(x−15)(x−50)'],
 ['Entre quince y cincuenta el producto de los factores es negativo y B es positivo.','15<x<50 ⇒ B(x)>0'],
 ['Fuera de ese intervalo ambos factores tienen el mismo signo y B es negativo.','0≤x<15 o x>50 ⇒ B(x)<0'],
 ['Incluimos los puntos de equilibrio y convertimos la cantidad a kilogramos.','x∈[15;50] ⇒ 15 000≤kg≤50 000'],
 ['Sustituimos una cantidad interior, ambas fronteras y una exterior.','B(15)=B(50)=0; B(30)=6; B(10)=−4'],
 ],{nonnegative:[15,50],inclusive:true}),
 mk(2,'Beneficio máximo de 6 125 € al vender 32 500 kg.',[
 'Beneficio máximo de 6,125 € al vender 32,5 kg.','Beneficio máximo de 0 € al vender 50 000 kg.','Beneficio máximo de 6 000 € al vender 30 000 kg.'
 ],['Olvidar ambas conversiones desde miles.','Confundir el umbral superior sin pérdidas con el máximo.','Redondear prematuramente la cantidad óptima.'],[
 ['Buscamos el máximo global en el dominio x≥0, sin imponer una cota superior no indicada.','B′(x)=−0,04x+1,3'],
 ['Anulamos la derivada y despejamos.','0,04x=1,3 ⇒ x=32,5'],
 ['La derivada cambia de positiva a negativa. La función es cóncava en todo el dominio.','B″(x)=−0,04<0'],
 ['Evaluamos el beneficio sin redondear la cantidad.','B(32,5)=−0,02·1056,25+42,25−15=6,125'],
 ['Completando el cuadrado obtenemos una cota global independiente.','B(x)=6,125−0,02(x−32,5)²≤6,125'],
 ['Convertimos ambas magnitudes a sus unidades ordinarias.','32,5·1000=32 500 kg; 6,125·1000=6 125 €'],
 ],{optimum:32.5,maximum:6.125,kilograms:32500,euros:6125,wrongQuantities:[50,30]}),
 mk(3,'Debe vender 25 000 kg o 40 000 kg.',[
 'Debe vender 15 000 kg o 50 000 kg.','Debe vender únicamente 25 000 kg.','Debe vender 25 kg o 40 kg.'
 ],['Resolver beneficio cero en lugar de cinco mil euros.','Omitir una de las dos raíces admisibles.','No convertir de miles de kilogramos.'],[
 ['El objetivo de beneficio debe expresarse en miles de euros antes de sustituirlo.','5000 €=5 miles de euros'],
 ['Igualamos la función a cinco y agrupamos los términos.','−0,02x²+1,3x−15=5 ⇒ −0,02x²+1,3x−20=0'],
 ['Multiplicamos por menos cincuenta para evitar decimales.','x²−65x+1000=0'],
 ['Factorizamos y conservamos las dos soluciones.','(x−25)(x−40)=0 ⇒ x=25 o x=40'],
 ['Ambas cantidades pertenecen al dominio; la sustitución confirma el mismo beneficio.','B(25)=−12,5+32,5−15=5; B(40)=−32+52−15=5'],
 ['Convertimos de miles de kilogramos sin elegir arbitrariamente una sola cantidad.','25 000 kg o 40 000 kg'],
 ],{target:5,roots:[25,40],kilograms:[25000,40000]})];}
 if(c.index===1055){assert.equal(ps.length,3);return[
 mk(0,'B(100)=8 000 €; se obtienen 13 500 € vendiendo 150 o 210 unidades.',[
 'B(100)=8 000 €; se obtienen 13 500 € vendiendo únicamente 150 unidades.','B(100)=26 000 €; se obtienen 13 500 € vendiendo 150 o 210 unidades.','B(100)=8 000 €; se obtienen 13 500 € vendiendo 60 o 300 unidades.'
 ],['Omitir la segunda raíz, que también pertenece al dominio.','Olvidar el coste fijo de dieciocho mil euros.','Usar los puntos de equilibrio en vez del beneficio pedido.'],[
 ['Cien unidades pertenece al intervalo oficial. Sustituimos conservando el coste fijo.','100∈[50;350]; B(100)=−10000+36000−18000=8000 €'],
 ['Para la segunda pregunta igualamos el beneficio a la cantidad indicada.','−x²+360x−18000=13500'],
 ['Llevamos todos los términos a un miembro con coeficiente principal positivo.','x²−360x+31500=0'],
 ['La factorización proporciona ambas raíces.','(x−150)(x−210)=0 ⇒ x=150 o x=210'],
 ['Ambas cantidades son enteras y están en el dominio, por lo que ninguna puede descartarse.','50≤150≤350; 50≤210≤350'],
 ['Verificamos cada resultado directamente.','B(150)=−22500+54000−18000=13500; B(210)=−44100+75600−18000=13500'],
 ],{at100:8000,target:13500,roots:[150,210]}),
 mk(1,'Máximo de 14 400 € al vender 180 unidades.',[
 'Máximo de 14 400 € al vender 360 unidades.','Máximo de 32 400 € al vender 180 unidades.','Máximo de 13 500 € al vender 150 unidades.'
 ],['Omitir el dos en la derivada del cuadrado y además salir del dominio.','Olvidar el término constante del beneficio.','Confundir el beneficio objetivo anterior con el máximo.'],[
 ['Derivamos la función en el intervalo de producción permitido.','B′(x)=−2x+360; 50≤x≤350'],
 ['El punto estacionario está dentro del intervalo.','−2x+360=0 ⇒ x=180'],
 ['El signo de la derivada prueba crecimiento antes de ciento ochenta y descenso después.','B′>0 si x<180; B′<0 si x>180'],
 ['Calculamos el beneficio en el punto y en ambos extremos.','B(180)=14400; B(50)=−2500; B(350)=−14500'],
 ['Una identidad independiente demuestra el máximo global, incluso antes de restringir el dominio.','B(x)=14400−(x−180)²≤14400'],
 ['El máximo se alcanza en una cantidad entera admisible y se expresa en euros.','180 unidades; beneficio 14 400 €'],
 ],{vertex:[180,14400],endpoints:[[50,-2500],[350,-14500]]}),
 mk(2,'Parábola cóncava con vértice (180;14400); sin pérdidas de 60 a 300 unidades, inclusive.',[
 'Parábola cóncava con vértice (180;14400); sin pérdidas de 50 a 60 o de 300 a 350 unidades.','Parábola cóncava con vértice (180;14400); sin pérdidas de 150 a 210 unidades, inclusive.','Parábola cóncava con vértice (180;14400); sin pérdidas de 61 a 299 unidades, inclusive.'
 ],['Invertir el signo del beneficio entre las raíces.','Exigir al menos trece mil quinientos euros en vez de no perder.','Excluir los dos puntos de equilibrio.'],[
 ['Para dibujar la curva utilizamos el vértice y limitamos la gráfica al intervalo oficial.','V=(180;14400); 50≤x≤350; B″=−2<0'],
 ['Los cortes con OX se encuentran resolviendo beneficio cero.','x²−360x+18000=0'],
 ['Factorizamos para obtener las raíces exactas.','(x−60)(x−300)=0 ⇒ x=60 o x=300'],
 ['El signo negativo del coeficiente principal hace el beneficio no negativo entre ambas raíces.','B(x)=−(x−60)(x−300)≥0 ⇔ 60≤x≤300'],
 ['Intersectamos con el dominio e incluimos los puntos de equilibrio; para unidades enteras son todos los enteros de ese intervalo.','[60;300]⊂[50;350]; B(60)=B(300)=0'],
 ['El dibujo muestra la parábola con sus extremos cerrados. Comprobamos un valor interior y otro exterior.','B(100)=8000>0; B(50)=−2500<0; B(350)=−14500'],
 ],{roots:[60,300],nonnegative:[60,300],inclusive:true,integerUnits:true},true)];}
 throw Error('Unsupported official quadratic problem');}
export function buildQuadraticProfitBatch(id='batch-0346',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Optimización','Gráficas','Ecuaciones de segundo grado'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='ALL_OFFICIAL_SUBPARTS_EXACT_ROOTS_DOMAIN_UNITS_AND_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildQuadraticProfitBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0346-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0346.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
