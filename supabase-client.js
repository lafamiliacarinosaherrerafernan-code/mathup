(function initializeAppSupabase() {
  let client = null;

  function getConfiguration() {
    return {
      url: window.APP_CONFIG?.SUPABASE_URL?.trim() || "",
      publishableKey: window.APP_CONFIG?.SUPABASE_PUBLISHABLE_KEY?.trim() || ""
    };
  }

  function isConfigured() {
    const { url, publishableKey } = getConfiguration();
    return /^https:\/\/[a-z0-9]+\.supabase\.co$/i.test(url)
      && /^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey);
  }

  function getClient() {
    if (client) return client;
    if (!isConfigured()) throw new Error("La configuración pública de Supabase está incompleta.");
    if (!window.supabase?.createClient) throw new Error("No se ha podido cargar la biblioteca de Supabase.");

    const { url, publishableKey } = getConfiguration();
    client = window.supabase.createClient(url, publishableKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    return client;
  }

  async function checkConnection() {
    const { error } = await getClient()
      .from("centers")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return true;
  }

  window.APP_SUPABASE = Object.freeze({
    isConfigured,
    getClient,
    checkConnection
  });
})();
