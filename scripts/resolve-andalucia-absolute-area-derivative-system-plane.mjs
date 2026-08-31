import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';

export const observations=[
 [1105,'8a4fbdb778e76f41bc69fd26b30707ae55040cbe14cb93df5155dde32ea745a0',1,'NONE.2','96a9578562b49f99141416b52be5335a5624340e754edc6edbbff92cbcfbb26f',0],
 [1106,'fe6fd5b48407569d41169c80d71e6997050d6d06d1afd41cd639a553f9b712b5',1,'NONE.3','78828f645f94446d04496f5775f9f7a8ed38b7877c84509c62ce0fdd6c13ae25',0],
 [1107,'c5a19b8d41952be5e070bc6d9a83948f6dc8e1eb323dd5b6a57f0e88559b9db3',2,'A.6','e819fd645b8d06ddd9832345fa52bc2cb1817bc8f73e1e3b6586c66673cd8f9b',0],
 [1112,'83fb1553a0210c1a82e5760e2664d28df565127e870fef743346b4bb30953bd8',2,'B.4','54a0510c0bfbc04c74fb68123878b6a65dedcba235df64d1dcbd4a8e5245e98f',0],
];

export const statements={
 1105:'Sean f:R→R y g:R→R las funciones definidas por f(x)=|x(x−2)| y g(x)=x+4.\na) Esboza las gráficas de f y g en los mismos ejes y calcula sus puntos de corte.\nb) Calcula el área del recinto limitado por ambas gráficas.',
 1106:'De una función f sabemos que su gráfica pasa por el punto (1,3) y que f′(x)=2x−6.\na) Determina la ecuación de la recta tangente a la gráfica de f en x=1.\nb) Estudia la monotonía y la existencia de extremos de f.\nc) Determina f y represéntala gráficamente.',
 1107:'Considera el sistema cases{y+z=1;(k−1)x+y+z=k;x+(k−1)y+z=0}.\na) Discute el sistema según los valores de k.\nb) Para k=1, resuelve el sistema. ¿Hay alguna solución con y=0? En caso afirmativo, calcúlala; en caso negativo, justifica la respuesta.',
 1112:'Considera los puntos A(0,3,−1), B(0,1,a) y el plano π:x−y+z=0.\na) Determina a para que la recta AB sea paralela a π.\nb) Halla el punto de corte de π con la recta que pasa por A y es perpendicular a π.\nc) Para a=2, halla el plano que contiene A y B y es perpendicular a π.',
};

export const replacements=r=>statements[r.queueIndex]?[[r.sourceLiteral,statements[r.queueIndex],'OFFICIAL_ABSOLUTE_DERIVATIVE_SYSTEM_PLANE_LAYOUT']]:[];
export const cases=[
 {index:1105,slot:3,literals:['f (x) = |x(x − 2)|','g(x) = x + 4','´area del recinto']},
 {index:1106,slot:3,literals:['punto (1, 3)','2x − 6','x = 1']},
 {index:1107,slot:1,literals:['y+z=1','(k − 1)x','x + (k − 1)y + z = 0']},
 {index:1112,slot:4,literals:['A(0, 3, −1)','B(0, 1, a)','x − y + z = 0']},
];

export const proof=c=>({
 1105:{intersections:[[-1,3],[4,8]],area:[13/6,26/3,22/3,109/6]},
 1106:{f:'x²−6x+8',tangent:'y=−4x+7',minimum:[3,-1]},
 1107:{k1:'SCI',k2:'SI',other:'SCD',general:['1','−2/(k−2)','k/(k−2)'],k1solution:['−t','1−t','t'],y0:[-1,0,1]},
 1112:{a:-3,intersection:[4/3,5/3,1/3],plane:'x+3y+2z−7=0'},
}[c.index]);

const graphSpecs={
 1105:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'absolute-area-v1',index:1105,xRange:[-2,5],yRange:[-1,10],pieces:[{expression:'|x(x−2)|',label:'f(x)=|x(x−2)|'},{expression:'x+4',label:'g(x)=x+4'}],points:[[-1,3,'(−1;3)'],[4,8,'(4;8)']],between:[-1,4]},
 1106:{schemaVersion:'mathup.calculus-graph.v1',plotVersion:'recovered-parabola-v1',index:1106,xRange:[-1,7],yRange:[-3,16],pieces:[{expression:'x²−6x+8',label:'f(x)=x²−6x+8'}],points:[[1,3,'(1;3)'],[3,-1,'mínimo (3;−1)']],tangent:{expression:'−4x+7',at:[1,3]}},
};

