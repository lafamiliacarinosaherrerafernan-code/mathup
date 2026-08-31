// Page-bound observations: original PDFs and page images were inspected.
// Only documented glyphs are projected; official bytes remain unchanged.
export const returnedInferenceObservations=[
 [1064,'bc88bfeb0f184eb0c806c4efe04e84c24f3e5fcef9caaa12e94fd48d9f67a389',2,'8','9dd98d83179605a9c4876e25f46a6c6c05590dc6b0c75205207d957b49075e98',2],
 [1341,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',2,'B.4','5776adf9b7cb2ab6db372d2ab470b7e41a4903c985625743d92f2c33124c4dcb',2],
 [1372,'eecad753694b3d8cb2d427efddb00d75faae9c4ec5b027056291bc95d7d2e3da',1,'A.4','5ad309d31ff79aa18ccd1cee38b45642c51e121a5ae5692be7ca8d20e7d1d765',2],
 [1453,'31fb46947e141f5c8da8f7b381e7d27b67fe5a9d1597120454ce66fce0313f1a',1,'A.4','30d7eb4bdf8c1769f22897ec6bac9a0d6502c5607e75fab1cc9d25efee2a8e1a',2],
 [1542,'eecad753694b3d8cb2d427efddb00d75faae9c4ec5b027056291bc95d7d2e3da',2,'B.4','f1c183f4139e7d477b88310244ffe09958e787923a73b75f4ec90224112cd72c',2],
 [1544,'b7541cc45d3e96297c29037fe17a562b7daa9cd0ee2a95c2b5e9454ad9b90f14',1,'A.4','8f026d99b0e0fcfab1f4eaffba0ed1028ca1594d8f749ba69470a251a1063e8d',0],
 [1284,'68934c098e6cd4ad77a3b9215dd857def1306205432e73ccd2548dbc2e0652c2',2,'8','e673ea873de99a9dc957b2e792ae86ab038f8f2842ee20a934a1d985c28880b2',0],
 [1528,'37584a9604930b74008a6bda88ef3d61fa926d5e6a540ab9013569258f772256',2,'B.4','e972cdc0c09c051c3e203e397b4df9e0ddaaf4bbacccfdebca03732bdce029d9',0],
];
export const returnedInferenceReplacements={
 1064:[['con\u001canza','confianza'],['¾a','¿a']],
 1341:[['con\u001canza','confianza']],
 1372:[['con\u001canza','confianza'],['¾qué','¿qué']],
 1453:[['con\u001canza','confianza']],
 1542:[['\u001cltros','filtros'],['con\u001canza','confianza'],['¾Cuál','¿Cuál']],
 1284:[['121g2','121g^{2}']],
};
export function projectReturnedInference(index,text){for(const[a,b]of returnedInferenceReplacements[index]??[])text=text.split(a).join(b);return text;}
