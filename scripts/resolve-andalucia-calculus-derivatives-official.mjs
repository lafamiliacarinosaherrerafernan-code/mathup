import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
const F=(a,b)=>`frac{${a}}{${b}}`;
export const cases=[
 {index:148,literals:['Calcule la derivada','abscisa x = 1']},
 {index:979,literals:['Calcule la derivada','Halle la función h(x)']},
 {index:1233,literals:['Calcule las derivadas','asíntotas']},
 {index:1390,literals:['Calcule las derivadas','x−3']},
 {index:1422,literals:['Calcule las derivadas','puntos de corte']},
 {index:1442,literals:['Calcule la derivada','log']},
 {index:1417,literals:['continua en x = 1','a =2']},
 {index:1443,literals:['continua y derivable','abscisa x = 2']},
];
// Symbolic formulae are transcribed from the visually inspected PDFs; the
// independent tests differentiate these source functions numerically, rather
// than merely asserting the result emitted by this solver.
export const derivativeSpecs={
 '148f':{
 source:`f(x)=${F('e^{5x}−x','x²−x')}`,domain:'x≠0,1',
 definitions:'u=e^{5x}−x; v=x²−x',inner:'u′=5e^{5x}−1; v′=2x−1',
 formula:F('(5e^{5x}−1)(x²−x)−(e^{5x}−x)(2x−1)','(x²−x)²'),
 wrong:[F('(5e^{5x}−1)(x²−x)+(e^{5x}−x)(2x−1)','(x²−x)²'),F('(e^{5x}−1)(x²−x)−(e^{5x}−x)(2x−1)','(x²−x)²'),F('(5e^{5x}−1)(x²−x)−(e^{5x}−x)(2x−1)','x²−x')],
 rule:'(u/v)′=(u′v−uv′)/v²',reasons:['Cambiar la resta del cociente por suma.','Omitir el factor cinco de la exponencial.','No elevar al cuadrado el denominador.'],
 f:x=>(Math.exp(5*x)-x)/(x*x-x),d:x=>((5*Math.exp(5*x)-1)*(x*x-x)-(Math.exp(5*x)-x)*(2*x-1))/(x*x-x)**2,
 w:[x=>((5*Math.exp(5*x)-1)*(x*x-x)+(Math.exp(5*x)-x)*(2*x-1))/(x*x-x)**2,x=>((Math.exp(5*x)-1)*(x*x-x)-(Math.exp(5*x)-x)*(2*x-1))/(x*x-x)**2,x=>((5*Math.exp(5*x)-1)*(x*x-x)-(Math.exp(5*x)-x)*(2*x-1))/(x*x-x)],samples:[-.8,-.3,.2,.4]},
 '148g':{
 source:'g(x)=(2x²−x)³·ln(x³+2)',domain:'x³+2>0',definitions:'u=2x²−x; v=x³+2',inner:'u′=4x−1; v′=3x²',rule:'(u³·ln v)′=3u²u′·ln v+u³v′/v',
 formula:`3(2x²−x)²(4x−1)·ln(x³+2)+${F('3x²(2x²−x)³','x³+2')}`,
 wrong:[`3(2x²−x)²·ln(x³+2)+${F('3x²(2x²−x)³','x³+2')}`,`3(2x²−x)²(4x−1)·ln(x³+2)−${F('3x²(2x²−x)³','x³+2')}`,`3(2x²−x)²(4x−1)·ln(x³+2)+${F('(2x²−x)³','x³+2')}`],reasons:['Omitir la derivada del polinomio interior.','Usar una resta en la derivada del producto.','Omitir la derivada de x³+2.'],
 f:x=>(2*x*x-x)**3*Math.log(x**3+2),d:x=>3*(2*x*x-x)**2*(4*x-1)*Math.log(x**3+2)+(2*x*x-x)**3*3*x*x/(x**3+2),w:[x=>3*(2*x*x-x)**2*Math.log(x**3+2)+(2*x*x-x)**3*3*x*x/(x**3+2),x=>3*(2*x*x-x)**2*(4*x-1)*Math.log(x**3+2)-(2*x*x-x)**3*3*x*x/(x**3+2),x=>3*(2*x*x-x)**2*(4*x-1)*Math.log(x**3+2)+(2*x*x-x)**3/(x**3+2)],samples:[.2,.7,1.1,1.4]},
 '979f':{
 source:'f(x)=(5x³+4x−2)⁴·ln(2x⁵−4x³+x)',domain:'2x⁵−4x³+x>0',definitions:'u=5x³+4x−2; v=2x⁵−4x³+x',inner:'u′=15x²+4; v′=10x⁴−12x²+1',rule:'(u⁴·ln v)′=4u³u′·ln v+u⁴v′/v',
 formula:`4(5x³+4x−2)³(15x²+4)·ln(2x⁵−4x³+x)+${F('(5x³+4x−2)⁴(10x⁴−12x²+1)','2x⁵−4x³+x')}`,
 wrong:[`4(5x³+4x−2)³·ln(2x⁵−4x³+x)+${F('(5x³+4x−2)⁴(10x⁴−12x²+1)','2x⁵−4x³+x')}`,`4(5x³+4x−2)³(15x²+4)·ln(2x⁵−4x³+x)−${F('(5x³+4x−2)⁴(10x⁴−12x²+1)','2x⁵−4x³+x')}`,`4(5x³+4x−2)³(15x²+4)·ln(2x⁵−4x³+x)+${F('(5x³+4x−2)⁴','2x⁵−4x³+x')}`],reasons:['Omitir u′.','Restar el segundo término del producto.','Omitir v′ al derivar el logaritmo.'],
 f:x=>(5*x**3+4*x-2)**4*Math.log(2*x**5-4*x**3+x),d:x=>4*(5*x**3+4*x-2)**3*(15*x*x+4)*Math.log(2*x**5-4*x**3+x)+(5*x**3+4*x-2)**4*(10*x**4-12*x*x+1)/(2*x**5-4*x**3+x),w:[x=>4*(5*x**3+4*x-2)**3*Math.log(2*x**5-4*x**3+x)+(5*x**3+4*x-2)**4*(10*x**4-12*x*x+1)/(2*x**5-4*x**3+x),x=>4*(5*x**3+4*x-2)**3*(15*x*x+4)*Math.log(2*x**5-4*x**3+x)-(5*x**3+4*x-2)**4*(10*x**4-12*x*x+1)/(2*x**5-4*x**3+x),x=>4*(5*x**3+4*x-2)**3*(15*x*x+4)*Math.log(2*x**5-4*x**3+x)+(5*x**3+4*x-2)**4/(2*x**5-4*x**3+x)],samples:[.1,.2,.3,1.5]},
 '979g':{
 source:`g(x)=${F('e^{3x²−5x}','(6x²+2)³')}`,domain:'x∈ℝ',definitions:'u=3x²−5x; v=6x²+2',inner:'u′=6x−5; v′=12x',rule:'(eᵘ/v³)′=eᵘ(u′v−3v′)/v⁴',
 formula:F('e^{3x²−5x}((6x−5)(6x²+2)−36x)','(6x²+2)⁴'),wrong:[F('e^{3x²−5x}((6x−5)(6x²+2)+36x)','(6x²+2)⁴'),F('e^{3x²−5x}((6x−5)(6x²+2)−12x)','(6x²+2)⁴'),F('e^{3x²−5x}((6x−5)(6x²+2)−36x)','(6x²+2)³')],reasons:['Cambiar el signo del segundo término.','Omitir el factor tres de la potencia del denominador.','Reducir mal la potencia del denominador.'],
 f:x=>Math.exp(3*x*x-5*x)/(6*x*x+2)**3,d:x=>Math.exp(3*x*x-5*x)*((6*x-5)*(6*x*x+2)-36*x)/(6*x*x+2)**4,w:[x=>Math.exp(3*x*x-5*x)*((6*x-5)*(6*x*x+2)+36*x)/(6*x*x+2)**4,x=>Math.exp(3*x*x-5*x)*((6*x-5)*(6*x*x+2)-12*x)/(6*x*x+2)**4,x=>Math.exp(3*x*x-5*x)*((6*x-5)*(6*x*x+2)-36*x)/(6*x*x+2)**3],samples:[-.3,.2,.4,.7]},
 '1233f':{
 source:'f(x)=(x²−1)(3x³+5x)³',domain:'x∈ℝ',definitions:'u=x²−1; v=3x³+5x',inner:'u′=2x; v′=9x²+5',rule:'(uv³)′=u′v³+3uv²v′',formula:'2x(3x³+5x)³+3(x²−1)(3x³+5x)²(9x²+5)',wrong:['2x(3x³+5x)³+3(x²−1)(3x³+5x)²','2x(3x³+5x)³−3(x²−1)(3x³+5x)²(9x²+5)','2x(3x³+5x)³+(x²−1)(3x³+5x)²(9x²+5)'],reasons:['Omitir v′.','Restar los términos de la derivada del producto.','Omitir el factor tres.'],
 f:x=>(x*x-1)*(3*x**3+5*x)**3,d:x=>2*x*(3*x**3+5*x)**3+3*(x*x-1)*(3*x**3+5*x)**2*(9*x*x+5),w:[x=>2*x*(3*x**3+5*x)**3+3*(x*x-1)*(3*x**3+5*x)**2,x=>2*x*(3*x**3+5*x)**3-3*(x*x-1)*(3*x**3+5*x)**2*(9*x*x+5),x=>2*x*(3*x**3+5*x)**3+(x*x-1)*(3*x**3+5*x)**2*(9*x*x+5)],samples:[-.8,.2,.7,1.3]},
 '1233g':{
 source:`g(x)=${F('ln(3x)','e^{2x}')}`,domain:'x>0',definitions:'u=ln(3x); v=e^{2x}',inner:'u′=1/x; v′=2e^{2x}',rule:'(u/v)′=(u′v−uv′)/v²',formula:`e^{−2x}(${F(1,'x')}−2ln(3x))`,wrong:[`e^{−2x}(${F(3,'x')}−2ln(3x))`,`e^{−2x}(${F(1,'x')}+2ln(3x))`,`e^{−2x}(${F(1,'x')}−ln(3x))`],reasons:['No simplificar 3/(3x) correctamente.','Cambiar el signo del cociente.','Omitir el factor dos de la exponencial.'],
 f:x=>Math.log(3*x)/Math.exp(2*x),d:x=>Math.exp(-2*x)*(1/x-2*Math.log(3*x)),w:[x=>Math.exp(-2*x)*(3/x-2*Math.log(3*x)),x=>Math.exp(-2*x)*(1/x+2*Math.log(3*x)),x=>Math.exp(-2*x)*(1/x-Math.log(3*x))],samples:[.2,.4,.7,1.3]},
 '1390f':{
 source:`f(x)=${F('(x²−5)³','3−x²')}`,domain:'x≠−√3,√3',definitions:'u=(x²−5)³; v=3−x²',inner:'u′=6x(x²−5)²; v′=−2x',rule:'(u/v)′=(u′v−uv′)/v²',formula:F('6x(x²−5)²(3−x²)+2x(x²−5)³','(3−x²)²'),wrong:[F('6x(x²−5)²(3−x²)−2x(x²−5)³','(3−x²)²'),F('3(x²−5)²(3−x²)+2x(x²−5)³','(3−x²)²'),F('6x(x²−5)²(3−x²)+2x(x²−5)³','3−x²')],reasons:['Perder el doble signo negativo.','Omitir la derivada 2x del interior.','Omitir el cuadrado del denominador.'],
 f:x=>(x*x-5)**3/(3-x*x),d:x=>(6*x*(x*x-5)**2*(3-x*x)+2*x*(x*x-5)**3)/(3-x*x)**2,w:[x=>(6*x*(x*x-5)**2*(3-x*x)-2*x*(x*x-5)**3)/(3-x*x)**2,x=>(3*(x*x-5)**2*(3-x*x)+2*x*(x*x-5)**3)/(3-x*x)**2,x=>(6*x*(x*x-5)**2*(3-x*x)+2*x*(x*x-5)**3)/(3-x*x)],samples:[-.8,.2,.7,1.3]},
 '1390g':{
 source:'g(x)=e^{7x}(x−5x²)²',domain:'x∈ℝ',definitions:'u=e^{7x}; v=x−5x²',inner:'u′=7e^{7x}; v′=1−10x',rule:'(uv²)′=u′v²+2uvv′',formula:'e^{7x}(7(x−5x²)²+2(x−5x²)(1−10x))',wrong:['e^{7x}((x−5x²)²+2(x−5x²)(1−10x))','e^{7x}(7(x−5x²)²−2(x−5x²)(1−10x))','e^{7x}(7(x−5x²)²+2(x−5x²))'],reasons:['Omitir el factor siete.','Cambiar suma por resta.','Omitir la derivada 1−10x.'],
 f:x=>Math.exp(7*x)*(x-5*x*x)**2,d:x=>Math.exp(7*x)*(7*(x-5*x*x)**2+2*(x-5*x*x)*(1-10*x)),w:[x=>Math.exp(7*x)*((x-5*x*x)**2+2*(x-5*x*x)*(1-10*x)),x=>Math.exp(7*x)*(7*(x-5*x*x)**2-2*(x-5*x*x)*(1-10*x)),x=>Math.exp(7*x)*(7*(x-5*x*x)**2+2*(x-5*x*x))],samples:[-.3,.1,.3,.6]},
 '1390h':{
 source:`h(x)=${F('x·ln(1−x²)','x−3')}`,domain:'−1<x<1',definitions:'u=x·ln(1−x²); v=x−3',inner:`u′=ln(1−x²)−${F('2x²','1−x²')}; v′=1`,rule:'(u/v)′=(u′v−uv′)/v²',formula:F(`(ln(1−x²)−${F('2x²','1−x²')})(x−3)−x·ln(1−x²)`,'(x−3)²'),wrong:[F(`(ln(1−x²)+${F('2x²','1−x²')})(x−3)−x·ln(1−x²)`,'(x−3)²'),F(`(ln(1−x²)−${F('2x²','1−x²')})(x−3)+x·ln(1−x²)`,'(x−3)²'),F(`(ln(1−x²)−${F('2x²','1−x²')})(x−3)−x·ln(1−x²)`,'x−3')],reasons:['Perder el signo de la derivada de 1−x².','Sumar el término uv′.','Omitir el cuadrado del denominador.'],
 f:x=>x*Math.log(1-x*x)/(x-3),d:x=>((Math.log(1-x*x)-2*x*x/(1-x*x))*(x-3)-x*Math.log(1-x*x))/(x-3)**2,w:[x=>((Math.log(1-x*x)+2*x*x/(1-x*x))*(x-3)-x*Math.log(1-x*x))/(x-3)**2,x=>((Math.log(1-x*x)-2*x*x/(1-x*x))*(x-3)+x*Math.log(1-x*x))/(x-3)**2,x=>((Math.log(1-x*x)-2*x*x/(1-x*x))*(x-3)-x*Math.log(1-x*x))/(x-3)],samples:[-.8,-.3,.2,.7]},
 '1422f':{
 source:`f(x)=(${F('2−5x',3)})²+${F('1−2x','x²')}`,domain:'x≠0',definitions:'u=(2−5x)/3; v=(1−2x)/x²',inner:'u′=−5/3; v=x^{−2}−2x^{−1}',rule:'(u²+v)′=2uu′+v′',formula:`−${F('10(2−5x)',9)}+${F('2(x−1)','x³')}`,wrong:[`${F('10(2−5x)',9)}+${F('2(x−1)','x³')}`,`−${F('10(2−5x)',3)}+${F('2(x−1)','x³')}`,`−${F('10(2−5x)',9)}−${F('2(x−1)','x³')}`],reasons:['Perder el signo de −5.','Olvidar uno de los factores un tercio.','Cambiar el signo de la derivada del segundo sumando.'],
 f:x=>((2-5*x)/3)**2+(1-2*x)/(x*x),d:x=>-10*(2-5*x)/9+2*(x-1)/x**3,w:[x=>10*(2-5*x)/9+2*(x-1)/x**3,x=>-10*(2-5*x)/3+2*(x-1)/x**3,x=>-10*(2-5*x)/9-2*(x-1)/x**3],samples:[-.8,.2,.7,1.3]},
 '1422g':{
 source:'g(x)=(3x+2)²·ln(1+x²)',domain:'x∈ℝ',definitions:'u=3x+2; v=1+x²',inner:'u′=3; v′=2x',rule:'(u²·ln v)′=2uu′·ln v+u²v′/v',formula:`6(3x+2)·ln(1+x²)+${F('2x(3x+2)²','1+x²')}`,wrong:[`2(3x+2)·ln(1+x²)+${F('2x(3x+2)²','1+x²')}`,`6(3x+2)·ln(1+x²)−${F('2x(3x+2)²','1+x²')}`,`6(3x+2)·ln(1+x²)+${F('(3x+2)²','1+x²')}`],reasons:['Omitir la derivada de 3x+2.','Restar en la regla del producto.','Omitir la derivada de 1+x².'],
 f:x=>(3*x+2)**2*Math.log(1+x*x),d:x=>6*(3*x+2)*Math.log(1+x*x)+2*x*(3*x+2)**2/(1+x*x),w:[x=>2*(3*x+2)*Math.log(1+x*x)+2*x*(3*x+2)**2/(1+x*x),x=>6*(3*x+2)*Math.log(1+x*x)-2*x*(3*x+2)**2/(1+x*x),x=>6*(3*x+2)*Math.log(1+x*x)+(3*x+2)**2/(1+x*x)],samples:[-.8,.2,.7,1.3]},
 '1442f':{
 source:`f(x)=${F('2(1−3x)²','1+3x')}`,domain:'x≠−1/3',definitions:'u=2(1−3x)²; v=1+3x',inner:'u′=−12(1−3x); v′=3',rule:'(u/v)′=(u′v−uv′)/v²',formula:F('−6(1−3x)(3+3x)','(1+3x)²'),wrong:[F('6(1−3x)(3+3x)','(1+3x)²'),F('−6(1−3x)(3+3x)','1+3x'),F('−2(1−3x)(3+3x)','(1+3x)²')],reasons:['Perder el signo de la cadena.','No elevar el denominador al cuadrado.','Omitir un factor tres.'],simplify:'−12(1−3x)(1+3x)−6(1−3x)²=−6(1−3x)(3+3x)',
 f:x=>2*(1-3*x)**2/(1+3*x),d:x=>-6*(1-3*x)*(3+3*x)/(1+3*x)**2,w:[x=>6*(1-3*x)*(3+3*x)/(1+3*x)**2,x=>-6*(1-3*x)*(3+3*x)/(1+3*x),x=>-2*(1-3*x)*(3+3*x)/(1+3*x)**2],samples:[-.1,.2,.7,1.3]},
 '1442g':{
 source:'g(x)=(x²−x+1)e^{5x}',domain:'x∈ℝ',definitions:'u=x²−x+1; v=e^{5x}',inner:'u′=2x−1; v′=5e^{5x}',rule:'(uv)′=u′v+uv′',formula:'e^{5x}(5x²−3x+4)',wrong:['e^{5x}(x²+x)','e^{5x}(−5x²+7x−6)','e^{5x}(5x²−3x+6)'],reasons:['Omitir el factor cinco de la exponencial.','Restar los términos del producto.','Derivar −x como +1.'],simplify:'(2x−1)+5(x²−x+1)=5x²−3x+4',
 f:x=>(x*x-x+1)*Math.exp(5*x),d:x=>Math.exp(5*x)*(5*x*x-3*x+4),w:[x=>Math.exp(5*x)*(x*x+x),x=>Math.exp(5*x)*(-5*x*x+7*x-6),x=>Math.exp(5*x)*(5*x*x-3*x+6)],samples:[-.8,.2,.7,1.3]},
 '1442h':{
 source:'h(x)=log(x²+x+1)',domain:'x∈ℝ; x²+x+1=(x+1/2)²+3/4>0',definitions:'u=x²+x+1; log es el logaritmo decimal',inner:'u′=2x+1',rule:'(log u)′=u′/(u·ln 10)',formula:F('2x+1','(x²+x+1)·ln(10)'),wrong:[F('2x+1','x²+x+1'),F(1,'(x²+x+1)·ln(10)'),F('2x+1','(x²+x+1)·ln(2)')],reasons:['Confundir logaritmo decimal con natural.','Omitir la derivada del argumento.','Usar base dos en lugar de diez.'],
 f:x=>Math.log10(x*x+x+1),d:x=>(2*x+1)/((x*x+x+1)*Math.LN10),w:[x=>(2*x+1)/(x*x+x+1),x=>1/((x*x+x+1)*Math.LN10),x=>(2*x+1)/((x*x+x+1)*Math.LN2)],samples:[-.8,.2,.7,1.3]},
};
// Explicit local abbreviations keep each fraction legible on narrow cards.
// They are part of EVERY choice, not an unstated substitution or a source edit.
export const compactDerivatives={
 '148f':{definitions:'U=e^{5x}−x; V=x²−x',formula:`${F('5e^{5x}−1','V')} − ${F('U(2x−1)','V²')}`,wrong:[`${F('5e^{5x}−1','V')} + ${F('U(2x−1)','V²')}`,`${F('e^{5x}−1','V')} − ${F('U(2x−1)','V²')}`,`5e^{5x}−1 − ${F('U(2x−1)','V')}`]},
 '148g':{definitions:'U=2x²−x; V=x³+2',formula:`3U²(4x−1)·ln(V) + ${F('3x²U³','V')}`},
 '979f':{definitions:'U=5x³+4x−2; V=2x⁵−4x³+x',formula:`4U³(15x²+4)·ln(V) + ${F('U⁴(10x⁴−12x²+1)','V')}`,wrong:[`4U³·ln(V) + ${F('U⁴(10x⁴−12x²+1)','V')}`,`4U³(15x²+4)·ln(V) − ${F('U⁴(10x⁴−12x²+1)','V')}`,`4U³(15x²+4)·ln(V) + ${F('U⁴','V')}`]},
 '979g':{definitions:'U=3x²−5x; V=6x²+2',formula:`${F('e^{U}','V³')}·(6x−5 − ${F('36x','V')})`},
 '1233f':{definitions:'U=x²−1; V=3x³+5x',formula:'2xV³ + 3UV²(9x²+5)',wrong:['2xV³ + 3UV²','2xV³ − 3UV²(9x²+5)','2xV³ + UV²(9x²+5)']},
 '1390f':{definitions:'U=x²−5; V=3−x²',formula:`${F('6xU²','V')} + ${F('2xU³','V²')}`,wrong:[`${F('6xU²','V')} − ${F('2xU³','V²')}`,`${F('3U²','V')} + ${F('2xU³','V²')}`,`6xU² + ${F('2xU³','V')}`]},
 '1390g':{definitions:'U=x−5x²',formula:'e^{7x}·(7U² + 2U(1−10x))',wrong:['e^{7x}·(U² + 2U(1−10x))','e^{7x}·(7U² − 2U(1−10x))','e^{7x}·(7U² + 2U)']},
 '1390h':{definitions:'U=ln(1−x²); V=x−3',formula:`−${F('3U','V²')} − ${F('2x²','(1−x²)V')}`,wrong:[`−${F('3U','V²')} + ${F('2x²','(1−x²)V')}`,`${F('(2x−3)U','V²')} − ${F('2x²','(1−x²)V')}`,`−${F('3U','V')} − ${F('2x²','1−x²')}`]},
 '1422g':{definitions:'U=3x+2; V=1+x²',formula:`6U·ln(V) + ${F('2xU²','V')}`},
};
function optionExpression(key,wrongIndex){const s=derivativeSpecs[key],c=compactDerivatives[key],label=key.slice(-1);return c?`Con ${c.definitions}: ${label}′(x)=${wrongIndex===undefined?c.formula:c.wrong[wrongIndex]}`:`${label}′(x)=${wrongIndex===undefined?s.formula:s.wrong[wrongIndex]}`;}
export function explicitDerivativeRule(rule){
 const rules={
 '(u/v)′=(u′v−uv′)/v²':`(${F('u','v')})′=${F('u′v−uv′','v²')}`,
 '(u³·ln v)′=3u²u′·ln v+u³v′/v':`(u³·ln v)′=3u²u′·ln v+${F('u³v′','v')}`,
 '(u⁴·ln v)′=4u³u′·ln v+u⁴v′/v':`(u⁴·ln v)′=4u³u′·ln v+${F('u⁴v′','v')}`,
 '(eᵘ/v³)′=eᵘ(u′v−3v′)/v⁴':`(${F('e^{u}','v³')})′=${F('e^{u}(u′v−3v′)','v⁴')}`,
 '(u²·ln v)′=2uu′·ln v+u²v′/v':`(u²·ln v)′=2uu′·ln v+${F('u²v′','v')}`,
 '(log u)′=u′/(u·ln 10)':`(log u)′=${F('u′','u·ln(10)')}`,
 };return rules[rule]??rule;
}
function derivativePart(p,keys){const specs=keys.map(k=>derivativeSpecs[k]),labels=keys.map(k=>k.slice(-1)),answer=keys.map(k=>optionExpression(k)).join('; '),wrong=[0,1,2].map(j=>keys.map((k,i)=>optionExpression(k,i===0?j:undefined)).join('; ')),steps=[];
 for(const [i,s]of specs.entries())steps.push(
  [`Identificamos la función ${labels[i]} y su dominio antes de derivar.`,s.source+'; '+s.domain],
  ['Separamos las funciones interiores para aplicar la regla adecuada.',s.definitions],
  ['Calculamos las derivadas interiores, conservando todos los factores de la cadena.',s.inner],
  ['Aplicamos la regla del producto o cociente y la cadena.',explicitDerivativeRule(s.rule)],
  ['Sustituimos las derivadas interiores. Las abreviaturas, cuando se utilizan, quedan definidas junto al resultado.',s.simplify??optionExpression(keys[i])],
  ['El resultado conserva el dominio indicado; la prueba independiente compara su valor con cocientes incrementales en varios puntos admisibles.',optionExpression(keys[i])]);
 for(const key of keys)if(compactDerivatives[key])steps.push(['Abreviamos expresiones repetidas sin cambiar la función ni su derivada; estas definiciones se incluyen en cada opción.',optionExpression(key)]);
 return part(p,answer,wrong,specs[0].reasons,steps,'SOURCE_BOUND_SYMBOLIC_DERIVATIVE_AND_INDEPENDENT_DIFFERENCE',{keys,checks:specs.map((s,i)=>({key:keys[i],samples:s.samples.map(x=>({x,value:s.d(x)}))}))});}
