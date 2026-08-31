import assert from 'node:assert/strict';
export const matrixClosingObservations=[
 [1355,'463bf63d4697a18a0b9efc9287e7b0a593c803bab98a3cfab0e260067a0dd02c',1,'1','93b4c79a734c18244f804a72d499cc6b8ec4e4ebe97515131be537c3a9eb8b64',0],
 [1395,'a56739d297d4dc220d6898b24cf729dc556401a6bb292b8ca7cfb58c01c31651',1,'A.1','b052dc50624de87dc8caed7e78a94de24b6e98f1cbfd4214739be9c1bf1d17e0',0],
 [1396,'4440c15a31a77ee9e052a0668923508e117795b369d569bc02d24b7937366f7a',1,'A.1','754b55880cb1ea19e7d73aa1102185bf3be968889f1addfb230549206cd50638',0],
 [1411,'7a09a02641ea8de345b94f49b27515e58436e032c7401867f86dc523490a3ea5',1,'A.1','f59197e7886df06134fca9d85ca9ba5f6a54607c4c1604912302e1268f99028f',0],
 [1423,'bebc339cfd8f69c7c4fae160fd165eaef5f6bc93cfd6d15cb9ce289b7029d167',1,'A.1','cc0460014d57eee31a024f4220800f8dcb71e50e0e42b43de10f8a84fd26ad16',0],
 [1454,'0ec47068f398394bba4901a0d047f7de46cc80f3f23ff1c127872d8d1627eb40',1,'1','535198ca8da6c5605bda316a7e4d57a17ce10b06d859b67f45c79beb1ec2bfeb',0],
 [1529,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',2,'B.1','5776adf9b7cb2ab6db372d2ab470b7e41a4903c985625743d92f2c33124c4dcb',0],
 [1596,'4a6c7d34ff35c3e7678c52970b4d4558cee2c35224b46c66035cb0bc8d5a7ec8',1,'2','9dedd3ee56590fa90828fc04e225d780bdc79dd26cf4f6f17b356b94549f65d3',0],
];
export function matrixClosingReplacements(record){
 const i=record.queueIndex;if(!matrixClosingObservations.some(o=>o[0]===i))return[];
 const at=record.sourceLiteral.indexOf('a) (');assert.ok(at>0);
 const prefixes={
 1355:'Sean A, B, X, Y matrices invertibles que verifican A·X=B y B·Y=A.',
 1395:'Sean las matrices A=[[1,-1,2],[0,1,-1],[1,0,2]], B=[[1,2,1],[1,-2,0]], C=[[2,1]], D=[[1,-1,2]].',
 1396:'Sean las matrices A=[[1,2],[-1,2]], B=[[1,2,2],[-1,-1,2]], C=[[8,-4],[12,8],[-8,4]].',
 1411:'Sean las matrices A=[[1,0,1],[0,1,1]] y B=[[0,1],[1,0],[1,1]].',
 1423:'Las filas de la matriz P indican los respectivos precios de tres artículos A₁, A₂ y A₃ en dos comercios, C₁ (fila 1) y C₂ (fila 2): P=[[25,20,15],[23,25,17]].\nCati desea comprar 2 unidades del artículo A₁, 1 de A₂ y 3 de A₃.\nManuel desea comprar 5 unidades de A₁, 1 de A₂ y 1 de A₃.\nHan dispuesto esas compras en la matriz Q: Q=[[2,1,3],[5,1,1]].',
 1454:'Se consideran las matrices A=[[1,1,2],[-2,0,1],[0,-1,-1]], B=[[-2,1],[3,1],[0,2]], C=[[1,2],[-1,-1],[-2,3]].',
 1529:'Se consideran las matrices A=[[1,1,3],[1,2,-1],[1,-1,-1]], B=[[2],[3],[0]].',
 1596:'Se consideran las matrices A=[[a,4],[6,8]], B=[[2,2],[3,3]] y C=[[1,2]].',
 };
 const result=[[record.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_MATRIX_ROWS_COLUMNS']];
 const pp=(k,s)=>result.push([record.parts[k].prompt,s,'PDF_VISIBLE_MATRIX_EXPRESSION_OR_INSTRUCTION']);
 if(i===1355){pp(0,'Compruebe que Y⁻¹=X.');pp(1,'Para A=[[1,2],[1,3]] y B=[[2,1],[0,-1]], halle X e Y.');}
 if(i===1395){pp(0,'Estudie cuáles de los siguientes productos de matrices se pueden realizar, indicando las dimensiones de la matriz resultante: A·B^{t}; C^{t}·D; B^{t}·D; D·B^{t}.');pp(1,'Despeje la matriz X en la ecuación X·A⁻¹+2B=3C^{t}·D, sin calcular sus elementos.');pp(2,'Calcule la matriz A·(B^{t}−2D^{t}·C).');}
 if(i===1396){pp(0,'Calcule A^{2}.');pp(1,'Resuelva la ecuación matricial A·X+4B=C^{t}.');}
 if(i===1411){pp(0,'Justifique cuáles de las siguientes operaciones pueden realizarse y, en tal caso, calcule el resultado: A^{2}; A−B; A·B; A·B^{t}.');pp(1,'Halle la matriz X tal que A^{t}+B·X=3B.');}
 if(i===1423){pp(0,'Calcule P·Q^{t} y Q·P^{t} e indique el significado de los elementos de las matrices resultantes.');pp(1,'A la vista de lo obtenido en el apartado anterior, ¿dónde les interesa hacer la compra a cada uno?');}
 if(i===1454){pp(0,'Determine la matriz X que verifica A·X+B=A^{2}·C.');pp(1,'Determine las dimensiones de dos matrices P y Q sabiendo que A·P^{t}+C=C·(Q·B).');}
 if(i===1529){pp(0,'Justifique que la matriz A tiene inversa y calcule A⁻¹.');pp(1,'Calcule, si existe, la matriz X que satisface la ecuación matricial A·X=B.');}
 if(i===1596){pp(0,'Calcule el valor del parámetro a para que la matriz A no tenga inversa.');pp(1,'Para a=3, resuelva la ecuación matricial X·A−X·B=C.');pp(2,'Para a=3, compruebe que A^{2}=11·A y exprese A^{8} en función de la matriz A.');}
 return result;
}
