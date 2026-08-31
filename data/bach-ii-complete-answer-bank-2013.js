(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });

  const copy = (value) => JSON.parse(JSON.stringify(value || []));
  const makePart = (label, paragraphs) => ({ label, paragraphs });
  const paragraph = (plain, html = plain) => ({ plain, html });
  const matesBlock = (block) => window.MATES_II_BLOCK_EXERCISES?.[block] || [];
  const ccssBlock = (block) => window.CCSS_II_BLOCK_EXERCISES?.[block] || [];

  // En el documento oficial, el apartado a) de estos ejercicios quedó en el
  // enunciado común. Lo incorporamos como apartado independiente para que
  // pueda recibir sus propias opciones y puntuación.
  for (const id of [
    "mates2-algebra-f4438bfbf654",
    "mates2-algebra-03e5d3d3a941",
    "mates2-algebra-2e3f0085a835",
    "mates2-algebra-a62afb864f05",
    "mates2-algebra-f5b9eeccd1b4",
    "mates2-algebra-51e68bb42944",
  ]) {
    const exercise = matesBlock("algebra").find((item) => item.id === id);
    if (exercise && exercise.parts?.length === 1 && exercise.parts[0].label === "b)") {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  // En varios ejercicios oficiales de Geometría de 2013 el apartado a)
  // quedó importado dentro del enunciado general. Lo separamos para que
  // cuente como pregunta evaluable independiente.
  for (const id of [
    "mates2-geometria-cd96b12b2c75",
    "mates2-geometria-00844fb8a439",
    "mates2-geometria-b8b610e99f84",
    "mates2-geometria-0703d5c00c0c",
    "mates2-geometria-9defc32792ad",
  ]) {
    const exercise = matesBlock("geometria").find((item) => item.id === id);
    if (exercise && exercise.parts?.length === 1 && exercise.parts[0].label === "b)") {
      exercise.parts.unshift(makePart("a)", copy(exercise.statement)));
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-f4438bfbf654": {
      "a)": answer(
        "A=pmatrix{1&3/2\\1&5/2} y B=pmatrix{0&−3/2\\−1&−3/2}",
        [
          "A=pmatrix{1&2\\3&4} y B=I",
          "A=pmatrix{0&−3/2\\−1&−3/2} y B=pmatrix{1&3/2\\1&5/2}",
          "A=B=I/2",
        ],
        `Las condiciones son A+B=I y A−B=Cᵗ.
Sumamos las dos ecuaciones matriciales:
2A=I+Cᵗ ⇒ A=(I+Cᵗ)/2.
Como Cᵗ=pmatrix{1&3\\2&4},
A=1/2·pmatrix{2&3\\2&5}=pmatrix{1&3/2\\1&5/2}.
Restamos la segunda ecuación de la primera:
2B=I−Cᵗ ⇒ B=(I−Cᵗ)/2=pmatrix{0&−3/2\\−1&−3/2}.
La comprobación da A+B=I y A−B=Cᵗ.`
      ),
      "b)": answer(
        "|M²|=49 y |2M|=28",
        ["|M²|=14 y |2M|=14", "|M²|=49 y |2M|=14", "|M²|=7 y |2M|=28"],
        `Usamos |AB|=|A|·|B|:
|M²|=|M|²=7²=49.
Como M es de orden 2, al multiplicar toda la matriz por 2 el determinante queda multiplicado por 2²:
|2M|=2²|M|=4·7=28.`
      ),
    },

    "mates2-algebra-03e5d3d3a941": {
      "a)": answer(
        "Los dos determinantes valen 10 y 2",
        ["5 y 4", "10 y −2", "2 y 10"],
        `Llamamos r₁=(1,1,1), r₂=(a,b,c) y r₃=(a²,b²,c²), con |r₁,r₂,r₃|=2.
Primer determinante:
|r₂−r₁, r₃−r₁, 5r₁|
=5|r₂−r₁,r₃−r₁,r₁|.
Por multilinealidad, los términos con dos filas r₁ se anulan y queda
5|r₂,r₃,r₁|.
La permutación (r₁,r₂,r₃)→(r₂,r₃,r₁) es cíclica y no cambia el signo:
5·2=10.
Segundo determinante:
la primera fila es r₃+2r₂+r₁. Al desarrollar por linealidad frente a las filas r₂ y r₃, solo sobrevive r₁:
|r₃+2r₂+r₁,r₂,r₃|=|r₁,r₂,r₃|=2.`
      ),
      "b)": answer(
        "a, b y c son distintos dos a dos",
        ["a=b=c", "Solo a debe ser distinto de b", "Pueden coincidir dos de ellos"],
        `El determinante dado tiene como columnas
(1,a,a²)ᵗ, (1,b,b²)ᵗ y (1,c,c²)ᵗ.
Si dos parámetros fueran iguales, por ejemplo a=b, las dos primeras columnas serían iguales y el determinante valdría 0.
Pero el enunciado afirma que el determinante vale 2≠0. Por tanto, no puede coincidir ningún par: a, b y c son distintos dos a dos.`
      ),
    },

    "mates2-algebra-2e3f0085a835": {
      "a)": answer(
        "X=B(A−2I)⁻¹",
        ["X=(A−2I)⁻¹B", "X=B(A+2I)⁻¹", "X=A⁻¹(B+2I)"],
        `Partimos de XA−B=2X.
Pasamos los términos que contienen X al mismo miembro:
XA−2X=B.
Sacamos X como factor común por la derecha:
X(A−2I)=B.
Multiplicamos por (A−2I)⁻¹ también por la derecha:
X(A−2I)(A−2I)⁻¹=B(A−2I)⁻¹.
Así, X=B(A−2I)⁻¹, siempre que A−2I sea invertible. El orden de los factores no se puede cambiar.`
      ),
      "b)": answer(
        "X=pmatrix{−2&1&0\\−4&4&−2\\11&−7&3}",
        [
          "X=pmatrix{1&0&0\\−2&1&0\\3&−2&1}",
          "X=pmatrix{−2&−4&11\\1&4&−7\\0&−2&3}",
          "X=pmatrix{2&−1&0\\4&−4&2\\−11&7&−3}",
        ],
        `Calculamos A−2I:
A−2I=pmatrix{1&0&0\\2&1&0\\1&2&1}.
Su determinante vale 1, por lo que tiene inversa. Mediante determinantes,
(A−2I)⁻¹=pmatrix{1&0&0\\−2&1&0\\3&−2&1}.
Aplicamos el despeje del apartado anterior:
X=B(A−2I)⁻¹
=pmatrix{0&1&0\\2&0&−2\\0&−1&3}
pmatrix{1&0&0\\−2&1&0\\3&−2&1}
=pmatrix{−2&1&0\\−4&4&−2\\11&−7&3}.
Al sustituirla en XA−B=2X se verifica la igualdad.`
      ),
    },

    "mates2-algebra-a62afb864f05": {
      "a)": answer(
        "Si m=1 es compatible indeterminado; si m≠1 es incompatible",
        [
          "Compatible determinado para todo m",
          "Si m=1 es incompatible; si m≠1 es compatible determinado",
          "Compatible indeterminado para todo m",
        ],
        `Aplicamos Rouché–Frobenius. Las filas de la matriz de coeficientes cumplen
F₁−F₂+F₃=0, por lo que rango(A)=2.
Para que la misma relación se cumpla en los términos independientes debe verificarse
−1−(1−m)+m=0
⇒ −2+2m=0
⇒ m=1.
Si m=1, rango(A)=rango(A*)=2<3: sistema compatible indeterminado.
Si m≠1, rango(A)=2<rango(A*)=3: sistema incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=((8t−1)/3,(7t−2)/3,t), t∈ℝ",
        [
          "(x,y,z)=(t,t,t)",
          "(x,y,z)=((1−8t)/3,(2−7t)/3,t)",
          "(x,y,z)=(−1,0,0)",
        ],
        `Tomamos m=1, que es el caso compatible indeterminado:
system{x+y−5z=−1;2x−y−3z=0}.
Elegimos z=t. Sumando las ecuaciones:
3x−8t=−1 ⇒ x=(8t−1)/3.
En la primera:
y=−1+5t−x=(7t−2)/3.
Por tanto,
(x,y,z)=((8t−1)/3,(7t−2)/3,t), t∈ℝ.`
      ),
    },

    "mates2-algebra-f5b9eeccd1b4": {
      "a)": answer(
        "X=(A+2B)⁻¹",
        ["X=A⁻¹−2B⁻¹", "X=(A−2B)⁻¹", "X=(A+2B)"],
        `Partimos de AX=I₃−2BX.
Pasamos 2BX al primer miembro:
AX+2BX=I₃.
Sacamos X como factor común por la derecha:
(A+2B)X=I₃.
Multiplicamos por (A+2B)⁻¹ por la izquierda:
X=(A+2B)⁻¹.`
      ),
      "b)": answer(
        "X=pmatrix{3&−6&−1\\0&1&0\\−2&4&1}",
        [
          "X=pmatrix{1&2&1\\0&1&0\\2&0&3}",
          "X=pmatrix{3&0&−2\\−6&1&4\\−1&0&1}",
          "X=pmatrix{−3&6&1\\0&−1&0\\2&−4&−1}",
        ],
        `Primero sumamos:
A+2B=pmatrix{1&2&1\\0&1&0\\2&0&3}.
Su determinante vale 1, luego es invertible.
Usamos la fórmula
(A+2B)⁻¹=Adj((A+2B)ᵗ)/det(A+2B).
Calculando los adjuntos y trasponiendo se obtiene
X=(A+2B)⁻¹=pmatrix{3&−6&−1\\0&1&0\\−2&4&1}.
La comprobación (A+2B)X=I₃ confirma el resultado.`
      ),
    },

    "mates2-algebra-c2a05c3a7b4a": {
      "a)": answer(
        "No: al ser homogéneo siempre es compatible",
        ["Sí, para m=−1", "Sí, para m=1", "Es incompatible para todo m"],
        `El sistema es homogéneo porque todos los términos independientes son cero.
Todo sistema homogéneo tiene al menos la solución trivial x=y=z=0. Por tanto, nunca puede ser incompatible, cualquiera que sea m.`
      ),
      "b)": answer(
        "m=−1",
        ["m=0", "m=1", "No existe ningún valor"],
        `Una solución no trivial aparece cuando la matriz de coeficientes no es invertible.
Calculamos por Sarrus:
det(A)=2(m+1).
Igualamos a cero:
2(m+1)=0 ⇒ m=−1.
Para m=−1 el rango baja a 2 y el sistema homogéneo tiene infinitas soluciones, incluidas soluciones no triviales.`
      ),
      "c)": answer(
        "Si m≠−1: (0,0,0). Si m=−1: (x,y,z)=(−3t,5t,2t)",
        [
          "Para todo m: (0,0,0)",
          "Si m=−1 es incompatible",
          "Si m=1: (−3t,5t,2t)",
        ],
        `Si m≠−1, det(A)≠0 y el sistema homogéneo solo tiene la solución trivial:
(x,y,z)=(0,0,0).
Si m=−1, reducimos el sistema. De x+y−z=0 obtenemos x=−y+z. Al sustituir en la segunda ecuación:
2y−5z=0.
Tomamos z=2t; entonces y=5t y x=−3t.
Por tanto, para m=−1:
(x,y,z)=(−3t,5t,2t), t∈ℝ.`
      ),
    },

    "mates2-algebra-51e68bb42944": {
      "a)": answer(
        "Si m=6 es compatible determinado; si m≠6 es incompatible",
        [
          "Compatible determinado para todo m",
          "Si m=6 es compatible indeterminado",
          "Si m=6 es incompatible; si m≠6 es compatible",
        ],
        `Las tres primeras ecuaciones tienen una matriz de coeficientes de rango 3, así que determinan una única solución para cada m:
y=(m+6)/3, z=(12−m)/3, x=(57−2m)/9.
Imponemos que también satisfaga la cuarta ecuación:
2x+y−4z=(11m−12)/9=m.
Entonces 11m−12=9m ⇒ 2m=12 ⇒ m=6.
Para m=6 las cuatro ecuaciones son compatibles y la solución es única.
Para m≠6 la cuarta ecuación contradice las tres primeras y el sistema es incompatible.`
      ),
      "b)": answer(
        "(x,y,z)=(5,4,2)",
        ["(4,5,2)", "(5,2,4)", "(3,4,2)"],
        `El sistema es compatible determinado para m=6.
Sustituimos en las expresiones obtenidas:
y=(6+6)/3=4,
z=(12−6)/3=2,
x=(57−2·6)/9=45/9=5.
La solución es (x,y,z)=(5,4,2), que verifica las cuatro ecuaciones.`
      ),
    },

    "mates2-algebra-fbda0dadcbcd": {
      "Resultado": answer(
        "Galois 20 años, Abel 26 años y Ramanujan 32 años",
        [
          "Galois 26, Abel 20 y Ramanujan 32",
          "Galois 18, Abel 26 y Ramanujan 34",
          "Los tres tenían 26 años",
        ],
        `Sean G, A y R sus edades. Traducimos el enunciado:
system{G+A+R=78;(G+A+R)/3=A;4R+2A=9G}.
De la segunda ecuación y la primera:
A=78/3=26.
Entonces G+R=52. Sustituimos R=52−G en la tercera:
4(52−G)+2·26=9G
⇒ 260−4G=9G
⇒ 13G=260
⇒ G=20.
Finalmente, R=52−20=32.
Por tanto, Galois tenía 20 años, Abel 26 y Ramanujan 32.`
      ),
    },
  });

  // CIENCIAS SOCIALES II · ÁLGEBRA · 2013
  // Cada propuesta reúne dos ejercicios oficiales. Numeramos los apartados
  // para evitar etiquetas duplicadas y trasladamos el enunciado del ejercicio
  // 2 al primer apartado que realmente le corresponde.
  const ccss2013AlgebraLayout = {
    "ccss2-algebra-7662958a9e2f": { labels: ["1.a)", "1.b)", "1.c)", "2.a)", "2.b)"], from: 2, to: 3 },
    "ccss2-algebra-600bf225401b": { labels: ["1.a)", "1.b)", "2.a)", "2.b)"], from: 1, to: 2 },
    "ccss2-algebra-94f83eb83d44": { labels: ["1.a)", "1.b)", "2.a)", "2.b)"], from: 1, to: 2 },
    "ccss2-algebra-a808e31a0cce": { labels: ["1.a)", "1.b)", "1.c)", "2.a)", "2.b)"], from: 2, to: 3 },
    "ccss2-algebra-d9034fc3a7bc": { labels: ["1.a)", "1.b)", "1.c)", "2.a)", "2.b)"], from: 2, to: 3 },
    "ccss2-algebra-58d6598ec1d8": { labels: ["1.a)", "1.b)", "1.c)", "2.a)", "2.b)"], from: 2, to: 3 },
  };
  for (const [id, layout] of Object.entries(ccss2013AlgebraLayout)) {
    const exercise = ccssBlock("algebra").find((item) => item.id === id);
    if (!exercise) continue;
    const sourcePart = exercise.parts[layout.from];
    const targetPart = exercise.parts[layout.to];
    const splitAt = sourcePart?.paragraphs?.findIndex((item) => /^2\.\s/.test(item.plain || ""));
    if (splitAt >= 0) {
      const moved = sourcePart.paragraphs.splice(splitAt);
      targetPart.paragraphs = [...moved, ...(targetPart.paragraphs || [])];
    }
    exercise.parts.forEach((part, index) => {
      part.label = layout.labels[index];
    });
  }

  for (const [id, labels] of Object.entries({
    "ccss2-algebra-6c808d353827": ["1.a)", "1.b)", "2.a)", "2.b)"],
    "ccss2-algebra-6362c0ca2f53": ["1.a)", "1.b)", "2.a)", "2.b)"],
  })) {
    const exercise = ccssBlock("algebra").find((item) => item.id === id);
    if (!exercise) continue;
    if (exercise.parts.length === 3) {
      exercise.parts.unshift(makePart("1.a)", copy(exercise.statement)));
    }
    const sourcePart = exercise.parts[1];
    const targetPart = exercise.parts[2];
    const splitAt = sourcePart?.paragraphs?.findIndex((item) => /^2\.\s/.test(item.plain || ""));
    if (splitAt >= 0) {
      const moved = sourcePart.paragraphs.splice(splitAt);
      targetPart.paragraphs = [...moved, ...(targetPart.paragraphs || [])];
    }
    exercise.parts.forEach((part, index) => {
      part.label = labels[index];
    });
  }

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-7662958a9e2f": {
      "1.a)": answer(
        "Región del primer cuadrante situada por encima de y=x−1 y por debajo de y=2−x",
        ["Región situada por debajo de y=x−1 y de y=2−x", "Región del primer cuadrante situada por encima de ambas rectas", "La región factible es vacía"],
        `Escribimos las restricciones despejando y:
x−y≤1 ⇒ y≥x−1,
x+y≤2 ⇒ y≤2−x,
x≥0, y≥0.
Por tanto, se representa la zona del primer cuadrante que queda por encima de y=x−1 y por debajo de y=2−x.`
      ),
      "1.b)": answer(
        "(0,0), (1,0), (3/2,1/2) y (0,2)",
        ["(0,0), (2,0) y (0,2)", "(0,0), (1,0), (1,1) y (0,2)", "(0,0), (3/2,0), (3/2,1/2) y (0,2)"],
        `Calculamos los cortes que delimitan la región.
Con y=0, la recta x−y=1 da (1,0).
Con x=0, la recta x+y=2 da (0,2).
Las dos rectas se cortan resolviendo:
system{x−y=1;x+y=2}.
Sumando: 2x=3 ⇒ x=3/2, y=1/2.
Junto con el origen, los vértices son (0,0), (1,0), (3/2,1/2) y (0,2).`
      ),
      "1.c)": answer(
        "La solución óptima es (3/2,1/2) y el valor máximo es z=7/2",
        ["La solución óptima es (1,0) y z=2", "La solución óptima es (0,2) y z=2", "La solución óptima es (0,0) y z=0"],
        `Evaluamos z=2x+y en todos los vértices:
z(0,0)=0,
z(1,0)=2,
z(3/2,1/2)=2·3/2+1/2=7/2,
z(0,2)=2.
El mayor valor es 7/2 y se alcanza en (3/2,1/2).`
      ),
      "2.a)": answer(
        "system{c+b+g=380;10c+5b+7g=2980;c=2g}",
        ["system{c+b+g=2980;10c+5b+7g=380;c=2b}", "system{c+b+g=380;10c+5b+7g=2980;g=2c}", "system{c+b+g=380;5c+10b+7g=2980;c=2g}"],
        `Sean c, b y g las cantidades de camisetas, bufandas y gorras.
El total de prendas proporciona c+b+g=380.
La recaudación proporciona 10c+5b+7g=2980.
Como se vendieron el doble de camisetas que de gorras, c=2g.
Así se obtiene el sistema indicado.`
      ),
      "2.b)": answer(
        "180 camisetas, 110 bufandas y 90 gorras",
        ["180 camisetas, 90 bufandas y 110 gorras", "90 camisetas, 110 bufandas y 180 gorras", "160 camisetas, 130 bufandas y 90 gorras"],
        `Partimos de system{c+b+g=380;10c+5b+7g=2980;c=2g}.
Sustituimos c=2g en la primera ecuación:
b=380−3g.
En la ecuación del dinero:
10(2g)+5(380−3g)+7g=2980
⇒ 20g+1900−15g+7g=2980
⇒ 12g=1080
⇒ g=90.
Entonces c=180 y b=380−180−90=110.
Comprobación: 180+110+90=380 y 10·180+5·110+7·90=2980.`
      ),
    },

    "ccss2-algebra-600bf225401b": {
      "1.a)": answer(
        "M=pmatrix{4&−4&1\\5&11&5\\2&−1&5}",
        ["M=pmatrix{1&−4&1\\5&8&5\\2&−1&2}", "M=pmatrix{4&4&1\\5&11&5\\2&1&5}", "M=pmatrix{3&−3&3\\3&9&3\\3&0&3}"],
        `Calculamos A² multiplicando fila por columna:
A²=pmatrix{1&−4&1\\5&8&5\\2&−1&2}.
Como 3I=pmatrix{3&0&0\\0&3&0\\0&0&3}, sumamos:
M=3I+A²=pmatrix{4&−4&1\\5&11&5\\2&−1&5}.`
      ),
      "1.b)": answer(
        "X=pmatrix{0&1/5\\1&1/5}",
        ["X=pmatrix{0&1\\1/5&1/5}", "X=pmatrix{−1&1\\5&0}", "X=pmatrix{0&−1/5\\−1&−1/5}"],
        `De X·B=I se deduce X=B⁻¹.
Para B=pmatrix{−1&1\\5&0}:
det(B)=(−1)·0−1·5=−5≠0.
Aplicamos la fórmula:
B⁻¹=1/−5·pmatrix{0&−1\\−5&−1}
=pmatrix{0&1/5\\1&1/5}.
La multiplicación X·B da la identidad.`
      ),
      "2.a)": answer(
        "system{2m+3p+e=9;6m+4p+6e=28;8m+6p+6e=34}",
        ["system{2m+6p+8e=9;3m+4p+6e=28;m+6p+6e=34}", "system{2m+3p+e=28;6m+4p+6e=34;8m+6p+6e=9}", "system{m+p+e=9;6m+4p+6e=28;8m+6p+6e=34}"],
        `Sean m, p y e las bicicletas de montaña, paseo y estáticas.
Leyendo por filas la tabla:
acero: 2m+3p+e=9;
aluminio: 6m+4p+6e=28;
fibra de carbono: 8m+6p+6e=34.
Estas tres ecuaciones forman el sistema.`
      ),
      "2.b)": answer(
        "2 bicicletas de montaña, 1 de paseo y 2 estáticas",
        ["1 bicicleta de montaña, 2 de paseo y 2 estáticas", "2 bicicletas de montaña, 2 de paseo y 1 estática", "3 bicicletas de montaña, 1 de paseo y ninguna estática"],
        `Resolvemos system{2m+3p+e=9;6m+4p+6e=28;8m+6p+6e=34}.
Simplificamos la segunda ecuación entre 2: 3m+2p+3e=14.
Restamos tres veces la primera a la tercera:
(8m+6p+6e)−3(2m+3p+e)=34−27
⇒ 2m−3p+3e=7.
Al resolver el sistema reducido se obtiene p=1, m=2 y e=2.
Comprobación: 2·2+3·1+2=9, 6·2+4·1+6·2=28 y 8·2+6·1+6·2=34.`
      ),
    },

    "ccss2-algebra-94f83eb83d44": {
      "1.a)": answer(
        "M=pmatrix{4&2&6\\−4&13&3\\1&1&20}",
        ["M=pmatrix{1&2&6\\−4&10&3\\1&1&17}", "M=pmatrix{4&−2&6\\4&13&3\\1&1&20}", "M=pmatrix{2&0&4\\2&−6&2\\0&2&8}"],
        `Multiplicamos A por A:
A²=pmatrix{1&2&6\\−4&10&3\\1&1&17}.
Sumamos 3 a cada elemento de la diagonal:
M=3I+A²=pmatrix{4&2&6\\−4&13&3\\1&1&20}.`
      ),
      "1.b)": answer(
        "X=pmatrix{0&1\\1&3}",
        ["X=pmatrix{−3&1\\1&0}", "X=pmatrix{0&−1\\−1&−3}", "X=pmatrix{3&−1\\−1&0}"],
        `Como X·B=I, X=B⁻¹.
B=pmatrix{−3&1\\1&0}, det(B)=−1.
B⁻¹=1/−1·pmatrix{0&−1\\−1&−3}
=pmatrix{0&1\\1&3}.`
      ),
      "2.a)": answer(
        "system{3c+2a+4b=29;4a+6b=38;5c+3a=39}",
        ["system{3c+2a+4b=38;4a+6b=29;5c+3a=39}", "system{3c+2a+4b=29;4c+6b=38;5c+3b=39}", "system{c+a+b=29;4a+6b=38;5c+3a=39}"],
        `Sean c, a y b los precios de un cuaderno, una carpeta y un bolígrafo.
La compra de Luis da 3c+2a+4b=29.
La de Carmen da 4a+6b=38.
La de Pedro da 5c+3a=39.
Estas ecuaciones forman el sistema pedido.`
      ),
      "2.b)": answer(
        "Cuaderno: 3 €; carpeta: 8 €; bolígrafo: 1 €",
        ["Cuaderno: 8 €; carpeta: 3 €; bolígrafo: 1 €", "Cuaderno: 3 €; carpeta: 1 €; bolígrafo: 8 €", "Cuaderno: 2 €; carpeta: 8 €; bolígrafo: 2 €"],
        `Resolvemos system{3c+2a+4b=29;4a+6b=38;5c+3a=39}.
De 4a+6b=38 obtenemos 2a+3b=19.
La eliminación de c entre la primera y la tercera, junto con esta ecuación, conduce a b=1.
Entonces 2a+3=19 ⇒ a=8.
Finalmente 5c+3·8=39 ⇒ 5c=15 ⇒ c=3.
Comprobación: 3·3+2·8+4·1=29.`
      ),
    },

    "ccss2-algebra-a808e31a0cce": {
      "1.a)": answer(
        "Maximizar z=50x+30y sujeto a 3x+5y≤160, 2x+y≤60, x≥0, y≥0",
        ["Maximizar z=30x+50y sujeto a 3x+5y≤60 y 2x+y≤160", "Minimizar z=50x+30y con las mismas restricciones", "Maximizar z=x+y sujeto a 50x+30y≤160"],
        `Sean x los lotes A e y los lotes B.
Cada lote A consume 3 kg de arroz y 2 tarros; cada lote B, 5 kg y 1 tarro.
Por tanto:
3x+5y≤160,
2x+y≤60,
x≥0, y≥0.
El ingreso que se desea maximizar es z=50x+30y.`
      ),
      "1.b)": answer(
        "Los vértices son (0,0), (30,0), (20,20) y (0,30)",
        ["(0,0), (60,0), (20,20) y (0,32)", "(0,0), (30,0), (10,20) y (0,30)", "(0,0), (20,0), (20,30) y (0,30)"],
        `Los cortes con los ejes que cumplen ambas restricciones son (30,0) y (0,30).
Calculamos el cruce de las rectas:
system{3x+5y=160;2x+y=60}.
De y=60−2x:
3x+5(60−2x)=160
⇒ −7x=−140
⇒ x=20, y=20.
Así, los vértices son (0,0), (30,0), (20,20) y (0,30).`
      ),
      "1.c)": answer(
        "20 lotes A y 20 lotes B; ingreso máximo 1600 €",
        ["30 lotes A y ninguno B; 1500 €", "Ningún lote A y 30 lotes B; 900 €", "10 lotes A y 20 lotes B; 1100 €"],
        `Evaluamos z=50x+30y:
z(0,0)=0,
z(30,0)=1500,
z(20,20)=1000+600=1600,
z(0,30)=900.
El máximo es 1600 €, preparando 20 lotes de cada tipo.`
      ),
      "2.a)": answer(
        "system{a+l+t=180;a+t=l;l=3a}",
        ["system{a+l+t=180;a+l=t;t=3a}", "system{a+l+t=180;a+t=l;a=3l}", "system{a+l+t=180;a+t=l;l=3t}"],
        `Sean a, l y t los importes de agua, luz y teléfono.
El total es a+l+t=180.
Agua y teléfono suman lo mismo que la luz: a+t=l.
La luz triplica al agua: l=3a.
Estas son las tres ecuaciones del sistema.`
      ),
      "2.b)": answer(
        "Agua: 30 €; luz: 90 €; teléfono: 60 €",
        ["Agua: 60 €; luz: 90 €; teléfono: 30 €", "Agua: 30 €; luz: 60 €; teléfono: 90 €", "Agua: 45 €; luz: 90 €; teléfono: 45 €"],
        `Resolvemos system{a+l+t=180;a+t=l;l=3a}.
Como a+t=l, la primera ecuación queda l+l=180, luego l=90.
De l=3a: a=30.
De a+t=l: 30+t=90, luego t=60.
La suma 30+90+60 confirma los 180 €.`
      ),
    },

    "ccss2-algebra-6c808d353827": {
      "1.a)": answer(
        "X=(B−3I)(A−2I)⁻¹",
        ["X=(A−2I)⁻¹(B−3I)", "X=(B+3I)(A+2I)⁻¹", "X=B−3I−A+2I"],
        `Partimos de 3I−2X+XA=B.
Pasamos 3I al segundo miembro:
−2X+XA=B−3I.
Sacamos factor común X por la izquierda:
X(A−2I)=B−3I.
Multiplicamos a la derecha por (A−2I)⁻¹:
X=(B−3I)(A−2I)⁻¹.`
      ),
      "1.b)": answer(
        "X=pmatrix{1/2&0\\−5/6&−1/3}",
        ["X=pmatrix{2&0\\−5&−3}", "X=pmatrix{−1/2&0\\5/6&1/3}", "X=pmatrix{1/2&−5/6\\0&−1/3}"],
        `De A·X=I se deduce X=A⁻¹.
A=pmatrix{2&0\\−5&−3}, det(A)=2(−3)−0=−6.
A⁻¹=1/−6·pmatrix{−3&0\\5&2}
=pmatrix{1/2&0\\−5/6&−1/3}.
La comprobación A·X=I verifica el resultado.`
      ),
      "2.a)": answer(
        "system{a+c+t=24;a=c+t;c=3t}",
        ["system{a+c+t=24;a+c=t;c=3t}", "system{a+c+t=24;a=c+t;t=3c}", "system{a+c+t=24;c=a+t;c=3t}"],
        `Sean a, c y t los empleados de Albacete, Cuenca y Toledo.
El total da a+c+t=24.
Albacete reúne tantos como Cuenca y Toledo: a=c+t.
Cuenca triplica a Toledo: c=3t.`
      ),
      "2.b)": answer(
        "Albacete: 12; Cuenca: 9; Toledo: 3",
        ["Albacete: 9; Cuenca: 12; Toledo: 3", "Albacete: 12; Cuenca: 3; Toledo: 9", "Albacete: 8; Cuenca: 12; Toledo: 4"],
        `Con c=3t y a=c+t=4t, sustituimos en el total:
4t+3t+t=24
⇒ 8t=24
⇒ t=3.
Entonces c=9 y a=12.
Comprobación: 12+9+3=24 y 12=9+3.`
      ),
    },

    "ccss2-algebra-d9034fc3a7bc": {
      "1.a)": answer(
        "Región del primer cuadrante por encima de y=x−2 y por debajo de y=4−x",
        ["Región por debajo de y=x−2 y de y=4−x", "Región por encima de y=4−x", "La región factible es vacía"],
        `x−y≤2 equivale a y≥x−2.
x+y≤4 equivale a y≤4−x.
Con x≥0 e y≥0, la región factible es la parte del primer cuadrante comprendida entre esas dos rectas.`
      ),
      "1.b)": answer(
        "(0,0), (2,0), (3,1) y (0,4)",
        ["(0,0), (4,0), (2,2) y (0,4)", "(0,0), (2,0), (2,1) y (0,4)", "(0,0), (3,0), (3,1) y (0,4)"],
        `Sobre el eje X, y=x−2 corta en (2,0).
Sobre el eje Y, y=4−x corta en (0,4).
Las rectas se cortan al resolver:
system{x−y=2;x+y=4}
⇒ 2x=6
⇒ (x,y)=(3,1).
Añadiendo el origen obtenemos los cuatro vértices.`
      ),
      "1.c)": answer(
        "La solución óptima es (3,1) y z=13",
        ["La solución óptima es (2,0) y z=8", "La solución óptima es (0,4) y z=4", "La solución óptima es (0,0) y z=0"],
        `Evaluamos z=4x+y:
z(0,0)=0,
z(2,0)=8,
z(3,1)=13,
z(0,4)=4.
El máximo es z=13 en (3,1).`
      ),
      "2.a)": answer(
        "system{m+e+t=200;t=m+2e;5m=t}",
        ["system{m+e+t=200;t=2m+e;5t=m}", "system{m+e+t=200;m=t+2e;5m=t}", "system{m+e+t=200;t=m+2e;m=5t}"],
        `Sean m, e y t los médicos, enfermeros y maestros.
El total es m+e+t=200.
Los maestros cumplen t=m+2e.
Los médicos son la quinta parte de los maestros: m=t/5, equivalente a 5m=t.`
      ),
      "2.b)": answer(
        "25 médicos, 50 enfermeros y 125 maestros",
        ["50 médicos, 25 enfermeros y 125 maestros", "25 médicos, 125 enfermeros y 50 maestros", "40 médicos, 40 enfermeros y 120 maestros"],
        `De 5m=t y t=m+2e:
5m=m+2e
⇒ 4m=2e
⇒ e=2m.
En el total:
m+2m+5m=200
⇒ 8m=200
⇒ m=25.
Así, e=50 y t=125.`
      ),
    },

    "ccss2-algebra-58d6598ec1d8": {
      "1.a)": answer(
        "Región del primer cuadrante por debajo de y=x+2 y de y=4−x",
        ["Región por encima de y=x+2 y por debajo de y=4−x", "Región por debajo de y=x−2", "La región factible es vacía"],
        `−x+y≤2 equivale a y≤x+2.
x+y≤4 equivale a y≤4−x.
Junto con x≥0 e y≥0, la región es la zona del primer cuadrante situada bajo ambas rectas.`
      ),
      "1.b)": answer(
        "(0,0), (4,0), (1,3) y (0,2)",
        ["(0,0), (2,0), (1,3) y (0,4)", "(0,0), (4,0), (2,2) y (0,2)", "(0,0), (3,0), (1,3) y (0,2)"],
        `Los cortes relevantes con los ejes son (4,0) para x+y=4 y (0,2) para −x+y=2.
El cruce de las rectas se obtiene de:
system{−x+y=2;x+y=4}.
Sumando: 2y=6 ⇒ y=3, y entonces x=1.
Los vértices son (0,0), (4,0), (1,3) y (0,2).`
      ),
      "1.c)": answer(
        "La solución óptima es (1,3) y z=10",
        ["La solución óptima es (4,0) y z=4", "La solución óptima es (0,2) y z=6", "La solución óptima es (0,0) y z=0"],
        `Evaluamos z=x+3y:
z(0,0)=0,
z(4,0)=4,
z(1,3)=1+9=10,
z(0,2)=6.
El máximo es 10 y se alcanza en (1,3).`
      ),
      "2.a)": answer(
        "system{f+i+a=18;f=2(i+a);a=2i}",
        ["system{f+i+a=18;f=i+2a;i=2a}", "system{f+i+a=18;i=2(f+a);a=2i}", "system{f+i+a=18;f=2(i+a);i=2a}"],
        `Sean f, i y a los empleados franceses, ingleses y alemanes.
El total proporciona f+i+a=18.
Los franceses duplican la suma de ingleses y alemanes: f=2(i+a).
Los alemanes duplican a los ingleses: a=2i.`
      ),
      "2.b)": answer(
        "12 franceses, 2 ingleses y 4 alemanes",
        ["12 franceses, 4 ingleses y 2 alemanes", "9 franceses, 3 ingleses y 6 alemanes", "6 franceses, 4 ingleses y 8 alemanes"],
        `De a=2i:
f=2(i+2i)=6i.
Sustituimos en el total:
6i+i+2i=18
⇒ 9i=18
⇒ i=2.
Por tanto, a=4 y f=12.`
      ),
    },

    "ccss2-algebra-6362c0ca2f53": {
      "1.a)": answer(
        "X=(A−5I)⁻¹(B+7I)",
        ["X=(B+7I)(A−5I)⁻¹", "X=(A+5I)⁻¹(B−7I)", "X=A−B+2I"],
        `Partimos de −7I−5X+AX=B.
Pasamos −7I al segundo miembro:
−5X+AX=B+7I.
Sacamos factor común X por la derecha:
(A−5I)X=B+7I.
Multiplicamos a la izquierda por (A−5I)⁻¹:
X=(A−5I)⁻¹(B+7I).`
      ),
      "1.b)": answer(
        "X=pmatrix{1/3&0\\−1&−1}",
        ["X=pmatrix{3&0\\−3&−1}", "X=pmatrix{−1/3&0\\1&1}", "X=pmatrix{1/3&−1\\0&−1}"],
        `De X·A=I se deduce X=A⁻¹.
A=pmatrix{3&0\\−3&−1}, det(A)=−3.
A⁻¹=1/−3·pmatrix{−1&0\\3&3}
=pmatrix{1/3&0\\−1&−1}.
Al multiplicar X·A se obtiene I.`
      ),
      "2.a)": answer(
        "system{12x+4y+8z=100;10x+15y+5z=125;3x+6y+12z=75}",
        ["system{12x+10y+3z=100;4x+15y+6z=125;8x+5y+12z=75}", "system{x+y+z=100;10x+15y+5z=125;3x+6y+12z=75}", "system{12x+4y+8z=125;10x+15y+5z=75;3x+6y+12z=100}"],
        `Sean x, y y z los centros de tipo I, II y III.
Leyendo la tabla por tipos de flor:
margaritas: 12x+4y+8z=100;
gerberas: 10x+15y+5z=125;
liliums: 3x+6y+12z=75.
Estas ecuaciones forman el sistema.`
      ),
      "2.b)": answer(
        "5 centros de tipo I, 4 de tipo II y 3 de tipo III",
        ["4 centros de tipo I, 5 de tipo II y 3 de tipo III", "5 centros de tipo I, 3 de tipo II y 4 de tipo III", "3 centros de tipo I, 4 de tipo II y 5 de tipo III"],
        `Resolvemos system{12x+4y+8z=100;10x+15y+5z=125;3x+6y+12z=75}.
Simplificamos la primera entre 4 y la tercera entre 3:
system{3x+y+2z=25;2x+3y+z=25;x+2y+4z=25}.
Aplicando eliminación de Gauss se obtiene z=3, y=4 y x=5.
Comprobación:
12·5+4·4+8·3=100,
10·5+15·4+5·3=125,
3·5+6·4+12·3=75.`
      ),
    },
  });
  // MATEMÁTICAS II · ANÁLISIS · 2013
  // Cada cuestión y cada integral se presentan como apartados independientes.
  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-8bebfeb60b68");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs)),
        makePart("1.c)", copy(originalParts[1]?.paragraphs?.slice(0, 1))),
        makePart("2º)", copy(originalParts[1]?.paragraphs?.slice(1))),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-3c45f2225856");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2º-I", [paragraph("Calcula I=∫(2·sen x·cos x)/(1+sen²x) dx.")]),
        makePart("2º-II", [paragraph("Calcula I=∫(x²+x−4)/(x³−4x) dx.")]),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-71be97b7b1c2");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2º-I", [paragraph("Calcula ∫(1+x+√x)/x² dx.")]),
        makePart("2º-II", [paragraph("Calcula ∫eˣ/(e²ˣ−3eˣ+2) dx. Observación: el cambio de variable t=eˣ puede ayudarte.")]),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-d3a153213561");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2.a)", copy(originalParts[0]?.paragraphs?.slice(1))),
        makePart("2.b)", copy(originalParts[1]?.paragraphs)),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-cb2aa10dab78");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2A", copy(originalParts[0]?.paragraphs?.slice(1))),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-1ddb54b150a5");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2B-I", [paragraph("Calcula ∫2·cos x/(1+sen²x) dx.")]),
        makePart("2B-II", [paragraph("Calcula ∫(x²+2x)·ln x dx.")]),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-911c27ed4fc0");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      exercise.statement = [];
      exercise.parts = [
        makePart("1A", copy(originalStatement.slice(0, 1))),
        makePart("2A-I", [paragraph("Calcula ∫((2·ln x)/x+ln x) dx.")]),
        makePart("2A-II", [paragraph("Calcula ∫3√(2x+1) dx.")]),
      ];
    }
  }

  {
    const exercise = matesBlock("analisis").find((item) => item.id === "mates2-analisis-212806bcf484");
    if (exercise) {
      const originalStatement = copy(exercise.statement);
      const originalParts = copy(exercise.parts);
      exercise.statement = [];
      exercise.parts = [
        makePart("1.a)", originalStatement),
        makePart("1.b)", copy(originalParts[0]?.paragraphs?.slice(0, 1))),
        makePart("2B", copy(originalParts[0]?.paragraphs?.slice(1))),
      ];
    }
  }

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-8bebfeb60b68": {
      "1.a)": answer(
        "Si f es continua en [a,b] y f(a)·f(b)<0, existe c∈(a,b) con f(c)=0",
        ["Si f es derivable, existe c con f′(c)=0", "Toda función continua es creciente", "Si f(a)=f(b), f es constante"],
        `Teorema de Bolzano: si f es continua en [a,b] y f(a)·f(b)<0, existe al menos un c∈(a,b) tal que f(c)=0.`
      ),
      "1.b)": answer(
        "Las gráficas se cortan al menos una vez en (−1,0)",
        ["No se cortan en (−1,0)", "Se cortan únicamente en x=−1", "Se cortan únicamente en x=0"],
        `Definimos h(x)=f(x)−g(x)=3x⁵−10x⁴+10x³+3−eˣ.
h es continua en [−1,0].
h(−1)=−20−e⁻¹<0 y h(0)=3−1=2>0.
Por Bolzano existe c∈(−1,0) con h(c)=0. Por tanto, f(c)=g(c) y las gráficas se cortan en ese intervalo.`
      ),
      "1.c)": answer(
        "El único punto de inflexión es (0,3)",
        ["Son (0,3) y (1,6)", "Es (1,6)", "No tiene puntos de inflexión"],
        `f′(x)=15x⁴−40x³+30x².
f′′(x)=60x³−120x²+60x=60x(x−1)².
Los candidatos son x=0 y x=1.
Como (x−1)²≥0, f′′ es negativa para x<0 y positiva para x>0. Solo cambia de signo en x=0; en x=1 no cambia.
f(0)=3. El único punto de inflexión es (0,3).`
      ),
      "2º)": answer(
        "a=√6/2",
        ["a=√3/2", "a=3/2", "a=√6"],
        `La parábola f(x)=−x²+a² corta al eje OX en x=−a y x=a.
El área es A=∫_{−a}^{a}(−x²+a²)dx=4a³/3.
La pendiente de la tangente es f′(x)=−2x; en x=−a vale f′(−a)=2a.
Igualamos: 4a³/3=2a.
Como a>0, 2a²/3=1, luego a²=3/2 y a=√6/2.`
      ),
    },

    "mates2-analisis-3c45f2225856": {
      "1.a)": answer(
        "a=2 y b=5",
        ["a=2 y b=3", "a=3 y b=5", "a=−2 y b=5"],
        `Dividimos:
(ax²+bx)/(x+1)=ax+(b−a)+(a−b)/(x+1).
La asíntota oblicua es y=ax+(b−a). Al compararla con y=2x+3:
a=2 y b−a=3. Por tanto, b=5.`
      ),
      "1.b)": answer(
        "y=5x",
        ["y=2x+3", "y=3x+2", "y=5x+1"],
        `Con a=2 y b=5, f(x)=(2x²+5x)/(x+1).
f(0)=0.
Por la regla del cociente,
f′(x)=frac{(4x+5)(x+1)−(2x²+5x)}{(x+1)²},
y f′(0)=5.
La tangente es y−0=5(x−0), es decir, y=5x.`
      ),
      "2º-I": answer(
        "ln(1+sen²x)+C",
        ["2·arctan(sen x)+C", "sen²x+C", "1/(1+sen²x)+C"],
        `Tomamos u=1+sen²x; entonces du=2·sen x·cos x dx.
I=∫du/u=ln|u|+C.
Como 1+sen²x>0, I=ln(1+sen²x)+C.`
      ),
      "2º-II": answer(
        "ln|x|+1/4·ln|x−2|−1/4·ln|x+2|+C",
        ["ln|x|−1/4·ln|x−2|+1/4·ln|x+2|+C", "ln|x³−4x|+C", "1/x+1/(x−2)−1/(x+2)+C"],
        `Factorizamos x³−4x=x(x−2)(x+2) y planteamos:
frac{x²+x−4}{x(x−2)(x+2)}=frac{A}{x}+frac{B}{x−2}+frac{C}{x+2}.
Multiplicando por el denominador:
x²+x−4=A(x−2)(x+2)+Bx(x+2)+Cx(x−2).
Para x=0: −4=−4A, luego A=1.
Para x=2: 2=8B, luego B=1/4.
Para x=−2: −2=8C, luego C=−1/4.
Integramos término a término:
I=ln|x|+1/4·ln|x−2|−1/4·ln|x+2|+C.`
      ),
    },

    "mates2-analisis-71be97b7b1c2": {
      "1.a)": answer(
        "a=2",
        ["a=1", "a=3", "No existe ningún valor"],
        `Para la continuidad en x=0 igualamos límite izquierdo, límite derecho y valor de la función.
Por la izquierda:
lim_{x→0⁻}frac{eˣ−e⁻ˣ}{ax}.
Es 0/0; por L’Hôpital vale
lim_{x→0⁻}frac{eˣ+e⁻ˣ}{a}=2/a.
Por la derecha, lim_{x→0⁺}((2x+7)/(2x+1))ˣ=1, y f(0)=1.
Así, 2/a=1 y a=2.`
      ),
      "1.b)": answer(
        "e³",
        ["1", "e⁶", "7"],
        `Para x→+∞:
((2x+7)/(2x+1))ˣ=[1+6/(2x+1)]ˣ.
Es una indeterminación 1^∞. Aplicamos la fórmula del número e:
L=e^{lim_{x→∞}x·6/(2x+1)}=e³.`
      ),
      "2º-I": answer(
        "−1/x+ln|x|−2/√x+C",
        ["1/x+ln|x|+2√x+C", "ln|x|−2√x+C", "−1/x+ln|x|+2/√x+C"],
        `Reescribimos:
(1+x+√x)/x²=x⁻²+x⁻¹+x⁻³ᐟ².
Integramos cada término:
I=−x⁻¹+ln|x|−2x⁻¹ᐟ²+C
=−1/x+ln|x|−2/√x+C.`
      ),
      "2º-II": answer(
        "ln|(eˣ−2)/(eˣ−1)|+C",
        ["ln|(eˣ−1)/(eˣ−2)|+C", "1/(eˣ−2)+C", "ln|e²ˣ−3eˣ+2|+C"],
        `Hacemos t=eˣ, dt=eˣdx:
I=∫dt/(t²−3t+2)=∫dt/((t−1)(t−2)).
Descomponemos:
1/((t−1)(t−2))=−1/(t−1)+1/(t−2).
I=−ln|t−1|+ln|t−2|+C
=ln|(eˣ−2)/(eˣ−1)|+C.`
      ),
    },

    "mates2-analisis-d3a153213561": {
      "1.a)": answer(
        "f′(a) es la pendiente de la tangente a y=f(x) en (a,f(a))",
        ["Es la ordenada del punto", "Es siempre el área bajo la curva", "Es la pendiente de cualquier secante"],
        `Geométricamente, f′(a) es la pendiente de la recta tangente a la gráfica y=f(x) en (a,f(a)).
Se obtiene como f′(a)=lim_{h→0}frac{f(a+h)−f(a)}{h}.
La tangente tiene ecuación y−f(a)=f′(a)(x−a).`
      ),
      "1.b)": answer(
        "El punto es (−1,3) y la pendiente mínima vale −3",
        ["El punto es (0,1)", "El punto es (1,5)", "El punto es (−1,−3)"],
        `La pendiente es f′(x)=3x²+6x=3(x+1)²−3.
Esta expresión es mínima en x=−1 y su valor mínimo es −3.
f(−1)=−1+3+1=3.
El punto pedido es (−1,3).`
      ),
      "2.a)": answer(
        "Se cortan en x=1/2 y x=1; la recta queda por encima entre ambos puntos",
        ["Se cortan en x=0 y x=1", "Solo se cortan en x=2", "No encierran ninguna región"],
        `Igualamos 1/x=−2x+3.
Multiplicando por x:
1=−2x²+3x ⇒ 2x²−3x+1=0
⇒(2x−1)(x−1)=0.
Los cortes tienen abscisas x=1/2 y x=1.
En [1/2,1] la recta y=−2x+3 queda por encima de y=1/x. Se dibujan ambas curvas, se marcan los dos cortes y se sombrea solo el recinto comprendido entre ellas.`
      ),
      "2.b)": answer(
        "3/4−ln 2 unidades cuadradas",
        ["ln 2−3/4", "3/4+ln 2", "1/4"],
        `Según la gráfica:
A=∫_{1/2}^{1}(−2x+3−1/x)dx.
Una primitiva es −x²+3x−ln|x|.
Por Barrow:
A=[−x²+3x−ln|x|]_{1/2}^{1}
=2−(−1/4+3/2+ln2)
=3/4−ln2 unidades cuadradas.`
      ),
    },
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-cb2aa10dab78": {
      "1.a)": answer(
        "Si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe c con f′(c)=0",
        ["Si f es continua, existe c con f(c)=0", "Si f′(a)=f′(b), f es constante", "Si f(a)≠f(b), existe c con f′(c)=0"],
        `Teorema de Rolle: si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe al menos un c∈(a,b) tal que f′(c)=0.`
      ),
      "1.b)": answer(
        "Existe al menos un c∈(1,2) con f′(c)=0",
        ["No puede existir", "Solo existe en x=1", "Solo existe en x=2"],
        `La función es un polinomio, luego es continua en [1,2] y derivable en (1,2).
f(1)=1+3−5−15+4+12=0.
f(2)=32+48−40−60+8+12=0.
Como f(1)=f(2), se cumplen las hipótesis de Rolle. Por tanto, existe al menos un c∈(1,2) con f′(c)=0.`
      ),
      "2A": answer(
        "a=2",
        ["a=1", "a=4", "a=√2"],
        `Las parábolas f(x)=−x²+a² y g(x)=−4x²+4a² se cortan cuando
−x²+a²=−4x²+4a² ⇒ x=±a.
En [−a,a], g queda por encima y g(x)−f(x)=3(a²−x²).
A=∫_{−a}^{a}3(a²−x²)dx=4a³.
Imponemos 4a³=32: a³=8 y, como a>0, a=2.`
      ),
    },

    "mates2-analisis-1ddb54b150a5": {
      "1.a)": answer(
        "a=−2 o a=2",
        ["a=2 solamente", "a=−2 solamente", "a=±√2"],
        `Sea L=lim_{x→0}[cos(ax)]^{1/x²}, una indeterminación 1^∞.
Tomamos logaritmos:
ln L=lim_{x→0}frac{ln(cos(ax))}{x²}.
Es 0/0. Por L’Hôpital:
ln L=lim_{x→0}frac{−a·tan(ax)}{2x}.
Sigue siendo 0/0. Aplicamos L’Hôpital otra vez:
ln L=lim_{x→0}frac{−a²/cos²(ax)}{2}=−a²/2.
Como L=e⁻², −a²/2=−2, luego a²=4 y a=−2 o a=2.`
      ),
      "1.b)": answer(
        "1",
        ["0", "2", "+∞"],
        `Racionalizamos:
√x(√(x+1)−√(x−1))
=frac{2√x}{√(x+1)+√(x−1)}.
Dividimos numerador y denominador entre √x:
frac{2}{√(1+1/x)+√(1−1/x)}.
Al hacer x→∞ obtenemos 2/(1+1)=1.`
      ),
      "2B-I": answer(
        "2·arctan(sen x)+C",
        ["ln(1+sen²x)+C", "arctan(cos x)+C", "2·sen x+C"],
        `Tomamos u=sen x y du=cos x dx.
I=∫2du/(1+u²)=2·arctan(u)+C
=2·arctan(sen x)+C.`
      ),
      "2B-II": answer(
        "(x³/3+x²)ln x−x³/9−x²/2+C",
        ["(x³+2x²)ln x+C", "(x³/3+x²)/x+C", "(x³/3+x²)ln x+x³/9+x²/2+C"],
        `Integramos por partes:
u=ln x, du=dx/x,
dv=(x²+2x)dx, v=x³/3+x².
I=(x³/3+x²)ln x−∫(x²/3+x)dx
=(x³/3+x²)ln x−x³/9−x²/2+C.`
      ),
    },

    "mates2-analisis-911c27ed4fc0": {
      "1A": answer(
        "Los números son 16 y 32",
        ["24 y 24", "12 y 36", "8 y 40"],
        `Sean x,y>0. De (x+y)/2=24 obtenemos x+y=48.
Maximizamos P=x·y²=(48−y)y²=48y²−y³.
P′(y)=96y−3y²=3y(32−y).
P′ es positiva antes de y=32 y negativa después, de modo que allí hay un máximo.
y=32 y x=48−32=16. Los números son 16 y 32.`
      ),
      "2A-I": answer(
        "(ln x)²+x·ln x−x+C",
        ["2ln x+x+C", "(ln x)²+ln x+C", "x(ln x)²+C"],
        `Separamos:
I=∫frac{2ln x}{x}dx+∫ln x dx.
En la primera, u=ln x y du=dx/x:
∫2u du=u²=(ln x)².
En la segunda, por partes:
∫ln x dx=xln x−x.
Por tanto, I=(ln x)²+xln x−x+C.`
      ),
      "2A-II": answer(
        "(2x+1)^{3/2}+C",
        ["3(2x+1)^{3/2}+C", "√(2x+1)+C", "(2x+1)^{1/2}/3+C"],
        `Tomamos u=2x+1; entonces du=2dx.
I=3/2∫u^{1/2}du
=3/2·2/3·u^{3/2}+C
=u^{3/2}+C
=(2x+1)^{3/2}+C.`
      ),
    },

    "mates2-analisis-212806bcf484": {
      "1.a)": answer(
        "Si f es continua en [a,b] y derivable en (a,b), existe c con f′(c)=(f(b)−f(a))/(b−a)",
        ["Si f(a)=f(b), f es constante", "Toda función continua tiene derivada cero", "Existe c con f(c)=0 sin más hipótesis"],
        `Teorema del valor medio de Lagrange: si f es continua en [a,b] y derivable en (a,b), existe al menos un c∈(a,b) tal que
f′(c)=frac{f(b)−f(a)}{b−a}.
La tangente en c es paralela a la secante que une los extremos.`
      ),
      "1.b)": answer(
        "El punto es (0,2)",
        ["El punto es (−1,0)", "El punto es (1,6)", "No existe ningún punto"],
        `La pendiente de la recta por (−2,0) y (2,12) es
m=frac{12−0}{2−(−2)}=3.
Como f(x)=x²+3x+2, f′(x)=2x+3.
Para que la tangente sea paralela:
2x+3=3 ⇒ x=0.
f(0)=2. El punto es (0,2), con 0∈(−2,2).`
      ),
      "2B": answer(
        "a=9",
        ["a=3", "a=6", "a=12"],
        `f(x)=a(x²−2x)=ax(x−2), con a>0.
Los cortes con OX son x=0 y x=2. Entre ellos la parábola queda bajo el eje.
A=∫₀²a(2x−x²)dx
=a[x²−x³/3]₀²
=a(4−8/3)=4a/3.
Como A=12:
4a/3=12 ⇒ a=9.`
      ),
    },

    "mates2-geometria-cd96b12b2c75": {
      "a)": answer(
        "Si a≠−5 son secantes; si a=−5 son paralelas",
        [
          "Son secantes para todo a",
          "Si a=−5 la recta está contenida en el plano",
          "Si a=0 son paralelas y para los demás valores son secantes",
        ],
        `La recta r es la intersección de
2x+y+az=0,  x−2y=0.
Un vector director se obtiene mediante el producto vectorial de los normales:
v⃗=(2,1,a)×(1,−2,0)=(2a,a,−5).
El vector normal del plano πₐ≡x−y−z=a es n⃗=(1,−1,−1).
Calculamos:
n⃗·v⃗=2a−a+5=a+5.
Si a≠−5, este producto no es cero y la recta corta al plano: son secantes.
Si a=−5, la recta es paralela al plano. Como r pasa por O=(0,0,0) y
0−0−0≠−5, no está contenida en π₋₅. Por tanto, son paralelas no coincidentes.`
      ),
      "b)": answer(
        "d(πₐ,r)=0 si a≠−5 y d(π₋₅,r)=5/√3",
        [
          "d(πₐ,r)=|a|/√3 para todo a",
          "d(πₐ,r)=5 para todo a",
          "d(πₐ,r)=0 para todo a",
        ],
        `Si a≠−5, la recta y el plano son secantes; por ello, su distancia es 0.
Para a=−5 son paralelos. Tomamos el punto O=(0,0,0) de la recta y aplicamos la distancia de un punto al plano:
d(O,π₋₅)=frac{|0−0−0−(−5)|}{√(1²+(−1)²+(−1)²)}
=frac{5}{√3}=frac{5√3}{3}.
Por tanto,
d(πₐ,r)=0 si a≠−5, y d(π₋₅,r)=5/√3.`
      ),
    },

    "mates2-geometria-00844fb8a439": {
      "a)": answer(
        "Las rectas son paralelas no coincidentes",
        [
          "Las rectas son coincidentes",
          "Las rectas son secantes",
          "Las rectas se cruzan",
        ],
        `En r:
system{x+y−z=1;2x+y−2z=1}.
Restamos la primera ecuación de la segunda:
x−z=0 ⇒ x=z.
Al sustituir, y=1. Así,
r: system{x=t;y=1;z=t}, con vector director v⃗=(1,0,1).
En s:
system{x−z=0;x+2y−z=12}.
De x=z resulta 2y=12, luego y=6:
s: system{x=u;y=6;z=u}, con el mismo vector director.
Como tienen vectores directores paralelos pero los puntos (0,1,0) y (0,6,0) no pertenecen a la misma recta, son paralelas no coincidentes.`
      ),
      "b)": answer(
        "5",
        ["1", "5/√2", "6"],
        `Tomamos A=(0,1,0)∈r y B=(0,6,0)∈s.
El vector AB⃗=(0,5,0) es perpendicular al vector director común v⃗=(1,0,1), pues
AB⃗·v⃗=0.
Por tanto, el segmento AB ya es la perpendicular común:
d(r,s)=|AB⃗|=√(0²+5²+0²)=5.`
      ),
    },

    "mates2-geometria-b8b610e99f84": {
      "a)": answer(
        "Si a=−4 son secantes; si a≠−4 se cruzan",
        [
          "Son secantes para todo a",
          "Si a=−4 son paralelas",
          "Si a≠−4 son paralelas no coincidentes",
        ],
        `Parametrizamos r tomando z=t:
r: system{x=1+2t;y=2+t;z=t},  v⃗ᵣ=(2,1,1).
La recta s tiene como vector director
v⃗ₛ=(1,1,1)×(1,−2,2)=(4,−1,−3).
Los vectores v⃗ᵣ y v⃗ₛ no son proporcionales, así que las rectas no pueden ser paralelas.
Para buscar una intersección sustituimos r en la primera ecuación de s:
(1+2t)+(2+t)+t=1
⇒ 3+4t=1
⇒ t=−1/2.
En ese punto, la segunda expresión vale
x−2y+2z=−4.
Por tanto, si a=−4 las rectas son secantes. Si a≠−4 no se cortan ni son paralelas, por lo que se cruzan.`
      ),
      "b)": answer(
        "P=(0,3/2,−1/2)",
        [
          "P=(1,2,0)",
          "P=(0,−3/2,1/2)",
          "P=(−1,1,0)",
        ],
        `Las rectas solo son secantes cuando a=−4. En el apartado anterior obtuvimos t=−1/2.
Sustituimos en la forma paramétrica de r:
x=1+2(−1/2)=0,
y=2−1/2=3/2,
z=−1/2.
Luego el punto de corte es
P=(0,3/2,−1/2).
La sustitución de P en las cuatro ecuaciones verifica el resultado.`
      ),
    },

    "mates2-geometria-0703d5c00c0c": {
      "a)": answer(
        "π≡x+y+4z=0",
        [
          "π≡x−y+4z=0",
          "π≡2x+2y+8z−1=0",
          "π≡x+y+4z−4=0",
        ],
        `Si Q es el simétrico de P respecto de π, el plano es perpendicular al segmento PQ y pasa por su punto medio.
P=(4,2,3), Q=(2,0,−5).
Un vector normal es
PQ⃗=Q−P=(−2,−2,−8), que podemos simplificar a n⃗=(1,1,4).
El punto medio es
M=((4+2)/2,(2+0)/2,(3−5)/2)=(3,1,−1).
La ecuación del plano es
1(x−3)+1(y−1)+4(z+1)=0,
es decir,
π≡x+y+4z=0.`
      ),
      "b)": answer(
        "λ=13/5",
        ["λ=5/13", "λ=−13/5", "λ=2"],
        `El plano determinado por P, Q y R=(λ,1,0) pasa por el origen si los vectores OP⃗, OQ⃗ y OR⃗ son linealmente dependientes:
determinant{4&2&3;2&0&−5;λ&1&0}=0.
Desarrollando por la tercera fila, o mediante Sarrus:
20−10λ+6=0
⇒ 26−10λ=0
⇒ λ=26/10=13/5.`
      ),
    },

    "mates2-geometria-86f67a7b0b43": {
      "a)": answer(
        "a=−1 y b=−8",
        [
          "a=1 y b=8",
          "a=−1 y b≠−8",
          "a=5 y cualquier b",
        ],
        `Los planos son coincidentes cuando todos sus coeficientes son proporcionales:
frac{2}{a}=frac{−4}{2}=frac{−2}{1}=frac{b}{4}.
Las razones de los coeficientes de y y z valen −2. Por tanto,
2/a=−2 ⇒ a=−1,
y
b/4=−2 ⇒ b=−8.
Luego son coincidentes exactamente para a=−1 y b=−8.`
      ),
      "b)": answer(
        "a=−1 y b≠−8",
        [
          "a=−1 y b=−8",
          "a=5 y cualquier b",
          "a≠−1 y b=−8",
        ],
        `Para que sean paralelos, sus vectores normales deben ser proporcionales:
(2,−4,−2)=−2(a,2,1).
De aquí se obtiene a=−1.
Con a=−1, los planos serían coincidentes únicamente si también b=−8. Por tanto, para que sean paralelos no coincidentes debe cumplirse
a=−1 y b≠−8.`
      ),
      "c)": answer(
        "a=5 y cualquier b∈ℝ",
        [
          "a=−5 y cualquier b",
          "a=−1 y b=−8",
          "a=5 y b=0 solamente",
        ],
        `Los vectores normales son
n⃗=(a,2,1),  n⃗′=(2,−4,−2).
Los planos son perpendiculares cuando sus normales son ortogonales:
n⃗·n⃗′=0.
Sustituimos:
2a+2(−4)+1(−2)=0
⇒ 2a−10=0
⇒ a=5.
El término independiente b no interviene en la dirección del plano, por lo que b puede ser cualquier número real.`
      ),
    },

    "mates2-geometria-2bf89939342c": {
      "a)": answer(
        "s: (x,y,z)=(1,0,1)+μ(−2,1,1)",
        [
          "s: (x,y,z)=(1,0,1)+μ(1,1,1)",
          "s: (x,y,z)=(0,1,2)+μ(−2,1,1)",
          "s: (x,y,z)=(1,0,1)+μ(2,−1,1)",
        ],
        `Escribimos r en forma vectorial:
r: (x,y,z)=(0,1,2)+λ(1,1,1).
Sea H el punto de corte de la perpendicular buscada con r:
H=(λ,1+λ,2+λ).
Como PH⃗ es perpendicular a r:
(H−P)·(1,1,1)=0.
H−P=(λ−1,1+λ,1+λ), luego
(λ−1)+(1+λ)+(1+λ)=0
⇒ 3λ+1=0
⇒ λ=−1/3.
Así,
H=(−1/3,2/3,5/3)
y PH⃗=(−4/3,2/3,2/3), proporcional a (−2,1,1).
Por tanto,
s: (x,y,z)=(1,0,1)+μ(−2,1,1).`
      ),
      "b)": answer(
        "Q=(−5/3,4/3,7/3)",
        [
          "Q=(−1/3,2/3,5/3)",
          "Q=(5/3,−4/3,−7/3)",
          "Q=(−2,1,1)",
        ],
        `El punto H=(−1/3,2/3,5/3) es la proyección ortogonal de P sobre r y, por tanto, el punto medio de P y su simétrico Q.
Usamos H=(P+Q)/2, de donde Q=2H−P.
Coordenada a coordenada:
qₓ=2(−1/3)−1=−5/3,
qᵧ=2(2/3)−0=4/3,
q_z=2(5/3)−1=7/3.
Así,
Q=(−5/3,4/3,7/3).`
      ),
    },

    "mates2-geometria-e074086e7106": {
      "a)": answer(
        "r es perpendicular a π; forman 90°, y hay infinitos planos pedidos",
        [
          "r es paralela a π; forman 0°, y no existe ningún plano",
          "r corta oblicuamente a π y existe un único plano",
          "r está contenida en π y hay dos planos",
        ],
        `El plano π≡x−z=0 tiene vector normal n⃗=(1,0,−1).
La recta
r: system{x=1+λ;y=2;z=−1−λ}
tiene vector director v⃗ᵣ=(1,0,−1).
Como v⃗ᵣ es paralelo a n⃗, la recta es perpendicular al plano y el ángulo entre ambos es 90°.
Todo plano que contenga r tiene un vector normal perpendicular a v⃗ᵣ. Como v⃗ᵣ es paralelo a n⃗, ese nuevo plano será perpendicular a π.
Por una recta pasan infinitos planos; por tanto, hay infinitos planos perpendiculares a π que contienen r.`
      ),
      "b)": answer(
        "s corta a π en (1,1,1), y existe un único plano pedido",
        [
          "s es paralela a π y no existe ningún plano",
          "s está contenida en π y hay infinitos planos",
          "s corta a π en (2,0,3), y hay infinitos planos",
        ],
        `Parametrizamos s:
system{x+y=2;4y+2z=6}.
Tomando y=t:
s: system{x=2−t;y=t;z=3−2t},  v⃗ₛ=(−1,1,−2).
Para cortar π imponemos x−z=0:
(2−t)−(3−2t)=0 ⇒ t=1.
El punto de corte es (1,1,1), luego s es secante a π.
El plano pedido debe contener s, así que su normal ha de ser perpendicular a v⃗ₛ; además debe ser perpendicular a π, por lo que su normal también ha de ser perpendicular a n⃗=(1,0,−1).
Estas dos condiciones fijan una única dirección normal v⃗ₛ×n⃗ y, al contener s, determinan un único plano.`
      ),
    },

    "mates2-geometria-9defc32792ad": {
      "a)": answer(
        "k=3",
        ["k=2", "k=−3", "k=7"],
        `La recta es
r: system{x=1+λ;y=k−λ;z=λ},
con vector director v⃗=(1,−1,1).
El normal de π≡x+2y+z=7 es n⃗=(1,2,1), y
n⃗·v⃗=1−2+1=0,
por lo que la dirección de r ya es paralela al plano.
Para que toda la recta esté contenida basta imponer que uno de sus puntos pertenezca a π. Con λ=0 obtenemos P=(1,k,0):
1+2k+0=7
⇒ 2k=6
⇒ k=3.`
      ),
      "b)": answer(
        "π′≡x−z=1",
        [
          "π′≡x+z=1",
          "π′≡x−z=0",
          "π′≡x+2y+z=7",
        ],
        `Para k=3:
r: (x,y,z)=(1,3,0)+λ(1,−1,1).
El plano π′ debe contener r y ser perpendicular a π.
Su normal n⃗′ ha de ser perpendicular tanto al vector director v⃗=(1,−1,1) como al normal n⃗=(1,2,1) de π. Tomamos:
n⃗′=v⃗×n⃗=(−3,0,3), proporcional a (1,0,−1).
El plano que pasa por (1,3,0) con ese normal es
1(x−1)+0(y−3)−1(z−0)=0,
es decir,
π′≡x−z=1.
Al resolver conjuntamente π y π′ se recupera exactamente la recta r.`
      ),
    },
  });

  // CIENCIAS SOCIALES II · ANÁLISIS · 2013
  const moveEmbeddedExercise = (exercise, fromIndex, toIndex, marker) => {
    const sourcePart = exercise?.parts?.[fromIndex];
    const splitAt = sourcePart?.paragraphs?.findIndex((item) =>
      String(item.plain || "").trim().startsWith(marker)
    );
    if (splitAt < 0) return [];
    const moved = sourcePart.paragraphs.splice(splitAt);
    if (Number.isInteger(toIndex) && exercise.parts[toIndex]) {
      exercise.parts[toIndex].paragraphs = [...moved, ...(exercise.parts[toIndex].paragraphs || [])];
    }
    return moved;
  };

  for (const [id, setup] of Object.entries({
    "ccss2-analisis-c7fe74ac65fb": { labels: ["3.a)", "3.b)"], extra: true, from: 1 },
    "ccss2-analisis-95a56b32c49f": { labels: ["3.a)", "3.b)", "3.c)", "4.a)", "4.b)"], from: 2, to: 3 },
    "ccss2-analisis-1db79aa076c4": { labels: ["3.a)", "3.b)", "4.a)", "4.b)"], from: 1, to: 2 },
    "ccss2-analisis-b67e4718e9f4": { labels: ["3.a)", "3.b)", "3.c)"], extra: true, from: 2 },
    "ccss2-analisis-2f55637dc3a4": { labels: ["3.a)", "3.b)", "3.c)"], extra: true, from: 2 },
    "ccss2-analisis-a03058538c1f": { labels: ["3.a)", "3.b)", "4.a)", "4.b)"], from: 1, to: 2 },
    "ccss2-analisis-9eab7e109f2c": { labels: ["3.a)", "3.b)", "4.a)", "4.b)"] },
    "ccss2-analisis-a9d6a1cd7eea": { labels: ["3.a)", "3.b)", "3.c)", "4.a)", "4.b)"], from: 2, to: 3 },
  })) {
    const exercise = ccssBlock("analisis").find((item) => item.id === id);
    if (!exercise) continue;
    if (setup.extra) {
      const moved = moveEmbeddedExercise(exercise, setup.from, null, "4.");
      exercise.parts.push(makePart("4)", moved));
    } else if (Number.isInteger(setup.from)) {
      moveEmbeddedExercise(exercise, setup.from, setup.to, "4.");
    }
    exercise.parts.forEach((part, index) => {
      part.label = setup.labels[index] || "4)";
    });
  }

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-c7fe74ac65fb": {
      "3.a)": answer(
        "t=6",
        ["t=2", "t=−6", "t=3"],
        `Cada rama es continua; solo estudiamos x=2.
lim{x→2−}f(x)=|−2−1|−t=3−t,
f(2)=3−t,
lim{x→2+}f(x)=2−5=−3.
Para que sea continua:
3−t=−3
⇒ t=6.`
      ),
      "3.b)": answer(
        "Para x≤−1, f(x)=−x−3; para −1≤x≤2, f(x)=x−1; para x>2, f(x)=x−5",
        ["Para todo x, f(x)=x−1", "Para x≤2, f(x)=−x−3; para x>2, f(x)=x−5", "Para x≤−1, f(x)=x−1; para x>−1, f(x)=−x−3"],
        `Con t=2:
f(x)=|x+1|−2 para x≤2.
El valor absoluto cambia en x=−1:
si x<−1, |x+1|=−x−1 y f(x)=−x−3;
si −1≤x≤2, |x+1|=x+1 y f(x)=x−1.
Para x>2, f(x)=x−5.
Se representan las tres rectas respetando sus extremos: en x=2 el punto cerrado es (2,1), mientras que la rama derecha comienza con punto abierto en (2,−3).`
      ),
      "4)": answer(
        "a=−4 y b=5",
        ["a=4 y b=−5", "a=−2 y b=1", "a=2 y b=−1"],
        `La función es f(x)=x²+ax+b.
Como tiene un mínimo en (2,1), debe cumplirse f′(2)=0 y f(2)=1.
Derivamos:
f′(x)=2x+a.
Entonces 4+a=0 ⇒ a=−4.
Sustituimos el punto:
f(2)=4+2(−4)+b=1
⇒ b−4=1
⇒ b=5.
Además f″(x)=2>0, por lo que el extremo es efectivamente un mínimo.`
      ),
    },

    "ccss2-analisis-95a56b32c49f": {
      "3.a)": answer(
        "t=−2",
        ["t=2", "t=0", "t=−4"],
        `En x=2:
f(2)=|2+t|,
lim{x→2+}f(x)=(2−3)²−1=0.
La continuidad exige |2+t|=0.
Un valor absoluto solo es cero cuando su interior es cero:
2+t=0 ⇒ t=−2.`
      ),
      "3.b)": answer(
        "Máximo relativo en (2,4) y mínimo relativo en (3,−1)",
        ["Solo hay un mínimo en (3,−1)", "Máximo en (3,−1) y mínimo en (2,4)", "No existen extremos relativos"],
        `Para t=2, f(2)=|2+2|=4.
Para x>2 se usa f(x)=(x−3)²−1, una parábola con vértice (3,−1).
Justo a la derecha de 2 los valores están próximos a 0, menores que f(2)=4; por tanto (2,4) es un máximo relativo en el extremo del intervalo.
El vértice (3,−1) es un mínimo relativo.`
      ),
      "3.c)": answer(
        "Decrece en [2,3] y crece en [3,+∞)",
        ["Crece en [2,3] y decrece en [3,+∞)", "Decrece en todo [2,+∞)", "Crece en todo [2,+∞)"],
        `Para x>2:
f′(x)=2(x−3).
En la recta real marcamos x=3:
si 2<x<3, por ejemplo x=5/2, f′(5/2)=−1<0: la función decrece;
si x>3, por ejemplo x=4, f′(4)=2>0: la función crece.
Además f(2)=4 y los valores inmediatamente posteriores son menores, de modo que el tramo puede expresarse como decreciente en [2,3] y creciente en [3,+∞).`
      ),
      "4.a)": answer(
        "En t=1 s; altura máxima 45 m",
        ["En t=0 s; 38 m", "En t=5 s; 13 m", "En t=6 s; 20 m"],
        `f(t)=t³−9t²+15t+38, 0≤t≤6.
f′(t)=3t²−18t+15=3(t−1)(t−5).
Los candidatos son t=0,1,5,6.
Evaluamos:
f(0)=38, f(1)=45, f(5)=13, f(6)=20.
El valor mayor es 45 m y se alcanza en t=1 s.`
      ),
      "4.b)": answer(
        "En t=5 s; altura mínima 13 m",
        ["En t=1 s; 45 m", "En t=0 s; 38 m", "En t=6 s; 20 m"],
        `Usamos los mismos candidatos t=0,1,5,6:
f(0)=38, f(1)=45, f(5)=13, f(6)=20.
El menor valor es 13 m, alcanzado en t=5 s.`
      ),
    },

    "ccss2-analisis-1db79aa076c4": {
      "3.a)": answer(
        "t=2",
        ["t=−2", "t=1", "t=3"],
        `En x=0:
f(0)=0+1−t=1−t,
lim{x→0+}f(x)=|0−2|−3=−1.
Para que sea continua:
1−t=−1
⇒ t=2.`
      ),
      "3.b)": answer(
        "Para x≤0, f=x−2; para 0<x<2, f=−x−1; para x≥2, f=x−5",
        ["Para x≤0, f=x+2; para x>0, f=x−5", "Para todo x, f=x−2", "Para x≤2, f=−x−1; para x>2, f=x−5"],
        `Con t=3, la primera rama es f(x)=x+1−3=x−2.
Para x>0, f(x)=|x−2|−3.
Si 0<x<2, |x−2|=2−x, luego f(x)=−x−1.
Si x≥2, |x−2|=x−2, luego f(x)=x−5.
En x=0 hay punto cerrado (0,−2) y la rama derecha tiene punto abierto (0,−1).`
      ),
      "4.a)": answer(
        "En el día 1; velocidad máxima 37 km/h",
        ["En el día 0; 26 km/h", "En el día 4; 10 km/h", "En el día 5; 21 km/h"],
        `v(t)=2t³−15t²+24t+26, 0≤t≤5.
v′(t)=6t²−30t+24=6(t−1)(t−4).
Evaluamos extremos y puntos críticos:
v(0)=26, v(1)=37, v(4)=10, v(5)=21.
El máximo es 37 km/h en t=1 día.`
      ),
      "4.b)": answer(
        "En el día 4; velocidad mínima 10 km/h",
        ["En el día 1; 37 km/h", "En el día 0; 26 km/h", "En el día 5; 21 km/h"],
        `Entre los candidatos t=0,1,4,5, los valores son 26, 37, 10 y 21.
El menor es v(4)=10 km/h.`
      ),
    },

    "ccss2-analisis-b67e4718e9f4": {
      "3.a)": answer(
        "t=3",
        ["t=−3", "t=2", "t=0"],
        `En x=0:
lim{x→0−}f(x)=t²+2,
f(0)=t²+2,
lim{x→0+}f(x)=t²+2t−4.
Igualamos:
t²+2=t²+2t−4
⇒ 2t=6
⇒ t=3.`
      ),
      "3.b)": answer(
        "Máximo relativo en (0,6) y mínimo relativo en (2,0)",
        ["Solo hay un mínimo en (2,0)", "Máximo en (2,0) y mínimo en (0,6)", "No hay extremos"],
        `Para t=2, f(0)=2²+2=6.
Para x>0, f(x)=(x−2)².
Los valores a la derecha de 0 están próximos a 4, menores que 6, por lo que (0,6) es un máximo relativo en el extremo del intervalo.
La parábola tiene vértice (2,0), que es un mínimo relativo.`
      ),
      "3.c)": answer(
        "Decrece en [0,2] y crece en [2,+∞)",
        ["Crece en [0,2] y decrece en [2,+∞)", "Decrece en todo el intervalo", "Crece en todo el intervalo"],
        `Para x>0:
f′(x)=2(x−2).
Marcamos x=2 en la recta real.
En (0,2), tomando x=1, f′(1)=−2<0: decrece.
En (2,+∞), tomando x=3, f′(3)=2>0: crece.
El valor aislado f(0)=6 es mayor que los inmediatamente posteriores, por lo que el primer tramo se expresa desde el extremo x=0.`
      ),
      "4)": answer(
        "a=−1 y b=2",
        ["a=1 y b=−2", "a=−2 y b=3", "a=2 y b=1"],
        `f(x)=ax²+2x+b tiene un máximo en (1,3).
Derivamos: f′(x)=2ax+2.
La condición f′(1)=0 da 2a+2=0 ⇒ a=−1.
Como f(1)=3:
−1+2+b=3
⇒ b=2.
Además f″(x)=2a=−2<0, luego se trata de un máximo.`
      ),
    },

    "ccss2-analisis-2f55637dc3a4": {
      "3.a)": answer(
        "No es continua en x=0; presenta una discontinuidad evitable",
        ["Es continua en x=0", "Tiene una discontinuidad de salto infinito", "No existen los límites laterales"],
        `Calculamos:
lim{x→0−}f(x)=(0+2)²=4,
lim{x→0+}f(x)=(0−2)²=4.
Los límites laterales coinciden, por lo que lim{x→0}f(x)=4.
Sin embargo, f(0)=0.
Como el límite existe pero no coincide con el valor de la función, hay una discontinuidad evitable.`
      ),
      "3.b)": answer(
        "Mínimos relativos en (0,0) y (2,0)",
        ["Solo hay un mínimo en (2,0)", "Máximo en (0,0) y mínimo en (2,0)", "No existen extremos relativos"],
        `En x=0, f(0)=0, mientras que los valores cercanos por ambos lados se aproximan a 4; por tanto (0,0) es un mínimo relativo aislado.
Para x>0, f(x)=(x−2)², cuyo vértice es (2,0), otro mínimo relativo.
No hay máximos relativos en (0,+∞).`
      ),
      "3.c)": answer(
        "Decrece en (0,2) y crece en (2,+∞)",
        ["Crece en (0,2) y decrece en (2,+∞)", "Decrece en todo (0,+∞)", "Crece en todo (0,+∞)"],
        `Para x>0, f′(x)=2(x−2).
En (0,2), por ejemplo x=1, f′(1)=−2<0: decrece.
En (2,+∞), por ejemplo x=3, f′(3)=2>0: crece.
El punto x=0 se estudia separadamente porque la función es discontinua allí.`
      ),
      "4)": answer(
        "a=−3 y b=0",
        ["a=3 y b=0", "a=−3 y b=12", "a=0 y b=−3"],
        `f(x)=x³+ax²+bx.
Para que x=2 sea un mínimo relativo: f′(2)=0.
Para que x=1 sea punto de inflexión: f″(1)=0.
Derivamos:
f′(x)=3x²+2ax+b,
f″(x)=6x+2a.
Formamos el sistema:
system{12+4a+b=0;6+2a=0}.
De la segunda ecuación a=−3; sustituyendo en la primera, b=0.
Finalmente f″(2)=12−6=6>0, por lo que x=2 es un mínimo.`
      ),
    },

    "ccss2-analisis-a03058538c1f": {
      "3.a)": answer(
        "t=16",
        ["t=3", "t=−16", "t=4"],
        `En x=1, la rama central da f(1)=t.
El límite por la derecha es:
lim{x→1+}(x−5)²=(1−5)²=16.
Para que sea continua en x=1 debe cumplirse t=16.`
      ),
      "3.b)": answer(
        "y=(x+5)² si x≤−1; y=3 si −1<x≤1; y=(x−5)² si x>1",
        ["y=(x−5)² para todo x", "y=3 para −1≤x≤1 y y=x² fuera", "y=(x+5)² si x<1 e y=(x−5)² si x≥1"],
        `Con t=3 se representan tres tramos:
la parábola y=(x+5)² hasta x=−1, con punto cerrado (−1,16);
el segmento horizontal y=3 para −1<x≤1, abierto en (−1,3) y cerrado en (1,3);
la parábola y=(x−5)² para x>1, con punto abierto en (1,16).
Así se muestran claramente los dos saltos.`
      ),
      "4.a)": answer(
        "En t=2 h; altura máxima 336 m",
        ["En t=0 h; 292 m", "En t=8 h; 228 m", "En t=10 h; 272 m"],
        `f(t)=t³−15t²+48t+292, 0≤t≤10.
f′(t)=3t²−30t+48=3(t−2)(t−8).
Evaluamos t=0,2,8,10:
f(0)=292, f(2)=336, f(8)=228, f(10)=272.
La altura máxima es 336 m en t=2 h.`
      ),
      "4.b)": answer(
        "En t=8 h; altura mínima 228 m",
        ["En t=2 h; 336 m", "En t=0 h; 292 m", "En t=10 h; 272 m"],
        `Los valores candidatos son:
f(0)=292, f(2)=336, f(8)=228 y f(10)=272.
El menor es 228 m y se alcanza en t=8 h.`
      ),
    },

    "ccss2-analisis-9eab7e109f2c": {
      "3.a)": answer(
        "t=3",
        ["t=0", "t=−3", "t=5"],
        `En x=2:
f(2)=2+t,
lim{x→2+}f(x)=(2−4)²+1=5.
La continuidad exige 2+t=5, luego t=3.`
      ),
      "3.b)": answer(
        "Recta y=x para x≤2 y parábola y=(x−4)²+1 para x>2",
        ["Recta y=x+3 para x≤2 y la misma parábola para x>2", "Parábola para x≤2 y recta para x>2", "Recta y=x para todo x"],
        `Para t=0:
f(x)=x si x≤2,
f(x)=(x−4)²+1 si x>2.
La recta termina en el punto cerrado (2,2).
La parábola tiene vértice (4,1) y comienza con un punto abierto en (2,5), por lo que hay una discontinuidad de salto.`
      ),
      "4.a)": answer(
        "a=2",
        ["a=−2", "a=1", "a=4"],
        `f(x)=ax³+3x²−12x+5.
Para que haya un mínimo en x=1 debe cumplirse f′(1)=0.
f′(x)=3ax²+6x−12.
Entonces:
f′(1)=3a+6−12=0
⇒ 3a=6
⇒ a=2.
Además f″(x)=6ax+6, y f″(1)=18>0, por lo que es un mínimo.`
      ),
      "4.b)": answer(
        "Máximo relativo en (−2,25)",
        ["Máximo relativo en (1,−3)", "Máximo relativo en (−1,18)", "No existe máximo relativo"],
        `Con a=2:
f′(x)=6x²+6x−12=6(x+2)(x−1).
Los puntos críticos son x=−2 y x=1.
En la recta real:
f′>0 en (−∞,−2), f′<0 en (−2,1) y f′>0 en (1,+∞).
Por tanto, en x=−2 se pasa de crecer a decrecer: hay un máximo.
f(−2)=2(−8)+3·4−12(−2)+5=25.
El máximo relativo es (−2,25).`
      ),
    },

    "ccss2-analisis-a9d6a1cd7eea": {
      "3.a)": answer(
        "No es continua en x=1; presenta una discontinuidad evitable",
        ["Es continua en x=1", "Tiene una discontinuidad de salto", "El límite por la izquierda no existe"],
        `Calculamos los límites:
lim{x→1−}f(x)=1²+1+1=3,
lim{x→1+}f(x)=(1−2)²+2=3.
Por tanto lim{x→1}f(x)=3.
Sin embargo, f(1)=0.
El límite existe pero no coincide con el valor de la función: la discontinuidad es evitable.`
      ),
      "3.b)": answer(
        "Mínimo relativo en (−1/2,3/4)",
        ["Máximo relativo en (−1/2,3/4)", "Mínimo relativo en (1,0)", "No existen extremos relativos"],
        `En el intervalo (−∞,1) se usa f(x)=x²+x+1.
f′(x)=2x+1=0 ⇒ x=−1/2.
f″(x)=2>0, luego es un mínimo.
f(−1/2)=1/4−1/2+1=3/4.
El mínimo relativo es (−1/2,3/4).`
      ),
      "3.c)": answer(
        "Decrece en (−∞,−1/2) y crece en (−1/2,1)",
        ["Crece en (−∞,−1/2) y decrece en (−1/2,1)", "Decrece en todo (−∞,1)", "Crece en todo (−∞,1)"],
        `f′(x)=2x+1.
Marcamos x=−1/2 en la recta real.
Si x<−1/2, por ejemplo x=−1, f′(−1)=−1<0: decrece.
Si −1/2<x<1, por ejemplo x=0, f′(0)=1>0: crece.`
      ),
      "4.a)": answer(
        "74 decibelios",
        ["90 decibelios", "54 decibelios", "78 decibelios"],
        `Sustituimos t=1 en R(t)=−4t²+24t+54:
R(1)=−4·1²+24·1+54
=−4+24+54
=74 decibelios.`
      ),
      "4.b)": answer(
        "En t=3 h; 90 decibelios",
        ["En t=1 h; 74 decibelios", "En t=6 h; 54 decibelios", "En t=0 h; 54 decibelios"],
        `R′(t)=−8t+24.
Igualamos a cero:
−8t+24=0 ⇒ t=3.
Como R″(t)=−8<0, se trata de un máximo.
R(3)=−4·9+24·3+54=−36+72+54=90.
El mayor ruido se produce a las 3 horas y alcanza 90 dB.`
      ),
    },
  });

  // CIENCIAS SOCIALES II · PROBABILIDAD · 2013
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-d7206352372f": {
      "a)": answer(
        "0,084",
        ["0,12", "0,08", "0,096"],
        `Sean A y B los tipos de pieza y D el suceso «defectuosa».
Aplicamos el teorema de la probabilidad total:
P(D)=P(A)·P(D|A)+P(B)·P(D|B)
=0,20·0,02+0,80·0,10
=0,004+0,080
=0,084.`
      ),
      "b)": answer(
        "49/229≈0,2140",
        ["0,20", "0,196", "0,916"],
        `Se pide P(A|D̄). Por Bayes:
P(A|D̄)=P(A∩D̄)/P(D̄).
P(A∩D̄)=0,20·0,98=0,196.
P(D̄)=1−0,084=0,916.
Por tanto:
P(A|D̄)=0,196/0,916=49/229≈0,2140.`
      ),
    },
    "ccss2-probabilidad-4c14603dc987": {
      "a)": answer(
        "0,20",
        ["0,10", "0,30", "0,50"],
        `Sean B «juega al baloncesto» y F «juega al fútbol».
Usamos P(F∪B)=P(F)+P(B)−P(F∩B).
0,50=0,40+0,30−P(F∩B).
Así:
P(F∩B)=0,70−0,50=0,20.`
      ),
      "b)": answer(
        "2/3≈0,6667",
        ["0,20", "0,50", "3/4"],
        `Se pide P(F|B):
P(F|B)=P(F∩B)/P(B)
=0,20/0,30
=2/3≈0,6667.`
      ),
    },
    "ccss2-probabilidad-bdfefdb38597": {
      "a)": answer(
        "0,0575",
        ["0,075", "0,015", "0,050"],
        `Sean D «practica deporte» y S «obtiene sobresaliente».
P(S)=P(D)P(S|D)+P(D̄)P(S|D̄)
=0,15·0,10+0,85·0,05
=0,015+0,0425
=0,0575.`
      ),
      "b)": answer(
        "6/23≈0,2609",
        ["0,15", "0,10", "17/23"],
        `Aplicamos Bayes:
P(D|S)=P(D∩S)/P(S)
=0,15·0,10/0,0575
=0,015/0,0575
=6/23≈0,2609.`
      ),
    },
    "ccss2-probabilidad-8e86a261caa3": {
      "a)": answer(
        "0,011",
        ["0,015", "0,010", "0,020"],
        `Sean A y B los modelos y D «defectuoso».
P(D)=0,10·0,02+0,90·0,01
=0,002+0,009
=0,011.`
      ),
      "b)": answer(
        "98/989≈0,0991",
        ["0,10", "0,98", "0,989"],
        `P(A∩D̄)=0,10·0,98=0,098.
P(D̄)=1−0,011=0,989.
Por Bayes:
P(A|D̄)=0,098/0,989=98/989≈0,0991.`
      ),
    },
    "ccss2-probabilidad-18cee7af37f9": {
      "a)": answer(
        "0,81",
        ["0,90", "0,99", "0,18"],
        `Las materias se consideran independientes.
P(aprobar las dos)=0,9·0,9=0,9²=0,81.`
      ),
      "b)": answer(
        "0,001",
        ["0,01", "0,10", "0,999"],
        `La probabilidad de suspender una materia es 1−0,9=0,1.
Por independencia:
P(suspender las tres)=0,1³=0,001.`
      ),
      "c)": answer(
        "0,99",
        ["0,81", "0,90", "0,01"],
        `Calculamos el suceso contrario:
P(al menos una aprobada)=1−P(ninguna aprobada).
Para dos materias:
P(ninguna)=0,1²=0,01.
Por tanto:
1−0,01=0,99.`
      ),
    },
    "ccss2-probabilidad-dfb4671658a7": {
      "a)": answer(
        "0,30",
        ["0,10", "0,40", "0,60"],
        `Sean L «le gusta la lectura» y C «le gusta el cine».
P(L∪C)=P(L)+P(C)−P(L∩C).
0,60=0,40+0,50−P(L∩C).
Luego P(L∩C)=0,90−0,60=0,30.`
      ),
      "b)": answer(
        "0,60",
        ["0,30", "0,50", "0,75"],
        `P(L|C)=P(L∩C)/P(C)
=0,30/0,50
=0,60.`
      ),
    },
    "ccss2-probabilidad-d7e01fa4e29f": {
      "a)": answer(
        "0,729",
        ["0,900", "0,810", "0,271"],
        `Como los tres ordenadores son independientes:
P(los tres con virus)=0,9³=0,729.`
      ),
      "b)": answer(
        "0,001",
        ["0,010", "0,100", "0,999"],
        `La probabilidad de que un ordenador no tenga virus es 0,1.
Por independencia:
P(ninguno con virus)=0,1³=0,001.`
      ),
      "c)": answer(
        "0,999",
        ["0,729", "0,271", "0,001"],
        `Usamos el suceso contrario:
P(al menos uno con virus)=1−P(ninguno con virus)
=1−0,001
=0,999.`
      ),
    },
    "ccss2-probabilidad-1cf077d6d685": {
      "a)": answer(
        "19/30≈0,6333",
        ["2/3", "4/5", "1/6"],
        `Hay 20 temas que no son de legislación.
Sin reemplazamiento:
P(ninguno de legislación)=20/25·19/24
=380/600
=19/30≈0,6333.`
      ),
      "b)": answer(
        "0,65",
        ["0,40", "0,60", "0,35"],
        `Ha estudiado 10 temas y no ha estudiado 15.
Es más sencillo usar el contrario:
P(al menos uno estudiado)=1−P(ninguno estudiado)
=1−15/25·14/24
=1−210/600
=1−0,35
=0,65.`
      ),
    },
  });

  // CIENCIAS SOCIALES II · INFERENCIA ESTADÍSTICA · 2013
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-estadistica-c382ae6d6861": {
      "a)": answer(
        "(66,60; 91,40) euros",
        ["(59,40; 98,60) euros", "(72,80; 85,20) euros", "(79,00; 91,40) euros"],
        `La media muestral es:
x̄=(65+72+74+75+80+81+82+84+87+90)/10=79.
Para un 95 % de confianza, z_(α/2)=1,96.
El error es:
E=1,96·20/√10≈12,396.
El intervalo es:
IC=(x̄−E,x̄+E)
=(79−12,396,79+12,396)
≈(66,60,91,40) euros.`
      ),
      "b)": answer(
        "Aumentando el tamaño de la muestra",
        ["Disminuyendo el tamaño de la muestra", "Aumentando la desviación típica", "No puede disminuirse"],
        `La amplitud es 2E, donde:
E=z_(α/2)·σ/√n.
Con el mismo nivel de confianza, z_(α/2) no cambia; σ también es fija.
Al aumentar n, aumenta √n en el denominador, disminuye E y el intervalo se hace más estrecho.`
      ),
    },
    "ccss2-estadistica-14c122eb87fa": {
      "a)": answer(
        "900 KJ/m³",
        ["898,04 KJ/m³", "901,96 KJ/m³", "896,08 KJ/m³"],
        `El centro de un intervalo de confianza para la media es la media muestral:
x̄=(898,04+901,96)/2
=1800/2
=900 KJ/m³.`
      ),
      "b)": answer(
        "95 %",
        ["90 %", "97 %", "99 %"],
        `El error del intervalo es:
E=901,96−900=1,96.
Como σ=10 y n=100:
E=z_(α/2)·σ/√n
⇒ 1,96=z_(α/2)·10/10
⇒ z_(α/2)=1,96.
En la normal típica, P(−1,96≤Z≤1,96)=0,95.
El nivel de confianza es el 95 %.`
      ),
    },
    "ccss2-estadistica-c536ea4b2b84": {
      "a)": answer(
        "(51,52; 56,48) minutos",
        ["(50,08; 57,92) minutos", "(52,04; 55,96) minutos", "(54,00; 56,48) minutos"],
        `La media muestral es:
x̄=(40+42+48+51+52+54+59+61+63+70)/10=54.
Para el 95 %, z_(α/2)=1,96.
E=1,96·4/√10≈2,479.
Por tanto:
IC=(54−2,479,54+2,479)
≈(51,52,56,48) minutos.`
      ),
      "b)": answer(
        "n=62 empleados",
        ["n=61 empleados", "n=60 empleados", "n=64 empleados"],
        `Queremos E<1:
1,96·4/√n<1.
Despejamos:
√n>7,84
⇒ n>7,84²=61,4656.
Como n debe ser entero y el error ha de ser estrictamente menor que 1, el tamaño mínimo es n=62.`
      ),
    },
    "ccss2-estadistica-d753df500341": {
      "a)": answer(
        "(3542,6; 3797,4) KWh",
        ["(3605; 3735) KWh", "(3415,2; 3924,8) KWh", "(3670; 3797,4) KWh"],
        `Datos: x̄=3670, σ=650, n=100 y z_(α/2)=1,96.
E=1,96·650/√100
=1,96·65
=127,4.
Así:
IC=(3670−127,4,3670+127,4)
=(3542,6,3797,4) KWh.`
      ),
      "b)": answer(
        "Al aumentar la confianza aumenta la amplitud; al disminuirla, la amplitud disminuye",
        ["Al aumentar la confianza disminuye la amplitud", "La amplitud no cambia", "Ambos cambios aumentan la amplitud"],
        `E=z_(α/2)·σ/√n.
Si aumenta el nivel de confianza, aumenta el valor crítico z_(α/2), por lo que aumentan el error y la amplitud.
Si disminuye la confianza, disminuyen z_(α/2), el error y la amplitud.`
      ),
    },
    "ccss2-estadistica-bd4828765a58": {
      "a)": answer(
        "(108,53; 111,47) km/h",
        ["(107,06; 112,94) km/h", "(109,25; 110,75) km/h", "(110; 111,47) km/h"],
        `Datos: x̄=110, σ=15, n=400.
Para el 95 %, z_(α/2)=1,96.
E=1,96·15/√400
=1,96·15/20
=1,47.
IC=(110−1,47,110+1,47)
=(108,53,111,47) km/h.`
      ),
      "b)": answer(
        "Mayor confianza produce un intervalo más ancho; menor confianza, uno más estrecho",
        ["Mayor confianza produce un intervalo más estrecho", "El nivel de confianza no afecta", "Menor confianza produce un intervalo más ancho"],
        `La semiamplitud es E=z_(α/2)σ/√n.
Al aumentar la confianza crece z_(α/2) y, por tanto, el intervalo se ensancha.
Al disminuir la confianza ocurre lo contrario.`
      ),
    },
    "ccss2-estadistica-e9d04b85115c": {
      "a)": answer(
        "(59,52; 64,48) días",
        ["(58,08; 65,92) días", "(60,76; 63,24) días", "(62; 64,48) días"],
        `La media muestral es:
x̄=(50+58+59+60+62+63+64+65+68+71)/10=62.
Para el 95 %, z_(α/2)=1,96.
E=1,96·4/√10≈2,479.
IC=(62−2,479,62+2,479)
≈(59,52,64,48) días.`
      ),
      "b)": answer(
        "Aumentando el tamaño muestral",
        ["Disminuyendo el tamaño muestral", "Aumentando σ", "Aumentando el nivel de confianza"],
        `Con el mismo nivel de confianza:
E=z_(α/2)·σ/√n.
Al aumentar n, disminuye el error E y, por ello, también disminuye la amplitud 2E.`
      ),
    },
    "ccss2-estadistica-321c62c1f17e": {
      "a)": answer(
        "(3,283; 3,717) mg/dl",
        ["(3,304; 3,696) mg/dl", "(3,250; 3,750) mg/dl", "(3,500; 3,717) mg/dl"],
        `Para un 97 % de confianza:
α=0,03, α/2=0,015 y P(Z≤z_(α/2))=0,985.
Buscando 0,985 en la tabla normal obtenemos z_(α/2)≈2,17.
Con x̄=3,5, σ=1 y n=100:
E=2,17·1/√100=0,217.
IC=(3,5−0,217,3,5+0,217)
=(3,283,3,717) mg/dl.`
      ),
      "b)": answer(
        "Aumentando la muestra o disminuyendo el nivel de confianza",
        ["Disminuyendo la muestra", "Aumentando el nivel de confianza", "La amplitud no puede modificarse"],
        `La amplitud es 2z_(α/2)σ/√n.
Puede reducirse aumentando n.
También se reduce al disminuir el nivel de confianza, pues baja z_(α/2), aunque esto supone aceptar menos confianza en la estimación.`
      ),
    },
    "ccss2-estadistica-b395623048ce": {
      "a)": answer(
        "(44,88; 53,12) horas",
        ["(45,28; 52,72) horas", "(43,79; 54,21) horas", "(49; 53,12) horas"],
        `La media muestral es:
x̄=(39+41+42+44+48+50+53+54+59+60)/10=49.
Para el 97 %, z_(α/2)≈2,17.
E=2,17·6/√10≈4,117.
IC=(49−4,117,49+4,117)
≈(44,88,53,12) horas.`
      ),
      "b)": answer(
        "n=43 pacientes",
        ["n=42 pacientes", "n=41 pacientes", "n=44 pacientes"],
        `Queremos que el error sea inferior a 2:
2,17·6/√n<2.
Despejamos:
√n>2,17·6/2=6,51
⇒ n>6,51²=42,3801.
El menor entero que cumple la desigualdad es n=43.`
      ),
    },
  });

})();
