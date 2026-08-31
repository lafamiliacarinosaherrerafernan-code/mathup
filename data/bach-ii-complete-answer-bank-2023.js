// Banco operativo verificado de ejercicios oficiales de 2023.
// Cada apartado dispone de cuatro opciones, una respuesta correcta y resolución.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-probabilidad-estadistica-834b49ab6167": {
      "a.1)": {
        options: ["0,24", "0,21", "0,30", "0,76"],
        correct: 0,
        solution: `Resolución:
1. Sean C: «reparación en Campo», L: «reparación en Llano» y M: «reparación mecánica».
2. Aplicamos el teorema de la probabilidad total:
P(M)=P(C)·P(M|C)+P(L)·P(M|L).
3. Sustituimos:
P(M)=0,30·0,10+0,70·0,30=0,03+0,21=0,24.
Resultado final: la probabilidad de una reparación mecánica es 0,24, es decir, un 24 %.`
      },
      "a.2)": {
        options: ["49/76 ≈ 0,6447", "27/76 ≈ 0,3553", "0,70", "0,49"],
        correct: 0,
        solution: `Resolución:
1. Sea E: «reparación eléctrica». Se pide P(L|E).
2. Calculamos P(E) mediante la probabilidad total:
P(E)=0,30·0,90+0,70·0,70=0,27+0,49=0,76.
3. Aplicamos Bayes:
P(L|E)=P(L)·P(E|L)/P(E).
4. Sustituimos:
P(L|E)=(0,70·0,70)/0,76=0,49/0,76=49/76≈0,6447.
Resultado final: P(L|E)=49/76≈0,6447.`
      },
      "b.1)": {
        options: ["0,1587", "0,8413", "0,5000", "0,0228"],
        correct: 0,
        solution: `Resolución:
1. X sigue una distribución normal N(1,5; 0,15).
2. Tipificamos dentro de la probabilidad:
P(X<1,35)=P((X-1,5)/0,15 < (1,35-1,5)/0,15)=P(Z<-1).
3. Por simetría de la normal:
P(Z<-1)=1-P(Z<1).
4. En la tabla, P(Z<1)=0,8413.
5. Por tanto:
P(Z<-1)=1-0,8413=0,1587.
Resultado final: 0,1587.`
      },
      "b.2)": {
        options: ["1,656 minutos", "1,350 minutos", "1,500 minutos", "1,725 minutos"],
        correct: 0,
        solution: `Resolución:
1. Buscamos el tiempo K que supera al 85,08 % de los tiempos:
P(X<K)=0,8508.
2. Llamamos a al valor tipificado de K:
P(Z<a)=0,8508.
3. Buscamos 0,8508 en la tabla de la normal y obtenemos a=1,04.
4. Igualamos con la tipificación:
(K-1,5)/0,15=1,04.
5. Despejamos:
K-1,5=0,156; K=1,656.
Resultado final: el tiempo es 1,656 minutos.`
      }
    },

    "mates2-probabilidad-estadistica-834b49ab6167--mates-ii-probabilidad-estadistica-2": {
      "b.1)": {
        options: ["1/6", "1/3", "1/2", "2/3"],
        correct: 0,
        solution: `Resolución:
1. Al extraer dos bolas sin reemplazamiento, las parejas no ordenadas posibles son:
{1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}.
2. Las seis parejas son equiprobables.
3. Sólo {1,2} suma 3.
Resultado final: P(suma=3)=1/6.`
      },
      "b.2)": {
        options: ["5/6", "1/6", "2/3", "1/2"],
        correct: 0,
        solution: `Resolución:
1. Las seis parejas equiprobables son {1,2}, {1,3}, {1,4}, {2,3}, {2,4} y {3,4}.
2. La única pareja cuya suma no es mayor que 3 es {1,2}.
3. Por tanto, cinco de las seis parejas tienen suma mayor que 3.
Resultado final: P(suma>3)=5/6.`
      }
    },

    "mates2-probabilidad-estadistica-33c6fe9ee2bb": {
      "a.1)": {
        options: ["37/84 ≈ 0,4405", "3/7 ≈ 0,4286", "4/9 ≈ 0,4444", "1/4"],
        correct: 0,
        solution: `Resolución:
1. Hay tres múltiplos de 4 entre 1 y 12, por lo que P(A)=3/12=1/4 y P(B)=3/4.
2. P(R|A)=6/14=3/7 y P(R|B)=8/18=4/9.
3. Aplicamos la probabilidad total:
P(R)=P(A)·P(R|A)+P(B)·P(R|B).
4. Sustituimos:
P(R)=1/4·3/7+3/4·4/9=3/28+1/3=9/84+28/84=37/84.
Resultado final: P(R)=37/84≈0,4405.`
      },
      "a.2)": {
        options: ["9/37 ≈ 0,2432", "28/37 ≈ 0,7568", "1/4", "3/7"],
        correct: 0,
        solution: `Resolución:
1. Se pide P(A|R).
2. Del apartado anterior, P(R)=37/84.
3. Además:
P(A∩R)=P(A)·P(R|A)=1/4·3/7=3/28.
4. Aplicamos Bayes:
P(A|R)=P(A∩R)/P(R)=(3/28)/(37/84)=3/28·84/37=9/37.
Resultado final: P(A|R)=9/37≈0,2432.`
      },
      "b.1)": {
        options: ["729/2048 ≈ 0,3560", "243/4096 ≈ 0,0593", "0,25", "0,75"],
        correct: 0,
        solution: `Resolución:
1. Sea X el número de destinatarios ausentes. Entonces X sigue una binomial B(6; 0,25).
2. Se pide que no pueda entregar exactamente un paquete: P(X=1).
3. Aplicamos la fórmula binomial:
P(X=1)=C(6,1)·(0,25)¹·(0,75)⁵.
4. Calculamos:
P(X=1)=6·1/4·(3/4)⁵=729/2048≈0,3560.
Resultado final: 729/2048≈0,3560.`
      },
      "b.2)": {
        options: ["4095/4096 ≈ 0,9998", "1/4096 ≈ 0,0002", "3/4", "1/4"],
        correct: 0,
        solution: `Resolución:
1. «Entregar al menos uno» es el suceso contrario de «no entregar ninguno».
2. Para no entregar ninguno, los seis destinatarios han de estar ausentes:
P(no entregar ninguno)=(0,25)⁶=(1/4)⁶=1/4096.
3. Tomamos el complementario:
P(entregar al menos uno)=1-1/4096=4095/4096.
Resultado final: 4095/4096≈0,9998.`
      }
    },

    "mates2-probabilidad-estadistica-33c6fe9ee2bb--mates-ii-probabilidad-estadistica-2": {
      "b.1)": {
        options: [
          "P(0)=5/6, P(1)=5/36 y P(3)=5/1296",
          "P(0)=1/6, P(1)=5/6 y P(3)=1/216",
          "P(0)=5/6, P(1)=1/6 y P(3)=1/1296",
          "P(0)=1/6, P(1)=1/36 y P(3)=1/216"
        ],
        correct: 0,
        solution: `Resolución:
1. Para obtener puntuación 0 debe salir un resultado distinto de 1 en la primera tirada:
P(0)=5/6.
2. Para obtener puntuación 1 debe salir primero un 1 y después un resultado distinto de 1:
P(1)=1/6·5/6=5/36.
3. Para obtener puntuación 3 deben salir tres unos y después un resultado distinto de 1:
P(3)=(1/6)³·5/6=5/1296.
Resultado final: P(0)=5/6, P(1)=5/36 y P(3)=5/1296.`
      },
      "b.2)": {
        options: ["P(X=n)=5/6ⁿ⁺¹", "P(X=n)=1/6ⁿ", "P(X=n)=5ⁿ/6ⁿ⁺¹", "P(X=n)=1/6ⁿ⁺¹"],
        correct: 0,
        solution: `Resolución:
1. Para obtener puntuación n deben aparecer n unos consecutivos.
2. Después debe salir un resultado diferente de 1 para que termine el juego.
3. Por independencia:
P(X=n)=(1/6)ⁿ·(5/6)=5/6ⁿ⁺¹, para n∈N∪{0}.
Resultado final: P(X=n)=5/6ⁿ⁺¹.`
      }
    }
  });
})();

