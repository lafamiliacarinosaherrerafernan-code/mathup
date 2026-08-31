// Whole words compared against the institutional PDF, not a heuristic encoding fix.
export const percentContextObservations=[
 [803,'69f8b84ed22f2b49074eafb95dbdce8a98114a4a2f02989b92f3f7add9355155',2,'B.3','bb3fd38118d4585a40f6252048faa3691b30f657fc3bc438f22d75af9c126bab',0],
 [1020,'98b7723232acd3143de28397f7641923ed48292db7c35883ebd2b56a72b30b79',1,'A.3','cd94b312d0746892f4b5bc3e5022098cacf34b3d202747a903c8c708ab977f77',0],
 [1069,'11865b83e509d9cc2723c752f7a81f714378e1b651f4a4d010dab4a4576b74c2',2,'6','e11a004c067d34b76b05fb9617ac39bb1b87043713a7c572e816f4a3c19bb92c',0],
];
export const percentContextReplacements={
 803:[['compa��a','compañía'],['m�dicos','médicos'],['�qu�','¿qué']],
 1020:[['poblaci�n','población']],
 1069:[['ense�anza','enseñanza'],['comisi�n','comisión'],['Adem�s','Además'],['�Cu�l','¿Cuál'],['ning�n','ningún'],['�qu�','¿qué'],['\n\n                    BLOQUE D','']],
};
export function projectPercentContext(index,text){for(const[a,b]of percentContextReplacements[index]??[])text=text.split(a).join(b);return text;}
