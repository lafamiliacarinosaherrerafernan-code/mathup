import fs from 'node:fs';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[328,'8948619c3f97deb0787e449297cc3904949ef86c8469df859e9d23c5636a08fb',2,'B.2','89802b1b23944044f42be3477af9723f9bd4d837e83afc0ab4749a55da43ea6d',0],
[331,'bcc0f5d10e7ba4afb5526c30934e6d5202e410eb02006f53611566d004cd16dc',1,'A.2','96acbfc2bfab15a4eee9fbb9f3757153cd645dfcb43f3ed9ec1af1f67a8c5265',0],
[333,'ced80d333d63057cef2e93eda07f0354ab91ecd5f58c11e8d6b7f388e08f5342',2,'B.4','9288f68771abf1fc8cf6b03cdb7d208a66a3d2917fae7acf92cfda8bdcb14d38',0],
[341,'9a4a3ac92abc26f1ca18a7fc0bcf40c3075f1d1ab90ae5d116c8e4c81bdf4104',2,'6','5d8c989d1b5dc51d9f4bd35e37f416bf2d6d77c6993951fdde46b4a886e531be',0]];
export const statements={
328:'Sea g:ℝ→ℝ la función definida por g(x)=−x²+6x−5.\na) [0,75 puntos] Halla la ecuación de la recta normal a la gráfica de g en el punto de abscisa x=4.\nb) [1,75 puntos] Esboza el recinto limitado por la gráfica de g y la recta x−2y+2=0. Calcula el área de este recinto.',
331:'Considera las funciones f y g:ℝ→ℝ dadas por f(x)=6x−x² y g(x)=|x²−2x|.\na) [1,25 puntos] Esboza el recinto limitado por las gráficas de f y g y calcula los puntos de corte de dichas gráficas.\nb) [1,25 puntos] Calcula el área del recinto limitado por las gráficas de f y g.',
333:'Sea r la recta definida por system{x+2y−z=3;2x−y+z=1}.\na) [1,5 puntos] Determina la ecuación general del plano que contiene a r y pasa por el origen de coordenadas.\nb) [1 punto] Halla las ecuaciones paramétricas del plano que corta perpendicularmente a r en el punto (1,1,0).',
341:'Una empresa de mensajería opera en tres rutas distintas A, B y C. Semanalmente hace un total de 70 viajes, y el número de viajes por la ruta B es igual a la suma de los viajes por las rutas A y C.\na) Si sabemos que el doble de la suma de los viajes por las rutas A y C es 70, ¿podemos deducir el número de viajes por cada ruta? Razona la respuesta. (1,25 puntos)\nb) Si el doble de viajes por la ruta C es igual al número de viajes por la ruta B menos 5, ¿cuántos viajes hace por cada ruta? (1,25 puntos)'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_NORMAL_ABSOLUTE_AREAS_SOURCE_LAYOUT']]:[];
export const cases=[{index:328,slot:3,literals:['−x2 + 6x − 5','x − 2y + 2']},{index:331,slot:3,literals:['6x − x2','|x2 − 2x|']},{index:333,slot:4,literals:['x + 2y − z = 3','(1, 1, 0)']},{index:341,slot:1,literals:['70 viajes','menos 5']}];
export const proof=c=>({328:{normal:[.5,1],intersections:[[1.5,1.75],[4,3]],area:125/48},331:{intersections:[[0,0],[4,8]],split:2,areas:[8,32/3],area:56/3},333:{point:[1,1,0],direction:[1,-3,-5],containingNormal:[-5,5,-4],normalPlaneOffset:2,planeDirections:[[3,1,0],[5,0,1]]},341:{family:'(35-t,35,t)',trips:[20,35,15]}}[c.index]);
export const graphs={328:{plotVersion:'mates-normal-absolute-areas-v1',index:328},331:{plotVersion:'mates-normal-absolute-areas-v1',index:331}};
export function renderNormalAbsoluteAreas(g){assert.deepEqual(g,graphs[g.index]);const a=g.index===328,xmin=a?1:0,xmax=a?4.5:4.5,ymin=a?-1:-.5,ymax=a?4.5:12,f=a?x=>-x*x+6*x-5:x=>6*x-x*x,h=a?x=>x/2+1:x=>Math.abs(x*x-2*x),lo=a?1.5:0,hi=4,X=x=>65+630*(x-xmin)/(xmax-xmin),Y=y=>320-285*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(fn,b,e)=>Array.from({length:451},(_,i)=>{const x=b+(e-b)*i/450;return pt(x,fn(x));}).join(' ');let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 430" role="img" aria-label="Recinto entre las curvas oficiales"><rect width="760" height="430" fill="white"/><polygon points="${trace(f,lo,hi)} ${trace(h,hi,lo)}" fill="#ceeaf4"/>`;
for(let i=Math.ceil(xmin);i<=xmax;i++)s+=`<path d="M${pt(i,ymin)} L${pt(i,ymax)}" stroke="#e0e6ee"/><text x="${X(i)}" y="347" text-anchor="middle" font-size="17">${i}</text>`;
for(let i=Math.ceil(ymin);i<=ymax;i+=a?1:2)s+=`<path d="M${pt(xmin,i)} L${pt(xmax,i)}" stroke="#e0e6ee"/><text x="48" y="${Y(i)+5}" text-anchor="end" font-size="17">${i}</text>`;
s+=`<path d="M${pt(xmin,0)} L${pt(xmax,0)}" stroke="#333"/><polyline points="${trace(f,xmin,xmax)}" stroke="#075597" fill="none" stroke-width="3"/><polyline points="${trace(h,xmin,xmax)}" stroke="#a52d3c" fill="none" stroke-width="3"/><text x="65" y="382" font-size="19">${a?'g(x)=−x²+6x−5; recta y=x/2+1':'f(x)=6x−x²; g(x)=|x²−2x|'}</text><text x="65" y="411" font-size="18">${a?'Cortes: (1,5;1,75) y (4;3)':'Cortes: (0;0) y (4;8); cambio de rama en x=2'}</text></svg>`;return s;}
export function solve(c){const ps=officialParts(statements[c.index]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'OFFICIAL_SOURCE_WITH_INDEPENDENT_QUADRATURE_PLANE_AND_SYSTEM_CHECK',proof(c));let out;switch(c.index){
case 328:out=[mk(0,'Normal: y=frac{x}{2}+1.',['Normal: y=−2x+11.','Normal: y=−frac{x}{2}+5.','Normal: y=frac{x}{2}+3.'],['Confundir la tangente con la normal.','Tomar la inversa de la pendiente sin cambiar su signo.','Usar la ordenada del punto como término independiente.'],[
['Evaluamos la función en la abscisa oficial para hallar el punto de contacto.','g(4)=−16+24−5=3; P=(4;3)'],
['Derivamos el polinomio y calculamos la pendiente tangente.','g′(x)=−2x+6; g′(4)=−2'],
['La normal es perpendicular a la tangente. Sus pendientes tienen producto menos uno.','m·(−2)=−1 ⇒ m=frac{1}{2}'],
['Aplicamos la ecuación punto-pendiente usando P, sin perder el desplazamiento horizontal.','y−3=frac{1}{2}(x−4)'],
['Despejamos y para presentar la ecuación de la normal.','y=frac{x}{2}+1'],
['Verificamos el paso por P y la perpendicularidad, que distinguen la normal de la tangente.','frac{4}{2}+1=3; (frac{1}{2})(−2)=−1'],
]),mk(1,'Área=frac{125}{48} u².',['Área=frac{125}{24} u².','Área=frac{125}{96} u².','Área=−frac{125}{48} u².'],['Duplicar el recinto sin una simetría que lo requiera.','Dividir por dos el área integral como si fuera un triángulo.','Integrar curva inferior menos superior.'],[
['Despejamos la recta oficial y la igualamos a la parábola para hallar los extremos del recinto.','y=frac{x}{2}+1; −x²+6x−5=frac{x}{2}+1'],
['La ecuación resultante tiene dos raíces; sustituimos cada una en la recta para hallar sus ordenadas.','2x²−11x+12=(2x−3)(x−4)=0\nP=(frac{3}{2};frac{7}{4}); Q=(4;3)'],
['La diferencia es positiva entre las raíces. El dibujo adjunto muestra parábola superior y recta inferior.','g(x)−r(x)=(x−frac{3}{2})(4−x)≥0 en [frac{3}{2};4]'],
['Integramos curva superior menos inferior. Una primitiva se obtiene término a término.','A=∫_{3/2}^{4} (−x²+frac{11x}{2}−6)dx\nH(x)=−frac{x³}{3}+frac{11x²}{4}−6x'],
['Evaluamos exactamente antes de restar, conservando las fracciones.','H(4)=−frac{4}{3}; H(frac{3}{2})=−frac{63}{16}\nA=−frac{4}{3}+frac{63}{16}=frac{125}{48}'],
['Comprobamos por el cambio u=x−3/2: la anchura es 5/2 y la diferencia es u(5/2−u).','A=∫_{0}^{5/2} (frac{5u}{2}−u²)du=frac{(5/2)³}{6}=frac{125}{48} u²'],
])];out[1].visual=graphs[328];return out;
case 331:out=[mk(0,'Cortes: (0;0) y (4;8); f está por encima de g entre ellos.',['Cortes: (0;0) y (2;8); f está por encima de g entre ellos.','Cortes: (0;0) y (4;8); g está por encima de f entre ellos.','Único corte: (0;0); no existe recinto cerrado.'],['Confundir el cambio de signo dentro del valor absoluto con un corte.','Invertir el orden de las dos curvas.','Usar solo la rama central del valor absoluto.'],[
['Estudiamos el signo del interior del valor absoluto, que cambia en cero y dos.','g(x)=x²−2x si x≤0 o x≥2\ng(x)=2x−x² si 0≤x≤2'],
['En las ramas exteriores igualamos f con x²−2x y comprobamos el dominio de cada raíz.','6x−x²=x²−2x ⇒ 2x(4−x)=0 ⇒ x=0 o x=4'],
['En el tramo central igualamos f con 2x−x². Solo se obtiene el extremo cero.','6x−x²=2x−x² ⇒ 4x=0 ⇒ x=0'],
['Evaluamos las dos funciones en las abscisas válidas para hallar los puntos.','f(0)=g(0)=0; f(4)=g(4)=8'],
['La primera gráfica es una parábola hacia abajo; la segunda refleja hacia arriba su tramo negativo.','f: vértice (3;9)\ng: ceros 0 y 2; máximo del arco central (1;1)'],
['Las diferencias son positivas en el interior del recinto y el dibujo adjunto conserva el cambio de rama.','f−g=4x en [0;2]\nf−g=8x−2x² en [2;4]'],
]),mk(1,'Área=frac{56}{3} u².',['Área=frac{64}{3} u².','Área=32 u².','Área=frac{32}{3} u².'],['Eliminar el valor absoluto también entre cero y dos.','Prolongar la rama central hasta cuatro.','Olvidar el área del tramo entre cero y dos.'],[
['El recinto se extiende de cero a cuatro. Es obligatorio dividir en dos porque g cambia de fórmula.','A=∫_{0}^{2} (f−g)dx + ∫_{2}^{4} (f−g)dx'],
['En la primera zona se cancelan los términos cuadráticos de las dos curvas.','A₁=∫_{0}^{2} 4x dx=2·2²=8'],
['En la segunda zona restamos la rama exterior. La primitiva es cuadrática menos cúbica.','A₂=∫_{2}^{4} (8x−2x²)dx; H(x)=4x²−frac{2x³}{3}'],
['Evaluamos la primitiva en los extremos del segundo tramo.','H(4)=frac{64}{3}; H(2)=frac{32}{3} ⇒ A₂=frac{32}{3}'],
['Sumamos las dos áreas positivas sin añadir ninguna zona exterior al recinto.','A=8+frac{32}{3}=frac{56}{3} u²'],
['Comprobamos las derivadas de las primitivas y los signos en ambos tramos.','(2x²)′=4x; H′(x)=8x−2x²=2x(4−x)≥0 en [2;4]'],
])];out.forEach(p=>p.visual=graphs[331]);return out;
case 333:return[mk(0,'π: −5x+5y−4z=0.',['π: −5x+5y−4z=3.','π: x+2y−z=0.','π: x−3y−5z=0.'],['Añadir un término independiente incompatible con pasar por el origen.','Trasladar solo uno de los planos de r sin conservar la recta.','Usar la dirección de r como normal de un plano que debe contenerla.'],[
['La recta es la intersección de dos planos. Todo plano de su haz es combinación lineal de sus ecuaciones.','α(x+2y−z−3)+β(2x−y+z−1)=0'],
['Imponemos el paso por el origen para relacionar los coeficientes.','−3α−β=0 ⇒ β=−3α'],
['Podemos tomar α=1, ya que no se permiten ambos coeficientes nulos.','(x+2y−z−3)−3(2x−y+z−1)=0'],
['Reducimos los términos semejantes: el término independiente se anula como exige el origen.','−5x+5y−4z=0'],
['Para comprobar que contiene la recta, parametrizamos las dos ecuaciones oficiales.','r: (x;y;z)=(1;1;0)+t(1;−3;−5)'],
['La sustitución se anula para cualquier t, y la sustitución del origen también.','−5(1+t)+5(1−3t)−4(−5t)=0'],
]),mk(1,'(x;y;z)=(1;1;0)+λ(3;1;0)+μ(5;0;1).',['(x;y;z)=(1;1;0)+λ(1;−3;−5)+μ(5;0;1).','(x;y;z)=λ(3;1;0)+μ(5;0;1).','(x;y;z)=(1;1;0)+λ(3;1;0)+μ(−5;0;1).'],['Usar como dirección del plano su vector normal.','Omitir el punto oficial y pasar por el origen.','Cambiar el signo necesario de la primera componente.'],[
['La dirección de r es el producto vectorial de las normales de los planos que la definen.','(1;2;−1)×(2;−1;1)=(1;−3;−5)'],
['Un plano perpendicular a r tiene esa dirección como normal. Tomamos el punto oficial.','P=(1;1;0); n=(1;−3;−5)'],
['La ecuación punto-normal da un plano que contiene P.','(x−1)−3(y−1)−5z=0 ⇒ x−3y−5z+2=0'],
['Para parametrizarlo, elegimos y=1+λ y z=μ, y despejamos x.','x=1+3λ+5μ; y=1+λ; z=μ'],
['Los dos vectores directores son independientes y perpendiculares a n.','u=(3;1;0), v=(5;0;1)\nn·u=0; n·v=0'],
['El punto P pertenece también a r y la dirección de r es normal al plano, así que el corte es perpendicular exactamente en P.','1+2·1−0=3; 2·1−1+0=1'],
])];
case 341:return[mk(0,'No: B=35 y A+C=35; A y C no quedan determinados.',['Sí: A=20, B=35 y C=15 es la única posibilidad.','No: los datos de las rutas son incompatibles.','Sí: A=B=C=frac{70}{3}.'],['Usar la condición adicional del siguiente apartado antes de disponer de ella.','Confundir redundancia con contradicción.','Suponer un reparto igual sin respetar B=A+C.'],[
['Llamamos A, B y C a los números semanales de viajes por cada ruta.','A+B+C=70; B=A+C'],
['Sustituimos la segunda igualdad en la primera para hallar B.','2B=70 ⇒ B=35'],
['Por tanto la suma de viajes de las otras dos rutas está fijada.','A+C=35'],
['El nuevo dato del apartado repite exactamente esa suma y no añade una restricción independiente.','2(A+C)=70 ⇔ A+C=35'],
['Tomamos C=t para describir las posibilidades, con t entero y entre cero y treinta y cinco.','(A;B;C)=(35−t;35;t)'],
['Existen distintas ternas enteras positivas que satisfacen todos los datos, por lo que no hay unicidad.','t=10 ⇒ (25;35;10)\nt=15 ⇒ (20;35;15)'],
]),mk(1,'A: 20 viajes; B: 35 viajes; C: 15 viajes.',['A: 15 viajes; B: 35 viajes; C: 20 viajes.','A: 5 viajes; B: 35 viajes; C: 30 viajes.','A: 10 viajes; B: 35 viajes; C: 25 viajes.'],['Cambiar menos cinco por más cinco al despejar C.','Olvidar dividir entre dos en la ecuación de C.','Aplicar el cinco a la suma antes de repartirla incorrectamente.'],[
['Conservamos las relaciones deducidas a partir de los datos comunes.','B=35; A+C=35'],
['Traducimos el dato nuevo sin invertir la diferencia.','2C=B−5'],
['Sustituimos B y despejamos C.','2C=35−5=30 ⇒ C=15'],
['Recuperamos A a partir de la suma conocida.','A=35−15=20'],
['Verificamos tanto el total semanal como la relación entre las rutas.','20+35+15=70; 35=20+15'],
['La última condición también se verifica; las tres cantidades son enteras positivas.','2·15=35−5=30'],
])];default:throw Error('Unknown official case');}}
export function buildNormalAbsoluteAreasBatch(id='batch-0415',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.slot===4?'Planos y rectas':c.slot===1?'Sistemas con determinantes':'Integrales definidas y áreas';x.secondaryTopics=c.index===328?['Aplicaciones de derivadas']:[];x.block=c.slot===4?'Geometría':c.slot===1?'Álgebra':'Análisis';x.examSlot=c.slot;x[c.slot===4?'geometryEvidence':'matesEvidence']={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:c.slot===4?'EUCLIDEAN_3D_VECTORS_PLANES_METRICS':c.slot===1?'ROUCHE_FROBENIUS_PARAMETER_SYSTEMS':'SOURCE_BOUND_AREAS_WITH_INDEPENDENT_QUADRATURE_AND_GRAPH'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildNormalAbsoluteAreasBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0415-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0415.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
