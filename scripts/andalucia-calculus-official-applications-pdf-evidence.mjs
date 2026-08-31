import assert from 'node:assert/strict';
export const officialApplicationsObservations=[
 [76,'de33e9bdb3bab2ccc58eed7e1c4b97d79d708e558d7ac2b6339851702d1c91ed',1,'3','05ae0ccb70f8b0287a0f656cf5976be13bed33eb8ff5f3feffd7d7c1267b796e',0],
 [193,'aceec0dff8a42d7f43c1fd0c1ab308760bdb1e10dea89d588e7b10e62167b994',1,'3','1db1693e85eb36e2b9555fb54c2fa82c1764784d5b8a7141c5d95d31784a16b0',0],
 [498,'0be1dffd96126e6064f95f87111e09ab19a2f475a8851d900e8b1870ea751a2b',1,'4','20c64efafee7404db9fd5b5d6c7180643b0cccdc124d9642d961f91fd458f4be',0],
 [533,'ee5bd8e23465d55ed58339e7d9adf3d58423ac2966b53d92e39a2f9b35558ab1',1,'A2','fd9bd3f0e5223f2c7de006477ab057c25a0ee2ef2610e96936b4634f5df9c4cf',0],
];
export function officialApplicationsReplacements(r){const i=r.queueIndex;if(!officialApplicationsObservations.some(o=>o[0]===i))return[];const out=[],p=(k,s)=>out.push([r.parts[k].prompt,s,'PDF_VISIBLE_COMPLETE_SUBPART']);
 if(i===76){p(0,'Calcule la ecuación de la recta tangente a la gráfica de cada una de las siguientes funciones en el punto de abscisa x=0: f(x)=frac{3x²+5x−2}{−3x+7}; g(x)=ln(frac{1}{3x+1}).');p(1,'Calcule las integrales definidas siguientes: ∫_{−2}^{−1}frac{5}{3x⁴} dx; ∫_{−3}^{0}frac{e^(x/3)}{5} dx.');}
 else{const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>0);const prefix=i===193?'Se considera la función f(x)=x³−3x²+2x.':i===498?'La temperatura en el interior de un equipo de refrigeración durante un día que sufrió un corte de energía viene dada por la función f expresada en grados centígrados y el tiempo t en horas: f(t)={−9 si 0≤t≤1; −t²+12t−20 si 1<t<11; −9 si 11≤t≤24}.':'Una empresa ha realizado un estudio sobre los beneficios, en miles de euros, que ha obtenido en los últimos 10 años. La función a la que se ajustan dichos beneficios viene dada por B(t)=2t³−36t²+162t−6, con 0≤t≤10.';
 out.push([r.sourceLiteral.slice(0,at),prefix+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_AND_DOMAIN']);
 if(i===193){p(0,'Halle los puntos de corte con los ejes, los intervalos de crecimiento y decrecimiento, los extremos relativos de f y su curvatura.');p(1,'Represente gráficamente la función f.');p(2,'Calcule el área del recinto acotado, limitado por la gráfica de f y el eje de abscisas.');}
 if(i===498){p(0,'Estudie la continuidad de f.');p(1,'Represente gráficamente la función f.');p(2,'Conteste razonadamente a qué hora se produjo el corte de energía y cuánto duró dicho corte.');p(3,'El equipo de refrigeración se utiliza para conservar sueros y vacunas. Los sueros se estropean si se alcanzan temperaturas de 20 °C en algún momento. Las vacunas se estropean si están por encima de 0 °C durante más de seis horas. Razone si alguno de esos productos se estropeó ese día.');}
 }return out;}
