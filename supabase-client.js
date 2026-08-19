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

  function sessionToken() {
    const key = "mathup-app-session-token";
    let token = sessionStorage.getItem(key);
    if (!token) {
      token = crypto.randomUUID();
      sessionStorage.setItem(key, token);
    }
    return token;
  }

  async function signInWithPassword(email, password) {
    const { data, error } = await getClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signInWithGoogle(ownerMode = false) {
    const redirectTo = new URL(window.location.href);
    redirectTo.search = ownerMode ? "?owner=1" : "";
    redirectTo.hash = "";
    const { data, error } = await getClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo.toString() }
    });
    if (error) throw error;
    return data;
  }

  async function signUp(email, password, metadata) {
    const { data, error } = await getClient().auth.signUp({
      email,
      password,
      options: { data: metadata }
    });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const token = sessionStorage.getItem("mathup-app-session-token");
    if (token) {
      try {
        await getClient().rpc("release_app_session", { p_session_token: token });
      } catch (_) {
        // El cierre de Supabase debe continuar aunque la sesión ya haya caducado.
      }
    }
    const { error } = await getClient().auth.signOut();
    if (error) throw error;
  }

  async function getSession() {
    const { data, error } = await getClient().auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function updateUserMetadata(metadata) {
    const { data, error } = await getClient().auth.updateUser({ data: metadata });
    if (error) throw error;
    return data.user;
  }

  async function completeOnboarding(user) {
    const metadata = user?.user_metadata || {};
    if (!metadata.course_code || !metadata.display_name) return;
    const client = getClient();
    const [{ data: savedProfile, error: profileLookupError }, { data: savedEnrollment, error: enrollmentLookupError }] = await Promise.all([
      client.from("profiles").select("user_id,onboarding_completed").eq("user_id", user.id).maybeSingle(),
      client.from("enrollments").select("id").eq("user_id", user.id).eq("academic_year", metadata.academic_year).maybeSingle()
    ]);
    if (profileLookupError) throw profileLookupError;
    if (enrollmentLookupError) throw enrollmentLookupError;
    if (savedProfile?.onboarding_completed && savedEnrollment?.id) return;
    const ageBand = metadata.age_band || "14_to_17";
    const { error: profileError } = await client.from("profiles").upsert({
      user_id: user.id,
      display_name: metadata.display_name,
      age_band: ageBand,
      onboarding_completed: true
    }, { onConflict: "user_id" });
    if (profileError) throw profileError;
    const firstYear = Number(String(metadata.academic_year).slice(0, 4));
    const pilotStart = new Date();
    // El piloto gratuito queda activo desde el alta (incluidas las pruebas
    // previas de agosto) y caduca al terminar el curso, el 30 de junio.
    // La futura alta de pago podrá conservar esta fecha para prorratear.
    const accessStart = pilotStart;
    const accessEnd = `${firstYear + 1}-06-30`;
    if (!savedEnrollment?.id) {
      const { error: enrollmentError } = await client.from("enrollments").insert({
      user_id: user.id,
      center_id: metadata.center_id || null,
      center_name: metadata.center_name || null,
      academic_year: metadata.academic_year,
      course_code: metadata.course_code,
      postal_code: metadata.postal_code || null,
      municipality: metadata.municipality || null,
      province: metadata.province || null,
      access_starts_at: accessStart.toISOString().slice(0, 10),
      access_ends_at: accessEnd,
      billing_mode: "pilot_free",
      is_current: true
      });
      if (enrollmentError) throw enrollmentError;
    }

    if (ageBand === "under_14" && metadata.guardian_email) {
      const { data: existingConsent, error: consentLookupError } = await client.from("guardian_consents")
        .select("id").eq("student_user_id", user.id).eq("guardian_email", metadata.guardian_email).maybeSingle();
      if (consentLookupError) throw consentLookupError;
      if (!existingConsent) {
        const { error: consentError } = await client.from("guardian_consents").insert({
          student_user_id: user.id,
          guardian_email: metadata.guardian_email,
          status: "pending"
        });
        if (consentError) throw consentError;
      }
    }
  }

  async function loadStudentContext(user) {
    await completeOnboarding(user);
    const { data: profile, error: profileError } = await getClient()
      .from("profiles").select("display_name,age_band,onboarding_completed").eq("user_id", user.id).single();
    if (profileError) throw profileError;
    const { data: enrollment, error: enrollmentError } = await getClient()
      .from("enrollments")
      .select("id,academic_year,course_code,group_label,center_id,center_name,postal_code,municipality,province,access_starts_at,access_ends_at,billing_mode")
      .eq("user_id", user.id).eq("is_current", true).order("created_at", { ascending: false }).limit(1).single();
    if (enrollmentError) throw enrollmentError;
    const today = new Date().toISOString().slice(0, 10);
    if (enrollment.access_starts_at > today || (enrollment.access_ends_at && enrollment.access_ends_at < today)) {
      throw new Error("La matrícula de este curso no está activa en la fecha actual.");
    }
    return { user, profile, enrollment };
  }

  async function claimSession() {
    const { data, error } = await getClient().rpc("claim_app_session", { p_session_token: sessionToken() });
    if (error) throw error;
    return data === true;
  }

  async function heartbeat() {
    const { data, error } = await getClient().rpc("heartbeat_app_session", { p_session_token: sessionToken() });
    if (error) throw error;
    return data === true;
  }

  async function searchCenters(postalCode) {
    const client = getClient();
    const { data: locations, error: locationsError } = await client
      .from("postal_locations")
      .select("postal_code,municipality,province,autonomous_region")
      .eq("postal_code", postalCode)
      .order("municipality");
    if (locationsError) throw locationsError;
    const province = locations?.[0]?.province;
    if (!province) return { centers: [], locations: [] };
    const { data: centers, error: centersError } = await client
      .from("centers")
      .select("id,official_code,name,generic_name,ownership,municipality,province,autonomous_region")
      .eq("province", province)
      .eq("is_active", true)
      .order("municipality")
      .order("name")
      .limit(1000);
    if (centersError) throw centersError;
    return { centers: centers || [], locations: locations || [] };
  }

  async function getAdminRole() {
    const { data, error } = await getClient().rpc("get_my_admin_role");
    if (error) throw error;
    return data || null;
  }

  async function getAdminStats() {
    const { data, error } = await getClient().rpc("admin_dashboard_stats");
    if (error) throw error;
    return data;
  }

  window.APP_SUPABASE = Object.freeze({
    isConfigured,
    getClient,
    checkConnection,
    signInWithPassword,
    signInWithGoogle,
    signUp,
    signOut,
    getSession,
    updateUserMetadata,
    completeOnboarding,
    loadStudentContext,
    claimSession,
    heartbeat,
    searchCenters,
    getAdminRole,
    getAdminStats
  });
})();
