import assert from 'node:assert/strict';
export const clientsLogisticsObservations=[
 [1225,'5f24b200fb6cf34f6d72016ec3dc35787b4074de9b7752677e5b0d959ed0dfcd',2,'1','ca99ef90e5390681026667065819d0825ebc758b42348a14de10f3e64eee5f94',0],
 [1385,'0be1dffd96126e6064f95f87111e09ab19a2f475a8851d900e8b1870ea751a2b',1,'2','20c64efafee7404db9fd5b5d6c7180643b0cccdc124d9642d961f91fd458f4be',0],
 [1409,'0de2f7d077a3b5d5c0dbca886cdb363082356411843369c3bce54ff7cda08abc',1,'1','15e8022a70cbd6285049111b89e520a944d275f1f1a5e147bcfe7c63d3a15b38',0],
 [1460,'7531352357e0c321bc85be321f92362aa174cac971a1f2f581aa19918487de88',1,'2','e80da75dfdee0599ff2a2cb2095312d0a43412353b6f287af2a4417f158d6242',0],
 [1566,'c1a3a7a37d38b04359115c64762b1f8a543e4d66155338931de84ef6c304da2c',1,'1','350dd82a5ca7e28c5bc65174b1ad370b385ee9d45b632880c110b74407a28515',0],
 [1598,'68934c098e6cd4ad77a3b9215dd857def1306205432e73ccd2548dbc2e0652c2',1,'1','05d232f41f1761edc9041b434d5e1ab964f0ee96529f34d3601c297e6e4ca055',0],
];
export function clientsLogisticsReplacements(r){if(r.queueIndex===1385)return[[r.sourceLiteral,'Una compañía de transporte marítimo de mercancías dispone de dos barcos B₁ y B₂ para realizar una determinada ruta, durante un año, entre dos ciudades costeras europeas. El barco B₁ no puede realizar más de 14 viajes y debe realizar tantos viajes o más que el barco B₂. Entre los dos barcos deben realizar al menos 10 viajes y como mucho 24. La compañía obtiene unos beneficios de 15000 € por cada viaje del barco B₁ y 17000 € por cada viaje del barco B₂.\nHalle el número de viajes que debe realizar cada barco para que el beneficio obtenido por la empresa sea máximo y obtenga dicho beneficio.','PDF_VISIBLE_SHIP_SUBSCRIPTS_LIMITS_AND_PROFITS_NO_NEXT_HEADER']];if(r.queueIndex===1460){const m=r.sourceLiteral.match(/\n\n\s+BLOQUE B\s*$/);assert.ok(m);return[[m[0],'','PDF_NEXT_BLOCK_HEADER_NOT_EXERCISE']];}return[];}
