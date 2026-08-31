import fs from'node:fs';import{pathToFileURL}from'node:url';import{buildBatch}from'./resolve-andalucia-inference-2012.mjs';import{officialParts,part}from'./resolve-andalucia-inference-multipart.mjs';
export const observations=[
[981,'d178e5a4f53fdde351fb047b350393b1a2fcdf04f1f23a23ebd71625431061fd',2,'B.2','4dbfe39ff32dbd9d5b219ffc29a9f91a540df4c6c3b7bc41a25b7de2cbec7f5a',0],
[986,'e57bc2d094c8120f546b4dd3c69e3372e9fcc93f38875e052f536867901cc5be',1,'A.3','8c3a95b0771d3436c61fd5c80bb229137dfd32bcc31504d8b46af880864c8624',0],
[987,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',1,'NONE.4','c4d14c6711d24850dd065c3ce6a483dddf5fc8e42d54286b4cd3bd4df1aaf46f',0],
[989,'a54a5b52abe3cf59c81e26bac758d93baa6dfdde0be1df1a3691c9a3436173cb',1,'A.1','c331cbf52a49431b3024207087d67ebf0bce4c2b455f7ac3cb0871dc10f2fae7',0],
[990,'95771746eae60ab5a61f193ea7de9fe116e865cd0c5989fdcc4b32368976ce77',2,'NONE.6','3e58d131eb0533f38b4a0301676328f887cdfed4e5a16da8353350eb0446f904',0]];
export const statements={981:'Calcula ∫_{2}^{4}frac{eˣ}{1+√{eˣ}}dx. Sugerencia: se puede hacer el cambio de variable t=√{eˣ}.',986:'Considera el sistema de ecuaciones lineales dado por AX=B siendo A=matrix{1,−1,1;1,m,m;m,1,3}, X=matrix{x;y;z} y B=matrix{1;1;m}.\na) Discute el sistema según los valores de m.\nb) Para m=2, si es posible, resuelve el sistema dado.',987:'Siendo a≠0, considera las rectas r≡x−1=y−2=frac{z−1}{a} y s≡frac{x−3}{−a}=frac{y−3}{−1}=frac{z+1}{2}.\na) Estudia la posición relativa de ambas rectas según los valores de a.\nb) Para a=2, determina las ecuaciones de la recta que pasa por el punto de corte de r y s y es perpendicular a ambas.',989:'Sea f la función definida como f(x)=frac{ax²+b}{a−x} para x≠a.\na) Calcula a y b para que la gráfica de f pase por el punto (2,3) y tenga una asíntota oblicua con pendiente −4.\nb) Para el caso a=2, b=3, obtén la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1.',990:'Calcula ∫cos(ln x)dx (ln denota la función logaritmo neperiano).'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_EXPONENTIAL_RANKS_LOGCOS_LAYOUT']]:[];
export const cases=[{index:981,slot:3,kind:'definite',literals:['Calcula','Sugerencia']},{index:986,slot:1,literals:['AX = B','m = 2']},{index:987,slot:4,literals:['punto de corte','perpendicular']},{index:989,slot:2,literals:['(2, 3)','pendiente −4']},{index:990,slot:3,kind:'primitive',literals:['cos(lnx)','neperiano']}];
export const proof=c=>({981:{lower:2,upper:4,tLower:Math.E,tUpper:Math.exp(2),value:2*(Math.exp(2)-Math.E-Math.log((1+Math.exp(2))/(1+Math.E)))},986:{determinantPolynomial:[-2,2,4],singular:[-1,2],rank:2,genericSolution:[1,0,0],m2Base:[1,0,0],m2Direction:[4,1,-3],minus1Base:[1,0,0],minus1Direction:[1,1,0]},987:{u:[1,1,2],v:[-2,-1,2],cross:[4,-6,1],intersection:[1,2,1],coplanar:[-2,2],triplePolynomial:[-1,0,4]},989:{parameters:[4,-10],slope:-4,asymptoteIntercept:-16,tangent:[9,-4],contact:[1,5]},990:{domain:'x>0',primitive:'x/2*(cos(log(x))+sin(log(x)))+C'}}[c.index]);
export function solve(c){const text=statements[c.index],ps=/(?:^|\n)a\)/.test(text)?officialParts(text):[{id:'whole',prompt:text}],mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'INDEPENDENT_QUADRATURE_RANKS_VECTOR_PRODUCTS_AND_DERIVATIVES',proof(c));switch(c.index){
case 981:return[mk(0,'2(e²−e)−2ln(frac{1+e²}{1+e}).',['(e²−e)−ln(frac{1+e²}{1+e}).','2(e²−e)+2ln(frac{1+e²}{1+e}).','2(4−2)−2ln(frac{5}{3}).'],['Omitir el factor dos del diferencial.','Cambiar el signo al dividir t entre 1+t.','Conservar los límites originales después del cambio de variable.'],[
['Usamos el cambio propuesto; al ser exponencial no existe ambigüedad en la raíz positiva.','t=√{eˣ}=e^{x/2}; eˣ=t²; dt=frac{t}{2}dx ⇒ dx=frac{2}{t}dt'],
['Cambiamos también ambos límites antes de integrar.','x=2 ⇒ t=e; x=4 ⇒ t=e²'],
['Sustituimos todo el integrando y simplificamos la fracción.','I=∫_{e}^{e²}frac{2t}{1+t}dt=2∫_{e}^{e²}(1−frac{1}{1+t})dt'],
['Integramos y evaluamos la primitiva transformada.','I=2[t−ln(1+t)]_{e}^{e²}'],
['Agrupamos las diferencias sin perder el signo del logaritmo.','I=2(e²−e)−2ln(frac{1+e²}{1+e})'],
['La primitiva en x y la cuadratura independiente comprueban el resultado.','H(x)=2e^{x/2}−2ln(1+e^{x/2}); H′(x)=frac{eˣ}{1+e^{x/2}}'],
])];
case 986:return[mk(0,'SCD si m≠−1,2; SCI si m=−1 o m=2; nunca incompatible.',['SCD si m≠−1,2; incompatible si m=−1 o m=2.','SCD si m≠−1,2; SCI si m=2 e incompatible si m=−1.','SCD si m≠−1,2; SCI si m=−1 e incompatible si m=2.'],['Interpretar determinante nulo como incompatibilidad sin estudiar la ampliada.','Omitir que B coincide con la primera columna también cuando m=−1.','Confundir la ecuación redundante de m=2 con una contradicción.'],[
['Calculamos el determinante y localizamos los parámetros singulares.','det A=(3m−m)+(3−m²)+(1−m²)=−2(m−2)(m+1)'],
['Para determinante no nulo hay solución única; además B es la primera columna de A.','m≠−1,2 ⇒ rg A=rg(A|B)=3; X=(1,0,0)'],
['Reducimos la ampliada restando la primera fila a la segunda y m veces la primera a la tercera.','(A|B)∼matrix{1,−1,1,1;0,m+1,m−1,0;0,m+1,3−m,0}'],
['Para m=−1 la última fila es múltiplo de la segunda y queda una variable libre.','z=0; x−y=1 ⇒ rg A=rg(A|B)=2; X=(1+t,t,0)'],
['Para m=2 las dos últimas filas coinciden y tampoco aparece contradicción.','3y+z=0; x−y+z=1 ⇒ rg A=rg(A|B)=2'],
['Aplicamos Rouché–Frobenius y confirmamos que (1,0,0) es siempre solución.','m∈{−1,2}: SCI; restantes: SCD; SI no aparece'],
]),mk(1,'(x,y,z)=(1+4t,t,−3t), t∈ℝ.',['(x,y,z)=(1−4t,t,−3t), t∈ℝ.','(x,y,z)=(1+4t,t,3t), t∈ℝ.','(x,y,z)=(1+t,t,0), t∈ℝ.'],['Cambiar el signo al despejar x.','Cambiar el signo de z al resolver 3y+z=0.','Usar la familia del caso m=−1.'],[
['Sustituimos m=2 en las tres ecuaciones originales.','x−y+z=1; x+2y+2z=1; 2x+y+3z=2'],
['Restamos la primera ecuación a la segunda y dos veces la primera a la tercera.','3y+z=0; 3y+z=0'],
['Elegimos y como parámetro real y despejamos z.','y=t ⇒ z=−3t'],
['Volvemos a la primera ecuación para obtener x.','x−t−3t=1 ⇒ x=1+4t'],
['Escribimos todas las soluciones sin perder el parámetro libre.','X=(1,0,0)+t(4,1,−3), t∈ℝ'],
['Sustituimos en las tres ecuaciones y verificamos que los coeficientes de t se cancelan.','1+4t−t−3t=1; 1+4t+2t−6t=1; 2+8t+t−9t=2'],
])];
case 987:return[mk(0,'Secantes si a=−2 o a=2; se cruzan si a≠0,−2,2.',['Paralelas distintas si a=−2 o a=2; se cruzan para los demás a≠0.','Secantes solo si a=2; se cruzan para los demás a≠0.','Coincidentes si a=−2; secantes si a=2; se cruzan para los demás a≠0.'],['Confundir coplanaridad con paralelismo.','Perder la raíz negativa del producto mixto.','No comprobar que los vectores directores no son paralelos.'],[
['Extraemos puntos y vectores directores sin cambiar los signos de los denominadores.','P=(1,2,1), u=(1,1,a); Q=(3,3,−1), v=(−a,−1,2)'],
['Calculamos el producto vectorial para comprobar paralelismo.','u×v=(a+2,−a²−2,a−1)'],
['La segunda componente nunca es cero para a real; las rectas no pueden ser paralelas ni coincidentes.','−a²−2<0 ⇒ u×v≠0'],
['Para rectas no paralelas, el producto mixto decide si son coplanarias.','Q−P=(2,1,−2); (Q−P)·(u×v)=4−a²'],
['Resolvemos la condición de coplanaridad y distinguimos las dos posiciones.','4−a²=0 ⇒ a=±2: secantes; 4−a²≠0: se cruzan'],
['Se conserva la restricción original; los parámetros de intersección también verifican ambos casos.','a=2: t=0,s=1; a=−2: t=frac{4}{3},s=−frac{1}{3}; a≠0'],
]),mk(1,'(x,y,z)=(1,2,1)+λ(4,−6,1), λ∈ℝ.',['(x,y,z)=(1,2,1)+λ(4,6,1), λ∈ℝ.','(x,y,z)=(1,2,1)+λ(4,−6,−1), λ∈ℝ.','(x,y,z)=(3,3,−1)+λ(4,−6,1), λ∈ℝ.'],['Cambiar el signo de la segunda componente del producto vectorial.','Cambiar el signo de la tercera componente.','Usar un punto de s que no es el punto de corte.'],[
['Parametrizamos las rectas al fijar a=2.','r:(1+t,2+t,1+2t); s:(3−2s,3−s,−1+2s)'],
['Igualamos las componentes y resolvemos los parámetros.','2+t=3−s ⇒ t+s=1; 1+2t=−1+2s ⇒ t−s=−1 ⇒ t=0,s=1'],
['Comprobamos la primera componente y obtenemos el punto común.','1+0=3−2·1=1 ⇒ P=(1,2,1)'],
['Un vector perpendicular a ambos directores es su producto vectorial.','(1,1,2)×(−2,−1,2)=(4,−6,1)'],
['Escribimos la recta pedida mediante el punto y ese vector.','x=1+4λ; y=2−6λ; z=1+λ'],
['Los productos escalares nulos verifican las dos perpendicularidades.','(4,−6,1)·(1,1,2)=4−6+2=0; (4,−6,1)·(−2,−1,2)=−8+6+2=0'],
])];
case 989:return[mk(0,'a=4, b=−10.',['a=−4, b=−2.','a=4, b=−16.','a=4, b=10.'],['Identificar la pendiente como a en vez de −a.','Forzar que el numerador se anule en x=2 en lugar de que f(2)=3.','Cambiar el signo al despejar b.'],[
['La pendiente de una asíntota oblicua se calcula como el límite de f(x)/x.','lim_{x→∞}frac{ax²+b}{x(a−x)}=−a'],
['Igualamos la pendiente indicada y obtenemos el primer parámetro.','−a=−4 ⇒ a=4'],
['La gráfica pasa por (2,3); como 2≠4, podemos sustituir sin anular el denominador.','frac{4·2²+b}{4−2}=3'],
['Resolvemos la ecuación para el segundo parámetro.','16+b=6 ⇒ b=−10'],
['La división polinómica comprueba la asíntota completa y su pendiente.','f(x)=−4x−16+frac{54}{4−x}; asíntota y=−4x−16'],
['Verificamos de nuevo el punto y que el resto tiende a cero.','f(2)=frac{16−10}{2}=3; lim_{x→±∞}frac{54}{4−x}=0'],
]),mk(1,'y=9x−4.',['y=−9x+14.','y=4x+1.','y=9x+5.'],['Cambiar el signo de la pendiente al derivar el denominador.','Derivar solo el numerador y omitir la regla del cociente.','Usar f(1) como término independiente.'],[
['Este apartado fija nuevos valores de a y b, distintos de los obtenidos antes.','a=2,b=3 ⇒ f(x)=frac{2x²+3}{2−x}'],
['Calculamos el punto de tangencia.','f(1)=frac{2+3}{1}=5 ⇒ P=(1,5)'],
['Derivamos por el cociente respetando que (2−x)′=−1.','f′(x)=frac{4x(2−x)+(2x²+3)}{(2−x)²}=frac{−2x²+8x+3}{(2−x)²}'],
['Evaluamos la pendiente en uno.','m=f′(1)=−2+8+3=9'],
['Aplicamos la ecuación punto-pendiente y despejamos.','y−5=9(x−1) ⇒ y=9x−4'],
['Sustituir el punto y verificar la derivada confirma las dos condiciones.','y(1)=5; pendiente=9=f′(1)'],
])];
case 990:return[mk(0,'frac{x}{2}[cos(ln x)+sen(ln x)]+C, x>0.',['frac{x}{2}[cos(ln x)−sen(ln x)]+C, x>0.','x[cos(ln x)+sen(ln x)]+C, x>0.','sen(ln x)+C, x>0.'],['Cambiar el signo de la segunda integral por partes.','Olvidar dividir entre dos al reunir las dos copias de I.','Ignorar la derivada interior del logaritmo.'],[
['El logaritmo real exige x>0. Llamamos I a la integral y elegimos u y dv para integrar por partes.','I=∫cos(ln x)dx; u=cos(ln x), dv=dx'],
['Calculamos du y v y aplicamos la primera integración por partes.','du=−frac{sen(ln x)}{x}dx; v=x ⇒ I=x cos(ln x)+∫sen(ln x)dx'],
['Denotamos J la integral restante y volvemos a integrar por partes.','J=∫sen(ln x)dx; u=sen(ln x),dv=dx ⇒ J=x sen(ln x)−∫cos(ln x)dx'],
['Sustituimos J en la primera relación y reunimos los términos I.','I=x cos(ln x)+x sen(ln x)−I ⇒ 2I=x[cos(ln x)+sen(ln x)]'],
['Dividimos entre dos y añadimos la constante arbitraria de integración.','I=frac{x}{2}[cos(ln x)+sen(ln x)]+C'],
['Derivamos el resultado: los términos seno se cancelan y queda exactamente el integrando.','I′=frac{cos(ln x)+sen(ln x)}{2}+frac{−sen(ln x)+cos(ln x)}{2}=cos(ln x)'],
])];default:throw Error('Unknown exponential/ranks case');}}
export function buildExponentialRanksLogcosBatch(id='batch-0458',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===1?'Sistemas con determinantes':c.slot===4?'Planos y rectas':c.slot===2?'Límites y asíntotas':c.kind==='primitive'?'Integrales indefinidas':'Integrales definidas y áreas';x.secondaryTopics=c.slot===2?['Derivadas']:[];x.block=c.slot===1?'Álgebra':c.slot===4?'Geometría':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===2?'RATIONAL_ASYMPTOTES_AND_NORMAL':c.kind==='primitive'?'EXPLICIT_PRIMITIVES_WITH_INDEPENDENT_DERIVATION':'DEFINITE_SUBSTITUTION_WITH_INDEPENDENT_QUADRATURE'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildExponentialRanksLogcosBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0458-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0458.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