// Ciencias Sociales II · Probabilidad e Inferencia Estadística · 2023.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-probabilidad-606f822c0be4": {
      "a)": {
        options: ["0,485", "0,515", "0,395", "0,600"],
        correct: 0,
        solution: `Resolución:
1. Sean F, I y T las preferencias por Facebook, Instagram y TikTok, y N el suceso «no publica habitualmente».
2. Las probabilidades de cada red son:
P(F)=0,50, P(I)=0,35 y P(T)=1-0,50-0,35=0,15.
3. Las probabilidades condicionadas de no publicar son:
P(N|F)=0,30,
P(N|I)=1-0,30=0,70,
P(N|T)=0,60.
4. Aplicamos el teorema de la probabilidad total:
P(N)=P(F)·P(N|F)+P(I)·P(N|I)+P(T)·P(N|T).
5. Sustituimos:
P(N)=0,50·0,30+0,35·0,70+0,15·0,60
=0,150+0,245+0,090=0,485.
Resultado final: la probabilidad es 0,485, es decir, un 48,5 %.`
      },
      "b)": {
        options: [
          "21/103 ≈ 0,2039",
          "35/103 ≈ 0,3398",
          "21/97 ≈ 0,2165",
          "0,30"
        ],
        correct: 0,
        solution: `Resolución:
1. Sea P el suceso «publica habitualmente». Del apartado anterior:
P(P)=1-P(N)=1-0,485=0,515.
2. Se pide P(I|P). Aplicamos el teorema de Bayes:
P(I|P)=[P(I)·P(P|I)]/P(P).
3. Sustituimos:
P(I|P)=(0,35·0,30)/0,515
=0,105/0,515
=105/515=21/103.
4. En forma decimal:
21/103≈0,2039.
Resultado final: P(I|P)=21/103≈0,2039, es decir, aproximadamente un 20,39 %.`
      }
    },

    "ccss2-probabilidad-250813b8bdb4": {
      "a)": {
        options: [
          "245/1027 ≈ 0,2386",
          "125/512 ≈ 0,2441",
          "50/80=0,625",
          "3/80=0,0375"
        ],
        correct: 0,
        solution: `Resolución:
1. Hay 50 mujeres entre 80 solicitantes y se eligen 3 sin reposición.
2. Calculamos la probabilidad mediante productos sucesivos:
P(3 mujeres)=(50/80)·(49/79)·(48/78).
3. También puede escribirse con combinaciones:
P(3 mujeres)=C(50,3)/C(80,3).
4. Operamos:
C(50,3)=19600,
C(80,3)=82160.
5. Simplificamos:
19600/82160=245/1027≈0,2386.
Resultado final: P(3 mujeres)=245/1027≈0,2386.`
      },
      "b)": {
        options: [
          "91/316 ≈ 0,2880",
          "245/1027 ≈ 0,2386",
          "30/80=0,375",
          "1/2=0,5"
        ],
        correct: 0,
        solution: `Resolución:
1. Los tres estudiantes serán del mismo sexo si son tres mujeres o tres hombres. Estos sucesos son incompatibles.
2. Aplicamos:
P(mismo sexo)=P(3 mujeres)+P(3 hombres).
3. Con combinaciones:
P(mismo sexo)=[C(50,3)+C(30,3)]/C(80,3).
4. Calculamos:
C(50,3)=19600,
C(30,3)=4060,
C(80,3)=82160.
5. Sumamos y simplificamos:
(19600+4060)/82160
=23660/82160
=91/316≈0,2880.
Resultado final: P(mismo sexo)=91/316≈0,2880.`
      },
      "c)": {
        options: [
          "2581/8216 ≈ 0,3141",
          "91/316 ≈ 0,2880",
          "245/1027 ≈ 0,2386",
          "3/8=0,375"
        ],
        correct: 0,
        solution: `Resolución:
1. «Al menos dos hombres» incluye dos casos incompatibles:
exactamente 2 hombres y 1 mujer, o exactamente 3 hombres.
2. Calculamos con combinaciones:
P=[C(30,2)·C(50,1)+C(30,3)]/C(80,3).
3. Evaluamos:
C(30,2)·C(50,1)=435·50=21750,
C(30,3)=4060.
4. Sumamos:
21750+4060=25810.
5. Dividimos y simplificamos:
25810/82160=2581/8216≈0,3141.
Resultado final: la probabilidad es 2581/8216≈0,3141.`
      }
    },

    "ccss2-estadistica-919e1864b247": {
      "a)": {
        options: [
          "IC₉₇%≈(10,27;23,29) metros",
          "IC₉₇%≈(13,78;19,78) metros",
          "IC₉₇%≈(7,78;25,78) metros",
          "IC₉₇%≈(15,27;18,29) metros"
        ],
        correct: 0,
        solution: `Resolución:
1. La varianza poblacional es σ²=81, luego σ=9 metros. El tamaño muestral es n=9.
2. Calculamos la media muestral:
x̄=(16+21+15+17+16+19+14+14+19)/9
=151/9≈16,78.
3. Para un nivel de confianza del 97 %:
α=0,03, α/2=0,015 y z_(1-α/2)=z_0,985≈2,17.
4. El error máximo es:
E=z_(1-α/2)·σ/√n
=2,17·9/√9
=2,17·3=6,51.
5. Construimos el intervalo:
IC=(x̄-E,x̄+E)
=(16,78-6,51,16,78+6,51)
≈(10,27;23,29).
Resultado final: IC₉₇%≈(10,27;23,29) metros.`
      },
      "b)": {
        options: [
          "Disminuir el tamaño de la muestra",
          "Aumentar el tamaño de la muestra",
          "Mantener n y reducir σ",
          "No es posible cambiar la amplitud"
        ],
        correct: 0,
        solution: `Resolución:
1. Para el mismo nivel de confianza y la misma desviación típica, la amplitud del intervalo es:
2E=2·z_(1-α/2)·σ/√n.
2. El nivel de confianza no cambia, por lo que z_(1-α/2) permanece constante.
3. La desviación típica poblacional también es la misma.
4. Para aumentar la amplitud hay que aumentar E. Como √n está en el denominador, esto se consigue reduciendo n.
Resultado final: se debe utilizar una muestra de menor tamaño.`
      },
      "c)": {
        options: [
          "E≈2,64 metros",
          "E≈1,29 metros",
          "E≈3,00 metros",
          "E≈6,15 metros"
        ],
        correct: 0,
        solution: `Resolución:
1. El nuevo tamaño muestral es n=49 y σ=9.
2. Para un nivel de confianza del 95,96 %:
α=1-0,9596=0,0404,
α/2=0,0202.
3. En la tabla de la normal buscamos:
P(Z≤z)=1-0,0202=0,9798,
de donde z≈2,05.
4. Calculamos el error máximo:
E=z·σ/√n
=2,05·9/√49
=2,05·9/7
≈2,64.
Resultado final: el error máximo admisible es aproximadamente 2,64 metros.`
      }
    }
  });
})();

