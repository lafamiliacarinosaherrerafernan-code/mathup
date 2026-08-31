(function () {
  "use strict";
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};
  const q = (options, correct, solution) => ({ options, correct, solution });

  const answers = {
    "ccss2-algebra-c94f122fdea2": {
      "Resultado": q(
        ["1,4; 1; 4,8 puntos", "1; 1,4; 4,8 puntos", "2; 2; 3,2 puntos", "1,4; 2; 3,8 puntos"], 0,
        `Resolución:
Sean x, y, z las puntuaciones de las tres preguntas.
x+y+z=7,2; x=1,4y; z=2(x+y).
Sustituimos z: 3(x+y)=7,2 ⇒ x+y=2,4.
Como x=1,4y: 2,4y=2,4 ⇒ y=1.
Entonces x=1,4 y z=2·2,4=4,8.
Resultado final: 1,4; 1; 4,8 puntos.`
      )
    },
    "ccss2-algebra-06b15b069078": {
      "b.2)": q(
        ["X=((0,1/2),(1/2,1/2))", "X=((0,1),(1,1))", "X=((-2,2),(2,0))", "X=((1/2,0),(1/2,1/2))"], 0,
        `Resolución:
ABX=CX+I ⇒ (AB-C)X=I ⇒ X=(AB-C)⁻¹.
Calculamos AB=((-5,3),(4,4)).
Por tanto, AB-C=((-2,2),(2,0)).
Su determinante es -4, distinto de cero.
Mediante X=1/det(AB-C)·Adj((AB-C)ᵀ), obtenemos:
X=((0,1/2),(1/2,1/2)).
Comprobación: ABX=CX+I.`
      )
    },
    "ccss2-algebra-c9ffcce398b6": {
      "a.1)": q(
        ["B=20x+17y; x+2y≤170, 9x+4y≤900, x+y≥100, x,y≥0", "B=20x+17y; x+2y≥170, x+y≤100", "B=37(x+y); x+y=100", "B=17x+20y; 9x+4y≥900"], 0,
        `Resolución:
Sea x el número de paquetes A e y el de paquetes B.
B(x,y)=20x+17y.
Trabajo manual: 30x+60y≤5100 ⇒ x+2y≤170.
Máquinas: 45x+20y≤4500 ⇒ 9x+4y≤900.
Envío mínimo: x+y≥100.
Además, x,y≥0.
Los vértices del recinto son (30,70), (80,45) y (100,0).`
      ),
      "a.2)": q(
        ["80 paquetes A y 45 B; beneficio 2365 €", "30 A y 70 B; 1790 €", "100 A y 0 B; 2000 €", "45 A y 80 B; 2260 €"], 0,
        `Resolución:
Evaluamos B=20x+17y en los vértices:
B(30,70)=600+1190=1790,
B(80,45)=1600+765=2365,
B(100,0)=2000.
Resultado final: 80 paquetes A y 45 paquetes B; beneficio máximo 2365 €.`
      )
    },
    "ccss2-algebra-d0d6b2a0f325": {
      "a)": q(
        ["I+P+J=25; 140I+130P+160J=3610; 4P=I+J", "I+P+J=3610; 140I+130P+160J=25; P=4(I+J)", "I+P+J=25; 140I+130P+160J=3610; P=I+J", "I+P+J=25; I+P+J=3610; 4I=P+J"], 0,
        `Resolución:
Sean I, P y J los huéspedes italianos, portugueses y japoneses.
Número total: I+P+J=25.
Gasto total: 140I+130P+160J=3610.
Los portugueses son la cuarta parte de los otros dos: P=(I+J)/4, es decir, 4P=I+J.`
      ),
      "b)": q(
        ["12 italianos, 5 portugueses y 8 japoneses", "8 italianos, 5 portugueses y 12 japoneses", "10 italianos, 5 portugueses y 10 japoneses", "12 italianos, 8 portugueses y 5 japoneses"], 0,
        `Resolución:
De 4P=I+J y I+P+J=25:
5P=25 ⇒ P=5, e I+J=20.
En el gasto:
140I+130·5+160J=3610 ⇒ 7I+8J=148.
J=20-I:
7I+8(20-I)=148 ⇒ -I=-12 ⇒ I=12.
Entonces J=8.
Resultado final: 12 italianos, 5 portugueses y 8 japoneses.`
      )
    },
    "ccss2-algebra-6e3b2e8fb9d8": {
      "b.2)": q(
        ["X=((1/2,-1),(2,1))", "X=((5,0),(2,1))", "X=((2,2),(0,1))", "X=((-1,1),(2,1/2))"], 0,
        `Resolución:
CX=AB+X ⇒ (C-I)X=AB ⇒ X=(C-I)⁻¹AB.
AB=((5,0),(2,1)) y C-I=((2,2),(0,1)).
det(C-I)=2≠0 y (C-I)⁻¹=((1/2,-1),(0,1)).
Multiplicamos:
X=((1/2,-1),(0,1))·((5,0),(2,1))
=((1/2,-1),(2,1)).
Comprobación: CX=AB+X.`
      )
    },
    "ccss2-algebra-2ca61377583d": {
      "a.1)": q(
        ["No, porque (1,2) no cumple 2x+y≥6", "Sí, y es el único mínimo", "Sí, porque F(1,2)=10", "No, porque incumple 2x+5y≤30"], 0,
        `Resolución:
Comprobamos el punto de Laura (1,2):
2x+y=2·1+2=4.
La restricción exige 2x+y≥6 y 4 no es mayor o igual que 6.
Resultado: la respuesta de Laura no es exacta porque su punto no pertenece al recinto.`
      ),
      "a.2)": q(
        ["Sí, (3,0) es factible y alcanza el mínimo", "No, (3,0) no es factible", "No, porque F(3,0)=0", "Sí, pero alcanza el máximo"], 0,
        `Resolución:
En (3,0):
2x+y=6≥6,
2x+5y=6≤30,
2x-y=6≤6.
Por tanto, es factible.
Además F=6x+3y-2=3(2x+y)-2.
Como 2x+y≥6, F≥3·6-2=16.
En (3,0) se cumple la igualdad, luego alcanza el mínimo.`
      ),
      "a.3)": q(
        ["16", "18", "10", "-2"], 0,
        `Resolución:
La función puede escribirse F(x,y)=3(2x+y)-2.
El menor valor permitido de 2x+y es 6.
Por tanto:
Fmin=3·6-2=16.
Resultado final: el mínimo vale 16.`
      )
    },
    "ccss2-analisis-c34c65435289": {
      "a.1)": q(
        ["k=1 o k=-1/2", "Solo k=1", "k=0 o k=1", "Para todo k"], 0,
        `Resolución:
Igualamos las ramas en x=k:
-k²-3k+10=k²-4k+9.
2k²-k-1=0.
Factorizamos: (2k+1)(k-1)=0.
Resultado final: k=-1/2 o k=1.`
      ),
      "a.2)": q(
        ["Máximo en (-3/2,49/4) y mínimo en (2,5)", "Mínimo en (-3/2,49/4) y máximo en (2,5)", "Solo máximo en (1,8)", "No hay extremos"], 0,
        `Resolución:
Para k=1, la primera rama tiene f'(x)=-2x-3, que se anula en x=-3/2. El signo cambia de + a -, luego es máximo:
f(-3/2)=49/4.
La segunda tiene f'(x)=2x-4, que se anula en x=2. El signo cambia de - a +, luego es mínimo:
f(2)=5.
Resultado final: máximo (-3/2,49/4) y mínimo (2,5).`
      ),
      "a.3)": q(
        ["Crece en (-∞,-3/2) y (2,∞); decrece en (-3/2,2)", "Crece en (-3/2,2); decrece fuera", "Crece en toda ℝ", "Decrece en toda ℝ"], 0,
        `Resolución:
Marcamos -3/2 y 2 en la recta real.
Para x=-2, f'(-2)=1>0: crece.
Para x=0, f'(0)=-3<0: decrece.
Para x=3, f'(3)=2>0: crece.
En x=1 las ramas enlazan manteniendo signo negativo.
Resultado: crece en (-∞,-3/2) y (2,∞); decrece en (-3/2,2).`
      )
    },
    "ccss2-analisis-ef3faa073aff": {
      "b.1)": q(
        ["a=1, b=-3, c=1", "a=-1, b=3, c=-1", "a=1, b=3, c=-1", "a=2, b=-6, c=1"], 0,
        `Resolución:
f(x)=ax³+bx²+c.
Como (2,-3) pertenece a la gráfica: 8a+4b+c=-3.
Al haber extremo en x=2: f'(2)=12a+4b=0.
Como (1,-1) es punto de inflexión: a+b+c=-1 y f''(1)=6a+2b=0.
Resolvemos el sistema:
8a+4b+c=-3,
12a+4b=0,
a+b+c=-1,
6a+2b=0.
Se obtiene a=1, b=-3, c=1.
Además f''(2)=6>0, coherente con un mínimo.`
      )
    },
    "ccss2-analisis-abc671ec5609": {
      "b.4)": q(
        ["a=-299, b=448", "a=299, b=-448", "a=-149, b=298", "a=1, b=149"], 0,
        `Resolución:
V(t)=at³+bt²+t.
Como V(1)=150: a+b+1=150 ⇒ a+b=149.
Al alcanzar un máximo en t=1: V'(1)=0.
V'(t)=3at²+2bt+1, luego 3a+2b=-1.
Resolvemos:
a+b=149,
3a+2b=-1.
Resultado: a=-299, b=448.
Comprobación: V''(1)=6a+2b=-898<0, por tanto es máximo.`
      )
    },
    "ccss2-analisis-bb8f05461b0e": {
      "a.1)": q(
        ["k=1", "k=0", "k=2", "k=-1"], 0,
        `Resolución:
Continuidad en x=k:
2k²+4=-2k²+8k.
4k²-8k+4=0 ⇒ 4(k-1)²=0.
Resultado final: k=1.`
      ),
      "a.2)": q(
        ["Mínimo en (0,4) y máximo en (2,8)", "Máximo en (0,4) y mínimo en (2,8)", "Solo mínimo en (1,6)", "No tiene extremos"], 0,
        `Resolución:
Con k=1:
Para x≤1, f'(x)=4x; cambia de - a + en x=0, luego hay mínimo y f(0)=4.
Para x>1, f'(x)=-4x+8; cambia de + a - en x=2, luego hay máximo y f(2)=8.
Resultado: mínimo (0,4), máximo (2,8).`
      ),
      "a.3)": q(
        ["Convexa en (-∞,1) y cóncava en (1,∞)", "Cóncava en (-∞,1) y convexa en (1,∞)", "Convexa en toda ℝ", "Cóncava en toda ℝ"], 0,
        `Resolución:
Primera rama: f''(x)=4>0, por tanto es convexa.
Segunda rama: f''(x)=-4<0, por tanto es cóncava.
Resultado: convexa en (-∞,1) y cóncava en (1,∞).`
      )
    },
    "ccss2-analisis-c1fefc343cb7": {
      "b.1)": q(
        ["a=1, b=-3, c=-9", "a=-1, b=3, c=9", "a=1, b=3, c=-9", "a=2, b=-6, c=-18"], 0,
        `Resolución:
f(x)=ax³+bx²+cx-3.
El mínimo (-1,2) da f(-1)=2 y f'(-1)=0.
El punto de inflexión (1,-14) da f(1)=-14 y f''(1)=0.
Sistema:
-a+b-c=5,
3a-2b+c=0,
a+b+c=-11,
6a+2b=0.
Resolviendo: a=1, b=-3, c=-9.
Además f''(-1)=-12<0 indicaría máximo, por lo que el dato geométrico importado debe contrastarse con el original; los parámetros que satisfacen las cuatro condiciones algebraicas son los indicados.`
      )
    },
    "ccss2-analisis-a94478e91aed": {
      "b.3)": q(
        ["a=1, b=45", "a=-1, b=45", "a=1, b=54", "a=2, b=36"], 0,
        `Resolución:
A(t)=at³-12t²+bt.
Como A(3)=54:
27a-108+3b=54 ⇒ 9a+b=54.
Al haber máximo en t=3:
A'(t)=3at²-24t+b,
A'(3)=27a-72+b=0 ⇒ 27a+b=72.
Resolvemos el sistema y obtenemos a=1, b=45.
A''(3)=18-24=-6<0, luego es máximo.`
      )
    },
    "ccss2-probabilidad-6c5a846b3808": {
      "b.1)": q(["0,008", "0,08", "0,70", "0,032"], 0,
        `Resolución:
Las pruebas son independientes y hay que superar las tres:
P(A∩B∩C)=0,10·0,40·0,20=0,008.`),
      "b.2)": q(["0,116", "0,884", "0,072", "0,124"], 0,
        `Resolución:
Fallar solo A: 0,90·0,40·0,20=0,072.
Fallar solo B: 0,10·0,60·0,20=0,012.
Fallar solo C: 0,10·0,40·0,80=0,032.
Sumamos: 0,072+0,012+0,032=0,116.`),
      "b.3)": q(["3/29≈0,1034", "1/3≈0,3333", "3/25=0,12", "12/29≈0,4138"], 0,
        `Resolución:
P(falla B y solo una)=0,012.
P(falla exactamente una)=0,116.
P(falla B | falla una)=0,012/0,116=12/116=3/29≈0,1034.`)
    },
    "ccss2-probabilidad-e2438921b46c": {
      "b.1)": q(["0,72", "0,28", "0,70", "0,80"], 0,
        `Resolución:
P(G)=0,30·0,60+0,50·0,80+0,20·0,70
=0,18+0,40+0,14=0,72.`),
      "b.2)": q(["3/7≈0,4286", "0,30", "3/10=0,30", "4/7≈0,5714"], 0,
        `Resolución:
P(perder)=1-0,72=0,28.
P(A∩perder)=0,30·0,40=0,12.
Por Bayes:
P(A|perder)=0,12/0,28=12/28=3/7≈0,4286.`)
    },
    "ccss2-estadistica-b3229d8f9e13": {
      "a)": q(["[13,55;16,45] minutos", "[11;19] minutos", "[13,69;16,31] minutos", "[14,33;15,67] minutos"], 0,
        `Resolución:
Para el 97%, z≈2,17.
E=2,17·4/√36=2,17·4/6≈1,45.
IC=15±1,45≈[13,55;16,45] minutos.`),
      "b)": q(["Aumentando el tamaño de la muestra", "Disminuyendo la muestra", "Aumentando σ", "No puede reducirse"], 0,
        `Resolución:
La amplitud es 2z·σ/√n.
Sin cambiar la confianza, z permanece constante. Para reducir la amplitud hay que aumentar n, pues √n aparece en el denominador.`),
      "c)": q(["No, 17 queda fuera del intervalo", "Sí, 17 pertenece al intervalo", "No puede decidirse", "Sí, porque 17 es próximo a 15"], 0,
        `Resolución:
El intervalo obtenido al 97% es aproximadamente [13,55;16,45].
El valor 17 no pertenece a él. Un intervalo al 95% sería aún más estrecho, por lo que tampoco contendría 17.
Resultado: no se acepta la afirmación.`
      )
    },
    "ccss2-estadistica-d1efc37d092e": {
      "a)": q(["[0,9429;0,9971] litros", "[0,92;1,02] litros", "[0,9455;0,9945] litros", "[0,9575;0,9825] litros"], 0,
        `Resolución:
Para el 97%, z≈2,17.
E=2,17·0,05/√16=2,17·0,05/4=0,027125.
IC=0,97±0,027125=[0,942875;0,997125]≈[0,9429;0,9971].`),
      "b)": q(["Aumentando el número de botellas", "Reduciendo el número de botellas", "Aumentando la desviación típica", "Manteniendo todo igual"], 0,
        `Resolución:
La amplitud es 2z·σ/√n. Manteniendo la confianza, se reduce aumentando el tamaño muestral n.`),
      "c)": q(["No, 1 litro queda fuera", "Sí, 1 litro pertenece", "Sí, porque es el valor nominal", "No puede comprobarse"], 0,
        `Resolución:
El intervalo al 97% termina aproximadamente en 0,9971 litros, por debajo de 1.
El intervalo al 95% es más estrecho y tampoco incluye 1.
Resultado: no se acepta que la media poblacional sea 1 litro.`
      )
    }
  };

  let position = 1;
  Object.values(answers).forEach((exercise) => Object.values(exercise).forEach((answer) => {
    const shift = position % 4;
    position += 1;
    answer.options = answer.options.slice(-shift).concat(answer.options.slice(0, -shift));
    answer.correct = (answer.correct + shift) % 4;
  }));
  Object.assign(window.CCSS_II_EXAM_ANSWERS, answers);
})();
