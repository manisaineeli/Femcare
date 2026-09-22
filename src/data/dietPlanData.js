// FemCare AI - Cycle-Phased Diet & Wellness Data
// Tailored with Indian whole foods, Ayurvedic wisdom, and clinical hormonal phase recommendations.

export const CYCLE_DIET_PHASES = {
  menstrual: {
    phaseName: "Menstrual Phase (Days 1 - 5)",
    focus: "Replenishing Iron, Warm Soothing Digestion, Anti-Inflammatory",
    caloricGuideline: "Baseline Maintenance (1800 - 2000 kcal)",
    hormonalContext: "Estrogen & Progesterone are at their lowest baseline. The body needs warmth, easily digestible meals, and bioavailable iron to offset blood loss.",
    superfoods: [
      "Palak (Spinach) & Methi leaves",
      "Moong Dal & Warm Khichdi",
      "Jaggery (Gur) & Roasted Chana",
      "Fresh Crushed Ginger Tea",
      "Eggs or Soaked Dates & Almonds",
      "Haldi Doodh (Turmeric Milk)"
    ],
    foodsToAvoid: [
      "Iced drinks and cold salads (constricts pelvic blood flow)",
      "Excessive espresso/caffeine (worsens cramps)",
      "Deep-fried samosas/chips (spikes inflammatory prostaglandins)",
      "High sodium foods (worsens fluid retention)"
    ],
    mealPlan: {
      veg: {
        breakfast: "Warm Ragi Malt or Oats Porridge with crushed almonds, jaggery, and sliced banana",
        lunch: "Comforting Moong Dal Palak Khichdi with a teaspoon of pure A2 ghee and roasted papad",
        snack: "Ginger cinnamon herbal tea with 2 Til-Gur (sesame jaggery) ladoos",
        dinner: "Steamed Methi Roti with Lauki (bottle gourd) sabzi and warm yellow dal soup"
      },
      nonVeg: {
        breakfast: "2 Boiled eggs with buttered whole wheat toast and warm ginger lemon water",
        lunch: "Light Chicken Broth with spinach, brown rice, and cucumber slices",
        snack: "Handful of roasted chana, walnuts, and dried figs (anjeer)",
        dinner: "Soft Chapati with grilled chicken breast and sautéed green beans"
      },
      jain: {
        breakfast: "Warm Ragi Porridge sweetened with jaggery and crushed green cardamom",
        lunch: "Moong Dal Khichdi prepared with ghee, cumin, and tender bottle gourd (lauki)",
        snack: "Warm spiced milk with turmeric, saffron, and roasted sesame seeds",
        dinner: "Moong Mogar dal with soft phulkas and steamed zucchini"
      },
      vegan: {
        breakfast: "Warm steel-cut oats with almond butter, chia seeds, and chopped dates",
        lunch: "Spinach and brown lentil curry with steamed brown rice and lemon squeeze",
        snack: "Fresh ginger tea with roasted peanuts and jaggery nibs",
        dinner: "Tofu stir-fry with steamed bok choy, carrots, and warm millet roti"
      }
    }
  },

  follicular: {
    phaseName: "Follicular Phase (Days 6 - 13)",
    focus: "Clean Protein, Estrogen Metabolism, Light & Vibrant Greens",
    caloricGuideline: "Light & Active (1700 - 1900 kcal)",
    hormonalContext: "FSH and Estrogen are climbing. Digestion is stronger, energy is rising, and insulin sensitivity is high. Great time for lighter, fermented, and cruciferous foods.",
    superfoods: [
      "Broccoli, Cauliflower, Cabbage (supports estrogen clearance)",
      "Sprouted Moong & Chana (rich in enzymes & plant protein)",
      "Fresh Citrus (Oranges, Amla, Guava)",
      "Pumpkin seeds (zinc for follicle growth)",
      "Probiotic Curd (Dahi) or Chaas",
      "Avocados or flaxseeds"
    ],
    foodsToAvoid: [
      "Heavy cream-laden curries (can feel sluggish)",
      "Processed sugar pastries",
      "Stale or leftover refrigerated meals"
    ],
    mealPlan: {
      veg: {
        breakfast: "Sprouted Moong & Vegetable Poha with a squeeze of fresh lemon juice",
        lunch: "Paneer & Broccoli stir-fry with 2 Multigrain rotis and fresh probiotic mint Chaas",
        snack: "Fresh pomegranate bowl with roasted pumpkin seeds",
        dinner: "Dal Tadka with steamed Quinoa or Jeera brown rice and fresh cucumber salad"
      },
      nonVeg: {
        breakfast: "Scrambled eggs with sautéed mushrooms and spinach",
        lunch: "Grilled fish (salmon/rohu) with steamed broccoli and brown rice",
        snack: "Greek yogurt or fresh curd with berries and chia seeds",
        dinner: "Chicken stir-fry with bell peppers, snap peas, and soft phulkas"
      },
      jain: {
        breakfast: "Sprouted Moong Chaat with lemon, cumin, and fresh coriander",
        lunch: "Paneer Bhurji (no onion/garlic) with 2 Missi rotis and cold fresh Chaas",
        snack: "Sliced apples with roasted melon seeds",
        dinner: "Green moong dal with steamed samak rice and steamed French beans"
      },
      vegan: {
        breakfast: "Tofu bhurji with turmeric, peas, and whole grain toast",
        lunch: "Chickpea & Broccoli Buddha bowl with tahini dressing and quinoa",
        snack: "Fresh orange with a handful of raw pumpkin seeds",
        dinner: "Soy chunks vegetable curry with soft bajra roti"
      }
    }
  },

  ovulatory: {
    phaseName: "Ovulatory Phase (Days 14 - 16)",
    focus: "Maximum Hydration, Antioxidants, Fiber, Liver Support",
    caloricGuideline: "Peak Energy (1800 - 2000 kcal)",
    hormonalContext: "Estrogen and Luteinizing Hormone (LH) surge to their cycle peak. Your body temperature rises slightly. Fiber is essential to bind and excrete surplus estrogen.",
    superfoods: [
      "Berries, Red Grapes, Bell Peppers (glutathione antioxidants)",
      "Tender Coconut Water (natural electrolytes)",
      "Chia & Flaxseeds (fiber to clear excess hormones)",
      "Leafy Kale, Methi, and Coriander",
      "Green Tea & Spearmint Tea",
      "Almonds & Walnuts"
    ],
    foodsToAvoid: [
      "High alcohol consumption (burdens liver detox)",
      "Excessive refined carbs (triggers insulin spikes that perturb ovulation)"
    ],
    mealPlan: {
      veg: {
        breakfast: "Overnight chia pudding soaked in almond milk with berries and sliced almonds",
        lunch: "Rajma (kidney beans) curry with steamed brown rice and large bell pepper salad",
        snack: "1 fresh tender coconut water with pulp",
        dinner: "Grilled tofu or paneer tikka with steamed asparagus and 1 jowar roti"
      },
      nonVeg: {
        breakfast: "Avocado toast topped with 2 poached eggs and chili flakes",
        lunch: "Tuna or Rohu fish curry with brown rice and leafy green salad",
        snack: "Coconut water paired with a small handful of walnuts",
        dinner: "Herb roasted chicken with sweet potato wedges and steamed green beans"
      },
      jain: {
        breakfast: "Chia seed smoothie with almond milk, soaked dates, and green cardamom",
        lunch: "Kabuli Chana curry (Jain style) with steamed rice and cucumber slices",
        snack: "Tender coconut water with roasted sunflower seeds",
        dinner: "Grilled Paneer slices with sautéed capsicum and 2 soft phulkas"
      },
      vegan: {
        breakfast: "Green smoothie bowl with spinach, banana, hemp seeds, and chia",
        lunch: "Black bean & bell pepper quinoa bowl with avocado cilantro drizzle",
        snack: "Tender coconut water with roasted pumpkin and flaxseeds",
        dinner: "Tempeh or Tofu curry with steamed amaranth grains and steamed greens"
      }
    }
  },

  luteal: {
    phaseName: "Luteal Phase (Days 17 - 28)",
    focus: "Magnesium, Serotonin Boost, Vitamin B6, Complex Carbs",
    caloricGuideline: "Metabolism Increases (+150 - 300 kcal needed: 1950 - 2250 kcal)",
    hormonalContext: "Progesterone dominates. Basal metabolic rate increases by 5-10%! Cravings are natural because your body burns more calories. Water retention of 1-2kg is normal.",
    superfoods: [
      "Dark Chocolate (70% or higher, rich in magnesium)",
      "Sweet Potatoes (Shakarkandi) & Roasted Makhanas",
      "Bananas (Vitamin B6 reduces PMS mood dips)",
      "Chamomile & Peppermint tea (relaxes digestion)",
      "Walnuts, Sunflower seeds, Sesame seeds",
      "Oats & Whole Millets (Bajra, Ragi)"
    ],
    foodsToAvoid: [
      "Heavy salty snacks like chips and salted peanuts (drastically worsens water retention)",
      "Carbonated sodas and excess artificial sweeteners",
      "High caffeine (increases breast tenderness and pre-period anxiety)"
    ],
    mealPlan: {
      veg: {
        breakfast: "Warm spiced oatmeal cooked with almond milk, cinnamon, banana, and chia seeds",
        lunch: "Chole (Chickpea) curry with roasted Shakarkandi (sweet potato) and 2 whole wheat rotis",
        snack: "Roasted Foxnuts (Makhanas) tossed in olive oil with 2 squares of 70% dark chocolate",
        dinner: "Warm Dal Makhani (light preparation) with Bajra roti and steamed zucchini"
      },
      nonVeg: {
        breakfast: "3-Egg vegetable omelette with avocado and 1 slice sprouted rye toast",
        lunch: "Turkey or Chicken breast with mashed sweet potato and sautéed green beans",
        snack: "2 squares of dark chocolate with roasted walnuts",
        dinner: "Baked salmon or fish fillet with quinoa and steamed broccoli"
      },
      jain: {
        breakfast: "Warm roasted Makhana porridge with saffron, almonds, and jaggery",
        lunch: "Yellow Moong Dal with Bajra roti, ghee, and steamed French beans",
        snack: "Roasted Makhanas with a square of pure dark chocolate",
        dinner: "Paneer curry (mild spices) with soft phulkas and warm chamomile tea"
      },
      vegan: {
        breakfast: "Warm rolled oats with cacao powder, mashed banana, and sunflower seeds",
        lunch: "Lentil sweet potato shepherd's pie or stew with steamed kale",
        snack: "Roasted Makhanas and dark chocolate nibs",
        dinner: "Roasted chickpea bowl with tahini sweet potato mash and warm herbal tea"
      }
    }
  }
};

