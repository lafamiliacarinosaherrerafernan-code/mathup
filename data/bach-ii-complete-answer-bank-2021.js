// Banco operativo verificado de ejercicios oficiales de 2021.
// Cada apartado dispone de cuatro opciones, una respuesta correcta y resolución.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-a4729dcbf5b6": {
      "a)": {
        options: ["det(A·Aᵀ)=1", "det(A·Aᵀ)=-1", "det(A·Aᵀ)=2", "det(A·Aᵀ)=0"],
        correct: 0,
        solution: `Resolución:
1. Usamos det(A·Aᵀ)=det(A)·det(Aᵀ) y det(Aᵀ)=det(A).
2. Por Sarrus:
det(A)=|2 1 2; 0 1 1; 1 0 1|=1.
3. Por tanto:
det(A·Aᵀ)=[det(A)]²=1²=1.
Resultado final: det(A·Aᵀ)=1.`
      },
      "b)": {
        options: [
          "X=((-3,1,0),(0,-3,1),(1,0,-5))",
          "X=((3,-1,0),(0,3,-1),(-1,0,5))",
          "X=((-3,0,1),(1,-3,0),(0,1,-5))",
          "X=I"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de X·A+3A=B y aislamos el término que contiene X:
X·A=B-3A.
2. Multiplicamos por A⁻¹ a la derecha:
X=(B-3A)·A⁻¹.
3. det(A)=1≠0 y, calculando la inversa mediante determinantes:
A⁻¹=((1,-1,-1),(1,0,-2),(-1,1,2)).
4. B-3A=((-6,-2,-5),(1,-3,-2),(-3,1,-3)).
5. Multiplicamos:
X=(B-3A)·A⁻¹
=((-3,1,0),(0,-3,1),(1,0,-5)).
Resultado final: X=((-3,1,0),(0,-3,1),(1,0,-5)).`
      }
    },
    "mates2-algebra-a4729dcbf5b6--mates-ii-algebra-2": {
      "b)": {
        options: ["(x,y,z)=(3,-1,-1)", "(x,y,z)=(1,1,-1)", "(x,y,z)=(3,1,-1)", "El sistema es incompatible"],
        correct: 0,
        solution: `Resolución:
1. Sustituimos a=0:
{x+y+z=1; z=-1; x-y+z=3}.
2. Con z=-1, las ecuaciones primera y tercera quedan:
{x+y=2; x-y=4}.
3. Sumando ambas ecuaciones: 2x=6, luego x=3.
4. Sustituyendo en x+y=2: y=-1.
Resultado final: (x,y,z)=(3,-1,-1).`
      }
    },
    "mates2-algebra-d538cc9133da": {
      "a)": {
        options: [
          "A⁻¹=1/2·((1,-1,-1),(1,-3,1),(-1,3,1))",
          "A⁻¹=((1,-1,-1),(1,-3,1),(-1,3,1))",
          "A no tiene inversa",
          "A⁻¹=1/2·((1,1,-1),(-1,-3,3),(-1,1,1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el determinante por Sarrus:
det(A)=|3 1 2; 1 0 1; 0 1 1|=-2≠0.
Por tanto, A tiene inversa.
2. Aplicamos la fórmula usada en el curso:
A⁻¹=Adj(Aᵀ)/det(A).
3. Calculando los adjuntos y trasponiendo:
A⁻¹=((1/2,-1/2,-1/2),(1/2,-3/2,1/2),(-1/2,3/2,1/2)).
Resultado final:
A⁻¹=1/2·((1,-1,-1),(1,-3,1),(-1,3,1)).`
      },
      "b)": {
        options: [
          "X=1/2·((-1,3,3),(-3,11,-3),(3,-9,-1))",
          "X=1/2·((1,-3,-3),(3,-11,3),(-3,9,1))",
          "X=A-3I",
          "X=1/2·((-1,-3,3),(3,11,-9),(3,-3,-1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de A·X+3I=A:
A·X=A-3I.
2. Multiplicamos por A⁻¹ a la izquierda:
X=A⁻¹(A-3I)=I-3A⁻¹.
3. Usamos
A⁻¹=1/2·((1,-1,-1),(1,-3,1),(-1,3,1)).
4. Operamos:
X=1/2·((-1,3,3),(-3,11,-3),(3,-9,-1)).
Resultado final:
X=1/2·((-1,3,3),(-3,11,-3),(3,-9,-1)).`
      }
    },
    "mates2-algebra-d538cc9133da--mates-ii-algebra-2": {
      "b)": {
        options: ["(x,y,z)=(1,0,1)", "(x,y,z)=(0,1,1)", "(x,y,z)=(1,1,0)", "El sistema es incompatible"],
        correct: 0,
        solution: `Resolución:
1. Sustituimos a=2:
{x+2y+z=2; x+z=2; 2x+2y+z=3}.
2. Restamos la segunda ecuación a la primera: 2y=0, luego y=0.
3. Queda {x+z=2; 2x+z=3}. Restando: x=1.
4. Sustituimos en x+z=2 y obtenemos z=1.
Resultado final: (x,y,z)=(1,0,1).`
      }
    },
    "mates2-analisis-fd4e47c0cc34": {
      "b)": {
        options: [
          "-1/2·ln(x²+3)+1/√3·arctan(x/√3)+C",
          "1/2·ln(x²+3)+1/√3·arctan(x/√3)+C",
          "-ln(x²+3)+arctan(x)+C",
          "(-x+1)/(x²+3)+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Separamos la integral:
∫((-x+1)/(x²+3))dx
=-∫(x/(x²+3))dx+∫(1/(x²+3))dx.
2. En la primera, u=x²+3 y du=2x dx:
-∫(x/(x²+3))dx=-1/2·ln(x²+3).
3. Usamos ∫dx/(x²+a²)=1/a·arctan(x/a):
∫dx/(x²+3)=1/√3·arctan(x/√3).
Resultado final:
-1/2·ln(x²+3)+1/√3·arctan(x/√3)+C.`
      }
    },
    "mates2-analisis-fd4e47c0cc34--mates-ii-analisis-2": {
      "a)": {
        options: ["a=2, b=2", "a=1, b=3", "a=2, b=-2", "a=-2, b=6"],
        correct: 0,
        solution: `Resolución:
1. f(x)=ax³-2x²-x+b pasa por (1,1):
f(1)=1 ⟹ a-2-1+b=1 ⟹ a+b=4.
2. Derivamos:
f'(x)=3ax²-4x-1.
3. La pendiente en x=1 es 1:
f'(1)=1 ⟹ 3a-5=1 ⟹ a=2.
4. Sustituimos en a+b=4: b=2.
Resultado final: a=2 y b=2.`
      },
      "b)": {
        options: ["a=-1, b=1", "a=1, b=1", "a=-1, b=-1", "a=0, b=1"],
        correct: 0,
        solution: `Resolución:
1. Para que sea continua en x=0:
lim(x→0⁻)(x²-ax+1)=1,
f(0)=lim(x→0⁺)beˣ=b.
Por tanto, b=1.
2. Derivamos cada rama:
f'(x)=2x-a si x<0; f'(x)=beˣ si x>0.
3. Igualamos las derivadas laterales en 0:
f'(0⁻)=-a, f'(0⁺)=b=1.
-a=1 ⟹ a=-1.
Resultado final: a=-1 y b=1.`
      }
    },
    "mates2-analisis-fd4e47c0cc34--mates-ii-analisis-3": {
      "a)": {
        options: ["1/2", "1", "0", "2"],
        correct: 0,
        solution: `Resolución mediante la regla de L'Hôpital:
1. Al sustituir x=2 obtenemos 0/0.
2. Derivamos numerador y denominador:
lim(x→2) e^(x-2)/2.
3. Sustituimos x=2:
e⁰/2=1/2.
Resultado final: el límite vale 1/2.`
      },
      "b)": {
        options: [
          "Dom(f)=ℝ\\{2}; continua en x=1, discontinuidad infinita en x=2 y de salto en x=3",
          "Dom(f)=ℝ; continua en todo ℝ",
          "Dom(f)=ℝ\\{3}; discontinuidad evitable en x=2",
          "Dom(f)=ℝ\\{1,2}; solo es discontinua en x=1"
        ],
        correct: 0,
        solution: `Resolución:
1. Las ramas son continuas en sus respectivos intervalos. El denominador x-2 obliga a excluir x=2:
Dom(f)=ℝ\\{2}.
2. En x=1:
lim(x→1⁻)(x²-2)=-1,
f(1)=lim(x→1⁺)(2x-1)/(x-2)=-1.
Es continua en x=1.
3. En x=2, el denominador se anula y el numerador vale 3≠0. Hay una discontinuidad infinita.
4. En x=3:
lim(x→3⁻)(2x-1)/(x-2)=5,
f(3)=5,
lim(x→3⁺)2eˣ=2e³.
Los límites laterales son finitos y distintos: discontinuidad de salto.
Resultado final: Dom(f)=ℝ\\{2}; continua en x=1, infinita en x=2 y de salto en x=3.`
      }
    },
    "mates2-analisis-066e18a48abd": {
      "b)": {
        options: [
          "1/√2·arctan(√2x)+C",
          "1/2·arctan(2x)+C",
          "ln(2x²+1)+C",
          "√2·arctan(x/√2)+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos 2x²+1=(√2x)²+1.
2. Hacemos u=√2x, por lo que dx=du/√2.
3. Entonces:
∫dx/(2x²+1)=1/√2·∫du/(u²+1)
=1/√2·arctan(u)+C.
Resultado final: 1/√2·arctan(√2x)+C.`
      }
    },
    "mates2-analisis-066e18a48abd--mates-ii-analisis-2": {
      "a)": {
        options: ["1", "0", "e", "1/e"],
        correct: 0,
        solution: `Resolución mediante la regla de L'Hôpital:
1. Al sustituir x=1 aparece 0/0.
2. Derivamos:
lim(x→1) 1/e^(x-1).
3. Sustituimos:
1/e⁰=1.
Resultado final: el límite vale 1.`
      },
      "b)": {
        options: [
          "Discontinuidad de salto en x=0 y en x=2",
          "Continua en x=0 y x=2",
          "Infinita en x=0 y evitable en x=2",
          "Evitable en ambos puntos"
        ],
        correct: 0,
        solution: `Resolución:
1. En x=0:
lim(x→0⁻)eˣ=1,
f(0)=lim(x→0⁺)1/(x-1)=-1.
Son finitos y distintos: discontinuidad de salto.
2. En x=2:
lim(x→2⁻)1/(x-1)=1,
f(2)=1,
lim(x→2⁺)x=2.
También son finitos y distintos: discontinuidad de salto.
Resultado final: hay discontinuidad de salto en x=0 y en x=2.`
      }
    },
    "mates2-analisis-066e18a48abd--mates-ii-analisis-3": {
      "a)": {
        options: [
          "Mínimo (2-√5,-√5/3) y máximo (2+√5,√5/3)",
          "Máximo (2-√5,-√5/3) y mínimo (2+√5,√5/3)",
          "No tiene extremos relativos",
          "Mínimo (-2-√5,-√5/3) y máximo (-2+√5,√5/3)"
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos la regla del cociente:
f'(x)=(-6x²+24x+6)/(3x²+3)²
=-6(x²-4x-1)/(3x²+3)².
2. El denominador es siempre positivo. f'(x)=0 cuando:
x²-4x-1=0 ⟹ x=2±√5.
3. Estudiamos el signo de f' en la recta real:
(-∞,2-√5): f'<0;
(2-√5,2+√5): f'>0;
(2+√5,∞): f'<0.
Por tanto, en 2-√5 hay mínimo y en 2+√5 hay máximo.
4. Sustituyendo:
f(2-√5)=-√5/3,
f(2+√5)=√5/3.
Resultado final: mínimo (2-√5,-√5/3) y máximo (2+√5,√5/3).`
      },
      "b)": {
        options: [
          "Tangente y=2x/3-1/3; normal y=-3x/2+11/6",
          "Tangente y=x/3; normal y=-3x",
          "Tangente y=2x/3+1/3; normal y=-3x/2-11/6",
          "Tangente y=-3x/2+11/6; normal y=2x/3-1/3"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el punto:
f(1)=1/3.
2. De la derivada del apartado anterior:
f'(1)=2/3.
3. Recta tangente:
y-1/3=2/3·(x-1)
⟹ y=2x/3-1/3.
4. Para la normal usamos m·m'=-1:
(2/3)m'=-1 ⟹ m'=-3/2.
y-1/3=-3/2·(x-1)
⟹ y=-3x/2+11/6.
Resultado final: tangente y=2x/3-1/3; normal y=-3x/2+11/6.`
      }
    },
    "mates2-analisis-066e18a48abd--mates-ii-analisis-4": {
      "a)": {
        options: ["a=-1/2, b=3/2", "a=1/2, b=-3/2", "a=-1, b=2", "a=0, b=1"],
        correct: 0,
        solution: `Resolución:
1. f(x)=ax³+bx²+x-1 pasa por (1,1):
f(1)=1 ⟹ a+b=1.
2. Para que x=1 sea punto de inflexión debe anularse la segunda derivada:
f''(x)=6ax+2b,
f''(1)=0 ⟹ 3a+b=0.
3. Resolvemos el sistema:
{a+b=1; 3a+b=0}.
Restando, 2a=-1 ⟹ a=-1/2 y b=3/2.
Resultado final: a=-1/2 y b=3/2.`
      },
      "b)": {
        options: [
          "Sí; Rolle garantiza f'(c)=0 y, en particular, x=0 es un mínimo relativo",
          "No, porque f(-1)≠f(1)",
          "Sí; x=0 es un máximo relativo",
          "No puede aplicarse Rolle porque f no es derivable"
        ],
        correct: 0,
        solution: `Resolución:
1. Teorema de Rolle: si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe c∈(a,b) con f'(c)=0.
2. f(x)=x·sen(x)-cos(x) es continua y derivable en ℝ.
3. En [-1,1]:
f(-1)=sen(1)-cos(1)=f(1).
Por Rolle existe al menos un punto con derivada nula.
4. Derivamos:
f'(x)=2sen(x)+xcos(x).
Se cumple f'(0)=0; además, f' es negativa inmediatamente a la izquierda de 0 y positiva a la derecha.
Resultado final: x=0 es un mínimo relativo y se cumplen las hipótesis de Rolle.`
      }
    },
    "mates2-geometria-2ae69c3197b5": {
      "a)": {
        options: ["d(P,r)=2√6/3", "d(P,r)=2", "d(P,r)=√6/3", "d(P,r)=2√3"],
        correct: 0,
        solution: `Resolución:
1. La recta pasa por Q=(-1,0,1) y tiene vector director v⃗=(1,1,-1).
2. P=(1,0,1), luego QP⃗=(2,0,0).
3. Aplicamos:
d(P,r)=|QP⃗×v⃗|/|v⃗|.
QP⃗×v⃗=(0,2,2).
4. Por tanto:
d(P,r)=√8/√3=2√6/3.
Resultado final: d(P,r)=2√6/3.`
      },
      "b)": {
        options: ["a=1", "a=-1", "a=2", "a=0"],
        correct: 0,
        solution: `Resolución:
1. Los vectores directores son:
v⃗s=(2,-2a,2), v⃗t=(a,-1,1).
2. Para que sean paralelos debe existir k con:
(2,-2a,2)=k(a,-1,1).
3. De la tercera componente, k=2.
4. De la primera, 2=2a, luego a=1. La segunda también se cumple: -2a=-2.
Resultado final: a=1.`
      }
    },
    "mates2-geometria-2ae69c3197b5--mates-ii-geometria-2": {
      "a)": {
        options: ["V=1/6", "V=1/3", "V=1", "V=1/2"],
        correct: 0,
        solution: `Resolución:
1. Tomamos los vectores con origen en A:
AB⃗=(2,1,-1), AC⃗=(1,1,0), AD⃗=(1,1,1).
2. El volumen es:
V=1/6·|det(AB⃗,AC⃗,AD⃗)|.
3. Calculando por Sarrus:
det((2,1,-1),(1,1,0),(1,1,1))=1.
Resultado final: V=1/6 unidades cúbicas.`
      },
      "b)": {
        options: [
          "π: x-y+z-1=0; r: (x,y,z)=(1,1,2)+t(1,-1,1)",
          "π: x+y+z-1=0; r: (x,y,z)=(1,1,2)+t(1,1,1)",
          "π: x-y-z+1=0; r: (x,y,z)=(1,1,2)+t(1,-1,-1)",
          "π: 2x+y-z=0; r: (x,y,z)=(1,1,2)+t(2,1,-1)"
        ],
        correct: 0,
        solution: `Resolución:
1. AB⃗=(2,1,-1) y AC⃗=(1,1,0).
2. Un vector normal es:
n⃗=AB⃗×AC⃗=(1,-1,1).
3. El plano por A=(0,0,1) es:
x-y+(z-1)=0 ⟹ π: x-y+z-1=0.
4. La recta perpendicular al plano que pasa por D=(1,1,2) tiene como director n⃗:
r: (x,y,z)=(1,1,2)+t(1,-1,1).
Resultado final: π: x-y+z-1=0 y r: (x,y,z)=(1,1,2)+t(1,-1,1).`
      }
    },
    "mates2-geometria-7bfbcea4cade": {
      "a)": {
        options: ["a=1/4", "a=-1/4", "a=1", "a=0"],
        correct: 0,
        solution: `Resolución:
1. Los vectores normales son:
n⃗₁=(a,1,2), n⃗₂=(2,-1,a).
2. Los planos son perpendiculares cuando sus normales son perpendiculares:
n⃗₁·n⃗₂=0.
3. Operamos:
2a-1+2a=0
⟹ 4a=1
⟹ a=1/4.
Resultado final: a=1/4.`
      },
      "b)": {
        options: ["d(P,π₁)=1/√6", "d(P,π₁)=1", "d(P,π₁)=√6", "d(P,π₁)=2/√6"],
        correct: 0,
        solution: `Resolución:
1. Para a=1:
π₁: x+y+2z-3=0,
P=(2,0,1).
2. Aplicamos la fórmula de distancia de un punto a un plano:
d(P,π₁)=|2+0+2·1-3|/√(1²+1²+2²).
3. Por tanto:
d(P,π₁)=1/√6=√6/6.
Resultado final: d(P,π₁)=1/√6.`
      }
    }
  });
})();

// CCSS II 2021 — Distribuciones e inferencia estadística.
(function () {
  const bank = window.CCSS_II_BLOCK_ANSWERS = window.CCSS_II_BLOCK_ANSWERS || {};
  Object.assign(bank, {
    "ccss2-estadistica-48d5f88f195e": {
      "a)": {
        options: ["(183,37; 216,63) gramos", "(188,24; 211,76) gramos", "(140; 260) gramos", "(191,68; 208,32) gramos"],
        correct: 0,
        solution: `Resolución:
Datos: x̄=200 g, σ=60 g, n=50 y nivel de confianza 95 %.
1. Para el 95 %, z_(α/2)=1,96.
2. Error máximo:
E=1,96·60/√50≈16,63 g.
3. Intervalo de confianza:
IC=(x̄-E, x̄+E)
=(200-16,63, 200+16,63)
=(183,37, 216,63).
Resultado final: (183,37; 216,63) gramos.`
      },
      "b)": {
        options: ["Aumentar el tamaño de la muestra", "Aumentar el nivel de confianza", "Disminuir el tamaño de la muestra", "Aumentar la desviación típica"],
        correct: 0,
        solution: `Resolución:
La amplitud del intervalo es:
2E=2·z_(α/2)·σ/√n.
Manteniendo el mismo nivel de confianza y la misma desviación típica, al aumentar n aumenta √n y disminuye el error E.
También se reduciría la amplitud usando un nivel de confianza menor, aunque eso proporcionaría menos confianza.
Resultado final: la forma habitual de disminuir la amplitud sin perder confianza es aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: ["No; el IC del 90 % es aproximadamente (186,04; 213,96)", "Sí; 220 pertenece al IC del 90 %", "Sí; toda media superior a 200 es admisible", "No; el IC del 90 % es (140;260)"],
        correct: 0,
        solution: `Resolución:
Interpretamos la pregunta construyendo el intervalo de confianza del 90 %.
1. Para el 90 %, z_(α/2)=1,645.
2. Error:
E=1,645·60/√50≈13,96.
3. Intervalo:
IC₉₀%=(200-13,96, 200+13,96)
=(186,04, 213,96).
Como 220 no pertenece a este intervalo, no es un valor admisible con un 90 % de confianza.
Resultado final: no.`
      }
    },
    "ccss2-estadistica-959be00cb47d": {
      "a)": {
        options: ["(108,53; 111,47) cm", "(95;125) cm", "(109,25;110,75) cm", "(107,06;112,94) cm"],
        correct: 0,
        solution: `Resolución:
Datos: x̄=110 cm, σ=15 cm, n=400 y confianza 95 %.
1. z_(α/2)=1,96.
2. Error máximo:
E=1,96·15/√400
=1,96·15/20
=1,47 cm.
3. Intervalo:
IC=(110-1,47,110+1,47)
=(108,53,111,47).
Resultado final: (108,53;111,47) cm.`
      },
      "b)": {
        options: [
          "Al aumentar la confianza, aumenta la amplitud; al disminuirla, disminuye la amplitud",
          "Al aumentar la confianza, disminuye la amplitud",
          "El nivel de confianza no afecta al intervalo",
          "La amplitud siempre disminuye"
        ],
        correct: 0,
        solution: `Resolución:
El error es E=z_(α/2)·σ/√n.
Si aumentamos el nivel de confianza, el valor crítico z_(α/2) aumenta y el intervalo se hace más ancho.
Si disminuimos el nivel de confianza, z_(α/2) disminuye y el intervalo se estrecha.
Resultado final: mayor confianza implica mayor amplitud, y menor confianza implica menor amplitud.`
      },
      "c)": {
        options: ["Sí, porque 109 pertenece a (108,53;111,47)", "No, porque 109 es menor que 110", "No, porque 109 queda fuera del intervalo", "Solo sería admisible con un 100 % de confianza"],
        correct: 0,
        solution: `Resolución:
El intervalo de confianza del 95 % obtenido es:
(108,53,111,47).
Como 108,53<109<111,47, el valor μ=109 cm pertenece al intervalo.
Resultado final: sí, 109 cm es un valor admisible con una confianza del 95 %.`
      }
    },
    "ccss2-estadistica-1d8dcc1f367c": {
      "a)": {
        options: ["(113,47;126,53) minutos", "(100;140) minutos", "(116,73;123,27) minutos", "(1,47;2,53) horas"],
        correct: 0,
        solution: `Resolución:
Trabajamos en minutos: x̄=2 h=120 min, σ=20 min, n=36.
1. Para el 95 %, z_(α/2)=1,96.
2. Error:
E=1,96·20/√36
=1,96·20/6
≈6,53 min.
3. Intervalo:
IC=(120-6,53,120+6,53)
=(113,47,126,53) minutos.
En horas es aproximadamente (1,891;2,109).
Resultado final: (113,47;126,53) minutos.`
      },
      "b)": {
        options: [
          "No; 1,3 h queda fuera. La amplitud baja al aumentar n o reducir la confianza",
          "Sí; 1,3 h pertenece al intervalo",
          "No; y la amplitud baja al disminuir n",
          "Sí; y la amplitud no depende de n"
        ],
        correct: 0,
        solution: `Resolución:
1. La media propuesta es 1,3 h=78 min.
2. El intervalo del 95 % es (113,47,126,53) min.
Como 78 no pertenece al intervalo, μ=1,3 h no es admisible con una confianza del 95 %.
3. La amplitud es 2·z_(α/2)·σ/√n:
disminuye al aumentar el tamaño muestral n o al reducir el nivel de confianza;
aumenta al disminuir n o al elevar la confianza.
Resultado final: no es admisible; para estrechar el intervalo se aumenta n.`
      },
      "c)": {
        options: ["3,86 minutos", "1,93 minutos", "6,53 minutos", "20 minutos"],
        correct: 0,
        solution: `Resolución:
Nivel de confianza: 94,64 %=0,9464.
1. α=1-0,9464=0,0536 y α/2=0,0268.
2. Buscamos en la tabla:
P(Z≤z)=1-0,0268=0,9732,
de donde z=1,93.
3. Con n=100:
E=1,93·20/√100
=1,93·20/10
=3,86 minutos.
Resultado final: error máximo admisible de 3,86 minutos.`
      }
    },
    "ccss2-estadistica-e1d7ef583277": {
      "a)": {
        options: ["(77,14;90,86) gramos", "(74;94) gramos", "(80,84;87,16) gramos", "(75,32;92,68) gramos"],
        correct: 0,
        solution: `Resolución:
1. Calculamos la media muestral:
x̄=(70+75+85+100+60+80+120+95+65+90)/10
=840/10=84 g.
2. Para una confianza del 97 %:
α=0,03, α/2=0,015 y P(Z≤z)=0,985.
En la tabla obtenemos z≈2,17.
3. Error:
E=2,17·10/√10≈6,86 g.
4. Intervalo:
IC=(84-6,86,84+6,86)
=(77,14,90,86).
Resultado final: (77,14;90,86) gramos.`
      },
      "b)": {
        options: ["Aumentar el tamaño de la muestra", "Aumentar la confianza", "Disminuir el tamaño de la muestra", "No puede modificarse"],
        correct: 0,
        solution: `Resolución:
Con el mismo nivel de confianza, z permanece constante. Como
E=z·σ/√n,
al aumentar el tamaño muestral n disminuye el error y, por tanto, la amplitud 2E del intervalo.
Resultado final: tomar una muestra mayor.`
      },
      "c)": {
        options: ["Sí; el IC del 98,5 % contiene 90", "No; 90 siempre queda fuera", "No; la media muestral es 84", "Sí; porque 90 es la media muestral"],
        correct: 0,
        solution: `Resolución:
Construimos el intervalo de confianza del 98,5 %.
1. α=0,015 y α/2=0,0075.
2. P(Z≤z)=0,9925, por lo que z≈2,43.
3. Error:
E=2,43·10/√10≈7,68.
4. Intervalo:
IC≈(84-7,68,84+7,68)
=(76,32,91,68).
Como 90 pertenece al intervalo, es un valor admisible con una confianza del 98,5 %.
Resultado final: sí.`
      }
    }
  });
})();

