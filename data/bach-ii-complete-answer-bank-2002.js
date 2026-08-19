(() => {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};

  const answer = (correctText, distractors, solution) => ({
    options: [correctText, ...distractors],
    correct: 0,
    solution: `Resolución:\n${solution}`,
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-a3610a941abe": {
      "Resultado": answer(
        "SCD si a≠1 y a≠−2; incompatible si a=1 o a=−2. Cramer se aplica si a≠1,−2",
        [
          "SCD para todo a",
          "SCI si a=1 o a=−2",
          "Cramer se aplica solamente si a=1 o a=−2",
        ],
        `La matriz de coeficientes es

A=((a,1,1),
   (1,a,1),
   (1,1,a)).

Calculamos su determinante:

det(A)=(a−1)²(a+2).

Si a≠1 y a≠−2, det(A)≠0. Por el teorema de Rouché-Frobenius,
rango(A)=rango(A*)=3, que coincide con el número de incógnitas. El sistema es compatible determinado.

Para a=1, las tres ecuaciones tienen el mismo primer miembro x+y+z, pero exigen simultáneamente que valga 0 y 1. El sistema es incompatible.

Para a=−2, las filas de A suman cero, pero los términos independientes suman 0+1+1=2≠0. El sistema también es incompatible.

La regla de Cramer puede aplicarse exactamente cuando det(A)≠0.

Resultado: SCD y resoluble por Cramer si a∉{1,−2}; incompatible si a∈{1,−2}.`
      ),
    },
    "mates2-algebra-6d5df708c707": {
      "Resultado": answer(
        "El primer determinante vale 15 y el segundo 25/3",
        [
          "El primero vale −15 y el segundo 25/3",
          "El primero vale 15 y el segundo 5/3",
          "Ambos determinantes valen 5",
        ],
        `Llamamos D al determinante dado, cuyo valor es D=5.

Primer determinante:
sus filas son F₂, F₃ y 3F₁. El cambio cíclico (F₁,F₂,F₃)→(F₂,F₃,F₁) equivale a dos intercambios de filas, por lo que no cambia el signo. Además, multiplicar una fila por 3 multiplica el determinante por 3:

D₁=3D=3·5=15.

Segundo determinante:
la primera fila es 5F₁; la segunda es F₂+2F₁, operación que no altera el determinante después de extraer el factor de la primera fila; y la tercera es (1/3)F₃. Por multilinealidad:

D₂=5·(1/3)·D
=5/3·5
=25/3.

Resultado: D₁=15 y D₂=25/3.`
      ),
    },
    "mates2-algebra-23451889bd3a": {
      "Resultado": answer(
        "X=((7/2,−6),(−10,9))",
        [
          "X=((7/2,−10),(−6,9))",
          "X=((1,−5),(−11,−2))",
          "X=((−7/2,6),(10,−9))",
        ],
        `Partimos de:

XA+2B+3C=D.

Despejamos la matriz X:

XA=D−2B−3C.

Calculamos:

D−2B−3C
=((1,−5),
  (−11,−2)).

Como A multiplica a X por la derecha, debemos multiplicar también por A⁻¹ por la derecha:

X=(D−2B−3C)A⁻¹.

Calculamos A⁻¹ mediante determinantes:

det(A)=2·2−2·1=2.

Adj(Aᵀ)=((2,−2),(−1,2)), por tanto:

A⁻¹=1/2·((2,−2),(−1,2))
=((1,−1),(−1/2,1)).

Finalmente:

X=((1,−5),(−11,−2))·((1,−1),(−1/2,1))
=((7/2,−6),
  (−10,9)).

Comprobación: al sustituir esta matriz en XA+2B+3C se obtiene D.

Resultado: X=((7/2,−6),(−10,9)).`
      ),
    },
    "mates2-algebra-94fc52735321": {
      "Resultado": answer(
        "k=9; (x,y,z)=(1−2t,1+t,t). Las dos primeras ternas sí son solución y la tercera no",
        [
          "k=7; (x,y,z)=(t,1−t,1)",
          "k=9 y el sistema es compatible determinado",
          "k=10; las tres ternas son soluciones",
        ],
        `La tercera fila de coeficientes es combinación lineal de las dos primeras:

F₃=2F₁+F₂,

pues:
2(1,1,1)+(2,3,1)=(4,5,3).

Para que el sistema sea compatible, el término independiente debe cumplir la misma combinación:

k=2·2+5=9.

Con k=9, rango(A)=rango(A*)=2<3; el sistema es compatible indeterminado.

Resolvemos las dos primeras ecuaciones. Tomamos z=t:

x+y=2−t,
2x+3y=5−t.

Restando dos veces la primera ecuación a la segunda:

y=1+t.

Entonces:

x=2−t−(1+t)=1−2t.

Solución general:

(x,y,z)=(1−2t,1+t,t), t∈ℝ.

Comprobamos las ternas:

• (1,1,0) corresponde a t=0: sí es solución.
• (−5,4,3) corresponde a t=3: sí es solución.
• (1,2,−1) no tiene la forma anterior: no es solución.

Resultado: k=9 y (x,y,z)=(1−2t,1+t,t).`
      ),
    },
    "mates2-algebra-807675c1ba34": {
      "a)": answer(
        "60",
        ["30", "−60", "120"],
        `El determinante pedido se obtiene transformando las columnas del determinante original:

C₁'=3C₁−C₂,
C₂'=6C₁+2C₂.

La matriz de esta transformación de columnas es:

T=((3,6),(−1,2)).

Su determinante vale:

det(T)=3·2−6(−1)=12.

Por la propiedad multiplicativa de los determinantes:

D'=det(T)·D
=12·5
=60.

Resultado: el determinante vale 60.`
      ),
      "b)": answer(
        "Se usan la linealidad por columnas y la multiplicación de una columna por un escalar",
        [
          "Solo se usa que det(A)=det(Aᵀ)",
          "Se usa exclusivamente el intercambio de filas",
          "Se usa que una matriz con dos filas iguales tiene determinante uno",
        ],
        `Las propiedades utilizadas son:

1. Linealidad respecto de cada columna:
el determinante de una suma en una columna se descompone como suma de determinantes.

2. Si una columna se multiplica por un número, el determinante queda multiplicado por ese mismo número.

3. Si en el desarrollo aparecen dos columnas proporcionales, el determinante correspondiente es cero.

Estas propiedades permiten pasar de las combinaciones 3C₁−C₂ y 6C₁+2C₂ al factor global 12.

Resultado: se han utilizado la multilinealidad por columnas y la propiedad de los factores escalares.`
      ),
    },
    "mates2-algebra-7bc3a2720ab0": {
      "a)": answer(
        "SCD si λ≠8; SCI si λ=8",
        [
          "SCD para todo λ",
          "Incompatible si λ=8",
          "SCI si λ≠8 y SCD si λ=8",
        ],
        `La matriz de coeficientes es:

A=((1,2,−1),
   (2,3,1),
   (5,λ,1)).

Calculamos:

det(A)=24−3λ=3(8−λ).

Si λ≠8, det(A)≠0 y el sistema es compatible determinado.

Si λ=8, la tercera fila cumple:

F₃=F₁+2F₂.

Los términos independientes verifican la misma relación:

6=2+2·2.

Así,
rango(A)=rango(A*)=2<3,

y el sistema es compatible indeterminado.

Resultado: SCD si λ≠8 y SCI si λ=8.`
      ),
      "b)": answer(
        "(x,y,z)=(−2−5t,2+3t,t), t∈ℝ",
        [
          "(x,y,z)=(2−5t,−2+3t,t)",
          "(x,y,z)=(−2,2,0) únicamente",
          "(x,y,z)=(t,t,t)",
        ],
        `Para λ=8, tomamos z=t y resolvemos las dos primeras ecuaciones:

x+2y−z=2,
2x+3y+z=2.

Sustituimos z=t:

x+2y=2+t,
2x+3y=2−t.

Restamos dos veces la primera ecuación a la segunda:

−y=−2−3t,

de donde:

y=2+3t.

Sustituimos en la primera:

x=2+t−2(2+3t)=−2−5t.

Resultado:

(x,y,z)=(−2−5t,2+3t,t), t∈ℝ.`
      ),
    },
    "mates2-algebra-855a5ceb1079": {
      "Resultado": answer(
        "x≈−8,4791; x≈−0,4312; x≈0,4103",
        [
          "x=−1,0,1",
          "x=−3,1/2,3",
          "La ecuación no tiene soluciones reales",
        ],
        `Desarrollamos el determinante por la primera fila:

D=(2x−1)[x(3x−2)−3x(2x+1)]
−3[(2x+1)(3x−2)−(2x+1)(2x−1)]
+(x−2)[3x(2x+1)−x(2x−1)].

Simplificamos:

D=−2x³−17x²+3.

La ecuación pedida es:

−2x³−17x²+3=0,

equivalentemente:

2x³+17x²−3=0.

Esta cúbica no tiene raíces racionales. Resolviéndola numéricamente obtenemos sus tres raíces reales:

x₁≈−8,479136,
x₂≈−0,431162,
x₃≈0,410298.

Resultado aproximado: x≈−8,4791; −0,4312; 0,4103.`
      ),
    },
    "mates2-algebra-bd31f462ebee": {
      "a)": answer(
        "X=((−5/3,−4/3),(4/3,−1/3))",
        [
          "X=((5/3,4/3),(−4/3,1/3))",
          "X=A−I",
          "X=((−1,0),(0,−1))",
        ],
        `Partimos de:

A²+AX=I.

Sacamos factor común A por la izquierda:

A(A+X)=I.

Como det(A)=3≠0, A tiene inversa. Multiplicamos ambos miembros por A⁻¹ por la izquierda:

A+X=A⁻¹,

por lo que:

X=A⁻¹−A.

Calculamos la inversa mediante determinantes:

det(A)=2·1−1(−1)=3,

Adj(Aᵀ)=((1,−1),(1,2)).

Entonces:

A⁻¹=1/3·((1,−1),(1,2)).

Restamos A:

X=((1/3,−1/3),(1/3,2/3))
 −((2,1),(−1,1))

=((−5/3,−4/3),
  (4/3,−1/3)).

Resultado: X=((−5/3,−4/3),(4/3,−1/3)).`
      ),
      "b)": answer(
        "Sí; det(X)=7/3≠0",
        ["No, porque det(X)=0", "No, porque X tiene fracciones", "Sí; det(X)=1"],
        `Calculamos el determinante de X:

det(X)=(−5/3)(−1/3)−(−4/3)(4/3)
=5/9+16/9
=21/9
=7/3.

Como det(X)=7/3≠0, la matriz X es invertible.

Su inversa podría calcularse mediante:

X⁻¹=Adj(Xᵀ)/det(X).

Resultado: sí existe X⁻¹ porque det(X)≠0.`
      ),
    },
    "mates2-geometria-f6e9a3e7ec1e": {
      "a)": answer(
        "r: (x,y,z)=(2,0,1)+t(1,−1,0)",
        [
          "r: (x,y,z)=(2,0,1)+t(1,1,0)",
          "r: (x,y,z)=(0,0,0)+t(1,−1,0)",
          "r: x−y+1=0",
        ],
        `El vector normal del plano es:

n⃗=(1,−1,0).

Una recta perpendicular al plano tiene como vector director un vector paralelo a n⃗. Como además pasa por A(2,0,1), su ecuación paramétrica es:

r: { x=2+t
     y=−t
     z=1 }.

Equivalentemente:

r: (x,y,z)=(2,0,1)+t(1,−1,0).

Resultado: r: (x,y,z)=(2,0,1)+t(1,−1,0).`
      ),
      "b)": answer(
        "B=(−1,3,1)",
        ["B=(1,−3,1)", "B=(1/2,3/2,1)", "B=(−1,−3,1)"],
        `La recta perpendicular obtenida es:

r: { x=2+t
     y=−t
     z=1 }.

Hallamos su intersección Q con el plano π sustituyendo:

(2+t)−(−t)+1=0
⇒ 3+2t=0
⇒ t=−3/2.

Por tanto:

Q=(1/2,3/2,1).

El punto Q es el punto medio de A y su simétrico B. Aplicamos, coordenada a coordenada:

(2+x_B)/2=1/2  ⇒ x_B=−1,
(0+y_B)/2=3/2  ⇒ y_B=3,
(1+z_B)/2=1    ⇒ z_B=1.

Resultado: B=(−1,3,1).`
      ),
    },
    "mates2-geometria-e46f62d8417a": {
      "Resultado": answer(
        "α: x−2z+3=0",
        ["α: 2x−y+z=0", "α: x+2z−5=0", "α: x−2z−3=0"],
        `La recta r tiene vector director:

d⃗=(2,3,1).

El plano π tiene vector normal:

n⃗π=(2,−1,1).

El plano α debe contener una dirección paralela a d⃗ y ser perpendicular a π. Por tanto, su vector normal n⃗α debe ser perpendicular tanto a d⃗ como a n⃗π:

n⃗α=d⃗×n⃗π
=(2,3,1)×(2,−1,1)
=(4,0,−8)
∼(1,0,−2).

La ecuación de α es:

x−2z+D=0.

Como pasa por A(1,0,2):

1−2·2+D=0
⇒ D=3.

Resultado: α: x−2z+3=0.`
      ),
    },
    "mates2-geometria-0421e782b16e": {
      "a)": answer(
        "r: (x,y,z)=(1,2,3)+t(0,1,−1)",
        [
          "r: (x,y,z)=(1,2,3)+t(1,0,−1)",
          "r: (x,y,z)=(1,3,2)+t(0,1,1)",
          "r: (x,y,z)=(0,0,0)+t(0,1,−1)",
        ],
        `Primero hallamos el plano que pasa por P(1,0,0), Q(0,1,1) y R(1,1,1).

PQ⃗=(−1,1,1),
PR⃗=(0,1,1).

Un vector normal es:

PQ⃗×PR⃗=(0,1,−1).

Por tanto:

π: y−z=0.

Reflejar un punto respecto de este plano intercambia sus coordenadas y y z. Así, el simétrico de A(1,2,3) es:

B=(1,3,2).

El punto medio de AB es:

M=((1+1)/2,(2+3)/2,(3+2)/2)
=(1,5/2,5/2).

La dirección AM⃗=(0,1/2,−1/2) es paralela a (0,1,−1). Por tanto:

r: (x,y,z)=(1,2,3)+t(0,1,−1).

Resultado: r: (x,y,z)=(1,2,3)+t(0,1,−1).`
      ),
      "b)": answer(
        "s: (x,y,z)=(2,2,2)+t(0,1,−1)",
        [
          "s: (x,y,z)=(2,2,2)+t(0,1,1)",
          "s: (x,y,z)=(1,2,3)+t(0,1,−1)",
          "s: (x,y,z)=(2,2,2)+t(1,0,−1)",
        ],
        `La recta s debe ser paralela a r, luego conserva su vector director:

d⃗=(0,1,−1).

Como pasa por C(2,2,2), escribimos:

s: { x=2
     y=2+t
     z=2−t }.

Equivalentemente:

s: (x,y,z)=(2,2,2)+t(0,1,−1).

Resultado: s: (x,y,z)=(2,2,2)+t(0,1,−1).`
      ),
    },
    "mates2-geometria-1a728cfda37c": {
      "a)": answer(
        "a=3 y b=−23",
        ["a=−3 y b=23", "a=4 y b=−12", "a=3 y b=23"],
        `La recta pasa por P(3,1,−3) y tiene vector director:

d⃗=(4,−4,1).

El vector normal del plano es:

n⃗=(a,2,−4).

Para que la recta sea paralela al plano:

d⃗·n⃗=0.

Entonces:

4a−8−4=0
⇒ 4a−12=0
⇒ a=3.

Además, para que r esté contenida en π, el punto P debe pertenecer al plano:

3·3+2·1−4(−3)+b=0
⇒ 9+2+12+b=0
⇒ b=−23.

Resultado: a=3 y b=−23.`
      ),
      "b)": answer(
        "No existe ningún valor de a y b",
        ["Sí: a=3 y b=−23", "Sí: a=−8 y b=0", "Sí, para cualquier a y b"],
        `Para que la recta fuera perpendicular al plano, su vector director debería ser paralelo al vector normal:

(4,−4,1)=k(a,2,−4).

De la segunda componente:

−4=2k
⇒ k=−2.

Pero la tercera componente exigiría:

1=−4k=8,

lo cual es imposible.

El valor de b no cambia el vector normal, por lo que tampoco puede corregir esta incompatibilidad.

Resultado: no existe ningún valor de a y b que haga r perpendicular a π.`
      ),
    },
    "mates2-geometria-492e3a1f4bb5": {
      "Resultado": answer(
        "x=23 o x=−17; el área de la cara es √146/2",
        [
          "x=23 únicamente; área √146",
          "x=3 o x=−3; área 146/2",
          "x=17 o x=−23; área √73",
        ],
        `El volumen del tetraedro determinado por u⃗, v⃗ y w⃗ es:

V=|[u⃗,v⃗,w⃗]|/6.

Calculamos el producto mixto:

[u⃗,v⃗,w⃗]
=det((3,−3,1),(2,1,2),(1,5,x))
=9x−27.

Como el volumen vale 30:

|9x−27|/6=30
⇒ |9x−27|=180
⇒ |x−3|=20.

Por tanto:

x=23 o x=−17.

El área de la cara triangular determinada por u⃗ y v⃗ es:

A=|u⃗×v⃗|/2.

u⃗×v⃗=(−7,−4,9),

|u⃗×v⃗|=√(49+16+81)=√146.

Resultado: x=23 o x=−17 y A=√146/2.`
      ),
    },
    "mates2-geometria-db86ba9ea208": {
      "Resultado": answer(
        "d(A',C)=√34",
        ["d(A',C)=34", "d(A',C)=√26", "d(A',C)=2√34"],
        `El plano es π: y−z=0. La simetría respecto de este plano intercambia las coordenadas y y z.

Por tanto, el simétrico de A(2,0,3) es:

A'=(2,3,0).

El punto medio C del segmento AB es:

C=((2−4)/2,(0+0)/2,(3+5)/2)
=(−1,0,4).

Calculamos la distancia:

d(A',C)
=√[(2−(−1))²+(3−0)²+(0−4)²]
=√(3²+3²+(−4)²)
=√(9+9+16)
=√34.

Resultado: d(A',C)=√34.`
      ),
    },
    "mates2-geometria-5a068cd1da11": {
      "a)": answer(
        "A=120°, B=30° y C=30°",
        ["A=90°, B=45° y C=45°", "A=60°, B=60° y C=60°", "A=30°, B=120° y C=30°"],
        `Calculamos los vectores desde A:

AB⃗=(3,−√30,−1),
AC⃗=(3,√30,−1).

Sus módulos son:

|AB⃗|=|AC⃗|=√(9+30+1)=√40.

Aplicamos el producto escalar:

AB⃗·AC⃗=9−30+1=−20.

Por tanto:

cos A=(AB⃗·AC⃗)/(|AB⃗|·|AC⃗|)
=−20/40
=−1/2.

Así, A=120°.

Como los otros dos ángulos son iguales y suman 60°:

B=C=30°.

Resultado: A=120°, B=30° y C=30°.`
      ),
      "b)": answer(
        "Sí; AB=AC=2√10",
        ["No, porque los tres lados son distintos", "Sí; AB=BC", "Sí; los tres lados son iguales"],
        `Calculamos las longitudes:

AB=√[(3−0)²+(−√30−0)²+(0−1)²]
=√40
=2√10.

AC=√[(3−0)²+(√30−0)²+(0−1)²]
=√40
=2√10.

Como AB=AC, el triángulo tiene dos lados iguales y es isósceles. Su base es BC.

Resultado: sí es isósceles porque AB=AC=2√10.`
      ),
    },
    "mates2-geometria-3a561d1cb40c": {
      "Resultado": answer(
        "6x+3y+2z−6=0",
        ["6x+3y+2z+6=0", "3x+6y+2z−6=0", "x+y+z−1=0"],
        `Calculamos cada simétrico usando que el centro de simetría es el punto medio:

A'=2B−A
=2(0,2,0)−(1,0,0)
=(−1,4,0).

B'=2C−B
=2(0,0,3)−(0,2,0)
=(0,−2,6).

C'=2A−C
=2(1,0,0)−(0,0,3)
=(2,0,−3).

Formamos dos vectores del plano:

A'B'⃗=(1,−6,6),
A'C'⃗=(3,−4,−3).

Un vector normal es:

A'B'⃗×A'C'⃗=(42,21,14)∼(6,3,2).

La ecuación del plano que pasa por A'(−1,4,0) es:

6(x+1)+3(y−4)+2z=0.

Simplificando:

6x+3y+2z−6=0.

Resultado: 6x+3y+2z−6=0.`
      ),
    },
    "mates2-analisis-6b178919b9bd": {
      "Resultado": answer(
        "b=−1/2 y c=1",
        ["b=1/2 y c=1", "b=−1 y c=0", "b=1 y c=−1/2"],
        `Para que f sea derivable en x=0, primero debe ser continua.

Por la izquierda y en el punto:

f(0)=c.

Por la derecha:

lim[x→0+] ln(1+x)/x=1.

Igualamos:

c=1.

Ahora estudiamos las derivadas laterales. En la primera rama:

f'(x)=2x+b,

por tanto:

f'(0−)=b.

En la segunda rama:

d/dx[ln(1+x)/x]
=[x/(1+x)−ln(1+x)]/x².

Su límite cuando x→0+ es −1/2. Por tanto:

f'(0+)=−1/2.

Igualamos las derivadas laterales:

b=−1/2.

Resultado: b=−1/2 y c=1.`
      ),
    },
    "mates2-analisis-1b9847af8936": {
      "Resultado": answer(
        "150 m por 75 m",
        ["125 m por 90 m", "225 m por 50 m", "112,5 m por 100 m"],
        `Sean x e y los lados del solar. Su área cumple:

xy=11250.

Tomamos las dos vallas interiores paralelas al lado y. La longitud total de valla es:

L=2x+4y.

Como x=11250/y:

L(y)=22500/y+4y, y>0.

Derivamos:

L'(y)=−22500/y²+4.

Buscamos el punto crítico:

−22500/y²+4=0
⇒ 4y²=22500
⇒ y²=5625
⇒ y=75.

Entonces:

x=11250/75=150.

Además:

L''(y)=45000/y³>0,

por lo que se trata de un mínimo.

Resultado: las dimensiones son 150 m por 75 m.`
      ),
    },
    "mates2-analisis-d09e28058129": {
      "Resultado": answer(
        "La tangente es y=2 y el área vale 27/4",
        [
          "La tangente es y=−2 y el área vale 27/4",
          "La tangente es y=2x y el área vale 9/2",
          "La tangente es y=2 y el área vale 9/4",
        ],
        `La curva es:

f(x)=x³−3x.

En x=−1:

f(−1)=−1+3=2.

Derivamos:

f'(x)=3x²−3,

y:

f'(−1)=0.

La recta tangente es horizontal y pasa por (−1,2):

y=2.

Hallamos los puntos de corte con la curva:

x³−3x=2
⇒ x³−3x−2=0
⇒ (x+1)²(x−2)=0.

Los límites del recinto son x=−1 y x=2. En ese intervalo la recta queda por encima de la curva:

A=∫[−1,2] [2−(x³−3x)] dx.

Aplicamos la regla de Barrow:

A=[2x−x⁴/4+3x²/2] desde −1 hasta 2
=6−(−3/4)
=27/4.

Resultado: tangente y=2 y área 27/4 unidades cuadradas.`
      ),
    },
    "mates2-analisis-e42ec83ee0fc": {
      "a)": answer(
        "Mínimo en (−√3,−2/(3√3)) y máximo en (√3,2/(3√3))",
        [
          "Máximo en x=−√3 y mínimo en x=√3",
          "Único máximo en x=0",
          "No tiene extremos relativos",
        ],
        `Escribimos:

f(x)=(x²−1)/x³, x≠0.

Derivamos en forma de fracción:

f'(x)=(3−x²)/x⁴.

Los puntos críticos cumplen:

3−x²=0
⇒ x=−√3 o x=√3.

Como x⁴>0, el signo de f' depende de 3−x²:

(−∞,−√3): f'<0 ↓
(−√3,0): f'>0 ↑
(0,√3): f'>0 ↑
(√3,∞): f'<0 ↓

Así, en x=−√3 hay un mínimo y en x=√3 un máximo.

Calculamos las ordenadas:

f(−√3)=−2/(3√3),
f(√3)=2/(3√3).

Resultado: mínimo en (−√3,−2/(3√3)) y máximo en (√3,2/(3√3)).`
      ),
      "b)": answer(
        "Asíntota vertical x=0 y asíntota horizontal y=0",
        [
          "Solo tiene la asíntota x=0",
          "Asíntota vertical x=1 y horizontal y=1",
          "Asíntota oblicua y=x",
        ],
        `El dominio excluye x=0.

Para estudiar la asíntota vertical:

lim[x→0] (x²−1)/x³

es infinito con signos opuestos a ambos lados. Por tanto:

x=0

es una asíntota vertical.

Para x→±∞:

lim[x→±∞] (x²−1)/x³
=lim[x→±∞] (1/x−1/x³)
=0.

Por tanto:

y=0

es una asíntota horizontal.

Resultado: x=0 es vertical e y=0 es horizontal.`
      ),
      "c)": answer(
        "Puntos de inflexión (−√6,−5/(6√6)) y (√6,5/(6√6))",
        [
          "Único punto de inflexión en x=0",
          "Puntos de inflexión en x=±√3",
          "No tiene puntos de inflexión",
        ],
        `Calculamos la segunda derivada:

f''(x)=2(x²−6)/x⁵.

Se anula cuando:

x²−6=0
⇒ x=−√6 o x=√6.

Estudiamos el signo de f'':

(−∞,−√6): f''<0,
(−√6,0): f''>0,
(0,√6): f''<0,
(√6,∞): f''>0.

La curvatura cambia en ambos puntos. Sus ordenadas son:

f(−√6)=−5/(6√6),
f(√6)=5/(6√6).

Resultado: los puntos de inflexión son (−√6,−5/(6√6)) y (√6,5/(6√6)).`
      ),
    },
    "mates2-analisis-c623519654b3": {
      "a)": answer(
        "Aumenta en (0,3/2), disminuye en (3/2,3) y es nula en t=0 y t=3",
        [
          "Aumenta durante las tres horas",
          "Disminuye en (0,3/2) y aumenta en (3/2,3)",
          "Es nula únicamente en t=3/2",
        ],
        `La función es:

f(t)=300t(3−t)=900t−300t², 0≤t≤3.

Derivamos:

f'(t)=900−600t.

Se anula en:

900−600t=0
⇒ t=3/2.

Tabla de signos:

(0,3/2): f'(t)>0 ↑,
(3/2,3): f'(t)<0 ↓.

Los ceros de f son:

300t(3−t)=0
⇒ t=0 o t=3.

Resultado: aumenta hasta t=3/2, después disminuye y es nula en t=0 y t=3.`
      ),
      "b)": answer(
        "A la hora y media; la capacidad máxima es 675",
        ["A las 3 horas; capacidad 900", "Al comenzar; capacidad 675", "A las 2 horas; capacidad 600"],
        `Del estudio de la derivada, f cambia de creciente a decreciente en:

t=3/2.

Por tanto, ahí alcanza su máximo.

Calculamos:

f(3/2)=300·(3/2)·(3−3/2)
=300·(3/2)·(3/2)
=675.

Resultado: el mejor momento es a la hora y media, con capacidad 675.`
      ),
      "c)": answer(
        "Parábola cóncava hacia abajo, con vértice (3/2,675) y cortes (0,0) y (3,0)",
        [
          "Recta creciente que pasa por (0,0)",
          "Parábola cóncava hacia arriba con vértice (3/2,0)",
          "Hipérbola con asíntota t=3",
        ],
        `La función:

f(t)=−300t²+900t

es una parábola cóncava hacia abajo porque el coeficiente de t² es negativo.

Sus cortes con el eje horizontal son:

(0,0) y (3,0).

El eje de simetría es:

t=−900/[2(−300)]=3/2.

El vértice es:

(3/2,675).

Con estos tres puntos se representa la gráfica en el intervalo [0,3].

Resultado: parábola descendente con vértice (3/2,675) y ceros 0 y 3.`
      ),
    },
    "mates2-analisis-913db90a9e4a": {
      "Resultado": answer(
        "(2/9)ln|x+2|+(7/9)ln|x−1|+1/[3(x−1)]+C",
        [
          "ln|x³−3x+2|+C",
          "(2/9)ln|x−2|+(7/9)ln|x+1|+C",
          "(7/9)ln|x+2|+(2/9)ln|x−1|−1/[3(x−1)]+C",
        ],
        `Factorizamos el denominador:

x³−3x+2=(x−1)²(x+2).

Descomponemos:

(x²−2)/[(x−1)²(x+2)]
=A/(x+2)+B/(x−1)+C/(x−1)².

Multiplicamos por el denominador:

x²−2=A(x−1)²+B(x+2)(x−1)+C(x+2).

Sustituimos:

x=−2: 2=9A ⇒ A=2/9.
x=1: −1=3C ⇒ C=−1/3.

Comparando el coeficiente de x²:

A+B=1
⇒ B=7/9.

Integramos término a término:

∫(x²−2)/(x³−3x+2) dx
=∫[(2/9)/(x+2)+(7/9)/(x−1)−(1/3)/(x−1)²] dx

=(2/9)ln|x+2|+(7/9)ln|x−1|+1/[3(x−1)]+C.

Resultado: (2/9)ln|x+2|+(7/9)ln|x−1|+1/[3(x−1)]+C.`
      ),
    },
    "mates2-analisis-371d8ddd0e43": {
      "a)": answer(
        "150 m junto a la tapia y 75 m en cada lado perpendicular",
        [
          "100 m por 100 m",
          "200 m junto a la tapia y 50 m de fondo",
          "75 m junto a la tapia y 150 m de fondo",
        ],
        `Sea x el lado paralelo a la tapia e y cada lado perpendicular.

Solo se cercan tres lados:

x+2y=300.

Despejamos:

x=300−2y.

El área es:

A(y)=xy=(300−2y)y
=300y−2y².

Derivamos:

A'(y)=300−4y.

Igualamos a cero:

300−4y=0
⇒ y=75.

Entonces:

x=300−2·75=150.

Como A''(y)=−4<0, el área es máxima.

Resultado: 150 m junto a la tapia y 75 m de fondo.`
      ),
      "b)": answer(
        "11250 m²",
        ["22500 m²", "7500 m²", "15000 m²"],
        `Usamos las dimensiones óptimas del apartado anterior:

x=150 m,
y=75 m.

Entonces:

A=x·y
=150·75
=11250 m².

Resultado: el área máxima es 11250 m².`
      ),
    },
    "mates2-analisis-c3697f3750bd": {
      "a)": answer(
        "Se cortan en (−2,0) y (1,3); el recinto queda entre x=−2 y x=1",
        [
          "Se cortan únicamente en (0,4)",
          "Se cortan en (−1,3) y (2,0)",
          "No se cortan",
        ],
        `Representamos:

y=−x²+4,

una parábola cóncava hacia abajo, con vértice (0,4) y cortes con OX en x=−2 y x=2.

La función:

y=|x+2|

es una V con vértice (−2,0).

En el tramo x≥−2:

|x+2|=x+2.

Buscamos los cortes:

−x²+4=x+2
⇒ x²+x−2=0
⇒ (x+2)(x−1)=0.

Así, x=−2 y x=1, que dan los puntos (−2,0) y (1,3).

El recinto cerrado está comprendido entre esos dos puntos, con la parábola por encima.`
      ),
      "b)": answer(
        "9/2 unidades cuadradas",
        ["27/4 unidades cuadradas", "3 unidades cuadradas", "9 unidades cuadradas"],
        `Según la gráfica, entre x=−2 y x=1 la función superior es −x²+4 y la inferior es x+2.

Por tanto:

A=∫[−2,1] [(−x²+4)−(x+2)] dx
=∫[−2,1] (−x²−x+2) dx.

Aplicamos la regla de Barrow:

A=[−x³/3−x²/2+2x] desde −2 hasta 1

=7/6−(−10/3)
=7/6+20/6
=27/6
=9/2.

Resultado: el área es 9/2 unidades cuadradas.`
      ),
    },
    "mates2-analisis-8c944e354b34": {
      "Resultado": answer(
        "(x³/3+x²+x)ln x−x³/9−x²/2−x+C",
        [
          "(x³/3+x²+x)ln x+C",
          "(x²+2x+1)/x+C",
          "x³ln x−x²/2+C",
        ],
        `Calculamos:

I=∫(x²+2x+1)ln x dx.

Aplicamos integración por partes:

u=ln x        ⇒ du=dx/x,
dv=(x²+2x+1)dx
⇒ v=x³/3+x²+x.

Entonces:

I=(x³/3+x²+x)ln x
−∫(x³/3+x²+x)/x dx.

Simplificamos la segunda integral:

I=(x³/3+x²+x)ln x
−∫(x²/3+x+1)dx.

Integramos:

I=(x³/3+x²+x)ln x
−x³/9−x²/2−x+C.

Resultado: (x³/3+x²+x)ln x−x³/9−x²/2−x+C.`
      ),
    },
    "mates2-analisis-ce1ce12754c4": {
      "Resultado": answer(
        "Triángulo equilátero de lado 5/3 m; área máxima 25√3/36 m²",
        [
          "Lados iguales de 2 m y base de 1 m",
          "Lados iguales de 3/2 m y base de 2 m",
          "Triángulo rectángulo de catetos 5/2 m",
        ],
        `Sea a la longitud de los dos lados iguales y b la base. El perímetro cumple:

2a+b=5
⇒ b=5−2a.

La altura del triángulo es:

h=√[a²−(b/2)²].

El área es:

A=(b·h)/2
=(b/4)√(4a²−b²).

Sustituyendo b=5−2a y derivando se obtiene el único punto crítico interior:

a=5/3.

Entonces:

b=5−2·(5/3)=5/3.

Los tres lados son iguales; el triángulo de área máxima es equilátero. Su área es:

A=(√3/4)(5/3)²
=25√3/36 m².

Resultado: lado 5/3 m y área máxima 25√3/36 m².`
      ),
    },
    "mates2-analisis-8a1b9f5fcc7d": {
      "Resultado": answer(
        "El límite vale −8/3",
        ["El límite vale 0", "El límite vale 8/3", "El límite vale −4/3"],
        `La regla de L’Hôpital establece que, si aparece una indeterminación 0/0 o ∞/∞ y se cumplen las hipótesis de derivabilidad, el límite del cociente puede calcularse como el límite del cociente de las derivadas.

Sustituimos x=0:

[2x cos(2x)−sen(2x)]/x³=0/0.

Primera aplicación:

lim[x→0] [2cos(2x)−4x sen(2x)−2cos(2x)]/(3x²)
=lim[x→0] [−4x sen(2x)]/(3x²),

que sigue siendo 0/0.

Segunda aplicación:

lim[x→0] [−4sen(2x)−8x cos(2x)]/(6x),

de nuevo 0/0.

Tercera aplicación:

lim[x→0] [−8cos(2x)−8cos(2x)+16x sen(2x)]/6.

Sustituimos x=0:

(−8−8+0)/6=−16/6=−8/3.

Resultado: el límite vale −8/3.`
      ),
    },
    "mates2-analisis-b21707190d9b": {
      "Resultado": answer(
        "a=−3/2, b=1/2 y c=−2",
        [
          "a=3/2, b=−1/2 y c=2",
          "a=−1, b=1 y c=−2",
          "a=1/2, b=−3/2 y c=0",
        ],
        `La condición f(0)=f(5) da:

f(0)=0,
f(5)=c+√(5−1)=c+2.

Por tanto:

c+2=0
⇒ c=−2.

Para que sea continua en x=2:

lim[x→2−]f(x)=f(2).

Así:

2a+4b=c+1=−1.

Para que sea derivable, igualamos las derivadas laterales. En la primera rama:

f'(x)=a+2bx
⇒ f'(2−)=a+4b.

En la segunda:

f'(x)=1/[2√(x−1)]
⇒ f'(2+)=1/2.

Obtenemos el sistema:

{ 2a+4b=−1
  a+4b=1/2 }.

Restando:

a=−3/2.

Sustituyendo:

−3/2+4b=1/2
⇒ 4b=2
⇒ b=1/2.

Resultado: a=−3/2, b=1/2 y c=−2.`
      ),
    },
    "mates2-analisis-fd3f6a2ab8d0": {
      "a)": answer(
        "Asíntota vertical x=0 y oblicua y=4x+3",
        [
          "Asíntota vertical x=4 y horizontal y=3",
          "Solo tiene la asíntota y=4x",
          "Asíntota horizontal y=0",
        ],
        `Dividimos:

f(x)=(4x²+3x+4)/x
=4x+3+4/x.

Cuando x→0, el término 4/x tiende a infinito, por lo que:

x=0

es una asíntota vertical.

Para hallar la oblicua:

f(x)−(4x+3)=4/x.

Como:

lim[x→±∞] 4/x=0,

la recta:

y=4x+3

es una asíntota oblicua.

Resultado: x=0 e y=4x+3.`
      ),
      "b)": answer(
        "Máximo local en (−1,−5) y mínimo local en (1,11)",
        [
          "Mínimo en (−1,−5) y máximo en (1,11)",
          "Único máximo en x=0",
          "No tiene extremos locales",
        ],
        `Derivamos:

f'(x)=4−4/x²
=4(x²−1)/x².

Se anula en:

x=−1 y x=1.

Como x²>0, estudiamos el signo de x²−1:

(−∞,−1): f'>0 ↑,
(−1,0): f'<0 ↓,
(0,1): f'<0 ↓,
(1,∞): f'>0 ↑.

Por tanto, x=−1 es un máximo local y x=1 un mínimo local.

Calculamos:

f(−1)=−4+3−4=−5,
f(1)=4+3+4=11.

Resultado: máximo (−1,−5) y mínimo (1,11).`
      ),
      "c)": answer(
        "Dos ramas separadas por x=0, acercándose a la oblicua y=4x+3; máximo (−1,−5) y mínimo (1,11)",
        [
          "Una parábola con vértice (0,3)",
          "Una recta sin extremos",
          "Una circunferencia de radio 4",
        ],
        `Para dibujar la gráfica usamos los resultados anteriores:

• Dominio: ℝ\\{0}.
• Asíntota vertical: x=0.
• Asíntota oblicua: y=4x+3.
• Máximo local: (−1,−5).
• Mínimo local: (1,11).

Además:

f(x)−(4x+3)=4/x.

Por tanto, para x>0 la gráfica queda por encima de la asíntota oblicua y para x<0 queda por debajo.

La rama izquierda crece hasta (−1,−5), después decrece hacia +∞ en valor absoluto al aproximarse a 0 por la izquierda. La rama derecha baja desde +∞ hasta (1,11) y luego crece.

Con estos elementos queda determinada la representación.`
      ),
    },
    "mates2-analisis-12409f718a3b": {
      "a)": answer(
        "x=(15−5√3)/2 cm",
        [
          "x=(15+5√3)/2 cm",
          "x=5 cm",
          "x=15/2 cm",
        ],
        `Si x es el lado de cada cuadrado recortado, las dimensiones de la caja son:

largo=30−2x,
ancho=15−2x,
alto=x.

El volumen es:

V(x)=x(30−2x)(15−2x),
0<x<15/2.

Desarrollamos:

V(x)=4x³−90x²+450x.

Derivamos:

V'(x)=12x²−180x+450
=6(2x²−30x+75).

Igualamos a cero:

2x²−30x+75=0.

Aplicamos la fórmula:

x=[30±√(900−600)]/4
=[30±10√3]/4
=(15±5√3)/2.

Solo el valor:

x=(15−5√3)/2

pertenece al intervalo físico (0,15/2) y produce el máximo.

Resultado: x=(15−5√3)/2 cm.`
      ),
      "b)": answer(
        "375√3 cm³",
        ["750√3 cm³", "375 cm³", "1125√3 cm³"],
        `Sustituimos:

x=(15−5√3)/2.

Entonces:

30−2x=15+5√3,
15−2x=5√3.

El volumen máximo es:

Vmax=[(15−5√3)/2](15+5√3)(5√3).

Sacamos factores:

Vmax=[5(3−√3)/2]·[5(3+√3)]·5√3.

Usamos:

(3−√3)(3+√3)=9−3=6.

Así:

Vmax=(125√3/2)·6
=375√3 cm³.

Resultado: 375√3 cm³.`
      ),
    },
    "mates2-analisis-31158ab4eca7": {
      "a)": answer(
        "La parábola tiene vértice (2,−1) y la recta pasa por (0,3) y (3,0); se cortan en x=0 y x=3",
        [
          "Se cortan únicamente en x=2",
          "La parábola tiene vértice (0,3)",
          "La recta es y=x−3",
        ],
        `La parábola es:

y=x²−4x+3=(x−2)²−1.

Por tanto, su vértice es (2,−1), su eje es x=2 y corta al eje OX en:

x²−4x+3=0
⇒ (x−1)(x−3)=0,

es decir, en (1,0) y (3,0).

La recta:

y=−x+3

pasa por (0,3) y (3,0).

Calculamos los cortes entre ambas:

x²−4x+3=−x+3
⇒ x²−3x=0
⇒ x=0 o x=3.

Los puntos de corte son (0,3) y (3,0).`
      ),
      "b)": answer(
        "El recinto está entre x=0 y x=3, con la recta por encima de la parábola",
        [
          "El recinto está entre x=−3 y x=0",
          "La parábola queda por encima en todo el recinto",
          "No existe ningún recinto cerrado",
        ],
        `Según los puntos de corte, el recinto cerrado está limitado por:

x=0 y x=3.

Probamos un punto interior, por ejemplo x=1:

recta: y=−1+3=2,
parábola: y=1−4+3=0.

Por tanto, la recta es la función superior y la parábola la inferior entre x=0 y x=3.

La región que debe sombrearse es exactamente la comprendida entre ambas gráficas en ese intervalo.`
      ),
      "c)": answer(
        "9/2 unidades cuadradas",
        ["9 unidades cuadradas", "27/4 unidades cuadradas", "3/2 unidades cuadradas"],
        `De la representación:

A=∫[0,3] [recta−parábola] dx.

Sustituimos:

A=∫[0,3] [−x+3−(x²−4x+3)] dx
=∫[0,3] (−x²+3x) dx.

Aplicamos la regla de Barrow:

A=[−x³/3+3x²/2] desde 0 hasta 3

=−27/3+27/2
=−9+27/2
=9/2.

Resultado: el área es 9/2 unidades cuadradas.`
      ),
    },
    "mates2-analisis-43f8040e3890": {
      "a)": answer(
        "Es continua en todo ℝ",
        ["Es continua en ℝ\\{0}", "Solo es continua en (−∞,0)", "Es discontinua en x=±√2"],
        `Cada rama es continua en su intervalo. Solo debemos estudiar x=0.

Límite por la izquierda:

lim[x→0−] 4/(x²+2)=4/2=2.

Valor en el punto:

f(0)=4/(0²+2)=2.

Límite por la derecha:

lim[x→0+] (x²−4x+2)=2.

Como:

lim[x→0−]f(x)=f(0)=lim[x→0+]f(x)=2,

la función es continua en x=0.

Resultado: f es continua en todo ℝ.`
      ),
      "b)": answer(
        "Es derivable en (−∞,0)∪(0,∞), pero no en x=0",
        [
          "Es derivable en todo ℝ",
          "Solo es derivable en x=0",
          "No es derivable en ningún punto",
        ],
        `Derivamos cada rama:

Para x<0:

f'(x)=−8x/(x²+2)².

Para x>0:

f'(x)=2x−4.

Calculamos las derivadas laterales en x=0:

f'(0−)=lim[x→0−] −8x/(x²+2)²=0,

f'(0+)=lim[x→0+] (2x−4)=−4.

Como no coinciden:

f'(0−)≠f'(0+),

la función no es derivable en x=0.

Resultado: es derivable en (−∞,0)∪(0,∞) y no lo es en 0.`
      ),
    },
  });
})();
