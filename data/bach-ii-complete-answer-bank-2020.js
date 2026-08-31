// Banco operativo verificado de ejercicios oficiales de 2020.
// Se completa por bloques y se valida antes de avanzar al año siguiente.
// Reparación de dos registros de Álgebra de CCSS II que llegaron unidos
// durante la extracción del documento original.
(() => {
  "use strict";

  const blocks = window.CCSS_II_BLOCK_EXERCISES;
  if (!blocks || !Array.isArray(blocks.algebra)) return;

  const matrixExercise = blocks.algebra.find(
    (exercise) => exercise.id === "ccss2-algebra-5a11e099d53e"
  );
  if (matrixExercise && matrixExercise.parts && matrixExercise.parts[0]) {
    matrixExercise.parts[0].paragraphs = [{
      plain: "a) Calcula M=A·C-(B-I)^T, siendo I la matriz identidad de orden 2.",
      html: "a) Calcula <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"native-math\"><mi>M</mi><mo>=</mo><mi>A</mi><mo>·</mo><mi>C</mi><mo>-</mo><msup><mrow><mo>(</mo><mi>B</mi><mo>-</mo><mi>I</mi><mo>)</mo></mrow><mi>T</mi></msup></math>, siendo <math xmlns=\"http://www.w3.org/1998/Math/MathML\" class=\"native-math\"><mi>I</mi></math> la matriz identidad de orden 2."
    }];
  }

  const mergedIndex = blocks.algebra.findIndex(
    (exercise) => exercise.id === "ccss2-algebra-0148c218be83"
  );
  if (mergedIndex < 0) return;

  const original = blocks.algebra[mergedIndex];
  const paragraph = (text) => ({ plain: text, html: text });

  const cakes = {
    ...original,
    source: "2020 - Septiembre - Sección 1, bloque 1, ejercicio 2",
    convocatoria: "Septiembre 2020",
    statement: [paragraph(
      "En una pastelería se elaboran dos tipos de tarta de chocolate (A y B). La primera lleva 100 g de chocolate con leche y 200 g de chocolate negro y la segunda 200 g de chocolate con leche y 100 g de chocolate negro. Dispone de 9 kg de cada tipo de chocolate. Por cada tarta A obtiene un beneficio de 5 euros y por cada tarta B de 4 euros."
    )],
    parts: [
      {
        label: "a)",
        paragraphs: [paragraph(
          "a) Expresa la función objetivo para obtener un beneficio máximo."
        )]
      },
      {
        label: "b)",
        paragraphs: [paragraph(
          "b) Escribe mediante inecuaciones las restricciones del problema y representa gráficamente el recinto definido."
        )]
      },
      {
        label: "c)",
        paragraphs: [paragraph(
          "c) Determina el número de tartas de cada tipo que puede vender para obtener beneficio máximo."
        )]
      }
    ]
  };

  const films = {
    ...original,
    id: "ccss2-algebra-0148c218be83--peliculas-2020-septiembre",
    source: "2020 - Septiembre - Sección 3, bloque 1, ejercicio 5",
    convocatoria: "Septiembre 2020",
    statement: [paragraph(
      "La elección de una película ganadora de un festival de cine negro se realiza mediante una votación pública por internet entre las seleccionadas (A, B y C) para la final. El número de votantes es de 1200 personas. El número de votos de A es el doble de los conseguidos por B y C juntas. B consigue el 50 % de votos más que C."
    )],
    parts: [
      {
        label: "a)",
        paragraphs: [paragraph(
          "a) Plantea el sistema de ecuaciones que nos permita averiguar cuántos votos obtuvo cada película."
        )]
      },
      {
        label: "b)",
        paragraphs: [paragraph(
          "b) Resuelve razonadamente el sistema planteado en el apartado anterior."
        )]
      }
    ]
  };

  blocks.algebra.splice(mergedIndex, 1, cakes, films);
})();

(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-1f38ba485df9": {
      "a)": {
        options: [
          "a=-2, 0 o 1",
          "a=-2 o 1",
          "a=0 o 2",
          "La matriz tiene inversa para todo a"
        ],
        correct: 0,
        solution: `Resolución:
1. Una matriz cuadrada no tiene inversa exactamente cuando su determinante es cero.
2. Calculamos el determinante de A y lo factorizamos:
det(A)=-a·(a+2)·(a-1).
3. Igualamos a cero:
-a·(a+2)·(a-1)=0
⟹ a=0, a=-2 o a=1.
Resultado final: A no tiene inversa para a=-2, 0 o 1.`
      },
      "b)": {
        options: [
          "(x,y,z)=(t+4,1,t), con t∈R",
          "(x,y,z)=(t,1,t+4), con t∈R",
          "(x,y,z)=(4,1,0)",
          "(x,y,z)=(t+4,-1,t), con t∈R"
        ],
        correct: 0,
        solution: `Resolución:
1. La condición del enunciado es que el producto sea conmutativo: C·D=D·C.
2. Calculamos ambos productos:
C·D=((3x+1,x-1),(3y+z,y-z)),
D·C=((3x+y,3+z),(x-y,1-z)).
3. Igualando los elementos correspondientes obtenemos:
{y=1; x-z=4}.
4. Tomamos z=t como parámetro libre. Entonces x=t+4 e y=1.
Resultado final: (x,y,z)=(t+4,1,t), con t∈R.`
      }
    },
    "mates2-algebra-1f38ba485df9--mates-ii-algebra-2": {
      "b)": {
        options: [
          "(x,y,z)=(3/4,-1/4,0)",
          "(x,y,z)=(1,-1,0)",
          "(x,y,z)=(3/4,1/4,0)",
          "El sistema es incompatible"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos a=2:
{2x-2y-z=2; 2x-2y=2; 2x+2y-z=1}.
2. Restamos la segunda ecuación de la primera:
-z=0 ⟹ z=0.
3. Con z=0 queda el sistema:
{x-y=1; x+y=1/2}.
4. Sumamos las ecuaciones:
2x=3/2 ⟹ x=3/4.
5. Sustituimos en x-y=1:
3/4-y=1 ⟹ y=-1/4.
Resultado final: (x,y,z)=(3/4,-1/4,0).`
      }
    },
    "mates2-algebra-9f4094e5eb15": {
      "a)": {
        options: [
          "A⁻¹=((2,1,2),(0,0,-1),(1,0,1))",
          "A⁻¹=((2,0,1),(1,0,0),(2,-1,1))",
          "A no tiene inversa",
          "A⁻¹=((-2,-1,-2),(0,0,1),(-1,0,-1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos por Sarrus:
det(A)=-1≠0. Por tanto, A tiene inversa.
2. Aplicamos la fórmula usada en el curso:
A⁻¹=Adj(Aᵀ)/det(A).
3. Calculamos los adjuntos con Aᵢⱼ=(-1)ⁱ⁺ʲ·det(Mᵢⱼ), formamos Adj(A), la trasponemos y dividimos por det(A).
4. Se obtiene:
A⁻¹=((2,1,2),(0,0,-1),(1,0,1)).
5. Comprobación: A·A⁻¹=I₃.
Resultado final: A⁻¹=((2,1,2),(0,0,-1),(1,0,1)).`
      },
      "b)": {
        options: [
          "X=((4,3,0),(1,-1,-2),(3,2,-1))",
          "X=((4,1,3),(3,-1,2),(0,-2,-1))",
          "X=((5,1,-3),(-2,0,2),(-1,1,3))",
          "X=((2,1,2),(0,0,-1),(1,0,1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de A·X+I₃=B·C y aislamos el término con X:
A·X=B·C-I₃.
2. Multiplicamos por A⁻¹ a la izquierda:
A⁻¹·A·X=A⁻¹·(B·C-I₃)
⟹ X=A⁻¹·(B·C-I₃).
3. Calculamos:
B·C=((5,1,-3),(-2,0,2),(-1,1,3)),
B·C-I₃=((4,1,-3),(-2,-1,2),(-1,1,2)).
4. Usamos A⁻¹=((2,1,2),(0,0,-1),(1,0,1)) y multiplicamos fila por columna:
X=((4,3,0),(1,-1,-2),(3,2,-1)).
5. Comprobación: A·X+I₃=B·C.
Resultado final: X=((4,3,0),(1,-1,-2),(3,2,-1)).`
      }
    },
    "mates2-algebra-9f4094e5eb15--mates-ii-algebra-2": {
      "b)": {
        options: [
          "(x,y,z)=(0,1-t,t), con t∈R",
          "(x,y,z)=(1,0,0)",
          "(x,y,z)=(0,t,1-t), con t∈R",
          "El sistema es incompatible"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos a=2:
{x+2y+2z=2; x+2y+2z=2; -x+y+z=1}.
2. Las dos primeras ecuaciones coinciden. El sistema equivalente es:
{x+2y+2z=2; -x+y+z=1}.
3. Llamamos t=z. De la segunda ecuación:
x=y+t-1.
4. Sustituimos en la primera:
y+t-1+2y+2t=2
⟹ 3y+3t=3
⟹ y=1-t.
5. Entonces x=(1-t)+t-1=0.
Resultado final: (x,y,z)=(0,1-t,t), con t∈R; el sistema es compatible indeterminado.`
      }
    }
  });
})();

