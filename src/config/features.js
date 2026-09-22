// FemCare Feature Registry
// Central switchboard so features can be added, toggled or retired over time
// without hunting through components. To ship a new feature:
//   1. Add a key here (default true for new work, or false to stage it),
//   2. Gate the UI/logic with isFeature('your.key'),
//   3. Keep the implementation in its own util/component so it can be
//      removed by flipping the flag alone.
// Nothing here ever leaves the device - it is just local config.

export const FEATURES = {
  // ---- Safety / SOS ----
  sosVolumeGesture: true, // Volume-Up double-press / 2-second hold triggers live SOS
  sosLiveLocation: true, // Full-screen SOS with geolocation + trusted-contact broadcast
  sosEmergencyAutoDial: true, // Attempt emergency call (112) after SOS fires
  sosOneTapModal: true, // Existing one-tap SOS modal (always keep for compatibility)

  // ---- FemCare AI ----
  femiWholeBodyKnowledge: true, // Whole-body anatomy knowledge base (anatomyFaqData.js)
  femiTopicExplorer: true, // Category explorer grid on the Ask Femi page

  // ---- PWA / Platform ----
  systemNotifications: true, // Out-of-app system notifications (service worker)
  offlinePwa: true, // Installable, fully offline PWA
};

/**
 * Returns true unless the flag is explicitly set to false.
 * Unknown keys default to true so partially-migrated call sites keep working.
 */
export function isFeature(key) {
  if (key in FEATURES) return FEATURES[key] === true;
  return true;
}

export default FEATURES;
