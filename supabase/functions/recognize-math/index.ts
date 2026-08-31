const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("MYSCRIPT_ALLOWED_ORIGIN") || "https://disabled.invalid",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

function validInk(ink: any) {
  return ink && Array.isArray(ink.strokes) && ink.strokes.length > 0 && ink.strokes.length <= 200
    && ink.strokes.every((stroke: any) => Array.isArray(stroke.x) && stroke.x.length > 0 && stroke.x.length <= 5000
      && stroke.x.length === stroke.y?.length && stroke.x.length === stroke.t?.length
      && [...stroke.x, ...stroke.y, ...stroke.t].every((value: unknown) => Number.isFinite(Number(value))));
}

async function hmacSha512(applicationKey: string, hmacKey: string, body: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(applicationKey + hmacKey), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ status: "error", code: "method-not-allowed" }, 405);
  const controlledTestEnabled = Deno.env.get("MYSCRIPT_TEST_ENABLED") === "true";
  if (!controlledTestEnabled) return json({ provider: "myscript-iink", status: "unavailable", code: "controlled-test-disabled", requestCount: 0 });
  const applicationKey = Deno.env.get("MYSCRIPT_APPLICATION_KEY") || "";
  const hmacKey = Deno.env.get("MYSCRIPT_HMAC_KEY") || "";
  if (!applicationKey || !hmacKey) return json({ provider: "myscript-iink", status: "unavailable", code: "myscript-credentials-missing", requestCount: 0 });
  let input: any;
  try { input = await request.json(); } catch { return json({ status: "error", code: "invalid-json" }, 400); }
  if (!validInk(input?.ink)) return json({ status: "error", code: "invalid-ink" }, 400);
  const strokes = input.ink.strokes.map((stroke: any) => ({ x: stroke.x, y: stroke.y, t: stroke.t }));
  const myScriptBody = JSON.stringify({
    xDPI: 96,
    yDPI: 96,
    width: Math.max(1, Math.ceil(input.ink.width)),
    height: Math.max(1, Math.ceil(input.ink.height)),
    contentType: "Math",
    conversionState: "DIGITAL_EDIT",
    configuration: { export: { jiix: { "math-label": true, strokes: false } } },
    strokeGroups: [{ penStyle: "color: #13213a; -myscript-pen-width: 1;", strokes }]
  });
  const signature = await hmacSha512(applicationKey, hmacKey, myScriptBody);
  const startedAt = Date.now();
  try {
    const response = await fetch("https://cloud.myscript.com/api/v4.0/iink/batch", {
      method: "POST",
      headers: { applicationKey, hmac: signature, "Content-Type": "application/json", Accept: "application/vnd.myscript.jiix,application/json" },
      body: myScriptBody
    });
    if (!response.ok) {
      const category = response.status === 401 ? "credentials" : response.status === 403 ? "quota-or-account" : "provider-error";
      console.error("MyScript recognition failed", { status: response.status, category });
      return json({ provider: "myscript-iink", status: "technical-error", code: category, latencyMs: Date.now() - startedAt, requestCount: 1 });
    }
    const semantic = await response.json();
    const expression = String(semantic?.label || semantic?.expressions?.[0]?.label || "").replace(/^\$|\$$/g, "").trim();
    return json({ provider: "myscript-iink", status: expression ? "recognized" : "ambiguous", recognizedExpression: expression, confidence: null, rawSemanticResult: semantic, alternatives: [], latencyMs: Date.now() - startedAt, requestCount: 1 });
  } catch (error) {
    console.error("MyScript request error", { type: error instanceof Error ? error.name : "unknown" });
    return json({ provider: "myscript-iink", status: "technical-error", code: "network-error", latencyMs: Date.now() - startedAt, requestCount: 1 });
  }
});
