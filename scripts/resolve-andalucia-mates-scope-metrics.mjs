import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[552,'6310687a476bbab9ad2de1ded1dc24f8cf176cd6faea573873b4c4abefddf6f4',2,'B.4','937504b4a4eb56a44aa41686f5fde12e894c79537fe7e5ac5eee8457e96eba5a',0],
[555,'e6356a504a4c1346274193aeafd23fff6f5df37695b3de420a0604e5b166eae0',2,'B.2','4991b8efa994faedfc8afba96057722ebcd885efd16f8c22871352a50d45c98f',0],
[556,'fa36bff09b716e230868383c340dc64dc6faee802bb9b180a54b61bff0c9c1f9',1,'A.4','40b95963fc4ebfd7d78db524bc9a82dd9a8b80f422f8adfcb5055e3bd44f1e96',0],
[558,'1a0767cc65a38fb4b848a65db6b624112758b901e6c99ef4da1ae1276214341f',1,'B.2','73cff0e29a30461fd38608c5b35fda4fde97843769df156c40404aa6eb058c49',0],
[560,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',1,'A.3','e8e984d0811cca1dd03acaf99072168c1e4cc60ef64b4de4a0aef842dfc26056',0],
[561,'58876c8435308697c784c8326eba10d1b8b9696efc401c51bf3386c90eba4643',2,'B.3','74cfd787510cba453f88092444775160b2b914e48687db158edeee5df6115250',0],
[562,'96fdec633441fe992d97edda8660bad8bbd44a7d78978f8a56264112791c65e3',2,'B.5','90d40a456011cd10e1cc12506f6e22bcf8cd1cdc30e998313826c8aada278e4f',0],
[564,'62a1d9074de55299d71cdeb9a0ce1c0bd8d749e8b1baa30fb379ef400b4e7387',1,'A.4','58fdaef012a090e12a1a2da4e7de42085ca9f01e5f0d520755952e76c287fdf4',0]];
export const statements={
552:'Considera el plano π de ecuación mx+5y+2z=0 y la recta r dada por frac{x+1}{3}=frac{y}{n}=frac{z−1}{2}.\na) Calcula m y n en el caso en el que la recta r es perpendicular al plano π.\nb) Calcula m y n en el caso en el que la recta r está contenida en el plano π.',
555:'Calcula ∫₀^{π/4} frac{x}{cos²x} dx. (Sugerencia: integración por partes).',
556:'Considera la recta r≡frac{x−4}{2}=frac{y}{1}=frac{z−1}{5} y el plano π≡2x+y−z+3=0.\na) Halla la ecuación general del plano perpendicular a π que contiene a r.\nb) Calcula la distancia entre r y π.',
558:'Considera la función f:ℝ→ℝ definida por f(x)=frac{1}{x²+2x+2}. Calcula una primitiva de f cuya gráfica pase por el punto (0;frac{π}{4}).',
560:'Considera el siguiente sistema de ecuaciones\nsystem{λx+y−z=−1;λx+λz=λ;x+y−λz=0}.\na) Discute el sistema según los valores de λ.\nb) Resuelve el sistema para λ=0.',
561:'Sean las matrices A=[[1,0],[-1,1]], B=[[1,0,0],[0,-1,-1],[0,1,2]] y C=[[3,1,2],[0,1,-2]]. Calcula la matriz X que cumpla la ecuación AXB=C.',
562:'Considera las matrices A=[[x,y,z],[3,0,2],[1,1,1]], B=[[1,y,z]] y C=[[3,0,0]].\na) Sabiendo que el determinante de A es 5, calcula det[[x−1,y−1,z−1],[1,1,1],[4,1,3]], indicando las propiedades que utilizas.\nb) Calcula los valores (x,y,z) tales que B·A=C.',
564:'Considera los vectores u=(2,3,4), v=(−1,−1,−1) y w=(−1,λ,−5), siendo λ un número real.\na) Halla los valores de λ para los que el paralelepípedo determinado por u, v y w tiene volumen 6 unidades cúbicas.\nb) Determina el valor de λ para el que u, v y w son linealmente dependientes.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SCOPE_METRICS_SOURCE_LAYOUT']]:[];
export const cases=[{index:552,slot:4,literals:['mx + 5y + 2z','perpendicular']},{index:555,slot:3,whole:true,literals:['cos2 x','partes']},{index:556,slot:4,literals:['2x + y − z + 3','distancia']},{index:558,slot:3,whole:true,literals:['x2 + 2x + 2','primitiva']},{index:560,slot:1,literals:['λx + y − z = −1','λx + λz = λ']},{index:561,slot:1,whole:true,literals:['AXB = C']},{index:562,slot:1,literals:['determinante de A es 5','B · A = C']},{index:564,slot:4,literals:['(2, 3, 4)','volumen 6']}];
export const proof=c=>({552:{perpendicular:[3,5],contained:[2,-2]},555:{value:Math.PI/4-Math.log(2)/2},556:{plane:[1,-2,0,-4],distance:10/Math.sqrt(6)},558:{constant:0,initialValue:Math.PI/4},560:{determinant:0,augmentedMinor:'-lambda^2',point:[0,0,1],direction:[-1,1,1]},561:{inverseA:[[1,0],[1,1]],inverseB:[[1,0,0],[0,-2,-1],[0,1,1]],solution:[[3,0,1],[3,-4,-2]]},562:{determinant:-5,point:[3,0,0],direction:[-2,1,-1],aConditionScope:'a_only'},564:{cross:[1,-2,1],volumeParameters:[-6,0],dependence:-3}}[c.index]);
export function solve(c){const ps=c.whole?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]);const mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_PAGE_WITH_INDEPENDENT_SUBSTITUTION_DETERMINANT_OR_DERIVATIVE_CHECK',proof(c));switch(c.index){
case 552:return[mk(0,'m=3 y n=5.',['m=5 y n=3.','m=−3 y n=−5.','m=2 y n=−2.'],['Intercambiar componentes del normal y el director.','Cambiar signos de dos componentes sin cambiar la tercera.','Confundir perpendicularidad con contención.'],[
['De la ecuación continua obtenemos un punto y un vector director de la recta.','P=(−1,0,1); d=(3,n,2)'],
['El vector normal del plano tiene los coeficientes de su ecuación.','N=(m,5,2)'],
['Una recta perpendicular a un plano tiene director paralelo al normal.','(3,n,2)=k(m,5,2)'],
['La tercera componente fija el factor de proporcionalidad, que no es arbitrario.','2=2k ⇒ k=1'],
['Las otras dos componentes determinan ambos parámetros.','3=m; n=5'],
['Comprobamos que los vectores coinciden exactamente y son no nulos.','d=(3,5,2)=N ⇒ r⊥π'],
]),mk(1,'m=2 y n=−2.',['m=3 y n=5.','m=2 y n=2.','m=−2 y n=frac{2}{5}.'],['Confundir contención con perpendicularidad.','Cambiar el signo al resolver la ortogonalidad.','Cambiar el signo al sustituir el punto de la recta.'],[
['Para que toda la recta esté contenida, exigimos un punto en el plano y un director perpendicular al normal.','P=(−1,0,1); d=(3,n,2); N=(m,5,2)'],
['Sustituimos el punto en la ecuación del plano.','−m+2=0 ⇒ m=2'],
['Imponemos producto escalar nulo entre director y normal.','3m+5n+4=0'],
['Sustituimos el parámetro obtenido y despejamos el segundo.','6+5n+4=0 ⇒ n=−2'],
['La recta resultante se escribe con un parámetro real.','(x,y,z)=(−1,0,1)+t(3,−2,2)'],
['La sustitución verifica la ecuación para todo t, no solo para un punto.','2(−1+3t)+5(−2t)+2(1+2t)=0'],
])];
case 555:return[mk(0,'I=frac{π}{4}−frac{ln 2}{2}.',['I=frac{π}{4}+frac{ln 2}{2}.','I=frac{π}{4}−ln 2.','I=frac{π}{4}.'],['Cambiar el signo de la primitiva de la tangente.','Olvidar el factor un medio de ln(√2).','Omitir el segundo término de integración por partes.'],[
['El integrando es continuo en el intervalo porque el coseno no se anula allí. Elegimos integración por partes.','u=x; dv=frac{1}{cos²x}dx'],
['Derivamos u e integramos dv.','du=dx; v=tan x'],
['Aplicamos la fórmula de integración por partes.','∫frac{x}{cos²x}dx=x tan x−∫tan x dx'],
['Como la derivada del coseno es menos seno, la integral restante es un logaritmo.','F(x)=x tan x+ln(cos x), 0≤x≤frac{π}{4}'],
['Evaluamos en ambos extremos; el coseno es positivo y no hacen falta cambios de rama.','F(π/4)−F(0)=frac{π}{4}+ln(frac{1}{√2})=frac{π}{4}−frac{ln2}{2}'],
['Derivamos la primitiva para comprobar el integrando de forma independiente.','F′(x)=tan x+frac{x}{cos²x}−tan x=frac{x}{cos²x}'],
])];
case 556:return[mk(0,'El plano es x−2y−4=0.',['El plano es x−2y+4=0.','El plano es 2x+y−z−7=0.','El plano es x+2y−4=0.'],['Cambiar el signo del término independiente al pasar por el punto.','Usar el normal del plano dado en vez de uno perpendicular.','Cambiar el signo de la segunda componente del normal.'],[
['Extraemos punto y director de la recta; el plano dado proporciona otro normal.','P=(4,0,1); d=(2,1,5); N=(2,1,−1)'],
['El normal del plano buscado debe ser perpendicular tanto al director de r como a N.','n·d=0; n·N=0'],
['Un producto vectorial proporciona ese normal, que simplificamos sin cambiar el plano.','d×N=(−6,12,0); n=(1,−2,0)'],
['Imponemos que el plano pase por el punto P de la recta.','(x−4)−2(y−0)=0'],
['Escribimos la ecuación general y verificamos la perpendicularidad de los normales.','x−2y−4=0; (1,−2,0)·(2,1,−1)=0'],
['La sustitución de toda la recta confirma su contención.','x=4+2t, y=t, z=1+5t ⇒ (4+2t)−2t−4=0'],
]),mk(1,'d(r,π)=frac{10}{√6}.',['d(r,π)=0.','d(r,π)=frac{10}{6}.','d(r,π)=frac{4}{√6}.'],['Suponer que la recta corta al plano sin comprobar su posición.','Usar la norma al cuadrado en el denominador.','Cambiar el signo del término independiente del plano.'],[
['Comprobamos primero la posición relativa mediante el producto escalar del director y el normal.','d·N=(2,1,5)·(2,1,−1)=4+1−5=0'],
['La recta es paralela al plano o está contenida. Evaluamos la ecuación del plano en su punto P.','2·4+0−1+3=10≠0'],
['Por tanto, es paralela exterior y su distancia es la distancia de cualquiera de sus puntos al plano.','d(r,π)=d(P,π)'],
['Aplicamos la fórmula usando el valor absoluto del numerador y la norma del normal.','d(P,π)=frac{|2·4+0−1+3|}{√(2²+1²+(−1)²)}'],
['Simplificamos la expresión positiva de la distancia.','d(r,π)=frac{10}{√6}'],
['Al sustituir un punto general de la recta, el numerador sigue siendo diez.','2(4+2t)+t−(1+5t)+3=10'],
])];
case 558:return[mk(0,'F(x)=arctan(x+1).',['F(x)=arctan(x+1)+frac{π}{4}.','F(x)=arctan(x) + frac{π}{4}.','F(x)=−arctan(x+1)+frac{π}{2}.'],['Añadir la ordenada inicial sin evaluar antes la primitiva en cero.','Omitir el desplazamiento x+1 al completar el cuadrado.','Cambiar el signo de la primitiva y compensar solo el valor inicial.'],[
['Completamos el cuadrado del denominador; es positivo para todo número real.','x²+2x+2=(x+1)²+1'],
['Reconocemos la derivada del arco tangente con un cambio de variable lineal.','u=x+1; du=dx'],
['Integramos sin introducir factores adicionales porque la derivada interior es uno.','∫frac{1}{u²+1}du=arctan u+C'],
['La familia de primitivas y el dato inicial determinan la constante.','F(x)=arctan(x+1)+C; F(0)=frac{π}{4}+C'],
['Igualamos a la ordenada del punto indicado en el documento.','frac{π}{4}+C=frac{π}{4} ⇒ C=0'],
['Comprobamos simultáneamente la derivada y el paso por el punto.','F′(x)=frac{1}{1+(x+1)²}=f(x); F(0)=frac{π}{4}'],
])];
case 560:return[mk(0,'λ=0: compatible indeterminado; λ≠0: incompatible; nunca compatible determinado.',['λ=0: incompatible; λ≠0: compatible determinado.','Para todo λ: compatible indeterminado.','λ=0: compatible indeterminado; λ≠0: compatible determinado.'],['Suponer determinante no nulo fuera de cero sin calcularlo.','Confundir determinante nulo con compatibilidad.','No comparar el rango de la ampliada cuando el determinante es siempre cero.'],[
['La matriz de coeficientes tiene determinante idénticamente nulo, por lo que no basta buscar raíces aisladas.','A=[[λ,1,-1],[λ,0,λ],[1,1,-λ]]; det(A)=0'],
['Para λ distinto de cero, la segunda ecuación impone una relación simple.','λ≠0 ⇒ x+z=1'],
['Restamos la tercera ecuación de la primera.','(λ−1)(x+z)=−1'],
['Las dos relaciones serían compatibles solo si λ fuera cero, contradiciendo este caso.','(λ−1)·1=−1 ⇒ λ=0; por tanto λ≠0 es incompatible'],
['Para λ=0 quedan dos ecuaciones independientes y una identidad.','system{y−z=−1;0=0;x+y=0} ⇒ rg(A)=rg(A|B)=2<3'],
['La clasificación también se verifica con un menor de la ampliada: columnas x, y y término independiente.','det[[λ,1,-1],[λ,0,λ],[1,1,0]]=−λ²; λ≠0 ⇒ rg(A|B)=3>rg(A)=2'],
]),mk(1,'(x,y,z)=(−t,t,t+1), t∈ℝ.',['(x,y,z)=(t,t,t+1), t∈ℝ.','(x,y,z)=(−t,t,t−1), t∈ℝ.','(x,y,z)=(−t,t,1), t∈ℝ.'],['Cambiar el signo al despejar x en x+y=0.','Cambiar el signo del término independiente de y−z=−1.','Fijar z como si no dependiera del parámetro.'],[
['Sustituimos el valor cero en el sistema original, sin dividir por λ.','system{y−z=−1;0=0;x+y=0}'],
['La ecuación central no impone ninguna restricción. Hay un parámetro libre.','rg(A)=rg(A|B)=2; tres incógnitas'],
['Elegimos el valor de y como parámetro real.','y=t, t∈ℝ'],
['Despejamos las otras dos variables en las ecuaciones restantes.','x=−y=−t; z=y+1=t+1'],
['Escribimos la solución general como una recta afín.','(x,y,z)=(0,0,1)+t(−1,1,1)'],
['La comprobación por sustitución vale para todo t.','t−(t+1)=−1; 0=0; −t+t=0'],
])];
case 561:return[mk(0,'X=[[3,0,1],[3,-4,-2]].',['X=[[3,1,3],[-3,-4,-8]].','X=[[3,1,3],[3,-2,-2]].','X=[[3,0,1],[-3,-4,-4]].'],['Multiplicar por A y B en lugar de por sus inversas.','Usar B en lugar de B⁻¹ al despejar.','Usar A en lugar de A⁻¹ al despejar.'],[
['Las dimensiones obligan a que X sea de dos filas y tres columnas. Ambas matrices cuadradas son invertibles.','A:2×2; B:3×3; C:2×3; det(A)=1; det(B)=−1'],
['Multiplicamos por A⁻¹ a la izquierda y B⁻¹ a la derecha, respetando el orden.','AXB=C ⇒ X=A⁻¹CB⁻¹'],
['Calculamos las inversas y comprobamos sus productos con las originales.','A⁻¹=[[1,0],[1,1]]; B⁻¹=[[1,0,0],[0,-2,-1],[0,1,1]]'],
['Primero multiplicamos A⁻¹ por C.','A⁻¹C=[[3,1,2],[3,2,0]]'],
['Multiplicamos el resultado por B⁻¹ para obtener la matriz pedida.','X=[[3,0,1],[3,-4,-2]]'],
['Verificamos directamente la ecuación original, sin volver a usar el despeje.','AX=[[3,0,1],[0,-4,-3]]; AXB=[[3,1,2],[0,1,-2]]=C'],
])];
case 562:return[mk(0,'El determinante pedido vale −5.',['El determinante pedido vale 5.','El determinante pedido vale −10.','El determinante pedido vale 0.'],['Olvidar el cambio de signo al intercambiar dos filas.','Introducir un factor dos que no corresponde a sumar una fila.','Creer que las operaciones elementales de suma anulan el determinante.'],[
['Llamamos U, V y W a las filas de A.','U=(x,y,z); V=(3,0,2); W=(1,1,1); det(U,V,W)=5'],
['Escribimos las filas del determinante pedido en términos de esas filas.','D=det(U−W,W,V+W)'],
['Sumamos la segunda fila a la primera; el determinante no cambia.','D=det(U,W,V+W)'],
['Restamos la segunda fila a la tercera; tampoco cambia el determinante.','D=det(U,W,V)'],
['El orden de las dos últimas filas está invertido respecto de A.','D=−det(U,V,W)=−5'],
['La expansión directa verifica el signo: det(A)=−2x−y+3z y D=2x+y−3z.','D=−det(A)=−5'],
]),mk(1,'(x,y,z)=(3−2t,t,−t), t∈ℝ.',['(x,y,z)=(3+2t,t,−t), t∈ℝ.','(x,y,z)=(3−2t,t,t), t∈ℝ.','(x,y,z)=(−2t,t,−t), t∈ℝ.'],['Cambiar el signo al despejar x.','Cambiar el signo en y+z=0.','Omitir el término independiente tres.'],[
['En este apartado se impone BA=C; la hipótesis det(A)=5 estaba introducida específicamente en a). Multiplicamos la fila B por las columnas de A.','BA=(x+3y+z, y+z, 2y+2z)'],
['Igualamos las tres componentes con la fila C.','system{x+3y+z=3;y+z=0;2y+2z=0}'],
['La tercera ecuación es el doble de la segunda. Tomamos y como parámetro libre.','y=t; z=−t'],
['Despejamos x en la primera ecuación.','x+3t−t=3 ⇒ x=3−2t'],
['La solución general satisface las tres igualdades para cualquier parámetro real.','(3−2t)+3t−t=3; t−t=0; 2t−2t=0'],
['La comprobación del determinante distingue las hipótesis de ambos apartados: BA=C da determinante −6, por lo que no debe trasladarse a b) la condición específica de a).','det(A)=−2(3−2t)−t+3(−t)=−6'],
])];
case 564:return[mk(0,'λ=0 o λ=−6.',['λ=0.','λ=−6.','λ=3 o λ=−3.'],['Considerar solo el producto mixto positivo.','Considerar solo el producto mixto negativo.','Olvidar el término constante al resolver el valor absoluto.'],[
['El volumen es el valor absoluto del producto mixto de los tres vectores.','V=|(u×v)·w|'],
['Calculamos el producto vectorial con sus tres componentes.','u×v=(3(−1)−4(−1),4(−1)−2(−1),2(−1)−3(−1))=(1,−2,1)'],
['Hacemos el producto escalar con el tercer vector.','(1,−2,1)·(−1,λ,−5)=−6−2λ'],
['Imponemos volumen seis considerando los dos signos posibles.','|−6−2λ|=6 ⇒ −6−2λ=6 o −6−2λ=−6'],
['Resolvemos ambas ecuaciones lineales y conservamos las dos soluciones.','λ=−6 o λ=0'],
['Sustituimos en el producto mixto para comprobar ambos volúmenes.','λ=−6 ⇒ V=|6|=6; λ=0 ⇒ V=|−6|=6'],
]),mk(1,'λ=−3.',['λ=3.','λ=0.','λ=−6.'],['Cambiar el signo del término constante al despejar.','Confundir dependencia con uno de los valores de volumen seis.','Confundir dependencia con el otro valor de volumen seis.'],[
['Tres vectores de ℝ³ son linealmente dependientes exactamente cuando su determinante es cero.','det(u,v,w)=0'],
['El producto mixto coincide con ese determinante.','det(u,v,w)=−6−2λ'],
['Igualamos a cero y despejamos el parámetro.','−6−2λ=0 ⇒ λ=−3'],
['El tercer vector queda entonces fijado.','w=(−1,−3,−5)'],
['Buscamos una combinación explícita de los otros dos para verificar la dependencia.','w=−2u−3v'],
['La comprobación por componentes confirma el resultado sin usar de nuevo el determinante.','−2(2,3,4)−3(−1,−1,−1)=(−1,−3,−5)'],
])];default:throw Error('Unknown official case');}}
export function buildScopeMetricsBatch(id='batch-0427',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Propiedades métricas':c.slot===3?'Integrales definidas':c.index===560?'Sistemas con determinantes':'Matrices y determinantes';x.secondaryTopics=[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EXPLICIT_SPATIAL_METRIC_METHOD':c.slot===3?'OFFICIAL_INTEGRAL_METHOD':c.index===560?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'MATRIX_DETERMINANT_IDENTITIES'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildScopeMetricsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0427-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0427.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
