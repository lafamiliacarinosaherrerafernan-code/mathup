import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[
 {index:78,literals:['función sea derivable en x = 0','abscisa x = 2']},
 {index:146,literals:['función f sea derivable','monotonía y curvatura']},
 {index:184,literals:['dicha función sea continua','asíntota vertical']},
 {index:219,literals:['velocidad que lleva un móvil','velocidad máxima']},
 {index:275,literals:['continua y derivable','estudie su monotonía']},
 {index:323,literals:['continuidad y la derivabilidad','curvatura para x > 0']},
 {index:404,literals:['continua y','calcule sus extremos']},
 {index:431,literals:['capacidad máxima de producción es de 2 toneladas','costes de producción máximos']},
 {index:494,literals:['función es derivable','abscisa x']},
];
export const functions={
 78:(x,a,b)=>x<0?a/(x-1):x*x-b*x-1,
 146:(x,a,b)=>x<=1?a*x-3*x*x:2*x*x+b,
 184:(x,a)=>x<=2?x*x-3*x+4:4-a/x,
 219:(t,a,b)=>t<1?7*t*t:t<=5?2*t+a:-t*t+12*t+b,
 275:(x,a,b)=>x<=-1?a*x+1:x<=0?x/(x+2):x*x-b*x,
 323:x=>x<=2?4/x:x*x-2*x+2,
 404:(x,a,b)=>x<=2?-b*x*x-b*x+a:60/x,
 431:x=>30-9*x+6*x*x-x**3,
 494:(x,a,b)=>x<-1?(a*x-12)/2:-x*x+b*(x-1),
};
export function solve(c,text){const ps=officialParts(text),mk=(k,a,w,reasons,steps,proof)=>part(ps[k],a,w,reasons,steps,'OFFICIAL_JOIN_LIMITS_SIGN_TABLE_AND_INDEPENDENT_SUBSTITUTION',proof);
 if(c.index===78)return[
 mk(0,'a=1; b=1.',['a=−1; b=1.','a=1; b=−1.','a=0; b=0.'],['Perder el signo del denominador en cero.','Cambiar el signo de la derivada derecha.','Confundir el punto de unión con los parámetros.'],[
 ['La derivabilidad exige primero continuidad en el punto de unión. El resto de cada tramo es derivable.','D=ℝ; unión en x=0'],
 ['Calculamos límites laterales y valor de la función.','lim f(0⁻)=−a; lim f(0⁺)=f(0)=−1'],
 ['Igualamos los valores para imponer continuidad.','−a=−1 ⇒ a=1'],
 ['Derivamos los tramos y calculamos sus límites laterales.',`f₁′(x)=−${F('a','(x−1)²')}; f₂′(x)=2x−b; f′(0⁻)=−a; f′(0⁺)=−b`],
 ['Igualamos las derivadas y sustituimos el parámetro obtenido.','−a=−b ⇒ b=a=1'],
 ['Comprobamos conjuntamente las dos condiciones.','f(0)=−1; límites=−1; derivadas laterales=−1'],
 ],{parameters:[1,1],join:0,value:-1,slopes:[-1,-1],wrongParameters:[[-1,1],[1,-1],[0,0]]}),
 mk(1,'y=2x−5.',['y=2x−1.','y=−2x+3.','y=3x−7.'],['Usar la ordenada del punto como término independiente.','Cambiar el signo de la pendiente.','Derivar −2x como −1 en lugar de −2.'],[
 ['Este apartado fija a=1 y b=2; en x=2 corresponde el segundo tramo.','f(x)=x²−2x−1 si x≥0'],
 ['Calculamos la ordenada del punto de tangencia.','f(2)=4−4−1=−1; P=(2;−1)'],
 ['La pendiente es el valor de la derivada en el punto.','f′(x)=2x−2; f′(2)=2'],
 ['Escribimos la ecuación punto-pendiente.','y−(−1)=2(x−2)'],
 ['Simplificamos y comprobamos que pasa por el punto y tiene la pendiente correcta.','y=2x−5; y(2)=−1; pendiente=2'],
 ],{parameters:[1,2],point:[2,-1],line:[2,-5],wrongLines:[[2,-1],[-2,3],[3,-7]]})];
 if(c.index===146)return[
 mk(0,'a=10; b=5.',['a=10; b=7.','a=4; b=−1.','a=6; b=1.'],['Olvidar el término 2x² al imponer continuidad.','Olvidar −6x en la derivada izquierda.','Anular la derivada izquierda en lugar de igualarla a la derecha.'],[
 ['Ambos tramos son polinomios; solo comprobamos la unión en uno.','f₁(x)=ax−3x²; f₂(x)=2x²+b'],
 ['La continuidad exige igualdad de límites y valor.','f(1)=a−3; lim f(1⁺)=2+b ⇒ a−b=5'],
 ['Derivamos ambos tramos.','f₁′(x)=a−6x; f₂′(x)=4x'],
 ['La igualdad de derivadas laterales determina a.','a−6=4 ⇒ a=10'],
 ['Sustituimos en la ecuación de continuidad.','10−b=5 ⇒ b=5'],
 ['Verificamos ambas condiciones.','f(1)=7=lim f(1⁺); f′(1⁻)=4=f′(1⁺)'],
 ],{parameters:[10,5],join:1,value:7,slopes:[4,4],wrongParameters:[[10,7],[4,-1],[6,1]]}),
 mk(1,`Crece en (−∞;${F(1,2)}) y (1;+∞); decrece en (${F(1,2)};1). Curvatura hacia abajo en (−∞;1) y hacia arriba en (1;+∞).`,[
 `Decrece en (−∞;${F(1,2)}) y (1;+∞); crece en (${F(1,2)};1). Curvatura hacia abajo en (−∞;1) y hacia arriba en (1;+∞).`,
 `Crece en (−∞;${F(1,2)}) y (1;+∞); decrece en (${F(1,2)};1). Curvatura hacia arriba en (−∞;1) y hacia abajo en (1;+∞).`,
 'Crece en (−∞;1) y (1;+∞); no decrece. Curvatura hacia abajo en (−∞;1) y hacia arriba en (1;+∞).'],['Invertir el signo de f′.','Intercambiar el significado de los signos de f″.','Ignorar la raíz 1/2 de la derivada.'],[
 ['Usamos los parámetros propios de este apartado, no los del anterior.','a=3; b=−2; f₁=3x−3x²; f₂=2x²−2'],
 ['Calculamos la primera derivada en cada intervalo abierto.','f₁′=3−6x; f₂′=4x'],
 ['La primera se anula en un medio; la segunda es positiva para x>1.',`f₁′=0 ⇒ x=${F(1,2)}; signos: +,−; f₂′>0`],
 ['Por tanto hay crecimiento y decrecimiento en los intervalos indicados.',`f(${F(1,2)})=${F(3,4)}; f(1)=0; f′(1⁻)=−3; f′(1⁺)=4`],
 ['Derivamos otra vez y describimos la curvatura sin confundirla con la monotonía.','f₁″=−6<0: hacia abajo; f₂″=4>0: hacia arriba'],
 ['La función es continua en uno pero tiene una esquina. No se usa allí una segunda derivada inexistente.','lim f(1⁻)=f(1)=lim f(1⁺)=0; −3≠4'],
 ],{parameters:[3,-2],firstSamples:[[0,3],[.75,-1.5],[2,8]],secondSamples:[[0,-6],[2,4]],joinSlopes:[-3,4]})];
 if(c.index===184)return[
 mk(0,'a=4; continua y derivable en todo ℝ.',['a=−4; continua y derivable en todo ℝ.','a=4; continua pero no derivable en x=2.','a=2; continua y derivable en todo ℝ.'],['Cambiar el signo de −a/x.','No comprobar que coinciden las derivadas.','Olvidar dividir a entre 2 en el límite derecho.'],[
 ['El cociente solo se utiliza para x>2, por lo que el dominio completo es ℝ.','f₁=x²−3x+4; f₂=4−a/x'],
 ['Evaluamos los límites laterales en dos.','f(2)=4−6+4=2; lim f(2⁺)=4−a/2'],
 ['La continuidad fija el parámetro.','2=4−a/2 ⇒ a=4'],
 ['Derivamos cada tramo con ese valor.',`f₁′=2x−3; f₂′=${F(4,'x²')}`],
 ['Las pendientes laterales coinciden y existe continuidad.','f′(2⁻)=1; f′(2⁺)=4/4=1'],
 ['Fuera de la unión cada fórmula es derivable en su intervalo.','Continua y derivable en ℝ'],
 ],{parameter:4,join:2,value:2,slopes:[1,1],wrongParameters:[-4,2]}),
 mk(1,'No hay asíntotas verticales; y=4 es horizontal cuando x→+∞.', ['x=0 es vertical; y=4 es horizontal cuando x→+∞.','x=2 es vertical; y=4 es horizontal cuando x→+∞.','No hay asíntotas verticales; y=0 es horizontal cuando x→+∞.'],['Aplicar el denominador de un tramo fuera de su intervalo.','Confundir un salto finito con una asíntota vertical.','Olvidar el sumando constante 4.'],[
 ['Se fija a=1. La fórmula racional solo rige para x>2.','f₂(x)=4−1/x'],
 ['En cero rige el polinomio, que es finito. No hay polo allí.','f(0)=4'],
 ['Los límites en la unión son finitos; el salto no es una asíntota vertical.',`lim f(2⁻)=2; lim f(2⁺)=${F(7,2)}`],
 ['Al tender a más infinito usamos la rama racional.','lim f(+∞)=4 ⇒ asíntota y=4'],
 ['Al tender a menos infinito rige el polinomio y no aparece un límite finito.','lim (x²−3x+4)=+∞ cuando x→−∞'],
 ['No hay otro denominador nulo en el dominio de su propia rama.','Asíntotas verticales: ninguna; horizontal: y=4 a la derecha'],
 ],{parameter:1,at0:4,joinLimits:[2,3.5],horizontalRight:4,noVertical:true})];
 if(c.index===219)return[
 mk(0,'a=5; b=−20.',['a=5; b=20.','a=7; b=−18.','a=−5; b=−30.'],['Cambiar el signo al despejar b.','Igualar a con la velocidad en uno olvidando 2t.','Resolver 7=2+a con el signo cambiado.'],[
 ['Imponemos continuidad en los dos cambios de tramo.','v₁=7t²; v₂=2t+a; v₃=−t²+12t+b'],
 ['En t=1 igualamos la primera y segunda expresión.','7=2+a ⇒ a=5'],
 ['En t=5 el segundo tramo tiene valor 10+a.','v₂(5)=15'],
 ['El límite derecho procede del tercer tramo.','v₃(5)=−25+60+b=35+b'],
 ['Igualamos y despejamos el segundo parámetro.','15=35+b ⇒ b=−20'],
 ['Comprobamos ambas uniones y mantenemos el dominio temporal oficial.','v(1)=7; v(5)=15; t∈[0;10]'],
 ],{parameters:[5,-20],joins:[1,5],values:[7,15],wrongParameters:[[5,20],[7,-18],[-5,-30]]}),
 mk(1,'No derivable en t=1; derivable en t=5; velocidad máxima 16 en t=6.', ['Derivable en t=1 y t=5; velocidad máxima 16 en t=6.','No derivable en t=1 ni t=5; velocidad máxima 16 en t=6.','No derivable en t=1; derivable en t=5; velocidad máxima 15 en t=5.'],['Confundir continuidad con derivabilidad.','No reconocer que en cinco las derivadas laterales valen 2.','No buscar el vértice dentro del tercer tramo.'],[
 ['Usamos a=5, b=−20, que garantizan continuidad. Derivamos en cada tramo.','v₁′=14t; v₂′=2; v₃′=−2t+12'],
 ['En uno las derivadas laterales son distintas.','v′(1⁻)=14; v′(1⁺)=2 ⇒ no derivable'],
 ['En cinco coinciden y hay continuidad.','v′(5⁻)=2; v′(5⁺)=−10+12=2 ⇒ derivable'],
 ['La última derivada se anula en seis, dentro del intervalo permitido; cambia de positiva a negativa.','−2t+12=0 ⇒ t=6'],
 ['Comparamos valor crítico, uniones y extremos del dominio.','v(0)=0; v(1)=7; v(5)=15; v(6)=16; v(10)=0'],
 ['El máximo global se alcanza en seis; no se atribuyen unidades no indicadas por el enunciado.','t máximo=6; v máxima=16'],
 ],{parameters:[5,-20],joinSlopes:[[14,2],[2,2]],candidateValues:[[0,0],[1,7],[5,15],[6,16],[10,0]],maximum:[6,16]})];
 if(c.index===275)return[
 mk(0,`a=2; b=−${F(1,2)}.`,[`a=2; b=${F(1,2)}.`,`a=−2; b=−${F(1,2)}.`,'a=2; b=−2.'],['Perder el signo de −b en la derivada derecha.','Cambiar el signo en la ecuación de continuidad en −1.','Evaluar la derivada racional en −1 en lugar de en cero.'],[
 ['Solo deben empalmarse las fórmulas en −1 y cero; x=−2 no pertenece al tramo racional.','D=ℝ; f₁=ax+1; f₂=x/(x+2); f₃=x²−bx'],
 ['En −1 la continuidad determina a.','−a+1=−1 ⇒ a=2'],
 ['Derivamos los tramos y comprobamos las pendientes en −1.',`f₁′=a; f₂′=${F(2,'(x+2)²')}; f₁′(−1)=2=f₂′(−1)`],
 ['En cero la continuidad es automática para cualquier b.','f₂(0)=0=f₃(0)'],
 ['Igualamos las pendientes laterales en cero.',`f₂′(0)=${F(1,2)}; f₃′(0)=−b ⇒ b=−${F(1,2)}`],
 ['Ambas uniones cumplen igualdad de valores y derivadas.',`valores: −1 y 0; pendientes: 2 y ${F(1,2)}`],
 ],{parameters:[2,-.5],joins:[-1,0],values:[-1,0],slopes:[2,.5],wrongParameters:[[2,.5],[-2,-.5],[2,-2]]}),
 mk(1,'Estrictamente creciente en todo ℝ; no tiene intervalos de decrecimiento.', ['Decreciente en (−∞;−1) y creciente en (−1;+∞).','Creciente en (−∞;0) y decreciente en (0;+∞).','Creciente en (−∞;−1) y (0;+∞), decreciente en (−1;0).'],['Usar el signo de x en vez del signo de la pendiente a.','Cambiar el signo de la derivada del último tramo.','Derivar x/(x+2) con numerador −2.'],[
 ['Se utilizan a=2 y b=−1/2, que son los valores indicados.','f₁=2x+1; f₂=x/(x+2); f₃=x²+x/2'],
 ['La recta tiene pendiente positiva en todo su tramo.','f₁′=2>0 para x<−1'],
 ['La derivada racional es positiva en su intervalo.',`f₂′=${F(2,'(x+2)²')}>0 para −1<x<0`],
 ['La derivada del último tramo también es positiva para x>0.','f₃′=2x+1/2>0'],
 ['En las uniones coinciden valores y derivadas; no hay saltos que inviertan el orden.','f(−1)=−1; f(0)=0; pendientes=2 y 1/2'],
 ['Las tres ramas se unen de forma creciente: la conclusión es global, no solo por tramos.','Creciente en ℝ; ningún intervalo decreciente'],
 ],{parameters:[2,-.5],firstSamples:[[-2,2],[-.5,8/9],[1,2.5]],globallyIncreasing:true})];
 if(c.index===323)return[
 mk(0,'Dominio ℝ∖{0}; continua en su dominio; no derivable en x=2.', ['Dominio ℝ; continua y derivable en todo ℝ.','Dominio ℝ∖{0}; discontinua en x=2.','Dominio ℝ∖{0}; continua y derivable en su dominio.'],['Ignorar el denominador x del primer tramo.','No comprobar que ambos valores en dos son 2.','Confundir continuidad con igualdad de derivadas laterales.'],[
 ['El primer tramo excluye cero; el segundo es polinómico.','D=ℝ∖{0}; f₁=4/x; f₂=x²−2x+2'],
 ['Calculamos límites y valor en la unión.','lim f(2⁻)=f(2)=2; lim f(2⁺)=4−4+2=2'],
 ['La función es continua en dos y en el resto de su dominio. En cero hay un polo.',`lim f(0⁻)=−∞; lim f(0⁺)=+∞`],
 ['Derivamos cada fórmula.',`f₁′=−${F(4,'x²')}; f₂′=2x−2`],
 ['Las pendientes laterales en dos son distintas.','f′(2⁻)=−1; f′(2⁺)=2 ⇒ no derivable en 2'],
 ['Concluimos respetando que cero no pertenece al dominio.','Continua en D; derivable en ℝ∖{0;2}'],
 ],{excluded:[0],join:2,value:2,slopes:[-1,2]}),
 mk(1,'Decrece en (0;2), crece en (2;+∞); curvatura hacia arriba en ambos intervalos.', ['Crece en (0;2), decrece en (2;+∞); curvatura hacia arriba en ambos intervalos.','Decrece en (0;2), crece en (2;+∞); curvatura hacia abajo en ambos intervalos.','Decrece en (0;2), crece en (2;+∞); hacia abajo en (0;2) y hacia arriba en (2;+∞).'],['Invertir los signos de la primera derivada.','Confundir el signo positivo de la segunda derivada.','Perder el signo positivo al derivar −4/x².'],[
 ['El apartado restringe el estudio a x>0. Separamos por la unión en dos.','Intervalos: (0;2) y (2;+∞)'],
 ['La derivada izquierda es negativa.',`f₁′=−${F(4,'x²')}<0`],
 ['La derivada derecha es positiva para x>2.','f₂′=2x−2>0'],
 ['Derivamos otra vez en cada tramo.',`f₁″=${F(8,'x³')}>0 para x>0; f₂″=2>0`],
 ['Ambas ramas se curvan hacia arriba. La esquina en dos no implica cambio de curvatura.','f(2)=2; f′(2⁻)=−1; f′(2⁺)=2'],
 ['Comprobamos signos en puntos de cada intervalo y concluimos.',`f′(1)=−4; f′(3)=4; f″(1)=8; f″(3)=2`],
 ],{firstSamples:[[1,-4],[3,4]],secondSamples:[[1,8],[3,2]],minimum:[2,2]})];
 if(c.index===404)return[
 mk(0,'a=48; b=3.',['a=48; b=−3.','a=39; b=1,5.','a=30; b=3.'],['Perder el signo de la derivada de 60/x.','Dividir dos veces la pendiente racional entre dos.','Olvidar los términos con b al imponer continuidad.'],[
 ['Cada fórmula es derivable en su tramo. Imponemos continuidad en dos.','f₁(2)=a−6b; lim f₂(2⁺)=30 ⇒ a−6b=30'],
 ['Derivamos cada expresión.',`f₁′=−2bx−b; f₂′=−${F(60,'x²')}`],
 ['Igualamos las pendientes laterales.','−5b=−15 ⇒ b=3'],
 ['Sustituimos en la condición de continuidad.','a−18=30 ⇒ a=48'],
 ['Comprobamos valores y pendientes.',`f(2)=30; f′(2⁻)=−15=f′(2⁺)`],
 ['El denominador del segundo tramo nunca se anula en x>2.','Continua y derivable en ℝ con a=48,b=3'],
 ],{parameters:[48,3],join:2,value:30,slopes:[-15,-15],wrongParameters:[[48,-3],[39,1.5],[30,3]]}),
 mk(1,`Crece en (−∞;−${F(1,2)}), decrece en (−${F(1,2)};+∞); máximo (−${F(1,2)};${F(195,4)}); no tiene mínimo.`,[
 `Crece en (−∞;${F(1,2)}), decrece en (${F(1,2)};+∞); máximo (${F(1,2)};${F(189,4)}); no tiene mínimo.`,
 `Decrece en (−∞;−${F(1,2)}), crece en (−${F(1,2)};+∞); mínimo (−${F(1,2)};${F(195,4)}); no tiene máximo.`,
 `Crece en (−∞;−${F(1,2)}), decrece en (−${F(1,2)};+∞); máximo (−${F(1,2)};48); no tiene mínimo.`],['Resolver −6x−3=0 con signo incorrecto.','Invertir el cambio de signo de la derivada.','Confundir f(0) con el valor en el vértice.'],[
 ['Fijamos a=48,b=3. En la primera rama tenemos una parábola hacia abajo.','f₁=−3x²−3x+48; f₂=60/x'],
 ['La derivada primera se anula en −1/2, que pertenece al tramo x≤2.',`−6x−3=0 ⇒ x=−${F(1,2)}`],
 ['El signo cambia de positivo a negativo, por lo que allí hay un máximo.',`f₁′>0 si x<−${F(1,2)}; f₁′<0 si −${F(1,2)}<x<2`],
 ['En x>2 la segunda rama sigue siendo decreciente; la unión es continua y derivable.',`f₂′=−${F(60,'x²')}<0; f(2)=30`],
 ['Calculamos el valor del máximo.',`f(−${F(1,2)})=−${F(3,4)}+${F(3,2)}+48=${F(195,4)}`],
 ['A la izquierda la función tiende a menos infinito, por lo que no tiene mínimo absoluto; no hay otro cambio de signo.','lim f(−∞)=−∞; lim f(+∞)=0; no hay mínimo relativo'],
 ],{parameters:[48,3],critical:-.5,maximum:[-.5,48.75],firstSamples:[[-1,3],[0,-3],[3,-20/3]],wrongCritical:.5})];
 if(c.index===431)return[
 mk(0,'Decrece en (0;1); crece en (1;2).',['Crece en (0;1); decrece en (1;2).','Decrece en (0;2); no crece.','Crece en (0;2); no decrece.'],['Invertir el signo de la derivada.','Omitir el cambio de signo en uno.','Omitir el tramo inicial decreciente.'],[
 ['La producción no puede ser negativa ni superar dos toneladas.','D=[0;2]; f=30−9x+6x²−x³'],
 ['Derivamos para estudiar el cambio de costes.','f′=−9+12x−3x²'],
 ['Factorizamos y localizamos raíces, respetando el dominio.','f′=−3(x−1)(x−3); raíces 1 y 3; solo 1∈[0;2]'],
 ['Comprobamos signos a ambos lados de uno.','f′(1/2)=−15/4<0; f′(3/2)=9/4>0'],
 ['Interpretamos el signo de la derivada dentro de la capacidad productiva.','Costes decrecientes en (0;1) y crecientes en (1;2)'],
 ],{domain:[0,2],criticalInside:[1],criticalExcluded:[3],firstSamples:[[.5,-3.75],[1.5,2.25]]}),
 mk(1,'1 tonelada; coste mínimo 26 000 euros.',['1 tonelada; coste mínimo 26 euros.','2 toneladas; coste mínimo 28 000 euros.','3 toneladas; coste mínimo 30 000 euros.'],['Olvidar que f se expresa en miles de euros.','Usar la capacidad máxima en lugar del mínimo.','Usar un punto crítico fuera del dominio permitido.'],[
 ['El mínimo absoluto en un intervalo cerrado se busca entre puntos críticos interiores y extremos.','Candidatos: x=0,1,2'],
 ['Evaluamos el extremo izquierdo.','f(0)=30'],
 ['Evaluamos el punto crítico admisible.','f(1)=30−9+6−1=26'],
 ['Evaluamos la capacidad máxima.','f(2)=30−18+24−8=28'],
 ['Comparamos y convertimos las unidades monetarias.','26<28<30; 26 miles de euros=26 000 euros; producción=1 tonelada'],
 ],{candidateValues:[[0,30],[1,26],[2,28]],minimum:[1,26],euros:26000}),
 mk(2,'0 toneladas; coste máximo 30 000 euros.',['2 toneladas; coste máximo 28 000 euros.','1 tonelada; coste máximo 26 000 euros.','3 toneladas; coste máximo 30 000 euros.'],['Suponer que mayor producción siempre implica mayor coste.','Intercambiar máximo y mínimo.','Admitir tres toneladas a pesar de la capacidad máxima de dos.'],[
 ['Usamos el dominio y la monotonía, sin extrapolar el modelo.','0≤x≤2'],
 ['En el primer tramo los costes bajan desde el extremo izquierdo.','f(0)=30; f(1)=26'],
 ['En el segundo tramo suben, pero solo llegan al valor del extremo derecho.','f(2)=28'],
 ['Comparamos los dos extremos que pueden dar máximo absoluto.','30>28 ⇒ x máximo=0'],
 ['Interpretamos el resultado y descartamos el otro punto crítico por inadmisible.','Coste máximo=30 000 euros sin producir; x=3 no pertenece al dominio'],
 ],{candidateValues:[[0,30],[1,26],[2,28]],maximum:[0,30],excluded:3,euros:30000})];
 if(c.index===494)return[
 mk(0,'a=18; b=7.',['a=−18; b=−7.','a=14; b=5.','a=8; b=2.'],['Cambiar signos en las ecuaciones del empalme.','Omitir una constante en la ecuación de continuidad.','Resolver solo la igualdad de pendientes.'],[
 ['La derivabilidad en −1 exige continuidad y pendientes laterales iguales.','f₁=(ax−12)/2; f₂=−x²+b(x−1)'],
 ['Calculamos los valores laterales.','lim f(−1⁻)=−a/2−6; f(−1)=−1−2b'],
 ['Igualamos para obtener la primera ecuación.','−a/2−6=−1−2b ⇒ −a+4b=10'],
 ['Derivamos y obtenemos la segunda ecuación.','f₁′=a/2; f₂′=−2x+b; a/2=2+b ⇒ a=4+2b'],
 ['Resolvemos por sustitución.','−(4+2b)+4b=10 ⇒ 2b=14 ⇒ b=7; a=18'],
 ['Comprobamos las dos condiciones.','valores: −15 y −15; pendientes: 9 y 9'],
 ],{parameters:[18,7],join:-1,value:-15,slopes:[9,9],wrongParameters:[[-18,-7],[14,5],[8,2]]}),
 mk(1,`y=${F(1,2)}x−6.`,[`y=${F(1,2)}x−7.`,`y=−${F(1,2)}x−8.`,'y=3x+4.'],['Confundir la ordenada de tangencia con el término independiente.','Cambiar el signo de la pendiente.','Usar la fórmula del tramo derecho en x=−2.'],[
 ['Este apartado fija a=1,b=−1. En x=−2 rige el tramo lineal izquierdo.','f₁=(x−12)/2=x/2−6'],
 ['Calculamos el punto de la curva.','f(−2)=−7; P=(−2;−7)'],
 ['Derivamos el tramo correcto.','f₁′=1/2'],
 ['Aplicamos la ecuación punto-pendiente.',`y+7=${F(1,2)}(x+2)`],
 ['Simplificamos. Una recta coincide con su tangente en cualquiera de sus puntos.',`y=${F(1,2)}x−6; y(−2)=−7`],
 ],{parameters:[1,-1],point:[-2,-7],line:[.5,-6],wrongLines:[[.5,-7],[-.5,-8],[3,4]]})];
 throw Error('Unreviewed official join case');
}
export function buildJoinsBatch(id='batch-0324',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic='Derivadas';x.secondaryTopics=i===431?['Optimización','Monotonía']:['Continuidad','Derivabilidad'];if([146,275,323,404].includes(i))x.secondaryTopics.push('Monotonía');x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='ALL_OFFICIAL_SUBPARTS_WITH_PARAMETER_RESET_AND_DOMAIN_CHECKS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildJoinsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0324-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0324.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
