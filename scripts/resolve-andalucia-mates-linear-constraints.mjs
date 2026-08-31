import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[190,'57a94794707b1b7875c44400a89e0e02d964c61659e3e0531c40ff634f78104c',2,'B.5','a2aafefcd79a18e6a9db916b5660e53000b6a30cb614dbcdead7daab4c7de199',0],
[194,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',1,'A.3','f01ef525d26fef4092e62bb0c9a2e3fb6c7e59a5f6e4ea9c7fa8a7c79715ace2',0],
[195,'b47a8d292833a7006d37cfe870ba36821b3bcd14b4d9c4214c46cd89145eaa56',1,'A.4','58af78b11a2546ff738856daba0839cb8923e8e1b028ebf490dba977882c4eaa',0],
[196,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',1,'A.3','2c46b6e7b8a0600129ec2c3c68a3c34b748d5c027fe8496406709640622f79cf',0],
[198,'4b92916bd8a715dafc1c05c471afbd863005f48352c1414bda393158ede42d5c',2,'B.2','13a51a46acce31226c67d1ac4c63d40bdb495533619b844b93a5119faa0d058f',0],
[203,'c8b05a337bf20174030e53cf793cfb12a4b4816f83b323c6b9e660adb65e0761',2,'B.7','bab157fb56c16683a5f829e392cfd8b433ff05dc0ae2a2ad1c831a2d742346d1',0],
];
export const statements={
190:'Una marca de vehículos ha vendido este mes coches de tres colores: blancos, negros y rojos. El 60 % de los coches blancos más el 50 % de los coches negros representan el 30 % de los coches vendidos. El 20 % de los coches blancos junto con el 60 % de los coches negros y el 60 % de los coches rojos representan la mitad de los coches vendidos. Se han vendido 100 coches negros más que blancos. Determina el número de coches vendidos de cada color.',
194:'Considera el siguiente sistema de ecuaciones lineales:\nsystem{x+2y+z=0;x−y+mz=m−2;mx+y+3z=m−2}\na) [1,75 puntos] Discute el sistema según los valores del parámetro m.\nb) [0,75 puntos] Resuélvelo, si es posible, para m=2.',
195:'[2,5 puntos] Determina el punto P de la recta r: frac{x+3}{2}=frac{y+5}{3}=frac{z+4}{3} que equidista del origen de coordenadas y del punto A(3;2;1).',
196:'Considera las matrices\nA=[[1,0,1],[1,1,0],[0,0,2]]\nB=[[−1,1,1],[1,−1,1],[0,0,−1]]\na) [1 punto] Halla, si es posible, A^{−1} y B^{−1}.\nb) [0,25 puntos] Halla el determinante de AB^{2013}A^t, siendo A^t la matriz traspuesta de A.\nc) [1,25 puntos] Calcula la matriz X que satisface AX−B=AB.',
198:'[2,5 puntos] Calcula los valores de a y b sabiendo que la función f:(0;+∞)→ℝ definida por f(x)=ax²+b ln(x), donde ln denota la función logaritmo neperiano, tiene un extremo relativo en x=1 y que ∫_1^4 f(x)dx=27−8ln(4).',
203:'Considera las rectas\nr:\nsystem{2x−3y+z−2=0;−3x+2y+2z+1=0}\ns:\nsystem{x=3−2λ;y=−1+λ;z=−2+2λ}\na) Calcula el plano perpendicular a la recta s que pasa por el punto P(1;0;−5). [1,5 puntos]\nb) Calcula el seno del ángulo que forma la recta r con el plano π: −2x+y+2z=0. [1 punto]',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LINEAR_CONSTRAINTS_SOURCE_LAYOUT']]:[];
export const cases=[
{index:190,literals:['100 coches negros','60 %'],topic:'Sistemas con determinantes',slot:1,whole:true},
{index:194,literals:['mz = m','para m = 2'],topic:'Sistemas con determinantes',slot:1},
{index:195,literals:['A(3, 2, 1)','equidista'],topic:'Problemas métricos',slot:4,whole:true},
{index:196,literals:['AX − B = AB','AB2013At'],topic:'Matrices y determinantes',slot:1},
{index:198,literals:['27 − 8 ln(4)','extremo relativo'],topic:'Integrales definidas y áreas',slot:3,whole:true},
{index:203,literals:['−3x + 2y + 2z + 1','seno del ángulo'],topic:'Problemas métricos',slot:4},
];
export const proof=c=>c.index===190?{counts:[500,600,900],total:2000}:c.index===194?{determinantCoefficients:[2,0,-8],singular:[-2,2],incompatible:-2,infinite:2,generator:[-5,1,3]}:c.index===195?{parameter:2,point:[1,1,2],squaredDistances:[6,6]}:c.index===196?{A:[[1,0,1],[1,1,0],[0,0,2]],B:[[-1,1,1],[1,-1,1],[0,0,-1]],inverse:[[1,0,-.5],[-1,1,.5],[0,0,.5]],X:[[-2,2,2.5],[3,-3,.5],[0,0,-1.5]],determinants:[2,0,0]}:c.index===198?{parameters:[1,-2],integral:27-8*Math.log(4),secondDerivativeAtOne:4}:{point:[1,0,-5],normal:[-2,1,2],planeConstant:12,rDirection:[-8,-7,-5],sine:1/(3*Math.sqrt(138))};
export function solve(c,source){const ps=c.whole?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_LINEAR_ALGEBRA_AND_INDEPENDENT_SUBSTITUTION',proof(c));switch(c.index){
case 190:return[mk(0,'Blancos: 500; negros: 600; rojos: 900.',['Blancos: 600; negros: 500; rojos: 900.','Blancos: 500; negros: 600; rojos: 300.','Blancos: 250; negros: 300; rojos: 450.'],['Invertir el sentido de la diferencia de cien coches.','Aplicar la mitad al subtotal en lugar de al total.','Conservar las proporciones pero reducir a la mitad la diferencia absoluta.'],[
['Definimos las tres cantidades y su total; los porcentajes se refieren al total vendido.','x=blancos; y=negros; z=rojos; T=x+y+z'],
['Traducimos las dos condiciones porcentuales y multiplicamos ambos miembros por diez; conservamos también la diferencia.','system{6x+5y=3T;2x+6y+6z=5T;y−x=100}'],
['Sustituimos T, multiplicamos por diez y agrupamos términos.','system{3x+2y−3z=0;−3x+y+z=0;y−x=100}'],
['La segunda ecuación da z=3x−y; la sustituimos en la primera.','3x+2y−3(3x−y)=0 ⇒ 5y=6x'],
['Combinamos la proporción con la diferencia de cien y recuperamos z.','y=frac{6}{5}x; frac{x}{5}=100 ⇒ x=500; y=600; z=900'],
['Comprobamos las tres condiciones originales y que las cantidades son enteras positivas.','T=2000; 300+300=0,30·2000; 100+360+540=0,50·2000; 600−500=100'],
])];
case 194:return[mk(0,'m≠−2,2: SCD; m=−2: SI; m=2: SCI.',['m≠−2,2: SCD; m=−2: SCI; m=2: SI.','m≠−2,2: SCD; m=−2: SI; m=2: SI.','m≠−2,2: SCD; m=−2: SCI; m=2: SCI.'],['Intercambiar los casos singulares al comparar rangos.','Suponer que todo determinante nulo implica incompatibilidad.','Suponer que todo determinante nulo implica infinitas soluciones.'],[
['Formamos la matriz de coeficientes; los términos independientes dependen también de m.','A=[[1,2,1],[1,−1,m],[m,1,3]]; b=(0;m−2;m−2)'],
['Desarrollamos el determinante por la primera fila.','det(A)=(−3−m)−2(3−m²)+(1+m)=2(m−2)(m+2)'],
['Cuando no se anula el determinante ambas matrices tienen rango tres y hay solución única.','m≠−2,2 ⇒ rg(A)=rg(A|b)=3: sistema compatible determinado (SCD)'],
['Eliminamos x con la primera ecuación para analizar los dos valores singulares sin dividir por m−2.','system{−3y+(m−1)z=m−2;(1−2m)y+(3−m)z=m−2}'],
['Para m=−2 las dos ecuaciones reducidas exigen valores distintos para la misma suma.','−3(y+z)=−4; 5(y+z)=−4 ⇒ y+z=frac{4}{3} y y+z=−frac{4}{5}: SI'],
['El menor de las dos primeras filas y columnas vale −3, de modo que el rango de A es dos; la contradicción eleva el ampliado a tres.','m=−2 ⇒ rg(A)=2; rg(A|b)=3'],
['Para m=2 ambas ecuaciones reducidas coinciden y todos los términos independientes son cero.','−3y+z=0; rg(A)=rg(A|b)=2<3: sistema compatible indeterminado (SCI)'],
]),mk(1,'(x;y;z)=(−5t;t;3t), t∈ℝ.',['(x;y;z)=(5t;t;3t), t∈ℝ.','(x;y;z)=(−5t;t;−3t), t∈ℝ.','(x;y;z)=(−3t;t;t), t∈ℝ.'],['Perder el signo al despejar x de la primera ecuación.','Cambiar el signo de z al resolver la ecuación reducida.','Confundir z=3y con z=y.'],[
['Sustituimos m=2 en las tres ecuaciones, incluidos los términos independientes.','system{x+2y+z=0;x−y+2z=0;2x+y+3z=0}'],
['Restamos la primera de la segunda para relacionar y y z.','−3y+z=0 ⇒ z=3y'],
['La primera ecuación determina x a partir de y.','x=−2y−z=−5y'],
['Tomamos y como parámetro libre porque el rango es dos.','y=t; (x;y;z)=(−5t;t;3t), t∈ℝ'],
['La sustitución en las tres ecuaciones verifica la familia completa.','−5t+2t+3t=0; −5t−t+6t=0; −10t+t+9t=0'],
['No se pierde ninguna solución: las dos primeras ecuaciones fuerzan x y z para cada y, y la tercera no añade una condición independiente.','S={t(−5;1;3):t∈ℝ}'],
])];
case 195:return[mk(0,'P=(1;1;2).',['P=(−1;−2;−1).','P=(3;4;5).','P=(1;1;−2).'],['Tomar el parámetro uno sin imponer equidistancia.','Tomar el parámetro tres al despejar la ecuación.','Perder el signo del término independiente en la coordenada z.'],[
['Parametrizamos la recta utilizando un único parámetro en los tres cocientes.','P(t)=(−3+2t;−5+3t;−4+3t)'],
['Igualamos los cuadrados de las distancias, que son no negativos y evitan raíces.','|P|²=|P−A|²; A=(3;2;1)'],
['Desarrollamos el segundo cuadrado; los términos |P|² se cancelan.','2P·A=|A|²=14 ⇒ 3x+2y+z=7'],
['Sustituimos la parametrización y despejamos.','3(−3+2t)+2(−5+3t)+(−4+3t)=7 ⇒ −23+15t=7 ⇒ t=2'],
['Recuperamos el punto de la recta.','P=(1;1;2)'],
['Comprobamos por separado pertenencia y ambas distancias.','frac{1+3}{2}=frac{1+5}{3}=frac{2+4}{3}=2; |P|²=6; |P−A|²=4+1+1=6'],
])];
case 196:return[mk(0,'A^{−1}=frac{1}{2}[[2,0,−1],[−2,2,1],[0,0,1]]; B no tiene inversa.',['A^{−1}=frac{1}{2}[[2,−2,0],[0,2,0],[−1,1,1]]; B no tiene inversa.','A^{−1}=[[1,0,1],[1,1,0],[0,0,2]]; B no tiene inversa.','A^{−1}=[[2,0,−1],[−2,2,1],[0,0,1]]; B no tiene inversa.'],['Trasponer la inversa correcta indebidamente.','Confundir la matriz con su propia inversa.','Omitir el factor uno entre dos.'],[
['Calculamos el determinante de A por la tercera fila.','det(A)=2·det([[1,0],[1,1]])=2≠0'],
['Resolvemos A(x;y;z)=(u;v;w) para encontrar la transformación inversa.','system{x+z=u;x+y=v;2z=w}'],
['Despejamos en orden y leemos los coeficientes de u,v,w.','z=frac{w}{2}; x=u−frac{w}{2}; y=v−u+frac{w}{2}'],
['Escribimos la matriz inversa y comprobamos ambos productos con A.','A^{−1}=frac{1}{2}[[2,0,−1],[−2,2,1],[0,0,1]]; AA^{−1}=A^{−1}A=I'],
['En B las dos primeras columnas son opuestas; por tanto son linealmente dependientes.','c₂(B)=−c₁(B) ⇒ det(B)=0'],
['La singularidad impide una inversa para B; también puede comprobarse expandiendo por su tercera fila.','det(B)=−1·(1−1)=0; B no es invertible'],
]),mk(1,'det(AB^{2013}A^t)=0.',['det(AB^{2013}A^t)=4.','det(AB^{2013}A^t)=−4.','det(AB^{2013}A^t)=2.'],['Omitir el factor det(B) por la potencia grande.','Tomar erróneamente det(B)=−1.','Olvidar B y el determinante de la traspuesta.'],[
['No es necesario calcular la potencia 2013: utilizamos multiplicatividad del determinante.','det(AB^{2013}A^t)=det(A)·det(B^{2013})·det(A^t)'],
['El determinante de una potencia es la potencia del determinante.','det(B^{2013})=det(B)^{2013}=0^{2013}=0'],
['La trasposición conserva el determinante.','det(A^t)=det(A)=2'],
['Sustituimos los tres factores.','det(AB^{2013}A^t)=2·0·2=0'],
['Comprobación independiente: B tiene rango como máximo dos, y su potencia no puede aumentarlo.','rg(B^{2013})≤rg(B)≤2'],
['Multiplicar por otras matrices no eleva ese rango hasta tres; el producto sigue siendo singular.','rg(AB^{2013}A^t)≤2 ⇒ determinante cero'],
]),mk(2,'X=frac{1}{2}[[−4,4,5],[6,−6,1],[0,0,−3]].',['X=frac{1}{2}[[−4,6,0],[4,−6,0],[5,1,−3]].','X=[[−4,4,5],[6,−6,1],[0,0,−3]].','X=[[−1,1,1],[1,−1,1],[0,0,−1]].'],['Trasponer X por confundir el orden de multiplicación.','Omitir el factor uno entre dos de la inversa.','Cancelar incorrectamente B a ambos lados y concluir X=B.'],[
['Aislamos AX sin cambiar el orden del producto AB.','AX=AB+B'],
['Como A es invertible, multiplicamos por su inversa a la izquierda.','X=A^{−1}(AB+B)=B+A^{−1}B'],
['Calculamos cada entrada del producto A inversa por B mediante fila por columna.','A^{−1}B=frac{1}{2}[[−2,2,3],[4,−4,−1],[0,0,−1]]'],
['Sumamos B con denominador común dos.','X=frac{1}{2}[[−4,4,5],[6,−6,1],[0,0,−3]]'],
['Calculamos el producto del lado derecho directamente con las matrices oficiales.','AB=[[−1,1,0],[0,0,2],[0,0,−2]]'],
['Sustituimos X y comprobamos la ecuación completa; la invertibilidad garantiza unicidad.','AX=[[−2,2,1],[1,−1,3],[0,0,−3]]; AX−B=AB'],
])];
case 198:return[mk(0,'a=1, b=−2.',['a=−1, b=2.','a=1, b=2.','a=2, b=−4.'],['Cambiar simultáneamente los signos y olvidar el valor de la integral.','Cambiar el signo al despejar la condición de extremo.','Duplicar los parámetros sin comprobar la integral prescrita.'],[
['En el dominio positivo la función es derivable. Un extremo interior en uno obliga a anular la derivada.','f′(x)=2ax+frac{b}{x}; f′(1)=2a+b=0 ⇒ b=−2a'],
['Integramos x² directamente y ln(x) por partes, con u=ln(x), dv=dx.','H(x)=frac{a}{3}x³+b(xln(x)−x)'],
['Evaluamos la primitiva en los dos extremos positivos.','H(4)−H(1)=21a+b(4ln(4)−3)'],
['Sustituimos b=−2a en la condición integral.','a(27−8ln(4))=27−8ln(4)'],
['El factor no se anula: ln(4)<2 implica que es mayor que once. Podemos dividir.','a=1; b=−2'],
['La condición necesaria es también suficiente: la segunda derivada en uno es positiva, luego hay un mínimo.','f″(x)=2+frac{2}{x²}; f″(1)=4>0'],
['Comprobamos la integral y el cambio de signo de la derivada con los parámetros obtenidos.','f′(x)=frac{2(x²−1)}{x}; f′<0 en (0;1), f′>0 en (1;+∞); ∫_1^4 f(x)dx=27−8ln(4)'],
])];
case 203:return[mk(0,'Plano: −2x+y+2z+12=0.',['Plano: −2x+y+2z−12=0.','Plano: 2x+y+2z+8=0.','Plano: −2x+y+2z=0.'],['Cambiar el signo del término independiente al sustituir P.','Perder el signo de la primera componente del director de s.','Dar el plano paralelo por el origen en lugar del que pasa por P.'],[
['La parametrización de s muestra su vector director; no necesitamos su punto base.','vₛ=(−2;1;2)'],
['Un plano perpendicular a una recta tiene normal paralela a su director.','n=(−2;1;2)'],
['Usamos la ecuación punto-normal con el punto P exigido.','−2(x−1)+(y−0)+2(z+5)=0'],
['Desarrollamos y reunimos constantes.','−2x+y+2z+12=0'],
['Comprobamos que P satisface el plano.','−2·1+0+2(−5)+12=0'],
['La normal es exactamente el director de s; por ello la perpendicularidad queda verificada y el plano por P es único.','n=vₛ; |n|²=9≠0'],
]),mk(1,'sen(α)=frac{1}{3√(138)}.',['sen(α)=frac{1}{√(138)}.','sen(α)=frac{8}{3√(138)}.','sen(α)=frac{√(1241)}{3√(138)}.'],['Omitir el módulo de la normal del plano.','Usar una componente del director en vez del producto escalar.','Calcular el coseno del ángulo con el plano en lugar de su seno.'],[
['La recta r es intersección de dos planos; sus normales permiten obtener su director.','n₁=(2;−3;1); n₂=(−3;2;2)'],
['Calculamos el producto vectorial sin perder signos.','u=n₁×n₂=(−8;−7;−5)'],
['La normal del plano π se lee de sus coeficientes.','n=(−2;1;2)'],
['El ángulo recta-plano es complementario del ángulo con la normal; usamos el valor absoluto del producto escalar.','sen(α)=frac{|u·n|}{|u||n|}'],
['Calculamos por separado numerador y módulos.','u·n=16−7−10=−1; |u|=√(64+49+25)=√(138); |n|=3'],
['Sustituimos y comprobamos que el director pertenece a ambos planos directores de r.','sen(α)=frac{1}{3√(138)}; n₁·u=−16+21−5=0; n₂·u=24−14−10=0'],
])];default:throw Error('Unknown case');}}
export function buildLinearConstraintsBatch(id='batch-0390',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.index===198?'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE':c.index===196?'MATRIX_DETERMINANT_IDENTITIES':'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS'};if(c.whole)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_METHOD_WITH_SOURCE_BOUND_PARAMETERS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLinearConstraintsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0390-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0390.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
