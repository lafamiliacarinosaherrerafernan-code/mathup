import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {renderPolynomialGraph} from './resolve-andalucia-calculus-graph-branches.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:76,literals:['recta tangente','integrales definidas siguientes']},{index:193,literals:['crecimiento y decrecimiento','curvatura','área del recinto']},{index:498,literals:['equipo de refrigeración','seis horas']},{index:533,literals:['miles de euros','36t','máximo y el mínimo']}];
export const functions={76:{f:x=>(3*x*x+5*x-2)/(7-3*x),g:x=>Math.log(1/(3*x+1)),u:x=>5/(3*x**4),v:x=>Math.exp(x/3)/5},193:x=>x**3-3*x*x+2*x,498:t=>{assert.ok(t>=0&&t<=24);return t<=1?-9:t<11?-t*t+12*t-20:-9;},533:t=>{assert.ok(t>=0&&t<=10);return 2*t**3-36*t*t+162*t-6;}};
export const graphSpecs={
193:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'official-applications-v1',index:193,xRange:[-.5,2.5],yRange:[-2,2],step:[.5,1],pieces:[{range:[-.5,2.5],coefficients:[0,2,-3,1],label:'f(x)=x³−3x²+2x',color:'#075597'}],points:[{xy:[0,0],label:'(0;0)',dx:-10,dy:22},{xy:[1,0],label:'I(1;0)',dx:10,dy:22},{xy:[2,0],label:'(2;0)',dx:10,dy:22},{xy:[1-Math.sqrt(3)/3,2*Math.sqrt(3)/9],label:'máximo',dx:-10,dy:-15},{xy:[1+Math.sqrt(3)/3,-2*Math.sqrt(3)/9],label:'mínimo',dx:10,dy:23}],area:[0,2]},
498:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'official-applications-v1',index:498,xRange:[0,24],yRange:[-12,20],step:[2,4],axisLabels:['t (horas)','f(t) (°C)'],pieces:[{range:[0,1],coefficients:[-9],label:'0≤t≤1: −9',color:'#075597',leftClosed:true,rightClosed:true},{range:[1,11],coefficients:[-20,12,-1],label:'1<t<11: −t²+12t−20',color:'#075597',leftOpen:true,rightOpen:true},{range:[11,24],coefficients:[-9],label:'11≤t≤24: −9',color:'#075597',leftClosed:true,rightClosed:true}],points:[{xy:[1,-9],label:'(1;−9)',dx:8,dy:23},{xy:[6,16],label:'(6;16)',dx:10,dy:-13},{xy:[11,-9],label:'(11;−9)',dx:10,dy:23},{xy:[2,0],label:'(2;0)',dx:-10,dy:-13},{xy:[10,0],label:'(10;0)',dx:10,dy:-13}]},
};
export function renderOfficialApplicationsGraph(s){assert.deepEqual(s,graphSpecs[s.index]);return renderPolynomialGraph(s);}
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof,graph=false)=>{const p=part(ps[k],a,w,reasons,steps,'OFFICIAL_SOURCE_CALCULUS_WITH_INDEPENDENT_DERIVATIVES_AND_QUADRATURE',proof);if(graph)p.visual=structuredClone(graphSpecs[c.index]);return p;};
if(c.index===76)return[
 mk(0,`Para f: y=${F(29,49)}x−${F(2,7)}; para g: y=−3x.`,[
 `Para f: y=${F(41,49)}x−${F(2,7)}; para g: y=−3x.`,
 `Para f: y=${F(29,49)}x−${F(2,7)}; para g: y=3x.`,
 `Para f: y=${F(29,49)}x+${F(2,7)}; para g: y=−3x.`],['Cambiar el signo de la resta del cociente al derivar.','Olvidar que el argumento logarítmico es un recíproco.','Cambiar el signo de f(0) en la ecuación de la tangente.'],[
 ['En el PDF ambas tangentes se piden en abscisa cero. Identificamos las dos funciones completas.',`f(x)=${F('3x²+5x−2','7−3x')}; g(x)=ln(${F(1,'3x+1')}); x₀=0`],
 ['La tangente es y=f(x₀)+f′(x₀)(x−x₀). Primero calculamos las ordenadas.',`f(0)=−${F(2,7)}; g(0)=ln(1)=0`],
 ['Aplicamos la regla del cociente; la derivada del denominador es menos tres.',`f′(x)=${F('(6x+5)(7−3x)+3(3x²+5x−2)','(7−3x)²')}`],
 ['Sustituimos cero conservando el signo del numerador original.',`f′(0)=${F('35−6',49)}=${F(29,49)}`],
 ['En el dominio x>−1/3 podemos escribir el logaritmo como menos el logaritmo del denominador.',`g(x)=−ln(3x+1); g′(x)=−${F(3,'3x+1')}; g′(0)=−3`],
 ['Sustituimos ambas pendientes y ordenadas en la ecuación de las respectivas tangentes.',`y=${F(29,49)}x−${F(2,7)}; y=−3x`],
 ['Comprobamos de forma independiente los cocientes incrementales en cero y el paso por sus puntos.',`lim_{h→0}${F('f(h)−f(0)','h')}=${F(29,49)}; lim_{h→0}${F('g(h)−g(0)','h')}=−3`],
 ],{abscissa:0,fPoint:[0,-2/7],gPoint:[0,0],slopes:[29/49,-3],intercepts:[-2/7,0],wrong:[[41/49,-2/7,-3,0],[29/49,-2/7,3,0],[29/49,2/7,-3,0]]}),
 mk(1,`Primera integral=${F(35,72)}; segunda integral=${F(3,5)}(1−e^(−1)).`,[
 `Primera integral=−${F(35,72)}; segunda integral=${F(3,5)}(1−e^(−1)).`,
 `Primera integral=${F(35,72)}; segunda integral=${F(1,5)}(1−e^(−1)).`,
 `Primera integral=${F(35,72)}; segunda integral=${F(3,5)}(1+e^(−1)).`],['Invertir los límites al evaluar la primera primitiva.','Omitir el factor tres al integrar e elevado a x/3.','Sumar en lugar de restar el valor inferior de la segunda primitiva.'],[
 ['El PDF acredita ambos integrandos y los límites; no proceden de una solución histórica.',`I₁=∫_{−2}^{−1}${F(5,'3x⁴')} dx; I₂=∫_{−3}^{0}${F('e^(x/3)',5)} dx`],
 ['Escribimos la primera potencia con exponente negativo y aumentamos el exponente en uno.',`∫${F(5,3)}x^(−4) dx=−${F(5,'9x³')}+C`],
 ['Evaluamos extremo superior menos inferior; ambos valores de la primitiva son positivos.',`I₁=${F(5,9)}−${F(5,72)}=${F(35,72)}`],
 ['La derivada del exponente de la segunda función vale un tercio; compensamos multiplicando por tres.',`H₂(x)=${F(3,5)}e^(x/3); H₂′(x)=${F('e^(x/3)',5)}`],
 ['Evaluamos en cero y menos tres, manteniendo el signo de la resta.',`I₂=${F(3,5)}(e⁰−e^(−1))=${F(3,5)}(1−e^(−1))`],
 ['Ambos integrandos son positivos en sus intervalos. Una cuadratura independiente confirma los resultados positivos.',`I₁≈0,486111; I₂≈0,379272`],
 ],{bounds:[[-2,-1],[-3,0]],values:[35/72,.6*(1-Math.exp(-1))],wrong:[[-35/72,.6*(1-Math.exp(-1))],[35/72,.2*(1-Math.exp(-1))],[35/72,.6*(1+Math.exp(-1))]]})];
