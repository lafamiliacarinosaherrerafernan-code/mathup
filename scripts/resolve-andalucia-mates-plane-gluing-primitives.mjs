import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[705,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',2,'NONE.4','11698abf4f994fb1982eb63f6f9f0230a4fc4f4c2a4eeb7bdb8ebf5af0cb7811',0],
[706,'8989ece1dc4d1fafd724f1b38fa92b3d562a6ca1c4bd9a7b6ffd8a1b75f129f0',2,'NONE.7','47add2d5a3f7d695fb26cd49c5a8c963a734bf2527dda0514cdf460da5f24f3a',0],
[707,'95771746eae60ab5a61f193ea7de9fe116e865cd0c5989fdcc4b32368976ce77',2,'NONE.8','3e58d131eb0533f38b4a0301676328f887cdfed4e5a16da8353350eb0446f904',0],
[709,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',2,'NONE.2','4fbd959601a729b2eb43ec7293141ce3f19d6387342102372bc07487dcf863a9',0],
[710,'c5a19b8d41952be5e070bc6d9a83948f6dc8e1eb323dd5b6a57f0e88559b9db3',1,'A.2','7315d29ccb4d903de78516eb658ab7adad47219eaf9b3d62fadcf7631b7d328b',0],
[711,'c95299b52a2839f37e519705043c878b537f7681781d4f2a6ac0463e2fc0e808',2,'NONE.4.1','2ba80cf00979fbf92c12e8930eda9b22b95890b5e7304b659102894049ce35da',0],
[712,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',1,'NONE.3','b94bd7b2cb29c9b6d7a6223b64fb752adec51be5c43d561e399ccb905fe171ae',0],
[713,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',2,'NONE.1','c1500d3c66a98c8399ade13113a1784988a9334478c4fbe53f2fd335e9cdea28',0]];
export const statements={
705:'Considera el plano π definido por 2x−y+nz=0 y la recta r dada por frac{x−1}{m}=frac{y}{4}=frac{z−1}{2}, con m≠0.\na) Calcula m y n para que la recta r sea perpendicular al plano π.\nb) Calcula m y n para que la recta r esté contenida en el plano π.',
706:'Considera el plano π≡x+y+z=0 y la recta r≡system{x=λ;y=1−λ;z=0}.\na) Determina la ecuación del plano perpendicular a π que contiene a r.\nb) Calcula la distancia entre r y π.',
707:'Considera el plano π≡2x−y+z−3=0, la recta r≡system{x=3+λ;y=1−2λ;z=−2−λ} y el punto P(1,1,2).\na) Determina la ecuación general del plano perpendicular a π, paralelo a r y que pasa por el punto P.\nb) Calcula el punto simétrico de P respecto de la recta r.',
709:'Sea f la función definida por f(x)=frac{x²+1}{x²(x−1)} para x≠0 y x≠1 y sea F la primitiva de f cuya gráfica pasa por el punto P(2,ln(2)) (ln denota logaritmo neperiano).\na) Calcula la recta tangente a la gráfica de F en el punto P.\nb) Determina la función F.',
710:'Considera la función continua f definida por\nf(x)=cases{frac{x cos(x)−a sen(x)}{x³}, si x<0;b cos(x)−1, si x≥0}.\nCalcula a y b.',
711:'Dadas las matrices A=matrix{1,0,1;−1,2,0;0,1,1}, B=matrix{−1;2;3} y C=(1,4,2), calcula la matriz X que satisface X−2C=Bᵗ+XA.',
712:'Considera el siguiente sistema de ecuaciones\nsystem{x−y+mz=0;mx+2y+z=0;−x+y+2mz=0}.\na) Halla los valores del parámetro m para los que el sistema tiene una única solución.\nb) Halla los valores del parámetro m para los que el sistema tiene alguna solución distinta de la solución nula.\nc) Resuelve el sistema para m=−2.',
713:'Sea f:[frac{1}{e},4]→ℝ la función definida por\nf(x)=cases{x−ln(x)+a, si frac{1}{e}≤x≤2;bx+1−ln(2), si 2<x≤4}, donde ln denota la función logaritmo neperiano.\na) Calcula los valores de a y b para que f sea derivable en el intervalo (frac{1}{e},4).\nb) Para a=0 y b=frac{1}{2} halla los extremos absolutos de f (abscisas donde se obtienen y valores que se alcanzan).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PLANE_GLUING_PRIMITIVES_LAYOUT']]:[];
export const cases=[{index:705,slot:4,literals:['2x − y + nz = 0','perpendicular']},{index:706,slot:4,literals:['x + y + z = 0','y = 1 − λ']},{index:707,slot:4,literals:['2x − y + z − 3 = 0','P (1, 1, 2)']},{index:709,slot:3,literals:['P (2, ln (2))','primitiva']},{index:710,slot:2,literals:['x cos(x) − a sen(x)','b cos(x) − 1']},{index:711,slot:1,literals:['X − 2C = Bt + XA','(1 4 2)']},{index:712,slot:1,literals:['mx + 2y + z = 0','m = −2']},{index:713,slot:2,literals:['x − ln(x) + a','bx + 1 − ln(2)']}];
export const proof=c=>({
705:{P:[1,0,1],perpendicular:{m:-8,n:-.5},contained:{m:4,n:-2}},
706:{normal:[1,1,1],P:[0,1,0],direction:[1,-1,0],plane:[1,1,-2,-1],distance:1/Math.sqrt(3)},
707:{normal:[2,-1,1],R:[3,1,-2],direction:[1,-2,-1],P:[1,1,2],plane:[1,1,-1,0],projectionParameter:-1,H:[2,3,-1],reflected:[3,5,-4]},
709:{numerator:[1,0,1],denominator:[0,0,-1,1],fractionCoefficients:[-1,-1,2],tangentSlope:5/4,component:'(1,+infinity)',componentConstant:2*Math.log(2)-.5,otherComponentConstants:'free'},
710:{a:1,b:2/3,leftLimit:-1/3},
711:{A:[[1,0,1],[-1,2,0],[0,1,1]],B:[-1,2,3],C:[1,4,2],X:[-7,1,-11]},
712:{determinantCoefficients:[0,6,3],singular:[0,-2],kernelAtMinusTwo:[1,1,0]},
713:{a:0,b:.5,join:2,minimum:[1,1],maximum:[4,3-Math.log(2)],endpointValues:[1+1/Math.E,3-Math.log(2)]}
}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_PROJECTION_RANK_LIMIT_AND_PRIMITIVE_CHECK',proof(c));switch(c.index){
case 705:return[mk(0,'m=−8, n=−frac{1}{2}.',['m=8, n=frac{1}{2}.','m=−8, n=−2.','m=4, n=−2.'],['Ignorar el signo negativo de la segunda componente normal.','Confundir el cociente de proporcionalidad al despejar n.','Aplicar la condición de contención en vez de perpendicularidad.'],[
['Leemos un punto y un vector director de la recta y la normal del plano.','P=(1,0,1); d=(m,4,2); N=(2,−1,n)'],
['Una recta perpendicular a un plano tiene dirección paralela a su normal, no ortogonal a ella.','d=kN ⇒ m=2k; 4=−k; 2=kn'],
['La segunda componente fija el factor de proporcionalidad.','4=−k ⇒ k=−4'],
['Sustituimos en las otras componentes y comprobamos la restricción m≠0.','m=−8≠0; 2=−4n ⇒ n=−frac{1}{2}'],
['Presentamos ambos parámetros, necesarios para definir la configuración.','(m,n)=(−8,−frac{1}{2})'],
['Verificamos componente a componente la proporcionalidad.','(−8,4,2)=−4(2,−1,−frac{1}{2})'],
]),mk(1,'m=4, n=−2.',['m=4, n=2.','m=−4, n=−2.','m=2, n=−2.'],['Cambiar el signo al imponer que el punto de paso pertenezca al plano.','Cambiar el signo de m en la ortogonalidad.','Omitir la contribución de la tercera componente del vector director.'],[
['La contención de una recta requiere dos condiciones: punto en el plano y dirección paralela a él.','N·P=0; N·d=0'],
['Imponemos que P=(1,0,1) satisfaga la ecuación del plano.','2·1−0+n·1=0 ⇒ n=−2'],
['Imponemos que la normal sea ortogonal al vector director.','(2,−1,n)·(m,4,2)=2m−4+2n=0'],
['Sustituimos n=−2 para obtener m.','2m−4−4=0 ⇒ m=4≠0'],
['La recta resultante y el plano permiten una comprobación para todo parámetro.','r(t)=(1+4t,4t,1+2t); π:2x−y−2z=0'],
['Sustituimos la recta completa, mostrando que no solo un punto pertenece al plano.','2(1+4t)−4t−2(1+2t)=0 para todo t∈ℝ'],
])];
case 706:return[mk(0,'x+y−2z−1=0.',['x+y−2z+1=0.','x+y+z−1=0.','x−y−1=0.'],['Cambiar el término independiente al usar el punto de paso.','Construir un plano paralelo al dado en lugar de perpendicular.','Usar una normal que no es ortogonal a la dirección de la recta.'],[
['La recta tiene un punto y una dirección leídos directamente de su parametrización.','P=(0,1,0); d=(1,−1,0); n_π=(1,1,1)'],
['La normal del plano buscado debe ser perpendicular a d para contener r y perpendicular a n_π para formar noventa grados con π.','N·d=0; N·n_π=0'],
['Un producto vectorial no nulo satisface ambas condiciones.','N=d×n_π=(−1,−1,2); usamos (1,1,−2)'],
['Aplicamos la ecuación punto-normal pasando por P.','x+(y−1)−2z=0'],
['Simplificamos para obtener la ecuación general.','x+y−2z−1=0'],
['Verificamos toda la recta y el ángulo entre planos.','λ+(1−λ)−0−1=0; (1,1,−2)·(1,1,1)=0'],
]),mk(1,'d(r,π)=frac{1}{√3}.',['d(r,π)=1.','d(r,π)=√3.','d(r,π)=0.'],['Olvidar dividir por el módulo de la normal.','Multiplicar por el módulo de la normal en lugar de dividir.','Confundir recta paralela al plano con recta contenida en él.'],[
['Calculamos la relación entre dirección y normal para decidir si la distancia puede ser positiva.','d·n_π=(1,−1,0)·(1,1,1)=0 ⇒ r paralela a π'],
['En cualquier punto de r, la suma de coordenadas es uno, no cero.','x+y+z=λ+(1−λ)+0=1 ⇒ r no contenida en π'],
['La distancia constante entre recta y plano coincide con la de cualquiera de sus puntos.','d(r,π)=d(P,π), P=(0,1,0)'],
['Aplicamos la fórmula punto-plano.','d(P,π)=frac{|0+1+0|}{√(1²+1²+1²)}'],
['Simplificamos sin confundir el numerador con la distancia.','d(r,π)=frac{1}{√3}'],
['Comprobamos con el pie de perpendicular: P−n_π/3 pertenece a π y su distancia a P es la obtenida.','H=(−frac{1}{3},frac{2}{3},−frac{1}{3}); H∈π; ‖P−H‖=frac{1}{√3}'],
])];
case 707:return[mk(0,'x+y−z=0.',['x+y+z−4=0.','x+y−z−1=0.','2x−y+z−3=0.'],['Cambiar el signo de la tercera componente de la normal.','Introducir un término independiente que no permite pasar por P.','Usar el propio plano π en lugar de uno perpendicular.'],[
['Identificamos los dos vectores a los que debe ser perpendicular la normal buscada.','n_π=(2,−1,1); d_r=(1,−2,−1)'],
['El plano debe ser perpendicular a π y paralelo a r; su normal es ortogonal a ambos vectores.','N·n_π=0; N·d_r=0'],
['Calculamos el producto vectorial y lo simplificamos.','n_π×d_r=(3,3,−3) ⇒ N=(1,1,−1)'],
['La condición de pasar por P fija la constante.','(x−1)+(y−1)−(z−2)=0'],
['Obtenemos la ecuación general solicitada.','x+y−z=0'],
['Comprobamos las tres condiciones originales de manera independiente.','1+1−2=0; N·n_π=2−1−1=0; N·d_r=1−2+1=0'],
]),mk(1,'P′=(3,5,−4).',['P′=(2,3,−1).','P′=(−3,−5,4).','P′=(5,1,−6).'],['Dar el pie de la perpendicular como si fuera el punto simétrico.','Cambiar el orden en 2H−P.','Reflejar respecto a un punto arbitrario de r, no respecto al pie de perpendicular.'],[
['El pie H es la proyección ortogonal de P sobre la recta, cuyo punto base es R.','R=(3,1,−2); d=(1,−2,−1); H=R+td'],
['La perpendicularidad de PH con r determina el parámetro de proyección.','t=frac{(P−R)·d}{d·d}=frac{(−2,0,4)·(1,−2,−1)}{6}'],
['Calculamos t y el punto H.','t=frac{−6}{6}=−1 ⇒ H=(2,3,−1)'],
['H debe ser el punto medio del segmento que une P con su simétrico.','P′=2H−P'],
['Operamos en cada coordenada.','P′=(4−1,6−1,−2−2)=(3,5,−4)'],
['Verificamos el punto medio y que el segmento es perpendicular al eje de simetría.','frac{P+P′}{2}=H∈r; (P−H)·d=(−1,−2,3)·(1,−2,−1)=0'],
])];
case 709:return[mk(0,'y−ln(2)=frac{5}{4}(x−2).',['y−ln(2)=frac{9}{2}(x−2).','y−ln(2)=−frac{5}{4}(x−2).','y−ln(2)=frac{4}{5}(x−2).'],['Leer el orden de los exponentes de la extracción plana, no la fracción del PDF oficial.','Cambiar el signo de la derivada sin fundamento.','Usar la inversa de la pendiente de la tangente.'],[
['La fracción oficial es (x²+1)/(x²(x−1)); F es una primitiva de esa función.','F′(x)=f(x)=frac{x²+1}{x²(x−1)}'],
['La pendiente de la tangente a F en P es F′(2), no f′(2).','m=F′(2)=f(2)'],
['Sustituimos en numerador y denominador completos.','m=frac{2²+1}{2²(2−1)}=frac{5}{4}'],
['La ordenada del punto viene dada por el enunciado.','P=(2,ln(2))'],
['Escribimos la recta usando la forma punto-pendiente.','y−ln(2)=frac{5}{4}(x−2)'],
['Verificamos que pasa por P y tiene la pendiente de F.','x=2 ⇒ y=ln(2); pendiente=frac{5}{4}=F′(2)'],
]),mk(1,'F(x)=−ln|x|+frac{1}{x}+2ln|x−1|+C_I; C_(1,+∞)=2ln(2)−frac{1}{2}; en los otros intervalos C_I es libre.',['F(x)=−ln|x|−frac{1}{x}+2ln|x−1|+C_I; C_(1,+∞)=2ln(2)+frac{1}{2}; en los otros intervalos C_I es libre.','F(x)=−ln|x|+frac{1}{x}+ln|x−1|+C_I; C_(1,+∞)=2ln(2)−frac{1}{2}; en los otros intervalos C_I es libre.','F(x)=−ln|x|+frac{1}{x}+2ln|x−1|+C_I; C_(1,+∞)=2ln(2)+frac{1}{2}; en los otros intervalos C_I es libre.'],['Integrar −1/x² con el signo incorrecto, aunque se ajuste el paso por P.','Perder un factor de la fracción simple 2/(x−1).','Ajustar incorrectamente la constante del intervalo que contiene P.'],[
['El denominador se factoriza y el cociente es propio; descomponemos en fracciones simples.','frac{x²+1}{x²(x−1)}=frac{A}{x}+frac{B}{x²}+frac{C}{x−1}'],
['Multiplicamos por el denominador y comparamos coeficientes.','x²+1=A x(x−1)+B(x−1)+Cx² ⇒ −B=1; −A+B=0; A+C=1 ⇒ A=−1,B=−1,C=2'],
['Integramos término a término en cada intervalo del dominio.','F(x)=−ln|x|+frac{1}{x}+2ln|x−1|+C_I'],
['El dato P pertenece al intervalo (1,+∞) y fija únicamente su constante de integración.','F(2)=−ln(2)+frac{1}{2}+C_(1,+∞)=ln(2) ⇒ C_(1,+∞)=2ln(2)−frac{1}{2}'],
['En (1,+∞) queda determinada F; en (−∞,0) y (0,1) el dato no fija las constantes, porque el dominio está desconectado.','x>1: F(x)=−ln(x)+frac{1}{x}+2ln(x−1)+2ln(2)−frac{1}{2}'],
['Comprobamos derivada y valor inicial sin imponer conexiones inexistentes a través de los puntos excluidos.','F′=−frac{1}{x}−frac{1}{x²}+frac{2}{x−1}=frac{x²+1}{x²(x−1)}; F(2)=ln(2)'],
])];
case 710:return[mk(0,'a=1, b=frac{2}{3}.',['a=1, b=frac{4}{3}.','a=1, b=−frac{1}{3}.','a=−1, b=frac{2}{3}.'],['Cambiar el signo del límite del cociente.','Igualar b al límite sin tener en cuenta el término −1.','Cambiar el signo al cancelar el término lineal del numerador.'],[
['Cada rama es continua en su intervalo; solo debemos comprobar la unión en cero.','f(0)=b cos(0)−1=b−1'],
['Si el límite izquierdo es finito, multiplicarlo por x² debe dar cero. Calculamos ese producto directamente.','lim_{x→0⁻} x²f(x)=lim_{x→0⁻}(cos x−a frac{sen x}{x})=1−a ⇒ a=1'],
['Con a=1 el cociente es 0/0 y puede aplicarse L’Hôpital.','lim_{x→0⁻} frac{x cos x−sen x}{x³}=lim_{x→0⁻} frac{−x sen x}{3x²}'],
['Simplificamos el nuevo cociente usando el límite trigonométrico fundamental.','lim_{x→0⁻} −frac{sen x}{3x}=−frac{1}{3}'],
['Imponemos continuidad con la rama que incluye cero.','b−1=−frac{1}{3} ⇒ b=frac{2}{3}'],
['Ambas ramas coinciden en su límite y en el valor asignado en cero; las condiciones también muestran unicidad.','lim_{x→0⁻} f(x)=f(0)=lim_{x→0⁺} f(x)=−frac{1}{3}; (a,b)=(1,frac{2}{3})'],
])];
case 711:return[mk(0,'X=(−7,1,−11).',['X=(1,−3,−3).','X=(7,−1,11).','X=(−7,1,11).'],['Pasar −2C al otro miembro restando en lugar de sumarlo.','Cambiar el signo de I−A en la ecuación factorizada.','Cambiar el signo al despejar la última entrada de X.'],[
['X es una fila de tres entradas; no podemos cambiar el orden de los productos matriciales.','X−XA=Bᵗ+2C ⇒ X(I−A)=Bᵗ+2C'],
['Calculamos la matriz y la fila del segundo miembro.','I−A=matrix{0,0,−1;1,−1,0;0,−1,0}; Bᵗ+2C=(−1,2,3)+(2,8,4)=(1,10,7)'],
['Escribimos X=(u,v,w) y multiplicamos por columnas.','X(I−A)=(v,−v−w,−u)'],
['Igualamos las tres componentes y resolvemos sin invertir el orden matricial.','v=1; −1−w=10 ⇒ w=−11; −u=7 ⇒ u=−7'],
['Reunimos las entradas y verificamos que la matriz a invertir es no singular.','X=(−7,1,−11); det(I−A)=1≠0'],
['Comprobamos la ecuación original: ambos miembros son la misma fila.','X−2C=(−9,−7,−15); XA=(−8,−9,−18); Bᵗ+XA=(−9,−7,−15)'],
])];
case 712:return[mk(0,'El sistema tiene solución única si y solo si m∉{0,−2}.',['El sistema tiene solución única si y solo si m∉{0,2}.','El sistema tiene solución única si y solo si m≠0.','El sistema tiene solución única si y solo si m∈{0,−2}.'],['Cambiar el signo de una raíz del determinante.','Omitir el factor m+2.','Invertir la condición de determinante no nulo.'],[
['El sistema es homogéneo y cuadrado; la solución única, cuando exista, será la nula.','A=matrix{1,−1,m;m,2,1;−1,1,2m}; b=0'],
['Sumamos la primera fila a la tercera, operación que no cambia el determinante.','F₃←F₃+F₁ ⇒ F₃=(0,0,3m)'],
['Expandimos por la nueva tercera fila.','det A=3m·det[[1,−1],[m,2]]=3m(m+2)'],
['La invertibilidad requiere que ambos factores variables sean distintos de cero.','det A≠0 ⇔ m≠0 y m≠−2'],
['Aplicamos la equivalencia entre matriz invertible y sistema homogéneo con solución única.','m∉{0,−2} ⇒ única solución (0,0,0)'],
['Comprobamos que en los dos valores excluidos hay un menor de orden dos no nulo pero determinante cero.','m=0:det[[1,−1],[0,2]]=2; m=−2:det[[1,−2],[−2,1]]=−3 ⇒ rango 2'],
]),mk(1,'Existen soluciones no nulas si y solo si m∈{0,−2}.',['Existen soluciones no nulas si y solo si m∈{0,2}.','Existen soluciones no nulas si y solo si m=−2.','Existen soluciones no nulas si y solo si m∉{0,−2}.'],['Cambiar el signo de la raíz distinta de cero.','Omitir el valor m=0 al discutir la singularidad.','Confundir núcleo no trivial con matriz invertible.'],[
['Un sistema homogéneo siempre admite la solución cero, independientemente del parámetro.','A·0=0'],
['Para admitir otras soluciones su núcleo debe tener dimensión positiva.','dim ker A=3−rg A>0 ⇔ det A=0'],
['Usamos el determinante calculado sin cambiar el término independiente nulo.','3m(m+2)=0 ⇒ m=0 o m=−2'],
['Para m=0 encontramos una solución no nula por sustitución.','(x,y,z)=(1,1,−2) ⇒ x−y=0; 2y+z=0; −x+y=0'],
['Para m=−2 también exhibimos una solución no nula.','(x,y,z)=(1,1,0) ⇒ x−y−2z=0; −2x+2y+z=0; −x+y−4z=0'],
['Fuera de esos valores la matriz es invertible y su núcleo es trivial, de modo que no hay más casos.','soluciones no nulas ⇔ m∈{0,−2}'],
]),mk(2,'(x,y,z)=(t,t,0), t∈ℝ.',['(x,y,z)=(t,−t,0), t∈ℝ.','(x,y,z)=(t,t,−2t), t∈ℝ.','(x,y,z)=(0,t,t), t∈ℝ.'],['Cambiar el signo al despejar y.','Usar la familia correspondiente a m=0.','Elegir como libre una variable que las ecuaciones fijan.'],[
['Sustituimos el valor del parámetro en las tres ecuaciones oficiales.','x−y−2z=0; −2x+2y+z=0; −x+y−4z=0'],
['Sumamos primera y tercera ecuación para eliminar x e y.','−6z=0 ⇒ z=0'],
['La primera ecuación determina la relación entre las otras dos incógnitas.','x−y=0 ⇒ x=y'],
['Elegimos x como parámetro y describimos todas las soluciones.','x=t; y=t; z=0; t∈ℝ'],
['La segunda ecuación no añade otra condición.','−2t+2t+0=0'],
['Comprobamos también la tercera y presentamos el conjunto completo.','−t+t−0=0 ⇒ (x,y,z)=(t,t,0), t∈ℝ'],
])];
case 713:return[mk(0,'a=0, b=frac{1}{2}.',['a=1, b=1.','a=1, b=frac{1}{2}.','a=0, b=−frac{1}{2}.'],['Usar derivada uno en la rama logarítmica e imponer solo continuidad.','Olvidar el término constante uno al igualar las ramas.','Cambiar el signo de la derivada derecha.'],[
['Las ramas son derivables dentro de sus intervalos; el único punto de unión interior es x=2.','f₋(x)=x−ln x+a; f₊(x)=bx+1−ln2'],
['La derivabilidad exige primero continuidad en ese punto.','2−ln2+a=2b+1−ln2 ⇒ a=2b−1'],
['Derivamos cada rama respetando la derivada del logaritmo.','f′₋(x)=1−frac{1}{x}; f′₊(x)=b'],
['Igualamos las derivadas laterales en dos.','1−frac{1}{2}=b ⇒ b=frac{1}{2}'],
['Sustituimos en la condición de continuidad.','a=2·frac{1}{2}−1=0'],
['Comprobamos ambas condiciones; así la unión no presenta salto ni esquina.','f₋(2)=f₊(2)=2−ln2; f′₋(2)=f′₊(2)=frac{1}{2}'],
]),mk(1,'Mínimo absoluto (1,1); máximo absoluto (4,3−ln2).',['Mínimo absoluto (2,2−ln2); máximo absoluto (4,3−ln2).','Mínimo absoluto (1,1); máximo absoluto (frac{1}{e},1+frac{1}{e}).','Mínimo absoluto (1,1); máximo absoluto (4,3+ln2).'],['Confundir el punto de unión con el punto crítico.','Comparar solo los extremos de la primera rama y omitir x=4.','Cambiar el signo del logaritmo al evaluar la segunda rama.'],[
['Con a=0 y b=1/2, f es continua en el intervalo cerrado [1/e,4]; por tanto alcanza extremos absolutos.','f=x−ln x en [frac{1}{e},2]; f=frac{x}{2}+1−ln2 en (2,4]'],
['Localizamos los puntos críticos de cada rama.','f′=1−frac{1}{x}=0 ⇒ x=1; en (2,4), f′=frac{1}{2}>0'],
['El signo de la derivada muestra descenso hasta uno y crecimiento desde uno hasta cuatro, incluida la unión.','f′<0 en (frac{1}{e},1); f′>0 en (1,2) y (2,4)'],
['Evaluamos el crítico, los extremos del dominio y el punto de unión.','f(1)=1; f(frac{1}{e})=1+frac{1}{e}; f(2)=2−ln2; f(4)=3−ln2'],
['Comparamos sin olvidar ninguna rama: el mayor valor está en cuatro y el menor en uno.','1<2−ln2≈1,30685<1+frac{1}{e}≈1,36788<3−ln2≈2,30685'],
['Expresamos abscisas y valores, no solo uno de los dos datos.','mínimo absoluto (1,1); máximo absoluto (4,3−ln2)'],
])];
default:throw Error('Unknown plane/gluing/primitives case');}}
export function buildPlaneGluingPrimitivesBatch(id='batch-0435',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===4?'Propiedades métricas':c.slot===3?'Integrales indefinidas':'Continuidad y derivabilidad';x.secondaryTopics=c.index===711?['Matrices']:c.index===709?['Aplicaciones de la derivada']:c.index===713?['Extremos absolutos']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'NATIVE_EQUATION_POINT_PROJECTION_LIMIT_AND_INTEGRATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPlaneGluingPrimitivesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0435-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0435.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
