// Exact source-page readings. Never replaces the immutable canonical source.
import assert from 'node:assert/strict';
export const orderThreeObservations=[
 [96,'fe6fd5b48407569d41169c80d71e6997050d6d06d1afd41cd639a553f9b712b5',1,'1','78828f645f94446d04496f5775f9f7a8ed38b7877c84509c62ce0fdd6c13ae25',0],
 [144,'fa0cbbddfdf34b1f9fcf8d1090c2d0c3f13e5353e06da22ec354d3345e313584',2,'B.1','ec5f494cc100dc39fa8c7c6131170e117fea5e69a218fb975d822c973b950eab',0],
 [309,'010da3d1a9c2777988000c108cedcb180ec7bbae4ce1e291cc01a287870ab775',1,'1','27df2e1a7204f634a43efb7f96276f24dde4e35cad687a5a7d634e05f16c10fc',0],
 [365,'1dc0455361ce91a1157a7b3e4a06db95bc988e8dd0c9756e9aeb74b8cbb73a81',1,'2','4a91890b73760d6c68a77bd2cc13e9231036b7934fe438ae5cc41f7283a6f68f',0],
];
export function orderThreeReplacements(record){
 const i=record.queueIndex;if(!orderThreeObservations.some(o=>o[0]===i))return [];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>0);
 const prefix={96:'Dada la matriz A = [[2,0,m],[1,1,1],[m,3,5]], con m un parámetro real, se pide:\n\n',144:'Se considera la matriz A = [[1,-2,0],[-2,2,-1],[0,1,1]].\n\n',309:'Considere la matriz A = [[2,-3,-a-1],[-1,a,a+1],[1,-3,-a]], donde a es un número real. Determine de manera justificada:\n\n',365:'Se considera la ecuación matricial (10 I₃ − A)·X = B, donde A = [[2,1,0],[4,2,0],[2,2,5]] y B es una matriz con tres filas y una columna.\n\n'};
 const r=[[record.sourceLiteral.slice(0,at),prefix[i],i===144?'PDF_MATRIX_PREFIX_AND_EXCLUDED_PREVIOUS_EDITORIAL_INSTRUCTION':'PDF_VISIBLE_MATRIX_ROWS_COLUMNS']];
 const add=(a,b)=>r.push([a,b,'PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT']);
 if(i===96){add('¾Para','¿Para');add('At','A^{t}');}
 if(i===144){add('A−1','A^{-1}');add('A2','A^{2}');add('I3','I₃');}
 if(i===309){add('𝐴2022','A^{2022}');add('𝐴2','A^{2}');add('𝐴3','A^{3}');add('𝐼3','I₃');add('𝐴','A');add('𝑎','a');add('𝑋','X');}
 if(i===365){add('¾Tiene','¿Tiene');add('¾Por','¿Por');add('B = 5 20 −3 t','B = [[5],[20],[-3]]');}
 return r;
}
