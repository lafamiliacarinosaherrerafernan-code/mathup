import assert from 'node:assert/strict';
export const polynomialDomainObservations=[
 [220,'77e0c295529ccd4ed502b5859d4011cb4b0e955a1e4795e570a9da20ae48293c',1,'2','0af4794f75586094cf4ac6fcd33ecd71d122b8fa627565cc62b8bd4758a1b14f',0],
 [375,'d28871f7f203cf1be9e479e9d642cdb6b1623704a8b76a2b57cfa2d12950f293',2,'2','87759c25156bfe54258c7926a17fe1e1f9fee0324c262188cb71b8c854ff824b',0],
 [420,'24c494a5d013dbc7f5adaac9896dee2d79f22540518359c67eac29945a26d4f0',2,'2','8993d81c7d4ac225b0e2b2924cbb8f14e58bdf8ae197e5c976fd6c0a174de603',0],
 [497,'fc025a25faa338cbb9d8d288443f0322dfbcc0464f7474a16a84e8dfe47f81d1',2,'2','27d381d93cd700245bcc6ad1ff68675812468111e6eb141ec25d1305a750d1a6',0],
 [506,'601fd1292e7d6b21ceecde2856a283e0e929d02d4e314d97fd7062bda846650a',1,'2','5b74a93bc857a55b03855316140f7501f0bb24467d74042c75dbe2c7eaca8dd0',0],
 [529,'feb2acf9edc82ad3efbac4f8abf58b3e863451adddf04a82870066e873ab63fd',2,'2','f9670cd744e2ddd48e1b50150038508c5d9fdb6700b455f4a66dd27ba86d28fd',0],
 [597,'463bf63d4697a18a0b9efc9287e7b0a593c803bab98a3cfab0e260067a0dd02c',1,'3','93b4c79a734c18244f804a72d499cc6b8ec4e4ebe97515131be537c3a9eb8b64',0],
];
export function polynomialDomainReplacements(r){const i=r.queueIndex;
 if(i===220){const at=r.sourceLiteral.indexOf('a) (');assert.ok(at>0);return[[r.sourceLiteral.slice(0,at),'Una entidad financiera lanza al mercado un plan de inversión cuya rentabilidad, R(x), en miles de euros, viene dada por la función R(x)=−0.001x²+0.5x+2.5, 1≤x≤500, donde x es la cantidad de dinero invertida en miles de euros.\n\n','PDF_VISIBLE_QUADRATIC_COEFFICIENTS_AND_DOMAIN']];}
 if(i===375)return[
  ['D(x) = −200 x3+2 100 x2−7 200 x+10 000','D(x)=−200x³+2100x²−7200x+10000','PDF_VISIBLE_CUBIC_AND_SQUARE'],
  ['¾Cuál','¿Cuál','PDF_VISIBLE_OPEN_QUESTION_MARK'],
 ];
 if(i===420)return[['f (x) = −x2 + 11x −10','f(x)=−x²+11x−10','PDF_VISIBLE_SQUARE']];
 if(i===497)return[['S (t) = 660 − 231t + 27t 2 − t 3','S(t)=660−231t+27t²−t³','PDF_VISIBLE_SQUARE_AND_CUBE']];
 if(i===506){const at=r.sourceLiteral.indexOf('a) (');assert.ok(at>0);return[[r.sourceLiteral.slice(0,at),'Sea la función f(x)=x³−12x+1.\n\n','PDF_VISIBLE_CUBIC_AND_PRIVATE_FONT_SYMBOLS']];}
 if(i===529){const at=r.sourceLiteral.indexOf('a) (');assert.ok(at>0);return[[r.sourceLiteral.slice(0,at),'Sea la función f(x)={(x+1)² si x≤1; frac{4}{x} si x>1}.\n\n','PDF_VISIBLE_PIECEWISE_SQUARE_FRACTION_AND_BRANCH_CONDITIONS']];}
 if(i===597)return[
  ['f (x) = ax3 + bx + 4','f(x)=ax³+bx+4','PDF_VISIBLE_CUBE'],
  [r.parts[2].prompt,'Para a=4 y b=−3, calcule la función F(x) que verifica F′(x)=f(x) y F(2)=10.','PDF_VISIBLE_PRIME_ON_CAPITAL_F_AND_FI_LIGATURE'],
 ];return[];
}
