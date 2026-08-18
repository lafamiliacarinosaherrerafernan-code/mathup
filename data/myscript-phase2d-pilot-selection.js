(function initializeMyScriptPhase2DPilotSelection(global) {
  "use strict";

  // Es una selección por referencia de los corpus 2C existentes, no un tercer corpus.
  const groups = [
    ["numeros-decimales", "basic", [
      "phase2c-enteros-decimales-01", "phase2c-enteros-decimales-04",
      "phase2c-enteros-decimales-06", "phase2c-enteros-decimales-10"
    ]],
    ["fracciones", "basic", [
      "phase2c-fracciones-01", "phase2c-fracciones-03", "phase2c-fracciones-07",
      "phase2c-fracciones-10", "phase2c-fracciones-15"
    ]],
    ["potencias-raices", "basic", [
      "phase2c-potencias-01", "phase2c-potencias-04", "phase2c-potencias-08",
      "phase2c-raices-02", "phase2c-raices-05"
    ]],
    ["algebra-ecuaciones", "basic", [
      "phase2c-algebra-03", "phase2c-algebra-07", "phase2c-algebra-12",
      "phase2c-ecuaciones-04", "phase2c-ecuaciones-08", "phase2c-ecuaciones-14"
    ]],
    ["inecuaciones-intervalos-coordenadas", "basic", [
      "phase2c-desigualdades-intervalos-03", "phase2c-desigualdades-intervalos-06",
      "phase2c-desigualdades-intervalos-08", "phase2c-coordenadas-04"
    ]],
    ["matrices", "advanced", [
      ["matrices", 0], ["matrices", 1], ["matrices", 2], ["matrices", 5]
    ]],
    ["determinantes", "advanced", [
      ["determinantes", 0], ["determinantes", 1], ["determinantes", 5]
    ]],
    ["sistemas", "advanced", [
      ["sistemas", 0], ["sistemas", 1], ["sistemas", 2]
    ]],
    ["limites", "advanced", [
      ["limites", 1], ["limites", 2], ["limites", 3], ["limites", 4], ["limites", 5]
    ]],
    ["derivadas", "advanced", [
      ["derivadas", 0], ["derivadas", 1], ["derivadas", 3], ["derivadas", 4], ["derivadas", 7]
    ]],
    ["funciones-trigonometria-logaritmos", "advanced", [
      ["funciones", 4], ["trigonometria", 0], ["trigonometria", 2],
      ["logaritmos-exponenciales", 2], ["logaritmos-exponenciales", 4]
    ]],
    ["vectores-complejos-geometria", "advanced", [
      ["vectores-geometria", 0], ["vectores-geometria", 5],
      ["numeros-complejos", 0], ["numeros-complejos", 4]
    ]],
    ["probabilidad-estadistica-integrales", "advanced", [
      ["probabilidad", 3], ["distribuciones-inferencia", 1],
      ["integrales", 0], ["integrales", 2]
    ]],
    ["notacion-confusa", "advanced", [
      ["parametros-griegas-confusiones", 2],
      ["parametros-griegas-confusiones", 4],
      ["parametros-griegas-confusiones", 8]
    ]]
  ];

  const selection = [];
  groups.forEach(([category, source, references]) => {
    references.forEach((reference) => {
      const index = selection.length;
      selection.push(Object.freeze({
        pilotId: `phase2d-${String(index + 1).padStart(2, "0")}`,
        category,
        source,
        sourceRef: source === "basic"
          ? String(reference)
          : Object.freeze({ family: String(reference[0]), sampleIndex: Number(reference[1]) }),
        assignedWriter: `writer-${(index % 3) + 1}`
      }));
    });
  });

  global.MARGARITA_MYSCRIPT_PHASE2D_SELECTION = Object.freeze(selection);
})(typeof window !== "undefined" ? window : globalThis);