// Ciencias Sociales II · bloque de Análisis · convocatorias de junio y julio de 2023.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-analisis-d0f31f666e91": {
      "a)": {
        options: ["t=2", "t=1", "t=3", "No existe ningún valor de t"],
        correct: 0,
        solution: `Resolución:
1. Cada rama es continua en su intervalo; sólo estudiamos x=0.
2. Límite por la izquierda y valor de la función:
lim[x→0⁻] f(x)=f(0)=|0+1|+t=1+t.
3. Límite por la derecha:
lim[x→0⁺] f(x)=-0³+2·0²+(t+2)·0+3=3.
4. Para que sea continua deben coincidir:
1+t=3.
5. Despejamos:
t=2.
Resultado final: la función es continua en x=0 para t=2.`
      },
      "b)": {
        options: [
          "Máximo relativo en (2,11)",
          "Mínimo relativo en (2,11)",
          "Máximo relativo en (-2/3,31/27)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=2 y x>0:
f(x)=-x³+2x²+4x+3.
2. Derivamos:
f'(x)=-3x²+4x+4.
3. Igualamos a cero:
-3x²+4x+4=0,
3x²-4x-4=0,
x=(4±8)/6.
Las soluciones son x=2 y x=-2/3, pero sólo x=2 pertenece a (0,+∞).
4. Estudiamos el signo de f' en la recta real del dominio:
en (0,2), por ejemplo x=1, f'(1)=5>0: la función crece ↑.
en (2,+∞), por ejemplo x=3, f'(3)=-11<0: la función decrece ↓.
5. El signo cambia de + a -, por lo que en x=2 hay un máximo relativo.
6. Calculamos la ordenada:
f(2)=-8+8+8+3=11.
Resultado final: máximo relativo en (2,11).`
      },
      "c)": {
        options: [
          "Crece en (0,2) y decrece en (2,+∞)",
          "Decrece en (0,2) y crece en (2,+∞)",
          "Crece en todo (0,+∞)",
          "Decrece en todo (0,+∞)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=2:
f'(x)=-3x²+4x+4=-3(x-2)(x+2/3).
2. En el intervalo pedido (0,+∞), el único valor que anula la derivada es x=2.
3. Recta de signos de f':
(0,2): tomamos x=1 y f'(1)=5>0, signo +, flecha ↑.
(2,+∞): tomamos x=3 y f'(3)=-11<0, signo -, flecha ↓.
Resultado final: f crece en (0,2) y decrece en (2,+∞).`
      }
    },

    "ccss2-analisis-201db2da9219": {
      "a)": {
        options: ["c=1", "c=0", "c=2", "c=-1"],
        correct: 0,
        solution: `Resolución:
1. Sólo es necesario estudiar la continuidad en x=c.
2. El valor y el límite por la izquierda son:
f(c)=(c+2)².
3. El límite por la derecha es:
lim[x→c⁺]f(x)=6c+3.
4. Igualamos:
(c+2)²=6c+3.
5. Desarrollamos y resolvemos:
c²+4c+4=6c+3,
c²-2c+1=0,
(c-1)²=0.
Resultado final: c=1.`
      },
      "b)": {
        options: [
          "Parábola y=(x+2)² para x≤0, con punto cerrado (0,4), y recta y=6x+3 para x>0, con punto abierto (0,3)",
          "Parábola y=(x+2)² para x<0, con punto abierto (0,4), y recta y=6x+3 para x≥0, con punto cerrado (0,3)",
          "Sólo la recta y=6x+3",
          "Una función continua que pasa por (0,3)"
        ],
        correct: 0,
        solution: `Resolución:
1. Para c=0:
f(x)=(x+2)² si x≤0,
f(x)=6x+3 si x>0.
2. Representamos la primera rama únicamente a la izquierda de x=0. Como incluye la igualdad, marcamos el punto (0,4) cerrado.
3. Representamos la recta sólo a la derecha de x=0. Como no incluye x=0, marcamos (0,3) abierto.
4. Los dos puntos no coinciden; la gráfica presenta un salto en x=0.
Resultado final: parábola y=(x+2)² para x≤0 con (0,4) cerrado, y recta y=6x+3 para x>0 con (0,3) abierto.`
      }
    },

    "ccss2-analisis-852c99e3814f": {
      "a)": {
        options: [
          "No existe ningún valor de t",
          "t=0",
          "t=1",
          "t=-1"
        ],
        correct: 0,
        solution: `Resolución:
1. Estudiamos la continuidad en x=1.
2. Límite por la izquierda y valor:
lim[x→1⁻]f(x)=f(1)=2·1²+t/1=2+t.
3. Límite por la derecha:
lim[x→1⁺]f(x)=1+t.
4. Para que fuera continua debería cumplirse:
2+t=1+t.
5. Al restar t en ambos miembros queda 2=1, que es imposible.
Resultado final: no existe ningún valor de t que haga continua la función en x=1.`
      },
      "b)": {
        options: [
          "Mínimo relativo en (1/∛2,3∛2); no tiene máximo relativo",
          "Máximo relativo en (1/∛2,3∛2); no tiene mínimo",
          "Mínimo relativo en (∛2,3/∛2)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. Para t=2 y x<1:
f(x)=2x²+2/x, con x≠0.
2. Derivamos y escribimos como una sola fracción:
f'(x)=4x-2/x²=(4x³-2)/x².
3. Igualamos a cero:
4x³-2=0,
x³=1/2,
x=1/∛2.
4. Estudiamos el signo de f':
en (0,1/∛2), por ejemplo x=1/2, f'(x)<0: decrece ↓.
en (1/∛2,1), por ejemplo x=0,9, f'(x)>0: crece ↑.
El cambio de - a + determina un mínimo.
5. Calculamos la ordenada. Si r=1/∛2, entonces r³=1/2 y 2/r=4r²:
f(r)=2r²+2/r=6r²=3∛2.
Resultado final: mínimo relativo en (1/∛2,3∛2); no hay máximo relativo.`
      },
      "c)": {
        options: [
          "Decrece en (-∞,0) y (0,1/∛2); crece en (1/∛2,1)",
          "Crece en (-∞,0) y (0,1/∛2); decrece en (1/∛2,1)",
          "Decrece en todo (-∞,1)",
          "Crece en todo (-∞,1)"
        ],
        correct: 0,
        solution: `Resolución:
1. La derivada es:
f'(x)=(4x³-2)/x².
2. El dominio del tramo es (-∞,0)∪(0,1); x=0 no pertenece al dominio.
3. El numerador se anula en x=1/∛2 y el denominador es positivo siempre que x≠0.
4. Recta de signos:
(-∞,0): tomamos x=-1, f'(-1)<0, flecha ↓.
(0,1/∛2): tomamos x=1/2, f'(1/2)<0, flecha ↓.
(1/∛2,1): tomamos x=0,9, f'(0,9)>0, flecha ↑.
Resultado final: decrece en (-∞,0) y (0,1/∛2), y crece en (1/∛2,1).`
      }
    },

    "ccss2-analisis-0c89ba691375": {
      "Resultado": {
        options: [
          "a=1, b=-6, c=11",
          "a=-1, b=6, c=-11",
          "a=1, b=-3, c=5",
          "a=2, b=-12, c=19"
        ],
        correct: 0,
        solution: `Resolución:
1. Sea f(x)=ax³+bx²+c.
2. El punto de inflexión (2,-5) pertenece a la gráfica:
f(2)=-5, luego 8a+4b+c=-5.
3. La pendiente de la tangente en x=2 es -12:
f'(x)=3ax²+2bx,
f'(2)=12a+4b=-12.
4. En un punto de inflexión se anula la segunda derivada:
f''(x)=6ax+2b,
f''(2)=12a+2b=0.
5. Reunimos las tres ecuaciones:
{8a+4b+c=-5,
12a+4b=-12,
12a+2b=0}.
6. De la tercera, b=-6a. Sustituyendo en la segunda:
12a-24a=-12, luego a=1.
7. Entonces b=-6 y, en la primera:
8-24+c=-5, de donde c=11.
Resultado final: a=1, b=-6 y c=11.`
      }
    },

    "ccss2-analisis-be32dceff818": {
      "a)": {
        options: [
          "Sí, para t=3",
          "Sí, para t=0",
          "Sí, para t=2",
          "No existe ningún valor"
        ],
        correct: 0,
        solution: `Resolución:
1. Estudiamos primero x=-2.
Límite por la izquierda y valor:
f(-2)=-(t-2)²+2.
Límite por la derecha:
t-2.
2. Igualamos:
-(t-2)²+2=t-2.
Las soluciones son t=3 y t=0.
3. Estudiamos ahora x=2.
El valor por la rama central es t-2.
El límite por la derecha es:
2²-(t+3)·2+9=7-2t.
4. Igualamos:
t-2=7-2t,
3t=9,
t=3.
5. El único valor que satisface simultáneamente las dos condiciones es t=3.
Resultado final: sí existe y es t=3.`
      },
      "b)": {
        options: [
          "y=-(x+3)²+2 para x≤-2; y=1 para -2<x≤2; y=(x-3)² para x>2",
          "y=(x+3)²-2 para x≤-2; y=3 para -2<x≤2; y=(x+3)² para x>2",
          "y=-(x+3)²+2 para todo x",
          "Tres rectas horizontales"
        ],
        correct: 0,
        solution: `Resolución:
1. Sustituimos t=3:
f(x)=-(x+3)²+2 si x≤-2,
f(x)=1 si -2<x≤2,
f(x)=x²-6x+9=(x-3)² si x>2.
2. Primera rama: parábola cóncava hacia abajo, vértice (-3,2), con el punto (-2,1) cerrado.
3. Segunda rama: segmento horizontal y=1, abierto en x=-2 y cerrado en x=2.
4. Tercera rama: parábola cóncava hacia arriba, vértice (3,0), con el punto (2,1) abierto.
5. Aunque algunas marcas son abiertas y otras cerradas, los valores coinciden y la función es continua.
Resultado final: esas tres ramas forman la representación pedida.`
      }
    },

    "ccss2-analisis-9d10121e716e": {
      "a)": {
        options: ["42 metros", "32 metros", "50 metros", "18 metros"],
        correct: 0,
        solution: `Resolución:
1. La altura viene dada por H(t)=20t-2t².
2. Sustituimos t=3:
H(3)=20·3-2·3².
3. Operamos:
H(3)=60-18=42.
Resultado final: a los 3 segundos la pelota está a 42 metros.`
      },
      "b)": {
        options: [
          "A los 2 y a los 8 segundos",
          "Sólo a los 2 segundos",
          "A los 4 y a los 6 segundos",
          "A los 1 y a los 9 segundos"
        ],
        correct: 0,
        solution: `Resolución:
1. Igualamos la altura a 32:
20t-2t²=32.
2. Pasamos todo a un miembro y simplificamos:
-2t²+20t-32=0.
Dividimos entre -2:
t²-10t+16=0.
3. Factorizamos:
(t-2)(t-8)=0.
4. Por tanto:
t=2 o t=8.
Resultado final: la pelota está a 32 metros a los 2 segundos y a los 8 segundos.`
      },
      "c)": {
        options: [
          "Altura máxima de 50 metros a los 5 segundos",
          "Altura máxima de 40 metros a los 5 segundos",
          "Altura máxima de 50 metros a los 10 segundos",
          "Altura máxima de 32 metros a los 2 segundos"
        ],
        correct: 0,
        solution: `Resolución:
1. H(t)=-2t²+20t es una parábola cóncava hacia abajo, por lo que su vértice proporciona el máximo.
2. Calculamos la abscisa del vértice:
t=-b/(2a)=-20/[2·(-2)]=5.
3. Calculamos la altura:
H(5)=20·5-2·5²=100-50=50.
Resultado final: la altura máxima es 50 metros y se alcanza a los 5 segundos.`
      }
    }
  });
})();

// Ciencias Sociales II · bloque de Álgebra · convocatorias de junio y julio de 2023.
(() => {
  "use strict";

  const answers = window.CCSS_II_BLOCK_ANSWERS =
    window.CCSS_II_BLOCK_ANSWERS || {};

  Object.assign(answers, {
    "ccss2-algebra-fd963001deaf": {
      "a)": {
        options: [
          "Vértices: (1,-2), (1,0), (2,0) y (3,-1)",
          "Vértices: (0,0), (1,0), (2,-1) y (5,0)",
          "Vértices: (1,0), (2,0) y (3,1)",
          "La región factible es vacía"
        ],
        correct: 0,
        solution: `Resolución:
1. Escribimos las rectas frontera:
x+y=2, x-2y=5, y=0 y x=1.
2. Las restricciones indican:
y≤2-x, y≥(x-5)/2, y≤0 y x≥1.
3. Calculamos las intersecciones que delimitan la región:
x=1 con x-2y=5 da (1,-2).
x=1 con y=0 da (1,0).
y=0 con x+y=2 da (2,0).
x+y=2 con x-2y=5 da (3,-1).
4. Comprobamos que los cuatro puntos satisfacen todas las inecuaciones.
Resultado final: la región factible es el cuadrilátero de vértices (1,-2), (1,0), (2,0) y (3,-1).`
      },
      "b)": {
        options: [
          "Máximo 5 en (2,0) y mínimo -9 en (1,-2)",
          "Máximo 4 en (3,-1) y mínimo 1 en (1,0)",
          "Máximo 9 en (1,-2) y mínimo -5 en (2,0)",
          "Máximo 5 en (3,-1) y mínimo -9 en (1,0)"
        ],
        correct: 0,
        solution: `Resolución:
1. En programación lineal, los extremos se alcanzan en los vértices de la región factible.
2. Evaluamos f(x,y)=4x+5y-3:
f(1,-2)=4-10-3=-9.
f(1,0)=4-3=1.
f(2,0)=8-3=5.
f(3,-1)=12-5-3=4.
3. Comparamos los cuatro valores.
Resultado final: el máximo es 5 y se alcanza en (2,0); el mínimo es -9 y se alcanza en (1,-2).`
      }
    },

    "ccss2-algebra-f9c6b67d574a": {
      "a)": {
        options: [
          "{x+y=70, 2y=3z, x+y+z=110}",
          "{x+y=28, 3y=2z, x+y+z=110}",
          "{0,4x+y=28, 2y=3z, x+y+z=110}",
          "{x+y=70, 2x=3z, x+y-z=110}"
        ],
        correct: 0,
        solution: `Resolución:
1. Llamamos x al número de cuadros de arte urbano, y a los de arte abstracto y z a los de grafiti.
2. El 40 % de la suma de los cuadros de los dos primeros artistas es 28:
0,40(x+y)=28, luego x+y=70.
3. El doble de los cuadros de arte abstracto equivale al triple de los de grafiti:
2y=3z.
4. En total hay 110 cuadros:
x+y+z=110.
Resultado final: {x+y=70, 2y=3z, x+y+z=110}.`
      },
      "b)": {
        options: [
          "10 de arte urbano, 60 de arte abstracto y 40 de grafiti",
          "40 de arte urbano, 60 de arte abstracto y 10 de grafiti",
          "20 de arte urbano, 50 de arte abstracto y 40 de grafiti",
          "10 de arte urbano, 40 de arte abstracto y 60 de grafiti"
        ],
        correct: 0,
        solution: `Resolución:
1. Resolvemos el sistema:
{x+y=70, 2y=3z, x+y+z=110}.
2. Restamos la primera ecuación de la tercera:
z=110-70=40.
3. Sustituimos en 2y=3z:
2y=3·40=120, de donde y=60.
4. Sustituimos en x+y=70:
x+60=70, de donde x=10.
5. Comprobación: 10+60+40=110 y 2·60=3·40.
Resultado final: 10 cuadros de arte urbano, 60 de arte abstracto y 40 de grafiti.`
      }
    },

    "ccss2-algebra-a168ad9b629f": {
      "a)": {
        options: [
          "{b+r+t=50, 2b=r+1, 2b=5t}",
          "{b+r+t=50, 2r=b+1, 2t=5b}",
          "{b+r-t=50, 2b=r-1, 2b=5t}",
          "{b+r+t=50, b=2r+1, 5b=2t}"
        ],
        correct: 0,
        solution: `Resolución:
1. Sean b, r y t las botellas de vino blanco, rosado y tinto.
2. El pedido contiene 50 botellas:
b+r+t=50.
3. El doble de botellas de blanco excede en una unidad a las de rosado:
2b=r+1.
4. Ese mismo doble coincide con cinco veces las botellas de tinto:
2b=5t.
Resultado final: {b+r+t=50, 2b=r+1, 2b=5t}.`
      },
      "b)": {
        options: [
          "15 blancas, 29 rosadas y 6 tintas",
          "15 blancas, 6 rosadas y 29 tintas",
          "10 blancas, 29 rosadas y 11 tintas",
          "20 blancas, 24 rosadas y 6 tintas"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos del sistema:
{b+r+t=50, 2b=r+1, 2b=5t}.
2. Despejamos:
r=2b-1, t=2b/5.
3. Sustituimos en la primera ecuación:
b+(2b-1)+2b/5=50.
4. Multiplicamos por 5:
5b+10b-5+2b=250.
17b=255, luego b=15.
5. Calculamos las otras cantidades:
r=2·15-1=29,
t=2·15/5=6.
6. Comprobación: 15+29+6=50.
Resultado final: 15 botellas de blanco, 29 de rosado y 6 de tinto.`
      }
    },

    "ccss2-algebra-26423b46c2a5": {
      "a)": {
        options: [
          "MN=NM=I₂; por tanto, M y N conmutan",
          "MN=I₂ y NM=-I₂; no conmutan",
          "MN=NM=M",
          "MN y NM no están definidas"
        ],
        correct: 0,
        solution: `Resolución:
1. Las matrices son:
M=((4,9),(1,2)) y N=((-2,9),(1,-4)).
2. Calculamos M·N, fila por columna:
MN=((4·(-2)+9·1, 4·9+9·(-4)),(1·(-2)+2·1, 1·9+2·(-4)))
=((1,0),(0,1))=I₂.
3. Calculamos N·M:
NM=((-2·4+9·1, -2·9+9·2),(1·4-4·1, 1·9-4·2))
=((1,0),(0,1))=I₂.
4. Como MN=NM, las matrices conmutan.
Resultado final: MN=NM=I₂.`
      },
      "b)": {
        options: [
          "X=((10,-10/3),(-8,6))",
          "X=((10,10/3),(8,6))",
          "X=((-10,-10/3),(-8,-6))",
          "X=((1,0),(0,1))"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de M·P·X=Nᵀ-M.
2. Calculamos:
MP=((-3,-3),(0,-1)),
Nᵀ-M=((-6,-8),(8,-6)).
3. Aislamos X multiplicando por la inversa de MP a la izquierda:
X=(MP)⁻¹(Nᵀ-M).
4. Calculamos la inversa mediante determinantes:
det(MP)=(-3)(-1)-(-3)·0=3.
(MP)⁻¹=(1/3)·((-1,3),(0,-3))
=((-1/3,1),(0,-1)).
5. Multiplicamos:
X=((-1/3,1),(0,-1))·((-6,-8),(8,-6))
=((10,-10/3),(-8,6)).
Resultado final: X=((10,-10/3),(-8,6)).`
      },
      "c)": {
        options: [
          "X=-((N+I)²)=((-10,36),(4,-18))",
          "X=(N+I)²=((10,-36),(-4,18))",
          "X=-(N+I)=((1,-9),(-1,3))",
          "X es la matriz identidad"
        ],
        correct: 0,
        solution: `Resolución:
1. Buscamos una matriz X tal que:
X+(N+I)²=0.
2. Despejamos:
X=-(N+I)².
3. Calculamos:
N+I=((-1,9),(1,-3)).
4. Elevamos al cuadrado:
(N+I)²=((10,-36),(-4,18)).
5. Cambiamos todos los signos:
X=((-10,36),(4,-18)).
Resultado final: X=((-10,36),(4,-18)).`
      }
    },

    "ccss2-algebra-9368934fd841": {
      "a)": {
        options: [
          "{b+r+t=70000, t=b+r, t-r=3(r-b)}",
          "{b+r+t=70000, t=b-r, t+r=3(r-b)}",
          "{b+r-t=70000, t=b+r, t-r=3(b-r)}",
          "{b+r+t=70000, b=t+r, r-b=3t}"
        ],
        correct: 0,
        solution: `Resolución:
1. Sean b, r y t las unidades vendidas de blues, rock y tecno.
2. El total es:
b+r+t=70000.
3. Las ventas de tecno coinciden con la suma de blues y rock:
t=b+r.
4. La diferencia entre tecno y rock triplica la diferencia entre rock y blues:
t-r=3(r-b).
Resultado final: {b+r+t=70000, t=b+r, t-r=3(r-b)}.`
      },
      "b)": {
        options: [
          "15000 de blues, 20000 de rock y 35000 de tecno",
          "20000 de blues, 15000 de rock y 35000 de tecno",
          "15000 de blues, 35000 de rock y 20000 de tecno",
          "10000 de blues, 25000 de rock y 35000 de tecno"
        ],
        correct: 0,
        solution: `Resolución:
1. Del sistema, t=b+r. Sustituimos en el total:
b+r+(b+r)=70000,
2b+2r=70000,
b+r=35000.
Por tanto, t=35000.
2. En t-r=3(r-b), sustituimos t=b+r:
b+r-r=3r-3b.
b=3r-3b, luego 4b=3r.
3. De 4b=3r obtenemos r=4b/3.
4. Sustituimos en b+r=35000:
b+4b/3=35000,
7b/3=35000,
b=15000.
5. Entonces r=20000 y t=35000.
Resultado final: 15000 de blues, 20000 de rock y 35000 de tecno.`
      }
    },

    "ccss2-algebra-155b95b8a719": {
      "a)": {
        options: [
          "{a+j+n=660, j=a/4, n=0,10(a+j)}",
          "{a+j+n=660, a=j/4, n=0,10a}",
          "{a+j-n=660, j=4a, n=0,10(a+j)}",
          "{a+j+n=660, j=a/4, a=0,10n}"
        ],
        correct: 0,
        solution: `Resolución:
1. Sean a, j y n las entradas de adultos, jóvenes y niños.
2. El total de entradas es:
a+j+n=660.
3. Las entradas de jóvenes son la cuarta parte de las de adultos:
j=a/4.
4. Las entradas de niños representan el 10 % de la suma de adultos y jóvenes:
n=0,10(a+j).
Resultado final: {a+j+n=660, j=a/4, n=0,10(a+j)}.`
      },
      "b)": {
        options: [
          "480 adultos, 120 jóvenes y 60 niños",
          "480 adultos, 60 jóvenes y 120 niños",
          "440 adultos, 160 jóvenes y 60 niños",
          "500 adultos, 100 jóvenes y 60 niños"
        ],
        correct: 0,
        solution: `Resolución:
1. Como n=0,10(a+j), el total queda:
a+j+0,10(a+j)=660.
2. Sacamos factor común:
1,10(a+j)=660,
a+j=600.
3. Por tanto:
n=0,10·600=60.
4. Sustituimos j=a/4 en a+j=600:
a+a/4=600.
5. Multiplicamos por 4:
4a+a=2400,
5a=2400,
a=480.
6. Finalmente, j=480/4=120.
Resultado final: 480 adultos, 120 jóvenes y 60 niños.`
      }
    },

    "ccss2-algebra-f8c0fb812a18": {
      "a)": {
        options: [
          "A·B·Cᵀ=((0),(0),(2))",
          "A·B·Cᵀ=((2),(0),(0))",
          "A·B·Cᵀ=((0),(2),(0))",
          "El producto no está definido"
        ],
        correct: 0,
        solution: `Resolución:
1. Las dimensiones son A(3×3), B(3×3) y Cᵀ(3×1), por lo que el producto está definido y será 3×1.
2. Calculamos primero:
B·Cᵀ=((2),(-4),(2)).
3. Multiplicamos por A:
A·(B·Cᵀ)
=((1,2,3),(0,1,2),(0,0,1))·((2),(-4),(2))
=((2-8+6),(-4+4),(2))
=((0),(0),(2)).
Resultado final: A·B·Cᵀ=((0),(0),(2)).`
      },
      "b)": {
        options: [
          "(1/3)B²-I=((-1/3,1/3,-1/3),(-1/3,-1,1/3),(-1/3,-1/3,-1))",
          "(1/3)B²-I=((1/3,-1/3,1/3),(1/3,1,-1/3),(1/3,1/3,1))",
          "(1/3)B²-I=B",
          "(1/3)B²-I=I"
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos B², fila por columna:
B²=((2,1,-1),(-1,0,1),(-1,-1,0)).
2. Multiplicamos por 1/3:
(1/3)B²=((2/3,1/3,-1/3),(-1/3,0,1/3),(-1/3,-1/3,0)).
3. Restamos la identidad de orden 3:
(1/3)B²-I
=((-1/3,1/3,-1/3),(-1/3,-1,1/3),(-1/3,-1/3,-1)).
Resultado final: ((-1/3,1/3,-1/3),(-1/3,-1,1/3),(-1/3,-1/3,-1)).`
      },
      "c)": {
        options: [
          "No se puede calcular ninguna de las dos expresiones",
          "Se pueden calcular las dos expresiones",
          "Sólo se puede calcular (A-B)-C",
          "Sólo se puede calcular B·C"
        ],
        correct: 0,
        solution: `Resolución:
1. A y B son matrices 3×3, de modo que A-B es una matriz 3×3.
2. C es una matriz 1×3. No se puede restar C de A-B porque las dimensiones no coinciden.
3. Para calcular B·C, el número de columnas de B debe coincidir con el número de filas de C.
4. B tiene 3 columnas y C sólo 1 fila; como 3≠1, el producto B·C tampoco está definido.
Resultado final: no se puede calcular ninguna de las dos expresiones.`
      }
    }
  });
})();

