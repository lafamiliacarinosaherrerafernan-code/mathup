(function () {
  "use strict";

  function gcd(a, b) {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) [x, y] = [y, x % y];
    return x || 1;
  }

  function fraction(numerator, denominator) {
    const sign = denominator < 0 ? -1 : 1;
    const divisor = gcd(numerator, denominator);
    const top = sign * numerator / divisor;
    const bottom = Math.abs(denominator) / divisor;
    return bottom === 1 ? String(top) : `frac{${top}}{${bottom}}`;
  }

  function choose(n, r) {
    const k = Math.min(r, n - r);
    let result = 1;
    for (let i = 1; i <= k; i += 1) result = result * (n - k + i) / i;
    return result;
  }

  function question(source, text, correct, distractors, solution) {
    const options = [String(correct), ...distractors.map(String)];
    let filler = 1;
    while (new Set(options).size < 4) {
      const candidate = `${correct} ${filler % 2 ? "+" : "−"} ${Math.ceil(filler / 2)}`;
      if (!options.includes(candidate)) options.push(candidate);
      filler += 1;
    }
    return {
      source,
      text,
      options: [...new Set(options)].slice(0, 4),
      correct: 0,
      solution: `Resolución:\n${solution}\nResultado final: ${correct}.`
    };
  }

  function realQuestion(i, source) {
    const k = 2 + (i % 8);
    const m = [2, 3, 5, 6, 7][i % 5];
    switch (i % 5) {
      case 0:
        return question(source, `Simplifica: √(${k * k * m}).`, `${k}√(${m})`, [`${k * m}`, `${k * k}√(${m})`, `√(${k * m})`],
          `1. Descomponemos ${k * k * m}=${k}²·${m}.\n2. Extraemos el cuadrado perfecto: √(${k}²·${m})=${k}√(${m}).`);
      case 1:
        return question(source, `Calcula: log_${k}(${k}^${m}).`, m, [k, k * m, m + 1],
          `1. Usamos log_a(a^n)=n.\n2. La base del logaritmo y la potencia es ${k}; el exponente es ${m}.`);
      case 2:
        return question(source, `Racionaliza: frac{${k}}{√(${m})}.`, `frac{${k}√(${m})}{${m}}`, [`frac{√(${m})}{${k}}`, `${k}√(${m})`, `frac{${m}√(${k})}{${k}}`],
          `1. Multiplicamos numerador y denominador por √(${m}).\n2. frac{${k}}{√(${m})}=frac{${k}√(${m})}{${m}}.`);
      case 3:
        return question(source, `Simplifica: frac{${k}^${m + 2}}{${k}^${m}}.`, `${k}²`, [`${k}^${2 * m + 2}`, `${k}^${m}`, `${k}^${m + 2}`],
          `1. Las potencias tienen la misma base.\n2. Restamos exponentes: ${m + 2}−${m}=2.`);
      default:
        return question(source, `Escribe ${k * 1000000} en notación científica.`, `${k}·10^6`, [`${k}·10^5`, `${k * 10}·10^6`, `${k}·10^−6`],
          `1. Colocamos la coma tras la primera cifra no nula.\n2. La desplazamos seis lugares hacia la izquierda, por eso el exponente es 6.`);
    }
  }

  function complexQuestion(i, source) {
    const a = 2 + (i % 7);
    const b = 1 + ((i * 3) % 6);
    switch (i % 5) {
      case 0:
        return question(source, `Calcula: (${a}+${b}i)+(${b}−${a}i).`, `${a + b}${b - a >= 0 ? "+" : ""}${b - a}i`, [`${a - b}+${a + b}i`, `${a + b}+${a + b}i`, `${a * b}i`],
          `1. Sumamos las partes reales: ${a}+${b}=${a + b}.\n2. Sumamos las partes imaginarias: ${b}−${a}=${b - a}.`);
      case 1:
        return question(source, `Calcula el conjugado de z=${a}−${b}i.`, `${a}+${b}i`, [`−${a}+${b}i`, `${a}−${b}i`, `−${a}−${b}i`],
          `1. El conjugado conserva la parte real.\n2. Cambiamos el signo de la parte imaginaria.`);
      case 2:
        return question(source, `Calcula: (${a}+${b}i)(${a}−${b}i).`, a * a + b * b, [a * a - b * b, 2 * a * b, `${a * a + b * b}i`],
          `1. Son números conjugados: (a+bi)(a−bi)=a²+b².\n2. Sustituimos: ${a}²+${b}²=${a * a + b * b}.`);
      case 3: {
        const scale = 1 + (i % 5);
        return question(source, `Calcula el módulo de z=${3 * scale}+${4 * scale}i.`, 5 * scale, [7 * scale, 25 * scale * scale, scale],
          `1. |z|=√(a²+b²).\n2. |z|=√(${3 * scale}²+${4 * scale}²)=√(${25 * scale * scale})=${5 * scale}.`);
      }
      default:
        return question(source, `Resuelve: z+(${a}−${b}i)=${a + b}+${a}i.`, `${b}+${a + b}i`, [`${b}+${a - b}i`, `${a}+${b}i`, `${a + b}+${a + b}i`],
          `1. Restamos (${a}−${b}i) en ambos miembros.\n2. Parte real: ${a + b}−${a}=${b}.\n3. Parte imaginaria: ${a}−(−${b})=${a + b}.`);
    }
  }

  function equationQuestion(i, source, inequalitiesOnly = false) {
    const a = 2 + (i % 7);
    const root = 1 + ((i * 3 + Math.floor(i / 4)) % 20);
    if (inequalitiesOnly) {
      switch (i % 4) {
        case 0:
          return question(source, `Resuelve la inecuación: ${a}x−${a * root}<0.`, `x<${root}`, [`x>${root}`, `x<${a * root}`, `x>${a * root}`],
            `1. Sumamos ${a * root}: ${a}x<${a * root}.\n2. Dividimos entre ${a}>0; no cambia el sentido: x<${root}.`);
        case 1:
          return question(source, `Resuelve: (x−${root})(x−${root + 3})≤0.`, `[${root},${root + 3}]`, [`(−∞,${root}]∪[${root + 3},∞)`, `(${root},${root + 3})`, `[${root + 3},∞)`],
            `1. Los ceros son x=${root} y x=${root + 3}.\n2. El producto es negativo entre las raíces y vale cero en ellas.\n3. Como aparece ≤, incluimos los extremos.`);
        case 2:
          return question(source, `Resuelve el sistema: x>${root} y x≤${root + 4}.`, `(${root},${root + 4}]`, [`[${root},${root + 4})`, `(−∞,${root}]`, `[${root + 4},∞)`],
            `1. Representamos ambas condiciones en la recta real.\n2. Tomamos su intersección: mayor que ${root} y menor o igual que ${root + 4}.`);
        default:
          return question(source, `Resuelve: frac{x−${root}}{x−${root + 2}}>0.`, `(−∞,${root})∪(${root + 2},∞)`, [`(${root},${root + 2})`, `[${root},${root + 2}]`, `(−∞,${root + 2})`],
            `1. Los puntos críticos son ${root} (cero) y ${root + 2} (no pertenece al dominio).\n2. La tabla de signos es positiva fuera de ambos puntos.\n3. Al ser >0, no incluimos los extremos.`);
      }
    }
    switch (i % 5) {
      case 0:
        return question(source, `Resuelve: ${a}x+${a}=${a * (root + 1)}.`, `x=${root}`, [`x=${root + 1}`, `x=${a * root}`, `x=${root - 1}`],
          `1. Restamos ${a}: ${a}x=${a * root}.\n2. Dividimos entre ${a}: x=${root}.`);
      case 1:
        return question(source, `Resuelve: x²−${2 * root}x+${root * root}=0.`, `x=${root}`, [`x=−${root}`, `x=0`, `x=${2 * root}`],
          `1. Reconocemos un cuadrado perfecto: (x−${root})²=0.\n2. Por tanto, la raíz doble es x=${root}.`);
      case 2:
        return question(source, `Resuelve el sistema: {x+y=${root + a}; x−y=${root - a}}.`, `x=${root}, y=${a}`, [`x=${a}, y=${root}`, `x=${root + a}, y=0`, `x=${root - a}, y=${a}`],
          `1. Sumamos las ecuaciones: 2x=${2 * root}.\n2. x=${root}.\n3. Sustituimos en x+y=${root + a}: y=${a}.`);
      case 3:
        return question(source, `Resuelve: ${a}^(x+1)=${a}^${root + 1}.`, `x=${root}`, [`x=${root + 1}`, `x=${a}`, `x=${root - 1}`],
          `1. Las bases son iguales y positivas, distintas de 1.\n2. Igualamos exponentes: x+1=${root + 1}.\n3. Restamos 1: x=${root}.`);
      default:
        return question(source, `Resuelve: log_${a}(x)=${root}.`, `x=${a ** root}`, [`x=${a * root}`, `x=${root ** a}`, `x=${root}`],
          `1. Pasamos a forma exponencial: x=${a}^${root}.\n2. Calculamos la potencia: x=${a ** root}.`);
    }
  }

  function trigonometryQuestion(i, source) {
    const scale = 1 + (i % 8);
    switch (i % 5) {
      case 0:
        return question(source, `En un triángulo rectángulo, el cateto opuesto a α mide ${3 * scale} y la hipotenusa ${5 * scale}. Calcula sen(α).`, `frac{3}{5}`, [`frac{4}{5}`, `frac{3}{4}`, `frac{5}{3}`],
          `1. sen(α)=cateto opuesto/hipotenusa.\n2. sen(α)=frac{${3 * scale}}{${5 * scale}}=frac{3}{5}.`);
      case 1:
        return question(source, `Calcula exactamente cos(${i % 2 ? 60 : 300}°).`, `frac{1}{2}`, [`frac{√(3)}{2}`, `−frac{1}{2}`, `1`],
          `1. Reducimos al ángulo de referencia de 60°.\n2. En el cuadrante correspondiente el coseno es positivo.\n3. cos(60°)=frac{1}{2}.`);
      case 2:
        return question(source, `Simplifica: sen²(α)+cos²(α)+${scale}.`, scale + 1, [scale, scale + 2, 2 * scale],
          `1. Aplicamos la identidad fundamental sen²(α)+cos²(α)=1.\n2. Sumamos ${scale}: 1+${scale}=${scale + 1}.`);
      case 3:
        return question(source, `Si tg(α)=frac{${3 * scale}}{${4 * scale}}, calcula el cociente cateto opuesto/cateto adyacente.`, `frac{3}{4}`, [`frac{4}{3}`, `frac{3}{5}`, `frac{4}{5}`],
          `1. Por definición, tg(α)=cateto opuesto/cateto adyacente.\n2. Simplificamos frac{${3 * scale}}{${4 * scale}}=frac{3}{4}.`);
      default:
        return question(source, "Resuelve sen(x)=0 en [0,2π].", "x=0, π, 2π", ["x=π/2, 3π/2", "x=0, π", "x=π/4, 5π/4"],
          "1. El seno se anula en los múltiplos enteros de π.\n2. En el intervalo cerrado [0,2π] aparecen 0, π y 2π.");
    }
  }

  function analyticGeometryQuestion(i, source) {
    const a = 1 + (i % 8);
    const b = 2 + ((i * 3) % 7);
    switch (i % 5) {
      case 0:
        return question(source, `Calcula la pendiente de la recta que pasa por A(${a},${b}) y B(${a + 2},${b + 6}).`, 3, [2, 6, fraction(1, 3)],
          `1. m=frac{y₂−y₁}{x₂−x₁}.\n2. m=frac{${b + 6}−${b}}{${a + 2}−${a}}=frac{6}{2}=3.`);
      case 1:
        return question(source, `Halla el punto medio de A(${a},${b}) y B(${a + 4},${b + 2}).`, `(${a + 2},${b + 1})`, [`(${a + 4},${b + 2})`, `(2,1)`, `(${a + 1},${b + 2})`],
          `1. M=paren{frac{x₁+x₂}{2},frac{y₁+y₂}{2}}.\n2. M=paren{frac{${a}+${a + 4}}{2},frac{${b}+${b + 2}}{2}}=(${a + 2},${b + 1}).`);
      case 2:
        return question(source, `Calcula la distancia entre A(${a},${b}) y B(${a + 3},${b + 4}).`, 5, [7, 25, 1],
          `1. d=√[(x₂−x₁)²+(y₂−y₁)²].\n2. d=√(3²+4²)=√25=5.`);
      case 3:
        return question(source, `Halla la ecuación de la recta de pendiente ${a} que pasa por P(1,${b}).`, `y−${b}=${a}(x−1)`, [`y−1=${a}(x−${b})`, `y=${a}x`, `y−${b}=frac{1}{${a}}(x−1)`],
          `1. Usamos la ecuación punto-pendiente y−y₀=m(x−x₀).\n2. Sustituimos P(1,${b}) y m=${a}.`);
      default:
        return question(source, `Una recta tiene pendiente ${a}. ¿Cuál es la pendiente de una recta perpendicular?`, `−frac{1}{${a}}`, [`frac{1}{${a}}`, `−${a}`, `${a}`],
          `1. Las pendientes de rectas perpendiculares cumplen m·m'=−1.\n2. ${a}·m'=−1.\n3. Despejamos: m'=−frac{1}{${a}}.`);
    }
  }

  function conicQuestion(i, source) {
    const h = 1 + (i % 7);
    const k = 2 + ((i * 2) % 7);
    const r = 2 + ((i * 3) % 6);
    switch (i % 5) {
      case 0:
        return question(source, `Indica el centro de (x−${h})²+(y−${k})²=${r * r}.`, `C(${h},${k})`, [`C(−${h},−${k})`, `C(${k},${h})`, `C(0,0)`],
          `1. Comparamos con (x−h)²+(y−k)²=r².\n2. El centro es C(h,k)=C(${h},${k}).`);
      case 1:
        return question(source, `Indica el radio de (x−${h})²+(y+${k})²=${r * r}.`, r, [r * r, 2 * r, h + k],
          `1. En la ecuación reducida de la circunferencia, el segundo miembro es r².\n2. r=√(${r * r})=${r}.`);
      case 2:
        return question(source, `Halla el vértice de y=(x−${h})²+${k}.`, `V(${h},${k})`, [`V(−${h},${k})`, `V(${h},−${k})`, `V(0,${k})`],
          `1. La forma y=(x−h)²+k tiene vértice V(h,k).\n2. Sustituimos h=${h}, k=${k}.`);
      case 3:
        return question(source, `En la elipse frac{x²}{${r * r}}+frac{y²}{${(r + 2) ** 2}}=1, ¿cuál es el semieje mayor?`, r + 2, [r, (r + 2) ** 2, 2 * (r + 2)],
          `1. Los denominadores son los cuadrados de los semiejes.\n2. El mayor es √(${(r + 2) ** 2})=${r + 2}.`);
      default:
        return question(source, `Indica el eje de simetría de la parábola y=(x−${h})²−${k}.`, `x=${h}`, [`y=${h}`, `x=−${h}`, `y=−${k}`],
          `1. En y=(x−h)²+k el eje de simetría es vertical.\n2. Su ecuación es x=h=${h}.`);
    }
  }

  function functionQuestion(i, source) {
    const a = 2 + (i % 7);
    const b = 1 + ((i * 3) % 8);
    const x = 1 + ((i * 5) % 6);
    switch (i % 5) {
      case 0:
        return question(source, `Sea f(x)=${a}x−${b}. Calcula f(${x}).`, a * x - b, [a + x - b, a * x + b, x - b],
          `1. Sustituimos x=${x}.\n2. f(${x})=${a}·${x}−${b}=${a * x - b}.`);
      case 1:
        return question(source, `Halla el cero de f(x)=${a}x−${a * x}.`, `x=${x}`, [`x=${a * x}`, `x=−${x}`, `x=0`],
          `1. Igualamos f(x) a cero: ${a}x−${a * x}=0.\n2. ${a}x=${a * x}.\n3. Dividimos entre ${a}: x=${x}.`);
      case 2:
        return question(source, `Indica el dominio de f(x)=√(x−${b}).`, `[${b},∞)`, [`(${b},∞)`, `(−∞,${b}]`, "ℝ"],
          `1. El radicando debe ser no negativo: x−${b}≥0.\n2. Por tanto, x≥${b}.`);
      case 3:
        return question(source, `Halla la inversa de f(x)=${a}x+${b}.`, `f^−1(x)=frac{x−${b}}{${a}}`, [`f^−1(x)=${a}x−${b}`, `f^−1(x)=frac{x+${b}}{${a}}`, `f^−1(x)=frac{${a}}{x−${b}}`],
          `1. Escribimos y=${a}x+${b}.\n2. Intercambiamos x e y: x=${a}y+${b}.\n3. Despejamos y=frac{x−${b}}{${a}}.`);
      default:
        return question(source, `Sean f(x)=${a}x y g(x)=x+${b}. Calcula (f∘g)(${x}).`, a * (x + b), [a * x + b, x + a * b, a + x + b],
          `1. (f∘g)(${x})=f(g(${x})).\n2. g(${x})=${x}+${b}=${x + b}.\n3. f(${x + b})=${a}·${x + b}=${a * (x + b)}.`);
    }
  }

  function probabilityQuestion(i, source) {
    const red = 2 + (i % 7);
    const blue = 3 + ((i * 3) % 8);
    const total = red + blue;
    switch (i % 5) {
      case 0:
        return question(source, `Una urna contiene ${red} bolas rojas y ${blue} azules. Calcula P(roja).`, fraction(red, total), [fraction(blue, total), fraction(red, blue), fraction(total, red)],
          `1. Casos favorables: ${red}.\n2. Casos posibles: ${red}+${blue}=${total}.\n3. P(roja)=frac{${red}}{${total}}=${fraction(red, total)}.`);
      case 1:
        return question(source, `Si P(A)=frac{${red}}{${total}}, calcula P(A^c).`, fraction(blue, total), [fraction(red, total), fraction(total, blue), fraction(red, blue)],
          `1. P(A^c)=1−P(A).\n2. P(A^c)=1−frac{${red}}{${total}}=frac{${blue}}{${total}}=${fraction(blue, total)}.`);
      case 2:
        return question(source, `A y B son incompatibles, P(A)=frac{1}{${red}} y P(B)=frac{1}{${blue}}. Calcula P(A∪B).`, fraction(red + blue, red * blue), [fraction(1, red * blue), fraction(blue - red, red * blue), "1"],
          `1. Para sucesos incompatibles, P(A∪B)=P(A)+P(B).\n2. frac{1}{${red}}+frac{1}{${blue}}=${fraction(red + blue, red * blue)}.`);
      case 3:
        return question(source, `A y B son independientes, P(A)=frac{1}{${red}} y P(B)=frac{1}{${blue}}. Calcula P(A∩B).`, fraction(1, red * blue), [fraction(red + blue, red * blue), fraction(1, red + blue), "1"],
          `1. Para sucesos independientes, P(A∩B)=P(A)·P(B).\n2. frac{1}{${red}}·frac{1}{${blue}}=${fraction(1, red * blue)}.`);
      default:
        return question(source, `Se lanza un dado equilibrado. Calcula la probabilidad de obtener un número mayor que ${i % 2 ? 4 : 3}.`, i % 2 ? fraction(2, 6) : fraction(3, 6), [fraction(1, 6), fraction(4, 6), fraction(5, 6)],
          `1. Enumeramos los resultados favorables.\n2. Dividimos entre los 6 resultados posibles y simplificamos.`);
    }
  }

  function statisticsQuestion(i, source) {
    const a = 2 + (i % 8);
    const data = [a, a + 2, a + 2, a + 4, a + 7];
    switch (i % 5) {
      case 0:
        return question(source, `Calcula la media de ${a}, ${a + 2}, ${a + 4} y ${a + 6}.`, a + 3, [a + 2, a + 4, 4 * a + 12],
          `1. Sumamos: ${a}+${a + 2}+${a + 4}+${a + 6}=${4 * a + 12}.\n2. Dividimos entre 4: ${4 * a + 12}/4=${a + 3}.`);
      case 1:
        return question(source, `Calcula la mediana de los datos ordenados ${data.join(", ")}.`, a + 2, [a, a + 4, a + 7],
          `1. Hay cinco datos.\n2. La mediana es el tercero: ${a + 2}.`);
      case 2:
        return question(source, `Calcula la moda de ${data.join(", ")}.`, a + 2, [a, a + 4, a + 7],
          `1. Contamos las frecuencias.\n2. ${a + 2} aparece dos veces y los demás una; por tanto es la moda.`);
      case 3:
        return question(source, `Calcula el rango de ${data.join(", ")}.`, 7, [a + 7, 5, 9],
          `1. El mínimo es ${a} y el máximo ${a + 7}.\n2. Rango=${a + 7}−${a}=7.`);
      default: {
        const weighted = (a * 2 + (a + 2) * 3) / 5;
        return question(source, `Una nota ${a} pesa 2 partes y una nota ${a + 2} pesa 3 partes. Calcula la media ponderada.`, String(weighted).replace(".", ","), [a + 1, a + 2, a],
          `1. Multiplicamos cada nota por su peso: ${a}·2+${a + 2}·3=${a * 2 + (a + 2) * 3}.\n2. Sumamos los pesos: 2+3=5.\n3. Dividimos entre 5.`);
      }
    }
  }

  function binomialQuestion(i, source) {
    const n = 4 + (i % 7);
    const pTop = 1 + (i % 3);
    const pBottom = 4;
    const p = pTop / pBottom;
    const q = 1 - p;
    switch (i % 4) {
      case 0:
        return question(source, `Si X~B(${n},frac{${pTop}}{${pBottom}}), calcula E(X).`, String(n * p).replace(".", ","), [n, String(p).replace(".", ","), String(n * q).replace(".", ",")],
          `1. En una binomial, E(X)=np.\n2. E(X)=${n}·frac{${pTop}}{${pBottom}}=${String(n * p).replace(".", ",")}.`);
      case 1:
        return question(source, `Si X~B(${n},frac{1}{2}), calcula P(X=0).`, fraction(1, 2 ** n), [fraction(n, 2 ** n), fraction(1, n), fraction(1, 2 * n)],
          `1. P(X=0)=paren{frac{1}{2}}^${n}.\n2. Por tanto, P(X=0)=frac{1}{${2 ** n}}.`);
      case 2:
        return question(source, `Si X~B(${n},frac{1}{2}), calcula P(X=1).`, fraction(n, 2 ** n), [fraction(1, 2 ** n), fraction(1, n), fraction(n - 1, 2 ** n)],
          `1. P(X=1)=C(${n},1)paren{frac{1}{2}}paren{frac{1}{2}}^${n - 1}.\n2. C(${n},1)=${n}.\n3. P(X=1)=frac{${n}}{${2 ** n}}=${fraction(n, 2 ** n)}.`);
      default:
        return question(source, `Si X~B(${n},frac{1}{2}), calcula Var(X).`, String(n / 4).replace(".", ","), [String(n / 2).replace(".", ","), n, "0,5"],
          `1. Var(X)=npq.\n2. Var(X)=${n}·frac{1}{2}·frac{1}{2}=frac{${n}}{4}=${String(n / 4).replace(".", ",")}.`);
    }
  }

  function normalQuestion(i, source) {
    const mean = 40 + 2 * (i % 10);
    const deviation = 2 + (i % 5);
    switch (i % 4) {
      case 0:
        return question(source, `Si X~N(${mean},${deviation}), tipifica el valor X=${mean + deviation}.`, "z=1", ["z=−1", "z=0", `z=${deviation}`],
          `1. Tipificamos dentro de la probabilidad con z=frac{X−μ}{σ}.\n2. z=frac{${mean + deviation}−${mean}}{${deviation}}=1.`);
      case 1:
        return question(source, `Si X~N(${mean},${deviation}), tipifica el valor X=${mean - deviation}.`, "z=−1", ["z=1", "z=0", `z=−${deviation}`],
          `1. z=frac{X−μ}{σ}.\n2. z=frac{${mean - deviation}−${mean}}{${deviation}}=−1.`);
      case 2:
        return question(source, `Si X~N(${mean},${deviation}), calcula P(X>${mean + deviation}) sabiendo que P(Z≤1)=0,8413.`, "0,1587", ["0,8413", "0,6826", "1"],
          `1. Tipificamos dentro de la probabilidad: Pparen{frac{X−${mean}}{${deviation}}>frac{${mean + deviation}−${mean}}{${deviation}}}=P(Z>1).\n2. Usamos el suceso contrario: P(Z>1)=1−P(Z≤1).\n3. P(Z>1)=1−0,8413=0,1587.`);
      default:
        return question(source, `Si X~N(${mean},${deviation}), calcula P(${mean - deviation}≤X≤${mean + deviation}) sabiendo que P(Z≤1)=0,8413.`, "0,6826", ["0,8413", "0,1587", "0,3413"],
          `1. Tipificamos ambos extremos dentro de la probabilidad: Pparen{frac{${mean - deviation}−${mean}}{${deviation}}≤Z≤frac{${mean + deviation}−${mean}}{${deviation}}}=P(−1≤Z≤1).\n2. Por simetría, P(Z≤−1)=1−0,8413=0,1587.\n3. P(−1≤Z≤1)=0,8413−0,1587=0,6826.`);
    }
  }

  function combinatoricsQuestion(i, source) {
    const n = 5 + (i % 6);
    switch (i % 5) {
      case 0:
        return question(source, `Calcula ${n}!.`, Array.from({ length: n }, (_, j) => j + 1).reduce((a, b) => a * b, 1), [n * (n - 1), n ** 2, n],
          `1. n!=n·(n−1)·...·1.\n2. Multiplicamos los enteros desde ${n} hasta 1.`);
      case 1:
        return question(source, `¿De cuántas formas pueden ordenarse ${n} objetos distintos?`, Array.from({ length: n }, (_, j) => j + 1).reduce((a, b) => a * b, 1), [n ** 2, n * (n - 1), 2 ** n],
          `1. Es una permutación de ${n} elementos.\n2. P_${n}=${n}!.`);
      case 2:
        return question(source, `Calcula C(${n},2).`, choose(n, 2), [n * 2, n ** 2, n - 2],
          `1. C(n,2)=frac{n(n−1)}{2}.\n2. C(${n},2)=frac{${n}·${n - 1}}{2}=${choose(n, 2)}.`);
      case 3:
        return question(source, `¿Cuántas claves de dos cifras distintas pueden formarse con ${n} cifras disponibles?`, n * (n - 1), [n ** 2, choose(n, 2), 2 * n],
          `1. Importa el orden y no se repiten cifras.\n2. Hay ${n} opciones para la primera y ${n - 1} para la segunda.\n3. Total=${n}·${n - 1}=${n * (n - 1)}.`);
      default:
        return question(source, `Una tarea tiene ${n} opciones para la primera parte y 3 para la segunda. ¿Cuántos resultados distintos hay?`, 3 * n, [n + 3, n ** 3, 3 ** n],
          `1. Aplicamos el principio multiplicativo.\n2. Total=${n}·3=${3 * n}.`);
    }
  }

  function build(courseId, theme) {
    const lower = String(theme || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const source = `Banco de variedad · ${courseId} · ${theme}`;
    const result = [];
    for (let i = 0; i < 40; i += 1) {
      if (lower.includes("estadistica")) result.push(statisticsQuestion(i, source));
      else if (lower.includes("binomial")) result.push(binomialQuestion(i, source));
      else if (lower.includes("normal")) result.push(normalQuestion(i, source));
      else if (lower.includes("probabilidad")) result.push(probabilityQuestion(i, source));
      else if (lower.includes("combinatoria")) result.push(combinatoricsQuestion(i, source));
      else if (lower.includes("complejo")) result.push(complexQuestion(i, source));
      else if (lower.includes("numero") || lower.includes("real")) result.push(realQuestion(i, source));
      else if (courseId === "1bach-mates" && lower.includes("inecuacion")) result.push(equationQuestion(i, source, i % 2 === 1));
      else if (lower.includes("inecuacion")) result.push(equationQuestion(i, source, true));
      else if (lower.includes("ecuacion") || lower.includes("sistema") || lower.includes("inecuacion")) result.push(equationQuestion(i, source));
      else if (lower.includes("trigonometr")) result.push(trigonometryQuestion(i, source));
      else if (lower.includes("geometria analitica")) result.push(analyticGeometryQuestion(i, source));
      else if (lower.includes("conica")) result.push(conicQuestion(i, source));
      else if (lower.includes("funcion")) result.push(functionQuestion(i, source));
    }
    return result;
  }

  window.MargaritaFirstBachVariety = { build };
})();
