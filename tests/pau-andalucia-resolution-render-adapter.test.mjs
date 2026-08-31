import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import '../math-renderer.js';
import {separateEditorialScores,isNumericMatrix,renderCandidateValue,nativeRelationRanges,projectRendererPiecewise,projectRendererMath} from '../tools/pau-resolution-render-check/value-adapter.mjs';

test('two bounded integrals preserve two independent bound pairs',()=>{
 const html=renderCandidateValue(globalThis.MargaritaMathRenderer,'A=∫_{0}^{2} (f−g)dx + ∫_{2}^{4} (f−g)dx');
 assert.equal((html.match(/data-math-native="integral"/g)||[]).length,2);
 assert.equal((html.match(/<msubsup>/g)||[]).length,2);
 assert.match(html,/aria-label="integral de 0 a 2"/);
 assert.match(html,/aria-label="integral de 2 a 4"/);
 assert.ok(!html.includes('∫_'));
});

test('bounded integrals preserve nested and adjacent bounds without leaking raw HTML',()=>{
 const samples=[
  ['∫_8^{10}frac{1}{x} dx','integral de 8 a 10'],
  ['∫_0^{root{3}{3}}frac{1}{x} dx','integral de 0 a &#8731;3'],
  ['∫_0^(√a/2)(x+1) dx','integral de 0 a &#8730;a/2'],
  ['∫_0^2(√(2x)−1) dx','integral de 0 a 2'],
 ];
 for(const [literal,evidence] of samples){
  const html=globalThis.MargaritaMathRenderer.fragment(literal);
  assert.equal((html.match(/data-math-native="integral"/g)||[]).length,1,literal);
  assert.equal((html.match(/<msubsup>/g)||[]).length,1,literal);
  assert.ok(html.includes(`aria-label="${evidence}"`),literal);
  assert.ok(!html.includes('∫_'),literal);
  assert.ok(!/<span(?:<|&lt;)/.test(html),literal);
 }
});

test('balanced fractions protect generated HTML and render greek radicands',()=>{
 const html=globalThis.MargaritaMathRenderer.fragment('frac{3}{√π}');
 assert.equal((html.match(/class="math-fraction"/g)||[]).length,1);
 assert.equal((html.match(/class="math-root"/g)||[]).length,1);
 assert.ok(html.includes('radicand">π</span>'));
 assert.ok(!/<span(?:<|&lt;)/.test(html));
});

test('solution prose mentioning a system does not absorb later pedagogical steps',()=>{
 const literal='Paso 3. El determinante del sistema depende de λ.\ndet(A)=−5λ\nPaso 4. Para λ=0 se cumple rango(A)=2.\nλ=0 ⇒ compatible indeterminado';
 const html=globalThis.MargaritaMathRenderer.text(literal);
 assert.ok(!html.includes('class="math-system'));
 assert.ok(html.includes('Paso 4.'));
 assert.equal((html.match(/<br>/g)||[]).length,3);
});

