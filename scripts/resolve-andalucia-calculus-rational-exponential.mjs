import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[{index:267,literals:['Calcule la derivada','horizontal la recta tangente']},{index:334,literals:['pendiente 1','curvatura']},{index:348,literals:['miles de euros','liquidez']},{index:449,literals:['continuidad y derivabilidad','monotonía']}];
export const sourceFunctions={267:[x=>(x*x+2)**3*Math.exp(-2*x),x=>Math.log(1-x**3)/(1-2*x*x)**2],334:x=>1-4/(x+3),348:x=>x<=50?(150+5*x)/100:(200+10*x)/(25+3*x),449:x=>x<0?2**(x+1):x*x-2*x};
export const derivatives267=[x=>Math.exp(-2*x)*(x*x+2)**2*(6*x-2*(x*x+2)),x=>-3*x*x/((1-x**3)*(1-2*x*x)**2)+8*x*Math.log(1-x**3)/(1-2*x*x)**3];
export const wrongDerivatives267=[
 [x=>Math.exp(-2*x)*(x*x+2)**2*(6*x+2*(x*x+2)),derivatives267[1]],
 [derivatives267[0],x=>-3*x*x/((1-x**3)*(1-2*x*x)**2)-8*x*Math.log(1-x**3)/(1-2*x*x)**3],
 [x=>Math.exp(-2*x)*(x*x+2)**2*(3-2*(x*x+2)),derivatives267[1]],
];
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reason,steps,proof)=>part(ps[k],a,w,reason,steps,'OFFICIAL_SOURCE_FUNCTION_INDEPENDENT_DIFFERENTIATION_SUBSTITUTION_AND_QUADRATURE',proof);
 if(c.index===267){const defs='U=x²+2; V=1−2x²',df='e^{−2x}U²(6x−2U)',dg=`−${F('3x²','(1−x³)V²')}+${F('8x·ln(1−x³)','V³')}`,ans=(f,g)=>`${defs}. f′=${f}; g′=${g}.`;return[
 mk(0,ans(df,dg),[ans('e^{−2x}U²(6x+2U)',dg),ans(df,`−${F('3x²','(1−x³)V²')}−${F('8x·ln(1−x³)','V³')}`),ans('e^{−2x}U²(3−2U)',dg)],['Cambiar el signo de la derivada de e^{−2x}.','Cambiar el signo positivo que resulta de derivar V^{−2}.','Omitir la derivada 2x del polinomio interior.'],[
 ['Identificamos las funciones del PDF, sin interpretar sus exponentes como factores.',`f(x)=(x²+2)³e^{−2x}; g(x)=${F('ln(1−x³)','(1−2x²)²')}`],
 ['El dominio de f es real. En g el argumento logarítmico debe ser positivo y el denominador distinto de cero.',`D(f)=ℝ; D(g)={x<1: x≠−${F(1,'√2')}, x≠${F(1,'√2')}}`],
 ['Para abreviar las cuatro opciones definimos dos polinomios, sin cambiar las funciones.',defs],
 ['Derivamos f con producto y cadena; el factor de la exponencial es −2.','f′=3U²·2x·e^{−2x}+U³·(−2)e^{−2x}'],
 ['Sacamos los factores comunes y obtenemos la primera derivada.','f′=e^{−2x}U²(6x−2U)'],
 ['Reescribimos g como un producto y derivamos ambos factores.',`g=ln(1−x³)V^{−2}; (ln(1−x³))′=−${F('3x²','1−x³')}; (V^{−2})′=8xV^{−3}`],
 ['Sumamos las dos contribuciones del producto; el segundo sumando es positivo.',`g′=${dg}`],
 ['Contrastamos con diferencias centrales en varios puntos interiores del dominio; la coincidencia comprueba los signos y factores de cadena.','Prueba independiente: x=−0,4; −0,1; 0,2; 0,4; 0,8'],
 ],{sourceFunctions:['(x²+2)³e^{−2x}','ln(1−x³)/(1−2x²)²'],samplePoints:[-.4,-.1,.2,.4,.8],derivativeCount:2,wrongMechanisms:['exponential-sign','quotient-sign','missing-inner-derivative']}),
 mk(1,'a=−3; b=1.',['a=−3; b=−1.','a=−1,5; b=−0,5.','a=3; b=−5.'],['Cambiar el signo al despejar b.','Olvidar la derivada del término 3x.','Cambiar el signo de a en la condición de pendiente nula.'],[
 ['Una tangente horizontal tiene pendiente cero y el punto indicado debe pertenecer a la gráfica.','h′(1)=0; h(1)=2'],
 ['Derivamos el polinomio completo.','h′(x)=3x²+2ax+3'],
 ['Imponemos pendiente nula en uno.','3+2a+3=0 ⇒ a=−3'],
 ['Sustituimos el punto (1;2) usando ese parámetro.','1−3+3+b=2 ⇒ b=1'],
 ['Comprobamos simultáneamente ambas condiciones.','h(x)=x³−3x²+3x+1; h(1)=2; h′(x)=3(x−1)²; h′(1)=0'],
 ['La recta tangente resultante es horizontal; no hace falta que el punto sea un máximo o mínimo.','Tangente en (1;2): y=2'],
 ],{parameters:[-3,1],point:[1,2],slope:0,wrongParameters:[[-3,-1],[-1.5,-.5],[3,-5]]})];}
 if(c.index===334)return[
 mk(0,'D=ℝ∖{−3}; corte OX (1;0); corte OY (0;−1/3).',[
 'D=ℝ∖{3}; corte OX (1;0); corte OY (0;−1/3).','D=ℝ∖{−3}; corte OX (−1;0); corte OY (0;−1/3).','D=ℝ∖{−3}; corte OX (1;0); corte OY (0;1/3).'],['Resolver mal x+3=0.','Cambiar el signo al despejar x en el cero.','Restar incorrectamente 1−4/3.'],[
 ['La función oficial es racional y el único impedimento del dominio es el denominador.',`f(x)=1−${F(4,'x+3')}`],
 ['Excluimos únicamente el valor que anula el denominador.','x+3=0 ⇒ x=−3; D=ℝ∖{−3}'],
 ['Para cortar OX imponemos f(x)=0 con denominador no nulo.','1−4/(x+3)=0 ⇒ x+3=4 ⇒ x=1'],
 ['Para cortar OY imponemos x=0.','f(0)=1−4/3=−1/3'],
 ['Verificamos los dos puntos y que pertenecen al dominio.','f(1)=0; f(0)=−1/3; 1≠−3; 0≠−3'],
 ],{excluded:-3,xIntercept:[1,0],yIntercept:[0,-1/3],wrongExcluded:3,wrongRoot:-1,wrongY:1/3}),
 mk(1,'Vertical x=−3; horizontal y=1 en ambos infinitos; sin oblicua.',[
 'Vertical x=3; horizontal y=1 en ambos infinitos; sin oblicua.','Vertical x=−3; horizontal y=0 en ambos infinitos; sin oblicua.','Sin vertical; horizontal y=1 en ambos infinitos; sin oblicua.'],['Cambiar el signo del polo.','Omitir el sumando constante uno.','Confundir un polo con un punto eliminable.'],[
 ['En x=−3 el numerador del término fraccionario es cuatro, no cero; no hay cancelación.','x+3→0; 4≠0'],
 ['Por la izquierda el denominador es negativo, y la resta del cociente tiende a más infinito.','lim f(x)=+∞ cuando x→−3⁻'],
 ['Por la derecha el denominador es positivo y la función tiende a menos infinito.','lim f(x)=−∞ cuando x→−3⁺ ⇒ asíntota x=−3'],
 ['En ambos infinitos el cociente 4/(x+3) tiende a cero.','lim f(x)=1 cuando x→±∞ ⇒ asíntota y=1'],
 ['La pendiente asintótica es cero; no existe una asíntota oblicua adicional.','lim f(x)/x=0; lim (f(x)−1)=0'],
 ],{pole:-3,leftInfinity:1,rightInfinity:-1,horizontal:1,noCancellation:true}),
 mk(2,'Puntos (−5;3) y (−1;−1).',['Puntos (−5;3) y (1;0).','Puntos (−1;−1) únicamente.','Puntos (−5;−3) y (−1;1).'],['Cambiar el signo al resolver una de las raíces.','Perder la raíz negativa de una ecuación cuadrática.','Cambiar el signo de las ordenadas al sustituir.'],[
 ['La pendiente de la tangente coincide con la primera derivada.',`f′(x)=${F(4,'(x+3)²')}`],
 ['Igualamos la pendiente a uno.','4/(x+3)²=1 ⇒ (x+3)²=4'],
 ['Tomamos las dos raíces, no solamente la positiva.','x+3=±2 ⇒ x=−5 o x=−1'],
 ['Sustituimos ambas abscisas en la función original.','f(−5)=1−4/(−2)=3; f(−1)=1−4/2=−1'],
 ['Comprobamos que ambas derivadas valen uno y ninguna abscisa es el polo.','f′(−5)=f′(−1)=1; puntos (−5;3) y (−1;−1)'],
 ],{points:[[-5,3],[-1,-1]],slope:1,wrongExtraPoint:[1,0],wrongOrdinates:[-3,1]}),
 mk(3,'Convexa (hacia arriba) en (−∞;−3); cóncava (hacia abajo) en (−3;+∞); sin punto de inflexión.',[
 'Cóncava (hacia abajo) en (−∞;−3); convexa (hacia arriba) en (−3;+∞); sin punto de inflexión.','Convexa (hacia arriba) en (−∞;−3); cóncava (hacia abajo) en (−3;+∞); punto de inflexión en x=−3.','Convexa (hacia arriba) en todo el dominio; sin punto de inflexión.'],['Invertir el signo de la segunda derivada.','Llamar inflexión a un punto que no está en el dominio.','Sustituir erróneamente el cubo por un cuadrado.'],[
 ['Derivamos de nuevo para estudiar la curvatura sin ambigüedad terminológica.',`f′=4(x+3)^{−2}; f″=−${F(8,'(x+3)³')}`],
 ['A la izquierda del polo el cubo del denominador es negativo.','x<−3 ⇒ f″>0 ⇒ convexa hacia arriba'],
 ['A la derecha del polo el cubo es positivo.','x>−3 ⇒ f″<0 ⇒ cóncava hacia abajo'],
 ['La segunda derivada no se anula en el dominio.','−8≠0 ⇒ f″(x)≠0'],
 ['Aunque cambia el signo al atravesar el polo, no hay punto de la curva allí, por lo que no es una inflexión.','−3∉D; puntos de inflexión: ninguno'],
 ],{secondSamples:[[-4,8],[0,-8/27]],noInflection:true})];
 if(c.index===348)return[
 mk(0,'Continua en su dominio [10;+∞); las dos ramas dan C(50)=4.',[
 'Discontinua en x=50; las ramas dan 4 y 2.','Continua en todo ℝ; las dos ramas dan C(50)=4.','Discontinua en x=50; las ramas dan 2 y 4.'],['Duplicar el denominador del valor derecho.','Extender el dominio económico fuera del intervalo oficial.','Omitir una parte del numerador de la rama izquierda.'],[
 ['El PDF expresa C y x en miles de euros y restringe la liquidez a x≥10.','D=[10;+∞)'],
 ['La primera rama es afín y continua en [10;50].','C₁(x)=(150+5x)/100'],
 ['La segunda es racional con denominador positivo para x>50.','C₂(x)=(200+10x)/(25+3x); 25+3x>175'],
 ['Comparamos los dos valores en el único empalme.','C₁(50)=400/100=4; lim C₂(50⁺)=700/175=4'],
 ['Ambos coinciden con C(50); en diez se cumple continuidad lateral en el dominio.','C(50)=4; C(10)=2 ⇒ C continua en [10;+∞)'],
 ],{domain:[10,null],join:50,joinValues:[4,4],leftEndpoint:[10,2]}),
 mk(1,'Decrece para x>50 (liquidez superior a 50.000 €); máximo C(50)=4, es decir, 4.000 €.',[
 'Decrece para x<50 (liquidez inferior a 50.000 €); máximo C(10)=2, es decir, 2.000 €.','Decrece para x>50 (liquidez superior a 50.000 €); máximo C(50)=4, es decir, 4 €.','Decrece para x>50 (liquidez superior a 50.000 €); máximo C(50)=50, es decir, 50.000 €.'],['Invertir el signo de variación y tomar el extremo inicial.','Olvidar que C está expresada en miles de euros.','Confundir la abscisa de liquidez con la ordenada de crédito.'],[
 ['Derivamos por separado las dos ramas en sus intervalos abiertos.','C₁′(x)=5/100=0,05>0 para 10<x<50'],
 ['En la racional aplicamos la regla del cociente.',`C₂′=${F('10(25+3x)−3(200+10x)','(25+3x)²')}`],
 ['Simplificamos el numerador; los términos en x se cancelan.','250+30x−600−30x=−350'],
 ['El denominador es positivo, por lo que la función decrece después del empalme.',`C₂′=−${F(350,'(25+3x)²')}<0 para x>50`],
 ['La continuidad y el cambio de creciente a decreciente prueban el máximo absoluto.','Máximo: (x;C)=(50;4)'],
 ['Interpretamos ambas cantidades en las unidades indicadas, sin intercambiarlas.','Liquidez: 50.000 €; crédito máximo: 4.000 €; decrecimiento si liquidez>50.000 €'],
 ],{maximum:[50,4],leftDerivative:.05,rightDerivativeNumerator:-350,unitsMultiplier:1000}),
 mk(2,`Asíntota C=${F(10,3)} miles de euros: el crédito tiende a 3.333,33… € al crecer la liquidez.`,[
 'Asíntota C=2 miles de euros: el crédito tiende a 2.000 € al crecer la liquidez.','Asíntota C=10 miles de euros: el crédito tiende a 10.000 € al crecer la liquidez.','Asíntota C=3/10 miles de euros: el crédito tiende a 300 € al crecer la liquidez.'],['Usar el valor en el extremo inicial en lugar del límite.','No dividir entre el coeficiente principal del denominador.','Invertir el cociente de coeficientes principales.'],[
 ['Para liquidez grande solo corresponde la rama x>50.','C(x)=(200+10x)/(25+3x)'],
 ['Dividimos numerador y denominador entre x.','C(x)=(200/x+10)/(25/x+3)'],
 ['Los términos 200/x y 25/x tienden a cero.','lim C(x)=10/3 cuando x→+∞'],
 ['Convertimos de miles de euros a euros sin redondear el valor exacto.','(10/3)·1.000 €=10.000/3 €≈3.333,33 €'],
 ['La diferencia con la asíntota es positiva y tiende a cero: se aproxima desde arriba, sin alcanzarla para liquidez finita.',`C(x)−${F(10,3)}=${F(350,'3(25+3x)')}>0`],
 ],{horizontal:10/3,euros:10000/3,positiveDifferenceNumerator:350,wrongLimits:[2,10,.3]})];
 if(c.index===449)return[
 mk(0,'D=ℝ; continua y derivable salvo en x=0, donde hay un salto de 2 a 0.',[
 'D=ℝ; continua y derivable en todo ℝ.','D=ℝ; continua en cero pero no derivable allí.','D=ℝ; continua y derivable salvo en x=0, donde hay un salto de 1 a 0.'],['No comprobar los límites laterales.','Confundir un salto con una esquina continua.','Perder el +1 del exponente oficial.'],[
 ['La primera rama es exponencial, no el polinomio 2x+1. Ambas ramas están definidas en sus intervalos.','f(x)=2^{x+1} si x<0; f(x)=x²−2x si x≥0; D=ℝ'],
 ['Por la izquierda se evalúa la exponencial en cero.','lim f(0⁻)=2^{1}=2'],
 ['Por la derecha y en el punto se usa la parábola.','lim f(0⁺)=f(0)=0'],
 ['Los límites laterales son diferentes: hay un salto finito.','2≠0 ⇒ no continua ni derivable en cero'],
 ['Cada rama es derivable en su intervalo abierto.','f′(x)=ln(2)·2^{x+1} si x<0; f′(x)=2x−2 si x>0'],
 ],{leftLimit:2,rightLimit:0,valueAtZero:0,domain:'R',discontinuity:0}),
 mk(1,'Crece en (−∞;0) y (1;+∞); decrece en (0;1); mínimo absoluto (1;−1).',[
 'Decrece en (−∞;0) y (1;+∞); crece en (0;1); máximo absoluto (1;−1).','Crece en (−∞;0) y (1;+∞); decrece en (0;1); mínimo absoluto (0;0).','Crece en (−∞;0) y (1;+∞); decrece en (0;1); mínimo absoluto (1;1).'],['Invertir los signos de las derivadas.','No comparar el vértice con el valor de la unión.','Cambiar el signo de la ordenada del vértice.'],[
 ['En el tramo negativo la exponencial tiene derivada estrictamente positiva.','ln(2)·2^{x+1}>0 ⇒ crece para x<0'],
 ['En el tramo positivo la derivada se anula en uno.','2x−2=0 ⇒ x=1'],
 ['El signo de la derivada es negativo entre cero y uno y positivo después.','f′(0,5)=−1; f′(2)=2'],
 ['Calculamos la ordenada del mínimo relativo.','f(1)=1−2=−1'],
 ['Completamos el cuadrado para comprobar que es absoluto. La rama exponencial siempre es positiva.','x²−2x=(x−1)²−1≥−1; 2^{x+1}>0'],
 ['No unimos intervalos crecientes a través del salto. Cero no es extremo: a su izquierda hay valores mayores y a su derecha menores.','Mínimo absoluto (1;−1); no hay máximo absoluto'],
 ],{firstSamples:[[-1,Math.log(2)],[.5,-1],[2,2]],minimum:[1,-1],branchLowerBounds:[0,-1]}),
 mk(2,`${F(3,'2ln(2)')}−${F(4,3)} ≈ 0,830709.`,[
 `${F(3,'2ln(2)')}+${F(4,3)} ≈ 3,497376.`,`${F(1,6)} ≈ 0,166667.`,`${F(3,'4ln(2)')}−${F(4,3)} ≈ −0,251312.`],['Sumar el valor absoluto del tramo negativo: dar área en vez de integral.','Omitir ln(2) al integrar la exponencial.','Perder el +1 en el exponente y reducir a la mitad la contribución positiva.'],[
 ['El enunciado pide explícitamente la integral, no el área. Dividimos en cero por el cambio de fórmula.','I=∫_{−2}^{0}2^{x+1} dx+∫_{0}^{2}(x²−2x) dx'],
 ['Una primitiva de la exponencial debe incluir el divisor ln(2).',`H₁(x)=${F('2^{x+1}','ln(2)')}; H₁′(x)=2^{x+1}`],
 ['Evaluamos el primer tramo. Los valores de la potencia en cero y en −2 son 2 y 1/2.',`I₁=${F('2−1/2','ln(2)')}=${F(3,'2ln(2)')}`],
 ['Integramos el polinomio y verificamos por derivación.',`H₂(x)=${F('x³',3)}−x²; H₂′(x)=x²−2x`],
 ['El segundo tramo tiene contribución negativa porque la parábola está bajo el eje entre cero y dos.',`I₂=H₂(2)−H₂(0)=${F(8,3)}−4=−${F(4,3)}`],
 ['Sumamos con signo, sin tomar valores absolutos. Contrastamos mediante cuadratura numérica separada de los dos tramos.',`I=${F(3,'2ln(2)')}−${F(4,3)}≈0,830709`],
 ],{intervals:[[-2,0],[0,2]],integrals:[3/(2*Math.log(2)),-4/3],sum:3/(2*Math.log(2))-4/3,wrongValues:[3/(2*Math.log(2))+4/3,1/6,3/(4*Math.log(2))-4/3]})];
 throw Error('Unreviewed rational/exponential case');
}
export function buildRationalExponentialBatch(id='batch-0328',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=['Continuidad','Monotonía','Asíntotas',...(x.correctionEvidence.parameters.index===449?['Integrales definidas y áreas']:[])];if(x.correctionEvidence.parameters.index===449)x.integrationEvidence={scope:'IMMEDIATE_EXPONENTIAL_AND_POLYNOMIAL_SIGNED_INTEGRAL_EXPLICITLY_REQUESTED_BY_OFFICIAL_EXAM',advancedIntegrationMethods:false};x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_SUBPARTS_INDEPENDENT_DERIVATIVES_AND_SOURCE_EXPLICIT_INTEGRAL';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildRationalExponentialBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0328-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0328.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
