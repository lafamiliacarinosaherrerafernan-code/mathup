import crypto from 'node:crypto';

const DOCUMENT_HASH = '3dd1f772eb6cc04a5fc49c38513346ae29789793ac726dc409b76f5ee3b23b8f';
const idFor = (questionKey) => `pau-user-and-2025-ord-${crypto.createHash('sha256').update(`${DOCUMENT_HASH}|${questionKey}`).digest('hex').slice(0, 24)}`;
const step = (explanation, math) => `${explanation}\n${math}`;
const part = (exerciseId, id, text, semanticAnswer, distractors, distractorEvidence, solutionSteps, verification) => ({
  id: `${exerciseId}:${id}`,
  label: id === 'whole' ? '' : `${id})`,
  text,
  semanticAnswer,
  canonicalSemanticAnswer: semanticAnswer,
  distractors,
  distractorEvidence,
  solutionSteps,
  finalAnswer: semanticAnswer,
  canonicalFinalAnswer: semanticAnswer,
  verification: { verified: true, method: verification.method, detail: verification.detail, numericalEvidence: verification.evidence }
});

function record(questionKey, block, blockId, primaryTopic, topicIndexes, examSlot, prompt, parts, secondaryTopics = []) {
  const exerciseId = idFor(questionKey);
  return {
    exerciseId,
    subject: '2_bach_mates_ii',
    community: 'Andalucía',
    year: 2025,
    sitting: 'Ordinaria',
    questionKey: String(questionKey),
    alternativeKey: null,
    variant: null,
    documentHash: DOCUMENT_HASH,
    sourceAuthority: 'USER_SUPPLIED_PRIMARY_OFFICIAL_DOCUMENT',
    officialPromptLiteral: prompt,
    learnerStatement: prompt,
    block,
    blockId,
    primaryTopic,
    topicIndexes,
    secondaryTopics,
    examSlot,
    examFamilyLabel: `Ejercicio ${questionKey} · ${primaryTopic}`,
    deliveryEligibility: ['topic-challenge', 'block-challenge', 'exam'],
    publicationState: 'LOCAL_ENABLED_AFTER_SOURCE_BOUND_SOLUTION_AND_CHECKS',
    parts: parts(exerciseId),
    resolutionEvidence: {
      mathematical: 'INDEPENDENT_ALGEBRAIC_OR_NUMERICAL_CHECK',
      source: 'EBAU Andalucía 2025 Ordinaria resuelto · Juan Antonio Martínez García',
      sourceUrl: 'https://www.ebaumatematicas.com/wp-content/uploads/2025/06/2oBachCC_EBAU_Andalucia_2025-Ordinaria_Resuelto_JuanAntonioMG.pdf'
    }
  };
}

