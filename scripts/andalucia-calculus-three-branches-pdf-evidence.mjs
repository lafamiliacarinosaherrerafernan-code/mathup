import assert from 'node:assert/strict';
export const branchesObservations=[
 [107,'1dc0455361ce91a1157a7b3e4a06db95bc988e8dd0c9756e9aeb74b8cbb73a81',1,'3','4a91890b73760d6c68a77bd2cc13e9231036b7934fe438ae5cc41f7283a6f68f',0],
 [120,'0305750f6b6c3cc3edbba71a19cd7cce4276935dff5a0b7d964b02eaedeaa222',1,'4','b1ca5d4a8a8dcea1b9d0e818978252e43ca281d7c0bb5338b08aed87fab68add',0],
 [227,'0305750f6b6c3cc3edbba71a19cd7cce4276935dff5a0b7d964b02eaedeaa222',1,'3','b1ca5d4a8a8dcea1b9d0e818978252e43ca281d7c0bb5338b08aed87fab68add',0],
];
export function branchesReplacements(r){const i=r.queueIndex;if(!branchesObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const out=[],prefixes={
 107:'Se considera la función f(x)={−2x+2a si −4≤x≤−2; −2x²−4a si −2<x≤2; −8x+b si 2<x≤3}.',
 120:'Se considera la función f(x)={−x+2 si x≤2; −x²+6x−8 si 2<x<4; frac{x−3}{x} si x≥4}.',
 227:'Se considera la función f(x)={2+frac{a}{x−1} si x<0; a+be^{x} si x≥0}.',
 };out.push([r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_PIECEWISE_DEFINITION']);const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_FULL_CALCULUS_SUBPART']);
 if(i===107){p(0,'Calcule los valores a y b para que la función sea continua en su dominio. Para esos valores, ¿es f derivable?');p(1,'Para a=−2 y b=16, estudie la monotonía de la función f y calcule sus extremos relativos y absolutos.');p(2,'Para a=−2 y b=16, calcule el área del recinto limitado por la gráfica de f, el eje OX y las rectas x=−2 y x=2.');}
 if(i===120){p(0,'Estudie la continuidad y derivabilidad de f en su dominio.');p(1,'Determine los intervalos de crecimiento y decrecimiento de la función f.');p(2,'Calcule ∫_{2}^{3} f(x) dx.');}
 if(i===227){p(0,'Calcule los valores a y b para que la función sea continua y derivable en su dominio.');p(1,'Para a=2 y b=−2, estudie la monotonía de la función f y calcule sus extremos relativos.');p(2,'Para a=2 y b=−2, determine las ecuaciones de las asíntotas de f, si existen.');}
 return out;
}
