import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[302,'4aa4c2d71811ca346af7cfd770227925f526cbe73dfa4a591abc027bcfca6884',2,'6','b86d627ca03e0583de2a31229a21af0a90b024435c0b294645545294fc8ddf7d',0],
[304,'915e3de08a67887ee286773fac80c8a3a54dc62f3ddee5b1bd715b9b25069857',2,'8','eae1d6ab7e6dcfd8c8b1a064d8ffe3a3c8d4516caa7a9c86da0421cdb3b119d3',0],
[305,'8bab92660a5a8eecfd54fa7be53b1c173e06c5a122d8c915e97ae36fc0e1dc78',1,'A.3','954672dba05a9e943b9ebc71bd78b79c7f59fe6c272d5bff4eb21240c0b53acb',0],
[307,'4b92916bd8a715dafc1c05c471afbd863005f48352c1414bda393158ede42d5c',1,'A.3','368e9f9cf7873873ada74b56d631c3e3171de340ae2e5e479b66b2892c5d6e3a',0],
[310,'ced80d333d63057cef2e93eda07f0354ab91ecd5f58c11e8d6b7f388e08f5342',1,'A.3','1c0b504bc2f9528f576859891a7a2ba691542e0baf70041104ab9fda3f09e651',0]];
export const statements={
302:'Considera las matrices A=[[1,−1,0],[1,m,1]] y B=[[1,1],[0,2],[m,−1]].\na) Calcula m para que AB no tenga inversa. (1 punto)\nb) Estudia el rango de la matriz BA según los valores de m. (1,5 puntos)',
304:'Considera las rectas\nr: system{x=1+λ;y=1+λ;z=2+mλ}\ns: system{x−y+2z=3;x+z=2}\na) Estudia la posición relativa de r y s según los valores de m. (1,5 puntos)\nb) Para m=1, calcula el coseno del ángulo que forman las rectas r y s. (1 punto)',
305:'Sean A y B dos matrices cuadradas de orden 3 cuyos determinantes son |A|=frac{1}{2} y |B|=−2. Halla:\na) [0,5 puntos] |A³|.\nb) [0,5 puntos] |A^{−1}|.\nc) [0,5 puntos] |−2A|.\nd) [0,5 puntos] |AB^t|, siendo B^t la matriz traspuesta de B.\ne) [0,5 puntos] El rango de B.',
307:'Considera el sistema de ecuaciones\nsystem{x+ky+2z=k+1;x+2y+kz=3;(k+1)x+y+z=k+2}\na) [1,25 puntos] Determina los valores de k para los que el sistema tiene más de una solución.\nb) [0,5 puntos] ¿Existe algún valor de k para el cual el sistema no tiene solución?\nc) [0,75 puntos] Resuelve el sistema para k=0.',
310:'Considera el siguiente sistema de ecuaciones lineales\nsystem{x+2y−3z=3;2x+3y+z=5}\na) [1,5 puntos] Calcula α de manera que al añadir una tercera ecuación de la forma αx+y−7z=1 el sistema resultante tenga las mismas soluciones que el original.\nb) [1 punto] Calcula las soluciones del sistema dado tales que la suma de los valores de las incógnitas sea 4.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_DEPENDENT_ROWS_SOURCE_LAYOUT']]:[];
export const cases=[{index:302,literals:['matrices A','rango de la matriz BA']},{index:304,literals:['z = 2 + mλ','x+z = 2'],geometry:true},{index:305,literals:['orden 3','|B| = −2']},{index:307,literals:['(k + 1)x','k = 0']},{index:310,literals:['αx + y − 7z = 1','sea 4']}];
export const proof=c=>({302:{singular:-1/3,rankBA:2,fixedMinor:2},304:{intersectParameter:1,intersection:[.5,.5,1.5],cosine:1/3},305:{answers:[1/8,2,-4,-1,3]},307:{infinite:[-3,0,2],incompatible:[],solutionK0:'x=1-2t,y=1+t,z=t'},310:{alpha:0,solution:[25/3,-11/3,-2/3]}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_MATRIX_OR_LINEAR_SYSTEM_WITH_INDEPENDENT_SUBSTITUTION',proof(c));switch(c.index){
case 302:return[mk(0,'m=−frac{1}{3}.',['m=frac{1}{3}.','m=−1.','m=0.'],['Cambiar el signo al despejar el determinante.','Omitir la contribución 2m al determinante.','Confundir el parámetro con un factor que no aparece en el determinante.'],[
['A tiene dos filas y tres columnas; B tiene tres filas y dos columnas. El producto AB es cuadrado de orden dos.','A: 2×3; B: 3×2; AB: 2×2'],
['Multiplicamos cada fila de A por las dos columnas de B respetando el orden.','AB=[[1,−1],[1+m,2m]]'],
['Una matriz cuadrada no tiene inversa si y solo si su determinante se anula.','det(AB)=1·2m−(−1)(1+m)=3m+1'],
['Resolvemos la ecuación lineal del determinante.','3m+1=0 ⇒ m=−frac{1}{3}'],
['Sustituimos para comprobar la dependencia de las filas del producto.','AB=[[1,−1],[frac{2}{3},−frac{2}{3}]]; fila 2=frac{2}{3}·fila 1'],
['La expresión del determinante solo tiene esa raíz, de modo que para cualquier otro parámetro el producto es invertible.','m≠−frac{1}{3} ⇒ det(AB)≠0'],
]),mk(1,'rango(BA)=2 para todo m∈ℝ.',['rango(BA)=1 si m=−frac{1}{3}; rango 2 en otro caso.','rango(BA)=3 para todo m∈ℝ.','rango(BA)=1 si m=0; rango 2 en otro caso.'],['Trasladar incorrectamente el rango del producto AB al producto BA.','Confundir el tamaño tres por tres con rango necesariamente tres.','Suponer dependencia al anular un parámetro sin comprobar menores.'],[
['El orden importa: BA es tres por tres, a diferencia del producto anterior.','BA=[[2,m−1,1],[2,2m,2],[m−1,−2m,−1]]'],
['El rango de un producto no supera el rango de ninguno de sus factores. A tiene solo dos filas.','rango(BA)≤rango(A)≤2'],
['Buscamos un menor de orden dos que no dependa del parámetro. Tomamos filas primera y segunda y columnas primera y tercera.','Menor=[[2,1],[2,2]]'],
['Su determinante es siempre distinto de cero. Por tanto, el rango no puede bajar de dos.','2·2−2·1=2≠0 ⇒ rango(BA)≥2'],
['Las cotas inferior y superior coinciden y valen para cualquier número real m.','rango(BA)=2 para todo m'],
['Esto también explica por qué el valor singular de AB no cambia el resultado: el mismo menor permanece no nulo.','m=−frac{1}{3} ⇒ menor=2; m=0 ⇒ menor=2'],
])];
case 304:return[mk(0,'Secantes si m=1; se cruzan si m≠1.',['Secantes si m=−1; se cruzan si m≠−1.','Paralelas si m=1; secantes si m≠1.','Coincidentes si m=1; se cruzan si m≠1.'],['Cambiar el signo al igualar las condiciones del punto común.','Confundir la condición de intersección con paralelismo.','Confundir un punto común con igualdad de las rectas.'],[
['Parametrizamos s tomando z igual a t para identificar su punto y vector director.','s: (x;y;z)=(2−t;−1+t;t); v_s=(−1;1;1)'],
['El director de r no puede ser proporcional al de s: las dos primeras coordenadas exigirían factores opuestos.','v_r=(1;1;m); no existe factor que lleve (−1;1) a (1;1)'],
['Por tanto, solo pueden cortarse o cruzarse. Sustituimos r en las dos ecuaciones de s.','4+2mλ=3; 3+(m+1)λ=2'],
['Las condiciones equivalen a dos ecuaciones para el mismo parámetro; restarlas evita dividir por m.','2mλ=−1; (m+1)λ=−1 ⇒ (m−1)λ=0'],
['El parámetro λ no puede ser cero porque daría cero igual a menos uno. Luego m debe ser uno.','m=1; 2λ=−1 ⇒ λ=−frac{1}{2}; P=(frac{1}{2};frac{1}{2};frac{3}{2})'],
['Comprobamos el punto común y concluimos: sin direcciones paralelas ni punto común, los demás casos son rectas que se cruzan.','frac{1}{2}−frac{1}{2}+2·frac{3}{2}=3; frac{1}{2}+frac{3}{2}=2'],
]),mk(1,'cos(θ)=frac{1}{3}.',['cos(θ)=−frac{1}{3}.','cos(θ)=frac{1}{√3}.','cos(θ)=0.'],['Omitir el valor absoluto que da el ángulo menor entre rectas al elegir directores opuestos.','Dividir por una sola norma en lugar del producto de ambas.','Omitir la contribución de las terceras coordenadas al producto escalar.'],[
['Con el valor de m indicado, elegimos vectores directores de ambas rectas.','u=(1;1;1); v=(−1;1;1)'],
['El ángulo entre rectas se toma entre cero y noventa grados, usando el valor absoluto del producto escalar.','cos(θ)=frac{|u·v|}{‖u‖‖v‖}'],
['Calculamos el producto escalar componente a componente.','u·v=−1+1+1=1'],
['Calculamos las dos normas euclídeas.','‖u‖=√3; ‖v‖=√3'],
['Sustituimos y simplificamos el denominador.','cos(θ)=frac{1}{√3·√3}=frac{1}{3}'],
['Cambiar un vector por su opuesto no altera el ángulo de las rectas gracias al valor absoluto.','frac{|u·(−v)|}{‖u‖‖−v‖}=frac{|−1|}{3}=frac{1}{3}'],
])];
case 305:return[mk(0,'|A³|=frac{1}{8}.',['|A³|=frac{3}{2}.','|A³|=frac{1}{6}.','|A³|=−frac{1}{8}.'],['Multiplicar el determinante por tres en lugar de elevarlo.','Multiplicar el denominador por el exponente.','Introducir un signo negativo sin cambio de filas.'],[
['Leemos el dato oficial como un medio: la fracción no debe perder su denominador.','det(A)=frac{1}{2}'],
['La potencia tercera representa el producto de tres matrices A.','A³=A·A·A'],
['El determinante de un producto es el producto de los determinantes.','det(A³)=det(A)·det(A)·det(A)'],
['Sustituimos y elevamos tanto numerador como denominador.','(frac{1}{2})³=frac{1³}{2³}=frac{1}{8}'],
['El resultado es positivo porque el determinante de cada factor es positivo.','det(A³)=frac{1}{8}>0'],
['Una matriz diagonal compatible permite comprobar la propiedad numéricamente.','D=diag(frac{1}{2},1,1); D³=diag(frac{1}{8},1,1)'],
]),mk(1,'|A^{−1}|=2.',['|A^{−1}|=frac{1}{2}.','|A^{−1}|=−2.','|A^{−1}|=−frac{1}{2}.'],['Conservar el determinante en lugar de invertirlo.','Interpretar el exponente menos uno como signo negativo del recíproco.','Cambiar solo el signo del determinante original.'],[
['El determinante de A es no nulo, por lo que la matriz inversa existe.','det(A)=frac{1}{2}≠0'],
['La matriz inversa se caracteriza por su producto con A.','A·A^{−1}=I'],
['Tomamos determinantes en ambos miembros.','det(A)det(A^{−1})=det(I)=1'],
['Despejamos el determinante buscado dividiendo por un medio.','det(A^{−1})=frac{1}{1/2}=2'],
['Comprobamos la identidad multiplicativa con el resultado obtenido.','frac{1}{2}·2=1'],
['La matriz diagonal del apartado anterior tiene inversa diagonal, que confirma el recíproco.','diag(frac{1}{2},1,1)^{−1}=diag(2,1,1)'],
]),mk(2,'|−2A|=−4.',['|−2A|=−1.','|−2A|=4.','|−2A|=−8.'],['Multiplicar el determinante por el escalar una sola vez.','Perder el signo de una potencia impar.','Omitir el factor un medio del determinante original.'],[
['La matriz tiene orden tres; multiplicar toda la matriz por menos dos multiplica sus tres filas.','Orden(A)=3'],
['Cada fila aporta un factor menos dos al determinante por multilinealidad.','det(−2A)=(−2)³det(A)'],
['Calculamos la potencia impar conservando el signo.','(−2)³=−8'],
['Sustituimos el determinante original y multiplicamos.','det(−2A)=−8·frac{1}{2}=−4'],
['El signo negativo es coherente con tres multiplicaciones de fila por un número negativo.','Tres factores negativos ⇒ producto negativo'],
['La matriz diagonal de comprobación pasa a tener entradas menos uno, menos dos y menos dos.','det(diag(−1,−2,−2))=−4'],
]),mk(3,'|AB^t|=−1.',['|AB^t|=1.','|AB^t|=−4.','|AB^t|=−frac{3}{2}.'],['Cambiar el signo del determinante al trasponer.','Invertir el determinante de A sin que se pida la inversa.','Sumar determinantes en lugar de multiplicarlos.'],[
['La trasposición intercambia filas y columnas, pero no cambia el determinante.','det(B^t)=det(B)=−2'],
['El producto AB traspuesta es cuadrado del mismo orden y admite la propiedad multiplicativa.','det(AB^t)=det(A)det(B^t)'],
['Sustituimos los dos datos acreditados.','det(AB^t)=frac{1}{2}·(−2)'],
['Simplificamos el producto y conservamos su signo.','det(AB^t)=−1'],
['No es necesario conocer las entradas de A o B: las propiedades del determinante bastan.','El resultado depende solo de det(A) y det(B)'],
['Comprobamos con matrices diagonales compatibles, cuya traspuesta coincide con ellas mismas.','A=diag(frac{1}{2},1,1); B=diag(−2,1,1); AB^t=diag(−1,1,1)'],
]),mk(4,'rango(B)=3.',['rango(B)=2.','rango(B)=1.','rango(B)=0.'],['Confundir el valor absoluto del determinante con el rango.','Suponer rango uno por disponer de un único dato numérico.','Confundir un determinante negativo con un determinante nulo.'],[
['B tiene tres filas y tres columnas, lo que establece la cota máxima de rango.','rango(B)≤3'],
['Su determinante es negativo, pero lo relevante para el rango es que no sea cero.','det(B)=−2≠0'],
['Un determinante de orden tres no nulo es un menor de orden tres no nulo.','Existe un menor no nulo de orden 3'],
['Por definición de rango mediante menores, la cota inferior es tres.','rango(B)≥3'],
['Al coincidir ambas cotas, el rango es exactamente tres.','rango(B)=3'],
['Equivalentemente, B es invertible y sus tres columnas son linealmente independientes.','B invertible ⇔ rango(B)=3'],
])];
case 307:return[mk(0,'k=−3, k=0 o k=2.',['Solo k=0 o k=2.','Solo k=−3 o k=2.','Solo k=−3 o k=0.'],['Descartar erróneamente el valor menos tres sin estudiar compatibilidad.','Descartar erróneamente el valor cero sin comparar la matriz ampliada.','Descartar el valor dos por confundir filas repetidas con incompatibilidad.'],[
['Formamos la matriz de coeficientes. Más de una solución exige determinante cero y compatibilidad.','A=[[1,k,2],[1,2,k],[k+1,1,1]]'],
['Desarrollamos el determinante por la primera fila y factorizamos.','det(A)=(2−k)−k(1−k(k+1))+2(1−2(k+1))=k(k+3)(k−2)'],
['Solo debemos estudiar tres valores singulares. Para los demás existe solución única.','det(A)=0 ⇔ k∈{−3,0,2}'],
['Comparamos ecuaciones completas, incluidos términos independientes, para probar compatibilidad.','k=0: E₃=frac{E₁+E₂}{2}; k=2: E₁=E₂; k=−3: E₃=−E₁−E₂'],
['En cada caso quedan dos ecuaciones independientes. Los rangos de coeficientes y ampliada coinciden en dos.','k=0: menor(x,y)=2; k=2: menor(E₁,E₃;x,y)=−5; k=−3: menor(E₁,E₂;x,y)=5'],
['Los tres sistemas son compatibles indeterminados con un parámetro libre; no hay otro valor con más de una solución.','rango(A)=rango(A|b)=2<3 para k=−3,0,2'],
]),mk(1,'No; el sistema tiene solución para todo k∈ℝ.',['Sí, solo para k=−3.','Sí, solo para k=0.','Sí, solo para k=2.'],['Ignorar que la tercera ecuación es combinación compatible de las dos primeras.','Ignorar que también el término independiente satisface la relación entre filas.','Considerar incompatibles dos ecuaciones que son idénticas.'],[
['Cuando el determinante no se anula, el sistema es compatible determinado.','k∉{−3,0,2} ⇒ det(A)≠0 ⇒ solución única'],
['En cero, la tercera ecuación es el promedio de las primeras, incluidos sus términos independientes.','k=0: E₁: x+2z=1; E₂: x+2y=3; E₃: x+y+z=2'],
['En dos, las primeras ecuaciones son exactamente iguales, y la tercera es independiente.','k=2: x+2y+2z=3; 3x+y+z=4'],
['En menos tres, la tercera ecuación es menos la suma de las otras dos, también en el segundo miembro.','k=−3: −(−2+3)=−1=k+2'],
['Por tanto, en los valores singulares ambos rangos valen dos: tampoco aparece incompatibilidad.','rango(A)=rango(A|b)=2'],
['Una solución explícita común a todos los parámetros proporciona una verificación aún más directa.','(x;y;z)=(1;1;0): 1+k=k+1; 1+2=3; k+1+1=k+2'],
]),mk(2,'(x;y;z)=(1−2t;1+t;t), t∈ℝ.',['(x;y;z)=(1+2t;1−t;t), t∈ℝ.','(x;y;z)=(1−2t;1−t;t), t∈ℝ.','Única solución: (1;1;0).'],['Cambiar el signo al despejar x y compensar incorrectamente y.','Cambiar el signo al despejar y en la segunda ecuación.','Fijar el parámetro libre en cero y omitir las demás soluciones.'],[
['Sustituimos k por cero en las tres ecuaciones originales.','system{x+2z=1;x+2y=3;x+y+z=2}'],
['La tercera ecuación es redundante: coincide con la semisuma de las dos primeras.','E₃=frac{E₁+E₂}{2}'],
['Elegimos z como parámetro real libre y despejamos x en la primera ecuación.','z=t ⇒ x=1−2t'],
['Sustituimos x en la segunda ecuación y obtenemos y.','1−2t+2y=3 ⇒ y=1+t'],
['Escribimos toda la familia de soluciones, no solo una solución particular.','(x;y;z)=(1−2t;1+t;t), t∈ℝ'],
['La sustitución verifica las tres ecuaciones para cualquier valor del parámetro.','x+2z=1; x+2y=3; x+y+z=2'],
])];
case 310:return[mk(0,'α=0.',['α=1.','α=−1.','α=2.'],['Añadir un coeficiente de x que no procede de la combinación compatible.','Cambiar el orden de la combinación de ecuaciones solo en el coeficiente de x.','Confundir el factor de la primera ecuación con el coeficiente final de x.'],[
['Para no cambiar el conjunto de soluciones, la nueva ecuación debe ser consecuencia de las dos originales. Buscamos una combinación lineal.','uE₁+vE₂'],
['Igualamos los coeficientes de y y z a los de la ecuación nueva.','2u+3v=1; −3u+v=−7'],
['Resolvemos las dos ecuaciones para los multiplicadores.','v=−7+3u ⇒ 11u=22 ⇒ u=2; v=−1'],
['Calculamos el coeficiente resultante de x y verificamos el término independiente.','α=u+2v=0; 3u+5v=1'],
['La combinación completa produce exactamente la ecuación buscada sin añadir restricciones.','2E₁−E₂: y−7z=1'],
['La familia original contiene distintos valores de x, por lo que cualquier α no nulo impondría una restricción adicional.','Soluciones originales: (1−11t;1+7t;t); α(1−11t)=0 para todo t exige α=0'],
]),mk(1,'(x;y;z)=(frac{25}{3};−frac{11}{3};−frac{2}{3}).',['(x;y;z)=(−frac{19}{3};frac{17}{3};frac{2}{3}).','(x;y;z)=(1;1;0).','(x;y;z)=(frac{25}{3};frac{11}{3};−frac{2}{3}).'],['Cambiar el signo al despejar el parámetro de la suma.','Elegir un punto de la recta sin imponer suma cuatro.','Perder el signo negativo de la segunda incógnita.'],[
['Reducimos el sistema original eliminando x entre sus dos ecuaciones.','2E₁−E₂: y−7z=1 ⇒ y=1+7z'],
['Sustituimos en la primera ecuación para despejar x.','x+2(1+7z)−3z=3 ⇒ x=1−11z'],
['Imponemos ahora la condición adicional de suma cuatro.','(1−11z)+(1+7z)+z=4 ⇒ 2−3z=4'],
['Resolvemos z y recuperamos las otras incógnitas.','z=−frac{2}{3}; y=−frac{11}{3}; x=frac{25}{3}'],
['Comprobamos las dos ecuaciones originales con los tres valores.','x+2y−3z=frac{25−22+6}{3}=3\n2x+3y+z=frac{50−33−2}{3}=5'],
['La suma también es cuatro. La ecuación lineal del parámetro tiene una sola raíz, de modo que no hay más soluciones pedidas.','x+y+z=frac{25−11−2}{3}=4'],
])];default:throw Error('Unknown source case');}}
export function buildDependentRowsBatch(id='batch-0408',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.geometry?'Planos y rectas':'Matrices y determinantes';x.secondaryTopics=[];x.block=c.geometry?'Geometría':'Álgebra';x.examSlot=c.geometry?4:1;x[c.geometry?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.geometry?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDependentRowsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0408-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0408.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
