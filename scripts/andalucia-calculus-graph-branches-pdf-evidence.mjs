import assert from 'node:assert/strict';
export const graphBranchesObservations=[
 [147,'ee5bd8e23465d55ed58339e7d9adf3d58423ac2966b53d92e39a2f9b35558ab1',2,'B.2','315b33ef61bae697fef3423249728ce7a27dcee3f6a217f2c91b7259d966a73d',0],
 [155,'cb44cc1136c3a49a889caa64ff407575afb2c418b60865e4e4f471196031da06',1,'3','658f8df0a42b608ecbd49471616d83c285b92d7db4ef534b2364b6e83fb428cd',0],
 [414,'010da3d1a9c2777988000c108cedcb180ec7bbae4ce1e291cc01a287870ab775',1,'3','27df2e1a7204f634a43efb7f96276f24dde4e35cad687a5a7d634e05f16c10fc',0],
];
export function graphBranchesReplacements(r){const i=r.queueIndex;if(!graphBranchesObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const prefixes={
 147:'Sea la función f(x)=−x²+px+q.',
 155:'Se considera la función f(x)={4x²+16x+17 si x<−1; frac{10−5x}{3} si −1≤x≤2; frac{3}{2} si x>2}.',
 414:'Se considera la función f(x)={a(x+1)² si −3≤x≤1; frac{bx²}{2}+2 si 1<x≤2}, con a y b números reales.',
 };const out=[[r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_PIECEWISE_OR_POLYNOMIAL_DEFINITION']],p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===147){p(0,'Calcule los valores que deben tener p y q para que la gráfica de la función f pase por el punto (−4;−5) y presente un máximo en el punto de abscisa x=−1. Determine el valor de f(x) en ese punto.');p(1,'Represente la gráfica de f para p=2 y q=−1 y halle la ecuación de la recta tangente a esta gráfica en el punto de abscisa x=−2.');}
 if(i===155){p(0,'Estudie la continuidad y derivabilidad de f.');p(1,'Represente gráficamente la función f.');p(2,'Calcule el área de la región limitada por la gráfica de f y el eje de abscisas entre x=−2 y x=2.');}
 if(i===414){p(0,'Determine los valores de a y b para que f sea continua y derivable.');p(1,'Para a=1 y b=2, esboce la gráfica de la función f y calcule el área del recinto limitado por la gráfica de f, el eje OX y las rectas x=−2 y x=1.');}
 return out;
}
