import assert from 'node:assert/strict';
export const rationalExponentialObservations=[
 [267,'493e877200ccb29cbe7b956aa9b356cda37760b602bb067a7e047a9b4bebb476',1,'3','54a8557c27718da2595ada92a75c26ccaeb1332b6027c111c79f3ce7247a9905',0],
 [334,'1016796ab6576ec1284db5e1fec88de27d0a949302d63237591fdc62e9d9afcb',1,'3','611e073fa058cd159ff7c2a52cc101a4eb1041f05a15ca33c9d9dc764cb52032',0],
 [348,'bebc339cfd8f69c7c4fae160fd165eaef5f6bc93cfd6d15cb9ce289b7029d167',2,'B.2','a691ed92459831a7df7b02fa709c458b3f0bec4813f3cff3af3f4985654cad8a',0],
 [449,'548f60ee334516c7fa918dba3c28fb3ea5fe753cf76eb05402d7b8acb5a3b560',1,'3','6cf551a75ab45ef849e4972531c5d613910522acbaa5e93342ff75831b321b6a',0],
];
export function rationalExponentialReplacements(r){const i=r.queueIndex;if(!rationalExponentialObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const out=[],prefixes={334:'Se considera la función f(x)=1−frac{4}{x+3}.',348:'La cantidad C que una entidad bancaria dedica a créditos depende de su liquidez x según C(x)={frac{150+5x}{100} si 10≤x≤50; frac{200+10x}{25+3x} si x>50}, donde C y x están expresadas en miles de euros.',449:'Se considera la función f(x)={2^{x+1} si x<0; x²−2x si x≥0}.'};if(i!==267)out.push([r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_RATIONAL_OR_EXPONENTIAL_DEFINITION']);const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===267){p(0,'Calcule la derivada de las funciones siguientes: f(x)=(x²+2)³·e^{−2x}; g(x)=frac{ln(1−x³)}{(1−2x²)²}.');p(1,'Halle los valores de a y b para que sea horizontal la recta tangente a la gráfica de h(x)=x³+ax²+3x+b en el punto P(1;2).');}
 if(i===334){p(0,'Halle el dominio de f y los puntos de corte de su gráfica con los ejes de coordenadas.');p(1,'Calcule las asíntotas de la función f.');p(2,'Obtenga los puntos donde la recta tangente a la gráfica de f tiene pendiente 1.');p(3,'Estudie la curvatura de f.');}
 if(i===348){p(0,'Justifique que C es una función continua.');p(1,'¿A partir de qué liquidez decrece la cantidad dedicada a créditos? ¿Cuál es el valor máximo de C?');p(2,'Calcule la asíntota horizontal e interprétela en el contexto del problema.');}
 if(i===449){p(0,'Estudie la continuidad y derivabilidad de f en su dominio.');p(1,'Estudie la monotonía de f y calcule el mínimo.');p(2,'Calcule ∫_{−2}^{2}f(x) dx.');}
 return out;
}
