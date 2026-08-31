const step = (title, explanation, expression = "") => ({ title, explanation, expression });

const build = (id, group, course, topic, statement, answer, steps, verification, extras = {}) => ({
  id,
  group,
  course,
  topic,
  statement,
  answer,
  solution: {
    title: "Resolución",
    steps,
    finalResult: answer,
  },
  verification,
  classification: "CORRECT_AND_PEDAGOGICAL",
  ...extras,
});

export const PRACTICAL_VALIDATION_CASES = [
  build("eso-integers", "ESO", "2ESO", "Operaciones con enteros", "Calcula 8 - 3·(5 - 9) - 7.", "13", [
    step("Paso 1", "Resolvemos primero el paréntesis.", "5 - 9 = -4"),
    step("Paso 2", "Efectuamos la multiplicación antes que las sumas y restas.", "3·(-4) = -12"),
    step("Paso 3", "Sustituimos y simplificamos.", "8 - (-12) - 7 = 13"),
  ], { kind: "integer-expression", expected: 13 }),
  build("eso-fractions", "ESO", "2ESO", "Fracciones", "Calcula 3/4 - 2/3 + 5/6.", "11/12", [
    step("Paso 1", "Tomamos denominador común 12.", "3/4 = 9/12; 2/3 = 8/12; 5/6 = 10/12"),
    step("Paso 2", "Operamos los numeradores.", "(9 - 8 + 10)/12 = 11/12"),
    step("Comprobación", "La fracción ya es irreducible porque 11 y 12 son coprimos.", "mcd(11,12)=1"),
  ], { kind: "fraction", numerator: 11, denominator: 12 }),
  build("eso-equation-fractions", "ESO", "3ESO", "Ecuaciones", "Resuelve (x - 1)/3 - (x + 2)/2 = -3.", "x = 10", [
    step("Paso 1", "Multiplicamos toda la ecuación por 6.", "2(x - 1) - 3(x + 2) = -18"),
    step("Paso 2", "Quitamos paréntesis y agrupamos.", "2x - 2 - 3x - 6 = -18"),
    step("Paso 3", "Despejamos.", "-x - 8 = -18; x = 10"),
    step("Comprobación", "Sustituimos en la ecuación original.", "9/3 - 12/2 = 3 - 6 = -3"),
  ], { kind: "equation", expected: 10, equation: "fraction-linear" }),
  build("eso-gauss-3", "ESO", "4ESO_B", "Sistemas", "Resuelve por Gauss: x + y + z = 6; 2x - y + z = 3; x + 2y - z = 2.", "x = 1, y = 2, z = 3", [
    step("Paso 1", "Eliminamos x de las filas segunda y tercera.", "F2 - 2F1; F3 - F1"),
    step("Paso 2", "El sistema reducido queda.", "-3y - z = -9; y - 2z = -4"),
    step("Paso 3", "Resolvemos de abajo arriba.", "z = 3; y = 2; x = 1"),
    step("Comprobación", "Los tres valores verifican las tres ecuaciones.", "1+2+3=6; 2-2+3=3; 1+4-3=2"),
  ], { kind: "linear-system", A: [[1,1,1],[2,-1,1],[1,2,-1]], x: [1,2,3], b: [6,3,2] }),
  build("eso-rationalize", "ESO", "4ESO_B", "Radicales", "Racionaliza 3/(√5 - 1).", "3(√5 + 1)/4", [
    step("Paso 1", "Multiplicamos por el conjugado del denominador.", "3/(√5-1) · (√5+1)/(√5+1)"),
    step("Paso 2", "Aplicamos diferencia de cuadrados.", "(√5-1)(√5+1)=5-1=4"),
    step("Resultado", "Simplificamos.", "3(√5+1)/4"),
  ], { kind: "numeric-equivalence", left: "rationalized", tolerance: 1e-10 }),
  build("eso-ruffini", "ESO", "4ESO_B", "Polinomios", "Factoriza P(x)=x³-6x²+11x-6 mediante Ruffini.", "P(x) = (x - 1)(x - 2)(x - 3)", [
    step("Paso 1", "Probamos las raíces enteras divisoras de 6; x=1 anula el polinomio.", "P(1)=0"),
    step("Paso 2", "Ruffini con 1 produce el cociente.", "x² - 5x + 6"),
    step("Paso 3", "Factorizamos el cociente.", "x²-5x+6=(x-2)(x-3)"),
    step("Comprobación", "Al desarrollar recuperamos los coeficientes originales.", "(x-1)(x-2)(x-3)=x³-6x²+11x-6"),
  ], { kind: "polynomial-roots", coefficients: [1,-6,11,-6], roots: [1,2,3] }),

  build("mi-trig", "Matemáticas I", "1BACH_MATH", "Trigonometría", "Resuelve en [0,2π): 2 sen²x - 3 sen x + 1 = 0.", "x = π/6, π/2, 5π/6", [
    step("Paso 1", "Tomamos u=sen x y resolvemos la ecuación cuadrática.", "2u²-3u+1=0"),
    step("Paso 2", "Obtenemos los valores posibles del seno.", "u=1 o u=1/2"),
    step("Paso 3", "Buscamos los ángulos del intervalo.", "sen x=1 ⇒ x=π/2; sen x=1/2 ⇒ x=π/6 o x=5π/6"),
  ], { kind: "trig-roots", roots: [Math.PI/6,Math.PI/2,5*Math.PI/6] }),
  build("mi-limit-00", "Matemáticas I", "1BACH_MATH", "Límites", "Calcula lim cuando x→2 de (x²-4)/(x-2).", "4", [
    step("Paso 1", "La sustitución directa produce 0/0; factorizamos.", "x²-4=(x-2)(x+2)"),
    step("Paso 2", "Simplificamos para x distinto de 2.", "(x²-4)/(x-2)=x+2"),
    step("Paso 3", "Calculamos el límite de la expresión simplificada.", "lim(x→2)(x+2)=4"),
  ], { kind: "limit-sample", limit: 4, sample: 2 }),
  build("mi-limit-infinity", "Matemáticas I", "1BACH_MATH", "Límites", "Calcula lim cuando x→∞ de (3x²-x+1)/(2x²+5).", "3/2", [
    step("Paso 1", "Dividimos numerador y denominador entre x².", "(3-1/x+1/x²)/(2+5/x²)"),
    step("Paso 2", "Los términos con 1/x y 1/x² tienden a cero.", "3/2"),
  ], { kind: "limit-infinity", limit: 1.5 }),
  build("mi-continuity", "Matemáticas I", "1BACH_MATH", "Continuidad", "Determina k para que f(x) sea continua en x=1: f(x)=(x²-1)/(x-1) si x≠1 y f(1)=k.", "k = 2", [
    step("Paso 1", "Factorizamos y simplificamos cerca de x=1.", "(x²-1)/(x-1)=x+1"),
    step("Paso 2", "Calculamos el límite lateral común.", "lim(x→1) f(x)=2"),
    step("Paso 3", "Igualamos el valor de la función al límite.", "k=2"),
  ], { kind: "continuity", expected: 2 }),
  build("mi-monotonicity", "Matemáticas I", "1BACH_MATH", "Derivadas", "Estudia crecimiento y extremos de f(x)=x³-3x.", "Crece en (-∞,-1)∪(1,∞), decrece en (-1,1); máximo (-1,2), mínimo (1,-2)", [
    step("Paso 1", "Derivamos y hallamos puntos críticos.", "f'(x)=3x²-3=3(x-1)(x+1)"),
    step("Paso 2", "Estudiamos el signo de f'.", "f'>0 si x<-1 o x>1; f'<0 si -1<x<1"),
    step("Paso 3", "Evaluamos los extremos.", "f(-1)=2; f(1)=-2"),
  ], { kind: "derivative-sign", critical: [-1,1] }),
  build("mi-concavity", "Matemáticas I", "1BACH_MATH", "Derivadas", "Estudia concavidad y puntos de inflexión de f(x)=x⁴-6x².", "Convexa en (-∞,-1)∪(1,∞), cóncava en (-1,1); inflexión en (-1,-5) y (1,-5)", [
    step("Paso 1", "Calculamos la segunda derivada.", "f''(x)=12x²-12=12(x²-1)"),
    step("Paso 2", "Estudiamos su signo.", "f''>0 si |x|>1; f''<0 si |x|<1"),
    step("Paso 3", "Hay cambio de concavidad en x=±1.", "f(±1)=-5"),
  ], { kind: "second-derivative", inflection: [-1,1] }),
  build("mi-system", "Matemáticas I", "1BACH_MATH", "Sistemas", "Resuelve: x+y+z=3; x-y+z=1; 2x+y-z=2.", "x = 1, y = 1, z = 1", [
    step("Paso 1", "Restamos las dos primeras ecuaciones.", "2y=2 ⇒ y=1"),
    step("Paso 2", "Sustituimos y resolvemos las dos ecuaciones restantes.", "x+z=2; 2x-z=1"),
    step("Paso 3", "Obtenemos x=1 y z=1.", "(x,y,z)=(1,1,1)"),
  ], { kind: "linear-system", A:[[1,1,1],[1,-1,1],[2,1,-1]], x:[1,1,1], b:[3,1,2] }),

  build("mii-axb", "Matemáticas II", "2BACH_MATH", "Álgebra", "Sean A=[[1,1],[0,1]], B=[[1,0],[1,1]] y C=[[4,2],[2,2]]. Resuelve AXB=C.", "X = [[2,0],[0,2]]", [
    step("Paso 1", "Como A y B son invertibles, aislamos X.", "X=A⁻¹CB⁻¹"),
    step("Paso 2", "Calculamos las inversas.", "A⁻¹=[[1,-1],[0,1]]; B⁻¹=[[1,0],[-1,1]]"),
    step("Paso 3", "Multiplicamos en el orden indicado.", "X=[[2,0],[0,2]]"),
    step("Comprobación", "Verificamos el producto original.", "AXB=C"),
  ], { kind:"matrix-equation", A:[[1,1],[0,1]], X:[[2,0],[0,2]], B:[[1,0],[1,1]], C:[[4,2],[2,2]] }),
  build("mii-det-properties", "Matemáticas II", "2BACH_MATH", "Determinantes", "Si det(A)=3 para una matriz 3×3, calcula det(2Aᵀ).", "24", [
    step("Paso 1", "La trasposición no cambia el determinante.", "det(Aᵀ)=det(A)=3"),
    step("Paso 2", "En orden 3, multiplicar la matriz por 2 multiplica el determinante por 2³.", "det(2Aᵀ)=2³·3=24"),
  ], { kind:"scalar", expected:24 }),
  build("mii-det-4", "Matemáticas II", "2BACH_MATH", "Determinantes", "Calcula det([[1,2,0,0],[0,3,1,0],[0,0,2,4],[0,0,0,5]]).", "30", [
    step("Paso 1", "La matriz es triangular superior.", "det(A)=producto de la diagonal"),
    step("Paso 2", "Multiplicamos los elementos diagonales.", "1·3·2·5=30"),
  ], { kind:"determinant", matrix:[[1,2,0,0],[0,3,1,0],[0,0,2,4],[0,0,0,5]], expected:30 }),
  build("mii-rank-param", "Matemáticas II", "2BACH_MATH", "Rango", "Estudia el rango de A=[[1,0,1],[0,1,1],[1,1,a]].", "rango(A)=3 si a≠2; rango(A)=2 si a=2", [
    step("Paso 1", "Calculamos el determinante.", "det(A)=a-2"),
    step("Paso 2", "Si a≠2, el determinante no es cero y el rango es 3.", "rg(A)=3"),
    step("Paso 3", "Si a=2, queda un menor de orden 2 no nulo.", "det([[1,0],[0,1]])=1 ⇒ rg(A)=2"),
  ], { kind:"rank-parameter" }),
  build("mii-rouche", "Matemáticas II", "2BACH_MATH", "Sistemas", "Discute según a: x+y=2; 2x+2y=4; x+y=a.", "Compatible indeterminado si a=2; incompatible si a≠2", [
    step("Paso 1", "La segunda ecuación es el doble de la primera.", "2(x+y)=4"),
    step("Paso 2", "Comparamos la tercera con x+y=2.", "a=2 ⇒ misma ecuación; a≠2 ⇒ contradicción"),
    step("Conclusión", "Aplicamos Rouché-Frobenius.", "a=2: rg(A)=rg(A*)=1<2; a≠2: rg(A)<rg(A*)"),
  ], { kind:"rouche" }),
  build("mii-cramer", "Matemáticas II", "2BACH_MATH", "Sistemas", "Resuelve por Cramer: x+y+z=6; 2x-y+z=3; x+2y-z=2.", "x = 1, y = 2, z = 3", [
    step("Paso 1", "Calculamos el determinante de coeficientes.", "det(A)=7≠0"),
    step("Paso 2", "Sustituimos cada columna por los términos independientes.", "Dx=7; Dy=14; Dz=21"),
    step("Paso 3", "Aplicamos las fórmulas de Cramer.", "x=Dx/D=1; y=2; z=3"),
  ], { kind:"linear-system", A:[[1,1,1],[2,-1,1],[1,2,-1]], x:[1,2,3], b:[6,3,2] }),

  build("mii-lhopital", "Matemáticas II", "2BACH_MATH", "Límites", "Calcula lim cuando x→0 de (eˣ-1-x)/x².", "1/2", [
    step("Paso 1", "La sustitución produce 0/0; aplicamos L’Hôpital.", "lim (eˣ-1)/(2x)"),
    step("Paso 2", "Persiste 0/0 y aplicamos L’Hôpital de nuevo.", "lim eˣ/2"),
    step("Paso 3", "Sustituimos x=0.", "1/2"),
  ], { kind:"limit-exp", expected:0.5 }),
  build("mii-cont-diff", "Matemáticas II", "2BACH_MATH", "Continuidad y derivabilidad", "Sea f(x)=ax+b si x≤1 y x² si x>1. Halla a,b para que sea continua y derivable en 1.", "a = 2, b = -1", [
    step("Paso 1", "La continuidad exige igualdad de valores.", "a+b=1"),
    step("Paso 2", "La derivabilidad exige igualdad de derivadas laterales.", "a=2"),
    step("Paso 3", "Sustituimos en la condición de continuidad.", "b=-1"),
  ], { kind:"pair", expected:[2,-1] }),
  build("mii-growth", "Matemáticas II", "2BACH_MATH", "Derivadas", "Estudia el crecimiento de f(x)=x/(x²+1).", "Crece en (-1,1) y decrece en (-∞,-1)∪(1,∞); mínimo en x=-1 y máximo en x=1", [
    step("Paso 1", "Derivamos mediante la regla del cociente.", "f'(x)=(1-x²)/(x²+1)²"),
    step("Paso 2", "El denominador es positivo y estudiamos 1-x².", "f'>0 si |x|<1; f'<0 si |x|>1"),
    step("Paso 3", "Clasificamos los puntos críticos.", "f(-1)=-1/2; f(1)=1/2"),
  ], { kind:"derivative-sign", critical:[-1,1] }),
  build("mii-concavity", "Matemáticas II", "2BACH_MATH", "Derivadas", "Estudia concavidad de f(x)=x³-3x².", "Cóncava si x<1, convexa si x>1; inflexión en (1,-2)", [
    step("Paso 1", "Calculamos la segunda derivada.", "f''(x)=6x-6"),
    step("Paso 2", "Cambia de signo en x=1.", "f''<0 si x<1; f''>0 si x>1"),
    step("Paso 3", "Evaluamos la función.", "f(1)=-2"),
  ], { kind:"second-derivative", inflection:[1] }),
  build("mii-integral-immediate", "Matemáticas II", "2BACH_MATH", "Integrales", "Calcula ∫(3x²-4x+1) dx.", "x³ - 2x² + x + C", [
    step("Paso 1", "Integramos término a término.", "∫3x² dx=x³; ∫-4x dx=-2x²; ∫1 dx=x"),
    step("Resultado", "Añadimos la constante de integración.", "x³-2x²+x+C"),
    step("Comprobación", "Derivamos la primitiva.", "(x³-2x²+x+C)'=3x²-4x+1"),
  ], { kind:"antiderivative-polynomial", primitive:[1,-2,1,0], integrand:[3,-4,1] }),
  build("mii-integral-substitution", "Matemáticas II", "2BACH_MATH", "Integrales", "Calcula ∫2x cos(x²) dx.", "sen(x²) + C", [
    step("Paso 1", "Tomamos u=x².", "du=2x dx"),
    step("Paso 2", "La integral queda inmediata.", "∫cos u du=sen u+C"),
    step("Paso 3", "Deshacemos el cambio.", "sen(x²)+C"),
  ], { kind:"antiderivative-sample", family:"sin-x2" }),
  build("mii-integral-parts", "Matemáticas II", "2BACH_MATH", "Integrales", "Calcula ∫x eˣ dx.", "eˣ(x - 1) + C", [
    step("Paso 1", "Elegimos u=x y dv=eˣ dx.", "du=dx; v=eˣ"),
    step("Paso 2", "Aplicamos integración por partes.", "∫x eˣ dx=x eˣ-∫eˣ dx"),
    step("Resultado", "Simplificamos.", "eˣ(x-1)+C"),
  ], { kind:"antiderivative-sample", family:"x-exp" }),
  build("mii-integral-parts-twice", "Matemáticas II", "2BACH_MATH", "Integrales", "Calcula ∫x² eˣ dx.", "eˣ(x² - 2x + 2) + C", [
    step("Paso 1", "Aplicamos partes con u=x².", "∫x²eˣ dx=x²eˣ-2∫xeˣ dx"),
    step("Paso 2", "Aplicamos partes a la integral restante.", "∫xeˣ dx=xeˣ-eˣ"),
    step("Resultado", "Agrupamos términos.", "eˣ(x²-2x+2)+C"),
  ], { kind:"antiderivative-sample", family:"x2-exp" }),
  build("mii-area-between", "Matemáticas II", "2BACH_MATH", "Áreas", "Calcula el área encerrada entre y=x e y=x².", "1/6", [
    step("Paso 1", "Hallamos los puntos de corte.", "x=x² ⇒ x=0,1"),
    step("Paso 2", "En [0,1], x está por encima de x².", "A=∫₀¹(x-x²) dx"),
    step("Paso 3", "Evaluamos la integral.", "[x²/2-x³/3]₀¹=1/2-1/3=1/6"),
  ], { kind:"definite-integral", family:"x-minus-x2", expected:1/6 }),
  build("mii-area-axis", "Matemáticas II", "2BACH_MATH", "Áreas", "Calcula el área entre y=x²-1 y el eje X en [-1,1].", "4/3", [
    step("Paso 1", "La función es no positiva en [-1,1].", "|x²-1|=1-x²"),
    step("Paso 2", "Integramos el valor absoluto.", "A=∫₋₁¹(1-x²) dx"),
    step("Paso 3", "Usamos simetría y evaluamos.", "2[x-x³/3]₀¹=4/3"),
  ], { kind:"definite-integral", family:"one-minus-x2-symmetric", expected:4/3 }),

  build("geo-lines", "Geometría", "2BACH_MATH", "Posiciones relativas", "Estudia r:(x,y,z)=(0,0,0)+t(1,1,0) y s:(x,y,z)=(0,1,1)+u(1,-1,0).", "Rectas que se cruzan", [
    step("Paso 1", "Los vectores directores no son proporcionales.", "(1,1,0) y (1,-1,0)"),
    step("Paso 2", "Ambas rectas tienen z constante: r tiene z=0 y s tiene z=1.", "No pueden cortarse"),
    step("Conclusión", "No son paralelas ni secantes y, por tanto, se cruzan.", "rectas cruzadas"),
  ], { kind:"geometry", expected:"skew" }),
  build("geo-line-plane", "Geometría", "2BACH_MATH", "Recta y plano", "Halla la intersección de r:(x,y,z)=(1,0,0)+t(1,1,1) con π:x+y+z=4.", "P = (2,1,1)", [
    step("Paso 1", "Sustituimos la recta en el plano.", "(1+t)+t+t=4"),
    step("Paso 2", "Resolvemos el parámetro.", "3t=3 ⇒ t=1"),
    step("Paso 3", "Calculamos el punto.", "P=(2,1,1)"),
  ], { kind:"point-plane", point:[2,1,1], plane:[1,1,1,-4] }),
  build("geo-planes", "Geometría", "2BACH_MATH", "Planos", "Estudia π:x+y+z=1 y σ:2x+2y+2z=3.", "Planos paralelos distintos", [
    step("Paso 1", "Los vectores normales son proporcionales.", "nσ=2nπ"),
    step("Paso 2", "Los términos independientes no guardan la misma proporción.", "3≠2·1"),
    step("Conclusión", "Son paralelos y no coincidentes.", "π ∥ σ"),
  ], { kind:"geometry", expected:"parallel-planes" }),
  build("geo-cross", "Geometría", "2BACH_MATH", "Producto vectorial", "Calcula (1,2,0) × (0,1,3).", "(6, -3, 1)", [
    step("Paso 1", "Desarrollamos el determinante simbólico.", "(2·3-0·1, -(1·3-0·0), 1·1-2·0)"),
    step("Paso 2", "Simplificamos.", "(6,-3,1)"),
    step("Comprobación", "El resultado es perpendicular a ambos vectores.", "(6,-3,1)·(1,2,0)=0; (6,-3,1)·(0,1,3)=0"),
  ], { kind:"cross-product", u:[1,2,0], v:[0,1,3], expected:[6,-3,1] }),
  build("geo-distance", "Geometría", "2BACH_MATH", "Distancias", "Calcula la distancia de P=(1,2,3) al plano 2x-y+2z-5=0.", "1/3", [
    step("Paso 1", "Aplicamos la fórmula punto-plano.", "d=|2·1-2+2·3-5|/√(2²+(-1)²+2²)"),
    step("Paso 2", "Simplificamos numerador y denominador.", "d=|1|/3=1/3"),
  ], { kind:"distance-point-plane", point:[1,2,3], plane:[2,-1,2,-5], expected:1/3 }),
  build("geo-combined", "Geometría", "2BACH_MATH", "Métrica", "Halla el plano que pasa por P=(1,0,0) y es perpendicular a r de vector director (2,-1,1), y calcula la distancia del origen al plano.", "π:2x-y+z-2=0; distancia 2/√6", [
    step("Paso 1", "El vector director de r es normal al plano buscado.", "n=(2,-1,1)"),
    step("Paso 2", "Usamos el punto P.", "2(x-1)-y+z=0 ⇒ 2x-y+z-2=0"),
    step("Paso 3", "Aplicamos la fórmula de distancia desde el origen.", "d=|-2|/√6=2/√6"),
  ], { kind:"distance-point-plane", point:[0,0,0], plane:[2,-1,1,-2], expected:2/Math.sqrt(6) }),

  build("prob-bayes", "Probabilidad", "2BACH_CCSS", "Bayes", "Una enfermedad afecta al 1%. Un test tiene sensibilidad 95% y especificidad 90%. Calcula P(enfermedad | positivo).", "19/217 ≈ 0,0876", [
    step("Paso 1", "Calculamos la probabilidad total de positivo.", "P(+)=0,95·0,01+0,10·0,99=0,1085"),
    step("Paso 2", "Aplicamos Bayes.", "P(E|+)=0,95·0,01/0,1085"),
    step("Resultado", "Simplificamos.", "19/217≈0,0876"),
  ], { kind:"bayes", prevalence:.01, sensitivity:.95, falsePositive:.10, expected:19/217 }),
  build("prob-binomial", "Probabilidad", "2BACH_CCSS", "Binomial", "Si X~B(10,0,3), calcula P(X=3).", "C(10,3)·0,3³·0,7⁷ ≈ 0,2668", [
    step("Paso 1", "Usamos la función de probabilidad binomial.", "P(X=3)=C(10,3)p³(1-p)⁷"),
    step("Paso 2", "Sustituimos p=0,3.", "120·0,3³·0,7⁷≈0,2668"),
  ], { kind:"binomial", n:10, p:.3, k:3, expected:.266827932 }),
  build("prob-normal", "Probabilidad", "2BACH_CCSS", "Normal", "Si X~N(100,15), calcula P(X≤115).", "Φ(1) ≈ 0,8413", [
    step("Paso 1", "Tipificamos.", "Z=(115-100)/15=1"),
    step("Paso 2", "Consultamos la normal estándar.", "P(X≤115)=Φ(1)≈0,8413"),
  ], { kind:"normal-cdf", z:1, expected:.841344746 }),
  build("prob-normal-approx", "Probabilidad", "2BACH_CCSS", "Aproximación normal", "Si X~B(200,0,4), aproxima P(X≤90) usando corrección de continuidad.", "≈ 0,935", [
    step("Paso 1", "Calculamos media y desviación típica.", "μ=80; σ=√48≈6,928"),
    step("Paso 2", "Aplicamos corrección de continuidad.", "P(X≤90)≈P(Y≤90,5)"),
    step("Paso 3", "Tipificamos.", "z=(90,5-80)/√48≈1,516; Φ(z)≈0,935"),
  ], { kind:"normal-approx", n:200,p:.4,bound:90.5 }),
  build("prob-inverse-normal", "Probabilidad", "2BACH_CCSS", "Normal inversa", "Si X~N(50,8), halla q tal que P(X≤q)=0,975.", "q ≈ 65,68", [
    step("Paso 1", "El percentil 0,975 de la normal estándar es 1,96.", "z₀,₉₇₅=1,96"),
    step("Paso 2", "Destipificamos.", "q=50+1,96·8=65,68"),
  ], { kind:"inverse-normal", mean:50, sd:8, z:1.96, expected:65.68 }),
  build("prob-linear-programming", "Probabilidad", "2BACH_CCSS", "Programación lineal", "Maximiza Z=3x+2y sujeto a x+y≤4, x≤2, x≥0, y≥0.", "Máximo Z=10 en (2,2)", [
    step("Paso 1", "Representamos las semirrectas y obtenemos la región factible.", "x+y≤4; x≤2; x≥0; y≥0"),
    step("Paso 2", "Los vértices son (0,0), (2,0), (2,2) y (0,4).", "V={(0,0),(2,0),(2,2),(0,4)}"),
    step("Paso 3", "Evaluamos la función objetivo en los vértices.", "0,6,10,8"),
    step("Conclusión", "El máximo es 10 en (2,2).", "Zmax=10"),
  ], { kind:"linear-programming", vertices:[[0,0],[2,0],[2,2],[0,4]], objective:[3,2], expected:10 }, { visualRequirement:"feasible-region" }),
  build("prob-inference", "Probabilidad", "2BACH_CCSS", "Inferencia", "Una muestra de 100 personas da una proporción 0,40. Calcula un intervalo de confianza del 95% para la proporción.", "[0,304; 0,496] aproximadamente", [
    step("Paso 1", "Usamos la aproximación normal con z=1,96.", "p̂±1,96√(p̂(1-p̂)/n)"),
    step("Paso 2", "Calculamos el error máximo.", "E=1,96√(0,4·0,6/100)≈0,096"),
    step("Paso 3", "Construimos el intervalo.", "[0,4-0,096; 0,4+0,096]=[0,304;0,496]"),
  ], { kind:"confidence-proportion", phat:.4,n:100,z:1.96 }),
];

export const PRACTICAL_GROUP_COUNTS = Object.freeze(
  PRACTICAL_VALIDATION_CASES.reduce((acc, item) => {
    acc[item.group] = (acc[item.group] || 0) + 1;
    return acc;
  }, {})
);

export function toPublicValidationCase(item) {
  return JSON.parse(JSON.stringify(item));
}
