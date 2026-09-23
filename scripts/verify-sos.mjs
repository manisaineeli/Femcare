// Verification of the Volume-SOS auto-broadcast helpers.
// Run with: node scripts/verify-sos.mjs   (or: npm run verify:sos)
import {
  phoneDigits,
  mapsLink,
  buildSosMessage,
  whatsappShareLink,
  whatsappDirectLink,
  whatsappTargets,
  smsLink,
} from '../src/utils/sosLiveLocation.js';

let pass = 0, fail = 0;
const check = (name, cond) => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name); }
};

// ── phoneDigits ──
check('phoneDigits strips formatting', phoneDigits('+91 98765-43210') === '919876543210');
check('phoneDigits keeps leading zero', phoneDigits('09876543210') === '09876543210');

// ── mapsLink ──
check('mapsLink format', mapsLink(12.9716, 77.5946) === 'https://maps.google.com/?q=12.9716,77.5946');

// ── WhatsApp targets: direct chat per trusted contact ──
const contacts = [
  { id: 'tc-1', name: 'Mom (Pooja)', phone: '+91 98765 43210', relation: 'Mother' },
  { id: 'tc-2', name: 'Priya', phone: '09812345678', relation: 'Friend' },
  { id: 'tc-3', name: 'Dr. Radhika', phone: '+91 94000 12345', relation: 'Doctor' },
];
const msg = 'EMERGENCY test';
const targets = whatsappTargets(contacts, msg);
check('one WhatsApp URL per contact', targets.length === 3);
check('target 1 is a direct chat (Mom)', targets[0].startsWith('https://wa.me/919876543210?text='));
check('target 2 dials Priya (keeps 0)', targets[1].startsWith('https://wa.me/09812345678?text='));
check('message is URL-encoded in target', targets[0].includes(encodeURIComponent(msg)));
check('no contacts → generic share picker', whatsappTargets([], msg)[0] === whatsappShareLink(msg));

// ── Direct link helper ──
check('whatsappDirectLink empty phone falls back to share',
  whatsappDirectLink('', msg) === whatsappShareLink(msg));
check('whatsappDirectLink strips + and spaces',
  whatsappDirectLink('+91 94000 12345', msg) === `https://wa.me/919400012345?text=${encodeURIComponent(msg)}`);

// ── SMS to whole circle ──
check('smsLink no contacts → bare composer',
  smsLink([], msg) === `sms:?body=${encodeURIComponent(msg)}`);
check('smsLink comma-joins all contacts',
  smsLink(['+91 98765 43210', '09812345678'], msg) ===
    `sms:919876543210,09812345678?body=${encodeURIComponent(msg)}`);

// ── SOS message content ──
const loc = { ok: true, lat: 12.9716, lng: 77.5946, accuracy: 12, link: mapsLink(12.9716, 77.5946) };
const withLoc = buildSosMessage({ name: 'Aanya', loc, custom: 'EMERGENCY', source: 'volume-up held 2 seconds' });
check('message carries the live location link', withLoc.includes(`Live location: ${loc.link}`));
check('message carries coordinates + accuracy', withLoc.includes('12.97160, 77.59460 (+/-12m)'));
check('message carries sender name', withLoc.includes("It's Aanya."));
check('message carries trigger source', withLoc.includes('volume-up held 2 seconds'));

const noLoc = buildSosMessage({ name: 'Aanya', loc: { ok: false }, source: 'double press' });
check('no location → explicit fallback line', noLoc.includes('Location unavailable - please call me right now.'));
check('no name → generic opener',
  buildSosMessage({ loc: { ok: false } }).includes("It's me."));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
