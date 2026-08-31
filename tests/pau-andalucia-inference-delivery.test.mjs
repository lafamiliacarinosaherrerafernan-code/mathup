import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {prepare,publicComponents,candidateRuntime,baselineRuntime,digest,projectStatement,projectEditorialText,projectProbabilityNotation,projectRegionVariable,projectEquationSpacing,projectSystemFractionTransport} from '../scripts/prepare-andalucia-inference-delivery.mjs';
import {sourceProjection} from '../scripts/project-andalucia-inference-source-glyphs.mjs';
import {projectNativePiecewise} from '../scripts/project-andalucia-native-piecewise.mjs';
import {projectNativeDocMath} from '../scripts/project-andalucia-native-doc-math.mjs';
import {projectRendererMath as projectRendererPiecewise} from '../tools/pau-resolution-render-check/value-adapter.mjs';
const read=p=>fs.readFileSync(p,'utf8');
const plain=x=>JSON.parse(JSON.stringify(x));
const prepared=prepare(),source=read('data/andalucia-pau-runtime.js');
function load(s){const context={window:{}};vm.createContext(context);vm.runInContext(read('math-renderer.js'),context);vm.runInContext(publicComponents(),context);vm.runInContext(s,context);return context;}
const baseline=load(baselineRuntime(source)),candidate=load(candidateRuntime(prepared.records));
const runtime=candidate.window.ANDALUCIA_PAU_RUNTIME;

test('isolated visual case uses identical exercise and session materialization to the complete candidate bank',()=>{
 for(const r of prepared.records){
  const isolated={window:{}};vm.runInNewContext(candidateRuntime([r]),isolated);
  const one=isolated.window.ANDALUCIA_PAU_RUNTIME;
  assert.deepEqual(plain(one.exercises.find(x=>x.exerciseId===r.exerciseId)),plain(runtime.exercises.find(x=>x.exerciseId===r.exerciseId)));
  const course=r.subject==='2_bach_mates_ii'?'2bach-mates':'2bach-ccss';
  const a=one.examSlotRecords(course,r.examSlot).find(x=>x.exerciseId===r.exerciseId),b=runtime.examSlotRecords(course,r.examSlot).find(x=>x.exerciseId===r.exerciseId);
  assert.deepEqual(plain(a),plain(b));
  for(const p of a.parts)assert.deepEqual(plain(one.materializePart(p,`component-check:${r.exerciseId}`)),plain(runtime.materializePart(p,`component-check:${r.exerciseId}`)));
 }
});

test('derived wrapping opportunities preserve mathematical atoms and every non-whitespace symbol',()=>{
 for(const text of ['f(x)=frac{3x+1}{x^{2}+2}+7','(a;b;c)⇒x=2','A=[[1,2],[3,4]]','f(x+1)=x^{2+3}','P(A|B)=0.25']){
  const result=projectEquationSpacing(text);
  assert.equal(result.replace(/\s/g,''),text.replace(/\s/g,''));
  assert.equal(projectEquationSpacing(result),result);
 }
 assert.equal(projectEquationSpacing('f(x)=frac{3x+1}{x^{2}+2}+7'),'f(x) = frac{3x+1}{x^{2}+2} + 7');
 assert.equal(projectEquationSpacing('f(x+1)=x^{2+3}'),'f(x+1) = x^{2+3}');
 assert.equal(projectEquationSpacing('(a;b;c)⇒x=2'),'(a; b; c) ⇒ x = 2');
});
test('independent source-bound deliveries retain the complete evidence census and explicit deferrals',()=>{
 const evidence=JSON.parse(read('artifacts/pau-andalucia-resolution/audit/inference-independent-evidence.json'));
 assert.equal(prepared.records.length,1438);assert.equal(prepared.deferred.length,0);
 const deliveredIds=new Set(prepared.records.map(x=>x.exerciseId));
 assert.ok(evidence.rows.every(row=>deliveredIds.has(row.exerciseId)));
 assert.equal(prepared.checks.length,prepared.records.reduce((total,row)=>total+row.parts.length,0));
 assert.ok(prepared.checks.every(x=>x.policy.valid));
 const groups=Object.values(Object.groupBy(prepared.records,x=>x.exerciseId));
 assert.ok(groups.every(rows=>rows.length===1));
 assert.equal(deliveredIds.size,1438);
 assert.equal(prepared.records.filter(x=>x.sourceProjection.glyphEvidence).length,1438);
});
test('source-bound spatial exercises use Math II geometry only, preserving the five-slot architecture',()=>{
 const rows=prepared.records.filter(r=>r.blockId==='geometria');assert.equal(rows.length,176);
 for(const r of rows){assert.equal(r.subject,'2_bach_mates_ii');assert.equal(r.examSlot,4);assert.equal(r.referenceTable,undefined);if(r.methodEligibilityEvidence.documentHash)assert.equal(r.methodEligibilityEvidence.documentHash,r.documentHash);assert.ok(r.methodEligibilityEvidence.page);assert.ok(r.methodEligibilityEvidence.officialQuestion);assert.ok(r.topicIndexes.every(i=>[3,4,5].includes(i)));
  assert.equal(runtime.examSlotRecords('2bach-mates',4).filter(x=>x.exerciseId===r.exerciseId).length,1);assert.ok(runtime.challengeRecords('2bach-ccss').every(x=>x.exerciseId!==r.exerciseId));assert.ok(runtime.examSlotRecords('2bach-mates',5).every(x=>x.exerciseId!==r.exerciseId));
  if([427,429].includes(r.queueIndex))assert.ok(!r.topicIndexes.includes(5));
 }
});

