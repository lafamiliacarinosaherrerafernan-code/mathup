(function initializeHandwritingRecognition(global) {
  "use strict";

  const providers = new Map();
  const MIN_CONFIDENCE = 0.75;

  function registerProvider(name, provider) {
    if (!name || typeof provider?.recognize !== "function") throw new TypeError("Proveedor de reconocimiento no válido");
    providers.set(String(name), Object.freeze({ recognize: provider.recognize, kind: provider.kind || "external" }));
  }

  function unregisterProvider(name) { providers.delete(String(name)); }

  async function recognize(normalizedInk, options = {}) {
    if (!normalizedInk?.strokes?.length) return { status: "ambiguous", confidence: 0, reason: "empty-selection" };
    const providerName = String(options.provider || "");
    const provider = providers.get(providerName);
    if (!provider) return { status: "unavailable", confidence: 0, reason: "no-recognition-provider" };
    try {
      const result = await provider.recognize(normalizedInk, {
        expectedAnswerType: options.expectedAnswerType,
        locale: options.locale || "es-ES"
      });
      const expression = String(result?.expression || result?.latex || "").trim();
      const hasConfidence = result?.confidence !== null && result?.confidence !== undefined && Number.isFinite(Number(result.confidence));
      const confidence = hasConfidence ? Number(result.confidence) : null;
      if (!expression || (confidence !== null && confidence < (options.minimumConfidence ?? MIN_CONFIDENCE))) {
        return { status: "ambiguous", expression, confidence, alternatives: result?.alternatives || [], rawSemanticResult: result?.rawSemanticResult || null, provider: providerName, latencyMs: result?.latencyMs, requestCount: result?.requestCount || 0 };
      }
      return { status: "recognized", expression, confidence, requiresManualReview: confidence === null, reason: confidence === null ? "confidence-unavailable" : "", alternatives: result?.alternatives || [], rawSemanticResult: result?.rawSemanticResult || null, provider: providerName, latencyMs: result?.latencyMs, requestCount: result?.requestCount || 1 };
    } catch (error) {
      if (error?.code === "provider-unavailable" || /credentials-missing|proxy-unavailable/.test(String(error?.message || ""))) {
        return { status: "unavailable", confidence: null, reason: error?.message || "recognition-unavailable", provider: providerName, latencyMs: error?.latencyMs, requestCount: error?.requestCount || 0 };
      }
      return { status: "technical-error", confidence: null, reason: error?.message || "recognition-failed", provider: providerName, latencyMs: error?.latencyMs, requestCount: error?.requestCount || 0 };
    }
  }

  async function diagnose({ ink, provider, expectedExpression, validationType, tolerance, equationMode, context = {} } = {}) {
    const recognition = await recognize(ink, { provider, expectedAnswerType: validationType, locale: context.locale });
    if (recognition.status !== "recognized") return { ...recognition, recognizedExpression: recognition.expression || "", isEquivalent: null, validationType };
    const validator = global.MargaritaMathAnswerValidator;
    if (!validator) return { ...recognition, status: "technical-error", isEquivalent: null, reason: "validator-unavailable" };
    let validation = validator.validate({
      recognizedExpression: recognition.expression,
      expectedExpression,
      validationType,
      tolerance,
      equationMode,
      confidence: recognition.confidence === null ? 1 : recognition.confidence
    });
    if (validation.status === validator.STATUS?.UNSUPPORTED && typeof validator.compareRecognition === "function") {
      validation = validator.compareRecognition({ recognizedExpression: recognition.expression, expectedExpression });
    }
    const requiresManualReview = recognition.requiresManualReview === true;
    return {
      ...recognition,
      ...validation,
      status: requiresManualReview ? "ambiguous" : validation.status,
      isEquivalent: requiresManualReview ? null : validation.isEquivalent,
      suggestedValidationStatus: requiresManualReview ? validation.status : undefined,
      suggestedEquivalent: requiresManualReview ? validation.isEquivalent : undefined,
      requiresManualReview,
      recognizedExpression: recognition.expression,
      exerciseId: context.exerciseId || "",
      partId: context.partId || "",
      courseId: context.courseId || "",
      topicId: context.topicId ?? "",
      mode: context.mode || ""
    };
  }

  global.MargaritaHandwritingRecognition = Object.freeze({ MIN_CONFIDENCE, registerProvider, unregisterProvider, recognize, diagnose, __audit: { providers } });
})(typeof window !== "undefined" ? window : globalThis);