export const SYMPTOM_FOOD_SOLUTIONS = [
  {
    symptom: "Severe Cramps",
    doEat: "Fresh ginger tea, warm turmeric milk (Haldi doodh), soaked almonds, sesame seeds (Til)",
    avoid: "Cold sodas, fried chips, excess coffee",
    why: "Ginger and turmeric naturally inhibit prostaglandin synthesis; warm temperature dilates blood vessels."
  },
  {
    symptom: "Bloating & Puffiness",
    doEat: "Tender coconut water, fresh cucumber slices, watermelon, fennel (Saunf) tea",
    avoid: "High-sodium namkeen, canned soups, pickles, chewing gum",
    why: "Potassium flushes out excess extracellular sodium that causes water retention."
  },
  {
    symptom: "Fatigue & Low Energy",
    doEat: "Jaggery with roasted chana, dates (Khajoor), beetroot pomegranate smoothie",
    avoid: "Sugary energy drinks (leads to severe glucose crashes)",
    why: "Combines plant iron with natural simple sugars for sustained mitochondrial energy."
  },
  {
    symptom: "Mood Swings & Irritability",
    doEat: "70%+ Dark chocolate, ripe bananas, pumpkin seeds, chamomile tea",
    avoid: "Alcohol, excessive espresso, high-fructose syrups",
    why: "Supplies magnesium and tryptophan, the direct building blocks for serotonin."
  },
  {
    symptom: "Pre-Period Acne",
    doEat: "Spearmint tea (2 cups daily), zinc-rich pumpkin seeds, probiotics like Dahi",
    avoid: "Dairy milk (if sensitive), high-glycemic white flour pastries",
    why: "Spearmint has clinically proven mild anti-androgenic effects that reduce sebum clogging."
  }
];

