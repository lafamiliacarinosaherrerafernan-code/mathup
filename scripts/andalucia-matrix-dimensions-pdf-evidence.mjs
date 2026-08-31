// Direct inspection of official PDF pages. Preserves every old literal reversibly.
import assert from 'node:assert/strict';
export const matrixDimensionsObservations=[
 [103,'668689642ca997cf817c9f9f6608d2835efe898e3162b050d7b22b51f225d363',1,'A.1','ec92de921de4dc8cce7e8189f28c110b5760f793885b3d040eacb6f40a3812ce',0],
 [177,'0f95b6aefa78f1a13e2115b281338bd807177671c303c380180957fe03f0a605',2,'B.1','aa4827914736f7bb81e4fb2f0359d9cb3c9e272b01ae40c8d827d956c3fec909',0],
 [327,'c41ea8ffe46f2de3a4d7f82e43def97322e29653182ad3df54a57e2ead2beb19',2,'B.1','0cbcd818984ac0bd29c44defeafac7935c776a8ef68921fea178f82434ab39da',0],
 [337,'5bd7838829b9f653746319907f86642017d12e66ed097db0126fb544a2d0f632',2,'B.1','772a8174bedec14988343f5592b8a2d1a4cb062f23bc7dc5149b01998b7a828a',0],
 [82,'0305750f6b6c3cc3edbba71a19cd7cce4276935dff5a0b7d964b02eaedeaa222',1,'1','b1ca5d4a8a8dcea1b9d0e818978252e43ca281d7c0bb5338b08aed87fab68add',1],
 [406,'11865b83e509d9cc2723c752f7a81f714378e1b651f4a4d010dab4a4576b74c2',1,'2','5d98e840cee9678b9e285b967b6255afc31b50740ee0aef1f1f6cbd183e74aa1',0],
];
export function matrixDimensionsReplacements(record){
 const i=record.queueIndex;if(!matrixDimensionsObservations.some(o=>o[0]===i))return [];
 const replacements=[];const add=(a,b,rule='PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT')=>replacements.push([a,b,rule]);
 const common={103:'Sean las matrices A = [[1,2],[0,-3]], B = [[1,-1],[0,2],[1,-1]] y C = [[1,4,0],[2,-3,1]].\n\n',177:'Sean las matrices A = [[1,0],[1,-1]] y B = [[1,0,-1],[2,1,0]].\n\n',327:'Sean las matrices A = [[3,0],[1,2]], B = [[-2,3]] y C = [[-1],[-1]].\n\n',337:'Se consideran las matrices A = [[-1,0],[1,2]] y B = [[2,1],[0,-1]].\n\n',406:'Se consideran las matrices A = [[1,0,-2],[a,1,0]], B = A·A^{t} y C = [[1,-2],[1,0]], siendo a un parámetro real.\n\n'};
 if(common[i]){const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>0);add(record.sourceLiteral.slice(0,at),common[i],'PDF_VISIBLE_MATRIX_ROWS_COLUMNS');}
 if(i===103){add('At','A^{t}');add('Bt','B^{t}');}
 if(i===177){add('A2018  A2019','A^{2018}+A^{2019}');add('X  A  B  Bt  2A','X·A+B·B^{t}=2A');}
 if(i===327){add('Ct','C^{t}');add('Bt','B^{t}');}
 if(i===337){add('(A + B)2 = A2 + B2 + 2 A ⋅ B','(A+B)^{2}=A^{2}+B^{2}+2A·B');add('Bt','B^{t}');add('I2','I₂');}
 if(i===82){add('¾Qué','¿Qué','PDF_VISIBLE_INVERTED_QUESTION_MARK');add('¾Existe','¿Existe','PDF_VISIBLE_INVERTED_QUESTION_MARK');add('¾Y','¿Y','PDF_VISIBLE_INVERTED_QUESTION_MARK');add('Justi\u001cque','Justifique','PDF_VISIBLE_FI_LIGATURE');}
 if(i===406){add('¾Para','¿Para','PDF_VISIBLE_INVERTED_QUESTION_MARK');add('Bt','B^{t}');}
 return replacements;
}
