import assert from 'node:assert/strict';
export const joinsObservations=[
 [78,'0b99df3e2c9a7af0a074136b72c3d257ad9241ccc79fed32894de424481b6be2',2,'B.2','c2acb88e199485a1256315d4e3dcb145f32938fced70c44b6a797804651208c6',0],
 [146,'98b7723232acd3143de28397f7641923ed48292db7c35883ebd2b56a72b30b79',2,'B.2','edc6136444b61aebe0715f32169979772a8def999e8ad7bd77636801c0f6090d',0],
 [184,'1780d560801fb3001e146f12b3a37b29b566ca6576dc9cdafda07902d7dee982',2,'B.2','abaa434685268517815dd105703064ae7d2f3db53fd0e10938d33267267aa8f1',0],
 [219,'a10146fce64a17e21450973c88d66d43571619781f76bc345b5a4b3dee67a16b',1,'A.2','c2df93ef8adbd7781b11f36a28311aa65e1085bb3f21d23e1859f5f0c2004a30',0],
 [275,'37584a9604930b74008a6bda88ef3d61fa926d5e6a540ab9013569258f772256',2,'B.2','e972cdc0c09c051c3e203e397b4df9e0ddaaf4bbacccfdebca03732bdce029d9',0],
 [323,'c41ea8ffe46f2de3a4d7f82e43def97322e29653182ad3df54a57e2ead2beb19',2,'B.2','0cbcd818984ac0bd29c44defeafac7935c776a8ef68921fea178f82434ab39da',0],
 [404,'df7375f8183eafb6f45e9c65083e68d528ffabe07d66717b0ccf0f020c5b064f',2,'B.2','0c5d664f908a1a8f26886aa2463d18850bf73349496a0827ca867bca7f7a81f4',0],
 [431,'37584a9604930b74008a6bda88ef3d61fa926d5e6a540ab9013569258f772256',1,'A.2','aadf69a8d66cea7a387284a9113cb796a6f8ee6f37e5db75cff64a0809a15c50',0],
 [494,'77e0c295529ccd4ed502b5859d4011cb4b0e955a1e4795e570a9da20ae48293c',2,'B.2','c3e95a0f988d4ec17537fc19a7134e3edd83e34af75e24339fdc39f6b233de6b',0],
];
export function joinsReplacements(r){const i=r.queueIndex;if(!joinsObservations.some(o=>o[0]===i))return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);const out=[];
 const prefixes={
 78:'Se considera la función f(x)={frac{a}{x−1} si x<0; x²−bx−1 si x≥0}.',
 146:'Se considera la función f(x)={ax−3x² si x≤1; 2x²+b si x>1}.',
 184:'Sea la función f(x)={x²−3x+4 si x≤2; 4−frac{a}{x} si x>2}.',
 219:'La velocidad que lleva un móvil, en función del tiempo t, viene dada por la siguiente función:\nv(t)={7t² si 0≤t<1; 2t+a si 1≤t≤5; −t²+12t+b si 5<t≤10}.',
 275:'Se considera la función f(x)={ax+1 si x≤−1; frac{x}{x+2} si −1<x≤0; x²−bx si x>0}.',
 323:'Se considera la función f(x)={frac{4}{x} si x≤2; x²−2x+2 si x>2}.',
 404:'Sea la función f definida por f(x)={−bx²−bx+a si x≤2; frac{60}{x} si x>2}.',
 431:'Los costes de producción de una empresa, en miles de euros, dependen de la cantidad de producto fabricada x, medida en toneladas, según la función f(x)=30−9x+6x²−x³. La capacidad máxima de producción es de 2 toneladas.',
 494:'Sea la función f(x)={frac{1}{2}(ax−12) si x<−1; −x²+b(x−1) si x≥−1}.',
 };
 out.push([r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_PIECEWISE_DEFINITION']);
 const p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_FULL_CALCULUS_SUBPART']);
 if(i===78){p(0,'Calcule el valor de a y b, para que la función sea derivable en x=0.');p(1,'Para a=1 y b=2, halle la ecuación de la recta tangente a la gráfica de la función en el punto de abscisa x=2.');}
 if(i===146){p(0,'Calcule los valores de a y b para que la función f sea derivable en x=1.');p(1,'Para a=3 y b=−2, estudie la monotonía y curvatura de la función f.');}
 if(i===184){p(0,'Halle el valor de a para que dicha función sea continua y estudie la derivabilidad de f para ese valor de a.');p(1,'Para a=1, ¿existe alguna asíntota vertical de esa función? ¿Y horizontal? Razone las respuestas y calcule, en caso afirmativo, dichas asíntotas.');}
 if(i===219){p(0,'Determine a y b para que la función sea continua en los instantes t=1 y t=5.');p(1,'Para a=5 y b=−20, estudie la derivabilidad en los instantes t=1 y t=5. ¿En qué momento el móvil alcanza la velocidad máxima?');}
 if(i===275){p(0,'Calcule a y b para que la función sea continua y derivable en x=−1 y x=0.');p(1,'Para a=2 y b=−frac{1}{2} estudie su monotonía.');}
 if(i===323){p(0,'Estudie la continuidad y la derivabilidad de esta función.');p(1,'Estudie su monotonía y su curvatura para x>0.');}
 if(i===404){p(0,'Obtenga los valores de a y b para que la función sea continua y derivable.');p(1,'Para a=48 y b=3, estudie la monotonía de f(x) y calcule sus extremos.');}
 if(i===431){p(0,'Obtenga los intervalos de crecimiento y decrecimiento de la función de costes de la empresa.');p(1,'Determine la cantidad que la empresa debe producir para minimizar los costes. ¿Cuál sería dicho coste mínimo?');p(2,'¿Con qué producción la empresa tiene unos costes de producción máximos?');}
 if(i===494){p(0,'Halle los valores de a y b sabiendo que la función es derivable en x=−1.');p(1,'Para a=1 y b=−1 obtenga la ecuación de la recta tangente a la gráfica de la función f(x) en el punto de abscisa x=−2.');}
 return out;
}