export const additions2025Ord = [
  record(1, 'Álgebra', 'algebra', 'Sistemas de ecuaciones', [0, 1], 1,
    'Juan ha gastado 80 € por la compra de un jersey, una camisa y un pantalón. Sabemos que el precio del jersey es un tercio del precio de la camisa y el pantalón juntos.\n\na) ¿Es posible determinar de forma única el precio del jersey? ¿Y el de la camisa? Razona la respuesta.\n\nb) Si Juan hubiera esperado a las rebajas se habría gastado 57 €, pues el jersey, la camisa y el pantalón tenían un descuento del 30 %, del 40 % y del 20 %, respectivamente. Calcula el precio de cada prenda antes de las rebajas.',
    (id) => [
      part(id, 'a', '¿Es posible determinar de forma única el precio del jersey? ¿Y el de la camisa?',
        'Jersey: 20 € de forma única. Camisa: no; solo se sabe que camisa + pantalón = 60 €.',
        ['Jersey y camisa quedan determinados: 20 € y 30 €.', 'No puede determinarse de forma única ninguna de las tres prendas.', 'Camisa: 20 € de forma única; jersey y pantalón suman 60 €.'],
        ['Asignar arbitrariamente la mitad de 60 € a la camisa.', 'Confundir dos ecuaciones independientes con una sola.', 'Intercambiar la variable del jersey con la de la camisa.'],
        [step('Llamamos j, c y p a los tres precios.', 'j+c+p=80; j=(c+p)/3'), step('Sustituimos la segunda relación en el total.', '3j=c+p; j+3j=80'), step('El jersey sí queda fijado.', 'j=20'), step('La información restante solo fija una suma.', 'c+p=60'), step('Hay infinitas parejas de precios no negativos con esa suma.', '(c,p)=(t,60−t), 0≤t≤60'), step('Comprobamos que todas ellas respetan los dos datos.', '20+t+(60−t)=80; 20=(t+60−t)/3')],
        { method: 'LINEAR_SYSTEM_RANK_AND_SUBSTITUTION', detail: 'Se comprueba el rango y la familia completa.', evidence: { jersey: 20, family: 'c=t,p=60-t' } }),
      part(id, 'b', 'Calcula el precio de cada prenda antes de las rebajas.', 'Jersey 20 €, camisa 25 € y pantalón 35 €.',
        ['Jersey 20 €, camisa 35 € y pantalón 25 €.', 'Jersey 24 €, camisa 21 € y pantalón 35 €.', 'Jersey 20 €, camisa 30 € y pantalón 30 €.'],
        ['Intercambiar descuentos de camisa y pantalón.', 'Aplicar los porcentajes al total, no a cada prenda.', 'Repartir por igual los 60 € restantes.'],
        [step('Conservamos las dos ecuaciones del apartado anterior.', 'j+c+p=80; 3j=c+p'), step('Los precios rebajados son el 70 %, 60 % y 80 % de los originales.', '0,7j+0,6c+0,8p=57'), step('De las dos primeras relaciones ya sabemos el jersey y la suma restante.', 'j=20; c+p=60'), step('Sustituimos p=60−c en la ecuación rebajada.', '14+0,6c+0,8(60−c)=57'), step('Despejamos los otros dos precios.', 'c=25; p=35'), step('Verificamos total y rebaja.', '20+25+35=80; 14+15+28=57')],
        { method: 'EXACT_LINEAR_SYSTEM_SUBSTITUTION', detail: 'Los tres precios se sustituyen en las ecuaciones originales.', evidence: { prices: [20, 25, 35], discounted: 57 } })
    ], ['Modelización lineal']),

  record(2, 'Análisis', 'analisis', 'Límites', [4], 2,
    'Sabiendo que lim_{x→0} [sen(x)−ax+2−2cos(x)]/[e^x−x cos(x)−1] es finito, calcula a y el valor del límite.',
    (id) => [part(id, 'whole', 'Calcula a y el límite finito.', 'a=1 y el límite vale 2.',
      ['a=0 y el límite vale 2.', 'a=1 y el límite vale 1.', 'a=−1 y el límite vale −2.'],
      ['No anular el término lineal del numerador.', 'Perder el factor 1/2 del término cuadrático del denominador.', 'Cambiar el signo del término ax.'],
      [step('Desarrollamos solo hasta el primer orden para exigir finitud.', 'sen x−ax+2−2cos x=(1−a)x+O(x²)'), step('El denominador comienza en orden dos.', 'e^x−x cos x−1=x²/2+O(x³)'), step('Si queda término lineal arriba, el cociente diverge.', '1−a=0 ⇒ a=1'), step('Con a=1 calculamos los términos cuadráticos.', 'sen x−x+2−2cos x=x²+O(x³)'), step('Dividimos los coeficientes principales.', 'L=1/(1/2)=2'), step('Una derivación doble tras verificar 0/0 reproduce el mismo valor.', 'N″(0)=2; D″(0)=1 ⇒ L=2')],
      { method: 'TAYLOR_COEFFICIENT_AND_DERIVATIVE_CHECK', detail: 'La expansión y la comprobación por derivadas coinciden.', evidence: { a: 1, numerator2: 2, denominator2: 1, limit: 2 } })]),

  record(3, 'Análisis', 'analisis', 'Derivadas y aplicaciones', [4, 5], 2,
    'Sea la función f:(0,+∞)→ℝ definida por f(x)=a+ln(x)/x².\n\na) Calcula a para que y=1 sea una asíntota horizontal de la gráfica de f.\n\nb) Para a=0, calcula los intervalos de crecimiento y de decrecimiento de f. Estudia y halla los extremos relativos de f (abscisas donde se obtienen y valores que se alcanzan).',
    (id) => [
      part(id, 'a', 'Calcula a para que y=1 sea una asíntota horizontal.', 'a=1.', ['a=0.', 'a=−1.', 'No existe ningún valor de a.'], ['Tomar ln(x)/x² como uno.', 'Cambiar el signo de la asíntota.', 'Confundir el crecimiento del logaritmo con el del cuadrado.'], [step('Una asíntota horizontal en +∞ exige un límite finito igual a uno.', 'lim_{x→+∞}f(x)=1'), step('El cuadrado domina al logaritmo.', 'lim ln(x)/x²=0'), step('Por tanto el límite de f es el parámetro.', 'lim f(x)=a'), step('Igualamos con la ordenada pedida.', 'a=1'), step('Comprobamos directamente la diferencia con la recta.', 'lim[f(x)−1]=0')], { method: 'ASYMPTOTIC_DOMINANCE_CHECK', detail: 'Se verifica la definición de asíntota.', evidence: { logarithmicQuotientLimit: 0, a: 1 } }),
      part(id, 'b', 'Para a=0, estudia crecimiento, decrecimiento y extremos.', 'Crece en (0,√e), decrece en (√e,+∞) y tiene máximo en (√e,1/(2e)).',
        ['Decrece en (0,√e), crece en (√e,+∞) y tiene mínimo en (√e,1/(2e)).', 'Crece en (0,e), decrece en (e,+∞) y su máximo vale 1/e².', 'Crece en todo (0,+∞) y no tiene extremos.'],
        ['Invertir el signo de la derivada.', 'Resolver 1−2ln x=0 como ln x=1.', 'Ignorar el cambio de signo del numerador.'],
        [step('Fijamos a=0 y derivamos como producto ln(x)x⁻².', 'f′(x)=(1−2ln x)/x³'), step('En el dominio el denominador es positivo.', 'x³>0'), step('El único punto crítico procede del numerador.', '1−2ln x=0 ⇒ x=√e'), step('El numerador es positivo antes y negativo después.', 'f′>0 en (0,√e); f′<0 en (√e,+∞)'), step('El cambio de signo da un máximo.', 'f(√e)=ln(√e)/e=1/(2e)'), step('Los límites de frontera confirman que es también absoluto.', 'lim_{x→0+}ln(x)/x²=−∞; lim_{x→∞}f(x)=0')],
        { method: 'SYMBOLIC_DIFFERENTIATION_AND_SIGN_CHART', detail: 'Se verifica derivada, signo y valor del extremo.', evidence: { critical: 'sqrt(e)', value: '1/(2e)' } })
    ]),

  record(4, 'Geometría', 'geometria', 'Geometría del espacio', [6, 7], 3,
    'Sean los puntos O(0,0,0), A(0,2,−2), B(1,2,m) y C(2,3,2).\n\na) Halla los valores de m para que el tetraedro determinado por los puntos O, A, B y C tenga un volumen de 3 unidades cúbicas.\n\nb) Para m=0, calcula la distancia del punto O al plano que pasa por los puntos A, B y C.',
    (id) => [
      part(id, 'a', 'Halla los valores de m.', 'm=−4 o m=5.', ['m=4 o m=−5.', 'm=−4 solamente.', 'm=−5 o m=13/2.'], ['Cambiar el signo al resolver las dos ramas.', 'Resolver solo una rama del valor absoluto.', 'Omitir el factor 1/6 del volumen.'], [step('Con O como origen, usamos los tres vectores de posición.', 'OA=(0,2,−2); OB=(1,2,m); OC=(2,3,2)'), step('El volumen es un sexto del valor absoluto del producto mixto.', 'V=|det(OA,OB,OC)|/6'), step('Desarrollamos el determinante.', 'det(OA,OB,OC)=4m−2'), step('Imponemos el volumen indicado.', '|4m−2|/6=3 ⇒ |4m−2|=18'), step('Resolvemos las dos ramas.', '4m−2=18 o 4m−2=−18'), step('Obtenemos y verificamos ambos parámetros.', 'm=5 o m=−4; en ambos casos |4m−2|/6=3')], { method: 'TRIPLE_PRODUCT_RECOMPUTATION', detail: 'El determinante se recalcula de forma independiente.', evidence: { determinant: '4m-2', values: [-4, 5] } }),
      part(id, 'b', 'Para m=0, calcula la distancia de O al plano ABC.', 'd(O,ABC)=frac{2√5}{5}.', ['d(O,ABC)=frac{2}{5}.', 'd(O,ABC)=frac{√5}{5}.', 'd(O,ABC)=2√5.'], ['Omitir la norma del vector normal.', 'Perder el término independiente del plano.', 'Multiplicar en lugar de dividir por la norma.'], [step('Para m=0 formamos dos vectores del plano.', 'AB=(1,0,2); AC=(2,1,4)'), step('Un producto vectorial proporciona una normal.', 'AB×AC=(−2,0,1)'), step('Usando A obtenemos la ecuación del plano.', '−2x+z+2=0'), step('Aplicamos la fórmula de distancia punto-plano.', 'd=frac{|2|}{√(4+1)}'), step('Racionalizamos.', 'd=frac{2}{√5}=frac{2√5}{5}'), step('La proyección ortogonal da la misma longitud.', 'O+t(−2,0,1) corta al plano para t=frac{−2}{5}; distancia=|t|√5=frac{2√5}{5}')], { method: 'PLANE_DISTANCE_AND_ORTHOGONAL_PROJECTION', detail: 'Fórmula y proyección independiente coinciden.', evidence: { plane: '-2x+z+2=0', distanceSquared: 0.8 } })
    ], ['Producto mixto', 'Distancia punto-plano']),

  record(5, 'Geometría', 'geometria', 'Geometría del espacio', [6, 7], 3,
    'Considera el punto P(1,1,1) y la recta r≡(x−1)/1=(y−2)/2=(z−3)/2.\n\na) Halla el plano que pasa por el punto P y contiene a la recta r.\n\nb) Halla la recta que pasa por el punto P y corta perpendicularmente a la recta r.',
    (id) => [
      part(id, 'a', 'Halla el plano que pasa por P y contiene r.', 'π: 2x−2y+z−1=0.', ['π: 2x−2y+z+1=0.', 'π: x+2y+2z−9=0.', 'π: 2x+2y−z−3=0.'], ['Usar un término independiente que no hace pasar por P.', 'Tomar el director de r como vector normal.', 'Cambiar el signo de una componente del producto vectorial.'], [step('Tomamos Q=(1,2,3) de r y su director v=(1,2,2).', 'Q∈r; v=(1,2,2)'), step('El plano también contiene el vector QP.', 'QP=P−Q=(0,−1,−2)'), step('Una normal es el producto de ambos vectores.', 'v×QP=(−2,2,−1) ∥ (2,−2,1)'), step('Escribimos el plano por P.', '2(x−1)−2(y−1)+(z−1)=0'), step('Simplificamos.', 'π:2x−2y+z−1=0'), step('Comprobamos P y toda la recta.', '2−2+1−1=0; (2,−2,1)·(1,2,2)=0; Q∈π')], { method: 'TWO_DIRECTION_PLANE_MEMBERSHIP', detail: 'Se comprueba pertenencia del punto, de Q y ortogonalidad con el director de r.', evidence: { plane: '2x-2y+z-1=0', dot: 0 } }),
      part(id, 'b', 'Halla la perpendicular desde P que corta r.', 's:(x,y,z)=(1,1,1)+λ(2,1,−2).', ['s:(x,y,z)=(1,1,1)+λ(1,2,2).', 's:(x,y,z)=(1,2,3)+λ(2,1,−2).', 's:(x,y,z)=(1,1,1)+λ(2,−1,2).'], ['Usar una paralela a r.', 'Hacer pasar la perpendicular por Q, no por P.', 'Cambiar un signo y perder la ortogonalidad.'], [step('Parametrizamos un punto genérico de r.', 'A=(1+t,2+2t,3+2t)'), step('El vector PA debe ser perpendicular a v.', '(A−P)·(1,2,2)=0'), step('Sustituimos y despejamos el parámetro.', 't+2(1+2t)+2(2+2t)=0 ⇒ t=frac{−2}{3}'), step('Hallamos el pie.', 'A=(frac{1}{3},frac{2}{3},frac{5}{3})'), step('Un director de PA es proporcional a A−P.', 'A−P=(frac{−2}{3},frac{−1}{3},frac{2}{3}) ∥ (2,1,−2)'), step('Verificamos perpendicularidad y corte.', '(2,1,−2)·(1,2,2)=0; A∈r∩s')], { method: 'ORTHOGONAL_FOOT_SUBSTITUTION', detail: 'El punto de corte satisface ambas rectas y el producto escalar es cero.', evidence: { foot: ['1/3', '2/3', '5/3'], dot: 0 } })
    ]),

  record(6, 'Análisis', 'analisis', 'Integrales', [3], 4,
    'Halla la función f:(0,+∞)→ℝ que pasa por los puntos (2,e−2−2ln(2)) y (1,0), y verifica que f″(x)=e^{x−1}−1/x.',
    (id) => [part(id, 'whole', 'Determina la función.', 'f(x)=e^{x−1}−x ln(x)−x.',
      ['f(x)=e^{x−1}−x ln(x)+x.', 'f(x)=e^{x−1}−ln(x)−2x.', 'f(x)=e^x−x ln(x)−x.'],
      ['Cambiar el signo de la constante lineal.', 'Integrar −1/x solo una vez.', 'Perder el factor e⁻¹.'],
      [step('Integramos la segunda derivada una vez.', 'f′(x)=e^{x−1}−ln x+A'), step('Integramos de nuevo; para ∫ln x usamos partes.', 'f(x)=e^{x−1}−x ln x+x+Ax+B'), step('Imponemos el paso por (1,0).', '0=1+1+A+B ⇒ A+B=−2'), step('Imponemos el segundo punto.', 'e−2−2ln2=e−2ln2+2+2A+B'), step('Resolvemos las dos constantes.', 'A=−2; B=0'), step('Derivamos dos veces y evaluamos los puntos.', 'f″=e^{x−1}−1/x; f(1)=0; f(2)=e−2−2ln2')],
      { method: 'DOUBLE_DIFFERENTIATION_AND_POINT_CHECK', detail: 'Se derivó la candidata y se evaluaron ambos puntos.', evidence: { A: -2, B: 0 } })]),

  record(7, 'Probabilidad y Estadística', 'estadistica', 'Probabilidad', [8], 4,
    'En la tabla siguiente se recoge el número de coches y motos que se presentaron a la ITV en el año 2023:\n\nAptos: 116.383 coches y 160.667 motos.\nNo aptos: 2.679 coches y 3.447 motos.\n\nSe elige un vehículo al azar de entre los coches y motos que se presentaron a dicha inspección.\n\na) ¿Cuál es la probabilidad de que el vehículo elegido sea una moto o haya resultado apto?\n\nb) Si el vehículo elegido es un coche, ¿cuál es la probabilidad de que haya resultado no apto?',
    (id) => [
      part(id, 'a', 'Calcula P(moto ∪ apto).', 'P=280497/283176=4921/4968≈0,99054.', ['P=277050/283176≈0,97837.', 'P=164114/283176≈0,57954.', 'P=441164/283176>1.'], ['Contar solo los aptos.', 'Contar solo las motos.', 'Sumar motos y aptos sin corregir su intersección.'], [step('Completamos los totales por columnas y global.', 'coches=119062; motos=164114; total=283176'), step('La unión puede contarse como todas las motos más los coches aptos.', '|M∪A|=164114+116383=280497'), step('Dividimos entre el total equiprobable.', 'P=280497/283176'), step('Simplificamos la fracción.', 'P=4921/4968'), step('Obtenemos el decimal sin redondear antes.', 'P≈0,990539'), step('Comprobamos por complemento.', 'P=1−2679/283176')], { method: 'CONTINGENCY_TABLE_UNION_AND_COMPLEMENT', detail: 'Conteo directo y complemento coinciden.', evidence: { total: 283176, favorable: 280497 } }),
      part(id, 'b', 'Calcula P(no apto | coche).', 'P=2679/119062≈0,02250.', ['P=2679/283176≈0,00946.', 'P=6126/283176≈0,02163.', 'P=116383/119062≈0,97750.'], ['Usar el total de vehículos como denominador.', 'Calcular la probabilidad total de no apto.', 'Calcular la probabilidad complementaria apto dado coche.'], [step('La condición restringe el espacio muestral a los coches.', 'coches=116383+2679=119062'), step('Entre esos coches, los casos favorables son los no aptos.', 'favorables=2679'), step('Aplicamos la definición de probabilidad condicionada.', 'P(N|C)=2679/119062'), step('Calculamos el decimal.', 'P≈0,0225018'), step('La probabilidad complementaria sirve de control.', 'P(A|C)=116383/119062; P(N|C)+P(A|C)=1')], { method: 'CONDITIONAL_COUNT_AND_COMPLEMENT', detail: 'Se usa el denominador condicionado y se verifica el complemento.', evidence: { conditionedTotal: 119062, favorable: 2679 } })
    ], ['Tabla de contingencia', 'Probabilidad condicionada'])
];