// CCSS II 2021 — Probabilidad.
(function () {
  const bank = window.CCSS_II_BLOCK_ANSWERS = window.CCSS_II_BLOCK_ANSWERS || {};
  Object.assign(bank, {
    "ccss2-probabilidad-56989b21bd8f": {
      "a)": {
        options: ["0,94", "0,06", "0,90", "0,96"],
        correct: 0,
        solution: `Resolución:
De los 100 alumnos, 6 no han encontrado trabajo, luego 100-6=94 sí lo han encontrado.
P(encontrar trabajo)=94/100=0,94.
Resultado final: 0,94, es decir, el 94 %.`
      },
      "b)": {
        options: ["1/8085 ≈ 0,000124", "0,06³=0,000216", "94/100·93/99·92/98", "10/4851 ≈ 0,002061"],
        correct: 0,
        solution: `Resolución:
Como la elección es sin repetición, las probabilidades cambian después de cada extracción.
P(ninguno ha encontrado trabajo)
=6/100·5/99·4/98
=120/970200
=1/8085
≈0,000124.
Resultado final: 1/8085≈0,000124.`
      },
      "c)": {
        options: ["10/4851 ≈ 0,002061", "1/8085 ≈ 0,000124", "5/99·5/99", "4/98"],
        correct: 0,
        solution: `Resolución:
Ya sabemos que el primer alumno no ha encontrado trabajo. Quedan 99 alumnos, de los cuales 5 no han encontrado trabajo.
1. Probabilidad de que el segundo tampoco lo haya encontrado: 5/99.
2. Si ocurre, quedan 98 alumnos y 4 sin trabajo: 4/98.
Por tanto:
P=5/99·4/98=20/9702=10/4851≈0,002061.
Resultado final: 10/4851≈0,002061.`
      }
    },
    "ccss2-probabilidad-9fc58612cb08": {
      "a)": {
        options: ["0,8748", "0,9000", "0,2356", "0,8500"],
        correct: 0,
        solution: `Resolución:
Sean M=mujer, H=hombre y T=terminar la titulación.
P(M)=0,248 y P(H)=1-0,248=0,752.
Aplicamos el teorema de la probabilidad total:
P(T)=P(M)·P(T|M)+P(H)·P(T|H)
=0,248·0,95+0,752·0,85
=0,2356+0,6392
=0,8748.
Resultado final: 0,8748.`
      },
      "b)": {
        options: ["0,2693 aproximadamente", "0,2480", "0,2356", "0,7307 aproximadamente"],
        correct: 0,
        solution: `Resolución:
Aplicamos el teorema de Bayes:
P(M|T)=P(M∩T)/P(T)
=[P(M)·P(T|M)]/P(T)
=(0,248·0,95)/0,8748
=0,2356/0,8748
≈0,2693.
Resultado final: aproximadamente 0,2693, es decir, el 26,93 %.`
      }
    },
    "ccss2-probabilidad-d795f4899765": {
      "a)": {
        options: ["0,115", "0,140", "0,020", "0,095"],
        correct: 0,
        solution: `Resolución:
Sean E=estar en un ERE y T=pertenecer al sector turístico.
P(E)=0,05, P(Ē)=0,95, P(T|E)=0,40 y P(T|Ē)=0,10.
Por la probabilidad total:
P(T)=0,05·0,40+0,95·0,10
=0,020+0,095
=0,115.
Resultado final: 0,115, es decir, el 11,5 %.`
      },
      "b)": {
        options: ["4/23 ≈ 0,1739", "0,40", "0,05", "19/23 ≈ 0,8261"],
        correct: 0,
        solution: `Resolución:
Aplicamos Bayes:
P(E|T)=P(E∩T)/P(T)
=[P(E)·P(T|E)]/0,115
=(0,05·0,40)/0,115
=0,020/0,115
=4/23≈0,1739.
Resultado final: 4/23≈0,1739, es decir, el 17,39 %.`
      }
    },
    "ccss2-probabilidad-4564162a49e0": {
      "a)": {
        options: ["169/729 ≈ 0,2318", "13/27 ≈ 0,4815", "156/702 ≈ 0,2222", "196/729 ≈ 0,2689"],
        correct: 0,
        solution: `Resolución:
No son de Albacete 5+8=13 alumnos.
Como las dos entradas pueden tocar al mismo alumno, los sorteos se consideran con repetición:
P(ambas para alumnos que no son de Albacete)
=13/27·13/27
=169/729
≈0,2318.
Resultado final: 169/729≈0,2318.`
      },
      "b)": {
        options: ["14/20175 ≈ 0,000694", "8/27⁵", "8/27·7/27·6/27·5/27·4/27", "56/1755 ≈ 0,0319"],
        correct: 0,
        solution: `Resolución:
El sorteo se hace sin repetición porque quien obtiene una entrada deja de participar.
P(5 entradas para alumnos de Toledo)
=8/27·7/26·6/25·5/24·4/23.
Simplificando:
P=14/20175≈0,000694.
Resultado final: 14/20175≈0,000694.`
      }
    }
  });
})();

