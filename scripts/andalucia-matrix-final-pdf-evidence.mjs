// Readings of official pages inspected at scale 1.5. Preserve the extracted literal.
import assert from 'node:assert/strict';
export const matrixFinalObservations=[
 [745,'35f05b19d43a5c26840240ff45ede93938ac575e4378437433e833cac887a341',2,'B.1','239f57757f741939907a8a9eb32dc11a552251aab0c534ebc463246d02400171',0],
 [840,'b7541cc45d3e96297c29037fe17a562b7daa9cd0ee2a95c2b5e9454ad9b90f14',1,'A.1','8f026d99b0e0fcfab1f4eaffba0ed1028ca1594d8f749ba69470a251a1063e8d',0],
 [861,'1016796ab6576ec1284db5e1fec88de27d0a949302d63237591fdc62e9d9afcb',1,'1','611e073fa058cd159ff7c2a52cc101a4eb1041f05a15ca33c9d9dc764cb52032',0],
 [872,'c70ed065da193c82dd0a02fb4c05069415b0adf53d0f49bba1b0375a19823566',1,'A.1','5ef505f97e1ea14427f8b166c64e400b9e140ff10fa78a4fc8492ad3a1967501',0],
 [878,'8cdb86259405652622f2ea129bffbdb239076ac612fd7fcebb86b9d5bdc451ec',2,'B.1','fd0f755f1855a8a59d87185302e0251e651bfa8a66bad8a10b80f6403e31d4b1',0],
 [912,'77e0c295529ccd4ed502b5859d4011cb4b0e955a1e4795e570a9da20ae48293c',1,'A.1','0af4794f75586094cf4ac6fcd33ecd71d122b8fa627565cc62b8bd4758a1b14f',0],
 [941,'1780d560801fb3001e146f12b3a37b29b566ca6576dc9cdafda07902d7dee982',2,'B.1','abaa434685268517815dd105703064ae7d2f3db53fd0e10938d33267267aa8f1',0],
 [948,'9c3d2d628115a2f20f17b47171106ddd90f214b5f6804bdf9a7dcb7037c75efd',2,'B.1','b2ed291f16ddc0fcc6060b9477aebc10b2ed838ec3fa157e9b92ac1fb781a154',0],
 [1000,'74b067b81be20aa0262a0cc58795f3b25488aa9c749d825b7b33f656dd1ae089',1,'1','08957986bb6035fef5ddc9225e41a3f8928a2e7e3fc1c785f51a9934b4b1a65e',0],
 [1022,'998f20402054ca6d0454da83ffc8e1ff6951a576b48836a32e81e524c5985214',1,'A.1','20c668b065aeebeea65ea4ff655d2dd0634e85a28d82846cfe70e30a346b3c88',0],
];
export function matrixFinalReplacements(record){
 const i=record.queueIndex;if(!matrixFinalObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>=0);
 const prefix={840:'',861:'Se consideran las matrices M=[[1,0,1],[2,1,0],[1,1,1]], N=[[3,2,2],[5,2,1],[7,4,0]] y V=[[5−a^{2}],[a−1],[a^{2}]], siendo a un número real.\n\n',872:'Sean las matrices A=[[2,−5],[1,−3]], B=[[3,−1,2],[0,1,1]], C=[[1,2,3],[−1,5,3]].\n\n',878:'Sean las matrices A=[[2,4],[−2,−6]] y B=[[1,0,1],[1,−2,0]].\n\n',912:'Sean las matrices A=[[2,1],[3,−2]] y B=[[3,−2],[1,4]].\n\n',941:'Sean las matrices A=[[0,1,0],[1,0,1]] y B=[[3,−1],[1,2]].\n\n',948:'Sean las matrices P=[[1,2],[a,0]], Q=[[1,1,5],[8,4,b]] y R=[[c,d,6],[10,10,50]].\n\n',1000:'Se considera la matriz A=[[1,0],[−1,1]].\n\n',1022:''};
 const r=[],add=(a,b,rule='PDF_VISIBLE_MATRIX_ROWS_COLUMNS')=>r.push([a,b,rule]);
 if(at>0&&prefix[i]!==undefined)add(record.sourceLiteral.slice(0,at),prefix[i]);
 const pp=(k,t)=>add(record.parts[k].prompt,t,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION');
 if(i===745)pp(1,'Halle la matriz X que verifica I₂−2X=A·(A−B^{t}), siendo A=[[1,−1],[2,−1]] y B=[[0,2],[−1,2]].');
 if(i===840){pp(0,'Resuelva la ecuación matricial [[2,1],[1,2]]·X+[[1,−1],[0,2]]=I₂.');pp(1,'Dadas las matrices M=[[0,1],[1,0]] y A=[[a,b],[2,1]], calcule los valores de a y b para que se verifique la ecuación M·A=A.');}
 if(i===861){pp(0,'Halle el valor de a para que se verifique que M^{t}·V=[[5],[1],[5]].');pp(1,'Calcule M^{-1} y resuelva la ecuación matricial X·M−I₃=N.');pp(2,'Razone si las operaciones 2·V·N^{t} y (N+M^{t})·V se pueden realizar y, en aquellos casos en que sea posible, indique la dimensión de la matriz resultante.');}
 if(i===872){pp(0,'Calcule A^{2}−B·C^{t}.');pp(1,'Resuelva la ecuación matricial A·X+B=2C.');}
 if(i===878){pp(0,'Resuelva la ecuación matricial X·(B·B^{t})=frac{1}{2}A−2A^{t}.');pp(1,'Razone cuáles de las siguientes operaciones pueden realizarse e indique, en su caso, la dimensión de la matriz resultante: A·B; A·B^{t}; B·A^{-1}; B^{t}·A+A^{-1}.');}
 if(i===912){pp(0,'Efectúe la operación A·B^{t}.');pp(1,'Determine la matriz X tal que A+2X=B.');pp(2,'Halle la matriz Y tal que B·Y=[[6],[9]].');}
 if(i===941){pp(0,'Efectúe, si es posible, los siguientes productos: A·A^{t}; A^{t}·A; A·B.');pp(1,'Resuelva la siguiente ecuación matricial A·A^{t}·X=B.');}
 if(i===948){pp(0,'Calcule, si es posible, P·Q y Q·P, razonando la respuesta.');pp(1,'¿Cuánto deben valer las constantes a, b, c y d para que P·2Q=R?');}
 if(i===1000){pp(0,'Calcule A^{40} y (A^{t})^{30}.');pp(1,'Calcule (A^{-1}+A)^{2}.');pp(2,'Resuelva la ecuación matricial (A^{t}+I₂)·X=A^{t}−I₂.');}
 if(i===1022){pp(0,'Dada la matriz A=[[1,5,6],[0,1,7],[0,0,1]], calcule (I₃−A)^{3}.');pp(1,'Dadas las matrices B=[[1,a],[b,3]], C=[[−1],[3]], D=[[5],[10]], determine a y b de manera que B·C−D=O, siendo O la matriz nula.');}
 return r;
}
