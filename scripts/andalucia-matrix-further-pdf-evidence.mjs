// Official PDF readings. No source literal is overwritten; projector stores reversible edits.
import assert from 'node:assert/strict';
export const matrixFurtherObservations=[
 [553,'2363de4efb5db3255c564620c811bcac1a16eb63e20050dff43874826ada23c4',1,'1','7443980d4386725818e49251b30414ada795e63394e0c26a1f7afd2adf61cc20',0],
 [557,'91ec66a95c7a0df235817276a94b92fe302302ba32aa5e98ee45e940903a57cb',8,'1','c88d401380d4c2c309e08ac7e59e831d8f39c90f56fd91f1aa928effb189f887',0],
 [565,'a10146fce64a17e21450973c88d66d43571619781f76bc345b5a4b3dee67a16b',2,'B.1','dbdca03b7e3cf51b6b87311804f33b8fcfc4f5e8bd84b6b1b7617d341ad1e23f',0],
 [568,'3382ee86917021a5a103b010202f2bb187eafb9b883e084bbfe921302d86e503',1,'A.1','c9cb4c59a714f9eaa65b308df04e092c53d47fad93e350ac01bda41682601fce',0],
 [583,'952465c4cbe1692408657577fd13e8ea7c0fa608502a6b533aeca2a4bae6f39e',1,'2','abb6b694087eff3336eed15f749283d3a8ad4c3e2a9c8f43f9786e9e618a1817',0],
 [590,'8b1971b90e1195617d7664a4841fb315183966683c3fab945fc7d484c7c54c8b',1,'2','c540168f04970bde6f497e8986d25648e95db74bacfd8c5a061d901af1d3efaf',0],
 [605,'37584a9604930b74008a6bda88ef3d61fa926d5e6a540ab9013569258f772256',2,'B.1','e972cdc0c09c051c3e203e397b4df9e0ddaaf4bbacccfdebca03732bdce029d9',0],
 [621,'1f0983e351b8435c5b6c7b68b05fe2a64034faf77a85a1f9480407aa0f2a88aa',1,'A.1','4476d70eed75862bb03453af6607e27c9e1a55a931102bd482f4a79b772efacb',0],
 [634,'68934c098e6cd4ad77a3b9215dd857def1306205432e73ccd2548dbc2e0652c2',1,'2','05d232f41f1761edc9041b434d5e1ab964f0ee96529f34d3601c297e6e4ca055',0],
 [656,'fc025a25faa338cbb9d8d288443f0322dfbcc0464f7474a16a84e8dfe47f81d1',2,'1','27d381d93cd700245bcc6ad1ff68675812468111e6eb141ec25d1305a750d1a6',0],
];
export function matrixFurtherReplacements(record){
 const i=record.queueIndex;if(!matrixFurtherObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>=0);
 const prefixes={553:'Se considera la matriz A = [[1,0,0],[0,2,0],[0,−1,1]].\n\n',557:'Se consideran las matrices A = [[−1,11],[5,−4]], B = [[5,0],[−3,9]], C = [[4,6],[m,3]].\n\n',565:'Sean las matrices A = [[6,0],[2,4]], B = [[−4],[6]] y C = [[−2,−2]].\n\n',568:'Sean las matrices A = [[2,−5],[1,−3]], B = [[3,−1,2],[0,1,1]], C = [[1,2,3],[−1,5,3]].\n\n',583:'Se consideran las matrices A = [[a,2,0],[8,a,0],[0,0,a]] y B = [[1],[−2],[10]], donde a es un número real.\n\n',590:'Se consideran las matrices A = [[a,1,0],[0,a,1],[3,4,1]], B = [[2,−1,0]], C = [[1,3,−1]], donde a es un número real.\n\n',621:'Sean las matrices A = [[2,−1],[a,b]] y B = [[−1,1],[3,0]].\n\n',634:'Se consideran las matrices A = [[7,−6,−2],[3,1,4],[−5,0,−4]], B = [[2,2,3],[5,3,4],[−4,0,1]], C = [[1,2,−1],[−2,−3,0]], D = [[a^{2},0,−1],[1,−1,a]].\n\n'};
 const r=[],add=(a,b,rule='PDF_VISIBLE_MATRIX_ROWS_COLUMNS')=>r.push([a,b,rule]);
 if(at>0&&prefixes[i]!==undefined)add(record.sourceLiteral.slice(0,at),prefixes[i]);
 const pp=(k,t)=>add(record.parts[k].prompt,t,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION');
 if(i===553){pp(0,'Pruebe que se verifica que A^{-1} = frac{1}{2}(A^{2}−4A+5I₃).');pp(1,'Dada la ecuación matricial X^{t}·A = [[1,2,0],[3,−1,1]], determine la dimensión de X y resuelva la ecuación.');}
 if(i===557){pp(0,'Resuelva el siguiente sistema de ecuaciones matriciales: 3X+2Y=A; −4X+Y=B.');pp(1,'¿Para qué valores de m tiene inversa la matriz C?');pp(2,'Para m=1, calcule la matriz inversa de C.');}
 if(i===565){pp(0,'Justifique cuáles de las siguientes operaciones se pueden realizar y efectúelas cuando sea posible: B+2C·A; A−(B·C)^{t}.');pp(1,'Resuelva la siguiente ecuación matricial: frac{1}{5}(B+A·X)=C^{t}.');}
 if(i===568){pp(0,'Calcule A^{2}−B·C^{t}.');pp(1,'Resuelva la ecuación matricial A·X+B=2C.');}
 if(i===583){pp(0,'Determine los valores de a para que la matriz A sea no invertible.');pp(1,'Para a=5, calcule la inversa de la matriz A.');pp(2,'Para a=5, resuelva la ecuación matricial A·X=B.');}
 if(i===590){pp(0,'Halle los valores del parámetro a para que la matriz A tenga inversa.');pp(1,'Para a=2, calcule la matriz inversa de A.');pp(2,'Para a=2, resuelva la ecuación matricial X·A+I₃=B^{t}·C.');}
 if(i===605){pp(0,'Resuelva el sistema de ecuaciones matriciales: 2A−5B=[[7,2],[7,8]]; 3A−B=[[4,3],[4,−1]].');pp(1,'Dadas las matrices C=[[3,−2],[1,1]] y D=[[0,1],[−1,2]], resuelva la ecuación matricial X·C−D^{2}=I₂.');}
 if(i===621){pp(0,'Obtenga a y b sabiendo que A^{2}=[[5,−2],[−2,1]]. ¿Es A simétrica?');pp(1,'Para los valores a=3 y b=1 calcule la matriz X tal que A·B=2(X−3I₂).');}
 if(i===634){pp(0,'Resuelva la siguiente ecuación matricial A^{t}−X·A=3I₃.');pp(1,'¿Existe algún valor del parámetro a para el que se verifique C^{t}·D=B? En caso afirmativo, calcule dicho valor.');}
 if(i===656){pp(0,'Determine los valores de x e y que hacen cierta la igualdad [[2,−1],[3,−1]]·[[x],[−y]]=[[1,x],[y,−1]]·[[3],[0]].');pp(1,'Resuelva la ecuación matricial: X·[[1,3],[2,5]]−2·[[0,−1],[−1,0]]=[[1,2],[3,−1]].');}
 return r;
}
