// Literal evidence of two official matrix questions, including text missing from extraction.
import assert from 'node:assert/strict';
export const matrixParameterObservations=[
 [97,'51601c4f5a6c1dfcd860f621a659f8b9c09f53ff4cd31a1fa1e827dbd8f06159',1,'2','6c80375e66ffe4bf985ffecc7a02b2259d798de569ba90e0c2e21d0c3b21a6a2',0],
 [211,'bc2e0fb9fe7ef6e35e140594edec049972a605f9d93da65b59610506c83586c2',1,'2','2709f18041fa1cc79feebda079c34ca0d5eef66d4b410191531dfa9fde2c34e9',0],
];
export function matrixParameterReplacements(record){
 const i=record.queueIndex;if(!matrixParameterObservations.some(o=>o[0]===i))return [];
 if(i===97){const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>0);return[
  [record.sourceLiteral.slice(0,at),'Se consideran las matrices A = [[2,1,-1],[a,-1,-1],[3,0,-2a]] y B = [[1,-1],[2,0],[1,-2]].\n\n','PDF_VISIBLE_MATRIX_ROWS_COLUMNS'],
  ['A−1','A^{-1}','PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT'],['Bt','B^{t}','PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT'],['I3','I₃','PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT'],
 ];}
 return[
  ['Se considera la matriz\n\n','Se considera la matriz A = [[1,-1,0],[0,m,-2],[1,m,4]].\n\n','PDF_VISIBLE_MATRIX_ROWS_COLUMNS'],
  ['Obtenga para qué valores de la matriz tiene inversa.','Obtenga para qué valores de m la matriz A tiene inversa.','PDF_VISIBLE_PARAMETERS_OMITTED_BY_EXTRACTION'],
  ['Calcule, en caso de existir, la inversa de para   .','Calcule, en caso de existir, la inversa de A para m = 1.','PDF_VISIBLE_PARAMETERS_OMITTED_BY_EXTRACTION'],
  ['Despeje y simplifique en la ecuación               , sabiendo que la matriz es\n\ninvertible.','Despeje y simplifique X en la ecuación X·B−B^{2}+B=0, sabiendo que la matriz B es invertible.','PDF_VISIBLE_PARAMETERS_OMITTED_BY_EXTRACTION'],
 ];
}
