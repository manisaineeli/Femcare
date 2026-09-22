/**
 * System (outside-the-app) notifications, powered by the Notification API
 * and the app's service worker so alerts pop up like Instagram's do.
 */

export function notificationsSupported() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission() {
  if (!notificationsSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission() {
  if (!notificationsSupported()) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  try {
    return await Notification.requestPermission();
  } catch {
    return Notification.permission;
  }
}

/**
 * Fire a real OS-level notification. Prefers the service worker route
 * (required on Android Chrome), falls back to the Notification constructor.
 * Returns true if the notification was shown.
 */
export async function showSystemNotification(title, options = {}) {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;

  const payload = {
    icon: 'favicon.svg',
    badge: 'favicon.svg',
    tag: 'femcare',
    renotify: true,
    ...options,
  };

  // 1) Service worker path (works everywhere, supports click-to-open)
  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.showNotification(title, payload);
        return true;
      }
    }
  } catch {
    /* fall through to constructor */
  }

  // 2) Direct constructor (desktop browsers)
  try {
    const n = new Notification(title, payload);
    n.onclick = () => {
      window.focus();
      n.close();
    };
    return true;
  } catch {
    return false;
  }
}

/** Register the app service worker (no-op on unsupported/older browsers). */
export async function registerNotificationSW() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('sw.js', { scope: './' });
  } catch {
    /* ignore — notifications fall back to the constructor */
  }
}
