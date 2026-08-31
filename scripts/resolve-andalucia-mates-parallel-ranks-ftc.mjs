import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[658,'6897f4f853125d94016aa7c2498820eb7bcce4c5a134dc5f2773fde6ebc404a3',2,'B.3','9f68e86bbb547248a321a111a82b2a78f05010ef04519f4df46025ceb6cd9e62',0],
[660,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',1,'NONE.3','c331cbf52a49431b3024207087d67ebf0bce4c2b455f7ac3cb0871dc10f2fae7',0],
[661,'ced80d333d63057cef2e93eda07f0354ab91ecd5f58c11e8d6b7f388e08f5342',1,'NONE.4','1c0b504bc2f9528f576859891a7a2ba691542e0baf70041104ab9fda3f09e651',0],
[666,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',2,'NONE.4','084d33c26450a980b8b8548513542d274f5677370fdb8bb3996c80fd785c9dda',0],
[667,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',2,'NONE.3','084d33c26450a980b8b8548513542d274f5677370fdb8bb3996c80fd785c9dda',0],
[671,'bc1068e6e486699f6a6ed03adf4046983e887ae29f788c4576c2ffeaa551689d',2,'NONE.6','83395e6422472a29909bae2db481e42b36a122b9874392d7dbd7cf05ea392e74',0],
[675,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',2,'NONE.5','255362523916bded7fd19a038d28ca70a9f49f84ab9bfd8ffed67b18dbc41cef',0],
[677,'a6eb3a790229e9010e2add3d5742fe55ab4447f4ebec72a4c01d131f0baf4d92',1,'B.3','60b0c61251da21047d13bc012bc59ccc4ca734030d016b1134f4a968c892e724',0]];
export const statements={
658:'Considera el siguiente sistema de ecuaciones\nsystem{x−z=m;my+3z=1;4x+y−mz=5}.\na) Discútelo según los valores del parámetro m.\nb) Para m=1 resuelve el sistema y encuentra, si es posible, una solución para la que sea x=z.',
660:'Sean las matrices A=matrix{1,0,−1;0,m,3;4,1,−m}, B=matrix{1,0;3,2;−1,1} y C=matrix{5,−3,4;−3,−2,2}.\na) Indica los valores de m para los que A es invertible.\nb) Resuelve la ecuación matricial XA−Bᵗ=C para m=0. (Bᵗ es la matriz traspuesta de B).',
661:'Considera la recta r que pasa por los puntos A(1,0,−1) y B(−1,1,0).\na) Halla la ecuación de la recta s paralela a r que pasa por C(−2,3,2).\nb) Calcula la distancia de r a s.',
666:'Considera las rectas r y s dadas por\nr≡system{x=1+2λ;y=1−λ;z=1} y s≡system{x+2y=−1;z=−1}.\na) Comprueba que ambas rectas son coplanarias y halla la ecuación del plano que las contiene.\nb) Sabiendo que dos de los lados de un cuadrado están en las rectas r y s, calcula su área.',
667:'Se considera el sistema de ecuaciones lineales\nsystem{(3α−1)x+2y=5−α;αx+y=2;3αx+3y=α+5}.\na) Discútelo según los valores del parámetro α.\nb) Resuélvelo para α=1 y determina en dicho caso, si existe, alguna solución donde x=4.',
671:'En una cafetería, tres cafés, una tostada y dos zumos de naranja cuestan 7,50 €. Cuatro cafés, una tostada y un zumo de naranja cuestan 7,20 €.\na) Calcula, de forma razonada, el precio total de dos cafés, una tostada y tres zumos de naranja.\nb) ¿El precio de un zumo de naranja podría ser de 2 €? Razona la respuesta.',
675:'Considera el sistema de ecuaciones lineales:\nmatrix{α,1,1;α,−1,1;α,0,α} matrix{x;y;z}=matrix{0;0;0}.\na) Discute el sistema según los valores de α.\nb) Para α=1 resuelve el sistema y da una solución del mismo diferente de la solución trivial, si es posible.',
677:'Considera la función f:ℝ→ℝ definida por f(x)=integral_{0}^{x} cos(t)·sen²(t) dt. Determina las ecuaciones de la recta tangente y de la recta normal a la gráfica de f en el punto de abscisa x=frac{π}{4}.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PARALLEL_RANK_FTC_LAYOUT']]:[];
export const cases=[{index:658,slot:1,literals:['4x + y − mz = 5','sea x = z']},{index:660,slot:1,literals:['XA − Bt = C','m = 0']},{index:661,slot:4,literals:['A(1, 0, −1)','C(−2, 3, 2)']},{index:666,slot:4,literals:['x + 2y = −1','z = −1','cuadrado']},{index:667,slot:1,literals:['3αx + 3y = α + 5','x = 4']},{index:671,slot:1,literals:['7.50','7.20','dos cafés']},{index:675,slot:1,literals:['α −1','solución trivial']},{index:677,slot:3,literals:['cos(t) sen2(t) dt','recta normal']}];
export const proof=c=>({
658:{determinantCoefficients:[-3,4,-1],singularRanks:{1:[2,2],3:[2,3]},point:[1,1,0],direction:[1,-3,1]},
660:{determinantCoefficients:[-3,4,-1],X:[[6,3,0],[-3,0,0]],A0:[[1,0,-1],[0,0,3],[4,1,0]],Bt:[[1,3,-1],[0,2,1]],C:[[5,-3,4],[-3,-2,2]]},
661:{A:[1,0,-1],B:[-1,1,0],C:[-2,3,2],direction:[-2,1,1],distance:Math.sqrt(3)},
666:{P:[1,1,1],Q:[-1,0,-1],direction:[2,-1,0],normal:[1,2,-2],plane:[1,2,-2,-1],distance:6/Math.sqrt(5),area:36/5},
667:{exception:1,ranksAtOne:[1,1],ranksOtherwise:[2,3],point:[0,2],direction:[1,-1],particular:[4,-2]},
671:{observations:[[3,1,2,7.5],[4,1,1,7.2]],target:[2,1,3],combination:[2,-1],total:7.8,zTest:2,cTest:1.7,tTest:-1.6},
675:{determinantCoefficients:[0,2,-2],singular:[0,1],ranksAtSingular:[2,2],directionAtOne:[1,0,-1],example:[1,0,-1]},
677:{x:Math.PI/4,value:Math.SQRT2/12,tangentSlope:Math.SQRT2/4,normalSlope:-2*Math.SQRT2}
}[c.index]);
export function solve(c){const text=statements[c.index],ps=/\na\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_LINEAR_ALGEBRA_DISTANCE_AND_FTC',proof(c));switch(c.index){
case 658:return[mk(0,'m=1: compatible indeterminado; m=3: incompatible; m∉{1,3}: compatible determinado.',['m=1 y m=3: incompatibles; demás valores: compatible determinado.','m=1: incompatible; m=3: compatible indeterminado; demás valores: compatible determinado.','m=1 y m=3: compatibles indeterminados; demás valores: compatible determinado.'],['Suponer que todo determinante nulo implica incompatibilidad.','Intercambiar las comprobaciones de los dos valores singulares.','Ignorar la contradicción de términos independientes para m=3.'],[
['Formamos la matriz del sistema respetando el coeficiente menos m de la tercera ecuación.','A=matrix{1,0,−1;0,m,3;4,1,−m}; b=matrix{m;1;5}'],
['Expandimos el determinante por la primera fila y factorizamos.','det A=−m²−3+4m=−(m−1)(m−3)'],
['Fuera de los dos ceros del determinante los rangos son tres y existe solución única.','m∉{1,3} ⇒ rg A=rg(A|b)=3 ⇒ compatible determinado'],
['Para m=1 la tercera fila ampliada es combinación de las dos primeras y queda un menor no nulo.','F₃=4F₁+F₂; 5=4·1+1; det[[1,0],[0,1]]=1; rg A=rg(A|b)=2'],
['Para m=3 la dependencia de coeficientes no se cumple en los términos independientes.','F₃=4F₁+frac{1}{3}F₂ en A; 5≠4·3+frac{1}{3}·1=frac{37}{3}; rg A=2<rg(A|b)=3'],
['Aplicamos Rouché–Frobenius sin confundir singularidad con incompatibilidad.','m=1: infinitas soluciones; m=3: ninguna solución; demás m: una solución'],
]),mk(1,'(x,y,z)=(1+t,1−3t,t), t∈ℝ; no existe solución con x=z.',['(x,y,z)=(1+t,1−3t,t), t∈ℝ; sí existe una solución con x=z.','(x,y,z)=(1−t,1−3t,t), t∈ℝ; no existe solución con x=z.','(x,y,z)=(1+t,1+3t,t), t∈ℝ; no existe solución con x=z.'],['Ignorar la diferencia constante entre x y z.','Despejar x con el signo incorrecto.','Despejar y con el signo incorrecto.'],[
['Sustituimos m=1, que es el caso compatible con un parámetro libre.','x−z=1; y+3z=1; 4x+y−z=5'],
['Tomamos la tercera incógnita como parámetro.','z=t, t∈ℝ'],
['Las dos primeras ecuaciones determinan x e y.','x=1+t; y=1−3t'],
['La tercera igualdad queda satisfecha para todos los valores del parámetro.','4(1+t)+(1−3t)−t=5'],
['Describimos el conjunto completo, no solo una solución particular.','(x,y,z)=(1+t,1−3t,t), t∈ℝ'],
['La condición adicional contradice directamente la primera ecuación.','x−z=1≠0 ⇒ no existe solución con x=z'],
])];
case 660:return[mk(0,'A es invertible si y solo si m∉{1,3}.',['A es invertible si y solo si m∉{−1,−3}.','A es invertible si y solo si m≠0.','A es invertible si y solo si m∈{1,3}.'],['Cambiar los signos de las raíces al factorizar.','Confundir el parámetro con el determinante completo.','Invertir la condición de determinante no nulo.'],[
['La matriz A es cuadrada de orden tres; su invertibilidad equivale a determinante no nulo.','A invertible ⇔ det A≠0'],
['Expandimos por la primera fila, que contiene un cero.','det A=1·det[[m,3],[1,−m]]+(−1)·det[[0,m],[4,1]]'],
['Calculamos ambos menores conservando los signos.','det A=(−m²−3)−(−4m)=−m²+4m−3'],
['Factorizamos el polinomio del determinante.','det A=−(m−1)(m−3)'],
['Las únicas excepciones son los valores que anulan alguno de los factores.','m=1 o m=3 ⇒ A no invertible'],
['Concluimos y comprobamos un valor usado en el siguiente apartado.','A invertible ⇔ m∉{1,3}; det A(0)=−3≠0'],
]),mk(1,'X=matrix{6,3,0;−3,0,0}.',['X=matrix{28,11,−6;13,frac{14}{3},−4}.','X=matrix{6,−3,0;−3,0,0}.','X=matrix{6,3,0;3,0,0}.'],['Restar la traspuesta de B en lugar de sumarla al segundo miembro.','Cambiar el signo al despejar la segunda entrada de la primera fila.','Cambiar el signo de la primera entrada de la segunda fila.'],[
['X debe tener dos filas y tres columnas para que XA y C tengan la misma dimensión.','X∈ℝ^(2×3); A₀=matrix{1,0,−1;0,0,3;4,1,0}'],
['Trasponemos B y lo pasamos sumando al segundo miembro.','Bᵗ=matrix{1,3,−1;0,2,1}; XA₀=C+Bᵗ=matrix{6,0,3;−3,0,3}'],
['Podemos resolver cada fila de X sin multiplicar por una inversa del lado incorrecto.','(u,v,w)A₀=(u+4w,w,−u+3v)'],
['Igualamos la primera fila del producto con (6,0,3).','w=0; u=6; −6+3v=3 ⇒ v=3'],
['Igualamos la segunda fila con (−3,0,3) y reunimos las entradas.','w=0; u=−3; 3+3v=3 ⇒ v=0; X=matrix{6,3,0;−3,0,0}'],
['Comprobamos por multiplicación directa la ecuación original; la inversa existente garantiza unicidad.','XA₀−Bᵗ=matrix{6,0,3;−3,0,3}−matrix{1,3,−1;0,2,1}=matrix{5,−3,4;−3,−2,2}=C'],
])];
case 661:return[mk(0,'s: (x,y,z)=(−2,3,2)+t(−2,1,1), t∈ℝ.',['s: (x,y,z)=(−2,3,2)+t(2,1,1), t∈ℝ.','s: (x,y,z)=(1,0,−1)+t(−2,1,1), t∈ℝ.','s: (x,y,z)=(−2,3,2)+t(−2,−1,1), t∈ℝ.'],['Cambiar solo una componente de la dirección.','Usar el punto A en vez del punto C indicado.','Cambiar el signo de otra componente sin cambiar todo el vector.'],[
['La dirección de r se obtiene restando las coordenadas de sus dos puntos.','AB=B−A=(−1−1,1−0,0−(−1))=(−2,1,1)'],
['Una recta paralela puede usar el mismo vector director no nulo.','dₛ=(−2,1,1)'],
['El enunciado fija su punto de paso.','C=(−2,3,2)'],
['Escribimos la ecuación vectorial con un parámetro real.','s: (x,y,z)=(−2,3,2)+t(−2,1,1)'],
['Las tres componentes proporcionan también la forma paramétrica.','x=−2−2t; y=3+t; z=2+t'],
['Para t=0 pasa por C y su dirección coincide con la de r.','s(0)=C; dₛ×AB=(0,0,0)'],
]),mk(1,'d(r,s)=√3.',['d(r,s)=3√3.','d(r,s)=√18.','d(r,s)=frac{√3}{2}.'],['Tomar la distancia entre los puntos A y C en vez de la distancia entre rectas.','Olvidar dividir por el módulo del vector director.','Dividir por un vector duplicado sin duplicar el producto vectorial.'],[
['Las rectas son paralelas, por lo que basta calcular la distancia de C a r.','d(r,s)=d(C,r); AC=(−3,3,3); d=(−2,1,1)'],
['El área del paralelogramo equivale a base por altura y da la fórmula de distancia.','d(C,r)=frac{‖AC×d‖}{‖d‖}'],
['Calculamos el producto vectorial sin sustituirlo por el producto escalar.','AC×d=(0,−3,3); ‖AC×d‖=√18'],
['El módulo del vector director es raíz de seis.','‖d‖=√(4+1+1)=√6'],
['Dividimos y simplificamos.','d(r,s)=frac{√18}{√6}=√3'],
['Verificación independiente: la proyección de C sobre r es H=A+2d; CH es perpendicular a d.','H=(−3,2,1); C−H=(1,1,1); (C−H)·d=0; ‖C−H‖=√3'],
])];
case 666:return[mk(0,'Son coplanarias; el plano es x+2y−2z−1=0.',['Son coplanarias; el plano es z−1=0.','Son coplanarias; el plano es x+2y+2z−5=0.','Son coplanarias; el plano es x+2y−2z+1=0.'],['Leer incorrectamente z=1 en la segunda recta, donde el PDF dice z=−1.','Cambiar el signo de la componente normal asociada a z.','Cambiar el término independiente del plano.'],[
['Elegimos puntos y direcciones comprobando el signo de z en cada recta.','r: P=(1,1,1), d=(2,−1,0); s: Q=(−1,0,−1), e=(−2,1,0)=−d'],
['Sus direcciones son paralelas y los puntos no pertenecen a una misma recta.','PQ=(−2,−1,−2) no es múltiplo de d'],
['Dos rectas paralelas distintas determinan un plano; hallamos su normal.','d×PQ=(2,4,−4)=2(1,2,−2)'],
['Aplicamos punto y normal con el punto P.','(x−1)+2(y−1)−2(z−1)=0'],
['Simplificamos la ecuación general.','x+2y−2z−1=0'],
['Comprobamos que contiene ambas rectas: normal ortogonal a la dirección y ambos puntos en el plano.','(1,2,−2)·d=0; 1+2−2−1=0; −1+0+2−1=0'],
]),mk(1,'El área del cuadrado es frac{36}{5} unidades cuadradas.',['El área del cuadrado es frac{16}{5} unidades cuadradas.','El área del cuadrado es 9 unidades cuadradas.','El área del cuadrado es frac{6}{√5} unidades cuadradas.'],['Olvidar que las rectas están en alturas z distintas.','Tomar PQ como lado sin proyectar perpendicularmente a las rectas.','Dar la longitud del lado como si fuera el área.'],[
['Al ser paralelas distintas, las rectas contienen lados opuestos del cuadrado.','lado=d(r,s)'],
['Usamos la distancia desde Q a r mediante producto vectorial.','d(r,s)=frac{‖PQ×d‖}{‖d‖}; PQ=(−2,−1,−2)'],
['Evaluamos los módulos con las tres coordenadas, incluida z.','PQ×d=(−2,−4,4); ‖PQ×d‖=6; ‖d‖=√5'],
['El lado del cuadrado es la distancia entre las rectas.','lado=frac{6}{√5}'],
['Elevamos al cuadrado para obtener el área.','Área=(frac{6}{√5})²=frac{36}{5}'],
['La proyección ortogonal da la misma distancia al cuadrado de forma independiente.','‖PQ‖²−frac{(PQ·d)²}{‖d‖²}=9−frac{9}{5}=frac{36}{5}'],
])];
case 667:return[mk(0,'α=1: compatible indeterminado; α≠1: incompatible; nunca compatible determinado.',['α=1: compatible determinado; α≠1: incompatible.','α=1: compatible indeterminado; α≠1: compatible determinado.','α=−1: compatible indeterminado; α≠−1: incompatible.'],['Ignorar que las tres ecuaciones se reducen a una sola para α=1.','Estudiar solo las dos primeras ecuaciones y omitir la tercera.','Cambiar el signo al resolver la condición de compatibilidad.'],[
['El sistema tiene tres ecuaciones y dos incógnitas; recuperamos también la primera ecuación del PDF.','A=matrix{3α−1,2;α,1;3α,3}; b=matrix{5−α;2;α+5}'],
['Restamos tres veces la segunda ecuación a la tercera.','0=α+5−6=α−1'],
['Si α no es uno aparece una contradicción, aunque las dos primeras ecuaciones tengan solución.','α≠1 ⇒ incompatible'],
['El menor de las dos primeras filas justifica rango dos en ese caso y la contradicción aumenta el rango ampliado.','det[[3α−1,2],[α,1]]=α−1; α≠1 ⇒ rg A=2<rg(A|b)=3'],
['Para α=1 comprobamos que todas las filas ampliadas son proporcionales.','2x+2y=4; x+y=2; 3x+3y=6 ⇒ rg A=rg(A|b)=1'],
['El rango uno es menor que las dos incógnitas; queda un parámetro libre.','α=1 ⇒ compatible indeterminado; no hay ningún caso compatible determinado'],
]),mk(1,'(x,y)=(t,2−t), t∈ℝ; con x=4 se obtiene (4,−2).',['(x,y)=(t,2+t), t∈ℝ; con x=4 se obtiene (4,6).','(x,y)=(t,2−t), t∈ℝ; no existe solución con x=4.','(x,y)=(t,4−t), t∈ℝ; con x=4 se obtiene (4,0).'],['Cambiar el signo al despejar y.','Rechazar una elección admisible del parámetro libre.','No dividir la primera ecuación por dos.'],[
['Fijamos α=1 en las tres ecuaciones oficiales.','2x+2y=4; x+y=2; 3x+3y=6'],
['Las tres ecuaciones equivalen a una sola.','x+y=2'],
['Elegimos x como parámetro libre y despejamos y.','x=t; y=2−t'],
['La condición adicional determina un valor concreto del parámetro.','x=4 ⇒ t=4 ⇒ y=−2'],
['Comprobamos esta solución en todas las ecuaciones.','2·4+2(−2)=4; 4−2=2; 3·4+3(−2)=6'],
['Distinguimos el conjunto general de la solución particular solicitada.','General: (t,2−t), t∈ℝ; particular: (4,−2)'],
])];
case 671:return[mk(0,'El precio total es 7,80 €.',['El precio total es 7,20 €.','El precio total es 0,30 €.','El precio total es 14,70 €.'],['Restar la diferencia entre los dos consumos en vez de sumarla al primero.','Dar solo la diferencia entre los dos precios observados.','Sumar los dos consumos sin ajustar las cantidades.'],[
['Definimos los precios unitarios en euros del café, la tostada y el zumo.','c=café; t=tostada; z=zumo'],
['Traducimos los dos consumos oficiales a ecuaciones.','3c+t+2z=7,50; 4c+t+z=7,20'],
['No necesitamos determinar tres precios con dos ecuaciones; buscamos una combinación que dé el consumo pedido.','2(3,1,2)−(4,1,1)=(2,1,3)'],
['Aplicamos la misma combinación a ambos miembros.','2c+t+3z=2·7,50−7,20'],
['Calculamos el importe manteniendo unidades monetarias.','2c+t+3z=7,80 €'],
['Otra comprobación: el zumo cuesta 0,30 € más que el café y el nuevo consumo sustituye un café por un zumo.','z−c=7,50−7,20=0,30; total=7,50+0,30=7,80 €'],
]),mk(1,'No: z=2 € obligaría a c=1,70 € y t=−1,60 €, un precio negativo.',['Sí: z=2 € da c=1,70 € y t=−1,60 €, precios admisibles.','No: z=2 € obligaría a c=2,30 € y t=−3,40 €.','Sí: z=2 € da c=1,70 € y t=1,60 €, precios admisibles.'],['Aceptar un precio negativo como admisible en el contexto.','Invertir la diferencia entre café y zumo y calcular mal la tostada.','Cambiar el signo del precio de la tostada sin respetar las ecuaciones.'],[
['Restamos las ecuaciones para obtener la relación entre café y zumo.','(4c+t+z)−(3c+t+2z)=7,20−7,50 ⇒ c−z=−0,30'],
['Ensayamos la hipótesis preguntada para el precio del zumo.','z=2 ⇒ c=1,70'],
['Sustituimos ambos precios en el primer consumo.','3·1,70+t+2·2=7,50'],
['Despejamos el precio que debería tener la tostada.','t=7,50−5,10−4=−1,60 €'],
['Aunque resuelve el sistema algebraico, ese valor no es un precio admisible para el producto.','t<0 ⇒ z=2 € no es posible en el contexto'],
['Comprobamos ambas ecuaciones y distinguimos compatibilidad algebraica de admisibilidad económica.','3·1,70−1,60+2·2=7,50; 4·1,70−1,60+2=7,20'],
])];
case 675:return[mk(0,'α∉{0,1}: compatible determinado; α∈{0,1}: compatible indeterminado; nunca incompatible.',['α∉{0,1}: compatible determinado; α∈{0,1}: incompatible.','α∉{−1,0}: compatible determinado; α∈{−1,0}: compatible indeterminado.','α≠1: compatible determinado; α=1: compatible indeterminado.'],['Olvidar que un sistema homogéneo siempre admite la solución trivial.','Cambiar una raíz del determinante.','Perder el factor α al simplificar el determinante.'],[
['El segundo miembro es cero; la solución trivial garantiza compatibilidad para todo α.','A=matrix{α,1,1;α,−1,1;α,0,α}; b=0'],
['Restamos la primera fila a la segunda para simplificar el determinante.','F₂←F₂−F₁=(0,−2,0); det A=−2·det[[α,1],[α,α]]=−2α(α−1)'],
['Si α no es cero ni uno, la matriz es invertible y solo existe la solución trivial.','α∉{0,1} ⇒ rg A=3 ⇒ (x,y,z)=(0,0,0)'],
['Para α=0 las dos últimas columnas de las primeras filas dan un menor no nulo.','det[[1,1],[−1,1]]=2≠0; det A=0 ⇒ rg A=2'],
['Para α=1 las dos primeras columnas también proporcionan un menor no nulo.','det[[1,1],[1,−1]]=−2≠0; det A=0 ⇒ rg A=2'],
['El rango ampliado coincide con el de coeficientes al ser homogéneo; ambos casos singulares tienen un parámetro libre.','α∈{0,1}: rg A=rg(A|0)=2<3 ⇒ compatible indeterminado'],
]),mk(1,'(x,y,z)=(t,0,−t), t∈ℝ; por ejemplo, (1,0,−1) es no trivial.',['(x,y,z)=(t,0,t), t∈ℝ; por ejemplo, (1,0,1) es no trivial.','(x,y,z)=(t,−t,0), t∈ℝ; por ejemplo, (1,−1,0) es no trivial.','La única solución es (0,0,0); no hay solución no trivial.'],['Cambiar el signo al despejar z.','Imponer solo la primera ecuación y olvidar la segunda.','Confundir sistema homogéneo con solución trivial necesariamente única.'],[
['Sustituimos α=1 y escribimos las tres ecuaciones escalares.','x+y+z=0; x−y+z=0; x+z=0'],
['Restamos las dos primeras ecuaciones.','2y=0 ⇒ y=0'],
['La tercera determina la relación entre x y z.','z=−x'],
['Elegimos x como parámetro y describimos todas las soluciones.','(x,y,z)=(t,0,−t), t∈ℝ'],
['Tomando un parámetro no nulo obtenemos una solución distinta de la trivial.','t=1 ⇒ (1,0,−1)'],
['Comprobamos la familia entera en las tres ecuaciones.','t+0−t=0; t−0−t=0; t−t=0'],
])];
case 677:return[mk(0,'Tangente: y−frac{√2}{12}=frac{√2}{4}(x−frac{π}{4}); normal: y−frac{√2}{12}=−2√2(x−frac{π}{4}).',['Tangente: y−frac{√2}{12}=frac{√2}{4}(x−frac{π}{4}); normal: y−frac{√2}{12}=−frac{√2}{4}(x−frac{π}{4}).','Tangente: y−frac{√2}{12}=frac{√2}{4}(x−frac{π}{4}); normal: y−frac{√2}{12}=2√2(x−frac{π}{4}).','Tangente: y−frac{√2}{4}=frac{√2}{4}(x−frac{π}{4}); normal: y−frac{√2}{4}=−2√2(x−frac{π}{4}).'],['Cambiar solo el signo de la pendiente en lugar de tomar la inversa negativa.','Olvidar el signo negativo de la pendiente normal.','Omitir el divisor tres al integrar y calcular la ordenada del punto.'],[
['El integrando es continuo; el teorema fundamental permite derivar la integral de extremo variable.','f′(x)=cos(x)·sen²(x)'],
['Para calcular la ordenada integramos con el cambio u=sen(t), du=cos(t)dt.','f(x)=[frac{sen³(t)}{3}]₀ˣ=frac{sen³(x)}{3}'],
['Evaluamos función y derivada en la abscisa oficial.','x₀=frac{π}{4}; f(x₀)=frac{√2}{12}; f′(x₀)=frac{√2}{4}'],
['Aplicamos la forma punto-pendiente para la recta tangente.','y−frac{√2}{12}=frac{√2}{4}(x−frac{π}{4})'],
['La normal es perpendicular a la tangente; como la pendiente no es cero usamos su inversa negativa.','mₙ=−frac{1}{frac{√2}{4}}=−2√2; y−frac{√2}{12}=−2√2(x−frac{π}{4})'],
['Ambas rectas pasan por el punto; derivar la primitiva verifica el cálculo y el producto de pendientes prueba perpendicularidad.','(frac{sen³(x)}{3})′=sen²(x)cos(x); frac{√2}{4}·(−2√2)=−1'],
])];
default:throw Error('Unknown parallel/rank/FTC case');}}
export function buildParallelRanksFtcBatch(id='batch-0433',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===4?'Propiedades métricas':'Integrales definidas';x.secondaryTopics=c.index===660?['Matrices']:c.index===677?['Aplicaciones de la derivada']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'ROW_OPERATIONS_AND_FULL_SUBSTITUTION':c.slot===4?'POINT_DIRECTION_AND_ORTHOGONAL_PROJECTION':'FTC_PRIMITIVE_AND_NORMAL_CHECK'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildParallelRanksFtcBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0433-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0433.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
