// Source page inspections, not inferred mathematical data or human approvals.
// Each prefix replacement is limited by the enclosing document SHA and page.
import assert from 'node:assert/strict';
export const matrixObservations=[
 [129,'0b99df3e2c9a7af0a074136b72c3d257ad9241ccc79fed32894de424481b6be2',1,'A.1','ebfa1cd09620dc02c668583fc19cdf2870df485c4491ace8501b1953027e2fb7',0],
 [217,'ac80a164e049669cd01083ca5adaddfa90efbf556b050de2d99f294ab55670c9',1,'A.1','cd426b3d82f9b902f3df53110fa38ce4547c725536e0704c9c5cfc4a9ca16ba1',0],
 [253,'76b6f6a138ec0917a2e3b3a2925bccca739af3363e419603b6814d835860441e',2,'B.1','d6a59cbafe0e875e9c98ce755006e71d1eaee8d53d9f1cfd81566f7b8c32d2c2',0],
 [336,'5f24b200fb6cf34f6d72016ec3dc35787b4074de9b7752677e5b0d959ed0dfcd',1,'A.1','8e55363fc7fbd1ea67f48f5ed1cb7bec26b34a352c688e48ef916db1b0e49ba8',0],
];
export function matrixReplacements(record){
 const i=record.queueIndex;if(!matrixObservations.some(o=>o[0]===i))return [];
 const offset=record.sourceLiteral.indexOf('a) (1');assert.ok(offset>0,'Explicit subpart boundary required');
 const common={129:'Sean las matrices A = [[2,4],[1,-1]] y B = [[-3,0],[0,1]].\n\n',217:'Sean las matrices A = [[0,-1],[1,0]], B = [[1,1],[1,1]] y C = [[2,1],[3,2]].\n\n',253:'Sean las matrices A = [[0,1],[1,0]], B = [[1,2],[3,1]].\n\n',336:'Sean las matrices A = [[1,2],[0,-1]] y B = [[3,-1],[0,2]].\n\n'};
 const r=[[record.sourceLiteral.slice(0,offset),common[i],'PDF_VISIBLE_MATRIX_ROWS_COLUMNS']];
 const add=(a,b)=>r.push([a,b,'PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT']);
 if(i===129){add('A2','A^{2}');add('B3','B^{3}');}
 if(i===217){add('A X  B  X  C','A·X + B·X = C');add('A4','A^{4}');add('A80','A^{80}');}
 if(i===253){add('A2','A^{2}');add('A2013','A^{2013}');add('I2','I₂');add('Bt','B^{t}');}
 if(i===336){add('A2017','A^{2017}');add('B  A B  A  B2  A2','(B+A)·(B−A) = B^{2}−A^{2}');}
 return r;
}
