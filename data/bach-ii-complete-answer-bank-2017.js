(function () {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  function partFromParagraphs(label, paragraphs) {
    return { label, paragraphs };
  }

  // Algunos documentos oficiales de 2017 agrupan dos ejercicios bajo el
  // mismo apartado. Los separamos para que cada pregunta tenga sus propias
  // opciones, corrección y puntuación.
  const analysis2017 = (window.MATES_II_BLOCK_EXERCISES?.analisis || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));

  const juneAAnalysis = analysis2017.find((exercise) =>
    exercise.id === "mates2-analisis-192bf7f315a4"
  );
  if (juneAAnalysis?.parts?.length === 2) {
    const optimization = juneAAnalysis.parts[1].paragraphs.splice(1);
    juneAAnalysis.parts[0].label = "1A a)";
    juneAAnalysis.parts[1].label = "1A b)";
    juneAAnalysis.parts.push(partFromParagraphs("2A", optimization));
  }

  const juneBAnalysis = analysis2017.find((exercise) =>
    exercise.id === "mates2-analisis-96ce5a5777a5"
  );
  if (juneBAnalysis?.parts?.length === 4) {
    ["1B a)", "1B b)", "2B a)", "2B b)"].forEach((label, index) => {
      juneBAnalysis.parts[index].label = label;
    });
  }

  const septemberAAnalysis = analysis2017.find((exercise) =>
    exercise.id === "mates2-analisis-9a1598812551"
  );
  if (septemberAAnalysis?.parts?.length === 2) {
    const continuityIndex = septemberAAnalysis.parts[0].paragraphs.findIndex(
      (paragraph) => /^2A\.\s*a\)/.test(String(paragraph.plain || ""))
    );
    const continuity = continuityIndex >= 0
      ? septemberAAnalysis.parts[0].paragraphs.splice(continuityIndex)
      : [];
    septemberAAnalysis.parts.unshift(partFromParagraphs(
      "1A a)",
      septemberAAnalysis.statement.map((paragraph) => ({ ...paragraph }))
    ));
    septemberAAnalysis.parts[1].label = "1A b)";
    septemberAAnalysis.parts[2].label = "2A b)";
    septemberAAnalysis.parts.splice(2, 0, partFromParagraphs("2A a)", continuity));
  }

  const septemberBAnalysis = analysis2017.find((exercise) =>
    exercise.id === "mates2-analisis-109734dacfe2"
  );
  if (septemberBAnalysis?.parts?.length === 2) {
    septemberBAnalysis.parts.unshift(partFromParagraphs(
      "1B",
      [septemberBAnalysis.statement[0]].map((paragraph) => ({ ...paragraph }))
    ));
    septemberBAnalysis.parts[1].label = "2B a)";
    septemberBAnalysis.parts[2].label = "2B b)";
  }

  const geometry2017 = (window.MATES_II_BLOCK_EXERCISES?.geometria || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));

  [
    ["mates2-geometria-da2ec5e0c34a", "a)"],
    ["mates2-geometria-9121a930f661", "a)"]
  ].forEach(([id, label]) => {
    const exercise = geometry2017.find((item) => item.id === id);
    if (exercise?.parts?.length === 1) {
      exercise.parts.unshift(partFromParagraphs(
        label,
        exercise.statement.map((paragraph) => ({ ...paragraph }))
      ));
    }
  });

  const probability2017 = (window.MATES_II_BLOCK_EXERCISES?.["probabilidad-estadistica"] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));

  probability2017.forEach((exercise) => {
    if (exercise.parts?.length !== 1 || exercise.statement?.length < 3) return;
    const aSetup = { ...exercise.statement[0] };
    const a1 = { ...exercise.statement[1] };
    const a2 = { ...exercise.statement[2] };
    const bParagraphs = exercise.parts[0].paragraphs.filter(
      (paragraph) => String(paragraph.plain || "").trim()
    );
    if (bParagraphs.length < 3) return;
    const bSetup = { ...bParagraphs[0] };
    exercise.parts = [
      partFromParagraphs("a1)", [aSetup, a1]),
      partFromParagraphs("a2)", [aSetup, a2]),
      partFromParagraphs("b1)", [bSetup, { ...bParagraphs[1] }]),
      partFromParagraphs("b2)", [bSetup, { ...bParagraphs[2] }])
    ];
  });

  const ccssAlgebra2017 = (window.CCSS_II_BLOCK_EXERCISES?.algebra || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));
  [
    [2, "ccss2-algebra-342a15ceede3-pl"],
    [3, "ccss2-algebra-e4d75f8a58a8-pesas"],
    [6, "ccss2-algebra-afc8cfa08edb-transporte"],
    [7, "ccss2-algebra-32af90751520-entradas"]
  ].forEach(([index, id]) => {
    if (ccssAlgebra2017[index]) ccssAlgebra2017[index].id = id;
  });

  const ccssAnalysis2017 = window.CCSS_II_BLOCK_EXERCISES?.analisis || [];
  const exactCyclistDuplicate = ccssAnalysis2017.findIndex(
    (exercise) => exercise.id === "ccss2-analisis-6fb47f3cb8db"
      && String(exercise.source || "").startsWith("2017")
  );
  if (exactCyclistDuplicate >= 0) ccssAnalysis2017.splice(exactCyclistDuplicate, 1);
  const analysisOnly2017 = ccssAnalysis2017.filter(
    (exercise) => String(exercise.source || "").startsWith("2017")
  );
  [
    [1, "ccss2-analisis-aaaa7a75add4-parametros"],
    [2, "ccss2-analisis-aaaa7a75add4-grafica"],
    [3, "ccss2-analisis-aaaa7a75add4-cine"],
    [5, "ccss2-analisis-e5bc24d79f14-ciclista"],
    [6, "ccss2-analisis-e5bc24d79f14-grafica"]
  ].forEach(([index, id]) => {
    if (analysisOnly2017[index]) analysisOnly2017[index].id = id;
  });

  const ccssProbability2017 = (window.CCSS_II_BLOCK_EXERCISES?.probabilidad || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));
  if (ccssProbability2017[1]) ccssProbability2017[1].id = "ccss2-probabilidad-db3f08b1334d-empresa";
  if (ccssProbability2017[3]) ccssProbability2017[3].id = "ccss2-probabilidad-3f594c3bb677-fumadores";

  const ccssStatistics2017 = (window.CCSS_II_BLOCK_EXERCISES?.estadistica || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2017"));
  if (ccssStatistics2017[1]) ccssStatistics2017[1].id = "ccss2-estadistica-9f92cea66f1c-hogares";
  if (ccssStatistics2017[3]) ccssStatistics2017[3].id = "ccss2-estadistica-8ae25e56e4d3-electricidad";

  // Matemáticas II · Álgebra · 2017.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-661956aadb57": {
      "b)": {
        options: [
          "(x,y,z)=(8,-frac{21}{2},-frac{15}{2})",
          "(x,y,z)=(8,frac{21}{2},-frac{15}{2})",
          "(x,y,z)=(-8,-frac{21}{2},frac{15}{2})",
          "El sistema es incompatible para a=-1"
        ],
        correct: 0,
        solution: `Resolución:
Para a=-1, el sistema queda:
{ -x-y+z=-5
  2x+y+z=-2
  y-z=-3 }.

De la tercera ecuación:
y=z-3.

Sustituimos en la primera:
-x-(z-3)+z=-5
⇒ -x+3=-5
⇒ x=8.

Sustituimos x=8 e y=z-3 en la segunda:
2·8+(z-3)+z=-2
⇒ 16+2z-3=-2
⇒ 2z=-15
⇒ z=-frac{15}{2}.

Entonces:
y=-frac{15}{2}-3=-frac{21}{2}.

Resultado final:
(x,y,z)=(8,-frac{21}{2},-frac{15}{2}).`
      }
    },
    "mates2-algebra-0e1faecfc42b": {
      "a)": {
        options: [
          "Sí, porque det(2I₃+B)=1≠0",
          "No, porque det(2I₃+B)=0",
          "Sí, porque det(B)=1",
          "No, porque B no es simétrica"
        ],
        correct: 0,
        solution: `Resolución:
Calculamos:
2I₃+B=[[1,0,1],[2,1,0],[1,0,2]].

Su determinante es:
det[[1,0,1],[2,1,0],[1,0,2]]
=1·det[[1,0],[0,2]]+1·det[[2,1],[1,0]]
=2-1
=1.

Como el determinante es distinto de cero, la matriz tiene inversa.

Resultado final: sí tiene inversa, porque det(2I₃+B)=1≠0.`
      },
      "b)": {
        options: [
          "X=[[4,0,-2],[10,-3,-5],[-4,2,2]]",
          "X=[[4,0,2],[10,3,-5],[-4,-2,2]]",
          "X=[[2,0,-1],[-4,1,2],[-1,0,1]]",
          "X=[[2,0,0],[-1,-3,0],[2,2,0]]"
        ],
        correct: 0,
        solution: `Resolución:
Partimos de:
2X+C=A-X·B.

Agrupamos los términos que contienen X:
2X+X·B=A-C.

Sacamos factor común X por la derecha:
X·(2I₃+B)=A-C.

Multiplicamos por la derecha por la inversa:
X=(A-C)·(2I₃+B)⁻¹.

Ya sabemos que:
2I₃+B=[[1,0,1],[2,1,0],[1,0,2]],

y, mediante determinantes:
(2I₃+B)⁻¹=[[2,0,-1],[-4,1,2],[-1,0,1]].

Además:
A-C=[[2,0,0],[-1,-3,0],[2,2,0]].

Multiplicamos:
X=[[2,0,0],[-1,-3,0],[2,2,0]]
  ·[[2,0,-1],[-4,1,2],[-1,0,1]]
 =[[4,0,-2],[10,-3,-5],[-4,2,2]].

Resultado final:
X=[[4,0,-2],[10,-3,-5],[-4,2,2]].`
      }
    },
    "mates2-algebra-ad4d05ce19b7": {
      "b)": {
        options: [
          "(x,y,z)=(-frac{1}{2},frac{1}{2},frac{1}{2})",
          "(x,y,z)=(frac{1}{2},-frac{1}{2},frac{1}{2})",
          "(x,y,z)=(-1,1,1)",
          "El sistema es incompatible para a=0"
        ],
        correct: 0,
        solution: `Resolución:
Para a=0, el sistema queda:
{ y+z=1
  x+z=0
  x+y=0 }.

De la segunda ecuación:
x=-z.

De la tercera:
y=-x=z.

Sustituimos en la primera:
z+z=1
⇒ 2z=1
⇒ z=frac{1}{2}.

Por tanto:
x=-frac{1}{2}, y=frac{1}{2}.

Resultado final:
(x,y,z)=(-frac{1}{2},frac{1}{2},frac{1}{2}).`
      }
    },
    "mates2-algebra-bef6a939a2bf": {
      "a)": {
        options: [
          "A⁻¹=[[0,1,0],[1,0,-1],[0,0,1]]",
          "A⁻¹=[[0,1,0],[1,0,1],[0,0,-1]]",
          "A⁻¹=[[1,0,0],[0,1,0],[0,0,1]]",
          "A no tiene inversa"
        ],
        correct: 0,
        solution: `Resolución:
A=[[0,1,1],[1,0,0],[0,0,1]].

Calculamos el determinante:
det(A)=-1≠0.

Por tanto, A tiene inversa. Usamos la fórmula:
A⁻¹=frac{Adj(Aᵀ)}{det(A)}.

Al calcular los adjuntos y trasponer, obtenemos:
Adj(Aᵀ)=[[0,-1,0],[-1,0,1],[0,0,-1]].

Dividimos por det(A)=-1:
A⁻¹=[[0,1,0],[1,0,-1],[0,0,1]].

Comprobación:
A·A⁻¹=I₃.

Resultado final:
A⁻¹=[[0,1,0],[1,0,-1],[0,0,1]].`
      },
      "b)": {
        options: [
          "X=[[0,10,0],[5,6,-2],[-3,-2,1]]",
          "X=[[0,10,0],[-5,6,2],[-3,2,1]]",
          "X=[[1,4,0],[0,9,0],[-2,-1,1]]",
          "X=[[0,1,0],[1,0,-1],[0,0,1]]"
        ],
        correct: 0,
        solution: `Resolución:
Partimos de:
A·X+B=C².

Aislamos el término con X:
A·X=C²-B.

Multiplicamos por A⁻¹ a la izquierda:
X=A⁻¹·(C²-B).

Calculamos:
C²=[[1,4,0],[0,9,0],[-2,-1,1]].

Entonces:
C²-B=[[2,4,-1],[0,10,0],[-3,-2,1]].

Como:
A⁻¹=[[0,1,0],[1,0,-1],[0,0,1]],

obtenemos:
X=[[0,1,0],[1,0,-1],[0,0,1]]
  ·[[2,4,-1],[0,10,0],[-3,-2,1]]
 =[[0,10,0],[5,6,-2],[-3,-2,1]].

Resultado final:
X=[[0,10,0],[5,6,-2],[-3,-2,1]].`
      }
    }
  });

  // Matemáticas II · Geometría · 2017.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-15e8c229e8da": {
      "a)": {
        options: [
          "Las rectas r y s se cruzan",
          "Las rectas r y s son paralelas",
          "Las rectas r y s se cortan en (-1,3,0)",
          "Las rectas r y s son coincidentes"
        ],
        correct: 0,
        solution: `Resolución:
Escribimos las rectas en forma paramétrica.

r: (x,y,z)=(2,-1,0)+t(-1,2,0).

Para s, las normales de sus planos son:
vector n₁=(1,-1,2), vector n₂=(1,0,1).

Un vector director de s es:
vector v_s=vector n₁×vector n₂=(-1,1,1).

Tomando z=0 en las ecuaciones de s obtenemos el punto (-1,3,0), luego:
s: (x,y,z)=(-1,3,0)+λ(-1,1,1).

Los vectores (-1,2,0) y (-1,1,1) no son proporcionales, así que las rectas no son paralelas.

Para que se cortasen, de la coordenada z tendría que ser λ=0. El punto de s sería entonces (-1,3,0). En r, x=-1 exige t=3, pero con t=3 se obtiene y=5, no y=3.

Por tanto, no son paralelas ni se cortan.

Resultado final: las rectas r y s se cruzan.`
      },
      "b)": {
        options: [
          "2x+y+z-3=0",
          "2x-y+z-3=0",
          "x+2y+z-1=0",
          "2x+y-z-5=0"
        ],
        correct: 0,
        solution: `Resolución:
El plano pedido debe ser paralelo a las dos rectas, por lo que contiene sus vectores directores:

vector v_r=(-1,2,0), vector v_s=(-1,1,1).

Un vector normal del plano es:
vector n=vector v_r×vector v_s=(2,1,1).

Como el plano pasa por P(2,0,-1), usamos:
2(x-2)+(y-0)+(z+1)=0.

Desarrollamos:
2x-4+y+z+1=0.

Resultado final:
2x+y+z-3=0.`
      }
    },
    "mates2-geometria-da2ec5e0c34a": {
      "a)": {
        options: [
          "{ x+y-1=0; x-2z-4=0 }",
          "{ x-y+1=0; x+2z+4=0 }",
          "{ x+y+1=0; x-2z+4=0 }",
          "{ 2x+y-1=0; x-z-4=0 }"
        ],
        correct: 0,
        solution: `Resolución:
La recta pasa por P(0,1,-2) y Q(4,-3,0).

Calculamos un vector director:
vector PQ=(4,-4,2)=2(2,-2,1).

Su forma paramétrica es:
{ x=2t
  y=1-2t
  z=-2+t }.

Eliminamos el parámetro:
x+y-1=2t+1-2t-1=0,

x-2z-4=2t-2(-2+t)-4=0.

Resultado final, forma implícita:
{ x+y-1=0
  x-2z-4=0 }.`
      },
      "b)": {
        options: [
          "R=(frac{7}{2},-frac{3}{2},-5)",
          "R=(frac{5}{2},-frac{1}{2},-5)",
          "R=(frac{7}{2},frac{3}{2},-5)",
          "R=(2,0,-5)"
        ],
        correct: 0,
        solution: `Resolución:
Un punto de la recta r tiene la forma:
R(λ)=(2+λ,-λ,-5).

Pedimos que equidiste de P(0,1,-2) y Q(4,-3,0):
d(R,P)²=d(R,Q)².

(2+λ)²+(-λ-1)²+(-3)²
=(λ-2)²+(3-λ)²+(-5)².

Desarrollamos y simplificamos:
2λ²+6λ+14=2λ²-10λ+38,

16λ=24,

λ=frac{3}{2}.

Sustituimos en la recta:
R=(2+frac{3}{2},-frac{3}{2},-5).

Resultado final:
R=(frac{7}{2},-frac{3}{2},-5).`
      }
    },
    "mates2-geometria-e5246f322b25": {
      "a)": {
        options: [
          "frac{2}{3} unidades cúbicas",
          "frac{4}{3} unidades cúbicas",
          "2 unidades cúbicas",
          "4 unidades cúbicas"
        ],
        correct: 0,
        solution: `Resolución:
El plano es:
-x+2y+z+2=0.

Calculamos sus cortes con los ejes.

Eje OX: y=z=0:
-x+2=0 ⇒ x=2.
Punto A(2,0,0).

Eje OY: x=z=0:
2y+2=0 ⇒ y=-1.
Punto B(0,-1,0).

Eje OZ: x=y=0:
z+2=0 ⇒ z=-2.
Punto C(0,0,-2).

El volumen del tetraedro formado con el origen es:
V=frac{|2·(-1)·(-2)|}{6}
=frac{4}{6}
=frac{2}{3}.

Resultado final:
frac{2}{3} unidades cúbicas.`
      },
      "b)": {
        options: [
          "{ x-4y-4=0; x-2z+6=0 }",
          "{ x+4y+4=0; x+2z-6=0 }",
          "{ 4x-y-1=0; 2x-z+3=0 }",
          "{ x-4y+4=0; x-2z-6=0 }"
        ],
        correct: 0,
        solution: `Resolución:
Los vectores normales de los planos son:
vector n_α=(-1,2,1),
vector n_β=(0,-2,1).

La recta paralela a ambos planos debe tener como vector director:
vector v=vector n_α×vector n_β=(4,1,2).

Como pasa por P(0,-1,3), su forma paramétrica es:
{ x=4t
  y=-1+t
  z=3+2t }.

Eliminamos t:
x-4(y+1)=0 ⇒ x-4y-4=0,

x-2(z-3)=0 ⇒ x-2z+6=0.

Resultado final:
{ x-4y-4=0
  x-2z+6=0 }.`
      }
    },
    "mates2-geometria-9121a930f661": {
      "a)": {
        options: ["a=4", "a=-4", "a=1", "a=8"],
        correct: 0,
        solution: `Resolución:
El vector normal del plano es:
vector n=(1,-1,-a).

El vector director de la recta es:
vector v=(3,-5,2).

Para que la recta sea paralela al plano, ambos vectores deben ser perpendiculares:
vector n·vector v=0.

3+5-2a=0,

8-2a=0,

a=4.

Resultado final: a=4.`
      },
      "b)": {
        options: ["sqrt{14}", "sqrt{21}", "2sqrt{14}", "frac{sqrt{14}}{2}"],
        correct: 0,
        solution: `Resolución:
La recta tiene un punto A(3,1,0) y vector director:
vector v=(2,1,1).

Desde A hasta P(1,2,3):
vector AP=(-2,1,3).

La distancia de un punto a una recta es:
d(P,r)=frac{|vector AP×vector v|}{|vector v|}.

Calculamos:
vector AP×vector v=(-2,8,-4).

Por tanto:
|vector AP×vector v|=sqrt{(-2)²+8²+(-4)²}=sqrt{84}=2sqrt{21},

|vector v|=sqrt{2²+1²+1²}=sqrt{6}.

d(P,r)=frac{2sqrt{21}}{sqrt{6}}=sqrt{14}.

Resultado final:
d(P,r)=sqrt{14}.`
      }
    }
  });

  // Matemáticas II · Análisis · 2017.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-192bf7f315a4": {
      "1A a)": {
        options: ["a=-1, b=8", "a=1, b=8", "a=-1, b=4", "a=17, b=8"],
        correct: 0,
        solution: `Resolución:
Solo debemos estudiar el punto de unión x=2.

Continuidad en x=2:
lim[x→2⁻]f(x)=f(2)=2²+a=4+a.

lim[x→2⁺]f(x)=-2²+2b-9=2b-13.

Igualamos:
4+a=2b-13
⇒ a-2b=-17.  (1)

Derivamos cada rama:
f'(x)={ 2x, si x<2
         -2x+b, si x>2 }.

Derivadas laterales en x=2:
f'(2⁻)=4,
f'(2⁺)=-4+b.

Para que sea derivable:
4=-4+b
⇒ b=8.

Sustituimos en (1):
a-16=-17
⇒ a=-1.

Resultado final: a=-1 y b=8.`
      },
      "1A b)": {
        options: [
          "Sí; se cumplen las hipótesis y f'(0)=f'(4)=0",
          "No; f(-2)≠f(6)",
          "No; la función no es continua en x=2",
          "Sí; el único punto de Rolle es x=2"
        ],
        correct: 0,
        solution: `Resolución:
Teorema de Rolle:
si una función es continua en [a,b], derivable en (a,b) y f(a)=f(b), entonces existe al menos un c∈(a,b) tal que f'(c)=0.

Para a=-1 y b=8, la función es continua en [-2,6] y derivable en (-2,6).

Comprobamos los extremos:
f(-2)=(-2)²-1=3.

f(6)=-6²+8·6-9=-36+48-9=3.

Por tanto, f(-2)=f(6), y se cumplen todas las hipótesis.

Buscamos los puntos:
En la primera rama, f'(x)=2x=0 ⇒ x=0.
En la segunda, f'(x)=-2x+8=0 ⇒ x=4.

Resultado final: se verifica Rolle y los puntos son c=0 y c=4.`
      },
      "2A": {
        options: [
          "6 m × 3 m × 1 m",
          "4 m × 3 m × 2 m",
          "7 m × 4 m × 0,5 m",
          "5 m × 2 m × 1,5 m"
        ],
        correct: 0,
        solution: `Resolución:
Sea x el lado de cada cuadrado que se corta. Las dimensiones del cajón serán:
largo=8-2x,
ancho=5-2x,
altura=x,
con 0<x<2,5.

El volumen es:
V(x)=x(8-2x)(5-2x)
=4x³-26x²+40x.

Derivamos:
V'(x)=12x²-52x+40
=4(3x²-13x+10).

Igualamos a cero:
3x²-13x+10=0
⇒ x=1 o x=frac{10}{3}.

El valor frac{10}{3} no pertenece al dominio. Para x=1, V' cambia de positivo a negativo, luego hay un máximo.

Dimensiones:
8-2·1=6 m,
5-2·1=3 m,
altura=1 m.

Resultado final: 6 m × 3 m × 1 m.`
      }
    },
    "mates2-analisis-96ce5a5777a5": {
      "1B a)": {
        options: ["3", "-3", "1", "No existe"],
        correct: 0,
        solution: `Resolución:
Al sustituir x=-2 aparece la indeterminación frac{0}{0}. Aplicamos la regla de L'Hôpital:

lim[x→-2] frac{x³+3x²-4}{x³+5x²+8x+4}
=lim[x→-2] frac{3x²+6x}{3x²+10x+8}.

Al sustituir vuelve a aparecer frac{0}{0}. Aplicamos L'Hôpital por segunda vez:

lim[x→-2] frac{6x+6}{6x+10}
=frac{-12+6}{-12+10}
=frac{-6}{-2}
=3.

Resultado final: el límite vale 3.`
      },
      "1B b)": {
        options: ["1", "frac{1}{2}", "0", "+∞"],
        correct: 0,
        solution: `Resolución:
Al sustituir x=0:
frac{x·ln(x+1)}{2-2cos x}=frac{0}{0}.

Aplicamos la regla de L'Hôpital:
lim[x→0] frac{ln(x+1)+frac{x}{x+1}}{2sen x}.

Sigue apareciendo frac{0}{0}, por lo que aplicamos L'Hôpital otra vez:

lim[x→0]
frac{frac{1}{x+1}+frac{1}{(x+1)²}}{2cos x}.

Sustituimos x=0:
frac{1+1}{2}=1.

Resultado final: el límite vale 1.`
      },
      "2B a)": {
        options: ["9 unidades cuadradas", "frac{9}{2} unidades cuadradas", "6 unidades cuadradas", "12 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
Las funciones son:
f(x)=-x²,
g(x)=x²-2x-4.

Calculamos los puntos de corte:
-x²=x²-2x-4
⇒ 2x²-2x-4=0
⇒ x²-x-2=0
⇒ x=-1 o x=2.

En [-1,2], f está por encima de g. Por tanto:
A=∫[-1→2] [f(x)-g(x)] dx
=∫[-1→2] (-2x²+2x+4) dx.

A=[-frac{2}{3}x³+x²+4x]_{-1}^{2}
=frac{20}{3}-(-frac{7}{3})
=frac{27}{3}
=9.

La gráfica muestra ambas parábolas, sus cortes x=-1 y x=2 y la región situada entre ellas.

Resultado final: 9 unidades cuadradas.`
      },
      "2B b)": {
        options: [
          "y-11=frac{1}{8}(x+3)",
          "y-11=-8(x+3)",
          "y+11=frac{1}{8}(x-3)",
          "y-11=-frac{1}{8}(x+3)"
        ],
        correct: 0,
        solution: `Resolución:
g(x)=x²-2x-4.

El punto de abscisa x=-3 es:
g(-3)=9+6-4=11,
por lo que P=(-3,11).

Derivamos:
g'(x)=2x-2.

La pendiente de la tangente es:
m=g'(-3)=-8.

La pendiente m_n de la normal cumple:
m·m_n=-1.

-8·m_n=-1
⇒ m_n=frac{1}{8}.

Usamos la ecuación punto-pendiente:
y-11=frac{1}{8}(x+3).

Resultado final: y-11=frac{1}{8}(x+3).`
      }
    },
    "mates2-analisis-9a1598812551": {
      "1A a)": {
        options: [
          "frac{59}{2} unidades cuadradas",
          "frac{88}{3} unidades cuadradas",
          "frac{89}{3} unidades cuadradas",
          "30 unidades cuadradas"
        ],
        correct: 0,
        solution: `Resolución:
f(x)=(x-1)(x-2)=x²-3x+2.

Los puntos de corte con el eje OX son:
x=1 y x=2.

En [-3,1], f(x)≥0; en [1,2], f(x)≤0. Por tanto:
A=∫[-3→1] (x²-3x+2) dx
 -∫[1→2] (x²-3x+2) dx.

Una primitiva es:
F(x)=frac{x³}{3}-frac{3x²}{2}+2x.

A=[F(1)-F(-3)]-[F(2)-F(1)]
=frac{88}{3}+frac{1}{6}
=frac{59}{2}.

La representación debe mostrar la parábola, las rectas x=-3 y x=2, los cortes x=1 y x=2 y las dos regiones respecto del eje OX.

Resultado final: frac{59}{2} unidades cuadradas.`
      },
      "1A b)": {
        options: ["y=x-2", "y=x+2", "y=2x-4", "y=-x+2"],
        correct: 0,
        solution: `Resolución:
f(x)=x²-3x+2.

Calculamos el punto:
f(2)=4-6+2=0,
por lo que P=(2,0).

Derivamos:
f'(x)=2x-3.

La pendiente en x=2 es:
f'(2)=1.

Ecuación punto-pendiente:
y-0=1·(x-2).

Resultado final: y=x-2.`
      },
      "2A a)": {
        options: ["k=frac{1}{e}", "k=e", "k=-1", "k=1"],
        correct: 0,
        solution: `Resolución:
Para la continuidad en x=0 debe cumplirse:
lim[x→0⁻] f(x)=f(0)=k.

Calculamos el límite:
L=lim[x→0⁻] ((x+1)/(2x+1))^(1/x).

Es una indeterminación 1^∞. Aplicamos la fórmula del número e:
L=e^M,

donde:
M=lim[x→0] frac{frac{x+1}{2x+1}-1}{x}
=lim[x→0] frac{-x}{x(2x+1)}
=lim[x→0] frac{-1}{2x+1}
=-1.

Por tanto:
L=e⁻¹=frac{1}{e}.

Resultado final: k=frac{1}{e}.`
      },
      "2A b)": {
        options: [
          "Sí, porque h(0)=-1 y h(2π)=2π-1 tienen signos opuestos",
          "No, porque cos x nunca vale 2-x",
          "Sí, porque h(0)=h(2π)=0",
          "No puede aplicarse Bolzano porque el coseno no es continuo"
        ],
        correct: 0,
        solution: `Resolución:
Teorema de Bolzano:
si h es continua en [a,b] y h(a)·h(b)<0, existe al menos un c∈(a,b) tal que h(c)=0.

Escribimos la ecuación como:
h(x)=cos x+x-2=0.

La función h es continua en [0,2π].

h(0)=1+0-2=-1.

h(2π)=1+2π-2=2π-1>0.

Como h(0)·h(2π)<0, existe al menos una solución en (0,2π).

Resultado final: sí existe al menos una solución real.`
      }
    },
    "mates2-analisis-109734dacfe2": {
      "1B": {
        options: [
          "Fondo 4 m × 4 m y profundidad 2 m",
          "Fondo 8 m × 8 m y profundidad 0,5 m",
          "Fondo 2 m × 2 m y profundidad 8 m",
          "Fondo 4 m × 4 m y profundidad 4 m"
        ],
        correct: 0,
        solution: `Resolución:
Sea x el lado del fondo cuadrado y h la profundidad.

El volumen es:
x²h=32
⇒ h=frac{32}{x²}.

La piscina no tiene tapa. La superficie de material es:
S=x²+4xh.

Sustituimos h:
S(x)=x²+4x·frac{32}{x²}
=x²+frac{128}{x}.

Derivamos:
S'(x)=2x-frac{128}{x²}.

Igualamos a cero:
2x-frac{128}{x²}=0
⇒ 2x³=128
⇒ x³=64
⇒ x=4.

S''(x)=2+frac{256}{x³}>0, luego es un mínimo.

h=frac{32}{4²}=2.

Resultado final: fondo de 4 m × 4 m y profundidad de 2 m.`
      },
      "2B a)": {
        options: [
          "frac{x²}{2}+x+4ln|x+2|-2ln|x-1|+C",
          "frac{x²}{2}+x-4ln|x+2|+2ln|x-1|+C",
          "x+4ln|x+2|-2ln|x-1|+C",
          "frac{x²}{2}+x+2ln|x+2|-4ln|x-1|+C"
        ],
        correct: 0,
        solution: `Resolución:
Dividimos los polinomios:
frac{x³+2x²+x-10}{x²+x-2}
=x+1+frac{2x-8}{x²+x-2}.

Factorizamos:
x²+x-2=(x+2)(x-1).

Descomponemos:
frac{2x-8}{(x+2)(x-1)}
=frac{A}{x+2}+frac{B}{x-1}.

2x-8=A(x-1)+B(x+2).

Para x=1:
-6=3B ⇒ B=-2.

Para x=-2:
-12=-3A ⇒ A=4.

Por tanto:
∫frac{x³+2x²+x-10}{x²+x-2}dx
=∫(x+1+frac{4}{x+2}-frac{2}{x-1})dx.

Resultado final:
frac{x²}{2}+x+4ln|x+2|-2ln|x-1|+C.`
      },
      "2B b)": {
        options: [
          "frac{x³}{3}ln x-frac{x³}{9}+C",
          "frac{x³}{3}ln x-frac{x²}{9}+C",
          "x³ln x-frac{x³}{3}+C",
          "frac{x³}{3}ln x+frac{x³}{9}+C"
        ],
        correct: 0,
        solution: `Resolución:
Aplicamos integración por partes:
∫u dv=u·v-∫v du.

Elegimos:
u=ln x ⇒ du=frac{1}{x}dx,
dv=x²dx ⇒ v=frac{x³}{3}.

Entonces:
∫x²ln x dx
=frac{x³}{3}ln x
-∫frac{x³}{3}·frac{1}{x}dx
=frac{x³}{3}ln x-frac{1}{3}∫x²dx
=frac{x³}{3}ln x-frac{x³}{9}+C.

Resultado final:
frac{x³}{3}ln x-frac{x³}{9}+C.`
      }
    }
  });
  // Matemáticas II · Probabilidad y Estadística · 2017.
  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-probabilidad-estadistica-820b3ed5396d": {
      "a1)": {
        options: ["0,051", "0,041", "0,060", "0,015"],
        correct: 0,
        solution: `Resolución:
Sea D el suceso «la resistencia es defectuosa».

Aplicamos el teorema de la probabilidad total:
P(D)=P(A)P(D|A)+P(B)P(D|B)+P(C)P(D|C).

Sustituimos:
P(D)=0,50·0,06+0,30·0,05+0,20·0,03
=0,030+0,015+0,006
=0,051.

Resultado final:
P(D)=0,051, es decir, un 5,1 %.`
      },
      "a2)": {
        options: ["frac{10}{17}≈0,5882", "frac{5}{17}≈0,2941", "frac{6}{17}≈0,3529", "0,50"],
        correct: 0,
        solution: `Resolución:
Se pide la probabilidad condicionada P(A|D).

Por el teorema de Bayes:
P(A|D)=frac{P(A)P(D|A)}{P(D)}.

Del apartado anterior:
P(D)=0,051.

Sustituimos:
P(A|D)=frac{0,50·0,06}{0,051}
=frac{0,030}{0,051}
=frac{10}{17}
≈0,5882.

Resultado final:
P(A|D)=frac{10}{17}≈0,5882.`
      },
      "b1)": {
        options: ["0,1323", "0,3087", "0,02835", "0,47178"],
        correct: 0,
        solution: `Resolución:
Sea X el número de resistencias fabricadas por B en una caja de 5.

Como P(B)=0,30:
X sigue una distribución binomial B(5;0,30).

Se pide:
P(X=3)=binom{5}{3}(0,30)³(0,70)².

Calculamos:
P(X=3)=10·0,027·0,49
=0,1323.

Resultado final:
P(X=3)=0,1323.`
      },
      "b2)": {
        options: ["0,47178", "0,52822", "0,36015", "0,16807"],
        correct: 0,
        solution: `Resolución:
Con X~B(5;0,30), se pide:
P(X≥2).

Usamos el suceso contrario:
P(X≥2)=1-P(X=0)-P(X=1).

P(X=0)=(0,70)⁵=0,16807.

P(X=1)=binom{5}{1}(0,30)(0,70)⁴
=5·0,30·0,2401
=0,36015.

Por tanto:
P(X≥2)=1-0,16807-0,36015
=0,47178.

Resultado final:
P(X≥2)=0,47178.`
      }
    },
    "mates2-probabilidad-estadistica-3c33932d4424": {
      "a1)": {
        options: ["frac{13}{40}=0,325", "frac{3}{10}=0,30", "frac{7}{20}=0,35", "frac{1}{4}=0,25"],
        correct: 0,
        solution: `Resolución:
Sea M el suceso «el libro elegido es de matemáticas».

Elegimos cada estantería con probabilidad frac{1}{2}.

En A hay 40 libros, de los cuales 10 son de matemáticas:
P(M|A)=frac{10}{40}=frac{1}{4}.

En B hay 20 libros, de los cuales 8 son de matemáticas:
P(M|B)=frac{8}{20}=frac{2}{5}.

Aplicamos la probabilidad total:
P(M)=frac{1}{2}·frac{1}{4}+frac{1}{2}·frac{2}{5}
=frac{1}{8}+frac{1}{5}
=frac{13}{40}
=0,325.

Resultado final:
P(M)=frac{13}{40}=0,325.`
      },
      "a2)": {
        options: ["frac{8}{13}≈0,6154", "frac{5}{13}≈0,3846", "frac{2}{5}=0,4", "frac{1}{2}=0,5"],
        correct: 0,
        solution: `Resolución:
Se pide P(B|M).

Por el teorema de Bayes:
P(B|M)=frac{P(B)P(M|B)}{P(M)}.

Sustituimos:
P(B|M)=frac{frac{1}{2}·frac{2}{5}}{frac{13}{40}}
=frac{frac{1}{5}}{frac{13}{40}}
=frac{8}{13}
≈0,6154.

Resultado final:
P(B|M)=frac{8}{13}≈0,6154.`
      },
      "b1)": {
        options: ["0,3446", "0,6554", "0,4013", "0,1587"],
        correct: 0,
        solution: `Resolución:
Sea X el tiempo de espera:
X~N(15,5).

Tipificamos dentro de la probabilidad:
P(X<13)
=P(Z<frac{13-15}{5})
=P(Z<-0,4).

Como la tabla proporciona valores positivos:
P(Z<-0,4)=1-P(Z<0,4).

Buscamos 0,4 en la tabla:
P(Z<0,4)=0,6554.

Por tanto:
P(X<13)=1-0,6554=0,3446.

Resultado final:
0,3446.`
      },
      "b2)": {
        options: ["17,2 minutos", "12,8 minutos", "16 minutos", "18,4 minutos"],
        correct: 0,
        solution: `Resolución:
Sea K el tiempo que es superado por el 33 % de los usuarios:
P(X>K)=0,33.

Entonces:
P(X≤K)=1-0,33=0,67.

Llamamos a al valor tipificado de K:
P(Z≤a)=0,67.

Buscamos 0,67 en la tabla de la normal típica:
a≈0,44.

Igualamos con la tipificación:
frac{K-15}{5}=0,44.

Despejamos:
K-15=2,2,

K=17,2.

Resultado final:
17,2 minutos.`
      }
    },
    "mates2-probabilidad-estadistica-7941a5c6dfcf": {
      "a1)": {
        options: ["0,0265", "0,0315", "0,0200", "0,0550"],
        correct: 0,
        solution: `Resolución:
Sea D el suceso «la placa tiene un defecto de soldadura».

Aplicamos la probabilidad total:
P(D)=0,25·0,03+0,20·0,04+0,55·0,02.

Calculamos cada producto:
P(D)=0,0075+0,0080+0,0110
=0,0265.

Resultado final:
P(D)=0,0265, es decir, un 2,65 %.`
      },
      "a2)": {
        options: ["frac{22}{53}≈0,4151", "frac{15}{53}≈0,2830", "frac{16}{53}≈0,3019", "0,55"],
        correct: 0,
        solution: `Resolución:
Se pide P(C|D).

Aplicamos el teorema de Bayes:
P(C|D)=frac{P(C)P(D|C)}{P(D)}.

Sustituimos:
P(C|D)=frac{0,55·0,02}{0,0265}
=frac{0,011}{0,0265}
=frac{22}{53}
≈0,4151.

Resultado final:
P(C|D)=frac{22}{53}≈0,4151.`
      },
      "b1)": {
        options: ["0,3456", "0,2304", "0,2592", "0,33696"],
        correct: 0,
        solution: `Resolución:
Sea X el número de caras en cinco lanzamientos.

Como P(cara)=0,6:
X~B(5;0,6).

Se pide:
P(X=3)=binom{5}{3}(0,6)³(0,4)².

Calculamos:
P(X=3)=10·0,216·0,16
=0,3456.

Resultado final:
P(X=3)=0,3456.`
      },
      "b2)": {
        options: ["0,33696", "0,25920", "0,07776", "0,68256"],
        correct: 0,
        solution: `Resolución:
Se pide obtener más de tres caras:
P(X>3)=P(X=4)+P(X=5).

P(X=4)=binom{5}{4}(0,6)⁴(0,4)
=5·0,1296·0,4
=0,25920.

P(X=5)=(0,6)⁵=0,07776.

Sumamos:
P(X>3)=0,25920+0,07776
=0,33696.

Resultado final:
P(X>3)=0,33696.`
      }
    },
    "mates2-probabilidad-estadistica-a8cf6e2cf5a9": {
      "a1)": {
        options: ["frac{3}{5}=0,6", "frac{1}{2}=0,5", "frac{2}{5}=0,4", "frac{3}{4}=0,75"],
        correct: 0,
        solution: `Resolución:
Sea B₂ el suceso «la segunda bola es blanca».

Aplicamos la probabilidad total según el color de la primera bola:

P(B₂)=P(B₁)P(B₂|B₁)+P(R₁)P(B₂|R₁).

Sustituimos:
P(B₂)=frac{3}{5}·frac{2}{4}+frac{2}{5}·frac{3}{4}
=frac{6}{20}+frac{6}{20}
=frac{12}{20}
=frac{3}{5}.

Resultado final:
P(B₂)=frac{3}{5}=0,6.`
      },
      "a2)": {
        options: ["frac{1}{2}=0,5", "frac{2}{5}=0,4", "frac{3}{5}=0,6", "frac{1}{3}≈0,3333"],
        correct: 0,
        solution: `Resolución:
Se pide P(R₁|B₂).

La probabilidad de extraer primero roja y después blanca es:
P(R₁∩B₂)=frac{2}{5}·frac{3}{4}
=frac{3}{10}.

Del apartado anterior:
P(B₂)=frac{3}{5}.

Aplicamos la definición de probabilidad condicionada:
P(R₁|B₂)=frac{P(R₁∩B₂)}{P(B₂)}
=frac{frac{3}{10}}{frac{3}{5}}
=frac{1}{2}.

Resultado final:
P(R₁|B₂)=frac{1}{2}=0,5.`
      },
      "b1)": {
        options: ["0,4013", "0,5987", "0,4602", "0,3446"],
        correct: 0,
        solution: `Resolución:
La varianza es 4, por tanto la desviación típica es:
σ=sqrt{4}=2.

Sea X~N(5,2).

Tipificamos dentro de la probabilidad:
P(X<4,5)
=P(Z<frac{4,5-5}{2})
=P(Z<-0,25).

Usamos la simetría:
P(Z<-0,25)=1-P(Z<0,25).

En la tabla:
P(Z<0,25)=0,5987.

Por tanto:
P(X<4,5)=1-0,5987=0,4013.

Resultado final:
0,4013.`
      },
      "b2)": {
        options: ["4,12 minutos", "5,88 minutos", "4,50 minutos", "3,24 minutos"],
        correct: 0,
        solution: `Resolución:
Sea K el tiempo no superado por el 33 % de las llamadas:
P(X≤K)=0,33.

Llamamos a al valor tipificado de K:
P(Z≤a)=0,33.

Buscamos 0,33 en la tabla de la normal típica. Por simetría:
a≈-0,44.

Igualamos con la tipificación:
frac{K-5}{2}=-0,44.

Despejamos:
K-5=-0,88,

K=4,12.

Resultado final:
4,12 minutos.`
      }
    }
  });
  // CCSS II · Álgebra y Programación Lineal · 2017.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-342a15ceede3": {
      "a)": {
        options: ["5", "3", "[[4,2],[2,1]]", "[[4,-2],[-2,1]]"],
        correct: 0,
        solution: `Resolución:
M=(-2,-1) y Mᵗ=[[ -2 ],[ -1 ]].

Multiplicamos fila por columna:
M·Mᵗ=(-2)·(-2)+(-1)·(-1)
=4+1
=5.

Resultado final: M·Mᵗ=5.`
      },
      "b)": {
        options: ["X=P⁻¹·Mᵗ·M", "X=Mᵗ·M·P⁻¹", "X=P·Mᵗ·M", "X=M·Mᵗ·P"],
        correct: 0,
        solution: `Resolución:
Partimos de:
P·X=Mᵗ·M.

Para aislar X multiplicamos ambos miembros por P⁻¹ a la izquierda:
P⁻¹·P·X=P⁻¹·Mᵗ·M.

Como P⁻¹·P=I:

Resultado final:
X=P⁻¹·Mᵗ·M.`
      },
      "c)": {
        options: [
          "[[22,11],[-16,-8]]",
          "[[22,-11],[16,-8]]",
          "[[4,2],[2,1]]",
          "[[-16,-8],[22,11]]"
        ],
        correct: 0,
        solution: `Resolución:
P=[[-2,-3],[3,4]].

Calculamos su determinante:
det(P)=(-2)·4-(-3)·3=-8+9=1.

Por tanto:
P⁻¹=[[4,3],[-3,-2]].

Además:
Mᵗ·M=[[-2],[-1]]·(-2,-1)
=[[4,2],[2,1]].

Usamos el despeje anterior:
X=P⁻¹·Mᵗ·M
=[[4,3],[-3,-2]]·[[4,2],[2,1]]
=[[22,11],[-16,-8]].

Resultado final:
X=[[22,11],[-16,-8]].`
      }
    },
    "ccss2-algebra-e4d75f8a58a8": {
      "a)": {
        options: [
          "{ x+y+z=320; 8x+20y+30z=6460; z=3y }",
          "{ x+y+z=6460; 8x+20y+30z=320; y=3z }",
          "{ x+y+z=320; 8x+20y+30z=6460; y=3z }",
          "{ x+y+z=320; 8x+20y+30z=6460; z=3x }"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos:
x = entradas de cine,
y = entradas de teatro,
z = entradas de concierto.

Total de entradas:
x+y+z=320.

Total recaudado:
8x+20y+30z=6460.

Las entradas de concierto son el triple que las de teatro:
z=3y.

Resultado final:
{ x+y+z=320
  8x+20y+30z=6460
  z=3y }.`
      },
      "b)": {
        options: [
          "120 de cine, 50 de teatro y 150 de concierto",
          "150 de cine, 50 de teatro y 120 de concierto",
          "120 de cine, 150 de teatro y 50 de concierto",
          "100 de cine, 55 de teatro y 165 de concierto"
        ],
        correct: 0,
        solution: `Resolución:
Sustituimos z=3y en la primera ecuación:
x+4y=320 ⇒ x=320-4y.

Sustituimos en la recaudación:
8(320-4y)+20y+30(3y)=6460.

2560-32y+20y+90y=6460,

78y=3900,

y=50.

Entonces:
z=3·50=150,

x=320-4·50=120.

Resultado final:
120 entradas de cine, 50 de teatro y 150 de concierto.`
      }
    },
    "ccss2-algebra-342a15ceede3-pl": {
      "a)": {
        options: [
          "La intersección de x+2y≤16, 5x+4y≥38 y 4y-x≥2",
          "La intersección de x+2y≥16, 5x+4y≤38 y 4y-x≤2",
          "La región definida solo por x≥0 e y≥0",
          "No existe región factible"
        ],
        correct: 0,
        solution: `Resolución:
Representamos las rectas frontera:
x+2y=16,
5x+4y=38,
4y-x=2.

Después comprobamos el semiplano de cada desigualdad:
x+2y≤16,
5x+4y≥38,
4y-x≥2.

La región factible es la zona común a los tres semiplanos. Es un triángulo cuyos vértices se calculan en el apartado siguiente.`
      },
      "b)": {
        options: [
          "(2,7), (6,2) y (10,3)",
          "(2,6), (7,2) y (10,3)",
          "(0,8), (6,2) y (10,0)",
          "(2,7), (5,3) y (8,4)"
        ],
        correct: 0,
        solution: `Resolución:
Calculamos las intersecciones dos a dos.

{ x+2y=16
  5x+4y=38 }
⇒ (x,y)=(2,7).

{ 5x+4y=38
  4y-x=2 }
⇒ (x,y)=(6,2).

{ x+2y=16
  4y-x=2 }
⇒ (x,y)=(10,3).

Los tres puntos cumplen todas las restricciones.

Resultado final:
(2,7), (6,2) y (10,3).`
      },
      "c)": {
        options: [
          "Mínimo en (2,7), con F=31",
          "Mínimo en (6,2), con F=36",
          "Mínimo en (10,3), con F=59",
          "Máximo en (2,7), con F=31"
        ],
        correct: 0,
        solution: `Resolución:
Evaluamos F=5x+3y en los vértices:

F(2,7)=5·2+3·7=10+21=31.

F(6,2)=5·6+3·2=30+6=36.

F(10,3)=5·10+3·3=50+9=59.

Como el problema pide minimizar, elegimos el menor valor.

Resultado final:
la solución óptima es (2,7) y el valor mínimo es F=31.`
      }
    },
    "ccss2-algebra-e4d75f8a58a8-pesas": {
      "a)": {
        options: [
          "{ x+y+z=40; z=x+y+8; 200x+100y+50z=3400 }",
          "{ x+y+z=40; x=y+z+8; 200x+100y+50z=3400 }",
          "{ x+y+z=3400; z=x+y+8; 200x+100y+50z=40 }",
          "{ x+y+z=40; z=x+y-8; 200x+100y+50z=3400 }"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x, y, z al número de pesas de 200 g, 100 g y 50 g.

Número total:
x+y+z=40.

Las de 50 g superan en ocho a la suma de las otras:
z=x+y+8.

Peso total:
200x+100y+50z=3400.

Ese es el sistema pedido.`
      },
      "b)": {
        options: [
          "6 pesas de 200 g, 10 de 100 g y 24 de 50 g",
          "10 pesas de 200 g, 6 de 100 g y 24 de 50 g",
          "6 pesas de 200 g, 24 de 100 g y 10 de 50 g",
          "8 pesas de 200 g, 8 de 100 g y 24 de 50 g"
        ],
        correct: 0,
        solution: `Resolución:
De z=x+y+8 y x+y+z=40:
2x+2y+8=40,

x+y=16,

z=24.

En la ecuación del peso:
200x+100y+50·24=3400.

200x+100y=2200,

2x+y=22.

Resolvemos:
{ x+y=16
  2x+y=22 }

Restando, x=6. Entonces y=10 y z=24.

Resultado final:
6 pesas de 200 g, 10 de 100 g y 24 de 50 g.`
      }
    },
    "ccss2-algebra-afc8cfa08edb": {
      "a)": {
        options: ["X=M⁻¹·P·N⁻¹", "X=P·M⁻¹·N⁻¹", "X=N⁻¹·P·M⁻¹", "X=M·P·N"],
        correct: 0,
        solution: `Resolución:
Partimos de:
M·X·N=P.

Multiplicamos a la izquierda por M⁻¹:
X·N=M⁻¹·P.

Multiplicamos a la derecha por N⁻¹:
X=M⁻¹·P·N⁻¹.

Resultado final:
X=M⁻¹·P·N⁻¹.`
      },
      "b)": {
        options: ["[[5,1],[19,4]]", "[[4,1],[19,5]]", "[[5,-1],[-19,4]]", "[[0,-1],[1,-3]]"],
        correct: 0,
        solution: `Resolución:
Sea:
M=[[-3,1],[-1,0]],
N=[[-1,-1],[5,4]].

La ecuación es:
M·X·N=I.

Por el despeje anterior:
X=M⁻¹·I·N⁻¹=M⁻¹·N⁻¹.

det(M)=1, por tanto:
M⁻¹=[[0,-1],[1,-3]].

det(N)=1, por tanto:
N⁻¹=[[4,1],[-5,-1]].

Multiplicamos:
X=[[0,-1],[1,-3]]·[[4,1],[-5,-1]]
=[[5,1],[19,4]].

Resultado final:
X=[[5,1],[19,4]].`
      }
    },
    "ccss2-algebra-32af90751520": {
      "a)": {
        options: [
          "{ 8x+12y+20z=3800; x=2y; x=4z }",
          "{ 8x+12y+20z=3800; y=2x; z=4x }",
          "{ x+y+z=3800; x=2y; x=4z }",
          "{ 8x+12y+20z=3800; x=y/2; x=z/4 }"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x, y, z al peso en gramos de una pesa mayor, intermedia y menor.

Peso total:
8x+12y+20z=3800.

Una intermedia pesa la mitad que una mayor:
y=frac{x}{2} ⇒ x=2y.

Cuatro pesas menores equivalen a una mayor:
4z=x.

Resultado final:
{ 8x+12y+20z=3800
  x=2y
  x=4z }.`
      },
      "b)": {
        options: [
          "200 g, 100 g y 50 g",
          "100 g, 200 g y 50 g",
          "200 g, 50 g y 100 g",
          "400 g, 200 g y 100 g"
        ],
        correct: 0,
        solution: `Resolución:
Sustituimos:
y=frac{x}{2}, z=frac{x}{4}.

8x+12·frac{x}{2}+20·frac{x}{4}=3800.

8x+6x+5x=3800,

19x=3800,

x=200.

Entonces:
y=frac{200}{2}=100,

z=frac{200}{4}=50.

Resultado final:
mayor 200 g, intermedia 100 g y menor 50 g.`
      }
    },
    "ccss2-algebra-afc8cfa08edb-transporte": {
      "a)": {
        options: ["P(x,y)=30x+20y", "P(x,y)=20x+30y", "P(x,y)=x+y", "P(x,y)=50xy"],
        correct: 0,
        solution: `Resolución:
Sea x el número de sacos de cemento e y el número de sacos de yeso.

Cada saco de cemento pesa 30 kg y cada saco de yeso, 20 kg.

Resultado final, función objetivo:
P(x,y)=30x+20y, que se debe minimizar.`
      },
      "b)": {
        options: [
          "25≤x≤100 y 30≤y≤90",
          "30≤x≤90 y 25≤y≤100",
          "x≥100 e y≥90",
          "0≤x≤25 y 0≤y≤30"
        ],
        correct: 0,
        solution: `Resolución:
Las condiciones del enunciado se traducen directamente:

25≤x≤100,

30≤y≤90.

La región factible es el rectángulo de vértices:
(25,30), (100,30), (100,90) y (25,90).`
      },
      "c)": {
        options: [
          "25 sacos de cemento y 30 de yeso; 1350 kg",
          "100 sacos de cemento y 90 de yeso; 4800 kg",
          "30 sacos de cemento y 25 de yeso; 1400 kg",
          "25 sacos de cemento y 90 de yeso; 2550 kg"
        ],
        correct: 0,
        solution: `Resolución:
La función P=30x+20y tiene coeficientes positivos, por lo que aumenta cuando aumenta x o y.

El mínimo se alcanza en el vértice con las dos coordenadas menores:
(x,y)=(25,30).

Calculamos el peso:
P(25,30)=30·25+20·30
=750+600
=1350 kg.

Resultado final:
25 sacos de cemento y 30 de yeso; peso mínimo 1350 kg.`
      }
    },
    "ccss2-algebra-32af90751520-entradas": {
      "a)": {
        options: [
          "{ 120x+50y+150z=6460; 2y=5x; 2z=3y }",
          "{ 120x+50y+150z=6460; 2x=5y; 2y=3z }",
          "{ x+y+z=6460; 2y=5x; 2z=3y }",
          "{ 120x+50y+150z=320; 2y=5x; 2z=3y }"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x, y, z a los precios de las entradas de cine, teatro y concierto.

Recaudación total:
120x+50y+150z=6460.

Dos entradas de teatro equivalen a cinco de cine:
2y=5x.

Dos entradas de concierto equivalen a tres de teatro:
2z=3y.

Ese es el sistema pedido.`
      },
      "b)": {
        options: [
          "Cine 8 €, teatro 20 € y concierto 30 €",
          "Cine 20 €, teatro 8 € y concierto 30 €",
          "Cine 8 €, teatro 30 € y concierto 20 €",
          "Cine 10 €, teatro 25 € y concierto 37,50 €"
        ],
        correct: 0,
        solution: `Resolución:
De las dos últimas ecuaciones:
y=frac{5}{2}x,

z=frac{3}{2}y=frac{15}{4}x.

Sustituimos en la recaudación:
120x+50·frac{5}{2}x+150·frac{15}{4}x=6460.

120x+125x+562,5x=6460,

807,5x=6460,

x=8.

Entonces:
y=frac{5}{2}·8=20,

z=frac{3}{2}·20=30.

Resultado final:
cine 8 €, teatro 20 € y concierto 30 €.`
      }
    }
  });
  // CCSS II · Probabilidad · 2017.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-db3f08b1334d": {
      "a)": {
        options: ["0,165", "0,145", "0,200", "0,835"],
        correct: 0,
        solution: `Resolución:
La proporción de Arte es:
1-0,45-0,35=0,20.

Sea S el suceso «nota media superior a 8».

P(S)=0,45·0,10+0,35·0,20+0,20·0,25
=0,045+0,070+0,050
=0,165.

Resultado final: P(S)=0,165.`
      },
      "b)": {
        options: ["frac{81}{167}≈0,4850", "frac{9}{20}=0,45", "frac{33}{167}≈0,1976", "0,405"],
        correct: 0,
        solution: `Resolución:
Sea N el suceso «nota media menor o igual a 8».

P(N)=1-0,165=0,835.

La probabilidad de ser de Ciencias y tener nota ≤8 es:
P(C∩N)=0,45·0,90=0,405.

Por tanto:
P(C|N)=frac{0,405}{0,835}
=frac{81}{167}
≈0,4850.

Resultado final: frac{81}{167}≈0,4850.`
      }
    },
    "ccss2-probabilidad-db3f08b1334d-empresa": {
      "a)": {
        options: ["0,14", "0,10", "0,20", "0,30"],
        correct: 0,
        solution: `Resolución:
Sea T el suceso «contrato temporal».

P(T)=0,80·0,10+0,20·0,30
=0,08+0,06
=0,14.

Resultado final: P(T)=0,14.`
      },
      "b)": {
        options: ["frac{3}{7}≈0,4286", "frac{4}{7}≈0,5714", "0,20", "0,30"],
        correct: 0,
        solution: `Resolución:
Aplicamos Bayes:
P(B|T)=frac{P(B)P(T|B)}{P(T)}.

P(B|T)=frac{0,20·0,30}{0,14}
=frac{0,06}{0,14}
=frac{3}{7}
≈0,4286.

Resultado final: frac{3}{7}≈0,4286.`
      }
    },
    "ccss2-probabilidad-3f594c3bb677": {
      "a)": {
        options: ["0,06", "0,37", "0,0406", "0,43"],
        correct: 0,
        solution: `Resolución:
Sean A «supera el límite de alcohol» y D «presencia de drogas».

Usamos:
P(A∪D)=P(A)+P(D)-P(A∩D).

Despejamos:
P(A∩D)=0,29+0,14-0,37
=0,06.

Resultado final: P(A∩D)=0,06.`
      },
      "b)": {
        options: [
          "No son independientes, porque 0,06≠0,29·0,14",
          "Son independientes, porque 0,06=0,29+0,14",
          "Son incompatibles",
          "Son complementarios"
        ],
        correct: 0,
        solution: `Resolución:
Dos sucesos son independientes si:
P(A∩D)=P(A)P(D).

Calculamos:
P(A)P(D)=0,29·0,14=0,0406.

Pero:
P(A∩D)=0,06.

Como 0,06≠0,0406, los sucesos no son independientes.`
      }
    },
    "ccss2-probabilidad-3f594c3bb677-fumadores": {
      "a)": {
        options: ["0,01", "0,10", "0,20", "0,90"],
        correct: 0,
        solution: `Resolución:
Los sucesos son independientes y cada persona tiene probabilidad 0,1.

P(las dos)=0,1·0,1=0,01.

Resultado final: 0,01.`
      },
      "b)": {
        options: ["0,3439", "0,6561", "0,4000", "0,1000"],
        correct: 0,
        solution: `Resolución:
Calculamos el suceso contrario: que ninguna de las cuatro personas padezca cáncer.

P(ninguna)=0,9⁴=0,6561.

Por tanto:
P(al menos una)=1-0,6561
=0,3439.

Resultado final: 0,3439.`
      },
      "c)": {
        options: ["0,18", "0,01", "0,09", "0,20"],
        correct: 0,
        solution: `Resolución:
Exactamente una de dos personas puede ocurrir de dos formas:

P(C₁∩no C₂)+P(no C₁∩C₂)
=0,1·0,9+0,9·0,1
=0,09+0,09
=0,18.

Resultado final: 0,18.`
      }
    }
  });

  // CCSS II · Inferencia estadística · 2017.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-estadistica-9f92cea66f1c": {
      "a)": {
        options: ["(18,00; 30,40)", "(14,20; 34,20)", "(20,00; 28,40)", "(17,80; 30,60)"],
        correct: 0,
        solution: `Resolución:
La media muestral es:
x̄=frac{15+19+20+22+24+25+27+28+30+32}{10}
=frac{242}{10}
=24,2.

Para un 95 % de confianza, z=1,96.

El error es:
E=1,96·frac{10}{sqrt{10}}≈6,20.

Intervalo:
(x̄-E,x̄+E)
=(24,2-6,20,24,2+6,20).

Resultado final:
(18,00;30,40) minutos.`
      },
      "b)": {
        options: ["385", "384", "196", "100"],
        correct: 0,
        solution: `Resolución:
Queremos:
E=1,96·frac{10}{sqrt{n}}<1.

Despejamos:
sqrt{n}>19,6,

n>19,6²=384,16.

El menor número entero que cumple la desigualdad es:
n=385.

Resultado final: tamaño mínimo 385.`
      }
    },
    "ccss2-estadistica-9f92cea66f1c-hogares": {
      "a)": {
        options: [
          "Media 150 € y nivel de confianza aproximado del 97 %",
          "Media 150 € y nivel de confianza del 95 %",
          "Media 128,3 € y nivel del 97 %",
          "Media 171,7 € y nivel del 96,6 %"
        ],
        correct: 0,
        solution: `Resolución:
La media muestral es el centro del intervalo:
x̄=frac{128,3+171,7}{2}=150.

El error es:
E=171,7-150=21,7.

Como n=9 y σ=30:
21,7=z·frac{30}{sqrt{9}}=10z.

z=2,17.

En la tabla:
P(Z≤2,17)≈0,9850.

Por tanto:
nivel=2·0,9850-1=0,9700.

Resultado final:
media 150 € y confianza aproximada del 97 %.`
      },
      "b)": {
        options: ["6,36 €", "5,88 €", "2,12 €", "3,00 €"],
        correct: 0,
        solution: `Resolución:
Para un nivel del 96,6 %:
α=1-0,966=0,034,

1-frac{α}{2}=0,983.

En la tabla normal:
z≈2,12.

Con n=100 y σ=30:
E=2,12·frac{30}{sqrt{100}}
=2,12·3
=6,36.

Resultado final: error máximo 6,36 €.`
      }
    },
    "ccss2-estadistica-8ae25e56e4d3": {
      "a)": {
        options: ["(6,328; 7,072)", "(5,500; 7,900)", "(6,400; 7,000)", "(6,080; 7,320)"],
        correct: 0,
        solution: `Resolución:
Datos:
x̄=6,7, σ=1,2, n=40.

Para el 95 %, z=1,96.

E=1,96·frac{1,2}{sqrt{40}}
≈0,372.

Intervalo:
(6,7-0,372,6,7+0,372).

Resultado final:
(6,328;7,072) kg.`
      },
      "b)": {
        options: [
          "Al aumentar la confianza, el intervalo se ensancha; al disminuirla, se estrecha",
          "Al aumentar la confianza, el intervalo se estrecha",
          "La confianza no afecta al intervalo",
          "El intervalo siempre conserva la misma amplitud"
        ],
        correct: 0,
        solution: `Resolución:
El error es:
E=z_{α/2}·frac{σ}{sqrt{n}}.

Si aumenta el nivel de confianza, aumenta el valor crítico z y, por tanto, aumenta E: el intervalo se ensancha.

Si disminuye el nivel de confianza, disminuye z y E: el intervalo se estrecha.`
      },
      "c)": {
        options: [
          "No; 5 kg queda fuera del intervalo de confianza del 90 %",
          "Sí; 5 kg pertenece al intervalo",
          "Sí; la media muestral siempre coincide con 5",
          "No puede decidirse con estos datos"
        ],
        correct: 0,
        solution: `Resolución:
Para un 90 % de confianza, z=1,645.

E=1,645·frac{1,2}{sqrt{40}}
≈0,312.

Intervalo del 90 %:
(6,7-0,312,6,7+0,312)
=(6,388;7,012).

Como 5 no pertenece al intervalo, no es razonable aceptar μ=5 kg con ese nivel de confianza.`
      }
    },
    "ccss2-estadistica-8ae25e56e4d3-electricidad": {
      "a)": {
        options: ["(24,80; 34,40)", "(22,60; 36,60)", "(25,26; 33,94)", "(27,43; 31,77)"],
        correct: 0,
        solution: `Resolución:
La media muestral es:
x̄=frac{25+29+30+32+24+28+31+32+33+32}{10}
=29,6.

Para un 97 % de confianza:
z≈2,17.

E=2,17·frac{7}{sqrt{10}}
≈4,80.

Intervalo:
(29,6-4,80,29,6+4,80).

Resultado final:
(24,80;34,40) €.`
      },
      "b)": {
        options: ["58", "57", "48", "59"],
        correct: 0,
        solution: `Resolución:
Queremos:
E=2,17·frac{7}{sqrt{n}}<2.

Despejamos:
sqrt{n}>frac{2,17·7}{2}=7,595,

n>7,595²≈57,68.

El menor entero que cumple la condición es:
n=58.

Resultado final: tamaño mínimo 58 hogares.`
      }
    }
  });
  // CCSS II · Análisis · 2017.
  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-aaaa7a75add4": {
      "a)": {
        options: ["t=-2", "t=0", "t=2", "t=-1"],
        correct: 0,
        solution: `Resolución:
Cada rama es continua. Estudiamos x=1.

Límite por la izquierda y valor:
lim_{x→1-}f(x)=f(1)=1²+1-3=-1.

Límite por la derecha:
lim_{x→1+}f(x)=1+t.

Para que sea continua:
-1=1+t ⇒ t=-2.

Resultado final: t=-2.`
      },
      "b)": {
        options: [
          "Mínimo en (frac{-1}{2},frac{-13}{4})",
          "Máximo en (frac{-1}{2},frac{-13}{4})",
          "Mínimo en (1,-1)",
          "No tiene extremos"
        ],
        correct: 0,
        solution: `Resolución:
Para t=0 y x∈(-∞,1]:
f(x)=x²+x-3.

Derivamos:
f'(x)=2x+1.

f'(x)=0 ⇒ x=-frac{1}{2}.

Recta de signos:
si x<-frac{1}{2}, f'(x)<0 ↓;
si x>-frac{1}{2}, f'(x)>0 ↑.

Por tanto hay un mínimo en x=-frac{1}{2}.

f(-frac{1}{2})=frac{1}{4}-frac{1}{2}-3=-frac{13}{4}.

Resultado final:
mínimo relativo en (frac{-1}{2},frac{-13}{4}).`
      },
      "c)": {
        options: [
          "Decrece en (-∞,-frac{1}{2}) y crece en (-frac{1}{2},1]",
          "Crece en (-∞,-frac{1}{2}) y decrece después",
          "Crece en todo (-∞,1]",
          "Decrece en todo (-∞,1]"
        ],
        correct: 0,
        solution: `Resolución:
f'(x)=2x+1 se anula en x=-frac{1}{2}.

Probamos un valor de cada intervalo:

En (-∞,-frac{1}{2}), por ejemplo x=-1:
f'(-1)=-1<0 ⇒ decrece.

En (-frac{1}{2},1], por ejemplo x=0:
f'(0)=1>0 ⇒ crece.

Resultado final:
decrece en (-∞,-frac{1}{2}) y crece en (-frac{1}{2},1].`
      }
    },
    "ccss2-analisis-aaaa7a75add4-parametros": {
      "Resultado": {
        options: [
          "a=-frac{1}{32}, b=frac{3}{2}, c=2",
          "a=frac{1}{32}, b=-frac{3}{2}, c=2",
          "a=-frac{1}{16}, b=2, c=3",
          "a=0, b=1, c=2"
        ],
        correct: 0,
        solution: `Resolución:
H(x)=ax³+bx+c.

El punto de inflexión (0,2) pertenece a la gráfica:
H(0)=c=2.

El máximo (4,6) pertenece a la gráfica:
H(4)=64a+4b+c=6.

Con c=2:
16a+b=1.  (1)

Además, en un máximo H'(4)=0.

H'(x)=3ax²+b,

H'(4)=48a+b=0.  (2)

Resolvemos el sistema:
{ 16a+b=1
  48a+b=0 }

Restando:
32a=-1 ⇒ a=-frac{1}{32}.

b=frac{3}{2}, c=2.

Comprobación:
H''(x)=6ax y H''(4)=-frac{3}{4}<0, luego es un máximo.

Resultado final:
a=-frac{1}{32}, b=frac{3}{2}, c=2.`
      }
    },
    "ccss2-analisis-aaaa7a75add4-grafica": {
      "a)": {
        options: ["t=8", "t=0", "t=9", "t=-8"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=1.

Límite izquierdo y valor:
lim_{x→1-}f(x)=f(1)=(1+2)²=9.

Límite derecho:
lim_{x→1+}f(x)=(1-2)²+t=1+t.

Igualamos:
9=1+t ⇒ t=8.

Resultado final: t=8.`
      },
      "b)": {
        options: [
          "Dos ramas parabólicas: (x+2)² para x≤1 y (x-2)² para x>1",
          "Una única parábola y=x²",
          "Dos rectas que se cortan en x=1",
          "Una función constante"
        ],
        correct: 0,
        solution: `Resolución:
Para t=0:
f(x)={(x+2)² si x≤1; (x-2)² si x>1}.

Primera rama: parábola de vértice (-2,0), dibujada hasta x=1, con punto cerrado (1,9).

Segunda rama: parábola de vértice (2,0), dibujada para x>1, con punto abierto en (1,1).

Como 9≠1, hay una discontinuidad de salto en x=1.`
      }
    },
    "ccss2-analisis-aaaa7a75add4-cine": {
      "a)": {
        options: [
          "F(0)=150 y F(16)=frac{514}{3}, en cientos de euros",
          "F(0)=0 y F(16)=150",
          "F(0)=150 y F(16)=78",
          "F(0)=frac{514}{3} y F(16)=150"
        ],
        correct: 0,
        solution: `Resolución:
F(x)=frac{1}{3}x³-frac{15}{2}x²+36x+150.

En el estreno:
F(0)=150.

Al final:
F(16)=frac{4096}{3}-frac{15}{2}·256+576+150
=frac{514}{3}.

Como F está en cientos de euros:
150 corresponde a 15 000 € y frac{514}{3} a aproximadamente 17 133,33 €.`
      },
      "b)": {
        options: [
          "Crece en (0,3) y (12,16); decrece en (3,12)",
          "Crece en (3,12) y decrece en el resto",
          "Crece en todo [0,16]",
          "Decrece en todo [0,16]"
        ],
        correct: 0,
        solution: `Resolución:
Derivamos:
F'(x)=x²-15x+36
=(x-3)(x-12).

Recta de signos:
en (0,3), F'>0 ↑;
en (3,12), F'<0 ↓;
en (12,16), F'>0 ↑.

Resultado final:
crece en (0,3) y (12,16), y decrece en (3,12).`
      },
      "c)": {
        options: [
          "Máximo en x=3: 199,5; mínimo en x=12: 78, en cientos de euros",
          "Máximo en x=12: 78; mínimo en x=3: 199,5",
          "Máximo en x=16 y mínimo en x=0",
          "Máximo y mínimo en x=3"
        ],
        correct: 0,
        solution: `Resolución:
Los candidatos en [0,16] son:
x=0, x=3, x=12 y x=16.

F(0)=150,
F(3)=frac{399}{2}=199,5,
F(12)=78,
F(16)=frac{514}{3}≈171,33.

Comparamos los cuatro valores.

Resultado final:
máximo en la semana 3, con 199,5 cientos de euros;
mínimo en la semana 12, con 78 cientos de euros.`
      }
    },
    "ccss2-analisis-e5bc24d79f14": {
      "a)": {
        options: ["t=0, t=sqrt{2} o t=-sqrt{2}", "Solo t=0", "t=2", "t=1"],
        correct: 0,
        solution: `Resolución:
Estudiamos x=0.

Límite izquierdo y valor:
lim_{x→0-}f(x)=f(0)=2t.

Límite derecho:
lim_{x→0+}f(x)=t³.

Para que sea continua:
t³=2t,

t(t²-2)=0.

Resultado final:
t=0, t=sqrt{2} o t=-sqrt{2}.`
      },
      "b)": {
        options: [
          "Mínimo en (frac{1}{sqrt{3}},-frac{2sqrt{3}}{9})",
          "Máximo en (frac{1}{sqrt{3}},-frac{2sqrt{3}}{9})",
          "Mínimo en (1,0)",
          "No tiene extremos"
        ],
        correct: 0,
        solution: `Resolución:
Para t=0 y x>0:
f(x)=x³-x.

f'(x)=3x²-1.

En (0,∞), f'(x)=0 da:
x=frac{1}{sqrt{3}}.

Antes de ese valor f'<0 y después f'>0, luego hay un mínimo.

f(frac{1}{sqrt{3}})
=frac{1}{3sqrt{3}}-frac{1}{sqrt{3}}
=-frac{2sqrt{3}}{9}.

Resultado final:
mínimo en (frac{1}{sqrt{3}},-frac{2sqrt{3}}{9}).`
      },
      "c)": {
        options: [
          "Decrece en (0,frac{1}{sqrt{3}}) y crece en (frac{1}{sqrt{3}},∞)",
          "Crece primero y después decrece",
          "Crece en todo (0,∞)",
          "Decrece en todo (0,∞)"
        ],
        correct: 0,
        solution: `Resolución:
f'(x)=3x²-1 se anula en x=frac{1}{sqrt{3}} dentro de (0,∞).

Probamos signos:
f'(frac{1}{4})<0 ⇒ decrece;
f'(1)=2>0 ⇒ crece.

Resultado final:
decrece en (0,frac{1}{sqrt{3}}) y crece en (frac{1}{sqrt{3}},∞).`
      }
    },
    "ccss2-analisis-e5bc24d79f14-ciclista": {
      "a)": {
        options: ["10 minutos", "5 minutos", "7,5 minutos", "20 minutos"],
        correct: 0,
        solution: `Resolución:
El ciclista se detiene cuando V(x)=0:

-frac{1}{20}x⁴+frac{1}{2}x³=0.

Factorizamos:
frac{x³}{20}(10-x)=0.

Las soluciones son x=0 y x=10.

x=0 es el inicio; por tanto completa la vuelta a los 10 minutos.`
      },
      "b)": {
        options: [
          "Crece de 0 a 7,5 min y decrece de 7,5 a 10 min",
          "Crece de 0 a 10 min",
          "Decrece de 0 a 7,5 min",
          "Crece de 0 a 5 min y decrece después"
        ],
        correct: 0,
        solution: `Resolución:
V'(x)=-frac{1}{5}x³+frac{3}{2}x²
=frac{x²}{10}(15-2x).

En el recorrido 0≤x≤10:
V'(x)>0 si 0<x<frac{15}{2};
V'(x)<0 si frac{15}{2}<x<10.

Resultado final:
crece de 0 a 7,5 minutos y decrece de 7,5 a 10 minutos.`
      },
      "c)": {
        options: [
          "A los 7,5 min, con frac{3375}{64}≈52,73 km/h",
          "A los 10 min, con 50 km/h",
          "A los 5 min, con 31,25 km/h",
          "A los 7,5 min, con 75 km/h"
        ],
        correct: 0,
        solution: `Resolución:
Por el cambio de signo de V', el máximo se alcanza en:
x=frac{15}{2}=7,5.

Calculamos:
V(frac{15}{2})
=-frac{1}{20}(frac{15}{2})⁴+frac{1}{2}(frac{15}{2})³
=frac{3375}{64}
≈52,73.

Resultado final:
a los 7,5 minutos, con aproximadamente 52,73 km/h.`
      }
    },
    "ccss2-analisis-e5bc24d79f14-grafica": {
      "a)": {
        options: ["t=4 o t=8", "Solo t=4", "Solo t=8", "t=2"],
        correct: 0,
        solution: `Resolución:
En x=1, el valor de la rama central es:
f(1)=4.

El límite por la derecha es:
lim_{x→1+}f(x)=(t-6)².

Continuidad:
(t-6)²=4.

t-6=±2.

Resultado final:
t=4 o t=8.`
      },
      "b)": {
        options: [
          "Para t=2: (x+4)² si x<-1; 4 si -1≤x≤1; (2x-6)² si x>1",
          "Una sola parábola continua",
          "Una recta constante y=4",
          "La función es continua en x=-1 y x=1"
        ],
        correct: 0,
        solution: `Resolución:
Para t=2:
f(x)={(x+4)² si x<-1; 4 si -1≤x≤1; (2x-6)² si x>1}.

Primera rama: parábola con vértice (-4,0), hasta x=-1 sin incluir; punto abierto (-1,9).

Rama central: segmento horizontal y=4 desde x=-1 hasta x=1, con extremos cerrados.

Tercera rama: parábola (2x-6)² para x>1; punto abierto en (1,16).

Hay saltos en x=-1 y x=1.`
      }
    }
  });
})();
