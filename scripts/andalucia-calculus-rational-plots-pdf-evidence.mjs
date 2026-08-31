import assert from 'node:assert/strict';
export const rationalPlotsObservations=[
 [142,'3025f1a244b39bd3ee5cd99e88ad281b0213be43222ab857b1c18112f6328601',1,'3','3df36b60081528dc010e57cc63818c6cc89cf0c0feb2de92aa133789efb9246f',0],
 [291,'7531352357e0c321bc85be321f92362aa174cac971a1f2f581aa19918487de88',1,'4','0b84d4baef68fb7b8300d296f8c689ac1389d8288339066316ee22462ea23b32',0],
 [435,'c1a3a7a37d38b04359115c64762b1f8a543e4d66155338931de84ef6c304da2c',1,'A.2','cf194c3bac9d445a78ec25d0928b9290aa28b293b939aa109319968c6c88febb',0],
];
export function rationalPlotsReplacements(r){const i=r.queueIndex;if(!rationalPlotsObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const prefixes={
 142:'Dada la función f(x)=frac{2x−6}{2−x}.',
 291:'Se considera la función f(x)={−frac{1}{2}x²+x+1 si x≤2; frac{1}{x−1} si x>2}.',
 435:'En una especie animal la contracción del iris, en décimas de milímetro, después de exponer el ojo a una luz brillante durante un determinado tiempo, viene dada por f(t)={t² si 0≤t≤2; frac{4}{t−1} si t>2}, donde t es el tiempo, en segundos, que transcurre desde que se concentra la luz en el ojo.',
 };const out=[[r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_AND_BRANCH_DOMAIN']],p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===142){p(0,'Estudie la continuidad y derivabilidad de dicha función. Calcule sus asíntotas.');p(1,'Estudie los intervalos de crecimiento y decrecimiento, así como la existencia de extremos relativos.');p(2,'Halle los puntos de corte con los ejes de coordenadas y represente gráficamente la función.');}
 if(i===291){p(0,'Estudie la continuidad, derivabilidad y monotonía de f. Represente gráficamente dicha función.');p(1,'Calcule el área del recinto limitado por la gráfica de f, las rectas x=0, x=4 y el eje OX.');}
 if(i===435){p(0,'Estudie la continuidad y la derivabilidad de la función f.');p(1,'Represente gráficamente la función f, determinando los intervalos de crecimiento y decrecimiento y sus asíntotas, en caso de que existan.');p(2,'Determine en qué instante se obtiene la máxima contracción y su valor.');}
 return out;
}