// Ciencias Sociales II · Álgebra · 2020.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-7d547b306746": {
      "a)": {
        options: [
          "{x-z=y; x=3z; 150x+200y+250z=5500}",
          "{x+z=y; x=3z; 150x+200y+250z=5500}",
          "{x-z=y; z=3x; 150x+200y+250z=5500}",
          "{x-z=y; x=3z; x+y+z=5500}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de pares de botines, y al de botas de media caña y z al de botas de caña alta.
2. La diferencia entre los botines y las botas de caña alta es el número de botas de media caña:
x-z=y.
3. Las botas de caña alta son la tercera parte de los botines:
z=x/3, es decir, x=3z.
4. La recaudación total es:
150x+200y+250z=5500.
Resultado final:
{x-z=y; x=3z; 150x+200y+250z=5500}.`
      },
      "b)": {
        options: [
          "15 pares de botines, 10 de media caña y 5 de caña alta",
          "10 pares de botines, 15 de media caña y 5 de caña alta",
          "15 pares de botines, 5 de media caña y 10 de caña alta",
          "20 pares de botines, 10 de media caña y 5 de caña alta"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos del sistema:
{x-z=y; x=3z; 150x+200y+250z=5500}.
2. Sustituimos x=3z en la primera ecuación:
y=3z-z=2z.
3. Sustituimos x=3z e y=2z en la ecuación de la recaudación:
150·3z+200·2z+250z=5500.
4. Operamos:
450z+400z+250z=5500
1100z=5500
z=5.
5. Calculamos las otras incógnitas:
x=3·5=15,
y=2·5=10.
Resultado final: se vendieron 15 pares de botines, 10 de botas de media caña y 5 de botas de caña alta.`
      }
    },
    "ccss2-algebra-7d2c42116953": {
      "a)": {
        options: [
          "Triángulo limitado por x+y=2, x-y=2 e y=1",
          "Rectángulo limitado por x=0, x=2, y=0 e y=1",
          "Región no acotada situada por encima de y=1",
          "Triángulo limitado por x+y=2, x-y=-2 e y=1"
        ],
        correct: 0,
        solution: `Resolución:
1. Dibujamos las rectas frontera:
x+y=2, x-y=2, y=1 y x=0.
2. Elegimos el semiplano que satisface cada desigualdad:
x+y≥2, x-y≤2, y≤1 y x≥0.
3. La intersección de esos semiplanos es un triángulo.
Resultado final: la región factible es el triángulo limitado por x+y=2, x-y=2 e y=1.`
      },
      "b)": {
        options: [
          "(1,1), (2,0) y (3,1)",
          "(0,2), (1,1) y (2,0)",
          "(1,1), (2,2) y (3,1)",
          "(0,0), (2,0) y (0,2)"
        ],
        correct: 0,
        solution: `Resolución:
1. Intersección de x+y=2 con y=1:
x+1=2 ⇒ x=1. Vértice (1,1).
2. Intersección de x+y=2 con x-y=2:
sumamos las ecuaciones y obtenemos 2x=4 ⇒ x=2; entonces y=0.
Vértice (2,0).
3. Intersección de x-y=2 con y=1:
x-1=2 ⇒ x=3. Vértice (3,1).
Resultado final: los vértices son (1,1), (2,0) y (3,1).`
      },
      "c)": {
        options: [
          "Mínimo 4 en (1,1) y máximo 16 en (3,1)",
          "Mínimo 12 en (2,0) y máximo 16 en (3,1)",
          "Mínimo 4 en (1,1) y máximo 12 en (2,0)",
          "Mínimo -4 en (1,1) y máximo 18 en (3,1)"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos f(x,y)=6x-2y en cada vértice:
f(1,1)=6-2=4.
f(2,0)=12.
f(3,1)=18-2=16.
2. Comparamos los valores.
Resultado final: el mínimo es 4 en (1,1) y el máximo es 16 en (3,1).`
      }
    },
    "ccss2-algebra-1c94a03bca5c": {
      "a)": {
        options: [
          "{y=3x; y=z+40; 2,5x+3,5y+3z=1640}",
          "{x=3y; y=z+40; 2,5x+3,5y+3z=1640}",
          "{y=3x; z=y+40; 2,5x+3,5y+3z=1640}",
          "{y=3x; y=z+40; x+y+z=1640}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x, y, z al número de paquetes de espelta, amapola y chía, respectivamente.
2. Se venden el triple de paquetes de amapola que de espelta:
y=3x.
3. Se venden 40 paquetes más de amapola que de chía:
y=z+40.
4. La recaudación total es:
2,5x+3,5y+3z=1640.
Resultado final:
{y=3x; y=z+40; 2,5x+3,5y+3z=1640}.`
      },
      "b)": {
        options: [
          "(x,y,z)=(80,240,200)",
          "(x,y,z)=(200,240,80)",
          "(x,y,z)=(80,200,240)",
          "(x,y,z)=(100,300,260)"
        ],
        correct: 0,
        solution: `Resolución:
1. Del sistema tenemos:
y=3x,
z=y-40=3x-40.
2. Sustituimos en la ecuación de la recaudación:
2,5x+3,5·3x+3(3x-40)=1640.
3. Operamos:
2,5x+10,5x+9x-120=1640
22x=1760
x=80.
4. Calculamos:
y=3·80=240,
z=240-40=200.
Resultado final: 80 paquetes de espelta, 240 de amapola y 200 de chía.`
      }
    },
    "ccss2-algebra-5a11e099d53e": {
      "a)": {
        options: [
          "M=((10,2),(24,0))",
          "M=((4,2),(28,2))",
          "M=((10,4),(26,0))",
          "M=((7,2),(26,1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el producto:
A·C=((3,2,0),(6,1,0))·((5,0),(-4,1),(0,-1))
=((7,2),(26,1)).
2. Restamos la identidad a B:
B-I=((-2,2),(0,2))-((1,0),(0,1))
=((-3,2),(0,1)).
3. Trasponemos:
(B-I)ᵀ=((-3,0),(2,1)).
4. Finalmente:
M=A·C-(B-I)ᵀ
=((7,2),(26,1))-((-3,0),(2,1))
=((10,2),(24,0)).
Resultado final: M=((10,2),(24,0)).`
      },
      "b)": {
        options: [
          "X=(-1,3)",
          "X=(1,1)",
          "X=(-1,2)",
          "No existe una matriz X"
        ],
        correct: 0,
        solution: `Resolución:
1. Como X·B=(2,4) y B es de orden 2, X debe ser una matriz fila:
X=(x,y).
2. Realizamos el producto:
(x,y)·((-2,2),(0,2))=(-2x,2x+2y).
3. Igualamos las componentes:
{-2x=2; 2x+2y=4}.
4. De la primera ecuación:
x=-1.
5. Sustituimos en la segunda:
-2+2y=4 ⇒ 2y=6 ⇒ y=3.
Resultado final: X=(-1,3).`
      }
    },
    "ccss2-algebra-231358da17a5": {
      "a)": {
        options: [
          "{z=x+y; 50y=30z; 5x+5y+10z=7500}",
          "{z=x-y; 50y=30z; 5x+5y+10z=7500}",
          "{z=x+y; 30y=50z; 5x+5y+10z=7500}",
          "{z=x+y; 50y=30z; x+y+z=7500}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x, y, z a los precios de los teléfonos de gama reducida, media y superior.
2. El superior cuesta lo mismo que los otros dos juntos:
z=x+y.
3. Con 50 teléfonos de gama media se obtiene lo mismo que con 30 de gama superior:
50y=30z.
4. La última venta proporciona:
5x+5y+10z=7500.
Resultado final:
{z=x+y; 50y=30z; 5x+5y+10z=7500}.`
      },
      "b)": {
        options: [
          "Reducido: 200 €, medio: 300 €, superior: 500 €",
          "Reducido: 300 €, medio: 200 €, superior: 500 €",
          "Reducido: 200 €, medio: 500 €, superior: 300 €",
          "Reducido: 250 €, medio: 300 €, superior: 550 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Como z=x+y, la tercera ecuación queda:
5(x+y)+10z=7500
5z+10z=7500.
2. Por tanto:
15z=7500 ⇒ z=500.
3. De 50y=30z:
50y=30·500=15000
y=300.
4. De z=x+y:
x=500-300=200.
Resultado final: el teléfono reducido cuesta 200 €, el medio 300 € y el superior 500 €.`
      }
    },
    "ccss2-algebra-0148c218be83": {
      "a)": {
        options: ["B(x,y)=5x+4y", "B(x,y)=4x+5y", "B(x,y)=100x+200y", "B(x,y)=9x+9y"],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de tartas A e y al número de tartas B.
2. Cada tarta A aporta 5 € y cada tarta B aporta 4 €.
Resultado final: la función objetivo que se debe maximizar es B(x,y)=5x+4y.`
      },
      "b)": {
        options: [
          "{x+2y≤90; 2x+y≤90; x≥0; y≥0}",
          "{x+2y≥90; 2x+y≥90; x≥0; y≥0}",
          "{2x+y≤90; x+y≤90; x≥0; y≥0}",
          "{x+2y≤9000; 2x+y≤9000; x≥0; y≥0}"
        ],
        correct: 0,
        solution: `Resolución:
1. Restricción de chocolate con leche:
100x+200y≤9000
⇒ x+2y≤90.
2. Restricción de chocolate negro:
200x+100y≤9000
⇒ 2x+y≤90.
3. No se pueden elaborar cantidades negativas:
x≥0, y≥0.
4. Las rectas x+2y=90 y 2x+y=90 se cortan en (30,30). Con los ejes forman los vértices (0,0), (45,0), (30,30) y (0,45).
Resultado final:
{x+2y≤90; 2x+y≤90; x≥0; y≥0}.`
      },
      "c)": {
        options: [
          "30 tartas A y 30 tartas B; beneficio máximo 270 €",
          "45 tartas A y ninguna B; beneficio máximo 225 €",
          "Ninguna A y 45 tartas B; beneficio máximo 180 €",
          "20 tartas A y 20 tartas B; beneficio máximo 180 €"
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos B(x,y)=5x+4y en los vértices:
B(0,0)=0.
B(45,0)=225.
B(30,30)=150+120=270.
B(0,45)=180.
2. El mayor valor es 270.
Resultado final: debe elaborar 30 tartas A y 30 tartas B; el beneficio máximo es 270 €.`
      }
    },
    "ccss2-algebra-0148c218be83--peliculas-2020-septiembre": {
      "a)": {
        options: [
          "{x+y+z=1200; x=2(y+z); y=1,5z}",
          "{x+y+z=1200; x=2y+z; z=1,5y}",
          "{x+y+z=1200; 2x=y+z; y=1,5z}",
          "{x+y+z=1200; x=2(y+z); z=1,5y}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x, y, z a los votos de las películas A, B y C.
2. El total de votos es:
x+y+z=1200.
3. A obtiene el doble de los votos de B y C juntas:
x=2(y+z).
4. B obtiene un 50 % más de votos que C:
y=1,5z.
Resultado final:
{x+y+z=1200; x=2(y+z); y=1,5z}.`
      },
      "b)": {
        options: [
          "A: 800 votos, B: 240 votos, C: 160 votos",
          "A: 800 votos, B: 160 votos, C: 240 votos",
          "A: 600 votos, B: 360 votos, C: 240 votos",
          "A: 720 votos, B: 288 votos, C: 192 votos"
        ],
        correct: 0,
        solution: `Resolución:
1. Como x=2(y+z), en la ecuación del total:
2(y+z)+y+z=1200.
2. Operamos:
3(y+z)=1200
y+z=400,
x=2·400=800.
3. Como y=1,5z:
1,5z+z=400
2,5z=400
z=160.
4. Calculamos:
y=1,5·160=240.
Resultado final: A obtuvo 800 votos, B obtuvo 240 y C obtuvo 160.`
      }
    }
  });
})();

