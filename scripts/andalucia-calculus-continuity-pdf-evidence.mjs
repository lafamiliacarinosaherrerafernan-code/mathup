import assert from 'node:assert/strict';
export const continuityObservations=[
 [124,'a10146fce64a17e21450973c88d66d43571619781f76bc345b5a4b3dee67a16b',2,'B.2','dbdca03b7e3cf51b6b87311804f33b8fcfc4f5e8bd84b6b1b7617d341ad1e23f',0],
 [188,'fa0cbbddfdf34b1f9fcf8d1090c2d0c3f13e5353e06da22ec354d3345e313584',2,'B.2','ec5f494cc100dc39fa8c7c6131170e117fea5e69a218fb975d822c973b950eab',0],
 [1354,'de33e9bdb3bab2ccc58eed7e1c4b97d79d708e558d7ac2b6339851702d1c91ed',1,'4','05ae0ccb70f8b0287a0f656cf5976be13bed33eb8ff5f3feffd7d7c1267b796e',0],
 [1477,'bc2e0fb9fe7ef6e35e140594edec049972a605f9d93da65b59610506c83586c2',1,'4','2709f18041fa1cc79feebda079c34ca0d5eef66d4b410191531dfa9fde2c34e9',0],
 [1482,'6080bc5ac64bbf6438bfe8b758abe6c8c4241f3761df46be47484da3de608af7',1,'3','e3932f1af1cd0a0a2ffe74831d8260f08850777e1da32dc8632a9f7b36d7286d',0],
 [1502,'aff1623cbfcc5746a42ee3e24d9106759726a132f9d1a462260f9a4de6617f89',1,'3','9fb1855b3ad64b4eeb640e0f9e1f07cfc68450ecc45c79c1fa6403207c9e1afd',0],
];
export function continuityReplacements(r){const i=r.queueIndex;if(!continuityObservations.some(o=>o[0]===i))return[];const out=[],at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);
 const prefixes={124:'Dada la función\nf(x)= {frac{2x+1}{1−2x} si x<0; x²−x−a si x≥0}.',188:'Sea la función\nf(x)= {frac{1}{x−1} si x<0; x²+a si x≥0}.',1354:'Se considera la función\nf(x)= {x³+2x²−3 si x≤1; 1+frac{1}{x−2} si x>1}.',1477:'Se considera la función\nf(x)= {frac{x²}{3} si 0≤x≤2; frac{4}{x+1} si x>2}.',1482:'Se considera la función\nf(x)= {x²−4x+4 si x<3; −x+4 si x≥3}.'};
 if(prefixes[i])out.push([r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_PIECEWISE_DEFINITION']);
 const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_FULL_CALCULUS_SUBPART']);
 if(i===124){p(0,'Obtenga el valor de a para que la función sea continua en x=0. Para ese valor de a, ¿sería derivable en x=0?');p(1,'Para a=2, estudie su monotonía y extremos relativos.');}
 if(i===188){p(0,'Determine el valor del parámetro a para que f sea continua en todo su dominio. Para ese valor de a, estudie la derivabilidad de f.');p(1,'Para a=−2, estudie la monotonía y curvatura de la función f. ¿Tiene algún punto de inflexión?');}
 if(i===1354){p(0,'Estudie la continuidad de f. Si la función no es continua en algún punto, indique el tipo de discontinuidad que presenta.');p(1,'Estudie la derivabilidad de f.');p(2,'Determine las asíntotas de f.');}
 if(i===1477){p(0,'Estudie la continuidad y derivabilidad de la función f.');p(1,'Determine los intervalos de crecimiento y decrecimiento, el máximo de la función y represente gráficamente la función f.');}
 if(i===1482){p(0,'Estudie la continuidad y derivabilidad de la función en todos los puntos de su dominio.');p(1,'Represente gráficamente f.');p(2,'Calcule el área de la región limitada por la gráfica de f, el eje de abscisas y las rectas x=2 y x=4.');}
 if(i===1502){p(0,'El índice de audiencia de un programa de radio se puede modelizar por una función del tipo f(t)=at²+bt+c, t∈[0;60], donde t es el tiempo medido en minutos y a,b,c∈ℝ. Se sabe que cuando comienza el programa el índice de audiencia es 20 puntos y que a los 40 minutos se alcanza el máximo índice de audiencia, que es 36 puntos. Determine a,b,c y represente gráficamente la función obtenida.');p(1,'Calcule la derivada de las siguientes funciones: g(x)=ln(frac{x²−1}{x²+1}); h(x)=(2x−1)e^{x²−x}.');}
 return out;}
