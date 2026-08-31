import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[481,'15c3470cfea7d61b997f1f400cd8e1ecd8baee17b80f43cf5388e1693d2b5a77',2,'B.3','786722e97ced8b558da2429321390a3c613cbe0da254ab1b2c0f307e72fad089',0],
[488,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',2,'B.1','48e7b1ddab05696a9a04c9c76a3f1af8081fbfcf7a3df283bda8b7700410662c',0],
[489,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',2,'7','7febc2d0bcd505ffa5e938ce58835cbdd6b52b1cf58039d2794dd4b309657bab',0],
[495,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',1,'A.3','4eaa5678dce2a49fdb35853d6cb553eb2ec0ee477006e7f79a4bf8378b1d8096',0],
[504,'83fb1553a0210c1a82e5760e2664d28df565127e870fef743346b4bb30953bd8',2,'B.1','54a0510c0bfbc04c74fb68123878b6a65dedcba235df64d1dcbd4a8e5245e98f',0],
[508,'1e4f531b5628e8a28245106f3c6fabe999a180d01408f83dbb02d7a79a9c179e',1,'A.3','7b89c1ae266556929588efee3bb779a0c44ae58ea1c69a89403f163678b8594c',0],
[513,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',1,'A.2','58af78b11a2546ff738856daba0839cb8923e8e1b028ebf490dba977882c4eaa',0],
[515,'6897f4f853125d94016aa7c2498820eb7bcce4c5a134dc5f2773fde6ebc404a3',2,'B.4','9f68e86bbb547248a321a111a82b2a78f05010ef04519f4df46025ceb6cd9e62',0]];
export const statements={
481:'Considera las matrices A=[[1,2],[1,1]] y B=[[4,−1],[4,1]].\na) Halla el determinante de una matriz X que verifique la igualdad X²AX=B.\nb) Determina, si existe, la matriz Y que verifica la igualdad A²YB⁻¹=A.',
488:'Sabiendo que lim_{x→0} frac{a x²+b x+1−cos(x)}{sen(x²)} es finito e igual a uno, calcula los valores de a y b.',
489:'Considera A=[[1,1,1],[1,0,1],[4,1,4]], B=[[a],[2a],[3a]] y X=[[x],[y],[z]].\na) Discute el sistema dado por AX=B, según los valores de a.\nb) Para a=0, resuelve el sistema dado por AX=B. Calcula, si es posible, una solución en la que y+z=4.',
495:'Calcula ∫ frac{2x³+2x²−2x+7}{x²+x−2} dx.',
504:'Se sabe que la función f:ℝ→ℝ, dada por\nf(x)=piecewise{x²−a x+2b si x≤0;frac{ln(x+1)}{x} si x>0}\n(ln denota la función logaritmo neperiano) es derivable. Calcula a y b.',
508:'Determina la función f:(0,+∞)→ℝ, sabiendo que es dos veces derivable, su gráfica pasa por el punto (1,0), f′(e)=e y f′′(x)=2ln(x)+1, para todo x>0 (ln denota la función logaritmo neperiano).',
513:'Sea la función f:ℝ→ℝ definida por f(x)=(1−x²)e^{−x}. Determina la primitiva de f cuya gráfica pasa por el punto (−1,0).',
515:'Considera las rectas r y s dadas por\nr: system{x=2t;y=1;z=0} y s: system{x+y=2;z=2}.\na) Determina la ecuación de la recta que corta perpendicularmente a r y a s.\nb) Calcula la distancia entre las rectas dadas.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATRIX_LOG_PRIMITIVES_SOURCE_LAYOUT']]:[];
export const cases=[{index:481,slot:1,literals:['X2AX = B','A2Y B−1 = A']},{index:488,slot:2,whole:true,literals:['ax2 + bx + 1 − cos(x)','igual a uno']},{index:489,slot:1,literals:['AX = B','y + z = 4']},{index:495,slot:3,whole:true,literals:['2x3 + 2x2 − 2x + 7']},{index:504,slot:2,whole:true,literals:['ln(x + 1)','es derivable']},{index:508,slot:3,whole:true,literals:['2 ln(x) + 1','(1, 0)']},{index:513,slot:3,whole:true,literals:['(1 − x2)e−x','(−1, 0)']},{index:515,slot:4,literals:['x = 2t','perpendicularmente']}];
export const proof=c=>({481:{detA:-1,detB:8,detX:-2,Y:[[4,3],[0,-2]]},488:{a:.5,b:0,limit:1},489:{rank:2,compatibleParameter:0,kernel:[-1,0,1],particular:[-4,0,4]},495:{polynomial:[0,0,1],residues:[-1,3],poles:[-2,1]},504:{a:.5,b:.5,value:1,slope:-.5},508:{logQuadratic:1,quadratic:-1,linear:0,constant:1},513:{polynomial:[1,2,1],constant:0},515:{r:[1,1,0],s:[1,1,2],direction:[0,0,1],distance:2}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_MATRIX_CALCULUS_OR_METRIC_CHECK',proof(c));switch(c.index){
case 481:return[mk(0,'det(X)=−2.',['det(X)=2.','det(X)=−8.','det(X)=−√8.'],['Omitir el signo negativo del determinante de A.','Olvidar que X aparece tres veces en el producto.','Contar únicamente las dos apariciones en X².'],[
['Calculamos los determinantes de las matrices oficiales de orden dos.','det(A)=1·1−2·1=−1; det(B)=4·1−(−1)·4=8'],
['Tomamos determinantes en la igualdad. La propiedad multiplicativa es válida sin suponer que A y X conmutan.','det(X²AX)=det(X)²·det(A)·det(X)=det(B)'],
['Agrupamos los tres factores del determinante de X y sustituimos el de A.','−det(X)³=8'],
['Despejamos la potencia y tomamos la raíz cúbica real, que conserva el signo.','det(X)³=−8 ⇒ det(X)=−2'],
['La potencia es impar: no corresponde añadir dos signos como en una ecuación cuadrática.','d³=−8 tiene una única solución real d=−2'],
['Verificamos en la igualdad de determinantes inicial.','(−2)²·(−1)·(−2)=8=det(B)'],
]),mk(1,'Y=[[4,3],[0,−2]].',['Y=[[−5,9],[−3,7]].','Y=[[4,−3],[0,2]].','Y=[[12,1],[8,0]].'],['Multiplicar B por A⁻¹ por el lado incorrecto.','Cambiar los signos de la segunda columna al multiplicar.','Usar AB en lugar de A⁻¹B.'],[
['Las dos matrices son invertibles porque sus determinantes son no nulos. Podemos despejar conservando el orden.','det(A)=−1≠0; det(B)=8≠0'],
['Multiplicamos la igualdad por B a la derecha.','A²YB⁻¹B=AB ⇒ A²Y=AB'],
['Multiplicamos por A⁻² a la izquierda. No intercambiamos factores matriciales.','Y=A⁻²AB=A⁻¹B'],
['Calculamos la inversa de la matriz de orden dos intercambiando la diagonal y cambiando el signo de los términos externos.','A⁻¹=frac{1}{−1}[[1,−2],[−1,1]]=[[-1,2],[1,-1]]'],
['Realizamos el producto fila por columna.','Y=[[-1,2],[1,-1]]·[[4,-1],[4,1]]=[[4,3],[0,-2]]'],
['Verificamos la igualdad multiplicada por B, equivalente a la original porque B es invertible.','A²=[[3,4],[2,3]]; A²Y=[[12,1],[8,0]]=AB'],
])];
case 488:return[mk(0,'a=frac{1}{2}, b=0.',['a=−frac{1}{2}, b=0.','a=1, b=0.','a=frac{1}{2}, b=1.'],['Cambiar el signo de la contribución de 1−cos(x).','Omitir el límite notable del coseno.','No eliminar el término que diverge como 1/x.'],[
['El denominador oficial es el seno de x². Su cociente con x² tiende a uno.','lim_{x→0} frac{sen(x²)}{x²}=1'],
['Dividimos numerador y denominador por x² para separar las contribuciones.','frac{a x²+b x+1−cos(x)}{sen(x²)}=frac{a+frac{b}{x}+frac{1−cos(x)}{x²}}{frac{sen(x²)}{x²}}'],
['Los términos a y (1−cos(x))/x² tienen límite finito. El término b/x solo puede permanecer acotado por ambos lados si b es cero.','b=0'],
['Calculamos el límite notable mediante la identidad del ángulo mitad.','frac{1−cos(x)}{x²}=frac{1}{2}(frac{sen(x/2)}{x/2})² → frac{1}{2}'],
['Imponemos el valor uno que exige el enunciado y despejamos el parámetro restante.','a+frac{1}{2}=1 ⇒ a=frac{1}{2}'],
['Verificación independiente por dos aplicaciones de L’Hôpital con b=0: las segundas derivadas en cero dan el mismo valor.','N′′(0)=2a+1=2; D′′(0)=2 ⇒ L=frac{2}{2}=1'],
])];
case 489:return[mk(0,'Si a=0: compatible indeterminado, con un parámetro libre; si a≠0: incompatible.',['Si a=0: compatible determinado; si a≠0: incompatible.','Si a=0: incompatible; si a≠0: compatible indeterminado.','Para todo a: compatible indeterminado, con un parámetro libre.'],['No comprobar que hay dos columnas iguales.','Invertir la condición de compatibilidad de la tercera ecuación.','Omitir la relación que deben cumplir los términos independientes.'],[
['Las columnas primera y tercera de A coinciden; por tanto, su determinante es cero.','C₁=C₃ ⇒ rg(A)≤2'],
['Un menor de orden dos no se anula y demuestra el rango exacto.','det([[1,1],[1,0]])=−1 ⇒ rg(A)=2'],
['Escribimos las ecuaciones conservando el término independiente de cada fila.','system{x+y+z=a;x+z=2a;4x+y+4z=3a}'],
['En los coeficientes, la tercera fila es la primera más tres veces la segunda. La misma relación debe cumplirse a la derecha.','3a=a+3·2a=7a ⇒ 4a=0 ⇒ a=0'],
['Aplicamos Rouché–Frobenius. Para a=0 los rangos son dos; para a≠0 aparece una fila incompatible en la ampliada.','a=0: rg(A)=rg(A|B)=2<3; a≠0: rg(A|B)=3>rg(A)'],
['Verificamos la condición eliminando explícitamente la tercera fila. La ecuación residual no depende de las incógnitas.','R₃−R₁−3R₂: 0=−4a'],
]),mk(1,'(x,y,z)=(−t,0,t), t∈ℝ; con y+z=4: (−4,0,4).',['(x,y,z)=(t,0,t), t∈ℝ; con y+z=4: (4,0,4).','(x,y,z)=(−t,t,0), t∈ℝ; con y+z=4: (−4,4,0).','(x,y,z)=(−t,0,t), t∈ℝ; con y+z=4: (−2,0,2).'],['Cambiar el signo en x+z=0.','Usar la primera ecuación pero no imponer la segunda.','Confundir y+z con x cambiado de signo más z.'],[
['Sustituimos a=0 en el sistema original; la tercera ecuación es combinación de las otras dos.','system{x+y+z=0;x+z=0;4x+y+4z=0}'],
['Restamos la segunda ecuación a la primera para despejar y.','y=0'],
['Elegimos z=t como parámetro libre y obtenemos x con la segunda ecuación.','z=t ⇒ x=−t'],
['Escribimos la solución general e imponemos la condición adicional sin confundirla con una ecuación original.','(x,y,z)=(−t,0,t); y+z=t=4'],
['Sustituimos t=4 para obtener la solución particular solicitada.','(x,y,z)=(−4,0,4)'],
['Verificamos las tres ecuaciones y la condición adicional de forma independiente.','−4+0+4=0; −4+4=0; −16+0+16=0; 0+4=4'],
])];
case 495:return[mk(0,'x²−ln|x+2|+3ln|x−1|+C.',['x²+ln|x+2|+3ln|x−1|+C.','x²−ln|x+2|+ln|x−1|+C.','2x²−ln|x+2|+3ln|x−1|+C.'],['Cambiar el signo del residuo correspondiente a x+2.','Omitir el factor tres de una fracción simple.','Integrar 2x sin dividir por el nuevo exponente.'],[
['El numerador tiene grado mayor que el denominador. Dividimos antes de descomponer en fracciones simples.','2x³+2x²−2x+7=2x(x²+x−2)+(2x+7)'],
['Factorizamos el denominador y señalamos los puntos excluidos del dominio.','x²+x−2=(x+2)(x−1); x≠−2,1'],
['Buscamos constantes para las dos fracciones simples y comparamos coeficientes.','frac{2x+7}{(x+2)(x−1)}=frac{A}{x+2}+frac{B}{x−1}; A+B=2; −A+2B=7'],
['Resolvemos el sistema: B=3 y A=−1. Integramos el polinomio y los cocientes logarítmicos.','∫ (2x−frac{1}{x+2}+frac{3}{x−1}) dx=x²−ln|x+2|+3ln|x−1|+C'],
['La constante puede elegirse independientemente en cada intervalo del dominio; el valor absoluto permite cubrir los tres intervalos.','(−∞,−2), (−2,1), (1,+∞)'],
['Comprobamos derivando y reuniendo las fracciones sobre el denominador original.','2x−frac{1}{x+2}+frac{3}{x−1}=2x+frac{2x+7}{x²+x−2}=frac{2x³+2x²−2x+7}{x²+x−2}'],
])];
case 504:return[mk(0,'a=frac{1}{2}, b=frac{1}{2}.',['a=−frac{1}{2}, b=frac{1}{2}.','a=frac{1}{2}, b=1.','a=1, b=frac{1}{2}.'],['Igualar a, en vez de −a, a la derivada por la derecha.','Confundir 2b con b al exigir continuidad.','Omitir el factor un medio del cociente incremental.'],[
['Cada rama es derivable en su intervalo abierto. Solo hay que exigir continuidad y derivadas laterales iguales en cero.','f(0)=2b; lim_{x→0⁻}f(x)=2b'],
['El límite derecho se calcula con el límite notable del logaritmo. La derivabilidad obliga a igualarlo con f(0).','lim_{x→0⁺} frac{ln(1+x)}{x}=1 ⇒ 2b=1 ⇒ b=frac{1}{2}'],
['La pendiente izquierda procede de derivar la rama polinómica.','f′(0⁻)=lim_{x→0⁻}(2x−a)=−a'],
['Para la pendiente derecha usamos el cociente incremental con f(0)=1, no el valor de la función sin restar.','f′(0⁺)=lim_{h→0⁺} frac{ln(1+h)−h}{h²}'],
['Una aplicación de L’Hôpital reduce el límite a una expresión continua. Igualamos las dos pendientes.','lim_{h→0⁺} frac{frac{1}{1+h}−1}{2h}=lim_{h→0⁺} frac{−1}{2(1+h)}=−frac{1}{2}; −a=−frac{1}{2}'],
['Verificamos las dos condiciones con los valores obtenidos; fuera de cero no hay denominadores nulos en la rama usada.','a=b=frac{1}{2}; f(0⁻)=f(0⁺)=1; f′(0⁻)=f′(0⁺)=−frac{1}{2}'],
])];
case 508:return[mk(0,'f(x)=x²ln(x)−x²+1, x>0.',['f(x)=x²ln(x)−x², x>0.','f(x)=x²ln(x)−x²+x, x>0.','f(x)=x²ln(x)−frac{x²}{2}+frac{1}{2}, x>0.'],['No ajustar la constante mediante el punto (1,0).','Introducir una constante de la primera integración incompatible con f′(e)=e.','Perder un término al integrar x ln(x).'],[
['El dato oficial contiene la segunda derivada. Integramos una vez y conservamos una primera constante.','f′′(x)=2ln(x)+1 ⇒ f′(x)=2x ln(x)−x+C₁'],
['Aplicamos la condición sobre la primera derivada en e.','f′(e)=2e−e+C₁=e ⇒ C₁=0'],
['Para integrar x ln(x), usamos partes con u=ln(x) y dv=x dx.','∫x ln(x) dx=frac{x²}{2}ln(x)−frac{x²}{4}'],
['Integramos la primera derivada y mantenemos la segunda constante independiente.','f(x)=2(frac{x²}{2}ln(x)−frac{x²}{4})−frac{x²}{2}+C₂=x²ln(x)−x²+C₂'],
['La gráfica pasa por (1,0); este dato fija la constante restante.','f(1)=−1+C₂=0 ⇒ C₂=1'],
['Verificamos por derivación y sustitución los tres datos oficiales, sin confundir f(e) con f′(e).','f′=2x ln(x)−x; f′′=2ln(x)+1; f′(e)=e; f(1)=0'],
])];
case 513:return[mk(0,'F(x)=(x+1)²e^{−x}.',['F(x)=(x−1)²e^{−x}−4e.','F(x)=(x+1)²e^{−x}+1.','F(x)=−(x+1)²e^{−x}.'],['Cambiar el signo del término lineal del polinomio aunque se ajuste la condición inicial.','Añadir una constante incompatible con el punto dado.','Cambiar el signo de la primitiva por derivar incorrectamente la exponencial.'],[
['La integral es un polinomio por una exponencial. Buscamos una primitiva de la forma Q(x)e^{−x}+C.','Q(x)=u x²+v x+w'],
['Aplicamos la regla del producto y la derivada de e^{−x}. Igualamos con la función original.','(Qe^{−x})′=(Q′−Q)e^{−x}; Q′−Q=1−x²'],
['Comparamos los coeficientes de x², x y el término independiente.','−u=−1; 2u−v=0; v−w=1'],
['Resolvemos las tres igualdades y factorizamos el polinomio obtenido.','u=1; v=2; w=1 ⇒ F(x)=(x+1)²e^{−x}+C'],
['La gráfica de la primitiva pasa por (−1,0), lo que determina la constante.','F(−1)=0·e+C=0 ⇒ C=0'],
['Verificamos independientemente mediante la regla del producto en la forma factorizada.','F′=[2(x+1)−(x+1)²]e^{−x}=(1−x²)e^{−x}; F(−1)=0'],
])];
case 515:return[mk(0,'Recta común perpendicular: (x,y,z)=(1,1,λ), λ∈ℝ.',['Recta común perpendicular: (x,y,z)=(0,1,λ), λ∈ℝ.','Recta común perpendicular: (x,y,z)=(1,0,λ), λ∈ℝ.','Recta común perpendicular: (x,y,z)=(1+λ,1,λ), λ∈ℝ.'],['Elegir un punto de r cuya proyección vertical no pertenece a s.','No imponer y=1 al punto de corte con r.','Añadir una componente horizontal que impide la perpendicularidad.'],[
['Tomamos un punto variable de cada recta y sus vectores directores.','R=(2t,1,0), u=(2,0,0); S=(v,2−v,2), w=(1,−1,0)'],
['El segmento que une los puntos de corte debe ser perpendicular a los dos vectores directores.','S−R=(v−2t,1−v,2); (S−R)·u=0; (S−R)·w=0'],
['La primera condición anula la componente x del segmento.','2(v−2t)=0 ⇒ v=2t'],
['La segunda condición fija la componente y. Sustituimos y hallamos ambos parámetros.','(v−2t)−(1−v)=0 ⇒ v=1, t=frac{1}{2}'],
['Los puntos obtenidos determinan una recta vertical y no un segmento como respuesta final.','R=(1,1,0); S=(1,1,2) ⇒ (x,y,z)=(1,1,λ)'],
['Comprobamos pertenencia de ambos extremos y perpendicularidad; no basta con un vector ortogonal sin intersecciones.','R∈r; S∈s; (0,0,1)·(2,0,0)=0; (0,0,1)·(1,−1,0)=0'],
]),mk(1,'Distancia d(r,s)=2 unidades.',['Distancia d(r,s)=√5 unidades.','Distancia d(r,s)=4 unidades.','Distancia d(r,s)=1 unidad.'],['Medir entre puntos cualesquiera sin minimizar la distancia.','Dar el cuadrado de la distancia en lugar de la distancia.','Dividir por el módulo del vector normal sin aplicar el mismo factor al numerador.'],[
['La distancia entre dos rectas que se cruzan se mide por su segmento perpendicular común.','R=(1,1,0); S=(1,1,2)'],
['Calculamos el vector del segmento y su módulo.','S−R=(0,0,2); |S−R|=√(0²+0²+2²)=2'],
['Comprobamos por un método independiente usando el producto mixto. Elegimos puntos sencillos de ambas rectas.','P=(0,1,0)∈r; Q=(0,2,2)∈s; Q−P=(0,1,2)'],
['Calculamos un vector normal a ambos directores y su módulo.','u×w=(2,0,0)×(1,−1,0)=(0,0,−2); |u×w|=2'],
['Aplicamos la fórmula con valor absoluto, pues una distancia no puede ser negativa.','d=frac{|(Q−P)·(u×w)|}{|u×w|}=frac{|−4|}{2}=2'],
['También las componentes verticales de cualquier par de puntos difieren en dos; el segmento hallado alcanza esa cota mínima.','|S−R|²=(v−2t)²+(1−v)²+4≥4 ⇒ d≥2'],
])];default:throw Error('Unknown official case');}}
export function buildMatrixLogPrimitivesBatch(id='batch-0424',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Problemas métricos':c.index===489?'Sistemas con determinantes':c.slot===1?'Matrices y determinantes':c.slot===3?'Integrales indefinidas':c.index===488?'Límites y asíntotas':'Aplicaciones de derivadas';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===489?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':c.slot===3?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':c.index===488?'RATIONAL_ASYMPTOTES_AND_NORMAL':'EXPLICIT_MONOTONICITY_OPTIMIZATION_AND_CURVATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatrixLogPrimitivesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0424-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0424.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
