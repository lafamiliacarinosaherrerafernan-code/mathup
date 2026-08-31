// Readings of the official pages, retained separately from immutable extracted literals.
import assert from 'node:assert/strict';
export const matrixExpandedObservations=[
 [430,'493e877200ccb29cbe7b956aa9b356cda37760b602bb067a7e047a9b4bebb476',1,'1','54a8557c27718da2595ada92a75c26ccaeb1332b6027c111c79f3ce7247a9905',0],
 [440,'d28871f7f203cf1be9e479e9d642cdb6b1623704a8b76a2b57cfa2d12950f293',2,'B.1','87759c25156bfe54258c7926a17fe1e1f9fee0324c262188cb71b8c854ff824b',0],
 [460,'35f960392892cf4aa4b4a3e5b0a7b6150b323d584bb033f75db6a182b19206d4',1,'A.1','ef213e1900de4ef3c85bccd8041ff9ab76b211ebad2c2a74dfdee9e32c8cc4bd',0],
 [474,'c41ea8ffe46f2de3a4d7f82e43def97322e29653182ad3df54a57e2ead2beb19',1,'A.1','1a070a8489429ec2e9fe8a42e5e39f596d2e0caf83e7554430ee7bbb75276e86',0],
 [486,'ee5bd8e23465d55ed58339e7d9adf3d58423ac2966b53d92e39a2f9b35558ab1',1,'A.1','fd9bd3f0e5223f2c7de006477ab057c25a0ee2ef2610e96936b4634f5df9c4cf',0],
 [503,'548f60ee334516c7fa918dba3c28fb3ea5fe753cf76eb05402d7b8acb5a3b560',1,'1','6cf551a75ab45ef849e4972531c5d613910522acbaa5e93342ff75831b321b6a',0],
 [521,'c637bbde5c26c0b35b59202bd832ddc97990d3845365ce483fbf2a49832f73fe',1,'A.1','ff9feb1c17209fa24dfe59e4ae6ea8d0cb935778967517c034c538db1f69f57d',0],
 [524,'375424f4e0d3c0409619ebaae4ae4d20c441a2585efe3dc74eb98d765114311e',1,'A.1','6f22a0eb38d90d8f3cd543bf96b57a46843834e0afb2a6a696615885a956f85b',0],
];
export function matrixExpandedReplacements(record){
 const i=record.queueIndex;if(!matrixExpandedObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>=0);
 const prefixes={430:'Se consideran las matrices A = [[1,1,-2],[a−3,a−1,1],[0,2,a]], B = [[−1,3,2]], C = [[−2,1,4]], siendo a un número real.\n\n',440:'Se consideran las matrices A = [[0,1,−1],[2,−1,0]], B = [[2,0],[−2,1],[0,1]], C = [[1,2],[2,−3]].\n\n',460:'',486:'Sean las matrices A = [[1,−7],[2,−1]] y B = [[1,0],[−5,2]].\n\n',503:'Se considera la matriz A = [[2,1,0],[1,0,2],[0,2,a]].\n\n',521:'Sean las matrices A = [[1,2],[−1,−3]], B = [[2,−1,3],[4,0,1]] y C = [[−1,1,0],[2,3,−2]].\n\n',524:'Sean las matrices B = [[−5,0],[4,6]] y C = [[−1,−8,−1],[−9,3,6]].\n\n'};
 const r=[];if(at>0)r.push([record.sourceLiteral.slice(0,at),prefixes[i],i===440?'PDF_MATRIX_PREFIX_AND_EXCLUDED_PREVIOUS_EDITORIAL_INSTRUCTION':'PDF_VISIBLE_MATRIX_ROWS_COLUMNS']);
 const add=(a,b,rule='PDF_VISIBLE_MATRIX_OPERATOR_OR_EXPONENT')=>r.push([a,b,rule]);
 const replacePart=(p,text)=>add(record.parts[p].prompt,text,'PDF_VISIBLE_MATRIX_ROWS_COLUMNS');
 if(i===430){add('𝐶𝑡','C^{t}');for(const[a,b]of[['𝐴','A'],['𝐵','B'],['𝐶','C'],['𝐷','D'],['𝑋','X'],['𝑎','a']])add(a,b);}
 if(i===440){add('¾Tiene','¿Tiene');add('Justi\u001cque','Justifique');add('a\u001crmativo','afirmativo');add('(A · B − C)−1','(A · B − C)^{-1}');add('Ct','C^{t}');}
 if(i===460){replacePart(0,'Se consideran las matrices A = [[3,1],[5,2]] y B = [[2,1],[3,2]]. Determine la matriz X que verifica B·X = 3A + A^{t}.');replacePart(1,'Calcule la matriz Y que verifica [[2,5],[1,−5],[2,−1]]·Y = [[6],[−12],[−6]].');}
 if(i===474){replacePart(0,'Si A es una matriz de dimensión m×n, indique la dimensión de una matriz X si se verifica que (A^{t}·A)·X = Iₙ.');replacePart(1,'Calcule dicha matriz X en el caso en que A = [[1,1],[1,−1],[1,1]].');add('At','A^{t}');}
 if(i===486){add('Bt','B^{t}');add('I 2','I₂');}
 if(i===503){replacePart(0,'Determine para qué valores del parámetro a, la matriz A tiene inversa.');replacePart(2,'Para a = 1, resuelva la ecuación matricial A·X = B^{t}, siendo B = [[0,1,−1]].');}
 if(i===521){add('A2','A^{2}');add('Ct','C^{t}');for(const[a,b]of[['','('],['',')'],['','·'],['','+'],['','=']])add(a,b);}
 if(i===524){add('C t','C^{t}');add('a31','a_{31}');add('a12','a_{12}');add('a22','a_{22}');}
 return r;
}