if(c.index===193)return[
 mk(0,`Cortes x=0,1,2; críticos x=1±${F('√3',3)}. Máximo en el menor y mínimo en el mayor; f″<0 si x<1, f″>0 si x>1; inflexión (1;0).`,[
 `Cortes x=0,1,2; críticos x=1±${F('√3',3)}. Mínimo en el menor y máximo en el mayor; f″<0 si x<1, f″>0 si x>1; inflexión (1;0).`,
 'Cortes x=0,1,2; críticos x=0,2. Máximo en el menor y mínimo en el mayor; f″<0 si x<1, f″>0 si x>1; inflexión (1;0).',
 `Cortes x=0,1,2; críticos x=1±${F('√3',3)}. Máximo en el menor y mínimo en el mayor; f″>0 si x<1, f″<0 si x>1; inflexión (1;0).`],['Invertir el signo de la primera derivada.','Tomar raíces de f como ceros de f′.','Invertir el signo de la segunda derivada.'],[
 ['Factorizamos la función oficial y hallamos los cortes con ambos ejes.','f(x)=x³−3x²+2x=x(x−1)(x−2); OX: (0;0),(1;0),(2;0); OY: (0;0)'],
 ['Derivamos y resolvemos la ecuación de puntos estacionarios.',`f′=3x²−6x+2=3(x−1)²−1; α=1−${F('√3',3)}; β=1+${F('√3',3)}`],
 ['El polinomio derivado tiene coeficiente principal positivo. Su signo es positivo fuera de las raíces y negativo entre ellas.','Crece en (−∞;α) y (β;∞); decrece en (α;β)'],
 ['Los cambios de signo determinan máximo y mínimo relativos. Usamos f(1+u)=u³−u para sus ordenadas.',`Máximo (α;${F('2√3',9)}); mínimo (β;−${F('2√3',9)})`],
 ['Derivamos de nuevo y estudiamos el signo, evitando ambigüedad en los nombres de curvatura.','f″=6x−6; cóncava hacia abajo si x<1; hacia arriba si x>1'],
 ['La segunda derivada cambia de signo en uno y la función vale cero: hay inflexión.','I=(1;0); f′(1)=−1'],
 ],{roots:[0,1,2],critical:[1-Math.sqrt(3)/3,1+Math.sqrt(3)/3],values:[2*Math.sqrt(3)/9,-2*Math.sqrt(3)/9],inflexion:[1,0],derivativeCoefficients:[2,-6,3],secondDerivativeCoefficients:[-6,6]}),
 mk(1,'Cúbica con cola izquierda hacia −∞ y derecha hacia +∞; cortes 0,1,2, máximo antes de 1, mínimo después de 1 e inflexión (1;0).',[
 'Cúbica con cola izquierda hacia +∞ y derecha hacia −∞; cortes 0,1,2, mínimo antes de 1, máximo después de 1 e inflexión (1;0).',
 'Cúbica con cola izquierda hacia −∞ y derecha hacia +∞; cortes 0,1,2, máximo antes de 1, mínimo después de 1 y asíntota vertical x=1.',
 'Cúbica con cola izquierda hacia −∞ y derecha hacia +∞; cortes −2,−1,0, máximo antes de −1, mínimo después de −1 e inflexión (−1;0).'],['Cambiar el signo global de la función.','Confundir el punto de inflexión con una discontinuidad.','Cambiar los signos de los desplazamientos horizontales.'],[
 ['Usamos los puntos y variaciones calculados para representar la función, sin sustituirlos por una curva genérica.','f(x)=x(x−1)(x−2); dominio ℝ'],
 ['El término cúbico dominante fija las dos colas.','lim_{x→−∞}f(x)=−∞; lim_{x→∞}f(x)=∞'],
 ['Marcamos los tres cortes y los dos extremos que aparecen en la gráfica adjunta.',`α≈0,42265; β≈1,57735; f(α)≈0,38490; f(β)≈−0,38490`],
 ['Dibujamos los tramos respetando el signo de la derivada y el cambio de curvatura.','Crece, decrece y vuelve a crecer; inflexión (1;0)'],
 ['La sustitución x=1+u da una función impar en u: la gráfica es simétrica respecto a (1;0).','f(1+u)=u³−u; f(1−u)=−f(1+u)'],
 ],{coefficients:[0,2,-3,1],roots:[0,1,2],center:[1,0],noAsymptotes:true},true),
 mk(2,`Dos lóbulos entre x=0 y x=2; área total=${F(1,2)} u².`,[
 'Dos lóbulos entre x=0 y x=2; área total=0 u².',`Dos lóbulos entre x=0 y x=2; área total=${F(1,4)} u².`,
 'Dos lóbulos entre x=0 y x=2; área total=1 u².'],['Usar la integral con signo y cancelar las dos áreas.','Contar únicamente uno de los lóbulos.','Duplicar dos veces la suma de los lóbulos.'],[
 ['Los ceros 0, 1 y 2 delimitan los dos recintos acotados con OX.','f>0 en (0;1); f<0 en (1;2)'],
 ['El área geométrica suma valores absolutos, no las integrales con signo.','A=∫_{0}^{1}f(x) dx−∫_{1}^{2}f(x) dx'],
 ['Calculamos la primitiva e identificamos los valores necesarios.',`H(x)=${F('x⁴',4)}−x³+x²; H(0)=0; H(1)=${F(1,4)}; H(2)=0`],
 ['El primer lóbulo aporta un cuarto; el segundo tiene integral negativa de un cuarto.',`I₁=${F(1,4)}; I₂=−${F(1,4)}`],
 ['Sumamos las dos áreas positivas. La simetría respecto a (1;0) confirma su igualdad.',`A=${F(1,4)}+${F(1,4)}=${F(1,2)} u²`],
 ['La gráfica adjunta muestra ambos lóbulos; la cuadratura de |f| coincide con la suma anterior.','∫_{0}^{2}f(x) dx=0 no es el área; ∫_{0}^{2}|f(x)| dx=0,5'],
 ],{bounds:[0,2],split:1,signedAreas:[.25,-.25],area:.5,wrongAreas:[0,.25,1]},true)];
