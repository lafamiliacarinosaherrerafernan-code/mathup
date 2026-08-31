import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {det3} from './resolve-andalucia-mates-determinants-integrals.mjs';
import {dot,sub,cross} from './resolve-andalucia-spatial-vectors-official.mjs';
export const observations=[
 [439,'2e7f18e72d9070431873805beca2a6b861457bf0e1d4979e0b6f18700fa4e2ce',2,'6','540e5cf29faf911fd625875d0a6bf9bde053f0a58d6ff8ebb7e42e05cc5e23bf',0],
 [441,'02883b57dfa540931e908920429c12d648ed1810c6ceee66780a26e6f4ebb6d1',1,'2','4eaa5678dce2a49fdb35853d6cb553eb2ec0ee477006e7f79a4bf8378b1d8096',0],
 [445,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',2,'B.4','c1500d3c66a98c8399ade13113a1784988a9334478c4fbe53f2fd335e9cdea28',0],
 [452,'56a7eeb2e214c74b9aeb92347d4b6f860225bb0221675c04e5335a48a645bb74',1,'A.4','857de32b5c2cfde0e0d596e2652eace7f7cdbee0e8405955a8016247265cae30',0],
];
export const statements={
 439:'Sea la matriz A=[[α,α+4,0],[1,α,1],[0,α+4,α]].\na) [1 punto] Indica para qué valores de α la matriz A admite inversa.\nb) [1,5 puntos] Para α=1 determina, si es posible, la matriz inversa de A.',
 441:'Considera la función f definida por f(x)=frac{x⁴−3x²+2}{(x+2)³}, para x≠−2.\na) Estudia y halla las asíntotas de la gráfica de f. (1,5 puntos)\nb) Calcula la ecuación de la recta normal a la gráfica de f en el punto de abscisa x=0. (1 punto)',
 445:'Dados el punto P(1, 1, −1) y la recta r de ecuaciones x+z=1, y+z=0.\na) [1 punto] Halla la ecuación del plano que contiene a r y pasa por P.\nb) [1,5 puntos] Halla la ecuación de la recta contenida en el plano de ecuación y+z=0, que es perpendicular a r y pasa por P.',
 452:'Considera los puntos A(1, 2, 1) y B(−1, 0, 3).\na) [1,25 puntos] Calcula las coordenadas de los puntos que dividen el segmento AB en tres partes iguales.\nb) [1,25 puntos] Halla la ecuación del plano perpendicular al segmento AB y que pasa por A.',
};
export const cases=[{index:439,literals:['matriz A','admite inversa','matriz inversa de A'],topic:'Matrices',slot:1},{index:441,literals:['x4 − 3x2 + 2','asíntotas','recta normal'],topic:'Derivadas',slot:2},{index:445,literals:['P (1, 1, −1)','contiene a r','perpendicular a r'],topic:'Planos y rectas',slot:4},{index:452,literals:['A(1, 2, 1)','B(−1, 0, 3)','tres partes'],topic:'Vectores',slot:4}];
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_MATH_II_INVERSE_NORMAL_GEOMETRY_LAYOUT']]:[];}
export const matrix=a=>[[a,a+4,0],[1,a,1],[0,a+4,a]];
export const inverseNumerator=[[4,5,-5],[1,-1,1],[-5,5,4]];
export const multiply=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
export const rational=x=>(x**4-3*x*x+2)/(x+2)**3;
export function proof(c){
 if(c.index===439){const inverse=inverseNumerator.map(r=>r.map(x=>x/9));const product=multiply(matrix(1),inverse);product.forEach((r,i)=>r.forEach((v,j)=>assert.ok(Math.abs(v-(i===j?1:0))<1e-12)));return{determinantPolynomial:[0,-8,-2,1],excluded:[-2,0,4],atOne:-9,inverse,wrongExcluded:[[-4,0,2],[0,4],[-2,4]],wrongInverseNumerators:[inverseNumerator.map(r=>r.map(x=>-x)),inverseNumerator[0].map((_,i)=>inverseNumerator.map(r=>r[i])),[[4,5,5],[1,-1,1],[-5,5,4]]]};}
 if(c.index===441)return{pole:-2,numeratorAtPole:6,leftInfinity:-1,rightInfinity:1,oblique:[1,-6],remainder:[50,64,21],point:[0,.25],derivative:-3/8,normalSlope:8/3,wrongSlopes:[-3/8,3/8,8/3],wrongIntercepts:[.25,.25,-.25]};
 if(c.index===445){const P=[1,1,-1],v=[-1,-1,1],w=[2,-1,1],n=[0,1,1];assert.equal(dot(v,w),0);assert.equal(dot(n,P),0);assert.equal(dot(n,w),0);return{P,rPoint:[1,0,0],rDirection:v,planeNormal:n,normalDirection:w,wrongPlanes:[[1,0,1,-1],[1,1,1,0],[0,1,-1,0]],wrongDirections:[[1,1,-1],[1,-1,1],[2,1,1]]};}
 assert.equal(c.index,452);const A=[1,2,1],B=[-1,0,3],AB=sub(B,A),points=[1/3,2/3].map(t=>A.map((v,i)=>v+t*AB[i]));return{A,B,AB,points,plane:[1,1,-1,-2],wrongThirds:[[[0,1,2],[-1,0,3]],[[1/3,4/3,4/3],[-1/3,2/3,5/3]],[[5/3,8/3,1/3],[7/3,10/3,-1/3]]],wrongPlanes:[[1,1,-1,2],[1,1,1,-4],[1,-1,1,0]]};
}
const fmt=a=>'[['+a.map(r=>r.join(',')).join('],[')+']]';
export function solve(c){const ps=officialParts(statements[c.index]),ev=proof(c);const mk=(i,a,d,reasons,steps)=>part(ps[i],a,d,reasons,steps,'INDEPENDENT_MATRIX_PRODUCT_DERIVATIVE_OR_VECTOR_SUBSTITUTION',ev);
 if(c.index===439)return[
 mk(0,'A es invertible si α∉{−2;0;4}.',['A es invertible si α∉{−4;0;2}.','A es invertible si α∉{0;4}.','A es invertible si α∉{−2;4}.'],['Cambiar los signos de las raíces del factor cuadrático.','Perder la raíz negativa del factor cuadrático.','Cancelar el factor α sin conservar su raíz.'],[
 ['Una matriz cuadrada admite inversa exactamente cuando su determinante no es cero. Expandimos por la primera fila.','det(A)=α det([[α,1],[α+4,α]])−(α+4)det([[1,1],[0,α]])'],
 ['Calculamos los determinantes de orden dos y conservamos el signo del segundo cofactor.','det(A)=α(α²−α−4)−α(α+4)'],
 ['Extraemos α y simplificamos el factor restante.','det(A)=α(α²−2α−8)'],
 ['Factorizamos el trinomio y encontramos todos los valores singulares.','α²−2α−8=(α−4)(α+2); det(A)=0 ⇔ α∈{−2;0;4}'],
 ['Excluimos exactamente esas tres raíces. Comprobamos que en α=1 el determinante no se anula.','α∉{−2;0;4}; det(A(1))=1·(−3)·3=−9'],
 ]),mk(1,'A^(−1)=frac{1}{9}'+fmt(inverseNumerator)+'.',ev.wrongInverseNumerators.map(a=>'A^(−1)=frac{1}{9}'+fmt(a)+'.'),['Cambiar el signo del determinante al dividir la adjunta.','No trasponer la matriz de cofactores.','Perder el signo negativo de un cofactor.'],[
 ['Sustituimos α=1 en todas las entradas. El determinante calculado permite usar la fórmula de la inversa.','A=[[1,5,0],[1,1,1],[0,5,1]]; det(A)=−9'],
 ['Cada cofactor es su menor multiplicado por el signo de la posición. Calculamos la primera fila de cofactores.','C₁₁=1−5=−4; C₁₂=−(1−0)=−1; C₁₃=5−0=5'],
 ['Calculamos de igual forma las dos filas restantes.','C₂₁=−5; C₂₂=1; C₂₃=−5; C₃₁=5; C₃₂=−1; C₃₃=−4'],
 ['Formamos la adjunta trasponiendo los cofactores; no basta con copiarlos en el mismo orden.','Adj(A)=[[-4,-5,5],[-1,1,-1],[5,-5,-4]]'],
 ['Dividimos por el determinante y reunimos el signo menos en el numerador.','A^(−1)=frac{Adj(A)}{det(A)}=frac{1}{9}[[4,5,-5],[1,-1,1],[-5,5,4]]'],
 ['Comprobamos por multiplicación en ambos órdenes; mostramos el producto antes de dividir entre nueve.','A·[[4,5,-5],[1,-1,1],[-5,5,4]]=[[9,0,0],[0,9,0],[0,0,9]] ⇒ A·A^(−1)=I'],
 ])];
 if(c.index===441)return[
 mk(0,'Asíntota vertical x=−2; oblicua y=x−6; no hay horizontal.',['Asíntota vertical x=−2; oblicua y=x+6; no hay horizontal.','Asíntota vertical x=2; oblicua y=x−6; no hay horizontal.','Asíntota vertical x=−2; horizontal y=0; no hay oblicua.'],['Cambiar el signo del término independiente en la división.','Cambiar el signo de la raíz del denominador.','Comparar incorrectamente los grados de numerador y denominador.'],[
 ['El denominador solo se anula en −2. El numerador allí no se anula, así que no hay discontinuidad evitable.','D(f)=ℝ∖{−2}; N(−2)=16−12+2=6'],
 ['El cubo del denominador cambia de signo al atravesar −2, mientras el numerador es positivo cerca de ese punto.','lim_{x→−2⁻}f(x)=−∞; lim_{x→−2⁺}f(x)=+∞'],
 ['Hay una asíntota vertical x=−2. Para los infinitos dividimos los polinomios, cuya diferencia de grados es uno.','(x+2)³=x³+6x²+12x+8'],
 ['El primer término del cociente es x; tras restar queda −6x³−15x²−8x+2. El siguiente término es −6.','x⁴−3x²+2=(x−6)(x+2)³+21x²+64x+50'],
 ['El resto tiene grado menor que el denominador, así que el cociente restante tiende a cero en ambos infinitos.','f(x)=x−6+frac{21x²+64x+50}{(x+2)³}; lim_{x→±∞}[f(x)−(x−6)]=0'],
 ['Concluimos la oblicua y descartamos horizontal porque f no tiende a un valor finito.','y=x−6; lim_{x→+∞}f(x)=+∞; lim_{x→−∞}f(x)=−∞'],
 ]),mk(1,'Recta normal: y=frac{8}{3}x+frac{1}{4}.',['Recta normal: y=−frac{3}{8}x+frac{1}{4}.','Recta normal: y=frac{3}{8}x+frac{1}{4}.','Recta normal: y=frac{8}{3}x−frac{1}{4}.'],['Dar la recta tangente en vez de la normal.','Cambiar el signo pero olvidar invertir la pendiente.','Cambiar la ordenada del punto de paso.'],[
 ['Calculamos el punto de la gráfica con abscisa cero.','f(0)=frac{2}{8}=frac{1}{4}; P=(0;frac{1}{4})'],
 ['La pendiente tangente se obtiene derivando el cociente. Definimos sus dos polinomios.','N=x⁴−3x²+2; D=(x+2)³; N′=4x³−6x; D′=3(x+2)²'],
 ['Sustituimos cero en la regla del cociente, conservando el cuadrado del denominador.','f′(0)=frac{N′(0)D(0)−N(0)D′(0)}{D(0)²}=frac{0·8−2·12}{64}=−frac{3}{8}'],
 ['La normal es perpendicular a la tangente; sus pendientes no verticales multiplican −1.','m_n=−frac{1}{f′(0)}=frac{8}{3}'],
 ['Escribimos la recta por P y verificamos punto y perpendicularidad.','y−frac{1}{4}=frac{8}{3}(x−0); (−frac{3}{8})·frac{8}{3}=−1'],
 ])];
 if(c.index===445)return[
 mk(0,'Plano: y+z=0.',['Plano: x+z−1=0.','Plano: x+y+z=0.','Plano: y−z=0.'],['Escoger la otra ecuación de r, que no contiene P.','Sumar coordenadas sin comprobar todos los puntos de r.','Cambiar el signo de una componente de la normal.'],[
 ['Parametrizamos r tomando z=t. Un punto y un vector director quedan determinados.','r:(x;y;z)=(1−t;−t;t); Q=(1;0;0); vec{v}=(−1;−1;1)'],
 ['El vector que une Q con P no es paralelo a v, por lo que define con r un único plano.','vec{QP}=(0;1;−1)'],
 ['Calculamos una normal mediante producto vectorial.','vec{v}×vec{QP}=(0;−1;−1); podemos usar vec{n}=(0;1;1)'],
 ['Escribimos el plano por Q y simplificamos.','0(x−1)+1(y−0)+1(z−0)=0 ⇒ y+z=0'],
 ['Comprobamos el punto dado y toda la recta, no solo un punto de ella.','P:1−1=0; r:−t+t=0 para todo t'],
 ]),mk(1,'Recta: (x;y;z)=(1;1;−1)+s(2;−1;1).',['Recta: (x;y;z)=(1;1;−1)+s(1;1;−1).','Recta: (x;y;z)=(1;1;−1)+s(1;−1;1).','Recta: (x;y;z)=(1;1;−1)+s(2;1;1).'],['Tomar una dirección paralela a r en lugar de perpendicular.','No satisfacer el producto escalar nulo.','Salir del plano y+z=0.'],[
 ['Buscamos una dirección w=(u;v;w) que esté en el plano y sea perpendicular a la dirección de r.','v+w=0; −u−v+w=0'],
 ['De la primera ecuación v=−w; al sustituir en la segunda resulta u=2w.','v=−w; −u+2w=0 ⇒ u=2w'],
 ['Elegimos w=1 para obtener una dirección no nula y usamos P como punto de paso.','vec{d}=(2;−1;1); (x;y;z)=(1;1;−1)+s·vec{d}'],
 ['La recta permanece en el plano para cualquier valor del parámetro.','y+z=(1−s)+(−1+s)=0'],
 ['Comprobamos perpendicularidad e intersección con r; ambas son necesarias para rectas perpendiculares.','vec{d}·vec{v}=−2+1+1=0; s=frac{1}{3}, t=−frac{2}{3} ⇒ (frac{5}{3};frac{2}{3};−frac{2}{3})'],
 ])];
 return[
 mk(0,'P=(frac{1}{3};frac{4}{3};frac{5}{3}); Q=(−frac{1}{3};frac{2}{3};frac{7}{3}).',['P=(0;1;2); Q=(−1;0;3).','P=(frac{1}{3};frac{4}{3};frac{4}{3}); Q=(−frac{1}{3};frac{2}{3};frac{5}{3}).','P=(frac{5}{3};frac{8}{3};frac{1}{3}); Q=(frac{7}{3};frac{10}{3};−frac{1}{3}).'],['Usar mitad y extremo en vez de trisección.','Omitir parte de la coordenada inicial z.','Usar BA en lugar de AB y prolongar el segmento hacia fuera.'],[
 ['Calculamos el vector desde A hasta B, conservando el orden de la resta.','vec{AB}=B−A=(−2;−2;2)'],
 ['Los puntos interiores de trisección están a un tercio y dos tercios del recorrido.','P=A+frac{1}{3}vec{AB}; Q=A+frac{2}{3}vec{AB}'],
 ['Sustituimos y calculamos coordenada a coordenada el primer punto.','P=(1−frac{2}{3};2−frac{2}{3};1+frac{2}{3})=(frac{1}{3};frac{4}{3};frac{5}{3})'],
 ['Calculamos el segundo punto conservando la misma dirección.','Q=(1−frac{4}{3};2−frac{4}{3};1+frac{4}{3})=(−frac{1}{3};frac{2}{3};frac{7}{3})'],
 ['La comprobación vectorial demuestra que los tres subsegmentos son iguales y consecutivos.','vec{AP}=vec{PQ}=vec{QB}=(−frac{2}{3};−frac{2}{3};frac{2}{3})'],
 ]),mk(1,'Plano: x+y−z−2=0.',['Plano: x+y−z+2=0.','Plano: x+y+z−4=0.','Plano: x−y+z=0.'],['Cambiar el signo del término independiente.','Usar una normal no paralela a AB.','Elegir otra normal que pasa por A pero no es perpendicular al segmento.'],[
 ['Si un plano es perpendicular al segmento, su vector normal es paralelo a AB.','vec{AB}=(−2;−2;2); elegimos vec{n}=(1;1;−1)'],
 ['La ecuación punto-normal por A usa el producto escalar con X−A.','vec{n}·((x;y;z)−(1;2;1))=0'],
 ['Desarrollamos conservando el signo de la tercera coordenada.','(x−1)+(y−2)−(z−1)=0'],
 ['Simplificamos y verificamos que A pertenece al plano.','x+y−z−2=0; 1+2−1−2=0'],
 ['La normal es un múltiplo no nulo de AB, lo que comprueba la perpendicularidad exigida.','vec{AB}=−2vec{n}'],
 ])];
}
export function buildMatesGeometryBatch(id='batch-0374',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=c.index===439?['Determinantes']:c.index===441?['Límites y asíntotas']:['Vectores','Planos y rectas'].filter(t=>t!==c.topic);x.block=c.slot===1?'Álgebra':c.slot===2?'Análisis':'Geometría';x.examSlot=c.slot;const evidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===1?'MATRIX_DETERMINANT_IDENTITIES':c.slot===2?'RATIONAL_ASYMPTOTES_AND_NORMAL':'EUCLIDEAN_3D_VECTORS_PLANES_METRICS'};if(c.slot===4)x.geometryEvidence=evidence;else x.matesEvidence=evidence;x.qualityGates.pedagogical='FULL_SOURCE_BOUND_MATH_II_DEVELOPMENT';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildMatesGeometryBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0374-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0374.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