export function solve(c){
 const ps=officialParts(statements[c.index]),p=proof(c),mk=(k,a,w,reasons,steps,method,visual=false)=>{const x=part(ps[k],a,w,reasons,steps,method,p);if(visual)x.visual=structuredClone(graphSpecs[c.index]);return x;};
 if(c.index===1105)return[
  mk(0,'Puntos de corte: (−1,3) y (4,8).',[ '(−4,0) y (1,5).','(0,0) y (2,6).','(−1,3), (0,4) y (4,8).' ],['Resolver x(x−2)=x+4 sin separar el valor absoluto.','Confundir los ceros de f con los cortes entre f y g.','Incluir un punto que pertenece solo a la recta.'],[
   ['Separamos el valor absoluto según el signo de x(x−2).','f(x)=x²−2x si x≤0 o x≥2; f(x)=−x²+2x si 0≤x≤2'],
   ['En las ramas exteriores igualamos f y g.','x²−2x=x+4'],
   ['Factorizamos la ecuación.','x²−3x−4=(x−4)(x+1)=0'],
   ['Las dos raíces pertenecen a las ramas exteriores.','x=−1 y x=4'],
   ['En la rama interior comprobamos si hay más cortes.','−x²+2x=x+4 ⇒ x²−x+4=0; Δ=−15<0'],
   ['Calculamos las ordenadas con g.','g(−1)=3; g(4)=8'],
   ['Concluimos y verificamos sustituyendo en ambas funciones.','f(−1)=g(−1)=3; f(4)=g(4)=8'],
  ],'PIECEWISE_ABSOLUTE_VALUE_INTERSECTIONS',true),
  mk(1,'El área es frac{109}{6} unidades cuadradas.',['frac{95}{6} unidades cuadradas.','frac{109}{3} unidades cuadradas.','frac{83}{6} unidades cuadradas.'],['Integrar sin separar en los puntos donde cambia el valor absoluto.','Olvidar que el área se obtiene con función superior menos inferior.','Omitir uno de los tres intervalos [−1,0], [0,2] y [2,4].'],[
   ['Entre los cortes, la recta queda por encima de f.','g(x)−f(x)≥0 para −1≤x≤4'],
   ['Separamos en los puntos 0 y 2, donde cambia la expresión de f.','A=∫_{-1}^{0}(−x²+3x+4)dx+∫_0^2(x²−x+4)dx+∫_2^4(−x²+3x+4)dx'],
   ['Calculamos el primer tramo.','A₁=13/6'],
   ['Calculamos el tramo interior.','A₂=26/3'],
   ['Calculamos el tercer tramo.','A₃=22/3'],
   ['Sumamos las tres áreas positivas.','A=13/6+26/3+22/3=109/6'],
   ['Comprobamos numéricamente el signo del integrando en cada tramo.','g−f>0 en el interior de (−1,4)'],
  ],'PIECEWISE_EXACT_AREA_WITH_GRAPH',true),
 ];
 if(c.index===1106)return[
  mk(0,'La recta tangente es y=−4x+7.',['y=4x−1.','y=−4x+3.','y=2x+1.'],['Cambiar el signo de la pendiente f′(1).','Usar la pendiente correcta sin imponer el paso por (1,3).','Usar f′(1) como ordenada en lugar de pendiente.'],[
   ['El punto de tangencia es el dato de la gráfica.','P=(1,3)'],['Calculamos la pendiente mediante la derivada oficial.','m=f′(1)=2·1−6=−4'],['Usamos la ecuación punto-pendiente.','y−3=−4(x−1)'],['Desarrollamos.','y−3=−4x+4'],['Despejamos y.','y=−4x+7'],['Comprobamos el paso por P.','−4·1+7=3'],
  ],'DERIVATIVE_POINT_TANGENT_CHECK'),
  mk(1,'f decrece en (−∞,3), crece en (3,∞) y tiene un mínimo en x=3.',['f crece en (−∞,3), decrece en (3,∞) y tiene un máximo en x=3.','f decrece en todo R y no tiene extremos.','f crece en todo R y tiene un mínimo en x=1.'],['Invertir el signo de la derivada.','No resolver f′(x)=0.','Confundir el punto dado (1,3) con el punto crítico.'],[
   ['Partimos de la derivada.','f′(x)=2x−6=2(x−3)'],['Localizamos el punto crítico.','f′(x)=0 ⇒ x=3'],['Estudiamos el signo a la izquierda.','Si x<3, f′(x)<0: f decrece'],['Estudiamos el signo a la derecha.','Si x>3, f′(x)>0: f crece'],['El cambio de negativo a positivo determina un mínimo.','x=3 es mínimo'],['La segunda derivada lo confirma.','f′′(x)=2>0'],
  ],'DERIVATIVE_SIGN_TABLE_AND_SECOND_DERIVATIVE_CHECK'),
  mk(2,'f(x)=x²−6x+8; su vértice y mínimo es (3,−1).',['f(x)=x²−6x+3; vértice (3,−6).','f(x)=x²−3x+5; vértice (3/2,11/4).','f(x)=2x²−6x+7; vértice (3/2,5/2).'],['Olvidar la constante determinada por el punto.','Integrar 2x−6 como x²−3x.','No dividir por 2 al integrar 2x.'],[
   ['Integramos la derivada.','f(x)=∫(2x−6)dx=x²−6x+C'],['Usamos que la gráfica pasa por (1,3).','3=1−6+C'],['Despejamos la constante.','C=8'],['Obtenemos la función.','f(x)=x²−6x+8'],['Completamos el cuadrado para representarla.','f(x)=(x−3)²−1'],['Leemos el vértice y el eje.','V=(3,−1); eje x=3'],['Comprobamos derivando y evaluando el punto dado.','f′=2x−6; f(1)=3'],
  ],'ANTIDERIVATIVE_POINT_CONDITION_AND_VERTEX_GRAPH',true),
 ];
 if(c.index===1107)return[
  mk(0,'k=1: compatible indeterminado; k=2: incompatible; k≠1,2: compatible determinado con (x,y,z)=(1,−frac2{k−2},frac{k}{k−2}).',['k=1: incompatible; k=2: indeterminado; en otro caso determinado.','Para todo k es compatible determinado con x=y=z=1.','k=1 y k=2 son incompatibles; en otro caso hay infinitas soluciones.'],['Intercambiar los casos especiales sin comparar rangos.','Ignorar la dependencia del parámetro.','Tratar ambos valores singulares como el mismo tipo de sistema.'],[
   ['Formamos las matrices de coeficientes y ampliada para aplicar Rouché–Frobenius.','A=matrix{0,1,1;k−1,1,1;1,k−1,1}; A*=matrix{0,1,1,1;k−1,1,1,k;1,k−1,1,0}'],
   ['Restamos la primera ecuación de la segunda.','(k−1)(x−1)=0'],
   ['Usamos y+z=1 en la tercera.','x+(k−2)y=−1'],
   ['Si k≠1, resulta x=1.','(k−1)(x−1)=0 ⇒ x=1'],
   ['Para k≠1,2 resolvemos las otras variables.','y=−2/(k−2); z=1−y=k/(k−2)'],
   ['Si k=2 aparece una contradicción.','x=1 y x=−1 ⇒ rg(A)=2<rg(A*)=3: incompatible'],
   ['Si k=1 quedan dos ecuaciones independientes con tres incógnitas.','rg(A)=rg(A*)=2<3: compatible indeterminado'],
  ],'ROUCHE_FROBENIUS_PARAMETER_DISCUSSION'),
  mk(1,'Para k=1: (x,y,z)=(−t,1−t,t), t∈R. Con y=0 se obtiene (−1,0,1).',['(x,y,z)=(t,1−t,t), y no puede ser 0.','La única solución es (1,0,0).','(x,y,z)=(−t,t,1−t); con y=0 se obtiene (0,0,1).'],['Cambiar el signo en la ecuación x+z=0.','Tratar un sistema indeterminado como determinado.','Parametrizar sin respetar y+z=1.'],[
   ['Sustituimos k=1 en el sistema.','cases{y+z=1;y+z=1;x+z=0}'],['Tomamos z=t como parámetro libre.','z=t'],['Despejamos x en la tercera ecuación.','x=−t'],['Despejamos y en la primera.','y=1−t'],['Escribimos la familia completa.','(x,y,z)=(−t,1−t,t)'],['Imponemos y=0.','1−t=0 ⇒ t=1'],['Comprobamos la solución solicitada.','(−1,0,1): y+z=1 y x+z=0'],
  ],'PARAMETRIC_SOLUTION_AND_REQUESTED_CONDITION'),
 ];
 if(c.index===1112)return[
  mk(0,'a=−3.',['a=3.','a=−1.','a=2.'],['Cambiar el signo del producto escalar.','Omitir la componente z de AB.','Usar el valor dado solo en el apartado c).'],[
   ['Calculamos un vector director de AB.','AB=B−A=(0,−2,a+1)'],['El normal del plano es n=(1,−1,1).','π:x−y+z=0'],['Una recta es paralela al plano si su dirección es perpendicular al normal.','AB·n=0'],['Calculamos el producto escalar.','0·1+(−2)(−1)+(a+1)·1=a+3'],['Imponemos la condición.','a+3=0'],['Concluimos y comprobamos.','a=−3; (0,−2,−2)·(1,−1,1)=0'],
  ],'LINE_PARALLEL_PLANE_DOT_PRODUCT'),
  mk(1,'El punto de corte es (frac43,frac53,frac13).',['(frac13,frac53,frac43).','(frac43,frac73,−frac13).','(1,2,0).'],['Permutar las coordenadas del vector normal.','Cambiar el signo del parámetro en dos coordenadas.','Tomar un punto que no pertenece a la recta perpendicular.'],[
   ['La perpendicular al plano tiene dirección n=(1,−1,1).','r:A+t n'],['Parametrizamos desde A.','r(t)=(t,3−t,−1+t)'],['Imponemos que el punto esté en π.','t−(3−t)+(−1+t)=0'],['Simplificamos.','3t−4=0'],['Despejamos.','t=4/3'],['Sustituimos en la recta.','P=(4/3,5/3,1/3)'],['Comprobamos que P pertenece a π.','4/3−5/3+1/3=0'],
  ],'NORMAL_LINE_PLANE_INTERSECTION'),
  mk(2,'El plano es x+3y+2z−7=0.',['x−3y+2z+11=0.','x+2y+3z−5=0.','x+3y+2z=0.'],['Usar un normal que no es perpendicular al de π.','Permutar componentes del producto vectorial.','Olvidar imponer el paso por A.'],[
   ['Para a=2, calculamos la dirección AB.','AB=(0,−2,3)'],['El plano buscado contiene AB y es perpendicular a π.','Su normal m debe ser perpendicular a AB y a n=(1,−1,1)'],['Obtenemos un normal mediante producto vectorial.','m=AB×n=(1,3,2)'],['Escribimos el plano por A.','1(x−0)+3(y−3)+2(z+1)=0'],['Desarrollamos.','x+3y+2z−7=0'],['Comprobamos que contiene B=(0,1,2).','0+3+4−7=0'],['Comprobamos la perpendicularidad entre planos.','m·n=1−3+2=0'],
  ],'TWO_PERPENDICULAR_DIRECTIONS_DEFINE_PLANE_NORMAL'),
 ];
 throw Error('Unknown absolute-area-derivative-system-plane source');
}

