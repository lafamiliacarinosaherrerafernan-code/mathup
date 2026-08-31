import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
export const cases=[
 {index:50,literals:['70 g de algodón y 20 g','4 200 g de algodón y 800','al menos 10 estampadas','5 euros'],constraints:[[7,6,420],[2,1,80],[0,-1,-10],[1,-2,0],[-1,0,0]],objective:[5,4,0],labels:['7x+6y≤420','2x+y≤80','y≥10','x≤2y','x≥0'],domain:{x:[0,40],y:[0,80]},optimum:[12,56],maximum:284,wrong:[[0,70],[32,16],[20,10]],dual:[.6,.4]},
 {index:111,literals:['600 kg de manzanas y 400 kg','3 kg de manzanas y 1 kg','2 kg de cada','4 € y de 3 €'],constraints:[[3,2,600],[1,2,400],[-1,0,0],[0,-1,0]],objective:[4,3,0],labels:['3x+2y≤600','x+2y≤400','x≥0','y≥0'],domain:{x:[0,220],y:[0,220]},optimum:[100,150],maximum:850,wrong:[[200,0],[0,200],[150,100]],dual:[1.25,.25]},
 {index:153,literals:['cubierta de plástico de un invernadero','tercera parte del plástico adquirido','Represente gráficamente']},
 {index:216,literals:['400 cuadernos','300 estuches','más de 100 lotes','35€','45€'],constraints:[[2,3,400],[2,1,300],[0,1,100],[-1,0,0],[0,-1,0]],objective:[35,45,0],labels:['2x+3y≤400','2x+y≤300','y≤100','x≥0','y≥0'],domain:{x:[0,170],y:[0,120]},optimum:[125,50],maximum:6625,wrong:[[150,0],[50,100],[0,100]],dual:[13.75,3.75]},
];
export const greenhouseGraph={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'greenhouse-area-v1',index:153,xRange:[-3,4],yRange:[-2,11],step:[1,2],pieces:[{range:[-3,4],coefficients:[1,-2,1],label:'f(x)=(x−1)²',color:'#075597'},{range:[-3,4],coefficients:[5,-2],label:'g(x)=5−2x',color:'#c45114'}],points:[{xy:[-2,9],label:'(−2;9)',dx:12,dy:-14},{xy:[2,1],label:'(2;1)',dx:12,dy:24},{xy:[1,0],label:'V(1;0)',dx:-12,dy:24}],between:{range:[-2,2],lower:[1,-2,1],upper:[5,-2]}};
export function renderGreenhouseGraph(s){assert.deepEqual(s,greenhouseGraph);return renderPolynomialGraph(s);}
const F=(a,b)=>`frac{${a}}{${b}}`,formula=c=>`${c.objective[0]}x+${c.objective[1]}y`,sum=(c,p)=>c.objective[0]*p[0]+c.objective[1]*p[1];
function productionSteps(c){
 if(c.index===50)return[
 ['Definimos x como número de camisetas lisas e y como número de estampadas. Contamos unidades completas.','x,y enteros; x≥0; y≥0'],
 ['La suma de algodón consumido no puede superar el disponible; dividimos entre diez para simplificar.','70x+60y≤4200 ⇔ 7x+6y≤420'],
 ['El poliéster impone otra restricción independiente.','20x+10y≤800 ⇔ 2x+y≤80'],
 ['Traducimos las dos condiciones comerciales sin invertir su sentido.','y≥10; 2y≥x'],
 ['Cada camiseta aporta el beneficio indicado; representamos las rectas frontera y sombreamos su intersección.','Maximizar Z=5x+4y; y≤70−7x/6; y≤80−2x; y≥10; y≥x/2; x≥0'],
 ['Sobre y=10 se obtiene 0≤x≤20. La frontera x=2y encuentra al poliéster en (32;16).','A=(0;10), B=(20;10); 2(2y)+y=80 ⇒ C=(32;16)'],
 ['Intersecamos las dos restricciones de materiales.','y=80−2x; 7x+6(80−2x)=420 ⇒ −5x=−60 ⇒ D=(12;56)'],
 ['En x=0 el algodón impone y≤70, más estricto que el poliéster. Comprobamos todos los vértices.','E=(0;70); A,B,C,D,E cumplen las cinco restricciones'],
 ['Evaluamos el beneficio en todos los vértices del polígono.','Z(A)=40; Z(B)=140; Z(C)=224; Z(D)=284; Z(E)=280'],
 ['Una combinación de holguras no negativas demuestra que ningún punto factible supera 284.','284−Z=0,6(420−7x−6y)+0,4(80−2x−y)≥0'],
 ['La igualdad exige agotar ambos materiales. El óptimo continuo tiene coordenadas enteras, luego también resuelve el problema de camisetas enteras.','x=12; y=56; 70·12+60·56=4200 g; 20·12+10·56=800 g'],
 ['Comprobamos las condiciones comerciales y expresamos la respuesta con unidades.','56≥10; 12≤112; 12 lisas y 56 estampadas; beneficio máximo 284 €'],
 ];
 if(c.index===111)return[
 ['Definimos x como número de bolsas A e y como número de bolsas B; no se pueden preparar fracciones de bolsa.','x,y enteros no negativos'],
 ['Las existencias limitan separadamente los kilogramos de cada fruta.','Manzanas: 3x+2y≤600; naranjas: x+2y≤400'],
 ['Sumamos los ingresos de ambos tipos. No introducimos costes que no aparecen en el enunciado.','Maximizar I=4x+3y'],
 ['Dibujamos las dos rectas frontera y tomamos los semiplanos inferiores del primer cuadrante.','y≤300−1,5x; y≤200−0,5x; x,y≥0'],
 ['En los ejes, la manzana limita x y la naranja limita y.','O=(0;0), A=(200;0), C=(0;200)'],
 ['Intersecamos las dos fronteras; al restar eliminamos y.','3x+2y=600; x+2y=400 ⇒ 2x=200 ⇒ B=(100;150)'],
 ['La gráfica muestra el polígono O–A–B–C. Evaluamos todos los vértices.','I(O)=0; I(A)=800; I(B)=400+450=850; I(C)=600'],
 ['Certificamos el máximo en toda la región por una combinación de restricciones.','850 − I = 1,25(600−3x−2y) + 0,25(400−x−2y) ≥ 0'],
 ['La igualdad exige las dos fronteras y produce un único punto con coordenadas enteras.','x=100; y=150'],
 ['Verificamos existencias y ventas en la propuesta final.','3·100+2·150=600 kg; 100+2·150=400 kg; ingreso=850 €'],
 ];
 assert.equal(c.index,216);return[
 ['Definimos x como número de lotes A e y como número de lotes B. Trabajamos con unidades completas.','x,y enteros no negativos'],
 ['Los cuadernos y estuches disponibles dan dos restricciones distintas.','Cuadernos: 2x+3y≤400; estuches: 2x+y≤300'],
 ['Añadimos el máximo de lotes B y escribimos la función objetivo de ventas.','y≤100; maximizar V=35x+45y'],
 ['Representamos las tres rectas frontera y los semiplanos compatibles en el primer cuadrante.','y≤(400−2x)/3; y≤300−2x; y≤100; x,y≥0'],
 ['Sobre los ejes la región va del origen a (150;0) y a (0;100).','O=(0;0); A=(150;0); D=(0;100)'],
 ['El cruce de los recursos se obtiene restando las ecuaciones.','2x+3y=400; 2x+y=300 ⇒ 2y=100 ⇒ B=(125;50)'],
 ['La cota y=100 corta la frontera de cuadernos en C. El cruce con estuches queda fuera por falta de cuadernos.','C=(50;100); (100;100): 2·100+3·100=500>400'],
 ['Evaluamos la función en los cinco vértices de la región sombreada.','V(O)=0; V(A)=5250; V(B)=6625; V(C)=6250; V(D)=4500'],
 ['La siguiente identidad prueba una cota superior global, no solo la comparación de vértices.','6625 − V = 13,75(400−2x−3y) + 3,75(300−2x−y) ≥ 0'],
 ['La igualdad exige agotar los dos recursos. El punto resultante es entero y respeta la cota comercial.','x=125; y=50≤100'],
 ['Sustituimos para verificar el uso exacto de recursos y el importe máximo.','2·125+3·50=400; 2·125+50=300; 35·125+45·50=6625 €'],
 ];
}
export function solve(c,text){
 if(c.index!==153){assert.doesNotMatch(text,/(?:^|\n)\s*[abc]\)/);const clean=text.replace(/^OPCIÓN A\s*/,'').replace(/\([\d.,]+ puntos?\)\s*/g,'').replace(/\s+BLOQUE B\s*$/,'').trim();const names=c.index===50?['lisas','estampadas']:['lotes A','lotes B'];if(c.index===111)names.splice(0,2,'bolsas A','bolsas B');const answer=p=>`${p[0]} ${names[0]} y ${p[1]} ${names[1]}; ${c.index===50?'beneficio':'ingreso'} máximo ${sum(c,p)} €.`;
 const proof={...derive(c),constraints:c.constraints,objective:c.objective,optimum:c.optimum,maximum:c.maximum,dual:c.dual,wrongPoints:c.wrong,integer:true};assert.equal(proof.max,c.maximum);
 const r=part({id:'whole',prompt:text},answer(c.optimum),c.wrong.map(answer),['Elegir otro vértice factible sin comparar el objetivo completo.','Favorecer un solo producto sin calcular todos los ingresos o beneficios.','Usar una combinación que no alcanza el óptimo o incumple un recurso.'],productionSteps(c),'RESOURCE_CONSTRAINTS_VERTEX_ENUMERATION_INTEGER_EXHAUSTION_AND_DUAL_BOUND',proof);r.visual=rationalGraph(c);return[r];}
 const p=officialParts(text);assert.equal(p.length,2);const r=part(p[0],'Región entre x=−2 y x=2: recta por encima de parábola; intersecciones (−2;9) y (2;1).',[
 'Región entre x=−2 y x=2: parábola por encima de recta; intersecciones (−2;9) y (2;1).','Región entre x=0 y x=2: recta por encima de parábola; se omite la parte con x negativo.','Región entre x=−4 y x=4: recta por encima de parábola; intersecciones (−4;13) y (4;−3).'],['Invertir la curva superior e inferior.','Imponer x≥0 aunque la coordenada negativa no es una longitud prohibida.','Resolver x²=4 como x=±4 en lugar de x=±2.'],[
 ['Identificamos la parábola y la recta del enunciado; x es una coordenada expresada en metros.','f(x)=(x−1)²; g(x)=5−2x'],
 ['Igualamos ambas expresiones y desarrollamos el cuadrado.','x²−2x+1=5−2x ⇒ x²=4'],
 ['Calculamos las dos raíces y sus ordenadas en cualquiera de las curvas.','x=−2 ⇒ y=9; x=2 ⇒ y=1'],
 ['El vértice de la parábola y los cortes de la recta ayudan a construir una representación proporcionada.','V=(1;0); g(0)=5; g(2,5)=0'],
 ['La diferencia de alturas demuestra cuál está arriba en todo el intervalo.','g(x)−f(x)=4−x²>0 si −2<x<2'],
 ['La gráfica adjunta sombrea solo la región encerrada; las abscisas negativas forman parte de ella.','−2≤x≤2; (x−1)²≤y≤5−2x'],
 ],'EXACT_CROSSINGS_AND_POSITIVE_REGION',{roots:[-2,2],points:[[-2,9],[2,1]],lower:[1,-2,1],upper:[5,-2],difference:[4,0,-1]});r.visual=structuredClone(greenhouseGraph);
 const b=part(p[1],'Debe comprar 16 m² de plástico; coste total 240 €.',[
 `Debe comprar ${F(32,3)} m² de plástico; coste total 160 €.`,`Debe comprar ${F(128,9)} m² de plástico; coste total ${F(640,3)} €.`,`Debe comprar 32 m² de plástico; coste total 480 €.`],['Ignorar el desperdicio y comprar solo el área quemada.','Añadir un tercio del área a reparar, aunque el desperdicio se refiere a lo comprado.','Confundir la fracción utilizada 2/3 con la fracción desperdiciada 1/3.'],[
 ['Integramos altura superior menos inferior entre las dos intersecciones.','A=∫_{−2}^{2}(4−x²) dx'],
 ['Obtenemos una primitiva inmediata y aplicamos Barrow.',`H(x)=4x−${F('x³',3)}; H(2)=${F(16,3)}; H(−2)=−${F(16,3)}`],
 ['El área quemada es positiva. La simetría de la diferencia de alturas ofrece una segunda comprobación.',`A=${F(32,3)} m²; 2·∫_{0}^{2}(4−x²) dx=${F(32,3)} m²`],
 ['Sea S el área comprada. Se desperdicia un tercio de S y se aprovechan dos tercios, no un tercio del área dañada.',`S−${F('S',3)}=${F('2S',3)}=A`],
 ['Despejamos la superficie que hay que comprar antes de multiplicar por el precio.',`S=${F(3,2)}·${F(32,3)}=16 m²`],
 ['El precio oficial es 15 euros por metro cuadrado; conservamos las unidades.',`Coste=16 m²·15 €/m²=240 €`],
 ['Verificamos que la superficie aprovechada es exactamente el área que había que cubrir.',`16−${F(16,3)}=${F(32,3)} m²`],
 ],'EXACT_POLYNOMIAL_AREA_AND_MATERIAL_BALANCE',{area:32/3,purchased:16,price:15,cost:240,usedFraction:2/3,wrongPurchased:[32/3,128/9,32],wrongCosts:[160,640/3,480]});b.visual=structuredClone(greenhouseGraph);return[r,b];
}
export function buildAreaResourceBatch(id='batch-0338',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const area=x.correctionEvidence.parameters.index===153;x.primaryTopic=area?'Derivadas':'Programación lineal';x.secondaryTopics=area?['Gráficas','Integrales definidas y áreas','Aplicaciones']:['Región factible','Optimización'];x.block=area?'Análisis':'Sistemas y programación lineal';x.examSlot=area?3:2;if(!area)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='COMPLETE_OFFICIAL_RESOURCE_MODEL_AREA_AND_GRAPH';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildAreaResourceBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0338-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0338.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
