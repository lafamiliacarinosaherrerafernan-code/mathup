import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[795,'12862714b2e47a390cc175a51fc4582d522f804e03290abc96be4761fec7e5ae',1,'A.2','1859f171cf015ab1f4433cb4736ee5e775e65aff91a70d105015f6f662d8f844',0],
[799,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',1,'A.3','044f0ab73c867fd6cbd6e20d1a6d3aaa8dfb986a6484f8126979ef3af2ebd246',0],
[802,'a236b382afd7ddbc35f4e83791a322bcf96c07c5859fa715a0b6e74f5e2921e1',1,'A.4','a1d68b6bc9aceccacbace2fc0bfb82dfe958604b0cadbf8dccb42b65d637a9f6',0],
[805,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',2,'B.6','a12338e74f2c808b4d3ea62b4b5d8b4528399f663e42a8f223abfc6e77da679e',0],
[806,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',2,'NONE.6','7febc2d0bcd505ffa5e938ce58835cbdd6b52b1cf58039d2794dd4b309657bab',0],
[807,'e9cdab8c67f3149fd8325f98321a2a7c369958dad473274c0c62f60db905ca7a',1,'A.1','80cd319ea8e48cdd06de8ba51478a1f45f3773d4c42733986ca2749ac2f59752',0],
[808,'c32c32963d82d1ee57ab88a8a21a2a7b9559da905b42ecb11e094d10d95ce9e2',2,'B.3','db7d76d5c2161383a924f49807b25b5651abe83505d0b7221681bf884427349f',0],
[809,'a7aef3a7a20bf486085bab45f78721b97e95ce8000d362fda65851d9ec3a7941',1,'A.4','6919f249fb23b500129821d59188f228f64c9926b99f42aaf012d50188b373b2',0]];
export const statements={
795:'Sea f la función definida como f(x)=(x+2)ln(x) para x>0, donde ln(x) representa al logaritmo neperiano de x.\na) Calcula ∫f(x)dx.\nb) Encuentra la primitiva de f cuya gráfica pasa por el punto (1,0).',
799:'Considera las matrices A=matrix{−1,1,1;0,1,0;−2,1,1} y B=matrix{−3,3,2;−8,7,4;8,−6,−3}.\na) Halla la matriz X que verifica AX+B=2A.\nb) Calcula B² y B²⁰¹⁶.',
802:'Determina el punto de la recta r: frac{x−1}{2}=y+1=frac{z}{3} que equidista de los planos π: x+y+z+3=0 y π′: system{x=−3+λ;y=−λ+μ;z=−6−μ}.',
805:'Considera las matrices A=matrix{m,1,3;1,m,2;1,m,3} y B=matrix{2,2;1,0;−1,2}.\na) Calcula el rango de la matriz A según los valores de m.\nb) Para m=0 resuelve la ecuación AX=B, si es posible.',
806:'Sea f la función dada por f(x)=frac{3x²+4}{(x−2)²} para x≠2.\na) Calcula ∫f(x)dx.\nb) Calcula la primitiva de f cuya gráfica pasa por el punto (3,5).',
807:'Considera la función continua f definida por f(x)=cases{frac{1}{x} si x<−1;ax+b si −1≤x<1;frac{x²}{x+1} si x≥1}.\na) Calcula a y b.\nb) Estudia y halla las asíntotas de la gráfica de f.',
808:'Encuentra la matriz X que satisface la ecuación XA+A³B=A, siendo A=matrix{0,0,1;0,1,0;1,0,0} y B=matrix{2,−1,0;0,2,−1;−1,0,2}.',
809:'Sean los puntos A(0,0,1), B(1,0,−1), C(0,1,−2) y D(1,2,0).\na) Halla la ecuación del plano π determinado por los puntos A, B y C.\nb) Demuestra que los cuatro puntos no son coplanarios.\nc) Calcula la distancia del punto D al plano π.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PRIMITIVES_RANK_PLANES_LAYOUT']]:[];
export const cases=[{index:795,slot:3,literals:['(x+2) ln (x)','(1, 0)']},{index:799,slot:1,literals:['AX + B = 2A','B2016']},{index:802,slot:4,literals:['equidista','−3 + λ','−6 − µ']},{index:805,slot:1,literals:['rango de la matriz A','A X = B']},{index:806,slot:3,literals:['3x2 + 4','(3, 5)']},{index:807,slot:2,literals:['función continua','asíntotas']},{index:808,slot:1,literals:['XA + A3B = A']},{index:809,slot:4,literals:['A(0, 0, 1)','D(1, 2, 0)','no son coplanarios']}];
export const proof=c=>({795:{primitiveCoefficients:[.5,2,-.25,-2],constant:2.25},799:{inverse:[[1,0,-1],[0,1,0],[2,-1,-1]],X:[[13,-9,-5],[8,-5,-4],[6,-5,-1]],involution:true},802:{point:[-1,-2,-3],t:-1,planeOffsets:[3,9],distance:Math.sqrt(3)},805:{determinantCoefficients:[-1,0,1],rank2:[-1,1],X:[[5,-4],[8,-4],[-2,2]]},806:{primitiveCoefficients:[3,12,-16],constant:12,pointComponent:[2,'+infinity']},807:{a:.75,b:-.25,leftHorizontal:0,rightOblique:[1,-1],vertical:[]},808:{X:[[-1,0,1],[1,-1,0],[0,1,-1]]},809:{normal:[2,3,1],offset:-1,tripleProduct:7,distance:7/Math.sqrt(14)}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,r,s)=>part(ps[i],a,d,r,s,'INDEPENDENT_DERIVATIVES_MATRIX_SUBSTITUTION_AND_PLANE_CHECKS',proof(c));switch(c.index){
case 795:return[mk(0,'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+C, x>0.',[
'F(x)=(frac{x²}{2}+2x)ln(x)+frac{x²}{4}+2x+C, x>0.',
'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{2}−2x+C, x>0.',
'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−x+C, x>0.'],['Sumar en lugar de restar la integral residual de la fórmula por partes.','No dividir por dos al integrar x/2.','Olvidar el coeficiente dos al integrar la constante residual.'],[
['El dominio x>0 permite usar ln(x) sin ambigüedad; elegimos integración por partes.','u=ln(x), dv=(x+2)dx'],
['Derivamos u e integramos dv.','du=frac{1}{x}dx; v=frac{x²}{2}+2x'],
['Aplicamos la fórmula y conservamos todos los factores.','∫(x+2)ln(x)dx=(frac{x²}{2}+2x)ln(x)−∫(frac{x²}{2}+2x)frac{1}{x}dx'],
['Simplificamos la integral restante.','∫(frac{x}{2}+2)dx=frac{x²}{4}+2x'],
['Incluimos la constante arbitraria.','F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+C'],
['Derivamos el resultado: los términos sin logaritmo se cancelan.','F′(x)=(x+2)ln(x)+frac{x}{2}+2−frac{x}{2}−2=(x+2)ln(x)'],
]),mk(1,'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+frac{9}{4}, x>0.',[
'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x−frac{9}{4}, x>0.',
'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+frac{7}{4}, x>0.',
'F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x, x>0.'],['Cambiar el signo al despejar la constante.','Restar 1/4 a dos en lugar de sumarlo.','Omitir la condición de paso por el punto.'],[
['Usamos la familia de primitivas obtenida en el apartado anterior.','F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+C'],
['Pasar por (1,0) significa que la ordenada de la primitiva en uno es cero.','F(1)=0'],
['Sustituimos ln(1)=0, manteniendo los dos términos polinómicos.','−frac{1}{4}−2+C=0'],
['Despejamos la constante.','C=frac{9}{4}'],
['Escribimos la función completa.','F(x)=(frac{x²}{2}+2x)ln(x)−frac{x²}{4}−2x+frac{9}{4}'],
['Verificamos independientemente el punto y la derivada.','F(1)=−frac{9}{4}+frac{9}{4}=0; F′(x)=(x+2)ln(x)'],
])];
case 799:return[mk(0,'X=matrix{13,−9,−5;8,−5,−4;6,−5,−1}.',[
'X=matrix{1,−1,−1;0,−1,−4;−2,3,7}.','X=matrix{−9,9,5;−8,9,4;−6,5,5}.','X=matrix{12,−9,−5;8,−6,−4;6,−5,−2}.'],['Multiplicar B por la inversa de A en el lado incorrecto.','Sumar B al despejar AX.','Usar I en lugar de 2I después de multiplicar por A⁻¹.'],[
['Aislamos el producto AX y comprobamos que A es invertible.','AX=2A−B; det A=1'],
['Calculamos la inversa, conservando el orden de los factores.','A⁻¹=matrix{1,0,−1;0,1,0;2,−1,−1}'],
['Multiplicamos a la izquierda.','X=A⁻¹(2A−B)=2I−A⁻¹B'],
['Calculamos el producto fila por columna.','A⁻¹B=matrix{−11,9,5;−8,7,4;−6,5,3}'],
['Restamos ese producto a dos veces la identidad.','X=matrix{13,−9,−5;8,−5,−4;6,−5,−1}'],
['La sustitución en la ecuación original confirma cada entrada.','AX=matrix{1,−1,0;8,−5,−4;−12,8,5}; AX+B=2A'],
]),mk(1,'B²=I y B²⁰¹⁶=I.',[
'B²=I y B²⁰¹⁶=B.','B²=−I y B²⁰¹⁶=I.','B²=I y B²⁰¹⁶=2016I.'],['Tratar un exponente par como si fuera impar.','Cambiar el signo del producto matricial B².','Confundir potencia matricial con multiplicación por el exponente.'],[
['Para identificar un patrón debemos multiplicar las matrices, no elevar cada entrada por separado.','B²=B·B'],
['Calculamos la primera fila del producto.','(9−24+16, −9+21−12, −6+12−6)=(1,0,0)'],
['Calculamos la segunda y tercera filas.','(24−56+32, −24+49−24, −16+28−12)=(0,1,0); (−24+48−24,24−42+18,16−24+9)=(0,0,1)'],
['Por tanto B es una matriz involutiva.','B²=I'],
['El exponente solicitado es par.','B²⁰¹⁶=(B²)¹⁰⁰⁸=I¹⁰⁰⁸=I'],
['Comprobamos la regla general que alterna ambas matrices.','B²ⁿ=I; B²ⁿ⁺¹=B, n∈ℕ'],
])];
case 802:return[mk(0,'P=(−1,−2,−3).',['P=(1,−1,0).','P=(3,0,3).','P=(0,−frac{3}{2},−frac{3}{2}).'],['Restar las dos distancias con signo en vez de buscar el plano equidistante.','Cambiar el signo del parámetro al resolver.','Usar solo el desplazamiento de uno de los planos.'],[
['Parametrizamos la recta a partir de la igualdad de los tres cocientes.','P(t)=(1+2t,t−1,3t)'],
['Los vectores directores del segundo plano son (1,−1,0) y (0,1,−1); su producto vectorial es (1,1,1).','π′: x+y+z+9=0'],
['Aplicamos la fórmula de distancia a un plano. Ambos normales tienen la misma norma.','d(P,π)=frac{|6t+3|}{√3}; d(P,π′)=frac{|6t+9|}{√3}'],
['Igualamos las distancias y elevamos al cuadrado, operación equivalente para valores absolutos.','(6t+3)²=(6t+9)² ⇒ −6(12t+12)=0 ⇒ t=−1'],
['Sustituimos en la parametrización.','P=(1−2,−1−1,−3)=(−1,−2,−3)'],
['Verificamos tanto la pertenencia a r como las distancias.','frac{−1−1}{2}=−2+1=frac{−3}{3}=−1; d(P,π)=d(P,π′)=√3'],
])];
case 805:return[mk(0,'rango A=2 si m∈{−1,1}; rango A=3 en otro caso.',[
'rango A=1 si m∈{−1,1}; rango A=3 en otro caso.','rango A=2 si m=0; rango A=3 en otro caso.','rango A=2 si m=1; rango A=3 en otro caso.'],['Confundir determinante nulo con rango uno sin revisar menores.','Resolver m²−1=0 como si fuera m²=0.','Perder la raíz negativa del determinante.'],[
['Restamos la segunda fila a la tercera sin cambiar el determinante.','F₃←F₃−F₂ ⇒ matrix{m,1,3;1,m,2;0,0,1}'],
['Desarrollamos por la última fila.','det A=m²−1=(m−1)(m+1)'],
['Cuando el determinante no se anula, el rango es máximo.','m≠−1 y m≠1 ⇒ rango A=3'],
['En los valores singulares buscamos un menor de orden dos que no se anule.','det(matrix{1,2;1,3})=3−2=1'],
['Ese menor corresponde a las filas segunda y tercera y columnas primera y tercera, y es independiente de m.','rango A≥2 para todo m'],
['Combinamos ambas comprobaciones sin omitir ninguno de los valores singulares.','m∈{−1,1} ⇒ det A=0 y rango A=2'],
]),mk(1,'X=matrix{5,−4;8,−4;−2,2}.',[
'X=matrix{−3,4;−4,8;2,−2}.','X=matrix{−4,5;−4,8;2,−2}.','X=matrix{5,−4;2,2;−2,2}.'],['Cambiar el signo al restar la segunda ecuación de la tercera.','Intercambiar las columnas de la solución.','Omitir 3z en la primera ecuación.'],[
['Para m=0, det A=−1; por tanto existe una única solución matricial.','A=matrix{0,1,3;1,0,2;1,0,3}'],
['Cada columna de X resuelve el sistema con la columna correspondiente de B.','y+3z=b₁; x+2z=b₂; x+3z=b₃'],
['Restamos las dos últimas ecuaciones y despejamos las otras incógnitas.','z=b₃−b₂; x=b₂−2z; y=b₁−3z'],
['Aplicamos esas relaciones a la primera columna.','b=(2,1,−1) ⇒ z=−2, x=5, y=8'],
['Aplicamos las relaciones a la segunda columna y escribimos la matriz en el orden correcto.','b=(2,0,2) ⇒ z=2, x=−4, y=−4; X=matrix{5,−4;8,−4;−2,2}'],
['Multiplicamos A por X para verificar las seis entradas.','AX=matrix{2,2;1,0;−1,2}=B'],
])];
case 806:return[mk(0,'F(x)=3x+12ln|x−2|−frac{16}{x−2}+C, x≠2.',[
'F(x)=3x+12ln|x−2|+frac{16}{x−2}+C, x≠2.',
'F(x)=3x+6ln|x−2|−frac{16}{x−2}+C, x≠2.',
'F(x)=3x+12ln|x−2|−frac{8}{x−2}+C, x≠2.'],['Perder el signo negativo al integrar (x−2)⁻².','Omitir un factor dos en el coeficiente logarítmico.','Reducir indebidamente el coeficiente del polo doble.'],[
['Tomamos u=x−2 para desarrollar el numerador alrededor del denominador.','x=u+2; 3x²+4=3u²+12u+16'],
['Dividimos cada término por u².','f(x)=3+frac{12}{x−2}+frac{16}{(x−2)²}'],
['Integramos término a término usando la derivada del logaritmo absoluto.','∫3dx=3x; ∫frac{12}{x−2}dx=12ln|x−2|'],
['Aplicamos la regla de potencias al último término.','∫16(x−2)⁻²dx=−16(x−2)⁻¹'],
['Sumamos las primitivas; la constante puede ser independiente en cada componente del dominio.','F(x)=3x+12ln|x−2|−frac{16}{x−2}+C'],
['La derivada recompone exactamente el cociente original.','F′(x)=frac{3(x−2)²+12(x−2)+16}{(x−2)²}=frac{3x²+4}{(x−2)²}'],
]),mk(1,'En x>2: F(x)=3x+12ln(x−2)−frac{16}{x−2}+12.',[
'En x>2: F(x)=3x+12ln(x−2)−frac{16}{x−2}−12.',
'En x>2: F(x)=3x+12ln(x−2)−frac{16}{x−2}+5.',
'En x>2: F(x)=3x+12ln(x−2)−frac{16}{x−2}−2.'],['Cambiar el signo de la constante al despejar.','Tomar la ordenada dada como constante sin evaluar la primitiva.','Olvidar el término 3x al imponer el punto.'],[
['El punto (3,5) está en la componente x>2 del dominio.','F(3)=5; F(x)=3x+12ln(x−2)−frac{16}{x−2}+C'],
['Sustituimos x=3; el logaritmo de uno se anula.','F(3)=9+12ln(1)−16+C=−7+C'],
['Despejamos la constante que garantiza el paso por el punto.','−7+C=5 ⇒ C=12'],
['Escribimos la primitiva en la componente que contiene el punto.','F(x)=3x+12ln(x−2)−frac{16}{x−2}+12, x>2'],
['Verificamos la ordenada y la derivada.','F(3)=9−16+12=5; F′(x)=frac{3x²+4}{(x−2)²}'],
['La condición no determina una constante en la otra componente; no afirmamos una unicidad inexistente allí.','x<2: 3x+12ln|x−2|−frac{16}{x−2}+C₋, con C₋ libre'],
])];
case 807:return[mk(0,'a=frac{3}{4}, b=−frac{1}{4}.',[
'a=−frac{3}{4}, b=−frac{1}{4}.','a=frac{1}{4}, b=frac{3}{4}.','a=1, b=0.'],['Cambiar el signo al restar las ecuaciones de continuidad.','Usar 1 en lugar de −1 como límite izquierdo en x=−1.','Evaluar x²/(x+1) en uno como uno en lugar de 1/2.'],[
['Cada expresión es continua en su intervalo; solo debemos imponer continuidad en los dos puntos de unión.','x=−1 y x=1'],
['En el extremo izquierdo, el límite de 1/x debe coincidir con el tramo afín.','−a+b=−1'],
['En el extremo derecho, el tramo afín debe coincidir con x²/(x+1).','a+b=frac{1}{2}'],
['Sumamos las ecuaciones para despejar b.','2b=−frac{1}{2} ⇒ b=−frac{1}{4}'],
['Sustituimos en la segunda ecuación y obtenemos a.','a=frac{1}{2}+frac{1}{4}=frac{3}{4}'],
['Comprobamos ambas igualdades en los puntos de unión.','−frac{3}{4}−frac{1}{4}=−1; frac{3}{4}−frac{1}{4}=frac{1}{2}'],
]),mk(1,'Asíntota horizontal y=0 en −∞; oblicua y=x−1 en +∞; ninguna vertical.',[
'Asíntota horizontal y=0 en −∞; oblicua y=x+1 en +∞; ninguna vertical.',
'Asíntota horizontal y=0 en −∞; oblicua y=x−1 en +∞; vertical x=−1.',
'Asíntota horizontal y=0 en −∞; oblicua y=x en +∞; ninguna vertical.'],['Cambiar el signo del término independiente de la división.','Aplicar el polo del cociente fuera del intervalo donde se usa esa expresión.','Omitir el término independiente de la asíntota oblicua.'],[
['Hacia menos infinito se usa exclusivamente el primer tramo.','lim(x→−∞)frac{1}{x}=0 ⇒ y=0'],
['Hacia más infinito se usa el tercer tramo; efectuamos la división.','frac{x²}{x+1}=x−1+frac{1}{x+1}'],
['El término residual tiende a cero.','lim(x→+∞)[f(x)−(x−1)]=0 ⇒ y=x−1'],
['No hay horizontal hacia más infinito ni otra oblicua en ese extremo.','lim(x→+∞)f(x)=+∞; pendiente=1; ordenada=−1'],
['Buscamos límites infinitos en puntos finitos usando cada dominio real del tramo. Los aparentes polos no se alcanzan en sus respectivos intervalos.','1/x solo si x<−1; x²/(x+1) solo si x≥1'],
['La continuidad demostrada en −1 y uno, junto con la continuidad interior, descarta todas las verticales.','f(−1)=−1; f(1)=frac{1}{2}; no hay asíntotas verticales'],
])];
case 808:return[mk(0,'X=matrix{−1,0,1;1,−1,0;0,1,−1}.',[
'X=matrix{−1,1,0;0,−1,1;1,0,−1}.','X=matrix{3,0,−1;−1,3,0;0,−1,3}.','X=matrix{1,0,−1;0,−1,1;−1,1,0}.'],['Conmutar A y B y obtener I−B.','Sumar A³B en lugar de restarlo.','Olvidar multiplicar por A⁻¹ a la derecha al despejar XA.'],[
['A intercambia las coordenadas primera y tercera; por ello es su propia inversa.','A²=I; A⁻¹=A; A³=A'],
['Sustituimos esa potencia en la ecuación y aislamos XA.','XA=A−AB'],
['La incógnita está a la izquierda de A; multiplicamos por la inversa a la derecha.','X=(A−AB)A=I−ABA'],
['El producto por A a ambos lados invierte primero filas y después columnas de B.','ABA=matrix{2,0,−1;−1,2,0;0,−1,2}'],
['Restamos el producto a la identidad.','X=matrix{−1,0,1;1,−1,0;0,1,−1}'],
['Verificamos por sustitución sin conmutar matrices.','XA=matrix{1,0,−1;0,−1,1;−1,1,0}; A³B=matrix{−1,0,2;0,2,−1;2,−1,0}; XA+A³B=A'],
])];
case 809:return[mk(0,'π: 2x+3y+z−1=0.',[
'π: 2x+3y+z+1=0.','π: 2x−3y+z−1=0.','π: x+3y+2z−2=0.'],['Cambiar el signo del término independiente al imponer el paso por A.','Perder el signo en un componente del producto vectorial.','Intercambiar componentes del vector normal.'],[
['Construimos dos vectores del plano a partir de un mismo origen.','AB=(1,0,−2); AC=(0,1,−3)'],
['Su producto vectorial proporciona un vector perpendicular a ambos.','AB×AC=(2,3,1)'],
['El vector no es nulo; los tres puntos no están alineados y determinan un plano único.','||(2,3,1)||=√14≠0'],
['Usamos el punto A para escribir la forma punto-normal.','2(x−0)+3(y−0)+(z−1)=0'],
['Simplificamos.','π: 2x+3y+z−1=0'],
['Comprobamos que los tres puntos satisfacen la ecuación.','A:1−1=0; B:2−1−1=0; C:3−2−1=0'],
]),mk(1,'No son coplanarios: (AB×AC)·AD=7.',[
'Son coplanarios: (AB×AC)·AD=0.','No son coplanarios: (AB×AC)·AD=−7.','No son coplanarios: (AB×AC)·AD=14.'],['Confundir el punto D con un punto del plano ya construido.','Invertir el orden del producto vectorial sin cambiar la expresión indicada.','Duplicar indebidamente el producto mixto.'],[
['Tres puntos no alineados fijan el plano; basta comprobar si el cuarto pertenece a él.','π: 2x+3y+z−1=0'],
['Sustituimos las coordenadas de D.','2·1+3·2+0−1=7'],
['El resultado no es cero, así que D queda fuera del plano.','7≠0 ⇒ D∉π'],
['Comprobamos el mismo hecho mediante un producto mixto.','AD=(1,2,−1)'],
['El producto usa el orden exacto de los vectores solicitado en la respuesta.','(AB×AC)·AD=(2,3,1)·(1,2,−1)=2+6−1=7'],
['Un producto mixto no nulo equivale a independencia lineal de los tres vectores.','det(AB,AC,AD)=7≠0 ⇒ A,B,C,D no coplanarios'],
]),mk(2,'d(D,π)=frac{7}{√14}=frac{√14}{2}.',[
'd(D,π)=7.','d(D,π)=frac{7}{14}=frac{1}{2}.','d(D,π)=frac{9}{√14}.'],['Olvidar dividir por la norma del vector normal.','Dividir por la norma al cuadrado.','Cambiar el signo del término independiente del plano.'],[
['La distancia de un punto a un plano se obtiene con el valor absoluto de su ecuación, dividido por la norma del normal.','d=frac{|2x_D+3y_D+z_D−1|}{√(2²+3²+1²)}'],
['Calculamos el numerador.','|2+6+0−1|=7'],
['Calculamos la norma.','√(4+9+1)=√14'],
['Sustituimos y simplificamos sin perder la raíz.','d=frac{7}{√14}=frac{√14}{2}'],
['Para verificar, proyectamos D en la dirección del vector normal.','H=D−frac{7}{14}(2,3,1)=(0,frac{1}{2},−frac{1}{2})'],
['H pertenece al plano y DH tiene la longitud obtenida.','2·0+3·frac{1}{2}−frac{1}{2}−1=0; ||D−H||=√(1+frac{9}{4}+frac{1}{4})=frac{√14}{2}'],
])];
default:throw Error('Unknown primitives-rank-planes case');}}
export function buildPrimitivesRankPlanesBatch(id='batch-0442',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Matrices y determinantes',2:'Límites, continuidad y derivadas',3:'Primitivas e integrales',4:'Geometría del espacio'})[c.slot];x.secondaryTopics=c.index===809?['Producto mixto','Distancia punto-plano']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_PRIMITIVES_RANK_PLANES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPrimitivesRankPlanesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0442-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0442.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
