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

  // Las alternativas A/B de cada convocatoria llegaron agrupadas. Se
  // separan en unidades independientes para el historial de no repetición.
  {
    const list = matesBlock("algebra");
    const exercise = list.find((item) => item.id === "mates2-algebra-61670efb9b14");
    if (exercise) {
      const embedded = copy(exercise.parts?.[1]?.paragraphs || []);
      exercise.parts = [copy(exercise.parts?.[0]), makePart("b)", embedded.slice(0, 1))];
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
    const exercise = list.find((item) => item.id === "mates2-algebra-dd819abff1b8");
    if (exercise) {
      const embedded = copy(exercise.parts?.[0]?.paragraphs || []);
      exercise.parts = [makePart("a)", []), makePart("b)", embedded.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise),
        id: `${exercise.id}-opcion-b`,
        statement: embedded.slice(1, 2),
        parts: [makePart("Resultado", [])],
      });
    }
  }
  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-0ecffbb7d637");
    if (exercise) {
      const statements = copy(exercise.statement || []);
      const last = copy(exercise.parts?.[0]);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise), id: `${exercise.id}-1b`,
        statement: statements.slice(1, 2), parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise), id: `${exercise.id}-2a`,
        statement: statements.slice(2, 4), parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise), id: `${exercise.id}-2b`,
        statement: statements.slice(4, 5), parts: [makePart("a)", []), last],
      });
    }
  }
  {
    const list = matesBlock("analisis");
    const exercise = list.find((item) => item.id === "mates2-analisis-d37150a012da");
    if (exercise) {
      const statements = copy(exercise.statement || []);
      const embedded = copy(exercise.parts?.[0]?.paragraphs || []);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise), id: `${exercise.id}-1b`,
        statement: statements.slice(1, 2), parts: [makePart("Resultado", [])],
      });
      insertAfter(list, `${exercise.id}-1b`, {
        ...copy(exercise), id: `${exercise.id}-2a`,
        statement: statements.slice(2, 3),
        parts: [makePart("a)", []), makePart("b)", embedded.slice(0, 1))],
      });
      insertAfter(list, `${exercise.id}-2a`, {
        ...copy(exercise), id: `${exercise.id}-2b`,
        statement: embedded.slice(1, 2), parts: [makePart("Resultado", [])],
      });
    }
  }
  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-95cd1a6005ce");
    if (exercise) {
      const embedded = copy(exercise.parts?.[0]?.paragraphs || []);
      exercise.parts = [makePart("a)", []), makePart("b)", embedded.slice(0, 1))];
      insertAfter(list, exercise.id, {
        ...copy(exercise), id: `${exercise.id}-opcion-b`,
        statement: embedded.slice(1, 2), parts: [makePart("Resultado", [])],
      });
    }
  }
  {
    const list = matesBlock("geometria");
    const exercise = list.find((item) => item.id === "mates2-geometria-5db82609aec0");
    if (exercise) {
      const statements = copy(exercise.statement || []);
      const parts = copy(exercise.parts || []);
      exercise.statement = statements.slice(0, 1);
      exercise.parts = [makePart("Resultado", [])];
      insertAfter(list, exercise.id, {
        ...copy(exercise), id: `${exercise.id}-opcion-b`,
        statement: statements.slice(1, 2), parts,
      });
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-61670efb9b14": {
      "a)": answer(
        "a≠0: SCD; a=0: SCI",
        ["a≠0: SCI; a=0: SCD", "a=0: incompatible", "Para todo a es SCD"],
        `La matriz de coeficientes es:
A=((1,2,1),(1,1,−a),(2,3,1)).
Calculamos su determinante:
det(A)=−a.
Si a≠0, det(A)≠0, luego rango(A)=3 y el sistema es compatible determinado.
Si a=0, la tercera fila es la suma de las dos primeras y el sistema es homogéneo. Se cumple:
rango(A)=rango(A*)=2<3.
Por tanto, para a=0 es compatible indeterminado.
Resultado:
a≠0: SCD; a=0: SCI.`
      ),
      "b)": answer(
        "(x,y,z)=(−a−1,a+1,−1)",
        ["(a+1,−a−1,1)", "(−a,a,−1)", "(a−1,a+1,1)"],
        `Suponemos a≠0. Restamos la primera ecuación de la tercera:
x+y=0 ⇒ x=−y.
Sustituimos en la primera:
−y+2y+z=a
⇒ y+z=a.
En la segunda:
−y+y−az=a
⇒ −az=a.
Como a≠0:
z=−1.
Entonces:
y=a+1,
x=−a−1.
Resultado:
(x,y,z)=(−a−1,a+1,−1).`
      ),
    },
    "mates2-algebra-61670efb9b14-opcion-b": {
      "Resultado": answer(
        "det(B)=36n y det(C)=−n",
        ["det(B)=−36n y det(C)=n", "det(B)=6n y det(C)=−n", "det(B)=36n y det(C)=n"],
        `Partimos de det(A)=n.
Para obtener B se hace una permutación cíclica de las filas, que conserva el signo, se extraen los factores 2,1,3 de sus filas y los factores 3,2,1 de sus columnas.
Por tanto:
det(B)=(2·1·3)(3·2·1)n=36n.
Para C se intercambian las dos primeras filas, lo que cambia el signo. Después se suman columnas a otras columnas, operación que no altera el determinante.
Así:
det(C)=−n.
Resultado: det(B)=36n y det(C)=−n.`
      ),
    },
    "mates2-algebra-dd819abff1b8": {
      "a)": answer(
        "m≠7: SCD; m=7: incompatible",
        ["m≠7: SCI; m=7: SCD", "m=7: SCI", "Para todo m es SCD"],
        `La matriz de coeficientes es:
A=((2,−3,0),(1,−1,1),(1,2,m)).
Calculamos:
det(A)=m−7.
Si m≠7, det(A)≠0 y el sistema es compatible determinado.
Si m=7, de las dos primeras ecuaciones se obtiene:
x=3y/2, z=−y/2.
Al sustituir en la tercera, el primer miembro vale 0, mientras que el segundo es 7:
0=7.
Es una contradicción, luego el sistema es incompatible.
Resultado:
m≠7: SCD; m=7: incompatible.`
      ),
      "b)": answer(
        "Para m≠7: x=3m/(7−m), y=2m/(7−m), z=−m/(7−m)",
        [
          "Para m≠7: x=3m/(m−7), y=2m/(m−7), z=m/(m−7)",
          "Para m=7: x=3t, y=2t, z=−t",
          "Para todo m: x=y=z=0",
        ],
        `En los casos compatibles, m≠7.
De 2x−3y=0:
x=3y/2.
De x−y+z=0:
z=y−x=−y/2.
Sustituimos en la tercera:
3y/2+2y−my/2=m
⇒ (7−m)y/2=m.
Como m≠7:
y=2m/(7−m).
Entonces:
x=3m/(7−m),
z=−m/(7−m).
Resultado:
x=3m/(7−m), y=2m/(7−m), z=−m/(7−m).`
      ),
    },
    "mates2-algebra-dd819abff1b8-opcion-b": {
      "Resultado": answer(
        "m≠−1 y m≠1",
        ["m=−1 o m=1", "m≠0", "Para todo m∈ℝ"],
        `Multiplicamos:
A·B=((1+2m,2+2m),(1−m,0)).
Para que A·B tenga inversa, su determinante debe ser distinto de cero:
det(A·B)=−(2+2m)(1−m)
=2(m²−1)
=2(m−1)(m+1).
Por tanto:
det(A·B)≠0 ⇔ m≠−1 y m≠1.
Resultado: m∈ℝ\\{−1,1}.`
      ),
    },
    "mates2-analisis-0ecffbb7d637": {
      "Resultado": answer(
        "Discontinua en x=−1 y continua en x=2",
        [
          "Continua en x=−1 y discontinua en x=2",
          "Continua en x=−1 y en x=2",
          "Discontinua en x=−1 y en x=2",
        ],
        `La función es continua dentro de cada uno de sus tres tramos. Solo debemos estudiar los puntos de unión x=−1 y x=2.

Continuidad en x=−1:
lim(x→−1⁻) f(x)=lim(x→−1⁻) x=−1,
f(−1)=−1,
lim(x→−1⁺) f(x)=lim(x→−1⁺)(1−x²)=0.
Como los límites laterales no coinciden, la función es discontinua en x=−1.

Continuidad en x=2:
lim(x→2⁻) f(x)=lim(x→2⁻)(1−x²)=−3,
f(2)=1−2²=−3,
lim(x→2⁺) f(x)=−3.
Los dos límites laterales y el valor de la función coinciden. Por tanto, la función es continua en x=2.

Para dibujarla:
• y=x para x≤−1, con punto cerrado en (−1,−1).
• y=1−x² para −1<x≤2, con punto abierto en (−1,0) y cerrado en (2,−3).
• y=−3 para x>2.

Resultado: discontinua en x=−1 y continua en x=2.`
      ),
    },
    "mates2-analisis-0ecffbb7d637-1b": {
      "Resultado": answer(
        "f(x)=x⁴+x²+x",
        [
          "f(x)=x⁴+x²",
          "f(x)=4x³+2x+1",
          "f(x)=x⁴+2x²+x",
        ],
        `Partimos de:
f'''(x)=24x.

Integramos por primera vez:
f''(x)=12x²+C₁.
Como f''(0)=2:
2=C₁.
Luego:
f''(x)=12x²+2.

Integramos de nuevo:
f'(x)=4x³+2x+C₂.
Como f'(0)=1:
1=C₂.
Por tanto:
f'(x)=4x³+2x+1.

Integramos una tercera vez:
f(x)=x⁴+x²+x+C₃.
Como f(0)=0:
C₃=0.

Resultado: f(x)=x⁴+x²+x.`
      ),
    },
    "mates2-analisis-0ecffbb7d637-2a": {
      "Resultado": answer(
        "Base: 8+4√10 cm; altura: 5+(5√10)/2 cm",
        [
          "Base: 4√10 cm; altura: (5√10)/2 cm",
          "Base: 18 cm; altura: 10 cm",
          "Base: 8+2√10 cm; altura: 5+5√10 cm",
        ],
        `Llamamos x a la base de la zona impresa e y a su altura. Como el área impresa es 100 cm²:
xy=100
⇒ y=100/x, con x>0.

Los márgenes aumentan la base total en 8 cm y la altura total en 5 cm. El área del póster es:
S(x)=(x+8)(y+5)
=(x+8)(100/x+5)
=140+5x+800/x.

Derivamos:
S'(x)=5−800/x².

Buscamos los puntos críticos:
5−800/x²=0
⇒ 5x²=800
⇒ x²=160
⇒ x=4√10,
porque x debe ser positivo.

Comprobamos el mínimo:
S''(x)=1600/x³>0 para x>0.
Por tanto, x=4√10 proporciona un mínimo.

Calculamos la altura impresa:
y=100/(4√10)
=25/√10
=(5√10)/2.

Añadimos los márgenes:
base total=8+4√10 cm,
altura total=5+(5√10)/2 cm.

Resultado: las dimensiones del póster de área mínima son (8+4√10) cm por (5+(5√10)/2) cm.`
      ),
    },
    "mates2-analisis-0ecffbb7d637-2b": {
      "a)": answer(
        "Si aparece 0/0 o ∞/∞, el límite del cociente puede calcularse con el límite de las derivadas",
        [
          "La regla solo se aplica a productos de funciones",
          "La regla afirma que siempre puede sustituirse directamente",
          "La regla solo se aplica cuando el límite inicial es finito y no nulo",
        ],
        `Regla de L'Hôpital:
Sean f y g derivables en un entorno de a, salvo quizá en a, y supongamos que g'(x)≠0 en dicho entorno.
Si al calcular:
lim(x→a) f(x)/g(x)
aparece una indeterminación 0/0 o ∞/∞ y existe el límite:
lim(x→a) f'(x)/g'(x),
entonces:
lim(x→a) f(x)/g(x)=lim(x→a) f'(x)/g'(x).

Si después de derivar vuelve a aparecer una de esas indeterminaciones, la regla puede aplicarse otra vez, siempre que se sigan cumpliendo sus condiciones.`
      ),
      "b)": answer(
        "1/3",
        ["0", "1/2", "1"],
        `Calculamos:
L=lim(x→0) (x−sen x)/(tg x−sen x).

Al sustituir x=0:
(0−sen 0)/(tg 0−sen 0)=0/0.
Aplicamos L'Hôpital.

Recordamos que:
(tg x)'=1+tg²x.

Primera aplicación:
L=lim(x→0) (1−cos x)/(1+tg²x−cos x).
Al sustituir x=0 vuelve a aparecer 0/0.

Derivamos de nuevo. En el denominador:
(1+tg²x−cos x)'
=2·tg x·(1+tg²x)+sen x.
Por tanto:
L=lim(x→0) sen x/[2·tg x·(1+tg²x)+sen x].
Al sustituir x=0 obtenemos de nuevo 0/0.

Antes de volver a derivar, desarrollamos:
2·tg x·(1+tg²x)+sen x
=2·tg x+2·tg³x+sen x.

Aplicamos L'Hôpital por tercera vez:
L=lim(x→0) cos x/[2(1+tg²x)+6tg²x(1+tg²x)+cos x].

Sustituimos x=0:
L=1/(2+0+1)=1/3.

Resultado: el límite vale 1/3.`
      ),
    },
    "mates2-analisis-d37150a012da": {
      "Resultado": answer(
        "Base 10×10 y altura 5",
        [
          "Base 5×5 y altura 10",
          "Base 15×15 y altura 0",
          "Base 8×8 y altura 7",
        ],
        `Sea x el lado de la base cuadrada y h la altura de la caja.
El perímetro de una cara lateral es 30:
2x+2h=30
⇒ x+h=15
⇒ h=15−x.

El volumen es:
V(x)=x²h
=x²(15−x)
=15x²−x³,
con 0<x<15.

Derivamos:
V'(x)=30x−3x²
=3x(10−x).

El punto crítico interior es x=10.
Estudiamos el signo de V':
• Si 0<x<10, por ejemplo x=5, V'(5)>0: el volumen crece.
• Si 10<x<15, por ejemplo x=12, V'(12)<0: el volumen decrece.

En la recta real, el signo cambia de + a − al pasar por x=10; por tanto, allí hay un máximo.

La altura es:
h=15−10=5.

Resultado: la caja de volumen máximo tiene base cuadrada de 10×10 y altura 5.`
      ),
    },
    "mates2-analisis-d37150a012da-1b": {
      "Resultado": answer(
        "Máximo en (e,1/e) e inflexión en (e^(3/2),3/(2e^(3/2)))",
        [
          "Mínimo en (e,1/e) y no tiene inflexión",
          "Máximo en (1,0) e inflexión en (e,1/e)",
          "Es creciente y convexa en todo (0,∞)",
        ],
        `La función es:
f(x)=ln x/x, con dominio (0,∞).

Primera derivada:
f'(x)=(1−ln x)/x².
Como x²>0, el signo depende de 1−ln x.
Se anula cuando:
1−ln x=0
⇒ x=e.

Recta de signos de f':
• En (0,e), tomamos x=1: f'(1)>0, luego f crece.
• En (e,∞), tomamos x=e²: f'(e²)<0, luego f decrece.

El signo cambia de + a − en x=e, así que existe un máximo relativo:
f(e)=1/e.
Máximo: (e,1/e).

Segunda derivada:
f''(x)=(2ln x−3)/x³.
Como x³>0, se anula cuando:
2ln x−3=0
⇒ ln x=3/2
⇒ x=e^(3/2).

Recta de signos de f'':
• En (0,e^(3/2)), por ejemplo x=1, f''(1)<0: la gráfica es cóncava hacia abajo.
• En (e^(3/2),∞), por ejemplo x=e², f''(e²)>0: la gráfica es convexa o cóncava hacia arriba.

Hay cambio de curvatura, por lo que existe un punto de inflexión. Su ordenada es:
f(e^(3/2))=(3/2)/e^(3/2)
=3/(2e^(3/2)).

Resultado: máximo en (e,1/e) y punto de inflexión en (e^(3/2),3/(2e^(3/2))).`
      ),
    },
    "mates2-analisis-d37150a012da-2a": {
      "a)": answer(
        "b=−5, c=8, d=−1",
        [
          "b=5, c=−8, d=−1",
          "b=−5, c=8, d=1",
          "b=−11/2, c=8, d=1/2",
        ],
        `La función es:
f(x)=x³+bx²+cx+d.

Como corta al eje OY en P(0,−1):
f(0)=−1
⇒ d=−1.

Como pasa por Q(2,3):
f(2)=3
⇒ 8+4b+2c+d=3.
Sustituyendo d=−1:
4b+2c=−4
⇒ 2b+c=−2.

La tangente en Q es horizontal, así que f'(2)=0.
Derivamos:
f'(x)=3x²+2bx+c.
Entonces:
f'(2)=12+4b+c=0
⇒ 4b+c=−12.

Reunimos las ecuaciones:
{ 2b+c=−2
{ 4b+c=−12

Restamos la primera a la segunda:
2b=−10
⇒ b=−5.

Sustituimos:
2(−5)+c=−2
⇒ c=8.

Resultado: b=−5, c=8 y d=−1.`
      ),
      "b)": answer(
        "Máximo en (4/3,85/27) y mínimo en (2,3)",
        [
          "Mínimo en (4/3,85/27) y máximo en (2,3)",
          "Máximo en (1,3) y mínimo en (2,−1)",
          "No tiene extremos relativos",
        ],
        `Con los valores obtenidos:
f(x)=x³−5x²+8x−1.

Derivamos:
f'(x)=3x²−10x+8
=(3x−4)(x−2).

Los puntos críticos son:
x=4/3 y x=2.

Estudiamos el signo de f' en la recta real:
• En (−∞,4/3), tomamos x=0: f'(0)=8>0, luego f crece.
• En (4/3,2), tomamos x=3/2: f'(3/2)<0, luego f decrece.
• En (2,∞), tomamos x=3: f'(3)=5>0, luego f crece.

En x=4/3 el signo cambia de + a −: hay un máximo.
En x=2 cambia de − a +: hay un mínimo.

Calculamos las ordenadas:
f(4/3)=64/27−80/9+32/3−1
=85/27.

f(2)=8−20+16−1=3.

Resultado: máximo relativo en (4/3,85/27) y mínimo relativo en (2,3).`
      ),
    },
    "mates2-analisis-d37150a012da-2b": {
      "Resultado": answer(
        "ln x−2/√x+C",
        [
          "ln x+2√x+C",
          "−1/x−2/√x+C",
          "ln x+2/√x+C",
        ],
        `La integral es:
∫(x+√x)/x² dx.

Separamos la fracción:
(x+√x)/x²
=x/x²+√x/x²
=x⁻¹+x^(−3/2).

Integramos término a término:
∫x⁻¹ dx=ln x,

∫x^(−3/2) dx
=x^(−1/2)/(−1/2)
=−2x^(−1/2)
=−2/√x.

Por tanto:
∫(x+√x)/x² dx
=ln x−2/√x+C,
con x>0.

Resultado: ln x−2/√x+C.`
      ),
    },
    "mates2-geometria-95cd1a6005ce": {
      "a)": answer(
        "π: 3x+4y+10z−22=0",
        [
          "π: 2x+y−z−2=0",
          "π: 3x−4y+10z+22=0",
          "π: x+y+z−4=0",
        ],
        `La recta r pasa por:
R₀=(0,3,1)
y tiene vector director:
v⃗=(2,1,−1).

El plano también debe contener el punto P=(2,−1,2). Construimos otro vector del plano:
R₀P⃗=P−R₀
=(2,−4,1).

Un vector normal del plano es el producto vectorial:
n⃗=v⃗×R₀P⃗
=(2,1,−1)×(2,−4,1)
=(−3,−4,−10).
Podemos tomar el proporcional:
n⃗=(3,4,10).

Usamos el punto R₀=(0,3,1):
3(x−0)+4(y−3)+10(z−1)=0.

Desarrollamos:
3x+4y−12+10z−10=0
⇒ 3x+4y+10z−22=0.

Resultado: π: 3x+4y+10z−22=0.`
      ),
      "b)": answer(
        "18/(5√5)=18√5/25",
        [
          "18/5",
          "22/(5√5)",
          "2√5",
        ],
        `El plano obtenido es:
π: 3x+4y+10z−22=0.

Aplicamos la fórmula de la distancia del punto Q=(0,1,0) a un plano:

d(Q,π)=|3·0+4·1+10·0−22|/√(3²+4²+10²).

Calculamos:
numerador=|4−22|=18,
denominador=√(9+16+100)=√125=5√5.

Por tanto:
d(Q,π)=18/(5√5)
=18√5/25.

Resultado: d(Q,π)=18/(5√5)=18√5/25.`
      ),
    },
    "mates2-geometria-95cd1a6005ce-opcion-b": {
      "Resultado": answer(
        "Área=√230/2; alturas √230/√34, √230/√11 y √230/√21",
        [
          "Área=√230; las tres alturas valen √230",
          "Área=15/2; alturas √34, √11 y √21",
          "Área=√115/2; alturas √115/√34, √115/√11 y √115/√21",
        ],
        `Tomamos:
A=(1,1,1), B=(0,3,5), C=(4,0,2).

Construimos dos vectores:
AB⃗=B−A=(−1,2,4),
AC⃗=C−A=(3,−1,1).

Calculamos el producto vectorial:
AB⃗×AC⃗
=(−1,2,4)×(3,−1,1)
=(6,13,−5).

Su módulo es:
|AB⃗×AC⃗|=√(6²+13²+(−5)²)
=√230.

El área del triángulo es la mitad:
Área=√230/2.

Calculamos las longitudes de los lados:
|BC⃗|=|(4,−3,−3)|=√34,
|AC⃗|=√11,
|AB⃗|=√21.

Como Área=(base·altura)/2, la altura correspondiente a una base de longitud L es:
h=2·Área/L=√230/L.

Por tanto:
altura desde A sobre BC: hₐ=√230/√34,
altura desde B sobre AC: h_b=√230/√11,
altura desde C sobre AB: h_c=√230/√21.

Resultado: área √230/2 y alturas √230/√34, √230/√11 y √230/√21.`
      ),
    },
    "mates2-geometria-5db82609aec0": {
      "Resultado": answer(
        "t: x=−27/2+λ, y=−7/2+λ, z=−11−λ",
        [
          "t: x=−27/2+3λ, y=−7/2+λ, z=−11+2λ",
          "t: x=3λ, y=1+λ, z=−2+2λ",
          "t: x=−27/2+λ, y=−7/2−λ, z=−11+λ",
        ],
        `Escribimos la recta s en forma paramétrica:
x=3μ,
y=1+μ,
z=−2+2μ.

Buscamos su punto de corte con el plano:
π: x+y−z+6=0.

Sustituimos:
3μ+(1+μ)−(−2+2μ)+6=0
⇒ 2μ+9=0
⇒ μ=−9/2.

El punto de intersección es:
P=(3(−9/2),1−9/2,−2+2(−9/2))
=(−27/2,−7/2,−11).

La recta r es la intersección de los planos:
x−y=0,
4x−3y+z=−4.

Sus vectores normales son:
n⃗₁=(1,−1,0),
n⃗₂=(4,−3,1).

Un vector director de r es:
v⃗=n⃗₁×n⃗₂=(−1,−1,1).
Tomamos el proporcional:
v⃗=(1,1,−1).

La recta pedida pasa por P y es paralela a r:
t:
x=−27/2+λ,
y=−7/2+λ,
z=−11−λ.

Resultado: t: x=−27/2+λ, y=−7/2+λ, z=−11−λ.`
      ),
    },
    "mates2-geometria-5db82609aec0-opcion-b": {
      "a)": answer(
        "x=1−t, y=−2+4t, z=3−2t",
        [
          "x=1+t, y=−2−4t, z=3+2t",
          "x=−t, y=4t, z=−2t",
          "x=1−t, y=2+4t, z=3+2t",
        ],
        `La recta pasa por:
A=(1,−2,3)
y B=(0,2,1).

Su vector director es:
AB⃗=B−A
=(0−1,2−(−2),1−3)
=(−1,4,−2).

Por tanto, una ecuación paramétrica es:
x=1−t,
y=−2+4t,
z=3−2t.

Resultado: r: x=1−t, y=−2+4t, z=3−2t.`
      ),
      "b)": answer(
        "No existe ningún plano que contenga la recta y esté a distancia 3 del origen",
        [
          "Existe un único plano: x−4y+2z=3",
          "Existen exactamente dos planos",
          "Todo plano que contenga la recta cumple la condición",
        ],
        `Cualquier plano que contenga la recta r contiene todos sus puntos. Por ello, la distancia del origen a ese plano no puede ser mayor que la distancia del origen a la propia recta.

Tomamos el punto A=(1,−2,3) de r y su vector director:
v⃗=(−1,4,−2).

La distancia del origen O a la recta es:
d(O,r)=|AO⃗×v⃗|/|v⃗|.

Podemos usar OA⃗=(1,−2,3):
OA⃗×v⃗
=(1,−2,3)×(−1,4,−2)
=(−8,−1,2).

Entonces:
|OA⃗×v⃗|=√(64+1+4)=√69,
|v⃗|=√(1+16+4)=√21.

Por tanto:
d(O,r)=√69/√21
=√(23/7)
<3.

Si un plano contiene r, su distancia al origen es menor o igual que d(O,r), que ya es menor que 3. En consecuencia, no puede existir un plano que contenga r y esté a distancia 3 del origen.

Resultado: no existe dicho plano.`
      ),
    },
  });
})();
