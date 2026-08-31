import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[603,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',2,'NONE.1','516e1076b987f59f91c42fc608fc60539463d6c1bb0343b9e48fd71d65e00b05',0],
[606,'1ae1a1173683cbcf7a9e46bb22d7f4a8de35f57e67ec4beb8bc11283c1ceb2c5',2,'NONE.4','af71568db1c71eecc336ecf79cfaa22af0c65866a466425aee25f16be9f1b326',0],
[607,'2e7f18e72d9070431873805beca2a6b861457bf0e1d4979e0b6f18700fa4e2ce',1,'A.3','4caa4966ae057b87852a90348ef2a05d5a6747ff6f01db9f6fd3ac8e12cf92b6',0],
[609,'a6eb3a790229e9010e2add3d5742fe55ab4447f4ebec72a4c01d131f0baf4d92',2,'B.5','d6b9af6e5a647eb5d619eff2951ea0af9bdb292819c5bf666ad93032f1464e71',0],
[611,'4aa4c2d71811ca346af7cfd770227925f526cbe73dfa4a591abc027bcfca6884',2,'NONE.5','b86d627ca03e0583de2a31229a21af0a90b024435c0b294645545294fc8ddf7d',0],
[613,'2e7f18e72d9070431873805beca2a6b861457bf0e1d4979e0b6f18700fa4e2ce',1,'A.1','4caa4966ae057b87852a90348ef2a05d5a6747ff6f01db9f6fd3ac8e12cf92b6',0],
[614,'fa36bff09b716e230868383c340dc64dc6faee802bb9b180a54b61bff0c9c1f9',2,'B.1','e264664107b4b9fa1e379b453f3c171ef48714ae7a7725e6bf6335ec2270413a',0],
[617,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',1,'NONE.2','c331cbf52a49431b3024207087d67ebf0bce4c2b455f7ac3cb0871dc10f2fae7',0],
[618,'62a1d9074de55299d71cdeb9a0ce1c0bd8d749e8b1baa30fb379ef400b4e7387',2,'B.1','be9006d94f1e72d993bb2c379ea1dfb08ecc89ffc651ec8d398eff5317e6e167',0],
[619,'280faba61b350012aff8fac9e612d9e50230e298431f9b0a7bb50bb626f4ff94',1,'B.3','bec1ac18c3ac4538d5549d136b727f109121d1ff73af9db93e7bf0d18f3d8ec7',0],
[623,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',2,'NONE.5','bab157fb56c16683a5f829e392cfd8b433ff05dc0ae2a2ad1c831a2d742346d1',0]];
export const statements={
603:'Sea la función f definida por f(x)=frac{e^(−x)}{1−x} para x≠1.\na) Estudia las asíntotas de la gráfica de la función f.\nb) Halla los extremos relativos (abscisas donde se obtienen y valores que se alcanzan) y los intervalos de crecimiento y de decrecimiento de f.',
606:'Considera el plano π de ecuación 2x+y−z+2=0, y la recta r de ecuación frac{x−5}{−2}=y=frac{z−6}{−3}.\na) Determina la posición relativa de π y r.\nb) Halla la ecuación general del plano que contiene a r y es perpendicular a π.\nc) Halla las ecuaciones paramétricas del plano paralelo a π que contiene a r.',
607:'Considera la función f(x)=cases{x·sen(2x), x≤0;cos(πx)−1, x>0}.\nCalcula ∫_{−π/4}^{1} f(x) dx.',
609:'Considera el sistema de ecuaciones lineales\nsystem{ax+y+z=1+a;x+2y−z=1−a;x+(1+a)y−az=0}.\na) Calcula a para que el sistema sea compatible indeterminado.\nb) Resuelve el sistema, si es posible, para a=0.',
611:'Considera la matriz A=matrix{2,0,2;−1,2,1;0,1,4}.\na) Estudia, según los valores de λ, el rango de la matriz A−λI, siendo I la matriz identidad de orden tres.\nb) Resuelve el sistema (A−I)·matrix{x;y;z}=matrix{0;0;0} y halla, si existe, una solución en la que x=2.',
613:'Considera la función f:ℝ→ℝ definida por f(x)=(x−1)e^x.\na) Determina la ecuación de la recta tangente y la ecuación de la recta normal a la gráfica de f en el punto de inflexión.\nb) Estudia y calcula las asíntotas de la función.',
614:'Considera la función f definida por f(x)=frac{ax+b}{cx+1} para cx+1≠0. Determina a, b y c sabiendo que la recta x=−1 es una asíntota vertical a la gráfica de f y que y=2x+4 es la recta tangente a la gráfica de f en el punto de abscisa x=1.',
617:'Calcula ∫_{0}^{π²} sen(√x) dx.\nSugerencia: Efectúa el cambio √x=t.',
618:'Calcula lim_{x→0}(frac{1}{x}−frac{cos x}{sen x}).',
619:'Sea la función f:(−1,1)→ℝ definida por f(x)=frac{1+|x|}{1−|x|}.\na) Estudia la derivabilidad de f.\nb) Halla los intervalos de crecimiento y de decrecimiento de f.',
623:'Considera el siguiente sistema de ecuaciones lineales\nsystem{mx+2y−z=1;5x−4y+2z=0;x+3my=m+frac{2}{5}}.\na) Discute el sistema según los valores de m.\nb) Resuelve el sistema para m=0. ¿Hay alguna solución en la que x=0? En caso afirmativo, calcúlala. En caso negativo, justifica la respuesta.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SOURCE_CALCULUS_RANKS_LAYOUT']]:[];
export const cases=[{index:603,slot:2,literals:['extremos relativos','1 − x']},{index:606,slot:4,literals:['2x + y − z + 2','perpendicular']},{index:607,slot:3,literals:['sen(2x)','cos(πx)']},{index:609,slot:1,literals:['compatible indeterminado','1 − a']},{index:611,slot:1,literals:['A − λI','x = 2']},{index:613,slot:2,literals:['punto de inflexión','(x − 1)']},{index:614,slot:2,literals:['cx + 1','2 x + 4']},{index:617,slot:3,literals:['Sugerencia','sen(']},{index:618,slot:2,literals:['sen x']},{index:619,slot:2,literals:['derivabilidad','|x|']},{index:623,slot:1,literals:['m = 0','x = 0']}];
export const proof=c=>({603:{criticalPoint:[0,1],vertical:1,horizontal:0},606:{P:[5,0,6],d:[-2,1,-3],n:[2,1,-1],perpendicular:[1,-4,-2,7],parallel:[2,1,-1,-4]},607:{left:.25,right:-1,total:-.75},609:{roots:[1,2],infiniteAt:1,solutionAtZero:[-1,1,0]},611:{roots:[1,3,4],alwaysNonzeroMinor:-1,direction:[-2,-3,1],specific:[2,3,-1]},613:{inflexion:[-1,-2/Math.E],tangent:[-1/Math.E,-3/Math.E],normal:[Math.E,Math.E-2/Math.E]},614:{parameters:[10,2,1],ordinate:6,slope:2},617:{integral:2*Math.PI},618:{limit:0},619:{leftSlope:-2,rightSlope:2},623:{roots:[0,-2.5],infiniteAt:0,fixedX:.4}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_CALCULUS_RANK_AND_SUBSTITUTION',proof(c));switch(c.index){
case 603:return[mk(0,'Asíntota vertical x=1; horizontal y=0 solo cuando x→+∞; ninguna oblicua.',['Asíntota vertical x=1; horizontal y=0 en ambos infinitos; ninguna oblicua.','Asíntota vertical x=−1; horizontal y=0 solo cuando x→+∞; ninguna oblicua.','Asíntota vertical x=1; ninguna horizontal; oblicua y=−x.'],['Suponer que la exponencial decrece también hacia menos infinito.','Cambiar el signo del cero del denominador.','Aplicar una división de polinomios a una función exponencial.'],[
['El denominador se anula en uno y el numerador allí no se anula.','1−x=0 ⇒ x=1; e^(−1)>0'],
['Calculamos ambos límites laterales para confirmar la asíntota vertical.','lim_{x→1⁻} f(x)=+∞; lim_{x→1⁺} f(x)=−∞'],
['Hacia más infinito el numerador tiende a cero y el denominador es negativo de módulo creciente.','lim_{x→+∞} frac{e^(−x)}{1−x}=0 ⇒ y=0'],
['Hacia menos infinito escribimos t=−x; la exponencial crece más deprisa que el denominador.','lim_{t→+∞} frac{e^t}{1+t}=+∞'],
['Para una asíntota oblicua se exige pendiente finita y distinta de cero.','lim_{x→+∞} frac{f(x)}{x}=0; lim_{x→−∞} frac{f(x)}{x}=−∞'],
['Solo quedan las dos asíntotas acreditadas, cada una con el ámbito indicado.','vertical: x=1; horizontal en +∞: y=0'],
]),mk(1,'Mínimo relativo en (0,1); no hay máximos; decrece en (−∞,0), crece en (0,1) y (1,+∞).',['Máximo relativo en (0,1); no hay mínimos; crece en (−∞,0), decrece en (0,1) y (1,+∞).','Mínimo relativo en (1,0); no hay máximos; decrece en (−∞,1), crece en (1,+∞).','Mínimo relativo en (0,−1); no hay máximos; decrece en (−∞,0), crece en (0,1) y (1,+∞).'],['Cambiar el signo de la regla del cociente.','Tratar la discontinuidad como punto crítico del dominio.','Cambiar el signo al evaluar f(0).'],[
['Derivamos numerador y denominador antes de aplicar la regla del cociente.','u=e^(−x), u′=−e^(−x); v=1−x, v′=−1'],
['Simplificamos el numerador sin perder el signo de v′.','f′(x)=frac{−e^(−x)(1−x)+e^(−x)}{(1−x)²}=frac{x e^(−x)}{(1−x)²}'],
['Los factores exponencial y denominador cuadrado son positivos en el dominio.','signo f′(x)=signo x; x≠1'],
['Dividimos el dominio también en el punto excluido, aunque no cambie el signo.','f′<0 en (−∞,0); f′>0 en (0,1) y (1,+∞)'],
['El cambio de negativo a positivo da mínimo; calculamos la ordenada.','x=0; f(0)=1; mínimo relativo (0,1)'],
['No hay más ceros de la derivada, y x=1 no pertenece al dominio.','No existen máximos relativos'],
])];
case 606:return[mk(0,'r es paralela a π y no está contenida en π.',['r está contenida en π.','r corta a π en un único punto.','r es perpendicular a π.'],['Comprobar solo la dirección, sin un punto.','Confundir punto fuera del plano con intersección.','Confundir director ortogonal a la normal con director paralelo a ella.'],[
['Parametrizamos la recta para identificar un punto y un vector director.','r: (x,y,z)=(5,0,6)+t(−2,1,−3)'],
['El plano tiene como normal los coeficientes de su ecuación.','n=(2,1,−1)'],
['Comprobamos si la dirección de r es paralela al plano.','n·d=2(−2)+1+3=0'],
['Decidimos entre contención y paralelismo estricto sustituyendo el punto.','2·5+0−6+2=6≠0'],
['La sustitución de la recta completa da la misma constante no nula.','2(5−2t)+t−(6−3t)+2=6'],
['No existe parámetro de intersección y las direcciones son paralelas.','r∩π=∅; r paralela estrictamente a π'],
]),mk(1,'x−4y−2z+7=0.',['x−4y−2z−7=0.','2x+y−z−4=0.','x+4y−2z+7=0.'],['Cambiar el signo del término independiente.','Obtener un plano paralelo en lugar de perpendicular.','Cambiar el signo de la componente central del producto vectorial.'],[
['La normal buscada debe ser ortogonal tanto al director de r como a la normal de π.','N=d×n; d=(−2,1,−3); n=(2,1,−1)'],
['Calculamos las tres componentes del producto vectorial.','d×n=(−1+3,−6−2,−2−2)=(2,−8,−4)'],
['Dividimos por el factor común sin cambiar el plano.','N=(1,−4,−2)'],
['Imponemos que el plano pase por P=(5,0,6).','(x−5)−4y−2(z−6)=0'],
['Desarrollamos y comprobamos el paso por P y la dirección de r.','x−4y−2z+7=0; 5−12+7=0; N·d=−2−4+6=0'],
['Las normales de los planos son ortogonales, que es la condición de perpendicularidad.','N·n=2−4+2=0'],
]),mk(2,'system{x=5+u;y=−2u+v;z=6+v}, u,v∈ℝ.',['system{x=5+u;y=2u+v;z=6+v}, u,v∈ℝ.','system{x=5+u;y=−2u+v;z=−6+v}, u,v∈ℝ.','system{x=5+u;y=−2u+v;z=6−v}, u,v∈ℝ.'],['Cambiar el signo de la primera dirección.','Cambiar el punto de paso.','Cambiar el signo de la segunda dirección.'],[
['El plano paralelo tiene normal n y debe pasar por P.','2(x−5)+y−(z−6)=0 ⇒ 2x+y−z−4=0'],
['Elegimos dos vectores independientes ortogonales a n.','v₁=(1,−2,0); v₂=(0,1,1)'],
['Comprobamos ortogonalidad e independencia.','n·v₁=2−2=0; n·v₂=1−1=0; v₁×v₂=(−2,−1,1)≠0'],
['Sumamos a P las dos direcciones con parámetros libres.','(x,y,z)=(5,0,6)+u(1,−2,0)+v(0,1,1)'],
['Escribimos las ecuaciones paramétricas.','system{x=5+u;y=−2u+v;z=6+v}'],
['Para comprobar que contiene a r tomamos u=−2t y v=−3t.','(x,y,z)=(5−2t,t,6−3t)'],
])];
case 607:return[mk(0,'∫_{−π/4}^{1} f(x) dx=−frac{3}{4}.',['∫_{−π/4}^{1} f(x) dx=−frac{5}{4}.','∫_{−π/4}^{1} f(x) dx=frac{1}{4}.','∫_{−π/4}^{1} f(x) dx=frac{5}{4}.'],['Invertir el signo de la integral del primer tramo.','Omitir el término constante menos uno del segundo tramo.','Cambiar el signo de la contribución del segundo tramo.'],[
['Partimos en cero, donde cambia la definición; calculamos integral con signo, no área absoluta.','I=∫_{−π/4}^{0} x·sen(2x) dx+∫_{0}^{1}(cos(πx)−1) dx'],
['En el primer tramo integramos por partes indicando cada elemento.','u=x; du=dx; dv=sen(2x)dx; v=−frac{cos(2x)}{2}'],
['Aplicamos la fórmula y completamos la integral restante.','∫x·sen(2x)dx=−frac{x·cos(2x)}{2}+frac{1}{2}∫cos(2x)dx=−frac{x·cos(2x)}{2}+frac{sen(2x)}{4}'],
['Evaluamos ambos extremos del primer tramo.','F(0)=0; F(−π/4)=−frac{1}{4}; I₁=frac{1}{4}'],
['La primitiva del segundo tramo conserva el factor de la regla de la cadena.','G(x)=frac{sen(πx)}{π}−x; I₂=G(1)−G(0)=−1'],
['Sumamos y verificamos las primitivas mediante derivación.','I=frac{1}{4}−1=−frac{3}{4}; F′=x·sen(2x); G′=cos(πx)−1'],
])];
case 609:return[mk(0,'El sistema es compatible indeterminado únicamente para a=1.',['El sistema es compatible indeterminado únicamente para a=2.','El sistema es compatible indeterminado para a=1 y a=2.','El sistema nunca es compatible indeterminado.'],['Intercambiar los dos valores singulares.','Confundir determinante nulo con compatibilidad.','Ignorar la dependencia también de términos independientes.'],[
['La matriz de coeficientes y el vector independiente proceden del sistema oficial.','A=matrix{a,1,1;1,2,−1;1,1+a,−a}; b=matrix{1+a;1−a;0}'],
['Calculamos el determinante y sus únicos ceros.','det A=−a²+3a−2=−(a−1)(a−2)'],
['Fuera de esos ceros los rangos son tres; no puede haber infinitas soluciones.','a≠1,2 ⇒ rg A=rg(A|b)=3'],
['Para a=1 las filas segunda y tercera coinciden, incluidos los términos independientes; un menor acredita rango dos.','F₂=F₃; det[[1,1],[1,2]]=1; rg A=rg(A|b)=2<3'],
['Para a=2 restamos filas para comprobar compatibilidad.','F₁−2F₂: −3y+3z=5; F₃−F₂: y−z=1'],
['Las ecuaciones reducidas se contradicen, por lo que el segundo valor singular es incompatible.','−3=5 imposible; a=2 ⇒ rg A=2<rg(A|b)=3; SCI solo a=1'],
]),mk(1,'(x,y,z)=(−1,1,0).',['(x,y,z)=(1,1,0).','(x,y,z)=(−1,0,1).','(x,y,z)=(−1,1,1).'],['Perder el signo al despejar x.','Intercambiar y y z.','No restar y al recuperar z.'],[
['Sustituimos a=0 en las tres ecuaciones.','y+z=1; x+2y−z=1; x+y=0'],
['Despejamos dos incógnitas en función de y.','x=−y; z=1−y'],
['Sustituimos en la ecuación restante.','−y+2y−(1−y)=1 ⇒ 2y−1=1'],
['Resolvemos y recuperamos las otras incógnitas.','y=1; x=−1; z=0'],
['Comprobamos cada ecuación del sistema original con a=0.','1+0=1; −1+2−0=1; −1+1=0'],
['El determinante no nulo confirma que no hay más soluciones.','det A(0)=−2≠0'],
])];
case 611:return[mk(0,'rg(A−λI)=2 si λ∈{1,3,4}; rg(A−λI)=3 en los demás casos.',['rg(A−λI)=1 si λ∈{1,3,4}; rg(A−λI)=3 en los demás casos.','rg(A−λI)=2 si λ∈{−1,−3,−4}; rg(A−λI)=3 en los demás casos.','rg(A−λI)=2 si λ∈{1,4}; rg(A−λI)=3 en los demás casos.'],['Suponer que todo determinante nulo deja rango uno.','Cambiar los signos de las raíces.','Perder la raíz tres al factorizar.'],[
['Restamos λ únicamente a la diagonal principal.','A−λI=matrix{2−λ,0,2;−1,2−λ,1;0,1,4−λ}'],
['Expandimos por la primera fila.','det(A−λI)=(2−λ)((2−λ)(4−λ)−1)−2'],
['Desarrollamos y factorizamos el polinomio.','−λ³+8λ²−19λ+12=−(λ−1)(λ−3)(λ−4)'],
['Fuera de las tres raíces existe un menor de orden tres no nulo.','λ∉{1,3,4} ⇒ rg(A−λI)=3'],
['Un mismo menor de orden dos no se anula para ningún parámetro.','det[[−1,2−λ],[0,1]]=−1'],
['En las raíces el determinante es cero y ese menor garantiza rango exactamente dos.','λ∈{1,3,4} ⇒ rg(A−λI)=2'],
]),mk(1,'(x,y,z)=(−2t,−3t,t), t∈ℝ; para x=2: (2,3,−1).',['(x,y,z)=(2t,−3t,t), t∈ℝ; para x=2: (2,−3,1).','(x,y,z)=(−2t,3t,t), t∈ℝ; para x=2: (2,−3,−1).','(x,y,z)=(−2t,−3t,t), t∈ℝ; no existe solución con x=2.'],['Cambiar el signo al despejar x.','Cambiar el signo al despejar y.','Excluir un valor admisible del parámetro libre.'],[
['Fijamos λ=1 para construir el sistema homogéneo.','x+2z=0; −x+y+z=0; y+3z=0'],
['Usamos z como parámetro, puesto que el rango es dos.','z=t; x=−2t'],
['La tercera ecuación da y; la segunda queda satisfecha.','y=−3t; −(−2t)−3t+t=0'],
['Escribimos todas las soluciones y fijamos la condición adicional.','(x,y,z)=(−2t,−3t,t); −2t=2 ⇒ t=−1'],
['El punto solicitado se obtiene sustituyendo el parámetro.','(x,y,z)=(2,3,−1)'],
['Comprobamos directamente la igualdad matricial A·v=v.','A·matrix{2;3;−1}=matrix{4−2;−2+6−1;3−4}=matrix{2;3;−1}'],
])];
case 613:return[mk(0,'Tangente: y=−frac{x+3}{e}; normal: y=e(x+1)−frac{2}{e}; inflexión (−1,−frac{2}{e}).',['Tangente: y=frac{x+3}{e}; normal: y=−e(x+1)−frac{2}{e}; inflexión (−1,−frac{2}{e}).','Tangente: y=−frac{x+3}{e}; normal: y=frac{x+1}{e}−frac{2}{e}; inflexión (−1,−frac{2}{e}).','Tangente: y=−frac{x+1}{e}; normal: y=e(x+1); inflexión (−1,0).'],['Cambiar el signo de la pendiente tangente.','Cambiar solo el signo sin invertir la pendiente normal.','Omitir la ordenada del punto de inflexión.'],[
['Derivamos por la regla del producto y volvemos a derivar.','f′(x)=e^x+(x−1)e^x=x e^x; f″(x)=(x+1)e^x'],
['La exponencial es positiva; la segunda derivada cambia de signo al pasar por menos uno.','f″<0 si x<−1; f″>0 si x>−1 ⇒ inflexión en x=−1'],
['Calculamos punto y pendiente usando la función y su primera derivada.','f(−1)=−frac{2}{e}; f′(−1)=−frac{1}{e}'],
['Aplicamos la ecuación punto-pendiente a la tangente.','y+frac{2}{e}=−frac{1}{e}(x+1) ⇒ y=−frac{x+3}{e}'],
['La pendiente normal es la opuesta de la inversa.','mₙ=−frac{1}{−1/e}=e; y=e(x+1)−frac{2}{e}'],
['Verificamos el punto común y la perpendicularidad.','x=−1 ⇒ y=−frac{2}{e} en ambas; mₜ·mₙ=−1'],
]),mk(1,'Única asíntota: y=0 cuando x→−∞; no hay verticales ni oblicuas.',['Única asíntota: y=0 cuando x→+∞; no hay verticales ni oblicuas.','Asíntota y=0 en ambos infinitos; no hay verticales ni oblicuas.','Asíntota vertical x=1 y horizontal y=0 cuando x→−∞.'],['Invertir el extremo en el que decae la exponencial.','Confundir crecimiento exponencial con decaimiento.','Confundir un cero de la función con una singularidad.'],[
['El producto de polinomio y exponencial es continuo en toda la recta real.','Dom f=ℝ ⇒ no hay asíntotas verticales'],
['Para menos infinito usamos t=−x y exponencial en el denominador.','f(−t)=−frac{t+1}{e^t}'],
['El denominador crece más rápidamente; el límite es cero.','lim_{t→+∞} frac{t+1}{e^t}=0 ⇒ y=0 en −∞'],
['Hacia más infinito ambos factores crecen y no hay límite finito.','lim_{x→+∞}(x−1)e^x=+∞'],
['La pendiente asintótica tampoco es finita en más infinito.','lim_{x→+∞} frac{f(x)}{x}=lim_{x→+∞}(1−frac{1}{x})e^x=+∞'],
['En menos infinito la pendiente es cero, correspondiente a la horizontal ya obtenida.','lim_{x→−∞} frac{f(x)}{x}=0; no hay oblicuas'],
])];
case 614:return[mk(0,'a=10, b=2, c=1.',['a=2, b=10, c=1.','a=6, b=−2, c=1.','a=10, b=2, c=−1.'],['Intercambiar el signo en la condición de pendiente.','Confundir la ordenada de la tangente con su término independiente.','Cambiar el signo al imponer la asíntota vertical.'],[
['La asíntota vertical exige que el denominador se anule en menos uno.','−c+1=0 ⇒ c=1'],
['La tangente pasa por el punto de la curva con abscisa uno.','f(1)=2·1+4=6 ⇒ frac{a+b}{2}=6 ⇒ a+b=12'],
['Derivamos la función racional con c=1.','f′(x)=frac{a(x+1)−(ax+b)}{(x+1)²}=frac{a−b}{(x+1)²}'],
['La pendiente en uno debe ser la de la recta dada.','f′(1)=frac{a−b}{4}=2 ⇒ a−b=8'],
['Sumamos y restamos las dos condiciones lineales.','2a=20 ⇒ a=10; b=2; c=1'],
['Comprobamos que no hay cancelación en la asíntota y que se recupera la tangente.','10(−1)+2=−8≠0; f(1)=6; f′(1)=2; y−6=2(x−1)'],
])];
case 617:return[mk(0,'∫_{0}^{π²} sen(√x) dx=2π.',['∫_{0}^{π²} sen(√x) dx=2.','∫_{0}^{π²} sen(√x) dx=π.','∫_{0}^{π²} sen(√x) dx=−2π.'],['Omitir el jacobiano del cambio de variable.','Omitir el factor dos de dx.','Cambiar el signo de la primitiva del seno.'],[
['Aplicamos la sugerencia y transformamos también el diferencial.','t=√x; x=t²; dx=2t dt'],
['Cambiamos los dos límites de integración.','x=0 ⇒ t=0; x=π² ⇒ t=π; I=2∫_{0}^{π}t·sen t dt'],
['Integramos por partes identificando u, dv y sus derivados.','u=t; du=dt; dv=sen t dt; v=−cos t'],
['Aplicamos la fórmula y obtenemos una primitiva completa.','∫t·sen t dt=−t cos t+∫cos t dt=−t cos t+sen t'],
['Evaluamos en ambos límites manteniendo el factor dos.','I=2[−t cos t+sen t]₀^π=2(π−0)=2π'],
['Verificamos la primitiva del integrando transformado.','frac{d}{dt}(−2t cos t+2 sen t)=2t sen t'],
])];
case 618:return[mk(0,'lim_{x→0}(frac{1}{x}−frac{cos x}{sen x})=0.',['lim_{x→0}(frac{1}{x}−frac{cos x}{sen x})=1.','lim_{x→0}(frac{1}{x}−frac{cos x}{sen x})=frac{1}{3}.','lim_{x→0}(frac{1}{x}−frac{cos x}{sen x}) no existe.'],['Restar límites infinitos como si fueran cantidades finitas.','Confundir el coeficiente del término lineal con el límite.','No cancelar la indeterminación común de ambos lados.'],[
['No restamos límites infinitos; reducimos a un único cociente.','frac{1}{x}−frac{cos x}{sen x}=frac{sen x−x cos x}{x sen x}'],
['Numerador y denominador tienden a cero; son derivables en un entorno perforado.','lim_{x→0}(sen x−x cos x)=0; lim_{x→0}x sen x=0'],
['Aplicamos una vez L’Hôpital, derivando el producto del numerador sin perder signos.','(sen x−x cos x)′=x sen x; (x sen x)′=sen x+x cos x'],
['Para x no nulo dividimos numerador y denominador por x.','frac{x sen x}{sen x+x cos x}=frac{sen x}{frac{sen x}{x}+cos x}'],
['Usamos el límite notable del seno y continuidad del coseno.','lim_{x→0}frac{sen x}{x}=1; lim_{x→0}cos x=1; lim_{x→0}sen x=0'],
['El denominador reducido tiende a dos, no a cero; los dos límites laterales coinciden.','lim_{x→0}frac{sen x}{frac{sen x}{x}+cos x}=frac{0}{2}=0'],
])];
case 619:return[mk(0,'Derivable en (−1,0)∪(0,1), no derivable en 0: f′₋(0)=−2 y f′₊(0)=2.',['Derivable en todo (−1,1), con f′(0)=0.','Derivable en todo (−1,1), con f′(0)=2.','No derivable en 0 porque no es continua en 0.'],['Suponer que simetría implica derivada nula.','Usar solo la derivada derecha.','Confundir esquina continua con discontinuidad.'],[
['Separamos la expresión del valor absoluto según el signo de x.','f(x)=cases{frac{1−x}{1+x}, −1<x<0;frac{1+x}{1−x}, 0≤x<1}'],
['Los denominadores no se anulan dentro de sus respectivos intervalos.','f′(x)=−frac{2}{(1+x)²} si x<0; f′(x)=frac{2}{(1−x)²} si x>0'],
['Comprobamos continuidad en el único punto de unión interior.','lim_{x→0⁻}f(x)=1=lim_{x→0⁺}f(x)=f(0)'],
['Calculamos la derivada izquierda como límite del cociente incremental.','lim_{h→0⁻}frac{f(h)−1}{h}=lim_{h→0⁻}−frac{2}{1+h}=−2'],
['Calculamos de forma independiente la derivada derecha.','lim_{h→0⁺}frac{f(h)−1}{h}=lim_{h→0⁺}frac{2}{1−h}=2'],
['Los límites laterales distintos impiden la derivabilidad en cero, aunque la función sea continua.','f′₋(0)≠f′₊(0); derivable exactamente en (−1,0)∪(0,1)'],
]),mk(1,'Decrece en (−1,0) y crece en (0,1).',['Crece en (−1,0) y decrece en (0,1).','Crece en todo (−1,1).','Decrece en todo (−1,1).'],['Invertir el signo de las derivadas laterales.','Ignorar el cambio del valor absoluto a la izquierda.','Ignorar el cambio del valor absoluto a la derecha.'],[
['El dominio solo comprende valores estrictamente entre menos uno y uno.','Dom f=(−1,1)'],
['En la mitad negativa el denominador cuadrado es positivo.','f′(x)=−frac{2}{(1+x)²}<0, −1<x<0'],
['Por el criterio de la derivada, en esa mitad la función es estrictamente decreciente.','f decrece en (−1,0)'],
['En la mitad positiva todos los factores de la derivada son positivos.','f′(x)=frac{2}{(1−x)²}>0, 0<x<1'],
['Por tanto, la función es estrictamente creciente en la mitad positiva.','f crece en (0,1)'],
['Como comprobación, el valor uno en cero es menor que en cualquiera de los otros puntos del dominio.','|x|>0 ⇒ frac{1+|x|}{1−|x|}>1=f(0)'],
])];
case 623:return[mk(0,'m≠0,−frac{5}{2}: compatible determinado; m=0: compatible indeterminado; m=−frac{5}{2}: incompatible.',['m≠0,−frac{5}{2}: compatible determinado; m=0: incompatible; m=−frac{5}{2}: compatible indeterminado.','m≠0,−frac{5}{2}: compatible determinado; m=0 y m=−frac{5}{2}: compatible indeterminado.','m≠0,−frac{5}{2}: compatible determinado; m=0 y m=−frac{5}{2}: incompatible.'],['Intercambiar el estudio de los dos parámetros singulares.','Omitir la comprobación del rango ampliado.','Concluir incompatibilidad de todo determinante nulo.'],[
['Formamos la matriz de coeficientes y calculamos su determinante.','A=matrix{m,2,−1;5,−4,2;1,3m,0}; det A=−6m²−15m=−3m(2m+5)'],
['Fuera de los dos valores singulares los rangos son tres.','m≠0,−frac{5}{2} ⇒ rg A=rg(A|b)=3'],
['Un menor constante garantiza rango al menos dos para cualquier m.','det[[m,−1],[1,0]]=1'],
['Para m=0 la suma de la segunda fila y dos veces la primera es cinco veces la tercera, también en los términos independientes.','F₂+2F₁=5F₃; 0+2·1=5·frac{2}{5}'],
['El rango de ambas matrices es dos; hay una incógnita libre.','m=0 ⇒ rg A=rg(A|b)=2<3 ⇒ SCI'],
['Para m=−5/2 la segunda fila de coeficientes es menos dos veces la primera, pero los términos independientes no lo son.','F₂=−2F₁ en A; 0≠−2 ⇒ rg A=2<rg(A|b)=3 ⇒ SI'],
]),mk(1,'(x,y,z)=(frac{2}{5},t,2t−1), t∈ℝ; no hay solución con x=0.',['(x,y,z)=(frac{2}{5},t,2t+1), t∈ℝ; no hay solución con x=0.','(x,y,z)=(−frac{2}{5},t,2t−1), t∈ℝ; no hay solución con x=0.','(x,y,z)=(0,t,2t−1), t∈ℝ; sí hay soluciones con x=0.'],['Cambiar el signo al despejar z.','Cambiar el signo de la tercera ecuación.','Ignorar la condición fija sobre x.'],[
['Sustituimos m=0, conservando la fracción del término independiente.','2y−z=1; 5x−4y+2z=0; x=frac{2}{5}'],
['Elegimos y como parámetro libre y despejamos z.','y=t; z=2t−1'],
['Comprobamos que la segunda ecuación no impone ninguna condición adicional.','5·frac{2}{5}−4t+2(2t−1)=2−4t+4t−2=0'],
['Escribimos el conjunto completo de soluciones.','(x,y,z)=(frac{2}{5},t,2t−1), t∈ℝ'],
['La tercera ecuación obliga al mismo valor de x en todas las soluciones.','x=frac{2}{5}≠0'],
['Por tanto, la condición adicional solicitada es imposible, aunque el sistema tenga infinitas soluciones.','No existe solución con x=0'],
])];default:throw Error('Unknown source-calculus/ranks case');}}
export function buildSourceCalculusRanksBatch(id='batch-0431',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===2?'Aplicaciones de la derivada':c.slot===3?'Integrales definidas':'Propiedades métricas';if(c.index===618)x.primaryTopic='Límites y continuidad';x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'ROUCHE_FROBENIUS_RANKS':c.slot===4?'EXPLICIT_VECTOR_PLANE_METHOD':'DERIVATION_AND_INDEPENDENT_NUMERICAL_CHECK'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSourceCalculusRanksBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0431-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0431.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