// CCSS II 2021 — Análisis.
(function () {
  const bank = window.CCSS_II_BLOCK_ANSWERS = window.CCSS_II_BLOCK_ANSWERS || {};
  Object.assign(bank, {
    "ccss2-analisis-2e6617685b86": {
      "a)": {
        options: ["t=-1", "t=0", "t=1", "No existe ningún valor de t"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=1.
1. Límite por la izquierda:
lim(x→1⁻) f(x)=1+3+t=4+t.
2. Valor de la función: f(1)=3.
3. Límite por la derecha:
lim(x→1⁺) f(x)=(1-3)²+t=4+t.
4. Para que sea continua, los tres valores deben coincidir:
4+t=3 ⟹ t=-1.
Resultado final: t=-1.`
      },
      "b)": {
        options: ["Mínimo relativo en (3,0)", "Máximo relativo en (3,0)", "Mínimo relativo en (2,1)", "No tiene extremos relativos"],
        correct: 0,
        solution: `Resolución:
Para t=0 y x∈(1,+∞), f(x)=(x-3)².
1. Derivamos: f'(x)=2(x-3).
2. Igualamos a cero: 2(x-3)=0 ⟹ x=3.
3. Recta de signos de f':
en (1,3), por ejemplo x=2, f'(2)=-2<0 ↓;
en (3,+∞), por ejemplo x=4, f'(4)=2>0 ↑.
Por tanto, en x=3 la función pasa de decrecer a crecer y existe un mínimo.
4. f(3)=0.
Resultado final: mínimo relativo en (3,0).`
      },
      "c)": {
        options: ["Decrece en (1,3) y crece en (3,+∞)", "Crece en (1,3) y decrece en (3,+∞)", "Crece en todo (1,+∞)", "Decrece en todo (1,+∞)"],
        correct: 0,
        solution: `Resolución:
Para x>1, f'(x)=2(x-3), que se anula en x=3.
En la recta real:
(1,3): tomamos x=2, f'(2)=-2<0 ⟹ f decrece ↓.
(3,+∞): tomamos x=4, f'(4)=2>0 ⟹ f crece ↑.
Resultado final: decrece en (1,3) y crece en (3,+∞).`
      }
    },
    "ccss2-analisis-12dd5fa8ae25": {
      "Resultado": {
        options: ["a=-3, b=0, c=-3", "a=3, b=0, c=-3", "a=-3, b=6, c=-3", "a=-1, b=0, c=-3"],
        correct: 0,
        solution: `Resolución:
Sea f(x)=ax²+bx+c.
1. Como el punto (0,-3) pertenece a la gráfica:
f(0)=c=-3.
2. Al haber un extremo en x=0:
f'(x)=2ax+b, y f'(0)=b=0.
3. La pendiente de la tangente en x=-1 es 6:
f'(-1)=-2a+b=6.
Como b=0, -2a=6 ⟹ a=-3.
4. Comprobación del máximo:
f''(x)=2a=-6<0, luego el extremo de x=0 es un máximo.
Resultado final: a=-3, b=0 y c=-3.`
      }
    },
    "ccss2-analisis-91af006f6634": {
      "a)": {
        options: ["t=4", "t=2", "t=0", "No existe ningún valor de t"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=0.
1. Límite por la izquierda:
lim(x→0⁻)(x+2)²=4.
2. Límite por la derecha:
lim(x→0⁺)(x-2)²=4.
3. Valor de la función: f(0)=t.
Para que los tres valores sean iguales, t=4.
Resultado final: t=4.`
      },
      "b)": {
        options: [
          "Dos parábolas con vértices (-2,0) y (2,0), puntos abiertos en (0,4) y punto aislado (0,2)",
          "Una única parábola y=x²",
          "Dos rectas que se cortan en (0,2)",
          "Dos parábolas unidas en (0,4)"
        ],
        correct: 0,
        solution: `Resolución:
Para t=2:
f(x)=(x+2)² si x<0; f(0)=2; f(x)=(x-2)² si x>0.
1. La rama izquierda es una parábola abierta hacia arriba, con vértice (-2,0). Al acercarse a x=0 toma el valor 4, pero (0,4) no pertenece a esta rama.
2. La rama derecha es otra parábola abierta hacia arriba, con vértice (2,0). También presenta un punto abierto en (0,4).
3. El valor real de la función en x=0 es el punto aislado y cerrado (0,2).
Resultado final: dos ramas parabólicas con puntos abiertos en (0,4) y un punto cerrado en (0,2).`
      }
    },
    "ccss2-analisis-9b6c41f5b7e3": {
      "a)": {
        options: ["1600 porciones", "860 porciones", "1640 porciones", "740 porciones"],
        correct: 0,
        solution: `Resolución:
P(t)=-40t²+240t+540.
1. Primera semana:
P(1)=-40+240+540=740.
2. Segunda semana:
P(2)=-40·4+240·2+540=-160+480+540=860.
3. Total de las dos semanas:
740+860=1600.
Resultado final: 1600 porciones.`
      },
      "b)": {
        options: ["Tercera semana, 900 porciones", "Segunda semana, 860 porciones", "Cuarta semana, 860 porciones", "Primera semana, 740 porciones"],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
P'(t)=-80t+240.
2. Buscamos el punto crítico:
-80t+240=0 ⟹ t=3.
3. Como P''(t)=-80<0, en t=3 hay un máximo.
4. Calculamos las ventas:
P(3)=-40·9+240·3+540=-360+720+540=900.
Resultado final: la tercera semana, 900 porciones.`
      },
      "c)": {
        options: ["Primera semana, 740 porciones", "Cuarta semana, 860 porciones", "Segunda semana, 860 porciones", "Tercera semana, 900 porciones"],
        correct: 0,
        solution: `Resolución:
El máximo interior está en t=3. Para hallar el mínimo absoluto en [1,4] comparamos los extremos:
P(1)=740,
P(4)=-40·16+240·4+540=-640+960+540=860.
Además, P(2)=860 y P(3)=900.
El menor valor es 740.
Resultado final: la primera semana, 740 porciones.`
      }
    },
    "ccss2-analisis-918d7bbd5b76": {
      "a)": {
        options: ["Para cualquier valor real de t", "Solo para t=-1", "Solo para t=0", "Para ningún valor de t"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=1.
1. Por la izquierda y valor de la función:
f(1)=1+3+t=4+t.
2. Por la derecha:
lim(x→1⁺) f(x)=(1-3)²+t=4+t.
Ambos valores coinciden para todo t∈ℝ.
Resultado final: f es continua en x=1 para cualquier valor real de t.`
      },
      "b)": {
        options: ["Mínimo relativo en (3,0)", "Máximo relativo en (3,0)", "Mínimo relativo en (1,4)", "No tiene extremos"],
        correct: 0,
        solution: `Resolución:
Para t=0 y x∈(1,+∞), f(x)=(x-3)².
f'(x)=2(x-3), que se anula en x=3.
En (1,3), por ejemplo x=2, f'(2)<0 ↓.
En (3,+∞), por ejemplo x=4, f'(4)>0 ↑.
La función pasa de decrecer a crecer; por tanto, presenta un mínimo relativo.
f(3)=0.
Resultado final: mínimo relativo en (3,0).`
      },
      "c)": {
        options: ["Decrece en (1,3) y crece en (3,+∞)", "Crece en (1,3) y decrece en (3,+∞)", "Crece en todo el intervalo", "Decrece en todo el intervalo"],
        correct: 0,
        solution: `Resolución:
f'(x)=2(x-3).
Recta de signos:
(1,3): f'(2)=-2<0 ⟹ decrece ↓.
(3,+∞): f'(4)=2>0 ⟹ crece ↑.
Resultado final: decrece en (1,3) y crece en (3,+∞).`
      }
    },
    "ccss2-analisis-05a534b2e1e0": {
      "Resultado": {
        options: ["a=1, b=3, c=-4", "a=-1, b=-3, c=-4", "a=1, b=-3, c=4", "a=2, b=6, c=-4"],
        correct: 0,
        solution: `Resolución:
Sea f(x)=ax³+bx²+cx.
1. El punto de inflexión (-1,6) pertenece a la gráfica:
f(-1)=-a+b-c=6.
2. En un punto de inflexión se anula la segunda derivada:
f''(x)=6ax+2b,
f''(-1)=-6a+2b=0 ⟹ b=3a.
3. La pendiente en x=-2 es -4:
f'(x)=3ax²+2bx+c,
f'(-2)=12a-4b+c=-4.
Como b=3a, resulta c=-4.
4. Sustituimos en la primera ecuación:
-a+3a-(-4)=6 ⟹ 2a=2 ⟹ a=1.
Entonces b=3.
Resultado final: a=1, b=3 y c=-4.`
      }
    },
    "ccss2-analisis-79315851d1ce": {
      "a)": {
        options: ["t=√2 o t=-√2", "Solo t=√2", "t=2 o t=-2", "t=-1"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=0.
1. Límite por la izquierda:
lim(x→0⁻)[-(x-t)²]=-t².
2. Valor de la función y límite por la derecha:
f(0)=-2,
lim(x→0⁺)(x²-2)=-2.
3. Igualamos:
-t²=-2 ⟹ t²=2 ⟹ t=±√2.
Resultado final: t=√2 o t=-√2.`
      },
      "b)": {
        options: [
          "Rama y=-(x+1)² para x<0, punto abierto (0,-1), punto cerrado (0,-2) y rama y=x²-2 para x>0",
          "Rama y=-(x-1)² para x<0 y rama y=x²+2 para x>0",
          "Dos ramas que se unen en (0,-1)",
          "Una única parábola y=x²-2"
        ],
        correct: 0,
        solution: `Resolución:
Para t=-1:
f(x)=-(x+1)² si x<0; f(0)=-2; f(x)=x²-2 si x>0.
1. La rama izquierda es una parábola abierta hacia abajo con vértice (-1,0); presenta un punto abierto en (0,-1).
2. La rama derecha es una parábola abierta hacia arriba con vértice (0,-2), aunque solo se dibuja para x>0.
3. El punto (0,-2) se representa cerrado porque f(0)=-2.
Resultado final: las dos ramas descritas, con salto entre el límite izquierdo -1 y el valor -2.`
      }
    },
    "ccss2-analisis-3aefdf29ea8e": {
      "a)": {
        options: ["8,82", "10,78", "7,54", "1,78"],
        correct: 0,
        solution: `Resolución:
N(x)=(-4x⁴+128x²+54)/100.
En el tercer día:
N(3)=(-4·3⁴+128·3²+54)/100
=(-4·81+128·9+54)/100
=(-324+1152+54)/100
=882/100=8,82.
Resultado final: 8,82.`
      },
      "b)": {
        options: ["Máximo el día 4 y mínimo el día 1", "Máximo el día 5 y mínimo el día 1", "Máximo el día 3 y mínimo el día 5", "Máximo el día 1 y mínimo el día 4"],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
N'(x)=(-16x³+256x)/100
=16x(16-x²)/100.
2. En [1,5], el único punto crítico es x=4.
3. Recta de signos:
en (1,4), N'(2)>0 ↑;
en (4,5), N'(4,5)<0 ↓.
Por tanto, x=4 da el máximo.
4. Para el mínimo absoluto comparamos los extremos:
N(1)=1,78 y N(5)=7,54.
Resultado final: máximo el día 4 y mínimo el día 1.`
      },
      "c)": {
        options: ["Máximo 10,78 y mínimo 1,78", "Máximo 8,82 y mínimo 1,78", "Máximo 10,78 y mínimo 7,54", "Máximo 7,54 y mínimo 1,78"],
        correct: 0,
        solution: `Resolución:
Calculamos los valores señalados:
N(4)=(-4·4⁴+128·4²+54)/100
=(-1024+2048+54)/100
=1078/100=10,78.
N(1)=(-4+128+54)/100
=178/100=1,78.
Resultado final: máximo 10,78 y mínimo 1,78.`
      }
    }
  });
})();

(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-26eca17d72a8": {
      "a)": {
        options: [
          "{z=x+y; 50y=30z; 5x+5y+10z=7500}",
          "{x=y+z; 30y=50z; x+y+z=7500}",
          "{z=x-y; 50z=30y; 5x+5y+10z=750}",
          "{x+y+z=50; 30x=50y; x+2y+3z=7500}"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x, y, z a los precios, en euros, de las mesas de gama baja, media y superior.
1. La superior cuesta lo mismo que las otras dos juntas: z=x+y.
2. Cincuenta mesas medias producen lo mismo que treinta superiores: 50y=30z.
3. La última venta proporciona: 5x+5y+10z=7500.
Resultado final: {z=x+y; 50y=30z; 5x+5y+10z=7500}.`
      },
      "b)": {
        options: [
          "Baja: 200 €; media: 300 €; superior: 500 €",
          "Baja: 300 €; media: 200 €; superior: 500 €",
          "Baja: 150 €; media: 350 €; superior: 500 €",
          "Baja: 200 €; media: 500 €; superior: 700 €"
        ],
        correct: 0,
        solution: `Resolución:
1. De 50y=30z obtenemos 5y=3z, luego y=3z/5.
2. Como z=x+y, entonces x=z-y=2z/5.
3. En la tercera ecuación:
5x+5y+10z=5(x+y)+10z=5z+10z=7500.
Por tanto, 15z=7500 y z=500.
4. y=3·500/5=300 y x=500-300=200.
Resultado final: baja 200 €, media 300 € y superior 500 €.`
      }
    },
    "ccss2-algebra-3c595578231d": {
      "a)": {
        options: ["B(x,y)=10000x+12000y", "B(x,y)=12000x+10000y", "B(x,y)=10000(x+y)", "B(x,y)=18x+16y"],
        correct: 0,
        solution: `Resolución:
Si x son hectáreas de aguacates e y hectáreas de mangos, cada hectárea aporta 10000 € y 12000 €, respectivamente.
Resultado final: B(x,y)=10000x+12000y, que debemos maximizar.`
      },
      "b)": {
        options: [
          "x≥0, y≥0, x+y≤18, x≤16, y≤x; vértices (0,0),(16,0),(16,2),(9,9)",
          "x≥0, y≥0, x+y≥18, x≤16, y≥x",
          "x≥0, y≥0, x+y≤16, x≤18, y≥x",
          "x≥0, y≥0, x+y=18, x=16, y=x"
        ],
        correct: 0,
        solution: `Resolución:
1. No puede sembrarse una cantidad negativa: x≥0, y≥0.
2. Hay como máximo 18 hectáreas: x+y≤18.
3. Aguacates ocupan como mucho 16: x≤16.
4. Mangos no superan a aguacates: y≤x.
5. Cortando las rectas frontera obtenemos los vértices:
(0,0), (16,0), (16,2) y (9,9).
Resultado final: la región factible es el cuadrilátero determinado por esos cuatro vértices.`
      },
      "c)": {
        options: [
          "9 ha de aguacates y 9 ha de mangos; beneficio 198000 €",
          "16 ha de aguacates y 2 ha de mangos; beneficio 184000 €",
          "18 ha de aguacates y 0 de mangos; beneficio 180000 €",
          "0 ha de aguacates y 18 ha de mangos; beneficio 216000 €"
        ],
        correct: 0,
        solution: `Resolución:
Evaluamos la función objetivo en los vértices:
B(0,0)=0,
B(16,0)=160000,
B(16,2)=184000,
B(9,9)=90000+108000=198000.
Resultado final: se deben sembrar 9 ha de aguacates y 9 ha de mangos; el beneficio máximo es 198000 €.`
      }
    },
    "ccss2-algebra-a5824cc14f36": {
      "a)": {
        options: ["((-6),(11/3))", "((6),(-11/3))", "((0),(2/3))", "((-6),(3))"],
        correct: 0,
        solution: `Resolución:
1. A·C=((3,-6),(-1/2,3))·((2/3),(1/3))
=((3·2/3-6·1/3),(-1/2·2/3+3·1/3))
=((0),(2/3)).
2. Dᵀ=((-6),(3)).
3. Sumamos:
A·C+Dᵀ=((-6),(2/3+3))=((-6),(11/3)).
Resultado final: ((-6),(11/3)).`
      },
      "b)": {
        options: ["A sí tiene inversa y B no", "A no tiene inversa y B sí", "Ambas tienen inversa", "Ninguna tiene inversa"],
        correct: 0,
        solution: `Resolución:
1. det(A)=3·3-(-6)(-1/2)=9-3=6≠0. Por tanto, A es invertible.
2. det(B)=1·4-(-4)(-1)=4-4=0. Por tanto, B no tiene inversa.
Resultado final: A sí tiene inversa y B no.`
      },
      "c)": {
        options: ["D·C es 1×1 y Dᵀ·Cᵀ es 2×2", "Ambas son 2×2", "D·C es 2×2 y Dᵀ·Cᵀ es 1×1", "Ambas son 1×1"],
        correct: 0,
        solution: `Resolución:
1. D es 1×2 y C es 2×1; por tanto, D·C tiene dimensión 1×1.
2. Dᵀ es 2×1 y Cᵀ es 1×2; por tanto, Dᵀ·Cᵀ tiene dimensión 2×2.
Resultado final: 1×1 y 2×2, respectivamente.`
      }
    },
    "ccss2-algebra-8b7763b79f0b": {
      "a)": {
        options: [
          "{x+y+z=100; y-x=z/2; x-z=y/3}",
          "{x+y+z=100; x-y=z/2; z-x=y/3}",
          "{x+y+z=100; y+x=z/2; x+z=y/3}",
          "{x+y=100; y-x=2z; x-z=3y}"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x a las motos de gasolina, y a las de gasolina y aceite, y z a las eléctricas.
1. Total: x+y+z=100.
2. La diferencia entre mixtas y gasolina es la mitad de eléctricas: y-x=z/2.
3. La diferencia entre gasolina y eléctricas es la tercera parte de mixtas: x-z=y/3.
Resultado final: {x+y+z=100; y-x=z/2; x-z=y/3}.`
      },
      "b)": {
        options: ["35 de gasolina, 45 mixtas y 20 eléctricas", "45 de gasolina, 35 mixtas y 20 eléctricas", "20 de gasolina, 45 mixtas y 35 eléctricas", "30 de gasolina, 50 mixtas y 20 eléctricas"],
        correct: 0,
        solution: `Resolución:
1. De y-x=z/2: y=x+z/2.
2. Sustituimos en x-z=y/3:
3x-3z=x+z/2 ⟹ 2x=7z/2 ⟹ x=7z/4.
3. Entonces y=7z/4+z/2=9z/4.
4. En x+y+z=100:
7z/4+9z/4+z=5z=100 ⟹ z=20.
Así, x=35 e y=45.
Resultado final: 35 de gasolina, 45 mixtas y 20 eléctricas.`
      }
    },
    "ccss2-algebra-57fef530ea35": {
      "a)": {
        options: [
          "Triángulo limitado por y=x, y=-x y x=3",
          "Triángulo limitado por y=x, y=-x y x=-3",
          "Región y≥x, y≤-x, x≤3",
          "Rectángulo 0≤x≤3, 0≤y≤3"
        ],
        correct: 0,
        solution: `Resolución:
Las restricciones equivalen a:
y≤x, y≥-x y x≤3.
Las dos primeras obligan además a x≥0. La región factible es el triángulo comprendido entre y=x, y=-x y la recta vertical x=3.
Resultado final: triángulo de vértices (0,0), (3,3) y (3,-3).`
      },
      "b)": {
        options: ["(0,0), (3,3), (3,-3)", "(0,0), (-3,3), (-3,-3)", "(0,0), (3,0), (0,3)", "(3,3), (3,-3), (-3,0)"],
        correct: 0,
        solution: `Resolución:
1. y=x con y=-x da (0,0).
2. x=3 con y=x da (3,3).
3. x=3 con y=-x da (3,-3).
Resultado final: (0,0), (3,3) y (3,-3).`
      },
      "c)": {
        options: ["Máximo 42 en (3,-3)", "Máximo 30 en (3,3)", "Máximo 36 en (3,0)", "Máximo 0 en (0,0)"],
        correct: 0,
        solution: `Resolución:
Evaluamos f(x,y)=12x-2y:
f(0,0)=0,
f(3,3)=36-6=30,
f(3,-3)=36+6=42.
Resultado final: el máximo es 42 y se alcanza en (3,-3).`
      }
    },
    "ccss2-algebra-0c2f73429fe2": {
      "c)": {
        options: ["A=3(B+C) y C=2B", "A=3B+C y B=2C", "A+B=3C y C=2A", "A=2(B+C) y C=3B"],
        correct: 0,
        solution: `Preparación de los datos:
La frase del enunciado se traduce como A=3(B+C).
Además, hay el doble de alumnos en C que en B: C=2B.
Estas dos relaciones se utilizarán junto con A+B+C=120.`
      },
      "a)": {
        options: ["{A+B+C=120; A=3(B+C); C=2B}", "{A+B+C=120; A=3B+C; B=2C}", "{A+B+C=120; A+B=3C; C=2A}", "{A+B+C=120; A=2(B+C); C=3B}"],
        correct: 0,
        solution: `Resolución:
1. El total de alumnos es 120: A+B+C=120.
2. Los que eligen A son el triple de los que eligen B o C: A=3(B+C).
3. Los que eligen C duplican a los que eligen B: C=2B.
Resultado final: {A+B+C=120; A=3(B+C); C=2B}.`
      },
      "b)": {
        options: ["A=90, B=10, C=20", "A=80, B=20, C=20", "A=90, B=20, C=10", "A=60, B=20, C=40"],
        correct: 0,
        solution: `Resolución:
1. C=2B, así que B+C=3B.
2. A=3(B+C)=9B.
3. En A+B+C=120:
9B+B+2B=120 ⟹ 12B=120 ⟹ B=10.
4. C=20 y A=90.
Resultado final: A=90, B=10 y C=20.`
      }
    },
    "ccss2-algebra-f984797fa165": {
      "a)": {
        options: ["{S+N+C=600; N=C/2; 0,30(S+N)=135}", "{S+N+C=600; S=C/2; 0,30(N+C)=135}", "{S+N=600; N=2C; 0,30S=135}", "{S+N+C=600; C=N/2; S+N=135}"],
        correct: 0,
        solution: `Resolución:
Llamamos S, N y C a quienes responden SÍ, NO y NS/NC.
1. S+N+C=600.
2. Los NO son la mitad de NS/NC: N=C/2.
3. El 30 % de quienes responden SÍ o NO son 135: 0,30(S+N)=135.
Resultado final: {S+N+C=600; N=C/2; 0,30(S+N)=135}.`
      },
      "b)": {
        options: ["SÍ: 375; NO: 75; NS/NC: 150", "SÍ: 300; NO: 100; NS/NC: 200", "SÍ: 375; NO: 150; NS/NC: 75", "SÍ: 450; NO: 50; NS/NC: 100"],
        correct: 0,
        solution: `Resolución:
1. 0,30(S+N)=135 ⟹ S+N=450.
2. Comparando con S+N+C=600: C=150.
3. N=C/2=75.
4. S=450-75=375.
Resultado final: SÍ 375, NO 75 y NS/NC 150.`
      }
    },
    "ccss2-algebra-e17a76624b00": {
      "a)": {
        options: ["Se verifica: ambos miembros valen ((3,7),(2,5))", "No se verifica", "Ambos miembros valen la identidad", "Solo se verifica si M=N"],
        correct: 0,
        solution: `Resolución:
1. M·N=((-5,7),(2,-3)) y det(M·N)=1.
Por la fórmula de la inversa:
(M·N)⁻¹=((3,7),(2,5)).
2. Calculamos por separado:
N⁻¹=((-1,2),(-1,1)),
M⁻¹=((1,3),(-1,-2)).
3. Multiplicamos:
N⁻¹·M⁻¹=((3,7),(2,5)).
Resultado final: (M·N)⁻¹=N⁻¹·M⁻¹.`
      },
      "b)": {
        options: ["X=((4,-5),(-3,4))", "X=((-4,5),(3,-4))", "X=((3,7),(2,5))", "X=((-5,7),(2,-3))"],
        correct: 0,
        solution: `Resolución:
1. Partimos de M·X=N.
2. Multiplicamos por M⁻¹ a la izquierda:
X=M⁻¹·N.
3. Como M⁻¹=((1,3),(-1,-2)):
X=((1,3),(-1,-2))·((1,-2),(1,-1))
=((4,-5),(-3,4)).
4. Comprobación: M·X=N.
Resultado final: X=((4,-5),(-3,4)).`
      }
    }
  });
})();