test('Math II algebra, analysis and integrals retain documented family gates and their own exam slots',()=>{
 const expected=new Map([[424,1],[439,1],[447,1],[459,1],[441,2],[425,3],[428,3]]);
 for(const [index,slot]of expected){const r=prepared.records.find(x=>x.queueIndex===index);assert.ok(r);assert.equal(r.subject,'2_bach_mates_ii');assert.equal(r.examSlot,slot);assert.equal(r.referenceTable,undefined);assert.equal(r.methodEligibilityEvidence.source,'OFFICIAL_PAGE_INSPECTED');assert.equal(r.methodEligibilityEvidence.documentHash,r.documentHash);assert.ok(r.methodEligibilityEvidence.page);
  assert.equal(runtime.examSlotRecords('2bach-mates',slot).filter(x=>x.exerciseId===r.exerciseId).length,1);assert.ok(runtime.challengeRecords('2bach-ccss').every(x=>x.exerciseId!==r.exerciseId));assert.ok(!r.secondaryTopics.includes('Intervalos de confianza'));
 }
 const area=prepared.records.find(r=>r.queueIndex===425),g=area.parts[0].solutionMathOptions.solutionGraph;assert.ok(g);assert.equal(digest(Buffer.from(g.src.split(',')[1],'base64')),g.sha256);assert.match(g.alt,/x=2 y x=3/);
});

test('the complete pre-existing runtime identities remain present when the historical delivery is replayed',()=>{
 const original=baseline.window.ANDALUCIA_PAU_RUNTIME;
 const deliveredIds=new Set(runtime.exercises.map(row=>row.exerciseId));
 for(const row of original.exercises)assert.ok(deliveredIds.has(row.exerciseId),`pre-existing record missing: ${row.exerciseId}`);
 const uniqueCount=new Set(prepared.records.map(x=>x.exerciseId)).size;
 assert.equal(runtime.exercises.length,original.exercises.length+uniqueCount);
});

