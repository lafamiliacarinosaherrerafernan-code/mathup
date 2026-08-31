import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1066,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',1,'A.1','a7b50c61f2d93707b5ae74747de5c9cbaa717f59f658f254f045a92563fb360c',0],
 [1067,'faa99db49ea6996077e64bcc83a8f7c0a39af31d3043cb323b178e5d73a511b7',1,'A.4','abb17cb23bb00cb826a426730cc34d5439be0d55e064b72ecf34856028b7e1d4',0],
 [1068,'a6eb3a790229e9010e2add3d5742fe55ab4447f4ebec72a4c01d131f0baf4d92',1,'B.4','60b0c61251da21047d13bc012bc59ccc4ca734030d016b1134f4a968c892e724',0],
 [1070,'9e05f4d8647530063d69251cbcbf13e7f990abe224aca9576f2e95d1342e4b1b',2,'B.2','084d33c26450a980b8b8548513542d274f5677370fdb8bb3996c80fd785c9dda',0],
 [1073,'9b43b63df1b76e5a1b95f77010ec0c24b3448817b7fbfaa1b397a9271c23e44f',1,'A.2','a7b50c61f2d93707b5ae74747de5c9cbaa717f59f658f254f045a92563fb360c',0],
];

export const statements={
 1066:'Calcula a y b sabiendo que lim_{x→0} frac{a sen(x)+x ln(x+1)+bx²}{x³+x²}=2, donde ln denota el logaritmo neperiano.',
 1067:'Considera los puntos A(1,0,2), B(−1,2,4) y la recta r definida por frac{x+2}{2}=y−1=frac{z−1}{3}.\na) Determina la ecuación del plano formado por los puntos que equidistan de A y de B.\nb) Halla la ecuación del plano paralelo a r y que contiene los puntos A y B.',
 1068:'Calcula ∫_{0}^{3} frac{x³}{sqrt{1+x}} dx. Sugerencia: efectúa el cambio de variable t=sqrt{1+x}.',
 1070:'Sea f:(0,+∞)→R la función dada por f(x)=ln(x), donde ln representa el logaritmo neperiano.\na) Calcula la ecuación de la recta tangente a la gráfica de f en el punto de abscisa x=1.\nb) Esboza el recinto comprendido entre la gráfica de f, la recta y=x−1 y la recta x=3. Calcula su área.',
 1073:'Sea f:[0,2π]→R la función definida por f(x)=e^x(cos(x)+sen(x)).\na) Halla los extremos absolutos de f: abscisas donde se obtienen y valores que se alcanzan.\nb) Determina la ecuación de la recta tangente y la ecuación de la recta normal a la gráfica de f en el punto de abscisa x=frac{3π}{2}.',
};
export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_LIMIT_GEOMETRY_INTEGRAL_EXTREMA_LAYOUT']]:[];
export const cases=[
 {index:1066,slot:2,literals:['sen(x)','ln (x + 1)','x→0']},
 {index:1067,slot:4,literals:['A(1, 0, 2)','B(−1, 2, 4)','paralelo a r']},
 {index:1068,slot:3,literals:['cambio de variable','t =','Calcula']},
 {index:1070,slot:3,literals:['f (x) = ln(x)','y = x − 1','recta x = 3']},
 {index:1073,slot:2,literals:['[0, 2π]','cos(x) + sen(x)','extremos absolutos']},
];
export const proof=c=>({
 1066:{a:0,b:1,finiteCoefficient:0,limit:2},
 1067:{bisectorNormal:[-1,1,1],bisectorConstant:-4,parallelNormal:[2,5,-3],parallelConstant:4},
 1068:{substitution:[1,2],exactNumerator:388,exactDenominator:35},
 1070:{tangent:[1,-1],area:4-3*Math.log(3)},
 1073:{critical:[Math.PI/2,3*Math.PI/2],minimum:-Math.exp(3*Math.PI/2),maximum:Math.exp(2*Math.PI)},
}[c.index]);

