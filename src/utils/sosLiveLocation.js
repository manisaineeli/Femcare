// FemCare - Live-location SOS helpers
// Builds a shareable location link, composes the emergency message and
// opens the correct apps (WhatsApp / SMS / dialer) for trusted contacts.
// 100% on-device: geolocation stays in the browser, no server involved.

/**
 * Get a one-shot high accuracy position.
 * Resolves { ok, lat, lng, accuracy, link, mapsLink, error }.
 */
export function getCurrentLocation({ timeout = 8000 } = {}) {
  return new Promise((resolve) => {
    if (!('geolocation' in navigator)) {
      resolve({ ok: false, error: 'Geolocation not supported on this device.' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy = 0 } = pos.coords;
        resolve({
          ok: true,
          lat,
          lng,
          accuracy: Math.round(accuracy),
          link: mapsLink(lat, lng),
          timestamp: pos.timestamp,
        });
      },
      (err) => {
        resolve({ ok: false, error: err?.message || 'Location permission denied.' });
      },
      { enableHighAccuracy: true, timeout, maximumAge: 0 }
    );
  });
}

/** Google Maps link that opens at the given coordinates. */
export function mapsLink(lat, lng) {
  return `https://maps.google.com/?q=${lat},${lng}`;
}

/** Digits-only version of a phone number (drops spaces, +, dashes). */
export function phoneDigits(phone = '') {
  return String(phone).replace(/[^0-9]/g, '');
}

/**
 * Compose the SOS message text.
 * @param {object} opts
 * @param {string} opts.name       Sender's display name
 * @param {object|null} opts.loc   Result from getCurrentLocation()
 * @param {string} [opts.custom]   User's configured sosSettings.customMessage
 * @param {string} [opts.source]   How it was triggered ("volume gesture", "hold", ...)
 */
export function buildSosMessage({ name, loc, custom, source = 'emergency SOS' } = {}) {
  const who = name ? `It's ${name}.` : "It's me.";
  const base = custom || 'EMERGENCY: I need immediate help. Please check on me!';
  const time = new Date().toLocaleString();
  const lines = [`${base} (${who} - FemCare ${source})`];
  if (loc?.ok) {
    lines.push(`Live location: ${loc.link}`);
    lines.push(`Coordinates: ${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)} (+/-${loc.accuracy}m)`);
  } else {
    lines.push('Location unavailable - please call me right now.');
  }
  lines.push(`Sent: ${time}`);
  return lines.join('\n');
}

/** WhatsApp share picker with a pre-filled message. */
export function whatsappShareLink(body) {
  return `https://wa.me/?text=${encodeURIComponent(body)}`;
}

/** Direct WhatsApp chat with one contact. */
export function whatsappDirectLink(phone, body) {
  const digits = phoneDigits(phone);
  if (!digits) return whatsappShareLink(body);
  return `https://wa.me/${digits}?text=${encodeURIComponent(body)}`;
}

/**
 * WhatsApp URLs for the whole trusted circle, in order:
 * one direct chat per contact (message pre-filled), or the generic
 * share picker when no contacts are saved yet.
 */
export function whatsappTargets(contacts = [], body) {
  if (!contacts.length) return [whatsappShareLink(body)];
  return contacts.map((c) => whatsappDirectLink(c?.phone, body));
}

/** SMS app with recipients + pre-filled body (Android/iOS accept comma list). */
export function smsLink(phones = [], body) {
  const list = phones.map(phoneDigits).filter(Boolean).join(',');
  const encoded = encodeURIComponent(body);
  if (!list) return `sms:?body=${encoded}`;
  return `sms:${list}?body=${encoded}`;
}

/**
 * Fire a tel:/sms: URL from a hidden iframe.
 * Unlike window.open(), this is NEVER popup-blocked, so the SOS flow can
 * open the dialer / messaging app automatically even after an async
 * geolocation wait (where browsers strip the user-gesture permission).
 */
export function openViaIframe(url) {
  try {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.src = url;
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 6000);
    return true;
  } catch {
    return false;
  }
}

/** Open a tel: URI without navigating the app away (dialer overlay). */
export function dialNumber(number) {
  return openViaIframe(`tel:${number}`);
}

/** Copy text to clipboard (with a fallback for older browsers). */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