test('source-bound matrix labels reach the learner at their official common/subpart scope',()=>{
 const gains=prepared.records.find(r=>r.queueIndex===20),coffee=prepared.records.find(r=>r.queueIndex===161);
 for(const html of [gains.learnerStatementHtml,coffee.parts.find(p=>p.label==='b)').html]){
  assert.equal((html.match(/data-column=/g)||[]).length,6);
  assert.equal((html.match(/data-cell=/g)||[]).length,12);
  assert.equal((html.match(/data-row=/g)||[]).length,4);
  assert.doesNotMatch(html,/ABCABC|puntos?\)/);
 }
 assert.equal(gains.sourceProjection.glyphEvidence.reconstructionSha256,'f152e84ef8985c54ad42b77818407b9038fdbc25d6b2fbae6a6e6c75a21beac7');
 assert.doesNotMatch(gains.officialPromptLiteral,/ABCABC/);
 assert.match(gains.officialPromptLiteral,/F=\[\[100,150,80\],\[200,250,140\]\]/);
 const delivered=runtime.examSlotRecords('2bach-ccss',1).find(r=>r.exerciseId===gains.exerciseId);
 assert.equal(delivered.statementHtml,gains.learnerStatementHtml);
 assert.doesNotMatch(coffee.parts.find(p=>p.label==='a)').html,/data-column=/);
});

test('matrix adjacency exercise delivers its verified five-edge graph only in the revealed solution',()=>{
 const r=prepared.records.find(x=>x.queueIndex===1180);assert.equal(r.examSlot,1);assert.equal(r.parts.length,2);
 assert.equal(r.parts[0].solutionMathOptions.solutionGraph,undefined);
 const g=r.parts[1].solutionMathOptions.solutionGraph,svg=Buffer.from(g.src.split(',')[1],'base64').toString('utf8');
 assert.equal(digest(svg),g.sha256);assert.equal((svg.match(/<line /g)||[]).length,5);assert.equal((svg.match(/<circle /g)||[]).length,6);
 assert.doesNotMatch(r.parts[1].html,/data-edge|Grafo C|data:image/);
});

test('source-bound CCSS calculus reaches historical analysis, with source-eligible integrals and faithful derived graphs',()=>{
 const analysis=prepared.records.filter(r=>r.blockId==='analisis'&&r.subject==='2_bach_ccss_ii');assert.equal(analysis.length,125);
 for(const r of analysis){assert.equal(r.examSlot,3);assert.equal(r.referenceTable,undefined);assert.ok(r.topicIndexes.includes(5));assert.ok(!r.secondaryTopics.includes('Intervalos de confianza'));assert.equal(runtime.examSlotRecords('2bach-ccss',3).filter(x=>x.exerciseId===r.exerciseId).length,1);assert.equal(runtime.examSlotRecords('2bach-ccss',4).filter(x=>x.exerciseId===r.exerciseId).length,0);}
 for(const index of [215,391,979,1482]){const r=analysis.find(r=>r.queueIndex===index);assert.equal(r.methodEligibilityEvidence.documentHash,r.documentHash);assert.equal(r.methodEligibilityEvidence.advancedIntegrationMethods,false);assert.ok(r.topicIndexes.includes(index===1482?7:6));}
 for(const index of [1477,1482,1502,95,147,155,157,357,414,142,291,435,69,77,193,498]){const r=analysis.find(r=>r.queueIndex===index),graphs=r.parts.filter(p=>p.solutionMathOptions.solutionGraph);assert.ok(graphs.length);for(const p of graphs){const g=p.solutionMathOptions.solutionGraph,svg=Buffer.from(g.src.split(',')[1],'base64').toString('utf8');assert.equal(digest(svg),g.sha256);assert.match(svg,/<polyline/);assert.doesNotMatch(svg,/NaN|undefined/);}}
 const exponential=analysis.find(r=>r.queueIndex===449);assert.ok(exponential.topicIndexes.includes(7));assert.match(exponential.methodEligibilityEvidence.scope,/EXPONENTIAL_AND_POLYNOMIAL_SIGNED_INTEGRAL/);
});