export const graphs={1070:{plotVersion:'limit-geometry-integral-extrema-v1',index:1070}};
export function renderLimitGeometryIntegralExtrema(g){
 assert.deepEqual(g,graphs[g.index]);
 const xmin=.15,xmax=3.35,ymin=-2.2,ymax=2.5,X=x=>70+630*(x-xmin)/(xmax-xmin),Y=y=>315-250*(y-ymin)/(ymax-ymin),pt=(x,y)=>`${X(x).toFixed(3)},${Y(y).toFixed(3)}`,trace=(f,a,b)=>Array.from({length:501},(_,j)=>pt(a+(b-a)*j/500,f(a+(b-a)*j/500))).join(' ');
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 420" role="img" aria-label="Gráficas de ln x e y igual a x menos uno, con el recinto verificado"><rect width="760" height="420" fill="white"/><defs><clipPath id="lgie-1070"><rect x="70" y="40" width="630" height="275"/></clipPath></defs>';
 for(let k=0;k<=6;k++){const x=xmin+(xmax-xmin)*k/6,y=ymin+(ymax-ymin)*k/6;s+=`<path d="M${pt(x,ymin)} L${pt(x,ymax)} M${pt(xmin,y)} L${pt(xmax,y)}" stroke="#e4e9ef"/><text x="${X(x)}" y="340" text-anchor="middle" font-size="13">${Number(x.toFixed(2))}</text><text x="62" y="${Y(y)+4}" text-anchor="end" font-size="13">${Number(y.toFixed(2))}</text>`;}
 const upper=trace(x=>x-1,1,3),lower=trace(Math.log,3,1);
 s+=`<g clip-path="url(#lgie-1070)"><polygon points="${upper} ${lower}" fill="#cee9db"/><polyline points="${trace(Math.log,xmin,xmax)}" fill="none" stroke="#17659b" stroke-width="3"/><polyline points="${trace(x=>x-1,xmin,xmax)}" fill="none" stroke="#a4384b" stroke-width="3"/><path d="M${pt(3,ymin)} L${pt(3,ymax)}" stroke="#555" stroke-dasharray="5 4"/><path d="M${pt(xmin,0)} L${pt(xmax,0)}" stroke="#333"/></g><circle cx="${X(1)}" cy="${Y(0)}" r="4" fill="#152e59"/><text x="${X(1)+8}" y="${Y(0)-8}" font-size="14">(1;0)</text><text x="35" y="382" font-size="17">Azul: y=ln x; rojo: y=x−1; límite derecho del recinto: x=3.</text><text x="35" y="408" font-size="17">Verde: área ∫₁³(x−1−ln x)dx=4−3ln3.</text></svg>`;
 return s;
}

