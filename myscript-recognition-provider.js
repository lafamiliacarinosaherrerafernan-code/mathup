(function initializeMyScriptRecognitionProvider(global) {
  "use strict";

  const PROVIDER_NAME = "myscript-iink";

  function isAvailable() {
    return global.APP_CONFIG?.DEVELOPER_MODE === true
      && global.APP_CONFIG?.MYSCRIPT_CONTROLLED_TEST === true
      && global.APP_SUPABASE?.isConfigured?.() === true;
  }

  function compactInk(ink) {
    return {
      version: ink.version,
      width: Math.max(1, Math.ceil(Number(ink.width) || 1)),
      height: Math.max(1, Math.ceil(Number(ink.height) || 1)),
      strokes: (ink.strokes || []).map((stroke) => ({
        x: (stroke.points || []).map((point) => Math.round(Number(point.x) || 0)),
        y: (stroke.points || []).map((point) => Math.round(Number(point.y) || 0)),
        t: (stroke.points || []).map((point) => Math.max(0, Math.round(Number(point.timestamp) || 0)))
      })).filter((stroke) => stroke.x.length > 0)
    };
  }

  async function recognize(ink, options = {}) {
    if (!isAvailable()) {
      const error = new Error("myscript-proxy-unavailable");
      error.code = "provider-unavailable";
      throw error;
    }
    const startedAt = global.performance?.now?.() ?? Date.now();
    const { data, error } = await global.APP_SUPABASE.getClient().functions.invoke("recognize-math", {
      body: {
        ink: compactInk(ink),
        expectedAnswerType: String(options.expectedAnswerType || "expression"),
        locale: String(options.locale || "es-ES")
      }
    });
    if (error) throw new Error(error.message || "myscript-proxy-error");
    if (!data || data.provider !== PROVIDER_NAME) throw new Error("myscript-invalid-response");
    if (data.status === "unavailable") {
      const unavailable = new Error(data.code || "myscript-proxy-unavailable");
      unavailable.code = "provider-unavailable";
      unavailable.requestCount = Number(data.requestCount) || 0;
      unavailable.latencyMs = Number(data.latencyMs) || 0;
      throw unavailable;
    }
    if (data.status === "technical-error") {
      const technical = new Error(data.code || "myscript-technical-error");
      technical.requestCount = Number(data.requestCount) || 0;
      technical.latencyMs = Number(data.latencyMs) || 0;
      throw technical;
    }
    return {
      expression: String(data.recognizedExpression || "").trim(),
      confidence: data.confidence !== null && data.confidence !== undefined && Number.isFinite(Number(data.confidence)) ? Number(data.confidence) : null,
      rawSemanticResult: data.rawSemanticResult || null,
      alternatives: Array.isArray(data.alternatives) ? data.alternatives : [],
      latencyMs: Math.round((global.performance?.now?.() ?? Date.now()) - startedAt),
      requestCount: 1
    };
  }

  global.MargaritaMyScriptRecognitionProvider = Object.freeze({ PROVIDER_NAME, isAvailable, recognize, compactInk });
  global.MargaritaHandwritingRecognition?.registerProvider(PROVIDER_NAME, { kind: "external-secure-proxy", recognize });
})(typeof window !== "undefined" ? window : globalThis);
