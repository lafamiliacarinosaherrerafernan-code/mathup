import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';import {graphs} from './resolve-andalucia-mates-source-areas.mjs';
export const observations=[
[811,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',1,'A.1','6d096cc13c8881cd748926d1f179d72efb74a76aafba42ee4ac22588989bfe99',0],
[812,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',1,'A.2','13deead994c6e05eaadb352bbd34931e96b8e0a4d903ceb777f888efbf6ddc65',0],
[813,'c32c32963d82d1ee57ab88a8a21a2a7b9559da905b42ecb11e094d10d95ce9e2',2,'B.2','db7d76d5c2161383a924f49807b25b5651abe83505d0b7221681bf884427349f',0],
[814,'0ea3fd4fc59736e3847d6552e64377975175a3605c7742e73d7a41dbf219269c',2,'B.3','d31aa083a635f684d477cd32b8ae4c2a1a7ea3c592213e538aed4bef144719e1',0],
[818,'0fa1c3912eac6e5af10e80bbdfd579032d29e008b33880c6bd4e8f86334d9db6',2,'B.3','4fbd959601a729b2eb43ec7293141ce3f19d6387342102372bc07487dcf863a9',0]];
export const statements={
811:'Calcula a y b sabiendo que lim_{x→0}frac{a(1−cos(x))+b sen(x)−2(eˣ−1)}{x²}=7.',
812:'Calcula ∫frac{1}{(x−2)√(x+2)}dx. Sugerencia: √(x+2)=t.',
813:'Sean f,g:ℝ→ℝ las funciones definidas por f(x)=x²−2x y g(x)=−x²+4x respectivamente.\na) Halla los puntos de corte de sus gráficas y realiza un esbozo del recinto que limitan.\nb) Calcula el área de dicho recinto.',
814:'Considera el siguiente sistema de ecuaciones: system{λx+λy+λz=0;λx+2y+2z=0;λx+2y+z=0}.\na) Discute el sistema según los valores de λ.\nb) Determina, si existen, los valores de λ para los que el sistema tiene alguna solución en la que z≠0.',
818:'Considera las matrices A=matrix{1,1,1;1,2,3;1,4,9} y B=matrix{−1,1,1;1,−1,1;1,1,−1}.\na) Halla la matriz X que verifica AX−B=I (I denota la matriz identidad de orden 3).\nb) Calcula el determinante de la matriz (A²B⁻¹)²⁰¹⁵.'};
export const cases=[{index:811,slot:2,literals:['a(1 − cos(x))','b sen(x)','= 7.']},{index:812,slot:3,literals:['Sugerencia:','(x − 2)']},{index:813,slot:3,literals:['x2 − 2x','−x2 + 4x','recinto']},{index:814,slot:1,literals:['λx + λy + λz = 0','λx + 2y + z = 0']},{index:818,slot:1,literals:['AX − B = I','A2B−1']}];
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LIMIT_SUBSTITUTION_AREA_LAYOUT']]:[];
export const proof=c=>({811:{a:16,b:2,limit:7},812:{substitution:'sqrt(x+2)',partialFractions:[.5,-.5],domainComponents:[[-2,2],[2,'infinity']]},813:{intersections:[[0,0],[3,3]],vertices:[[1,-1],[2,4]],area:9},814:{determinantPolynomial:[0,-2,1],singularParameters:[0,2],zAlwaysZero:true},818:{inverse:[[3,-2.5,.5],[-3,4,-1],[1,-1.5,.5]],X:[[-2,3.5,.5],[3,-4,1],[-1,1.5,-.5]],detA:2,detB:4,detPower:1}}[c.index]);
export function solve(c){const t=statements[c.index],ps=/\na\)/.test(t)?officialParts(t):[{id:'whole',prompt:t}],mk=(i,a,d,r,s,graph=false)=>{const p=part(ps[i],a,d,r,s,'LIMIT_DERIVATIVE_QUADRATURE_AND_MATRIX_SUBSTITUTION',proof(c));if(graph)p.visual=structuredClone(graphs[813]);return p;};switch(c.index){
case 811:return[mk(0,'a=16; b=2.',['a=14; b=2.','a=16; b=−2.','a=8; b=2.'],['Omitir la contribución −2eˣ al derivar por segunda vez.','Cambiar el signo de la contribución lineal de la exponencial.','Olvidar el factor dos de la segunda derivada del denominador.'],[
['Denotamos por N el numerador. Para que el cociente entre x² tenga límite finito, debe desaparecer su término lineal.','N(0)=0; N′(0)=b−2'],
['Si b≠2, N(x)/x tiende a b−2 y N(x)/x² diverge con signos opuestos a ambos lados. Por tanto la condición es necesaria.','b=2'],
['Con ese valor aplicamos l’Hôpital una vez a la indeterminación cero entre cero.','lim_{x→0}frac{N(x)}{x²}=lim_{x→0}frac{a sen(x)+2cos(x)−2eˣ}{2x}'],
['La nueva fracción sigue siendo cero entre cero. Derivamos de nuevo; el denominador se convierte en dos.','lim_{x→0}frac{a cos(x)−2sen(x)−2eˣ}{2}=frac{a−2}{2}'],
['Igualamos al valor exigido y despejamos.','frac{a−2}{2}=7 ⇒ a−2=14 ⇒ a=16'],
['Como comprobación independiente, el desarrollo local del numerador tiene coeficiente cuadrático siete y carece de término lineal.','N(x)=(b−2)x+(frac{a}{2}−1)x²+O(x³)=7x²+O(x³) ⇒ límite 7'],
])];
case 812:return[mk(0,'F(x)=frac{1}{2}ln|frac{√(x+2)−2}{√(x+2)+2}|+C, x>−2, x≠2.',[
'F(x)=ln|frac{√(x+2)−2}{√(x+2)+2}|+C, x>−2, x≠2.',
'F(x)=frac{1}{2}ln|frac{√(x+2)+2}{√(x+2)−2}|+C, x>−2, x≠2.',
'F(x)=frac{1}{2}ln|x−2|+C, x>−2, x≠2.'],['Omitir el factor 1/2 en la descomposición racional.','Invertir el cociente del logaritmo y cambiar el signo de la primitiva.','Sumar logaritmos donde se debían restar.'],[
['La raíz está en el denominador y x−2 tampoco puede anularse; trabajamos por separado en cada intervalo del dominio.','x∈(−2,2)∪(2,+∞)'],
['Aplicamos la sustitución indicada, con t positivo.','t=√(x+2); x=t²−2; dx=2t dt; x−2=t²−4'],
['Sustituimos todos los factores, incluido el diferencial.','∫frac{dx}{(x−2)√(x+2)}=∫frac{2t}{(t²−4)t}dt=∫frac{2}{(t−2)(t+2)}dt'],
['Descomponemos en fracciones simples igualando numeradores.','2=A(t+2)+B(t−2) ⇒ A+B=0, 2A−2B=2 ⇒ A=frac{1}{2}, B=−frac{1}{2}'],
['Integramos y deshacemos el cambio; la constante puede ser distinta en las dos componentes del dominio.','F(x)=frac{1}{2}ln|frac{√(x+2)−2}{√(x+2)+2}|+C'],
['Derivamos usando t′=1/(2t); recuperamos exactamente el integrando original.','F′(x)=frac{1}{2}(frac{1}{t−2}−frac{1}{t+2})frac{1}{2t}=frac{1}{t(t²−4)}=frac{1}{(x−2)√(x+2)}'],
])];
case 813:return[mk(0,'Cortes (0,0) y (3,3); g(x)≥f(x) en [0,3].',[
'Cortes (0,0) y (3,3); f(x)≥g(x) en [0,3].',
'Cortes (0,0) y (−3,15); g(x)≥f(x) en [−3,0].',
'Cortes (0,0) y (6,24); g(x)≥f(x) en [0,6].'],['Invertir la curva superior al restar las dos funciones.','Cambiar el signo de la raíz no nula al despejar.','Olvidar el factor dos del término cuadrático al igualar las curvas.'],[
['Los puntos de corte tienen la misma ordenada en las dos funciones.','x²−2x=−x²+4x ⇒ 2x²−6x=0'],
['Factorizamos y obtenemos las abscisas; después calculamos sus ordenadas.','2x(x−3)=0 ⇒ x=0 o x=3; f(0)=0, f(3)=3'],
['Completamos cuadrados para situar los vértices y orientar ambas parábolas.','f(x)=(x−1)²−1; g(x)=−(x−2)²+4'],
['La primera abre hacia arriba con vértice (1,−1); la segunda hacia abajo con vértice (2,4). El esbozo adjunto conserva estos puntos.','V_f=(1,−1); V_g=(2,4)'],
['Determinamos cuál queda por encima dentro del recinto.','g(x)−f(x)=2x(3−x)>0 para 0<x<3'],
['El recinto queda cerrado entre las dos intersecciones y se sombrea sin sustituirlo por la región respecto al eje horizontal.','R={(x,y):0≤x≤3, f(x)≤y≤g(x)}'],
],true),mk(1,'Área=9 u².',['Área=−9 u².','Área=18 u².','Área=frac{9}{2} u².'],['Restar función inferior menos superior sin corregir el signo.','Duplicar el área al contar las dos curvas como dos recintos.','Omitir el factor dos de la diferencia entre las funciones.'],[
['Usamos las intersecciones anteriores y la diferencia entre curva superior e inferior.','A=∫_0^3 (g(x)−f(x))dx'],
['Sustituimos las dos funciones completas, conservando los signos.','g(x)−f(x)=−x²+4x−(x²−2x)=−2x²+6x'],
['Integramos término a término.','H(x)=−frac{2}{3}x³+3x²'],
['Evaluamos ambos extremos mediante la regla de Barrow.','A=H(3)−H(0)=−18+27−0=9'],
['La diferencia es no negativa en todo el intervalo, por lo que no hay que dividirlo en regiones de signo opuesto.','2x(3−x)≥0 en [0,3] ⇒ A=9 u²'],
['Comprobamos con Simpson, exacto para el polinomio cuadrático integrado.','A=frac{3}{6}[(g−f)(0)+4(g−f)(frac{3}{2})+(g−f)(3)]=frac{1}{2}(0+4·frac{9}{2}+0)=9'],
],true)];
case 814:return[mk(0,'λ∉{0,2}: S={(0,0,0)}; λ=0: S={(t,0,0):t∈ℝ}; λ=2: S={(t,−t,0):t∈ℝ}.',[
'λ∉{0,2}: S={(0,0,0)}; λ=0: S={(0,t,0):t∈ℝ}; λ=2: S={(t,−t,0):t∈ℝ}.',
'λ∉{0,2}: S={(0,0,0)}; λ=0: S={(t,0,0):t∈ℝ}; λ=2: S={(t,t,0):t∈ℝ}.',
'λ∉{0,2}: S={(0,0,0)}; λ=0: S={(t,0,0):t∈ℝ}; λ=2: S=∅.'],['Liberar y en vez de x cuando λ=0.','Perder el signo negativo al resolver x+y=0.','Declarar incompatible un sistema homogéneo.'],[
['El sistema es homogéneo, así que siempre tiene la solución nula. Restamos las dos últimas ecuaciones.','(λx+2y+2z)−(λx+2y+z)=0 ⇒ z=0'],
['Calculamos el determinante para encontrar los parámetros de rango no máximo.','det matrix{λ,λ,λ;λ,2,2;λ,2,1}=λ(λ−2)'],
['Para los valores regulares la matriz es invertible y la solución homogénea es única.','λ≠0,2 ⇒ rango A=rango(A|0)=3 ⇒ S={(0,0,0)}'],
['Si λ=0, las últimas dos ecuaciones imponen y=z=0; x no aparece.','λ=0 ⇒ rango A=2; S={(t,0,0):t∈ℝ}'],
['Si λ=2, queda x+y=0 además de z=0; hay una variable libre.','λ=2 ⇒ rango A=2; S={(t,−t,0):t∈ℝ}'],
['Sustituimos ambas familias en las tres ecuaciones para comprobar que no se ha perdido ninguna condición.','λ=0: (0,0,0) en los tres miembros izquierdos; λ=2: 2t−2t=0 y z=0'],
]),mk(1,'No existe ningún λ real: todas las soluciones satisfacen z=0.',[
'Solo λ=0 permite alguna solución con z≠0.',
'Solo λ=2 permite alguna solución con z≠0.',
'Todo λ real permite alguna solución con z≠0.'],['Confundir la variable libre x con la variable z en el caso λ=0.','Suponer que infinitas soluciones permiten elegir libremente cualquier coordenada.','Olvidar la restricción obtenida al restar las dos últimas ecuaciones.'],[
['Buscamos los parámetros que permiten una solución cuya tercera coordenada no sea cero.','Condición pedida: z≠0'],
['Tomamos las ecuaciones segunda y tercera, válidas para cualquier parámetro.','λx+2y+2z=0; λx+2y+z=0'],
['Restamos miembro a miembro, sin dividir por λ ni excluir valores.','z=0'],
['Esta identidad contradice directamente la condición solicitada.','z=0 y z≠0 son incompatibles'],
['También las familias singulares del apartado anterior mantienen tercera coordenada cero.','λ=0: (t,0,0); λ=2: (t,−t,0)'],
['Por tanto el conjunto de parámetros que cumple la petición es vacío, aunque el sistema homogéneo siempre sea compatible.','{λ∈ℝ: existe solución con z≠0}=∅'],
])];
case 818:return[mk(0,'X=matrix{−2,frac{7}{2},frac{1}{2};3,−4,1;−1,frac{3}{2},−frac{1}{2}}.',[
'X=matrix{−2,frac{5}{2},−frac{1}{2};4,−4,1;0,frac{3}{2},−frac{1}{2}}.',
'X=matrix{8,−frac{17}{2},frac{1}{2};−9,12,−3;3,−frac{9}{2},frac{3}{2}}.',
'X=matrix{−5,6,0;6,−8,2;−2,3,−1}.'],['Multiplicar por A⁻¹ en el lado incorrecto.','Cambiar el signo de B al despejar AX.','Omitir la identidad del segundo miembro.'],[
['Aislamos el producto AX. La matriz A es invertible, pues su determinante vale dos.','AX=B+I; det A=2'],
['Calculamos la inversa por reducción de (A|I) o adjuntos, y comprobamos AA⁻¹=I.','A⁻¹=matrix{3,−frac{5}{2},frac{1}{2};−3,4,−1;1,−frac{3}{2},frac{1}{2}}'],
['Multiplicamos a la izquierda, manteniendo el orden matricial.','X=A⁻¹(B+I); B+I=matrix{0,1,1;1,0,1;1,1,0}'],
['Cada columna del producto se obtiene combinando las columnas de la inversa.','X₁=(−2,3,−1); X₂=(frac{7}{2},−4,frac{3}{2}); X₃=(frac{1}{2},1,−frac{1}{2})'],
['Colocamos estas columnas en la matriz resultado.','X=matrix{−2,frac{7}{2},frac{1}{2};3,−4,1;−1,frac{3}{2},−frac{1}{2}}'],
['La multiplicación directa comprueba las nueve entradas de la ecuación inicial.','AX=matrix{0,1,1;1,0,1;1,1,0}=B+I ⇒ AX−B=I'],
]),mk(1,'det((A²B⁻¹)²⁰¹⁵)=1.',[
'det((A²B⁻¹)²⁰¹⁵)=2⁻²⁰¹⁵.',
'det((A²B⁻¹)²⁰¹⁵)=16²⁰¹⁵.',
'det((A²B⁻¹)²⁰¹⁵)=−1.'],['Olvidar elevar al cuadrado el determinante de A.','Usar det B en lugar de su inverso.','Calcular con signo negativo el determinante de B y conservar la potencia impar.'],[
['El determinante transforma productos en productos escalares y potencias en potencias.','det((A²B⁻¹)²⁰¹⁵)=(det(A²)det(B⁻¹))²⁰¹⁵'],
['Calculamos el determinante de A por eliminación de la primera columna.','det A=det matrix{1,1,1;0,1,2;0,3,8}=8−6=2'],
['Desarrollamos el de B y comprobamos que no es cero, por lo que la inversa existe.','det B=(−1)(1−1)−1(−1−1)+1(1+1)=4'],
['Aplicamos las propiedades de la potencia y de la inversa.','det(A²)=2²=4; det(B⁻¹)=frac{1}{4}'],
['El determinante interior es uno.','det(A²B⁻¹)=4·frac{1}{4}=1'],
['Elevamos al exponente solicitado. No necesitamos calcular la matriz de la potencia.','det((A²B⁻¹)²⁰¹⁵)=1²⁰¹⁵=1'],
])];default:throw Error('Unknown limit-substitution-area case');}}
export function buildLimitSubstitutionAreaBatch(id='batch-0443',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=({1:'Matrices y sistemas',2:'Límites, continuidad y derivadas',3:'Primitivas e integrales'})[c.slot];x.block=c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x.secondaryTopics=c.index===813?['Representación gráfica','Área entre curvas']:[];x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_LIMIT_SUBSTITUTION_AREA'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLimitSubstitutionAreaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0443-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0443.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
