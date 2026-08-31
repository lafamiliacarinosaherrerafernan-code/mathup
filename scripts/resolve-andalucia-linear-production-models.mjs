// Official pages inspected locally. Formulation-only questions are not
// replaced by optimization, and independent regions do not inherit variables.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {buildBatch} from './resolve-andalucia-inference-2012.mjs';
import {officialParts,part} from './resolve-andalucia-inference-multipart.mjs';
import {derive} from './resolve-andalucia-linear-quadrilaterals-official.mjs';
import {rationalGraph} from './resolve-andalucia-linear-rational-and-faces.mjs';
export const cases=[
 {index:602,kind:'linear-boat-formulation-separate-edge',constraints:[[0,-1,-30],[-3,1,-150],[6,7,840]],objective:[6,-2,0],domain:{x:[0,110],y:[0,70]},labels:['y ≥ 30','3x − y ≥ 150','6x + 7y ≤ 840'],literals:['cuarta parte','superior a su doble','no puede ser mayor que 100','y ≥ 30','3x − y ≥ 150','6x + 7 y ≤ 840','6x − 2 y']},
 {index:823,kind:'linear-region-membership-and-extrema',constraints:[[-2,1,-2],[-1,2,2],[3,1,15],[0,-1,0]],objective:[3,-2,0],domain:{x:[0,6],y:[0,4]},labels:['2x − y ≥ 2','−x + 2y ≤ 2','3x + y ≤ 15','y ≥ 0'],literals:['2x  y  2',' x2y  2','3x  y  15','y0','punto (3,3)','3x  2y']},
 {index:1336,kind:'linear-factory-formulation-separate-region',constraints:[[-1,-2,-7],[-4,1,-1],[2,-1,4],[3,2,20],[-1,0,0],[0,-1,0]],objective:[2,1,0],domain:{x:[0,5],y:[0,8]},labels:['x + 2y ≥ 7','4x − y ≥ 1','2x − y ≤ 4','3x + 2y ≤ 20','x ≥ 0','y ≥ 0'],literals:['10 lavadoras y 5','7\n       lavadoras y 6','1 200 y','1 500 euros','400 lavadoras y 280','x + 2y ≥ 7','4x − y ≥ 1','2x − y ≤ 4','3x + 2y ≤ 20','2x + y']},
 {index:507,kind:'linear-coffee-production-continuous',constraints:[[3,5,45],[1,0,10],[0,1,6],[-2,1,0],[-1,0,0],[0,-1,0]],objective:[2,4,0],domain:{x:[0,11],y:[0,7]},labels:['3x + 5y ≤ 45','x ≤ 10','y ≤ 6','y ≤ 2x','x ≥ 0','y ≥ 0'],literals:['4.5 kg','7.5 kg','67.5 kg','30 kg','9 kg','7 kg','5 kg','2 euros','4 euros']},
];
const reasons=['Confundir un corte con un vértice factible.','Alterar una intersección de dos fronteras.','Aplicar solo parte de las restricciones.'];
const withGraph=(p,c)=>({...p,visual:rationalGraph(c)});
export function solve(c,text){const p=officialParts(text),v=derive(c);
 if(c.index===602){assert.equal(p.length,2);return[
 part(p[0],'Maximizar x+y; y≥frac{x}{4}; y≤2x; 2x+y≤100; x,y enteros no negativos.',[
 'Maximizar x+y; y≤frac{x}{4}; y≤2x; 2x+y≤100; x,y enteros no negativos.',
 'Maximizar x+y; y≥frac{x}{4}; y≤2x; x+2y≤100; x,y enteros no negativos.',
 'Minimizar x+y; y≥frac{x}{4}; y≤2x; 2x+y≤100; x,y enteros no negativos.'
 ],['Invertir la cantidad mínima de motos.','Intercambiar qué tipo de vehículo cuenta doble.','Minimizar cuando se pide transportar el máximo número.'],[
 ['Definimos x como número de coches e y como número de motos; ambas cantidades son enteras y no negativas.','x,y∈ℤ; x≥0; y≥0'],
 ['Las motos no pueden ser menos de una cuarta parte de los coches.','y≥frac{x}{4}'],
 ['Tampoco pueden superar el doble del número de coches.','y≤2x'],
 ['La condición de capacidad cuenta dos veces los coches y una vez las motos.','2x+y≤100'],
 ['Cada vehículo cuenta una unidad en el total transportado; no se usa la ponderación de capacidad como objetivo.','T=x+y'],
 ['El problema pide plantear sin resolver. El modelo completo maximiza T bajo todas las condiciones, sin calcular aquí un óptimo.','max(x+y); frac{x}{4}≤y≤2x; 2x+y≤100; x,y∈ℤ no negativos'],
 ],'DIRECT_INTEGER_MODEL_FROM_SOURCE',{variables:['cars','motorcycles'],capacity:[2,1,100],ratio:[.25,2],objective:[1,1],solveRequested:false}),
 withGraph(part(p[1],'Mínimo 300 en todo el segmento (60;30)–(70;60).',[
 'Mínimo 300 únicamente en (60;30).','Mínimo 570 en (105;30).','Mínimo 0 en el segmento (60;30)–(70;60).'
 ],['Ignorar la arista completa que comparte el mismo valor.','Confundir el máximo de los vértices con el mínimo.','Omitir el término constante al usar 3x−y=150.'],[
 ['El recinto de este apartado es independiente del modelo del barco. Despejamos las cotas sin exigir integridad adicional.','y≥30; y≤3x−150; y≤frac{840−6x}{7}'],
 ['Intersecamos y=30 con cada una de las fronteras oblicuas.','3x−30=150 ⇒ A=(60;30); 6x+210=840 ⇒ B=(105;30)'],
 ['La intersección de las fronteras oblicuas completa el triángulo.','y=3x−150; 6x+7(3x−150)=840 ⇒ 27x=1890 ⇒ C=(70;60)'],
 ['Evaluamos la función en los tres vértices.','F(A)=360−60=300; F(B)=630−60=570; F(C)=420−120=300'],
 ['Una identidad demuestra el mínimo global, sin depender solamente de la gráfica.','F−300=2(3x−y−150)≥0'],
 ['La igualdad se produce sobre y=3x−150. Intersecamos esa recta con las restantes restricciones.','3x−150≥30 ⇒ x≥60; 6x+7(3x−150)≤840 ⇒ x≤70'],
 ['Todos los puntos de AC, incluidos extremos, minimizan la función.','60≤x≤70; y=3x−150; F=300'],
 ],'EXACT_OPTIMAL_FACE_AND_GLOBAL_LOWER_BOUND',v),c)];}
 if(c.index===823){assert.equal(p.length,3);return[
 withGraph(part(p[0],'Vértices (1;0), (5;0), (4;3), (2;2).',[
 'Vértices (0;0), (5;0), (4;3), (2;2).','Vértices (1;0), (5;0), (3;4), (2;2).','Vértices (1;0), (5;0), (4;3), (3;3).'
 ],reasons,[
 ['Despejamos y para representar la intersección de los semiplanos.','0≤y≤min(2x−2;frac{x+2}{2};15−3x)'],
 ['Sobre el eje horizontal obtenemos el segmento inferior.','y=0 ⇒ x≥1; x≥−2; x≤5 ⇒ A=(1;0), B=(5;0)'],
 ['Las dos primeras fronteras se cortan en D.','2x−2=frac{x+2}{2} ⇒ 4x−4=x+2 ⇒ D=(2;2)'],
 ['Las dos últimas fronteras se cortan en C.','frac{x+2}{2}=15−3x ⇒ x+2=30−6x ⇒ C=(4;3)'],
 ['El cruce de la primera con la tercera queda fuera del segundo semiplano.','2x−2=15−3x ⇒ (frac{17}{5};frac{24}{5}); −x+2y=frac{31}{5}>2'],
 ['Verificamos los cuatro vértices antes de dibujar el polígono.','(2x−y;−x+2y;3x+y): A=(2;−1;3), B=(10;−5;15), C=(5;2;15), D=(2;2;8)'],
 ['Unimos A–B–C–D, incluyendo las fronteras; el punto (3;1) comprueba el interior.','5≥2; −1≤2; 10≤15; y=1≥0'],
 ],'EXACT_VERTEX_FEASIBILITY',v),c),
 part(p[1],'No: (3;3) incumple −x+2y≤2, pues −3+6=3>2.',[
 'Sí: cumple 2x−y≥2 y 3x+y≤15.','No: incumple 2x−y≥2, pues 3<2.','No: incumple y≥0, pues 3<0.'
 ],['Comprobar solo dos condiciones y omitir otra.','Evaluar erróneamente la primera comparación.','Cambiar el signo de una coordenada positiva.'],[
 ['Un punto pertenece a la región solo si satisface simultáneamente todas las restricciones.','P=(3;3)'],
 ['Comprobamos la primera condición.','2·3−3=3≥2'],
 ['Comprobamos la segunda condición, que falla.','−3+2·3=3>2'],
 ['La tercera condición sí se cumple.','3·3+3=12≤15'],
 ['La ordenada también es no negativa, pero eso no compensa el incumplimiento anterior.','y=3≥0'],
 ['Al fallar una de las condiciones, el punto queda fuera de la intersección.','P no pertenece al recinto'],
 ],'ALL_FOUR_POINT_SUBSTITUTIONS',{point:[3,3],values:[3,3,12,3],failedConstraint:1}),
 part(p[2],'Máximo 15 en (5;0); mínimo 2 en (2;2).',[
 'Máximo 6 en (4;3); mínimo 2 en (2;2).','Máximo 15 en (5;0); mínimo 3 en (1;0).','Máximo 21 en (5;3); mínimo 2 en (2;2).'
 ],['Elegir la mayor ordenada sin evaluar todos los vértices.','Omitir D al comparar mínimos.','Usar un punto no factible y sumar en lugar de restar el término de y.'],[
 ['La función es lineal y el recinto cerrado y acotado; calculamos todos los valores de vértice.','F=3x−2y'],
 ['Evaluamos los vértices del eje horizontal.','F(A)=3; F(B)=15'],
 ['Evaluamos los restantes.','F(C)=12−6=6; F(D)=6−4=2'],
 ['El orden de los valores propone los extremos.','2<3<6<15'],
 ['Una cota superior confirma el máximo en todo el recinto.','15−F=(15−3x−y)+3y≥0'],
 ['La igualdad superior exige y=0 y 3x+y=15, dando B. Una cota inferior demuestra el mínimo.','F−2=frac{4}{3}(2x−y−2)+frac{1}{3}(2+x−2y)≥0'],
 ['La igualdad inferior exige las dos primeras fronteras, cuya intersección es D.','2x−y=2; −x+2y=2 ⇒ (x,y)=(2;2)'],
 ],'EXACT_EXTREMA_DUAL_BOUNDS',v)];}
 if(c.index===1336){assert.equal(p.length,2);return[
 part(p[0],'Minimizar 1200x+1500y; 10x+7y≥400; 5x+6y≥280; x≤2y; x,y≥0.',[
 'Minimizar 1200x+1500y; 10x+7y≤400; 5x+6y≤280; x≤2y; x,y≥0.',
 'Minimizar 1200x+1500y; 10x+7y≥400; 5x+6y≥280; y≤2x; x,y≥0.',
 'Maximizar 1200x+1500y; 10x+7y≥400; 5x+6y≥280; x≤2y; x,y≥0.'
 ],['Interpretar mínimos de producción como máximos.','Intercambiar la cadena cuyo tiempo está limitado.','Maximizar los costes en vez de minimizarlos.'],[
 ['Definimos las horas de funcionamiento de cada cadena; el texto no exige horas enteras.','x: horas de A; y: horas de B; x,y≥0'],
 ['Sumamos la producción de lavadoras de ambas cadenas y exigimos el mínimo pedido.','10x+7y≥400'],
 ['Hacemos lo mismo con los frigoríficos usando sus propios ritmos de producción.','5x+6y≥280'],
 ['La cadena A no puede funcionar más del doble de horas que B.','x≤2y'],
 ['El coste es la suma del coste horario de cada cadena por sus horas de uso.','C=1200x+1500y'],
 ['Se pide formular sin resolver. El modelo minimiza C bajo todas las restricciones, sin calcular aquí las horas óptimas.','min C; 10x+7y≥400; 5x+6y≥280; x≤2y; x,y≥0'],
 ],'DIRECT_PRODUCTION_CAPACITY_MODEL',{washing:[10,7,400],refrigerators:[5,6,280],cost:[1200,1500],time:[1,-2,0],requested:'formulation only'}),
 withGraph(part(p[1],'Vértices (1;3), (3;2), (4;4), (2;7); mínimo 5 en (1;3).',[
 'Vértices (1;3), (3;2), (4;4), (2;7); mínimo 8 en (3;2).','Vértices (0;0), (3;2), (4;4), (2;7); mínimo 0 en (0;0).','Vértices (1;3), (3;2), (4;4), (7;2); mínimo 5 en (1;3).'
 ],['Elegir el punto de menor ordenada sin evaluar todos.','Incluir el origen pese a las cotas inferiores.','Intercambiar las coordenadas de una intersección.'],[
 ['Este recinto es independiente del modelo industrial. Escribimos todas las cotas.','max(0;frac{7−x}{2};2x−4)≤y≤min(4x−1;frac{20−3x}{2}); x≥0'],
 ['Intersecamos las fronteras primera y segunda.','x+2y=7; 4x−y=1 ⇒ x+2(4x−1)=7 ⇒ A=(1;3)'],
 ['Intersecamos las dos fronteras inferiores oblicuas.','x+2y=7; y=2x−4 ⇒ 5x=15 ⇒ B=(3;2)'],
 ['Intersecamos la tercera frontera con la cuarta y después la segunda con la cuarta.','y=2x−4; 3x+2y=20 ⇒ C=(4;4); y=4x−1; 3x+2y=20 ⇒ D=(2;7)'],
 ['Los otros cruces oblicuos quedan fuera: (−3;−13) incumple positividad y (6,5;0,25) incumple 2x−y≤4.','x+2y=7; 3x+2y=20 ⇒ (frac{13}{2};frac{1}{4}); 2x−y=frac{51}{4}>4'],
 ['La gráfica muestra A–B–C–D. Evaluamos F en todos sus vértices.','F(A)=5; F(B)=8; F(C)=12; F(D)=11'],
 ['Una combinación de holguras no negativas certifica el mínimo global.','F−5=frac{2}{3}(x+2y−7)+frac{1}{3}(4x−y−1)≥0'],
 ['Ambas holguras se anulan solo en A; por tanto el mínimo es único.','x+2y=7; 4x−y=1 ⇒ (x,y)=(1;3); F mínimo=5'],
 ],'EXACT_REGION_AND_MINIMUM_DUAL_CERTIFICATE',v),c)];}
 assert.equal(c.index,507);assert.equal(p.length,3);return[
 withGraph(part(p[0],'Vértices (0;0), (10;0), (10;3), (5;6), (3;6).',[
 'Vértices (0;0), (15;0), (10;3), (5;6), (3;6).','Vértices (0;0), (10;0), (10;6), (5;6), (3;6).','Vértices (0;0), (10;0), (10;3), (5;6), (0;6).'
 ],reasons,[
 ['Definimos x e y como kilogramos de concentrados A y B. Las cantidades son no negativas y no se exige integridad.','x,y≥0'],
 ['El grano colombiano limita una combinación de ambas producciones; dividimos entre 1,5.','4,5x+7,5y≤67,5 ⇔ 3x+5y≤45'],
 ['Etiopía solo interviene en A y Costa Rica solo en B.','3x≤30 ⇒ x≤10; 1,5y≤9 ⇒ y≤6'],
 ['La condición comercial exige al menos la mitad de A respecto a B.','x≥frac{y}{2} ⇔ y≤2x'],
 ['En y=0 los extremos son (0;0) y (10;0). La frontera colombiana corta x=10 y y=6.','x=10 ⇒ y=3; y=6 ⇒ x=5'],
 ['La restricción y≤2x corta y=6 en (3;6). Su cruce con la frontera colombiana quedaría por encima de y=6 y se descarta.','y=2x; 3x+5y=45 ⇒ x=frac{45}{13}; y=frac{90}{13}>6'],
 ['Comprobamos y unimos los cinco vértices. El rectángulo completo no sería factible.','(3x+5y;y−2x): (0;0)→(0;0), (10;0)→(30;−20), (10;3)→(45;−17), (5;6)→(45;−4), (3;6)→(39;0)'],
 ],'RESOURCE_MODEL_AND_EXACT_VERTEX_ENUMERATION',v),c),
 part(p[1],'No: se necesitan 69 kg de grano colombiano, más de 67,5 kg.',[
 'Sí: se necesitan 67,5 kg de grano colombiano y se cumplen las demás restricciones.','No: se necesitan 35 kg de grano etíope, más de 30 kg.','No: se necesitan 10 kg de grano costarricense, más de 9 kg.'
 ],['Redondear o sumar mal el consumo colombiano.','Usar un consumo etíope incorrecto.','Usar un consumo costarricense incorrecto.'],[
 ['Comprobamos cada recurso para la propuesta x=7 e y=5.','P=(7;5)'],
 ['El consumo de grano colombiano suma las dos contribuciones.','4,5·7+7,5·5=31,5+37,5=69 kg'],
 ['Este consumo supera la disponibilidad y ya impide realizar la propuesta.','69>67,5'],
 ['El grano etíope sí sería suficiente.','3·7=21≤30'],
 ['También bastaría el grano costarricense y se cumpliría la relación comercial.','1,5·5=7,5≤9; 7≥frac{5}{2}'],
 ['Es necesario cumplir todas las condiciones; fallar el recurso colombiano excluye la propuesta.','P no pertenece a la región factible'],
 ],'INDEPENDENT_RESOURCE_SUBSTITUTION',{point:[7,5],colombia:69,ethiopia:21,costaRica:7.5}),
 part(p[2],'Producir 5 kg de A y 6 kg de B; beneficio máximo 34 euros.',[
 'Producir 10 kg de A y 3 kg de B; beneficio máximo 32 euros.','Producir 3 kg de A y 6 kg de B; beneficio máximo 30 euros.','Producir 10 kg de A y 6 kg de B; beneficio máximo 44 euros.'
 ],['Priorizar el máximo A sin comparar beneficios.','Elegir la menor cantidad de A compatible con B máximo.','Ignorar la disponibilidad de grano colombiano.'],[
 ['El beneficio suma las aportaciones de ambos concentrados.','Z=2x+4y'],
 ['Evaluamos los dos vértices sobre el eje horizontal.','Z(0;0)=0; Z(10;0)=20'],
 ['Evaluamos los otros tres vértices.','Z(10;3)=32; Z(5;6)=34; Z(3;6)=30'],
 ['El mayor valor entre todos es 34, alcanzado en (5;6).','0<20<30<32<34'],
 ['Una combinación de holguras confirma la cota superior para cualquier producción factible.','34−Z=frac{2}{3}(45−3x−5y)+frac{2}{3}(6−y)≥0'],
 ['La igualdad exige y=6 y 3x+5y=45, por lo que el óptimo es único.','y=6; 3x=15 ⇒ x=5'],
 ['Verificamos los recursos y la condición comercial de la propuesta final.','Colombia=67,5 kg; Etiopía=15 kg; Costa Rica=9 kg; 5≥3; Z=34 euros'],
 ],'EXACT_VERTEX_MAXIMUM_AND_DUAL_RESOURCE_CERTIFICATE',v)];
}
export function buildProductionModelsBatch(id='batch-0302',selected=cases){const r=buildBatch(selected,id,solve,(_c,r)=>({parts:r.parts.map(p=>p.verification)}));for(const x of r.batch.records){x.primaryTopic='Programación lineal';x.secondaryTopics=['Región factible','Optimización'];x.block='Sistemas y programación lineal';x.examSlot=2;x.qualityGates.pedagogical='GRAPH_REQUIRED_AND_SOURCE_SPECIFIC_LINEAR_STEPS';}return r;}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const r=buildProductionModelsBatch(),archive='artifacts/pau-andalucia-resolution/audit/correction-0302-original-records.json';if(!fs.existsSync(archive))fs.writeFileSync(archive,JSON.stringify(r.originals,null,2)+'\n');fs.writeFileSync('tmp/batch-0302.json',JSON.stringify(r.batch,null,2)+'\n');console.log(JSON.stringify({exercises:r.batch.records.length,parts:r.batch.records.reduce((n,r)=>n+r.parts.length,0)}));}