test('official matrix exercises reach only the historical first CCSS slot',()=>{
 for(const index of [129,217,253,336]){
  const r=prepared.records.find(r=>r.queueIndex===index);assert.equal(r.primaryTopic,'Matrices');assert.deepEqual(r.topicIndexes,[0]);assert.equal(r.examSlot,1);assert.equal(r.referenceTable,undefined);
  assert.equal(r.parts.length,2);assert.match(r.learnerStatement,/\[\[/);
  assert.ok(runtime.examSlotRecords('2bach-ccss',1).some(x=>x.exerciseId===r.exerciseId));
  assert.ok(runtime.topicRecords('2bach-ccss',0).some(x=>x.exerciseId===r.exerciseId));
  assert.equal(runtime.examSlotRecords('2bach-ccss',4).filter(x=>x.exerciseId===r.exerciseId).length,0);
  assert.equal(runtime.examSlotRecords('2bach-mates',5).filter(x=>x.exerciseId===r.exerciseId).length,0);
 }
});
test('official page identity supersedes a historical alternative without erasing it',()=>{
 for(const index of [1200,1262]){
  const r=prepared.records.find(x=>x.queueIndex===index);assert.ok(r);
  assert.equal(r.questionKey,'1');assert.equal(r.alternativeKey,'B');
  assert.equal(r.documentIdentityEvidence.officialQuestion,'B.1');
  assert.equal(r.documentIdentityEvidence.historical.alternativeKey,'A');
  assert.equal(r.documentIdentityEvidence.documentHash,r.sourceProjection.glyphEvidence.documentHash);
 }
});
test('source literal and score evidence retained; no official numbers inferred',()=>{
 const nativeCanonical=read('artifacts/pau-canonical-andalucia-ccssii-2012-integration/runs/run-a/andalucia-ccssii-2012-canonical-exercises.jsonl').trim().split(/\r?\n/).map(JSON.parse);
 const canonicalById=new Map([...read('artifacts/pau-canonical-andalucia-madrid/runs/run-a/andalucia-canonical-exercises.jsonl').trim().split(/\r?\n/).map(JSON.parse),...nativeCanonical].map(x=>[x.exerciseId,x]));
 const nativeIds=new Set(nativeCanonical.filter(c=>c.learnerContent).map(c=>c.exerciseId));
 const completed=new Map(read('artifacts/pau-andalucia-resolution/completed-exercises.jsonl').trim().split(/\r?\n/).map(JSON.parse).map(x=>[x.exerciseId,x]));
 for(const r of prepared.records){const c=completed.get(r.exerciseId);
  if(c.sourceLiteral!==undefined&&r.officialPromptLiteral!==c.sourceLiteral){
   assert.ok(['EXISTING_DOCUMENT_LAYOUT_HUMAN_VALIDATION','MODEL_INSPECTION_OF_RENDERED_OFFICIAL_PDF_PAGE','SOURCE_PROJECTION_WITH_CANONICAL_DOCUMENT_IDENTITY+DOCUMENT_FONT_GLYPH_RECOVERY'].includes(r.sourceProjection.glyphEvidence?.method));
   assert.ok(r.sourceProjection.glyphChanges.length>0);
   if(r.sourceProjection.glyphEvidence.originalLiteralHash)assert.equal(r.sourceProjection.glyphEvidence.originalLiteralHash,digest(c.sourceLiteral));
   if(r.sourceProjection.glyphEvidence.projectedLiteralHash)assert.equal(r.sourceProjection.glyphEvidence.projectedLiteralHash,digest(r.officialPromptLiteral));
  }
  else if(c.sourceLiteral!==undefined)assert.equal(r.officialPromptLiteral,c.sourceLiteral);
  else{
   assert.match(r.sourceProjection.glyphEvidence?.method??'',/^CANONICAL_OFFICIAL_DOCUMENT_PROMPT(?:\+DOCUMENT_FONT_GLYPH_RECOVERY)?$/);
   assert.equal(digest(r.officialPromptLiteral),r.sourceProjection.originalHash);
  }
  if(Array.isArray(c.scoreEvidence))assert.deepEqual(r.scoreEvidence,c.scoreEvidence);
  else assert.deepEqual(r.scoreEvidence,canonicalById.get(r.exerciseId)?.scoreEvidence??[]);
  const projected=sourceProjection(c);
  const notation=t=>r.primaryTopic==='Probabilidad'?projectProbabilityNotation(t).text:r.primaryTopic==='Programación lineal'?projectRegionVariable(t).text:t;
  assert.equal(r.sourceProjection.originalHash,digest(r.officialPromptLiteral));assert.equal(typeof r.learnerStatement,'string');assert.doesNotMatch(r.learnerStatement,/(?:\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)|\bundefined\b)/i);
  assert.ok((r.learnerStatement+r.parts.map(part=>part.text).join('')).trim().length>0);
 for(const [i,p]of r.parts.entries()){
  if(c.sourceLiteral!==undefined){let prompt=notation(projectEditorialText(projected.projectFragment(c.parts[i].prompt).text).text);if(nativeIds.has(c.exerciseId))prompt=projectNativeDocMath(prompt).text;const normalizedWhitespace=text=>text.trim().replace(/\s+/g,' ');if(r.parts.length===1&&['whole','main'].includes(c.parts[i].partId)){let official=notation(projectEditorialText(r.officialPromptLiteral).text);if(nativeIds.has(c.exerciseId))official=projectNativeDocMath(official).text;assert.equal(normalizedWhitespace(p.text),normalizedWhitespace(official));}else assert.equal(normalizedWhitespace(p.text),normalizedWhitespace(prompt));}
  else{
   assert.ok(canonicalById.has(r.exerciseId));
   assert.doesNotMatch(p.text,/(?:\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)|\bundefined\b)/i);
  }
  assert.deepEqual(p.structuredSolution,c.parts[i].solutionSteps);assert.equal(p.canonicalSemanticAnswer,c.parts[i].answer);
 }
 }
});
test('probability and statistics use distinct topics and share only the historical fourth exam slot',()=>{
 const ids=new Set(prepared.records.filter(r=>r.subject==='2_bach_ccss_ii'&&r.examSlot===4).map(r=>r.exerciseId));
 for(const [block,topic,evidenceCount,uniqueCount]of[['estadistica',10,245,245],['probabilidad',8,182,182]]){
  const evidenceRows=prepared.records.filter(r=>r.blockId===block);assert.equal(evidenceRows.length,evidenceCount);
  const selected=new Set(evidenceRows.map(r=>r.exerciseId));assert.equal(selected.size,uniqueCount);
  for(const pool of[runtime.topicRecords('2bach-ccss',topic),runtime.blockRecords('2bach-ccss',block)])assert.deepEqual(new Set(pool.filter(r=>ids.has(r.exerciseId)).map(r=>r.exerciseId)),selected);
 }
 assert.deepEqual(new Set(runtime.examSlotRecords('2bach-ccss',4).filter(r=>ids.has(r.exerciseId)).map(r=>r.exerciseId)),ids);
 for(const r of prepared.records.filter(r=>r.blockId==='probabilidad')){assert.equal(r.referenceTable,undefined);assert.ok(!r.secondaryTopics.includes('Muestreo y afijación proporcional'));}
 assert.equal(runtime.examSlotRecords('2bach-ccss',5).length,0);
 const matesIds=new Set(prepared.records.filter(r=>r.subject==='2_bach_mates_ii'&&r.examSlot===5).map(r=>r.exerciseId));assert.equal(matesIds.size,5);
 for(const pool of[runtime.blockRecords('2bach-mates','probabilidad-estadistica'),runtime.examSlotRecords('2bach-mates',5)])assert.deepEqual(new Set(pool.filter(r=>matesIds.has(r.exerciseId)).map(r=>r.exerciseId)),matesIds);
 for(const [topic,count]of [[12,1],[13,4]])assert.equal(new Set(runtime.topicRecords('2bach-mates',topic).filter(r=>matesIds.has(r.exerciseId)).map(r=>r.exerciseId)).size,count);
 assert.ok(runtime.examSlotRecords('2bach-ccss',4).every(r=>!matesIds.has(r.exerciseId)));
 assert.ok(runtime.topicRecords('2bach-mates',13).every(r=>!ids.has(r.exerciseId)));
 const harness=read('tools/andalucia-inference-delivery/frame.js');
 assert.match(harness,/examSlotRecords\('2bach-ccss',4\)/);
 assert.match(harness,/\[1,2,3,4,5\]\.flatMap\(slot=>runtime\.examSlotRecords\('2bach-mates',slot\)\)/);
 assert.match(harness,/matches.length!==1/);
});
test('linear programming reaches historical topic 3 and slot 2 with a verified derived graph',()=>{
 const r=prepared.records.find(r=>r.queueIndex===376);assert.equal(r.primaryTopic,'Programación lineal');assert.equal(r.examSlot,2);assert.equal(r.referenceTable,undefined);
 assert.deepEqual(r.topicIndexes,[3]);assert.equal(r.secondaryTopics.includes('Muestreo y afijación proporcional'),false);
 for(const pool of[runtime.topicRecords('2bach-ccss',3),runtime.examSlotRecords('2bach-ccss',2)]){
  const matches=pool.filter(x=>x.exerciseId===r.exerciseId);assert.ok(matches.length>0);assert.equal(new Set(matches.map(x=>x.exerciseId)).size,1);
 }
 assert.equal(runtime.examSlotRecords('2bach-ccss',4).filter(x=>x.exerciseId===r.exerciseId).length,0);
 const option=r.parts[1].solutionMathOptions.solutionGraph;const svg=Buffer.from(option.src.split(',')[1],'base64').toString('utf8');assert.equal(digest(svg),option.sha256);
 assert.match(r.officialPromptLiteral,/región factible/);assert.match(r.learnerStatement,/𝑅/);
 for(const p of r.parts){assert.doesNotMatch(p.html,/ℝ/);assert.doesNotMatch(p.solutionSteps.join('\n'),/\bR\b/);}
 const literal='La región R, no ℝ. R: x ≥ 3y.';const projection=projectRegionVariable(literal);let restored=projection.text;
 let delta=0;const positions=projection.changes.map(c=>{const at=c.offset+delta;delta+=c.after.length-c.before.length;return {...c,at};});
 for(const c of positions.reverse())restored=restored.slice(0,c.at)+c.before+restored.slice(c.at+c.after.length);
 assert.equal(restored,literal);assert.match(projection.text,/no ℝ/);
 candidate.value='Resultado final: 3 y 7.';candidate.opts=r.parts[1].solutionMathOptions;
 const html=vm.runInContext('formatSolutionText(value,opts)',candidate);assert.match(html,/derived-solution-graph/);assert.match(html,/aria-label="Abrir gráfica ampliada"/);assert.match(html,/Gráfica derivada de las restricciones/);
 assert.match(svg,/x = 3y; región a la derecha/);assert.match(svg,/x = 5; a la izquierda/);assert.match(svg,/y = 1; por encima/);
 assert.match(svg,/Triángulo A \(3,1\), B \(5,1\), C \(5,5 tercios\)/);assert.match(svg,/A = \(3; 1\)/);assert.match(svg,/B = \(5; 1\)/);assert.match(svg,/<polygon /);
 candidate.opts={solutionGraph:{src:'https://example.invalid/graph.svg'}};assert.doesNotMatch(vm.runInContext('formatSolutionText(value,opts)',candidate),/derived-solution-graph|example.invalid/);
});
test('distinct quadrilateral graphs follow their own official constraints and LP prose remains prose',()=>{
 const svgs=[];
 for(const index of [150,394]){
  const r=prepared.records.find(r=>r.queueIndex===index);
  assert.equal(r.examSlot,2);assert.deepEqual(r.topicIndexes,[3]);
  assert.equal(r.secondaryTopics.includes('Muestreo y afijación proporcional'),false);
  const g=r.parts[0].solutionMathOptions.solutionGraph;
  const svg=Buffer.from(g.src.split(',')[1],'base64').toString('utf8');svgs.push(svg);
  assert.equal(digest(svg),g.sha256);assert.match(svg,/viewBox="0 0 690 440"/);assert.match(svg,/D =/);
  assert.equal(runtime.examSlotRecords('2bach-ccss',2).filter(x=>x.exerciseId===r.exerciseId).length,1);
 }
 assert.notEqual(svgs[0],svgs[1]);assert.match(svgs[0],/7x − 2y ≤ 17/);assert.match(svgs[1],/3x \+ 2y ≤ 20/);
 for(const index of [376,150,394])for(const p of prepared.records.find(r=>r.queueIndex===index).parts){
  const d=runtime.materializePart(p,'linear-prose');candidate.solution=d.solution;candidate.opts=p.solutionMathOptions;
  const html=vm.runInContext('formatSolutionText(didacticSolutionText({solution}),opts)',candidate);
  assert.doesNotMatch(html,/\b(?:la|su)\s+∩|ℝ|undefined/);
 }
});
test('editorial headers and next-option marker are excluded reversibly, never mathematical text',()=>{
 const literal='EJERCICIO 4\nDatos del contraste.\na) (1,5 puntos) Determine p.\nOPCIÓN  B\n\n';
 const projected=projectEditorialText(literal);assert.equal(projected.text,'Datos del contraste.\na)  Determine p.');
 let restored=projected.text;let shift=0;
 for(const r of projected.removed){const at=r.offset-shift;assert.equal(literal.slice(r.offset,r.offset+r.literal.length),r.literal);shift+=r.literal.length;assert.ok(at>=0);}
 for(const r of projected.removed)restored=restored.slice(0,r.offset)+r.literal+restored.slice(r.offset);
 assert.equal(restored,literal);
 for(const r of prepared.records)for(const p of r.parts)assert.doesNotMatch(p.text,/OPCIÓN\s+[AB]\s*$|\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/);
 assert.match(prepared.records.find(r=>r.queueIndex===18).officialPromptLiteral,/OPCIÓN\s+B/);
 const square='a) [1,25 puntos] Determine P(X ∈ [0; 1]).';
 const clean=projectEditorialText(square);assert.equal(clean.text,'a)  Determine P(X ∈ [0; 1]).');assert.equal(clean.removed.length,1);assert.equal(clean.removed[0].kind,'EDITORIAL_SCORE');
 assert.match(prepared.records.find(r=>r.queueIndex===1245).officialPromptLiteral,/\[1,25 puntos\]/);
 for(const p of prepared.records.find(r=>r.queueIndex===1245).parts)assert.doesNotMatch(p.text,/puntos?/);
});
test('conditional probability is not rendered as a quotient of event names and remains reversible',()=>{
 const literal='Calcule P(A/B) y P(B/A^{C}). La fracción x/y no cambia.';
 const p=projectProbabilityNotation(literal);
 assert.equal(p.text,'Calcule P(A|B) y P(B|A^{C}). La fracción x/y no cambia.');
 let restored=p.text;
 for(const c of [...p.changes].reverse())restored=restored.slice(0,c.offset)+c.before+restored.slice(c.offset+c.after.length);
 assert.equal(restored,literal);assert.equal(p.changes.length,2);
 assert.equal(projectProbabilityNotation('P(x/y), P(2/3), f(A/B)').text,'P(x/y), P(2/3), f(A/B)');
 const q8=prepared.records.find(x=>x.queueIndex===8);
 assert.match(q8.officialPromptLiteral,/P\(A\/B\)/);
 assert.match(q8.parts[1].html,/P\(A\|B\)/);
 assert.doesNotMatch(q8.parts[1].html,/math-frac/);
});