// Matemáticas II · bloques de Álgebra y Geometría · 2023.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-algebra-2f0e891180bf": {
      "a)": {
        options: [
          "b=0 y 2a+c=1",
          "a=0, b=1 y c=2",
          "b=1 y a+c=0",
          "a=b=c=0"
        ],
        correct: 0,
        solution: `Resolución:
1. Multiplicamos las matrices:
A·X=((2,1),(4,2))·((a,b),(c,0))
=((2a+c,2b),(4a+2c,4b)).
2. Igualamos con B=((1,0),(2,0)):
2a+c=1, 2b=0, 4a+2c=2 y 4b=0.
3. Las ecuaciones de la segunda fila son el doble de las de la primera.
Resultado final: b=0 y 2a+c=1.`
      },
      "b)": {
        options: [
          "a=1/2, b=c=0; X=((1/2,0),(0,0))",
          "a=0, b=c=1; X=((0,1),(1,0))",
          "a=1, b=0, c=-1; X=((1,0),(-1,0))",
          "No existe ninguna matriz X simétrica"
        ],
        correct: 0,
        solution: `Resolución:
1. Del apartado anterior:
b=0 y 2a+c=1.
2. Para que X=((a,b),(c,0)) sea simétrica debe cumplirse b=c.
3. Como b=0, también c=0.
4. Sustituimos en 2a+c=1:
2a=1, luego a=1/2.
Resultado final: X=((1/2,0),(0,0)).`
      }
    },

    "mates2-algebra-2f0e891180bf--mates-ii-algebra-2": {
      "Resultado": {
        options: [
          "A⁻¹ existe porque det(A)=-2≠0, pero A⁻¹B no tiene inversa porque det(B)=0.",
          "A⁻¹ no existe porque det(A)=0.",
          "A⁻¹B tiene inversa porque A es invertible.",
          "A⁻¹ existe y A⁻¹B también, pues ambas matrices son cuadradas."
        ],
        correct: 0,
        solution: `Resolución:
1. Calculamos el determinante de A mediante Sarrus:
det(A)=-2≠0.
Por tanto, A es invertible y A⁻¹ existe.
2. Para el producto:
det(A⁻¹B)=det(A⁻¹)·det(B).
3. La segunda fila de B es nula, luego det(B)=0.
4. Entonces:
det(A⁻¹B)=det(A⁻¹)·0=0.
Resultado final: A⁻¹ existe, pero A⁻¹B no tiene inversa.`
      }
    },

    "mates2-algebra-2f0e891180bf--mates-ii-algebra-3": {
      "Resultado": {
        options: ["rango(A)=2", "rango(A)=1", "rango(A)=3", "rango(A)=4"],
        correct: 0,
        solution: `Resolución:
1. La matriz tiene filas:
F₁=(1,1,1,1),
F₂=(0,1,2,1),
F₃=(2,1,0,1).
2. Observamos que:
F₃=2F₁-F₂.
Por tanto, las tres filas son linealmente dependientes y rango(A)≤2.
3. F₁ y F₂ no son proporcionales, luego son linealmente independientes.
Así, rango(A)≥2.
Resultado final: rango(A)=2.`
      }
    },

    "mates2-algebra-753a3da59814": {
      "a)": {
        options: [
          "SCD si a≠-1 y a≠5/2; SI si a=-1 o a=5/2.",
          "SCD para todo a∈R.",
          "SCI si a=-1 o a=5/2; SCD en los demás casos.",
          "SI para todo a∈R."
        ],
        correct: 0,
        solution: `Resolución mediante el teorema de Rouché-Frobenius:
1. La matriz de coeficientes es:
A=((-2,1,-1),(-1,a,1),(2,1,a)).
2. Calculamos su determinante:
det(A)=-2a²+3a+5=(5-2a)(a+1).
3. Si a≠-1 y a≠5/2, det(A)≠0:
rango(A)=rango(A*)=3, igual al número de incógnitas.
El sistema es compatible determinado.
4. Si a=-1, las filas de A cumplen F₁+4F₂+3F₃=0, pero en los términos independientes:
-1+4·2+3·3=16≠0.
Entonces rango(A)=2 y rango(A*)=3: sistema incompatible.
5. Si a=5/2, las filas cumplen 3F₁-2F₂+2F₃=0, pero:
3·(-1)-2·2+2·3=-1≠0.
De nuevo rango(A)=2 y rango(A*)=3: sistema incompatible.
Resultado final: SCD si a≠-1,5/2; SI si a=-1 o a=5/2.`
      },
      "b)": {
        options: [
          "(x,y,z)=(0,1/3,4/3)",
          "(x,y,z)=(1,0,1)",
          "(x,y,z)=(0,4/3,1/3)",
          "El sistema es incompatible para a=2"
        ],
        correct: 0,
        solution: `Resolución:
1. Para a=2 el sistema es compatible determinado:
{-2x+y-z=-1
 -x+2y+z=2
 2x+y+2z=3}.
2. De la primera ecuación:
y=-1+2x+z.
3. Sustituimos en las otras dos:
3x+3z=4,
4x+3z=4.
4. Restamos ambas ecuaciones:
x=0.
5. Sustituimos:
z=4/3,
y=-1+4/3=1/3.
Resultado final: (x,y,z)=(0,1/3,4/3).`
      }
    },

    "mates2-algebra-753a3da59814--mates-ii-algebra-2": {
      "Resultado": {
        options: [
          "rango(A)=3 si a≠±1; rango(A)=2 si a=1 o a=-1.",
          "rango(A)=3 para todo a.",
          "rango(A)=2 si a≠±1; rango(A)=1 si a=±1.",
          "rango(A)=1 si a=1 y rango(A)=3 en los demás casos."
        ],
        correct: 0,
        solution: `Resolución:
1. La matriz es:
A=((-2,1,a),(-1,0,0),(-1,a+1,a+1)).
2. Calculamos su determinante:
det(A)=1-a²=(1-a)(1+a).
3. Si a≠1 y a≠-1, det(A)≠0 y rango(A)=3.
4. Si a=1, las columnas segunda y tercera coinciden, por lo que el rango es menor que 3. El menor formado por las dos primeras filas y las dos primeras columnas vale 1≠0; luego rango(A)=2.
5. Si a=-1, las filas segunda y tercera coinciden, pero la primera y la segunda no son proporcionales; luego rango(A)=2.
Resultado final: rango(A)=3 si a≠±1 y rango(A)=2 si a=±1.`
      }
    },

    "mates2-algebra-753a3da59814--mates-ii-algebra-3": {
      "Resultado": {
        options: ["12", "3", "6", "24"],
        correct: 0,
        solution: `Resolución:
1. El determinante inicial vale 6.
2. En el nuevo determinante, la primera fila es 1/2 de la primera fila original. El determinante queda multiplicado por 1/2.
3. La segunda fila es F₂+2F₁. Sumar a una fila un múltiplo de otra no modifica el determinante.
4. La tercera fila es 4F₃. El determinante queda multiplicado por 4.
5. Por tanto:
D_nuevo=(1/2)·4·D_original=2·6=12.
Resultado final: 12.`
      }
    },

    "mates2-geometria-9273049c43e9": {
      "a)": {
        options: [
          "a=2 y b=-2",
          "a=-2 y b=2",
          "a=1 y b=-1",
          "a=0 y b=0"
        ],
        correct: 0,
        solution: `Resolución:
1. El plano π≡bx+y+z=1 tiene vector normal n⃗=(b,1,1).
2. Para que n⃗ sea perpendicular a u⃗=(1,2,0):
n⃗·u⃗=b+2=0,
b=-2.
3. Para que A(1,1,a) pertenezca a π:
b·1+1+a=1,
a=-b=2.
Resultado final: a=2 y b=-2.`
      },
      "b)": {
        options: [
          "(x,y,z)=(1,1,2)+t(-2,1,1)",
          "(x,y,z)=(1,1,2)+t(1,2,0)",
          "(x,y,z)=t(-2,1,1)",
          "(x,y,z)=(1,1,2)+t(2,-1,-1)"
        ],
        correct: 0,
        solution: `Resolución:
1. Con a=2 y b=-2:
π≡-2x+y+z=1.
2. Su vector normal es n⃗=(-2,1,1).
3. Una recta perpendicular al plano tiene como vector director el vector normal.
4. Como debe pasar por A(1,1,2), su ecuación paramétrica es:
r≡{x=1-2t
    y=1+t
    z=2+t}, t∈R.
Resultado final: (x,y,z)=(1,1,2)+t(-2,1,1).`
      }
    },

    "mates2-geometria-9273049c43e9--mates-ii-geometria-2": {
      "Resultado": {
        options: [
          "(x,y,z)=(2,1,3)+t(1,-1,0)",
          "(x,y,z)=(2,1,3)+t(2,2,0)",
          "(x,y,z)=(2,1,3)+t(0,0,-1)",
          "(x,y,z)=t(1,1,1)"
        ],
        correct: 0,
        solution: `Resolución:
1. Buscamos un vector perpendicular a u⃗=(2,2,0) y v⃗=(0,0,-1).
2. Calculamos el producto vectorial:
u⃗×v⃗=(-2,2,0).
Podemos tomar como vector director d⃗=(1,-1,0).
3. La recta que pasa por A(2,1,3) es:
r≡{x=2+t
    y=1-t
    z=3}, t∈R.
Resultado final: (x,y,z)=(2,1,3)+t(1,-1,0).`
      }
    },

    "mates2-geometria-9273049c43e9--mates-ii-geometria-3": {
      "Resultado": {
        options: [
          "La recta r está contenida en el plano π₃.",
          "La recta r es paralela a π₃ y no está contenida.",
          "La recta r corta a π₃ en un único punto.",
          "La recta r es perpendicular a π₃."
        ],
        correct: 0,
        solution: `Resolución:
1. La recta r es la intersección:
π₁≡x+y+z=1,
π₂≡y+2z=1.
2. Tomamos z=t. De π₂:
y=1-2t.
En π₁:
x+(1-2t)+t=1, luego x=t.
Así:
r≡(x,y,z)=(0,1,0)+t(1,-2,1).
3. Sustituimos un punto genérico de r en π₃≡2x+y=1:
2t+(1-2t)=1.
La igualdad se cumple para todo t.
Resultado final: r está contenida en π₃.`
      }
    },

    "mates2-geometria-e02400b09476": {
      "a)": {
        options: ["a=1 y b=2", "a=2 y b=1", "a=-1 y b=0", "a=1 y b=-2"],
        correct: 0,
        solution: `Resolución:
1. El punto A(1,0,0) pertenece a π≡ax+y-z=1 si:
a·1+0-0=1,
a=1.
2. El vector normal del plano es n⃗=(1,1,-1).
3. Calculamos:
AB⃗=B-A=(b-1,1,-1).
4. Para que AB⃗ sea perpendicular al plano debe ser paralelo a n⃗. Como las componentes segunda y tercera ya coinciden, debe cumplirse:
b-1=1,
b=2.
Resultado final: a=1 y b=2.`
      },
      "b)": {
        options: [
          "(x,y,z)=(1,0,0)+t(1,1,-1)",
          "(x,y,z)=(2,1,-1)+t(1,0,0)",
          "(x,y,z)=(1,0,0)+t(1,-1,1)",
          "(x,y,z)=t(1,1,-1)"
        ],
        correct: 0,
        solution: `Resolución:
1. Con a=1, el plano es:
π≡x+y-z=1.
2. Su vector normal es n⃗=(1,1,-1).
3. La recta perpendicular al plano y que pasa por A(1,0,0) tiene ecuación paramétrica:
r≡{x=1+t
    y=t
    z=-t}, t∈R.
Resultado final: (x,y,z)=(1,0,0)+t(1,1,-1).`
      }
    },

    "mates2-geometria-e02400b09476--mates-ii-geometria-2": {
      "Resultado": {
        options: ["√2", "2", "1/√2", "3/√2"],
        correct: 0,
        solution: `Resolución:
1. El plano es π≡x-y-1=0 y el punto A(1,2,1).
2. Aplicamos la fórmula de la distancia de un punto a un plano:
d(A,π)=|1·1-1·2+0·1-1|/√(1²+(-1)²+0²).
3. Calculamos:
d(A,π)=|-2|/√2=2/√2=√2.
Resultado final: d(A,π)=√2.`
      }
    },

    "mates2-geometria-e02400b09476--mates-ii-geometria-3": {
      "Resultado": {
        options: [
          "α=arccos(8/√66)",
          "α=arccos(7/√66)",
          "α=π/2",
          "α=arccos(8/11)"
        ],
        correct: 0,
        solution: `Resolución:
1. Aplicamos:
cos α=(u⃗·v⃗)/(|u⃗|·|v⃗|).
2. Producto escalar:
u⃗·v⃗=1·3+1·2+1·3=8.
3. Módulos:
|u⃗|=√(1²+1²+1²)=√3,
|v⃗|=√(3²+2²+3²)=√22.
4. Por tanto:
cos α=8/(√3·√22)=8/√66.
Resultado final: α=arccos(8/√66).`
      }
    }
  });
})();

