import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {I,mul,add,scale,matrix} from './resolve-andalucia-matrix-order-three.mjs';
export const cases=[{index:1180,C:[[0,1,0],[1,0,1],[0,1,0]],D:[[0,1,1],[1,0,1],[1,1,0]],literals:['Sean las matrices','matrices de adyacencia','representación gráfica']}];
export function graphFromAdjacency(A,labels){
 assert.equal(A.length,labels.length);assert.equal(new Set(labels).size,labels.length);
 assert.ok(labels.every(x=>/^[a-z0-9]$/.test(x)));
 const edges=[];for(let i=0;i<A.length;i++){assert.equal(A[i].length,A.length);assert.equal(A[i][i],0);for(let j=i+1;j<A.length;j++){assert.equal(A[i][j],A[j][i]);assert.ok([0,1].includes(A[i][j]));if(A[i][j])edges.push([labels[i],labels[j]]);}}
 return {labels:[...labels],adjacency:structuredClone(A),edges};
}
export function adjacencyVisual(c=cases[0]){return {schemaVersion:'mathup.adjacency-graph.v1',graphs:[{name:'C',...graphFromAdjacency(c.C,['a','b','c'])},{name:'D',...graphFromAdjacency(c.D,['1','2','3'])}]};}
export function renderAdjacencyGraph(spec){
 assert.equal(spec.schemaVersion,'mathup.adjacency-graph.v1');assert.equal(spec.graphs.length,2);
 let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 230" role="img" aria-label="Grafo C: camino a-b-c. Grafo D: triángulo 1-2-3"><rect width="600" height="230" fill="white"/>';
 for(const [k,g] of spec.graphs.entries()){
  assert.ok(['C','D'].includes(g.name));assert.deepEqual(graphFromAdjacency(g.adjacency,g.labels).edges,g.edges);
  const pos=[[60+k*300,175],[150+k*300,75],[240+k*300,175]];
  svg+=`<text x="${150+k*300}" y="28" text-anchor="middle" font-family="sans-serif" font-size="24">Grafo ${g.name}</text>`;
  for(const [a,b] of g.edges){const p=pos[g.labels.indexOf(a)],q=pos[g.labels.indexOf(b)];svg+=`<line data-edge="${g.name}:${a}-${b}" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#233e62" stroke-width="3"/>`;}
  for(const [i,label] of g.labels.entries()){const [x,y]=pos[i];svg+=`<circle cx="${x}" cy="${y}" r="18" fill="white" stroke="#233e62" stroke-width="2"/><text x="${x}" y="${y+7}" text-anchor="middle" font-family="sans-serif" font-size="23">${label}</text>`;}
 }
 return svg+'</svg>';
}
export function solve(c,text){const pp=officialParts(text),mk=(i,a,w,why,s,e)=>part(pp[i],a,w,why,s,'INDEPENDENT_MATRIX_RESIDUAL_AND_ADJACENCY_RECONSTRUCTION',e),{C,D}=c,CD=mul(C,D),DC=mul(D,C),X=scale(add(add(C,DC),CD),.5),wrong=[scale(add(add(C,DC),CD,-1),.5),add(add(C,DC),CD),scale(add(C,scale(CD,2)),.5)];
 const a=mk(0,`X=${matrix(X)}`,wrong.map(w=>`X=${matrix(w)}`),['Pasar CD restando en vez de sumarlo.','Olvidar dividir todas las entradas entre dos.','Suponer erróneamente que DC=CD.'],[
  ['Las matrices son de orden tres; expandimos el segundo miembro respetando el orden.','2X−CD=(I₃+D)C=C+DC'],
  ['Sumamos CD a ambos lados; no se pueden intercambiar los factores.','2X=C+DC+CD'],
  ['Calculamos CD mediante productos fila-columna.',`CD=${matrix(CD)}`],
  ['Calculamos por separado DC, que en este caso no coincide con CD.',`DC=${matrix(DC)}`],
  ['Sumamos las tres matrices entrada a entrada.',`C+DC+CD=${matrix(scale(X,2))}`],
  ['Dividimos cada entrada entre dos.',`X=${matrix(X)}`],
  ['Comprobamos la ecuación original por sus dos miembros.',`2X−CD=${matrix(add(scale(X,2),CD,-1))}; (I₃+D)C=${matrix(mul(add(I(3),D),C))}`],
 ],{C,D,X,wrong});
 const visual=adjacencyVisual(c),wrongEdges=[[[['a','b'],['a','c']],[['1','2'],['1','3'],['2','3']]],[[['a','b'],['b','c']],[['1','2'],['2','3']]],[[['a','b'],['a','c'],['b','c']],[['1','2'],['1','3'],['2','3']]]];
 const describe=pair=>pair.map((edges,i)=>`${i?'D':'C'}: aristas ${edges.map(e=>e.join('−')).join(', ')}`).join('; ')+'.';
 const edges=visual.graphs.map(g=>g.edges),b=mk(1,describe(edges),wrongEdges.map(describe),['Conectar a con c en lugar de b con c.','Omitir la arista 1−3.','Añadir una arista a−c inexistente.'],[
  ['Una entrada igual a uno une los vértices de su fila y su columna; un cero indica que no se unen.','C: orden a,b,c; D: orden 1,2,3'],
  ['Ambas matrices son simétricas y su diagonal es cero: grafos no dirigidos sin lazos.','Cᵗ=C; Dᵗ=D; cᵢᵢ=dᵢᵢ=0'],
  ['Leemos solo la mitad superior para no contar dos veces cada arista de C.','c₁₂=1; c₁₃=0; c₂₃=1 ⇒ a−b, b−c'],
  ['Repetimos con D; sus tres pares distintos están unidos.','d₁₂=d₁₃=d₂₃=1 ⇒ 1−2, 1−3, 2−3'],
  ['Dibujamos C como un camino de tres vértices y D como un triángulo. El orden de las etiquetas conserva la correspondencia de las matrices.','C: a−b−c; D: ciclo 1−2−3−1'],
  ['Comprobamos grados y número de aristas con las sumas de filas.','C: grados 1,2,1 ⇒ 2 aristas; D: grados 2,2,2 ⇒ 3 aristas'],
  ['Reconstruir las matrices a partir del dibujo devuelve exactamente C y D; no hay lazos ni aristas añadidas.',`C=${matrix(C)}; D=${matrix(D)}`],
 ],{edges,wrongEdges,C,D});b.visual=visual;return[a,b];
}
export function buildAdjacencyBatch(id='batch-0362',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Ecuaciones matriciales','Grafos','Matrices de adyacencia'];x.block='Álgebra';x.examSlot=1;x.qualityGates.pedagogical='WHOLE_MATRIX_EQUATION_AND_GRAPH_WITH_ADJACENCY_RECONSTRUCTION';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildAdjacencyBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0362-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0362.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,x)=>n+x.parts.length,0)}));}
