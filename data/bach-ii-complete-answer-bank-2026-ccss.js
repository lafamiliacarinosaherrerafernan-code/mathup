(function () {
  "use strict";

  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const q = (options, correct, solution) => ({ options, correct, solution });
  const answers = {
    "ccss2-algebra-e0c84e299fdc": {
      "Resultado": q(
        ["Ciudad Real: 15; Cuenca: 10; Toledo: 5", "Ciudad Real: 10; Cuenca: 5; Toledo: 15", "Ciudad Real: 18; Cuenca: 8; Toledo: 4", "Ciudad Real: 12; Cuenca: 12; Toledo: 6"],
        0,
        `Resolución:
Llamamos C, Q y T al número de estudiantes que prefieren Ciudad Real, Cuenca y Toledo.

Del enunciado:
C+Q+T=30,
C=3T,
0,40Q=0,20(C+T).

Sustituimos C=3T en la tercera ecuación:
0,40Q=0,20(3T+T)=0,80T,
por tanto, Q=2T.

Reunimos las relaciones en la primera ecuación:
3T+2T+T=30 ⇒ 6T=30 ⇒ T=5.

Entonces:
C=3·5=15,
Q=2·5=10.

Resultado final: Ciudad Real, 15 estudiantes; Cuenca, 10; Toledo, 5.`
      )
    },
    "ccss2-algebra-c5283d53af75": {
      "b.4)": q(
        ["X=((14,15),(-12,-13))", "X=((8,-9),(6,-7))", "X=((2,1),(0,-1))", "X=((-14,-15),(12,13))"],
        0,
        `Resolución:
Partimos de AXA⁻¹=B.

Multiplicamos a la izquierda por A⁻¹ y a la derecha por A:
A⁻¹(AXA⁻¹)A=A⁻¹BA,
de donde X=A⁻¹BA.

Para A=((2,1),(0,-1)):
det(A)=2·(-1)-1·0=-2≠0.

Usamos la fórmula de la inversa:
A⁻¹=1/det(A)·Adj(Aᵀ)=((-1/2,-1/2),(0,-1)).

Calculamos primero:
A⁻¹B=((-7,8),(-6,7)).

Finalmente:
X=A⁻¹BA=((-7,8),(-6,7))·((2,1),(0,-1))
=((14,15),(-12,-13)).

Comprobación: AXA⁻¹=B.
Resultado final: X=((14,15),(-12,-13)).`
      )
    },
    "ccss2-algebra-455736e66014": {
      "a.1)": q(
        ["B(x,y)=1,8x+1,7y, con 2x+3y≤150, x+2y≤90, x+y≤70, x,y≥0", "B(x,y)=3x+3y, con x+y≤70", "B(x,y)=1,2x+1,3y, con 2x+3y≥150", "B(x,y)=1,8x+1,7y, con x+y≥70"],
        0,
        `Resolución:
Sea x el número de abanicos del modelo A e y el número de abanicos del modelo B.

El beneficio unitario es:
modelo A: 3-1,20=1,80 €,
modelo B: 3-1,30=1,70 €.

Por tanto, la función objetivo es:
B(x,y)=1,8x+1,7y.

Restricciones:
40x+60y≤3000 ⇒ 2x+3y≤150,
80x+160y≤7200 ⇒ x+2y≤90,
x+y≤70,
x≥0, y≥0.

El recinto factible está delimitado por esas rectas y los ejes. Sus vértices son:
(0,0), (70,0), (60,10), (30,30) y (0,45).`
      ),
      "a.2)": q(
        ["70 del modelo A y 0 del B; beneficio máximo 126 €", "60 del modelo A y 10 del B; beneficio 125 €", "30 de cada modelo; beneficio 105 €", "0 del modelo A y 45 del B; beneficio 76,50 €"],
        0,
        `Resolución:
Evaluamos B(x,y)=1,8x+1,7y en los vértices:
B(0,0)=0,
B(70,0)=126,
B(60,10)=108+17=125,
B(30,30)=54+51=105,
B(0,45)=76,50.

El valor mayor es 126.

Resultado final: deben fabricarse 70 abanicos del modelo A y ninguno del modelo B. El beneficio máximo es 126 €.`
      )
    },
    "ccss2-algebra-61d437e45a08": {
      "a)": q(
        ["A+B+C=20000; 0,05A+0,10B+0,02C=994; A=3(B+C)", "A+B+C=994; 5A+10B+2C=20000; A=B+C", "A+B+C=20000; A+B+C=994; A=3B+C", "A+B+C=20000; 0,05A+0,10B+0,02C=994; A=3B+C"],
        0,
        `Resolución:
Llamamos A, B y C al capital invertido en los tres fondos.

Capital total:
A+B+C=20000.

Beneficio total:
0,05A+0,10B+0,02C=994.

El capital del primer fondo triplica al de los otros dos juntos:
A=3(B+C).

Ese es el sistema lineal que modeliza el problema.`
      ),
      "b)": q(
        ["A=15000 €, B=1800 €, C=3200 €", "A=12000 €, B=3000 €, C=5000 €", "A=15000 €, B=3200 €, C=1800 €", "A=10000 €, B=6000 €, C=4000 €"],
        0,
        `Resolución:
Del sistema:
A+B+C=20000,
0,05A+0,10B+0,02C=994,
A=3(B+C).

Como A=3(B+C), se tiene:
3(B+C)+(B+C)=20000 ⇒ B+C=5000,
y A=15000.

Sustituimos en la ecuación de los beneficios:
0,05·15000+0,10B+0,02C=994,
0,10B+0,02C=244.

Resolvemos:
B+C=5000,
0,10B+0,02C=244.

Restando 0,02(B+C)=100:
0,08B=144 ⇒ B=1800.

C=5000-1800=3200.

Resultado final: 15000 €, 1800 € y 3200 €, respectivamente.`
      )
    },
    "ccss2-algebra-3ff54ef0992a": {
      "b.3)": q(
        ["X=((-1,-1),(8,5))", "X=((1,1),(0,1))", "X=((7,-3),(8,-3))", "X=((1,-1),(8,-5))"],
        0,
        `Resolución:
Partimos de AXA⁻¹=B y aislamos X:
X=A⁻¹BA.

Para A=((1,1),(0,1)):
det(A)=1,
A⁻¹=((1,-1),(0,1)).

Calculamos:
A⁻¹B=((-1,0),(8,-3)).

Ahora multiplicamos por A:
X=((-1,0),(8,-3))·((1,1),(0,1))
=((-1,-1),(8,5)).

Comprobación: AXA⁻¹=B.
Resultado final: X=((-1,-1),(8,5)).`
      )
    },
    "ccss2-algebra-f6e4d8280bd0": {
      "a.1)": q(
        ["B(x,y)=35x+43y, con x+y≤400, x≥y, x≤240, x,y≥0", "B(x,y)=35x+43y, con x+y≥400, x≤y", "B(x,y)=78(x+y), con x≤240", "B(x,y)=43x+35y, con x+y≤240"],
        0,
        `Resolución:
Sea x el número de conejos e y el número de perdices.

La función objetivo es:
B(x,y)=35x+43y.

Las restricciones son:
x+y≤400,
x≥y,
x≤240,
x≥0, y≥0.

Los vértices del recinto factible son:
(0,0), (240,0), (240,160) y (200,200).`
      ),
      "a.2)": q(
        ["200 conejos y 200 perdices; 15600 €", "240 conejos y 160 perdices; 15280 €", "240 conejos y 0 perdices; 8400 €", "0 conejos y 400 perdices; 17200 €"],
        0,
        `Resolución:
Evaluamos B(x,y)=35x+43y:
B(0,0)=0,
B(240,0)=8400,
B(240,160)=8400+6880=15280,
B(200,200)=7000+8600=15600.

El máximo se obtiene en (200,200).

Resultado final: 200 conejos y 200 perdices; beneficio máximo de 15600 €.`
      )
    },
    "ccss2-analisis-0f120e33fdda": {
      "a.1)": q(
        ["k=-1 o k=0", "Solo k=-1", "Solo k=0", "Para todo k"],
        0,
        `Resolución:
Cada rama es continua en su intervalo. Estudiamos el punto de unión x=k.

Límite por la izquierda y valor de la función:
lim(x→k⁻)f(x)=f(k)=k²+4k+3.

Límite por la derecha:
lim(x→k⁺)f(x)=-3k²+3.

Para que sea continua:
k²+4k+3=-3k²+3,
4k²+4k=0,
4k(k+1)=0.

Resultado final: k=0 o k=-1.`
      ),
      "a.2)": q(
        ["Mínimo en (-2,-1) y máximo en (0,3)", "Máximo en (-2,-1) y mínimo en (0,3)", "Solo tiene un máximo en (-1,0)", "No tiene extremos relativos"],
        0,
        `Resolución:
Para k=-1:
f(x)=x²+4x+3 si x≤-1,
f(x)=-3x²+3 si x>-1.

Primera rama:
f'(x)=2x+4=0 ⇒ x=-2.
La derivada cambia de negativa a positiva, luego hay un mínimo.
f(-2)=4-8+3=-1.

Segunda rama:
f'(x)=-6x=0 ⇒ x=0.
La derivada cambia de positiva a negativa, luego hay un máximo.
f(0)=3.

Resultado final: mínimo relativo en (-2,-1) y máximo relativo en (0,3).`
      ),
      "a.3)": q(
        ["Crece en (-2,0); decrece en (-∞,-2) y (0,∞)", "Crece en (-∞,-2) y (0,∞); decrece en (-2,0)", "Crece en toda ℝ", "Decrece en toda ℝ"],
        0,
        `Resolución:
Marcamos en la recta real los valores que anulan la derivada: -2 y 0.

Si x<-2, por ejemplo x=-3, f'(-3)=-2<0: decrece.
Si -2<x<-1, por ejemplo x=-3/2, f'(-3/2)=1>0: crece.
Si -1<x<0, por ejemplo x=-1/2, f'(-1/2)=3>0: crece.
Si x>0, por ejemplo x=1, f'(1)=-6<0: decrece.

Como las dos ramas son continuas en x=-1 y mantienen signo positivo a ambos lados, el intervalo creciente se une.

Resultado final: crece en (-2,0) y decrece en (-∞,-2) y (0,∞).`
      )
    },
    "ccss2-analisis-f6a8553df127": {
      "b.1)": q(
        ["8407 litros", "8432 litros", "8000 litros", "8320 litros"],
        0,
        `Resolución:
El último año corresponde a t=11.

V(11)=11³-24·11²+180·11+8000
=1331-2904+1980+8000
=8407.

Resultado final: 8407 litros.`
      ),
      "b.2)": q(
        ["En el año 6", "En el año 10", "En el año 11", "En el año 0"],
        0,
        `Resolución:
Derivamos:
V'(t)=3t²-48t+180=3(t-6)(t-10).

Los puntos críticos son t=6 y t=10.
La derivada es positiva en (0,6), negativa en (6,10) y positiva en (10,11).

Comparamos también los extremos del intervalo:
V(0)=8000,
V(6)=8432,
V(10)=8400,
V(11)=8407.

Resultado final: el volumen fue máximo en el año 6.`
      ),
      "b.3)": q(
        ["8432 litros", "8407 litros", "8400 litros", "8000 litros"],
        0,
        `Resolución:
En el apartado anterior se ha demostrado que el máximo se alcanza para t=6.

V(6)=6³-24·6²+180·6+8000
=216-864+1080+8000
=8432.

Resultado final: el volumen máximo fue de 8432 litros.`
      )
    },
    "ccss2-analisis-b25affbff36b": {
      "a.1)": q(
        ["Sí, es continua para todo t≥0", "No, tiene una discontinuidad en t=1", "Solo es continua para t>1", "Solo es continua en [0,1]"],
        0,
        `Resolución:
Cada expresión es continua en su intervalo. Comprobamos t=1.

Por la izquierda y en el punto:
lim(t→1⁻)P(t)=P(1)=2+1²=3.

Por la derecha:
lim(t→1⁺)P(t)=(8·1²-1-1)/(2·1²)=6/2=3.

Los dos límites y el valor de la función coinciden.
Resultado final: P es continua para todo t≥0.`
      ),
      "a.2)": q(
        ["No; la profundidad es creciente", "Sí, a partir de t=1", "Sí, entre t=0 y t=1", "Disminuye después de t=2"],
        0,
        `Resolución:
Para 0<t<1:
P'(t)=2t>0.

Para t>1 escribimos:
P(t)=4-1/(2t)-1/(2t²).

Entonces:
P'(t)=1/(2t²)+1/t³=(t+2)/(2t³)>0.

La derivada es positiva en ambos tramos.
Resultado final: la profundidad no disminuye; es creciente.`
      ),
      "a.3)": q(
        ["No; se aproxima a 4 m sin superarlos", "Sí; supera 4 m al cabo de 2 años", "Sí; tiende a infinito", "No; nunca alcanza 3 m"],
        0,
        `Resolución:
Para t>1:
P(t)=4-1/(2t)-1/(2t²).

Como t>1, los dos términos que se restan son positivos, por lo que:
P(t)<4.

Además:
lim(t→∞)P(t)=4.

La profundidad se aproxima a 4 metros por debajo, pero no los supera.
Resultado final: no será necesario elevar el paseo por esta causa.`
      )
    },
    "ccss2-analisis-767a8fb58506": {
      "b.1)": q(
        ["a=1/4 y b=40", "a=1/2 y b=20", "a=4 y b=40", "a=1/4 y b=20"],
        0,
        `Resolución:
F(t)=at(b-t)=-at²+abt es una parábola cóncava.

Su máximo se alcanza en el vértice:
t=b/2.

Como el máximo se alcanza a los 20 minutos:
b/2=20 ⇒ b=40.

Además, F(20)=100:
a·20·(40-20)=100,
400a=100,
a=1/4.

Resultado final: a=1/4 y b=40.`
      ),
      "b.2)": q(
        ["43,75 unidades de atención", "35 unidades de atención", "50 unidades de atención", "87,5 unidades de atención"],
        0,
        `Resolución:
Con a=1/4 y b=40:
F(t)=1/4·t(40-t).

Para t=5:
F(5)=1/4·5·35=175/4=43,75.

Resultado final: la atención a los cinco minutos es 43,75.`
      )
    },
    "ccss2-probabilidad-5dc6ba7677cb": {
      "a)": q(
        ["0,355", "0,400", "0,300", "0,750"],
        0,
        `Resolución:
Aplicamos la probabilidad total:
P(A)=0,75·0,40+0,10·0,10+0,15·0,30
=0,300+0,010+0,045
=0,355.

Resultado final: P(alquiler)=0,355.`
      ),
      "b)": q(
        ["60/71≈0,8451", "3/4=0,75", "6/25=0,24", "71/60≈1,1833"],
        0,
        `Resolución:
Aplicamos Bayes:
P(U|A)=P(U∩A)/P(A).

P(U∩A)=0,75·0,40=0,30,
P(A)=0,355.

P(U|A)=0,30/0,355=300/355=60/71≈0,8451.

Resultado final: 60/71≈0,8451.`
      ),
      "c)": q(
        ["0,03", "0,015", "0,25", "0,06"],
        0,
        `Resolución:
Puede ocurrir en dos órdenes:
rural y periurbano, o periurbano y rural.

P=0,10·0,15+0,15·0,10
=2·0,10·0,15
=0,03.

Resultado final: 0,03.`
      )
    },
    "ccss2-probabilidad-d607c653c127": {
      "a)": q(
        ["0,3725", "0,4500", "0,2000", "0,6275"],
        0,
        `Resolución:
Por la probabilidad total:
P(F)=0,40·0,20+0,15·0,45+0,45·0,50
=0,080+0,0675+0,225
=0,3725.

Resultado final: 0,3725.`
      ),
      "b)": q(
        ["27/149≈0,1812", "0,45", "0,0675", "149/27≈5,5185"],
        0,
        `Resolución:
P(B|F)=P(B∩F)/P(F).

P(B∩F)=0,15·0,45=0,0675,
P(F)=0,3725.

P(B|F)=0,0675/0,3725=675/3725=27/149≈0,1812.

Resultado final: 27/149≈0,1812.`
      ),
      "c)": q(
        ["0,36", "0,18", "0,85", "0,40"],
        0,
        `Resolución:
Hay dos órdenes posibles:
fútbol y otros deportes, u otros deportes y fútbol.

P=0,40·0,45+0,45·0,40
=2·0,40·0,45
=0,36.

Resultado final: 0,36.`
      )
    },
    "ccss2-estadistica-275fe58b005c": {
      "b.1)": q(
        ["[13,06;18,94] días", "[10;22] días", "[14,53;17,47] días", "[15,06;16,94] días"],
        0,
        `Resolución:
Datos: x̄=16, σ=6, n=16 y confianza del 95%.
Para el 95%, z=1,96.

El error máximo es:
E=1,96·6/√16=1,96·6/4=2,94.

Intervalo:
16±2,94=[13,06;18,94].

Resultado final: [13,06;18,94] días.`
      ),
      "b.2)": q(
        ["2,94 días", "5,88 días", "1,47 días", "11,76 días"],
        0,
        `Resolución:
Con n=64, el error es:
E=1,96·6/√64=1,96·6/8=1,47.

La amplitud es el doble del error:
A=2E=2·1,47=2,94.

Al cuadruplicar el tamaño muestral, la amplitud se reduce a la mitad.
Resultado final: 2,94 días.`
      ),
      "b.3)": q(
        ["Hay que disminuir el nivel de confianza", "Hay que aumentar el nivel de confianza", "No depende del nivel de confianza", "Hay que mantener exactamente el 95%"],
        0,
        `Resolución:
El intervalo está centrado en 16. Para que 14 no quede contenido, el error debe ser menor que:
16-14=2.

Con n=16:
E=z·6/4=1,5z.

Necesitamos 1,5z<2, es decir:
z<4/3.

Un valor crítico z menor corresponde a un nivel de confianza menor.
Resultado final: hay que disminuir el nivel de confianza.`
      )
    },
    "ccss2-estadistica-16fd3245db2c": {
      "b.1)": q(
        ["[220,4;259,6] segundos", "[180;300] segundos", "[228,24;251,76] segundos", "[230;250] segundos"],
        0,
        `Resolución:
Datos: x̄=240, σ=60, n=36 y confianza del 95%.

E=1,96·60/√36=1,96·10=19,6.

Intervalo:
240±19,6=[220,4;259,6].

Resultado final: [220,4;259,6] segundos.`
      ),
      "b.2)": q(
        ["23,52 segundos", "11,76 segundos", "39,20 segundos", "19,60 segundos"],
        0,
        `Resolución:
Con n=100:
E=1,96·60/√100=1,96·6=11,76.

La amplitud completa es:
A=2E=2·11,76=23,52.

Resultado final: 23,52 segundos.`
      ),
      "b.3)": q(
        ["Hay que disminuir el nivel de confianza", "Hay que aumentarlo", "El 95% ya excluye 230", "El nivel de confianza no influye"],
        0,
        `Resolución:
El intervalo está centrado en 240. Para excluir 230, su error debe ser menor que:
240-230=10.

Con n=36:
E=z·60/6=10z.

Necesitamos 10z<10, luego z<1.
Al disminuir z disminuye el nivel de confianza y se estrecha el intervalo.

Resultado final: hay que disminuir el nivel de confianza.`
      )
    }
  };

  let optionPosition = 0;
  Object.values(answers).forEach((exercise) => {
    Object.values(exercise).forEach((answer) => {
      const shift = optionPosition % 4;
      optionPosition += 1;
      if (!shift) return;
      answer.options = answer.options.slice(-shift).concat(answer.options.slice(0, -shift));
      answer.correct = (answer.correct + shift) % 4;
    });
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, answers);
})();