// Matemáticas II · bloque de Análisis · convocatorias de junio y julio de 2023.
(() => {
  "use strict";

  const answers = window.MATES_II_EXAM_ANSWERS =
    window.MATES_II_EXAM_ANSWERS || {};

  Object.assign(answers, {
    "mates2-analisis-57fc5bb3efc1": {
      "a)": {
        options: [
          "Si f es continua en [a,b] y f(a)·f(b)<0, existe al menos un c∈(a,b) tal que f(c)=0.",
          "Si f es derivable en (a,b), existe siempre un c con f(c)=0.",
          "Si f(a)=f(b), entonces f es constante en [a,b].",
          "Si f es continua en (a,b), entonces tiene exactamente una raíz."
        ],
        correct: 0,
        solution: `Resolución:
El teorema de Bolzano afirma que, si una función f es continua en un intervalo cerrado [a,b] y los valores de sus extremos tienen signos contrarios, es decir, f(a)·f(b)<0, entonces existe al menos un punto c∈(a,b) tal que f(c)=0.
El teorema garantiza la existencia de una raíz, pero no que sea única.`
      },
      "b)": {
        options: [
          "Sí, porque f es continua en [0,2], f(0)=-10 y f(2)=28.",
          "No, porque f(0) y f(2) tienen el mismo signo.",
          "Sí, porque f'(0)=0.",
          "No puede aplicarse Bolzano porque f es un polinomio."
        ],
        correct: 0,
        solution: `Resolución:
1. f(x)=x³+6x²+3x-10 es un polinomio; por tanto, es continua en [0,2].
2. Calculamos los valores en los extremos:
f(0)=-10,
f(2)=2³+6·2²+3·2-10=8+24+6-10=28.
3. Como f(0)·f(2)=-10·28<0, los valores tienen signos contrarios.
4. Por el teorema de Bolzano, existe al menos un c∈(0,2) tal que f(c)=0.
Resultado final: f tiene al menos una raíz en (0,2).`
      },
      "c)": {
        options: [
          "No; f'(x)=3x²+12x+3>0 en [0,2], luego f es estrictamente creciente.",
          "Sí; todo polinomio cúbico tiene tres raíces en cualquier intervalo.",
          "Sí; Bolzano garantiza al menos dos raíces.",
          "No; porque f''(x)=0 en todo el intervalo."
        ],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
f'(x)=3x²+12x+3.
2. Si x∈[0,2], entonces 3x²≥0, 12x≥0 y, por tanto,
f'(x)=3x²+12x+3≥3>0.
3. La función es estrictamente creciente en [0,2].
4. Una función estrictamente creciente no puede tomar el valor 0 dos veces en el mismo intervalo.
Resultado final: la raíz cuya existencia garantiza Bolzano es única en [0,2].`
      }
    },

    "mates2-analisis-57fc5bb3efc1--mates-ii-analisis-2": {
      "Resultado": {
        options: [
          "(1-3x)^(1/3)+2(1-3x)^(1/6)+2 ln|1-(1-3x)^(1/6)|+C",
          "(1-3x)^(1/3)-2(1-3x)^(1/6)+C",
          "2 ln|1-3x|+C",
          "-(1-3x)^(1/3)-2(1-3x)^(1/6)+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Utilizamos el cambio indicado:
1-3x=t⁶.
Entonces, -3 dx=6t⁵ dt y dx=-2t⁵ dt.
2. Además:
(1-3x)^(1/2)=t³,
(1-3x)^(2/3)=t⁴.
3. Sustituimos en la integral:
∫ dx/[t³-t⁴]=∫[-2t⁵/(t³(1-t))]dt=∫[-2t²/(1-t)]dt.
4. Dividimos:
-2t²/(1-t)=2t+2-2/(1-t).
5. Integramos término a término:
∫[2t+2-2/(1-t)]dt=t²+2t+2 ln|1-t|+C.
6. Deshacemos el cambio t=(1-3x)^(1/6):
(1-3x)^(1/3)+2(1-3x)^(1/6)+2 ln|1-(1-3x)^(1/6)|+C.
Resultado final: (1-3x)^(1/3)+2(1-3x)^(1/6)+2 ln|1-(1-3x)^(1/6)|+C.`
      }
    },

    "mates2-analisis-57fc5bb3efc1--mates-ii-analisis-3": {
      "Resultado": {
        options: ["+∞", "e^(1/5)", "1", "0"],
        correct: 0,
        solution: `Resolución:
1. Reescribimos:
[(5x+1)/(5x)]^(x²)=[1+1/(5x)]^(x²).
2. Es una indeterminación del tipo 1^∞. Aplicamos la fórmula del número e:
lim [1+u(x)]^v(x)=e^(lim u(x)·v(x)).
3. En este caso:
u(x)=1/(5x), v(x)=x².
4. Calculamos el exponente:
lim[x→+∞] u(x)·v(x)=lim[x→+∞] x²/(5x)=lim[x→+∞]x/5=+∞.
5. Por tanto:
lim[x→+∞][1+1/(5x)]^(x²)=e^(+∞)=+∞.
Resultado final: +∞.`
      }
    },

    "mates2-analisis-57fc5bb3efc1--mates-ii-analisis-4": {
      "Resultado": {
        options: [
          "Máximo en (-1-√6/3, 4+4√6/9) y mínimo en (-1+√6/3, 4-4√6/9)",
          "Mínimo en (-1-√6/3, 4+4√6/9) y máximo en (-1+√6/3, 4-4√6/9)",
          "Máximo en (-1,4) y mínimo en (1,8)",
          "No tiene extremos relativos"
        ],
        correct: 0,
        solution: `Resolución:
1. Derivamos:
f'(x)=3x²+6x+1.
2. Igualamos a cero:
3x²+6x+1=0,
x=(-6±√36-12)/6=-1±√6/3.
3. Estudiamos el signo de f' en la recta real:
(-∞,-1-√6/3): f'(x)>0, la función crece.
(-1-√6/3,-1+√6/3): f'(x)<0, la función decrece.
(-1+√6/3,+∞): f'(x)>0, la función crece.
4. Por el cambio de signo:
en x=-1-√6/3 hay un máximo relativo;
en x=-1+√6/3 hay un mínimo relativo.
5. Sustituimos ambas abscisas en f:
f(-1-√6/3)=4+4√6/9,
f(-1+√6/3)=4-4√6/9.
Resultado final: máximo en (-1-√6/3, 4+4√6/9) y mínimo en (-1+√6/3, 4-4√6/9).`
      }
    },

    "mates2-analisis-1e7470cab59f": {
      "a)": {
        options: [
          "A(h)=40h-(4+π)h²/8",
          "A(h)=80h-(2+π)h²",
          "A(h)=40h-πh²/8",
          "A(h)=h²+40h"
        ],
        correct: 0,
        solution: `Resolución:
1. El rectángulo tiene lados h y r, y el semicírculo tiene radio h/2.
2. El perímetro exterior es:
2r+h+πh/2=80.
3. Despejamos r:
2r=80-h-πh/2,
r=40-(2+π)h/4.
4. El área total es la del rectángulo más la del semicírculo:
A(h)=hr+[π(h/2)²]/2=hr+πh²/8.
5. Sustituimos r:
A(h)=h[40-(2+π)h/4]+πh²/8
=40h-(4+π)h²/8.
Resultado final: A(h)=40h-(4+π)h²/8.`
      },
      "b)": {
        options: [
          "h=160/(4+π) m y r=80/(4+π) m",
          "h=r=80/(4+π) m",
          "h=80/(2+π) m y r=40 m",
          "h=40/(4+π) m y r=160/(4+π) m"
        ],
        correct: 0,
        solution: `Resolución:
1. Partimos de:
A(h)=40h-(4+π)h²/8.
2. Derivamos:
A'(h)=40-(4+π)h/4.
3. Igualamos a cero:
40-(4+π)h/4=0,
h=160/(4+π).
4. Como A''(h)=-(4+π)/4<0, se trata de un máximo.
5. Calculamos r:
r=40-(2+π)h/4
=40-(2+π)·40/(4+π)
=80/(4+π).
Resultado final: h=160/(4+π) m y r=80/(4+π) m.`
      }
    },

    "mates2-analisis-1e7470cab59f--mates-ii-analisis-2": {
      "Resultado": {
        options: ["9/2 unidades cuadradas", "3 unidades cuadradas", "9 unidades cuadradas", "27/2 unidades cuadradas"],
        correct: 0,
        solution: `Resolución:
1. Las curvas son:
f(x)=x²-2x+3,
g(x)=x²/2+1.
2. Calculamos su punto de corte:
x²-2x+3=x²/2+1,
x²-4x+4=0,
(x-2)²=0,
x=2.
3. La otra frontera es la recta x=-1. En [-1,2], f(x)≥g(x), pues:
f(x)-g(x)=x²/2-2x+2=(x-2)²/2≥0.
4. El área es:
A=∫[-1,2] [f(x)-g(x)] dx
=∫[-1,2] (x²/2-2x+2) dx.
5. Aplicamos la regla de Barrow:
A=[x³/6-x²+2x] de -1 a 2
=4/3-(-19/6)=27/6=9/2.
Resultado final: A=9/2 unidades cuadradas.`
      }
    },

    "mates2-analisis-1e7470cab59f--mates-ii-analisis-3": {
      "Resultado": {
        options: ["4", "3", "9", "1/3"],
        correct: 0,
        solution: `Resolución:
1. Al sustituir x=3 obtenemos 0/0, por lo que aplicamos la regla de L'Hôpital.
2. Derivamos numerador y denominador:
lim[x→3] (3x²-6x+3)/3.
3. Sustituimos x=3:
(3·3²-6·3+3)/3=(27-18+3)/3=12/3=4.
Resultado final: el límite vale 4.`
      }
    },

    "mates2-analisis-1e7470cab59f--mates-ii-analisis-4": {
      "Resultado": {
        options: [
          "-(2x+7)e^(-2x)/4+C",
          "(2x+7)e^(-2x)/4+C",
          "-(x+3)e^(-2x)/2+C",
          "(x+3)e^(-2x)+C"
        ],
        correct: 0,
        solution: `Resolución:
1. Integramos por partes:
u=x+3, dv=e^(-2x)dx.
Entonces:
du=dx, v=-e^(-2x)/2.
2. Aplicamos ∫u·dv=u·v-∫v·du:
∫(x+3)e^(-2x)dx
=-(x+3)e^(-2x)/2+1/2∫e^(-2x)dx.
3. Integramos el término restante:
1/2∫e^(-2x)dx=-e^(-2x)/4.
4. Reunimos:
-(x+3)e^(-2x)/2-e^(-2x)/4
=-(2x+7)e^(-2x)/4+C.
Resultado final: -(2x+7)e^(-2x)/4+C.`
      }
    }
  });
})();
