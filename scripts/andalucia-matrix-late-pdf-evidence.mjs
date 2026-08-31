import assert from 'node:assert/strict';
export const matrixLateObservations=[
 [1065,'c1a3a7a37d38b04359115c64762b1f8a543e4d66155338931de84ef6c304da2c',2,'B.1','271ee311f015c9f84114c891f91aad908a99d7512e1857f00590e4308787aa73',0],
 [1076,'5ea9fab18d8185843726e08994f39cf34f9b7dab32d86c310902a2f203dace2a',2,'B.1','b852fb8add044f158fae465c6582ac69d6b8aa87cff829b0263383a8d7d11e07',0],
 [1086,'bc88bfeb0f184eb0c806c4efe04e84c24f3e5fcef9caaa12e94fd48d9f67a389',1,'2','682d9b1690b9a89f7b5ac9181c092ec7693e5f3427b6a12146c94a11ddc3e20c',0],
 [1127,'71c9d8edf7bd2e9d3872ebabed22b6f491ccfdc39d6f4a908b05609bd85a8f04',1,'1','cf7ddd7376ab912fe542f6b9f5b02b746da09b140b859958cd7ca9fad10498e3',0],
 [1128,'601fd1292e7d6b21ceecde2856a283e0e929d02d4e314d97fd7062bda846650a',1,'A.1','5b74a93bc857a55b03855316140f7501f0bb24467d74042c75dbe2c7eaca8dd0',0],
 [1146,'fe436fc3af8e56d0694316005aedeca2fffefbeb445aa9f60efa0aa6da4cba25',1,'A.1','1ad8a452b9bc46971e5f4e55f9f2feb367778a8b893bb22c9b5c17f3bc5e69df',0],
 [1150,'6201aa5a68f0d1302cfd697751f74c4c73f655f0d9b1ae98ae8960207dbd5225',1,'A.1','4b1ea4849c5989913a0f83745da5136785b0f5b153d6176880d19c4ef5aa8334',0],
 [1154,'9d44d1fc271e59de2e53693497bd48e561a5dbbc3cdda0bcafc13d6d2d73c286',1,'1','3ed71a6825ea8ca6eea556e9b7573dcf6f6a30555b432fdb95281db3e69df043',0],
 [1155,'7531352357e0c321bc85be321f92362aa174cac971a1f2f581aa19918487de88',1,'1','e80da75dfdee0599ff2a2cb2095312d0a43412353b6f287af2a4417f158d6242',0],
 [1159,'31fb46947e141f5c8da8f7b381e7d27b67fe5a9d1597120454ce66fce0313f1a',1,'A.1','30d7eb4bdf8c1769f22897ec6bac9a0d6502c5607e75fab1cc9d25efee2a8e1a',0],
];
export function matrixLateReplacements(record){
 const i=record.queueIndex;if(!matrixLateObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>0);
 const prefix={
 1065:'Sean las matrices A=[[1,−1,0],[0,1,−1]], B=[[1,0],[0,1],[2,−2]] y C=[[1,1],[3,−2]].',
 1076:'Sean las matrices A=[[2,1],[3,1]] y B=[[1,2],[−1,0]].',
 1086:'Se consideran las matrices A=[[1,0,1],[k,−3,2],[1,k,1]], B=[[3,−2,−1],[0,1,1]] y C=[[−2,4],[1,3]].',
 1127:'Se consideran las matrices P=[[1,0,1],[0,1,0],[1,−1,−1]] y J=[[2,1,0],[0,2,0],[0,0,−1]].',
 1128:'Sean las matrices A=[[2,1],[0,−1]], B=[[1,−1],[2,0]], C=[[−2,4],[1,−1]] y D=[[1,0,1],[0,1,0]].',
 1146:'Se consideran las matrices A=[[2,1],[3,−2]] y B=[[3,−2],[1,4]].',
 1150:'Sean las matrices A=[[2,3],[3,5]], B=[[3,−5,3],[0,2,1]], C=[[8],[3],[0]] y D=[[5],[3]].',
 1154:'Se consideran las matrices A=[[1,−1,1],[−2,1,0]], B=[[0,−1],[1,0],[−1,2]] y C=[[1,3,2],[1,1,1],[0,3,1]].',
 1155:'Se consideran las matrices A=[[0,1],[1,0]], B=[[3,2],[2,0]] y C=[[1,0],[1,1]].',
 1159:'Se consideran las matrices A=[[1,0,−2],[−1,1,0]], B=[[1,−3],[−2,0]] y C=[[7,−12,16],[−1,7,12]].',
 };
 const r=[[record.sourceLiteral.slice(0,at),prefix[i]+'\n\n','PDF_VISIBLE_MATRIX_ROWS_COLUMNS']],pp=(k,t)=>r.push([record.parts[k].prompt,t,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION']);
 if(i===1065){pp(0,'Razone cuáles de las siguientes operaciones son posibles: A·B^{t}; B+3C; C·B^{t}; A·B+C.');pp(1,'Resuelva la ecuación matricial A·B·X=C.');}
 if(i===1076){pp(0,'Calcule A^{t}·B−A·B^{t}.');pp(1,'Resuelva la ecuación matricial AX+BA=B.');}
 if(i===1086){pp(0,'Razone si las siguientes operaciones se pueden realizar y en aquellos casos en que sea posible, indique la dimensión de la matriz resultante: B^{t}·A; C·B; B·A+B; B^{2}.');pp(1,'Calcule los valores del parámetro k para los que la matriz A es invertible.');pp(2,'Para k=−1, calcule la inversa de la matriz A.');}
 if(i===1127){pp(0,'Halle la matriz A que satisface la ecuación P^{-1}·A·P=J.');pp(1,'Compruebe que A^{3}=P·J^{3}·P^{-1}.');}
 if(i===1128){pp(0,'Razone si se pueden efectuar las siguientes operaciones: A·D+B·C; D^{t}·B−A^{2}.');pp(1,'Halle la matriz X que verifica la ecuación matricial A·X=B−C.');}
 if(i===1146){pp(0,'Efectúe la operación A·B^{t}.');pp(1,'Determine la matriz X tal que A+2X=B.');pp(2,'Calcule la matriz Y, sabiendo que B·Y=[[6],[9]].');}
 if(i===1150){pp(0,'Calcule A^{3}.');pp(1,'Determine la matriz X para que A·X+B·C=D.');}
 if(i===1154){pp(0,'Resuelva la siguiente ecuación A·B·X·C=[[1,0,0],[0,1,0]].');pp(1,'Halle las dimensiones de las matrices D y E para que tenga sentido la igualdad A·D=E·B.');}
 if(i===1155){pp(0,'Determine las matrices X e Y que satisfacen simultáneamente las ecuaciones 2X−Y=4A y X+Y=B.');pp(1,'Calcule la matriz C^{2024}.');pp(2,'Si D es una matriz de dimensión 2×3, razone si las siguientes operaciones se pueden realizar y, en aquellos casos en los que sea posible, indique la dimensión de la matriz resultante: A^{t}·B+D·D^{t}; D·B^{t}+A; D^{t}·A^{t}+D.');}
 if(i===1159){pp(0,'Justifique cuáles de las siguientes afirmaciones son ciertas:\n1) A·A^{t} es una matriz simétrica.\n2) A·A^{t}+B posee inversa.');pp(1,'Resuelva la ecuación matricial B·X+A=C.');}
 return r;
}
