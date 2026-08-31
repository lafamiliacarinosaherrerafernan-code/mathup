import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[922,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',2,'B.4','9962e965dc2a999ccb82620978600309acfd94fe4628b9ef5c8d6f98b3c92259',0],
[923,'7e01afbcbc60e470239ea2b816456c5e1681c9eacddee55c6b388fa3f235d19f',2,'B.4','e57d71adcc0878ffee40765aad1ea3ec5c1f530b06368d908aee099671baed80',0],
[924,'4ed7fc44fe8d81fed98763864234427004d1dfa317b5d6657c1c2da31a4c902b',2,'C.6','b81163cefba2d1ee21767833fc909978ecd4331b5091a672b4ba215072511d1a',0],
[925,'4b92916bd8a715dafc1c05c471afbd863005f48352c1414bda393158ede42d5c',1,'A.2','368e9f9cf7873873ada74b56d631c3e3171de340ae2e5e479b66b2892c5d6e3a',0],
[927,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',1,'A.1','857de32b5c2cfde0e0d596e2652eace7f7cdbee0e8405955a8016247265cae30',0],
[929,'0ae552bbdf80d1bddb44757bd8d302d6b215c73a92c352c129649990ed7a452c',2,'B.3','ce6a56ff1fb5205f603f03fabf862fd54e22fee00e7f5d6a680ad99db5779c7a',0]];
export const statements={
922:'Considera el punto P(2,−1,3) y el plano π de ecuación 3x+2y+z=5.\na) Calcula el punto simétrico de P respecto de π.\nb) Calcula la distancia de P a π.',
923:'Considera el punto A(8,−1,3) y la recta r dada por frac{x+1}{2}=y−2=frac{z−1}{3}.\na) Calcula la ecuación del plano que pasa por A y es perpendicular a r.\nb) Halla el punto simétrico de A respecto de r.',
924:'Un proveedor de perfumerías vende a sus comerciantes tres tipos de perfumes A, B y C. En un primer pedido una tienda ha encargado 20 perfumes de tipo A, 30 de tipo B y 15 de tipo C, por un importe de 2200 euros. En un segundo pedido ha comprado 15 perfumes de tipo A, 10 de tipo B y 10 de tipo C, por un importe de 1250 euros.\na) ¿Cuánto tendremos que pagar por un pedido de 25 perfumes de tipo A, 10 perfumes de tipo B y 16 de tipo C?\nb) Si añadimos que el precio de un perfume de tipo C es frac{2}{5} del precio de una unidad de tipo A, ¿cuál es el precio de cada tipo de perfume?',
925:'Se considera el recinto del plano situado en el primer cuadrante limitado por las rectas y=4x, y=8−4x y la curva y=2x−x².\na) Realiza un esbozo de dicho recinto.\nb) Calcula su área.',
927:'Sea la función f:ℝ→ℝ dada por f(x)=piecewise{eˣ(x²+ax) si x≤0;frac{bx²+c}{x+1} si x>0}. Calcula las constantes a, b y c sabiendo que f es derivable y que la recta tangente a la gráfica de f en el punto de abscisa x=1 tiene pendiente 3.',
929:'Considera el sistema de ecuaciones system{x+y+z=λ+1;3y+2z=2λ+3;3x+(λ−1)y+z=λ}.\na) Resuelve el sistema para λ=1.\nb) Halla los valores de λ para los que el sistema tiene una única solución.\nc) ¿Existe algún valor de λ para el que el sistema admite la solución (−frac{1}{2},0,frac{1}{2})?'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_REFLECTION_ORDERS_GLUING_LAYOUT']]:[];
export const cases=[{index:922,slot:4,literals:['P (2, −1, 3)','3x + 2y + z = 5']},{index:923,slot:4,literals:['A(8, −1, 3)','perpendicular']},{index:924,slot:1,literals:['2200 euros','1250 euros']},{index:925,slot:3,literals:['y = 4x','y = 8 − 4x']},{index:927,slot:2,literals:['pendiente 3','x2 + ax']},{index:929,slot:1,literals:['(λ − 1)y','2λ + 3']}];
export const proof=c=>({922:{P:[2,-1,3],n:[3,2,1],foot:[11/7,-9/7,20/7],reflection:[8/7,-11/7,19/7],distance:2/Math.sqrt(14)},923:{A:[8,-1,3],Q:[-1,2,1],u:[2,1,3],t:1.5,foot:[2,3.5,5.5],reflection:[-4,8,8],plane:[2,1,3,-24]},924:{orderWeights:[-2/5,11/5],price:1870,unitPrices:[50,30,20]},925:{vertices:[[0,0],[1,4],[2,0]],parts:[4/3,4/3],area:8/3},927:{a:0,b:4,c:0},929:{singular:1,origin:[1/3,5/3,0],direction:[-1/3,-2/3,1],point:[-.5,0,.5],pointParameter:-1}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s,visual=false)=>{const p=part(ps[i],a,d,e,s,'INDEPENDENT_PROJECTION_LINEAR_COMBINATION_DERIVATIVE_RANK_AND_AREA_CHECKS',proof(c));if(visual)p.visual=structuredClone(graphs[c.index]);return p;};switch(c.index){
case 922:return[mk(0,'P′=(frac{8}{7},−frac{11}{7},frac{19}{7}).',[
'P′=(frac{11}{7},−frac{9}{7},frac{20}{7}).',
'P′=(frac{20}{7},−frac{3}{7},frac{23}{7}).',
'P′=(−10,−9,−1).'],['Confundir la proyección ortogonal con el simétrico.','Desplazarse en sentido contrario al plano.','Omitir la división por el cuadrado del módulo del normal.'],[
['La proyección ortogonal se encuentra en la recta que pasa por P con dirección normal al plano.','n=(3,2,1); H=P−tn'],
['Sustituimos H en la ecuación del plano y resolvemos el parámetro.','3·2+2·(−1)+3−5=2; |n|²=14; 2−14t=0 ⇒ t=frac{1}{7}'],
['Calculamos la proyección.','H=(2,−1,3)−frac{1}{7}(3,2,1)=(frac{11}{7},−frac{9}{7},frac{20}{7})'],
['La proyección es el punto medio del segmento entre P y su simétrico.','P′=2H−P=P−frac{2}{7}n=(frac{8}{7},−frac{11}{7},frac{19}{7})'],
['Comprobamos que el punto medio está en el plano y que el segmento es perpendicular.','3·frac{11}{7}+2·(−frac{9}{7})+frac{20}{7}=5; P′−P=−frac{2}{7}n'],
['Las expresiones firmadas del plano en los puntos simétricos deben ser opuestas.','3P_x+2P_y+P_z−5=2; 3P′_x+2P′_y+P′_z−5=−2'],
]),mk(1,'d(P,π)=frac{2}{√14}=frac{√14}{7} u.', ['d(P,π)=2 u.','d(P,π)=frac{1}{7} u.','d(P,π)=frac{4}{√14} u.'],['Omitir el módulo del vector normal.','Dividir entre el módulo al cuadrado en vez de entre el módulo.','Dar la distancia entre el punto y su simétrico, que es el doble.'],[
['Escribimos el plano con todos los términos en un solo miembro.','π:3x+2y+z−5=0'],
['La distancia de un punto al plano es el valor absoluto de su expresión dividido entre el módulo del normal.','d(P,π)=frac{|3P_x+2P_y+P_z−5|}{√(3²+2²+1²)}'],
['Evaluamos por separado numerador y denominador.','|6−2+3−5|=2; √(9+4+1)=√14'],
['Calculamos y, si se desea, racionalizamos el resultado.','d(P,π)=frac{2}{√14}=frac{√14}{7}'],
['Verificamos mediante la longitud del vector entre P y la proyección del apartado anterior.','P−H=frac{1}{7}(3,2,1); |P−H|=frac{√14}{7}'],
['La distancia hasta el punto simétrico es el doble y no debe confundirse con la pedida.','|P−P′|=frac{2√14}{7}=2d(P,π)'],
])];
case 923:return[mk(0,'π:2x+y+3z−24=0.',[
'π:x+2y+3z−15=0.',
'π:2x+y+3z+24=0.',
'π:2x−y+3z−26=0.'],['Asignar el denominador dos a y en vez de a x al leer la recta.','Cambiar el signo de la constante al imponer el punto.','Cambiar un signo de la dirección aunque el plano siga pasando por A.'],[
['Leemos los denominadores en el PDF: el dos corresponde a x+1, no a y−2.','r:(x,y,z)=(−1,2,1)+t(2,1,3)'],
['Un plano perpendicular a una recta tiene por normal un vector director de esa recta.','n=(2,1,3)'],
['Usamos la ecuación punto-normal con el punto A.','2(x−8)+(y+1)+3(z−3)=0'],
['Desarrollamos y agrupamos los términos constantes.','2x−16+y+1+3z−9=0 ⇒ 2x+y+3z−24=0'],
['Verificamos que el punto pertenece al plano.','2·8+(−1)+3·3−24=0'],
['La dirección de r coincide con el normal obtenido, por lo que la perpendicularidad es exacta.','u_r=(2,1,3)=n; |n|²=14>0'],
]),mk(1,'A′=(−4,8,8).',[
'A′=(2,frac{7}{2},frac{11}{2}).',
'A′=(−8,9,−1).',
'A′=(20,−10,−2).'],['Dar el pie de la perpendicular en lugar del simétrico.','Reflejar respecto de un punto de la recta sin proyectar perpendicularmente.','Alejarse de la recta en lugar de atravesarla hasta el punto simétrico.'],[
['Para reflejar respecto de una recta necesitamos primero el pie de la perpendicular. Escribimos un punto genérico de r.','H=(−1,2,1)+t(2,1,3)'],
['El vector A−H debe ser perpendicular al vector director.','A−Q=(9,−3,2); (A−Q−tu)·u=0'],
['Despejamos t utilizando el producto escalar.','t=frac{(9,−3,2)·(2,1,3)}{14}=frac{18−3+6}{14}=frac{3}{2}'],
['Calculamos el pie y reflejamos A tomando H como punto medio.','H=(2,frac{7}{2},frac{11}{2}); A′=2H−A=(−4,8,8)'],
['Comprobamos que H está en r y en el plano perpendicular del apartado anterior.','frac{2+1}{2}=frac{7}{2}−2=frac{frac{11}{2}−1}{3}=frac{3}{2}; 2·2+frac{7}{2}+3·frac{11}{2}−24=0'],
['Verificamos perpendicularidad y equidistancia mediante los vectores opuestos desde H.','A−H=(6,−frac{9}{2},−frac{5}{2}); (A−H)·u=12−frac{9}{2}−frac{15}{2}=0; A′−H=−(A−H)'],
])];
case 924:return[mk(0,'El tercer pedido cuesta 1870 €.', ['El tercer pedido cuesta 2750 €.','El tercer pedido cuesta 3630 €.','El tercer pedido cuesta 187 €.'],['Usar solo la contribución del segundo pedido en la combinación lineal.','Sumar la contribución del primer pedido cuando su coeficiente es negativo.','Desplazar una cifra decimal al dividir los coeficientes entre cinco.'],[
['Llamamos a, b y c a los precios unitarios. No necesitamos determinarlos individualmente en este apartado.','20a+30b+15c=2200; 15a+10b+10c=1250'],
['Buscamos si el vector de cantidades del nuevo pedido es combinación lineal de los dos conocidos.','α(20,30,15)+β(15,10,10)=(25,10,16)'],
['Resolvemos con las dos primeras coordenadas y verificamos también la tercera.','20α+15β=25; 30α+10β=10 ⇒ α=−frac{2}{5}, β=frac{11}{5}'],
['La tercera cantidad coincide exactamente; por ello la combinación determina el precio aunque los precios individuales aún sean indeterminados.','15(−frac{2}{5})+10·frac{11}{5}=−6+22=16'],
['Aplicamos los mismos coeficientes a los importes de los pedidos.','25a+10b+16c=−frac{2}{5}·2200+frac{11}{5}·1250=−880+2750=1870'],
['Comprobamos todas las cantidades y observamos que ninguna condición nueva sobre los precios se ha usado.','−8+33=25; −12+22=10; −6+22=16'],
]),mk(1,'A: 50 €; B: 30 €; C: 20 € por unidad.',[
'A: 50 €; B: 20 €; C: 30 € por unidad.',
'A: 20 €; B: 30 €; C: 50 € por unidad.',
'A: 100 €; B: 60 €; C: 40 € por unidad.'],['Intercambiar los precios de los tipos B y C.','Invertir la proporción entre C y A.','Duplicar los precios al aplicar la proporción.'],[
['Añadimos la relación oficial entre los precios sin invertir la fracción.','c=frac{2}{5}a'],
['Sustituimos en las dos ecuaciones de compra.','26a+30b=2200; 19a+10b=1250'],
['Multiplicamos la segunda ecuación por tres para eliminar b.','57a+30b=3750; al restar:31a=1550'],
['Recuperamos el precio del perfume A y después el del tipo B.','a=50; 19·50+10b=1250 ⇒ b=30'],
['Calculamos el tipo C mediante la proporción.','c=frac{2}{5}·50=20'],
['Comprobamos ambas facturas y el pedido del apartado anterior.','20·50+30·30+15·20=2200; 15·50+10·30+10·20=1250; 25·50+10·30+16·20=1870'],
])];
case 925:return[mk(0,'Recinto entre (0,0), (1,4) y (2,0), por encima de y=2x−x² y por debajo de las dos rectas.',[
'Recinto triangular entre (0,0), (1,4) y (2,0), por encima del eje horizontal y sin la parábola.',
'Recinto entre (0,0), (1,4) y (2,0), por debajo de y=2x−x² y por encima de las dos rectas.',
'Recinto entre (0,0), (1,4) y (2,0), por encima de y=x²−2x y por debajo de las dos rectas.'],['Sustituir la frontera parabólica por el eje horizontal.','Invertir las fronteras superior e inferior.','Cambiar el signo de la parábola oficial.'],[
['Las dos rectas se cortan en el vértice superior del recinto.','4x=8−4x ⇒ x=1, y=4'],
['Hallamos los cortes de la primera recta con la parábola y conservamos el del primer cuadrante.','4x=2x−x² ⇒ x(x+2)=0 ⇒ (0,0); el otro corte tiene x=−2'],
['Repetimos con la segunda recta. El corte con x=4 tiene ordenada negativa y queda fuera del primer cuadrante.','8−4x=2x−x² ⇒ (x−2)(x−4)=0 ⇒ (2,0)'],
['La parábola abre hacia abajo, tiene vértice (1,1) y conecta los dos extremos inferiores.','2x−x²=1−(x−1)²'],
['Identificamos la frontera superior por tramos; la figura sombrea exactamente el recinto solicitado.','0≤x≤1:2x−x²≤y≤4x; 1≤x≤2:2x−x²≤y≤8−4x'],
['Verificamos las distancias verticales y que son positivas en el interior del recinto.','4x−(2x−x²)=x²+2x≥0; 8−4x−(2x−x²)=(x−2)(x−4)≥0 en [1,2]'],
],true),mk(1,'Área=frac{8}{3} u².', ['Área=4 u².','Área=frac{4}{3} u².','Área=frac{16}{3} u².'],['Calcular el triángulo completo sin restar la región bajo la parábola.','Calcular solo la mitad izquierda del recinto.','Sumar el área bajo la parábola en lugar de restarla al triángulo.'],[
['Separamos en x=1, donde cambia la recta que constituye la frontera superior.','S=∫₀¹(4x−2x+x²)dx+∫₁²(8−4x−2x+x²)dx'],
['Simplificamos las diferencias de alturas sin alterar la parábola.','S=∫₀¹(x²+2x)dx+∫₁²(x²−6x+8)dx'],
['Calculamos la primera contribución.','S₁=[frac{x³}{3}+x²]₀¹=frac{4}{3}'],
['Calculamos la segunda contribución evaluando los dos extremos.','S₂=[frac{x³}{3}−3x²+8x]₁²=(frac{8}{3}−12+16)−(frac{1}{3}−3+8)=frac{4}{3}'],
['Sumamos ambas partes.','S=frac{4}{3}+frac{4}{3}=frac{8}{3}'],
['Comprobamos independientemente restando al triángulo el área bajo la parábola.','S_triángulo=frac{2·4}{2}=4; ∫₀²(2x−x²)dx=frac{4}{3}; 4−frac{4}{3}=frac{8}{3}'],
],true)];
case 927:return[mk(0,'a=0, b=4 y c=0.',['a=0, b=3 y c=0.','a=1, b=4 y c=0.','a=−1, b=frac{13}{3} y c=1.'],['Identificar b directamente con la pendiente sin derivar el cociente.','No imponer la igualdad de derivadas laterales en cero.','Cumplir las derivadas ignorando la continuidad necesaria.'],[
['Cada rama es derivable en su intervalo. La posible dificultad está en cero, donde derivabilidad exige primero continuidad.','f(0)=0; lim_(x→0⁻)f(x)=0; lim_(x→0⁺)f(x)=c ⇒ c=0'],
['Derivamos la rama izquierda mediante la regla del producto.','f′(x)=eˣ(x²+ax)+eˣ(2x+a); f′(0⁻)=a'],
['Derivamos la rama derecha mediante la regla del cociente.','f′(x)=frac{2bx(x+1)−(bx²+c)}{(x+1)²}=frac{bx²+2bx−c}{(x+1)²}; f′(0⁺)=−c'],
['Igualamos las derivadas laterales usando c=0.','a=−c=0'],
['La pendiente de la tangente en uno es la derivada de la rama derecha en ese punto.','f′(1)=frac{3b−c}{4}=3 ⇒ b=4'],
['Comprobamos las tres condiciones en sus lugares correctos: unión y punto de tangencia.','f(0⁻)=f(0)=f(0⁺)=0; f′(0⁻)=f′(0⁺)=0; f′(1)=frac{12}{4}=3'],
])];
case 929:return[mk(0,'(x,y,z)=(frac{1−t}{3},frac{5−2t}{3},t), t∈ℝ.',[
'(x,y,z)=(frac{1+t}{3},frac{5−2t}{3},t), t∈ℝ.',
'(x,y,z)=(frac{1−t}{3},frac{5+2t}{3},t), t∈ℝ.',
'(x,y,z)=(1−t,5−2t,t), t∈ℝ.'],['Cambiar el signo al despejar x en la tercera ecuación.','Cambiar el signo al despejar y en la segunda.','Omitir las divisiones entre tres.'],[
['Sustituimos λ=1 en las tres ecuaciones.','x+y+z=2; 3y+2z=5; 3x+z=1'],
['La tercera fila ampliada es tres veces la primera menos la segunda. Un menor no nulo demuestra rango dos.','F₃=3F₁−F₂; det matrix{1,1;0,3}=3≠0; rg M=rg(M|b)=2<3'],
['Por Rouché–Frobenius el sistema tiene infinitas soluciones con un parámetro libre.','z=t, t∈ℝ'],
['Despejamos x e y con las ecuaciones más sencillas.','3x+t=1 ⇒ x=frac{1−t}{3}; 3y+2t=5 ⇒ y=frac{5−2t}{3}'],
['Reunimos toda la familia.','(x,y,z)=(frac{1−t}{3},frac{5−2t}{3},t), t∈ℝ'],
['Comprobamos la ecuación restante para cualquier parámetro.','x+y+z=frac{1−t+5−2t+3t}{3}=2'],
]),mk(1,'Solución única para todo λ≠1.',[
'Solución única para todo λ=1.',
'Solución única para todo λ≠−1.',
'Solución única para todo λ∈ℝ.'],['Invertir la condición de determinante no nulo.','Cambiar el signo de la raíz del determinante.','No estudiar el valor singular del parámetro.'],[
['Para un sistema cuadrado, determinante no nulo garantiza solución única para cualquier vector independiente.','M=matrix{1,1,1;0,3,2;3,λ−1,1}'],
['Desarrollamos el determinante por la primera fila.','det M=(3−2(λ−1))−(0−6)+(0−9)'],
['Simplificamos sin perder el signo del segundo cofactor.','det M=3−2λ+2+6−9=2−2λ'],
['Exigimos que el determinante sea distinto de cero.','2−2λ≠0 ⇔ λ≠1'],
['Por Rouché–Frobenius, en esos valores ambas matrices tienen rango tres.','λ≠1 ⇒ rg M=rg(M|b)=3'],
['El valor excluido no es único: el apartado anterior demuestra rango dos e infinitas soluciones.','λ=1 ⇒ rg M=rg(M|b)=2<3'],
]),mk(2,'Sí, únicamente para λ=−1.', ['Sí, únicamente para λ=1.','Sí, únicamente para λ=0.','No existe ningún λ.'],['Cambiar el signo al despejar el parámetro en la primera ecuación.','Confundir la suma nula de coordenadas con el valor de λ.','Concluir incompatibilidad sin sustituir en las tres ecuaciones.'],[
['Sustituimos las coordenadas propuestas; no basta comprobar una ecuación.','x=−frac{1}{2}; y=0; z=frac{1}{2}'],
['La primera ecuación fija el único candidato para el parámetro.','−frac{1}{2}+0+frac{1}{2}=λ+1 ⇒ λ=−1'],
['Comprobamos la segunda ecuación con ese mismo valor.','3·0+2·frac{1}{2}=1; 2(−1)+3=1'],
['Comprobamos la tercera conservando el coeficiente del término nulo.','3(−frac{1}{2})+(−1−1)·0+frac{1}{2}=−1=λ'],
['Las tres igualdades son ciertas simultáneamente.','λ=−1 admite la solución (−frac{1}{2},0,frac{1}{2})'],
['Además el determinante no es cero en ese valor, por lo que el punto es la solución única de ese sistema.','det M|_(λ=−1)=2−2(−1)=4≠0'],
])];default:throw Error('Unknown reflection-orders-gluing case');}}
export function buildReflectionOrdersGluingBatch(id='batch-0450',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Sistemas y combinaciones lineales',2:'Continuidad y derivabilidad',3:'Primitivas y áreas',4:'Geometría del espacio'})[c.slot];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===925?['Representación gráfica']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_REFLECTION_ORDERS_GLUING'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildReflectionOrdersGluingBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0450-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0450.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
