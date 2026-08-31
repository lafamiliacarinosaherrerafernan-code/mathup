// Respuestas verificadas de los ejercicios oficiales de 2024.
(() => {
  "use strict";
  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-c1d9825fad41": {
      "a)": {
        options: [
          "Si a≠2,5: SCD; si a=2: SI; si a=5: SCI.",
          "Si a≠2,5: SCI; si a=2 o 5: SCD.",
          "SCD para todo a∈ℝ.",
          "Si a=2: SCI; si a=5: SI."
        ],
        correct: 0,
        solution: `Resolución mediante Rouché-Frobenius:
1. La matriz de coeficientes es A=[[a,2,1],[2,a,1],[5,2,1]].
2. Calculamos su determinante:
det(A)=a²-7a+10=(a-2)(a-5).
3. Si a≠2,5, det(A)≠0; rango(A)=rango(A*)=3=n. El sistema es compatible determinado.
4. Si a=2, las dos primeras filas de A son iguales, pero sus términos independientes son 1 y 2. Entonces rango(A)=2<rango(A*)=3: sistema incompatible.
5. Si a=5, la primera y la tercera ecuación coinciden y las otras dos son independientes. Entonces rango(A)=rango(A*)=2<3: sistema compatible indeterminado, con infinitas soluciones.
Resultado final: a≠2,5 SCD; a=2 SI; a=5 SCI.`
      },
      "b)": {
        options: ["(x,y,z)=(0,0,1).", "(1,0,0).", "(0,1,0).", "(1,1,-2)."],
        correct: 0,
        solution: `Resolución para a=1:
1. El sistema queda {x+2y+z=1, 2x+y+z=1, 5x+2y+z=1}.
2. Restamos la primera ecuación a la segunda: x-y=0.
3. Restamos la primera ecuación a la tercera: 4x=0, luego x=0.
4. De x-y=0 obtenemos y=0.
5. En la primera ecuación: z=1.
6. La sustitución en las tres ecuaciones verifica la solución.
Resultado final: (x,y,z)=(0,0,1).`
      }
    },
    "mates2-algebra-c1d9825fad41--mates-ii-algebra-2": {
      Resultado: {
        options: [
          "rango(A)=3 para todo a∈ℝ.",
          "rango(A)=2 para todo a∈ℝ.",
          "rango(A)=3 si a≠0 y 2 si a=0.",
          "rango(A)=4 para todo a∈ℝ."
        ],
        correct: 0,
        solution: `Resolución:
1. A tiene 3 filas, luego su rango no puede superar 3.
2. Tomamos el menor de orden 3 formado por las columnas 1, 2 y 4:
D=|1 0 0; 2 0 1; a 1 1|.
3. Desarrollando por la primera fila:
D=|0 1;1 1|=-1≠0.
4. Existe un menor de orden 3 no nulo para cualquier a.
Resultado final: rango(A)=3 para todo a∈ℝ.`
      }
    },
    "mates2-algebra-c1d9825fad41--mates-ii-algebra-3": {
      Resultado: {
        options: ["Sí, únicamente a=0.", "Sí, a=±1.", "No existe.", "Sí, para todo a."],
        correct: 0,
        solution: `Resolución:
1. A=A⁻¹ equivale a A²=I.
2. Para A=[[a,1],[1,0]]:
A²=[[a²+1,a],[a,1]].
3. Igualamos con I=[[1,0],[0,1]].
4. Las entradas no diagonales exigen a=0; además, a²+1=1 también da a=0.
5. Para a=0, det(A)=-1≠0 y A²=I.
Resultado final: únicamente a=0.`
      }
    },
    "mates2-algebra-7ced403695df": {
      "a)": {
        options: [
          "{x+y+z=157, x+2y+3z=278, x-kz=0}.",
          "{x+y+z=278, x+2y+3z=157, x+kz=0}.",
          "{x+2y+3z=157, x+y+z=278, y-kz=0}.",
          "{x+y+z=157, 3x+2y+z=278, z-kx=0}."
        ],
        correct: 0,
        solution: `Resolución:
1. Sean x, y, z los helados de una, dos y tres bolas.
2. Número total: x+y+z=157.
3. Ingresos: 1x+2y+3z=278.
4. “Los de una bola son k veces los de tres”: x=kz, es decir, x-kz=0.
Resultado final: {x+y+z=157, x+2y+3z=278, x-kz=0}.`
      },
      "b)": {
        options: [
          "Hay solución única si k≠1; en esos casos no pueden venderse los mismos de una y tres bolas.",
          "Hay solución única para todo k>0; con k=1 son iguales.",
          "Hay solución única solo si k=1.",
          "No hay solución única para ningún k."
        ],
        correct: 0,
        solution: `Resolución mediante Rouché-Frobenius:
1. La matriz de coeficientes es [[1,1,1],[1,2,3],[1,0,-k]].
2. Su determinante es 1-k.
3. Si k≠1, el determinante es no nulo y el sistema tiene solución única.
4. Tener el mismo número de helados de una y tres bolas exige x=z. Como x=kz y las cantidades no son ambas nulas, esto obliga a k=1.
5. Pero k=1 queda fuera de los casos con solución única. Además, con x=z las dos primeras ecuaciones producirían 2x+y=157 y 2x+y=139, contradicción.
Resultado final: solución única para k≠1 y nunca x=z en esos casos.`
      }
    },
    "mates2-algebra-7ced403695df--mates-ii-algebra-2": {
      Resultado: {
        options: [
          "det(A)=a, det(A²)=a² y det(Aⁿ)=aⁿ.",
          "det(A)=1, det(A²)=2a y det(Aⁿ)=na.",
          "det(A)=a-2 y det(Aⁿ)=(a-2)ⁿ.",
          "det(A)=a² y det(Aⁿ)=a²ⁿ."
        ],
        correct: 0,
        solution: `Resolución:
1. A=[[a,2],[0,1]], por lo que det(A)=a·1-2·0=a.
2. Por la propiedad det(A·B)=det(A)det(B):
det(A²)=det(A)²=a².
3. Aplicando la propiedad sucesivamente:
det(Aⁿ)=det(A)ⁿ=aⁿ.
Resultado final: det(A)=a, det(A²)=a² y det(Aⁿ)=aⁿ.`
      }
    },
    "mates2-algebra-7ced403695df--mates-ii-algebra-3": {
      Resultado: {
        options: ["2.", "1.", "0.", "-2."],
        correct: 0,
        solution: `Resolución:
1. Denotamos por F₁,F₂,F₃ las filas del determinante original, cuyo valor es 1.
2. El nuevo determinante es det(F₁+F₂,2F₂,F₃).
3. Sacamos el factor 2 de la segunda fila:
2·det(F₁+F₂,F₂,F₃).
4. Por linealidad en la primera fila:
2[det(F₁,F₂,F₃)+det(F₂,F₂,F₃)].
5. El segundo determinante es 0 porque repite dos filas.
Resultado final: 2·(1+0)=2.`
      }
    },
    "mates2-analisis-b9089fbde648": {
      "a)": {
        options: ["S(x)=2x²+4/x, x>0.", "S(x)=x²+4/x.", "S(x)=2x²+4x.", "S(x)=x²+2/x²."],
        correct: 0,
        solution: `Resolución:
1. El volumen es x²y=1, luego y=1/x², con x>0.
2. Las dos bases aportan 2x².
3. Las cuatro caras laterales aportan 4xy.
4. Sustituimos y: S(x)=2x²+4x(1/x²)=2x²+4/x.
Resultado final: S(x)=2x²+4/x.`
      },
      "b)": {
        options: ["x=1 dm, y=1 dm.", "x=∛2 dm, y=1/∛4 dm.", "x=2 dm, y=1/4 dm.", "x=1/2 dm, y=4 dm."],
        correct: 0,
        solution: `Resolución:
1. S(x)=2x²+4/x.
2. S'(x)=4x-4/x².
3. S'(x)=0 ⇒4x³-4=0 ⇒x³=1 ⇒x=1, pues x>0.
4. y=1/x²=1.
5. S''(x)=4+8/x³; S''(1)=12>0, luego es un mínimo.
Resultado final: x=1 dm e y=1 dm.`
      },
      "c)": {
        options: ["Superficie 6 dm² y coste 30 €.", "Superficie 4 dm² y coste 20 €.", "Superficie 8 dm² y coste 40 €.", "Superficie 6 dm² y coste 11 €."],
        correct: 0,
        solution: `Resolución:
1. Con x=y=1:
S=2·1²+4·1·1=6 dm².
2. El material cuesta 5 €/dm²:
Coste=6·5=30 €.
Resultado final: superficie 6 dm² y coste 30 €.`
      }
    },
    "mates2-analisis-b9089fbde648--mates-ii-analisis-2": {
      Resultado: {
        options: ["+∞.", "0.", "1.", "No existe."],
        correct: 0,
        solution: `Resolución mediante la regla de L'Hôpital:
1. Al sustituir x→+∞ aparece la indeterminación ∞/∞.
2. Aplicamos L'Hôpital:
lim (eˣ-1)/(x²+3)=lim eˣ/(2x).
3. Sigue siendo ∞/∞; aplicamos L'Hôpital de nuevo:
lim eˣ/2=+∞.
Resultado final: +∞.`
      }
    },
    "mates2-analisis-b9089fbde648--mates-ii-analisis-3": {
      Resultado: {
        options: [
          "x/2-(3/4)ln|2x+3|+C.",
          "x/2+(3/4)ln|2x+3|+C.",
          "x²/(2x+3)+C.",
          "(1/2)ln|2x+3|+C."
        ],
        correct: 0,
        solution: `Resolución:
1. Hacemos t=2x+3; entonces x=(t-3)/2 y dx=dt/2.
2. Sustituimos:
∫x/(2x+3) dx
=(1/4)∫(t-3)/t dt
=(1/4)∫(1-3/t)dt.
3. Integramos:
t/4-(3/4)ln|t|+C.
4. Volvemos a x y absorbemos la constante 3/4:
x/2-(3/4)ln|2x+3|+C.
Resultado final: x/2-(3/4)ln|2x+3|+C.`
      }
    },
    "mates2-analisis-b9089fbde648--mates-ii-analisis-4": {
      Resultado: {
        options: ["a=-3, b=0, c=4; el extremo es un mínimo.", "a=3, b=0, c=-2.", "a=-3, b=4, c=0.", "a=-6, b=12, c=-5."],
        correct: 0,
        solution: `Resolución:
1. f'(x)=3x²+2ax+b y f''(x)=6x+2a.
2. Inflexión en x=1:
f''(1)=0 ⇒6+2a=0 ⇒a=-3.
3. Extremo en x=2:
f'(2)=0 ⇒12+4a+b=0 ⇒b=0.
4. El punto (1,2) pertenece a la gráfica:
f(1)=1+a+b+c=2 ⇒c=4.
5. f''(2)=12+2a=6>0, luego el extremo es un mínimo.
Resultado final: a=-3, b=0, c=4.`
      }
    },
    "mates2-analisis-2b55c136fb82": {
      "a)": {
        options: [
          "Discontinuidad de salto finito en x=3: límite izquierdo 16 y derecho -6=f(3).",
          "Es continua en todo ℝ.",
          "Discontinuidad infinita en x=3.",
          "Discontinuidad evitable en x=3."
        ],
        correct: 0,
        solution: `Resolución:
1. Cada rama es continua en su intervalo; solo estudiamos x=3.
2. Límite por la izquierda:
lim f(x)=3²+2·3+1=16.
3. Límite por la derecha:
lim 2x/(x-4)=6/(-1)=-6.
4. f(3) pertenece a la segunda rama y vale -6.
5. Los límites laterales son finitos pero distintos.
Resultado final: discontinuidad de salto finito en x=3.`
      },
      "b)": {
        options: ["y=6x-3.", "y=6x+3.", "y=4x+1.", "y=2x+5."],
        correct: 0,
        solution: `Resolución:
1. Como 2<3, usamos f(x)=x²+2x+1.
2. f(2)=4+4+1=9.
3. f'(x)=2x+2, luego f'(2)=6.
4. Ecuación punto-pendiente:
y-9=6(x-2).
5. Despejamos: y=6x-3.
Resultado final: y=6x-3.`
      }
    },
    "mates2-analisis-2b55c136fb82--mates-ii-analisis-2": {
      Resultado: {
        options: ["2x-2 arctan(x)+C.", "2 arctan(x)+C.", "x²-ln(x²+1)+C.", "2x+2 arctan(x)+C."],
        correct: 0,
        solution: `Resolución:
1. Reescribimos el numerador:
2x²=2(x²+1)-2.
2. Entonces:
2x²/(x²+1)=2-2/(x²+1).
3. Integramos término a término:
∫2 dx-2∫dx/(x²+1)
=2x-2 arctan(x)+C.
Resultado final: 2x-2 arctan(x)+C.`
      }
    },
    "mates2-analisis-2b55c136fb82--mates-ii-analisis-3": {
      Resultado: {
        options: ["19π/3 unidades cúbicas.", "5π/2 unidades cúbicas.", "19/3 unidades cúbicas.", "25π/3 unidades cúbicas."],
        correct: 0,
        solution: `Resolución:
1. Al girar y=x alrededor del eje X usamos discos de radio x.
2. V=π∫₂³[f(x)]²dx=π∫₂³x²dx.
3. Aplicamos Barrow:
V=π[x³/3]₂³
=π(27/3-8/3)
=19π/3.
Resultado final: 19π/3 unidades cúbicas.`
      }
    },
    "mates2-analisis-2b55c136fb82--mates-ii-analisis-4": {
      Resultado: {
        options: ["-5/2.", "5/2.", "0.", "No existe."],
        correct: 0,
        solution: `Resolución:
1. Al sustituir x=-2 aparece 0/0, por lo que aplicamos L'Hôpital:
lim (3x²+4x+1)/(2x+2).
2. Sustituimos x=-2:
(12-8+1)/(-4+2)=5/(-2)=-5/2.
3. Equivalentemente, el cociente se simplifica como (x²+1)/x tras factorizar x+2.
Resultado final: -5/2.`
      }
    },
    "mates2-geometria-0dc1b39ffa6c": {
      "a)": {
        options: [
          "r:(x,y,z)=(2,-1,3)+t(-4,5,2).",
          "r:(x,y,z)=(-2,4,5)+t(4,5,2).",
          "r:(x,y,z)=(2,-1,3)+t(-2,4,5).",
          "r:(x,y,z)=(0,0,0)+t(-4,5,2)."
        ],
        correct: 0,
        solution: `Resolución:
1. A=(2,-1,3) y B=(-2,4,5).
2. Un vector director es AB=B-A=(-4,5,2).
3. La forma paramétrica de la recta que pasa por A es:
{x=2-4t, y=-1+5t, z=3+2t}, t∈ℝ.
Resultado final: r:(x,y,z)=(2,-1,3)+t(-4,5,2).`
      },
      "b)": {
        options: ["3√5 unidades.", "√29 unidades.", "9 unidades.", "5√3 unidades."],
        correct: 0,
        solution: `Resolución:
1. La longitud es el módulo de AB=(-4,5,2).
2. |AB|=√[(-4)²+5²+2²]=√(16+25+4)=√45.
3. Simplificamos: √45=3√5.
Resultado final: 3√5 unidades.`
      },
      "c)": {
        options: ["9 unidades cuadradas.", "18 unidades cuadradas.", "6√2 unidades cuadradas.", "9√2 unidades cuadradas."],
        correct: 0,
        solution: `Resolución:
1. AB=(-4,5,2) y AC=C-A=(-2,1,-2).
2. Calculamos el producto vectorial:
AB×AC=(-12,-12,6).
3. Su módulo es √(144+144+36)=18.
4. El área del triángulo es la mitad del área del paralelogramo:
Área=(1/2)|AB×AC|=18/2=9.
Resultado final: 9 unidades cuadradas.`
      }
    },
    "mates2-geometria-0dc1b39ffa6c--mates-ii-geometria-2": {
      Resultado: {
        options: ["a=(8+√70)/6.", "a=(8-√70)/6.", "a=1/2.", "a=4/3."],
        correct: 0,
        solution: `Resolución:
1. u=(1,a,a), v=(-1,0,2) y cos60°=1/2.
2. u·v=-1+2a; |u|=√(1+2a²) y |v|=√5.
3. Aplicamos la fórmula:
(-1+2a)/(√(1+2a²)√5)=1/2.
4. Como el coseno es positivo, debe ser -1+2a>0.
5. Elevamos al cuadrado:
4(-1+2a)²=5(1+2a²)
⇒6a²-16a-1=0.
6. a=(8±√70)/6. La raíz con signo menos no cumple -1+2a>0 y es una solución extraña introducida al elevar al cuadrado.
Resultado final: a=(8+√70)/6.`
      }
    },
    "mates2-geometria-0dc1b39ffa6c--mates-ii-geometria-3": {
      Resultado: {
        options: [
          "r:(x,y,z)=(1,0,0)+t(0,1,-2).",
          "r:(x,y,z)=(1,0,0)+t(1,2,1).",
          "r:(x,y,z)=(1,0,0)+t(1,0,0).",
          "r:(x,y,z)=(0,1,-2)+t(1,0,0)."
        ],
        correct: 0,
        solution: `Resolución:
1. La recta debe ser perpendicular a u=(1,2,1) y v=(1,0,0).
2. Tomamos como director su producto vectorial:
u×v=(0,1,-2).
3. Se comprueba que (0,1,-2)·u=0 y (0,1,-2)·v=0.
4. La recta pasa por A=(1,0,0):
{x=1, y=t, z=-2t}.
Resultado final: r:(x,y,z)=(1,0,0)+t(0,1,-2).`
      }
    },
    "mates2-geometria-54fcfade2ed3": {
      "a)": {
        options: ["π:x+3y+z-6=0.", "π:2x-y+z-4=0.", "π:x-3y+z=0.", "π:x+3y-z-4=0."],
        correct: 0,
        solution: `Resolución:
1. La barra es la intersección de los planos de normales n₁=(2,-1,1) y n₂=(1,0,-1).
2. Su vector director es n₁×n₂=(1,3,1).
3. Como el toldo es perpendicular a la barra, ese vector es normal al plano.
4. El plano pasa por A=(2,1,1):
1(x-2)+3(y-1)+1(z-1)=0.
5. Simplificamos: x+3y+z-6=0.
Resultado final: π:x+3y+z-6=0.`
      },
      "b)": {
        options: ["9/√11 unidades.", "9/11 unidades.", "3/√11 unidades.", "√11 unidades."],
        correct: 0,
        solution: `Resolución:
1. π:x+3y+z-6=0 y F=(2,-2,1).
2. Aplicamos la distancia de un punto a un plano:
d(F,π)=|2+3(-2)+1-6|/√(1²+3²+1²).
3. El numerador es |-9|=9 y el denominador √11.
Resultado final: d(F,π)=9/√11=9√11/11 unidades.`
      }
    },
    "mates2-geometria-54fcfade2ed3--mates-ii-geometria-2": {
      Resultado: {
        options: [
          "No tienen punto común; se cortan dos a dos en tres rectas paralelas.",
          "Se cortan en una única recta.",
          "Se cortan en un único punto.",
          "Son tres planos paralelos."
        ],
        correct: 0,
        solution: `Resolución:
1. El sistema de los tres planos es:
{x+y=1, x+y+z=2, z=0}.
2. De la primera y z=0 se obtiene x+y+z=1, que contradice la segunda ecuación.
3. Por tanto, los tres planos no tienen ningún punto común.
4. Cada pareja sí se corta:
π₁∩π₂: z=1, x+y=1;
π₁∩π₃: z=0, x+y=1;
π₂∩π₃: z=0, x+y=2.
5. Las tres rectas tienen dirección (1,-1,0), luego son paralelas.
Resultado final: no hay intersección común y se cortan dos a dos en rectas paralelas.`
      }
    },
    "mates2-geometria-54fcfade2ed3--mates-ii-geometria-3": {
      Resultado: {
        options: [
          "r:(x,y,z)=(0,1,0)+t(1,1,-2).",
          "r:(x,y,z)=(0,1,0)+t(1,1,2).",
          "r:(x,y,z)=(1,1,0)+t(0,1,-2).",
          "r:(x,y,z)=(0,1,0)+t(1,-1,-2)."
        ],
        correct: 0,
        solution: `Resolución:
1. De la forma continua (x-1)/1=(y-1)/1=z/(-2) leemos el vector director (1,1,-2).
2. Una recta paralela conserva ese vector.
3. La nueva recta debe pasar por A=(0,1,0):
{x=t, y=1+t, z=-2t}.
Resultado final: r:(x,y,z)=(0,1,0)+t(1,1,-2).`
      }
    },
    "mates2-probabilidad-estadistica-ee50d81ca74d": {
      "b.1)": {
        options: ["P(B̄)=0,8 y P(A∩B̄)=0,1.", "P(B̄)=0,2 y P(A∩B̄)=0,3.", "P(B̄)=0,7 y P(A∩B̄)=0,2.", "P(B̄)=0,9 y P(A∩B̄)=0,1."],
        correct: 0,
        solution: `Resolución:
1. P(A∪B)=P(A)+P(B)-P(A∩B).
2. 0,3=0,2+P(B)-0,1 ⇒P(B)=0,2.
3. P(B̄)=1-P(B)=0,8.
4. A=(A∩B)∪(A∩B̄), con unión disjunta:
P(A∩B̄)=0,2-0,1=0,1.
Resultado final: P(B̄)=0,8 y P(A∩B̄)=0,1.`
      },
      "b.2)": {
        options: ["P(A|B)=P(B|A)=0,5.", "Ambas valen 0,2.", "P(A|B)=0,1 y P(B|A)=0,5.", "Ambas valen 1."],
        correct: 0,
        solution: `Resolución:
1. P(A|B)=P(A∩B)/P(B)=0,1/0,2=0,5.
2. P(B|A)=P(A∩B)/P(A)=0,1/0,2=0,5.
Resultado final: P(A|B)=P(B|A)=0,5.`
      }
    },
    "mates2-probabilidad-estadistica-ee50d81ca74d--mates-ii-probabilidad-estadistica-2": {
      "a.1)": {
        options: ["0,219.", "0,201.", "0,300.", "0,126."],
        correct: 0,
        solution: `Resolución:
1. P(T)=0,60, P(N)=0,25 y P(G)=0,15.
2. Por la probabilidad total:
P(Premio)=0,60·0,21+0,25·0,30+0,15·0,12.
3. P(Premio)=0,126+0,075+0,018=0,219.
Resultado final: 0,219.`
      },
      "a.2)": {
        options: ["25/73≈0,3425.", "0,25.", "15/73≈0,2055.", "30/73≈0,4110."],
        correct: 0,
        solution: `Resolución:
1. P(N∩Premio)=0,25·0,30=0,075.
2. Del apartado anterior, P(Premio)=0,219.
3. Aplicamos Bayes:
P(N|Premio)=0,075/0,219=75/219=25/73≈0,3425.
Resultado final: 25/73≈0,3425.`
      },
      "b.1)": {
        options: ["0,1056.", "0,8944.", "0,1587.", "0,0668."],
        correct: 0,
        solution: `Resolución:
1. X~N(60,8). Tipificamos dentro de la probabilidad:
P(X<50)=P(Z<(50-60)/8)=P(Z<-1,25).
2. Por simetría:
P(Z<-1,25)=1-P(Z<1,25).
3. En la tabla P(Z<1,25)=0,8944.
4. P(X<50)=1-0,8944=0,1056.
Resultado final: 0,1056.`
      },
      "b.2)": {
        options: ["0,6678.", "0,7734.", "0,8944.", "0,5622."],
        correct: 0,
        solution: `Resolución:
1. Tipificamos dentro de la probabilidad:
P(50<X<66)=P((50-60)/8<Z<(66-60)/8)
=P(-1,25<Z<0,75).
2. P(Z<0,75)=0,7734.
3. P(Z<-1,25)=1-P(Z<1,25)=1-0,8944=0,1056.
4. Restamos: 0,7734-0,1056=0,6678.
Resultado final: 0,6678.`
      }
    },
    "mates2-probabilidad-estadistica-740af0916fb4": {
      "b.1)": {
        options: ["11/156≈0,0705.", "11/40=0,275.", "7/40=0,175.", "121/1600≈0,0756."],
        correct: 0,
        solution: `Resolución:
1. Tienen punto verde las 4 cartas solo verdes y las 7 de ambos colores: 11 cartas.
2. Sin reemplazamiento:
P=11/40·10/39=110/1560=11/156.
Resultado final: 11/156≈0,0705.`
      },
      "b.2)": {
        options: ["7/11≈0,6364.", "7/40=0,175.", "11/40=0,275.", "4/11≈0,3636."],
        correct: 0,
        solution: `Resolución:
1. Condicionamos a que la carta tiene punto verde: hay 11 casos posibles.
2. De esas 11 cartas, 7 tienen también punto rojo.
3. P(Rojo|Verde)=7/11.
Resultado final: 7/11≈0,6364.`
      }
    },
    "mates2-probabilidad-estadistica-740af0916fb4--mates-ii-probabilidad-estadistica-2": {
      "a.1)": {
        options: ["7/15≈0,4667.", "1/2.", "2/5=0,4.", "8/15≈0,5333."],
        correct: 0,
        solution: `Resolución:
1. P(A)=3/6=1/2, P(B)=2/6=1/3 y P(C)=1/6.
2. P(Copas|A)=3/5, P(Copas|B)=2/5 y P(Copas|C)=1/5.
3. Probabilidad total:
P(Copas)=1/2·3/5+1/3·2/5+1/6·1/5
=3/10+2/15+1/30=7/15.
Resultado final: 7/15.`
      },
      "a.2)": {
        options: ["2/7≈0,2857.", "1/3.", "2/5=0,4.", "3/7≈0,4286."],
        correct: 0,
        solution: `Resolución:
1. P(B∩Copas)=P(B)P(Copas|B)=1/3·2/5=2/15.
2. P(Copas)=7/15.
3. Aplicamos Bayes:
P(B|Copas)=(2/15)/(7/15)=2/7.
Resultado final: 2/7≈0,2857.`
      },
      "b.1)": {
        options: ["135/512≈0,2637.", "5/16=0,3125.", "243/1024≈0,2373.", "1/4=0,25."],
        correct: 0,
        solution: `Resolución:
1. X~B(5,0,25).
2. P(X=2)=C(5,2)(0,25)²(0,75)³.
3. P(X=2)=10·(1/16)·(27/64)=270/1024=135/512.
Resultado final: 135/512≈0,2637.`
      },
      "b.2)": {
        options: ["781/1024≈0,7627.", "243/1024≈0,2373.", "3/4=0,75.", "1/4=0,25."],
        correct: 0,
        solution: `Resolución:
1. “Al menos una vez” es el complementario de ninguna vez.
2. P(X≥1)=1-P(X=0).
3. P(X=0)=(0,75)⁵=(3/4)⁵=243/1024.
4. P(X≥1)=1-243/1024=781/1024.
Resultado final: 781/1024≈0,7627.`
      }
    }
  });
})();

