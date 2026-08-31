import assert from 'node:assert/strict';
export const chainAreaWeightObservations=[
 [84,'0be1dffd96126e6064f95f87111e09ab19a2f475a8851d900e8b1870ea751a2b',1,'3','20c64efafee7404db9fd5b5d6c7180643b0cccdc124d9642d961f91fd458f4be',0],
 [303,'6b77e388353f5741b19828d12fec96d4ea245ebbec9567ae6a26d0295b92e628',1,'2','7242d085ea8e796cd39e6c70274b82e77746760fde19f6c1cf947bf9f8b9433a',0],
 [326,'bc2e0fb9fe7ef6e35e140594edec049972a605f9d93da65b59610506c83586c2',1,'3','2709f18041fa1cc79feebda079c34ca0d5eef66d4b410191531dfa9fde2c34e9',0],
];
const prefix='El peso en kilogramos (kg) de una persona que inicia un determinado régimen alimenticio viene dado por la función: P(t)=75−frac{15t}{t+120}; t≥0 siendo t el tiempo, en días, que lleva haciendo la dieta.';
const prompts={
84:['Calcule las derivadas de las siguientes funciones: f(x)=(−7+x²)³·e^(5−x); g(x)=frac{ln(x⁴−2x²)}{8−x³}.','Represente gráficamente la región acotada comprendida entre la recta y=−2x+6 y la parábola y=−x²+2x+3 y calcule su área.'],
303:['Compruebe que, si la persona sigue de manera continuada el régimen alimenticio, irá reduciendo peso paulatinamente. ¿Cuál es el peso mínimo que podría llegar a alcanzar si pudiera seguir la dieta indefinidamente?','¿Cuántos días debe hacer de régimen para llegar a un peso de 64 kg?','El índice de masa corporal viene dado por la función i(t)=frac{P(t)}{h²}, siendo h la estatura, en metros, de la persona. Se considera que la persona tiene sobrepeso si el índice de masa corporal es superior a 25 kg/m². Si la persona mide 1,68 m, determine si ha tenido sobrepeso durante la dieta, y en caso afirmativo, calcule los días que han de transcurrir para dejar de tenerlo.'],
326:['Se considera la función f(x)={ax²+bx+6 si x≤2,5; −1,4x+7 si x>2,5} con a y b números reales. Calcule el valor de los parámetros a y b para que la función sea continua y tenga un máximo en x=1.','Represente gráficamente la función g(x)=−2x²+2x+4 y calcule el área de la región acotada, limitada por la gráfica de dicha función y el eje de abscisas.'],
};
export function chainAreaWeightReplacements(r){const i=r.queueIndex;if(!prompts[i])return[];const out=[];if(i===303){const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>0);out.push([r.sourceLiteral.slice(0,at),prefix+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_DOMAIN_AND_UNIT']);}assert.equal(r.parts.length,prompts[i].length);prompts[i].forEach((p,k)=>out.push([r.parts[k].prompt,p,'PDF_VISIBLE_COMPLETE_SUBPART']));return out;}
