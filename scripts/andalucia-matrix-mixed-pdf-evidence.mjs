import assert from 'node:assert/strict';
export const matrixMixedObservations=[
 [1335,'8f76c9dc8ba87be028178e8802a4b5f0c475ba6e0556bff72cec636070e4b857',1,'1','f846c773f39a371e355cc6532298379d34f10031d0eceb7064ba8e88539b20de',0],
 [1408,'de33e9bdb3bab2ccc58eed7e1c4b97d79d708e558d7ac2b6339851702d1c91ed',1,'1','05ae0ccb70f8b0287a0f656cf5976be13bed33eb8ff5f3feffd7d7c1267b796e',0],
 [1475,'1752ec2f46b4ef2cc5d1c3346d69b79c2cc8a7aa12f6a0cd8f0d994b5bcda157',1,'2','dcf544027e1793c90114e1ac80916f45adb1a7756aa4111011be3f1c3bb5d690',0],
 [1485,'c42a605501a277fe7194b964ad92ad66047be9a62dc254fa2219d756d3d71317',1,'2','8d8d1c689d9b6563cbe5c4b7e6f2a443956f0876d98ed83615377a6f6ed60b8b',0],
 [1524,'0667329f779d37d2aceff1fd9932ed73388d1935a22029eae06d151f030424cc',1,'1','6797eb8f9ee259ceb063957faf3202daa6f943bfed422f46c5a3fa31e44685a7',0],
 [1565,'eb859ec01d70086dca9d66db3bfc243537cc50589e2d9484faef7d8974134320',1,'1','c9f0cedb7b5e4b8c718cdea02adc535d566968197faef3166093a3f16b9612c8',0],
];
export function matrixMixedReplacements(record){
 const i=record.queueIndex;if(!matrixMixedObservations.some(o=>o[0]===i))return[];
 const result=[],at=record.sourceLiteral.indexOf('a) (');assert.ok(at>=0);
 const prefixes={1475:'Se consideran las matrices A=[[1,0,1],[0,1,0],[1,0,1]], B=[[1,0,2],[1,1,-1],[2,1,0]] y C=[[1],[-3],[1]].',1485:'Se considera la matriz A=[[1,-1,m],[0,2,-3],[m,1,1]], con m un parámetro real.',1524:'Se considera la matriz A=[[2,1,0],[0,1,2],[2,2,2]].'};
 if(prefixes[i]){assert.ok(at>0);result.push([record.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_MATRIX_ROWS_COLUMNS']);}
 const pp=(k,s)=>result.push([record.parts[k].prompt,s,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION']);
 if(i===1335){pp(0,'La suma de tres números naturales es 113; al dividir el mayor entre el menor se obtiene de cociente 6 y resto 4 y al dividir el mayor entre el intermedio se obtiene de cociente 2 y resto 6. Halle dichos números.');pp(1,'Dadas las matrices A=[[1,-1],[2,3]] y B=[[0,1],[2,1]], compruebe si la inversa de la suma de dichas matrices coincide con la suma de las inversas de cada una.');}
 if(i===1408){pp(0,'Un agricultor vende la producción de tres tipos de uva, Tempranillo, Garnacha y Macabeo, de dos de sus fincas. La matriz Q=[[50,40,35],[0,60,55]] recoge la producción, en miles de kilogramos, de estos tipos de uva en cada finca. El precio de venta por kilogramo, en céntimos de euro, según el tipo de uva y la finca, viene dado por la matriz P=[[40,38,42],[34,37,40]].\nCalcule el producto Q·P^{t} y explique el significado económico de los elementos de la diagonal principal del resultado. Indique también la cantidad total de dinero que ha obtenido el agricultor por la venta de la cosecha de las dos fincas.');pp(1,'Dada la siguiente ecuación matricial M·X+N=V:\nb1) Suponiendo que M sea invertible, despeje la matriz X en la ecuación anterior.\nb2) Para M=[[1,0],[1,1]], N=[[5,4],[3,2]] y V=[[8,7],[6,5]], calcule la matriz X.');}
 if(i===1475){pp(0,'Calcule A^{2}, A^{3}, A^{4} y deduzca la expresión de A^{n}, con n un número natural.');pp(1,'Razone si existe la inversa de la matriz B.');pp(2,'Razone si la ecuación matricial B·X=C tiene solución y resuélvala en caso de que sea posible.');}
 if(i===1485){pp(0,'¿Para qué valores del parámetro m existe la matriz inversa de A?');pp(1,'Para m=2, resuelva la ecuación matricial X·A−A^{2}=I₃.');}
 if(i===1524){pp(0,'Resuelva el sistema de ecuaciones matriciales:\n(A+I₃)·X+Y=A−I₃; X−Y=I₃.');pp(1,'Halle el rango de las matrices A+I₃ y A−I₃. ¿Son matrices invertibles?');}
 if(i===1565){pp(0,'Un fabricante de paneles fotovoltaicos está analizando la eficiencia de tres modelos de placas (A, B y C). En un día determinado se realizaron tres pruebas. En la primera, utilizando 2 placas del modelo A, 1 placa del modelo B y 3 placas del modelo C, se generó una potencia efectiva total de 2960 W. En la segunda, al combinar 1 placa del modelo A, 3 placas del modelo B y 2 placas del modelo C, se obtuvo una potencia efectiva total de 2990 W. En la tercera, una configuración con 3 placas del modelo A, 2 placas del modelo B y 1 placa del modelo C produjo una potencia efectiva total de 2870 W. Exprese el problema en forma matricial y discuta, a partir de la matriz del sistema, si se puede obtener la potencia efectiva que generó individualmente cada modelo de placa fotovoltaica. En caso afirmativo, obtenga dichas potencias efectivas.');pp(1,'Resuelva la ecuación matricial 2X=[[1,1],[0,-1]]^{2}·[[4],[1]].');}
 return result;
}
