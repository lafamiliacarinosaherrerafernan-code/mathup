// Official pages inspected before reconstructing accent/glyph layout. No historical answer is used.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
 [426,'85a6693892f29847142a74b342f143d4d263e44abb0bbce055536058043080eb',1,'A.4','ca158e5a5d523e3b0504c26e32c8898e9ffa0e156bb3e21bfd369593ddff85b9',0],
 [427,'e57bc2d094c8120f546b4dd3c69e3372e9fcc93f38875e052f536867901cc5be',2,'B.4','125df25af957752ee5ec84b1733d9893a90c9cb7082837e03d95f6a51ae099ee',0],
 [429,'2200f6e11bca8b324a64d95f8b6b31c9e91afe914d1b929d65031e64575e2395',2,'8','f933ed7ab6fe17786bf21acfa0077202b7a687761fa27fda4762d963309810b3',0],
 [436,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',1,'A.4','e8e984d0811cca1dd03acaf99072168c1e4cc60ef64b4de4a0aef842dfc26056',0],
];
export const statements={
 426:'Dados los puntos A(1, 0, 0), B(0, 0, 1) y P(1, −1, 1), y la recta r definida por x−y−2=0, z=0.\na) [2 puntos] Halla los puntos de la recta r cuya distancia al punto P es de 3 unidades.\nb) [0,5 puntos] Calcula el área del triángulo ABP.',
 427:'Considera el punto P(−1, 0, 1), el vector vec{u}=(1, 2, 1) y el plano π de ecuación y=0.\na) [1,25 puntos] Halla la ecuación de la recta que pasa por P, está contenida en π y cuyo vector director es perpendicular a vec{u}.\nb) [1,25 puntos] Determina la ecuación del plano que pasa por P, es perpendicular a π y del que vec{u} es un vector director.',
 429:'Considera los puntos A(−1, 3, 2), B(2, −1, −1) y C(a−2, 7, b).\na) Determina a y b para que los puntos A, B y C estén alineados. (1.25 puntos)\nb) En el caso a=b=1, halla la recta que pasa por el origen de coordenadas y es perpendicular al plano que contiene a los puntos A, B y C. (1.25 puntos)',
 436:'Sean los puntos A(0, 1, 1), B(2, 1, 3), C(−1, 2, 0) y D(2, 1, m).\na) [0,75 puntos] Calcula m para que A, B, C y D estén en un mismo plano.\nb) [0,75 puntos] Determina la ecuación del plano respecto del cual los puntos A y B son simétricos.\nc) [1 punto] Calcula el área del triángulo de vértices A, B y C.',
};
export const cases=[
 {index:426,literals:['Dados los puntos','distancia al punto P','3 unidades'],A:[1,0,0],B:[0,0,1],P:[1,-1,1],topic:'Problemas métricos'},
 {index:427,literals:['Considera el punto','perpendicular a u','vector'],P:[-1,0,1],u:[1,2,1],topic:'Planos y rectas'},
 {index:429,literals:['puntos','estén alineados','origen de coordenadas'],A:[-1,3,2],B:[2,-1,-1],topic:'Vectores'},
 {index:436,literals:['Sean los puntos','mismo plano','vértices'].slice(0,2),A:[0,1,1],B:[2,1,3],C:[-1,2,0],topic:'Problemas métricos'},
];
export const sub=(a,b)=>a.map((x,i)=>x-b[i]);
export const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
export const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
export function verifyGeometry(c){
 if(c.index===426){const points=[[3,1,0],[-1,-3,0]],n=cross(sub(c.B,c.A),sub(c.P,c.A));assert.ok(points.every(q=>q[0]-q[1]===2&&q[2]===0&&dot(sub(q,c.P),sub(q,c.P))===9));return{points,cross:n,areaSquared:dot(n,n)/4};}
 if(c.index===427){const v=[1,0,-1],n=[1,0,-1];assert.equal(dot(v,c.u),0);assert.equal(dot(n,c.u),0);assert.equal(dot(n,[0,1,0]),0);assert.equal(dot(n,c.P)+2,0);return{direction:v,normal:n,planeConstant:2};}
 if(c.index===429){const AB=sub(c.B,c.A),C=[-4,7,5];assert.deepEqual(sub(C,c.A),AB.map(x=>-x));const n=cross(AB,sub([-1,7,1],c.A));assert.equal(dot(n,AB),0);assert.equal(dot(n,[0,4,-1]),0);return{a:-2,b:5,normal:n};}
 assert.equal(c.index,436);const n=cross(sub(c.B,c.A),sub(c.C,c.A));assert.equal(dot(n,sub([2,1,3],c.A)),0);const mid=c.A.map((x,i)=>(x+c.B[i])/2),normal=[1,0,1];assert.equal(dot(normal,mid),3);const factor=2*(dot(normal,c.A)-3)/dot(normal,normal);assert.deepEqual(c.A.map((x,i)=>x-factor*normal[i]),c.B);return{m:3,normal:n,areaSquared:dot(n,n)/4,reflectionPlane:[1,0,1,-3]};
}
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SPATIAL_VECTOR_SOURCE_LAYOUT']]:[];}
export function solve(c){const ps=officialParts(statements[c.index]),proof=verifyGeometry(c);const make=(i,a,d,reasons,steps)=>part(ps[i],a,d,reasons,steps,'INDEPENDENT_VECTOR_SUBSTITUTION_AND_CROSS_PRODUCT',proof);
 if(c.index===426)return[
 make(0,'(3; 1; 0) y (−1; −3; 0).',['(2; 0; 0) y (0; −2; 0).','(4; 2; 0) y (−2; −4; 0).','(3; −1; 0) y (−1; 1; 0).'],['Confundir la distancia con el cuadrado de la distancia.','Resolver incorrectamente el cuadrado al despejar el parámetro.','Cambiar el signo de la coordenada y y salir de la recta.'],[
 ['Parametrizamos simultáneamente las dos ecuaciones de la recta usando y=t.','Q=(t+2;t;0); t∈ℝ'],
 ['La distancia entre dos puntos es la raíz de la suma de los cuadrados de sus diferencias de coordenadas.','d(Q,P)^{2}=(t+2−1)^{2}+(t+1)^{2}+(0−1)^{2}'],
 ['Elevamos al cuadrado la distancia positiva exigida y reunimos los términos iguales.','2(t+1)^{2}+1=9 ⇒ (t+1)^{2}=4'],
 ['Debemos conservar las dos raíces, porque buscamos todos los puntos.','t+1=2 o t+1=−2 ⇒ t=1 o t=−3'],
 ['Sustituimos cada parámetro en las tres coordenadas de Q.','Q_1=(3;1;0); Q_2=(−1;−3;0)'],
 ['Verificamos que ambos puntos pertenecen a la recta y que su distancia es exactamente tres.','3−1−2=0; −1−(−3)−2=0; d^{2}=4+4+1=9; d=3'],
 ]),make(1,'Área = frac{√3}{2} unidades cuadradas.',['Área = √3 unidades cuadradas.','Área = frac{3}{2} unidades cuadradas.','Área = frac{√2}{2} unidades cuadradas.'],['Omitir el factor un medio del triángulo.','No tomar la raíz en el módulo vectorial.','Perder una componente del producto vectorial.'],[
 ['Tomamos dos lados con el mismo origen. El área es la mitad del módulo de su producto vectorial.','vec{AB}=B−A=(−1;0;1); vec{AP}=P−A=(0;−1;1)'],
 ['Calculamos cada componente del producto, respetando su signo.','vec{AB}×vec{AP}=(0·1−1·(−1);1·0−(−1)·1;(−1)·(−1)−0·0)=(1;1;1)'],
 ['El módulo da el área del paralelogramo y no todavía la del triángulo.','|vec{AB}×vec{AP}|=√(1+1+1)=√3'],
 ['Dividimos entre dos y conservamos unidades cuadradas.','Área=frac{1}{2}·√3=frac{√3}{2}'],
 ['Comprobamos independientemente mediante el determinante de Gram de ambos lados.','|vec{AB}|^{2}=2; |vec{AP}|^{2}=2; vec{AB}·vec{AP}=1; 4·Área^{2}=2·2−1^{2}=3'],
 ])];
 if(c.index===427)return[
 make(0,'r: (x; y; z)=(−1; 0; 1)+t(1; 0; −1).',['r: (x; y; z)=(−1; 0; 1)+t(1; 0; 1).','r: (x; y; z)=(−1; 0; 1)+t(1; −1; 1).','r: (x; y; z)=(1; 0; 1)+t(1; 0; −1).'],['Usar una dirección no perpendicular al vector dado.','Cumplir la perpendicularidad pero salir del plano y=0.','Escoger la dirección correcta con un punto de paso incorrecto.'],[
 ['Una recta por P se escribe P+t·v, con v no nulo. Imponemos las dos condiciones sobre su dirección.','vec{v}=(v_1;v_2;v_3); (x;y;z)=P+t·vec{v}'],
 ['Para permanecer en y=0, la componente vertical y de la dirección debe anularse. El propio P ya pertenece al plano.','v_2=0'],
 ['Dos vectores son perpendiculares si su producto escalar es cero.','vec{v}·vec{u}=v_1+2v_2+v_3=0 ⇒ v_3=−v_1'],
 ['Elegimos v₁=1; cualquier múltiplo no nulo da la misma recta.','vec{v}=(1;0;−1)'],
 ['Escribimos la recta y verificamos punto, plano y producto escalar.','(x;y;z)=(−1+t;0;1−t); t=0 ⇒ P; y=0; (1;0;−1)·(1;2;1)=0'],
 ]),make(1,'Plano: x−z+2=0.',['Plano: x+z=0.','Plano: x−z=0.','Plano: y=0.'],['No hacer perpendicular la normal a la dirección u.','Olvidar ajustar la constante al punto P.','Repetir el plano dado, que no es perpendicular a sí mismo.'],[
 ['Escribimos un plano por P mediante una normal n, y usamos que u debe ser una dirección contenida en él.','vec{n}=(a;b;c); a(x+1)+by+c(z−1)=0'],
 ['La normal de π es (0;1;0). Dos planos perpendiculares tienen normales ortogonales.','vec{n}·(0;1;0)=b=0'],
 ['Toda dirección contenida en el plano es perpendicular a su normal.','vec{n}·vec{u}=a+2b+c=0 ⇒ c=−a'],
 ['Elegimos a=1 y sustituimos la normal en la ecuación por P.','vec{n}=(1;0;−1); (x+1)−(z−1)=0 ⇒ x−z+2=0'],
 ['Verificamos las tres condiciones por separado.','P: −1−1+2=0; vec{n}·(0;1;0)=0; vec{n}·vec{u}=1−1=0'],
 ])];
 if(c.index===429)return[
 make(0,'a=−2; b=5.',['a=2; b=5.','a=−2; b=−1.','a=4; b=−1.'],['Confundir la coordenada a−2 con el parámetro a.','Cambiar el signo del desplazamiento en z.','Usar el mismo sentido en lugar del sentido opuesto.'],[
 ['A y B son distintos, por lo que la alineación exige que AC sea múltiplo de AB.','vec{AB}=(3;−4;−3); vec{AC}=(a−1;4;b−2)'],
 ['Planteamos las tres igualdades con un único parámetro.','a−1=3λ; 4=−4λ; b−2=−3λ'],
 ['La segunda componente fija λ sin depender de a ni b.','λ=−1'],
 ['Sustituimos en las otras dos componentes.','a−1=−3 ⇒ a=−2; b−2=3 ⇒ b=5'],
 ['Comprobamos las coordenadas completas del punto C, no solo los parámetros.','C=(−4;7;5); C−A=(−3;4;3)=−vec{AB}'],
 ]),make(1,'r: (x; y; z)=t(16; 3; 12).',['r: (x; y; z)=t(3; −4; −3).','r: (x; y; z)=t(16; −3; 12).','r: (x; y; z)=t(4; 3; 12).'],['Confundir una dirección del plano con su normal.','Cambiar el signo de la segunda componente del producto vectorial.','Omitir parte del cálculo de la primera componente.'],[
 ['Este apartado fija otros valores de los parámetros; no reutilizamos los de la alineación.','a=b=1 ⇒ C=(−1;7;1)'],
 ['Una recta perpendicular al plano tiene como dirección una normal del plano. Usamos dos lados no paralelos.','vec{AB}=(3;−4;−3); vec{AC}=(0;4;−1)'],
 ['Calculamos el producto vectorial por componentes.','vec{n}=vec{AB}×vec{AC}=(4+12;0+3;12−0)=(16;3;12)'],
 ['La normal no es nula, por lo que los tres puntos determinan un plano. La recta debe pasar por el origen.','r: (x;y;z)=(0;0;0)+t(16;3;12)'],
 ['Comprobamos perpendicularidad con dos direcciones independientes del plano y paso por el origen.','vec{n}·vec{AB}=48−12−36=0; vec{n}·vec{AC}=12−12=0; t=0 ⇒ (0;0;0)'],
 ])];
 assert.equal(c.index,436);return[
 make(0,'m=3.',['m=−1.','m=1.','m=2.'],['Cambiar el signo en el producto mixto.','Confundir la diferencia de coordenadas con la coordenada final.','Imponer igualdad de coordenadas sin comprobar el plano.'],[
 ['Tres vectores que unen A con los otros puntos son coplanarios si su producto mixto es cero.','vec{AB}=(2;0;2); vec{AC}=(−1;1;−1); vec{AD}=(2;0;m−1)'],
 ['Calculamos una normal al plano ABC; su valor no nulo demuestra que el plano está bien definido.','vec{AB}×vec{AC}=(−2;0;2)'],
 ['Imponemos que AD sea perpendicular a esa normal.','(−2;0;2)·(2;0;m−1)=−4+2m−2=0'],
 ['Despejamos y comprobamos el producto mixto.','2m−6=0 ⇒ m=3; −4+2·(3−1)=0'],
 ['Para este valor D coincide con B, lo cual cumple la coplanaridad; el enunciado no exige cuatro puntos distintos.','D=(2;1;3)=B'],
 ]),make(1,'Plano: x+z−3=0.',['Plano: x−z+1=0.','Plano: x+z−2=0.','Plano: y−1=0.'],['Usar un plano que contiene los puntos en lugar de intercambiarlos por reflexión.','Usar una constante que no pasa por el punto medio.','Usar la coordenada común en vez del plano mediador.'],[
 ['El plano de simetría entre dos puntos distintos es el plano perpendicular al segmento por su punto medio.','M=frac{A+B}{2}=(1;1;2); vec{AB}=(2;0;2)'],
 ['Tomamos AB como normal y escribimos la ecuación por M.','2(x−1)+0(y−1)+2(z−2)=0'],
 ['Dividimos toda la ecuación entre dos.','x+z−3=0'],
 ['Comprobamos que el plano contiene el punto medio y es perpendicular al segmento.','1+2−3=0; vec{n}=(1;0;1); vec{AB}=2vec{n}'],
 ['La fórmula de reflexión confirma que A se transforma exactamente en B.','A′=A−2·frac{0+1−3}{1+1}·(1;0;1)=A+2(1;0;1)=(2;1;3)=B'],
 ]),make(2,'Área = √2 unidades cuadradas.',['Área = 2√2 unidades cuadradas.','Área = 2 unidades cuadradas.','Área = frac{√3}{2} unidades cuadradas.'],['Omitir la división entre dos.','Sustituir el módulo por una componente.','Usar lados o componentes ajenos al triángulo.'],[
 ['El área del triángulo es la mitad del módulo del producto vectorial de dos lados.','Área=frac{1}{2}|vec{AB}×vec{AC}|'],
 ['Usamos los lados calculados desde A y su producto vectorial.','vec{AB}=(2;0;2); vec{AC}=(−1;1;−1); vec{AB}×vec{AC}=(−2;0;2)'],
 ['Calculamos el módulo y simplificamos la raíz antes de dividir.','|vec{AB}×vec{AC}|=√(4+0+4)=2√2; Área=√2'],
 ['Verificamos independientemente por el determinante de Gram.','|vec{AB}|^{2}=8; |vec{AC}|^{2}=3; vec{AB}·vec{AC}=−4; 4·Área^{2}=8·3−(−4)^{2}=8'],
 ])];
}
export function buildSpatialBatch(id='batch-0372',selected=cases){const r=buildBatch(selected,id,solve,(c)=>verifyGeometry(c));for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.topic;x.secondaryTopics=['Vectores','Planos y rectas',...([426,436].includes(c.index)?['Problemas métricos']:[])].filter(t=>t!==c.topic);x.block='Geometría';x.examSlot=4;x.geometryEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EUCLIDEAN_3D_VECTORS_PLANES_METRICS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_VECTOR_GEOMETRY';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSpatialBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0372-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0372.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