test('whole official exercise is delivered without invented a/b labels or omitted prompt',()=>{
 const whole=prepared.records.find(r=>r.queueIndex===407);
 assert.equal(whole.learnerStatement,'');assert.equal(whole.parts.length,1);assert.equal(whole.parts[0].label,'');
 assert.equal(whole.parts[0].text,whole.sourceProjection.full);
 assert.match(whole.parts[0].text,/70 nacieron/);assert.match(whole.parts[0].text,/región de rechazo/);
 assert.deepEqual(whole.secondaryTopics,['Contrastes de hipótesis']);assert.equal(whole.referenceTable,'normal');
 const distribution=prepared.records.find(r=>r.queueIndex===273);assert.ok(distribution.secondaryTopics.includes('Distribución de la media muestral'));assert.equal(distribution.referenceTable,'normal');
});
test('finite sampling has appropriate secondary taxonomy without requiring a normal table',()=>{
 const finite=prepared.records.find(r=>r.queueIndex===63),mixed=prepared.records.find(r=>r.queueIndex===1001);
 assert.deepEqual(finite.secondaryTopics,['Muestreo y afijación proporcional']);assert.equal(finite.referenceTable,undefined);
 assert.deepEqual(mixed.secondaryTopics,['Muestreo y afijación proporcional','Tamaño muestral']);assert.equal(mixed.referenceTable,'normal');
});
test('four choices stay distinct and correct through 1000 deterministic attempts',()=>{
 const counts=[0,0,0,0];for(const r of prepared.records)for(const p of r.parts){
  for(let i=0;i<1000;i++){const d=runtime.materializePart(p,`inference:${i}`);assert.equal(d.options[d.correct],p.semanticAnswer);assert.equal(new Set(d.options).size,4);counts[d.correct]++;}
  assert.deepEqual(plain(runtime.materializePart(p,'same')),plain(runtime.materializePart(p,'same')));
 }const total=counts.reduce((a,b)=>a+b,0);assert.ok(counts.every(n=>n>total*.23&&n<total*.27),counts.join('/'));
});
test('rendered solution keeps prose and genuine fractions without modifying the public renderer',()=>{
 for(const r of prepared.records)for(const p of r.parts){const d=runtime.materializePart(p,'prose');candidate.solution=d.solution;candidate.opts=p.solutionMathOptions;
  const html=vm.runInContext('formatSolutionText(didacticSolutionText({solution}),opts)',candidate);
  assert.doesNotMatch(html,/\btgto\b|\bsen embargo\b|frac\s*\{|undefined|\\(?:frac|sqrt)/);
  if(d.solution.includes('frac{'))assert.match(html,/<mfrac\b|class="math-fraction"/);
  assert.match(html,/Resultado final/);assert.ok(p.html&&p.html!=='undefined');
 }
 const inequality='Resolución:\n1. Si 2<x<4, entonces f′=−frac{4}{x²}<0.\nResultado final: f es decreciente.';
 candidate.solution=inequality;candidate.opts={};
 const inequalityHtml=vm.runInContext('formatSolutionText(didacticSolutionText({solution}),opts)',candidate);
 assert.match(inequalityHtml,/2&lt;x&lt;4/);assert.match(inequalityHtml,/<mfrac\b|class="math-fraction"/);assert.match(inequalityHtml,/>4</);assert.match(inequalityHtml,/x²/);assert.match(inequalityHtml,/decreciente/);
});

test('structured final answers start on their own line and retain every pre-existing identity',()=>{
 const structured=prepared.records.flatMap(r=>r.parts).filter(p=>/^(?:system|piecewise)\s*\{/i.test(p.finalAnswer.trim()));
 assert.ok(structured.length>0);
 for(const part of structured)assert.ok(part.finalAnswer.startsWith('\n'));
 const original=baseline.window.ANDALUCIA_PAU_RUNTIME.exercises;
 const deliveredIds=new Set(runtime.exercises.map(row=>row.exerciseId));
 for(const row of original)assert.ok(deliveredIds.has(row.exerciseId),`pre-existing record missing: ${row.exerciseId}`);
});
test('default formatting is identical for existing non-Andalucia callers',()=>{
 const before=publicComponents().replace('function formatSolutionText(value, mathOptions = {})','function formatSolutionText(value)').replace('formatMathText(source, mathOptions)','formatMathText(source)');
 const old={window:{}};vm.createContext(old);vm.runInContext(read('math-renderer.js'),old);vm.runInContext(before,old);
 for(const value of['Resolución:\\n1. tan(x)=1.\\nResultado final: π/4.','Paso 1. sin(x)+cos(x).','Resultado final: frac{1}{2}.']){
  old.value=value;candidate.value=value;assert.equal(vm.runInContext('formatSolutionText(value)',old),vm.runInContext('formatSolutionText(value)',candidate));
 }
});
test('delivery generation and rollback are deterministic and reversible without changing originals',()=>{
 const generated=candidateRuntime(prepared.records);assert.equal(generated,candidateRuntime(prepare().records));
 assert.equal(baselineRuntime(generated),baselineRuntime(source));
 assert.deepEqual(plain(load(baselineRuntime(generated)).window.ANDALUCIA_PAU_RUNTIME.exercises),plain(baseline.window.ANDALUCIA_PAU_RUNTIME.exercises));
});
