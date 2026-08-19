(function () {
  "use strict";

  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const algebra = window.CCSS_II_BLOCK_EXERCISES?.algebra || [];
  const algebra2018 = algebra.filter((item) => String(item.source || "").startsWith("2018"));
  [
    [2, "ccss2-algebra-42170503164f--ccss-ii-algebra-2"],
    [3, "ccss2-algebra-7fb8271efc21--ccss-ii-algebra-2"],
    [6, "ccss2-algebra-e4e79f1e69e8--ccss-ii-algebra-2"],
    [7, "ccss2-algebra-e72cb3617832--ccss-ii-algebra-2"]
  ].forEach(([index, id]) => {
    if (algebra2018[index]) algebra2018[index].id = id;
  });
  const matrixExercise = algebra2018[6];
  if (matrixExercise) {
    matrixExercise.statement = [{
      plain: "Dadas las matrices A=[[-1,-2,0],[3,0,3]], B=[[2,2],[-5,0],[-1,-3]], C=[[4],[-4],[1]] y D=[[0,-1,3]]:",
      html: "Dadas las matrices A=[[-1,-2,0],[3,0,3]], B=[[2,2],[-5,0],[-1,-3]], C=[[4],[-4],[1]] y D=[[0,-1,3]]:"
    }];
    matrixExercise.parts = [
      { label: "a)", paragraphs: [{ plain: "Razona cuáles de los siguientes productos se pueden efectuar: A·B, A·C, A·D y C·D.", html: "Razona cuáles de los siguientes productos se pueden efectuar: A·B, A·C, A·D y C·D." }] },
      { label: "b)", paragraphs: [{ plain: "Calcula los productos del apartado anterior cuyo resultado sea una matriz cuadrada.", html: "Calcula los productos del apartado anterior cuyo resultado sea una matriz cuadrada." }] }
    ];
  }

  const analysis2018 = (window.CCSS_II_BLOCK_EXERCISES?.analisis || [])
    .filter((item) => String(item.source || "").startsWith("2018"));
  [
    [2, "ccss2-analisis-dea103e265c3--variant-2"],
    [3, "ccss2-analisis-13d099a797d8--variant-2"],
    [6, "ccss2-analisis-09d75cfb87d5--variant-2"],
    [7, "ccss2-analisis-693030354d37--variant-2"]
  ].forEach(([index, id]) => {
    if (analysis2018[index]) analysis2018[index].id = id;
  });

  const probability2018 = (window.CCSS_II_BLOCK_EXERCISES?.probabilidad || [])
    .filter((item) => String(item.source || "").startsWith("2018"));
  if (probability2018[1]) probability2018[1].id = "ccss2-probabilidad-299098e0f0de--variant-2";
  if (probability2018[3]) probability2018[3].id = "ccss2-probabilidad-10d8f9408628--variant-2";

  const statistics2018 = (window.CCSS_II_BLOCK_EXERCISES?.estadistica || [])
    .filter((item) => String(item.source || "").startsWith("2018"));
  if (statistics2018[1]) statistics2018[1].id = "ccss2-estadistica-b774ab405e41--variant-2";
  if (statistics2018[3]) statistics2018[3].id = "ccss2-estadistica-7e71b97a83b5--variant-2";

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-42170503164f": {
      "a)": {
        options: [
          "x: bicicletas de paseo; y: bicicletas de montaña",
          "x: horas de paseo; y: horas de montaña",
          "x: coste de paseo; y: coste de montaña",
          "x: total de bicicletas; y: tiempo total"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos x al número de bicicletas de paseo e y al número de bicicletas de montaña.

Las restricciones son:
1≤x≤2,
3≤y≤6,
3x+y≥9.

Como el tiempo de reparación es de 1 hora por bicicleta de paseo y 2 horas por bicicleta de montaña, la función objetivo que hay que minimizar es:
T(x,y)=x+2y.`
      },
      "b)": {
        options: [
          "Vértices: (1,6), (2,3) y (2,6)",
          "Vértices: (1,3), (1,6) y (2,3)",
          "Vértices: (0,9), (2,3) y (2,6)",
          "Vértices: (1,6), (2,3) y (3,2)"
        ],
        correct: 0,
        solution: `Resolución:
Representamos las rectas x=1, x=2, y=3, y=6 y 3x+y=9.

La región factible es el triángulo limitado por x=2, y=6 y 3x+y=9.

Calculamos sus vértices:
x=1 con 3x+y=9 ⇒ y=6 ⇒ (1,6).
x=2 con 3x+y=9 ⇒ y=3 ⇒ (2,3).
x=2 con y=6 ⇒ (2,6).

Por tanto, los vértices son (1,6), (2,3) y (2,6).`
      },
      "c)": {
        options: [
          "2 de paseo y 3 de montaña; tiempo mínimo 8 horas",
          "1 de paseo y 6 de montaña; tiempo mínimo 13 horas",
          "2 de paseo y 6 de montaña; tiempo mínimo 14 horas",
          "1 de paseo y 3 de montaña; tiempo mínimo 7 horas"
        ],
        correct: 0,
        solution: `Resolución:
Evaluamos T=x+2y en los vértices:
T(1,6)=1+2·6=13,
T(2,3)=2+2·3=8,
T(2,6)=2+2·6=14.

El mínimo se alcanza únicamente en (2,3).

Resultado final: se reparan 2 bicicletas de paseo y 3 de montaña, y se necesitan 8 horas. La solución es única.`
      }
    },
    "ccss2-algebra-7fb8271efc21": {
      "a)": {
        options: [
          "{A+B+C=255; 20A+25B+40C=7000; 2A-B-C=0}",
          "{A+B+C=255; 20A+25B+40C=7000; A-2B-2C=0}",
          "{A+B+C=7000; 20A+25B+40C=255; 2A+B+C=0}",
          "{A+B+C=255; 20A+25B+40C=7000; A+B-2C=0}"
        ],
        correct: 0,
        solution: `Resolución:
Sean A, B y C las cantidades de acciones de cada tipo.

Número total de acciones:
A+B+C=255.

Valor total:
20A+25B+40C=7000.

El número de acciones A es la mitad del total de acciones B y C:
A=frac{B+C}{2} ⇒ 2A-B-C=0.

El sistema pedido es:
{ A+B+C=255
  20A+25B+40C=7000
  2A-B-C=0 }.`
      },
      "b)": {
        options: [
          "A=85, B=100, C=70",
          "A=85, B=70, C=100",
          "A=100, B=85, C=70",
          "A=70, B=100, C=85"
        ],
        correct: 0,
        solution: `Resolución:
Resolvemos:
{ A+B+C=255
  20A+25B+40C=7000
  2A-B-C=0 }.

De 2A=B+C y A+B+C=255:
A+2A=255 ⇒ A=85.

Entonces:
B+C=170,
25B+40C=7000-20·85=5300.

Multiplicamos la primera por 25:
25B+25C=4250.

Restamos:
15C=1050 ⇒ C=70.

B=170-70=100.

Resultado final: A=85, B=100 y C=70.`
      }
    },
    "ccss2-algebra-42170503164f--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "A²=A⁻¹=[[-3,-7],[1,2]]",
          "A²=A⁻¹=[[3,7],[-1,-2]]",
          "A²=A=[[-3,-7],[1,2]]",
          "A²=I"
        ],
        correct: 0,
        solution: `Resolución:
A=[[2,7],[-1,-3]].

Calculamos:
A²=[[2,7],[-1,-3]]·[[2,7],[-1,-3]]
=[[-3,-7],[1,2]].

Además:
det(A)=2·(-3)-7·(-1)=1.

A⁻¹=frac{1}{det(A)}·[[-3,-7],[1,2]]
=[[-3,-7],[1,2]].

Por tanto, A²=A⁻¹.`
      },
      "b)": {
        options: [
          "A³=I y A⁴=A",
          "A³=A y A⁴=I",
          "A³=A⁻¹ y A⁴=A²",
          "A³=0 y A⁴=0"
        ],
        correct: 0,
        solution: `Resolución:
Como A²=A⁻¹:
A³=A·A²=A·A⁻¹=I.

Después:
A⁴=A³·A=I·A=A.

Resultado final: A³=I y A⁴=A.`
      }
    },
    "ccss2-algebra-7fb8271efc21--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "{85a+100b+70c=7000; c=2a; b=a+5}",
          "{85a+100b+70c=7000; a=2c; b=a-5}",
          "{85a+100b+70c=255; c=2a; b=a+5}",
          "{85a+100b+70c=7000; c=a+2; b=5a}"
        ],
        correct: 0,
        solution: `Resolución:
Sean a, b y c los precios de una acción de los tipos A, B y C.

Con 85, 100 y 70 acciones se pagaron 7000 euros:
85a+100b+70c=7000.

El precio de C es el doble que el de A:
c=2a.

El precio de B supera en 5 euros al de A:
b=a+5.

El sistema es:
{ 85a+100b+70c=7000
  c=2a
  b=a+5 }.`
      },
      "b)": {
        options: [
          "a=20 €, b=25 €, c=40 €",
          "a=25 €, b=20 €, c=40 €",
          "a=20 €, b=40 €, c=25 €",
          "a=40 €, b=25 €, c=20 €"
        ],
        correct: 0,
        solution: `Resolución:
Sustituimos b=a+5 y c=2a:
85a+100(a+5)+70·2a=7000.

85a+100a+500+140a=7000.

325a=6500 ⇒ a=20.

b=20+5=25.
c=2·20=40.

Resultado final: A cuesta 20 €, B cuesta 25 € y C cuesta 40 €.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-299098e0f0de": {
      "a)": {
        options: ["0,20", "0,30", "0,40", "0,70"],
        correct: 0,
        solution: `Resolución:
Sea L el suceso «le gusta la lectura» y C «le gusta el cine».

P(L)=0,40, P(C)=0,50 y P(L∪C)=0,70.

Usamos:
P(L∪C)=P(L)+P(C)-P(L∩C).

0,70=0,40+0,50-P(L∩C).

P(L∩C)=0,90-0,70=0,20.

Resultado final: la probabilidad es 0,20.`
      },
      "b)": {
        options: ["0,40", "0,20", "0,50", "0,70"],
        correct: 0,
        solution: `Resolución:
Pedimos la probabilidad condicionada:
P(L|C)=frac{P(L∩C)}{P(C)}.

Sustituimos:
P(L|C)=frac{0,20}{0,50}=0,40.

Resultado final: la probabilidad es 0,40.`
      }
    },
    "ccss2-probabilidad-299098e0f0de--variant-2": {
      "a)": {
        options: ["0,115", "0,050", "0,400", "0,145"],
        correct: 0,
        solution: `Resolución:
Sea M «crédito para motocicleta» e I «crédito impagado».

P(M)=0,05, P(I|M)=0,40 y P(I|M̄)=0,10.

Por el teorema de la probabilidad total:
P(I)=P(M)·P(I|M)+P(M̄)·P(I|M̄).

P(I)=0,05·0,40+0,95·0,10
=0,020+0,095
=0,115.

Resultado final: 0,115.`
      },
      "b)": {
        options: ["frac{2}{59}≈0,0339", "frac{2}{23}≈0,0870", "0,05", "0,40"],
        correct: 0,
        solution: `Resolución:
Sea P el suceso «el crédito se ha pagado».

P(M∩P)=P(M)·P(P|M)=0,05·0,60=0,03.

P(P)=1-P(I)=1-0,115=0,885.

Aplicamos Bayes:
P(M|P)=frac{P(M∩P)}{P(P)}
=frac{0,03}{0,885}
=frac{2}{59}
≈0,0339.

Resultado final: frac{2}{59}≈0,0339.`
      }
    },
    "ccss2-probabilidad-10d8f9408628": {
      "a)": {
        options: ["0,106", "0,097", "0,010", "0,116"],
        correct: 0,
        solution: `Resolución:
Sea E «tener la enfermedad» y + «diagnóstico positivo».

P(E)=0,10, P(+|E)=0,97 y P(+|Ē)=0,01.

Por la probabilidad total:
P(+)=0,10·0,97+0,90·0,01
=0,097+0,009
=0,106.

Resultado final: 0,106.`
      },
      "b)": {
        options: ["frac{1}{298}≈0,00336", "frac{3}{106}≈0,0283", "0,03", "0,10"],
        correct: 0,
        solution: `Resolución:
P(-|E)=1-0,97=0,03.

P(E∩-)=0,10·0,03=0,003.

P(-)=1-P(+)=1-0,106=0,894.

Aplicamos Bayes:
P(E|-)=frac{P(E∩-)}{P(-)}
=frac{0,003}{0,894}
=frac{1}{298}
≈0,00336.

Resultado final: frac{1}{298}≈0,00336.`
      }
    },
    "ccss2-probabilidad-10d8f9408628--variant-2": {
      "a)": {
        options: ["frac{169}{729}≈0,2318", "frac{13}{27}≈0,4815", "frac{13}{26}=0,5", "frac{156}{702}≈0,2222"],
        correct: 0,
        solution: `Resolución:
No son de Albacete:
5+8=13 alumnos.

Como las dos entradas pueden corresponder al mismo alumno, los sorteos son con reposición:

P(no Albacete en ambas)=frac{13}{27}·frac{13}{27}
=frac{169}{729}
≈0,2318.

Resultado final: frac{169}{729}≈0,2318.`
      },
      "b)": {
        options: ["frac{1}{80730}", "frac{5}{27}", "frac{1}{65780}", "frac{120}{27⁵}"],
        correct: 0,
        solution: `Resolución:
Ahora quien obtiene una entrada deja de participar, por lo que no hay reposición.

Para que las cinco entradas sean para los cinco alumnos de Cuenca:

P=frac{5}{27}·frac{4}{26}·frac{3}{25}·frac{2}{24}·frac{1}{23}.

P=frac{120}{27·26·25·24·23}
=frac{1}{80730}.

Resultado final: frac{1}{80730}.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-estadistica-b774ab405e41": {
      "a)": {
        options: [
          "[108,53; 111,47] kg/cm²",
          "[109,26; 110,74] kg/cm²",
          "[95; 125] kg/cm²",
          "[108,04; 111,96] kg/cm²"
        ],
        correct: 0,
        solution: `Resolución:
Los datos son:
x̄=110, σ=15, n=400 y nivel de confianza 95 %.

Para un 95 % de confianza:
z_{α/2}=1,96.

El error máximo es:
E=z_{α/2}·frac{σ}{sqrt{n}}
=1,96·frac{15}{sqrt{400}}
=1,96·frac{15}{20}
=1,47.

El intervalo de confianza es:
IC=(x̄-E, x̄+E)
=(110-1,47, 110+1,47)
=(108,53, 111,47).

Resultado final: [108,53; 111,47] kg/cm².`
      },
      "b)": {
        options: [
          "Al aumentar el nivel de confianza aumenta la amplitud; al disminuirlo, disminuye",
          "Al aumentar el nivel de confianza disminuye la amplitud; al disminuirlo, aumenta",
          "El nivel de confianza no modifica la amplitud",
          "La amplitud solo depende de la media muestral"
        ],
        correct: 0,
        solution: `Resolución:
La amplitud del intervalo depende del error:
E=z_{α/2}·frac{σ}{sqrt{n}}.

Si aumenta el nivel de confianza, aumenta el valor crítico z_{α/2}; por tanto, aumenta E y el intervalo se hace más ancho.

Si disminuye el nivel de confianza, disminuye z_{α/2}; por tanto, disminuye E y el intervalo se hace más estrecho.

Resultado final: mayor confianza implica mayor amplitud; menor confianza implica menor amplitud.`
      },
      "c)": {
        options: [
          "Sí, porque 111 pertenece a [108,53; 111,47]",
          "No, porque 111 es mayor que la media muestral",
          "No, porque 111 no pertenece a [108,53; 111,47]",
          "Sí, porque cualquier valor próximo a 110 es admisible"
        ],
        correct: 0,
        solution: `Resolución:
El intervalo de confianza obtenido al 95 % es:
[108,53; 111,47].

Comprobamos si μ=111 pertenece al intervalo:
108,53<111<111,47.

Como 111 está dentro del intervalo, es un valor compatible con los datos muestrales al 95 % de confianza.

Resultado final: sí se puede admitir μ=111 kg/cm².`
      }
    },
    "ccss2-estadistica-b774ab405e41--variant-2": {
      "a)": {
        options: [
          "[59,52; 64,48] días",
          "[60,04; 63,96] días",
          "[58,74; 65,26] días",
          "[50; 71] días"
        ],
        correct: 0,
        solution: `Resolución:
Calculamos primero la media muestral:
x̄=frac{50+58+59+60+62+63+64+65+68+71}{10}
=frac{620}{10}
=62 días.

Los datos son σ=4, n=10 y nivel de confianza 95 %, por lo que z_{α/2}=1,96.

E=1,96·frac{4}{sqrt{10}}≈2,48.

IC=(62-2,48, 62+2,48)
=(59,52, 64,48).

Resultado final: [59,52; 64,48] días.`
      },
      "b)": {
        options: [
          "Aumentando el tamaño de la muestra",
          "Disminuyendo el tamaño de la muestra",
          "Aumentando la desviación típica",
          "Cambiando la media muestral"
        ],
        correct: 0,
        solution: `Resolución:
Con el mismo nivel de confianza:
E=z_{α/2}·frac{σ}{sqrt{n}}.

El valor z_{α/2} no cambia. Para disminuir la amplitud debemos disminuir E.

Al aumentar n, aumenta sqrt{n} en el denominador y el error E disminuye.

Resultado final: hay que aumentar el tamaño de la muestra.`
      },
      "c)": {
        options: [
          "Sí, porque 64 pertenece a [58,74; 65,26]",
          "No, porque 64 no pertenece a [59,52; 64,48]",
          "No, porque el intervalo al 99 % es [59,52; 64,48]",
          "Sí, porque 64 coincide con la media muestral"
        ],
        correct: 0,
        solution: `Resolución:
Para un nivel de confianza del 99 %:
z_{α/2}=2,576.

E=2,576·frac{4}{sqrt{10}}≈3,26.

IC=(62-3,26, 62+3,26)
=(58,74, 65,26).

Comprobamos:
58,74<64<65,26.

Como 64 pertenece al intervalo, es compatible con los datos al 99 % de confianza.

Resultado final: sí puede admitirse μ=64 días.`
      }
    },
    "ccss2-estadistica-7e71b97a83b5": {
      "a)": {
        options: [
          "[4,29; 7,17] horas",
          "[4,64; 6,82] horas",
          "[3,63; 7,83] horas",
          "[5,06; 6,40] horas"
        ],
        correct: 0,
        solution: `Resolución:
Calculamos la media muestral:
x̄=frac{4,2+4,6+5+5,7+5,8+5,9+6,1+6,2+6,5+7,3}{10}
=frac{57,3}{10}
=5,73 horas.

Los datos son σ=2,1, n=10 y nivel de confianza 97 %.

Para un 97 % de confianza, z_{α/2}≈2,17.

E=2,17·frac{2,1}{sqrt{10}}≈1,44.

IC=(5,73-1,44, 5,73+1,44)
=(4,29, 7,17).

Resultado final: [4,29; 7,17] horas.`
      },
      "b)": {
        options: [
          "Aumentar n o disminuir el nivel de confianza",
          "Disminuir n y aumentar el nivel de confianza",
          "Aumentar la desviación típica",
          "Aumentar la media muestral"
        ],
        correct: 0,
        solution: `Resolución:
La amplitud depende de:
E=z_{α/2}·frac{σ}{sqrt{n}}.

Para disminuirla podemos:
1. Aumentar el tamaño muestral n.
2. Disminuir el nivel de confianza, con lo que disminuye z_{α/2}.
3. Si fuera posible, reducir la variabilidad σ.

Resultado final: aumentar n o disminuir el nivel de confianza reduce la amplitud.`
      },
      "c)": {
        options: [
          "No, porque 4 no pertenece a [4,64; 6,82]",
          "Sí, porque 4 pertenece a [4,29; 7,17]",
          "Sí, porque 4 es menor que la media muestral",
          "No, porque el intervalo al 90 % es [4,29; 7,17]"
        ],
        correct: 0,
        solution: `Resolución:
Para un nivel de confianza del 90 %:
z_{α/2}=1,645.

E=1,645·frac{2,1}{sqrt{10}}≈1,09.

IC=(5,73-1,09, 5,73+1,09)
=(4,64, 6,82).

El valor 4 no pertenece al intervalo, pues 4<4,64.

Resultado final: no puede admitirse μ=4 horas al 90 % de confianza.`
      }
    },
    "ccss2-estadistica-7e71b97a83b5--variant-2": {
      "a)": {
        options: [
          "[4,804; 5,196] horas",
          "[4,80; 5,20] horas",
          "[4; 6] horas",
          "[4,902; 5,098] horas"
        ],
        correct: 0,
        solution: `Resolución:
Los datos son:
x̄=5, σ=1, n=100 y nivel de confianza 95 %.

Para un 95 % de confianza:
z_{α/2}=1,96.

E=1,96·frac{1}{sqrt{100}}
=1,96·frac{1}{10}
=0,196.

IC=(5-0,196, 5+0,196)
=(4,804, 5,196).

Resultado final: [4,804; 5,196] horas.`
      },
      "b)": {
        options: [
          "No; para aumentar la amplitud se aumenta la confianza o se reduce n, y para disminuirla se hace lo contrario",
          "Sí; 4 pertenece a [4,804; 5,196]",
          "No; la amplitud solo cambia al modificar la media",
          "Sí; cualquier valor entre 4 y 6 es admisible"
        ],
        correct: 0,
        solution: `Resolución:
El intervalo al 95 % es:
[4,804; 5,196].

Como 4<4,804, el valor μ=4 no pertenece al intervalo y no puede admitirse al 95 % de confianza.

Además:
E=z_{α/2}·frac{σ}{sqrt{n}}.

La amplitud aumenta si aumenta el nivel de confianza, aumenta σ o disminuye n.
La amplitud disminuye si disminuye el nivel de confianza, disminuye σ o aumenta n.

Resultado final: μ=4 no es admisible; la amplitud se modifica actuando sobre confianza, variabilidad o tamaño muestral.`
      },
      "c)": {
        options: ["0,193 horas", "0,196 horas", "0,1645 horas", "1,93 horas"],
        correct: 0,
        solution: `Resolución:
El nivel de confianza es 94,64 %, por lo que:
1-α=0,9464
⇒ α=0,0536
⇒ 1-frac{α}{2}=0,9732.

Buscamos 0,9732 en la tabla de la normal típica:
P(Z≤1,93)=0,9732.

Por tanto, z_{α/2}=1,93.

E=1,93·frac{1}{sqrt{100}}
=1,93·frac{1}{10}
=0,193.

Resultado final: el error máximo admisible es 0,193 horas.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-dea103e265c3": {
      "a)": {
        options: ["t=frac{3}{2}", "t=1", "t=2", "t=-frac{3}{2}"],
        correct: 0,
        solution: `Resolución:
Cada rama es continua en su intervalo. Estudiamos x=1.

Límite por la izquierda y valor de la función:
lim[x→1⁻] f(x)=f(1)=4·1-t=4-t.

Límite por la derecha:
lim[x→1⁺] f(x)=(1-2)²+t=1+t.

Para que sea continua:
4-t=1+t.

3=2t ⇒ t=frac{3}{2}.

Resultado final: t=frac{3}{2}.`
      },
      "b)": {
        options: [
          "Recta y=4x para x≤1 y parábola y=(x-2)² para x>1; hay salto en x=1",
          "Recta y=4x para x<1 y parábola y=(x-2)² para x≥1; es continua",
          "Recta y=x-4 para x≤1 y parábola y=(x+2)² para x>1",
          "Dos rectas que se cortan en (1,4)"
        ],
        correct: 0,
        solution: `Resolución:
Para t=0:
f(x)={ 4x, si x≤1
       (x-2)², si x>1 }.

Primera rama: la recta y=4x, con punto cerrado en (1,4).

Segunda rama: la parábola y=(x-2)², abierta hacia arriba, con vértice (2,0) y punto abierto en (1,1).

Como en x=1 la rama izquierda vale 4 y la derecha se aproxima a 1, existe una discontinuidad de salto.`
      }
    },
    "ccss2-analisis-13d099a797d8": {
      "Resultado": {
        options: [
          "a=frac{1}{2}, b=-3, c=-18",
          "a=-frac{1}{2}, b=3, c=18",
          "a=1, b=-6, c=-36",
          "a=frac{1}{2}, b=3, c=-18"
        ],
        correct: 0,
        solution: `Resolución:
G(x)=ax³+bx²+cx.

Derivamos:
G'(x)=3ax²+2bx+c,
G''(x)=6ax+2b.

El punto (2,-44) es de inflexión:
G''(2)=0 ⇒ 12a+2b=0 ⇒ b=-6a.

Además pertenece a la gráfica:
G(2)=-44
⇒ 8a+4b+2c=-44.

Hay un mínimo relativo en x=6:
G'(6)=0
⇒ 108a+12b+c=0.

Sustituimos b=-6a:
8a-24a+2c=-44 ⇒ c=8a-22,
108a-72a+c=0 ⇒ c=-36a.

Igualamos:
8a-22=-36a ⇒ 44a=22 ⇒ a=frac{1}{2}.

b=-6·frac{1}{2}=-3,
c=-36·frac{1}{2}=-18.

Comprobación del mínimo:
G''(6)=6·frac{1}{2}·6+2(-3)=12>0.

Resultado final: a=frac{1}{2}, b=-3, c=-18.`
      }
    },
    "ccss2-analisis-dea103e265c3--variant-2": {
      "a)": {
        options: ["t=0 o t=5", "t=0 únicamente", "t=5 únicamente", "t=-5 o t=0"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=0.

Límite por la izquierda y valor:
lim[x→0⁻] f(x)=f(0)=|0|+5t=5t.

Límite por la derecha:
lim[x→0⁺] f(x)=(0+t)²-10·0=t².

Igualamos:
5t=t² ⇒ t²-5t=0.

t(t-5)=0.

Resultado final: t=0 o t=5.`
      },
      "b)": {
        options: [
          "Mínimo relativo en (3,-5)",
          "Máximo relativo en (3,-5)",
          "Mínimo relativo en (2,-4)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
Para t=2 y x>0:
f(x)=(x+2)²-10x=x²-6x+4.

Derivamos:
f'(x)=2x-6.

f'(x)=0 ⇒ 2x-6=0 ⇒ x=3.

En la recta real:
si 0<x<3, por ejemplo x=1, f'(1)=-4<0: la función decrece.
si x>3, por ejemplo x=4, f'(4)=2>0: la función crece.

Por tanto, en x=3 hay un mínimo.

f(3)=9-18+4=-5.

Resultado final: mínimo relativo en (3,-5).`
      },
      "c)": {
        options: [
          "Decrece en (0,3) y crece en (3,+∞)",
          "Crece en (0,3) y decrece en (3,+∞)",
          "Crece en (0,+∞)",
          "Decrece en (0,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
Para x>0:
f'(x)=2x-6.

El valor que anula la derivada es x=3.

Recta de signos:
(0,3): tomamos x=1 ⇒ f'(1)=-4<0 ⇒ ↓.
(3,+∞): tomamos x=4 ⇒ f'(4)=2>0 ⇒ ↑.

Resultado final: decrece en (0,3) y crece en (3,+∞).`
      }
    },
    "ccss2-analisis-13d099a797d8--variant-2": {
      "a)": {
        options: [
          "Al inicio 18 000 socios y a los 25 años frac{55250}{3}≈18 416,67 socios",
          "Al inicio 180 socios y a los 25 años 18 000 socios",
          "Al inicio 18 000 socios y a los 25 años 66 600 socios",
          "Al inicio 10 350 socios y a los 25 años 18 000 socios"
        ],
        correct: 0,
        solution: `Resolución:
S(x) está expresada en cientos de socios.

S(0)=180 cientos=18 000 socios.

S(25)=-frac{1}{3}·25³+frac{21}{2}·25²-54·25+180
=frac{1105}{6} cientos.

Pasamos a socios:
frac{1105}{6}·100=frac{55250}{3}≈18 416,67.

Resultado final: 18 000 socios al inicio y aproximadamente 18 417 socios a los 25 años.`
      },
      "b)": {
        options: [
          "Decrece en (0,3), crece en (3,18) y decrece en (18,25)",
          "Crece en (0,3), decrece en (3,18) y crece en (18,25)",
          "Crece en todo [0,25]",
          "Decrece en (0,18) y crece en (18,25)"
        ],
        correct: 0,
        solution: `Resolución:
S'(x)=-x²+21x-54=-(x-3)(x-18).

Los valores críticos son x=3 y x=18.

Recta de signos:
(0,3): tomamos x=1 ⇒ S'(1)=-34<0 ⇒ ↓.
(3,18): tomamos x=10 ⇒ S'(10)=56>0 ⇒ ↑.
(18,25): tomamos x=20 ⇒ S'(20)=-34<0 ⇒ ↓.

Resultado final: decrece en (0,3), crece en (3,18) y decrece en (18,25).`
      },
      "c)": {
        options: [
          "Máximo a los 18 años: 66 600 socios; mínimo a los 3 años: 10 350 socios",
          "Máximo a los 3 años: 10 350 socios; mínimo a los 18 años: 66 600 socios",
          "Máximo inicial: 18 000 socios; mínimo final: 18 417 socios",
          "Máximo a los 25 años: 66 600 socios; mínimo a los 3 años: 18 000 socios"
        ],
        correct: 0,
        solution: `Resolución:
Comparamos los extremos del intervalo y los puntos críticos.

S(0)=180 cientos=18 000 socios.

S(3)=-9+frac{189}{2}-162+180=103,5 cientos=10 350 socios.

S(18)=-1944+3402-972+180=666 cientos=66 600 socios.

S(25)=frac{1105}{6} cientos≈18 417 socios.

Resultado final: el máximo se alcanza a los 18 años, con 66 600 socios; el mínimo se alcanza a los 3 años, con 10 350 socios.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-e4e79f1e69e8": {
      "a)": {
        options: [
          "Minimizar F(x,y)=-x+6y con x+7y≤58, 4x+5y≥48 y 3x-2y≤13",
          "Maximizar F(x,y)=-x+6y con x+7y≥58, 4x+5y≤48 y 3x-2y≥13",
          "Minimizar F(x,y)=x+6y con x+7y≤58, 4x+5y≥48 y 3x-2y≤13",
          "Minimizar F(x,y)=-x-6y con x+7y≤58, 4x+5y≥48 y 3x-2y≤13"
        ],
        correct: 0,
        solution: `Resolución:
La función objetivo es:
F(x,y)=-x+6y, que debemos minimizar.

Las restricciones son:
x+7y≤58,
4x+5y≥48,
3x-2y≤13.

La región factible es la intersección de los tres semiplanos.`
      },
      "b)": {
        options: [
          "Vértices: (2,8), (9,7) y (7,4)",
          "Vértices: (2,8), (7,9) y (4,7)",
          "Vértices: (8,2), (9,7) y (7,4)",
          "Vértices: (2,8), (9,7) y (4,7)"
        ],
        correct: 0,
        solution: `Resolución:
Calculamos las intersecciones de las rectas frontera.

x+7y=58 y 4x+5y=48:
x=58-7y.
4(58-7y)+5y=48 ⇒ -23y=-184 ⇒ y=8, x=2.

x+7y=58 y 3x-2y=13:
x=58-7y.
3(58-7y)-2y=13 ⇒ -23y=-161 ⇒ y=7, x=9.

4x+5y=48 y 3x-2y=13:
8x+10y=96,
15x-10y=65.
23x=161 ⇒ x=7, y=4.

Los vértices son (2,8), (9,7) y (7,4).`
      },
      "c)": {
        options: [
          "Mínimo en (7,4), con valor 17",
          "Mínimo en (2,8), con valor 46",
          "Mínimo en (9,7), con valor 33",
          "Mínimo en (7,4), con valor 31"
        ],
        correct: 0,
        solution: `Resolución:
Evaluamos F(x,y)=-x+6y en los vértices:
F(2,8)=-2+48=46.
F(9,7)=-9+42=33.
F(7,4)=-7+24=17.

Resultado final: el mínimo es 17 y se alcanza en (7,4).`
      }
    },
    "ccss2-algebra-e72cb3617832": {
      "a)": {
        options: [
          "{b+t=3r; t+r=b+40; b+t+r=280}",
          "{b+t=r/3; t+r=b-40; b+t+r=280}",
          "{b+t=3r; t+r=b+40; b+t-r=280}",
          "{b+t=3r; t-r=b+40; b+t+r=280}"
        ],
        correct: 0,
        solution: `Resolución:
Sean b, t y r las botellas de vino blanco, tinto y rosado.

Blanco más tinto triplica al rosado:
b+t=3r.

Tinto más rosado supera en 40 al blanco:
t+r=b+40.

En total hay 280 botellas:
b+t+r=280.

El sistema es:
{ b+t=3r
  t+r=b+40
  b+t+r=280 }.`
      },
      "b)": {
        options: [
          "120 de blanco, 90 de tinto y 70 de rosado",
          "90 de blanco, 120 de tinto y 70 de rosado",
          "120 de blanco, 70 de tinto y 90 de rosado",
          "70 de blanco, 90 de tinto y 120 de rosado"
        ],
        correct: 0,
        solution: `Resolución:
De b+t=3r y b+t+r=280:
3r+r=280 ⇒ r=70.

Entonces:
b+t=210.

De t+r=b+40:
t+70=b+40 ⇒ b=t+30.

Sustituimos:
t+30+t=210 ⇒ 2t=180 ⇒ t=90.

b=90+30=120.

Resultado final: 120 botellas de blanco, 90 de tinto y 70 de rosado.`
      }
    },
    "ccss2-algebra-e4e79f1e69e8--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "Se pueden efectuar A·B, A·C y C·D; no se puede efectuar A·D",
          "Sólo se pueden efectuar A·B y A·D",
          "Se pueden efectuar los cuatro productos",
          "Sólo se puede efectuar C·D"
        ],
        correct: 0,
        solution: `Resolución:
A tiene dimensión 2×3.
B tiene dimensión 3×2.
C tiene dimensión 3×1.
D tiene dimensión 1×3.

Un producto M·N existe cuando el número de columnas de M coincide con el número de filas de N.

A·B: (2×3)(3×2), sí existe; resultado 2×2.
A·C: (2×3)(3×1), sí existe; resultado 2×1.
A·D: (2×3)(1×3), no existe, porque 3≠1.
C·D: (3×1)(1×3), sí existe; resultado 3×3.

Resultado final: existen A·B, A·C y C·D; no existe A·D.`
      },
      "b)": {
        options: [
          "A·B=[[8,-2],[3,-3]] y C·D=[[0,-4,12],[0,4,-12],[0,-1,3]]",
          "A·B=[[-8,2],[-3,3]] y C·D=[[0,4,-12],[0,-4,12],[0,1,-3]]",
          "A·B=[[8,2],[3,3]] y C·D=[[0,-4,12],[0,4,-12],[0,-1,3]]",
          "A·B=[[8,-2],[3,-3]] y A·C es la única matriz cuadrada"
        ],
        correct: 0,
        solution: `Resolución:
Los productos con resultado cuadrado son A·B y C·D.

A·B=
[[-1,-2,0],[3,0,3]]·[[2,2],[-5,0],[-1,-3]]
=[[(-1)·2+(-2)·(-5)+0·(-1), (-1)·2+(-2)·0+0·(-3)],
  [3·2+0·(-5)+3·(-1), 3·2+0·0+3·(-3)]]
=[[8,-2],[3,-3]].

C·D=
[[4],[-4],[1]]·[[0,-1,3]]
=[[0,-4,12],[0,4,-12],[0,-1,3]].

Resultado final:
A·B=[[8,-2],[3,-3]],
C·D=[[0,-4,12],[0,4,-12],[0,-1,3]].`
      }
    },
    "ccss2-algebra-e72cb3617832--ccss-ii-algebra-2": {
      "a)": {
        options: [
          "{g+d+h=100; d-g=h/2; g-h=d/3}",
          "{g+d+h=100; d+g=h/2; g+h=d/3}",
          "{g+d+h=100; d-g=2h; g-h=3d}",
          "{g+d-h=100; d-g=h/2; g-h=d/3}"
        ],
        correct: 0,
        solution: `Resolución:
Sean g, d y h los coches de gasolina, diésel e híbridos.

En total hay 100 coches:
g+d+h=100.

Los diésel superan a los de gasolina en la mitad de los híbridos:
d-g=frac{h}{2}.

Los de gasolina superan a los híbridos en la tercera parte de los diésel:
g-h=frac{d}{3}.

El sistema es:
{ g+d+h=100
  d-g=h/2
  g-h=d/3 }.`
      },
      "b)": {
        options: [
          "35 de gasolina, 45 diésel y 20 híbridos",
          "45 de gasolina, 35 diésel y 20 híbridos",
          "35 de gasolina, 20 diésel y 45 híbridos",
          "20 de gasolina, 45 diésel y 35 híbridos"
        ],
        correct: 0,
        solution: `Resolución:
Eliminamos denominadores:
{ g+d+h=100
  -2g+2d-h=0
  3g-d-3h=0 }.

De la segunda:
h=2d-2g.

De la tercera:
d=3g-3h.

Sustituimos h=2d-2g en la suma:
g+d+2d-2g=100 ⇒ 3d-g=100.

Sustituimos h en la tercera:
3g-d-3(2d-2g)=0
⇒ 9g-7d=0.

Resolvemos:
g=3d-100.
9(3d-100)-7d=0
⇒ 20d=900 ⇒ d=45.

g=35 y h=100-35-45=20.

Resultado final: 35 de gasolina, 45 diésel y 20 híbridos.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-09d75cfb87d5": {
      "a)": {
        options: ["t=-1 o t=2", "t=1 o t=-2", "t=2 únicamente", "t=-1 únicamente"],
        correct: 0,
        solution: `Resolución:
En x=0:

Límite por la izquierda y valor:
lim[x→0⁻] f(x)=f(0)=|0+2|+t=2+t.

Límite por la derecha:
lim[x→0⁺] f(x)=(0-t)²=t².

Para que sea continua:
2+t=t².

t²-t-2=0.

(t-2)(t+1)=0.

Resultado final: t=2 o t=-1.`
      },
      "b)": {
        options: [
          "Para t=3 tiene un mínimo relativo en (3,0)",
          "Para t=3 tiene un máximo relativo en (3,0)",
          "Para t=3 tiene un mínimo relativo en (0,9)",
          "Para t=3 no tiene extremos"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3 y x>0:
f(x)=(x-3)².

Derivamos:
f'(x)=2(x-3).

f'(x)=0 ⇒ x=3.

Recta de signos:
(0,3): tomamos x=1 ⇒ f'(1)=-4<0 ⇒ ↓.
(3,+∞): tomamos x=4 ⇒ f'(4)=2>0 ⇒ ↑.

Por tanto, hay un mínimo relativo en x=3.

f(3)=0.

Resultado final: mínimo relativo en (3,0).`
      },
      "c)": {
        options: [
          "Decrece en (0,3) y crece en (3,+∞)",
          "Crece en (0,3) y decrece en (3,+∞)",
          "Crece en (0,+∞)",
          "Decrece en (0,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3 y x>0:
f'(x)=2(x-3).

Se anula en x=3.

Recta de signos:
(0,3): f'(1)=-4<0 ⇒ la función decrece.
(3,+∞): f'(4)=2>0 ⇒ la función crece.

Resultado final: decrece en (0,3) y crece en (3,+∞).`
      }
    },
    "ccss2-analisis-693030354d37": {
      "Resultado": {
        options: [
          "a=-3, b=10, c=0",
          "a=3, b=-10, c=0",
          "a=-3, b=10, c=7",
          "a=7, b=-3, c=10"
        ],
        correct: 0,
        solution: `Resolución:
f(x)=ax⁵+bx³+c.

Como (0,0) pertenece a la gráfica:
f(0)=c=0.

Derivamos dos veces:
f'(x)=5ax⁴+3bx²,
f''(x)=20ax³+6bx.

Como x=1 es abscisa de un punto de inflexión:
f''(1)=0
⇒ 20a+6b=0
⇒ 10a+3b=0.

Además, (1,7) pertenece a la gráfica:
f(1)=a+b+c=7.

Como c=0:
a+b=7.

Resolvemos el sistema:
{ 10a+3b=0
  a+b=7 }.

De b=7-a:
10a+3(7-a)=0
⇒ 7a+21=0
⇒ a=-3.

b=7-(-3)=10.

Resultado final: a=-3, b=10 y c=0.`
      }
    },
    "ccss2-analisis-09d75cfb87d5--variant-2": {
      "a)": {
        options: ["t=5", "t=3", "t=4", "t=-5"],
        correct: 0,
        solution: `Resolución:
Estudiamos la continuidad en x=-1.

Límite por la izquierda:
lim[x→-1⁻] f(x)=-1+t.

Límite por la derecha y valor:
lim[x→-1⁺] f(x)=f(-1)=4.

Igualamos:
-1+t=4.

Resultado final: t=5.`
      },
      "b)": {
        options: [
          "Para t=3: y=x+3 si x<-1; y=4 si -1≤x≤1; y=(x-4)²-5 si x>1",
          "Para t=3: y=x+5 si x<-1; y=4 si -1≤x≤1; y=(x-4)²-5 si x>1",
          "Para t=3 las tres ramas forman una función continua",
          "Para t=3: y=x+3 si x≤-1; y=4 si -1<x<1; y=(x+4)²-5 si x≥1"
        ],
        correct: 0,
        solution: `Resolución:
Para t=3:
f(x)={ x+3, si x<-1
       4, si -1≤x≤1
       (x-4)²-5, si x>1 }.

Primera rama: recta y=x+3, con punto abierto en (-1,2).

Segunda rama: segmento horizontal y=4 desde x=-1 hasta x=1, con extremos cerrados.

Tercera rama: parábola y=(x-4)²-5, abierta hacia arriba, con vértice (4,-5). En x=1 toma el valor límite 4, pero la rama es abierta en (1,4).

Hay discontinuidad de salto en x=-1. En x=1 las ramas enlazan con el mismo valor 4.`
      }
    },
    "ccss2-analisis-693030354d37--variant-2": {
      "a)": {
        options: [
          "Valor inicial 40 mg/l y valor final 22 mg/l",
          "Valor inicial 22 mg/l y valor final 40 mg/l",
          "Valor inicial 40 mg/l y valor final frac{130}{3} mg/l",
          "Valor inicial frac{22}{3} mg/l y valor final 22 mg/l"
        ],
        correct: 0,
        solution: `Resolución:
f(x)=frac{1}{3}x³-4x²+7x+40.

Valor inicial:
f(0)=40 mg/l.

Valor final:
f(9)=frac{1}{3}·9³-4·9²+7·9+40
=243-324+63+40
=22 mg/l.

Resultado final: 40 mg/l al inicio y 22 mg/l a las 9 horas.`
      },
      "b)": {
        options: [
          "Crece en (0,1), decrece en (1,7) y crece en (7,9)",
          "Decrece en (0,1), crece en (1,7) y decrece en (7,9)",
          "Crece en (0,7) y decrece en (7,9)",
          "Decrece en todo [0,9]"
        ],
        correct: 0,
        solution: `Resolución:
Derivamos:
f'(x)=x²-8x+7=(x-1)(x-7).

Los puntos críticos son x=1 y x=7.

Recta de signos:
(0,1): tomamos x=0,5 ⇒ f'(0,5)>0 ⇒ ↑.
(1,7): tomamos x=4 ⇒ f'(4)=-9<0 ⇒ ↓.
(7,9): tomamos x=8 ⇒ f'(8)=7>0 ⇒ ↑.

Resultado final: crece en (0,1), decrece en (1,7) y crece en (7,9).`
      },
      "c)": {
        options: [
          "Máximo a la hora 1: frac{130}{3} mg/l; mínimo a la hora 7: frac{22}{3} mg/l",
          "Máximo a la hora 7: frac{130}{3} mg/l; mínimo a la hora 1: frac{22}{3} mg/l",
          "Máximo a la hora 0: 40 mg/l; mínimo a la hora 9: 22 mg/l",
          "Máximo a la hora 1: 40 mg/l; mínimo a la hora 7: 22 mg/l"
        ],
        correct: 0,
        solution: `Resolución:
Comparamos los extremos del intervalo y los puntos críticos.

f(0)=40.

f(1)=frac{1}{3}-4+7+40=frac{130}{3}.

f(7)=frac{343}{3}-196+49+40=frac{22}{3}.

f(9)=22.

El mayor valor es frac{130}{3} y el menor es frac{22}{3}.

Resultado final: máximo a la hora 1, con frac{130}{3} mg/l; mínimo a la hora 7, con frac{22}{3} mg/l.`
      }
    }
  });
})();
