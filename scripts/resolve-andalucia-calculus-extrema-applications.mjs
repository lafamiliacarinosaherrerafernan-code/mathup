import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:48,literals:['grupo de emprendedores','beneficio','manera indefinida']},{index:170,literals:['consumo de cereales','miles de toneladas','máximo consumo']},{index:205,literals:['sea continua','punto de inflexión']},{index:284,literals:['empresa de fumigación','10 hectáreas','7000']}];
export const functions={48:t=>{assert.ok(t>=0);return 3*t/(t+2)-1;},170:t=>{assert.ok(t>=0&&t<=12);return t**3-15*t*t+63*t+10;},284:x=>{assert.ok(x>=0&&x<=10);return -x*x+16*x-48;}};
export const graphSpec={schemaVersion:'mathup.calculus-graph.v1',plotVersion:'extrema-applications-v1',index:170,xRange:[0,12],yRange:[0,360],step:[1,60],axisLabels:['t (tiempo)','c(t), miles de toneladas'],pieces:[{range:[0,12],coefficients:[10,63,-15,1],leftClosed:true,rightClosed:true,label:'c(t)=t³−15t²+63t+10; 0≤t≤12',color:'#075597'}],points:[{xy:[0,10],label:'(0;10)',dx:10,dy:-14},{xy:[3,91],label:'máximo relativo (3;91)',dx:10,dy:-15},{xy:[5,75],label:'inflexión (5;75)',dx:-10,dy:28},{xy:[7,59],label:'mínimo relativo (7;59)',dx:10,dy:25},{xy:[12,334],label:'máximo global (12;334)',dx:-10,dy:-15}]};
export function renderExtremaApplicationsGraph(s){assert.deepEqual(s,graphSpec);return renderPolynomialGraph(s);}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'OFFICIAL_CLOSED_DOMAIN_EXTREMA_AND_INDEPENDENT_SUBSTITUTION',proof);if(graph)p.visual=structuredClone(graphSpec);return p;};
if(c.index===48)return[
 mk(0,'No tiene beneficios positivos durante 0≤t≤1; en t=1 alcanza beneficio cero.',[
 'No tiene beneficios positivos durante 0≤t≤2; en t=2 alcanza beneficio cero.','No tiene beneficios positivos durante 1≤t≤10; en t=1 alcanza beneficio cero.','No tiene beneficios positivos durante 0≤t≤1/2; en t=1/2 alcanza beneficio cero.'],['Igualar el numerador 3t a dos olvidando el término menos uno.','Invertir el sentido del signo después de la raíz.','Confundir 2t−2 con 2t−1 al simplificar.'],[
 ['La función del PDF mide beneficios en millones de euros durante los primeros diez años.',`B(t)=${F('3t','t+2')}−1; 0≤t≤10`],
 ['No tener beneficios positivos equivale a B(t)≤0. Conservamos el caso de equilibrio con beneficio cero.',`B(t)=${F('2t−2','t+2')}`],
 ['En el dominio t+2 es positivo, de modo que el signo depende solo del numerador.','B(t)≤0 ⇔ 2t−2≤0 ⇔ t≤1'],
 ['Intersectamos con el tiempo permitido por el modelo.','0≤t≤1; B(1)=0'],
 ['La sustitución a ambos lados confirma pérdidas antes del año uno y ganancias después.','B(0)=−1; B(1)=0; B(2)=1/2 millones de euros'],
 ],{domain:[0,10],noPositiveProfit:[0,1],zero:1,checks:[-1,0,.5]}),
 mk(1,'Máximo de los diez años en t=10: 1,5 millones de euros (1.500.000 €).',[
 'Máximo de los diez años en t=10: 2,5 millones de euros (2.500.000 €).','Máximo de los diez años en t=1: 0 millones de euros.','Máximo de los diez años en t=10: 2 millones de euros (2.000.000 €).'],['Omitir la resta final de uno en B.','Confundir el instante de equilibrio con el máximo.','Confundir el límite a infinito con el valor máximo en el intervalo cerrado.'],[
 ['Para localizar el máximo estudiamos la derivada en el dominio oficial, no en un tiempo ilimitado.',`B′(t)=${F('3(t+2)−3t','(t+2)²')}=${F(6,'(t+2)²')}`],
 ['El numerador y el denominador son positivos, por lo que el beneficio crece durante los diez años.','B′(t)>0 para 0<t<10'],
 ['Una función creciente en un intervalo cerrado alcanza su máximo en el extremo derecho.','t=10'],
 ['Evaluamos la función completa y convertimos la unidad a euros.',`B(10)=${F(30,12)}−1=${F(3,2)} millones=1.500.000 €`],
 ['La forma 2−6/(t+2) confirma el crecimiento y que el valor de diez años es menor que dos millones.',`B(t)=2−${F(6,'t+2')}; B(10)=1,5<2`],
 ],{maximum:[10,1.5],euros:1500000,wrongValues:[2.5,0,2]}),
 mk(2,'Se alcanzan 800.000 € de beneficio al transcurrir 3 años.',[
 'Se alcanzan 800.000 € de beneficio al transcurrir 4 años.','Se alcanzan 800.000 € de beneficio al transcurrir 8/11 años.','Se alcanzan 800.000 € de beneficio al transcurrir 1,5 años.'],['Olvidar el término independiente al reagrupar la ecuación.','Omitir el menos uno de la función al igualar el objetivo.','Perder un factor dos al multiplicar el denominador.'],[
 ['Convertimos la cantidad pedida a las unidades de la función.','800.000 €=0,8 millones de euros'],
 ['Igualamos el beneficio completo al objetivo y sumamos uno.',`frac{3t}{t+2}−1=0,8 ⇒ frac{3t}{t+2}=1,8`],
 ['Multiplicamos por t+2, positivo en todo el dominio.','3t=1,8(t+2)=1,8t+3,6'],
 ['Reagrupamos y despejamos, comprobando el intervalo de diez años.','1,2t=3,6 ⇒ t=3∈[0;10]'],
 ['Sustituimos en la expresión original. La monotonía ya probada garantiza que no hay otra solución.',`B(3)=${F(9,5)}−1=0,8 millones=800.000 €`],
 ],{target:.8,time:3,wrongTimes:[4,8/11,1.5]}),
 mk(3,'Si el modelo se prolonga indefinidamente, el beneficio tiende a 2 millones de euros sin alcanzarlos en tiempo finito.',[
 'Si el modelo se prolonga indefinidamente, el beneficio tiende a 3 millones de euros.','Si el modelo se prolonga indefinidamente, el beneficio tiende a 1,5 millones de euros.','Si el modelo se prolonga indefinidamente, el beneficio crece sin límite.'],['Olvidar el término menos uno después del límite del cociente.','Mantener el valor de diez años como si fuera el límite.','Interpretar crecimiento como crecimiento no acotado.'],[
 ['Este apartado autoriza explícitamente prolongar la misma ley más allá de los diez años.',`lim_{t→∞}B(t)=lim_{t→∞}(${F('3t','t+2')}−1)`],
 ['Dividimos numerador y denominador por t para calcular el límite sin indeterminación.',`frac{3t}{t+2}=frac{3}{1+2/t}→3`],
 ['Restamos el término constante de la función.','lim_{t→∞}B(t)=3−1=2 millones de euros'],
 ['La diferencia con dos es positiva para cualquier tiempo finito, por lo que se aproxima por debajo.',`2−B(t)=${F(6,'t+2')}>0`],
 ['Comprobamos la tendencia con tiempos crecientes sin confundirla con la predicción restringida de los primeros apartados.','B(10)=1,5; B(100)≈1,941176; B(1000)≈1,994012'],
 ],{extendedModelExplicitlyRequested:true,limit:2,finiteAttainment:false}),
];
if(c.index===170)return[
 mk(0,'Máximo consumo global en t=12: 334.000 toneladas.',[
 'Máximo consumo global en t=3: 91.000 toneladas.','Máximo consumo global en t=7: 59.000 toneladas.','Máximo consumo global en t=12: 334 toneladas.'],['Revisar solo el máximo relativo y omitir el extremo derecho.','Confundir mínimo relativo con máximo.','Omitir la conversión desde miles de toneladas.'],[
 ['El intervalo es cerrado: debemos evaluar puntos críticos interiores y ambos extremos.','c(t)=t³−15t²+63t+10; 0≤t≤12'],
 ['Derivamos y factorizamos para localizar candidatos interiores.','c′(t)=3t²−30t+63=3(t−3)(t−7) ⇒ t=3,7'],
 ['Añadimos los extremos t=0 y t=12 antes de comparar.','Candidatos: t=0,3,7,12'],
 ['Calculamos los cuatro valores en miles de toneladas.','c(0)=10; c(3)=91; c(7)=59; c(12)=334'],
 ['El mayor valor corresponde al extremo derecho, no al máximo relativo interior.','334>91>59>10 ⇒ t=12'],
 ['Convertimos las unidades oficiales a toneladas.','334 miles de toneladas=334.000 toneladas'],
 ],{candidates:[0,3,7,12],values:[10,91,59,334],maximum:[12,334],tonnes:334000}),
 mk(1,'El consumo decrece para 3<t<7.',[
 'El consumo decrece para 0<t<3 y 7<t<12.','El consumo decrece para 0<t<7.','El consumo decrece para 3<t<12.'],['Invertir el signo de la derivada.','Tomar solo la segunda raíz e ignorar el primer cambio de signo.','Tomar solo la primera raíz e ignorar el segundo cambio de signo.'],[
 ['Partimos de la derivada factorizada, no del signo de la función.','c′(t)=3(t−3)(t−7)'],
 ['Antes de tres, ambos factores son negativos y su producto positivo.','0<t<3 ⇒ c′(t)>0'],
 ['Entre tres y siete, los factores tienen signos distintos.','3<t<7 ⇒ c′(t)<0'],
 ['Después de siete, ambos factores son positivos.','7<t<12 ⇒ c′(t)>0'],
 ['La derivada negativa caracteriza el intervalo de decrecimiento; en los extremos vale cero.','Decreciente en (3;7); c(3)=91>c(7)=59'],
 ],{decreasing:[3,7],samplePoints:[1,5,10],derivativeSigns:[1,-1,1]}),
 mk(2,'Curva en 0≤t≤12: sube de (0;10) a (3;91), baja a (7;59) y sube hasta (12;334); inflexión (5;75).',[
 'Curva en 0≤t≤12: baja de (0;10) a (3;91), sube a (7;59) y baja hasta (12;334); inflexión (5;75).','Curva en 0≤t≤12: sube de (0;10) a (3;91), baja a (7;59) y se mantiene constante hasta (12;59); inflexión (5;75).','Curva en 0≤t≤12: sube de (0;10) a (3;91), baja a (7;59) y sube hasta (12;334); asíntota vertical t=5.'],['Invertir las variaciones de la función.','Sustituir el último tramo creciente por uno constante inexistente.','Confundir un punto de inflexión con una asíntota.'],[
 ['Situamos los extremos del dominio y los puntos estacionarios ya calculados.','(0;10), (3;91), (7;59), (12;334)'],
 ['Unimos con una curva suave respetando el signo de la derivada.','Crece en (0;3); decrece en (3;7); crece en (7;12)'],
 ['La segunda derivada permite precisar la forma de la curva.','c″(t)=6t−30; c″<0 si t<5; c″>0 si t>5'],
 ['En cinco cambia la curvatura y la función vale setenta y cinco.','Inflexión (5;75)'],
 ['El polinomio es continuo y derivable en todo el intervalo; no dibujamos saltos ni asíntotas.','Máximo relativo (3;91); mínimo relativo (7;59); máximo global (12;334)'],
 ['La gráfica adjunta se limita al dominio oficial y conserva la unidad miles de toneladas.','0≤t≤12; c(t)≥10>0'],
 ],{domain:[0,12],inflexion:[5,75],stationary:[3,7],coefficients:[10,63,-15,1]},true),
];
if(c.index===205)return[
 mk(0,'a=−24.', ['a=24.','a=−12.','a=−6.'],['Perder el signo negativo del límite polinómico.','Olvidar que el valor de la rama racional es a/2.','Invertir el factor dos al despejar.'],[
 ['Conservamos las dos ramas oficiales y el punto de unión x=−1.',`f(x)={${F('ax','x−1')} si x≤−1; x³−3x²+6x−2 si x>−1}`],
 ['La rama racional está definida en menos uno; su valor coincide con el límite por la izquierda.',`f(−1)=lim_{x→−1⁻}f(x)=${F('−a',-2)}=${F('a',2)}`],
 ['El límite por la derecha se obtiene sustituyendo en el polinomio.','lim_{x→−1⁺}f(x)=−1−3−6−2=−12'],
 ['Imponemos la igualdad de ambos límites y del valor de la función.','a/2=−12 ⇒ a=−24'],
 ['Comprobamos el valor obtenido en la rama racional y su coincidencia con el otro límite.','(−24)(−1)/(−1−1)=24/(−2)=−12'],
 ],{a:-24,join:-1,value:-12,wrong:[24,-12,-6]}),
 mk(1,'b=−3 y c=6.', ['b=3 y c=0.','b=−3 y c=3.','b=−3 y c=4.'],['Cambiar el signo al resolver g″(1)=0.','Imponer tangente horizontal en lugar de paso por (1;2).','Omitir el término constante menos dos al evaluar g(1).'],[
 ['El punto de inflexión debe pertenecer a la gráfica y presentar cambio de curvatura.','g(1)=2; g″(1)=0'],
 ['Derivamos dos veces manteniendo los parámetros.','g′(x)=3x²+2bx+c; g″(x)=6x+2b'],
 ['La segunda derivada en uno debe anularse.','6+2b=0 ⇒ b=−3'],
 ['Usamos además la ordenada oficial dos para determinar el otro coeficiente.','g(1)=1+b+c−2=2 ⇒ b+c=3 ⇒ c=6'],
 ['Comprobamos cambio de signo de la segunda derivada, no solo su anulación.','g″(x)=6(x−1)<0 si x<1 y >0 si x>1'],
 ['Verificamos el punto completo; su tangente no tiene por qué ser horizontal.','g(1)=1−3+6−2=2; g′(1)=3'],
 ],{b:-3,c:6,point:[1,2],secondDerivative:[-6,6],wrong:[[3,0],[-3,3],[-3,4]]}),
];
if(c.index===284)return[
 mk(0,'Tiene beneficios positivos cuando fumiga más de 4 y hasta 10 hectáreas: 4<x≤10.',[
 'Tiene beneficios positivos cuando fumiga entre 4 y 12 hectáreas: 4<x<12.','Tiene beneficios positivos cuando fumiga desde 4 hasta 10 hectáreas: 4≤x≤10.','Tiene beneficios positivos cuando fumiga menos de 4 hectáreas: 0≤x<4.'],['Olvidar el límite de diez hectáreas impuesto por el personal.','Incluir el punto donde el beneficio es exactamente cero.','Invertir el signo de la parábola de beneficios.'],[
 ['El número de hectáreas no es negativo y el límite de personal es diez.','B(x)=−x²+16x−48; 0≤x≤10'],
 ['Factorizamos el polinomio para encontrar los cambios de signo.','B(x)=−(x−4)(x−12); ceros 4 y 12'],
 ['Al tener coeficiente principal negativo, la parábola es positiva entre sus dos raíces.','B(x)>0 ⇔ 4<x<12'],
 ['Aplicamos la restricción real del problema; doce está fuera del dominio.','(4;12)∩[0;10]=(4;10]'],
 ['Comprobamos los extremos relevantes y distinguimos equilibrio de beneficio positivo.','B(4)=0; B(5)=7>0; B(10)=12>0'],
 ],{domain:[0,10],positiveInterval:[4,10],leftOpen:true,rightClosed:true,roots:[4,12]}),
 mk(1,'Máximo mensual al fumigar 8 hectáreas: 16.000 €.',[
 'Máximo mensual al fumigar 10 hectáreas: 12.000 €.','Máximo mensual al fumigar 8 hectáreas: 16 €.','Máximo mensual al fumigar 4 hectáreas: 0 €.'],['Suponer que el beneficio siempre crece hasta la capacidad máxima.','Olvidar que B se expresa en miles de euros.','Confundir umbral de rentabilidad con máximo.'],[
 ['Derivamos la función de beneficios y localizamos el único candidato interior.','B′(x)=−2x+16=0 ⇒ x=8'],
 ['La segunda derivada es negativa: el punto estacionario es un máximo.','B″(x)=−2<0'],
 ['Ocho pertenece al dominio, pero comprobamos también los extremos del intervalo cerrado.','B(0)=−48; B(8)=16; B(10)=12'],
 ['El mayor valor es dieciséis miles de euros, alcanzado en ocho hectáreas.','Máximo=16·1000=16.000 €'],
 ['Completando el cuadrado obtenemos una comprobación independiente del máximo global.','B(x)=16−(x−8)²≤16; igualdad solo si x=8'],
 ],{candidates:[0,8,10],values:[-48,16,12],maximum:[8,16],euros:16000}),
 mk(2,'Ha fumigado 5 hectáreas; la otra raíz, 11, supera la capacidad mensual.',[
 'Ha fumigado 11 hectáreas; la otra raíz, 5, no se admite.','Ha fumigado 5 u 11 hectáreas; ambas cantidades se admiten.','Ha fumigado 7 hectáreas; coincide el número con los miles de euros.'],['Elegir la raíz que viola el límite del personal.','No filtrar las raíces con el dominio del problema.','Confundir la entrada de la función con su valor.'],[
 ['Expresamos el beneficio observado en las unidades de B.','7000 €=7 miles de euros'],
 ['Igualamos la función al valor observado y llevamos todo a un miembro.','−x²+16x−48=7 ⇒ x²−16x+55=0'],
 ['Factorizamos para obtener todas las soluciones algebraicas.','(x−5)(x−11)=0 ⇒ x=5 o x=11'],
 ['Filtramos con la restricción oficial 0≤x≤10.','5∈[0;10]; 11∉[0;10] ⇒ x=5'],
 ['La sustitución directa confirma el beneficio; no omitimos la razón para rechazar la otra raíz.','B(5)=−25+80−48=7 miles de euros; capacidad máxima 10 hectáreas'],
 ],{target:7,algebraicRoots:[5,11],validRoots:[5],rejectedRoot:11}),
];throw Error('Unverified extrema application');}
export function buildExtremaApplicationsBatch(id='batch-0336',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=x.correctionEvidence.parameters.index===205?['Continuidad','Curvatura']:['Monotonía','Optimización',...(x.correctionEvidence.parameters.index===170?['Curvatura','Gráficas']:[])];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_DOMAIN_EXTREMA_AND_PARAMETER_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExtremaApplicationsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0336-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0336.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
