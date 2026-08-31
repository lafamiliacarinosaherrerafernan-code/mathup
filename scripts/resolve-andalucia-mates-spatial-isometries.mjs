import fs from 'node:fs';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[230,'551735d3638bd7718cd818aa38a9fa2ede41bc06b23840cb6b358e8356ef0ecd',2,'B.4','48e7b1ddab05696a9a04c9c76a3f1af8081fbfcf7a3df283bda8b7700410662c',0],
[234,'05f1dff88f530745b48de59f61e175687ca608ba013b8bf049b0c31f90301299',2,'B.7','c128e2ac3784b7588054e6882d7c9ba7792acd9389428e89d4b8608ef2a9ef7d',0],
[236,'67593e6ffe6b4e602cf2a0d3b68d10dd2038435a99caf87bc3c83a2f80b2785a',2,'B.8','77fed55538731ac512c81fd844981adbee06a18a3bd4144a19eb5987d9bb9e5a',0],
[237,'2200f6e11bca8b324a64d95f8b6b31c9e91afe914d1b929d65031e64575e2395',1,'4','f5545537a2e686b33d120f692c16c051778b5d7fd1a73c3c35d2a5c49044f29a',0],
[239,'4aa4c2d71811ca346af7cfd770227925f526cbe73dfa4a591abc027bcfca6884',2,'B.8','b86d627ca03e0583de2a31229a21af0a90b024435c0b294645545294fc8ddf7d',0],
];
export const statements={
230:'Sea el plano π: 2x+y−z+8=0.\na) [1,5 puntos] Calcula el punto P′, simétrico del punto P(2;−1;5) respecto del plano π.\nb) [1 punto] Calcula la recta r′, simétrica de la recta r: frac{x−2}{−2}=frac{y+1}{3}=frac{z−5}{1} respecto del plano π.',
234:'Considera las rectas r: x+1=y−a=−z y s:\nsystem{x=5+2λ;y=−3;z=2−λ}\na) [1,5 puntos] Calcula a para que r y s se corten. Determina dicho punto de corte.\nb) [1 punto] Halla la ecuación del plano que pasa por P(8;−7;2) y que contiene a la recta s.',
236:'Considera la recta r:\nsystem{x−y+z=1;3x−2z=−2}\na) [1,5 puntos] Determina la ecuación del plano paralelo a r que contiene a la recta −x+1=y=frac{z−3}{2}.\nb) [1 punto] Calcula la distancia entre la recta r y el plano 2x+5y+3z=41.',
237:'Considera el tetraedro de vértices A(0;0;0), B(1;1;0), C(0;1;3) y D(1;0;3).\na) [1 punto] Calcula el volumen de dicho tetraedro.\nb) [1,5 puntos] Calcula la medida de la altura trazada desde el vértice A de dicho tetraedro.',
239:'Considera los puntos A(1;2;3), B(−2;4;−3) y C(−10;1;0).\na) [1,25 puntos] Halla el área del triángulo de vértices A, B y C.\nb) [1,25 puntos] Halla el plano que equidista de A y B.',
};
export const cases=[{index:230,literals:['2x + y − z + 8','(2, −1, 5)']},{index:234,literals:['(8, −7, 2)','punto de corte']},{index:236,literals:['3x − 2z = −2','2x + 5y + 3z = 41']},{index:237,literals:['B(1, 1, 0)','C(0, 1, 3)']},{index:239,literals:['A(1, 2, 3)','C(−10, 1, 0)']}].map(c=>({...c,topic:'Problemas métricos',slot:4}));
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_SPATIAL_ISOMETRIES_SOURCE_LAYOUT']]:[];
export const proof=c=>c.index===230?{normal:[2,1,-1],constant:8,P:[2,-1,5],u:[-2,3,1],reflected:[-2,-3,7],reflectedDirection:[-2,11,1]}:c.index===234?{parameter:-10,lambda:-8,a:7,intersection:[-11,-3,10],plane:[4,3,8,-27]}:c.index===236?{rDirection:[2,5,3],sDirection:[-1,1,2],sPoint:[1,0,3],plane:[1,-1,1,-4],intersection:[2,5,4],distance:0}:c.index===237?{volume:1,baseNormal:[3,3,1],baseConstant:-6,height:6/Math.sqrt(19)}:{cross:[-12,57,25],area:7*Math.sqrt(82)/2,plane:[6,-4,12,15],midpoint:[-.5,3,0]};
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'SOURCE_BOUND_LINEAR_ALGEBRA_AND_INDEPENDENT_SUBSTITUTION',proof(c));switch(c.index){
case 230:return[mk(0,'P′=(−2;−3;7).',['P′=(0;−2;6).','P′=(6;1;3).','P′=(−2;−3;3).'],['Dar el pie de la perpendicular en lugar del simétrico.','Desplazarse en sentido opuesto respecto de la normal.','Cambiar el signo de la coordenada z en la reflexión.'],[
['Leemos la normal y evaluamos la ecuación del plano en P.','n=(2;1;−1); n·P+8=4−1−5+8=6'],
['El pie H se obtiene desplazando P en la dirección normal hasta el plano.','H=P−frac{n·P+8}{|n|²}n; |n|²=6'],
['Sustituimos y calculamos el pie.','H=(2;−1;5)−(2;1;−1)=(0;−2;6)'],
['La reflexión tiene H como punto medio.','P′=2H−P=(−2;−3;7)'],
['Comprobamos que H pertenece al plano y el segmento PP′ es perpendicular a él.','2·0−2−6+8=0; P′−P=−2n'],
['Las distancias orientadas son opuestas, como requiere la simetría.','n·P+8=6; n·P′+8=−6'],
]),mk(1,'r′: (x;y;z)=(−2;−3;7)+t(−2;11;1).',['r′: (x;y;z)=(−2;−3;7)+t(−2;3;1).','r′: (x;y;z)=(2;−1;5)+t(−2;11;1).','r′: (x;y;z)=(0;−2;6)+t(−2;11;1).'],['Reflejar el punto pero no la dirección de la recta.','Reflejar la dirección pero conservar el punto original.','Usar el pie de la perpendicular en lugar del punto reflejado.'],[
['La recta oficial pasa por P y tiene el siguiente director.','r(t)=P+tu; P=(2;−1;5); u=(−2;3;1)'],
['La reflexión de un vector invierte su componente normal y conserva la tangencial.','u′=u−2frac{u·n}{|n|²}n'],
['Calculamos el producto escalar y el factor de reflexión.','u·n=−4+3−1=−2; |n|²=6'],
['Obtenemos el vector reflejado; podemos multiplicarlo por tres sin cambiar la recta.','u′=(−2;3;1)+frac{2}{3}(2;1;−1)=frac{1}{3}(−2;11;1)'],
['Utilizamos el punto reflejado del apartado anterior y el nuevo director.','r′(t)=(−2;−3;7)+t(−2;11;1)'],
['Comprobación independiente con otro punto original Q=P+3u.','Q=(−4;8;8); Q′=Q−2frac{n·Q+8}{6}n=(−4;8;8); Q′−P′=(−2;11;1)'],
])];
case 234:return[mk(0,'a=7; punto de corte (−11;−3;10).',['a=−7; punto de corte (−11;−3;10).','a=7; punto de corte (−11;−3;−10).','a=−1; punto de corte (−3;−3;2).'],['Despejar a con signo contrario en la coordenada y.','Perder el signo de z=−t.','Resolver solo las coordenadas y,z sin comprobar x.'],[
['Usamos un parámetro distinto para cada recta.','r(t)=(t−1;t+a;−t); s(λ)=(5+2λ;−3;2−λ)'],
['Igualamos las tres coordenadas para exigir intersección.','system{t−1=5+2λ;t+a=−3;−t=2−λ}'],
['La tercera ecuación permite sustituir λ en la primera.','λ=t+2; t−1=9+2t ⇒ t=−10'],
['Recuperamos λ y el valor de a de la segunda ecuación.','λ=−8; −10+a=−3 ⇒ a=7'],
['Evaluamos las dos rectas con los valores encontrados.','r(−10)=(−11;−3;10); s(−8)=(−11;−3;10)'],
['Las ecuaciones primera y tercera fijan los parámetros sin depender de a: ningún otro a puede producir intersección.','t=−10, λ=−8 y a=7 son únicos'],
]),mk(1,'Plano: 4x+3y+8z−27=0.',['Plano: 4x+3y+8z+27=0.','Plano: 4x−3y+8z−45=0.','Plano: 2x−z−14=0.'],['Cambiar el signo de la constante del plano.','Perder el signo de una componente del producto vectorial.','Confundir un director del plano con su normal.'],[
['Tomamos un punto y un director de s directamente de su parametrización.','Q=(5;−3;2); u=(2;0;−1)'],
['El vector desde Q hasta P es otro director del plano.','v=P−Q=(3;−4;0)'],
['Calculamos una normal perpendicular a ambos vectores.','u×v=(−4;−3;−8); elegimos n=(4;3;8)'],
['Como la normal no es nula, los dos vectores son independientes y determinan el plano.','4(x−5)+3(y+3)+8(z−2)=0'],
['Desarrollamos y comprobamos que pasa por P.','4x+3y+8z−27=0; 32−21+16−27=0'],
['Sustituimos la recta completa para verificar que todos sus puntos pertenecen al plano.','4(5+2λ)+3(−3)+8(2−λ)−27=0 para todo λ'],
])];
case 236:return[mk(0,'Plano: x−y+z−4=0.',['Plano: x−y+z−1=0.','Plano: x+y+z−4=0.','Plano: 2x+5y+3z−11=0.'],['Dar un plano que contiene r pero no la recta exigida.','Cambiar el signo de la segunda componente de la normal.','Usar el director de r como normal, haciendo el plano perpendicular.'],[
['Obtenemos el director de r como producto vectorial de las normales de sus planos.','u=(1;−1;1)×(3;0;−2)=(2;5;3)'],
['Parametrizamos la segunda recta con y=t.','s(t)=(1−t;t;3+2t); Q=(1;0;3); v=(−1;1;2)'],
['Una normal del plano requerido debe ser perpendicular a u y a v.','u×v=(7;−7;7) ⇒ n=(1;−1;1)'],
['La recta s está contenida si usamos su punto Q en la ecuación punto-normal.','(x−1)−y+(z−3)=0'],
['Simplificamos y comprobamos los dos productos escalares.','x−y+z−4=0; n·u=2−5+3=0; n·v=−1−1+2=0'],
['La sustitución de s verifica contención; r está en x−y+z=1, un plano paralelo distinto.','(1−t)−t+3+2t−4=0; r no corta el plano pedido'],
]),mk(1,'Distancia = 0.',['Distancia = √(38).','Distancia = frac{41}{√(38)}.','Distancia = frac{40}{√(38)}.'],['Calcular la distancia de un punto arbitrario de r sin comprobar que la recta corta el plano.','Usar la distancia del origen al plano.','Aplicar punto-plano con un punto incorrecto.'],[
['La distancia entre conjuntos es cero si existe algún punto común; no basta con medir desde un punto cualquiera.','n=(2;5;3); u=(2;5;3)'],
['El director de r coincide con la normal del plano: la recta lo corta perpendicularmente.','u·n=38≠0'],
['Tomamos Q=(0;0;1), que satisface las dos ecuaciones de r.','r(t)=(2t;5t;1+3t)'],
['Sustituimos la recta en el plano para obtener su intersección.','2(2t)+5(5t)+3(1+3t)=41 ⇒ 38t+3=41'],
['El parámetro t=1 da un punto compartido por recta y plano.','I=(2;5;4); 2−5+4=1; 3·2−2·4=−2; 4+25+12=41'],
['Al compartir el punto I la distancia mínima entre ambos conjuntos es exactamente cero.','d(r,π)=0'],
])];
case 237:return[mk(0,'Volumen = 1.',['Volumen = 6.','Volumen = 3.','Volumen = frac{1}{3}.'],['Omitir el factor un sexto del tetraedro.','Aplicar solo un medio al paralelepípedo.','Dividir dos veces por tres.'],[
['Como A es el origen, los tres vectores de arista son las coordenadas de B,C,D.','AB=(1;1;0); AC=(0;1;3); AD=(1;0;3)'],
['El módulo del producto mixto es el volumen del paralelepípedo.','Vₚ=|AB·(AC×AD)|'],
['Calculamos el producto vectorial.','AC×AD=(3;3;−1)'],
['Calculamos el producto escalar con la tercera arista.','AB·(AC×AD)=3+3+0=6'],
['El tetraedro ocupa un sexto del paralelepípedo.','V=frac{|6|}{6}=1'],
['Comprobamos el producto mixto calculando el determinante de la matriz de aristas.','det([[1,1,0],[0,1,3],[1,0,3]])=6'],
]),mk(1,'Altura = frac{6}{√(19)}.',['Altura = frac{3}{√(19)}.','Altura = √(19).','Altura = frac{6}{19}.'],['Omitir el factor dos del área de la base.','Confundir el módulo de la normal con la altura.','Dividir entre el cuadrado del módulo de la normal.'],[
['La altura desde A es la distancia al plano de la cara opuesta BCD.','BC=(−1;0;3); BD=(0;−1;3)'],
['Obtenemos una normal de esa cara.','BC×BD=(3;3;1)'],
['Usamos B=(1;1;0) para escribir su plano.','3(x−1)+3(y−1)+z=0 ⇒ 3x+3y+z−6=0'],
['Aplicamos la fórmula punto-plano con A=(0;0;0).','h=frac{|3·0+3·0+0−6|}{√(3²+3²+1²)}=frac{6}{√(19)}'],
['Comprobamos independientemente el área de la cara BCD.','Área(BCD)=frac{|BC×BD|}{2}=frac{√(19)}{2}'],
['La fórmula del volumen de una pirámide reproduce el resultado del apartado anterior.','frac{1}{3}·frac{√(19)}{2}·frac{6}{√(19)}=1'],
])];
case 239:return[mk(0,'Área = frac{7√(82)}{2}.',['Área = 7√(82).','Área = frac{7√(82)}{4}.','Área = frac{√(4018)}{3}.'],['Confundir área del paralelogramo con área del triángulo.','Dividir dos veces entre dos.','Usar el factor un tercio de una fórmula de volumen.'],[
['Construimos dos lados desde A.','AB=(−3;2;−6); AC=(−11;−1;−3)'],
['El área requiere la mitad del módulo de su producto vectorial.','Área=frac{|AB×AC|}{2}'],
['Calculamos cada componente con su signo.','AB×AC=(−6−6;66−9;3+22)=(−12;57;25)'],
['Sumamos los cuadrados y simplificamos la raíz.','|AB×AC|=√(144+3249+625)=√(4018)=7√(82)'],
['Dividimos entre dos para pasar del paralelogramo al triángulo.','Área=frac{7√(82)}{2}'],
['Comprobación independiente por Gram, sin reutilizar el producto vectorial.','|AB|²=49; |AC|²=131; AB·AC=49; 49·131−49²=4018'],
]),mk(1,'Plano: 6x−4y+12z+15=0.',['Plano: 6x−4y+12z−15=0.','Plano: 6x+4y+12z−9=0.','Plano: 6x−4y+12z=0.'],['Cambiar el signo de la constante del plano mediador.','Perder el signo de una componente de AB.','Situar el plano por el origen en vez del punto medio.'],[
['El lugar de puntos equidistantes de A y B es el plano perpendicular a AB por su punto medio.','AB=(−3;2;−6)'],
['Calculamos el punto medio sin redondear.','M=frac{A+B}{2}=(−frac{1}{2};3;0)'],
['Escribimos la ecuación punto-normal con normal AB.','−3(x+frac{1}{2})+2(y−3)−6z=0'],
['Multiplicamos por menos dos para eliminar fracciones.','6x−4y+12z+15=0'],
['Comprobamos que pasa por M y que su normal es paralela a AB.','6(−frac{1}{2})−4·3+15=0; (6;−4;12)=−2AB'],
['Verificación independiente: al igualar distancias al cuadrado se cancelan x²,y²,z².','|X−A|²−|X−B|²=−6x+4y−12z−15=0'],
])];default:throw Error('Unknown case');}}
export function buildSpatialIsometriesBatch(id='batch-0394',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Problemas métricos';x.secondaryTopics=[];x.block='Geometría';x.examSlot=4;x.geometryEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EUCLIDEAN_3D_VECTORS_PLANES_METRICS'};x.qualityGates.pedagogical='FULL_METHOD_WITH_SOURCE_BOUND_PARAMETERS_AND_INDEPENDENT_SUBSTITUTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildSpatialIsometriesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0394-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0394.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
