import test from 'node:test';
import assert from 'node:assert/strict';
import {renderLabeledMatrixPair,renderLabeledSourceFragment} from '../scripts/render-andalucia-labeled-matrices.mjs';
import {coffeeLabels} from '../scripts/resolve-andalucia-matrix-coffee-labels.mjs';
import {coffeeStatement,coffeeMatrixAnchor} from '../scripts/andalucia-matrix-coffee-pdf-evidence.mjs';

test('source matrix layout preserves twelve numeric cells and explicit row/column anchors',()=>{
 const h=renderLabeledMatrixPair(coffeeLabels);
 assert.equal((h.match(/data-cell=/g)||[]).length,12);
 assert.equal((h.match(/data-column=/g)||[]).length,6);
 assert.equal((h.match(/data-row=/g)||[]).length,4);
 assert.equal((h.match(/data-matrix=/g)||[]).length,2);
 assert.ok(h.includes('flex-wrap:wrap'));
 assert.ok(!/position:absolute|&nbsp;/.test(h));
 for(const m of coffeeLabels.matrices){
  const s=h.split(`data-matrix="${m.label}"`)[1].split('</section>')[0];
  for(let i=0;i<2;i++)for(let j=0;j<3;j++)assert.ok(s.includes(`data-cell="${i}:${j}" style="grid-row:${i+2};grid-column:${j+3};text-align:center;align-self:center">${m.values[i][j]}</span>`));
 }
});
test('labeled source projection replaces only an exact unique source anchor',()=>{
 const renderer={text:t=>`<text>${t}</text>`};
 const h=renderLabeledSourceFragment(renderer,coffeeStatement,{anchor:coffeeMatrixAnchor,...coffeeLabels});
 assert.ok(h.startsWith('<text>a) Dadas las matrices'));
 assert.ok(h.endsWith('diagonal principal de la matriz resultante.</text>'));
 assert.ok(!h.includes(coffeeMatrixAnchor));
 assert.throws(()=>renderLabeledSourceFragment(renderer,'missing',{anchor:coffeeMatrixAnchor,...coffeeLabels}));
 assert.throws(()=>renderLabeledSourceFragment(renderer,coffeeMatrixAnchor.repeat(2),{anchor:coffeeMatrixAnchor,...coffeeLabels}));
});
test('matrix labels are escaped; malformed or inferred cells are rejected',()=>{
 const v=structuredClone(coffeeLabels);v.matrices[0].columnHeaders[0]='<A>';
 assert.ok(renderLabeledMatrixPair(v).includes('&lt;A&gt;'));
 v.matrices[0].values[0][0]='unknown';assert.throws(()=>renderLabeledMatrixPair(v));
});
