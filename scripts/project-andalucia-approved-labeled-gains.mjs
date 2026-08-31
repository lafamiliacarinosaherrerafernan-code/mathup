// Restore the already human-validated document layout in the delivery layer.
// Historical extraction, source DOC and human decisions remain immutable.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {approvedGainsLayout,layoutPath} from './resolve-andalucia-doc-labeled-gains-2012.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export function projectApprovedLabeledGains(record){
 const layout=approvedGainsLayout();
 assert.equal(record.exerciseId,'pau-can-doc-ex-7c3ebbbb1093fc326efa54458a6a2e9e');
 assert.equal(record.officialSource.documentHash,layout.sourceAuthority.documentSha256);
 assert.equal(sha(fs.readFileSync(record.officialSource.path)),layout.sourceAuthority.documentSha256);
 assert.equal(sha(fs.readFileSync(layout.sourceAuthority.officialPngPath)),layout.sourceAuthority.officialPngSha256);
 const matrices=layout.items.map(m=>({label:m.matrixLabel,columnHeaders:m.columnHeaders,rowHeaders:m.rowLabels.map(x=>x.replace(/^←/,'')),values:m.matrix.map(r=>r.map(Number)),unit:m.matrixLabel==='F'?'unidades vendidas':'€/unidad'}));
 assert.deepEqual(matrices.map(m=>m.label),['F','G']);
 const anchor=matrices.map(m=>`${m.label}=${JSON.stringify(m.values)}`).join('; ');
 const before=record.sourceLiteral.slice(0,record.sourceLiteral.indexOf('\na)'));
 assert.ok(before.includes(layout.historicalEvidence.exactLine));
 assert.ok(before.includes('tres artículos diferentes'));
 const after=layout.learnerView.introText.trim()+'\n'+anchor+'\n';
 const projectFragment=input=>{
  const at=input.indexOf(before);if(at<0)return {text:input,changes:[]};
  assert.equal(input.indexOf(before,at+before.length),-1);
  const text=input.slice(0,at)+after+input.slice(at+before.length);
  assert.equal(text.slice(0,at)+before+text.slice(at+after.length),input);
  return {text,changes:[{offset:at,outputOffset:at,before,after,rule:'HUMAN_VALIDATED_PAIRED_LABELED_MATRICES_DOCUMENT_LAYOUT'}]};
 };
 const full=projectFragment(record.sourceLiteral);assert.equal(full.changes.length,1);
 return {...full,projectFragment,statementLayout:{schemaVersion:'mathup.labeled-matrix-pair.v1',anchor,matrices},evidence:{
  method:'EXISTING_DOCUMENT_LAYOUT_HUMAN_VALIDATION',humanApproval:false,
  documentHash:layout.sourceAuthority.documentSha256,documentExerciseId:layout.documentExerciseId,
  layoutPath,layoutFileHash:sha(fs.readFileSync(layoutPath)),reconstructionSha256:layout.reconstructionSha256,
  originalPngHash:layout.sourceAuthority.officialPngSha256,
  originalLiteralHash:sha(record.sourceLiteral),projectedLiteralHash:sha(full.text),
  scope:'Delivery of the existing approved F/G column and row labels; no new human decision or mathematical reconstruction.'
 }};
}