// Ciencias Sociales II · Análisis · 2020.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-analisis-3d1c981a5b93": {
      "a)": {
        options: ["t=0", "t=3", "t=-2", "t=4"],
        correct: 0,
        solution: `Resolución:
1. Cada rama es continua en su intervalo. Para que f sea continua en x=-2 deben coincidir el límite por la izquierda, el límite por la derecha y f(-2).
2. Por la izquierda y en el punto:
lim(x→-2⁻) [(x+4)²-4]=f(-2)=(2)²-4=0.
3. Por la derecha:
lim(x→-2⁺) t=t.
4. Igualamos:
t=0.
Resultado final: t=0.`
      },
      "b)": {
        options: [
          "Dos ramas parabólicas con puntos cerrados en (-2,0) y (2,0), y el segmento horizontal y=3 entre ambos extremos abiertos",
          "Una única parábola con vértice en (0,3)",
          "La recta y=3 para todo x",
          "Dos rectas y una parábola central"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=3, la función queda:
f(x)={(x+4)²-4 si x≤-2; 3 si -2<x<2; (x-4)²-4 si x≥2}.
2. La primera rama es una parábola de vértice (-4,-4). Termina en (-2,0), que se representa con punto cerrado.
3. La rama central es el segmento horizontal y=3 para -2<x<2. Sus extremos (-2,3) y (2,3) son abiertos.
4. La última rama es una parábola de vértice (4,-4). Comienza en (2,0), con punto cerrado.
Resultado final: la gráfica está formada por esas dos ramas parabólicas y el segmento horizontal central.`
      }
    },
    "ccss2-analisis-69e6d09ccf24": {
      "Resultado": {
        options: ["a=3, b=-9, c=0", "a=-3, b=9, c=0", "a=3, b=-9, c=10", "a=1, b=-3, c=6"],
        correct: 0,
        solution: `Resolución:
1. La función es f(x)=ax³+bx²+16x+c. Derivamos:
f'(x)=3ax²+2bx+16,
f''(x)=6ax+2b.
2. Como (1,10) es un punto de inflexión:
f''(1)=0 ⟹ 6a+2b=0.
3. La pendiente de la tangente en x=1 es 7:
f'(1)=7 ⟹ 3a+2b+16=7 ⟹ 3a+2b=-9.
4. El punto (1,10) pertenece a la gráfica:
f(1)=10 ⟹ a+b+16+c=10 ⟹ a+b+c=-6.
5. Resolvemos conjuntamente:
{6a+2b=0; 3a+2b=-9; a+b+c=-6}.
Restando las dos primeras ecuaciones se obtiene 3a=9, luego a=3. Entonces b=-9 y c=0.
6. Comprobación:
f'''(x)=18≠0, por lo que en x=1 hay realmente un punto de inflexión.
Resultado final: a=3, b=-9 y c=0.`
      }
    },
    "ccss2-analisis-728ff6e18b7c": {
      "a)": {
        options: ["t=2", "t=1", "t=-2", "t=4"],
        correct: 0,
        solution: `Resolución:
1. Para la continuidad en x=-1 calculamos las dos ramas y el valor de la función:
lim(x→-1⁻)(x+t)=f(-1)=-1+t.
2. Por la derecha:
lim(x→-1⁺)(x³-2x²+4)=-1-2+4=1.
3. Igualamos:
-1+t=1 ⟹ t=2.
Resultado final: t=2.`
      },
      "b)": {
        options: [
          "Máximo relativo en (0,4) y mínimo relativo en (4/3,76/27)",
          "Mínimo relativo en (0,4) y máximo relativo en (4/3,76/27)",
          "Únicamente un máximo en (4/3,76/27)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. En (-1,+∞), f(x)=x³-2x²+4.
2. Derivamos:
f'(x)=3x²-4x=x(3x-4).
3. Los puntos críticos son:
x=0 y x=4/3.
4. Estudiamos el signo de f' en la recta real:
(-1,0): tomamos x=-1/2 y f'(-1/2)>0  ↗
(0,4/3): tomamos x=1 y f'(1)<0  ↘
(4/3,+∞): tomamos x=2 y f'(2)>0  ↗
5. En x=0 se pasa de creciente a decreciente: máximo relativo.
En x=4/3 se pasa de decreciente a creciente: mínimo relativo.
6. Calculamos las ordenadas:
f(0)=4,
f(4/3)=64/27-32/9+4=76/27.
Resultado final: máximo relativo en (0,4) y mínimo relativo en (4/3,76/27).`
      },
      "c)": {
        options: [
          "Crece en (-1,0) y (4/3,+∞); decrece en (0,4/3)",
          "Decrece en (-1,0) y (4/3,+∞); crece en (0,4/3)",
          "Crece en todo (-1,+∞)",
          "Decrece en todo (-1,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
1. f'(x)=x(3x-4), que se anula en x=0 y x=4/3.
2. En la recta real:
(-1,0): f'(x)>0  ↗
(0,4/3): f'(x)<0  ↘
(4/3,+∞): f'(x)>0  ↗
Resultado final: f crece en (-1,0) y (4/3,+∞), y decrece en (0,4/3).`
      }
    },
    "ccss2-analisis-657f45090530": {
      "a)": {
        options: [
          "Aumentan de t=1 a t=4 y de t=5 a t=6; disminuyen de t=4 a t=5",
          "Aumentan de t=1 a t=5 y disminuyen de t=5 a t=6",
          "Disminuyen durante todo el horario",
          "Aumentan durante todo el horario"
        ],
        correct: 0,
        solution: `Resolución:
1. C(t)=2t³-27t²+120t, con 1≤t≤6.
2. Derivamos:
C'(t)=6t²-54t+120=6(t-4)(t-5).
3. Estudiamos el signo en [1,6]:
(1,4): tomamos t=2 y C'(2)>0  ↗
(4,5): tomamos t=9/2 y C'(9/2)<0  ↘
(5,6): tomamos t=11/2 y C'(11/2)>0  ↗
Resultado final: las ventas aumentan entre t=1 y t=4 y entre t=5 y t=6; disminuyen entre t=4 y t=5.`
      },
      "b)": {
        options: [
          "Máxima en t=6 y mínima en t=1",
          "Máxima en t=4 y mínima en t=5",
          "Máxima en t=5 y mínima en t=4",
          "Máxima en t=1 y mínima en t=6"
        ],
        correct: 0,
        solution: `Resolución:
1. Al tratarse del intervalo cerrado [1,6], comparamos los extremos del intervalo y los puntos críticos t=4 y t=5.
2. Calculamos:
C(1)=95,
C(4)=176,
C(5)=175,
C(6)=180.
3. El mayor valor es C(6)=180 y el menor es C(1)=95.
Resultado final: la venta máxima se produce en t=6, al cierre, y la mínima en t=1, durante la primera hora.`
      },
      "c)": {
        options: ["18 000 botellas y 9 500 botellas", "17 600 y 17 500 botellas", "180 y 95 botellas", "9 500 y 18 000 botellas, respectivamente"],
        correct: 0,
        solution: `Resolución:
1. Del apartado anterior:
C(6)=180 y C(1)=95.
2. C(t) está expresada en cientos de botellas.
3. Convertimos:
180·100=18 000,
95·100=9 500.
Resultado final: la venta máxima es de 18 000 botellas y la mínima de 9 500 botellas.`
      }
    },
    "ccss2-analisis-2c11f4c0b2ff": {
      "a)": {
        options: ["c=-2 o c=2", "Solo c=2", "Solo c=-2", "c=0 o c=4"],
        correct: 0,
        solution: `Resolución:
1. Para que f sea continua en x=c deben coincidir ambas ramas:
lim(x→c⁻)(-4x+4)=f(c)=-4c+4.
2. Por la derecha:
lim(x→c⁺)(x²-4x)=c²-4c.
3. Igualamos:
-4c+4=c²-4c
⟹ c²=4
⟹ c=-2 o c=2.
Resultado final: c=-2 o c=2.`
      },
      "b)": {
        options: [
          "La recta y=-4x+4 para x≤2 y la parábola y=(x-2)²-4 para x>2, unidas en (2,-4)",
          "La recta y=4x-4 y una parábola de vértice (0,0)",
          "Una sola recta y=-4x+4",
          "Dos parábolas sin punto común"
        ],
        correct: 0,
        solution: `Resolución:
1. Para c=2:
f(x)={-4x+4 si x≤2; x²-4x si x>2}.
2. La primera rama es la recta y=-4x+4. En x=2 toma el valor -4, por lo que (2,-4) es un punto cerrado.
3. Completamos cuadrados en la segunda rama:
x²-4x=(x-2)²-4.
Es una parábola de vértice (2,-4), pero esta rama corresponde a x>2.
4. Ambas ramas coinciden en el punto de unión y la función es continua.
Resultado final: se representa la recta hasta (2,-4) y, desde ese punto hacia la derecha, la rama de la parábola.`
      }
    },
    "ccss2-analisis-09470b938e3c": {
      "Resultado": {
        options: ["a=-3, b=-9, c=2", "a=3, b=-9, c=-2", "a=-3, b=9, c=2", "a=-1, b=-3, c=-4"],
        correct: 0,
        solution: `Resolución:
1. f(x)=x³+ax²+bx+c. Derivamos:
f'(x)=3x²+2ax+b,
f''(x)=6x+2a.
2. Hay un máximo en x=-1, por tanto:
f'(-1)=0 ⟹ 3-2a+b=0.
3. El punto (1,-9) es de inflexión:
f''(1)=0 ⟹ 6+2a=0 ⟹ a=-3.
4. Además, el punto pertenece a la gráfica:
f(1)=-9 ⟹ 1+a+b+c=-9.
5. Sustituimos a=-3 en la primera ecuación:
3+6+b=0 ⟹ b=-9.
En la ecuación del punto:
1-3-9+c=-9 ⟹ c=2.
6. Comprobamos el máximo:
f''(-1)=-6-6=-12<0.
Resultado final: a=-3, b=-9 y c=2.`
      }
    },
    "ccss2-analisis-cf86c20f03f0": {
      "a)": {
        options: ["t=2", "t=0", "t=-2", "t=4"],
        correct: 0,
        solution: `Resolución:
1. En x=0, la rama izquierda da:
lim(x→0⁻)(x-t)=f(0)=-t.
2. La rama derecha da:
lim(x→0⁺)[(x-t)²-5(x+t)+4]
=t²-5t+4.
3. Igualamos:
-t=t²-5t+4
⟹ t²-4t+4=0
⟹ (t-2)²=0.
Resultado final: t=2.`
      },
      "b)": {
        options: ["Mínimo relativo en (5/2,-9/4)", "Máximo relativo en (5/2,-9/4)", "Mínimo relativo en (0,4)", "No tiene extremos relativos"],
        correct: 0,
        solution: `Resolución:
1. Para t=0 y x>0:
f(x)=x²-5x+4.
2. Derivamos:
f'(x)=2x-5.
3. El único punto crítico es:
2x-5=0 ⟹ x=5/2.
4. En la recta real:
(0,5/2): f'(x)<0  ↘
(5/2,+∞): f'(x)>0  ↗
Por tanto, existe un mínimo relativo.
5. Calculamos la ordenada:
f(5/2)=25/4-25/2+4=-9/4.
Resultado final: mínimo relativo en (5/2,-9/4).`
      },
      "c)": {
        options: [
          "Decrece en (0,5/2) y crece en (5/2,+∞)",
          "Crece en (0,5/2) y decrece en (5/2,+∞)",
          "Crece en todo (0,+∞)",
          "Decrece en todo (0,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=0, f'(x)=2x-5.
2. Se anula en x=5/2.
3. Tabla de signos:
(0,5/2): f'(x)<0  ↘
(5/2,+∞): f'(x)>0  ↗
Resultado final: f decrece en (0,5/2) y crece en (5/2,+∞).`
      }
    },
    "ccss2-analisis-add54a8ef955": {
      "a)": {
        options: ["El jueves, 59 clientes", "El lunes, 86 clientes", "El viernes, 70 clientes", "El miércoles, 60 clientes"],
        correct: 0,
        solution: `Resolución:
1. f(x)=2x³-15x²+24x+75, con 1≤x≤5.
2. Derivamos:
f'(x)=6x²-30x+24=6(x-1)(x-4).
3. En (1,4), f'(x)<0 y la función decrece. En (4,5), f'(x)>0 y crece.
4. Comparamos los extremos y el punto crítico:
f(1)=86,
f(4)=59,
f(5)=70.
5. El menor valor es f(4)=59. Como x=1 es lunes, x=4 corresponde al jueves.
Resultado final: el jueves, con 59 clientes.`
      },
      "b)": {
        options: ["El lunes, 86 clientes", "El jueves, 59 clientes", "El viernes, 70 clientes", "El martes, 75 clientes"],
        correct: 0,
        solution: `Resolución:
1. En el intervalo cerrado [1,5] comparamos:
f(1)=86, f(4)=59 y f(5)=70.
2. El mayor valor es 86 y se alcanza en x=1.
3. x=1 corresponde al lunes.
Resultado final: el lunes, con 86 clientes.`
      }
    }
  });
})();

// Ciencias Sociales II · Inferencia estadística · 2020.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-estadistica-29ffd4fb6c74": {
      "a)": {
        options: ["(4,289; 7,171)", "(4,638; 6,822)", "(3,630; 7,830)", "(5,289; 6,171)"],
        correct: 0,
        solution: `Resolución:
1. Calculamos la media muestral:
x̄=(4,2+4,6+5+5,7+5,8+5,9+6,1+6,2+6,5+7,3)/10=5,73.
2. Para un nivel de confianza del 97 %:
α=0,03, α/2=0,015 y z(0,985)≈2,17.
3. Como σ=2,1 y n=10, el error máximo es:
E=z(0,985)·σ/√n
=2,17·2,1/√10≈1,441.
4. El intervalo es:
IC₉₇%=(x̄-E, x̄+E)
=(5,73-1,441, 5,73+1,441)
=(4,289; 7,171).
Resultado final: IC₉₇%=(4,289; 7,171) horas.`
      },
      "b)": {
        options: [
          "Aumentar el tamaño de la muestra",
          "Disminuir el tamaño de la muestra",
          "Aumentar el nivel de confianza",
          "Aumentar la desviación típica"
        ],
        correct: 0,
        solution: `Resolución:
1. La amplitud del intervalo es:
A=2·z(1-α/2)·σ/√n.
2. Manteniendo el mismo nivel de confianza y la misma desviación típica, z y σ no cambian.
3. Al aumentar n, aumenta √n y disminuyen el error E y la amplitud.
Resultado final: debemos aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: [
          "No; el intervalo de confianza del 90 % es (4,638; 6,822) y no contiene 4",
          "Sí; 4 pertenece al intervalo de confianza del 90 %",
          "Sí; la media muestral es exactamente 4",
          "No; el intervalo de confianza del 90 % es (3,8; 4,2)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 90 %, z(0,95)=1,645.
2. Calculamos el error:
E=1,645·2,1/√10≈1,092.
3. El intervalo del 90 % es:
(5,73-1,092, 5,73+1,092)=(4,638; 6,822).
4. Como 4 no pertenece al intervalo, los datos no son compatibles con una media poblacional de 4 horas al nivel de confianza del 90 %.
Resultado final: no; 4 queda fuera del intervalo (4,638; 6,822).`
      }
    },
    "ccss2-estadistica-65ed359561b2": {
      "a)": {
        options: ["(9,060; 11,540)", "(8,340; 12,260)", "(9,680; 10,920)", "(10,000; 10,600)"],
        correct: 0,
        solution: `Resolución:
1. La media muestral es:
x̄=(5+6+7+8+9+11+12+14+15+16)/10=10,3.
2. Para un 95 % de confianza, z(0,975)=1,96.
3. El error máximo es:
E=1,96·2/√10≈1,240.
4. Por tanto:
IC₉₅%=(10,3-1,240, 10,3+1,240)
=(9,060; 11,540).
Resultado final: IC₉₅%=(9,060; 11,540) minutos.`
      },
      "b)": {
        options: ["16 clientes", "15 clientes", "17 clientes", "10 clientes"],
        correct: 0,
        solution: `Resolución:
1. Queremos que el error sea menor que 1:
E=1,96·2/√n<1.
2. Despejamos:
√n>3,92
⟹ n>3,92²=15,3664.
3. El tamaño muestral debe ser entero y cumplir estrictamente la desigualdad.
Resultado final: el tamaño mínimo es n=16 clientes.`
      }
    },
    "ccss2-estadistica-fc6f47a454ca": {
      "a)": {
        options: ["(211,684; 228,316)", "(210; 230)", "(213,021; 226,979)", "(190; 250)"],
        correct: 0,
        solution: `Resolución:
1. Los datos son x̄=220, σ=30, n=50 y z(0,975)=1,96.
2. Calculamos el error:
E=1,96·30/√50≈8,316.
3. El intervalo es:
IC₉₅%=(220-8,316, 220+8,316)
=(211,684; 228,316).
Resultado final: IC₉₅%=(211,684; 228,316) minutos.`
      },
      "b)": {
        options: [
          "Aumentar el número de personas de la muestra",
          "Reducir el número de personas",
          "Aumentar el nivel de confianza",
          "Aumentar la desviación típica"
        ],
        correct: 0,
        solution: `Resolución:
1. El error es E=z(1-α/2)·σ/√n y la amplitud es 2E.
2. Con el mismo nivel de confianza, z permanece fijo.
3. Para reducir la amplitud debemos aumentar n, pues √n aparece en el denominador.
Resultado final: hay que aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: [
          "No; el intervalo del 90 % es (213,021; 226,979) y no contiene 230",
          "Sí; 230 pertenece al intervalo del 90 %",
          "Sí; cualquier valor entre 200 y 240 es posible",
          "No; la media muestral es 230"
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 90 %, z(0,95)=1,645.
2. Calculamos:
E=1,645·30/√50≈6,979.
3. El intervalo es:
IC₉₀%=(220-6,979, 220+6,979)
=(213,021; 226,979).
4. Como 230 no pertenece al intervalo, los datos no respaldan ese valor al nivel de confianza del 90 %.
Resultado final: no; 230 queda fuera de (213,021; 226,979).`
      }
    },
    "ccss2-estadistica-f3c11bbbca91": {
      "a)": {
        options: ["(77,138; 90,862)", "(76,316; 91,684)", "(80; 88)", "(74; 94)"],
        correct: 0,
        solution: `Resolución:
1. Calculamos la media:
x̄=(60+80+120+95+65+70+75+85+100+90)/10=84.
2. Para un 97 % de confianza:
z(0,985)≈2,17.
3. El error máximo es:
E=2,17·10/√10≈6,862.
4. El intervalo es:
IC₉₇%=(84-6,862, 84+6,862)
=(77,138; 90,862).
Resultado final: IC₉₇%=(77,138; 90,862) gramos.`
      },
      "b)": {
        options: [
          "Aumentar el número de frascos de la muestra",
          "Disminuir el número de frascos",
          "Aumentar el nivel de confianza",
          "Aumentar la desviación típica"
        ],
        correct: 0,
        solution: `Resolución:
1. La amplitud es:
A=2·z(1-α/2)·σ/√n.
2. Si mantenemos el mismo nivel de confianza, z no cambia.
3. Al aumentar n, disminuye σ/√n y el intervalo se estrecha.
Resultado final: debemos aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: [
          "Sí; el intervalo del 98,5 % es aproximadamente (76,316; 91,684) y contiene 85",
          "No; 85 queda fuera del intervalo del 98,5 %",
          "No; la media muestral es 84 y nunca puede ser 85",
          "Sí; el intervalo del 98,5 % es (84; 85)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para un nivel de confianza del 98,5 %:
α=0,015, α/2=0,0075 y z(0,9925)≈2,43.
2. El error es:
E=2,43·10/√10≈7,684.
3. El intervalo es:
IC₉₈,₅%=(84-7,684, 84+7,684)
=(76,316; 91,684).
4. Como 85 pertenece al intervalo, ese valor es compatible con los datos al nivel de confianza indicado.
Resultado final: sí; 85 está incluido en (76,316; 91,684).`
      }
    }
  });
})();

// Ciencias Sociales II · Probabilidad · 2020.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-probabilidad-f9a56c3cd3c8": {
      "a)": {
        options: ["0,14", "0,10", "0,26", "0,40"],
        correct: 0,
        solution: `Resolución:
1. Sean T=«ver la televisión todos los días» y C=«jugar a la consola todos los días».
2. Usamos:
P(T∪C)=P(T)+P(C)-P(T∩C).
3. Despejamos:
P(T∩C)=0,15+0,25-0,26=0,14.
Resultado final: la probabilidad es 0,14, es decir, un 14 %.`
      },
      "b)": {
        options: ["0,56", "0,14", "0,35", "0,40"],
        correct: 0,
        solution: `Resolución:
1. Se pide una probabilidad condicionada:
P(T|C)=P(T∩C)/P(C).
2. Sustituimos los datos:
P(T|C)=0,14/0,25=0,56.
Resultado final: la probabilidad es 0,56, es decir, un 56 %.`
      }
    },
    "ccss2-probabilidad-34689f5b1e65": {
      "a)": {
        options: ["0,0565", "0,0570", "0,0500", "0,7000"],
        correct: 0,
        solution: `Resolución:
1. Sea A=«ha ido a una casa de apuestas» y F=«tiene problemas financieros».
2. Aplicamos el teorema de la probabilidad total:
P(F)=P(A)P(F|A)+P(Ā)P(F|Ā).
3. Sustituimos:
P(F)=0,01·0,70+0,99·0,05
=0,007+0,0495=0,0565.
Resultado final: la probabilidad es 0,0565, es decir, un 5,65 %.`
      },
      "b)": {
        options: ["14/113≈0,1239", "0,70", "0,0565", "7/100≈0,07"],
        correct: 0,
        solution: `Resolución:
1. Aplicamos el teorema de Bayes:
P(A|F)=P(A∩F)/P(F).
2. Calculamos el numerador:
P(A∩F)=0,01·0,70=0,007.
3. Sustituimos:
P(A|F)=0,007/0,0565=14/113≈0,1239.
Resultado final: la probabilidad es aproximadamente 0,1239, es decir, un 12,39 %.`
      }
    },
    "ccss2-probabilidad-7dd97bf58739": {
      "a)": {
        options: ["2,96 %", "29,6 %", "14,8 %", "16,28 %"],
        correct: 0,
        solution: `Resolución:
1. Sea S=«tener sobrepeso» y H=«padecer hipertensión».
2. Como el riesgo con sobrepeso es el doble:
P(H|S)=2·0,148=0,296.
3. Se pide la probabilidad conjunta:
P(S∩H)=P(S)P(H|S)=0,10·0,296=0,0296.
4. En porcentaje:
0,0296·100=2,96 %.
Resultado final: el 2,96 % de los adultos tiene sobrepeso e hipertensión.`
      },
      "b)": {
        options: ["2/11≈0,1818", "0,296", "0,10", "0,148"],
        correct: 0,
        solution: `Resolución:
1. Calculamos primero P(H) mediante la probabilidad total:
P(H)=0,10·0,296+0,90·0,148
=0,0296+0,1332=0,1628.
2. Aplicamos Bayes:
P(S|H)=P(S∩H)/P(H)
=0,0296/0,1628=2/11≈0,1818.
Resultado final: la probabilidad es 2/11≈0,1818, es decir, un 18,18 %.`
      }
    },
    "ccss2-probabilidad-fc36443cf7e5": {
      "a)": {
        options: ["0,14275", "0,15000", "0,00500", "0,14500"],
        correct: 0,
        solution: `Resolución:
1. Sea D=«deportista aficionado» y N=«no superar el test».
2. Aplicamos el teorema de la probabilidad total:
P(N)=P(D)P(N|D)+P(D̄)P(N|D̄).
3. Sustituimos:
P(N)=0,05·0,005+0,95·0,15
=0,00025+0,1425=0,14275.
Resultado final: la probabilidad es 0,14275, es decir, un 14,275 %.`
      },
      "b)": {
        options: ["1/571≈0,00175", "0,05", "0,005", "0,14275"],
        correct: 0,
        solution: `Resolución:
1. Aplicamos Bayes:
P(D|N)=P(D∩N)/P(N).
2. El numerador es:
P(D∩N)=0,05·0,005=0,00025.
3. Por tanto:
P(D|N)=0,00025/0,14275=1/571≈0,00175.
Resultado final: la probabilidad es aproximadamente 0,00175, es decir, un 0,175 %.`
      }
    }
  });
})();

// Matemáticas II · Análisis · 2020.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-analisis-9a1c32d36498": {
      "a)": {
        options: [
          "Es continua en R salvo en x=2, donde presenta una discontinuidad infinita",
          "Es continua en todo R",
          "Es discontinua en x=2 y x=3, ambas de salto finito",
          "Es continua en R salvo en x=3, donde presenta una discontinuidad evitable"
        ],
        correct: 0,
        solution: `Resolución:
1. Cada expresión es continua en el interior de su intervalo. Solo debemos estudiar los puntos de unión x=2 y x=3.
2. En x=2:
lim(x→2⁻) 3/(x-2)=-∞,
lim(x→2⁺) cos(πx)=cos(2π)=1,
y f(2)=1.
Los límites laterales no coinciden y uno de ellos es infinito. Por tanto, en x=2 hay una discontinuidad infinita.
3. En x=3:
lim(x→3⁻) cos(πx)=cos(3π)=-1
y f(3)=-1.
Para el límite por la derecha, escribimos x=3+h, con h→0⁺:
lim(h→0⁺) ln(1+h)/(-h)=-1.
Los dos límites laterales coinciden con f(3), así que la función es continua en x=3.
Resultado final: f es continua en R\\{2} y presenta una discontinuidad infinita en x=2.`
      },
      "b)": {
        options: ["1/2", "1", "0", "-1/2"],
        correct: 0,
        solution: `Resolución mediante la regla de L'Hôpital:
1. Sustituimos x=0:
[x·e^(-x)]/[1+2x-cos(x²)]=0/0.
Es una indeterminación 0/0, por lo que aplicamos L'Hôpital.
2. Derivamos numerador y denominador:
(x·e^(-x))'=e^(-x)-x·e^(-x)=e^(-x)(1-x),
[1+2x-cos(x²)]'=2+2x·sen(x²).
3. Por tanto:
lim(x→0) [x·e^(-x)]/[1+2x-cos(x²)]
=lim(x→0) [e^(-x)(1-x)]/[2+2x·sen(x²)]
=1/2.
Resultado final: el límite vale 1/2.`
      }
    },
    "mates2-analisis-9a1c32d36498--mates-ii-analisis-2": {
      "a)": {
        options: [
          "Máximo relativo en (-1,2) y mínimo relativo en (1,0)",
          "Mínimo relativo en (-1,2) y máximo relativo en (1,0)",
          "Máximo relativo en (0,1) y no tiene mínimo",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. Derivamos con la regla del cociente:
f'(x)=[(2x-2)(x²+1)-2x(x²-2x+1)]/(x²+1)²
=2(x²-1)/(x²+1)².
2. Como el denominador es siempre positivo, f'(x)=0 cuando:
x²-1=0 ⟹ x=-1 o x=1.
3. Estudiamos el signo de f' en la recta real:
(-∞,-1): tomamos x=-2 y f'(-2)>0  ↗
(-1,1): tomamos x=0 y f'(0)<0  ↘
(1,∞): tomamos x=2 y f'(2)>0  ↗
4. En x=-1 el signo cambia de positivo a negativo: hay un máximo relativo.
En x=1 cambia de negativo a positivo: hay un mínimo relativo.
5. Calculamos las ordenadas:
f(-1)=2 y f(1)=0.
Resultado final: máximo relativo en (-1,2) y mínimo relativo en (1,0).`
      },
      "b)": {
        options: [
          "Tangente: y=-2x+1; normal: y=x/2+1",
          "Tangente: y=2x+1; normal: y=-x/2+1",
          "Tangente: y=-2x; normal: y=x/2",
          "Tangente: y=x+1; normal: y=-x+1"
        ],
        correct: 0,
        solution: `Resolución:
1. El punto de tangencia es P=(0,f(0))=(0,1).
2. De la derivada
f'(x)=2(x²-1)/(x²+1)²
obtenemos f'(0)=-2.
3. Recta tangente:
y-1=-2(x-0) ⟹ y=-2x+1.
4. La pendiente mₙ de la normal cumple:
(-2)·mₙ=-1 ⟹ mₙ=1/2.
5. Recta normal:
y-1=(1/2)(x-0) ⟹ y=x/2+1.
Resultado final: tangente y=-2x+1 y normal y=x/2+1.`
      }
    },
    "mates2-analisis-9a1c32d36498--mates-ii-analisis-3": {
      "b)": {
        options: ["71/6 unidades cuadradas", "32/3 unidades cuadradas", "45/4 unidades cuadradas", "7/12 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
1. Factorizamos:
g(x)=-x³+2x²+3x=-x(x-3)(x+1).
Los cortes con el eje OX son x=-1, x=0 y x=3.
2. En la gráfica, g(x)<0 en [-1,0] y g(x)>0 en [0,3]. Por ello el área se calcula cambiando el signo del primer tramo:
A=-∫[-1,0](-x³+2x²+3x) dx+∫[0,3](-x³+2x²+3x) dx.
3. Una primitiva es:
G(x)=-x⁴/4+(2x³)/3+(3x²)/2.
4. Aplicamos la regla de Barrow:
-[G(x)] de -1 a 0=7/12,
[G(x)] de 0 a 3=45/4.
5. Sumamos:
A=7/12+45/4=7/12+135/12=142/12=71/6.
Resultado final: el área es 71/6 unidades cuadradas.`
      }
    },
    "mates2-analisis-9ff8a18eebbc": {
      "b)": {
        options: [
          "Tiene discontinuidades de salto finito en x=1 y en x=2",
          "Es continua en x=1 y en x=2",
          "Tiene una discontinuidad infinita en x=1 y es continua en x=2",
          "Es continua en x=1 y tiene una discontinuidad evitable en x=2"
        ],
        correct: 0,
        solution: `Resolución:
1. En x=1:
lim(x→1⁻) 2^(x-1)=1 y f(1)=1,
lim(x→1⁺) (x-2)=-1.
Como los límites laterales son finitos pero distintos, hay una discontinuidad de salto finito.
2. En x=2:
lim(x→2⁻) (x-2)=0,
lim(x→2⁺) ln(x)=ln 2 y f(2)=ln 2.
Los límites laterales vuelven a ser finitos y distintos, por lo que también hay una discontinuidad de salto finito.
Resultado final: f presenta discontinuidades de salto finito en x=1 y x=2.`
      }
    },
    "mates2-analisis-9ff8a18eebbc--mates-ii-analisis-2": {
      "b)": {
        options: ["y=3x-2", "y=2x-1", "y=3x+2", "y=x"],
        correct: 0,
        solution: `Resolución:
1. f(x)=x²+x-1, luego f(1)=1. El punto es P=(1,1).
2. Derivamos:
f'(x)=2x+1.
3. La pendiente en x=1 es:
m=f'(1)=3.
4. Aplicamos la ecuación punto-pendiente:
y-1=3(x-1) ⟹ y=3x-2.
Resultado final: la recta tangente es y=3x-2.`
      }
    },
    "mates2-analisis-9ff8a18eebbc--mates-ii-analisis-3": {
      "b)": {
        options: ["9/2 unidades cuadradas", "3 unidades cuadradas", "11/2 unidades cuadradas", "9 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
1. Igualamos las dos funciones para hallar los puntos de corte:
-x²+2x+4=x+2
⟹ -x²+x+2=0
⟹ (x+1)(x-2)=0.
Por tanto, x=-1 y x=2.
2. En la gráfica se observa, y se comprueba tomando x=0, que f(x)=-x²+2x+4 queda por encima de g(x)=x+2 entre -1 y 2.
3. El área es:
A=∫[-1,2] [f(x)-g(x)] dx
=∫[-1,2] (-x²+x+2) dx.
4. Una primitiva es:
-x³/3+x²/2+2x.
5. Aplicamos la regla de Barrow:
A=[-x³/3+x²/2+2x] de -1 a 2=9/2.
Resultado final: el área es 9/2 unidades cuadradas.`
      }
    }
  });
})();

// Matemáticas II · Geometría · 2020.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-geometria-a46ba1ed330c": {
      "a)": {
        options: ["30°", "45°", "60°", "90°"],
        correct: 0,
        solution: `Resolución:
1. Un vector normal de π₁ es n₁=(2,1,1).
2. Dos vectores directores de π₂ son u=(1,-1,2) y v=(-1,1,0).
Su producto vectorial es:
u×v=(-2,-2,0),
por lo que podemos tomar n₂=(1,1,0).
3. Aplicamos la fórmula del ángulo entre planos:
cos α=|n₁·n₂|/(|n₁|·|n₂|)
=3/(√6·√2)=√3/2.
4. Por tanto, α=30°.
Resultado final: los planos forman un ángulo de 30°.`
      },
      "b)": {
        options: ["1 unidad cúbica", "2 unidades cúbicas", "1/2 unidad cúbica", "6 unidades cúbicas"],
        correct: 0,
        solution: `Resolución:
1. El plano π₁: 2x+y+z-2=0 corta a los ejes en:
A=(1,0,0), B=(0,2,0), C=(0,0,2).
2. Tomamos como vectores con origen en A:
AB=(-1,2,0), AC=(-1,0,2), AP=(2,-3,2).
3. El volumen del tetraedro es:
V=|det(AB,AC,AP)|/6.
4. Calculamos:
AB×AC=(4,2,2),
(AB×AC)·AP=4·2+2·(-3)+2·2=6.
5. Por tanto:
V=|6|/6=1.
Resultado final: el volumen es 1 unidad cúbica.`
      }
    },
    "mates2-geometria-a46ba1ed330c--mates-ii-geometria-2": {
      "a)": {
        options: ["a=0 y b=0", "a=0 y b=3", "a=1 y b=0", "a=-1 y b=2"],
        correct: 0,
        solution: `Resolución:
1. El plano π pasa por P₀=(-1,1,1) y tiene como vectores directores:
u=(0,1,2), v=(1,a,-1).
Un vector normal es:
n=u×v=(-1-2a,2,-1).
2. La recta s puede parametrizarse tomando y=t:
s: (x,y,z)=(1-b,0,-3)+t(2,1,0).
3. Para que s esté contenida en π, su vector director debe ser paralelo al plano:
n·(2,1,0)=2(-1-2a)+2=-4a=0,
de donde a=0.
4. Con a=0, el plano tiene ecuación:
-x+2y-z-2=0.
5. Imponemos que el punto (1-b,0,-3) de s pertenezca al plano:
-(1-b)+2·0-(-3)-2=0
⟹ b=0.
Resultado final: a=0 y b=0.`
      },
      "b)": {
        options: [
          "r≡{2x+y-1=0; 5x+z+3=0}",
          "r≡{x-2y-1=0; z+3=0}",
          "r≡{x+y=0; 2x-z=0}",
          "r≡{2x-y+1=0; 5x-z-3=0}"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=0, un vector normal del plano π es n=(-1,2,-1).
2. Para b=3, la recta s es:
s≡{x-2y=-2; z=-3},
y tiene vector director dₛ=(2,1,0).
3. La recta r debe ser paralela a π y perpendicular a s. Por tanto, su vector director ha de ser perpendicular tanto a n como a dₛ:
dᵣ=n×dₛ=(1,-2,-5).
4. Como pasa por P=(1,-1,-8), su forma paramétrica es:
r: {x=1+t; y=-1-2t; z=-8-5t}.
5. Eliminamos el parámetro:
t=x-1,
y=-1-2(x-1)=1-2x,
z=-8-5(x-1)=-3-5x.
Resultado final:
r≡{2x+y-1=0; 5x+z+3=0}.`
      }
    },
    "mates2-geometria-1d4f93ec7386": {
      "a)": {
        options: ["√6/3", "2√6", "√6/2", "2/3"],
        correct: 0,
        solution: `Resolución:
1. El plano es π: x+2y-z-4=0 y P=(1,2,-1).
2. Aplicamos la fórmula de la distancia de un punto a un plano:
d(P,π)=|1+2·2-(-1)-4|/√(1²+2²+(-1)²).
3. Simplificamos:
d(P,π)=2/√6=√6/3.
Resultado final: d(P,π)=√6/3.`
      },
      "b)": {
        options: ["√83/2 unidades cuadradas", "√83 unidades cuadradas", "83/2 unidades cuadradas", "7√2/2 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
1. Parametrizamos la recta r:
y=t, x=2t+2, z=t-2,
es decir, r: (x,y,z)=(2,0,-2)+t(2,1,1).
2. Sustituimos en el plano π:
(2t+2)+2t-(t-2)-4=0
⟹ 3t=0
⟹ t=0.
El punto de intersección es A=(2,0,-2).
3. Formamos dos lados del triángulo:
AB=B-A=(-1,-1,4),
AC=C-A=(-2,1,3).
4. Calculamos el producto vectorial:
AB×AC=(-7,-5,-3).
5. El área del triángulo es:
Área=|AB×AC|/2
=√(49+25+9)/2
=√83/2.
Resultado final: el área es √83/2 unidades cuadradas.`
      }
    },
    "mates2-geometria-1d4f93ec7386--mates-ii-geometria-2": {
      "a)": {
        options: ["Las rectas se cruzan", "Las rectas se cortan", "Las rectas son paralelas", "Las rectas coinciden"],
        correct: 0,
        solution: `Resolución:
1. Parametrizamos r:
r: (x,y,z)=(2,0,0)+t(1,1,0).
2. La recta s ya tiene como punto S=(0,-2,1) y vector director dₛ=(3,-2,1).
Los vectores dᵣ=(1,1,0) y dₛ no son proporcionales, por lo que las rectas no son paralelas.
3. Comprobamos si son coplanarias mediante el producto mixto. Tomamos:
PS=S-(2,0,0)=(-2,-2,1),
dᵣ×dₛ=(1,-1,-5).
4. Entonces:
PS·(dᵣ×dₛ)=(-2,-2,1)·(1,-1,-5)=-5≠0.
No son coplanarias y, por tanto, no se cortan.
Resultado final: r y s son rectas que se cruzan.`
      },
      "b)": {
        options: ["x-y-5z+11=0", "x+y-5z+11=0", "x-y+5z-9=0", "3x-2y+z+1=0"],
        correct: 0,
        solution: `Resolución:
1. El plano pedido debe ser paralelo a los vectores directores:
dᵣ=(1,1,0), dₛ=(3,-2,1).
2. Un vector normal del plano es:
n=dᵣ×dₛ=(1,-1,-5).
3. Como el plano pasa por P=(-1,0,2), usamos la ecuación punto-normal:
1·(x+1)-1·(y-0)-5·(z-2)=0.
4. Simplificamos:
x+1-y-5z+10=0.
Resultado final: x-y-5z+11=0.`
      }
    }
  });
})();

// Matemáticas II · Probabilidad y Estadística · 2020.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-probabilidad-estadistica-8b1a39769801": {
      "a.1)": {
        options: ["0,025", "0,030", "0,018", "0,975"],
        correct: 0,
        solution: `Resolución:
1. Aplicamos el teorema de la probabilidad total:
P(F)=P(R)P(F|R)+P(N)P(F|N)+P(A)P(F|A).
2. Sustituimos:
P(F)=0,6·0,03+0,3·0,02+0,1·0,01
=0,018+0,006+0,001=0,025.
Resultado final: la probabilidad de falsa alarma es 0,025, es decir, un 2,5 %.`
      },
      "a.2)": {
        options: ["131/325≈0,4031", "0,4000", "0,3930", "0,9750"],
        correct: 0,
        solution: `Resolución:
1. Sea F el suceso «falsa alarma». Queremos:
P(R∪N | F̄)=P((R∪N)∩F̄)/P(F̄).
2. Del apartado anterior:
P(F̄)=1-0,025=0,975.
3. Calculamos el numerador:
P((R∪N)∩F̄)=0,1·0,99+0,3·0,98
=0,099+0,294=0,393.
4. Por tanto:
P(R∪N | F̄)=0,393/0,975=131/325≈0,4031.
Resultado final: la probabilidad es 131/325≈0,4031.`
      },
      "b.1)": {
        options: ["0,4628", "0,5372", "0,1960", "0,7000"],
        correct: 0,
        solution: `Resolución:
1. La probabilidad de que un aviso sea naranja es p=0,3. Si X es el número de avisos naranjas entre 9:
X~B(9,0,3).
2. Se pide:
P(X≤2)=P(X=0)+P(X=1)+P(X=2).
3. Aplicamos la fórmula binomial:
P(X≤2)=C(9,0)0,3⁰0,7⁹+C(9,1)0,3¹0,7⁸+C(9,2)0,3²0,7⁷.
4. Calculamos:
P(X≤2)=0,040353607+0,155649627+0,266827932
=0,462831166.
Resultado final: P(X≤2)≈0,4628.`
      },
      "b.2)": {
        options: ["0,9⁹≈0,3874", "0,7⁹≈0,0404", "0,4⁹≈0,0003", "0,6⁹≈0,0101"],
        correct: 0,
        solution: `Resolución:
1. Un aviso es amarillo o naranja con probabilidad:
p=0,6+0,3=0,9.
2. Los 9 avisos son independientes. Por tanto:
P(todos amarillos o naranjas)=0,9⁹.
3. Calculamos:
0,9⁹=0,387420489.
Resultado final: la probabilidad es aproximadamente 0,3874.`
      }
    },
    "mates2-probabilidad-estadistica-a69daf6724e0": {
      "a.1)": {
        options: ["0,209", "0,791", "0,195", "0,150"],
        correct: 0,
        solution: `Resolución:
1. Aplicamos el teorema de la probabilidad total a los tres grupos de edad:
P(no diario)=0,7·0,02+0,25·0,60+0,05·0,90.
2. Calculamos:
P(no diario)=0,014+0,150+0,045=0,209.
Resultado final: la probabilidad es 0,209, es decir, un 20,9 %.`
      },
      "a.2)": {
        options: ["100/791≈0,1264", "0,1000", "0,2500", "0,4000"],
        correct: 0,
        solution: `Resolución:
1. Sea M el grupo de 34 a 54 años y D el suceso «accede diariamente». Se pide P(M|D).
2. La probabilidad de acceso diario es:
P(D)=1-0,209=0,791.
3. La probabilidad conjunta es:
P(M∩D)=0,25·0,40=0,10.
4. Aplicamos Bayes:
P(M|D)=P(M∩D)/P(D)=0,10/0,791=100/791≈0,1264.
Resultado final: la probabilidad es aproximadamente 0,1264.`
      },
      "b.1)": {
        options: ["0,9893", "0,0107", "0,9772", "0,5000"],
        correct: 0,
        solution: `Resolución:
1. X sigue una distribución normal N(53,10). Tipificamos dentro de la probabilidad:
P(X>30)=P((X-53)/10>(30-53)/10)
=P(Z>-2,3).
2. Por simetría:
P(Z>-2,3)=P(Z<2,3).
3. Buscamos 2,3 en la tabla de la normal típica:
P(Z<2,3)=0,9893.
Resultado final: la probabilidad es 0,9893.`
      },
      "b.2)": {
        options: ["82,24 %", "8,224 %", "91,92 %", "72,56 %"],
        correct: 0,
        solution: `Resolución:
1. Tipificamos dentro de la probabilidad:
P(40<X<67)
=P((40-53)/10<Z<(67-53)/10)
=P(-1,3<Z<1,4).
2. Escribimos la diferencia:
P(-1,3<Z<1,4)=P(Z<1,4)-P(Z<-1,3).
3. La tabla da P(Z<1,4)=0,9192. Por simetría:
P(Z<-1,3)=1-P(Z<1,3)=1-0,9032=0,0968.
4. Restamos:
0,9192-0,0968=0,8224.
5. Expresado en porcentaje:
0,8224·100=82,24 %.
Resultado final: el 82,24 % de los usuarios se conecta entre 40 y 67 minutos al día.`
      }
    }
  });
})();