export function buildAbsoluteAreaDerivativeSystemPlaneBatch(id='batch-0479',selected=cases){
 const r=buildBatch(selected,id,solve,proof);
 for(const x of r.batch.records){const i=x.correctionEvidence.parameters.index;x.primaryTopic=i===1105?'Integrales':i===1106?'Análisis de funciones':i===1107?'Sistemas lineales':'Geometría métrica en el espacio';x.secondaryTopics=i===1105?['Valor absoluto','Área entre curvas']:i===1106?['Derivadas','Representación de funciones']:i===1107?['Parámetros','Rouché–Frobenius']:['Recta y plano','Perpendicularidad'];x.block=i===1107?'Álgebra':i===1112?'Geometría':'Análisis';x.examSlot=x.correctionEvidence.parameters.slot;x.matesEvidence={source:'OFFICIAL_PAGE_INSPECTED',documentHash:x.officialSource.documentHash,scope:'EXACT_OFFICIAL_FORMULAS_WITH_INDEPENDENT_VERIFICATION'};x.qualityGates.pedagogical='FULL_SOURCE_BOUND_METHOD_WITH_INDEPENDENT_CHECK';}
 return r;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildAbsoluteAreaDerivativeSystemPlaneBatch(),p='artifacts/pau-andalucia-resolution/audit/correction-0479-original-records.json';if(!fs.existsSync(p))fs.writeFileSync(p,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0479.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({records:r.batch.records.length,parts:r.batch.records.flatMap(x=>x.parts).length}));}
