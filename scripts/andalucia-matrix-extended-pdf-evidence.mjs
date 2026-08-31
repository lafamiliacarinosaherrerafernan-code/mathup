import assert from 'node:assert/strict';
export const matrixExtendedObservations=[
 [1171,'24c494a5d013dbc7f5adaac9896dee2d79f22540518359c67eac29945a26d4f0',1,'A.1','ed43ba2b43c5b5310d0f9a0cd3a076665146516f3ea4c9111d099c5647a5371c',0],
 [1173,'feb2acf9edc82ad3efbac4f8abf58b3e863451adddf04a82870066e873ab63fd',1,'A.1','34856e7324be82001bb8377dc7036d57cd07dba50d2ea778ed263c8b718c36c6',0],
 [1195,'5998699e0b2992b988a8e0ed0d2e3581dd8fac52d6f9802587ebd40fee5ef608',1,'A.1','a622e6256f3ac98f1e7aceef16056643e5ca33f4dadf94b760b2bdb7c6e32b1a',0],
 [1200,'a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b',2,'B.1','0d5a638b899b0d4a76c1725a3ac94f4e5c3727fe38e0b057c0f58f823049d0a2',0],
 [1207,'df7375f8183eafb6f45e9c65083e68d528ffabe07d66717b0ccf0f020c5b064f',1,'A.1','c023d1c98d04ae422e6eadd7dd0aeae664ad83745c61ebd6e67a1dc54759e0dc',0],
 [1226,'f8633bbd91d33bee02c2cc582c33b7ffeb3643f312b810ad0bb8c5d154d0721d',2,'B.1','850bcb0c436ae536f7b3bcdd51456b8fb8cf1767e213aa40217036048eef5df8',0],
 [1254,'6fed0384ff6fcbaaa7098ab3f35ea5f881d1280502f050ada3a7f13af528392e',2,'B.1','8ee583710e3acf1faaea3fe1a4a21e5283e133d3a84e5b2745622bdfabb2e5b2',0],
 [1262,'eecad753694b3d8cb2d427efddb00d75faae9c4ec5b027056291bc95d7d2e3da',2,'B.1','f1c183f4139e7d477b88310244ffe09958e787923a73b75f4ec90224112cd72c',0],
 [1288,'4b8884e307df4f5ddaf079e0f10be3d3f74d4793874eb03b355d34f4856579cb',1,'A.1','268b4f3875f5487fa9bafe5a4b36e7046fa0937b6fa93f698544f3cbd8b7ba0c',0],
 [1308,'cb44cc1136c3a49a889caa64ff407575afb2c418b60865e4e4f471196031da06',1,'1','658f8df0a42b608ecbd49471616d83c285b92d7db4ef534b2364b6e83fb428cd',0],
];
export function matrixExtendedReplacements(record){
 const i=record.queueIndex;if(!matrixExtendedObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>=0);
 const prefix={
 1171:'Sean las matrices A=[[a,1],[0,2]], B=[[1,b],[0,3]] y C=[[1,3],[2,5]].',
 1173:'Se consideran las matrices A=[[1,a],[0,1]] y B=[[-1,1]].',
 1195:'',
 1200:'Se consideran las matrices A=[[3,−1],[−6,1]], B=[[2,0],[−2,2]], C=[[3],[1]] y D=[[-2,2]].',
 1207:'Se consideran las matrices A=[[1,a],[0,1]] y B=[[frac{1}{2},0],[frac{3}{4},0]], siendo a un número real cualquiera.',
 1226:'Sean las matrices A=[[frac{1}{5},0],[−frac{2}{5},frac{3}{5}]], B=[[frac{3}{5},−1],[frac{4}{5},frac{4}{5}]] y C=[[1,0,−1],[2,1,3]].',
 1254:'Se consideran las matrices A=[[-1,2],[-3,4]], B=[[-1,2,1],[3,0,2]] y C=[[3,0,1],[2,-1,-1]].',
 1262:'Se consideran las matrices A=[[-frac{1}{2},5],[-frac{1}{4},frac{1}{2}]], B=[[1,-1],[2,1]] y C=[[1,0,-1],[0,-1,1],[-1,1,0]].',
 1288:'',
 1308:'Se consideran las matrices A=[[1,0,1],[-1,-1,1],[2,-1,0]], B=[[1,-1,1],[-1,-1,-1],[1,-1,1]] y C=[[3],[-7],[-2]].',
 };
 const r=at?[[record.sourceLiteral.slice(0,at),prefix[i]+'\n\n',[1200,1262].includes(i)?'PDF_MATRIX_PREFIX_AND_EXCLUDED_PREVIOUS_EDITORIAL_INSTRUCTION':'PDF_VISIBLE_MATRIX_ROWS_COLUMNS']]:[];
 const pp=(k,t)=>r.push([record.parts[k].prompt,t,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION']);
 if(i===1171){pp(0,'Halle los valores de a y b para que se verifique A−B+A·B^{t}=C.');pp(1,'¿Existe algún valor de b para el que el producto B·B^{t} sea igual a la matriz nula?');pp(2,'Para a=0.5 y b=1, halle la matriz X que verifica la igualdad A·X+B=O, (O representa la matriz nula).');}
 if(i===1173){pp(0,'Calcule el valor del parámetro a para que se verifique (B·A)^{t}=A·B^{t}.');pp(1,'Para a=2, resuelva la ecuación matricial X·A=B.');}
 if(i===1195){pp(0,'De una matriz cuadrada A de orden 3 se conocen los siguientes elementos: a_{12}=a_{21}=−2, a_{13}=a_{31}=0, a_{23}=a_{32}=1. Determine los demás elementos de la matriz A sabiendo que debe cumplirse la ecuación A·B=C^{t}, donde B^{t}=[[1,−1,1]] y C=[[-4,2,-1]].');pp(1,'Calcule 2D^{2}, siendo D=[[1,-5],[3,-5]].');}
 if(i===1200){pp(0,'Justifique cuáles de las siguientes operaciones se pueden realizar y efectúelas cuando sea posible: A+B·C; A·C+B·D^{t}; B^{2}+C·D; A+D·C.');pp(1,'Resuelva la ecuación matricial X·(A+I_{2})=3B^{t}.');}
 if(i===1207){pp(0,'Obtenga la matriz A^{2014}.');pp(1,'Para a=2, resuelva la ecuación matricial A^{3}·X−4B=O.');}
 if(i===1226){pp(0,'Resuelva la ecuación matricial (2A+B)·X=3A−B.');pp(1,'Determine en cada caso la dimensión de la matriz D para que se puedan realizar las siguientes operaciones: C·D+A; C^{t}·D·C; D·C^{t}; C·D·C^{t}.');}
 if(i===1254){pp(0,'Razone qué dimensiones deben tener las matrices P y Q para que los productos (A·P·B^{t}) y (Q·A·C) den como resultado una matriz cuadrada.');pp(1,'Resuelva la ecuación matricial A·X−2B·C^{t}=A^{2}.');}
 if(i===1262){pp(0,'Resuelva la ecuación matricial A^{4}·X=B^{2}+I_{2}.');pp(1,'¿Tiene inversa la matriz C? Justifique la respuesta.');}
 if(i===1288){pp(0,'Resuelva la ecuación matricial [[2,3],[1,-5]]·X=[[1,1],[0,-1]]^{2}·[[4],[1]].');pp(1,'Si A es una matriz con tres filas y dos columnas, determine razonadamente la dimensión que deben tener las matrices B, C y D para que se puedan efectuar las siguientes operaciones: 2A−3B; A·A^{t}−C^{2}; A·D.');}
 if(i===1308){pp(0,'Razone si se pueden efectuar las siguientes operaciones y realice las que sean posibles: C·A; A+B; C^{t}·B^{t}.');pp(1,'Resuelva la ecuación matricial A·X=B·X+C.');}
 return r;
}
