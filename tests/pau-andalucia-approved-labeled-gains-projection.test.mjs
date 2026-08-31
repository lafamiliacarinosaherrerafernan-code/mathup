import test from 'node:test';import assert from 'node:assert/strict';
import {buildLabeledGainsBatch} from '../scripts/resolve-andalucia-doc-labeled-gains-2012.mjs';
import {projectApprovedLabeledGains} from '../scripts/project-andalucia-approved-labeled-gains.mjs';
import {renderLabeledSourceFragment} from '../scripts/render-andalucia-labeled-matrices.mjs';
test('approved F/G layout projects reversibly with both sets of headers and every cell',()=>{
 const r=buildLabeledGainsBatch().batch.records[0],p=projectApprovedLabeledGains(r),c=p.changes[0];
 assert.equal(p.text.slice(0,c.outputOffset)+c.before+p.text.slice(c.outputOffset+c.after.length),r.sourceLiteral);
 assert.ok(p.text.includes('F=[[100,150,80],[200,250,140]]; G=[[6,8,5],[4,5,3]]'));
 assert.equal(p.statementLayout.matrices.length,2);
 for(const m of p.statementLayout.matrices){assert.deepEqual(m.columnHeaders,['A','B','C']);assert.deepEqual(m.rowHeaders,['grande','normal']);}
 const html=renderLabeledSourceFragment({text:x=>x},p.text,p.statementLayout);
 assert.equal((html.match(/data-column=/g)||[]).length,6);assert.equal((html.match(/data-cell=/g)||[]).length,12);
 assert.ok(!html.includes('A        B       C'));assert.ok(!/puntos?\)/.test(html));
 assert.equal(p.evidence.humanApproval,false);assert.equal(p.evidence.reconstructionSha256,'f152e84ef8985c54ad42b77818407b9038fdbc25d6b2fbae6a6e6c75a21beac7');
});
test('subparts and all numerical results remain unchanged by the approved source layout',()=>{
 const r=buildLabeledGainsBatch().batch.records[0],p=projectApprovedLabeledGains(r);
 for(const part of r.parts)assert.deepEqual(p.projectFragment(part.prompt),{text:part.prompt,changes:[]});
 assert.throws(()=>projectApprovedLabeledGains({...r,exerciseId:'unrelated'}));
 assert.throws(()=>projectApprovedLabeledGains({...r,sourceLiteral:r.sourceLiteral.replace('A        B       C','A B D')}));
 assert.deepEqual(projectApprovedLabeledGains(r).text,p.text);
});
