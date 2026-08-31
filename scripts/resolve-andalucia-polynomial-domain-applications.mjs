// Seven official pages individually inspected. No coefficient is inferred from an answer.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:220,literals:['Una entidad financiera','cantidad de dinero invertida','menor rentabilidad'],family:'investment'},
 {index:375,literals:['productores de cereales','0.50 euros','demanda mínima'],family:'demand'},
 {index:420,literals:['gerente de una empresa','beneficio es máximo','sabiendo que éste es no negativo'],family:'benefit'},
 {index:497,literals:['programa de radio','máxima y mínima audiencia'],family:'radio'},
 {index:506,literals:['Sea la función','extremos relativos','abscisa x = 1'],family:'cubic-tangent'},
 {index:529,literals:['continuidad y derivabilidad','asíntotas','abscisa x = 2'],family:'piecewise'},
 {index:597,literals:['con a y b números reales','(2, 36)','F (2) = 10'],family:'parameters-primitive'},
];
export const functions={
 investment:x=>-.001*x*x+.5*x+2.5,investmentD:x=>-.002*x+.5,
 demand:x=>-200*x**3+2100*x*x-7200*x+10000,demandD:x=>-600*x*x+4200*x-7200,
 benefit:x=>-x*x+11*x-10,benefitD:x=>-2*x+11,
 radio:t=>660-231*t+27*t*t-t**3,radioD:t=>-231+54*t-3*t*t,
 cubic:x=>x**3-12*x+1,cubicD:x=>3*x*x-12,
 piecewise:x=>x<=1?(x+1)**2:4/x,piecewiseD:x=>x<1?2*(x+1):x>1?-4/(x*x):NaN,
 parameter:x=>-2*x**3+24*x+4,parameterD:x=>-6*x*x+24,
 primitiveBase:x=>4*x**3-3*x+4,primitive:x=>x**4-1.5*x*x+4*x-8,
};
export function solve(c,text){
 const p=officialParts(text),mk=(k,a,w,why,steps,proof)=>part(p[k],a,w,why,steps,'INDEPENDENT_POLYNOMIAL_IDENTITIES_DERIVATIVES_AND_DOMAIN_CHECKS',proof);
 if(c.index===220){assert.equal(p.length,3);return[
  mk(0,'Invertir 250 000 € (x=250).',['Invertir 500 000 € (x=500).','Invertir 125 000 € (x=125).','Invertir 1 000 € (x=1).'],['Confundir mayor inversión con mayor rentabilidad.','Introducir un factor 2 adicional al despejar el punto crítico.','Elegir el extremo inferior sin estudiar la función.'],[
   ['La variable está medida en miles de euros y solo puede variar en el intervalo oficial.','1≤x≤500; R(x)=−0,001x²+0,5x+2,5'],
   ['Derivamos para determinar cuándo aumenta o disminuye la rentabilidad.','R′(x)=−0,002x+0,5'],
   ['Igualamos a cero y despejamos el único punto crítico.','−0,002x+0,5=0 ⇒ x=250'],
   ['La derivada es positiva antes de 250 y negativa después; el punto pertenece al dominio.','R′(x)>0 si x<250; R′(x)<0 si x>250'],
   ['Completamos el cuadrado como verificación independiente del máximo global.','R(x)=65−0,001(x−250)²≤65'],
   ['Convertimos la inversión de miles de euros a euros.','x=250 ⇒ inversión=250·1000=250 000 €'],
  ],{critical:250,investmentEuros:250000,maximum:65,wrongInvestments:[500,125,1]}),
  mk(1,'Rentabilidad de 65 000 € (65 miles de euros).',['Rentabilidad de 62 500 € (62,5 miles de euros).','Rentabilidad de 127 500 € (127,5 miles de euros).','Rentabilidad de 2 500 € (2,5 miles de euros).'],['Omitir el término constante de la función.','Omitir el coste cuadrático negativo.','Evaluar la rentabilidad en el extremo 500 en vez de en el óptimo.'],[
   ['Utilizamos la inversión óptima del apartado anterior.','x=250'],
   ['Sustituimos en los tres términos de la rentabilidad, conservando el signo negativo.','R(250)=−0,001·250²+0,5·250+2,5'],
   ['Calculamos la potencia y los productos antes de sumar.','250²=62500; −0,001·62500=−62,5; 0,5·250=125'],
   ['Sumamos los términos.','R(250)=−62,5+125+2,5=65'],
   ['La función se expresa en miles de euros, no en porcentaje ni en euros sueltos.','65 miles de euros=65 000 €'],
   ['La forma de cuadrado completo confirma exactamente ese valor.','R(250)=65−0,001(250−250)²=65'],
  ],{value:65,euros:65000,wrong:[62.5,127.5,2.5]}),
  mk(2,'Invertir 500 000 € (x=500).',['Invertir 1 000 € (x=1).','Invertir 250 000 € (x=250).','Invertir 0 € (x=0).'],['Suponer que la inversión menor produce necesariamente la rentabilidad mínima.','Confundir el máximo interior con un mínimo.','Incluir una inversión que no pertenece al dominio oficial.'],[
   ['Buscamos el mínimo en el intervalo cerrado; la función es continua.','x∈[1;500]'],
   ['El único punto crítico interior ya se ha clasificado como máximo. El mínimo debe compararse en los extremos.','R′(250)=0; R″(x)=−0,002<0'],
   ['Evaluamos el extremo inferior con todos los términos.','R(1)=−0,001+0,5+2,5=2,999'],
   ['Evaluamos el extremo superior.','R(500)=−250+250+2,5=2,5'],
   ['Comparamos ambas rentabilidades en las mismas unidades.','2,5<2,999 ⇒ mínimo en x=500'],
   ['Convertimos la inversión y distinguimos inversión de rentabilidad.','Inversión=500 000 €; rentabilidad mínima=2 500 €'],
  ],{candidates:[[1,2.999],[250,65],[500,2.5]],minimumAt:500,minimum:2.5})];}
 if(c.index===375){assert.equal(p.length,2);return[
  mk(0,'Se demandan 6 900 kg.',['Se demandan 6 925 kg.','Se demandan 6 375 kg.','Se demandan 6 950 kg.'],['Omitir el término cúbico.','Omitir el término cuadrático.','Cambiar el signo del término cúbico.'],[
   ['El precio es 0,50 euros por kilogramo, dentro del intervalo permitido.','x=0,5∈[0;4]'],
   ['Sustituimos ese precio en los términos cúbico y cuadrático de la demanda.','T₃=−200·0,5³; T₂=2100·0,5²'],
   ['Conservamos también el término lineal y el constante. Sumaremos las cuatro contribuciones.','T₁=−7200·0,5; T₀=10000'],
   ['Calculamos primero las potencias.','0,5²=0,25; 0,5³=0,125'],
   ['Evaluamos cada contribución manteniendo sus signos.','−200·0,125=−25; 2100·0,25=525; −7200·0,5=−3600'],
   ['Sumamos la demanda resultante.','D(0,5)=−25+525−3600+10000=6900'],
   ['Comprobamos agrupando los términos de otra manera y expresamos la unidad solicitada.','10000−3600+(525−25)=6900 kg'],
  ],{price:.5,demand:6900,wrong:[6925,6375,6950]}),
  mk(1,'Precio mínimo de demanda: 3 €/kg; demanda mínima: 1 900 kg.',['Precio mínimo de demanda: 4 €/kg; demanda mínima: 2 000 kg.','Precio mínimo de demanda: 0 €/kg; demanda mínima: 10 000 kg.','Precio mínimo de demanda: 2 €/kg; demanda mínima: 2 400 kg.'],['Elegir el precio mayor suponiendo que la demanda siempre decrece.','Elegir el extremo inferior sin comparar.','Obtener un punto crítico incorrecto al factorizar la derivada.'],[
   ['El mínimo global se busca en el intervalo cerrado de precios.','x∈[0;4]'],
   ['Derivamos el polinomio.','D′(x)=−600x²+4200x−7200'],
   ['Factorizamos para localizar los puntos estacionarios.','D′(x)=−600(x−3)(x−4)=0 ⇒ x=3 o x=4'],
   ['El signo muestra descenso hasta 3 y aumento de 3 a 4. El punto 4 es extremo del dominio.','D′<0 en (0;3); D′>0 en (3;4)'],
   ['Comparamos los extremos y el punto crítico interior.','D(0)=10000; D(3)=1900; D(4)=2000'],
   ['La comparación confirma el mínimo global.','Precio 3 €/kg; demanda 1900 kg'],
   ['Una identidad independiente demuestra que ningún otro precio del intervalo reduce ese valor.','D(x)−1900=100(x−3)²(9−2x)≥0 si 0≤x≤4'],
  ],{critical:[3,4],candidates:[[0,10000],[3,1900],[4,2000]],minimumAt:3,minimum:1900,wrongPrices:[4,0,2]})];}
 if(c.index===420){assert.equal(p.length,3);return[
  mk(0,'La inversión debe pertenecer a [1;10] millones de euros.',['La inversión debe pertenecer a [0;1]∪[10;+∞) millones de euros.','La inversión debe pertenecer a [1;5,5] millones de euros.','La inversión debe pertenecer a [0;10] millones de euros.'],['Invertir el signo del polinomio por ignorar su coeficiente principal negativo.','Confundir beneficio no negativo con beneficio creciente.','Incluir inversiones entre cero y uno que aún producen pérdidas.'],[
   ['La condición solicitada admite también beneficio cero.','f(x)=−x²+11x−10≥0'],
   ['Factorizamos el polinomio a partir de sus raíces.','f(x)=−(x−1)(x−10)'],
   ['Los valores que anulan el beneficio separan los intervalos de signo.','x=1; x=10'],
   ['Entre las raíces los factores tienen signos contrarios; el signo exterior hace el beneficio positivo.','1<x<10 ⇒ (x−1)(x−10)<0 ⇒ f(x)>0'],
   ['Fuera de las raíces el beneficio es negativo. Incluimos las raíces porque se permite cero.','f(x)≥0 ⇔ x∈[1;10]'],
   ['Comprobamos con un punto interior y uno exterior y mantenemos las unidades de inversión.','f(5)=20>0; f(0)=−10<0; inversión entre 1 y 10 millones'],
  ],{roots:[1,10],nonnegative:[1,10]}),
  mk(1,'Inversión: 5,5 millones de euros; beneficio máximo: 20,25.', ['Inversión: 11 millones de euros; beneficio máximo: −10.','Inversión: 5,5 millones de euros; beneficio máximo: 10,25.','Inversión: 10 millones de euros; beneficio máximo: 0.'],['Olvidar el factor dos de la derivada del cuadrado.','Restar el término constante dos veces al evaluar.','Confundir raíz del beneficio con inversión óptima.'],[
   ['Derivamos la función de beneficios.','f′(x)=−2x+11'],
   ['Igualamos la derivada a cero y despejamos.','−2x+11=0 ⇒ x=5,5'],
   ['El signo pasa de positivo a negativo, por lo que es un máximo.','f′>0 si x<5,5; f′<0 si x>5,5'],
   ['Evaluamos el beneficio sin confundir la inversión x con f(x).','f(5,5)=−30,25+60,5−10=20,25'],
   ['Completamos el cuadrado para comprobar el máximo global.','f(x)=20,25−(x−5,5)²≤20,25'],
   ['La inversión óptima está dentro del intervalo de beneficio no negativo. El PDF explicita millones para x; el valor de f se mantiene en las unidades de la función.','Inversión: 5,5 millones de euros; f máximo=20,25'],
  ],{at:5.5,maximum:20.25,wrongAt:[11,5.5,10],wrongValue:[-10,10.25,0]}),
  mk(2,'La inversión debe estar entre 1 y 5,5 millones de euros.',['La inversión debe estar entre 5,5 y 10 millones de euros.','La inversión debe estar entre 1 y 10 millones de euros.','La inversión debe estar entre 0 y 5,5 millones de euros.'],['Elegir la parte decreciente del beneficio no negativo.','No imponer que el beneficio aumente.','Olvidar que entre cero y uno el beneficio es negativo.'],[
   ['Imponemos simultáneamente las dos condiciones del enunciado.','f(x)≥0 y f creciente'],
   ['Del primer apartado conservamos las inversiones sin pérdidas.','x∈[1;10]'],
   ['La derivada positiva determina el crecimiento antes del máximo.','f′(x)=11−2x>0 ⇔ x<5,5'],
   ['Intersectamos ambos conjuntos para los puntos con derivada estrictamente positiva.','x∈[1;5,5)'],
   ['La función es estrictamente creciente en el intervalo cerrado [1;5,5]; el extremo 5,5 tiene tangente horizontal, no descenso.','Si 1≤u<v≤5,5, f(v)−f(u)=(v−u)(11−u−v)>0'],
   ['Expresamos el tramo completo de inversión, distinguiéndolo de la condición puntual sobre la derivada.','Entre 1 y 5,5 millones; derivada positiva hasta 5,5 sin incluir ese punto'],
  ],{nonnegative:[1,10],increasingInterval:[1,5.5],derivativeStrictRightExcluded:true})];}
 if(c.index===497){assert.equal(p.length,2);return[
  mk(0,'Al comenzar: 30%; al cierre: 48%.',['Al comenzar: 48%; al cierre: 30%.','Al comenzar: 23%; al cierre: 55%.','Al comenzar: 66%; al cierre: 12%.'],['Intercambiar las dos horas.','Dar las audiencias extremas interiores en vez de las de apertura y cierre.','Confundir coeficientes o las horas con porcentajes de audiencia.'],[
   ['La emisión comienza a las 6 y termina a las 12; sustituimos esas horas, no el tiempo transcurrido.','S(t)=660−231t+27t²−t³; 6≤t≤12'],
   ['Calculamos la audiencia inicial.','S(6)=660−1386+972−216'],
   ['Sumamos con sus signos.','S(6)=30'],
   ['Calculamos la audiencia de cierre.','S(12)=660−2772+3888−1728'],
   ['Sumamos y expresamos ambos resultados como porcentajes.','S(12)=48; al inicio 30%, al cierre 48%'],
   ['La forma anidada comprueba los mismos valores con otra agrupación de operaciones.','S(t)=660+t(−231+t(27−t))'],
  ],{endpoints:[[6,30],[12,48]]}),
  mk(1,'Máxima: 55% a las 11 h; mínima: 23% a las 7 h.',['Máxima: 23% a las 7 h; mínima: 55% a las 11 h.','Máxima: 48% a las 12 h; mínima: 30% a las 6 h.','Máxima: 55% a las 7 h; mínima: 23% a las 11 h.'],['Intercambiar máximo y mínimo pese al signo de la derivada.','Comprobar solo los extremos horarios y omitir los puntos críticos.','Intercambiar las horas de los valores extremos.'],[
   ['Buscamos extremos absolutos de una función continua en un intervalo cerrado.','t∈[6;12]'],
   ['Derivamos y factorizamos.','S′(t)=−231+54t−3t²=−3(t−7)(t−11)'],
   ['Resolvemos la ecuación de los puntos estacionarios.','S′(t)=0 ⇒ t=7 o t=11'],
   ['Estudiamos el signo en todos los intervalos determinados por esas horas.','S′<0 en (6;7); S′>0 en (7;11); S′<0 en (11;12)'],
   ['Evaluamos ambos críticos y los extremos de emisión.','S(6)=30; S(7)=23; S(11)=55; S(12)=48'],
   ['Comparamos todos los candidatos para identificar el mayor y el menor.','Máximo 55% a las 11; mínimo 23% a las 7'],
   ['Dos identidades verifican las cotas en todo el intervalo.','S(t)−23=(t−7)²(13−t)≥0; 55−S(t)=(t−11)²(t−5)≥0'],
  ],{critical:[7,11],candidates:[[6,30],[7,23],[11,55],[12,48]],maximum:[11,55],minimum:[7,23]})];}
 if(c.index===506){assert.equal(p.length,2);return[
  mk(0,'Crece en (−∞;−2) y (2;+∞); decrece en (−2;2). Máximo (−2;17); mínimo (2;−15).',[
   'Decrece en (−∞;−2) y (2;+∞); crece en (−2;2). Mínimo (−2;17); máximo (2;−15).',
   'Crece en (−∞;−4) y (4;+∞); decrece en (−4;4). Máximo (−4;−15); mínimo (4;17).',
   'Crece en (−∞;−2) y (2;+∞); decrece en (−2;2). Máximo (−2;−15); mínimo (2;17).',
  ],['Invertir el signo de la derivada.','Resolver x²=4 como x=±4.','Intercambiar las ordenadas al evaluar los extremos.'],[
   ['El polinomio está definido y es derivable en toda la recta real.','f(x)=x³−12x+1; dominio=ℝ'],
   ['Derivamos término a término.','f′(x)=3x²−12'],
   ['Factorizamos y obtenemos los puntos estacionarios.','f′(x)=3(x−2)(x+2)=0 ⇒ x=−2 o x=2'],
   ['El producto es positivo fuera de las raíces y negativo entre ellas.','Signos de f′: + en (−∞;−2), − en (−2;2), + en (2;+∞)'],
   ['El cambio de crecimiento a decrecimiento identifica el máximo; el cambio contrario, el mínimo.','Máximo relativo en −2; mínimo relativo en 2'],
   ['Calculamos las ordenadas, conservando el signo del cubo negativo.','f(−2)=−8+24+1=17; f(2)=8−24+1=−15'],
   ['Comprobamos el tipo con la segunda derivada.','f″(x)=6x; f″(−2)=−12<0; f″(2)=12>0'],
  ],{critical:[-2,2],maximum:[-2,17],minimum:[2,-15],signs:[1,-1,1]}),
  mk(1,'y=−9x−1',['y=−9x−10','y=−10x','y=−12x+2'],['Usar la ordenada del punto como término independiente.','Confundir ordenada con pendiente.','Omitir la derivada del término x³ al evaluar.'],[
   ['Sustituimos la abscisa en la función para hallar el punto.','f(1)=1−12+1=−10 ⇒ P=(1;−10)'],
   ['La pendiente de la tangente es la derivada en esa abscisa.','f′(x)=3x²−12'],
   ['Evaluamos la pendiente.','m=f′(1)=3−12=−9'],
   ['Aplicamos la ecuación punto-pendiente.','y−(−10)=−9(x−1)'],
   ['Despejamos para obtener la recta.','y+10=−9x+9 ⇒ y=−9x−1'],
   ['Verificamos punto, pendiente y contacto mediante factorización.','f(x)−(−9x−1)=x³−3x+2=(x−1)²(x+2)'],
  ],{point:[1,-10],slope:-9,intercept:-1,contactPolynomial:[1,0,-3,2]})];}
 if(c.index===529){assert.equal(p.length,3);return[
  mk(0,'Dominio ℝ; continua en ℝ; derivable en ℝ excepto en x=1.',['Dominio ℝ excepto 0; continua y derivable en su dominio.','Dominio ℝ; discontinua y no derivable en x=1.','Dominio ℝ; continua y derivable en todo ℝ.'],['Aplicar la exclusión del denominador a una rama que no se usa en x=0.','Confundir el salto de derivadas con un salto de la función.','Comprobar continuidad pero no comparar derivadas laterales.'],[
   ['La rama polinómica se usa hasta 1, incluido; la racional solo para x>1. En esa rama el denominador no puede ser cero.','f(x)={(x+1)² si x≤1; frac{4}{x} si x>1}; dominio=ℝ'],
   ['Cada rama es continua y derivable en el interior de su intervalo. Solo hay que comprobar el punto de unión.','Punto de unión: x=1'],
   ['Calculamos límites laterales y valor.','f(1)=4; límite por la izquierda=4; límite por la derecha=4'],
   ['Los tres valores coinciden, así que la función es continua en la unión y en todo su dominio.','f continua en ℝ'],
   ['Derivamos cada rama y calculamos las derivadas laterales.','Izquierda: 2(x+1) ⇒ f′ izquierda(1)=4; derecha: −frac{4}{x²} ⇒ f′ derecha(1)=−4'],
   ['Las derivadas laterales difieren; existe un punto anguloso.','4≠−4 ⇒ f no derivable en x=1'],
   ['Los cocientes incrementales confirman el desacuerdo sin usar solo las fórmulas de derivación.','h<0: frac{f(1+h)−4}{h}=4+h; h>0: frac{f(1+h)−4}{h}=−frac{4}{1+h}'],
  ],{domainExcluded:[],junction:1,value:4,leftLimit:4,rightLimit:4,leftDerivative:4,rightDerivative:-4}),
  mk(1,'Asíntota horizontal y=0 cuando x→+∞; ninguna vertical ni oblicua.',['Asíntota horizontal y=0 cuando x→+∞; vertical x=0; ninguna oblicua.','Asíntota horizontal y=0 en ambos infinitos; ninguna vertical ni oblicua.','Asíntota oblicua y=x+2 cuando x→−∞; ninguna vertical ni horizontal.'],['Considerar el polo de 4/x fuera del intervalo donde se aplica esa rama.','Usar la rama racional también cuando x tiende a menos infinito.','Confundir un crecimiento cuadrático con una asíntota lineal.'],[
   ['Respetamos qué expresión rige en cada extremo del dominio.','x→+∞: f(x)=frac{4}{x}; x→−∞: f(x)=(x+1)²'],
   ['La rama racional tiende a cero en el infinito positivo.','lim cuando x→+∞ f(x)=0 ⇒ asíntota y=0'],
   ['En el infinito negativo la rama cuadrática diverge, por lo que no hay asíntota horizontal.','lim cuando x→−∞ (x+1)²=+∞'],
   ['Para una posible asíntota oblicua, la pendiente tendría que ser un límite finito no nulo.','frac{(x+1)²}{x}=x+2+frac{1}{x} →−∞ cuando x→−∞'],
   ['No hay singularidades finitas: el cero pertenece a la rama polinómica y la unión es continua.','f(0)=1; f(1)=4; no hay asíntotas verticales'],
   ['Concluimos sin prolongar ramas a intervalos que no les corresponden.','Única asíntota recta: y=0 al tender x a +∞'],
  ],{horizontal:[{direction:'positive',value:0}],vertical:[],oblique:[]}),
  mk(2,'y=−x+4',['y=−x+2','y=x','y=−2x+6'],['Confundir la ordenada del punto con el término independiente.','Perder el signo negativo de la derivada de 4/x.','Dividir la derivada entre x en vez de x².'],[
   ['Como 2>1, usamos únicamente la rama racional.','f(x)=frac{4}{x} cerca de x=2'],
   ['Evaluamos el punto de la gráfica.','f(2)=2 ⇒ P=(2;2)'],
   ['Derivamos y calculamos la pendiente.','f′(x)=−frac{4}{x²}; f′(2)=−1'],
   ['Escribimos la forma punto-pendiente.','y−2=−1(x−2)'],
   ['Simplificamos la recta tangente.','y=−x+4'],
   ['La diferencia tiene un cero doble en el punto de tangencia.','frac{4}{x}−(−x+4)=frac{(x−2)²}{x}; x cercano a 2'],
  ],{point:[2,2],slope:-1,intercept:4})];}
 assert.equal(c.index,597);assert.equal(p.length,3);return[
  mk(0,'a=−2; b=24',['a=2; b=8','a=4; b=−16','a=−4; b=48'],['Usar solo la condición de paso por el punto.','Resolver el paso por el punto e ignorar la derivada nula.','Duplicar los coeficientes al despejar el sistema.'],[
   ['El extremo en (2,36) impone tanto el paso por el punto como la derivada nula.','f(2)=36; f′(2)=0'],
   ['Sustituimos en la función.','8a+2b+4=36 ⇒ 4a+b=16'],
   ['Derivamos y sustituimos la abscisa.','f′(x)=3ax²+b ⇒ 12a+b=0'],
   ['Restamos las ecuaciones para eliminar b.','(12a+b)−(4a+b)=−16 ⇒ 8a=−16 ⇒ a=−2'],
   ['Sustituimos en la ecuación de la derivada.','12(−2)+b=0 ⇒ b=24'],
   ['Verificamos que es un extremo, no solo un punto estacionario.','f″(x)=6ax=−12x; f″(2)=−24<0 ⇒ máximo relativo'],
   ['Comprobamos por sustitución y una identidad local.','f(2)=−16+48+4=36; f(x)−36=−2(x−2)²(x+4)'],
  ],{a:-2,b:24,point:[2,36],secondDerivative:-24,wrong:[[2,8],[4,-16],[-4,48]]}),
  mk(1,'Crece fuera de [−0,5;0,5]; decrece entre −0,5 y 0,5. Máximo (−0,5;5); mínimo (0,5;3).',[
   'Decrece fuera de [−0,5;0,5]; crece entre −0,5 y 0,5. Mínimo (−0,5;5); máximo (0,5;3).',
   'Crece fuera de [−0,25;0,25]; decrece entre −0,25 y 0,25. Máximo (−0,25;4,6875); mínimo (0,25;3,3125).',
   'Crece fuera de [−0,5;0,5]; decrece entre −0,5 y 0,5. Máximo (−0,5;3); mínimo (0,5;5).',
  ],['Invertir los signos de la derivada.','Tomar x²=0,25 como x=±0,25.','Intercambiar las ordenadas de los extremos.'],[
   ['Este apartado proporciona nuevos valores de a y b: no reutilizamos los del apartado anterior.','a=4; b=−3 ⇒ f(x)=4x³−3x+4'],
   ['Derivamos el polinomio.','f′(x)=12x²−3=3(2x−1)(2x+1)'],
   ['Resolvemos la ecuación de puntos estacionarios.','x²=frac{1}{4} ⇒ x=−0,5 o x=0,5'],
   ['Comprobamos el signo de la derivada en los tres intervalos.','f′>0 en (−∞;−0,5) y (0,5;+∞); f′<0 en (−0,5;0,5)'],
   ['Los cambios de signo clasifican los extremos.','Máximo relativo en −0,5; mínimo relativo en 0,5'],
   ['Evaluamos las ordenadas sin perder el signo del cubo.','f(−0,5)=−0,5+1,5+4=5; f(0,5)=0,5−1,5+4=3'],
   ['La segunda derivada confirma ambas clasificaciones.','f″(x)=24x; f″(−0,5)=−12; f″(0,5)=12'],
  ],{critical:[-.5,.5],maximum:[-.5,5],minimum:[.5,3],signs:[1,-1,1]}),
  mk(2,'F(x)=x⁴−1,5x²+4x−8',['F(x)=x⁴−1,5x²+4x','F(x)=x⁴−1,5x²+4x+8','F(x)=x⁴−3x²+4x−2'],['Olvidar la constante determinada por F(2)=10.','Cambiar el signo al despejar la constante.','No dividir el término −3x entre el nuevo exponente.'],[
   ['Conservamos los parámetros específicos de este apartado y la condición de derivada del PDF oficial.','F′(x)=f(x)=4x³−3x+4; F(2)=10'],
   ['Buscamos una primitiva término a término usando la regla de potencias.','Primitiva de xⁿ: frac{x^(n+1)}{n+1}, para n≠−1'],
   ['Integramos los tres términos sin omitir la constante.','F(x)=x⁴−frac{3}{2}x²+4x+C'],
   ['Sustituimos la condición inicial.','F(2)=16−6+8+C=18+C=10'],
   ['Despejamos la constante y escribimos la función solicitada.','C=−8; F(x)=x⁴−1,5x²+4x−8'],
   ['Comprobamos derivando: el resultado debe recuperar exactamente f.','F′(x)=4x³−3x+4'],
   ['Comprobamos también la condición, que distingue esta primitiva de las restantes.','F(2)=16−6+8−8=10'],
  ],{primitiveCoefficients:[1,0,-1.5,4,-8],derivativeCoefficients:[4,0,-3,4],condition:[2,10],constant:-8})];
}
export function buildPolynomialDomainBatch(id='batch-0343',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.block='Análisis';x.examSlot=3;x.secondaryTopics=i===529?['Continuidad','Asíntotas','Tangentes']:i===597?['Monotonía','Integrales inmediatas']:['Monotonía','Optimización',...(i===506?['Tangentes']:[])];x.qualityGates.pedagogical='SOURCE_READ_POLYNOMIAL_DOMAIN_AND_ALL_OFFICIAL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPolynomialDomainBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0343-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0343.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,r)=>s+r.parts.length,0)}));}
