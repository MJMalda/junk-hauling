/**
 * =============================================================================
 * JUNK REMOVAL BROS - MAIN CONFIGURATION FILE
 * =============================================================================
 * 
 * Edit this file to customize business name, contact info, pricing, and text.
 * Changes saved here update across the entire website automatically.
 * =============================================================================
 */

const SITE_CONFIG = {
  // ---------------------------------------------------------------------------
  // 1. BUSINESS & CONTACT INFORMATION
  // ---------------------------------------------------------------------------
  company: {
    name: "Junk Removal Bros",
    tagline: "Residential & Commercial Junk Removal in Rochester, NY",
    shortDescription: "Family-owned and operated. Text us a photo for a fast quote, or use our estimator below. We handle all heavy lifting and offer evening & weekend pickups throughout Monroe County.",

    // Contact Info
    phone: "205-205-7572",
    phoneRaw: "2052057572",
    smsNumber: "2052057572",

    // YOUR ACTUAL EMAIL (This is where FormSubmit will send all quotes & photos!)
    email: "RocJunkRemoval@proton.me",

    // Service Area & Hours
    cityState: "Rochester, NY",
    serviceAreaSummary: "Serving Rochester, Greece, Brighton, Henrietta, Pittsford, Webster, Penfield, Fairport, and surrounding Monroe County towns.",
    operatingHours: "Monday – Sunday: 7:00 AM – 8:30 PM (Evening & Weekend Pickups Available)",

    heroActionImage: "assets/images/action_shot.jpg",

    trustPoints: [
      "Text Photos for Fast Quotes",
      "5% Senior, Military & Community Discount",
      "Evening & Weekend Pickups",
      "Upfront Pricing"
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. ABOUT THE BROTHERS
  // ---------------------------------------------------------------------------
  aboutUs: {
    title: "About Our Business",
    subtitle: "Locally owned and operated in Greater Rochester.",
    paragraphs: [
      "We are two brothers who grew up in the Rochester area. We started this junk removal business to provide homeowners and local businesses with a reliable, straightforward alternative to large national franchises.",
      "When you schedule a pickup with us, you work directly with the owners. We arrive on time, confirm the price before touching anything, and take care of the entire loading and removal process from start to finish.",
      "Because many of our customers work during normal business hours, we provide flexible evening appointments after 5:00 PM and weekend pickups at no extra charge."
    ],
    brother1: {
      name: "Dave",
      role: "Co-Owner & Operations",
      image: "assets/images/brother1.jpg"
    },
    brother2: {
      name: "Mike",
      role: "Co-Owner & Logistics",
      image: "assets/images/brother2.jpg"
    }
  },

  // ---------------------------------------------------------------------------
  // 3. PRICING & ESTIMATOR SETTINGS
  // ---------------------------------------------------------------------------
  pricing: {
    minimumJobPrice: 75,
    discountPercent: 5,
    discountDescription: "5% Discount for Senior Citizens, Military, First Responders, Social Services & Education Workers",
    disclaimer: "Note: Online estimates are a ballpark range. Prices may vary pending mileage and the condition/weight of items—text or call 205-205-7572 for more details.",

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
        { id: "bookshelf", name: "Bookshelf / Cabinet", minPrice: 35, maxPrice: 60 }
      ]
    },
    {
      category: "Bedroom Items",
      items: [
        { id: "mattress_boxspring", name: "Mattress + Boxspring Set", minPrice: 60, maxPrice: 90 },
        { id: "mattress_only", name: "Mattress Only (Any Size)", minPrice: 45, maxPrice: 65 },
        { id: "bed_frame", name: "Bed Frame / Headboard", minPrice: 35, maxPrice: 55 },
        { id: "dresser", name: "Dresser / Wardrobe", minPrice: 50, maxPrice: 85 },
        { id: "nightstand", name: "Nightstand", minPrice: 15, maxPrice: 30 }
      ]
    },
    {
      category: "Appliances",
      items: [
        { id: "refrigerator", name: "Refrigerator / Freezer", minPrice: 75, maxPrice: 120 },
        { id: "washer_dryer", name: "Washer or Dryer", minPrice: 55, maxPrice: 85 },
        { id: "stove_oven", name: "Stove / Oven / Dishwasher", minPrice: 45, maxPrice: 75 },
        { id: "air_conditioner", name: "Window A/C Unit", minPrice: 30, maxPrice: 50 },
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
    "Household furniture (couches, mattresses, dressers, tables)",
    "Major appliances (refrigerators, washers, dryers, stoves — disconnected)",
    "Televisions, electronics, and small appliances",
    "Attic, basement, and garage cleanouts",
    "Yard debris, branches, and outdoor equipment",
    "Remodeling and construction debris (wood, drywall)",
    "Exercise equipment and general household clutter"
  ],

  whatWeDontTake: [
    "Wet paint, stains, and chemical solvents (dried paint cans are OK)",
    "Motor oil, gasoline, and hazardous automotive fluids",
    "Asbestos, medical waste, and biohazards",
    "Pressurized gas or propane tanks",
    "Items with active bed bug or severe pest infestations",
    "Explosives and hazardous industrial materials"
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
      answer: "Our online calculator provides an estimated price range based on standard items and access conditions. Prices can change pending mileage and the condition or weight of items—text or call 205-205-7572 for more information or a firm quote. We always confirm the exact price on-site before lifting anything."
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
      answer: "We typically have same-day or next-day availability across Monroe County. Just text us a photo at 205-205-7572, call, or submit a request online to check availability."
    }
  ],

  // ---------------------------------------------------------------------------
  // 7. FORM SUBMISSION (FORMSUBMIT.CO WITH 100% FREE PHOTO ATTACHMENTS)
  // ---------------------------------------------------------------------------
  form: {
    service: "formsubmit",
    // Put the destination email address (or FormSubmit activation hash) where you want to receive quotes and photos.
    // If left equal to company.email, changing company.email above updates both automatically.
    destinationEmail: "RocJunkRemoval@proton.me",
    notificationSubject: "New Junk Removal Quote Request - Junk Removal Bros"
  }
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
