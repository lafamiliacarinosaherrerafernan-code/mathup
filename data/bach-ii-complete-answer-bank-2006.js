(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });
  const copy = (value) => JSON.parse(JSON.stringify(value || []));
  const makePart = (label, paragraphs) => ({ label, paragraphs });
  const paragraph = (plain, html = plain) => ({ plain, html });
  const matesBlock = (block) => window.MATES_II_BLOCK_EXERCISES?.[block] || [];
  const insertAfter = (list, referenceId, exercise) => {
    if (!exercise || list.some((item) => item.id === exercise.id)) return;
    const index = list.findIndex((item) => item.id === referenceId);
    list.splice(index < 0 ? list.length : index + 1, 0, exercise);
  };

  // Cada convocatoria importada contenía las cuatro alternativas oficiales
  // dentro de una sola ficha. Se separan para que cada ejercicio tenga su
  // propio identificador e historial de variedad.
  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-9118a8157a8b");
    if (exercise) {
      const firstStatement = copy(exercise.statement);
      const embedded = copy(exercise.parts?.[0]?.paragraphs || []);
      exercise.statement = [paragraph("3º-A)")];
      exercise.parts = [
        makePart("a)", firstStatement),
        makePart("b)", embedded.slice(0, 1)),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: embedded.slice(1, 2),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-298681d1ae56");
    if (exercise && exercise.statement?.length >= 4) {
      const statements = copy(exercise.statement);
      exercise.statement = statements.slice(0, 3);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: statements.slice(3, 4),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-57bcbac15b29");
    if (exercise && exercise.statement?.length >= 4) {
      const statements = copy(exercise.statement);
      const areaParts = copy(exercise.parts);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: statements.slice(1, 2),
        parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: statements.slice(2, 3),
        parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: statements.slice(3, 4),
        parts: areaParts,
      });
    }
  }

  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-584486b3e7be");
    if (exercise && exercise.statement?.length >= 2) {
      const statements = copy(exercise.statement);
      const embedded = copy(exercise.parts?.[2]?.paragraphs || []);
      const functionParts = [
        copy(exercise.parts?.[0]),
        copy(exercise.parts?.[1]),
        makePart("c)", embedded.slice(0, 1)),
        makePart("d)", embedded.slice(1, 2)),
      ];
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-1b`,
        statement: statements.slice(1, 2),
        parts: functionParts,
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise),
        id: `${exercise.id}-2a`,
        statement: embedded.slice(2, 3),
        parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise),
        id: `${exercise.id}-2b`,
        statement: embedded.slice(3, 4),
        parts: [makePart("Resultado", [])],
      });
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-1701f2c389f8");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs || []);
      const optionBLast = copy(exercise.parts?.[2]);
      exercise.parts = [
        copy(exercise.parts?.[0]),
        makePart("b)", embedded.slice(0, 1)),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: [paragraph("4º-B)")],
        parts: [
          makePart("a)", embedded.slice(1, 2)),
          optionBLast,
        ],
      });
    }
  }

  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-1cf8ee1c5e7c");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs || []);
      const optionBLast = copy(exercise.parts?.[2]);
      exercise.parts = [
        copy(exercise.parts?.[0]),
        makePart("b)", embedded.slice(0, 1)),
      ];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: [paragraph("4º-B)")],
        parts: [
          makePart("a)", embedded.slice(1, 2)),
          optionBLast,
        ],
      });
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-9118a8157a8b": {
      "a)": answer(
        "X=A⁻¹−A",
        [
          "X=A−A⁻¹",
          "X=I₂−A",
          "X=A⁻¹+A",
        ],
        `Partimos de:
(X+A)²=X²+X·A+I₂.
Desarrollamos el cuadrado conservando el orden de los factores:
X²+X·A+A·X+A²=X²+X·A+I₂.
Restamos X²+X·A en ambos miembros:
A·X+A²=I₂.
Sacamos factor común A por la izquierda:
A·(X+A)=I₂.
Multiplicamos ambos miembros por A⁻¹ por la izquierda:
A⁻¹·A·(X+A)=A⁻¹·I₂.
Por tanto:
X+A=A⁻¹ ⇒ X=A⁻¹−A.`
      ),
      "b)": answer(
        "X=((−1,0),(0,−1))=−I₂",
        [
          "X=((1,0),(0,1))=I₂",
          "X=((0,1),(1,0))",
          "X=((−1,1),(1,0))",
        ],
        `La ecuación es:
B·X+B²=I₂.
Despejamos:
B·X=I₂−B².
Multiplicamos por B⁻¹ por la izquierda:
X=B⁻¹−B.
Para B=((1,1),(1,0)), calculamos:
det(B)=1·0−1·1=−1.
Mediante la fórmula de la inversa:
B⁻¹=(1/det(B))·Adj(Bᵀ)=((0,1),(1,−1)).
Entonces:
X=((0,1),(1,−1))−((1,1),(1,0))
=((−1,0),(0,−1))=−I₂.
Comprobación:
B·(−I₂)+B²=−B+B²=I₂.`
      ),
    },
    "mates2-algebra-9118a8157a8b-opcion-b": {
      "Resultado": answer(
        "k=2; x=1+t, y=3t/2, z=2−t/2",
        [
          "k=3; x=1+t, y=t, z=1−t",
          "k=2; x=1+t, y=2−t/2, z=3t/2",
          "k=0; x=1+t, y=−t, z=2+t",
        ],
        `El sistema es:
3x−ky=3,
y+3z=6,
x+kz=5.
Nos indican que x=1+t. Sustituimos en la primera y tercera ecuación:
3(1+t)−ky=3 ⇒ ky=3t,
1+t+kz=5 ⇒ kz=4−t.
Si k≠0:
y=3t/k, z=(4−t)/k.
Imponemos la segunda ecuación:
3t/k+3(4−t)/k=6
⇒ 12/k=6
⇒ k=2.
Así:
y=3t/2, z=(4−t)/2=2−t/2.
Para k=0, la primera y la tercera ecuación exigirían simultáneamente x=1 y x=5, por lo que el sistema sería incompatible.
Resultado:
k=2; x=1+t, y=3t/2, z=2−t/2.`
      ),
    },
    "mates2-algebra-298681d1ae56": {
      "Resultado": answer(
        "x=2",
        [
          "x=−2",
          "x=6",
          "x=3",
        ],
        `Llamamos D al determinante original, de modo que D=x.
En el primer determinante extraemos 3 de la primera fila y 5 de la tercera. Después extraemos 2 de la segunda y de la tercera columna:
D₁=3·5·2·2·|C₂,C₃,C₁|.
La permutación cíclica (C₁,C₂,C₃)→(C₂,C₃,C₁) no cambia el signo, por lo que:
D₁=60x.
En el segundo determinante sus columnas son C₁+2C₂, C₂−C₃ y 7C₃:
D₂=7·|C₁+2C₂,C₂−C₃,C₃|.
Por multilinealidad, todos los términos con dos columnas iguales se anulan y queda:
D₂=7·|C₁,C₂,C₃|=7x.
La igualdad dada se transforma en:
60x−7x=50x+6
⇒ 53x=50x+6
⇒ 3x=6
⇒ x=2.`
      ),
    },
    "mates2-algebra-298681d1ae56-opcion-b": {
      "Resultado": answer(
        "a≠−3,−4: SCD, solución trivial; a=−3 o −4: SCI. Para a=−4: (x,y,z)=(t,−2t,t)",
        [
          "Para todo a es SCD y la única solución es la trivial",
          "a=−3 o −4: incompatible; en los demás casos SCI",
          "a≠−4: incompatible; a=−4: (x,y,z)=(t,2t,t)",
        ],
        `Es un sistema homogéneo, por lo que nunca puede ser incompatible.
La matriz de coeficientes es:
A=((a,−3,−2),(−1,0,5+a),(2,3,4)).
Calculamos su determinante mediante Sarrus:
det(A)=−3(a+3)(a+4).
Si a≠−3 y a≠−4, det(A)≠0. Por tanto, rango(A)=3 y el sistema es compatible determinado, con solución:
(x,y,z)=(0,0,0).
Si a=−3 o a=−4, det(A)=0 y el rango es menor que 3. Al ser homogéneo, es compatible indeterminado.
Para a=−4 el sistema queda:
−4x−3y−2z=0,
−x+z=0,
2x+3y+4z=0.
De la segunda ecuación, z=x. Sustituimos en la tercera:
2x+3y+4x=0 ⇒ 6x+3y=0 ⇒ y=−2x.
Tomando x=t:
(x,y,z)=(t,−2t,t).`
      ),
    },
    "mates2-analisis-57bcbac15b29": {
      "Resultado": answer(
        "a=3, b=−6, c=0",
        [
          "a=−3, b=6, c=0",
          "a=3, b=0, c=−6",
          "a=6, b=−3, c=0",
        ],
        `La función es:
f(x)=x³+ax²+bx+c.
Como pasa por el origen:
f(0)=0 ⇒ c=0.
Calculamos la segunda derivada:
f′(x)=3x²+2ax+b,
f″(x)=6x+2a.
Como tiene un punto de inflexión en x=−1:
f″(−1)=0
⇒ −6+2a=0
⇒ a=3.
La pendiente de la tangente en x=1 es 3:
f′(1)=3.
Entonces:
3+2a+b=3.
Sustituimos a=3:
3+6+b=3
⇒ b=−6.
Por tanto:
a=3, b=−6, c=0.
Comprobación:
f(0)=0, f″(−1)=−6+6=0 y f′(1)=3+6−6=3.`
      ),
    },
    "mates2-analisis-57bcbac15b29-1b": {
      "Resultado": answer(
        "Ninguna de las dos funciones cumple todas las hipótesis del teorema de Rolle en [−2,2]",
        [
          "Las dos funciones cumplen las hipótesis de Rolle",
          "Solo 1/x⁴ cumple las hipótesis de Rolle",
          "Solo 2−|x| cumple las hipótesis de Rolle",
        ],
        `El teorema de Rolle exige:
1. continuidad en [−2,2];
2. derivabilidad en (−2,2);
3. igualdad de los valores en los extremos.
Para f(x)=1/x⁴, la función no está definida en x=0. Por tanto, no es continua en [−2,2].
Para g(x)=2−|x|, se cumple g(−2)=g(2)=0 y es continua en [−2,2], pero no es derivable en x=0 porque presenta un punto anguloso:
g′(0⁻)=1 y g′(0⁺)=−1.
Como las derivadas laterales no coinciden, tampoco satisface todas las hipótesis.
Conclusión: no puede aplicarse el teorema de Rolle a ninguna de las dos funciones en ese intervalo.`
      ),
    },
    "mates2-analisis-57bcbac15b29-2a": {
      "Resultado": answer(
        "ln|x−1|−3/(x−1)+C",
        [
          "ln|x−1|+3/(x−1)+C",
          "1/(x−1)−3ln|x−1|+C",
          "ln|x+1|−3/(x−1)+C",
        ],
        `Calculamos:
I=∫(x+2)/(x−1)² dx.
Escribimos el numerador en función de x−1:
x+2=(x−1)+3.
Entonces:
I=∫[(x−1)/(x−1)²+3/(x−1)²] dx
=∫[1/(x−1)+3/(x−1)²] dx.
Integramos término a término:
∫1/(x−1) dx=ln|x−1|,
∫3(x−1)⁻² dx=−3/(x−1).
Por tanto:
I=ln|x−1|−3/(x−1)+C.
Comprobación: al derivar el resultado se recupera (x+2)/(x−1)².`
      ),
    },
    "mates2-analisis-57bcbac15b29-2b": {
      "a)": answer(
        "Las curvas se cortan en x=−2 y x=1; en [−2,1], g(x)=1−x queda por encima de f(x)=x²−1",
        [
          "Se cortan en x=−1 y x=2; f queda por encima",
          "Se cortan solo en x=0",
          "Se cortan en x=−2 y x=1; f queda por encima",
        ],
        `Buscamos los puntos de corte:
x²−1=1−x
⇒ x²+x−2=0
⇒ (x+2)(x−1)=0.
Así:
x=−2 o x=1.
Las ordenadas son:
f(−2)=3 y f(1)=0.
Los puntos de corte son (−2,3) y (1,0).
Para saber qué función queda arriba tomamos, por ejemplo, x=0:
f(0)=−1, g(0)=1.
Por tanto, en [−2,1], la recta g(x)=1−x es la función superior y la parábola f(x)=x²−1 la inferior.
La representación debe sombrear exclusivamente la región comprendida entre ambas curvas desde x=−2 hasta x=1.`
      ),
      "b)": answer(
        "9/2 unidades cuadradas",
        [
          "3/2 unidades cuadradas",
          "9 unidades cuadradas",
          "27/2 unidades cuadradas",
        ],
        `De la gráfica y de los puntos de corte, el área es:
A=∫[−2,1] [(1−x)−(x²−1)] dx
=∫[−2,1] (2−x−x²) dx.
Una primitiva es:
F(x)=2x−x²/2−x³/3.
Aplicamos la regla de Barrow:
A=[2x−x²/2−x³/3] de −2 a 1
=(2−1/2−1/3)−(−4−2+8/3)
=7/6−(−10/3)
=7/6+20/6
=27/6
=9/2.
Resultado: A=9/2 unidades cuadradas.`
      ),
    },
    "mates2-analisis-584486b3e7be": {
      "Resultado": answer(
        "k=−5/2 o k=5/2",
        [
          "k=−5 o k=5",
          "k=−1/4 o k=1/4",
          "k=−2/5 o k=2/5",
        ],
        `Para que la función sea continua en x=0 deben coincidir el límite por la izquierda, el límite por la derecha y f(0).
Por la izquierda:
lim[x→0⁻] (x+1−eˣ)/(2x+1−e²ˣ).
Al sustituir aparece 0/0, por lo que aplicamos la regla de L’Hôpital:
lim[x→0⁻] (1−eˣ)/(2−2e²ˣ).
Vuelve a aparecer 0/0 y aplicamos L’Hôpital otra vez:
lim[x→0⁻] (−eˣ)/(−4e²ˣ)=1/4.
Para x≥0:
f(x)=(2x−k)²−6.
Por tanto:
lim[x→0⁺]f(x)=f(0)=k²−6.
Imponemos la continuidad:
k²−6=1/4
⇒ k²=25/4
⇒ k=±5/2.
Por tanto:
k=−5/2 o k=5/2.`
      ),
    },
    "mates2-analisis-584486b3e7be-1b": {
      "a)": answer(
        "El dominio es ℝ y la función es continua en todo ℝ",
        [
          "El dominio es ℝ\\{0}",
          "El dominio es (0,+∞)",
          "El dominio es [0,+∞)",
        ],
        `La función está formada por productos y composiciones de polinomios y la función exponencial.
Tanto eˣ como e⁻ˣ están definidas y son continuas para todo número real.
Por ello no aparece ningún denominador que pueda anularse ni ninguna raíz de índice par que imponga restricciones.
Resultado:
Dom(f)=ℝ y f es continua en todo ℝ.`
      ),
      "b)": answer(
        "Los cortes con los ejes son (−2,0) y (0,2)",
        [
          "Los cortes son (2,0) y (0,−2)",
          "Solo corta en (0,0)",
          "Los cortes son (−3,0) y (0,1)",
        ],
        `Para cortar el eje OX imponemos f(x)=0. Al resolver la ecuación se obtiene:
x=−2.
Por tanto, el corte con OX es:
(−2,0).
Para cortar el eje OY tomamos x=0:
f(0)=2.
El corte con OY es:
(0,2).
Resultado: (−2,0) y (0,2).`
      ),
      "c)": answer(
        "Tiene un mínimo relativo en (−3,−e⁻³) y no tiene máximo relativo",
        [
          "Tiene un máximo en (−3,−e⁻³) y no tiene mínimo",
          "Tiene un mínimo en (3,e³)",
          "No tiene extremos relativos",
        ],
        `Derivamos la función y resolvemos:
f′(x)=0 ⇒ x=−3.
Marcamos x=−3 en la recta real y estudiamos el signo de f′ con un valor de cada intervalo:
en (−∞,−3), f′(x)<0, por lo que f decrece;
en (−3,+∞), f′(x)>0, por lo que f crece.
El signo cambia de negativo a positivo, así que en x=−3 hay un mínimo relativo.
Calculamos la ordenada:
f(−3)=−e⁻³.
Resultado: mínimo relativo en (−3,−e⁻³). No existe máximo relativo.`
      ),
      "d)": answer(
        "Tiene un punto de inflexión en (−4,−2e⁻⁴)",
        [
          "Tiene un punto de inflexión en (4,2e⁴)",
          "Tiene un punto de inflexión en (−3,−e⁻³)",
          "No tiene puntos de inflexión",
        ],
        `Calculamos la segunda derivada y resolvemos:
f″(x)=0 ⇒ x=−4.
Marcamos x=−4 en la recta real y sustituimos un valor de cada intervalo en f″:
en (−∞,−4), f″ tiene un signo;
en (−4,+∞), f″ tiene el signo contrario.
Como la segunda derivada cambia de signo, cambia la curvatura y existe un punto de inflexión.
Calculamos la ordenada:
f(−4)=−2e⁻⁴.
Resultado: punto de inflexión en (−4,−2e⁻⁴).`
      ),
    },
    "mates2-analisis-584486b3e7be-2a": {
      "Resultado": answer(
        "x²/2−2ln(x²+4)+(1/2)arctan(x/2)+C",
        [
          "x²/2+2ln(x²+4)+(1/2)arctan(x/2)+C",
          "x²−2ln|x+4|+arctan(x)+C",
          "x²/2−ln(x²+4)−(1/2)arctan(x/2)+C",
        ],
        `Separamos la función racional mediante división y descomposición:
el integrando queda expresado como una suma de términos elementales.
Integramos término a término:
∫x dx=x²/2,
∫[−4x/(x²+4)] dx=−2ln(x²+4),
∫[1/(x²+4)] dx=(1/2)arctan(x/2).
Por tanto:
I=x²/2−2ln(x²+4)+(1/2)arctan(x/2)+C.
Comprobación: derivando el resultado y reuniendo los términos sobre el denominador común se recupera el integrando original.`
      ),
    },
    "mates2-analisis-584486b3e7be-2b": {
      "Resultado": answer(
        "32/3 unidades cuadradas",
        [
          "16/3 unidades cuadradas",
          "32 unidades cuadradas",
          "64/3 unidades cuadradas",
        ],
        `Buscamos los puntos de corte:
x²−3=2x
⇒ x²−2x−3=0
⇒ (x+1)(x−3)=0.
Así, los límites de integración son x=−1 y x=3.
En ese intervalo, por ejemplo en x=0:
2x=0 y x²−3=−3,
por lo que la recta y=2x queda por encima de la parábola y=x²−3.
La gráfica debe representar ambas funciones y sombrear únicamente la región comprendida entre ellas desde x=−1 hasta x=3.
El área es:
A=∫[−1,3] [2x−(x²−3)] dx
=∫[−1,3] (−x²+2x+3) dx.
Una primitiva es:
F(x)=−x³/3+x²+3x.
Aplicamos la regla de Barrow:
A=[−x³/3+x²+3x] de −1 a 3
=9−(−5/3)
=27/3+5/3
=32/3.
Resultado: 32/3 unidades cuadradas.`
      ),
    },
    "mates2-geometria-1701f2c389f8": {
      "a)": answer(
        "26/3 unidades cúbicas",
        [
          "13/3 unidades cúbicas",
          "26 unidades cúbicas",
          "52/3 unidades cúbicas",
        ],
        `Hallamos primero los tres puntos de corte con el plano α:x+y+z=10.
En r₁ se cumple x=y=1:
A=(1,1,8).
En r₂ se cumple y=z=2:
B=(6,2,2).
En r₃ se cumple x=z=3:
C=(3,4,3).
El cuarto vértice es D=(1,2,3).
Construimos los vectores:
AB=(5,1,−6),
AC=(2,3,−5),
AD=(0,1,−5).
El volumen del tetraedro es la sexta parte del valor absoluto del producto mixto:
V=(1/6)|det(AB,AC,AD)|.
Calculamos el determinante y obtenemos:
det(AB,AC,AD)=−52.
Por tanto:
V=|−52|/6=52/6=26/3.
Resultado: 26/3 unidades cúbicas.`
      ),
      "b)": answer(
        "4√3/3 unidades",
        [
          "4/3 unidades",
          "4√3 unidades",
          "2√3/3 unidades",
        ],
        `La cara opuesta al vértice D=(1,2,3) está contenida en el plano:
α:x+y+z−10=0.
La altura del tetraedro respecto de esa cara es la distancia de D al plano.
Aplicamos la fórmula, escrita como fracción:
d(D,α)=|1+2+3−10|/√(1²+1²+1²)
=4/√3.
Racionalizamos:
d(D,α)=4√3/3.
Resultado: la altura mide 4√3/3 unidades.`
      ),
    },
    "mates2-geometria-1701f2c389f8-opcion-b": {
      "a)": answer(
        "R=(3,−1,−1)",
        [
          "R=(1,0,−1)",
          "R=(3,1,−1)",
          "R=(−1,2,1)",
        ],
        `La recta está dada por:
r: x=1+2t, y=−t, z=−1.
Un punto genérico de r es:
R(t)=(1+2t,−t,−1).
Imponemos que R equidiste de P=(−1,2,1) y Q=(0,3,1):
|RP|²=|RQ|².
Sustituimos las coordenadas, desarrollamos y simplificamos. La ecuación resultante es:
t=1.
Entonces:
R=(1+2·1,−1,−1)=(3,−1,−1).
Comprobación: al calcular las dos distancias se obtiene el mismo valor.`
      ),
      "b)": answer(
        "x+y−2=0",
        [
          "x−y+2=0",
          "x+y+2=0",
          "x+y+z−3=0",
        ],
        `El plano mediador de P y Q es perpendicular al segmento PQ y pasa por su punto medio.
Calculamos:
PQ=Q−P=(1,1,0).
Este vector es normal al plano buscado.
El punto medio es:
M=(P+Q)/2=(−1/2,5/2,1).
Usamos la ecuación punto-normal:
(1,1,0)·[(x,y,z)−(−1/2,5/2,1)]=0.
Desarrollamos:
x+1/2+y−5/2=0
⇒ x+y−2=0.
Resultado: x+y−2=0.`
      ),
    },
    "mates2-geometria-1cf8ee1c5e7c": {
      "a)": answer(
        "Las rectas se cruzan: no son paralelas y no se cortan",
        [
          "Las rectas son paralelas distintas",
          "Las rectas son coincidentes",
          "Las rectas se cortan en (1,3,6)",
        ],
        `Escribimos las rectas en forma paramétrica.
Para r:
r:(x,y,z)=(3,5,6)+t(1,1,1).
Para s, de x=1 y −2y+z=2:
s:(x,y,z)=(1,0,2)+u(0,1,2).
Sus vectores directores son:
vᵣ=(1,1,1), vₛ=(0,1,2).
No son proporcionales, luego las rectas no son paralelas.
Para estudiar si se cortan igualamos sus coordenadas:
3+t=1,
5+t=u,
6+t=2+2u.
De la primera, t=−2. De la segunda, u=3. Al sustituir en la tercera:
4≠8.
Por tanto, no tienen ningún punto común.
Conclusión: las rectas se cruzan.`
      ),
      "b)": answer(
        "x−2y+z−3=0",
        [
          "x+2y−z−3=0",
          "x−2y+z+3=0",
          "2x−y+z−4=0",
        ],
        `El plano debe contener la recta s y ser paralelo a r.
Tomamos:
vₛ=(0,1,2), vᵣ=(1,1,1).
Un vector normal al plano es el producto vectorial:
n=vₛ×vᵣ=(−1,2,−1),
que podemos sustituir por el proporcional:
n=(1,−2,1).
El plano pasa por un punto de s, por ejemplo S=(1,0,2).
Aplicamos la ecuación punto-normal:
(1,−2,1)·[(x,y,z)−(1,0,2)]=0.
Desarrollamos:
x−1−2y+z−2=0
⇒ x−2y+z−3=0.
Resultado: x−2y+z−3=0.`
      ),
    },
    "mates2-geometria-1cf8ee1c5e7c-opcion-b": {
      "a)": answer(
        "x=2+t, y=−1+2t, z=3−3t",
        [
          "x=2+2t, y=−1−t, z=3",
          "x=3+t, y=1+2t, z=−3t",
          "x=2−t, y=−1+2t, z=3+3t",
        ],
        `La recta dada es:
r:(x,y,z)=(−1,3,0)+λ(2,−1,0).
Buscamos el pie H de la perpendicular trazada desde P=(2,−1,3).
Un punto genérico de r es:
H(λ)=(−1+2λ,3−λ,0).
El vector PH debe ser perpendicular al vector director (2,−1,0):
[H(λ)−P]·(2,−1,0)=0.
Al sustituir y resolver se obtiene:
λ=2.
Por tanto:
H=(3,1,0).
Un vector director de la perpendicular es:
PH=H−P=(1,2,−3).
La recta pedida, en forma paramétrica, es:
x=2+t,
y=−1+2t,
z=3−3t.`
      ),
      "b)": answer(
        "P′=(4,3,−3)",
        [
          "P′=(3,1,0)",
          "P′=(4,−3,3)",
          "P′=(−4,3,−3)",
        ],
        `El punto H=(3,1,0) es el punto medio del segmento que une P con su simétrico P′.
Por tanto:
H=(P+P′)/2
⇒ P′=2H−P.
Calculamos coordenada a coordenada:
x′=2·3−2=4,
y′=2·1−(−1)=3,
z′=2·0−3=−3.
Así:
P′=(4,3,−3).
Comprobación: H es el punto medio de PP′ y el segmento PP′ es perpendicular a r.`
      ),
    },
  });
})();
