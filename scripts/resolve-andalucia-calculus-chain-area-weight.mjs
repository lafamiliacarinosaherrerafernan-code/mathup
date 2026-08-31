import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:84,literals:['Calcule las derivadas','región acotada','parábola']},{index:303,literals:['régimen alimenticio','peso mínimo','masa corporal']},{index:326,literals:['sea continua','máximo','eje de abscisas']}];
export const functions={f84:x=>(x*x-7)**3*Math.exp(5-x),g84:x=>Math.log(x**4-2*x*x)/(8-x**3),p303:t=>{assert.ok(t>=0);return 75-15*t/(t+120);},g326:x=>-2*x*x+2*x+4};
export const graphSpecs={
84:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'chain-area-weight-v1',index:84,xRange:[0,4],yRange:[-2,7],step:[1,1],pieces:[{range:[0,4],coefficients:[6,-2],label:'y=−2x+6',color:'#c45114'},{range:[0,4],coefficients:[3,2,-1],label:'y=−x²+2x+3',color:'#075597'}],points:[{xy:[1,4],label:'(1;4)',dx:10,dy:-17},{xy:[3,0],label:'(3;0)',dx:12,dy:24}],between:{range:[1,3],lower:[6,-2],upper:[3,2,-1]}},
326:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'chain-area-weight-v1',index:326,xRange:[-2,3],yRange:[-3,6],step:[1,1],pieces:[{range:[-2,3],coefficients:[4,2,-2],label:'g(x)=−2x²+2x+4',color:'#075597'}],points:[{xy:[-1,0],label:'(−1;0)',dx:-12,dy:24},{xy:[2,0],label:'(2;0)',dx:12,dy:24},{xy:[.5,4.5],label:'V(1/2;9/2)',dx:12,dy:-16},{xy:[0,4],label:'(0;4)',dx:-12,dy:22}],area:[-1,2]},
};
export function renderChainAreaWeightGraph(s){assert.deepEqual(s,graphSpecs[s.index]);return renderPolynomialGraph(s);}
const derivative84=(fSign=1,gSign=1,chain=true)=>`f′(x)=e^(5−x)·(x²−7)²·(${chain?'6x':'3'}${fSign===1?'−':'+'}x²${fSign===1?'+':'−'}7); g′(x)=${chain?`${F(4,'x')}·${F('x²−1','(x²−2)(8−x³)')}`:F('4x','(x²−2)(8−x³)')} ${gSign===1?'+':'−'} ${F('3x²·ln(x⁴−2x²)','(8−x³)²')}`;
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'OFFICIAL_CHAIN_QUOTIENT_DERIVATIVES_POLYNOMIAL_AREA_AND_INDEPENDENT_SUBSTITUTION',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
if(c.index===84)return[
mk(0,derivative84(),[derivative84(-1),derivative84(1,-1),derivative84(1,1,false)],['Olvidar el signo negativo al derivar el exponente 5−x.','Cambiar el signo del segundo término de la regla del cociente.','Omitir factores de la regla de la cadena en ambas funciones.'],[
 ['Para f usamos producto y cadena. Definimos la expresión interior sin cambiar el enunciado.','u=x²−7; f=u³·e^(5−x); u′=2x'],
 ['La derivada del cubo incluye la derivada interior, y la de la exponencial incluye el signo menos.','(u³)′=3u²·2x; (e^(5−x))′=−e^(5−x)'],
 ['Aplicamos la regla del producto, conservando los dos sumandos.','f′=6x·u²·e^(5−x) − u³·e^(5−x)'],
 ['Extraemos factores comunes para obtener una expresión compacta.','f′=e^(5−x)·(x²−7)²·(6x−x²+7)'],
 ['Para g identificamos numerador y denominador. El argumento del logaritmo debe ser positivo.','v=x⁴−2x²; w=8−x³; g=ln(v)/w'],
 ['Aplicamos cadena al logaritmo y derivamos el denominador.',`v′=4x³−4x; (ln(v))′=${F('4x³−4x','v')}; w′=−3x²`],
 ['Aplicamos cociente: restar el producto por una derivada negativa genera un signo más.',`g′=${F('(v′/v)·w + 3x²·ln(v)','w²')}`],
 ['Separamos en dos fracciones equivalentes para facilitar lectura y comprobación.',`g′=${F('4x³−4x','(x⁴−2x²)(8−x³)')} + ${F('3x²·ln(x⁴−2x²)','(8−x³)²')}`],
 ['Factorizamos numerador y denominador del primer término y cancelamos un factor x; el dominio del logaritmo ya excluye x=0.',`${F('4x(x²−1)','x²(x²−2)(8−x³)')}=${F('4(x²−1)','x(x²−2)(8−x³)')}`],
 ['La derivada de f es válida en todo real; la de g solo donde el logaritmo y el cociente estén definidos.','D(f)=ℝ; D(g)=(−∞;−√2)∪(√2;2)∪(2;+∞)'],
 ['Comprobamos las derivadas mediante cocientes incrementales en puntos interiores del dominio, y g también derivando ln(v)·w^(−1).','Puntos de comprobación de g: −3, −2, 1,5, 3; f: −1, 0, 1, 3'],
],{fPolynomialFactor:[7,6,-1],gInnerCoefficients:[0,0,-2,0,1],gDenominator:[8,0,0,-1],wrongRules:['exponential-sign','quotient-sign','missing-chain'],domainExcluded:[-Math.SQRT2,Math.SQRT2,2]}),
mk(1,`Intersecciones (1;4) y (3;0); parábola por encima de la recta entre ellas; área=${F(4,3)} u².`,[
 `Intersecciones (1;4) y (3;0); parábola por encima de la recta entre ellas; área=−${F(4,3)} u².`,
 `Intersecciones (1;4) y (3;0); parábola por encima de la recta entre ellas; área=${F(16,3)} u².`,
 `Intersecciones (1;4) y (3;0); parábola por encima de la recta entre ellas; área=${F(8,3)} u².`],['Invertir función superior e inferior y dar un área negativa.','Integrar solo la parábola y no descontar la recta.','Duplicar la región completa como si se hubiera integrado solo la mitad simétrica.'],[
 ['Igualamos las funciones para localizar los extremos de la región cerrada.','−x²+2x+3=−2x+6 ⇒ x²−4x+3=0'],
 ['Factorizamos y sustituimos en la recta para obtener las ordenadas.','(x−1)(x−3)=0 ⇒ (1;4), (3;0)'],
 ['Determinamos qué curva queda arriba; la diferencia es positiva entre las dos raíces.','parábola−recta=−x²+4x−3=(x−1)(3−x)>0 si 1<x<3'],
 ['La gráfica adjunta sombrea únicamente la región encerrada por las dos curvas.',`A=∫_{1}^{3}(−x²+4x−3) dx`],
 ['Integramos cada monomio mediante primitivas inmediatas.',`H(x)=−${F('x³',3)}+2x²−3x`],
 ['Aplicamos la regla de Barrow sin perder el signo del valor inferior.',`H(3)=0; H(1)=−${F(4,3)}; A=0−(−${F(4,3)})=${F(4,3)} u²`],
 ['Como comprobación independiente, centramos la región en x=2: su altura es 1−(x−2)². La integración numérica positiva coincide.','A=∫_{−1}^{1}(1−u²) du=4/3>0'],
],{roots:[1,3],points:[[1,4],[3,0]],lower:[6,-2],upper:[3,2,-1],difference:[-3,4,-1],primitive:[0,-3,2,-1/3],area:4/3,wrongAreas:[-4/3,16/3,8/3]},true),
];
if(c.index===303)return[
mk(0,'Pierde peso para todo t≥0; tiende a 60 kg sin alcanzar ese valor en ningún día finito.',[
 'Pierde peso para todo t≥0; tiende a 75 kg sin alcanzar ese valor en ningún día finito.','Pierde peso para todo t≥0; tiende a 0 kg sin alcanzar ese valor en ningún día finito.','Gana peso para todo t≥0; tiende a 90 kg sin alcanzar ese valor en ningún día finito.'],['Confundir peso inicial y límite.','Suponer que la fracción descontada puede crecer sin límite.','Sumar el término fraccionario en vez de restarlo.'],[
 ['El tiempo está restringido a días no negativos; el denominador nunca se anula.',`P(t)=75−${F('15t','t+120')}; t≥0; t+120>0`],
 ['Derivamos el cociente conservando el signo menos exterior.',`P′(t)=−${F('15(t+120)−15t','(t+120)²')}=−${F(1800,'(t+120)²')}`],
 ['El cuadrado del denominador es positivo: la derivada es estrictamente negativa.','P′(t)<0 para t≥0 ⇒ pierde peso paulatinamente'],
 ['Dividimos numerador y denominador entre t para calcular el límite, sin usar L’Hôpital.',`lim_{t→∞}P(t)=75−${F(15,1)}=60 kg`],
 ['La forma equivalente muestra que todo peso en tiempo finito es estrictamente mayor que el límite.',`P(t)=60+${F(1800,'t+120')}>60 kg`],
 ['El peso mínimo citado por el enunciado es un límite inferior: no existe mínimo alcanzado en un tiempo finito.','P(0)=75 kg; ínfimo=60 kg; rango (60;75] kg'],
 ['Comprobamos el límite y la tendencia con valores crecientes de t y la identidad algebraica anterior.','P(120)=67,5 kg; P(330)=64 kg; P(1680)=61 kg'],
],{initial:75,limit:60,attained:false,derivativeNumerator:-1800,range:[60,75],wrongLimits:[75,0,90]}),
mk(1,'Debe seguir el régimen durante 330 días.', ['Debe seguir el régimen durante 120 días.','Debe seguir el régimen durante 132 días.','Debe seguir el régimen durante 450 días.'],['Confundir el parámetro del denominador con el tiempo solicitado.','Despejar erróneamente 4t=1320 como t=132.','Confundir t+120 con t después de despejar.'],[
 ['Igualamos el modelo al peso objetivo, que pertenece a su rango.','P(t)=64 kg; 60<64≤75'],
 ['Aislamos la fracción que representa la pérdida de peso.',`75−${F('15t','t+120')}=64 ⇒ ${F('15t','t+120')}=11`],
 ['Multiplicamos por el denominador positivo y desarrollamos.','15t=11(t+120)=11t+1320'],
 ['Reunimos términos y dividimos por cuatro.','4t=1320 ⇒ t=330 días'],
 ['Sustituimos directamente en la expresión original.',`P(330)=75−${F('15·330',450)}=75−11=64 kg`],
 ['La monotonía estricta garantiza que no existe un segundo tiempo con el mismo peso.','t=330≥0; solución única'],
],{target:64,time:330,wrongTimes:[120,132,450]}),
mk(2,`Sí: al inicio tiene sobrepeso. Deja de tenerlo a los ${F(555,11)}≈50,4545 días; primer día entero completado: 51.`,[
 'Sí: al inicio tiene sobrepeso. Deja de tenerlo a los 50 días; primer día entero completado: 50.','Sí: al inicio tiene sobrepeso. Deja de tenerlo a los 330 días; primer día entero completado: 330.','Sí: al inicio tiene sobrepeso. Deja de tenerlo a los 120 días; primer día entero completado: 120.'],['Redondear el tiempo hacia abajo antes de cumplir el umbral.','Confundir el peso objetivo del apartado anterior con el umbral del IMC.','Tomar el parámetro 120 como duración del sobrepeso.'],[
 ['Utilizamos la altura en metros y la elevamos al cuadrado en la fórmula oficial.',`h=1,68 m; h²=2,8224 m²; i(t)=${F('P(t)','2,8224')}`],
 ['El sobrepeso requiere desigualdad estricta; el umbral de peso se obtiene multiplicando por h².','i(t)>25 ⇔ P(t)>25·2,8224=70,56 kg'],
 ['Comprobamos el estado inicial. La persona comienza por encima del umbral.',`i(0)=${F(75,'2,8224')}≈26,5731>25`],
 ['Buscamos el momento en que deja de cumplirse la desigualdad: basta alcanzar la igualdad.',`75−${F('15t','t+120')}=70,56 ⇒ 15t=4,44(t+120)`],
 ['Despejamos sin redondear el coeficiente intermedio.',`10,56t=532,8 ⇒ t=${F('532,8','10,56')}=${F(555,11)} días`],
 ['El peso es decreciente: desde ese momento el IMC es menor o igual que 25.','Sobrepeso: 0≤t<555/11; sin sobrepeso: t≥555/11'],
 ['Si se cuentan solo días completos, comprobamos los dos enteros contiguos en lugar de redondear al más cercano.','i(50)≈25,0100>25; i(51)≈24,9881<25 ⇒ 51 días completos'],
],{height:1.68,heightSquared:2.8224,threshold:70.56,time:555/11,wholeDays:51,initialBMI:75/1.68**2,wrongTimes:[50,330,120]}),
];
if(c.index===326)return[
mk(0,'a=−2; b=4; máximo en x=1 con valor f(1)=8.', ['a=2; b=−4; extremo en x=1 con valor f(1)=4.','a=−1; b=2; máximo en x=1 con valor f(1)=7.','a=−2; b=4; máximo en x=1 con valor f(1)=6.'],['Cambiar el signo del coeficiente y producir un mínimo que además rompe continuidad.','Imponer el extremo sin satisfacer el valor del empalme.','Omitir los términos variable y cuadrático al evaluar el máximo.'],[
 ['La unión de las ramas está en 2,5; igualamos los valores laterales para imponer continuidad.','6,25a+2,5b+6=−1,4·2,5+7=3,5'],
 ['El máximo pedido está en x=1, en el interior de la rama cuadrática; su derivada debe anularse.','f′(x)=2ax+b si x<2,5; f′(1)=2a+b=0 ⇒ b=−2a'],
 ['Sustituimos en la ecuación de continuidad y simplificamos.','6,25a−5a+6=3,5 ⇒ 1,25a=−2,5 ⇒ a=−2'],
 ['Recuperamos b y comprobamos los dos valores de la unión.','b=4; f(2,5)=−2·6,25+4·2,5+6=3,5'],
 ['La segunda derivada es negativa. La forma de cuadrado completo demuestra el máximo de la rama.','f″=−4<0; −2x²+4x+6=8−2(x−1)²≤8'],
 ['La segunda rama es decreciente y, para x>2,5, queda por debajo de 3,5: no supera el máximo.','−1,4x+7<3,5<8; máximo global f(1)=8'],
 ['No imponemos igualdad de derivadas en el empalme, pues el enunciado solo exige continuidad allí.','f′(2,5⁻)=−6; f′(2,5⁺)=−1,4'],
],{a:-2,b:4,join:[2.5,3.5],maximum:[1,8],wrongParameters:[[2,-4],[-1,2]],wrongMaximum:6}),
mk(1,'Parábola hacia abajo, vértice (1/2;9/2), cortes (−1;0) y (2;0); área encerrada=9 u².',[
 'Parábola hacia abajo, vértice (1/2;9/2), cortes (−1;0) y (2;0); área encerrada=−9 u².','Parábola hacia abajo, vértice (1/2;9/2), cortes (−1;0) y (2;0); área encerrada=20/3 u².','Parábola hacia abajo, vértice (1/2;9/2), cortes (−1;0) y (2;0); área encerrada=27/2 u².'],['Invertir los límites de integración y dar área negativa.','Omitir la región a la izquierda del eje vertical.','Sustituir el segmento parabólico por el rectángulo de altura máxima.'],[
 ['Factorizamos para localizar los cortes con el eje horizontal.','g(x)=−2x²+2x+4=−2(x−2)(x+1) ⇒ x=−1, x=2'],
 ['La derivada se anula en medio de las raíces y la segunda derivada es negativa.','g′=−4x+2=0 ⇒ x=1/2; g″=−4; g(1/2)=9/2'],
 ['La gráfica adjunta conserva los cortes y el vértice; entre las raíces la función es positiva.','g(0)=4; g(x)>0 si −1<x<2'],
 ['La región cerrada con el eje horizontal tiene área dada por la integral positiva.',`A=∫_{−1}^{2}(−2x²+2x+4) dx`],
 ['Aplicamos primitivas inmediatas de monomios.',`H(x)=−${F('2x³',3)}+x²+4x`],
 ['Evaluamos ambos extremos y restamos el valor inferior con su signo.',`H(2)=${F(20,3)}; H(−1)=−${F(7,3)}; A=${F(27,3)}=9 u²`],
 ['La comprobación independiente por Simpson es exacta para este polinomio cuadrático.',`A=${F(3,6)}·(0+4·${F(9,2)}+0)=9 u²`],
],{roots:[-1,2],vertex:[.5,4.5],coefficients:[4,2,-2],primitive:[0,4,1,-2/3],area:9,wrongAreas:[-9,20/3,27/2]},true),
];throw Error('Unverified chain/area/weight source');}
export function buildChainAreaWeightBatch(id='batch-0337',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.secondaryTopics=i===303?['Límites','Monotonía','Aplicaciones']:['Continuidad','Gráficas','Integrales definidas y áreas'];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_CHAIN_AREA_WEIGHT_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildChainAreaWeightBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0337-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0337.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