const mkPart=(p,a,d,r,s,method,proofData,visual)=>{const out=part(p,a,d,r,s,method,proofData);if(visual)out.visual=structuredClone(visual);return out;};
export function solve(c){
 const ps=c.index===1066||c.index===1068?[{id:'whole',prompt:statements[c.index]}]:officialParts(statements[c.index]);
 switch(c.index){
 case 1066:return[mkPart(ps[0],'a=0, b=1.',['a=0, b=2.','a=1, b=0.','a=−1, b=2.'],['Olvidar que ln(1+x)/x tiende a uno.','No anular el término lineal y confundir el cociente con uno finito.','Compensar indebidamente un término lineal con uno cuadrático.'],[
  ['Separamos el denominador para identificar el orden mínimo necesario en el numerador.','x³+x²=x²(1+x)'],
  ['Dividimos el numerador por x cuando x≠0 y observamos el término que produciría divergencia.','frac{a sen x}{x²}=a·frac{sen x}{x}·frac{1}{x}; para que el límite sea finito debe ser a=0'],
  ['Con a=0 simplificamos exactamente un factor x², sin usar una aproximación.','frac{x ln(1+x)+bx²}{x²(1+x)}=frac{frac{ln(1+x)}{x}+b}{1+x}'],
  ['Aplicamos los límites notables del logaritmo y de la función identidad.','lim_{x→0}frac{ln(1+x)}{x}=1; lim_{x→0}(1+x)=1'],
  ['El límite queda expresado en función de b y lo igualamos a dos.','1+b=2 ⇒ b=1'],
  ['Comprobamos directamente la pareja obtenida en la expresión simplificada.','a=0,b=1 ⇒ lim_{x→0}frac{frac{ln(1+x)}{x}+1}{1+x}=2'],
 ],'LIMIT_ORDER_AND_EXACT_FACTOR_CANCELLATION',proof(c))];
 case 1067:return[
  mkPart(ps[0],'Plano mediador: −x+y+z−4=0.',['−x+y+z+4=0.','x+y+z−4=0.','−x+y−z−4=0.'],['Cambiar el signo del término independiente al sustituir el punto medio.','Usar como normal la suma de los puntos en vez del vector AB.','Cambiar una componente del vector normal.'],[
   ['Los puntos equidistantes de A y B forman el plano mediador del segmento AB.','A=(1,0,2); B=(−1,2,4)'],
   ['Calculamos el punto medio y un vector normal al plano.','M=frac{A+B}{2}=(0,1,3); overrightarrow{AB}=B−A=(−2,2,2)'],
   ['Simplificamos el vector normal sin cambiar su dirección.','n=(−1,1,1)'],
   ['Escribimos la ecuación punto-normal usando M.','−(x−0)+(y−1)+(z−3)=0'],
   ['Reducimos la ecuación cartesiana.','−x+y+z−4=0'],
   ['Verificamos que A y B dan valores opuestos y de igual módulo en la expresión.','F(A)=−3; F(B)=3 ⇒ dist(A,π)=dist(B,π)'],
  ],'MIDPLANE_VECTOR_GEOMETRY',proof(c)),
  mkPart(ps[1],'Plano: 2x+5y−3z+4=0.',['2x+5y−3z−4=0.','2x−5y−3z+4=0.','2x+5y+3z+4=0.'],['Cambiar el signo del término independiente.','Alterar una componente del producto vectorial.','Usar un vector que no es perpendicular a la dirección de la recta.'],[
   ['Extraemos un vector director de la recta y el vector que une A con B.','v=(2,1,3); overrightarrow{AB}=(−2,2,2)'],
   ['El plano buscado contiene ambas direcciones, por lo que su normal es perpendicular a las dos.','n=overrightarrow{AB}×v=(4,10,−6)=2(2,5,−3)'],
   ['Usamos la normal simplificada y el punto A.','2(x−1)+5(y−0)−3(z−2)=0'],
   ['Reducimos la ecuación.','2x+5y−3z+4=0'],
   ['Comprobamos que B pertenece al plano.','2(−1)+5·2−3·4+4=0'],
   ['Comprobamos el paralelismo con r mediante producto escalar.','(2,5,−3)·(2,1,3)=4+5−9=0'],
  ],'CROSS_PRODUCT_PLANE_CONSTRUCTION',proof(c))];
 case 1068:return[mkPart(ps[0],'frac{388}{35}.',['frac{194}{35}.','frac{388}{7}.','frac{372}{35}.'],['Olvidar el factor 2 de dx=2t dt.','No dividir todos los términos de la primitiva entre sus exponentes.','Evaluar incorrectamente el extremo inferior t=1.'],[
  ['Aplicamos el cambio sugerido y expresamos x y dx en función de t.','t=sqrt{1+x} ⇒ x=t²−1; dx=2t dt'],
  ['Transformamos los límites de integración.','x=0 ⇒ t=1; x=3 ⇒ t=2'],
  ['Sustituimos; el factor t del diferencial cancela el radical del denominador.','∫_{0}^{3}frac{x³}{sqrt{1+x}}dx=2∫_{1}^{2}(t²−1)³dt'],
  ['Desarrollamos el cubo antes de integrar.','(t²−1)³=t⁶−3t⁴+3t²−1'],
  ['Calculamos una primitiva término a término.','2[frac{t⁷}{7}−frac{3t⁵}{5}+t³−t]_{1}^{2}'],
  ['Evaluamos los dos extremos con denominador común.','En t=2: frac{178}{35}; en t=1: −frac{16}{35}'],
  ['Restamos y aplicamos el factor exterior.','2(frac{178}{35}+frac{16}{35})=frac{388}{35}'],
  ['Comprobación independiente: la derivada de la primitiva transformada es el integrando y una cuadratura numérica da 11,085714…','frac{388}{35}=11,085714…'],
 ],'SUGGESTED_SUBSTITUTION_AND_INDEPENDENT_QUADRATURE',proof(c))];
 case 1070:return[
  mkPart(ps[0],'y=x−1.',['y=x+1.','y=−x+1.','y=1.'],['Usar la ordenada como término independiente sin imponer el punto de tangencia.','Cambiar el signo de la derivada.','Confundir la tangente con una recta horizontal.'],[
   ['Calculamos el punto de la gráfica con abscisa uno.','f(1)=ln1=0 ⇒ P=(1,0)'],
   ['Derivamos la función logarítmica.','f′(x)=frac{1}{x}'],
   ['Evaluamos la pendiente en el punto de tangencia.','f′(1)=1'],
   ['Aplicamos la ecuación punto-pendiente.','y−0=1(x−1)'],
   ['Reducimos la ecuación.','y=x−1'],
   ['Comprobamos que pasa por P y tiene pendiente f′(1).','0=1−1; pendiente=1'],
  ],'TANGENT_DERIVATIVE_POINT_SLOPE',proof(c)),
  mkPart(ps[1],'Área=4−3ln(3) u².',['Área=3ln(3)−4 u².','Área=frac{9}{2}−3ln(3) u².','Área=4−ln(3) u².'],['Invertir el orden superior menos inferior y obtener signo negativo.','Olvidar restar el valor de la primitiva en x=1.','Olvidar el factor x que aparece al integrar ln x.'],[
   ['La desigualdad clásica ln x≤x−1 para x>0 muestra el orden de las curvas; se igualan en x=1.','x−1−ln x≥0; igualdad solo en x=1'],
   ['La recta x=3 completa el recinto, que queda sobre el intervalo [1,3].','1≤x≤3; superior y=x−1; inferior y=ln x'],
   ['Planteamos el área como integral de la diferencia positiva.','A=∫_{1}^{3}(x−1−ln x)dx'],
   ['Integramos ln x por partes.','∫ln x dx=x ln x−x'],
   ['Una primitiva de toda la diferencia se simplifica.','H(x)=frac{x²}{2}−x−(x ln x−x)=frac{x²}{2}−x ln x'],
   ['Aplicamos Barrow.','A=H(3)−H(1)=(frac{9}{2}−3ln3)−frac{1}{2}=4−3ln3'],
   ['El resultado es positivo y la cuadratura independiente coincide.','4−3ln3≈0,70416 u²'],
  ],'ORDERED_AREA_INTEGRAL_AND_QUADRATURE',proof(c),graphs[1070])];
 case 1073:return[
  mkPart(ps[0],'Mínimo absoluto en x=frac{3π}{2}: −e^{3π/2}; máximo absoluto en x=2π: e^{2π}.',['Mínimo absoluto en x=frac{π}{2}: e^{π/2}; máximo absoluto en x=2π: e^{2π}.','Mínimo absoluto en x=frac{3π}{2}: −e^{3π/2}; máximo absoluto en x=frac{π}{2}: e^{π/2}.','Mínimo absoluto en x=0: 1; máximo absoluto en x=2π: e^{2π}.'],['Confundir un máximo local positivo con el mínimo global.','No comparar el punto crítico con el extremo derecho del intervalo.','Comparar solo los extremos del dominio y omitir los puntos críticos.'],[
   ['La función es continua en el intervalo cerrado, así que alcanza extremos absolutos.','Dominio [0,2π]'],
   ['Derivamos aplicando producto y derivadas trigonométricas.','f′(x)=e^x(cos x+sen x)+e^x(−sen x+cos x)=2e^x cos x'],
   ['Como e^x nunca se anula, los puntos críticos dependen de cos x.','cos x=0 ⇒ x=frac{π}{2},frac{3π}{2}'],
   ['Evaluamos extremos del intervalo y puntos críticos.','f(0)=1; f(frac{π}{2})=e^{π/2}; f(frac{3π}{2})=−e^{3π/2}; f(2π)=e^{2π}'],
   ['Comparamos los cuatro valores teniendo en cuenta sus signos y magnitudes.','−e^{3π/2}<1<e^{π/2}<e^{2π}'],
   ['Identificamos mínimo y máximo absolutos.','Mínimo: (frac{3π}{2},−e^{3π/2}); máximo: (2π,e^{2π})'],
   ['Comprobamos la monotonía con el signo del coseno.','f′>0 en (0,frac{π}{2})∪(frac{3π}{2},2π); f′<0 en (frac{π}{2},frac{3π}{2})'],
  ],'CLOSED_INTERVAL_EXTREMA_AND_DERIVATIVE_SIGN',proof(c)),
  mkPart(ps[1],'Tangente: y=−e^{3π/2}. Normal: x=frac{3π}{2}.',['Tangente: x=frac{3π}{2}. Normal: y=−e^{3π/2}.','Tangente: y=e^{3π/2}. Normal: x=frac{3π}{2}.','Tangente: y=−e^{3π/2}+x−frac{3π}{2}. Normal: x=frac{3π}{2}.'],['Intercambiar la recta horizontal con la vertical.','Perder el signo de cos(3π/2)+sen(3π/2).','Asignar pendiente uno aunque la derivada vale cero.'],[
   ['Recuperamos el punto de la gráfica calculado en el apartado anterior.','P=(frac{3π}{2},−e^{3π/2})'],
   ['Evaluamos la derivada en esa abscisa.','f′(frac{3π}{2})=2e^{3π/2}cos(frac{3π}{2})=0'],
   ['La tangente de pendiente cero es horizontal y pasa por P.','y=−e^{3π/2}'],
   ['La normal es perpendicular a una recta horizontal.','x=frac{3π}{2}'],
   ['Comprobamos que ambas rectas contienen P.','P satisface y=−e^{3π/2} y x=frac{3π}{2}'],
   ['Sus direcciones son perpendiculares.','Tangente: (1,0); normal: (0,1); producto escalar=0'],
  ],'TANGENT_NORMAL_AT_HORIZONTAL_TANGENCY',proof(c))];
 default:throw Error('Unknown limit/geometry/integral/extrema source');
 }
}

export function buildLimitGeometryIntegralExtremaBatch(id='batch-0471',selected=cases){
 const r=buildBatch(selected,id,solve,proof);
 for(const x of r.batch.records){const c=x.correctionEvidence.parameters;x.primaryTopic=c.index===1066?'Límites':c.index===1067?'Geometría del espacio':c.index===1068?'Integrales':c.index===1070?'Integrales definidas y áreas':'Derivadas';x.secondaryTopics=c.index===1070?['Recta tangente']:c.index===1073?['Extremos absolutos','Recta tangente y normal']:[];x.block=c.index===1067?'Geometría':(c.index===1068||c.index===1070)?'Integrales':'Límites/continuidad/derivadas';x.examSlot=c.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'SOURCE_BOUND_EXACT_SYMBOLIC_SOLUTION_WITH_INDEPENDENT_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_VERIFICATION';}
 return r;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildLimitGeometryIntegralExtremaBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0471-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0471.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
