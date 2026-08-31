import assert from 'node:assert/strict';
export const calculusObservations=[
 [138,'5ea9fab18d8185843726e08994f39cf34f9b7dab32d86c310902a2f203dace2a',1,'A.2','f7af2c0d5e48ea3991b8265981e4dc311baf4e5c7ae2f19f6d85c0fa3455b33f',0],
 [215,'cb44cc1136c3a49a889caa64ff407575afb2c418b60865e4e4f471196031da06',1,'4','658f8df0a42b608ecbd49471616d83c285b92d7db4ef534b2364b6e83fb428cd',0],
 [391,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',2,'B.2','5776adf9b7cb2ab6db372d2ab470b7e41a4903c985625743d92f2c33124c4dcb',0],
 [487,'5998699e0b2992b988a8e0ed0d2e3581dd8fac52d6f9802587ebd40fee5ef608',2,'B.2','2d95d12821b6658fa77f0edd38edc959b7e759f6e8b5ebb7e7d3b80dbcfc438c',0],
 [625,'8f76c9dc8ba87be028178e8802a4b5f0c475ba6e0556bff72cec636070e4b857',1,'3','f846c773f39a371e355cc6532298379d34f10031d0eceb7064ba8e88539b20de',0],
 [640,'1f0983e351b8435c5b6c7b68b05fe2a64034faf77a85a1f9480407aa0f2a88aa',2,'B.2','a7239d2a55ec1f6abb264d802e8af8e103b059d0a0f460a15d455a9106d95dd5',0],
 [727,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',1,'A.2','6a807f08eadf28d2ec0162dc998d333be86492dabc768911fc0ddc7f86272baa',0],
 [826,'6fed0384ff6fcbaaa7098ab3f35ea5f881d1280502f050ada3a7f13af528392e',2,'B.2','8ee583710e3acf1faaea3fe1a4a21e5283e133d3a84e5b2745622bdfabb2e5b2',0],
];
// Every replacement transcribes the inspected official page. The original
// extracted literal is kept in the reversible ledger; answers are not its source.
export function calculusReplacements(record){
 const i=record.queueIndex;if(!calculusObservations.some(o=>o[0]===i))return[];
 const result=[],at=record.sourceLiteral.search(/a\) \(/);assert.ok(at>=0);
 const prefixes={
 138:'Sea la función f(x)=2x²−frac{1}{3}x³. Calcule:',
 215:'Se considera la función f(x)=3x³−6x²+5.',
 391:'Se considera la función f(x)=frac{1}{3}x³−2x²+3x+1.',
 625:'El Cesio 137 es un elemento radioactivo que se usa, entre otros, para tratamientos de radioterapia. La cantidad (en mg) de Cesio 137 que queda en el lugar de almacenamiento, transcurrido un número de años t, viene dada por la función:\nf(t)=10·(frac{1}{2})^{frac{t}{30}}; t≥0.',
 640:'Sea f(x) una función cuya función derivada, f′(x), tiene por gráfica una parábola que corta al eje OX en los puntos (−1,0) y (5,0) y con vértice (2,−4).',
 727:'Se considera la función f(x)=x−frac{3x−1}{x+1}.',
 826:'Se considera la función f(x)=frac{ax}{bx+1}, con a y b números reales.',
 };
 if(prefixes[i])result.push([record.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_CALCULUS_FORMULA_AND_CONTEXT']);
 const pp=(k,s)=>result.push([record.parts[k].prompt,s,'PDF_VISIBLE_CALCULUS_SUBPART']);
 if(i===138){pp(0,'Los intervalos de crecimiento y decrecimiento.');pp(1,'Las coordenadas de sus extremos relativos.');pp(2,'El punto de la gráfica en el que la pendiente de la recta tangente a dicha gráfica es 4.');}
 if(i===215){pp(0,'Obtenga las ecuaciones de las rectas tangentes a f que sean paralelas a la recta de ecuación y=−3x+1.');pp(1,'Calcule la función F que verifique que F′(x)=f(x) y F(2)=4.');}
 if(i===391){pp(0,'Estudie su monotonía y halle sus extremos relativos.');pp(1,'Determine los intervalos de concavidad y convexidad. Calcule su punto de inflexión.');pp(2,'Calcule la pendiente de la recta tangente a la gráfica de f en el punto de abscisa x=0.');pp(3,'Calcule ∫f(x) dx.');}
 if(i===487){pp(0,'La gráfica de la función derivada, f′, de una función f es una parábola que corta al eje OX en los puntos (−1,0) y (3,0), y tiene su vértice en (1,−4). Estudie, a partir de ella, la monotonía de la función f e indique la abscisa de cada extremo relativo.');pp(1,'Halle la ecuación de la recta tangente a la gráfica de la función g(x)=−2e^{3x} en el punto de abscisa x=0.');}
 if(i===625){pp(0,'Calcule los años que deben pasar para que la cantidad de Cesio 137 que quede en el almacén sea la mitad de la que había al inicio.');pp(1,'Calcule la ecuación de la recta tangente a la gráfica de la función f, en el punto de abscisa t=10.');pp(2,'Indique si la función tiene asíntotas horizontales y verticales. En caso afirmativo, calcúlelas.');}
 if(i===640){pp(0,'Estudie razonadamente la monotonía de f(x).');pp(1,'Determine las abscisas de los extremos relativos de la función f(x).');pp(2,'Halle la ecuación de la recta tangente a la gráfica de f(x) en el punto de abscisa x=2, sabiendo que f(2)=5.');}
 if(i===727){pp(0,'Indique el dominio de f y calcule f′(x).');pp(1,'Calcule la pendiente de la recta tangente a la gráfica de f en el punto de abscisa x=frac{2}{3}.');pp(2,'Halle los puntos de la gráfica de f en los que la recta tangente a dicha gráfica es horizontal.');}
 if(i===826){pp(0,'Calcule los valores de a y b, sabiendo que f(−1)=1 y que en el punto de abscisa x=0 la recta tangente a la gráfica de f es paralela a la recta y=2x+1.');pp(1,'Para a=b=1, halle la ecuación de sus asíntotas.');}
 return result;
}
