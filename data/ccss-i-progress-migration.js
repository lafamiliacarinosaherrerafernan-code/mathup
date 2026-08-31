(function () {
  "use strict";

  const TOPIC_SCHEMA_VERSION = 2;
  const COURSE_TOKEN = "__1bach-ccss__";
  const LEGACY_COMBINATORICS_INDEX = 9;
  const DERIVATIVES_INDEX = 9;
  const DERIVATIVE_APPLICATIONS_INDEX = 10;
  const COMBINATORICS_INDEX = 11;

  function uniqueIndexes(values) {
    return [...new Set((Array.isArray(values) ? values : []).filter(Number.isInteger))].sort((a, b) => a - b);
  }

  function normalized(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function reportBelongsToStudent(report, studentKey) {
    const [academicYear, courseId, group, ...nameParts] = String(studentKey || "").split("__");
    if (courseId !== "1bach-ccss") return false;
    const reportCourse = normalized(report?.course);
    return String(report?.academicYear || "") === academicYear
      && String(report?.group || "") === group
      && String(report?.student || "") === nameParts.join("__")
      && reportCourse.includes("ccss i")
      && !reportCourse.includes("ccss ii");
  }

  function topicSignals(studentKey, stores = {}) {
    const challengeKeys = Object.keys(stores.challengeHistory || {});
    const scopedPrefix = `${studentKey}|1bach-ccss|topic-`;
    const hasChallenge = (topic) => challengeKeys.some((key) => key.startsWith(`${scopedPrefix}${topic}|`));
    const coach = stores.coachStore?.[studentKey] || {};
    const coachTopics = new Set([
      ...(coach.activityResults || []).map((item) => item?.topic),
      ...(coach.studySessions || []).flatMap((session) => (session?.answers || []).map((item) => item?.topic)),
      ...Object.keys(coach.learningProfile?.topicMastery || {})
    ].filter(Boolean));
    const reports = (stores.reports || []).filter((report) => reportBelongsToStudent(report, studentKey));
    const reportThemes = reports.map((report) => normalized(report?.theme));

    return {
      derivatives: hasChallenge("derivadas")
        || coachTopics.has("ccss-derivatives")
        || reportThemes.some((theme) => theme.startsWith("derivadas")),
      derivativeApplications: hasChallenge("aplicacion-derivadas")
        || coachTopics.has("derivative-applications")
        || reportThemes.some((theme) => theme.startsWith("aplicacion de derivadas")),
      combinatorics: hasChallenge("9")
        || coachTopics.has("combinatorics")
        || reportThemes.some((theme) => theme.startsWith("combinatoria"))
    };
  }

  function migrateIndexList(values, signals) {
    const indexes = uniqueIndexes(values);
    if (!indexes.includes(LEGACY_COMBINATORICS_INDEX)) return indexes;

    const result = indexes.filter((index) => index !== LEGACY_COMBINATORICS_INDEX);
    if (signals.derivatives) result.push(DERIVATIVES_INDEX);
    if (!signals.derivatives || signals.combinatorics) result.push(COMBINATORICS_INDEX);
    return uniqueIndexes(result);
  }

  function migrateProgress(progress, signals = {}) {
    if (!progress || typeof progress !== "object") return { progress, changed: false };
    if (Number(progress.ccssITopicSchemaVersion) >= TOPIC_SCHEMA_VERSION) {
      return { progress, changed: false };
    }

    const migrated = {
      ...progress,
      unlockedTopics: migrateIndexList(progress.unlockedTopics, signals),
      completedTopics: migrateIndexList(progress.completedTopics, signals),
      defeatedBosses: migrateIndexList(progress.defeatedBosses, signals),
      ccssITopicSchemaVersion: TOPIC_SCHEMA_VERSION
    };
    return { progress: migrated, changed: true };
  }

  function migrateStore(store, stores = {}) {
    const progressStore = store && typeof store === "object" ? { ...store } : {};
    const migratedKeys = [];
    Object.entries(progressStore).forEach(([studentKey, progress]) => {
      if (!studentKey.includes(COURSE_TOKEN)) return;
      const result = migrateProgress(progress, topicSignals(studentKey, stores));
      if (!result.changed) return;
      progressStore[studentKey] = result.progress;
      migratedKeys.push(studentKey);
    });
    return { store: progressStore, changed: migratedKeys.length > 0, migratedKeys };
  }

  window.MargaritaCcssIProgressMigration = {
    TOPIC_SCHEMA_VERSION,
    LEGACY_COMBINATORICS_INDEX,
    DERIVATIVES_INDEX,
    DERIVATIVE_APPLICATIONS_INDEX,
    COMBINATORICS_INDEX,
    topicSignals,
    migrateProgress,
    migrateStore
  };
})();