// Ciencias Sociales II · ejercicios oficiales de 2024.
(() => {
  "use strict";
  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-26ae34bd29d1": {
      "a)": {
        options: [
          "B=45x+30y; x≥15, y≥10, 4x+7y≤200 y 5x+4y≤174.",
          "B=60x+48y; x≥15, y≥10, 4x+7y≥200 y 5x+4y≥174.",
          "B=45x+30y; x≤15, y≤10, 4x+7y≤200 y 5x+4y≤174.",
          "B=30x+45y; x≥10, y≥15, 7x+4y≤200 y 4x+5y≤174."
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x a los kilogramos de plancha de acero e y a los kilogramos de plancha de aluminio.
2. El beneficio que se desea maximizar es B(x,y)=45x+30y.
3. Restricción de horas: 4x+7y≤200.
4. Restricción de material: 60x+48y≤2088. Dividiendo entre 12: 5x+4y≤174.
5. Producciones mínimas: x≥15 e y≥10.
6. El recinto factible queda limitado por x=15, y=10, 4x+7y=200 y 5x+4y=174.
7. Sus vértices son (15,10), (15,20), (22,16) y (134/5,10).
Resultado final: B=45x+30y con x≥15, y≥10, 4x+7y≤200 y 5x+4y≤174.`
      },
      "b)": {
        options: [
          "26,8 kg de acero y 10 kg de aluminio; beneficio máximo 1506 €.",
          "22 kg de acero y 16 kg de aluminio; beneficio máximo 1470 €.",
          "15 kg de acero y 20 kg de aluminio; beneficio máximo 1275 €.",
          "15 kg de acero y 10 kg de aluminio; beneficio máximo 975 €."
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos B(x,y)=45x+30y en todos los vértices del recinto.
2. B(15,10)=45·15+30·10=975.
3. B(15,20)=45·15+30·20=1275.
4. B(22,16)=45·22+30·16=1470.
5. B(134/5,10)=45·134/5+30·10=1506.
6. El valor mayor es 1506 y se alcanza en (134/5,10).
Resultado final: deben fabricarse 26,8 kg de acero y 10 kg de aluminio; el beneficio máximo es 1506 €.`
      }
    },
    "ccss2-algebra-c0a5f806f5bd": {
      "a)": {
        options: [
          "{T+G+A=156, A=2(T-G), G=A/3}.",
          "{T+G+A=156, A=2(T+G), G=3A}.",
          "{T-G+A=156, A=T-G, G=A/2}.",
          "{T+G+A=156, T=2(A-G), A=G/3}."
        ],
        correct: 0,
        solution: `Resolución:
1. Sea T el agua de Torre de Abraham, G la de Gasset y A la de Azután, en hm³.
2. La cantidad total proporciona T+G+A=156.
3. Azután contiene el doble de la diferencia entre Torre de Abraham y Gasset: A=2(T-G).
4. Gasset contiene un tercio de Azután: G=A/3.
Resultado final: {T+G+A=156, A=2(T-G), G=A/3}.`
      },
      "b)": {
        options: [
          "Torre de Abraham: 60 hm³; Gasset: 24 hm³; Azután: 72 hm³.",
          "Torre de Abraham: 72 hm³; Gasset: 24 hm³; Azután: 60 hm³.",
          "Torre de Abraham: 60 hm³; Gasset: 32 hm³; Azután: 64 hm³.",
          "Torre de Abraham: 48 hm³; Gasset: 36 hm³; Azután: 72 hm³."
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos del sistema {T+G+A=156, A=2(T-G), G=A/3}.
2. De G=A/3 obtenemos A=3G.
3. Sustituimos en A=2(T-G): 3G=2T-2G, luego 2T=5G y T=5G/2.
4. Sustituimos en la ecuación total:
5G/2+G+3G=156.
5. Multiplicamos por 2: 5G+2G+6G=312; 13G=312; G=24.
6. A=3G=72 y T=5G/2=60.
7. Comprobación: 60+24+72=156 y 72=2(60-24).
Resultado final: T=60 hm³, G=24 hm³ y A=72 hm³.`
      }
    },
    "ccss2-algebra-696f85ab6372": {
      "a)": {
        options: [
          "{A+P+D=72, D=P-A, A=D+P/3}.",
          "{A+P+D=72, D=P+A, A=D-P/3}.",
          "{A+P-D=72, D=A-P, A=D+3P}.",
          "{A+P+D=72, P=D-A, A=P+D/3}."
        ],
        correct: 0,
        solution: `Resolución:
1. Sean A, P y D los bebés llamados Alba, Pablo y David.
2. En total: A+P+D=72.
3. David coincide con la diferencia entre Pablo y Alba: D=P-A.
4. Alba coincide con la suma de David y un tercio de Pablo: A=D+P/3.
Resultado final: {A+P+D=72, D=P-A, A=D+P/3}.`
      },
      "b)": {
        options: [
          "Alba: 24; Pablo: 36; David: 12.",
          "Alba: 36; Pablo: 24; David: 12.",
          "Alba: 24; Pablo: 32; David: 16.",
          "Alba: 18; Pablo: 36; David: 18."
        ],
        correct: 0,
        solution: `Resolución:
1. De D=P-A y A=D+P/3 sustituimos D:
A=P-A+P/3.
2. Sumamos términos: 2A=4P/3, de donde A=2P/3.
3. Entonces D=P-A=P/3.
4. Sustituimos en A+P+D=72:
2P/3+P+P/3=72.
5. El primer y el tercer término suman P; por tanto 2P=72 y P=36.
6. A=2·36/3=24 y D=36/3=12.
Resultado final: Alba 24, Pablo 36 y David 12.`
      }
    },
    "ccss2-algebra-028bf724f264": {
      "a)": {
        options: [
          "A²=2A-I.",
          "A²=A-I.",
          "A²=2A+I.",
          "A²=I."
        ],
        correct: 0,
        solution: `Resolución:
1. La matriz es A=[[5,-4,2],[2,-1,1],[-4,4,-1]].
2. Multiplicamos A por A, fila por columna:
A²=[[9,-8,4],[4,-3,2],[-8,8,-3]].
3. Calculamos 2A-I:
2A-I=[[10,-8,4],[4,-2,2],[-8,8,-2]]-[[1,0,0],[0,1,0],[0,0,1]]
=[[9,-8,4],[4,-3,2],[-8,8,-3]].
4. Ambas matrices coinciden.
Resultado final: A²=2A-I.`
      },
      "b)": {
        options: [
          "A⁴=4A-3I=[[17,-16,8],[8,-7,4],[-16,16,-7]].",
          "A⁴=2A-I=[[9,-8,4],[4,-3,2],[-8,8,-3]].",
          "A⁴=4A+3I=[[23,-16,8],[8,-1,4],[-16,16,-1]].",
          "A⁴=A."
        ],
        correct: 0,
        solution: `Resolución:
1. Usamos A²=2A-I.
2. A⁴=(A²)²=(2A-I)².
3. Como A e I conmutan:
A⁴=4A²-4A+I.
4. Sustituimos de nuevo A²=2A-I:
A⁴=4(2A-I)-4A+I=4A-3I.
5. Calculamos:
4A-3I=[[20,-16,8],[8,-4,4],[-16,16,-4]]-[[3,0,0],[0,3,0],[0,0,3]]
=[[17,-16,8],[8,-7,4],[-16,16,-7]].
Resultado final: A⁴=4A-3I=[[17,-16,8],[8,-7,4],[-16,16,-7]].`
      }
    },
    "ccss2-algebra-18c6f09cc97c": {
      "a)": {
        options: [
          "I=2,10x+1,50y; 4x+3y≤5400, 10x+9y≤14400, x≥0, y≥0.",
          "I=1,50x+2,10y; 4x+3y≥5400, 10x+9y≥14400.",
          "I=2,10x+1,50y; 4x+3y≤270, 10x+9y≤432.",
          "I=2,10x-1,50y; x+y≤270."
        ],
        correct: 0,
        solution: `Resolución:
1. Sea x el número de carpetas tamaño folio e y el número de carpetas tamaño cuartilla.
2. La función que se maximiza es el ingreso I(x,y)=2,10x+1,50y.
3. Cartón: 0,20x+0,15y≤270. Multiplicando por 20: 4x+3y≤5400.
4. Cinta: 0,30x+0,27y≤432. Multiplicando por 100/3: 10x+9y≤14400.
5. Además, x≥0 e y≥0.
6. Los vértices del recinto son (0,0), (1350,0), (900,600) y (0,1600).
Resultado final: I=2,10x+1,50y con 4x+3y≤5400, 10x+9y≤14400, x,y≥0.`
      },
      "b)": {
        options: [
          "1350 carpetas tamaño folio y 0 tamaño cuartilla; ingreso máximo 2835 €.",
          "900 carpetas tamaño folio y 600 tamaño cuartilla; ingreso máximo 2790 €.",
          "0 carpetas tamaño folio y 1600 tamaño cuartilla; ingreso máximo 2400 €.",
          "600 carpetas tamaño folio y 900 tamaño cuartilla; ingreso máximo 2610 €."
        ],
        correct: 0,
        solution: `Resolución:
1. Evaluamos I(x,y)=2,10x+1,50y en los vértices.
2. I(0,0)=0.
3. I(1350,0)=2,10·1350=2835.
4. I(900,600)=2,10·900+1,50·600=2790.
5. I(0,1600)=1,50·1600=2400.
6. El mayor valor es 2835.
Resultado final: 1350 carpetas tamaño folio y ninguna tamaño cuartilla; ingreso máximo 2835 €.`
      }
    },
    "ccss2-algebra-02736b4c2e6c": {
      "a)": {
        options: [
          "{O+P+B=36, B=3O, B+2=2(P-2)}.",
          "{O+P+B=36, O=3B, B-2=2(P+2)}.",
          "{O+P-B=36, B=3P, P+2=2(B-2)}.",
          "{O+P+B=36, P=3O, B+2=P-2}."
        ],
        correct: 0,
        solution: `Resolución:
1. Sean O, P y B las medallas de oro, plata y bronce.
2. Total: O+P+B=36.
3. El bronce triplica al oro: B=3O.
4. Al pasar dos medallas de plata a bronce quedarían B+2 de bronce y P-2 de plata.
5. En esa situación el bronce duplicaría a la plata: B+2=2(P-2).
Resultado final: {O+P+B=36, B=3O, B+2=2(P-2)}.`
      },
      "b)": {
        options: [
          "6 de oro, 12 de plata y 18 de bronce.",
          "6 de oro, 18 de plata y 12 de bronce.",
          "8 de oro, 10 de plata y 18 de bronce.",
          "4 de oro, 16 de plata y 16 de bronce."
        ],
        correct: 0,
        solution: `Resolución:
1. De B=3O y B+2=2(P-2) obtenemos 3O+2=2P-4.
2. Por tanto, 2P-3O=6.
3. Sustituimos B=3O en O+P+B=36: 4O+P=36.
4. Resolvemos el sistema {4O+P=36, -3O+2P=6}.
5. De la primera, P=36-4O.
6. Sustituyendo: -3O+2(36-4O)=6; -11O=-66; O=6.
7. P=36-24=12 y B=3·6=18.
Resultado final: 6 de oro, 12 de plata y 18 de bronce.`
      }
    },
    "ccss2-algebra-9815f2605b1f": {
      "a)": {
        options: [
          "{4N-3I=V+1, I=N+7, V=0,05(I+N+V)}.",
          "{4I-3N=V+1, N=I+7, V=0,05(I+N)}.",
          "{4N-3I=V-1, I=7N, V=5(I+N+V)}.",
          "{I+N+V=100, I=N-7, V=0,5(I+N)}."
        ],
        correct: 0,
        solution: `Resolución:
1. Sean I, N y V los votos de Inés, Nerea y los votos nulos.
2. “Cuatro veces Nerea menos tres veces Inés excede a los nulos en un voto”:
4N-3I=V+1.
3. Al dividir I entre N el cociente es 1 y el resto 7:
I=N·1+7=N+7.
4. El 5 % del total es nulo:
V=0,05(I+N+V).
Resultado final: {4N-3I=V+1, I=N+7, V=0,05(I+N+V)}.`
      },
      "b)": {
        options: [
          "Inés: 32 votos; Nerea: 25 votos; nulos: 3 votos.",
          "Inés: 25 votos; Nerea: 32 votos; nulos: 3 votos.",
          "Inés: 30 votos; Nerea: 23 votos; nulos: 7 votos.",
          "Inés: 28 votos; Nerea: 21 votos; nulos: 11 votos."
        ],
        correct: 0,
        solution: `Resolución:
1. De I=N+7 sustituimos en 4N-3I=V+1:
4N-3(N+7)=V+1.
2. Simplificando: N-21=V+1, luego N=V+22.
3. Entonces I=N+7=V+29.
4. De V=0,05(I+N+V), multiplicamos por 20:
20V=I+N+V, es decir, 19V=I+N.
5. Sustituimos: 19V=(V+29)+(V+22)=2V+51.
6. 17V=51; V=3.
7. N=3+22=25 e I=3+29=32.
Resultado final: Inés 32 votos, Nerea 25 votos y 3 votos nulos.`
      }
    },
    "ccss2-algebra-677460ede25e": {
      "a)": {
        options: [
          "C+AB=[[1,6],[0,3]].",
          "C+AB=[[0,7],[-1,3]].",
          "C+AB=[[1,-6],[0,3]].",
          "No se puede calcular por incompatibilidad de dimensiones."
        ],
        correct: 0,
        solution: `Resolución:
1. A=[[1,2,3],[2,1,1]], B=[[-1,0],[2,2],[-1,1]] y C=[[1,-1],[1,0]].
2. A es 2×3 y B es 3×2, por lo que AB existe y es 2×2.
3. Multiplicamos fila por columna:
AB=[[1·(-1)+2·2+3·(-1), 1·0+2·2+3·1],
[2·(-1)+1·2+1·(-1), 2·0+1·2+1·1]]
=[[0,7],[-1,3]].
4. Sumamos C:
C+AB=[[1,-1],[1,0]]+[[0,7],[-1,3]]
=[[1,6],[0,3]].
Resultado final: C+AB=[[1,6],[0,3]].`
      },
      "b)": {
        options: [
          "No; C⁻¹+(AB)⁻¹=[[3/7,0],[-6/7,1]] y (C+AB)⁻¹=[[1,-2],[0,1/3]].",
          "Sí; ambas matrices son [[1,-2],[0,1/3]].",
          "No existen las inversas porque todos los determinantes son cero.",
          "Sí; ambas matrices son la identidad."
        ],
        correct: 0,
        solution: `Resolución:
1. det(C)=1 y det(AB)=7, por lo que ambas matrices son invertibles.
2. C⁻¹=[[0,1],[-1,1]].
3. Como AB=[[0,7],[-1,3]], su determinante es 7:
(AB)⁻¹=(1/7)[[3,-7],[1,0]]=[[3/7,-1],[1/7,0]].
4. Sumamos:
C⁻¹+(AB)⁻¹=[[3/7,0],[-6/7,1]].
5. C+AB=[[1,6],[0,3]], con determinante 3:
(C+AB)⁻¹=[[1,-2],[0,1/3]].
6. Las matrices obtenidas son distintas. Esto muestra que, en general, la inversa de una suma no es la suma de las inversas.
Resultado final: no son iguales.`
      }
    },
    "ccss2-analisis-d88b76945fd7": {
      "a)": {
        options: [
          "c=2.",
          "c=4.",
          "c=0 únicamente.",
          "No existe ningún valor."
        ],
        correct: 0,
        solution: `Resolución:
1. Igualamos el límite por la izquierda, el límite por la derecha y P(c):
18c²-100c+162=-c³+18c²-96c+162.
2. Simplificamos:
c³-4c=0.
3. Factorizamos:
c(c²-4)=c(c-2)(c+2)=0.
4. Los candidatos son c=-2, c=0 y c=2.
5. Por la definición temporal de los tramos, el punto interior que separa dos intervalos no degenerados dentro de los diez días es c=2.
Resultado final: c=2.`
      },
      "b)": {
        options: [
          "Máximo de 34 € en x=2 y x=8; mínimo de 2 € en x=4.",
          "Máximo de 34 € sólo en x=4; mínimo de 2 € en x=8.",
          "Máximo de 162 € en x=2; mínimo de 0 € en x=10.",
          "La función es siempre creciente."
        ],
        correct: 0,
        solution: `Resolución para c=2 y x≥2:
1. P(x)=-x³+18x²-96x+162.
2. Derivamos:
P'(x)=-3x²+36x-96=-3(x-4)(x-8).
3. Los puntos críticos son x=4 y x=8.
4. En la recta real, P'<0 en (2,4), P'>0 en (4,8) y P'<0 en (8,10).
5. Por tanto, x=4 es mínimo relativo y x=8 máximo relativo.
6. Calculamos los valores:
P(2)=34, P(4)=2 y P(8)=34.
7. Al considerar también el comienzo x=2, el valor máximo 34 se alcanza en x=2 y x=8.
Resultado final: máximo 34 € en los días 2 y 8; mínimo 2 € en el día 4.`
      },
      "c)": {
        options: [
          "Decrece en (2,4), crece en (4,8) y decrece en (8,10).",
          "Crece en (2,4), decrece en (4,8) y crece en (8,10).",
          "Crece en todo (2,10).",
          "Decrece en todo (2,10)."
        ],
        correct: 0,
        solution: `Resolución:
1. P'(x)=-3(x-4)(x-8).
2. Marcamos en la recta real los valores 4 y 8, que anulan la derivada.
3. En (2,4), por ejemplo x=3: P'(3)<0, luego P decrece.
4. En (4,8), por ejemplo x=6: P'(6)>0, luego P crece.
5. En (8,10), por ejemplo x=9: P'(9)<0, luego P decrece.
Resultado final: decrece en (2,4), crece en (4,8) y decrece en (8,10).`
      }
    },
    "ccss2-analisis-cce07ef00f86": {
      Resultado: {
        options: [
          "a=-8, b=13, c=3.",
          "a=8, b=-3, c=3.",
          "a=-3, b=8, c=13.",
          "a=2, b=3, c=6."
        ],
        correct: 0,
        solution: `Resolución:
1. Como la gráfica pasa por (0,3), f(0)=3:
c=3.
2. Como pasa por (1,8), f(1)=8:
a+b+c=8, luego a+b=5.
3. La pendiente de la tangente y=2x+6 es 2.
4. Derivamos f'(x)=3ax²+2bx.
5. En x=1, f'(1)=2:
3a+2b=2.
6. Resolvemos el sistema {a+b=5, 3a+2b=2}.
7. Multiplicamos la primera por 2: 2a+2b=10. Restando, a=-8.
8. b=5-a=13 y c=3.
Resultado final: a=-8, b=13 y c=3.`
      }
    },
    "ccss2-analisis-5a214654f315": {
      "a)": {
        options: [
          "Sí: t=(-13±√519)/5.",
          "Sí: t=-5 únicamente.",
          "Sí: t=0 y t=5.",
          "No existe ningún valor real."
        ],
        correct: 0,
        solution: `Resolución:
1. En x=5, el segundo tramo vale (5+t)·5⁻¹=(5+t)/5.
2. El límite por la derecha, usando el tercer tramo, es:
-(5+t)²+(14+t)·5-30.
3. Simplificamos el valor derecho:
-(t²+10t+25)+70+5t-30=15-5t-t².
4. Para que exista continuidad:
(5+t)/5=15-5t-t².
5. Multiplicamos por 5 y ordenamos:
5+t=75-25t-5t²;
5t²+26t-70=0.
6. Aplicamos la fórmula:
t=(-26±√2076)/10=(-13±√519)/5.
Resultado final: sí existe continuidad para t=(-13±√519)/5.`
      },
      "b)": {
        options: [
          "Para t=0: 2x+4 en [0,2], 5/x en (2,5] y -x²+14x-30 en (5,11].",
          "Para t=0: 2x+4 en todo [0,11].",
          "Para t=0: 5x en [0,5] y x²-14x+30 en (5,11].",
          "Para t=0: los tres tramos forman una función continua."
        ],
        correct: 0,
        solution: `Resolución para t=0:
1. La función queda:
R(x)=2x+4 si 0≤x≤2;
R(x)=5/x si 2<x≤5;
R(x)=-x²+14x-30 si 5<x≤11.
2. Primer tramo: segmento de recta desde (0,4) hasta (2,8), ambos incluidos.
3. Segundo tramo: rama de 5/x; comienza con punto abierto en (2,5/2) y termina con punto cerrado en (5,1).
4. Tercer tramo: parábola cóncava hacia abajo; empieza con punto abierto en (5,15), tiene vértice en (7,19) y termina en (11,3).
5. Hay saltos en x=2 y x=5, que deben mostrarse con puntos abiertos y cerrados.
Resultado final: la representación correcta es la formada por esos tres tramos y esos puntos característicos.`
      }
    },
    "ccss2-analisis-bbc247440462": {
      "a)": {
        options: [
          "t=-2 o t=12.",
          "t=2 o t=-12.",
          "t=-2 únicamente.",
          "No existe ningún valor real."
        ],
        correct: 0,
        solution: `Resolución:
1. El valor del primer tramo en x=3 es:
R(3)=-(3+t-3)²+(t+27)=-t²+t+27.
2. El límite por la derecha usando el segundo tramo es:
-3³/3-t·3²+5·3-3=3-9t.
3. Igualamos para imponer continuidad:
-t²+t+27=3-9t.
4. Ordenamos:
t²-10t-24=0.
5. Factorizamos:
(t-12)(t+2)=0.
Resultado final: t=-2 o t=12.`
      },
      "b)": {
        options: [
          "En x=5, con rentabilidad máxima 91/3.",
          "En x=3, con rentabilidad máxima 3.",
          "En x=4, con rentabilidad máxima 30.",
          "No existe máximo."
        ],
        correct: 0,
        solution: `Resolución para t=-2 y x>3:
1. R(x)=-x³/3+2x²+5x-3.
2. Derivamos:
R'(x)=-x²+4x+5=-(x-5)(x+1).
3. En el dominio x>3, el único punto crítico es x=5.
4. En (3,5), R'>0; en (5,+∞), R'<0. Por tanto, x=5 es un máximo.
5. Calculamos:
R(5)=-125/3+2·25+25-3
=-125/3+72=91/3.
Resultado final: la mayor rentabilidad se alcanza en el quinto año y vale 91/3.`
      },
      "c)": {
        options: [
          "Crece en (3,5) y decrece en (5,+∞).",
          "Decrece en (3,5) y crece en (5,+∞).",
          "Crece en todo (3,+∞).",
          "Decrece en todo (3,+∞)."
        ],
        correct: 0,
        solution: `Resolución:
1. R'(x)=-(x-5)(x+1).
2. Marcamos en la recta real -1 y 5; sólo 5 pertenece al dominio x>3.
3. Probamos x=4: R'(4)=5>0, luego la función crece en (3,5).
4. Probamos x=6: R'(6)=-5<0, luego la función decrece en (5,+∞).
Resultado final: crece en (3,5) y decrece en (5,+∞).`
      }
    },
    "ccss2-analisis-17b191a58e55": {
      Resultado: {
        options: [
          "a=3, b=3, c=1.",
          "a=-3, b=3, c=1.",
          "a=3, b=-3, c=0.",
          "a=1, b=3, c=3."
        ],
        correct: 0,
        solution: `Resolución:
1. Como (-1,0) pertenece a la gráfica:
f(-1)=1-a+b-c=0.
2. Al ser un extremo relativo en x=-1:
f'(-1)=0.
3. Derivamos:
f'(x)=4x³+3ax²+2bx+c.
4. Entonces:
-4+3a-2b+c=0.
5. La tangente en x=0 es y=x. Su pendiente es 1, luego f'(0)=c=1.
6. Sustituimos c=1 en la primera ecuación:
1-a+b-1=0, luego -a+b=0.
7. En la segunda:
-4+3a-2b+1=0, luego 3a-2b=3.
8. Resolvemos el sistema {-a+b=0, 3a-2b=3}. De b=a resulta a=3 y b=3.
Resultado final: a=3, b=3 y c=1.`
      }
    },
    "ccss2-analisis-8797caeee926": {
      "a)": {
        options: [
          "t=-6 o t=-2.",
          "t=6 o t=2.",
          "t=-4 únicamente.",
          "No existe ningún valor real."
        ],
        correct: 0,
        solution: `Resolución:
1. El límite por la izquierda en x=2 es:
-(4+t)²+11+t.
2. El valor de la función y límite por la derecha es:
2²-8·2+19+t=7+t.
3. Igualamos:
-(4+t)²+11+t=7+t.
4. Simplificamos:
-(4+t)²+4=0;
(4+t)²=4.
5. Por tanto, 4+t=±2.
6. Si 4+t=2, t=-2; si 4+t=-2, t=-6.
Resultado final: t=-6 o t=-2.`
      },
      "b)": {
        options: [
          "Para t=-1: -4x²+4x+9 en [0,2) y x²-8x+18 en [2,7].",
          "Para t=-1: -2x²+10 en [0,2] y x²-8x+19 en (2,7].",
          "Para t=-1: una única recta continua.",
          "Para t=-1: 4x²-4x-9 en [0,2) y -x²+8x-18 en [2,7]."
        ],
        correct: 0,
        solution: `Resolución para t=-1:
1. Primer tramo:
A(x)=-(2x-1)²+10=-4x²+4x+9, 0≤x<2.
2. Es una parábola cóncava hacia abajo. Su vértice está en x=1/2 y A(1/2)=10.
3. Pasa por (0,9) y se aproxima al punto abierto (2,1).
4. Segundo tramo:
A(x)=x²-8x+18, 2≤x≤7.
5. Es una parábola cóncava hacia arriba. Su vértice es (4,2); incluye (2,6) y (7,11).
6. En x=2 hay un salto: punto abierto (2,1) y punto cerrado (2,6).
Resultado final: la gráfica correcta representa ambos arcos de parábola con esos vértices y extremos.`
      }
    },
    "ccss2-analisis-6024b443eb26": {
      "a)": {
        options: [
          "33 758 socios.",
          "48 158 socios.",
          "4 058 socios.",
          "30 socios."
        ],
        correct: 0,
        solution: `Resolución:
1. El año 1982 corresponde a t=1982-1965=17.
2. Desarrollamos:
S(t)=-0,5(2t³-34t²-3968t-60)
=-t³+17t²+1984t+30.
3. Sustituimos t=17:
S(17)=-17³+17·17²+1984·17+30.
4. Calculamos:
S(17)=-4913+4913+33728+30=33758.
Resultado final: en 1982 el club tenía 33 758 socios.`
      },
      "b)": {
        options: [
          "Máximo en t=32: 48 158 socios; mínimo en t=0: 30 socios.",
          "Máximo en t=53: 4 058 socios; mínimo en t=32: 30 socios.",
          "Máximo en t=17: 33 758 socios; mínimo en t=53: 0 socios.",
          "La función es creciente durante toda la existencia del club."
        ],
        correct: 0,
        solution: `Resolución en el intervalo 0≤t≤53:
1. S(t)=-t³+17t²+1984t+30.
2. Derivamos:
S'(t)=-3t²+34t+1984.
3. Resolvemos S'(t)=0:
3t²-34t-1984=0.
4. El discriminante es 24964=158²:
t=(34±158)/6.
5. Obtenemos t=32 y t=-62/3. Sólo t=32 pertenece al intervalo.
6. En la recta real, S'>0 antes de 32 y S'<0 después de 32; por tanto, t=32 es máximo.
7. Comparamos el punto crítico y los extremos:
S(0)=30, S(32)=48158 y S(53)=4058.
8. El máximo se alcanza 32 años después de 1965, es decir, en 1997. El mínimo se alcanza en la fundación, en 1965.
Resultado final: máximo de 48 158 socios en 1997; mínimo de 30 socios en 1965.`
      }
    }
  });
})();
