import fs from 'node:fs';import {pathToFileURL} from 'node:url';import {buildBatch} from './resolve-andalucia-inference-2012.mjs';import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
export const observations=[
[251,'ef4c082dc9a17eb27b09d51b09e1e41f1e7192efb6fd3b64b1b852471e928740',2,'7','c722cce02a66e6e62eebbb59e0c3303ed782c145d6ec72bbddcd2d852945b728',0],
[254,'54d3d099a9d525046a68be3b9854c72445eb0b8d72ffb70d5a31ddd2ef6c04dc',1,'A.3','1225eb28afeb0d1e42cda28bd2b3041c1f32efa186eb590638832573512a019e',0],
];
export const statements={251:'Considera la matriz A=[[−frac{1}{2},−frac{sqrt{3}}{2}],[frac{sqrt{3}}{2},−frac{1}{2}]].\na) Calcula A^{37} y A^{41}. (1,5 puntos)\nb) Halla el determinante de la matriz 3A^{52}(A^t)^4, donde A^t es la matriz traspuesta de A. (1 punto)',254:'[2,5 puntos] Considera las matrices\nA=[[1,2,0],[0,1,2],[1,2,1]], B=[[0,1],[1,0]] y C=[[−1,2,0],[1,1,2]].\nDetermina, si existe, la matriz X que verifica AXB=C^t, siendo C^t la matriz traspuesta de C.'};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_PERIODIC_MATRICES_SOURCE_LAYOUT']]:[];
export const cases=[{index:251,literals:['Calcula A37 y A41','3A52']},{index:254,literals:['AXB = Ct','Determina, si existe']}];
export const proof=c=>c.index===251?{period:3,power37:'A',power41:'A²',detA:1,detRequested:9}:{A:[[1,2,0],[0,1,2],[1,2,1]],B:[[0,1],[1,0]],C:[[-1,2,0],[1,1,2]],inverseA:[[-3,-2,4],[2,1,-2],[-1,0,1]],X:[[3,-1],[-1,0],[1,1]]};
export function solve(c){const ps=c.index===254?[{id:'whole',prompt:statements[254]}]:officialParts(statements[251]),mk=(i,a,d,e,s)=>part(ps[i],a,d,e,s,'DIRECT_MATRIX_MULTIPLICATION_AND_INDEPENDENT_RESIDUAL_CHECK',proof(c));if(c.index===251)return[mk(0,'A^{37}=A; A^{41}=A².',['A^{37}=I; A^{41}=I.','A^{37}=A²; A^{41}=A.','A^{37}=A; A^{41}=A.'],['Anular los restos de ambos exponentes al dividir por tres.','Intercambiar los restos uno y dos al reducir las potencias.','Suponer período dos y tratar ambas potencias impares como A.'],[
['Multiplicamos A por sí misma, utilizando que el cuadrado de la raíz de tres es tres.','A²=[[−frac{1}{2},frac{sqrt{3}}{2}],[−frac{sqrt{3}}{2},−frac{1}{2}]]'],
['Multiplicamos A² por A: los términos cruzados se cancelan y cada entrada diagonal vale uno.','A³=[[frac{1+3}{4},0],[0,frac{1+3}{4}]]=I'],
['Descomponemos los exponentes mediante división entera; la periodicidad demostrada es tres.','37=3·12+1; 41=3·13+2'],
['Reducimos la primera potencia sin cambiar la matriz base.','A^{37}=(A³)^{12}A=I·A=A'],
['Reducimos de la misma forma la segunda potencia y sustituimos el cuadrado calculado.','A^{41}=(A³)^{13}A²=A²'],
['Comprobación independiente: A es la matriz de un giro de 120 grados. Los ángulos de ambas potencias equivalen a 120 y 240 grados, respectivamente.','37·120°=12·360°+120°\n41·120°=13·360°+240°'],
]),mk(1,'Determinante=9.',['Determinante=3.','Determinante=81.','Determinante=−9.'],['Aplicar el escalar una sola vez al determinante de orden dos.','Elevar el escalar tres al exponente cuatro de la traspuesta.','Suponer que trasponer cambia el signo del determinante.'],[
['Calculamos primero el determinante de la matriz original.','det(A)=frac{1}{4}−(−frac{3}{4})=1'],
['La trasposición conserva el determinante; no introduce un cambio de signo.','det(A^t)=det(A)=1'],
['Llamamos M al producto para separar la regla del escalar de las reglas de producto y potencia.','M=A^{52}(A^t)^4'],
['Aplicamos las reglas de producto y potencia a M.','det(M)=det(A)^{52}det(A^t)^4=1'],
['M es de orden dos, por lo que multiplicar todas sus entradas por tres multiplica el determinante por nueve.','det(3M)=3²det(M)=9'],
['Comprobamos además el producto: A es ortogonal y su traspuesta es su inversa. La periodicidad permite simplificar M a la identidad.','M=A^{52}A^{−4}=A^{48}=(A³)^{16}=I\ndet(3I)=3·3=9'],
])];return[mk(0,'X=[[3,−1],[−1,0],[1,1]].',['X=[[−1,3],[0,−1],[1,1]].','X=[[3,−1],[−1,0],[−1,1]].','No existe X porque las dimensiones son incompatibles.'],['Omitir la multiplicación final por B inversa y no intercambiar las columnas.','Cambiar el signo de una entrada al resolver el sistema de la segunda columna.','Suponer que X debe ser cuadrada en lugar de deducir sus dimensiones.'],[
['A es de orden tres, B de orden dos y C tiene dos filas y tres columnas. La ecuación exige una X de tres filas y dos columnas.','A:3×3; X:3×2; B:2×2; C^t:3×2'],
['Calculamos los determinantes. En A restamos la primera fila a la tercera; en B usamos la fórmula de orden dos.','det(A)=1; det(B)=−1; B²=I ⇒ B^{−1}=B'],
['Ambas matrices son invertibles. Despejamos multiplicando por A inversa a la izquierda y por B inversa a la derecha.','X=A^{−1}C^tB^{−1}'],
['Obtenemos A inversa resolviendo Au=v: primero z=v₃−v₁, después y=2v₁+v₂−2v₃ y finalmente x=−3v₁−2v₂+4v₃.','A^{−1}=[[−3,−2,4],[2,1,−2],[−1,0,1]]'],
['Multiplicamos por C traspuesta y luego por B, lo que intercambia las dos columnas.','A^{−1}C^t=[[−1,3],[0,−1],[1,1]]\nX=[[3,−1],[−1,0],[1,1]]'],
['Sustituimos para verificar todas las entradas; la invertibilidad demuestra que esta solución existe y es única.','AX=[[1,−1],[1,2],[2,0]]\nAXB=[[−1,1],[2,1],[0,2]]=C^t'],
])];}
export function buildPeriodicMatricesBatch(id='batch-0398',selected=cases){const r=buildBatch(selected,id,solve,proof);for(const x of r.batch.records){x.primaryTopic='Matrices';x.secondaryTopics=['Determinantes'];x.block='Álgebra';x.examSlot=1;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'MATRIX_DETERMINANT_IDENTITIES'};if(x.correctionEvidence.parameters.index===254)x.deliveryScope='WHOLE_OFFICIAL_EXERCISE';x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_AND_INDEPENDENT_CHECK';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildPeriodicMatricesBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0398-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0398.json',JSON.stringify(r.batch,null,2)+'\n');console.log(r.batch.records.map(x=>({id:x.exerciseId,answers:x.parts.map(p=>p.answer)})));}
