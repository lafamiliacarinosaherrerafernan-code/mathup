// Official-page geometry: complete prompts and independent Euclidean checks.
import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {dot,cross,sub} from './resolve-andalucia-spatial-vectors-official.mjs';
export const observations=[
 [464,'91c7db7efdbb93cf3f8763fcfd275431e641c6293dd58cfffa42a740afe5d4cd',2,'8','7febc2d0bcd505ffa5e938ce58835cbdd6b52b1cf58039d2794dd4b309657bab',0],
 [466,'2e7f18e72d9070431873805beca2a6b861457bf0e1d4979e0b6f18700fa4e2ce',2,'5','540e5cf29faf911fd625875d0a6bf9bde053f0a58d6ff8ebb7e42e05cc5e23bf',0],
 [467,'c1053dad9ef9e6ce58aeea7d171758b8b6aec6014f2dfbec91a9ace85f5136e5',1,'A.4','6f22d7f78d93b7f7ca43f5688aab469f81cc4624751e3f496f5c9923caadb017',0],
 [471,'a23cb9ae7edcd859afee53690780388850c71ff86362f0faf67c5c9e78634241',2,'7','3d6e1687541f03cd7f78176500cb82998880f18b4353d100dee233e7e6d9fbf8',0],
 [477,'c5a19b8d41952be5e070bc6d9a83948f6dc8e1eb323dd5b6a57f0e88559b9db3',2,'8','e819fd645b8d06ddd9832345fa52bc2cb1817bc8f73e1e3b6586c66673cd8f9b',0],
];
export const statements={
 464:'Se considera el punto A(1, −2, 0) y la recta r ≡\nsystem{x+y=0;y−3z+2=0}\na) Calcula la ecuación del plano que pasa por A y es perpendicular a r. (1.25 puntos)\nb) Calcula la ecuación del plano que pasa por A y contiene a r. (1.25 puntos)',
 466:'Considera el plano π ≡ 2x+y+2z+5=0.\na) [1,5 puntos] Calcula el punto simétrico de P(1, 0, 1) respecto de π.\nb) [1 punto] Calcula los planos paralelos a π y que disten 2 unidades de π.',
 467:'[2,5 puntos] Determina el punto simétrico del punto A(−3, 1, 6) respecto de la recta r de ecuaciones x−1=frac{y+3}{2}=frac{z+1}{2}.',
 471:'Considera la recta r ≡ frac{x+1}{2}=frac{y−2}{2}=3−z y el punto P(0, 2, −4).\na) [1,25 puntos] Calcula el punto de r a menor distancia de P.\nb) [1,25 puntos] Halla los puntos de r cuya distancia a P sea igual a √50.',
 477:'Considera las rectas r ≡\nsystem{y=0;2x−z=0}\ny s ≡\nsystem{x+y+7=0;z=0}\na) [1 punto] Estudia la posición relativa de r y s.\nb) [1,5 puntos] Calcula la ecuación del plano paralelo a r y s que equidista de ambas rectas.',
};
export const cases=[
 {index:464,literals:['Se considera el punto','perpendicular a r','contiene a r'],topic:'Planos y rectas'},
 {index:466,literals:['Considera el plano','planos paralelos','2 unidades'],topic:'Problemas métricos'},
 {index:467,literals:['Determina el punto','respecto de la recta'],topic:'Problemas métricos'},
 {index:471,literals:['menor distancia','cuya distancia'],topic:'Problemas métricos'},
 {index:477,literals:['Considera las rectas','equidista de ambas'],topic:'Planos y rectas'},
];
export function replacements(r){return statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PROJECTIONS_REFLECTIONS_GEOMETRY_LAYOUT']]:[];}
export const addScaled=(a,v,t)=>a.map((x,i)=>x+t*v[i]);
export function foot(P,Q,v){return addScaled(Q,v,dot(sub(P,Q),v)/dot(v,v));}
export function reflection(P,n,d){return addScaled(P,n,-2*(dot(n,P)+d)/dot(n,n));}
export function proof(c){
 if(c.index===464){const A=[1,-2,0],Q=[2,-2,0],v=[-3,3,1],n=cross(v,sub(A,Q));return{A,Q,v,containedPlaneNormal:n,perpendicularConstant:-dot(v,A),containedConstant:-dot(n,A)};}
 if(c.index===466){const n=[2,1,2],P=[1,0,1],image=reflection(P,n,5),H=P.map((x,i)=>(x+image[i])/2);assert.deepEqual(image,[-3,-2,-3]);assert.deepEqual(H,[-1,-1,-1]);return{P,n,image,foot:H,parallelConstants:[11,-1],distance:2};}
 if(c.index===467){const A=[-3,1,6],Q=[1,-3,-1],v=[1,2,2],H=foot(A,Q,v),image=H.map((x,i)=>2*x-A[i]);assert.deepEqual(H,[3,1,3]);assert.deepEqual(image,[9,1,0]);return{A,Q,v,H,image};}
 if(c.index===471){const P=[0,2,-4],Q=[-1,2,3],v=[2,2,-1],H=foot(P,Q,v),parameters=[0,2],points=parameters.map(t=>addScaled(Q,v,t));for(const X of points)assert.ok(Math.abs(dot(sub(X,P),sub(X,P))-50)<1e-10);return{P,Q,v,H,parameters,points,minDistanceSquared:dot(sub(H,P),sub(H,P))};}
 assert.equal(c.index,477);const Q=[0,0,0],S=[-7,0,0],v=[1,0,2],w=[1,-1,0],n=cross(v,w);return{Q,S,v,w,n,tripleProduct:dot(n,sub(S,Q)),bisectorConstant:7,distance:7/3};
}
export function solve(c,source){const ps=c.index===467?[{id:'whole',prompt:source}]:officialParts(statements[c.index]),ev=proof(c),mk=(i,a,d,errors,steps)=>part(ps[i],a,d,errors,steps,'EUCLIDEAN_PROJECTION_REFLECTION_AND_PLANE_SUBSTITUTION',ev);
 if(c.index===464)return[
 mk(0,'Plano: −3x+3y+z+9=0.',['Plano: −3x+3y+z−9=0.','Plano: x+y=0.','Plano: −3x+3y−z+9=0.'],['Cambiar el signo del término independiente.','Confundir un plano que contiene la recta con uno perpendicular.','Cambiar una componente del vector director.'],[
 ['Parametrizamos r usando z=t y resolviendo sus dos ecuaciones.','r: (x;y;z)=(2;−2;0)+t(−3;3;1)'],
 ['Un plano perpendicular a una recta tiene como vector normal un director de esa recta.','vec{n}=(−3;3;1)'],
 ['Imponemos que pase por el punto oficial A mediante la ecuación punto-normal.','−3(x−1)+3(y+2)+z=0'],
 ['Desarrollamos, agrupando correctamente el término constante.','−3x+3y+z+9=0'],
 ['Comprobamos la pertenencia y que la normal no es nula y coincide con el director de r.','−3·1+3·(−2)+0+9=0; |vec{n}|²=19>0'],
 ]),mk(1,'Plano: y−3z+2=0.',['Plano: x+y=0.','Plano: y−3z−2=0.','Plano: y+3z+2=0.'],['Elegir el otro plano definidor sin comprobar A.','Cambiar el signo del término independiente.','Cambiar la orientación del término z y perder la recta.'],[
 ['Tomamos Q sobre r y el vector desde Q hasta A.','Q=(2;−2;0); vec{QA}=(−1;0;0); vec{v}=(−3;3;1)'],
 ['Los dos vectores son independientes. Su producto vectorial proporciona una normal del plano buscado.','vec{v}×vec{QA}=(0;−1;3)≠vec{0}'],
 ['Escribimos el plano por A y simplificamos un factor −1.','−(y+2)+3z=0 ⇒ y−3z+2=0'],
 ['El plano obtenido contiene toda la recta, porque es una de sus dos ecuaciones definidoras.','y=3t−2, z=t ⇒ y−3z+2=0'],
 ['Comprobamos A y la perpendicularidad de la normal a los dos directores del plano.','−2−0+2=0; (0;−1;3)·(−3;3;1)=0; (0;−1;3)·(−1;0;0)=0'],
 ])];
 if(c.index===466)return[
 mk(0,'P′=(−3;−2;−3).',['P′=(−1;−1;−1).','P′=(5;2;5).','P′=(−5;−3;−5).'],['Dar el pie de la perpendicular en lugar del reflejado.','Desplazarse en el sentido opuesto al simétrico.','Usar factor tres en vez de dos para reflejar.'],[
 ['Identificamos la normal del plano y evaluamos su ecuación en P.','vec{n}=(2;1;2); |vec{n}|²=9; 2·1+0+2·1+5=9'],
 ['La perpendicular al plano por P se escribe P+t·n. Su intersección es el pie H.','H=(1+2t;t;1+2t); 9+9t=0 ⇒ t=−1'],
 ['Sustituimos el parámetro y obtenemos el punto medio de P y su simétrico.','H=(−1;−1;−1)'],
 ['Despejamos P′ en la fórmula del punto medio, componente a componente.','P′=2H−P=(−3;−2;−3)'],
 ['Comprobamos que H está en el plano y que el segmento reflejado es perpendicular a él.','2(−1)−1+2(−1)+5=0; P′−P=−2(2;1;2)'],
 ['Las evaluaciones del plano en ambos puntos son opuestas y sus distancias iguales.','π(P)=9; π(P′)=−9; d(P,π)=d(P′,π)=3'],
 ]),mk(1,'Planos: 2x+y+2z+11=0 y 2x+y+2z−1=0.',['Planos: 2x+y+2z+7=0 y 2x+y+2z+3=0.','Planos: 2x+y+2z+6=0 y 2x+y+2z−6=0.','Planos: 2x+y+2z+23=0 y 2x+y+2z−13=0.'],['Omitir el módulo de la normal en la distancia.','Olvidar el término constante cinco del plano original.','Usar el módulo al cuadrado en lugar del módulo.'],[
 ['Los planos paralelos tienen una normal proporcional; fijamos la misma normal y variamos solo la constante. Llamamos π′ al plano buscado.','π′: 2x+y+2z+d=0'],
 ['La distancia entre planos con la misma normal es la diferencia absoluta de constantes dividida por su módulo.','d(π,π′)=frac{|d−5|}{√(4+1+4)}=frac{|d−5|}{3}'],
 ['Imponemos la distancia dos y conservamos ambas posibilidades del valor absoluto.','|d−5|=6 ⇒ d−5=6 o d−5=−6'],
 ['Obtenemos las dos constantes y escribimos las ecuaciones completas.','d=11 o d=−1'],
 ['Comprobamos ambas distancias y que ninguna de las dos ecuaciones coincide con el plano original.','frac{|11−5|}{3}=2; frac{|−1−5|}{3}=2'],
 ])];
 if(c.index===467)return[mk(0,'Punto simétrico: (9;1;0).',['Punto simétrico: (3;1;3).','Punto simétrico: (5;−7;−8).','Punto simétrico: (6;0;−3).'],['Confundir el pie con el simétrico.','Reflejar respecto al punto base de r sin proyectar.','Confundir el vector desde A hasta el pie H con las coordenadas del punto simétrico.'],[
 ['Leemos los denominadores de la recta oficial: uno en x y dos en y,z.','r: Q+t·vec{v}, Q=(1;−3;−1), vec{v}=(1;2;2)'],
 ['El pie H pertenece a r y el vector A−H debe ser perpendicular a su director.','H=(1+t;−3+2t;−1+2t); (A−H)·vec{v}=0'],
 ['Calculamos el parámetro por proyección escalar, sin confundirlo con una distancia.','t=frac{(A−Q)·vec{v}}{|vec{v}|²}=frac{−4+8+14}{1+4+4}=2'],
 ['Sustituimos para hallar el pie de la perpendicular.','H=(3;1;3)'],
 ['La simetría axial en el espacio conserva H como punto medio e invierte el vector perpendicular.','A′=2H−A=(6;2;6)−(−3;1;6)=(9;1;0)'],
 ['Comprobamos la pertenencia de H y la perpendicularidad, que caracterizan esta simetría.','H−Q=2(1;2;2); (A−H)·vec{v}=(−6;0;3)·(1;2;2)=0'],
 ['Verificamos que las distancias a H son iguales y los vectores opuestos.','A′−H=(6;0;−3)=−(A−H); |A−H|²=45'],
 ])];
 if(c.index===471)return[
 mk(0,'Punto más próximo: (1;4;2).',['Punto más próximo: (−1;2;3).','Punto más próximo: (−3;0;4).','Punto más próximo: (3;6;1).'],['Usar el punto base de la recta sin minimizar.','Cambiar el signo del parámetro de proyección.','Duplicar el parámetro de proyección.'],[
 ['La última igualdad es 3−z=t: por tanto, la componente z del director es negativa.','X(t)=(−1+2t;2+2t;3−t); vec{v}=(2;2;−1)'],
 ['Minimizamos la distancia al cuadrado, que tiene el mismo mínimo que la distancia no negativa.','d²(t)=(−1+2t)²+(2t)²+(7−t)²'],
 ['Desarrollamos y completamos el cuadrado; el coeficiente nueve es positivo.','d²(t)=9t²−18t+50=9(t−1)²+41'],
 ['El mínimo único se obtiene anulando el cuadrado. Sustituimos en las tres coordenadas.','t=1; H=(1;4;2); d_min=√41'],
 ['Comprobamos por otra vía la perpendicularidad del segmento hasta P.','(H−P)·vec{v}=(1;2;6)·(2;2;−1)=2+4−6=0'],
 ]),mk(1,'Puntos: (−1;2;3) y (3;6;1).',['Puntos: (1;4;2) y (5;8;0).','Puntos: (−1;2;1) y (3;6;3).','Puntos: (−3;0;4) y (5;8;0).'],['Desplazar ambos parámetros una unidad respecto a las raíces correctas.','Usar el mismo signo para la variación de z que para x,y.','Duplicar la separación de parámetros respecto al pie.'],[
 ['La distancia solicitada es √50, de modo que su cuadrado vale cincuenta.','9(t−1)²+41=50'],
 ['Despejamos el cuadrado y conservamos las dos raíces reales.','(t−1)²=1 ⇒ t=0 o t=2'],
 ['Sustituimos cada parámetro en las tres coordenadas de la recta oficial.','X(0)=(−1;2;3); X(2)=(3;6;1)'],
 ['Verificamos pertenencia mediante el mismo parámetro en las tres expresiones de la ecuación continua.','frac{x+1}{2}=frac{y−2}{2}=3−z=0 o 2'],
 ['Comprobamos las dos distancias directamente con las coordenadas, independientemente de la ecuación cuadrática.','|X(0)−P|²=(−1)²+0²+7²=50; |X(2)−P|²=3²+4²+5²=50'],
 ])];
 return[
 mk(0,'Las rectas se cruzan: no son paralelas ni secantes.',['Las rectas son secantes.','Las rectas son paralelas distintas.','Las rectas son coincidentes.'],['Suponer intersección por no ser paralelas en el espacio.','Confundir el plano común de dos componentes con direcciones paralelas.','Ignorar el desplazamiento y las direcciones diferentes.'],[
 ['Parametrizamos ambas rectas respetando sus dos ecuaciones simultáneas.','r:(t;0;2t); s:(−7+u;−u;0)'],
 ['Sus directores no son proporcionales, luego no son paralelas ni coincidentes.','vec{v}=(1;0;2); vec{w}=(1;−1;0)'],
 ['Comprobamos si existe un punto común igualando coordenadas. La igualdad de y exige u=0 y la de z exige t=0.','−u=0; 2t=0 ⇒ u=t=0'],
 ['La igualdad de x sería imposible, por lo que no se cortan.','0=−7: contradicción'],
 ['Confirmamos con el producto mixto que no son coplanarias.','vec{n}=vec{v}×vec{w}=(2;2;−1); (−7;0;0)·vec{n}=−14≠0'],
 ]),mk(1,'Plano: 2x+2y−z+7=0.',['Plano: 2x+2y−z−7=0.','Plano: 2x+2y−z+14=0.','Plano: 2x+2y+z+7=0.'],['Cambiar el signo del desplazamiento del plano medio.','Elegir el plano que contiene s en vez del plano medio.','Alterar la normal y perder el paralelismo con r.'],[
 ['La normal de un plano paralelo a ambas rectas debe ser perpendicular a sus dos directores. Llamamos π′ al plano buscado.','vec{n}=(2;2;−1); π′:2x+2y−z+d=0'],
 ['Como n es perpendicular a las direcciones, la distancia de cada recta al plano se calcula usando cualquier punto suyo.','Q=(0;0;0)∈r; S=(−7;0;0)∈s; |vec{n}|=3'],
 ['Imponemos igualdad de las dos distancias sin perder los valores absolutos.','frac{|d|}{3}=frac{|d−14|}{3}'],
 ['Elevamos al cuadrado y resolvemos la ecuación lineal resultante.','d²=(d−14)² ⇒ 28d=196 ⇒ d=7'],
 ['Escribimos el plano y comprobamos sus distancias positivas y paralelismo.','2x+2y−z+7=0; d(r,π)=d(s,π)=frac{7}{3}'],
 ['La normal satisface ambos productos escalares nulos.','(2;2;−1)·(1;0;2)=0; (2;2;−1)·(1;−1;0)=0'],
 ])];
}
export function buildProjectionBatch(id='batch-0376',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic=x.correctionEvidence.parameters.topic;x.secondaryTopics=['Vectores','Planos y rectas'].filter(t=>t!==x.primaryTopic);x.block='Geometría';x.examSlot=4;x.geometryEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EUCLIDEAN_3D_VECTORS_PLANES_METRICS'};if(x.correctionEvidence.parameters.index===467)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_SPATIAL_PROJECTION_AND_REFLECTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildProjectionBatch(),a='artifacts/pau-andalucia-resolution/audit/correction-0376-original-records.json';if(!fs.existsSync(a))fs.writeFileSync(a,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0376.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify(r.batch.records.map(r=>({exerciseId:r.exerciseId,answers:r.parts.map(p=>p.answer)}))));}
