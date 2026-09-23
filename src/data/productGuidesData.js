// FemCare AI - Period Product Education: types, how-to-use, comparison
// Educational info reviewed from public health guidance; not medical advice.

// Quick comparison across period products
export const PRODUCT_COMPARISON = [
  { type: 'Pads', change: 'Every 4–6 hrs', cost: '₹4–8 per pad', eco: 'Single-use', greatFor: 'First periods & everyone' },
  { type: 'Tampons', change: 'Max 8 hrs', cost: '₹10–15 each', eco: 'Single-use', greatFor: 'Swimming & sports' },
  { type: 'Cups', change: 'Up to 12 hrs', cost: '~₹349 once, 10 yrs', eco: 'Zero-waste', greatFor: 'Heavy flows & travel' },
  { type: 'Period Panties', change: 'Up to 12 hrs', cost: '~₹499 / 100+ washes', eco: 'Reusable', greatFor: 'Night leaks & backups' },
  { type: 'Cloth Pads', change: 'Every 4–6 hrs', cost: '~₹150 each, years', eco: 'Reusable', greatFor: 'Eco & budget routine' }
];

export const PRODUCT_GUIDES = [
  {
    id: 'pads',
    title: 'Sanitary Pads & Liners',
    subtitle: 'The most-used period product',
    image: './products/guide-pads.jpg',
    types: [
      { name: 'Panty Liner', desc: 'Very thin 15–20 cm strip for spotting, discharge or the day before your period. Not absorbent enough for full flow.', change: 'Every 6–8 hrs' },
      { name: 'Regular Day Pad', desc: '24–28 cm, with or without wings — the everyday standard for light-to-moderate flow.', change: 'Every 4–6 hrs' },
      { name: 'Night / Long Pad', desc: '29–35 cm with extra width at the back — built for sleeping on your back or heavy days.', change: 'Every 4–6 hrs' },
      { name: 'Ultra-Thin Pad', desc: '2–3 mm dry core that swells on contact — invisible under tight clothes but holds the same as a thick pad.', change: 'Every 4–6 hrs' },
      { name: 'Reusable Cloth Pad', desc: 'Soft cotton/microfibre with snap-on wings — machine wash and reuse for 2–3 years.', change: 'Every 4–6 hrs' },
      { name: 'Biodegradable / Organic Pad', desc: 'Bamboo or plant-cellulose core without chlorine bleach — decomposes instead of sitting in landfill for 500 years.', change: 'Every 4–6 hrs' }
    ],
    howToUse: [
      'Wash and dry your hands first — this one step prevents most infections.',
      'Tear open the wrapper and peel the adhesive strip on the back of the pad.',
      'Place it centred on the gusset (the narrow middle) of your underwear, slightly toward the back.',
      'Fold the wings under the gusset and press firmly so they stick to the underside.',
      'Sit and move once to check nothing bunched up and the edges lie flat.',
      'Change every 4–6 hours — sooner if soaked or after swimming/sweating.',
      'Dispose: fold the pad in on itself with the used side inside, wrap in its wrapper or a disposal bag, then bin it. Never flush.'
    ],
    tips: [
      'Keep one spare in your bag, pencil case or locker — cycles love surprises.',
      'Heavier at night? Sleep diagonally with a night pad positioned a little further back.',
      'Rash or itching? Switch to fragrance-free/biodegradable pads and wear cotton underwear.',
      'Rinse stains in cold water immediately (hot water sets blood protein), then wash.'
    ],
    avoid: [
      'Flushing pads — they clog pipes and take centuries to break down.',
      'Scented pads if you get irritation — added fragrance is the number-one trigger.',
      'Wearing one soaked pad for "just one more hour" — warm damp is a bacteria party.'
    ]
  },
  {
    id: 'tampons',
    title: 'Tampons',
    subtitle: 'Internal protection — use safely',
    image: './products/guide-tampon.jpg',
    types: [
      { name: 'Light / Junior', desc: 'Lowest absorbency — for spotting, very light days or beginners.', change: 'Max 8 hrs' },
      { name: 'Regular', desc: 'Everyday absorbency for moderate flow.', change: 'Every 4–6 hrs' },
      { name: 'Super', desc: 'Higher absorbency for heavy days or overnight.', change: 'Every 4–8 hrs' },
      { name: 'Applicator vs Non-applicator', desc: 'Cardboard/plastic applicator helps insertion; non-applicator versions you push in with a finger. Same safety rules either way.', change: 'Max 8 hrs' }
    ],
    howToUse: [
      'Wash your hands, unwrap the tampon and pull the string free.',
      'Find a comfy position — one foot up on the toilet edge, a light squat, or sitting forward. Relax your pelvic muscles; tension is what makes insertion feel hard.',
      'Hold the tampon at its grip indent (or the applicator barrel) between thumb and middle finger.',
      'Aim toward your lower back — the vaginal canal angles that way, not straight up.',
      'Insert gently past the vaginal wall muscle. With an applicator: push the inner plunger fully in until only the outer barrel remains, then pull the barrel and plunger out together, leaving the string hanging outside.',
      "If you can feel it, it isn't far enough in — the comfortable zone has no sensation.",
      'Change every 4–8 hours. Hard maximum 8 hours, even on a light day.',
      'To remove: relax and pull the string slowly at a downward angle — steady, not a jerk.'
    ],
    tips: [
      'Always use the lowest absorbency your flow needs — over-dry tampons irritate the canal.',
      'Swimming? Put one in before changing into the swimsuit — it seals for up to an hour in water.',
      'Carry two: one to use, one spare (plus a liner for backup while learning).',
      "First period or new to tampons? Practice on a light day — it's easier when you're calm."
    ],
    avoid: [
      'Never leave a tampon in beyond 8 hours — it is the main risk factor for Toxic Shock Syndrome (see warning).',
      'Scented tampons — fragrance inside the body causes irritation and dryness.',
      'Flushing tampons and applicators — always bin them, string and all.'
    ],
    warning: 'Toxic Shock Syndrome (TSS) is rare but serious: high fever, a sunburn-like rash, vomiting, dizziness or confusion during or right after use. Remove the tampon immediately and get emergency care (call 112).'
  },
  {
    id: 'cup',
    title: 'Menstrual Cup',
    subtitle: 'Reusable — up to 12 hours',
    image: './products/guide-cup.jpg',
    types: [
      { name: 'Size 1 / Small', desc: 'Usually for under 30 years or no vaginal births — softer, narrower rim.', change: 'Up to 12 hrs' },
      { name: 'Size 2 / Large', desc: 'For 30+, given birth, or heavier flows — slightly wider for a secure seal.', change: 'Up to 12 hrs' },
      { name: 'Firm vs Soft', desc: 'Firm cups pop open easily (good for beginners); soft cups are comfier but may need help opening.', change: 'Up to 12 hrs' },
      { name: 'Menstrual Disc', desc: 'A wider ring that sits in the vaginal fornix instead of the canal — wearable during sex (different product, same empty routine).', change: 'Up to 12 hrs' }
    ],
    howToUse: [
      'Before each cycle: sterilise the cup in boiling water for 5–7 minutes.',
      'Wash your hands, then wet the rim with water (or water-based lube) so it slides.',
      'Fold it: C-fold (flatten, fold in half into a C) or punch-down (push one side down into the base) — punch-down is easier for beginners.',
      'Hold the fold pinched, relax, and insert rim-first — like a tampon, but the cup sits lower, below the cervix, not as high.',
      'Release the fold and let it pop open into a circle.',
      'Check the seal: run a finger around the rim — if it feels dented or oval, grip the base and rotate it 360° until it opens fully. An open seal means zero leaks.',
      'Wear up to 12 hours — overnight and swimming are fine.',
      'To remove: wash hands, relax, pinch the base (not the stem) to break the seal, twist slightly and pull slowly — keep pinching as it slides out, like easing out a cork.',
      'Empty into the toilet, rinse with cold water first (cold prevents staining), then mild soap — re-fold and reinsert.',
      'Between cycles: boil 5–7 minutes and store in its breathable cotton pouch.'
    ],
    tips: [
      'First cycle you may leak while learning — wear a liner until you trust your seal.',
      'Empty roughly 3× a day instead of every 4 hours — a game-changer for exams and travel.',
      'Cold-water rinse before washing removes blood stains almost completely.',
      'Nervous about removal? A squat + a good pinch breaks the seal easily — it cannot get "lost".'
    ],
    avoid: [
      'Leaving it in beyond 24 hours, or skipping the boil between cycles.',
      'Sharp fingernails while reaching in — they scratch the vaginal wall.',
      'Boiling it dry — always keep some water in the pot so the silicone never melts.',
      'New IUD? Ask your gynaecologist before using a cup — the suction can shift it.'
    ]
  },
  {
    id: 'panties',
    title: 'Period Panties & Cloth Pads',
    subtitle: 'Reusable absorbent wear',
    image: './products/guide-panty.jpg',
    types: [
      { name: 'Light Absorbency', desc: 'Holds about 1 tampon — spotting days or as a liner backup.', change: 'Up to 12 hrs' },
      { name: 'Moderate', desc: 'Holds 2–3 tampons — everyday days and light sport sessions.', change: 'Up to 12 hrs' },
      { name: 'Heavy / Overnight', desc: 'Holds 4–5 tampons with a full rear panel — for the heaviest nights.', change: 'Every 8–12 hrs' },
      { name: 'Cloth Pads', desc: 'Snap-on reusable pads in cotton or minky — pair them with your own underwear instead of special panties.', change: 'Every 4–6 hrs' }
    ],
    howToUse: [
      'Wear them exactly like normal underwear — nothing inserted, no wings to fold.',
      'On heavy days use them alone; with a cup or tampon they work as a leak backup.',
      'Change when it starts feeling damp — the wicking top layer can hide how saturated it is.',
      'After use: rinse in cold water until the water runs clear, then machine wash on gentle with your towels (not with the family load if you prefer privacy).',
      'Air dry fully in the sun — no fabric softener (it coats the absorbent fibres and reduces capacity).',
      'Rotate 3–4 pairs through a cycle so each one fully dries between uses.'
    ],
    tips: [
      'Perfect for sports, school and travel — no carrying spare packs around.',
      'They feel bulky at first, then most people forget they are wearing one.',
      'Great pair with cloth pads: panty for nights, cloth pads for days.',
      'Check the "absorbs X tampons" rating before buying — it varies by brand.'
    ],
    avoid: [
      'Re-wearing the same pair all day on heavy flow — treat it like a pad.',
      'Fabric softener or bleach — both permanently reduce absorbency.',
      'Storing them damp — mildew smell becomes permanent if it sets in.'
    ]
  }
];
