import assert from 'node:assert/strict';
export const areaResourceObservations=[
 [50,'fa0cbbddfdf34b1f9fcf8d1090c2d0c3f13e5353e06da22ec354d3345e313584',1,'A.1','8cf88f16e2c963643d5273b32e0023a8a36faa53ed6d38579a55f16e5463784d',0],
 [111,'a56739d297d4dc220d6898b24cf729dc556401a6bb292b8ca7cfb58c01c31651',2,'B.1','a3a28fdb1a5162fca0f064ace118b70b8dc7330f8b98b798d4879e37d9d88aff',0],
 [153,'2363de4efb5db3255c564620c811bcac1a16eb63e20050dff43874826ada23c4',1,'3','7443980d4386725818e49251b30414ada795e63394e0c26a1f7afd2adf61cc20',0],
 [216,'cb44cc1136c3a49a889caa64ff407575afb2c418b60865e4e4f471196031da06',1,'2','658f8df0a42b608ecbd49471616d83c285b92d7db4ef534b2364b6e83fb428cd',0],
];
export function areaResourceReplacements(r){const i=r.queueIndex;if(i===50)return[[r.sourceLiteral,r.sourceLiteral.replace(/^OPCIÓN A\s*/,'').replaceAll('bene\u001ccio','beneficio').replaceAll('¾','¿'),'PDF_VISIBLE_LIGATURE_QUESTION_MARK_AND_EDITORIAL_OPTION']];if(i===111)return[];if(i===216)return[['\n\n                                               BLOQUE B','','PDF_VISIBLE_NEXT_BLOCK_HEADING_OUTSIDE_EXERCISE']];if(i!==153)return[];const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>0);return[
 [r.sourceLiteral.slice(0,at),'El área quemada de la región plana de la cubierta de plástico de un invernadero, coincide con el área de la región acotada delimitada por las gráficas de las funciones f(x)=(x−1)² y g(x)=5−2x donde x está expresado en metros.\n\n','PDF_VISIBLE_BOTH_FUNCTIONS_AND_COORDINATE'],
 [r.parts[1].prompt,'Para reparar la región quemada, se ha de utilizar plástico cuyo coste es de 15 euros por metro cuadrado. Si en el trabajo de reparación se desperdicia la tercera parte del plástico adquirido, ¿cuánto costará el plástico comprado?','PDF_VISIBLE_UNIT_PRICE_15'],
 ];}
