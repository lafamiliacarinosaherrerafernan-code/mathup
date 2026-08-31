import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[383,'0538bf48150a21cab4ec323355fa0eb68c26f4397e554f2d14328f1609399b2f',2,'7','5d489d2971b00c4904e08696620a7e4cc20a46b628aa931fab1d8b42f50d8c24',0],
[390,'67289e40c53ca9c0a1f5733320657184b37e180fbe17777a09bb195668cdcb23',2,'7','df1bb52ca20bd5376f44f8ddbf3ee91fba00bfccee450b9236caa2b5a681d3eb',0],
[393,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',2,'7','5d8c989d1b5dc51d9f4bd35e37f416bf2d6d77c6993951fdde46b4a886e531be',0],
[397,'fda0d38e4ae5dc84aca1154cbe3fb0c5c7c74cb9d32b6ded6aaf94c6ee056755',2,'6','07beed4dc9fff014da103054120724eafb7d323530504a2c4bce120cbb6512b3',0]];
export const statements={
383:'Considera las rectas\nr:\nsystem{x=0;z=0}\ny\ns:\nsystem{x+y=1;x−y=1}\na) Determina la ecuación del plano que contiene a r y es paralelo a s. (1,5 puntos)\nb) Determina la ecuación del plano que contiene a r y es perpendicular a s. (1 punto)',
390:'Considera los puntos P(1,0,1) y Q(3,−2,1).\na) [1 punto] Calcula el plano perpendicular al segmento PQ que pasa por su punto medio.\nb) [1,5 puntos] Calcula el plano paralelo a la recta r: 1−x=frac{y−2}{3}=z+1 que pasa por P y Q.',
393:'La recta perpendicular desde el punto A(1,1,0) a un cierto plano π corta a éste en el punto B(1,frac{1}{2},frac{1}{2}).\na) Calcula la ecuación del plano π. (1,5 puntos)\nb) Halla la distancia del punto A a su simétrico respecto a π. (1 punto)',
397:'Considera el plano π: x+y+z+1=0 y los puntos A(1,2,0) y B(3,1,0).\na) [1,5 puntos] Calcula el punto simétrico del punto A con respecto al plano π.\nb) [1 punto] Halla el plano que contiene a los puntos A y B y es perpendicular al plano π.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PERPENDICULAR_REFLECTIONS_SOURCE_LAYOUT']]:[];
export const cases=[{index:383,slot:4,literals:['x + y = 1','x − y = 1']},{index:390,slot:4,literals:['P (1, 0, 1)','Q(3, −2, 1)']},{index:393,slot:4,literals:['A(1, 1, 0)','simétrico']},{index:397,slot:4,literals:['x + y + z + 1 = 0','A(1, 2, 0)']}];
export const proof=c=>({383:{rDirection:[0,1,0],sDirection:[0,0,1],parallelNormal:[1,0,0],perpendicularNormal:[0,0,1]},390:{midpoint:[2,-1,1],pq:[2,-2,0],rDirection:[-1,3,1],perpendicular:[1,-1,0,-3],parallel:[1,1,-2,1]},393:{A:[1,1,0],foot:[1,.5,.5],reflection:[1,0,1],distance:Math.SQRT2},397:{A:[1,2,0],reflection:[-5/3,-2/3,-8/3],foot:[-1/3,2/3,-4/3],normal:[1,2,-3],constant:-5}}[c.index]);
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_ORTHOGONALITY_AND_REFLECTION_CHECK',proof(c));switch(c.index){
case 383:return[mk(0,'Plano: x=0.',['Plano: z=0.','Plano: x=1.','Plano: x+z=0.'],['Usar el director de s como normal, obteniendo perpendicularidad en vez de paralelismo.','Hacer pasar el plano por s en lugar de contener r.','Elegir una normal que no es ortogonal al director de s.'],[
['Parametrizamos r: x y z son cero y la coordenada libre es y.','r:(x;y;z)=(0;t;0); u=(0;1;0)'],
['Resolvemos las dos ecuaciones de s. Queda libre z, no x ni y.','x+y=1, x−y=1 ⇒ x=1, y=0\ns:(x;y;z)=(1;0;t); v=(0;0;1)'],
['Un plano que contiene r y es paralelo a s tiene las dos direcciones independientes u y v.','n=u×v=(1;0;0)'],
['El origen pertenece a r; aplicamos la ecuación del plano con esa normal y ese punto.','(1;0;0)·((x;y;z)−(0;0;0))=0 ⇒ x=0'],
['Comprobamos que todo punto de r pertenece al plano y que el director de s es tangente al plano.','x(r(t))=0; n·v=0'],
['La recta s no está contenida en el plano, porque sus puntos tienen x=1. Es paralela sin intersección.','x(s(t))=1≠0; r⊂{x=0}; s∥{x=0}'],
]),mk(1,'Plano: z=0.',['Plano: x=0.','Plano: y=0.','Plano: z=1.'],['Confundir el plano paralelo a s con el perpendicular.','Tomar el director de r como normal y perder su contención.','Desplazar el plano y dejar fuera r.'],[
['La recta s tiene x=1, y=0 y z libre, de modo que su director es vertical.','s:(x;y;z)=(1;0;t); v=(0;0;1)'],
['Si el plano es perpendicular a s, su normal es paralela a v.','n=(0;0;1); ecuación z+d=0'],
['El plano debe contener r, que incluye el origen. Sustituimos para fijar el término independiente.','(0;0;0)∈r ⇒ d=0'],
['La ecuación pedida es por tanto el plano cartesiano XY.','z=0'],
['Comprobamos la contención de toda la recta r, no únicamente del punto de anclaje.','r(t)=(0;t;0) ⇒ z=0 para todo t'],
['Verificamos que s es paralela a la normal y corta al plano en un punto.','v=n; s(0)=(1;0;0); s⊥{z=0}'],
])];
case 390:return[mk(0,'Plano: x−y−3=0.',['Plano: x−y−1=0.','Plano: x−y−5=0.','Plano: x+y−1=0.'],['Usar el extremo P en lugar del punto medio.','Usar el extremo Q en lugar del punto medio.','Confundir un vector tangente con la normal al plano.'],[
['Calculamos el vector del segmento y su punto medio usando las coordenadas oficiales.','PQ=(3−1;−2−0;1−1)=(2;−2;0)'],
['El punto de paso del plano se obtiene promediando cada coordenada de P y Q.','M=(frac{1+3}{2};frac{0−2}{2};frac{1+1}{2})=(2;−1;1)'],
['El plano perpendicular al segmento tiene como normal el vector PQ.','n=(2;−2;0)'],
['Usamos la ecuación normal del plano con el punto M.','2(x−2)−2(y+1)=0'],
['Simplificamos dividiendo por dos y ordenando términos.','x−y−3=0'],
['Comprobamos que M satisface la ecuación y que P y Q tienen valores opuestos, como corresponde a un plano mediador.','2−(−1)−3=0; P:−2; Q:2; n∥PQ'],
]),mk(1,'Plano: x+y−2z+1=0.',['Plano: x+y+2z−3=0.','Plano: x+y−2z−1=0.','Plano: x−y+4z−5=0.'],['Cambiar el signo de la componente z de la normal.','Cambiar el signo del término independiente y perder el paso por P y Q.','Usar un director de r con signo de x incorrecto.'],[
['Al igualar la ecuación continua a t, despejamos cada coordenada y extraemos el director con sus signos.','1−x=t; y−2=3t; z+1=t\nr:(x;y;z)=(1−t;2+3t;−1+t); v=(−1;3;1)'],
['El plano contiene el segmento PQ, por lo que otra dirección es su vector.','u=PQ=(2;−2;0)'],
['Calculamos un vector perpendicular a ambas direcciones mediante el producto vectorial.','u×v=(−2;−2;4); elegimos n=(1;1;−2)'],
['Imponemos que el plano pase por P, usando la ecuación normal.','(x−1)+y−2(z−1)=0'],
['Simplificamos y comprobamos también el otro punto oficial.','x+y−2z+1=0; Q:3−2−2+1=0'],
['La normal es ortogonal a v. Además un punto de r no pertenece al plano, por lo que r es paralela y no contenida.','n·v=−1+3−2=0; r(0)=(1;2;−1):1+2+2+1=6≠0'],
])];
case 393:return[mk(0,'Plano: y−z=0.',['Plano: y+z−1=0.','Plano: y−z−1=0.','Plano: x−1=0.'],['Cambiar el signo de una componente normal y conservar solo el punto B.','Usar A como punto del plano en vez de su proyección B.','Elegir un plano que contiene A y B, no uno perpendicular a AB.'],[
['El punto B es el pie de la perpendicular trazada desde A al plano. Por ello AB es una normal.','A=(1;1;0); B=(1;frac{1}{2};frac{1}{2})'],
['Restamos las coordenadas para hallar ese vector sin perder las fracciones.','AB=(0;−frac{1}{2};frac{1}{2})'],
['Multiplicamos por menos dos para trabajar con una normal equivalente de componentes enteras.','n=(0;1;−1)'],
['El punto de paso es B, no A. Aplicamos la ecuación normal del plano.','(y−frac{1}{2})−(z−frac{1}{2})=0'],
['Los términos constantes se cancelan y obtenemos el plano.','π:y−z=0'],
['Comprobamos B en el plano y la perpendicularidad de AB. A queda fuera del plano, a distancia positiva.','B:frac{1}{2}−frac{1}{2}=0; AB=−frac{1}{2}n; A:1−0=1'],
]),mk(1,'Distancia=√2 u.',['Distancia=frac{√2}{2} u.','Distancia=2 u.','Distancia=frac{1}{2} u.'],['Dar solo la distancia de A al plano, que es la mitad.','Duplicar la suma de cuadrados sin aplicar correctamente la raíz.','Confundir el cuadrado de la distancia al plano con la distancia al simétrico.'],[
['En una reflexión respecto de un plano, el pie B es el punto medio del segmento que une A con su simétrico.','A′=2B−A'],
['Sustituimos coordenada a coordenada para obtener el simétrico.','A′=(2−1;1−1;1−0)=(1;0;1)'],
['Calculamos el vector que une los dos puntos cuya distancia se solicita.','AA′=(0;−1;1)'],
['Aplicamos la norma euclídea. La distancia no puede ser negativa.','d(A;A′)=√(0²+(−1)²+1²)=√2 u'],
['Comprobamos por una vía independiente: distancia punto-plano y duplicación por simetría.','d(A;π)=frac{|1−0|}{√(1²+(−1)²)}=frac{1}{√2}; 2d(A;π)=√2'],
['El punto medio coincide con B y el segmento es normal al plano. Ambas condiciones caracterizan la reflexión.','frac{A+A′}{2}=(1;frac{1}{2};frac{1}{2})=B; AA′=−n'],
])];
case 397:return[mk(0,'A′=(−frac{5}{3};−frac{2}{3};−frac{8}{3}).',['A′=(−frac{1}{3};frac{2}{3};−frac{4}{3}).','A′=(frac{11}{3};frac{14}{3};frac{8}{3}).','A′=(−7;−6;−8).'],['Dar el pie de la perpendicular en lugar del simétrico.','Desplazarse en el sentido opuesto al plano.','Olvidar dividir por el cuadrado de la norma de la normal.'],[
['La normal del plano es n=(1,1,1). Buscamos el pie H sobre la recta normal que pasa por A.','H=A+t n=(1+t;2+t;t)'],
['Imponemos que H pertenezca al plano y resolvemos el parámetro.','(1+t)+(2+t)+t+1=0 ⇒ 4+3t=0 ⇒ t=−frac{4}{3}'],
['Sustituimos t en la recta para obtener el pie de la perpendicular.','H=(−frac{1}{3};frac{2}{3};−frac{4}{3})'],
['Como H es el punto medio entre A y su simétrico, despejamos A′.','A′=2H−A'],
['Operamos cada coordenada con denominador común.','A′=(−frac{2}{3}−1;frac{4}{3}−2;−frac{8}{3})=(−frac{5}{3};−frac{2}{3};−frac{8}{3})'],
['Verificamos valores opuestos de la ecuación del plano y dirección normal del desplazamiento.','π(A)=4; π(A′)=−4; A′−A=−frac{8}{3}(1;1;1)'],
]),mk(1,'Plano: x+2y−3z−5=0.',['Plano: x+2y−3z+5=0.','Plano: x+2y+3z−5=0.','Plano: x+y+z−3=0.'],['Cambiar el signo del término independiente.','Cambiar el signo de la componente z de la normal y perder la perpendicularidad.','Usar la normal del plano original y obtener un plano paralelo.'],[
['El plano buscado contiene A y B, luego el vector AB es una de sus direcciones.','u=AB=(2;−1;0)'],
['Para que sea perpendicular a π, su normal debe ser ortogonal a n=(1,1,1). Así n es otra dirección del plano buscado.','n=(1;1;1); N·u=0; N·n=0'],
['Obtenemos una normal mediante el producto vectorial de esas dos direcciones independientes.','u×n=(−1;−2;3); elegimos N=(1;2;−3)'],
['Usamos el punto A para fijar el plano.','(x−1)+2(y−2)−3z=0'],
['Simplificamos y comprobamos que B también pertenece al plano.','x+2y−3z−5=0; B:3+2−0−5=0'],
['La ortogonalidad de las normales demuestra la perpendicularidad entre los planos; el producto no nulo garantiza que el plano está definido.','N·n=1+2−3=0; u×n≠0; A:1+4−5=0'],
])];default:throw Error('Unknown official case');}}
export function buildPerpendicularReflectionsBatch(id='batch-0421',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Problemas métricos';x.secondaryTopics=['Planos y rectas'];x.block='Geometría';x.examSlot=4;x.geometryEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EUCLIDEAN_3D_VECTORS_PLANES_METRICS'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPerpendicularReflectionsBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0421-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0421.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
