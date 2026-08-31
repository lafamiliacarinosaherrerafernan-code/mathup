(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-ed0555aa57f5": {
      "a)": answer(
        "A⁻¹=((1/3,−1/3,0),(0,0,1),(0,1/2,0))",
        ["A⁻¹=((1/3,0,−1/3),(0,1,0),(0,0,1/2))", "A no tiene inversa", "A⁻¹=((3,−3,0),(0,0,1),(0,2,0))"],
        `Partimos de

A=((3,0,2),
   (0,0,2),
   (0,1,0)).

Su determinante es det(A)=−6≠0, por lo que existe A⁻¹.

Calculamos la matriz de adjuntos y su traspuesta:

Adj(Aᵀ)=((−2,2,0),
         (0,0,−6),
         (0,−3,0)).

Aplicamos la fórmula del curso:

A⁻¹=Adj(Aᵀ)/det(A)
   =((1/3,−1/3,0),
     (0,0,1),
     (0,1/2,0)).

La comprobación A·A⁻¹=I₃ confirma el resultado.`
      ),
      "b)": answer(
        "X=((1/3),(0),(1/2))",
        ["X=((1/2),(0),(1/3))", "X=((1/3),(1/2),(0))", "La ecuación no tiene solución"],
        `La ecuación es A·X=B. Como det(A)≠0, multiplicamos por A⁻¹ a la izquierda:

A⁻¹·A·X=A⁻¹·B ⟹ X=A⁻¹·B.

X=((1/3,−1/3,0),
   (0,0,1),
   (0,1/2,0))
  ·((2),(1),(0))
 =((1/3),(0),(1/2)).

Comprobación:

A·X=((2),(1),(0))=B.`
      ),
    },

    "mates2-algebra-83141b6eb0ee": {
      "Resultado": answer(
        "Si a≠1/5, SCD con (x,y,z)=(−9/(1−5a), 2(2−a)/(1−5a), 3(1−2a)/(1−5a)); si a=1/5, SI",
        ["SCD para todo a", "Si a=1/5, SCI; en otro caso, SCD", "Si a≠1/5, SI; si a=1/5, SCD"],
        `Aplicamos el teorema de Rouché-Frobenius. La matriz de coeficientes es

A=((a,1,−1),
   (1,2,1),
   (1,3,−1)).

Por Sarrus:

det(A)=1−5a.

Si a≠1/5, det(A)≠0 y rango(A)=rango(A*)=3: el sistema es compatible determinado.

Para resolverlo, de la segunda y la tercera ecuación obtenemos

y−2z=−2,  y=2z−2,  x=6−5z.

Al sustituir en la primera:

(1−5a)z=3−6a.

Por tanto,

z=3(1−2a)/(1−5a),
y=2(2−a)/(1−5a),
x=−9/(1−5a).

Si a=1/5, la última igualdad se convierte en 0·z=9/5, que es imposible. En este caso rango(A)=2 y rango(A*)=3: el sistema es incompatible.`
      ),
    },

    "mates2-algebra-882f9ebab859": {
      "a)": answer(
        "(A−BC)⁻¹=((7,−1,−3),(5,−1,−2),(−6,1,3))",
        ["(A−BC)⁻¹=((7,1,−3),(5,1,−2),(−6,−1,3))", "A−BC no tiene inversa", "(A−BC)⁻¹=((1,0,1),(3,−3,1),(1,1,2))"],
        `Calculamos primero el producto:

BC=((0,−1,2),
    (−4,3,−4),
    (−2,1,−1)).

Entonces

A−BC=((1,0,1),
      (3,−3,1),
      (1,1,2)).

Su determinante, calculado por Sarrus, es −1≠0.

Formamos la matriz de adjuntos colocando cada menor con su signo (−1)^(i+j), la trasponemos y aplicamos

(A−BC)⁻¹=Adj((A−BC)ᵀ)/det(A−BC).

Se obtiene

(A−BC)⁻¹=((7,−1,−3),
           (5,−1,−2),
           (−6,1,3)).

La multiplicación por A−BC da I₃.`
      ),
      "b)": answer(
        "X=((11,−13,21),(8,−9,16),(−10,12,−18))",
        ["X=((7,−1,−3),(5,−1,−2),(−6,1,3))", "X=A−BC", "La ecuación no tiene solución"],
        `Agrupamos los términos que contienen X:

A·X−B·C·X=A
⟹ (A−BC)X=A.

Como det(A−BC)=−1≠0, multiplicamos por su inversa a la izquierda:

X=(A−BC)⁻¹A.

X=((7,−1,−3),
   (5,−1,−2),
   (−6,1,3))
  ·((1,−1,3),
    (−1,0,−3),
    (−1,2,1))

 =((11,−13,21),
   (8,−9,16),
   (−10,12,−18)).

Al sustituir esta matriz en la ecuación original se recupera A.`
      ),
    },

    "mates2-algebra-f09edcaf6770": {
      "Resultado": answer(
        "m≠±1: SCD; m=1: SI; m=−1: SCI con (x,y,z)=(12−7t, 2t−5, t)",
        ["m≠±1: SCI; m=±1: SCD", "m=1: SCI y m=−1: SI", "SCD para todo m"],
        `La matriz de coeficientes es

A=((1,2,3),
   (2,5,4),
   (1,3,m²)).

Por Sarrus:

det(A)=m²−1=(m−1)(m+1).

Si m≠±1, rango(A)=rango(A*)=3 y el sistema es compatible determinado.

Si m=1, las operaciones

F₂←F₂−2F₁,  F₃←F₃−F₁

producen dos ecuaciones con el mismo primer miembro y términos independientes distintos. Por tanto, rango(A)=2<rango(A*)=3 y el sistema es incompatible.

Si m=−1, ambas ecuaciones reducidas coinciden:

y−2z=−5.

Así, rango(A)=rango(A*)=2<3 y el sistema es compatible indeterminado. Tomando z=t:

y=2t−5,
x+2(2t−5)+3t=2 ⟹ x=12−7t.

Resultado para m=−1:

(x,y,z)=(12−7t,2t−5,t), t∈ℝ.`
      ),
    },

    "mates2-algebra-a5433a3bb098": {
      "a)": answer(
        "A⁻¹=((1,0,−1/2),(−1,1,1/2),(0,0,1/2))",
        ["A⁻¹=((1,0,1/2),(1,1,−1/2),(0,0,1/2))", "A no tiene inversa", "A⁻¹=((1,−1,0),(0,1,0),(−1/2,1/2,1/2))"],
        `La matriz es

A=((1,0,1),
   (1,1,0),
   (0,0,2)).

det(A)=2≠0. Calculamos sus adjuntos con el signo (−1)^(i+j), trasponemos la matriz obtenida y usamos

A⁻¹=Adj(Aᵀ)/det(A).

El resultado es

A⁻¹=((1,0,−1/2),
     (−1,1,1/2),
     (0,0,1/2)).

Se comprueba que A·A⁻¹=I₃.`
      ),
      "b)": answer(
        "X=((2,0,−5/2),(1,2,7/2),(0,0,3/2))",
        ["X=((2,0,−2),(1,2,3),(0,0,1))", "X=A⁻¹B", "La ecuación no tiene solución"],
        `Partimos de

AX−B=AB.

Sumamos B en ambos miembros:

AX=AB+B=(A+I)B.

Multiplicamos a la izquierda por A⁻¹:

X=A⁻¹(AB+B)=B+A⁻¹B.

Al efectuar los productos:

X=((2,0,−5/2),
   (1,2,7/2),
   (0,0,3/2)).

La sustitución en AX−B confirma que el resultado es AB.`
      ),
    },

    "mates2-algebra-d1c1615352bd": {
      "Resultado": answer(
        "a∉{1,−2}: SCD, x=y=z=1/(a+2); a=1: SCI, x+y+z=1; a=−2: SI",
        ["SCD para todo a", "a=1: SI y a=−2: SCI", "a∉{1,−2}: SI; a=1 o −2: SCD"],
        `La matriz de coeficientes es

A=((a,1,1),
   (1,a,1),
   (1,1,a)).

Su determinante es

det(A)=(a−1)²(a+2).

Si a∉{1,−2}, el sistema es compatible determinado. Por simetría, x=y=z y

(a+2)x=1 ⟹ x=y=z=1/(a+2).

Si a=1, las tres ecuaciones coinciden:

x+y+z=1.

Por Rouché-Frobenius, rango(A)=rango(A*)=1<3: hay infinitas soluciones.

Si a=−2, al sumar las tres ecuaciones el primer miembro vale 0, mientras que el segundo vale 3. Por tanto, rango(A)<rango(A*) y el sistema es incompatible.`
      ),
    },

    "mates2-algebra-3fb388cbdc48": {
      "a)": answer(
        "(2A−BC)⁻¹=((−1/3,2/3),(1/3,−1/3))",
        ["(2A−BC)⁻¹=((1/3,−2/3),(−1/3,1/3))", "2A−BC no tiene inversa", "(2A−BC)⁻¹=((3,6),(3,3))"],
        `Calculamos

BC=((-1,0),
    (1,−1)).

Por tanto,

2A−BC=((3,6),
       (3,3)).

Su determinante es

3·3−6·3=−9≠0.

Para una matriz de orden dos:

(2A−BC)⁻¹=1/(−9)·((3,−6),(−3,3))
          =((−1/3,2/3),(1/3,−1/3)).`
      ),
      "b)": answer(
        "X=((1/3,8/3),(1,−1/3))",
        ["X=((1/3,1),(8/3,−1/3))", "X=((−1/3,2/3),(1/3,−1/3))", "La ecuación no tiene solución"],
        `Agrupamos los términos con X:

2AX=BCX+A²
⟹ (2A−BC)X=A².

Como 2A−BC es invertible:

X=(2A−BC)⁻¹A².

A²=((7,6),
    (4,7)).

Entonces

X=((−1/3,2/3),
   (1/3,−1/3))
  ·((7,6),
    (4,7))
 =((1/3,8/3),
   (1,−1/3)).

La comprobación directa verifica la ecuación inicial.`
      ),
    },

    "mates2-algebra-d053de2a6dba": {
      "Resultado": answer(
        "SCD para todo a: (x,y,z)=((8a+17)/5, 4(a−1)/5, (a+4)/5)",
        ["SCI para todo a", "SCD solo si a≠1", "SI si a=−4"],
        `La tercera ecuación es exactamente el doble de la primera, también en el término independiente. No añade una condición nueva.

Estudiamos el sistema formado por

{ x−2y=5
  y+z=a
  x−3z=a+1 }.

Su determinante es −5≠0, independiente de a. Por Rouché-Frobenius, el sistema es compatible determinado para todo a.

De las dos primeras:

x=5+2y,  z=a−y.

Sustituimos en la tercera:

5+2y−3(a−y)=a+1
⟹ 5y=4a−4
⟹ y=4(a−1)/5.

Después:

x=(8a+17)/5,  z=(a+4)/5.

La tercera ecuación original, 2x−4y=10, queda automáticamente satisfecha.`
      ),
    },

    "mates2-geometria-68cc366c579c": {
      "a)": answer(
        "Las rectas se cruzan: no son paralelas y no se cortan",
        ["Son paralelas distintas", "Son coincidentes", "Se cortan en (1,0,0)"],
        `Los vectores directores son

v⃗ᵣ=(1,1,−1),  v⃗ₛ=(1,2,0).

No son proporcionales, por lo que las rectas no son paralelas.

Para estudiar si se cortan igualamos sus ecuaciones paramétricas:

1+t=u,  t=2+2u,  −t=0.

La tercera igualdad da t=0 y la primera u=1, pero entonces la segunda exigiría 0=4. El sistema es incompatible.

Por tanto, r y s se cruzan.`
      ),
      "b)": answer(
        "p:(x,y,z)=(1/3,−2/3,2/3)+λ(−2,1,−1)",
        ["p:(x,y,z)=(1,0,0)+λ(1,1,−1)", "p:(x,y,z)=(0,2,0)+λ(1,2,0)", "No existe perpendicular común"],
        `Tomamos R=r(t) y S=s(u). El vector S−R debe ser perpendicular a los dos vectores directores:

(S−R)·v⃗ᵣ=0,
(S−R)·v⃗ₛ=0.

Al sustituir:

1+3u−3t=0,
3+5u−3t=0.

Restando, obtenemos u=−1 y después t=−2/3.

Así,

R=(1/3,−2/3,2/3),  S=(−1,0,0).

Un vector de la perpendicular común es

S−R=(−4/3,2/3,−2/3)∥(−2,1,−1).

Por tanto:

p:(x,y,z)=(1/3,−2/3,2/3)+λ(−2,1,−1).`
      ),
    },

    "mates2-geometria-c57415a4fd2e": {
      "Resultado": answer(
        "A′=(2,9,−4)",
        ["A′=(0,5,1)", "A′=(−2,9,4)", "A′=(2,−9,−4)"],
        `La recta tiene un punto P=(−1,3,−1) y vector director v⃗=(1,2,2).

Hallamos la proyección Q de A sobre r:

Q=P+t v⃗.

Como AQ es perpendicular a r:

(A−Q)·v⃗=0.

Equivalentemente,

t=((A−P)·v⃗)/(v⃗·v⃗)=9/9=1.

Luego Q=(0,5,1).

Q es el punto medio de A y A′. Resolvemos coordenada a coordenada:

(−2+x′)/2=0 ⟹ x′=2,
(1+y′)/2=5 ⟹ y′=9,
(6+z′)/2=1 ⟹ z′=−4.

Resultado: A′=(2,9,−4).`
      ),
    },

    "mates2-geometria-64defe4588ac": {
      "Resultado": answer(
        "k=1 y el punto de corte es (−2,4,1)",
        ["k=−1 y el punto es (2,4,1)", "k=1 y el punto es (−2,1,4)", "No existe ningún valor de k"],
        `Si las rectas se cortan, el punto común debe cumplir las cuatro ecuaciones.

De r:

x=2−y,  z=y−3.

Sustituimos en la segunda ecuación de s:

y−2(y−3)=2
⟹ y=4.

Entonces z=1 y x=−2.

Imponemos ahora la primera ecuación de s:

k=y−3z=4−3=1.

Por tanto, para k=1 las rectas se cortan en (−2,4,1).`
      ),
    },

    "mates2-geometria-962013c3e862": {
      "Resultado": answer(
        "Son paralelos para k=0 o k=1; no existe ningún valor de k que los haga perpendiculares",
        ["Paralelos solo para k=1 y perpendiculares para k=0", "Paralelos para k=−1 o 2", "Perpendiculares para k=2"],
        `El vector normal del plano es

n⃗π=(2,k,−1).

La recta es la intersección de los planos de normales

n⃗₁=(k,1,0),  n⃗₂=(2,1,−1).

Por tanto, un vector director es

v⃗=n⃗₁×n⃗₂=(−1,k,k−2).

Para que la recta sea paralela al plano:

v⃗·n⃗π=0
⟹ −2+k²−k+2=0
⟹ k(k−1)=0.

Luego k=0 o k=1.

Para que fueran perpendiculares, v⃗ y n⃗π tendrían que ser proporcionales. La primera componente impondría una razón −1/2; la segunda obliga entonces a k=0, pero con k=0 las terceras componentes −2 y −1 no guardan esa razón. No existe ningún valor de k que haga la recta perpendicular al plano.`
      ),
    },

    "mates2-geometria-728e1590e34e": {
      "a)": answer(
        "Las rectas son secantes",
        ["Son paralelas", "Son coincidentes", "Se cruzan"],
        `Sus vectores directores son

v⃗ᵣ=(−3,5,1),  v⃗ₛ=(−1,2,0).

No son proporcionales. Igualamos las ecuaciones:

2−3λ=1−μ,
3+5λ=2μ,
λ=5.

Con λ=5, la primera da μ=14 y la segunda también se cumple. Por tanto, las rectas son secantes.`
      ),
      "b)": answer(
        "El punto de corte es (−13,28,5)",
        ["El punto es (13,−28,5)", "El punto es (−13,14,5)", "No existe punto de corte"],
        `Del sistema de intersección se obtiene λ=5 y μ=14.

Sustituimos en cualquiera de las rectas:

r(5)=(2−3·5, 3+5·5, 5)=(−13,28,5).

También:

s(14)=(1−14,2·14,5)=(−13,28,5).

Resultado: (−13,28,5).`
      ),
    },

    "mates2-geometria-493f3920b234": {
      "a)": answer(
        "a=6",
        ["a=−6", "a=1", "No existe ningún valor"],
        `Los vectores directores son

v⃗ₛ=(4,−2,2),
v⃗ᵣ=(1,a−1,3).

Para que sean perpendiculares:

v⃗ₛ·v⃗ᵣ=0
⟹ 4−2(a−1)+6=0
⟹ 12−2a=0
⟹ a=6.`
      ),
      "b)": answer(
        "Se cortan en (0,1,0)",
        ["Se cortan en (1,6,3)", "Se cortan en (4,−1,2)", "No se cortan"],
        `Para a=6 escribimos las rectas en forma paramétrica:

s:(x,y,z)=(0,1,0)+t(4,−2,2),
r:(x,y,z)=(1,6,3)+u(1,5,3).

Igualamos coordenadas. De las ecuaciones de x y z se obtiene t=0 y u=−1. La coordenada y también se cumple:

1−2·0=6+5(−1)=1.

El punto de intersección es (0,1,0).`
      ),
      "c)": answer(
        "π:8x+5y−11z−5=0",
        ["π:8x−5y+11z+5=0", "π:4x−2y+2z=0", "π:x+5y+3z=0"],
        `El plano contiene los vectores directores

v⃗ₛ=(4,−2,2),  v⃗ᵣ=(1,5,3).

Un vector normal es

n⃗=v⃗ₛ×v⃗ᵣ=(−16,−10,22)∥(8,5,−11).

Como el plano pasa por P=(0,1,0):

8(x−0)+5(y−1)−11(z−0)=0.

Por tanto:

π:8x+5y−11z−5=0.`
      ),
    },

    "mates2-geometria-6f0c7eb54892": {
      "a)": answer(
        "s:(x,y,z)=(−1,3,2)+λ(2,1,−3)",
        ["s:(x,y,z)=(−1,3,2)+λ(1,1,1)", "s:(x,y,z)=(1,0,−1)+λ(2,1,−3)", "s:(x,y,z)=(−1,3,2)+λ(1,−2,0)"],
        `La recta r es la intersección de los planos de normales

n⃗₁=(1,1,1),  n⃗₂=(1,−2,0).

Su vector director es

v⃗ᵣ=n⃗₁×n⃗₂=(2,1,−3).

La recta paralela que pasa por A=(−1,3,2) es

s:(x,y,z)=(−1,3,2)+λ(2,1,−3).`
      ),
      "b)": answer(
        "d(r,s)=4√(13/14)",
        ["d(r,s)=√14", "d(r,s)=4√13", "d(r,s)=0"],
        `Tomamos un punto de r. Al elegir y=0 en sus ecuaciones se obtiene P=(1,0,−1).

Las rectas son paralelas y tienen vector director v⃗=(2,1,−3). Por tanto:

d(r,s)=|(A−P)×v⃗|/|v⃗|.

A−P=(−2,3,3),

(A−P)×v⃗=(−12,0,−8).

Así:

d(r,s)=√(144+64)/√14
      =4√13/√14
      =4√(13/14).`
      ),
    },

    "mates2-geometria-a251a527de05": {
      "a)": answer(
        "r:(x,y,z)=(1,1,0)+λ(2,1,1)",
        ["r:(x,y,z)=(1,1,0)+λ(1,1,0)", "r:(x,y,z)=(2,1,1)+λ(1,1,0)", "r:(x,y,z)=(1,1,0)+λ(2,1,−1)"],
        `El vector normal del plano es

n⃗π=(2,1,1).

Una recta perpendicular al plano tiene ese vector como director. Como debe pasar por A=(1,1,0):

r:(x,y,z)=(1,1,0)+λ(2,1,1).`
      ),
      "b)": answer(
        "π′:2x+y+z−3=0",
        ["π′:2x+y+z−1=0", "π′:x+y−3=0", "π′:2x−y+z−1=0"],
        `Un plano paralelo a π conserva su vector normal:

π′:2x+y+z+D=0.

Como pasa por A=(1,1,0):

2·1+1+0+D=0 ⟹ D=−3.

Por tanto:

π′:2x+y+z−3=0.`
      ),
      "c)": answer(
        "A′=(−1/3,1/3,−2/3)",
        ["A′=(1/3,2/3,−1/3)", "A′=(−1/3,−1/3,2/3)", "A′=(1,1,0)"],
        `La perpendicular por A es

r:(x,y,z)=(1+2λ,1+λ,λ).

Buscamos su corte Q con π:

2(1+2λ)+(1+λ)+λ=1
⟹ 6λ=−2
⟹ λ=−1/3.

Luego:

Q=(1/3,2/3,−1/3).

Q es el punto medio de A y A′:

(1+x′)/2=1/3,
(1+y′)/2=2/3,
(0+z′)/2=−1/3.

De aquí:

A′=(−1/3,1/3,−2/3).`
      ),
    },

    "mates2-analisis-9869a0de1690": {
      "a)": answer(
        "La parábola y=x²/4 y la recta y=x se cortan en (0,0) y (4,4)",
        ["Se cortan en (0,0) y (2,2)", "Solo se cortan en (0,0)", "Se cortan en (−4,−4) y (0,0)"],
        `Para hallar los puntos comunes igualamos las funciones:

x²/4=x
⟹ x²−4x=0
⟹ x(x−4)=0.

Por tanto, x=0 o x=4. Los puntos de corte son (0,0) y (4,4).

La gráfica y=x²/4 es una parábola de vértice (0,0), abierta hacia arriba. La gráfica y=x es una recta de pendiente 1 que pasa por el origen.`
      ),
      "b)": answer(
        "El recinto está entre x=0 y x=4, con y=x por encima de y=x²/4",
        ["El recinto está entre x=−4 y x=0", "La parábola queda por encima de la recta entre 0 y 4", "Las curvas no encierran ningún recinto"],
        `Los límites del recinto son los puntos de corte x=0 y x=4.

Comprobamos qué función queda arriba tomando, por ejemplo, x=2:

y_recta=2,
y_parábola=2²/4=1.

Así, entre 0 y 4 la recta y=x es la función superior y la parábola y=x²/4 es la inferior. El recinto que debe colorearse es exactamente la zona comprendida entre ambas curvas.`
      ),
      "c)": answer(
        "Área=8/3 unidades cuadradas",
        ["Área=4/3", "Área=16/3", "Área=8"],
        `Según la representación, la función superior es y=x y la inferior y=x²/4, con límites 0 y 4:

Área=∫₀⁴ (x−x²/4) dx.

Aplicamos la regla de Barrow:

Área=[x²/2−x³/12]₀⁴
    =(8−16/3)−0
    =8/3.

Resultado: 8/3 unidades cuadradas.`
      ),
    },

    "mates2-analisis-a49fbfc0261a": {
      "Resultado": answer(
        "I=ln(x²+1)−ln|x|+C",
        ["I=ln(x²+1)+ln|x|+C", "I=−ln(x²+1)+2ln|x|+C", "I=arctan x−ln|x|+C"],
        `Descomponemos:

(x²−1)/(x(x²+1))=A/x+(Bx+C)/(x²+1).

Al eliminar denominadores:

x²−1=A(x²+1)+(Bx+C)x.

Igualando coeficientes:

A=−1, B=2, C=0.

Por tanto:

I=∫(−1/x+2x/(x²+1)) dx
 =−ln|x|+ln(x²+1)+C.

La derivada del resultado devuelve el integrando.`
      ),
    },

    "mates2-analisis-ce813cc87aeb": {
      "a)": answer(
        "k=6",
        ["k=5", "k=7", "No existe ningún valor"],
        `Cada rama es continua en su intervalo; solo estudiamos x=1.

Límite por la izquierda:

lim(x→1⁻) f(x)=2·1+5=7.

Valor de la función:

f(1)=7.

Límite por la derecha:

lim(x→1⁺) f(x)=1²+k=1+k.

Para que sea continua:

1+k=7 ⟹ k=6.`
      ),
      "b)": answer(
        "Sí, para k=6 es derivable en x=1 y f′(1)=2",
        ["No es derivable porque las derivadas laterales son distintas", "Solo es derivable si k=2", "Es continua, pero nunca derivable"],
        `Con k=6:

f′(x)={ 2, si x<1
         2x, si x>1 }.

Derivada lateral izquierda:

f′(1⁻)=2.

Derivada lateral derecha:

f′(1⁺)=2·1=2.

Como la función es continua en x=1 y ambas derivadas laterales coinciden, es derivable y f′(1)=2.`
      ),
    },

    "mates2-analisis-3bc0f882c315": {
      "Resultado": answer(
        "El límite vale 1/2",
        ["El límite vale 0", "El límite vale 1", "El límite no existe"],
        `Al sustituir x=0 aparece la indeterminación 0/0. Aplicamos L’Hôpital:

lim(x→0) (1−cos x)/(eˣ−1)²
=lim(x→0) sen x/[2(eˣ−1)eˣ].

Vuelve a aparecer 0/0. Aplicamos L’Hôpital por segunda vez:

=lim(x→0) cos x/[2e²ˣ+2(eˣ−1)eˣ]
=1/[2+0]
=1/2.

Resultado: 1/2.`
      ),
    },

    "mates2-analisis-5eda61faad7a": {
      "Resultado": answer(
        "Base de 10 cm de lado, altura 10 cm y coste mínimo 6 €",
        ["Base de 20 cm, altura 2,5 cm y coste 8 €", "Base de 5 cm, altura 40 cm y coste 9 €", "Base de 10 cm, altura 20 cm y coste 10 €"],
        `Sea x el lado de la base cuadrada, en centímetros, y h la altura.

La condición de volumen es

x²h=1000 ⟹ h=1000/x².

El área lateral es 4xh cm² y la base mide x² cm². Como 1 m²=10000 cm², el coste es

C(x)=100·(4xh/10000)+200·(x²/10000)
    =40/x+0,02x².

Derivamos:

C′(x)=−40/x²+0,04x.

C′(x)=0 ⟹ 0,04x³=40 ⟹ x³=1000 ⟹ x=10.

La segunda derivada es positiva para x>0, luego es un mínimo.

h=1000/10²=10 cm.

C(10)=40/10+0,02·100=4+2=6 €.

Resultado: depósito cúbico abierto, de 10 cm de lado y 10 cm de altura; coste mínimo 6 €.`
      ),
    },

    "mates2-analisis-b09561e4b4d5": {
      "Resultado": answer(
        "a=−1/4, b=1; la función es continua en ℝ, derivable salvo en x=4",
        ["a=1/4, b=−1; no es continua", "a=−1/4, b=1; derivable en todo ℝ", "a=1, b=−4; no derivable en x=−2"],
        `Cada rama es continua; estudiamos los puntos de unión.

Continuidad en x=−2:

lim(x→−2⁻)f(x)=2(−2)+1=−3,

lim(x→−2⁺)f(x)=4a−2b.

Por tanto, 4a−2b=−3.

Continuidad en x=4:

lim(x→4⁻)f(x)=16a+4b,

lim(x→4⁺)f(x)=4−4=0.

Así, 16a+4b=0. Resolvemos el sistema

{ 4a−2b=−3
  16a+4b=0 }

y obtenemos a=−1/4, b=1.

La función derivada por ramas es

f′(x)={ 2
         2ax+b
         1 }.

En x=−2, ambas derivadas laterales valen 2: es derivable.

En x=4, la derivada izquierda vale −1 y la derecha 1: no es derivable.

Resultado: continua en ℝ y derivable en ℝ\\{4}.`
      ),
    },

    "mates2-analisis-5cedbeab66a8": {
      "Resultado": answer(
        "El límite vale 2",
        ["El límite vale 1", "El límite vale 4", "El límite vale 0"],
        `La regla de L’Hôpital permite derivar numerador y denominador cuando aparece una indeterminación 0/0 o ∞/∞ y se cumplen sus hipótesis.

Al sustituir x=0:

4[x−ln(1+x)]/[x ln(1+x)]=0/0.

Primera aplicación:

lim(x→0) 4[x−ln(1+x)]/[x ln(1+x)]
=lim(x→0) [4x/(1+x)]/[ln(1+x)+x/(1+x)].

Sigue siendo 0/0. Derivamos otra vez:

=lim(x→0) [4/(1+x)²]/[1/(1+x)+1/(1+x)²]
=4/(1+1)
=2.`
      ),
    },

    "mates2-analisis-ef349e0731c8": {
      "Resultado": answer(
        "I=1/2 ln|x|−1/2 ln|x−2|−2/(x−2)+C",
        ["I=1/2 ln|x|+1/2 ln|x−2|+2/(x−2)+C", "I=ln|x(x−2)|+C", "I=1/2 ln|x|−1/2 ln|x−2|+2/(x−2)+C"],
        `Factorizamos:

x³−4x²+4x=x(x−2)².

Descomponemos:

(x+2)/[x(x−2)²]=A/x+B/(x−2)+C/(x−2)².

Eliminamos denominadores:

x+2=A(x−2)²+Bx(x−2)+Cx.

Sustituyendo x=0: 2=4A, luego A=1/2.

Sustituyendo x=2: 4=2C, luego C=2.

Comparando el coeficiente de x²: A+B=0, luego B=−1/2.

Integramos cada fracción:

I=1/2∫dx/x−1/2∫dx/(x−2)+2∫dx/(x−2)²

=1/2 ln|x|−1/2 ln|x−2|−2/(x−2)+C.`
      ),
    },

    "mates2-analisis-eab25317556c": {
      "a)": answer(
        "En x≥0, y=xe^(x²) parte de (0,0), es creciente; las rectas son x=1 e y=0",
        ["La función es decreciente en x≥0", "La función corta de nuevo el eje OX en x=1", "La recta vertical es x=0"],
        `La función es f(x)=x e^(x²), con x≥0.

f(0)=0 y f(1)=e.

Derivamos:

f′(x)=e^(x²)(1+2x²)>0 para x≥0.

Por tanto, la curva parte del origen y es estrictamente creciente. Añadimos a la representación la recta vertical x=1 y el eje horizontal y=0.`
      ),
      "b)": answer(
        "El recinto está bajo y=xe^(x²), sobre y=0 y entre x=0 y x=1",
        ["El recinto está entre x=1 y x=e", "La función no forma ningún recinto con las rectas", "El recinto queda por encima de la curva"],
        `La curva corta al eje OX en x=0. La recta x=1 la corta en (1,e).

Así, el recinto está limitado por:

- y=0, desde x=0 hasta x=1;
- x=1, desde y=0 hasta y=e;
- y=x e^(x²), desde (0,0) hasta (1,e).

La zona debe colorearse entre la curva y el eje OX.`
      ),
      "c)": answer(
        "Área=(e−1)/2",
        ["Área=e−1", "Área=e/2", "Área=1/2"],
        `La representación muestra que los límites son 0 y 1:

Área=∫₀¹ x e^(x²) dx.

Hacemos u=x², du=2x dx:

Área=1/2∫₀¹ eᵘ du
    =1/2[eᵘ]₀¹
    =(e−1)/2.

Resultado: (e−1)/2 unidades cuadradas.`
      ),
    },

    "mates2-analisis-d7fda1d5da3b": {
      "Resultado": answer(
        "I=ln|x|−arctan x+C",
        ["I=ln(x²+1)−arctan x+C", "I=ln|x|+arctan x+C", "I=1/x−arctan x+C"],
        `Descomponemos:

(x²−x+1)/[x(x²+1)]=A/x+(Bx+C)/(x²+1).

Al eliminar denominadores:

x²−x+1=A(x²+1)+(Bx+C)x.

Igualando coeficientes:

A=1, B=0, C=−1.

Entonces:

I=∫(1/x−1/(x²+1)) dx
 =ln|x|−arctan x+C.`
      ),
    },

    "mates2-analisis-c031c549d272": {
      "Resultado": answer(
        "b=3 y a puede ser cualquier número real; es continua y no derivable en x=0",
        ["a=3 y b=0", "a=1 y b=3; es derivable", "No existen valores"],
        `Para la continuidad en x=0:

lim(x→0⁻)f(x)=b,
f(0)=lim(x→0⁺)f(x)=3.

Por tanto, b=3. El parámetro a no interviene en la continuidad.

Estudiamos la derivabilidad:

f′(x)={ 1, si x<0
         2ax, si x>0 }.

f′(0⁻)=1,
f′(0⁺)=0.

Las derivadas laterales son distintas para cualquier a. Por tanto, con b=3 y cualquier a∈ℝ, la función es continua y no derivable en x=0.`
      ),
    },

    "mates2-analisis-4ec3a532b714": {
      "Resultado": answer(
        "El límite vale 3/4",
        ["El límite vale 1/2", "El límite vale 3/2", "El límite no existe"],
        `Al sustituir x=1 aparece 0/0. Aplicamos L’Hôpital:

lim(x→1) (x³−3x+2)/(x⁴−2x²+1)
=lim(x→1) (3x²−3)/(4x³−4x).

Sigue apareciendo 0/0. Aplicamos L’Hôpital por segunda vez:

=lim(x→1) 6x/(12x²−4)
=6/(12−4)
=3/4.

También se comprueba factorizando:

(x³−3x+2)/(x²−1)²
=(x−1)²(x+2)/[(x−1)²(x+1)²].`
      ),
    },

    "mates2-analisis-e5a6b844d4c9": {
      "Resultado": answer(
        "a=12/(4+π) m y b=6/(4+π) m",
        ["a=6/(4+π) y b=12/(4+π)", "a=6/π y b=3/π", "a=3 m y b=3/2 m"],
        `Llamamos a a la anchura de la ventana, que es también el diámetro de la semicircunferencia, y b a la altura de la parte rectangular.

El perímetro es

a+2b+πa/2=6.

Despejamos:

b=3−a/2−πa/4.

El área total es la del rectángulo más la del semicírculo de radio a/2:

S(a)=ab+1/2·π(a/2)²
    =3a−(4+π)a²/8.

Derivamos:

S′(a)=3−(4+π)a/4.

S′(a)=0 ⟹ a=12/(4+π).

Como S″(a)=−(4+π)/4<0, se trata de un máximo.

b=3−a/2−πa/4=6/(4+π).

Resultado:

a=12/(4+π) m,  b=6/(4+π) m.`
      ),
    },

    "mates2-analisis-f42d74b8ffc0": {
      "Resultado": answer(
        "Es continua y derivable en x=0; no está definida en x=−2",
        ["Es continua pero no derivable en x=0", "No es continua en x=0", "Es derivable en todo ℝ"],
        `La primera rama 4/(x+2) no está definida en x=−2. En el resto de su dominio es continua y derivable.

Estudiamos la unión x=0:

lim(x→0⁻)f(x)=4/(0+2)=2,

f(0)=2,

lim(x→0⁺)f(x)=0²−0+2=2.

La función es continua en x=0.

Derivamos por ramas:

f′(x)={ −4/(x+2)², si x<0
         2x−1, si x>0 }.

f′(0⁻)=−4/4=−1,
f′(0⁺)=−1.

Por tanto, también es derivable en x=0 y f′(0)=−1. Su única discontinuidad es x=−2, donde no está definida.`
      ),
    },

    "mates2-analisis-c399a6f884c1": {
      "Resultado": answer(
        "P(x)=x³/3−3x²−36x+126+270√5; máximo 360√5 y mínimo 180√5",
        ["P(x)=x³/3−3x²−36x; máximo 360√5", "P(x)=x³−6x²−36x+126; máximo 180√5", "No existe tal polinomio"],
        `Integramos la derivada:

P(x)=x³/3−3x²−36x+C.

Los puntos críticos satisfacen

P′(x)=x²−6x−36=0,

x=3−3√5,  x=3+3√5.

La recta de signos de P′ queda:

(+) antes de 3−3√5,
(−) entre las dos raíces,
(+) después de 3+3√5.

Por tanto, hay un máximo en x₁=3−3√5 y un mínimo en x₂=3+3√5.

Usando x²=6x+36 en los puntos críticos, la parte sin C vale −30x−36:

P(x₁)=90√5−126+C,
P(x₂)=−90√5−126+C.

Imponemos que el máximo sea el doble del mínimo:

90√5−126+C=2(−90√5−126+C).

De aquí:

C=126+270√5.

Así, el máximo vale 360√5 y el mínimo 180√5.`
      ),
    },

    "mates2-analisis-d6270598ad14": {
      "Resultado": answer(
        "El recinto está entre x=−1 y x=2 y su área es 9/2",
        ["El recinto está entre 0 y 2 y su área es 4", "El área es 9", "Las curvas no encierran ningún recinto"],
        `Buscamos los puntos de corte teniendo en cuenta el valor absoluto.

Para x≥−1, |x+1|=x+1:

−x²+2x+3=x+1
⟹ −x²+x+2=0
⟹ x=−1 o x=2.

Para x<−1, |x+1|=−x−1. La ecuación solo aporta x=−1 como punto de unión válido.

Los puntos de corte son (−1,0) y (2,3). Entre ellos, la parábola queda por encima de la recta y=x+1. La gráfica debe colorear exactamente esa zona.

Área=∫₋₁² [−x²+2x+3−(x+1)] dx
    =∫₋₁² (−x²+x+2) dx.

Aplicamos Barrow:

Área=[−x³/3+x²/2+2x]₋₁²
    =10/3−(−7/6)
    =9/2.

Resultado: 9/2 unidades cuadradas.`
      ),
    },
  });
})();