if(c.index===498)return[
 mk(0,'Continua en todo [0;24]: los valores laterales en t=1 y t=11 son −9 °C.',[
 'Discontinua en t=1, pero continua en t=11: los valores laterales en t=1 son −9 y 9 °C.',
 'Continua en t=1, pero discontinua en t=11: los valores laterales en t=11 son −9 y 9 °C.',
 'Discontinua en t=1 y t=11: los valores laterales son −9 y 9 °C en ambos puntos.'],['Perder el signo del término constante al evaluar el primer empalme.','Cambiar el signo del valor de la última rama.','Confundir cambio de fórmula con salto de la temperatura.'],[
 ['El modelo tiene dos tramos constantes y uno cuadrático, con dominio cerrado de cero a veinticuatro horas.','f=−9 en [0;1] y [11;24]; f=−t²+12t−20 en (1;11)'],
 ['Cada fórmula es continua dentro de su tramo; solo hay que comprobar los dos empalmes.','Uniones: t=1 y t=11'],
 ['En la primera unión, el límite del tramo cuadrático coincide con el valor de la rama constante.','−1+12−20=−9=f(1)'],
 ['En la segunda unión ocurre lo mismo.','−121+132−20=−9=f(11)'],
 ['Ambos límites laterales y los valores coinciden. En los extremos del dominio la continuidad es unilateral.','Continua en [0;24]'],
 ],{domain:[0,24],joins:[1,11],values:[-9,-9]}),
 mk(1,'Tramo horizontal a −9 °C, arco parabólico con vértice (6;16), y otro tramo horizontal a −9 °C; cortes con 0 °C en t=2 y t=10.',[
 'Tramo horizontal a −9 °C, arco parabólico con vértice (6;20), y otro tramo horizontal a −9 °C; cortes con 0 °C en t=2 y t=10.',
 'Tramo horizontal a −9 °C, arco parabólico con vértice (12;16), y otro tramo horizontal a −9 °C; cortes con 0 °C en t=2 y t=10.',
 'Tramo horizontal a −9 °C, arco parabólico con vértice (6;16), y otro tramo horizontal a −9 °C; cortes con 0 °C en t=1 y t=11.'],['Confundir el umbral de daño del suero con la temperatura máxima.','Omitir el factor dos en la abscisa del vértice.','Confundir las uniones de tramos con cortes del eje.'],[
 ['Completamos el cuadrado de la rama variable para conocer su forma y su máximo.','−t²+12t−20=16−(t−6)²'],
 ['El vértice es (6;16), dentro del tramo (1;11); la parábola abre hacia abajo.','f′=12−2t; f″=−2'],
 ['Las raíces de la parábola indican los instantes de temperatura cero.','16−(t−6)²=0 ⇒ t=2 o t=10'],
 ['Marcamos los empalmes a −9 °C y conservamos horizontales el inicio y el final del día.','(0;−9),(1;−9),(11;−9),(24;−9)'],
 ['La gráfica adjunta aumenta entre 1 y 6, disminuye entre 6 y 11 y es constante fuera de ese intervalo.','Rango de temperaturas: [−9;16] °C'],
 ],{vertex:[6,16],roots:[2,10],range:[-9,16],coefficients:[-20,12,-1]},true),
 mk(2,'Según el modelo térmico, corte a la 1:00 y recuperación a las 6:00; duración del corte: 5 horas.',[
 'Según el modelo térmico, corte a la 1:00 y recuperación a las 11:00; duración del corte: 10 horas.',
 'Según el modelo térmico, corte a las 2:00 y recuperación a las 10:00; duración del corte: 8 horas.',
 'Según el modelo térmico, corte a las 6:00 y recuperación a las 11:00; duración del corte: 5 horas.'],['Confundir recuperar la temperatura de consigna con recuperar la alimentación.','Usar el intervalo por encima de cero como duración del corte.','Confundir el tramo de enfriamiento con el tramo sin energía.'],[
 ['Interpretamos el modelo: el corte se identifica cuando el equipo deja de mantener su temperatura y comienza a calentarse.','f(t)=−9 hasta t=1; f′(t)=12−2t>0 en (1;6)'],
 ['Por ello el inicio del calentamiento sitúa el corte a la una.','Inicio: t=1 h'],
 ['El modelo empieza a enfriarse cuando la derivada pasa de positiva a negativa. Ese cambio se produce en seis.','f′(6)=0; f′<0 en (6;11)'],
 ['Se interpreta la recuperación de energía al iniciarse el enfriamiento, no al alcanzar de nuevo la consigna.','Recuperación según el modelo: t=6 h; consigna recuperada en t=11 h'],
 ['Restamos los instantes de interrupción y recuperación.','Duración=6−1=5 horas'],
 ],{warming:[1,6],cooling:[6,11],outage:[1,6],duration:5,interpretation:'POWER_RETURN_IDENTIFIED_WITH_START_OF_COOLING_IN_GIVEN_THERMAL_MODEL'}),
 mk(3,'Los sueros no se estropean: máximo 16 °C<20 °C. Las vacunas sí: 8 horas por encima de 0 °C>6 horas.',[
 'Los sueros sí se estropean: máximo 20 °C. Las vacunas sí: 8 horas por encima de 0 °C>6 horas.',
 'Los sueros no se estropean: máximo 16 °C<20 °C. Las vacunas no: solo 5 horas por encima de 0 °C.',
 'Los sueros no se estropean: máximo 16 °C<20 °C. Las vacunas no: solo 4 horas por encima de 0 °C.'],['Confundir el umbral de daño con el máximo de la función.','Usar las horas del corte eléctrico y no las horas por encima de cero.','Contar únicamente el calentamiento por encima de cero.'],[
 ['Aplicamos separadamente las condiciones oficiales: veinte grados para sueros y más de seis horas sobre cero para vacunas.','Umbrales: sueros f≥20; vacunas f>0 durante más de 6 h'],
 ['La mayor temperatura se alcanza en seis y vale dieciséis.','f(6)=−36+72−20=16<20'],
 ['Los sueros no alcanzan su umbral. Para las vacunas resolvemos la desigualdad de temperatura.','16−(t−6)²>0 ⇔ |t−6|<4'],
 ['La temperatura es estrictamente positiva entre dos y diez horas. Fuera de la rama cuadrática vale menos nueve.','f>0 exactamente en (2;10)'],
 ['La duración es ocho horas, superior a seis, así que las vacunas sí se estropean.','10−2=8>6; sueros: no; vacunas: sí'],
 ],{maximum:16,serumThreshold:20,positiveInterval:[2,10],positiveDuration:8,vaccineThreshold:6,serumSpoiled:false,vaccineSpoiled:true})];