export const IRON_BOOSTING_RECIPES = [
  {
    id: "r1",
    title: "Palak Dal Khichdi Bowl",
    tagline: "Warm, grounding, and packed with bioavailable iron",
    time: "20 mins",
    ingredients: [
      "1 cup Fresh Palak (Spinach) chopped",
      "1/2 cup Yellow Moong Dal",
      "1/2 cup Brown or Kolam Rice",
      "1 tsp Pure Desi Ghee + Cumin seeds",
      "1/2 Fresh Lemon (Vitamin C booster)"
    ],
    instructions: "Pressure cook moong dal, rice, and chopped spinach with turmeric and salt for 3 whistles. In a small pan, temper cumin seeds in ghee and pour over khichdi. Squeeze fresh lemon juice right before eating to triple iron absorption!"
  },
  {
    id: "r2",
    title: "Til-Gur (Sesame & Jaggery) Energy Bites",
    tagline: "Traditional Indian iron & calcium powerhouses",
    time: "15 mins",
    ingredients: [
      "1 cup White or Black Sesame Seeds",
      "3/4 cup Organic Crushed Jaggery (Gur)",
      "1 tsp Desi Ghee",
      "1/4 tsp Cardamom powder",
      "2 tbsp Crushed roasted peanuts"
    ],
    instructions: "Dry roast sesame seeds in a pan until fragrant. In another pan, melt jaggery with ghee over low heat until syrupy. Stir in sesame seeds and cardamom. Shape into small balls while warm. Eat 1-2 daily during your period."
  },
  {
    id: "r3",
    title: "Beetroot & Pomegranate Elixir",
    tagline: "Natural hemoglobin & nitric oxide reviver",
    time: "5 mins",
    ingredients: [
      "1 Medium Raw Beetroot, peeled",
      "1 cup Fresh Pomegranate pearls",
      "1/2 inch Fresh Ginger root",
      "1/2 Lemon juice",
      "Pinch of Black Salt (Kala Namak)"
    ],
    instructions: "Blend beetroot, pomegranate pearls, and ginger with 1/2 cup water. Strain gently, stir in lemon juice and a pinch of black salt. Drink mid-morning for radiant skin and iron support."
  },
  {
    id: "r4",
    title: "Sprouted Methi & Moong Salad",
    tagline: "High-protein enzyme salad for hormonal clearance",
    time: "10 mins",
    ingredients: [
      "1 cup Sprouted Green Moong",
      "2 tbsp Sprouted Fenugreek (Methi)",
      "1/2 cup Diced Cucumbers & Tomatoes",
      "1 tbsp Roasted Pumpkin Seeds",
      "1 tbsp Lemon juice + Chaat Masala"
    ],
    instructions: "Steam sprouted moong and methi for 2 minutes to soften. Toss with crunchy cucumbers, tomatoes, pumpkin seeds, chaat masala, and fresh lemon. Outstanding for follicular estrogen clearance."
  }
];