test('named explicit systems retain labels and every equation while using native system layout',()=>{
 const literal='Considera las rectas\nr: system{x=1+λ;y=1+λ;z=2+mλ}\ns: system{x−y+2z=3;x+z=2}',p=projectRendererMath(literal);
 assert.equal(p.text,'Considera las rectas\nr:\nsystem{x=1+λ;y=1+λ;z=2+mλ}\ns:\nsystem{x−y+2z=3;x+z=2}');
 assert.equal(p.text.replace(/\s/g,''),literal.replace(/\s/g,''));
 const stage=p.stages[1];let restored=stage.text;for(const c of [...stage.changes].reverse())restored=restored.slice(0,c.start)+c.literal+restored.slice(c.start+c.replacement.length);assert.equal(restored,literal);
 const html=renderCandidateValue(globalThis.MargaritaMathRenderer,literal);assert.equal((html.match(/class="math-system /g)||[]).length,2);assert.ok(!html.includes('system{'));
 assert.equal(projectRendererMath(p.text).text,p.text);assert.equal(projectRendererMath('Explicación: system{x=1;y=2}').text,'Explicación: \nsystem{x=1;y=2}');
});

test('explicit inline systems preserve prose, punctuation and nested fractions reversibly',()=>{
 const literal='Sea r definida por system{x+2y−z=3;2x−y+z=1}. Otra: system{x=frac{1}{2};y=3} y su plano.';
 const p=projectRendererMath(literal),stage=p.stages.at(-1);
 assert.equal(p.text.replace(/\s/g,''),literal.replace(/\s/g,''));
 let restored=stage.text;for(const c of [...stage.changes].reverse())restored=restored.slice(0,c.projectedStart)+c.literal+restored.slice(c.projectedStart+c.replacement.length);
 assert.equal(restored,literal);assert.equal(projectRendererMath(p.text).text,p.text);
 const html=renderCandidateValue(globalThis.MargaritaMathRenderer,literal);
 assert.equal((html.match(/class="math-system /g)||[]).length,2);assert.ok(!html.includes('system{'));
 assert.throws(()=>projectRendererMath('Sea system{x=1;y=2'),/SYSTEM_STRUCTURE_REVIEW_REQUIRED/);
});
test('explicit piecewise transport preserves branches and renders with the existing engine',()=>{
 const literal='f(x)=piecewise{x−x² si x<1;x²−x si x≥1}';
 const p=projectRendererPiecewise(literal);
 assert.equal(p.originalText,literal);assert.equal(p.text,'f(x)={x−x² si x<1;x²−x si x≥1}');
 assert.equal(p.changes[0].literal,literal.slice(p.changes[0].start,p.changes[0].end));
 assert.equal(projectRendererPiecewise('f(x)=piecewise{frac{1}{x} si x<0;e^{−x} si x≥0}').text,'f(x)={frac{1}{x} si x<0;e^{−x} si x≥0}');
 const html=renderCandidateValue(globalThis.MargaritaMathRenderer,literal);
 assert.ok(!html.includes('piecewise{'));assert.ok(html.includes('piecewise'));
 assert.throws(()=>projectRendererPiecewise('f(x)=piecewise{x,x<1;y,x≥1}'),/REVIEW_REQUIRED/);
 assert.throws(()=>projectRendererPiecewise('f(x)=piecewise{x si x<1;y si x≥1'),/REVIEW_REQUIRED/);
});
test('la proyección separa puntuaciones sin perder literal ni offsets',()=>{
 const s='a) (1 punto) x=1; b) (1,5 puntos) x=2; c) (1.5 puntos) x=3';const x=separateEditorialScores(s);
 assert.equal(x.originalText,s);assert.equal(x.scoreEvidence.length,3);assert.equal(x.learnerText,'a)  x=1; b)  x=2; c)  x=3');
 for(const e of x.scoreEvidence)assert.equal(s.slice(e.start,e.end),e.literal);
 assert.equal(separateEditorialScores('P(1)=2; intervalo (1,5); punto (2,5)').learnerText,'P(1)=2; intervalo (1,5); punto (2,5)');
});
test('matrices tipadas usan la función del motor sin convertirlas a object Object',()=>{
 const seen=[];const engine={text:s=>s,matrix:m=>{seen.push(m);return '<matrix/>';}};
 const matrices={enero:[[9,5],[3,7],[4,6]],febrero:[[18,10],[6,14],[5,7]]};const before=JSON.stringify(matrices);
 assert.equal(isNumericMatrix(matrices.enero),true);const html=renderCandidateValue(engine,matrices);
 assert.equal(seen.length,2);assert.ok(html.includes('enero'));assert.equal(JSON.stringify(matrices),before);assert.ok(!html.includes('object Object'));
 assert.throws(()=>renderCandidateValue(engine,{unknown:'shape'}),/ADAPTER_REQUIRED/);
 assert.equal(isNumericMatrix([[1],[2,3]]),false);
});
test('el motor público conserva tres filas y dos columnas de una matriz tipada',()=>{
 const html=renderCandidateValue(globalThis.MargaritaMathRenderer,[[9,5],[3,7],[4,6]]);
 assert.equal((html.match(/class="matrix-row"/g)||[]).length,3);
 assert.ok(html.includes('--matrix-columns:2'));
 assert.ok(!html.includes('[[9'));assert.ok(!html.includes('object Object'));
});
test('native equality wrapping preserves all official Equation.3 tokens and only uses explicit separators',()=>{
 const records=fs.readFileSync('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse);
 const block=records.flatMap(r=>r.learnerContent).find(b=>b.objectId==='adobj-61f8d5d809881c49-010');
 const before=JSON.stringify(block),ranges=nativeRelationRanges(block.mathAst),nodes=block.mathAst.body.children;
 assert.equal(ranges.length,3);assert.deepEqual(ranges.flatMap(([a,b])=>nodes.slice(a,b)),nodes);assert.equal(JSON.stringify(block),before);
 const op=value=>({type:'operator',value}),id=value=>({type:'identifier',value}),space={type:'space',value:' '};
 const ast=children=>({body:{type:'sequence',children}});
 for(const objectId of ['adobj-8446c5da6b4b7cfc-001','adobj-a5dfff58dac253bf-005','adobj-a5dfff58dac253bf-001']){
  const b=records.flatMap(r=>r.learnerContent).find(b=>b.objectId===objectId),original=JSON.stringify(b),n=b.mathAst.body.children,r=nativeRelationRanges(b.mathAst);
  assert.equal(r.length,3);assert.deepEqual(r.flatMap(([a,z])=>n.slice(a,z)),n);assert.equal(JSON.stringify(b),original);
 }
 assert.equal(nativeRelationRanges(ast([id('x'),op('='),id('1'),op(','),id('5')])),null,'decimal comma is not a line break');
 assert.equal(nativeRelationRanges(ast([id('f'),op('('),id('x'),op(','),space,id('y'),op(')'),op('='),id('0')])),null,'function arguments stay grouped');
 assert.equal(nativeRelationRanges(ast([id('x'),op(','),space,id('y')])),null,'not complete equality clauses');
 assert.equal(nativeRelationRanges(ast([id('A'),op('='),id('x'),space,id('y'),space,id('C'),op('='),id('0')])),null,'a variable y is not a matrix-list conjunction');
 assert.equal(nativeRelationRanges(ast([op('('),id('x'),op('='),id('0'),op(','),space,id('y'),op('='),id('1')])),null,'unbalanced delimiter rejected');
});