if(c.index===533)return[
 mk(0,'B(0)=−6 miles de euros (pérdida de 6.000 €); B(10)=14 miles de euros (beneficio de 14.000 €).',[
 'B(0)=6 miles de euros (beneficio de 6.000 €); B(10)=14 miles de euros (beneficio de 14.000 €).',
 'B(0)=−6 miles de euros (pérdida de 6.000 €); B(10)=20 miles de euros (beneficio de 20.000 €).',
 'B(0)=−6 euros (pérdida de 6 €); B(10)=14 euros (beneficio de 14 €).'],['Perder el signo de la constante inicial.','Omitir la constante al evaluar el último año.','Olvidar que B está expresada en miles de euros.'],[
 ['Identificamos la unidad de beneficio y el intervalo temporal del modelo.','B(t)=2t³−36t²+162t−6; 0≤t≤10; B en miles de euros'],
 ['Evaluamos el inicio: todos los términos con t se anulan.','B(0)=−6'],
 ['Evaluamos el final del décimo año respetando las potencias.','B(10)=2·1000−36·100+162·10−6'],
 ['Realizamos las operaciones.','B(10)=2000−3600+1620−6=14'],
 ['Interpretamos el signo y convertimos la unidad, sin convertir una pérdida en beneficio positivo.','Inicio: −6.000 €; final: 14.000 €'],
 ],{domain:[0,10],endpointValues:[-6,14],euros:[-6000,14000]}),
 mk(1,'Máximo: 210 miles de euros en t=3. Mínimo: −6 miles de euros en t=0 y t=9.',[
 'Máximo: 210 miles de euros en t=3. Mínimo: −6 miles de euros únicamente en t=9.',
 'Máximo: 14 miles de euros en t=10. Mínimo: −6 miles de euros en t=0 y t=9.',
 'Máximo: 210 miles de euros en t=9. Mínimo: −6 miles de euros en t=0 y t=3.'],['Olvidar el extremo cerrado t=0 al buscar el mínimo absoluto.','Comparar solo los extremos del dominio.','Intercambiar los puntos estacionarios máximo y mínimo.'],[
 ['Para extremos absolutos en [0;10], comparamos puntos estacionarios y extremos del intervalo.','Candidatos: t=0, t=10 y ceros interiores de B′'],
 ['Derivamos y factorizamos.','B′(t)=6t²−72t+162=6(t−3)(t−9)'],
 ['Los puntos estacionarios son tres y nueve. El signo de B′ es positivo, negativo y positivo en los tres tramos.','Crece en (0;3), decrece en (3;9), crece en (9;10)'],
 ['Calculamos los valores en todos los candidatos; no basta comparar los dos críticos.','B(0)=−6; B(3)=210; B(9)=−6; B(10)=14'],
 ['El mayor es 210 en el tercer año y el menor es menos seis tanto al inicio como en el noveno año.','Máximo 210.000 €; mínimo −6.000 € en dos instantes'],
 ['La forma factorizada del beneficio respecto al mínimo sirve como comprobación independiente.','B(t)+6=2t(t−9)²≥0 en [0;10]; igualdad solo en t=0 y t=9'],
 ],{critical:[3,9],candidates:[0,3,9,10],candidateValues:[-6,210,-6,14],maximum:[3,210],minima:[[0,-6],[9,-6]]})];
throw Error('Unreviewed official calculus application');
}
export function buildOfficialApplicationsBatch(id='batch-0334',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.secondaryTopics=i===76?['Recta tangente','Integrales definidas y áreas']:i===193?['Monotonía','Curvatura','Gráficas','Integrales definidas y áreas']:i===498?['Continuidad','Monotonía','Gráficas']:['Monotonía','Optimización'];if(i===76)x.integrationEvidence={scope:'IMMEDIATE_EXPONENTIAL_AND_NEGATIVE_POWER_INTEGRALS_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',advancedIntegrationMethods:false};x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_TANGENTS_INTEGRALS_POLYNOMIAL_AND_APPLICATION_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildOfficialApplicationsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0334-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0334.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
