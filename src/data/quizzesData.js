// FemCare AI - Interactive Quizzes Bank
// Reinforces health knowledge, debunks myths, and promotes body literacy.

export const QUIZZES = [
  {
    id: "quiz-1",
    title: "Menstrual Cycle & Hormones 101",
    category: "Anatomy",
    questions: [
      {
        question: "How much blood is typically lost during an entire healthy period?",
        options: [
          "About 1-2 cups (250-500 ml)",
          "About 2-3 tablespoons (30-50 ml)",
          "More than 1 liter",
          "Half a glass (150 ml)"
        ],
        correctIndex: 1,
        explanation: "The average blood loss throughout your whole period is only 2 to 3 tablespoons (30-50 ml). Anything exceeding 80ml consistently is considered heavy bleeding."
      },
      {
        question: "During which phase does estrogen peak, giving you highest energy and fertility?",
        options: [
          "Menstrual Phase",
          "Luteal Phase",
          "Ovulatory Phase",
          "PMS Phase"
        ],
        correctIndex: 2,
        explanation: "During the Ovulatory phase (typically around days 14-16), estrogen surges to its highest level, promoting peak cognitive focus, confidence, and fertility."
      },
      {
        question: "Why does temporary water weight increase by 1-2 kg in the pre-period week?",
        options: [
          "Excess fat accumulation",
          "Progesterone causes water retention and slower digestion",
          "Dehydration",
          "Lack of protein"
        ],
        correctIndex: 1,
        explanation: "Progesterone relaxes smooth muscle walls and signals kidneys to hold sodium, creating harmless temporary water retention that resolves naturally once your period starts."
      }
    ]
  },
  {
    id: "quiz-2",
    title: "Period Myths vs Biological Facts",
    category: "Myths",
    questions: [
      {
        question: "Is it safe to wash your hair or take a warm bath during periods?",
        options: [
          "No, it stops the flow completely",
          "Yes, warm water actually helps relax pelvic muscles and reduces cramps",
          "Only with cold water",
          "Only on day 5"
        ],
        correctIndex: 1,
        explanation: "Warm baths and showers are thoroughly beneficial. Warm water increases blood circulation and acts as a natural muscle relaxant for pelvic cramping."
      },
      {
        question: "How often should you ideally change a disposable sanitary pad?",
        options: [
          "Only when it is completely soaked",
          "Every 4 to 6 hours, regardless of flow",
          "Once every 12 hours",
          "Once every 24 hours"
        ],
        correctIndex: 1,
        explanation: "Even with light flow, bacterial colonies multiply rapidly in warm moisture. Changing pads every 4-6 hours prevents infection and irritation."
      },
      {
        question: "What is the cost of 1 biodegradable sanitary pad under India's Jan Aushadhi scheme?",
        options: [
          "₹10 per pad",
          "₹5 per pad",
          "₹1 per pad",
          "₹15 per pad"
        ],
        correctIndex: 2,
        explanation: "Under the PMBJP Suvidha initiative, oxo-biodegradable sanitary napkins are provided at only ₹1 per pad at Jan Aushadhi Kendras across India!"
      }
    ]
  },
  {
    id: "quiz-3",
    title: "Nutrition & Iron Booster Smart Quiz",
    category: "Nutrition",
    questions: [
      {
        question: "Which vitamin triples the absorption of plant-based iron (like spinach and methi)?",
        options: [
          "Vitamin D",
          "Vitamin C (e.g. lemon, amla)",
          "Vitamin K",
          "Vitamin B12"
        ],
        correctIndex: 1,
        explanation: "Vitamin C binds with non-heme iron to form an easily soluble chelate, boosting intestinal absorption up to 300%!"
      },
      {
        question: "Which herbal tea is clinically proven to relax uterine spasms similarly to ibuprofen?",
        options: [
          "Strong Black Tea",
          "Fresh Crushed Ginger Tea",
          "Iced Peach Tea",
          "Espresso"
        ],
        correctIndex: 1,
        explanation: "Ginger contains gingerols and shogaols which suppress cyclooxygenase (COX-2) enzymes and prostaglandins, effectively easing uterine contractions."
      },
      {
        question: "Why do pre-menstrual cravings often target dark chocolate?",
        options: [
          "Pure habit",
          "Dark chocolate is rich in magnesium, which your body needs for muscle relaxation",
          "It contains salt",
          "It lowers body temperature"
        ],
        correctIndex: 1,
        explanation: "High-cocoa dark chocolate is rich in magnesium and tryptophan, which your body naturally craves to elevate falling serotonin levels."
      }
    ]
  }
];
