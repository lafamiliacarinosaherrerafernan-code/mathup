// Official pages inspected directly. These are reversible presentation projections,
// never replacements for the immutable canonical/historical statements.
export const eventObservations=[
 [280,'a59474e6895bd41034da53b7060969cbe8cbf7f8272f39fbf16821c95f06c84b',2,'3','0d5a638b899b0d4a76c1725a3ac94f4e5c3727fe38e0b057c0f58f823049d0a2',0],
 [627,'3025f1a244b39bd3ee5cd99e88ad281b0213be43222ab857b1c18112f6328601',2,'5','d93c28435f7706aaf7670eb4a417b0c7e639944d6a31d8bdff1562f19a0f2bde',0],
 [1013,'68934c098e6cd4ad77a3b9215dd857def1306205432e73ccd2548dbc2e0652c2',2,'6','e673ea873de99a9dc957b2e792ae86ab038f8f2842ee20a934a1d985c28880b2',0],
 [1238,'f8633bbd91d33bee02c2cc582c33b7ffeb3643f312b810ad0bb8c5d154d0721d',1,'3','dcedf0ebd1435eb866002f9bfd63f364f662968837b08c3f55a48a22af8a5768',0],
 [1603,'f9236ec66af0dbd3fbd0231fdcaa6d922425c04d48178ea0737073e76e8eb7d5',2,'3','5776adf9b7cb2ab6db372d2ab470b7e41a4903c985625743d92f2c33124c4dcb',0],
 [952,'bc88bfeb0f184eb0c806c4efe04e84c24f3e5fcef9caaa12e94fd48d9f67a389',2,'5','9dd98d83179605a9c4876e25f46a6c6c05590dc6b0c75205207d957b49075e98',0],
 [542,'aff1623cbfcc5746a42ee3e24d9106759726a132f9d1a462260f9a4de6617f89',2,'5','5f0a49bbd71878eaf947f77588cbf6556642a5c1bc1b795c85ded2d7a41b5ddb',0],
 [1074,'bc2e0fb9fe7ef6e35e140594edec049972a605f9d93da65b59610506c83586c2',2,'6','ac1496fba40db1711ea31a1a33e9fb81aa37b444e632a4754c940aa5d1d2c1ae',0],
];
export const eventReplacements={
 280:[['¾','¿']],
 627:[['tienen\nEl 7%','El 7%'],['coche el 36%\nmoto','coche el 36% tienen\nmoto']],
 952:[['P (A) = 0 y P (B) = 0','P (A) ≠ 0 y P (B) ≠ 0'],['¾','¿'],['Justi\u001cque','Justifique'],['probabi-\n   lidades','probabilidades']],
 1603:[['¾','¿']],
 542:[['datos: el         de las','datos: el 66% de las'],['estas, el  utilizan','estas, el 71% utilizan'],['se sabe que el\n\nson hombres','se sabe que el 17.86%\n\nson hombres']],
 1074:[['El  de las','El 32% de las'],['y el                 ni tiene','y el 64.6% ni tiene'],['página web, el    realiza','página web, el 30% realiza']],
};
export function projectEventText(index,text){for(const[a,b]of eventReplacements[index]??[])text=text.split(a).join(b);return text;}
