// FemCare AI - Discreet Period Care Catalog & Period Poverty Locator
// Privacy-first: Zero user purchase history stored on any server.

export const SHOPPING_PRODUCTS = [
  {
    id: "prod-1",
    name: "Jan Aushadhi Suvidha Biodegradable Pads",
    brand: "Govt of India (PMBJP)",
    category: "pads",
    type: "Sanitary Napkins",
    price: 4, // 4 pads pack for ₹4 (₹1/pad!)
    regularMarketPrice: 40,
    unit: "Pack of 4 (₹1 per pad)",
    ecoFriendly: true,
    biodegradable: "100% Oxo-Biodegradable",
    description: "Govt-subsidized high-quality sanitary napkins made with biodegradable cellulose fibers. Non-toxic, soft on skin, and 90% cheaper than commercial plastic pads.",
    badge: "Government Subsidized • ₹1/Pad",
    discreetPack: "Standard Brown Eco Paper Packaging",
    inStock: true
  },
  {
    id: "prod-2",
    name: "PureSilicone Medical Grade Menstrual Cup",
    brand: "FemCare Eco",
    category: "cups",
    type: "Menstrual Cup",
    price: 349,
    regularMarketPrice: 799,
    unit: "1 Cup + Breathable Cotton Pouch",
    ecoFriendly: true,
    biodegradable: "Reusable for up to 10 years",
    description: "100% US-FDA approved medical-grade silicone. Leak-free protection for up to 12 hours. Zero odor, rash-free, and saves thousands of single-use pads.",
    badge: "Zero-Waste Hero",
    discreetPack: "Discreet Matte Black Box",
    inStock: true
  },
  {
    id: "prod-3",
    name: "Bamboo Organic Cotton Day & Night Pads",
    brand: "Nua / Carmesi Organic",
    category: "pads",
    type: "Organic Pads",
    price: 189,
    regularMarketPrice: 249,
    unit: "Pack of 12 (Wings)",
    ecoFriendly: true,
    biodegradable: "70% Plant Biodegradable",
    description: "Ultra-thin, bleach-free, chlorine-free organic bamboo core with zero artificial fragrances. Includes individual disposal wrappers with red dot stickers.",
    badge: "Chlorine-Free & Gentle",
    discreetPack: "Plain Cardboard Shipper",
    inStock: true
  },
  {
    id: "prod-4",
    name: "Leak-Proof Seamless Period Underwear",
    brand: "FemCare Comfort",
    category: "underwear",
    type: "Period Panty",
    price: 499,
    regularMarketPrice: 899,
    unit: "Pack of 2 (Absorbs 2-3 tampons)",
    ecoFriendly: true,
    biodegradable: "Washable & Reusable 100+ times",
    description: "4-layer absorbent, moisture-wicking technology designed for heavy flow nights and sports. No chafing, no plastic crinkling.",
    badge: "Nighttime Security",
    discreetPack: "Opaque Bubble Mailer",
    inStock: true
  },
  {
    id: "prod-5",
    name: "Ayurvedic Cramp Relief Roll-On & Heat Patch",
    brand: "Sirona / FemHerbal",
    category: "wellness",
    type: "Pain Management",
    price: 199,
    regularMarketPrice: 299,
    unit: "50ml Roll-on + 2 Air-Activated Heat Patches",
    ecoFriendly: false,
    biodegradable: "Natural Herbal Actives",
    description: "Infused with Eucalyptus, Camphor, and Menthol oils. Delivers 8 hours of sustained soothing thermal warmth for severe pelvic cramps without medicines.",
    badge: "Instant 15-Min Relief",
    discreetPack: "Unmarked Kraft Envelope",
    inStock: true
  },
  {
    id: "prod-6",
    name: "100% Organic Cotton Cardboard Applicator Tampons",
    brand: "Sirona Organic",
    category: "tampons",
    type: "Tampons",
    price: 240,
    regularMarketPrice: 320,
    unit: "Pack of 16 Regular/Super",
    ecoFriendly: true,
    biodegradable: "Biodegradable Cardboard Applicator",
    description: "Pure certified organic cotton fibers without synthetic rayon or chemical binders. Smooth insertion with biodegradable cardboard applicator.",
    badge: "Hypoallergenic",
    discreetPack: "Discreet Outer Sleeve",
    inStock: true
  }
];

// Period Poverty & Emergency Pad Access Centers in India
export const PERIOD_POVERTY_CENTERS = [
  {
    name: "Jan Aushadhi Kendra (All India Network)",
    type: "Govt Distribution Point",
    cost: "₹1 per pad (Suvidha Pads)",
    access: "Walk into any of the 9,500+ Kendras nationwide. No prescription or ID required.",
    helpline: "1800-180-8080",
    timing: "9:00 AM - 8:00 PM Daily"
  },
  {
    name: "Village ASHA & Anganwadi Centers",
    type: "Community Health Worker",
    cost: "Free to ₹6 per pack of 6",
    access: "Available to all adolescent girls (10-19 years) under the National Health Mission.",
    helpline: "Dial 104 (Health Information)",
    timing: "Contact local primary health center (PHC)"
  },
  {
    name: "Red Dot Foundation / Myna Mahila Foundation",
    type: "NGO Doorstep & Urban Slum Access",
    cost: "Free for low-income households",
    access: "Mumbai, Delhi NCR, Bangalore, Pune community distribution hubs.",
    helpline: "022-2556-9878",
    timing: "10:00 AM - 6:00 PM"
  },
  {
    name: "Indian Red Cross Society Emergency Pad Bank",
    type: "Disaster & Emergency Relief",
    cost: "100% Free",
    access: "Available at district Red Cross offices for schools, colleges & emergencies.",
    helpline: "011-23716441",
    timing: "24x7 Emergency Help"
  }
];
