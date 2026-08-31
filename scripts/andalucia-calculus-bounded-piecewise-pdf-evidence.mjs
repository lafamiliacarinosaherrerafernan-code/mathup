import assert from 'node:assert/strict';
export const boundedPiecewiseObservations=[
 [69,'aff1623cbfcc5746a42ee3e24d9106759726a132f9d1a462260f9a4de6617f89',1,'4','4e1f26697c4067b9abf100edd792e45f4f5537b05c33ea6f14434f7ca72a7d4e',0],
 [77,'4a6c7d34ff35c3e7678c52970b4d4558cee2c35224b46c66035cb0bc8d5a7ec8',1,'3','bc89551208da88d96b371e7ba6d58786631fb3bf77d95640aa92749792c05ba5',0],
];
export function boundedPiecewiseReplacements(r){
 const i=r.queueIndex;if(!boundedPiecewiseObservations.some(o=>o[0]===i))return[];
 const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);
 const prefix=i===69?'Se considera la función f(x)={10+frac{5x}{2} si x≤−2; x²+1 si −2<x<2; 10−frac{5x}{2} si x≥2}.':'Se considera la función f(x)={(x+1)² si −2≤x<0; (x−1)² si 0≤x≤2}.';
 const out=[[r.sourceLiteral.slice(0,at),prefix+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_AND_BRANCH_DOMAINS']];
 const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===69){
  p(0,'Estudie la continuidad y derivabilidad de f en el punto de abscisa x=−2.');
  p(1,'Calcule la ecuación de la recta tangente a la gráfica de la función f con pendiente −1.');
  p(2,'Represente la región del plano acotada superiormente por la gráfica de f e inferiormente por el eje de abscisas. Calcule el área de dicha región.');
 }else{
  p(0,'Estudie la continuidad y derivabilidad de la función f en todo su dominio.');
  p(1,'Calcule los extremos de la función f.');
  p(2,'Represente el recinto que encierra la gráfica de f, las rectas x=−1, x=1 y el eje OX. Calcule el área de dicho recinto.');
 }
 return out;
}
