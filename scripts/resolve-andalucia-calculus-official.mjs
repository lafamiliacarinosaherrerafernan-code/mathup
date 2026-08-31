import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const cases=[
 {index:138,literals:['Los intervalos de crecimiento','extremos relativos','gráfica es 4']},
 {index:215,literals:['rectas tangentes','𝐹(2) = 4']},
 {index:391,literals:['Estudie su monotonía','concavidad y convexidad','abscisa x = 0']},
 {index:487,literals:['(−1, 0) y (3, 0)','Halle la ecuación de la recta tangente']},
 {index:625,literals:['Cesio','mitad de la que había','asíntotas horizontales y verticales']},
 {index:640,literals:['(−1, 0) y (5, 0)','f (2) = 5']},
 {index:727,literals:['Indique el dominio','horizontal']},
 {index:826,literals:['f (−1) = 1','Para a = b = 1']},
];
export const f138=x=>2*x*x-x*x*x/3;
export const f215=x=>3*x*x*x-6*x*x+5;
export const f391=x=>x*x*x/3-2*x*x+3*x+1;
export const f625=t=>10*2**(-t/30);
export const f727=x=>x-(3*x-1)/(x+1);
const frac=(a,b)=>`frac{${a}}{${b}}`;
export function solve(c,text){
 const p=officialParts(text),make=(k,a,w,reasons,s,proof)=>part(p[k],a,w,reasons,s,'OFFICIAL_CALCULUS_DIFFERENTIATION_AND_SUBSTITUTION',proof);
 if(c.index===138)return[
  make(0,'Crece en (0;4); decrece en (−∞;0) y (4;+∞).',[
   'Crece en (−∞;0) y (4;+∞); decrece en (0;4).','Crece en (0;2); decrece en (−∞;0) y (2;+∞).','Crece en (−∞;4); decrece en (4;+∞).'],['Invertir el signo de la derivada.','Perder el factor dos al derivar 2x².','Olvidar la raíz x=0.'],[
   ['La función es un polinomio, definido y derivable en toda la recta. Derivamos término a término.',"f′(x)=4x−x²"],
   ['Factorizamos para encontrar todos los puntos críticos.',"f′(x)=x(4−x)=0 ⇒ x=0 o x=4"],
   ['Analizamos ambos factores en los tres intervalos.',"x<0: (−)(+)=−; 0<x<4:(+)(+)=+; x>4:(+)(−)=−"],
   ['La función crece donde su derivada es positiva y decrece donde es negativa.','crecimiento:(0;4); decrecimiento:(−∞;0)∪(4;+∞)'],
   ['Comprobamos los signos con un punto interior de cada intervalo.',"f′(−1)=−5; f′(2)=4; f′(5)=−5"],
  ],{critical:[0,4],signSamples:[[-1,-5],[2,4],[5,-5]]}),
  make(1,`Mínimo (0;0); máximo (4;${frac(32,3)}).`,[
   `Máximo (0;0); mínimo (4;${frac(32,3)}).`,'Mínimo (0;0); máximo (4;32).',`Mínimo (0;0); máximo (2;${frac(16,3)}).`],['Intercambiar los cambios de signo.','Omitir el denominador tres.','Confundir máximo de la derivada con máximo de la función.'],[
   ['Usamos los puntos críticos y el signo de la derivada, no solo la ecuación f′=0.',"f′(x)=x(4−x); x=0,4"],
   ['En cero el signo pasa de negativo a positivo: hay mínimo relativo.','f(0)=0'],
   ['En cuatro el signo pasa de positivo a negativo: hay máximo relativo.',`f(4)=2·4²−${frac('4³',3)}=32−${frac(64,3)}=${frac(32,3)}`],
   ['Damos las coordenadas completas.',`mínimo:(0;0); máximo:(4;${frac(32,3)})`],
   ['La segunda derivada proporciona una comprobación independiente.',"f″(x)=4−2x; f″(0)=4>0; f″(4)=−4<0"],
  ],{points:[[0,0],[4,32/3]],curvature:[4,-4]}),
  make(2,`(2;${frac(16,3)})`,[`(2;${frac(8,3)})`,`(4;${frac(32,3)})`,'(0;0)'],['Restar mal el término cúbico.','Confundir tangente horizontal con pendiente cuatro.','Usar el otro punto crítico.'],[
   ['La pendiente de la tangente en una abscisa es el valor de la derivada.',"f′(x)=4"],
   ['Sustituimos la derivada y pasamos todo al mismo miembro.','4x−x²=4 ⇒ x²−4x+4=0'],
   ['El cuadrado perfecto tiene una única raíz.','(x−2)²=0 ⇒ x=2'],
   ['Calculamos la ordenada en la función, no en su derivada.',`f(2)=8−${frac(8,3)}=${frac(16,3)}`],
   ['Comprobamos la pendiente y escribimos el punto.',`f′(2)=8−4=4; P=(2;${frac(16,3)})`],
  ],{point:[2,16/3],slope:4})];
 if(c.index===215)return[
  make(0,`y=−3x+${frac(49,9)}; y=−3x+5.`,[`y=−3x+${frac(40,9)}; y=−3x+2.`,`y=3x+${frac(49,9)}; y=3x+5.`,'y=−3x+5; y=−3x+1.'],['Usar la ordenada del punto como ordenada en el origen.','Cambiar el signo de la pendiente.','Incluir la recta dada sin comprobar tangencia.'],[
   ['Las rectas paralelas tienen la pendiente −3. Derivamos el polinomio.',"f′(x)=9x²−12x"],
   ['Igualamos la derivada a la pendiente requerida y factorizamos.','9x²−12x=−3 ⇒ 3(3x−1)(x−1)=0'],
   ['Obtenemos las dos abscisas y sus ordenadas.',`x₁=${frac(1,3)}, f(x₁)=${frac(40,9)}; x₂=1, f(x₂)=2`],
   ['Aplicamos la ecuación punto-pendiente en ambos puntos.',`y−${frac(40,9)}=−3(x−${frac(1,3)}); y−2=−3(x−1)`],
   ['Simplificamos conservando el término independiente.',`y=−3x+${frac(49,9)}; y=−3x+5`],
   ['Comprobamos que cada recta pasa por su punto y que ambas pendientes valen −3.',`−3·${frac(1,3)}+${frac(49,9)}=${frac(40,9)}; −3·1+5=2`],
  ],{abscissas:[1/3,1],ordinates:[40/9,2],intercepts:[49/9,5],slope:-3}),
  make(1,`F(x)=${frac('3x⁴',4)}−2x³+5x−2`,[`F(x)=${frac('3x⁴',4)}−2x³+5x+4`,`F(x)=${frac('3x⁴',4)}−2x³+5x+2`,`F(x)=x⁴−2x³+5x−6`],['Confundir F(2) con la constante de integración.','Cambiar el signo de la constante.','Olvidar el factor tres cuartos de la primitiva.'],[
   ['Buscamos una primitiva inmediata y aplicamos la linealidad.',`∫xⁿ dx=${frac('x^{n+1}','n+1')}+C`],
   ['Integramos los tres términos del polinomio.',`F(x)=${frac('3x⁴',4)}−${frac('6x³',3)}+5x+C`],
   ['Simplificamos y aplicamos la condición inicial.',`F(2)=12−16+10+C=4`],
   ['Despejamos la constante.',`6+C=4 ⇒ C=−2`],
   ['Escribimos la función y comprobamos las dos condiciones.',`F(x)=${frac('3x⁴',4)}−2x³+5x−2; F′(x)=3x³−6x²+5; F(2)=4`],
  ],{primitiveCoefficients:[-2,5,0,-2,.75],condition:[2,4]})];
 if(c.index===391)return[
  make(0,`Crece en (−∞;1) y (3;+∞); decrece en (1;3); máximo (1;${frac(7,3)}), mínimo (3;1).`,[
   `Decrece en (−∞;1) y (3;+∞); crece en (1;3); mínimo (1;${frac(7,3)}), máximo (3;1).`,
   'Crece en (−∞;1) y (3;+∞); decrece en (1;3); máximo (1;3), mínimo (3;1).',
   `Crece en (−∞;1) y (3;+∞); decrece en (1;3); máximo (1;${frac(7,3)}), mínimo (3;0).`],['Invertir todos los signos de la derivada.','Calcular mal la ordenada en uno.','Omitir el término constante en la ordenada en tres.'],[
   ['El polinomio tiene dominio real. Derivamos.',"f′(x)=x²−4x+3=(x−1)(x−3)"],
   ['Los puntos críticos son las dos raíces. Analizamos signos.',"x<1:f′>0; 1<x<3:f′<0; x>3:f′>0"],
   ['Por el cambio + a − hay máximo en uno; por − a + hay mínimo en tres.',`f(1)=${frac(1,3)}−2+3+1=${frac(7,3)}; f(3)=9−18+9+1=1`],
   ['Expresamos intervalos y coordenadas, sin confundir abscisa y ordenada.',`crece:(−∞;1)∪(3;+∞); decrece:(1;3); máximo:(1;${frac(7,3)}); mínimo:(3;1)`],
   ['Verificamos los signos y el carácter de los extremos.',"f′(0)=3; f′(2)=−1; f′(4)=3; f″(1)=−2; f″(3)=2"],
  ],{critical:[1,3],extrema:[[1,7/3],[3,1]],signSamples:[[0,3],[2,-1],[4,3]]}),
  make(1,`Curvatura hacia abajo en (−∞;2), hacia arriba en (2;+∞); inflexión (2;${frac(5,3)}).`,[
   `Curvatura hacia arriba en (−∞;2), hacia abajo en (2;+∞); inflexión (2;${frac(5,3)}).`,
   'Curvatura hacia abajo en (−∞;2), hacia arriba en (2;+∞); inflexión (2;0).',
   `Curvatura hacia abajo en (−∞;1), hacia arriba en (1;+∞); inflexión (1;${frac(7,3)}).`],['Invertir el signo de la segunda derivada.','Usar el valor de f″ como ordenada.','Confundir punto crítico e inflexión.'],[
   ['La curvatura se estudia con la segunda derivada.',"f′(x)=x²−4x+3; f″(x)=2x−4"],
   ['Localizamos su cero.','2x−4=0 ⇒ x=2'],
   ['Comprobamos el cambio de signo: no basta con anular f″.',"x<2:f″<0 (hacia abajo); x>2:f″>0 (hacia arriba)"],
   ['Evaluamos la función en la abscisa de inflexión.',`f(2)=${frac(8,3)}−8+6+1=${frac(5,3)}`],
   ['La curvatura cambia y el punto pertenece a la gráfica.',`P=(2;${frac(5,3)}); f″(1)=−2; f″(3)=2`],
  ],{inflection:[2,5/3],secondDerivative:[-4,2]}),
  make(2,'m=3',['m=1','m=−4','m=0'],['Usar f(0) en vez de f′(0).','Usar f″(0) en vez de f′(0).','Suponer que abscisa cero implica pendiente cero.'],[
   ['La pendiente en x₀ se obtiene derivando y evaluando.','m=f′(x₀)'],
   ['Derivamos la función término a término.',"f′(x)=x²−4x+3"],
   ['Evaluamos en la abscisa indicada.',"f′(0)=0−0+3=3"],
   ['Comprobamos mediante el cociente incremental.',`frac{f(h)−f(0)}{h}=${frac('h²',3)}−2h+3 → 3`],
   ['Damos la pendiente, no la ordenada del punto.','m=3'],
  ],{slope:3,at:0}),
  make(3,`${frac('x⁴',12)}−${frac('2x³',3)}+${frac('3x²',2)}+x+C`,[
   `${frac('x⁴',4)}−${frac('2x³',3)}+${frac('3x²',2)}+x+C`,
   `${frac('x⁴',12)}−2x³+${frac('3x²',2)}+x+C`,
   `${frac('x⁴',12)}−${frac('2x³',3)}+3x²+x+C`],['Olvidar el coeficiente un tercio.','No dividir entre tres al integrar el término cuadrático.','No dividir entre dos al integrar el término lineal.'],[
   ['La integral es indefinida y se resuelve por linealidad con primitivas inmediatas.',`∫xⁿ dx=${frac('x^{n+1}','n+1')}+C`],
   ['Integramos el término cúbico conservando el coeficiente.',`∫${frac('x³',3)} dx=${frac(1,3)}·${frac('x⁴',4)}=${frac('x⁴',12)}`],
   ['Integramos los otros términos.',`∫−2x² dx=−${frac('2x³',3)}; ∫3x dx=${frac('3x²',2)}; ∫1 dx=x`],
   ['Sumamos las primitivas e incluimos una constante arbitraria.',`F(x)=${frac('x⁴',12)}−${frac('2x³',3)}+${frac('3x²',2)}+x+C`],
   ['Derivamos el resultado para comprobar todos los coeficientes.',`F′(x)=${frac('x³',3)}−2x²+3x+1=f(x)`],
  ],{primitiveCoefficients:[0,1,1.5,-2/3,1/12]})];
 if(c.index===487||c.index===640){const r=c.index===487?3:5,v=(r-1)/2,k=4/(v+1)**2,mon=`Crece en (−∞;−1) y (${r};+∞); decrece en (−1;${r}).`,ext=`Máximo en x=−1; mínimo en x=${r}.`,steps=[
  ['Los ceros de la derivada son −1 y el segundo corte indicado. Escribimos la parábola factorizada.',`f′(x)=k(x+1)(x−${r})`],
  ['La ordenada del vértice determina el signo y valor del coeficiente.',`−4=k·(${v}+1)·(${v}−${r}) ⇒ k=${c.index===487?'1':frac(4,9)}>0`],
  ['El signo de f′ es positivo fuera de las raíces y negativo entre ellas.',`x<−1:f′>0; −1<x<${r}:f′<0; x>${r}:f′>0`],
  ['Traducimos el signo en monotonía.',mon],
  ['Los cambios + a − y − a + justifican respectivamente máximo y mínimo.',ext],
 ];const ans=[make(0,mon+(c.index===487?' '+ext:''),[
  `Decrece en (−∞;−1) y (${r};+∞); crece en (−1;${r}).`+(c.index===487?` Mínimo en x=−1; máximo en x=${r}.`:''),
  `Crece en (−∞;${v}); decrece en (${v};+∞).`+(c.index===487?` Máximo en x=${v}; no hay mínimo.`:''),
  `Decrece en (−∞;${v}); crece en (${v};+∞).`+(c.index===487?` Mínimo en x=${v}; no hay máximo.`:'')],['Invertir el signo de la parábola.','Estudiar la monotonía de f′ en vez de la de f.','Confundir el vértice de f′ con un mínimo de f.'],steps,{roots:[-1,r],vertex:[v,-4],leading:k})];
 if(c.index===640){ans.push(make(1,ext,[`Mínimo en x=−1; máximo en x=${r}.`,`Máximo en x=${v}; mínimo en x=${r}.`,`Máximo en x=−1; mínimo en x=${v}.`],['Invertir los cambios de signo.','Confundir el vértice de la derivada con un máximo de f.','Confundir el vértice de la derivada con un mínimo de f.'],steps,{extremaAbscissas:[-1,r]}));}
 const is487=c.index===487,correct=is487?'y=−6x−2':'y=−4x+13';ans.push(make(is487?1:2,correct,is487?['y=−2x−2','y=6x−2','y=−6x+2']:['y=−4x+5','y=4x−3','y=−4x−3'],is487?['Omitir la derivada del exponente.','Cambiar el signo de la pendiente.','Cambiar el signo del valor inicial.']:['Usar f(2) como ordenada en el origen.','Cambiar el signo de la pendiente.','Desarrollar mal −4(x−2).'],is487?[
  ['La exponencial compuesta se deriva multiplicando por la derivada del exponente.',"g′(x)=−2·3e^{3x}=−6e^{3x}"],
  ['Calculamos el punto de tangencia.','g(0)=−2e⁰=−2'],
  ['Calculamos la pendiente en el mismo punto.',"m=g′(0)=−6"],
  ['Aplicamos punto-pendiente y simplificamos.','y−(−2)=−6(x−0) ⇒ y=−6x−2'],
  ['Comprobamos que la recta pasa por el punto y tiene la derivada requerida.','y(0)=−2=g(0); pendiente=−6=g′(0)'],
 ]:[
  ['El vértice pertenece a la gráfica de la derivada, por lo que proporciona la pendiente.',"f′(2)=−4"],
  ['La ordenada de la función viene dada de forma independiente.','P=(2;5)'],
  ['Escribimos punto-pendiente.','y−5=−4(x−2)'],
  ['Distribuimos el signo y despejamos y.','y=−4x+8+5=−4x+13'],
  ['Verificamos el paso por P y la pendiente.','−4·2+13=5; pendiente=−4'],
 ],{point:is487?[0,-2]:[2,5],slope:is487?-6:-4,intercept:is487?-2:13}));return ans;}
 if(c.index===625){const y=f625(10),m=-Math.LN2*y/30;return[
  make(0,'30 años',['15 años','60 años','5 años'],['Confundir la mitad de la cantidad con la mitad del periodo.','Tomar dos semividas.','Usar los miligramos restantes como años.'],[
   ['La cantidad inicial es f(0)=10 mg; buscamos cinco miligramos.','f(0)=10; f(t)=5'],
   ['Igualamos la expresión oficial a la mitad inicial.',`10·(${frac(1,2)})^{t/30}=5`],
   ['Dividimos entre diez.',`(${frac(1,2)})^{t/30}=${frac(1,2)}`],
   ['La exponencial de base un medio es inyectiva; igualamos exponentes.',`${frac('t',30)}=1 ⇒ t=30`],
   ['Comprobamos la cantidad y expresamos la unidad.','f(30)=10·0,5=5 mg; tiempo=30 años'],
  ],{time:30,initial:10,half:5}),
  make(1,`y=10·2^{−1/3}−${frac('ln(2)',3)}·2^{−1/3}(t−10)`,[
   `y=10·2^{−1/3}+${frac('ln(2)',3)}·2^{−1/3}(t−10)`,
   `y=10·2^{−1/3}−10·ln(2)·2^{−1/3}(t−10)`,
   `y=10·2^{−1/3}−${frac('ln(2)',3)}·2^{−1/3}t`],['Cambiar el signo del decaimiento.','Omitir el factor un treintavo de la regla de la cadena.','Omitir el desplazamiento t−10.'],[
   ['Derivamos la exponencial de base constante mediante la regla de la cadena.',`f′(t)=10·(${frac(1,2)})^{t/30}·ln(${frac(1,2)})·${frac(1,30)}`],
   ['Usamos que ln(1/2)=−ln(2) y simplificamos.',`f′(t)=−${frac('ln(2)',3)}·2^{−t/30}`],
   ['Evaluamos función y derivada en diez.',`f(10)=10·2^{−1/3}; f′(10)=−${frac('ln(2)',3)}·2^{−1/3}`],
   ['Aplicamos la ecuación de la tangente sin redondear sus coeficientes.',`y−10·2^{−1/3}=−${frac('ln(2)',3)}·2^{−1/3}(t−10)`],
   ['Comprobamos el paso por el punto y el signo negativo de la pendiente.',`f(10)≈7,937005; f′(10)≈−0,183384; y(10)=f(10)`],
  ],{point:[10,y],slope:m}),
  make(2,'Asíntota horizontal y=0; no hay asíntotas verticales para t≥0.',['Asíntota horizontal y=10; no hay asíntotas verticales para t≥0.','Asíntota horizontal y=0; asíntota vertical t=0.','No hay asíntotas horizontales ni verticales para t≥0.'],['Confundir valor inicial con límite infinito.','Confundir extremo del dominio con divergencia.','Ignorar el límite de la exponencial decreciente.'],[
   ['El dominio físico es t≥0. La función exponencial es continua y finita en todo él.','f(0)=10'],
   ['La base un medio es positiva y menor que uno, y el exponente crece sin cota.',`t→+∞ ⇒ (${frac(1,2)})^{t/30}→0`],
   ['Calculamos el límite que determina la asíntota horizontal.','lim f(t)=0 cuando t→+∞ ⇒ y=0'],
   ['Una asíntota vertical exigiría un límite infinito en un punto finito del dominio o su frontera.','lim f(t)=10 cuando t→0⁺'],
   ['No hay tal divergencia; conservamos solo la asíntota horizontal y el dominio indicado.','horizontal:y=0; verticales:ninguna en t≥0'],
  ],{horizontal:0,vertical:[],domain:[0,'infinity']})];}
 if(c.index===727)return[
  make(0,`D=ℝ∖{−1}; f′(x)=1−${frac(4,'(x+1)²')}`, [`D=ℝ∖{−1}; f′(x)=1−${frac(2,'(x+1)²')}`,`D=ℝ∖{−1}; f′(x)=1+${frac(4,'(x+1)²')}`,`D=ℝ; f′(x)=1−${frac(4,'(x+1)²')}`],['Restar mal el numerador de la regla del cociente.','Perder el signo menos exterior.','No excluir el cero del denominador.'],[
   ['El denominador debe ser distinto de cero.','x+1≠0 ⇒ x≠−1'],
   ['La derivada del cociente conserva el denominador al cuadrado.',`(${frac('3x−1','x+1')})′=${frac('3(x+1)−(3x−1)','(x+1)²')}`],
   ['Simplificamos el numerador completo.','3x+3−3x+1=4'],
   ['Derivamos también x y conservamos el signo menos.',`f′(x)=1−${frac(4,'(x+1)²')}`],
   ['Comprobamos por división algebraica antes de derivar.',`f(x)=x−3+${frac(4,'x+1')} ⇒ f′(x)=1−${frac(4,'(x+1)²')}`],
  ],{excluded:-1,derivativeNumerator:4}),
  make(1,`m=−${frac(11,25)}`,[`m=${frac(11,25)}`,`m=−${frac(31,25)}`,`m=${frac(7,25)}`],['Invertir el signo de la pendiente.','Evaluar mal el cuadrado del denominador.','Usar dos en vez de cuatro en el numerador.'],[
   ['La pendiente es f′ en la abscisa oficial, que es dos tercios.',`x₀=${frac(2,3)}; f′(x)=1−${frac(4,'(x+1)²')}`],
   ['Sumamos uno antes de elevar al cuadrado.',`${frac(2,3)}+1=${frac(5,3)}; (${frac(5,3)})²=${frac(25,9)}`],
   ['Dividir por una fracción equivale a multiplicar por su inversa.',`m=1−4·${frac(9,25)}`],
   ['Llevamos al mismo denominador y restamos.',`m=${frac(25,25)}−${frac(36,25)}=−${frac(11,25)}`],
   ['Comprobamos con la forma simplificada y el signo de la derivada.',`m=−0,44; |x₀+1|<2 ⇒ f′(x₀)<0`],
  ],{at:2/3,slope:-11/25}),
  make(2,'(1;0) y (−3;−8)',['(1;0) y (3;1)','(1;0) y (−3;8)','(−1;0) y (1;0)'],['Cambiar el signo de la segunda raíz.','Cambiar el signo de la ordenada.','Incluir el punto excluido del dominio.'],[
   ['Una tangente horizontal tiene pendiente cero y requiere una abscisa del dominio.',`1−${frac(4,'(x+1)²')}=0; x≠−1`],
   ['Despejamos el cuadrado sin perder ninguna de sus raíces.','(x+1)²=4 ⇒ x+1=2 o x+1=−2'],
   ['Obtenemos las dos abscisas admisibles.','x=1 o x=−3'],
   ['Evaluamos la función en cada una.',`f(1)=1−${frac(2,2)}=0; f(−3)=−3−${frac('−10','−2')}=−8`],
   ['Comprobamos la anulación de la derivada y damos puntos completos.',"f′(1)=0; f′(−3)=0; P=(1;0); Q=(−3;−8)"],
  ],{points:[[1,0],[-3,-8]]})];
 if(c.index===826)return[
  make(0,'a=2; b=3',['a=2; b=−1','a=−2; b=−1','a=1; b=2'],['Perder el signo del denominador al sustituir −1.','Cambiar el signo de la pendiente dada.','Confundir paralelismo con paso por la ordenada uno.'],[
   ['Traducimos el paso por (−1;1), exigiendo denominador no nulo.',`${frac('−a','1−b')}=1 ⇒ −a=1−b; b≠1`],
   ['Aplicamos la regla del cociente.',`f′(x)=${frac('a(bx+1)−abx','(bx+1)²')}=${frac('a','(bx+1)²')}`],
   ['La recta dada tiene pendiente dos; en cero la derivada vale a.',"f′(0)=a=2"],
   ['Sustituimos en la condición del punto y despejamos b.','−2=1−b ⇒ b=3'],
   ['Verificamos ambas condiciones y el denominador.',`f(−1)=${frac('−2','−2')}=1; f′(0)=2; 1−b=−2≠0`],
  ],{a:2,b:3}),
  make(1,'Asíntota vertical x=−1; horizontal y=1.',['Asíntota vertical x=1; horizontal y=1.','Asíntota vertical x=−1; horizontal y=0.','Asíntota vertical x=−1; horizontal y=−1.'],['Cambiar el signo del cero del denominador.','Comparar grados incorrectamente.','Cambiar el signo del cociente de coeficientes principales.'],[
   ['Este apartado fija a=b=1; no usamos los parámetros del apartado anterior.',`f(x)=${frac('x','x+1')}`],
   ['El denominador se anula en −1 y el numerador no, por lo que hay divergencia.','x+1=0 ⇒ x=−1; numerador=−1≠0'],
   ['La división permite ver los límites de forma directa.',`f(x)=1−${frac(1,'x+1')}`],
   ['En los laterales de −1 obtenemos infinitos de signos opuestos.','x→−1⁻:f→+∞; x→−1⁺:f→−∞'],
   ['En ambos infinitos la fracción tiende a cero; damos las dos rectas.',`x→±∞:f→1; vertical:x=−1; horizontal:y=1`],
  ],{vertical:-1,horizontal:1})];
 throw Error('Unknown official calculus exercise');
}
export function buildCalculusBatch(id='batch-0321',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));const topics={138:['Tangentes','Monotonía','Extremos'],215:['Tangentes','Integrales inmediatas'],391:['Tangentes','Monotonía','Extremos','Curvatura','Integrales inmediatas'],487:['Tangentes','Monotonía','Extremos'],625:['Tangentes','Funciones exponenciales','Asíntotas'],640:['Tangentes','Monotonía','Extremos'],727:['Dominio','Tangentes'],826:['Tangentes','Asíntotas']};for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=topics[x.correctionEvidence.parameters.index];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_SOURCE_CALCULUS_ALL_SUBPARTS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildCalculusBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0321-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0321.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
