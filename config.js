/**
 * =============================================================================
 * JUNK REMOVAL BROTHERS - MAIN CONFIGURATION FILE
 * =============================================================================
 * 
 * Edit this file to customize business name, contact info, pricing, and text.
 * Changes saved here update across the entire website automatically.
 * =============================================================================
 */

const SITE_CONFIG = {
  // ---------------------------------------------------------------------------
  // 0. WEBSITE COLOR THEME (CHANGE HEX CODES HERE TO UPDATE THE ENTIRE SITE)
  // ---------------------------------------------------------------------------
  theme: {
    primaryColor: "#265933",   // Main brand color (buttons, links, borders, active chips)
    secondaryColor: "#18324A", // Secondary accent color (hero callout, price display, badges)
    darkBg: "#102333",         // Dark charcoal/black (hero card, estimator bar, footer)
    lightBg: "#F4F7F3"         // Soft background tint for alternating sections
  },

  // ---------------------------------------------------------------------------
  // 1. BUSINESS & CONTACT INFORMATION
  // ---------------------------------------------------------------------------
  company: {
    name: "Junk Removal Brothers",
    tagline: "Residential & Commercial Junk Removal in Rochester, NY",
    shortDescription: "Family-owned and operated. Text us a photo for a fast quote, or use our estimator below. We handle all heavy lifting and offer evening & weekend pickups throughout Monroe County.",

    // Contact Info
    phone: "585-699-4762",
    phoneRaw: "15856994762",
    smsNumber: "15856994762",
    smsDefaultBody: "Hi Junk Removal Brothers! I'd like a quote. Here is what I have and my town:",

    // YOUR ACTUAL EMAIL (This is where FormSubmit will send all quotes & photos!)
    email: "RocJunkRemoval@proton.me",

    // Service Area & Hours
    cityState: "Rochester, NY",
    serviceAreaSummary: "Serving Rochester, Greece, Brighton, Henrietta, Pittsford, Webster, Penfield, Fairport, Irondequoit, Chili, and surrounding Monroe County towns.",
    serviceAreas: [
      "Rochester",
      "Brighton",
      "Henrietta",
      "Pittsford",
      "Greece",
      "Webster",
      "Penfield",
      "Fairport",
      "Irondequoit",
      "Chili"
    ],
    operatingHours: "Flexible Scheduling — Evening & Weekend Pickups Available",

    logo: "assets/images/Rochester Junk Removal Brothers Logo.png",
    heroActionImage: "assets/images/action_shot.png",

    trustPoints: [
      "Evening & Weekend Pickups Available — Flexible Scheduling at No Extra Charge"
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. ABOUT THE BROTHERS
  // ---------------------------------------------------------------------------
  aboutUs: {
    title: "About Our Business",
    subtitle: "Locally Owned. Brother Operated. Direct & Dependable.",
    paragraphs: [
      "We are two brothers who made Rochester our home several years ago. When we founded Rochester Junk Removal Brothers, we wanted to build something straightforward: an honest, owner-operated service that makes clearing out clutter completely painless for our neighbors.",
      "We aren't a bloated national franchise with call centers or hidden franchise fees. When you text, call, or request a quote, you're speaking directly with one of us from the first message until the job is done.",
      "We know standard 9-to-5 pick-up windows don't work when you're balancing work and family. We offer flexible scheduling into evenings and weekends so you don't have to take time off to get rid of unwanted junk.",
      "We're family guys—both married, each with a pair of cats at home—and we treat your space with the care, professionalism, and honesty we'd expect in our own.",
      ],
    brother1: {
      name: "David & Michel",
      role: "Owners and Operators",
      image: "assets/images/brother1.png"
    }
  },

  // ---------------------------------------------------------------------------
  // 3. PRICING & ESTIMATOR SETTINGS
  // ---------------------------------------------------------------------------
  pricing: {
    minimumJobPrice: 75,
    discountPercent: 5,
    discountDescription: "5% Discount for Senior Citizens, Military, First Responders, Social Services & Education Workers",
    disclaimer: "Ballpark estimate assumes standard curbside or ground-floor access. Final quotes confirmed before lifting based on truck volume and material weight.",

    terrainModifiers: [
      {
        id: "stairs_1_flight",
        name: "1 Flight of Stairs",
        fee: 20
      },
      {
        id: "stairs_2_flights",
        name: "2+ Flights of Stairs",
        fee: 40
      },
      {
        id: "sharp_corners",
        name: "Tight Hallways / Turns",
        fee: 25
      },
      {
        id: "long_carry",
        name: "Long Carry (>100 ft)",
        fee: 20
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. ITEM CATALOG
  // ---------------------------------------------------------------------------
  itemCatalog: [
    {
      category: "Furniture & Living Room",
      items: [
        { id: "couch_standard", name: "Standard Sofa / Couch", minPrice: 65, maxPrice: 95 },
        { id: "sectional_couch", name: "Sectional Couch (2-3 Pieces)", minPrice: 110, maxPrice: 160 },
        { id: "recliner_armchair", name: "Recliner / Armchair", minPrice: 40, maxPrice: 65 },
        { id: "coffee_table", name: "Coffee Table / End Table", minPrice: 20, maxPrice: 35 },
        { id: "entertainment_center", name: "TV Stand / Media Console", minPrice: 40, maxPrice: 70 },
        { id: "dining_set", name: "Dining Table & Chairs", minPrice: 60, maxPrice: 100 },
        { id: "bookshelf", name: "Bookshelf / Cabinet", minPrice: 35, maxPrice: 60 },
        { id: "piano", name: "Piano (Upright / Spinet / Console)", minPrice: 175, maxPrice: 275 }
      ]
    },
    {
      category: "Bedroom Items",
      items: [
        { id: "mattress_only", name: "Mattress (Bagged Only)", minPrice: 45, maxPrice: 65 },
        { id: "bed_frame", name: "Bed Frame / Headboard", minPrice: 35, maxPrice: 55 },
        { id: "dresser", name: "Dresser / Wardrobe", minPrice: 50, maxPrice: 85 },
        { id: "nightstand", name: "Nightstand", minPrice: 15, maxPrice: 30 }
      ]
    },
    {
      category: "Appliances",
      items: [
        { id: "refrigerator", name: "Refrigerator / Freezer", minPrice: 75, maxPrice: 120 },
        { id: "washer_dryer", name: "Washer or Dryer", minPrice: 75, maxPrice: 100 },
        { id: "stove_oven", name: "Stove / Oven / Dishwasher", minPrice: 75, maxPrice: 100 },
        { id: "air_conditioner", name: "Window A/C Unit", minPrice: 55, maxPrice: 85 },
        { id: "exercise_equipment", name: "Treadmill / Exercise Equipment", minPrice: 65, maxPrice: 110 }
      ]
    },
    {
      category: "Yard, Garage & Bulk Items",
      items: [
        { id: "trash_bags_pile", name: "Bagged Trash (5-8 Bags)", minPrice: 35, maxPrice: 60 },
        { id: "boxes_pile", name: "Cardboard Boxes (8-10 Boxes)", minPrice: 30, maxPrice: 50 },
        { id: "yard_waste_pile", name: "Yard Debris / Branches (Small Pile)", minPrice: 50, maxPrice: 90 },
        { id: "patio_furniture", name: "Patio Furniture Set", minPrice: 45, maxPrice: 80 },
        { id: "grill_lawnmower", name: "Grill / Lawn Mower", minPrice: 35, maxPrice: 60 },
        { id: "carpet_roll", name: "Carpet Roll (Single Room)", minPrice: 35, maxPrice: 60 }
      ]
    }
  ],

  // ---------------------------------------------------------------------------
  // 5. ACCEPTED VS PROHIBITED ITEMS
  // ---------------------------------------------------------------------------
  whatWeTake: [
    "Furniture, couches, mattresses & pianos",
    "Appliances (disconnected), TVs & electronics",
    "Garage, basement, attic & estate cleanouts",
    "Yard debris, exercise equipment & general household junk"
  ],

  whatWeDontTake: [
    "Appliances still connected to water, gas, or hardwired power (must be disconnected)",
    "Wet paint, liquid chemicals, or motor oil (dried paint cans are OK)",
    "Propane tanks, fuel & hazardous materials"
  ],

  // ---------------------------------------------------------------------------
  // 6. FREQUENTLY ASKED QUESTIONS
  // ---------------------------------------------------------------------------
  faqs: [
    {
      question: "What forms of payment do you accept, and do you provide receipts?",
      answer: "We accept Visa, Mastercard, Tap to Pay, Apple Pay, Google Pay, Venmo, and Cash once the job is finished. We can send digital receipts immediately via text or email."
    },
    {
      question: "Do you offer any discounts?",
      answer: "Yes! We offer a 5% discount for senior citizens, military & veterans, first responders, social services workers, and education workers. Just let us know when you text, call, or book."
    },
    {
      question: "How does the pricing estimate work?",
      answer: "Our online calculator provides an estimated price range based on standard items and access conditions. Prices can change pending mileage and the condition or weight of items—text or call 585-699-4762 for more information or a firm quote. We always confirm the exact price on-site before lifting anything."
    },
    {
      question: "Do you offer evening and weekend pickups?",
      answer: "Yes. We know taking time off work is inconvenient, so we schedule evening appointments (after 5:00 PM) as well as Saturday and Sunday pickups at standard rates."
    },
    {
      question: "Do items need to be moved to the curb or disconnected beforehand?",
      answer: "No need to move anything to the curb—we remove items right from basements, upstairs rooms, or garages. For major appliances (washers, dryers, stoves, fridges with water lines), please have water, gas, and hardwired electrical lines disconnected prior to arrival."
    },
    {
      question: "How quickly can you schedule a pickup?",
      answer: "We typically have same-day or next-day availability across Monroe County. Just text us a photo at 585-699-4762, call, or submit a request online to check availability."
    }
  ],

  // ---------------------------------------------------------------------------
  // 7. FORM SUBMISSION (FORMSUBMIT.CO WITH 100% FREE PHOTO ATTACHMENTS)
  // ---------------------------------------------------------------------------
  form: {
    service: "formsubmit",
    // Using your FormSubmit activation code keeps your raw email address hidden from form-scraping bots:
    destinationEmail: "f13f4498a5103e0f70db326088276b1f",
    notificationSubject: "New Junk Removal Quote Request - Junk Removal Brothers"
  }
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
