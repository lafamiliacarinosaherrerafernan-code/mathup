// An unbounded official region: vertex enumeration alone cannot prove a minimum.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {vertices,feasible} from './resolve-andalucia-linear-region-official.mjs';
import {renderGeneralRegionGraph} from './resolve-andalucia-linear-edge-and-formulation.mjs';
export const cases=[{index:1516,kind:'linear-unbounded-region',constraints:[[-2,1,7],[-1,3,21],[1,2,19],[1,1,14]],objective:[1,4,0],domain:{x:[-5,15],y:[-10,10]},labels:['y − 2x ≤ 7','−x + 3y ≤ 21','x + 2y ≤ 19','x + y ≤ 14'],literals:['𝑦 − 2𝑥 ≤ 7','−𝑥 + 3𝑦 ≤ 21','𝑥 + 2𝑦 ≤ 19','𝑥 + 𝑦 ≤ 14','𝑥 + 4𝑦','valor 40','20?']}];
export function unboundedGraph(c){
 const [xmin,xmax]=c.domain.x,[ymin,ymax]=c.domain.y,clipConstraints=[[1,0,xmax],[-1,0,-xmin],[0,1,ymax],[0,-1,-ymin]],clipped=vertices([...c.constraints,...clipConstraints]);
 const cx=clipped.reduce((n,p)=>n+p[0]/clipped.length,0),cy=clipped.reduce((n,p)=>n+p[1]/clipped.length,0);
 return {schemaVersion:'mathup.linear-programming-visual.v1',plotVersion:'linear-unbounded-region-v1',visualRequired:true,visualType:'linear-programming-region',constraints:c.constraints,objective:c.objective,domain:c.domain,labels:c.labels,
 polygon:clipped.sort((a,b)=>Math.atan2(a[1]-cy,a[0]-cx)-Math.atan2(b[1]-cy,b[0]-cx)),
 vertices:vertices(c.constraints).map((point,i)=>({point,label:String.fromCharCode(65+i)})),
 viewportOnlyConstraints:clipConstraints,recessionWitness:{origin:[0,0],direction:[0,-1],parameter:'t ≥ 0'},
 optima:{minimum:{attained:false,unboundedBelow:true},maximum:{point:[3,8],value:35}},origin:'DERIVED_FROM_RESOLVED_OFFICIAL_CONSTRAINTS_NOT_OFFICIAL_IMAGE'};
}
export function renderUnboundedGraph(g){assert.equal(g.plotVersion,'linear-unbounded-region-v1');assert.ok(g.vertices.every(v=>feasible(v.point,g.constraints)));assert.ok(g.polygon.every(p=>feasible(p,g.constraints)));
 let svg=renderGeneralRegionGraph({...g,plotVersion:'linear-polygon-general-v1'});
 // The display window is not a closed feasible polygon. Do not draw its edges.
 svg=svg.replace(/(<polygon[^>]*?)stroke="#147a52" stroke-width="2"/,'$1stroke="none"');
 svg=svg.replace('Todos los puntos de la zona sombreada cumplen las restricciones.','La región continúa fuera de la ventana; no tiene cota inferior en y.');
 const X=x=>48+(x-g.domain.x[0])*410/(g.domain.x[1]-g.domain.x[0]),Y=y=>350-(y-g.domain.y[0])*300/(g.domain.y[1]-g.domain.y[0]);
 return svg.replace('</svg>',`<g stroke="#15243b" stroke-width="2" fill="none"><path d="M ${X(0)} ${Y(-2)} L ${X(0)} ${Y(-8)} l -5 -8 m 5 8 l 5 -8"/></g><text x="${X(0)+10}" y="${Y(-6)}" font-family="Arial" font-size="14">(0;−t)</text></svg>`);
}
export function solve(c,text){const p=officialParts(text);assert.equal(p.length,3);
 const proof={vertices:vertices(c.constraints),max:35,maxPoint:[3,8],noMinimum:true,recession:[0,-1],range:'(-∞;35]'};
 const a=part(p[0],'Región no acotada por debajo; vértices (0;7), (3;8), (9;5).',[
 'Triángulo acotado; vértices (0;7), (3;8), (9;5).','Región no acotada por debajo; vértices (0;7), (8;3), (9;5).','Región no acotada por debajo; vértices (0;7), (3;8), (5;9).'
 ],['Cerrar el recinto con un segmento inexistente.','Intercambiar coordenadas del cruce central.','Intercambiar coordenadas del último cruce.'],[
 ['Todas las inecuaciones dan cotas superiores de y; el enunciado no impone x≥0 ni y≥0.','y≤min(2x+7;frac{x+21}{3};frac{19−x}{2};14−x)'],
 ['Intersecamos las fronteras primera y segunda.','y=2x+7; −x+3y=21 ⇒ 5x=0 ⇒ A=(0;7)'],
 ['Intersecamos la segunda y la tercera.','−x+3y=21; x+2y=19 ⇒ 5y=40 ⇒ B=(3;8)'],
 ['Intersecamos la tercera y la cuarta.','x+2y=19; x+y=14 ⇒ y=5; x=9 ⇒ C=(9;5)'],
 ['Los otros cruces no son vértices factibles: primero-tercero (1;9) falla la segunda; primero-cuarto y segundo-cuarto también fallan restricciones.','(1;9): −1+27=26>21; (frac{7}{3};frac{35}{3}): −x+3y=frac{98}{3}>21; (frac{21}{4};frac{35}{4}): x+2y=frac{91}{4}>19'],
 ['Verificamos los vértices con las cuatro holguras, todas no negativas.','(7+2x−y;21+x−3y;19−x−2y;14−x−y): A=(0;0;5;7), B=(5;0;0;3), C=(20;15;0;0)'],
 ['La frontera superior enlaza dos semirrectas con AB y BC. Por debajo no existe límite. La ventana de la gráfica no cierra el recinto.','y=2x+7 si x≤0; y=frac{x+21}{3} si 0≤x≤3; y=frac{19−x}{2} si 3≤x≤9; y=14−x si x≥9'],
 ['La familia de puntos (0;−t) prueba directamente que el recinto es no acotado.','t≥0 ⇒ −t≤7; −3t≤21; −2t≤19; −t≤14'],
 ],'ALL_INTERSECTIONS_FEASIBILITY_AND_RECESSION_RAY',proof);a.visual=unboundedGraph(c);
 const b=part(p[1],'Máximo 35 en (3;8); no existe mínimo, F no está acotada inferiormente.',[
 'Máximo 35 en (3;8); mínimo 28 en (0;7).','Máximo 35 en (3;8); mínimo 0 en (0;0).','Máximo 29 en (9;5); no existe mínimo, F no está acotada inferiormente.'
 ],['Buscar el mínimo solo entre vértices de un recinto no acotado.','Añadir implícitamente restricciones de no negatividad.','Elegir el vértice con x mayor sin comparar la función.'],[
 ['Calculamos los valores de los tres vértices, sin suponer que eso basta para el mínimo.','F(0;7)=28; F(3;8)=35; F(9;5)=29'],
 ['Construimos una cota global mediante las holguras segunda y tercera.','35−F=frac{2}{5}(21+x−3y)+frac{7}{5}(19−x−2y)'],
 ['Ambas holguras son no negativas en todo el recinto; por tanto F nunca supera 35.','F≤35'],
 ['La igualdad requiere anular ambas holguras, dando la intersección B.','−x+3y=21; x+2y=19 ⇒ (x,y)=(3;8)'],
 ['Para el mínimo usamos puntos factibles arbitrariamente bajos, no solo vértices.','(x,y)=(0;−t), t≥0 ⇒ F=−4t'],
 ['Al crecer t, F disminuye sin límite. Ningún número finito es mínimo y −∞ tampoco es un valor alcanzado.','t→+∞ ⇒ F→−∞; no existe mínimo'],
 ],'GLOBAL_DUAL_UPPER_BOUND_AND_UNBOUNDED_LOWER_RAY',proof);
 const d=part(p[2],'40 es imposible; 20 sí se alcanza, por ejemplo en (0;5).',[
 '40 sí se alcanza; 20 es imposible.','40 y 20 son imposibles.','40 y 20 se alcanzan en la región.'
 ],['Confundir no acotación del recinto con crecimiento ilimitado de F.','Confundir el menor valor de vértice con una cota inferior global.','Omitir la cota superior demostrada para F.'],[
 ['La cota global obtenida en el apartado anterior excluye valores superiores a 35.','F≤35<40'],
 ['Para comprobar 20 buscamos un punto, tomando x=0.','0+4y=20 ⇒ y=5'],
 ['Comprobamos las dos primeras restricciones en (0;5).','5−0=5≤7; −0+15=15≤21'],
 ['Comprobamos las otras dos restricciones.','0+10=10≤19; 0+5=5≤14'],
 ['El punto es factible y la sustitución verifica exactamente el valor.','F(0;5)=0+4·5=20'],
 ['La existencia de puntos arbitrariamente bajos no contradice la cota superior; son propiedades distintas.','40: no; 20: sí, con testigo (0;5)'],
 ],'TARGET_FEASIBLE_WITNESS_AND_GLOBAL_IMPOSSIBILITY_BOUND',{witness:[0,5],value:20,impossible:40,max:35});return[a,b,d];
}
export function buildUnboundedBatch(id='batch-0304',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildUnboundedBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0304-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0304.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:1,parts:3}));}
