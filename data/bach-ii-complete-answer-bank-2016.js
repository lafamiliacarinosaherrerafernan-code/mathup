(function () {
  "use strict";

  window.MATES_II_EXAM_ANSWERS = window.MATES_II_EXAM_ANSWERS || {};
  window.CCSS_II_EXAM_ANSWERS = window.CCSS_II_EXAM_ANSWERS || {};

  const part = (label, paragraphs) => ({ label, paragraphs });
  const copy = (paragraphs) => (paragraphs || []).map((paragraph) => ({ ...paragraph }));
  const mates = (block) => (window.MATES_II_BLOCK_EXERCISES?.[block] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2016"));

  const algJuneA = mates("algebra").find((e) => e.id === "mates2-algebra-5a35742f62f7");
  if (algJuneA?.parts?.length === 1) algJuneA.parts.unshift(part("a)", copy(algJuneA.statement)));
  const algSeptB = mates("algebra").find((e) => e.id === "mates2-algebra-482944bc7c57");
  if (algSeptB?.parts?.length === 2) algSeptB.parts.unshift(part("a)", copy(algSeptB.statement)));

  const anJuneA = mates("analisis").find((e) => e.id === "mates2-analisis-4cacabd64080");
  if (anJuneA?.parts?.length === 2) {
    const p = anJuneA.parts[1].paragraphs;
    const cut = p.findIndex((x) => /2\.º|Calcula la integral/i.test(String(x.plain || "")));
    const integral = cut >= 0 ? p.splice(cut) : [];
    anJuneA.parts[0].label = "1A a)";
    anJuneA.parts[1].label = "1A b)";
    anJuneA.parts.push(part("2A", integral));
  }

  const anJuneB = mates("analisis").find((e) => e.id === "mates2-analisis-fe57f198d5f9");
  if (anJuneB?.parts?.length === 3) {
    const mixed = anJuneB.parts[1].paragraphs;
    const cut = mixed.findIndex((x) => /2\.º|Calcula el área/i.test(String(x.plain || "")));
    const area = cut >= 0 ? mixed.splice(cut) : [];
    anJuneB.parts.unshift(part("1B a)", copy(anJuneB.statement)));
    anJuneB.parts[1].label = "1B b)";
    anJuneB.parts[2].label = "1B c)";
    anJuneB.parts.splice(3, 0, part("2B a)", area));
    anJuneB.parts[4].label = "2B b)";
  }

  const anSeptA = mates("analisis").find((e) => e.id === "mates2-analisis-dede61de18f2");
  if (anSeptA?.parts?.length === 2) {
    anSeptA.parts.unshift(part("1A", [copy(anSeptA.statement)[0]]));
    anSeptA.parts[1].label = "2A a)";
    anSeptA.parts[2].label = "2A b)";
  }

  const anSeptB = mates("analisis").find((e) => e.id === "mates2-analisis-042bc96d2d11");
  if (anSeptB?.parts?.length === 4) {
    const mixed = anSeptB.parts[1].paragraphs;
    const cut = mixed.findIndex((x) => /2\.º|Dadas las funciones/i.test(String(x.plain || "")));
    const setup = cut >= 0 ? mixed.splice(cut) : [];
    anSeptB.parts[0].label = "1B a)";
    anSeptB.parts[1].label = "1B b)";
    anSeptB.parts[2].label = "2B a)";
    anSeptB.parts[2].paragraphs = [...setup, ...anSeptB.parts[2].paragraphs];
    anSeptB.parts[3].label = "2B b)";
  }

  const ccss = (block) => (window.CCSS_II_BLOCK_EXERCISES?.[block] || [])
    .filter((exercise) => String(exercise.source || "").startsWith("2016"));
  const ccssAlg = ccss("algebra");
  [
    [2, "ccss2-algebra-54e42b632dc8-botijos"],
    [3, "ccss2-algebra-3cdd1c0ab1cd-frutos"],
    [6, "ccss2-algebra-c7f1e8e27894-conmutan"],
    [7, "ccss2-algebra-922108cb6e0a-acciones"]
  ].forEach(([index, id]) => {
    if (ccssAlg[index]) ccssAlg[index].id = id;
  });
  const ccssAn = ccss("analisis");
  [
    [2, "ccss2-analisis-7ebbb79fdbc4-trozosa"],
    [3, "ccss2-analisis-949a227e8695-insectos"],
    [6, "ccss2-analisis-750dd9914138-trozosb"],
    [7, "ccss2-analisis-d7d531d9b22d-globo-b"]
  ].forEach(([index, id]) => {
    if (ccssAn[index]) ccssAn[index].id = id;
  });
  const ccssProb = ccss("probabilidad");
  if (ccssProb[1]) ccssProb[1].id = "ccss2-probabilidad-d2bc283c690d-maquinas";
  if (ccssProb[3]) ccssProb[3].id = "ccss2-probabilidad-7839d80993f9-futbolistas";
  const ccssStats = ccss("estadistica");
  if (ccssStats[1]) ccssStats[1].id = "ccss2-estadistica-eaab54f09315-paeg";
  if (ccssStats[3]) ccssStats[3].id = "ccss2-estadistica-cf86da2fbcb0-agua";

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-algebra-5a35742f62f7": {
      "a)": {
        options: ["Si m≠1 es SCD; si m=1 es SCI", "Si m=1 es incompatible; en otro caso SCI", "Es SCD para todo m", "Es incompatible para todo m"],
        correct: 0,
        solution: `Resolución:
La matriz de coeficientes es A=pmatrix{1&-1&m\\4&-3&2\\-m&1&-1}.
Calculamos det(A)=-3(m-1)^2.
Si m≠1, det(A)≠0 y el sistema es compatible determinado.
Si m=1, al reducir la matriz ampliada no aparece ninguna fila contradictoria y rango(A)=rango(A^*)=2<3.
Por Rouché-Frobenius, para m=1 el sistema es compatible indeterminado.
Resultado: m≠1, SCD; m=1, SCI.`
      },
      "b)": {
        options: ["(x,y,z)=(1+t,1+2t,t), t∈R", "(x,y,z)=(t,1+t,1+2t), t∈R", "(x,y,z)=(1-t,1-2t,t), t∈R", "(x,y,z)=(1,1,0)"],
        correct: 0,
        solution: `Resolución:
Para m=1 queda system{x-y+z=0;4x-3y+2z=1;-x+y-z=0}.
La tercera ecuación es la opuesta de la primera. Tomamos z=t.
Las dos ecuaciones independientes son x-y=-t y 4x-3y=1-2t.
Restando tres veces la primera a la segunda: x=1+t.
Entonces y=x+t=1+2t.
Resultado: (x,y,z)=(1+t,1+2t,t), t∈R.`
      }
    },
    "mates2-algebra-e5c000caf053": {
      "Resultado": {
        options: ["|M|=14 y |N|=-150", "|M|=70 y |N|=-30", "|M|=-14 y |N|=150", "|M|=14 y |N|=150"],
        correct: 0,
        solution: `Resolución:
Partimos de |D|=10. Las sumas de múltiplos de otras filas o columnas no cambian el determinante.
Al reducir M a D y extraer los factores comunes resulta |M|=frac{7}{5}|D|=14.
En N desarrollamos por las filas y columnas con ceros; los factores extraídos dan 15 y la permutación cambia el signo:
|N|=-15|D|=-150.
Resultado: |M|=14 y |N|=-150.`
      }
    },
    "mates2-algebra-1214104fc2e7": {
      "a)": {
        options: ["2×3", "3×2", "2×2", "3×3"],
        correct: 0,
        solution: `Resolución:
A es 2×2 y B es 3×3. Para que A·X exista, X debe tener 2 filas; para que X·B exista, debe tener 3 columnas.
Resultado: X es 2×3.`
      },
      "b)": {
        options: ["X=A^{-1}(D-C)B^{-1}", "X=B^{-1}(D-C)A^{-1}", "X=A(D-C)B", "X=(D-C)A^{-1}B^{-1}"],
        correct: 0,
        solution: `Resolución:
A·X·B+C=D ⇒ A·X·B=D-C.
Multiplicamos por A^{-1} a la izquierda: X·B=A^{-1}(D-C).
Multiplicamos por B^{-1} a la derecha:
X=A^{-1}(D-C)B^{-1}.
El orden debe conservarse porque el producto matricial no es conmutativo.`
      },
      "c)": {
        options: ["X=pmatrix{2&-2&-1\\3&0&2}", "X=pmatrix{2&3\\-2&0\\-1&2}", "X=pmatrix{-2&2&1\\-3&0&-2}", "X=pmatrix{1&-2&2\\2&0&3}"],
        correct: 0,
        solution: `Resolución:
Usamos X=A^{-1}(D-C)B^{-1}.
Calculamos las inversas mediante determinantes:
A^{-1}=frac{1}{det(A)}Adj(A^T), B^{-1}=frac{1}{det(B)}Adj(B^T).
Sustituimos, calculamos D-C y efectuamos los productos en ese orden:
X=pmatrix{2&-2&-1\\3&0&2}.
Comprobación: A·X·B+C=D.`
      }
    },
    "mates2-algebra-482944bc7c57": {
      "a)": {
        options: ["Compatible si rango(A)=rango(A*); determinado si además coincide con el número de incógnitas", "Compatible solo si det(A)=0", "Incompatible si los rangos son iguales", "Determinado siempre que haya más incógnitas que ecuaciones"],
        correct: 0,
        solution: `Resolución:
Rouché-Frobenius: un sistema es compatible si y solo si rango(A)=rango(A^*).
Si el rango común coincide con el número de incógnitas, es compatible determinado; si es menor, compatible indeterminado.
Si rango(A)≠rango(A^*), es incompatible.`
      },
      "b)": {
        options: ["No puede ser SCD porque rango(A)≤3<4", "Siempre es SCD", "Siempre es incompatible", "Solo es SCD si el determinante vale cero"],
        correct: 0,
        solution: `Resolución:
Hay tres ecuaciones y cuatro incógnitas, luego rango(A)≤3.
Para ser compatible determinado necesitaríamos rango(A)=rango(A^*)=4, lo cual es imposible.
Resultado: nunca puede ser compatible determinado.`
      },
      "c)": {
        options: ["Es incompatible si a≠5", "Es incompatible si a=5", "Nunca es incompatible", "Es incompatible para todo a"],
        correct: 0,
        solution: `Resolución:
En la matriz de coeficientes F_3=3F_1-F_2.
Los términos independientes deben cumplir la misma relación: a=3·2-1=5.
Si a=5, rango(A)=rango(A^*) y es SCI.
Si a≠5, rango(A^*)>rango(A) y es incompatible.
Resultado: incompatible para a≠5.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-algebra-54e42b632dc8": {
      "a)": {
        options: [
          "pmatrix{0&-9&-3\\-8&0&-4\\6&-3&2}",
          "pmatrix{0&9&3\\8&0&4\\-6&3&-2}",
          "pmatrix{3&-3\\4&0\\-2&-1}",
          "pmatrix{-2&0&-1\\-2&3&0}"
        ],
        correct: 0,
        solution: `Resolución:
Primero restamos:
A-B=pmatrix{3&-3\\4&0\\-2&-1}.
La transpuesta es:
C^T=pmatrix{-2&0&-1\\-2&3&0}.
Multiplicamos fila por columna:
(A-B)C^T=pmatrix{0&-9&-3\\-8&0&-4\\6&-3&2}.`
      },
      "b)": {
        options: ["M no es cuadrada y det(N)=0", "Ambas tienen determinante 1", "M tiene determinante 0 y N no es cuadrada", "Las dos son matrices identidad"],
        correct: 0,
        solution: `Resolución:
M tiene dimensión 2×3. Solo las matrices cuadradas pueden tener inversa, luego M no es invertible.
N es cuadrada 3×3, pero:
det(N)=0.
Una matriz cuadrada tiene inversa si y solo si su determinante es distinto de cero.
Resultado: ninguna de las dos tiene inversa.`
      }
    },
    "ccss2-algebra-3cdd1c0ab1cd": {
      "a)": {
        options: [
          "system{h+e+m=100;h=3(e+m);h-e=6m}",
          "system{h+e+m=100;e=3(h+m);h-m=6e}",
          "system{h+e+m=1;h=e+m;h-e=m}",
          "system{h+e+m=100;h=6(e+m);h-e=3m}"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos h, e y m a los porcentajes de harina, huevo y miel.
La suma de porcentajes es h+e+m=100.
El porcentaje de harina es el triple de la suma de los otros dos: h=3(e+m).
La diferencia entre harina y huevo es seis veces la miel: h-e=6m.
El sistema es system{h+e+m=100;h=3(e+m);h-e=6m}.`
      },
      "b)": {
        options: ["75% harina, 15% huevo y 10% miel", "60% harina, 30% huevo y 10% miel", "75% harina, 10% huevo y 15% miel", "50% harina, 25% huevo y 25% miel"],
        correct: 0,
        solution: `Resolución:
De h=3(e+m) y h+e+m=100:
4(e+m)=100 ⇒ e+m=25 y h=75.
Sustituimos en h-e=6m:
75-e=6m.
Como e=25-m:
75-(25-m)=6m ⇒ 50=5m ⇒ m=10.
Entonces e=15.
Resultado: 75% harina, 15% huevo y 10% miel.`
      }
    },
    "ccss2-algebra-54e42b632dc8-botijos": {
      "a)": {
        options: ["B(x,y)=6x+18y", "B(x,y)=x+2y", "B(x,y)=10x+10y", "B(x,y)=18x+6y"],
        correct: 0,
        solution: `Resolución:
Sea x el número de botijos e y el número de jarrones.
Cada botijo aporta 6 € y cada jarrón 18 €.
La función objetivo que se quiere maximizar es B(x,y)=6x+18y.`
      },
      "b)": {
        options: [
          "0≤x≤10, 0≤y≤10, x+2y≤24",
          "x≥10, y≥10, x+2y≥24",
          "x+y≤10, 2x+y≤24",
          "0≤x≤24, 0≤y≤24"
        ],
        correct: 0,
        solution: `Resolución:
Las restricciones son:
system{0≤x≤10;0≤y≤10;x+2y≤24}.
El recinto factible está en el primer cuadrante, limitado por x=10, y=10 y x+2y=24.
Sus vértices son (0,0), (10,0), (10,7), (4,10) y (0,10).`
      },
      "c)": {
        options: ["4 botijos y 10 jarrones; 204 €", "10 botijos y 7 jarrones; 186 €", "10 botijos y 10 jarrones; 240 €", "0 botijos y 10 jarrones; 180 €"],
        correct: 0,
        solution: `Resolución:
Evaluamos B=6x+18y en los vértices:
B(0,0)=0; B(10,0)=60; B(10,7)=186; B(4,10)=204; B(0,10)=180.
El mayor valor es 204.
Resultado: debe decorar 4 botijos y 10 jarrones; beneficio máximo 204 €.`
      }
    },
    "ccss2-algebra-3cdd1c0ab1cd-frutos": {
      "a)": {
        options: [
          "system{a+h+p=9;6a+16h+10p=90;h+p=2a}",
          "system{a+h+p=90;6a+16h+10p=9;h+p=a}",
          "system{a+h+p=9;6a+10h+16p=90;a+p=2h}",
          "system{a+h+p=9;a+h+p=90;h=2a+p}"
        ],
        correct: 0,
        solution: `Resolución:
Llamamos a, h y p a los kg de almendras, avellanas y cacahuetes.
Peso: a+h+p=9.
Precio: 6a+16h+10p=90.
Condición: h+p=2a.
Ese es el sistema pedido.`
      },
      "b)": {
        options: ["3 kg de almendras, 2 de avellanas y 4 de cacahuetes", "2, 3 y 4 kg", "4, 2 y 3 kg", "3 kg de cada uno"],
        correct: 0,
        solution: `Resolución:
De h+p=2a y a+h+p=9:
3a=9 ⇒ a=3.
Entonces h+p=6.
En el precio: 18+16h+10p=90.
Como p=6-h:
18+16h+60-10h=90 ⇒ 6h=12 ⇒ h=2.
p=4.
Resultado: (a,h,p)=(3,2,4) kg.`
      }
    },
    "ccss2-algebra-c7f1e8e27894": {
      "a)": {
        options: ["T(x,y)=x+y", "T(x,y)=2x+y", "T(x,y)=xy", "T(x,y)=x-y"],
        correct: 0,
        solution: `Resolución:
Sea x el número de vacas e y el número de caballos.
Tarda una hora por cada animal, así que el tiempo diario es T(x,y)=x+y horas.
La función debe minimizarse.`
      },
      "b)": {
        options: [
          "4≤x≤8, 2≤y≤5, x≥2y",
          "0≤x≤4, 0≤y≤2, x≤2y",
          "x≥8, y≥5, x=2y",
          "4≤x≤8, 2≤y≤5, x≤2y"
        ],
        correct: 0,
        solution: `Resolución:
Las condiciones se traducen en:
system{4≤x≤8;2≤y≤5;x≥2y}.
El recinto factible es la parte del rectángulo [4,8]×[2,5] situada por debajo de y=x/2.`
      },
      "c)": {
        options: ["4 vacas y 2 caballos; 6 horas", "8 vacas y 5 caballos; 13 horas", "6 vacas y 3 caballos; 9 horas", "4 vacas y 5 caballos; 9 horas"],
        correct: 0,
        solution: `Resolución:
Evaluamos T=x+y en los vértices del recinto.
El menor valor se alcanza en (4,2), que cumple x=2y.
T(4,2)=4+2=6.
Resultado: 4 vacas y 2 caballos, en 6 horas.`
      }
    },
    "ccss2-algebra-922108cb6e0a": {
      "a)": {
        options: [
          "system{5a+3h+2p=98;h-p=a;a+h+p=32}",
          "system{5a+3h+2p=32;h+p=a;a+h+p=98}",
          "system{a+h+p=98;h-a=p;5a+3h+2p=32}",
          "system{5a+3h+2p=98;h-a=p;a+h+p=3}"
        ],
        correct: 0,
        solution: `Resolución:
Sean a, h y p los precios por kg.
La compra da 5a+3h+2p=98.
La diferencia indicada da h-p=a.
Un kg de cada uno cuesta 32: a+h+p=32.
Ese es el sistema.`
      },
      "b)": {
        options: ["6 €/kg, 16 €/kg y 10 €/kg", "10, 16 y 6 €/kg", "6, 10 y 16 €/kg", "8, 14 y 10 €/kg"],
        correct: 0,
        solution: `Resolución:
De h-p=a, h=a+p.
En a+h+p=32: 2a+2p=32 ⇒ a+p=16 y h=16.
En la primera: 5a+48+2p=98 ⇒ 5a+2p=50.
Como p=16-a:
5a+32-2a=50 ⇒ 3a=18 ⇒ a=6.
p=10 y h=16.
Resultado: almendras 6, avellanas 16 y cacahuetes 10 €/kg.`
      }
    },
    "ccss2-algebra-c7f1e8e27894-conmutan": {
      "Resultado": {
        options: ["k=2", "k=-2", "k=0", "k=6"],
        correct: 0,
        solution: `Resolución:
Calculamos:
AB=pmatrix{-12-k&0\\-4+2k&-14},
BA=pmatrix{-14&0\\3k-6&-k-12}.
Para que AB=BA igualamos las entradas correspondientes:
-12-k=-14 ⇒ k=2.
Las demás entradas también se igualan para k=2.
Resultado: k=2.`
      }
    },
    "ccss2-algebra-922108cb6e0a-acciones": {
      "a)": {
        options: [
          "system{85a+100b+70c=7000;c=2a;b=a+5}",
          "system{85a+100b+70c=7000;a=2c;b=c+5}",
          "system{a+b+c=7000;c=2b;b=a+5}",
          "system{85a+100b+70c=7000;c=a+2;b=5a}"
        ],
        correct: 0,
        solution: `Resolución:
Sean a,b,c los valores de una acción de A,B,C.
El coste total es 85a+100b+70c=7000.
Además c=2a y b=a+5.
Ese es el sistema pedido.`
      },
      "b)": {
        options: ["A=20 €, B=25 €, C=40 €", "A=25 €, B=20 €, C=50 €", "A=20 €, B=40 €, C=25 €", "A=15 €, B=20 €, C=30 €"],
        correct: 0,
        solution: `Resolución:
Sustituimos b=a+5 y c=2a:
85a+100(a+5)+70(2a)=7000.
325a+500=7000 ⇒ 325a=6500 ⇒ a=20.
b=25 y c=40.
Resultado: A=20 €, B=25 €, C=40 €.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-probabilidad-d2bc283c690d": {
      "a)": {
        options: ["0,011", "0,03", "0,015", "0,0011"],
        correct: 0,
        solution: `Resolución:
Por la probabilidad total:
P(D)=P(A)P(D|A)+P(B)P(D|B)
=0,10·0,02+0,90·0,01
=0,002+0,009=0,011.`
      },
      "b)": {
        options: ["2/11≈0,1818", "9/11≈0,8182", "0,10", "0,02"],
        correct: 0,
        solution: `Resolución:
Aplicamos Bayes:
P(A|D)=frac{P(A)P(D|A)}{P(D)}
=frac{0,10·0,02}{0,011}
=frac{0,002}{0,011}=frac{2}{11}≈0,1818.`
      }
    },
    "ccss2-probabilidad-d2bc283c690d-maquinas": {
      "a)": {
        options: ["0,0001", "0,001", "0,1", "0,4"],
        correct: 0,
        solution: `Resolución:
Como las cuatro máquinas funcionan de forma independiente:
P(las cuatro se averían)=0,1^4=0,0001.`
      },
      "b)": {
        options: ["0,6561", "0,9", "0,3439", "0,0001"],
        correct: 0,
        solution: `Resolución:
Una máquina no se avería con probabilidad 1-0,1=0,9.
Por independencia:
P(ninguna avería)=0,9^4=0,6561.`
      },
      "c)": {
        options: ["0,3439", "0,6561", "0,4", "0,0001"],
        correct: 0,
        solution: `Resolución:
Usamos el suceso contrario:
P(al menos una avería)=1-P(ninguna)
=1-0,6561=0,3439.`
      }
    },
    "ccss2-probabilidad-7839d80993f9": {
      "a)": {
        options: ["0,925", "0,075", "0,80", "0,94"],
        correct: 0,
        solution: `Resolución:
Aprobaron 80-6=74 alumnos.
P(aprobado)=frac{74}{80}=frac{37}{40}=0,925.`
      },
      "b)": {
        options: ["(74/80)(73/79)(72/78)≈0,7890", "(74/80)^3≈0,7915", "6/80", "0,925"],
        correct: 0,
        solution: `Resolución:
La selección es sin reemplazamiento:
P(los tres aprobados)=frac{74}{80}·frac{73}{79}·frac{72}{78}
≈0,7890.`
      },
      "c)": {
        options: ["(4/78)(3/77)=2/1001≈0,0020", "(6/80)^2", "4/78", "2/80"],
        correct: 0,
        solution: `Resolución:
Sabemos que los dos primeros han suspendido. Quedan 78 alumnos y 4 suspensos.
P(tercero y cuarto suspensos)=frac{4}{78}·frac{3}{77}
=frac{2}{1001}≈0,0020.`
      }
    },
    "ccss2-probabilidad-7839d80993f9-futbolistas": {
      "a)": {
        options: ["0,23", "0,20", "0,25", "0,77"],
        correct: 0,
        solution: `Resolución:
El porcentaje europeo es 1-0,05-0,25=0,70.
P(C)=0,05·0,10+0,25·0,20+0,70·0,25
=0,005+0,05+0,175=0,23.`
      },
      "b)": {
        options: ["105/154≈0,6818", "0,70", "0,525", "0,25"],
        correct: 0,
        solution: `Resolución:
P(no C)=1-0,23=0,77.
P(E∩no C)=0,70·0,75=0,525.
P(E|no C)=frac{0,525}{0,77}=frac{105}{154}≈0,6818.`
      }
    },
    "ccss2-estadistica-eaab54f09315": {
      "a)": {
        options: ["(2,309; 2,631)", "(2,2; 2,74)", "(2,47; 2,99)", "(2,389; 2,551)"],
        correct: 0,
        solution: `Resolución:
Para el 95%, z_{α/2}=1,96.
El error es:
E=1,96·frac{0,52}{sqrt{40}}≈0,1611.
IC=2,47±0,1611=(2,309;2,631) cm.`
      },
      "b)": {
        options: ["No es razonable μ=2,2; un valor razonable es μ=2,47", "Sí es razonable μ=2,2", "Solo μ=2,2 es razonable", "No puede estimarse μ"],
        correct: 0,
        solution: `Resolución:
El valor μ=2,2 no pertenece al intervalo (2,309;2,631), por lo que no es razonable al 95%.
Sí son razonables los valores contenidos en el intervalo; la mejor estimación puntual es la media muestral:
μ≈2,47 cm.`
      }
    },
    "ccss2-estadistica-eaab54f09315-paeg": {
      "a)": {
        options: ["(6,560; 7,680)", "(6,12; 8,12)", "(6,864; 7,376)", "(5,95; 8,29)"],
        correct: 0,
        solution: `Resolución:
La media muestral es x̄=7,12.
Para confianza 97%, z_{α/2}≈2,170.
E=2,170·frac{1}{sqrt{15}}≈0,560.
IC=(7,12-0,560;7,12+0,560)=(6,560;7,680).`
      },
      "b)": {
        options: ["μ=6 no es razonable ni al 97% ni con α=0,08", "Es razonable en ambos casos", "Solo es razonable al 97%", "Solo es razonable con α=0,08"],
        correct: 0,
        solution: `Resolución:
Al 97%, 6 no pertenece a (6,560;7,680), luego se rechaza.
Con α=0,08, el nivel de confianza es 92% y z≈1,751.
El intervalo es 7,12±1,751/sqrt{15}≈(6,668;7,572).
El valor 6 tampoco pertenece a este intervalo.
Resultado: no es razonable en ninguno de los dos casos.`
      }
    },
    "ccss2-estadistica-cf86da2fbcb0": {
      "a)": {
        options: ["(635,67; 772,93)", "(604,3; 804,3)", "(650; 758,6)", "(704,3; 772,93)"],
        correct: 0,
        solution: `Resolución:
La media muestral es x̄=704,3 €.
Para confianza 97%, z≈2,170.
E=2,170·frac{100}{sqrt{10}}≈68,63.
IC=(704,3-68,63;704,3+68,63)=(635,67;772,93) €.`
      },
      "b)": {
        options: ["No se acepta μ=800 ni al 97% ni con α=0,09", "Se acepta en ambos casos", "Solo se acepta al 97%", "Solo se acepta con α=0,09"],
        correct: 0,
        solution: `Resolución:
800 no pertenece al intervalo del 97%, luego no se acepta.
Con α=0,09, confianza 91% y z≈1,695:
IC=704,3±1,695·100/sqrt{10}≈(650,7;757,9).
800 tampoco pertenece.
Resultado: no se acepta en ninguno de los dos casos.`
      }
    },
    "ccss2-estadistica-cf86da2fbcb0-agua": {
      "a)": {
        options: ["n=9 y x̄=150 litros", "n=100 y x̄=150", "n=9 y x̄=169,6", "n=30 y x̄=130,4"],
        correct: 0,
        solution: `Resolución:
La media muestral es el centro del intervalo:
x̄=frac{130,4+169,6}{2}=150.
El error es E=19,6.
Para el 95%:
19,6=1,96·frac{30}{sqrt{n}}.
sqrt{n}=3 ⇒ n=9.
Resultado: n=9 y x̄=150 litros.`
      },
      "b)": {
        options: ["Aproximadamente 5,43 litros", "19,6 litros", "3 litros", "1,81 litros"],
        correct: 0,
        solution: `Resolución:
Confianza 92,98% ⇒ α=0,0702 y z_{α/2}≈1,81.
Con n=100:
E=1,81·frac{30}{sqrt{100}}
=1,81·3≈5,43 litros.`
      }
    }
  });

  Object.assign(window.CCSS_II_EXAM_ANSWERS, {
    "ccss2-analisis-7ebbb79fdbc4": {
      "a)": {
        options: ["t=3 o t=-3", "Solo t=3", "t=0", "t=1"],
        correct: 0,
        solution: `Resolución:
En x=1, el valor de la primera rama es t^2+t-5.
El límite por la derecha es (1-3)^2+t=4+t.
Continuidad: t^2+t-5=4+t ⇒ t^2=9.
Resultado: t=3 o t=-3.`
      },
      "b)": {
        options: ["Mínimo relativo en (3,0)", "Máximo relativo en (3,0)", "Mínimo en (1,4)", "No tiene extremos"],
        correct: 0,
        solution: `Resolución:
Para t=0 y x>1, f(x)=(x-3)^2.
f'(x)=2(x-3), que se anula en x=3.
La derivada cambia de negativa a positiva, luego hay un mínimo relativo.
f(3)=0.
Resultado: mínimo relativo en (3,0).`
      },
      "c)": {
        options: ["Decrece en (1,3) y crece en (3,∞)", "Crece en todo (1,∞)", "Decrece en todo (1,∞)", "Crece en (1,3) y decrece después"],
        correct: 0,
        solution: `Resolución:
f'(x)=2(x-3).
En la recta real:
si 1<x<3, f'(x)<0; si x>3, f'(x)>0.
Resultado: decrece en (1,3) y crece en (3,∞).`
      }
    },
    "ccss2-analisis-949a227e8695": {
      "Resultado": {
        options: ["a=-1, b=0, c=3, d=0", "a=1, b=0, c=-3, d=0", "a=-1, b=1, c=3, d=0", "a=0, b=-1, c=3, d=2"],
        correct: 0,
        solution: `Resolución:
f(x)=ax^3+bx^2+cx+d.
El punto de inflexión (0,0) da f(0)=0 ⇒ d=0 y f''(0)=0 ⇒ 2b=0 ⇒ b=0.
El máximo (1,2) da f(1)=2 ⇒ a+c=2 y f'(1)=0 ⇒ 3a+c=0.
Resolvemos system{a+c=2;3a+c=0}: 2a=-2 ⇒ a=-1 y c=3.
Además f''(1)=-6<0, confirmando el máximo.
Resultado: a=-1, b=0, c=3, d=0.`
      }
    },
    "ccss2-analisis-7ebbb79fdbc4-trozosa": {
      "a)": {
        options: ["t=1 o t=-1", "Solo t=1", "t=0", "t=2"],
        correct: 0,
        solution: `Resolución:
En x=0, f(0)=1.
Límite por la izquierda: lim_{x→0-}(x-t)^2=t^2.
Límite por la derecha: lim_{x→0+}(x-1)^2=1.
Para continuidad, t^2=1.
Resultado: t=1 o t=-1.`
      },
      "b)": {
        options: ["Dos ramas parabólicas (x+1)^2 y (x-1)^2 unidas en (0,1)", "Una recta", "Una parábola y=x^2", "Dos ramas con salto en x=0"],
        correct: 0,
        solution: `Resolución:
Para t=-1:
f(x)=cases{(x+1)^2,&x<0;1,&x=0;(x-1)^2,&x>0}.
La rama izquierda tiene vértice (-1,0), la derecha (1,0), y ambas se aproximan al punto (0,1), que está incluido.
Por tanto la gráfica es continua en x=0.`
      }
    },
    "ccss2-analisis-949a227e8695-insectos": {
      "a)": {
        options: ["70 insectos al inicio y 70 al final", "7 y 7 insectos", "70 y 700 insectos", "0 y 70 insectos"],
        correct: 0,
        solution: `Resolución:
La función está expresada en decenas de individuos:
f(x)=-frac{1}{30}x^4+frac{2}{5}x^3+7.
f(0)=7 decenas=70 insectos.
f(12)=-frac{12^4}{30}+frac{2·12^3}{5}+7=7 decenas=70 insectos.
Resultado: 70 al comenzar y 70 al terminar.`
      },
      "b)": {
        options: ["Crece de 0 a 9 meses y decrece de 9 a 12", "Crece todo el año", "Decrece todo el año", "Decrece hasta el mes 9 y luego crece"],
        correct: 0,
        solution: `Resolución:
f'(x)=-frac{2}{15}x^3+frac{6}{5}x^2=frac{2}{15}x^2(9-x).
En 0<x<9, f'(x)>0; en 9<x≤12, f'(x)<0.
Resultado: crece de 0 a 9 meses y decrece de 9 a 12.`
      },
      "c)": {
        options: ["En el mes 9, con 799 insectos", "En el mes 12, con 70 insectos", "En el mes 6, con 700 insectos", "Al inicio, con 70 insectos"],
        correct: 0,
        solution: `Resolución:
El signo de f' cambia de positivo a negativo en x=9, luego allí hay un máximo.
f(9)=-frac{9^4}{30}+frac{2·9^3}{5}+7=79,9 decenas.
79,9 decenas equivalen a 799 individuos.
Resultado: máximo en el mes 9, con 799 insectos.`
      }
    },
    "ccss2-analisis-750dd9914138": {
      "a)": {
        options: ["t=0", "t=2", "t=-3", "t=3"],
        correct: 0,
        solution: `Resolución:
En x=3, la rama central vale t.
El límite por la derecha es -(3-3)^2=0.
Continuidad: t=0.`
      },
      "b)": {
        options: ["Dos semiparábolas negativas y el segmento y=2 entre -3 y 3", "La recta y=2 en todo R", "Una parábola positiva", "Una función continua"],
        correct: 0,
        solution: `Resolución:
Para t=2:
f(x)=cases{-(x+3)^2,&x<-3;2,&-3≤x≤3;-(x-3)^2,&x>3}.
Se dibujan dos semiparábolas hacia abajo con vértices abiertos en (-3,0) y (3,0), y el segmento horizontal y=2 con extremos cerrados.
Hay saltos en x=-3 y x=3.`
      }
    },
    "ccss2-analisis-d7d531d9b22d": {
      "a)": {
        options: ["Cae a las 8√2 h; asciende (0,8) y desciende (8,8√2)", "Cae a las 8 h", "Cae a las 16 h", "Asciende siempre"],
        correct: 0,
        solution: `Resolución:
f(x)=64x^2-frac{1}{2}x^4.
Toca tierra cuando f(x)=0:
x^2(64-frac{x^2}{2})=0 ⇒ x=0 o x=8sqrt{2}.
f'(x)=128x-2x^3=2x(64-x^2).
Para x>0, f'>0 hasta x=8 y f'<0 después.
Resultado: asciende (0,8), desciende (8,8√2) y cae a las 8√2 horas.`
      },
      "b)": {
        options: ["2048 m a las 8 h", "1024 m a las 8 h", "2048 m a las 8√2 h", "64 m a la hora 1"],
        correct: 0,
        solution: `Resolución:
El máximo se alcanza cuando f' cambia de positivo a negativo: x=8.
f(8)=64·8^2-frac{1}{2}·8^4=4096-2048=2048.
Resultado: altura máxima 2048 m a las 8 horas.`
      }
    },
    "ccss2-analisis-750dd9914138-trozosb": {
      "a)": {
        options: ["t=0 o t=1", "Solo t=0", "t=-1", "t=2"],
        correct: 0,
        solution: `Resolución:
En x=0, la rama izquierda vale t^2.
El límite por la derecha es t^3.
Continuidad: t^2=t^3 ⇒ t^2(1-t)=0.
Resultado: t=0 o t=1.`
      },
      "b)": {
        options: ["Mínimo en (1/√3,-2/(3√3))", "Máximo en (1/√3,2/(3√3))", "Mínimo en (1,0)", "No tiene extremos"],
        correct: 0,
        solution: `Resolución:
Para t=0 y x>0, f(x)=x^3-x.
f'(x)=3x^2-1, que se anula en x=1/sqrt{3}.
La derivada cambia de negativa a positiva.
f(1/sqrt{3})=frac{1}{3sqrt{3}}-frac{1}{sqrt{3}}=-frac{2}{3sqrt{3}}.
Resultado: mínimo en (1/√3,-2/(3√3)).`
      },
      "c)": {
        options: ["Decrece en (0,1/√3) y crece en (1/√3,∞)", "Crece en todo (0,∞)", "Decrece en todo", "Crece primero y luego decrece"],
        correct: 0,
        solution: `Resolución:
f'(x)=3x^2-1.
En (0,1/√3), f'<0; en (1/√3,∞), f'>0.
Resultado: decrece en (0,1/√3) y crece en (1/√3,∞).`
      }
    },
    "ccss2-analisis-d7d531d9b22d-globo-b": {
      "a)": {
        options: ["Cae a las √3 h; asciende hasta √(3/2) y luego desciende", "Cae a las 3 h", "Cae a las √(3/2) h", "Asciende siempre"],
        correct: 0,
        solution: `Resolución:
f(x)=frac{3}{2}x^2-frac{1}{2}x^4.
f(x)=0 ⇒ frac{x^2}{2}(3-x^2)=0 ⇒ x=0 o x=sqrt{3}.
f'(x)=3x-2x^3=x(3-2x^2).
Asciende hasta x=sqrt{3/2} y desciende después hasta caer en x=√3.`
      },
      "b)": {
        options: ["9/8 m en x=√(3/2) h", "3/2 m en x=√3 h", "9/4 m en x=3/2 h", "1 m en x=1 h"],
        correct: 0,
        solution: `Resolución:
El máximo se alcanza en x=sqrt{3/2}.
Como x^2=3/2 y x^4=9/4:
f=frac{3}{2}·frac{3}{2}-frac{1}{2}·frac{9}{4}
=frac{9}{4}-frac{9}{8}=frac{9}{8}.
Resultado: 9/8 m a las √(3/2) horas.`
      }
    }
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-analisis-4cacabd64080": {
      "1A a)": {
        options: ["a=0", "a=3", "a=-3", "a=6"],
        correct: 0,
        solution: `Resolución:
f_a(x)=x^3+3x^2+ax-6.
f'_a(x)=3x^2+6x+a y f''_a(x)=6x+6.
El punto de inflexión tiene abscisa x=-1.
La pendiente allí es f'_a(-1)=3-6+a=a-3.
Como debe ser -3: a-3=-3, de donde a=0.`
      },
      "1A b)": {
        options: ["Máximo en (-2,-2), mínimo en (0,-6); crece fuera de (-2,0)", "Máximo en (0,-6), mínimo en (-2,-2)", "Solo tiene un mínimo en x=-1", "Crece en todo R"],
        correct: 0,
        solution: `Resolución:
Para a=0, f'(x)=3x^2+6x=3x(x+2).
Los puntos críticos son x=-2 y x=0.
Recta de signos de f':
(-∞,-2): +; (-2,0): -; (0,∞): +.
Por tanto, hay máximo relativo en x=-2 y mínimo relativo en x=0.
f(-2)=-2 y f(0)=-6.
Resultado: máximo (-2,-2), mínimo (0,-6); crece en (-∞,-2)∪(0,∞) y decrece en (-2,0).`
      },
      "2A": {
        options: [
          "π/√2·sen(π/√2)+cos(π/√2)-1",
          "sen(π/√2)",
          "π/2-1",
          "cos(π/√2)+1"
        ],
        correct: 0,
        solution: `Resolución:
I=integral_0^{π^2/2} frac{cos(sqrt{x})}{2} dx.
Hacemos t=sqrt{x}; x=t^2, dx=2t dt.
Los límites pasan de x=0 a t=0 y de x=π^2/2 a t=π/sqrt{2}.
Entonces:
I=integral_0^{π/sqrt{2}} t cos t dt.
Por partes, u=t, dv=cos t dt:
I=[t sen t+cos t]_0^{π/sqrt{2}}.
Resultado:
I=frac{π}{sqrt{2}}sen(frac{π}{sqrt{2}})+cos(frac{π}{sqrt{2}})-1.`
      }
    },
    "mates2-analisis-fe57f198d5f9": {
      "1B a)": {
        options: ["Bolzano garantiza un cero y Rolle un punto con derivada nula bajo sus hipótesis", "Ambos teoremas afirman que toda función es derivable", "Bolzano exige derivabilidad", "Rolle no exige continuidad"],
        correct: 0,
        solution: `Resolución:
Bolzano: si f es continua en [a,b] y f(a)·f(b)<0, existe c∈(a,b) con f(c)=0.
Rolle: si f es continua en [a,b], derivable en (a,b) y f(a)=f(b), existe c∈(a,b) con f'(c)=0.`
      },
      "1B b)": {
        options: ["Tiene al menos una solución en (-1,0)", "No tiene soluciones reales", "Solo puede tener raíces positivas", "Tiene una raíz en (1,2)"],
        correct: 0,
        solution: `Resolución:
Sea h(x)=2e^x+x^5, continua en R.
h(-1)=frac{2}{e}-1<0 y h(0)=2>0.
Como cambia de signo en [-1,0], por Bolzano existe al menos una raíz en (-1,0).`
      },
      "1B c)": {
        options: ["La solución es única porque h'(x)>0", "Hay cinco soluciones", "Es única porque h''(x)=0", "No se puede decidir"],
        correct: 0,
        solution: `Resolución:
h'(x)=2e^x+5x^4.
Como 2e^x>0 y 5x^4≥0, se cumple h'(x)>0 para todo x.
Por tanto h es estrictamente creciente y no puede cortar dos veces al eje OX.
Unida a la existencia demostrada, la solución es única.`
      },
      "2B a)": {
        options: ["125/3", "25/3", "125/6", "50"],
        correct: 0,
        solution: `Resolución:
Igualamos x^2-4x+3=-x^2+2x+11:
2x^2-6x-8=0 ⇒ x=-1,4.
Entre ambos cortes g(x)=-x^2+2x+11 queda por encima de f(x).
El área es:
A=integral_{-1}^{4}[g(x)-f(x)]dx
=integral_{-1}^{4}(-2x^2+6x+8)dx
=[-frac{2}{3}x^3+3x^2+8x]_{-1}^{4}
=frac{125}{3}.`
      },
      "2B b)": {
        options: ["c=3/2", "c=1", "c=2", "c=-3/2"],
        correct: 0,
        solution: `Resolución:
f'(x)=2x-4 y g'(x)=-2x+2.
Para que las tangentes en la misma abscisa c tengan igual pendiente:
2c-4=-2c+2.
4c=6 ⇒ c=frac{3}{2}.`
      }
    },
    "mates2-analisis-dede61de18f2": {
      "1A": {
        options: ["Base 10 m×10 m, altura 10 m; coste 60000 €", "Base 20 m×20 m, altura 2,5 m", "Base 5 m×5 m, altura 40 m", "Base 10 m×10 m, altura 5 m"],
        correct: 0,
        solution: `Resolución:
Sea x el lado de la base y h la altura. La capacidad impone x^2h=1000, luego h=1000/x^2.
Coste de la base: 200x^2.
Coste de los cuatro laterales: 100·4xh=400000/x.
C(x)=200x^2+400000/x.
C'(x)=400x-400000/x^2.
C'(x)=0 ⇒ x^3=1000 ⇒ x=10.
C''(10)>0, luego es mínimo.
h=1000/10^2=10.
Coste: 200·100+400000/10=60000 €.`
      },
      "2A a)": {
        options: ["G(x)=(x+b)sen x+cos x", "G(x)=(x+b)cos x", "G(x)=x sen x", "G(x)=sen x+b"],
        correct: 0,
        solution: `Resolución:
g(x)=(x+b)cos x.
Integramos por partes:
integral (x+b)cos x dx=(x+b)sen x+cos x+C.
La condición G(0)=1 da 1+C=1, luego C=0.
Resultado: G(x)=(x+b)sen x+cos x.`
      },
      "2A b)": {
        options: ["b=-1", "b=0", "b=1", "b=2"],
        correct: 0,
        solution: `Resolución:
G(x)=(x+b)sen x+cos x.
g'(x)=cos x-(x+b)sen x.
Sustituimos en el límite y simplificamos el numerador.
Para que el cociente tenga límite finito al tender x a 0, el término lineal debe ajustarse al valor indicado.
Aplicando L'Hôpital cuando aparece 0/0 se obtiene:
b=-1.
Con b=-1, el límite vale efectivamente -2.`
      }
    },
    "mates2-analisis-042bc96d2d11": {
      "1B a)": {
        options: ["y=0 cuando x→+∞; no hay horizontal en -∞", "y=2 en ambos infinitos", "y=0 en ambos infinitos", "No tiene asíntotas horizontales"],
        correct: 0,
        solution: `Resolución:
f(x)=2x e^{1-x}.
Cuando x→+∞, escribimos f(x)=frac{2ex}{e^x}; es una indeterminación ∞/∞.
Por L'Hôpital:
lim_{x→+∞}frac{2ex}{e^x}=lim frac{2e}{e^x}=0.
Por tanto y=0 es asíntota horizontal en +∞.
Cuando x→-∞, f(x)→-∞, así que no hay asíntota horizontal.`
      },
      "1B b)": {
        options: ["(2,4/e)", "(1,2)", "(0,0)", "(2,2/e)"],
        correct: 0,
        solution: `Resolución:
f'(x)=2e^{1-x}(1-x).
f''(x)=2e^{1-x}(x-2).
Se anula en x=2.
Recta de signos de f'': negativa antes de 2 y positiva después, por lo que cambia la curvatura.
f(2)=4/e.
Resultado: punto de inflexión (2,4/e).`
      },
      "2B a)": {
        options: ["Se cortan en x=1 y x=2; 3-x queda por encima", "Se cortan solo en x=1", "2/x queda siempre por encima", "No encierran región"],
        correct: 0,
        solution: `Resolución:
Igualamos frac{2}{x}=3-x.
2=3x-x^2 ⇒ x^2-3x+2=0 ⇒ x=1,2.
Probamos x=3/2: g(3/2)=3/2 y f(3/2)=4/3, luego g queda por encima.
La región está comprendida entre x=1 y x=2.`
      },
      "2B b)": {
        options: ["3/2-2ln2", "2ln2-3/2", "1/2", "3-2ln2"],
        correct: 0,
        solution: `Resolución:
A=integral_1^2[(3-x)-frac{2}{x}]dx.
Una primitiva es 3x-frac{x^2}{2}-2ln x.
Por Barrow:
A=[3x-frac{x^2}{2}-2ln x]_1^2
=(4-2ln2)-frac{5}{2}
=frac{3}{2}-2ln2.`
      }
    }
  });

  Object.assign(window.MATES_II_EXAM_ANSWERS, {
    "mates2-geometria-6c4bd06cca23": {
      "a)": {
        options: ["H=(1/2,1/2,1)", "H=(1,0,1)", "H=(0,0,1)", "H=(1/2,-1/2,1)"],
        correct: 0,
        solution: `Resolución:
r: (x,y,z)=(1,0,1)+t(1,-1,0).
Un punto H de r es (1+t,-t,1).
Para que sea el más cercano a Q, QH debe ser perpendicular al vector director:
(H-Q)·(1,-1,0)=0.
(1+t,-t,0)·(1,-1,0)=1+2t=0 ⇒ t=-1/2.
Resultado: H=(1/2,1/2,1).`
      },
      "b)": {
        options: ["Q'=(1,1,1)", "Q'=(1,0,1)", "Q'=(0,1,1)", "Q'=(-1,-1,1)"],
        correct: 0,
        solution: `Resolución:
El pie H=(1/2,1/2,1) es el punto medio de Q y su simétrico Q'.
Q'=2H-Q.
Q'=2(1/2,1/2,1)-(0,0,1)=(1,1,1).`
      }
    },
    "mates2-geometria-2f51dfc30e20": {
      "a)": {
        options: ["Si a≠1,2 se cortan en un punto; si a=1 o 2 no tienen punto común", "Siempre se cortan en una recta", "Coinciden para a=1", "Son paralelos para todo a"],
        correct: 0,
        solution: `Resolución:
La matriz de normales es pmatrix{a&1&2\\1&1&1\\1&a&1}.
Su determinante es -(a-1)(a-2).
Si a≠1,2, el determinante no es cero y los tres planos se cortan en un único punto.
Para a=1 o a=2, comparamos los rangos de la matriz de coeficientes y la ampliada; resultan distintos, por lo que no existe punto común.`
      },
      "b)": {
        options: ["1/√3", "√3", "1/3", "0"],
        correct: 0,
        solution: `Resolución:
Para a=1:
π_2: x+y+z=0,
π_3: x+y+z=1.
Son paralelos. La distancia es:
d=frac{|1-0|}{sqrt{1^2+1^2+1^2}}=frac{1}{sqrt{3}}.`
      }
    },
    "mates2-geometria-5ef71021adf5": {
      "a)": {
        options: ["Secantes si c=3; cruzadas si c≠3", "Paralelas si c=3", "Coincidentes para todo c", "Secantes para todo c"],
        correct: 0,
        solution: `Resolución:
Escribimos ambas rectas en forma paramétrica e igualamos coordenadas.
Las ecuaciones de x e y determinan los parámetros de los posibles puntos comunes.
Al sustituirlos en la coordenada z se obtiene la condición c=3.
Los vectores directores no son proporcionales, luego nunca son paralelas.
Resultado: si c=3 son secantes; si c≠3 son cruzadas.`
      },
      "b)": {
        options: ["(3,1,-3)", "(3,-1,3)", "(1,3,-3)", "(-3,1,3)"],
        correct: 0,
        solution: `Resolución:
Tomamos c=3 y resolvemos conjuntamente las ecuaciones paramétricas.
Los parámetros obtenidos, sustituidos en cualquiera de las rectas, dan:
P=(3,1,-3).
Comprobando en r y en s se obtiene el mismo punto.`
      }
    },
    "mates2-geometria-124738967d56": {
      "a)": {
        options: ["(x-2)/5=(y+3)/7=z/11", "(x-2)/2=(y+3)/-3=z", "(x+2)/5=(y-3)/7=z/11", "(x-2)/3=(y+3)=z/-2"],
        correct: 0,
        solution: `Resolución:
El normal de π es n=(2,-3,1).
De π' obtenemos dos vectores directores u=(1,1,2), v=(1,-1,1), y su normal n'=u×v=(3,1,-2).
La dirección de la intersección es n×n'=(5,7,11).
La recta pedida pasa por P(2,-3,0):
r: (x-2)/5=(y+3)/7=z/11.`
      },
      "b)": {
        options: ["arccos(1/14)", "π/2", "arccos(13/14)", "π/4"],
        correct: 0,
        solution: `Resolución:
Usamos los normales n=(2,-3,1) y n'=(3,1,-2).
cos α=frac{|n·n'|}{|n||n'|}
=frac{|6-3-2|}{sqrt{14}sqrt{14}}
=frac{1}{14}.
Resultado: α=arccos(1/14).`
      }
    }
  });

})();
