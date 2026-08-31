import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {buildRemainingMatrixBatch} from '../scripts/resolve-andalucia-matrix-official-remaining.mjs';
import {buildAdjacencyBatch} from '../scripts/resolve-andalucia-matrix-adjacency-official.mjs';
import {remainingMatrixStatements} from '../scripts/andalucia-matrix-official-remaining-pdf-evidence.mjs';
import {adjacencyStatement} from '../scripts/andalucia-matrix-adjacency-pdf-evidence.mjs';
import {sourceProjection,restoreText} from '../scripts/project-andalucia-inference-source-glyphs.mjs';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
test('eight page-inspected whole matrix sources and every subpart round-trip without changing historical evidence',()=>{
 const records=[...buildRemainingMatrixBatch('projection-test').batch.records,...buildAdjacencyBatch('projection-test').batch.records];
 for(const source of records){const queue=fs.readFileSync('artifacts/pau-andalucia-mass-processing/resolution-queue.jsonl','utf8').trim().split(/\r?\n/).map(JSON.parse),queueIndex=queue.findIndex(x=>x.exerciseId===source.exerciseId),r={...source,queueIndex},p=sourceProjection(r);
  assert.equal(p.text,queueIndex===1180?adjacencyStatement:remainingMatrixStatements[queueIndex]);
  assert.equal(restoreText(p.text,p.changes),source.sourceLiteral);
  assert.equal(p.evidence.documentHash,source.officialSource.documentHash);
  assert.equal(p.evidence.rendering.tool,'pypdfium2');
  assert.equal(p.evidence.originalLiteralHash,sha(source.sourceLiteral));
  assert.equal(p.evidence.projectedLiteralHash,sha(p.text));
  assert.equal(p.evidence.humanApproval,false);
  for(const part of source.parts){const f=p.projectFragment(part.prompt);assert.equal(restoreText(f.text,f.changes),part.prompt);assert.ok(f.text.length>10);assert.doesNotMatch(f.text,/undefined|\(\s*\d+(?:[.,]\d+)?\s*puntos?\s*\)/i);}
 }
});
