import assert from 'node:assert/strict';
export const extremaApplicationsObservations=[
 [48,'5e9c5e3ee1e485c1727c46832d04d68088cf325bba4a1bd556790abcb1687bc1',1,'3','d7a45aec336026229cb61eb30bb1bfc8f910d806308ad809d261e1a22873f0a8',0],
 [170,'0f95b6aefa78f1a13e2115b281338bd807177671c303c380180957fe03f0a605',1,'A.2','3ae2c73cda44f4f2257b05d475021d4c52563d184e9d441a54e1451469334497',0],
 [205,'4440c15a31a77ee9e052a0668923508e117795b369d569bc02d24b7937366f7a',1,'A.2','754b55880cb1ea19e7d73aa1102185bf3be968889f1addfb230549206cd50638',0],
 [284,'68934c098e6cd4ad77a3b9215dd857def1306205432e73ccd2548dbc2e0652c2',1,'3','05d232f41f1761edc9041b434d5e1ab964f0ee96529f34d3601c297e6e4ca055',0],
];
const prefixes={
 48:'Un grupo de emprendedores valora crear una empresa y, para ello, ha encargado un estudio de mercado en el que se estima que los beneficios para los próximos 10 años, en millones de euros, vendrán dados por la función: B(t)=frac{3t}{t+2}−1; 0≤t≤10, donde t representa los años transcurridos desde la apertura de la empresa.',
 170:'El consumo de cereales en una ciudad, en miles de toneladas, viene dado por la función c(t)=t³−15t²+63t+10, para 0≤t≤12, donde t representa el tiempo.',
 284:'Una empresa de fumigación sabe que los beneficios, en miles de euros, que obtiene en función de las hectáreas que le encargan fumigar mensualmente viene dada por la expresión B(x)=−x²+16x−48. Además, por problemas de personal, la empresa no puede fumigar más de 10 hectáreas al mes.',
};
const prompts={
 48:['¿En qué intervalo de tiempo la empresa no tendrá beneficios?','¿En qué momento se alcanza el máximo beneficio y a cuánto asciende su valor?','¿Cuánto tiempo ha de pasar para que la empresa obtenga un beneficio de 800000 €?','Si la función de beneficios se mantuviera y transcurrieran los años de manera indefinida, ¿a qué valor tendería el beneficio de la empresa?'],
 170:['¿En qué instante se alcanza el máximo consumo de cereales y cuántas toneladas se consumen en ese momento?','¿En qué intervalo de tiempo decrece el consumo de cereales?','Represente gráficamente la función.'],
 205:['Determine el valor de a para que sea continua en x=−1 la función f(x)={frac{ax}{x−1} si x≤−1; x³−3x²+6x−2 si x>−1}.','Calcule los coeficientes b y c de la función g(x)=x³+bx²+cx−2 para que (1;2) sea un punto de inflexión de g.'],
 284:['¿Cuántas hectáreas tiene que fumigar al mes para que la empresa tenga beneficios?','¿Cuántas hectáreas tiene que fumigar para obtener el máximo beneficio mensual? ¿A cuánto asciende dicho beneficio?','Si un mes ha obtenido un beneficio de 7000 €, ¿cuántas hectáreas ha fumigado?'],
};
export function extremaApplicationsReplacements(r){const i=r.queueIndex;if(!prompts[i])return[];const out=[];if(prefixes[i]){const at=r.sourceLiteral.search(/a\) \(/);assert.ok(at>0);out.push([r.sourceLiteral.slice(0,at),prefixes[i]+'\n\n','PDF_VISIBLE_COMPLETE_FUNCTION_DOMAIN_AND_UNIT']);}assert.equal(r.parts.length,prompts[i].length);prompts[i].forEach((p,k)=>out.push([r.parts[k].prompt,p,'PDF_VISIBLE_COMPLETE_SUBPART']));return out;}