export function solve(c,text){const p=officialParts(text),mk=(k,a,w,reasons,s,proof)=>part(p[k],a,w,reasons,s,'OFFICIAL_CALCULUS_ALGEBRA_AND_SUBSTITUTION',proof);
 if(c.index===148)return[derivativePart(p[0],['148f','148g']),mk(1,'y=−x+2',['y=x','y=−x','y=x+2'],['Cambiar el signo de la derivada.','Omitir el desplazamiento del punto.','Sumar la ordenada al signo erróneo de pendiente.'],[
 ['La función es h(x)=1/x; el punto uno está en su dominio.',`h(1)=1`],['Derivamos la potencia x^{−1}.',`h′(x)=−${F(1,'x²')}`],['Evaluamos la pendiente.',"h′(1)=−1"],['Aplicamos punto-pendiente.','y−1=−1(x−1)'],['Simplificamos y comprobamos paso y pendiente.','y=−x+2; y(1)=1; m=−1'],],{point:[1,1],slope:-1,intercept:2})];
 if(c.index===979)return[derivativePart(p[0],['979f','979g']),mk(1,`h(x)=x⁴+${F('x³',3)}−2x²−x−5`,[`h(x)=x⁴+${F('x³',3)}−2x²−x+5`,`h(x)=x⁴+${F('x³',3)}−2x²−x+${F(11,3)}`,`h(x)=x⁴+${F('x³',3)}−2x²−x+${F(7,3)}`],['Cambiar el signo de la constante.','Usar h(2) como constante de integración.','Leer 11/3 como 11 en la condición oficial.'],[
 ['La derivada es un polinomio; recuperamos h mediante primitivas inmediatas.',"h′(x)=4x³+x²−4x−1"],['Integramos cada término y mantenemos una constante.',`h(x)=x⁴+${F('x³',3)}−2x²−x+C`],['La condición oficial es h(2)=11/3, no h(2)=11.',`16+${F(8,3)}−8−2+C=${F(11,3)}`],['Calculamos la constante.',`${F(26,3)}+C=${F(11,3)} ⇒ C=−5`],['Comprobamos derivada y valor inicial.',`h′(x)=4x³+x²−4x−1; h(2)=${F(11,3)}`],],{primitiveCoefficients:[-5,-1,-2,1/3,1],at:2,value:11/3})];
 if(c.index===1233)return[derivativePart(p[0],['1233f','1233g']),mk(1,'y=−x+4',['y=x+2','y=−x+3','y=−3x+6'],['Cambiar el signo de la derivada.','Usar la ordenada del punto como término independiente.','Omitir un factor del denominador.'],[
 ['Evaluamos la función racional en uno.',`h(1)=${F(9,3)}=3`],['Derivamos mediante el cociente.',`h′(x)=${F('3(2x+1)−2(3x+6)','(2x+1)²')}=−${F(9,'(2x+1)²')}`],['La pendiente resulta −1.',`h′(1)=−${F(9,9)}=−1`],['Aplicamos punto-pendiente.','y−3=−(x−1)'],['Simplificamos y verificamos.','y=−x+4; y(1)=3; pendiente=−1'],],{point:[1,3],slope:-1,intercept:4}),mk(2,`Vertical x=−${F(1,2)}; horizontal y=${F(3,2)}.`,[`Vertical x=${F(1,2)}; horizontal y=${F(3,2)}.`,`Vertical x=−${F(1,2)}; horizontal y=2.`,`Vertical x=−${F(1,2)}; horizontal y=3.`],['Cambiar el signo de la raíz.','Invertir o calcular mal los coeficientes principales.','Omitir el coeficiente dos del denominador.'],[
 ['Las posibles asíntotas verticales provienen de ceros del denominador.',`2x+1=0 ⇒ x=−${F(1,2)}`],['Comprobamos que el numerador no se anula.',`3(−${F(1,2)})+6=${F(9,2)}≠0`],['Los límites laterales son infinitos: la recta vertical es una asíntota.',`x→(−${F(1,2)})⁻:h→−∞; x→(−${F(1,2)})⁺:h→+∞`],['Comparamos los coeficientes principales para el límite infinito.',`lim ${F('3x+6','2x+1')}=${F(3,2)} cuando x→±∞`],['La división algebraica confirma el límite y que no hay asíntota oblicua.',`h(x)=${F(3,2)}+${F(9,'2(2x+1)')}`],],{vertical:-.5,horizontal:1.5})];
 if(c.index===1390)return['f','g','h'].map((k,j)=>derivativePart(p[j],[`1390${k}`]));
 if(c.index===1422)return[derivativePart(p[0],['1422f','1422g']),mk(1,`Vertical x=2; horizontal y=2; cortes (−${F(1,2)};0) y (0;−${F(1,2)}).`,[`Vertical x=−2; horizontal y=2; cortes (−${F(1,2)};0) y (0;−${F(1,2)}).`,`Vertical x=2; horizontal y=${F(1,2)}; cortes (−${F(1,2)};0) y (0;−${F(1,2)}).`,`Vertical x=2; horizontal y=2; cortes (${F(1,2)};0) y (0;${F(1,2)}).`],['Cambiar el signo del cero del denominador.','Invertir los coeficientes principales.','Cambiar signos en los cortes.'],[
 ['La función tiene dominio real salvo dos; allí el numerador vale cinco.',`h(x)=${F('1+2x','x−2')}; x≠2`],['La división muestra ambas asíntotas.',`h(x)=2+${F(5,'x−2')}`],['Los laterales en dos divergen; en infinito el último término desaparece.','x→2⁻:h→−∞; x→2⁺:h→+∞; x→±∞:h→2'],['Para cortar OX anulamos el numerador y comprobamos el denominador.',`1+2x=0 ⇒ x=−${F(1,2)}≠2`],['Para cortar OY evaluamos x=0.',`h(0)=−${F(1,2)}`],['Damos las dos rectas y los dos puntos.',`x=2; y=2; (−${F(1,2)};0); (0;−${F(1,2)})`],],{vertical:2,horizontal:2,intercepts:[[-.5,0],[0,-.5]]})];
 if(c.index===1442)return['f','g','h'].map((k,j)=>derivativePart(p[j],[`1442${k}`]));
 if(c.index===1417)return[mk(0,`a=${F(5,2)}`,[`a=${F(3,2)}`,'a=2',`a=−${F(5,2)}`],['Perder el valor −1 del tramo izquierdo.','Confundir la hipótesis del apartado b con el valor pedido.','Cambiar el signo al despejar.'],[
 ['En el punto uno rige el primer tramo.',`f(1)=1−2=−1`],['El límite izquierdo coincide con ese valor.','lim f(x)=−1 cuando x→1⁻'],['El límite derecho se calcula en el segundo polinomio.','lim f(x)=1−2a+3=4−2a cuando x→1⁺'],['Imponemos igualdad de ambos límites y del valor de la función.',`4−2a=−1 ⇒ 2a=5 ⇒ a=${F(5,2)}`],['Verificamos el resultado en los tres valores.',`4−2·${F(5,2)}=−1=f(1)`],],{a:2.5}),mk(1,'Con a=2: discontinua y no derivable en x=1; continua y derivable en x=3 y en el resto del dominio.',[
 'Con a=2: continua y derivable en todo ℝ.','Con a=2: discontinua y no derivable en x=1; continua pero no derivable en x=3.','Con a=2: continua pero no derivable en x=1; continua y derivable en x=3.'],['No comprobar los límites laterales en uno.','No comparar las derivadas laterales en tres.','Confundir salto con esquina continua.'],[
 ['Este apartado fija a=2, independientemente del valor hallado antes. Los tramos son polinomios.','f₁=1−2x²; f₂=x²−4x+3; f₃=−x²+8x−15'],['En uno los valores laterales difieren.', 'f(1)=lim f(1⁻)=−1; lim f(1⁺)=0'],['Hay discontinuidad de salto, que impide derivabilidad.','−1≠0 ⇒ no continua ni derivable en x=1'],['En tres sí coinciden ambos límites y la función.','f(3)=9−12+3=0; lim f(3⁺)=−9+24−15=0'],['Derivamos los tramos que se juntan en tres.',"f₂′(3)=2·3−4=2; f₃′(3)=−2·3+8=2"],['La función es continua y derivable en tres y en cada intervalo abierto de los tramos.',"f′(x)=−4x si x<1; 2x−4 si 1<x≤3; −2x+8 si x>3; no existe en x=1"],],{at1:{left:-1,right:0,value:-1},at3:{left:0,right:0,value:0,derivatives:[2,2]}})];
 if(c.index===1443)return[mk(0,'a=−6; b=−7',['a=6; b=5','a=−4; b=−5','a=−6; b=−5'],['Cambiar el signo al resolver el sistema.','Omitir un término en la derivada.','No satisfacer la continuidad.'],[
 ['La continuidad en uno exige igualar ambos tramos.',`1+a=b+2 ⇒ a−b=1`],['Derivamos separadamente.',`f₁′(x)=3x²+2ax; f₂′(x)=b−${F(2,'x²')}`],['Igualamos las derivadas laterales en uno.','3+2a=b−2 ⇒ 2a−b=−5'],['Restamos la ecuación de continuidad de la de derivabilidad.','(2a−b)−(a−b)=−5−1 ⇒ a=−6; b=−7'],['Comprobamos los dos requisitos.',"1−6=−7+2=−5; 3−12=−7−2=−9"],],{a:-6,b:-7,value:-5,slope:-9}),mk(1,`y=${F(5,2)}x+2`,[`y=${F(7,2)}x`,`y=${F(5,2)}x+7`,`y=3x+1`],['Cambiar el signo de la derivada de 2/x.','Usar f(2) como ordenada en el origen.','No derivar el término 2/x.'],[
 ['Ahora b=3 y x=2 pertenece al segundo tramo.',`f(x)=3x+${F(2,'x')}; f(2)=7`],['Derivamos ese tramo.',`f′(x)=3−${F(2,'x²')}`],['Evaluamos la pendiente en dos.',`f′(2)=3−${F(2,4)}=${F(5,2)}`],['Aplicamos punto-pendiente y despejamos.',`y−7=${F(5,2)}(x−2) ⇒ y=${F(5,2)}x+2`],['Comprobamos el punto y la pendiente.',`${F(5,2)}·2+2=7; m=${F(5,2)}`],],{point:[2,7],slope:2.5,intercept:2})];
 throw Error('Unknown derivative official case');}
export function buildDerivativeBatch(id='batch-0322',selected=cases){const r=buildBatch(selected,id,solve,(_c,x)=>({parts:x.parts.map(p=>p.verification)}));const topics={148:['Regla del producto y cociente','Tangentes'],979:['Regla del producto y cociente','Integrales inmediatas'],1233:['Regla del producto y cociente','Tangentes','Asíntotas'],1390:['Regla del producto y cociente'],1422:['Regla del producto y cociente','Asíntotas'],1442:['Regla del producto y cociente','Logaritmos'],1417:['Continuidad','Derivabilidad'],1443:['Continuidad','Derivabilidad','Tangentes']};for(const x of r.batch.records){x.primaryTopic='Derivadas';x.secondaryTopics=topics[x.correctionEvidence.parameters.index];x.block='Análisis';x.examSlot=3;x.qualityGates.pedagogical='COMPLETE_OFFICIAL_CALCULUS_DERIVATIVE_AND_CONTINUITY';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildDerivativeBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0322-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0322.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((s,x)=>s+x.parts.length,0)}));}
