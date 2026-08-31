import assert from 'node:assert/strict';
export const costGraphsObservations=[
 [95,'31fb46947e141f5c8da8f7b381e7d27b67fe5a9d1597120454ce66fce0313f1a',1,'A.2','30d7eb4bdf8c1769f22897ec6bac9a0d6502c5607e75fab1cc9d25efee2a8e1a',0],
 [157,'668689642ca997cf817c9f9f6608d2835efe898e3162b050d7b22b51f225d363',2,'B.2','50fb749cc9f70faa7742868791448d94e59c62b71db3ed1371e944ff95d9398e',0],
 [357,'1016796ab6576ec1284db5e1fec88de27d0a949302d63237591fdc62e9d9afcb',1,'4','611e073fa058cd159ff7c2a52cc101a4eb1041f05a15ca33c9d9dc764cb52032',0],
];
export function costGraphsReplacements(r){const i=r.queueIndex;if(!costGraphsObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const prefixes={
 95:'El coste de producción de un bien en una fábrica viene dado por C(x)=2(2x−1)²+1, con 0≤x≤2, donde x es la cantidad producida en millones de kilogramos.',
 157:'Los beneficios de una empresa, en miles de euros, han evolucionado en los 25 años de su existencia según una función del tiempo, en años, dada por la siguiente expresión: B(t)={4t si 0≤t<10; −frac{1}{5}t²+8t−20 si 10≤t≤25}.',
 357:'Se considera la función f(x)={−x²+2x si x<2; x²−2x si x≥2}.',
 };const out=[[r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_AND_DOCUMENTED_UNITS']],p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===95){p(0,'Estudie el crecimiento y decrecimiento de la función C(x).');p(1,'Determine la cantidad a producir para que el coste de producción sea mínimo. ¿Cuál es dicho coste?');p(2,'Realice un esbozo de la gráfica de la función C(x).');}
 if(i===157){p(0,'Estudie la continuidad y derivabilidad de B en el intervalo [0;25].');p(1,'Estudie la monotonía de esta función y determine en qué año fueron mayores los beneficios de esta empresa y cuál fue su beneficio máximo.');p(2,'Represente gráficamente esta función.');}
 if(i===357){p(0,'Estudie la continuidad y derivabilidad de f.');p(1,'Represente el recinto limitado por las rectas y=2x, x=−1, x=1 y la gráfica de f. Calcule su área.');}
 return out;
}
