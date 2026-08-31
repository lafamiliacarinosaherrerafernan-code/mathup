import assert from 'node:assert/strict';
export const workshopsAdvertisingObservations=[
 [639,'4b8884e307df4f5ddaf079e0f10be3d3f74d4793874eb03b355d34f4856579cb',2,'1','62857799aa14844cb24da8e0af2de39b4a13cabe6bb6cf7fadb9cae5c1d944d2',0],
 [687,'3025f1a244b39bd3ee5cd99e88ad281b0213be43222ab857b1c18112f6328601',1,'2','4ba12473c12fcf80e31abb57b23fbfca5cec6e05952aea2fb4b4e97496aeb817',0],
 [702,'4440c15a31a77ee9e052a0668923508e117795b369d569bc02d24b7937366f7a',2,'1','3ae6550378ab24b27afebbcfef899b51ac487148108d83be24d01f464c114709',0],
 [752,'bebc339cfd8f69c7c4fae160fd165eaef5f6bc93cfd6d15cb9ce289b7029d167',2,'1','a691ed92459831a7df7b02fa709c458b3f0bec4813f3cff3af3f4985654cad8a',0],
 [757,'6fed0384ff6fcbaaa7098ab3f35ea5f881d1280502f050ada3a7f13af528392e',1,'1','aceab1b1f22877fb69517bd968ed755361c5ebc9b73f59de982007f75132a818',0],
 [858,'1f0983e351b8435c5b6c7b68b05fe2a64034faf77a85a1f9480407aa0f2a88aa',2,'1','a7239d2a55ec1f6abb264d802e8af8e103b059d0a0f460a15d455a9106d95dd5',0],
];
export function workshopsAdvertisingReplacements(r){if(r.queueIndex!==687)return[];const at=r.sourceLiteral.indexOf('\n\n');assert.ok(at>0);assert.match(r.sourceLiteral.slice(at),/BLOQUE B\s+extremos/);return[[r.sourceLiteral.slice(at),'','PDF_NEXT_SECTION_HEADER_AND_EDITORIAL_TAIL_NOT_EXERCISE']];}
