(function registerPauStatisticalResources(globalScope) {
  "use strict";

  const sharedArchive = "documentos/PAU Comunidades/MADRID/Tablas de la distribución binomial y normal.pdf";
  const andaluciaNormal = "documentos/PAU Comunidades/Andalucía/CCSS II/Tabla función distribuón normal.pdf";

  globalScope.PAU_STATISTICAL_RESOURCES = Object.freeze({
    BINOMIAL_TABLE: Object.freeze({
      id: "BINOMIAL_TABLE",
      kind: "binomial",
      source: sharedArchive,
      page: 1,
      policy: Object.freeze({ andalucia: "DROPDOWN", madrid: "DROPDOWN", clm: "LOCAL_EXERCISE_TABLE" })
    }),
    NORMAL_STANDARD_TABLE: Object.freeze({
      id: "NORMAL_STANDARD_TABLE",
      kind: "normal",
      source: andaluciaNormal,
      page: 1,
      policy: Object.freeze({ andalucia: "DROPDOWN", madrid: "DROPDOWN", clm: "LOCAL_EXERCISE_TABLE" })
    })
  });
})(typeof window !== "undefined" ? window : globalThis);
