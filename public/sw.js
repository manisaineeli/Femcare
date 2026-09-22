/* FemCare minimal service worker — used for system-level notifications */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Reuse an already-open FemCare tab if one exists
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      // Otherwise open the app
      if (self.clients.openWindow) return self.clients.openWindow('./');
      return undefined;
    })
  );
});
