(function applyAndaluciaSourceAppVisualParity(globalScope) {
  'use strict';

  const runtime = globalScope.ANDALUCIA_PAU_RUNTIME;
  if (!runtime?.exercises) return;

  const overrides = Object.freeze({
    'pau-user-and-fc24350dc009dd373a61feb93871': Object.freeze({
      learnerStatement: 'Sean las matrices A=[[0,2],[3,0]] y B=[[a,b],[6,1]].',
      learnerStatementHtml: undefined,
      partOrder: ['a', 'b'],
      partText: Object.freeze({
        a: 'Calcule los valores de a y b para que A·B=B·A.',
        b: 'Para a=1 y b=0, resuelva la ecuación matricial X·B−A=I₂.'
      }),
      evidence: Object.freeze({
        sourceFile: 'CCSS II_3_2008.pdf',
        page: 1,
        rule: 'SOURCE_VERIFIED_MATRIX_AND_SUBPART_ORDER'
      })
    }),
    'pau-can-ex-b9f6f879ab07429e3e9fcf2843eb85cc': Object.freeze({
      learnerStatement: 'Considera la matriz A=[[a,b,c],[d,e,f],[g,h,i]], de la que se sabe que det(A)=5.',
      learnerStatementHtml: undefined,
      partOrder: ['a', 'b'],
      partText: Object.freeze({
        a: 'Calcula, indicando las propiedades que utilices, los determinantes de las matrices 3A y [[2a,d+3a,g],[2b,e+3b,h],[2c,f+3c,i]].',
        b: 'Si B es otra matriz cuadrada de orden 3 y det(B)=4, calcula, indicando también las propiedades que utilices, det(BA⁻¹).'
      }),
      evidence: Object.freeze({
        sourceFile: 'Mates II_4_2019.pdf',
        page: 1,
        rule: 'SOURCE_VERIFIED_DETERMINANT_MATRIX_AND_SUBPARTS'
      })
    }),
    'pau-can-ex-153b64b72aa7bda6427c727203d49e30': Object.freeze({
      learnerStatement: 'Considera el siguiente sistema de ecuaciones system{2x+y+(α−1)z=α−1;x−αy−3z=1;x+y+2z=2α−2}.',
      learnerStatementHtml: undefined, partOrder: ['a', 'b'],
      partText: Object.freeze({ a: 'Resuelve el sistema para α=1.', b: 'Determina, si existe, el valor de α para el que (x,y,z)=(1,−3,α) es la única solución del sistema dado.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2015.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-b2895ae51c595a9c065841c0acf2162c': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Considera las matrices A=[[1,0,0],[0,−2,1],[0,−5,3]] y B=[[0,0,1],[1,1,1],[1,0,0]]. Halla la matriz X que verifica A⁻¹XA=B−A.',
      evidence: Object.freeze({ sourceFile: 'Mates II_4_2014.pdf', page: 2, rule: 'SOURCE_VERIFIED_TWO_MATRICES_3X3' })
    }),
    'pau-can-ex-bb73e66f22bfb438031a35a9cc550e51': Object.freeze({
      learnerStatement: 'Dado el sistema de ecuaciones system{kx+2y=3;−x+2kz=−1;3x−y−7z=k+1}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Estudia el sistema para los distintos valores del parámetro k.', b: 'Resuélvelo para k=1.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2012.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-bd54b251714ae57b7e102a7b8797d5a3': Object.freeze({
      learnerStatement: 'Considera el siguiente sistema de ecuaciones lineales system{x+λy+z=4;−λx+y+z=1;x+y+z=λ+3}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Discute el sistema según los valores de λ.', b: 'Resuelve el sistema, si es posible, para λ=1.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2019.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-c042f01d23d97e5138c16ec83d69389f': Object.freeze({
      learnerStatement: 'Dado el sistema de ecuaciones lineales system{mx−y+13z=0;2x−my+4z=0;x+y+7z=0}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Encuentra los valores de m para los que el sistema tiene infinitas soluciones.', b: 'Resuelve el sistema para m=3. En este caso, ¿hay alguna solución en la que x=10? Razona tu respuesta.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_3_2019.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-c6a61ab4397ebaa9092bb91fdad94f82': Object.freeze({
      learnerStatement: 'Considera el sistema de ecuaciones dado en forma matricial mediante AX=B, siendo A=[[1,1,2],[−1,m+2,m],[1,1,m+2]], B=[[1−m],[m],[7]] y X=[[x],[y],[z]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Discute el sistema según los valores de m.', b: 'Resuelve el sistema para m=−3 y determina en dicho caso, si existe, una solución en la que x=2.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2016.pdf', page: 1, rule: 'SOURCE_VERIFIED_MATRIX_VECTOR_SYSTEM' })
    }),
    'pau-can-ex-d071d6daa077b90d8cf2f360393544bf': Object.freeze({
      learnerStatement: 'Considera el siguiente sistema de ecuaciones system{x+2y+(m+3)z=3;x+y+z=3m;2x+4y+3(m+1)z=8}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Discútelo según los valores del parámetro m.', b: 'Resuelve el sistema para m=−2.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_ord_2018.pdf', page: 1, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-d0d97719998e06783a1ee8665085d310': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Siendo λ un número real, considera el siguiente sistema de ecuaciones lineales con dos incógnitas system{x+λy=2;2x+4y=1;λx+y=2λ}. Discútelo según los valores de λ y resuélvelo cuando sea posible.',
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2020.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-dea4c2118fba63611c74252943bc1f2f': Object.freeze({
      learnerStatement: 'Considera las siguientes matrices A=[[0,0,1],[0,−1,0],[1,0,0]] y B=[[a,b,c],[0,1,0],[−1,0,0]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b', 'c'], partText: Object.freeze({ a: 'Determina, si existen, los valores de a, b y c para los que las matrices A y B conmutan.', b: 'Calcula A², A³, A²⁰¹⁷ y A²⁰¹⁸.', c: 'Calcula, si existe, la matriz inversa de A.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2018.pdf', page: 1, rule: 'SOURCE_VERIFIED_TWO_MATRICES_3X3' })
    }),
    'pau-can-ex-ee2ac7fc542a1671c54c1cfacd5dcbd5': Object.freeze({
      learnerStatement: 'Considera las matrices A=[[2,0,0],[1,2,1],[1,0,3]] y X=[[x],[y],[z]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b', 'c'], partText: Object.freeze({ a: 'Discute el sistema dado por AX=mX según los valores del parámetro m.', b: 'Da la solución del sistema en los casos en que es compatible determinado.', c: 'Para m=3 resuelve el sistema y halla, si es posible, una solución en la que x+y+z=3.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_4_2018.pdf', page: 1, rule: 'SOURCE_VERIFIED_MATRIX_AND_VECTOR' })
    }),
    'pau-can-ex-f016b023101b36070fa6e62c9c75efbd': Object.freeze({
      learnerStatement: 'Considera el siguiente sistema de ecuaciones lineales system{mx+(m+1)z=m;my+z=m;y+mz=m}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Discute el sistema según los valores de m.', b: 'Resuélvelo, si es posible, para m=1.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2019.pdf', page: 2, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-f106908e6a64af4c355dff4d46b325de': Object.freeze({
      learnerStatement: 'Considera la matriz A=[[0,a,−b],[0,0,b],[0,0,0]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Calcula A¹⁰.', b: 'Calcula, si es posible, la matriz inversa de I+A+A², donde I denota la matriz identidad de orden 3.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2023.pdf', page: 2, rule: 'SOURCE_VERIFIED_MATRIX_3X3' })
    }),
    'pau-can-ex-f15aaaa605adb1263894fc5969a810dd': Object.freeze({
      learnerStatement: 'Dadas las matrices A=[[1,1,0],[2,t+1,t−1],[−2t−1,0,t+3]] y X=[[x],[y],[z]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Calcula el rango de A según los diferentes valores de t.', b: 'Razona para qué valores de t el sistema homogéneo AX=0 tiene más de una solución.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2011.pdf', page: 2, rule: 'SOURCE_VERIFIED_MATRIX_AND_VECTOR' })
    }),
    'pau-can-ex-f519680d8b68e501f805e343923cb160': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Dadas las matrices A=[[2−m,1,2m−1],[1,m,1],[m,1,1]], X=[[x],[y],[z]] y B=[[2m²−1],[m],[1]], considera el sistema de ecuaciones lineales dado por XᵀA=Bᵀ, donde Xᵀ y Bᵀ denotan las traspuestas. Discútelo según los distintos valores de m.',
      evidence: Object.freeze({ sourceFile: 'Mates II_ord_2019.pdf', page: 2, rule: 'SOURCE_VERIFIED_MATRIX_VECTOR_TRANSPOSE_SYSTEM' })
    }),
    'pau-can-ex-f952c6ce76386abb51a19b1293359c79': Object.freeze({
      learnerStatement: 'Considera el siguiente sistema de ecuaciones system{αx+y+3z=4;x+y−2z=−2;−x+2y+(3+α)z=4+α}.', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Determina, si existen, los valores de α para los que el sistema dado tiene solución única.', b: 'Determina, si existen, los valores de α para los que el sistema dado tiene al menos dos soluciones. Halla todas las soluciones en dichos casos.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2015.pdf', page: 1, rule: 'SOURCE_VERIFIED_SYSTEM_3_ROWS' })
    }),
    'pau-can-ex-fad7a4938dc64f3d4897e8dbe34580a6': Object.freeze({
      learnerStatement: 'Sean las matrices A=[[a,3],[b,1]] y B=[[1,1],[−1,2],[1,1]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Determina a y b para que A²=4I, donde I es la matriz identidad de orden 2.', b: 'Para a=−1 y b=1, calcula, si es posible, la matriz X que cumple A²X=Bᵀ.' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2025.pdf', page: 2, rule: 'SOURCE_VERIFIED_MATRICES_2X2_AND_3X2' })
    }),
    'pau-can-ex-fdf1cd406a8d990d108cf1ab8caa063a': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Dada la matriz A=[[5,4,3],[4,2,2],[3,2,1]], halla la matriz X que cumple AX=(A⁻¹Aᵀ+I)², siendo Aᵀ la matriz traspuesta de A e I la matriz identidad de orden 3.',
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2019.pdf', page: 1, rule: 'SOURCE_VERIFIED_MATRIX_3X3' })
    }),
    'pau-can-ex-febf041f36b0ad767db6bf54ab591f46': Object.freeze({
      learnerStatement: 'Sea la matriz A=[[2,1,0],[0,1,−1],[0,2,4]].', learnerStatementHtml: undefined,
      partOrder: ['a', 'b'], partText: Object.freeze({ a: 'Estudia, según los valores de λ, el rango de la matriz A−λI, siendo I la matriz identidad de orden tres.', b: 'Resuelve el sistema dado por (A−2I)[[x],[y],[z]]=[[0],[0],[0]].' }),
      evidence: Object.freeze({ sourceFile: 'Mates II_3_2016.pdf', page: 1, rule: 'SOURCE_VERIFIED_MATRIX_AND_VECTOR_EQUATION' })
    })
  });

  const suffix = (part) => String(part?.id || '').split(':').at(-1).replace(/[^a-z]/gi, '').toLowerCase();

  const phase29Overrides = Object.freeze({
    'pau-can-ex-192610f4a829387be50aba5a6e6a15b1': Object.freeze({
      learnerStatement: 'Considera el sistema [[5,−2,−3],[2,0,−2],[3,−2,−1]][[x],[y],[z]]=m[[x],[y],[z]].', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2024.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_MATRIX_EIGENSYSTEM' })
    }),
    'pau-can-ex-3f58f5bf13ef9f8e47a0798419ce33ff': Object.freeze({
      learnerStatement: 'Considera las funciones f:(−2,+∞)→ℝ, definida por f(x)=ln(x+2) (ln denota la función logaritmo neperiano), y g:ℝ→ℝ, definida por g(x)=(x−3)/2.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_ord_2019.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_FUNCTIONS_WITHOUT_NEXT_EXERCISE_TAIL' })
    }),
    'pau-can-ex-4b865ffdc4108f8b7311cbc1c95c9cf1': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'La Agencia Espacial Europea contará con un presupuesto de 2,4 millones de euros para financiar misiones sobre Observación de la Tierra y programas de Transporte Espacial. Cada misión supone una inversión de 200 000 euros y cada programa, 100 000 euros. En la decisión final deben superarse los 2 millones de euros de inversión y el número de misiones debe ser al menos 4, pero no más de la mitad del número de programas. ¿Cuántas misiones y cuántos programas se deben llevar a cabo para obtener el máximo de F(x,y)=0,6x+0,4y, con x misiones e y programas?',
      evidence: Object.freeze({ sourceFile: 'CCSS II_2_2021.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_CLEAN_SINGLE_PROMPT' })
    }),
    'pau-can-ex-5ebe59e0cf89500947aaff4e24894b48': Object.freeze({
      learnerStatement: 'El número de diagnosticados de COVID-19 por PCR en Andalucía, medido en miles de personas, se aproxima por f(t)=piecewise{−t²+2t−0,3 if 0,2≤t≤1,8;0,1t−0,12 if 1,8<t≤5;−0,5t²+8,3t−28,62 if 5<t≤10}, donde t es el tiempo, medido en meses, a partir del inicio de conteo en marzo de 2020.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_extra_2021.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_3_BRANCHES' })
    }),
    'pau-can-ex-61aed4f146fcd427aa496c3b4dda938a': Object.freeze({
      learnerStatement: 'Sea la función f(x)=piecewise{x²−bx+1 if x≤2;2x+a if x>2}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_extra_2013.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-62e30ae563c32931d756357a47f4f2ae': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{ax+1/2 if x≤−1;(x+1)/(x+3) if −1<x≤1;x²−bx if x>1}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_4_2020.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_3_BRANCHES' })
    }),
    'pau-can-ex-6897411bf26489d5adb8a052058877fe': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{2/(x+1) if x<−2;x²+a if x≥−2}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_6_2020.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-6b3497a9f876195f248a5adadd274139': Object.freeze({
      learnerStatement: 'Sean las funciones f(x)=piecewise{x³−x²+2 if −1≤x≤0;−x³−x²+2 if 0<x≤1} y h(x)=piecewise{−x²+x+2 if −1≤x≤0;−x²−x+2 if 0<x≤1}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_2_2010.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_TWO_PIECEWISE_FUNCTIONS' })
    }),
    'pau-can-ex-6bc6e32b143f89eb8749de13b8bec518': Object.freeze({
      learnerStatement: 'Una empresa quiere invertir en productos financieros un mínimo de un millón de euros y un máximo de seis millones de euros. La rentabilidad viene dada por R(x)=piecewise{x−2 if 1≤x<2;−x²+10x−16 if 2≤x≤6}, donde x y R(x) están expresadas en millones de euros.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_2_2017.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-6cc73ae5f6093e478530d46dc62e52c9': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{x²+2x if −2≤x<1;ax²+4x if 1≤x≤4}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_4_2019.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-75cc9de0c823223e75e52c950cffce7e': Object.freeze({
      learnerStatement: 'Considera el punto P(1,−1,0) y la recta r dada por system{x=1+3t;y=−2;z=t}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_ord_2017.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PARAMETRIC_LINE' })
    }),
    'pau-can-ex-7cfeacddd23b543a4dc4049ca0bfe4f9': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Estudia la derivabilidad de la función f(x)=piecewise{eˣ if x≤0;1 if 0<x≤3;x²+6x+2 if x>3}.',
      evidence: Object.freeze({ sourceFile: 'CCSS II_2_2013.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PIECEWISE_PROMPT' })
    }),
    'pau-can-ex-8462479316a20910acb597439ae9db5d': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{x³−1 if x<1;x²+4x−3 if x≥1}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_3_2013.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-b62329c69aa5c38cda0904526dbcc702': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Sea la función f(x)=piecewise{x²−ax+5 if x<0;−x²+b if x≥0}. Determina los valores de a y b para que f sea derivable en x=0.',
      evidence: Object.freeze({ sourceFile: 'CCSS II_1_2014.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PIECEWISE_PROMPT' })
    }),
    'pau-can-ex-b720b19f9e71a343fe7b10c45ddd7ff5': Object.freeze({
      learnerStatement: 'Sabiendo que el determinante de la matriz A=[[a,b,c],[b,d,e],[c,e,f]] es 3, halla los siguientes determinantes indicando, en cada caso, las propiedades que utilices:', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2014.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_MATRIX_3X3' })
    }),
    'pau-can-ex-bb5a339aa5bde48706465a7819c83d9a': Object.freeze({
      learnerStatement: 'Considera los puntos A(1,0,1), B(−1,0,2) y O(0,0,0), y la recta r≡system{x=−1−λ;y=λ;z=2}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_5_2020.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PARAMETRIC_LINE' })
    }),
    'pau-can-ex-be7c0028633047f6f475ee05950e3099': Object.freeze({
      learnerStatement: 'Considera las rectas r≡system{x=3+λ;y=1;z=−3−λ} y s≡system{x+y=1;z=0}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2021.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_TWO_LINES' })
    }),
    'pau-can-ex-bf089070d7ed37889d6b95c75e5d7480': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{−2/(x+2) if x≤0;2/(x−2) if x>0}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_3_2011.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-c212c85f54de01375963c3d0a5298043': Object.freeze({
      learnerStatement: 'Considera el sistema de ecuaciones dado por AX=B, siendo A=[[1,−2,1],[m,4,−2],[0,m+2,−3]], X=[[x],[y],[z]] y B=[[2],[2m],[1]].', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2020.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_MATRIX_VECTOR_SYSTEM' })
    }),
    'pau-can-ex-c4f3a130b06feeba893d3c2bcc69352b': Object.freeze({
      learnerStatement: 'Considera los puntos B(−1,0,−1), C(0,1,−3) y la recta r≡system{x=−λ;y=1+2λ;z=−1+λ}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_3_2021.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PARAMETRIC_LINE' })
    }),
    'pau-can-ex-c875271d96d7e7857f77eb067ff79b0f': Object.freeze({
      learnerStatement: 'Sea f:ℝ→ℝ la función dada por f(x)=piecewise{−x²+6x−8 if x≤4;x²−6x+8 if x>4}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2019.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_WITHOUT_NEXT_EXERCISE_TAIL' })
    }),
    'pau-can-ex-cd14003f748393b90a1ff927ce0834dd': Object.freeze({
      learnerStatement: 'Sea la función derivable f:ℝ→ℝ definida por f(x)=piecewise{e^(2ax−4b) if x<1;1−x·ln(x) if x≥1} (ln denota la función logaritmo neperiano).', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2020.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-cddd22b06e6da1c1a25779981711a82c': Object.freeze({
      learnerStatement: 'Sean A y B dos matrices que verifican A+B=[[4,2],[3,2]] y A−B=[[2,4],[−1,2]].', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_3_2011.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_TWO_MATRICES_2X2' })
    }),
    'pau-can-ex-ce31f1921d3645541e5e239ffd9f8f40': Object.freeze({
      learnerStatement: 'Sea la función f(x)=piecewise{x²+ax if x≤2;(x+b)/(x−1) if x>2}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_2_2014.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-d198f2a14ff2a84ce44a84f7f7982f70': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Determina una función derivable f:ℝ→ℝ sabiendo que f(1)=−1 y que f′(x)=piecewise{x²−2x if x<0;eˣ−1 if x≥0}.',
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2014.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PIECEWISE_PROMPT' })
    }),
    'pau-can-ex-dd4e382f23a06ad41c07dbb8f9437c3c': Object.freeze({
      learnerStatement: 'Considera el sistema dado por AX=B, con A=[[α,2,−1],[0,1,2],[3,4,α]], B=[[1],[α−2],[3]] y X=[[x],[y],[z]].', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2015.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_MATRIX_VECTOR_SYSTEM' })
    }),
    'pau-can-ex-e1507b74fd5ea3b269ccb8431c9f7f8f': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{x²+ax+2 if x≤0;(x+b)/(x−1) if x>0}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_5_2020.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-e3ef2411113e53d1fdcbea079933a1d9': Object.freeze({
      learnerStatement: 'El beneficio, en miles de euros, alcanzado en una tienda de ropa el pasado año viene dado por B(t)=piecewise{t²/8−t+5 if 0≤t≤6;(t+1)/2 if 6<t≤12}, donde t es el tiempo transcurrido en meses.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_6_2011.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-e9f5979f1d7a194af77b17f46c107b04': Object.freeze({
      learnerStatement: 'Considera la función derivable f:ℝ→ℝ definida por f(x)=piecewise{(eˣ−e^(−x))/(2x) if x<0;ax+b if x≥0}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_2_2014.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-eb51039a0a626d34e31a39288ff3bc2f': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Sea f:ℝ→ℝ la función definida por f(x)=x³+ax²+bx+c. Se sabe que un punto de inflexión de la gráfica de f tiene abscisa x=1 y que f tiene un mínimo relativo en x=2 de valor −9. Calcula a, b y c.',
      partSolutionSteps: Object.freeze({ main: Object.freeze([
        'Derivamos: f′(x)=3x²+2ax+b y f′′(x)=6x+2a. Como x=1 es punto de inflexión, f′′(1)=0: 6+2a=0, luego a=−3.',
        'Con a=−3, f′′(x)=6(x−1). Recta real de signos de f′′: negativa si x<1 y positiva si x>1; por tanto cambia la concavidad en x=1.',
        'Como x=2 es un mínimo relativo, f′(2)=0: 12−12+b=0, luego b=0. Entonces f′(x)=3x(x−2).',
        'Recta real de signos de f′: positiva en (−∞,0), negativa en (0,2) y positiva en (2,+∞); por ello x=2 es, efectivamente, un mínimo relativo.',
        'Usamos f(2)=−9: 8−12+c=−9, de donde c=−5. Por tanto a=−3, b=0 y c=−5.'
      ]) }),
      evidence: Object.freeze({ sourceFile: 'Mates II_1_2013.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PROMPT_WITHOUT_NEXT_EXERCISE_TAIL' })
    }),
    'pau-can-ex-ecf8d5753e523a9d4ba57b6181f5b826': Object.freeze({
      learnerStatement: 'Sea la función definida por f(x)=piecewise{x²/2 if x≤0;x³−4x² if 0<x≤4;1−4/x if x>4}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_1_2010.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_3_BRANCHES' })
    }),
    'pau-can-ex-f0f1e51a6c22f7cc4dda5018474131e0': Object.freeze({
      learnerStatement: '', learnerStatementHtml: undefined,
      singlePartText: 'Se sabe que la función f:ℝ→ℝ, dada por f(x)=piecewise{sen(x)+ax+b if x≤0;ln(x+1)/x if x>0} (ln denota la función logaritmo neperiano), es derivable. Calcula a y b.',
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2019.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PIECEWISE_PROMPT' })
    }),
    'pau-can-ex-f273b19e64fa688bd809e80020c461b2': Object.freeze({
      learnerStatement: 'Sea la función f(x)=piecewise{x²/a+1 if x≤2;x+a if x>2}, con a>0.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_3_2016.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    }),
    'pau-can-ex-f464f307ab60d9bcd3dbc2a97f726057': Object.freeze({
      learnerStatement: 'Considera el sistema de ecuaciones lineales dado por AX=B, siendo A=[[1,1,1],[2,0,3],[1,3,m−2]], X=[[x],[y],[z]] y B=[[m],[2m+1],[m−1]].', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_extra_2017.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_MATRIX_VECTOR_SYSTEM' })
    }),
    'pau-can-ex-f85f6841e058e030446e85c7e227eb78': Object.freeze({
      learnerStatement: 'Sea la función f(x)=piecewise{1/(x−4) if x≤0;x+3 if 0<x<2;x²+1 if x≥2}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_3_2017.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_3_BRANCHES' })
    }),
    'pau-can-ex-f9d84ecfd51ae23618aca87ebeae2bf5': Object.freeze({
      learnerStatement: 'Sea f:ℝ→ℝ la función definida por f(x)=piecewise{(x+cos(x)−aeˣ)/x² if x≠0;b if x=0}.', learnerStatementHtml: undefined,
      singlePartText: 'Halla a y b sabiendo que f es continua.',
      evidence: Object.freeze({ sourceFile: 'Mates II_6_2015.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_SINGLE_PIECEWISE_PROMPT' })
    }),
    'pau-can-ex-fb4fca3ecb848d9c39b37a078931bb7a': Object.freeze({
      learnerStatement: 'Considera las rectas r≡system{x=2−3λ;y=3+5λ;z=λ} y s≡system{x+y−1=0;z−5=0}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'Mates II_3_2013.pdf', page: 2, rule: 'PHASE29_SOURCE_VERIFIED_TWO_LINES' })
    }),
    'pau-can-ex-ff946ded46638652d21d6f7ff1a46ec4': Object.freeze({
      learnerStatement: 'Se considera la función f(x)=piecewise{(x−5)/(x−4) if x<3;−x²+7x−10 if x≥3}.', learnerStatementHtml: undefined,
      evidence: Object.freeze({ sourceFile: 'CCSS II_4_2018.pdf', page: 1, rule: 'PHASE29_SOURCE_VERIFIED_PIECEWISE_2_BRANCHES' })
    })
  });

  function applyOverride(exercise) {
    const key = exercise?.exerciseId || exercise?.parentExerciseId;
    const override = overrides[key] || phase29Overrides[key];
    if (!override) return exercise;
    const bySuffix = new Map();
    for (const part of exercise.parts || []) {
      const key = suffix(part);
      if (!bySuffix.has(key)) bySuffix.set(key, part);
    }
    let parts;
    if (override.partOrder) {
      parts = override.partOrder.map((key) => {
        const part = bySuffix.get(key);
        return part ? { ...part, label: `${key})`, text: override.partText[key], html: undefined } : null;
      }).filter(Boolean);
    } else {
      parts = (exercise.parts || []).map((part, index) => index === 0 && override.singlePartText
        ? { ...part, text: override.singlePartText, html: undefined }
        : part);
    }
    if (override.partSolutionSteps) {
      parts = parts.map((part) => {
        const key = suffix(part) || 'main';
        return override.partSolutionSteps[key]
          ? { ...part, solutionSteps: [...override.partSolutionSteps[key]] }
          : part;
      });
    }
    return {
      ...exercise,
      text: override.learnerStatement,
      learnerStatement: override.learnerStatement,
      learnerStatementHtml: override.learnerStatementHtml,
      statementHtml: undefined,
      parts,
      sourceAppVisualCorrection: override.evidence,
      publicationState: 'LOCAL_CORRECTED_AFTER_SOURCE_APP_VISUAL_PARITY'
    };
  }

  const correctedExercises = runtime.exercises.map(applyOverride);
  const mapRecords = (records) => records.map(applyOverride);
  const mapBanks = (banks) => Object.fromEntries(Object.entries(banks).map(([key, records]) => [key, mapRecords(records)]));

  globalScope.ANDALUCIA_PAU_RUNTIME = Object.freeze({
    ...runtime,
    version: `${runtime.version}+source-app-visual-parity-1`,
    exercises: Object.freeze(correctedExercises),
    sourceAppVisualCorrectionTotal: Object.keys(overrides).length + Object.keys(phase29Overrides).length,
    banks(courseId) { return mapBanks(runtime.banks(courseId)); },
    topicRecords(courseId, topicIndex) { return mapRecords(runtime.topicRecords(courseId, topicIndex)); },
    blockRecords(courseId, blockId) { return mapRecords(runtime.blockRecords(courseId, blockId)); },
    examSlotRecords(courseId, slot) { return mapRecords(runtime.examSlotRecords(courseId, slot)); },
    challengeRecords(courseId) { return mapRecords(runtime.challengeRecords(courseId)); }
  });
})(typeof window !== 'undefined' ? window : globalThis);
