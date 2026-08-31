import assert from 'node:assert/strict';
export const resourcesMixturesObservations=[
 [274,'69f8b84ed22f2b49074eafb95dbdce8a98114a4a2f02989b92f3f7add9355155',2,'1','bb3fd38118d4585a40f6252048faa3691b30f657fc3bc438f22d75af9c126bab',0],
 [382,'37584a9604930b74008a6bda88ef3d61fa926d5e6a540ab9013569258f772256',1,'1','aadf69a8d66cea7a387284a9113cb796a6f8ee6f37e5db75cff64a0809a15c50',0],
 [443,'4e10e40d60aebdab7570fa77b9ce953d7bf6c9a4c8869a5d3f9b7ca3c907c154',1,'1','c376953a3c0f4669a84d9d782fd4c8f7bcebf906d4b26e0503aa8c8014b9ddaf',0],
 [478,'010da3d1a9c2777988000c108cedcb180ec7bbae4ce1e291cc01a287870ab775',1,'2','27df2e1a7204f634a43efb7f96276f24dde4e35cad687a5a7d634e05f16c10fc',0],
 [492,'71c9d8edf7bd2e9d3872ebabed22b6f491ccfdc39d6f4a908b05609bd85a8f04',1,'2','cf7ddd7376ab912fe542f6b9f5b02b746da09b140b859958cd7ca9fad10498e3',0],
 [1119,'c42a605501a277fe7194b964ad92ad66047be9a62dc254fa2219d756d3d71317',1,'1','8d8d1c689d9b6563cbe5c4b7e6f2a443956f0876d98ed83615377a6f6ed60b8b',3],
 [1441,'ec6fd00d0daee547aa6128f3f6e1099278ee551f7f80917b331a1772764317b3',1,'1','106d2baf993c0a46476e641b8f83f53f92bf1554a93eb03a798bb84599f4514b',0],
 [1487,'eecad753694b3d8cb2d427efddb00d75faae9c4ec5b027056291bc95d7d2e3da',1,'1','5ad309d31ff79aa18ccd1cee38b45642c51e121a5ae5692be7ca8d20e7d1d765',0],
];
export function resourcesMixturesReplacements(r){const edits=[];
 if(r.queueIndex===478)for(const n of[70,150,1,3,2])edits.push([`${n}𝑚2`,`${n} m²`,'PDF_VISIBLE_SQUARE_METRES']);
 if([478,492].includes(r.queueIndex)){const m=r.sourceLiteral.match(/\n\n\s+BLOQUE B\s*$/);assert.ok(m);edits.push([m[0],'','PDF_NEXT_BLOCK_HEADER_NOT_EXERCISE']);}
 if(r.queueIndex===1119){assert.equal(r.sourceLiteral.split('bene\u001ccio').length-1,3);for(let i=0;i<3;i++)edits.push(['bene\u001ccio','beneficio','PDF_VISIBLE_FI_LIGATURE']);edits.push(['¾cuántas','¿cuántas','PDF_VISIBLE_OPENING_QUESTION_MARK'],['¾Cuál','¿Cuál','PDF_VISIBLE_OPENING_QUESTION_MARK']);}
 if(r.queueIndex===1487){const m=r.sourceLiteral.match(/^para su obtención sin el uso de la misma\. Justiﬁque las respuestas\.\s+OPCIÓN A\s+/);assert.ok(m);edits.push([m[0],'','PDF_EDITORIAL_INSTRUCTIONS_AND_OPTION_HEADER_NOT_EXERCISE'],['¾Cuál','¿Cuál','PDF_VISIBLE_OPENING_QUESTION_MARK'],['¾Cuántas','¿Cuántas','PDF_VISIBLE_OPENING_QUESTION_MARK']);}
 return edits;
}
