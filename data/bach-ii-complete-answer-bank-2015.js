(function () {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const para = (plain, html = plain) => ({ plain, html });
  const part = (label, paragraphs) => ({ label, paragraphs });
  const copy = (paragraphs) => (paragraphs || []).map((p) => ({ ...p }));
  const mates = (block) => (window.MATES_II_BLOCK_EXERCISES?.[block] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2015"));

  const algJuneA = mates("algebra").find((e) => e.id === "mates2-algebra-ea6836533bd6");
  if (algJuneA?.parts?.length === 1) algJuneA.parts.unshift(part("a)", copy(algJuneA.statement)));
  const algSeptA = mates("algebra").find((e) => e.id === "mates2-algebra-c57ce532cb6e");
  if (algSeptA?.parts?.length === 2) algSeptA.parts.unshift(part("a)", copy(algSeptA.statement)));
  const algSeptB = mates("algebra").find((e) => e.id === "mates2-algebra-8205d7749a58");
  if (algSeptB?.parts?.length === 2) algSeptB.parts.unshift(part("a)", copy(algSeptB.statement)));

  const anJuneA = mates("analisis").find((e) => e.id === "mates2-analisis-e35f3878e056");
  if (anJuneA?.parts?.length === 4) {
    const setup = anJuneA.parts[1].paragraphs.splice(1);
    anJuneA.parts[0].label = "1A a)";
    anJuneA.parts[1].label = "1A b)";
    anJuneA.parts[2].label = "2A a)";
    anJuneA.parts[2].paragraphs = [...setup, ...anJuneA.parts[2].paragraphs];
    anJuneA.parts[3].label = "2A b)";
  }

  const anJuneB = mates("analisis").find((e) => e.id === "mates2-analisis-7ebf1daa55b4");
  if (anJuneB?.parts?.length === 2) {
    const statement = copy(anJuneB.statement);
    anJuneB.parts.unshift(part("1B", statement.slice(0, 2)));
    anJuneB.parts[1].label = "2B a)";
    anJuneB.parts[1].paragraphs.unshift(statement[2]);
    anJuneB.parts[2].label = "2B b)";
  }

  const anSeptA = mates("analisis").find((e) => e.id === "mates2-analisis-6e082db008cd");
  if (anSeptA?.parts?.length === 2) {
    const statement = copy(anSeptA.statement);
    anSeptA.parts.unshift(
      part("1A a)", [para("Calcula lim_{x→0} L(1+2x)/(x·e^{sen x}).")]),
      part("1A b)", [para("Calcula lim_{x→0}(1−tg x)^{1/(x+sen x)}." )]),
      part("2A a)", [statement[2]])
    );
    anSeptA.parts[3].label = "2A b)";
    anSeptA.parts[4].label = "2A c)";
  }

  const anSeptB = mates("analisis").find((e) => e.id === "mates2-analisis-53fd22aaac57");
  if (anSeptB?.parts?.length === 1) {
    const statement = copy(anSeptB.statement);
    anSeptB.parts = [
      part("1B", [statement[0]]),
      part("2B a)", [para("Calcula I₁=∫(1/√x)·(4x³−x^{1/4}) dx.")]),
      part("2B b)", [para("Calcula I₂=∫x·Lx dx.")])
    ];
  }

  const geoJuneA = mates("geometria").find((e) => e.id === "mates2-geometria-4ade04107ed9");
  if (geoJuneA?.parts?.length === 1) geoJuneA.parts.unshift(part("a)", copy(geoJuneA.statement)));

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-ea6836533bd6": {
      "a)": {
        options: ["X=B·(I−A)⁻¹", "X=(I−A)⁻¹·B", "X=−B·(I−A)⁻¹", "X=B·(A−I)"],
        correct: 0,
        solution: `Resolución:
Partimos de X·A+B=X.
Pasamos X·A al segundo miembro: B=X−X·A.
Sacamos factor común X por la izquierda: B=X·(I−A).
Multiplicamos por (I−A)⁻¹ a la derecha:
X=B·(I−A)⁻¹.
El orden de los factores no puede cambiarse porque el producto matricial no es conmutativo.`
      },
      "b)": {
        options: ["X=pmatrix{-3&1&-2\\3&4&0\\6&3&1}", "X=pmatrix{-3&3&6\\1&4&3\\-2&0&1}", "X=pmatrix{3&-1&2\\-3&-4&0\\-6&-3&-1}", "X=pmatrix{0&3&-2\\-1&4&0\\1&2&1}"],
        correct: 0,
        solution: `Resolución:
Usamos X=B·(I−A)⁻¹.
I−A=pmatrix{1&0&0\\-1&1&0\\-2&-1&1}.
Como det(I−A)=1, calculamos su inversa mediante (I−A)⁻¹=Adj((I−A)ᵀ)/det(I−A):
(I−A)⁻¹=pmatrix{1&0&0\\1&1&0\\3&1&1}.
Multiplicamos fila por columna:
X=pmatrix{0&3&-2\\-1&4&0\\1&2&1}·pmatrix{1&0&0\\1&1&0\\3&1&1}
=pmatrix{-3&1&-2\\3&4&0\\6&3&1}.
Comprobación: X·A+B=X.`
      }
    },
    "mates2-algebra-3041b69132d2": {
      "a)": {
        options: ["system{2y=x+z;x−z=2;x+y+z=12}; SCD", "system{2y=x+z;x+z=2;x+y+z=12}; SCI", "system{y=x+z;x−z=198;x+y+z=12}; incompatible", "system{2y=x−z;x−z=2;x+y+z=12}; SCD"],
        correct: 0,
        solution: `Resolución:
Sean x, y, z las cifras de centenas, decenas y unidades.
La cifra central es la media: y=(x+z)/2, es decir, 2y=x+z.
La resta del número y el invertido es:
(100x+10y+z)−(100z+10y+x)=198
99x−99z=198 ⇒ x−z=2.
Además, x+y+z=12.
El sistema es system{2y=x+z;x−z=2;x+y+z=12}.
Su determinante es distinto de cero, por lo que es compatible determinado.`
      },
      "b)": {
        options: ["543", "345", "534", "453"],
        correct: 0,
        solution: `Resolución:
Resolvemos system{2y=x+z;x−z=2;x+y+z=12}.
De x−z=2: z=x−2.
De 2y=x+z: y=x−1.
Sustituimos en la suma: x+(x−1)+(x−2)=12.
3x−3=12 ⇒ x=5.
Entonces y=4 y z=3.
Resultado: el número es 543.
Comprobación: 543−345=198 y 5+4+3=12.`
      }
    },
    "mates2-algebra-c57ce532cb6e": {
      "a)": {
        options: ["Compatible ⇔ rg(A)=rg(A*); SCD si el rango común es n y SCI si es menor que n", "Compatible ⇔ det(A)=0 siempre", "Incompatible ⇔ rg(A)=rg(A*)", "SCD ⇔ rg(A)<n"],
        correct: 0,
        solution: `Resolución:
Teorema de Rouché-Fröbenius: un sistema es compatible si y solo si rg(A)=rg(A*).
Si el rango común coincide con el número n de incógnitas, el sistema es compatible determinado.
Si el rango común es menor que n, es compatible indeterminado.
Si rg(A)≠rg(A*), es incompatible.`
      },
      "b)": {
        options: ["Si α≠2 es SCD y si α=2 es SCI; nunca es incompatible", "Si α=2 es incompatible", "Es SCI para todo α", "Es incompatible si α≠2"],
        correct: 0,
        solution: `Resolución:
A=pmatrix{1&3&-3\\2&-1&1\\3&2&-α}.
Aplicamos Sarrus:
det(A)=7(2−α).
Si α≠2, det(A)≠0, luego rg(A)=rg(A*)=3 y es SCD.
Si α=2, la tercera fila es F₃=F₁+F₂, también en los términos independientes: 5=4+1.
Por tanto rg(A)=rg(A*)=2<3 y es SCI.
No existe ningún valor de α para el que los rangos sean distintos; nunca es incompatible.`
      },
      "c)": {
        options: ["(x,y,z)=(1,1+t,t), t∈R", "(x,y,z)=(1+t,1,t), t∈R", "(x,y,z)=(1,1−t,t), t∈R", "(x,y,z)=(0,1+t,t), t∈R"],
        correct: 0,
        solution: `Resolución:
El caso compatible indeterminado es α=2.
La tercera ecuación es suma de las dos primeras, así que usamos system{x+3y−3z=4;2x−y+z=1}.
Tomamos z=t.
Queda system{x+3y=4+3t;2x−y=1−t}.
Resolviendo, y=1+t y x=1.
Resultado: (x,y,z)=(1,1+t,t), t∈R.
La sustitución verifica las tres ecuaciones originales.`
      }
    },
    "mates2-algebra-8205d7749a58": {
      "a)": {
        options: ["X=I+2A", "X=2A−I", "X=A⁻¹+2A", "X=3A"],
        correct: 0,
        solution: `Resolución:
A·X−A=2A².
Sacamos factor común A por la izquierda: A·(X−I)=2A².
Multiplicamos por A⁻¹ a la izquierda:
A⁻¹A·(X−I)=2A⁻¹A².
X−I=2A, luego X=I+2A.`
      },
      "b)": {
        options: ["X=pmatrix{3&0&4\\2&3&0\\0&0&-1}", "X=pmatrix{1&0&4\\2&1&0\\0&0&-3}", "X=pmatrix{3&2&0\\0&3&0\\4&0&-1}", "X=pmatrix{2&0&4\\2&2&0\\0&0&-2}"],
        correct: 0,
        solution: `Resolución:
det(A)=−1≠0, por lo que A es invertible y X=I+2A.
X=pmatrix{1&0&0\\0&1&0\\0&0&1}+2·pmatrix{1&0&2\\1&1&0\\0&0&-1}
=pmatrix{3&0&4\\2&3&0\\0&0&-1}.
Comprobación: A·X−A=2A².`
      },
      "c)": {
        options: ["det(A¹⁰¹)=−1 y det(A¹⁰⁰⁰)=1", "Ambos determinantes valen −1", "Ambos valen 1", "det(A¹⁰¹)=1 y det(A¹⁰⁰⁰)=−1"],
        correct: 0,
        solution: `Resolución:
Usamos det(Aⁿ)=det(A)ⁿ.
Como det(A)=−1:
det(A¹⁰¹)=(−1)¹⁰¹=−1,
det(A¹⁰⁰⁰)=(−1)¹⁰⁰⁰=1.
Resultado: −1 y 1, respectivamente.`
      }
    },
    "mates2-analisis-e35f3878e056": {
      "1A a)": {
        options: ["a=−1, b=1", "a=1, b=−1", "a=0, b=2", "a=−2, b=1"],
        correct: 0,
        solution: `Resolución:
f(0)=e⁰+0+a·0+b=1+b.
Como pasa por P(0,2): 1+b=2 ⇒ b=1.
f′(x)=e^{sen x}·cos x+2x+a.
Como en x=0 hay un extremo: f′(0)=1+a=0 ⇒ a=−1.
Resultado: a=−1, b=1.`
      },
      "1A b)": {
        options: ["Mínimo relativo en P(0,2)", "Máximo relativo en P(0,2)", "Punto de inflexión", "No hay extremo"],
        correct: 0,
        solution: `Resolución:
f″(x)=e^{sen x}(cos²x−sen x)+2.
f″(0)=1·(1−0)+2=3>0.
Por tanto, la función es convexa en un entorno de 0 y P(0,2) es un mínimo relativo.`
      },
      "2A a)": {
        options: ["La región bajo g entre x=−2 y x=1", "Solo el triángulo entre −2 y 0", "Solo la región entre 0 y 1", "No encierra ninguna región"],
        correct: 0,
        solution: `Resolución:
En [−2,0), g(x)=2x+4: es el segmento que une (−2,0) con (0,4).
En [0,1], g(x)=(2x−2)²=4(x−1)²: une (0,4) con (1,0).
Ambas ramas son no negativas. La región pedida queda entre la gráfica, el eje OX y las rectas x=−2 y x=1.`
      },
      "2A b)": {
        options: ["16/3 unidades cuadradas", "4 unidades cuadradas", "20/3 unidades cuadradas", "8/3 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
A=∫_{−2}^{0}(2x+4)dx+∫_{0}^{1}4(x−1)²dx.
La primera región es un triángulo de base 2 y altura 4: A₁=4.
A₂=4[(x−1)³/3]_{0}^{1}=4/3.
A=4+4/3=16/3 unidades cuadradas.`
      }
    },
    "mates2-analisis-7ebf1daa55b4": {
      "1B": {
        options: ["Dom(f)=[0,∞)\\{2}, asíntota y=−1; Dom(g)=R\\{2}, x=2 e y=x+4", "f tiene asíntota vertical x=2 y g horizontal y=1", "Ambos dominios son R", "g tiene asíntota oblicua y=x−4"],
        correct: 0,
        solution: `Resolución:
Para f(x)=(√(2x)−x)/(x−2), debe ser x≥0 y x≠2.
Racionalizando se simplifica, para x≠2, a f(x)=−√x/(√x+√2). En x=2 hay una discontinuidad evitable, no una asíntota vertical.
Cuando x→∞, f(x)→−1: asíntota horizontal y=−1.
Para g(x)=x³/(x−2)², Dom(g)=R\\{2} y x=2 es asíntota vertical.
La división da g(x)=x+4+(12x−16)/(x−2)², luego su asíntota oblicua es y=x+4.`
      },
      "2B a)": {
        options: ["Cóncava en (−∞,0), convexa en (0,∞), inflexión (0,−1)", "Convexa en todo R", "Inflexión en (1,0)", "Cóncava en (0,∞)"],
        correct: 0,
        solution: `Resolución:
f(x)=(x−1)e^{2x}.
f′(x)=(2x−1)e^{2x}; f″(x)=4x·e^{2x}.
Como e^{2x}>0, el signo de f″ es el de x.
Para x<0, f″<0: cóncava. Para x>0, f″>0: convexa.
En x=0 cambia el signo y f(0)=−1.
Resultado: punto de inflexión (0,−1).`
      },
      "2B b)": {
        options: ["F(x)=e^{2x}(x/2−3/4)+3/4", "F(x)=e^{2x}(x/2−1/4)", "F(x)=(x−1)e^{2x}", "F(x)=e^{2x}(x−1)+1"],
        correct: 0,
        solution: `Resolución:
Integramos por partes:
∫(x−1)e^{2x}dx=e^{2x}(x/2−3/4)+C.
La primitiva pasa por el origen: F(0)=−3/4+C=0.
Por tanto C=3/4.
Resultado: F(x)=e^{2x}(x/2−3/4)+3/4.`
      }
    },
    "mates2-analisis-6e082db008cd": {
      "1A a)": {
        options: ["2", "1", "0", "e²"],
        correct: 0,
        solution: `Resolución:
Al sustituir x=0 aparece 0/0. Aplicamos L'Hôpital.
Derivamos numerador y denominador por separado:
[2/(1+2x)]/[e^{sen x}(1+x·cos x)].
Sustituimos x=0: 2/(1·1)=2.`
      },
      "1A b)": {
        options: ["e^{−1/2}", "e^{1/2}", "1", "e^{−1}"],
        correct: 0,
        solution: `Resolución:
Es una indeterminación 1^∞. Escribimos la base como 1+u(x), con u(x)=−tg x.
Aplicamos la fórmula del número e:
L=e^{lim[−tg x/(x+sen x)]}.
El exponente es 0/0; por L'Hôpital:
lim [−(1+tg²x)/(1+cos x)]=−1/2.
Resultado: L=e^{−1/2}.`
      },
      "2A a)": {
        options: ["y=4x−4", "y=2x", "y=4x+4", "y=x²−4"],
        correct: 0,
        solution: `Resolución:
f(x)=x², f′(x)=2x.
En x=2: f(2)=4 y m=f′(2)=4.
Ecuación punto-pendiente: y−4=4(x−2).
Resultado: y=4x−4.`
      },
      "2A b)": {
        options: ["La región entre y=x², y=4x−4 y x=0, de x=0 a x=2", "La región entre x=2 y x=4", "No existe región cerrada", "La región bajo y=x² entre 0 y 4"],
        correct: 0,
        solution: `Resolución:
Igualamos la parábola y la tangente:
x²=4x−4 ⇒ (x−2)²=0.
Se tocan en (2,4). En x=0, la parábola pasa por (0,0) y la recta por (0,−4).
El eje de ordenadas cierra el recinto entre x=0 y x=2.`
      },
      "2A c)": {
        options: ["8/3 unidades cuadradas", "4/3 unidades cuadradas", "8 unidades cuadradas", "16/3 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
En [0,2], x² está por encima de 4x−4.
A=∫_{0}^{2}[x²−(4x−4)]dx=∫_{0}^{2}(x−2)²dx.
A=[(x−2)³/3]_{0}^{2}=0−(−8/3)=8/3.
Resultado: 8/3 unidades cuadradas.`
      }
    },
    "mates2-analisis-53fd22aaac57": {
      "1B": {
        options: ["72 cm para el diámetro y 18 cm para la base", "45 cm y 45 cm", "18 cm para el diámetro y 72 cm para la base", "60 cm y 30 cm"],
        correct: 0,
        solution: `Resolución:
Sea x el diámetro del semicírculo; la base del triángulo es 90−x.
Área total: A(x)=πx²/8+π(90−x)²/2.
A′(x)=πx/4−π(90−x).
A′(x)=0 ⇒ x/4=90−x ⇒ 5x=360 ⇒ x=72.
A″(x)=5π/4>0, luego es un mínimo.
Resultado: 72 cm para el diámetro y 18 cm para la base.`
      },
      "2B a)": {
        options: ["(8/7)x^{7/2}−(4/3)x^{3/4}+C", "(8/7)x^{7/2}+(4/3)x^{3/4}+C", "4x^{7/2}−x^{3/4}+C", "(7/8)x^{8/7}−(3/4)x^{4/3}+C"],
        correct: 0,
        solution: `Resolución:
I₁=∫(1/√x)(4x³−x^{1/4})dx
=∫[4x^{5/2}−x^{−1/4}]dx.
Aplicamos ∫xⁿdx=x^{n+1}/(n+1):
I₁=(8/7)x^{7/2}−(4/3)x^{3/4}+C.`
      },
      "2B b)": {
        options: ["(x²/2)Lx−x²/4+C", "(x²/2)Lx+x²/4+C", "x²Lx−x²+C", "Lx+x²/2+C"],
        correct: 0,
        solution: `Resolución:
I₂=∫x·Lx dx. Integramos por partes:
u=Lx, dv=x dx; du=dx/x, v=x²/2.
I₂=(x²/2)Lx−∫(x²/2)(1/x)dx
=(x²/2)Lx−∫x/2 dx
=(x²/2)Lx−x²/4+C.`
      }
    },
    "mates2-geometria-4ade04107ed9": {
      "a)": {
        options: ["√2", "2", "√3", "1"],
        correct: 0,
        solution: `Resolución:
La recta intersección puede escribirse r:(x,y,z)=(1,1,0)+t(1,−1,1).
El pie Q de P(−1,2,0) cumple PQ perpendicular al vector director.
t=[(P−(1,1,0))·(1,−1,1)]/3=−1.
Q=(0,2,−1).
d(P,r)=|PQ|=√[(1)²+0²+(−1)²]=√2.`
      },
      "b)": {
        options: ["P′=(1,2,−2)", "P′=(0,2,−1)", "P′=(1,−2,2)", "P′=(−3,2,2)"],
        correct: 0,
        solution: `Resolución:
El punto Q=(0,2,−1) es el punto medio de P y su simétrico P′.
P′=2Q−P=2(0,2,−1)−(−1,2,0).
Resultado: P′=(1,2,−2).`
      }
    },
    "mates2-geometria-667a02b4b012": {
      "a)": {
        options: ["λ=1", "λ=−1", "λ=0", "λ=2"],
        correct: 0,
        solution: `Resolución:
AB=(1,−1,1) y AC=(λ+1,−λ−1,2).
Para estar alineados, AC=k·AB.
Las dos primeras coordenadas dan k=λ+1; la tercera exige k=2.
Por tanto λ+1=2 ⇒ λ=1.`
      },
      "b)": {
        options: ["x+y−1=0", "x−y−1=0", "x+y+z=0", "2x+2y−1=0"],
        correct: 0,
        solution: `Resolución:
Para λ=−1: A=(1,0,−1), B=(2,−1,0), C=(1,0,1).
AB=(1,−1,1), AC=(0,0,2).
Un vector normal es AB×AC=(−2,−2,0), equivalente a (1,1,0).
Plano por A: (x−1)+y=0.
Resultado: x+y−1=0.`
      }
    },
    "mates2-geometria-b05e25ba125f": {
      "a)": {
        options: ["x+3y+z−6=0", "x−3y+z=0", "x+3y−z−4=0", "3x+y+z−8=0"],
        correct: 0,
        solution: `Resolución:
La recta es r:(x,y,z)=(1,−1,0)+t(1,3,1).
Un plano perpendicular a r tiene como normal n⃗=(1,3,1).
Por P(2,1,1):
(x−2)+3(y−1)+(z−1)=0.
Resultado: x+3y+z−6=0.`
      },
      "b)": {
        options: ["12 unidades cúbicas", "24 unidades cúbicas", "6 unidades cúbicas", "36 unidades cúbicas"],
        correct: 0,
        solution: `Resolución:
El plano corta los ejes en A(6,0,0), B(0,2,0), C(0,0,6).
El tetraedro con el origen tiene tres aristas perpendiculares de longitudes 6, 2 y 6.
V=(1/6)·6·2·6=12 unidades cúbicas.`
      }
    },
    "mates2-geometria-a7535acd1faa": {
      "a)": {
        options: ["α=2", "α=−5", "α=1", "α=0"],
        correct: 0,
        solution: `Resolución:
La recta es r:(x,y,z)=(0,0,−1)+t(1,2,3).
Su vector director es v⃗=(1,2,3) y el normal del plano n⃗=(1,α,3).
Para que sean perpendiculares, v⃗ y n⃗ deben ser paralelos.
Comparando coordenadas: α=2.
Además, al sustituir la recta en el plano se obtiene t=5/14, por lo que se cortan.`
      },
      "b)": {
        options: ["α=−5", "α=2", "α=−2", "α=5"],
        correct: 0,
        solution: `Resolución:
Para que la recta y el plano sean paralelos, v⃗·n⃗=0.
(1,2,3)·(1,α,3)=1+2α+9=0.
2α+10=0 ⇒ α=−5.
Resultado: α=−5.`
      }
    }
  });

  const ccss = (block) => (window.CCSS_II_BLOCK_EXERCISES?.[block] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2015"));

  const cAlgJuneA = ccss("algebra").find((e) => e.id === "ccss2-algebra-112ea3edd5f5");
  if (cAlgJuneA?.parts?.length === 1) cAlgJuneA.parts.unshift(part("a)", copy(cAlgJuneA.statement)));

  const cAlgJuneB = ccss("algebra").find((e) => e.id === "ccss2-algebra-27d757417721");
  if (cAlgJuneB?.parts?.length === 5 && cAlgJuneB.parts[2].paragraphs.length > 1) {
    const setup = cAlgJuneB.parts[2].paragraphs.splice(1);
    cAlgJuneB.parts[0].label = "1B a)";
    cAlgJuneB.parts[1].label = "1B b)";
    cAlgJuneB.parts[2].label = "1B c)";
    cAlgJuneB.parts[3].label = "2B a)";
    cAlgJuneB.parts[3].paragraphs = [...setup, ...cAlgJuneB.parts[3].paragraphs];
    cAlgJuneB.parts[4].label = "2B b)";
  }

  const cAlgSeptA = ccss("algebra").find((e) => e.id === "ccss2-algebra-01ff334dc278");
  if (cAlgSeptA?.parts?.length === 1) cAlgSeptA.parts.unshift(part("a)", copy(cAlgSeptA.statement)));

  const cAlgSeptB = ccss("algebra").find((e) => e.id === "ccss2-algebra-9db824ec48aa");
  if (cAlgSeptB?.parts?.length === 5 && cAlgSeptB.parts[2].paragraphs.length > 1) {
    const setup = cAlgSeptB.parts[2].paragraphs.splice(1);
    cAlgSeptB.parts[0].label = "1B a)";
    cAlgSeptB.parts[1].label = "1B b)";
    cAlgSeptB.parts[2].label = "1B c)";
    cAlgSeptB.parts[3].label = "2B a)";
    cAlgSeptB.parts[3].paragraphs = [...setup, ...cAlgSeptB.parts[3].paragraphs];
    cAlgSeptB.parts[4].label = "2B b)";
  }

  const cAnJuneA = ccss("analisis").find((e) => e.id === "ccss2-analisis-763f7548a0d5");
  if (cAnJuneA?.parts?.length === 5 && cAnJuneA.parts[1].paragraphs.length > 1) {
    const setup = cAnJuneA.parts[1].paragraphs.splice(1);
    cAnJuneA.parts[0].label = "3A a)";
    cAnJuneA.parts[1].label = "3A b)";
    cAnJuneA.parts[2].label = "4A a)";
    cAnJuneA.parts[2].paragraphs = [...setup, ...cAnJuneA.parts[2].paragraphs];
    cAnJuneA.parts[3].label = "4A b)";
    cAnJuneA.parts[4].label = "4A c)";
  }

  const cAnJuneB = ccss("analisis").find((e) => e.id === "ccss2-analisis-03eed1ea7144");
  if (cAnJuneB?.parts?.length === 3 && cAnJuneB.parts[2].paragraphs.length > 1) {
    const setup = cAnJuneB.parts[2].paragraphs.splice(1);
    cAnJuneB.parts[0].label = "3B a)";
    cAnJuneB.parts[1].label = "3B b)";
    cAnJuneB.parts[2].label = "3B c)";
    cAnJuneB.parts.push(part("4B", setup));
  }

  const cAnSeptA = ccss("analisis").find((e) => e.id === "ccss2-analisis-091e02a8d985");
  if (cAnSeptA?.parts?.length === 3 && cAnSeptA.parts[2].paragraphs.length > 1) {
    const setup = cAnSeptA.parts[2].paragraphs.splice(1);
    cAnSeptA.parts[0].label = "3A a)";
    cAnSeptA.parts[1].label = "3A b)";
    cAnSeptA.parts[2].label = "3A c)";
    cAnSeptA.parts.push(part("4A", setup));
  }

  const cAnSeptB = ccss("analisis").find((e) => e.id === "ccss2-analisis-587fd4c061ab");
  if (cAnSeptB?.parts?.length === 5 && cAnSeptB.parts[1].paragraphs.length > 1) {
    const setup = cAnSeptB.parts[1].paragraphs.splice(1);
    cAnSeptB.parts[0].label = "3B a)";
    cAnSeptB.parts[1].label = "3B b)";
    cAnSeptB.parts[2].label = "4B a)";
    cAnSeptB.parts[2].paragraphs = [...setup, ...cAnSeptB.parts[2].paragraphs];
    cAnSeptB.parts[3].label = "4B b)";
    cAnSeptB.parts[4].label = "4B c)";
  }

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-112ea3edd5f5": {
      "a)": {
        options: ["X=(I−B)·(3I+A)⁻¹", "X=(3I+A)⁻¹·(I−B)", "X=(I−B)·(3I−A)⁻¹", "X=(3I+A)·(I−B)"],
        correct: 0,
        solution: `Resolución:
Como I es la identidad, 3·I·X=3X. Partimos de 3X+X·A+B=I⁴ y recordamos que I⁴=I.
Pasamos B al segundo miembro:
3X+X·A=I−B.
Escribimos 3X=X·3I y sacamos X como factor común por la izquierda:
X·(3I+A)=I−B.
Multiplicamos a la derecha por (3I+A)⁻¹:
X·(3I+A)·(3I+A)⁻¹=(I−B)·(3I+A)⁻¹.
Por tanto, X=(I−B)·(3I+A)⁻¹.
El orden de los factores debe conservarse porque el producto de matrices no es conmutativo.`
      },
      "b)": {
        options: ["X=pmatrix{1/3&−2/3\\0&−4}", "X=pmatrix{1/3&2/3\\0&4}", "X=pmatrix{3&−2\\0&−1/4}", "X=pmatrix{−2/3&1/3\\−4&0}"],
        correct: 0,
        solution: `Resolución:
Sea M=pmatrix{3&1\\0&−1} y N=pmatrix{1&1\\0&4}. La ecuación es X·M=N.
Multiplicamos a la derecha por M⁻¹:
X=N·M⁻¹.
det(M)=3·(−1)−0·1=−3.
M⁻¹=1/(−3)·pmatrix{−1&−1\\0&3}=pmatrix{1/3&1/3\\0&−1}.
Ahora multiplicamos fila por columna:
X=pmatrix{1&1\\0&4}·pmatrix{1/3&1/3\\0&−1}
=pmatrix{1/3&−2/3\\0&−4}.
Comprobación: X·M=N.`
      }
    },
    "ccss2-algebra-27d757417721": {
      "1B a)": {
        options: ["Maximizar D=70x+60y", "Minimizar D=70x+60y", "Maximizar D=60x+70y", "Maximizar D=x+y"],
        correct: 0,
        solution: `Resolución:
Sea x el número de lotes A e y el número de lotes B.
Cada lote A se vende por 70 euros y cada lote B por 60 euros.
El dinero obtenido es D=70x+60y.
Como se desea obtener la mayor cantidad de dinero, la función objetivo es:
Maximizar D=70x+60y.`
      },
      "1B b)": {
        options: ["system{x+2y≤1100;2x+y≤1000;x≥0;y≥0}", "system{2x+y≤1100;x+2y≤1000;x≥0;y≥0}", "system{x+2y≥1100;2x+y≥1000;x≥0;y≥0}", "system{x+y≤2100;x≥0;y≥0}"],
        correct: 0,
        solution: `Resolución:
Una lata de perdiz por lote A y dos por lote B dan x+2y≤1100.
Dos latas de lomo por lote A y una por lote B dan 2x+y≤1000.
Además, x≥0 e y≥0.
Por tanto:
system{x+2y≤1100;2x+y≤1000;x≥0;y≥0}.
Las rectas frontera se cortan al resolver system{x+2y=1100;2x+y=1000}, de donde (x,y)=(300,400).
El recinto factible tiene vértices (0,0), (500,0), (300,400) y (0,550).`
      },
      "1B c)": {
        options: ["300 lotes A y 400 lotes B; 45000 €", "500 lotes A y 0 lotes B; 35000 €", "0 lotes A y 550 lotes B; 33000 €", "400 lotes A y 300 lotes B; 46000 €"],
        correct: 0,
        solution: `Resolución:
Evaluamos D=70x+60y en los vértices:
D(0,0)=0.
D(500,0)=35000.
D(300,400)=70·300+60·400=45000.
D(0,550)=33000.
El máximo es 45000 euros en (300,400).
Resultado: debe preparar 300 lotes A y 400 lotes B.`
      },
      "2B a)": {
        options: ["system{5x+3y+2z=825;10x+20y+30z=4000;2x+3y+z=475}", "system{5x+10y+2z=825;3x+20y+3z=4000;2x+30y+z=475}", "system{x+y+z=825;10x+20y+30z=4000;2x+3y+z=475}", "system{5x+3y+2z=4000;10x+20y+30z=825;2x+3y+z=475}"],
        correct: 0,
        solution: `Resolución:
Sean x, y, z los lotes de los productos A, B y C.
Lavado, en minutos: 5x+3y+2z=825.
Escaldado, en segundos: 10x+20y+30z=4000.
Congelación, en horas: 2x+3y+z=475.
El sistema pedido es:
system{5x+3y+2z=825;10x+20y+30z=4000;2x+3y+z=475}.`
      },
      "2B b)": {
        options: ["(x,y,z)=(100,75,50)", "(x,y,z)=(75,100,50)", "(x,y,z)=(50,75,100)", "(x,y,z)=(100,50,75)"],
        correct: 0,
        solution: `Resolución:
Dividimos la segunda ecuación entre 10:
system{5x+3y+2z=825;x+2y+3z=400;2x+3y+z=475}.
Eliminamos x:
F₂←5F₂−F₁: 7y+13z=1175.
F₃←5F₃−2F₁: 9y+z=725.
De la segunda, z=725−9y.
Sustituimos: 7y+13(725−9y)=1175.
−110y=−8250, luego y=75.
Entonces z=725−9·75=50.
En x+2y+3z=400: x+150+150=400, por tanto x=100.
Resultado: (x,y,z)=(100,75,50).`
      }
    },
    "ccss2-algebra-01ff334dc278": {
      "a)": {
        options: ["X=B·(A+3I)⁻¹", "X=(A+3I)⁻¹·B", "X=B·(A−3I)⁻¹", "X=(B−3I)·A⁻¹"],
        correct: 0,
        solution: `Resolución:
Partimos de X·A+3X=B.
Escribimos 3X=X·3I y sacamos X como factor común por la izquierda:
X·(A+3I)=B.
Multiplicamos a la derecha por (A+3I)⁻¹:
X·(A+3I)·(A+3I)⁻¹=B·(A+3I)⁻¹.
Por tanto, X=B·(A+3I)⁻¹.`
      },
      "b)": {
        options: ["X=pmatrix{−4&−2\\10&6}", "X=pmatrix{−4&10\\−2&6}", "X=pmatrix{4&2\\−10&−6}", "X=pmatrix{−2&0\\2&2}"],
        correct: 0,
        solution: `Resolución:
Sea M=pmatrix{3&1\\2&1} y N=pmatrix{−2&0\\2&2}. La ecuación es M·X=N.
Multiplicamos a la izquierda por M⁻¹: X=M⁻¹·N.
det(M)=3·1−2·1=1.
M⁻¹=pmatrix{1&−1\\−2&3}.
Multiplicamos:
X=pmatrix{1&−1\\−2&3}·pmatrix{−2&0\\2&2}
=pmatrix{−4&−2\\10&6}.
Comprobación: M·X=N.`
      }
    },
    "ccss2-algebra-9db824ec48aa": {
      "1B a)": {
        options: ["Región del primer cuadrante bajo x=4 y x+3y=6", "Región sobre x+3y=6", "Región con x≥4", "Todo el primer cuadrante"],
        correct: 0,
        solution: `Resolución:
Las condiciones x≥0 e y≥0 sitúan la región en el primer cuadrante.
La condición x≤4 deja los puntos a la izquierda de x=4.
La condición x+3y≤6 deja los puntos por debajo de x+3y=6.
La región factible es la intersección de esos cuatro semiplanos.`
      },
      "1B b)": {
        options: ["(0,0), (4,0), (4,2/3), (0,2)", "(0,0), (6,0), (4,2), (0,4)", "(0,0), (4,0), (4,6), (0,2)", "(4,0), (6,0), (0,2)"],
        correct: 0,
        solution: `Resolución:
Los cortes con los ejes de x+3y=6 son (6,0) y (0,2), pero x≤4 descarta el tramo con x>4.
La intersección con x=4 cumple 4+3y=6, de donde y=2/3.
Así, los vértices son:
(0,0), (4,0), (4,2/3) y (0,2).`
      },
      "1B c)": {
        options: ["Mínimo z=−20 en (0,2)", "Mínimo z=−4 en (4,0)", "Mínimo z=0 en (0,0)", "Mínimo z=−32/3 en (4,2/3)"],
        correct: 0,
        solution: `Resolución:
Evaluamos z=−x−10y:
z(0,0)=0.
z(4,0)=−4.
z(4,2/3)=−4−20/3=−32/3.
z(0,2)=−20.
El menor valor es −20 y se alcanza en (0,2).`
      },
      "2B a)": {
        options: ["system{200x+100y+200z=12500;100x+200y+200z=13000;200x+200y+100z=12000}", "system{200x+100y+200z=13000;100x+200y+200z=12500;200x+200y+100z=12000}", "system{x+y+z=12500;100x+200y+200z=13000;200x+200y+100z=12000}", "system{2x+y+2z=12500;x+2y+2z=13000;2x+2y+z=12000}"],
        correct: 0,
        solution: `Resolución:
Sean x, y, z las cajas de bombón crocante, mazapán y gianduja.
Azúcar: 200x+100y+200z=12500.
Almendra: 100x+200y+200z=13000.
Chocolate: 200x+200y+100z=12000.
Este es el sistema que utiliza toda la materia prima.`
      },
      "2B b)": {
        options: ["(x,y,z)=(20,25,30)", "(x,y,z)=(25,20,30)", "(x,y,z)=(30,25,20)", "(x,y,z)=(20,30,25)"],
        correct: 0,
        solution: `Resolución:
Dividimos las tres ecuaciones entre 100:
system{2x+y+2z=125;x+2y+2z=130;2x+2y+z=120}.
Restamos la primera a la segunda: −x+y=5, luego y=x+5.
Restamos la primera a la tercera: y−z=−5, luego z=y+5=x+10.
Sustituimos en la primera:
2x+(x+5)+2(x+10)=125.
5x+25=125, de donde x=20.
Entonces y=25 y z=30.
Resultado: 20 cajas de crocante, 25 de mazapán y 30 de gianduja.`
      }
    },
    "ccss2-analisis-763f7548a0d5": {
      "3A a)": {
        options: ["t=−3", "t=3", "t=−1", "t=0"],
        correct: 0,
        solution: `Resolución:
Cada rama es continua en su intervalo; estudiamos x=1.
Límite por la izquierda y valor:
lim_{x→1⁻}f(x)=f(1)=t.
Límite por la derecha:
lim_{x→1⁺}(x²−4x)=1−4=−3.
Para que sea continua deben coincidir:
t=−3.
Resultado: t=−3.`
      },
      "3A b)": {
        options: ["Dos parábolas exteriores y el segmento y=0 entre −1 y 1", "Una única parábola y=x²", "La recta y=0 para todo x", "Dos rectas y=±x"],
        correct: 0,
        solution: `Resolución:
Para t=0:
f(x)=x²+4x si x<−1; f(x)=0 si −1≤x≤1; f(x)=x²−4x si x>1.
La primera parábola tiene vértice (−2,−4) y en x=−1 se aproxima a −3, punto no incluido.
El tramo central es el segmento del eje OX desde −1 hasta 1, con extremos incluidos.
La tercera parábola tiene vértice (2,−4) y en x=1 se aproxima a −3, punto no incluido.
La gráfica es simétrica respecto del eje OY y presenta saltos en x=−1 y x=1.`
      },
      "4A a)": {
        options: ["52 mil euros", "57 mil euros", "25 mil euros", "50 mil euros"],
        correct: 0,
        solution: `Resolución:
Sustituimos t=2 en f(t)=t³−9t²+15t+50:
f(2)=2³−9·2²+15·2+50
=8−36+30+50=52.
Resultado: el segundo mes alcanzó 52 mil euros.`
      },
      "4A b)": {
        options: ["Primer mes; 57 mil euros", "Quinto mes; 25 mil euros", "Sexto mes; 32 mil euros", "Segundo mes; 52 mil euros"],
        correct: 0,
        solution: `Resolución:
f′(t)=3t²−18t+15=3(t−1)(t−5).
Puntos críticos: t=1 y t=5.
Comparamos también los extremos del intervalo [0,6]:
f(0)=50, f(1)=57, f(5)=25 y f(6)=32.
El mayor valor es 57.
Resultado: el precio máximo se alcanzó en el primer mes y fue 57 mil euros.`
      },
      "4A c)": {
        options: ["Quinto mes; 25 mil euros", "Primer mes; 57 mil euros", "Sexto mes; 32 mil euros", "Inicio; 50 mil euros"],
        correct: 0,
        solution: `Resolución:
Los candidatos al mínimo absoluto en [0,6] son los extremos y los puntos críticos.
Ya hemos obtenido:
f(0)=50, f(1)=57, f(5)=25 y f(6)=32.
El menor valor es 25.
Resultado: el precio mínimo se alcanzó en el quinto mes y fue 25 mil euros.`
      }
    },
    "ccss2-analisis-03eed1ea7144": {
      "3B a)": {
        options: ["No es continua: límite izquierdo 4 y valor/límite derecho 1", "Es continua y vale 1", "Es continua y vale 4", "No existe ningún límite lateral"],
        correct: 0,
        solution: `Resolución:
En x=−1:
lim_{x→−1⁻}(x²+6x+9)=1−6+9=4.
Como −1 pertenece al tramo central, f(−1)=1 y lim_{x→−1⁺}f(x)=1.
Los límites laterales no coinciden: 4≠1.
Por tanto, f no es continua en x=−1; presenta una discontinuidad de salto.`
      },
      "3B b)": {
        options: ["Mínimo en (3,0); máximos en los extremos con valor 1", "Máximo en (3,0)", "Mínimo en (2,1)", "No tiene extremos en (1,4)"],
        correct: 0,
        solution: `Resolución:
En (1,4) usamos f(x)=x²−6x+9=(x−3)².
f′(x)=2x−6=2(x−3), que se anula en x=3.
Si 1<x<3, f′(x)<0: la función decrece.
Si 3<x<4, f′(x)>0: la función crece.
Por tanto, hay un mínimo relativo en x=3 y f(3)=0.
En el intervalo cerrado [1,4], f(1)=1 y f(4)=1 son los valores máximos.`
      },
      "3B c)": {
        options: ["Decrece en (1,3) y crece en (3,+∞)", "Crece en (1,3) y decrece en (3,+∞)", "Crece en todo (1,+∞)", "Decrece en todo (1,+∞)"],
        correct: 0,
        solution: `Resolución:
Para x>1, f(x)=(x−3)² y f′(x)=2(x−3).
Tomamos un punto de cada intervalo:
En (1,3), x=2: f′(2)=−2<0, luego decrece.
En (3,+∞), x=4: f′(4)=2>0, luego crece.
Recta de signos: (1,3): − ↓; x=3; (3,+∞): + ↑.
Resultado: decrece en (1,3) y crece en (3,+∞).`
      },
      "4B": {
        options: ["f(x)=x²−6x+11", "f(x)=x²+6x+11", "f(x)=2x²−12x+20", "f(x)=x²−3x+2"],
        correct: 0,
        solution: `Resolución:
Sea f(x)=ax²+bx+c.
El mínimo en (3,2) proporciona:
f(3)=2 ⇒ 9a+3b+c=2,
f′(3)=0 ⇒ 6a+b=0.
La tangente en x=4 es paralela a y=2x+7, por tanto su pendiente es 2:
f′(4)=2 ⇒ 8a+b=2.
Reunimos el sistema:
system{9a+3b+c=2;6a+b=0;8a+b=2}.
Restando las dos últimas ecuaciones: 2a=2, luego a=1.
Entonces b=−6 y, en la primera, 9−18+c=2, de donde c=11.
Resultado: f(x)=x²−6x+11.`
      }
    },
    "ccss2-analisis-091e02a8d985": {
      "3A a)": {
        options: ["t=1 o t=−1", "Solo t=1", "Solo t=−1", "t=0"],
        correct: 0,
        solution: `Resolución:
En x=0, f(0)=1.
Límite por la izquierda:
lim_{x→0⁻}(x+t)²=t².
Límite por la derecha:
lim_{x→0⁺}(x−t)²=t².
Para que sea continua, t²=1.
Por tanto, t=1 o t=−1.`
      },
      "3A b)": {
        options: ["Mínimo relativo en (−4,0)", "Máximo relativo en (−4,0)", "Mínimo relativo en (0,16)", "No tiene extremos"],
        correct: 0,
        solution: `Resolución:
En (−∞,0), con t=4, f(x)=(x+4)².
f′(x)=2(x+4), que se anula en x=−4.
Para x<−4, por ejemplo x=−5, f′(−5)=−2<0.
Para −4<x<0, por ejemplo x=−2, f′(−2)=4>0.
Recta de signos: (−∞,−4): − ↓; x=−4; (−4,0): + ↑.
El signo cambia de − a +, luego hay un mínimo relativo.
f(−4)=0. Resultado: mínimo en (−4,0).`
      },
      "3A c)": {
        options: ["Decrece en (−∞,−4) y crece en (−4,0)", "Crece en (−∞,−4) y decrece en (−4,0)", "Crece en todo (−∞,0)", "Decrece en todo (−∞,0)"],
        correct: 0,
        solution: `Resolución:
Con t=4 y x<0, f′(x)=2(x+4).
El punto crítico es x=−4.
En (−∞,−4), usamos x=−5: f′(−5)=−2<0, luego decrece.
En (−4,0), usamos x=−2: f′(−2)=4>0, luego crece.
Resultado: decrece en (−∞,−4) y crece en (−4,0).`
      },
      "4A": {
        options: ["a=1, b=3, c=−24", "a=−1, b=−3, c=−24", "a=1, b=−3, c=24", "a=3, b=1, c=−24"],
        correct: 0,
        solution: `Resolución:
f(x)=ax³+bx²+cx+3.
f′(x)=3ax²+2bx+c y f″(x)=6ax+2b.
Pendiente −24 en x=0:
f′(0)=c=−24.
Mínimo relativo en x=2:
f′(2)=12a+4b+c=0 ⇒ 3a+b=6.
Punto de inflexión en x=−1:
f″(−1)=−6a+2b=0 ⇒ b=3a.
Reunimos:
system{c=−24;3a+b=6;b=3a}.
Sustituyendo b=3a: 6a=6, luego a=1, b=3 y c=−24.
Comprobación del mínimo: f″(2)=12+6=18>0.`
      }
    },
    "ccss2-analisis-587fd4c061ab": {
      "3B a)": {
        options: ["t=1", "t=−1", "t=2", "t=0"],
        correct: 0,
        solution: `Resolución:
En x=2, el tramo izquierdo da f(2)=|2|−t=2−t.
El límite por la derecha es:
lim_{x→2⁺}(x²−8x+13)=4−16+13=1.
Para continuidad: 2−t=1.
Por tanto, t=1.`
      },
      "3B b)": {
        options: ["y=|x|−1 hasta x=2 y la parábola x²−8x+13 para x>2", "Solo la parábola x²−8x+13", "Solo y=|x|−1", "La recta y=x−1 para todo x"],
        correct: 0,
        solution: `Resolución:
Para t=1, el primer tramo es y=|x|−1, una V con vértice (0,−1), definida hasta x=2 incluido.
El segundo tramo es y=x²−8x+13=(x−4)²−3 para x>2, una parábola con vértice (4,−3).
En x=2 ambos tramos toman el valor 1, por lo que se unen sin salto.
Se dibuja punto cerrado en (2,1) para el primer tramo y la rama de la parábola a partir de ese mismo punto.`
      },
      "4B a)": {
        options: ["16 mil euros", "20 mil euros", "8 mil euros", "24 mil euros"],
        correct: 0,
        solution: `Resolución:
C(x)=x³−9x²+24x.
Para el primer kilómetro:
C(1)=1³−9·1²+24·1
=1−9+24=16.
Resultado: 16 mil euros.`
      },
      "4B b)": {
        options: ["Crece en (0,2), decrece en (2,4) y crece en (4,4.5)", "Decrece en todo el intervalo", "Crece en (0,4) y decrece en (4,4.5)", "Decrece en (0,2) y crece en (2,4.5)"],
        correct: 0,
        solution: `Resolución:
C′(x)=3x²−18x+24=3(x−2)(x−4).
Puntos críticos: x=2 y x=4.
En (0,2), x=1: C′(1)=9>0, luego crece.
En (2,4), x=3: C′(3)=−3<0, luego decrece.
En (4,4.5), x=4.25: C′(4.25)>0, luego crece.
Recta de signos: + ↑ |₂ − ↓ |₄ + ↑.`
      },
      "4B c)": {
        options: ["Kilómetro 2; 20 mil euros", "Kilómetro 4; 16 mil euros", "Kilómetro 4.5; 16.875 mil euros", "Kilómetro 1; 16 mil euros"],
        correct: 0,
        solution: `Resolución:
Para el máximo absoluto en [0,4.5] comparamos extremos y puntos críticos:
C(0)=0.
C(2)=8−36+48=20.
C(4)=64−144+96=16.
C(4.5)=91.125−182.25+108=16.875.
El mayor valor es 20.
Resultado: el coste máximo se alcanzó en el kilómetro 2 y fue 20 mil euros.`
      }
    },
    "ccss2-probabilidad-e6babe86a203": {
      "a)": {
        options: ["0,70", "0,75", "0,65", "0,09"],
        correct: 0,
        solution: `Resolución:
Sea C="no llevar cinturón" y V="no respetar la velocidad".
P(C∪V)=P(C)+P(V)−P(C∩V).
P(C∪V)=0,15+0,60−0,05=0,70.
Resultado: la probabilidad de incumplir alguna norma es 0,70.`
      },
      "b)": {
        options: ["No son independientes, pues 0,05≠0,15·0,60", "Sí son independientes", "Son incompatibles", "Son sucesos contrarios"],
        correct: 0,
        solution: `Resolución:
Si fueran independientes tendría que cumplirse P(C∩V)=P(C)·P(V).
P(C)·P(V)=0,15·0,60=0,09.
Como 0,05≠0,09, los sucesos no son independientes.`
      }
    },
    "ccss2-probabilidad-ee58c05f4f32": {
      "a)": {
        options: ["0,0001", "0,01", "0,02", "0,0002"],
        correct: 0,
        solution: `Resolución:
Las lesiones son independientes.
P(las dos)=0,01·0,01=0,0001.`
      },
      "b)": {
        options: ["1−0,99⁴≈0,0394", "0,01⁴", "4·0,01=0,04 exactamente", "0,99⁴"],
        correct: 0,
        solution: `Resolución:
Usamos el suceso contrario: que ninguna de las cuatro se lesione.
P(al menos una)=1−P(ninguna)=1−0,99⁴.
1−0,99⁴=0,03940399≈0,0394.`
      },
      "c)": {
        options: ["2·0,01·0,99=0,0198", "0,01²=0,0001", "0,02", "0,99²"],
        correct: 0,
        solution: `Resolución:
Puede lesionarse la primera y no la segunda, o al revés.
P(exactamente una)=0,01·0,99+0,99·0,01
=2·0,01·0,99=0,0198.`
      }
    },
    "ccss2-probabilidad-86f3f42086bf": {
      "a)": {
        options: ["1/7", "2/8", "2/7", "1/8"],
        correct: 0,
        solution: `Resolución:
Tras extraer un tornillo defectuoso quedan 7 tornillos, de los cuales solo 1 es defectuoso.
P(segundo defectuoso | primero defectuoso)=1/7.`
      },
      "b)": {
        options: ["1/14", "3/28", "1/7", "1/4"],
        correct: 0,
        solution: `Resolución:
Las posiciones de los dos defectuosos son equiprobables: hay C(8,2)=28 parejas.
Para localizar el segundo exactamente en la tercera extracción, las posiciones deben ser {1,3} o {2,3}.
Hay 2 casos favorables.
P=2/28=1/14.`
      }
    },
    "ccss2-probabilidad-210fdbd38051": {
      "a)": {
        options: ["0,24", "0,20", "0,30", "0,50"],
        correct: 0,
        solution: `Resolución:
Sea S="ticket superior a 30 €".
P(S)=P(M)P(S|M)+P(H)P(S|H).
P(S)=0,60·0,20+0,40·0,30=0,12+0,12=0,24.`
      },
      "b)": {
        options: ["7/19≈0,3684", "0,40", "0,28", "12/19≈0,6316"],
        correct: 0,
        solution: `Resolución:
P(H∩S̄)=0,40·0,70=0,28.
P(S̄)=1−0,24=0,76.
Por Bayes:
P(H|S̄)=P(H∩S̄)/P(S̄)=0,28/0,76=7/19≈0,3684.`
      }
    },
    "ccss2-estadistica-d328d8aecfe9": {
      "a)": {
        options: ["(123,124; 127,976)", "(123,59; 127,51)", "(113,4; 137,7)", "(125,55; 130,40)"],
        correct: 0,
        solution: `Resolución:
La media muestral es x̄=2511/20=125,55.
Para un 97 % de confianza, z_{0,985}=2,1701.
E=z·σ/√n=2,1701·5/√20≈2,426.
IC=(125,55−2,426;125,55+2,426)
=(123,124;127,976).`
      },
      "b)": {
        options: ["No es razonable en ninguno de los dos casos", "Es razonable en ambos", "Solo con confianza del 97 %", "Solo con significación 0,08"],
        correct: 0,
        solution: `Resolución:
Con confianza del 97 %, el intervalo es (123,124;127,976); 113,4 no pertenece a él.
Con significación 0,08, la confianza es 92 % y z_{0,96}=1,7507.
El nuevo margen es 1,7507·5/√20≈1,957 y el intervalo (123,593;127,507).
113,4 tampoco pertenece a este intervalo.
Resultado: se rechaza la media 113,4 en ambos casos.`
      }
    },
    "ccss2-estadistica-409e267ff163": {
      "a)": {
        options: ["n=100 y x̄=50000 h", "n=50 y x̄=50000 h", "n=100 y x̄=49804 h", "n=196 y x̄=50196 h"],
        correct: 0,
        solution: `Resolución:
El centro del intervalo (49804,50196) es:
x̄=(49804+50196)/2=50000.
El error es E=(50196−49804)/2=196.
Con 95 %, z=1,96 y E=zσ/√n:
196=1,96·1000/√n ⇒ √n=10 ⇒ n=100.
Resultado: n=100 y x̄=50000 horas.`
      },
      "b)": {
        options: ["Aproximadamente 256 h", "196 h", "277 h", "181 h"],
        correct: 0,
        solution: `Resolución:
Para confianza 92,98 %, (1+0,9298)/2=0,9649 y en la tabla z≈1,81.
E=zσ/√n=1,81·1000/√50≈255,97.
Resultado: error máximo aproximado de 256 horas.`
      }
    },
    "ccss2-estadistica-24362eeef3d0": {
      "a)": {
        options: ["(8,680; 9,320) mg", "(8,84; 9,16) mg", "(7,04; 10,96) mg", "(8,4; 9,6) mg"],
        correct: 0,
        solution: `Resolución:
Con 95 %, z=1,96.
E=1,96·2/√150≈0,3201.
IC=(9−0,3201;9+0,3201)
=(8,6799;9,3201) mg.`
      },
      "b)": {
        options: ["No se acepta ni con 95 % de confianza ni con α=0,2", "Se acepta en ambos casos", "Solo se acepta con 95 %", "Solo se acepta con α=0,2"],
        correct: 0,
        solution: `Resolución:
8,4 no pertenece al IC del 95 %: (8,680;9,320), por lo que se rechaza.
Con α=0,2, la confianza es 80 % y z_{0,90}=1,2816.
E=1,2816·2/√150≈0,2093; IC=(8,7907;9,2093).
8,4 tampoco pertenece al nuevo intervalo.
Resultado: la afirmación no se acepta en ninguno de los dos casos.`
      }
    },
    "ccss2-estadistica-dcb59fea226c": {
      "a)": {
        options: ["x̄=24 meses y n=150", "x̄=23,0398 y n=250", "x̄=24,9602 y n=150", "x̄=24 y n=100"],
        correct: 0,
        solution: `Resolución:
El centro del intervalo es x̄=(23,0398+24,9602)/2=24.
El error es E=(24,9602−23,0398)/2=0,9602.
0,9602=1,96·6/√n.
√n≈12,247 y n≈150.
Resultado: x̄=24 meses y n=150.`
      },
      "b)": {
        options: ["E≈0,744 meses", "E≈0,960 meses", "E≈0,372 meses", "E≈1,176 meses"],
        correct: 0,
        solution: `Resolución:
Manteniendo el 95 % de confianza:
E=1,96·6/√250≈0,7438 meses.
Resultado: error máximo aproximado de 0,744 meses.`
      }
    }
  });
})();
