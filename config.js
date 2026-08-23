/**
 * =============================================================================
 * ROCHESTER HAULING BROTHERS - MAIN CONFIGURATION FILE
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
    name: "Rochester Hauling Brothers",
    tagline: "Residential & Commercial Junk Removal in Rochester, NY",
    shortDescription: "Family-owned and operated. We provide upfront estimates, handle all heavy lifting, and offer evening and weekend pickups throughout Monroe County.",

    // Contact Info
    phone: "(585) 555-0199",
    phoneRaw: "5855550199",
    smsNumber: "5855550199",

    // YOUR ACTUAL EMAIL (This is where FormSubmit will send all quotes & photos!)
    email: "rochesterhaulbros@gmail.com",

    // Service Area & Hours
    cityState: "Rochester, NY",
    serviceAreaSummary: "Serving Rochester, Greece, Brighton, Henrietta, Pittsford, Webster, Penfield, Fairport, and surrounding Monroe County towns.",
    operatingHours: "Monday – Friday: 5:00 PM – 8:30 PM  |  Saturday – Sunday: 7:00 AM – 8:30 PM  (Evening & Weekend Pickups Available)",

    heroActionImage: "assets/images/action_shot.jpg",

    trustPoints: [
      "Family-Owned & Operated",
      "Evening & Weekend Appointments",
      "Upfront Estimates",
      "Careful With Walls & Floors"
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. ABOUT THE BROTHERS
  // ---------------------------------------------------------------------------
  aboutUs: {
    title: "About Our Business",
    subtitle: "Locally owned and operated in Greater Rochester.",
    paragraphs: [
      "We are two brothers who grew up in the Rochester area. We started this hauling business to provide homeowners and local businesses with a reliable, straightforward alternative to large national franchises.",
      "When you schedule a pickup with us, you work directly with the owners. We arrive on time, confirm the price before touching anything, and take care of the entire loading process from start to finish.",
      "Because many of our customers work during normal business hours, we provide flexible evening appointments after 5:00 PM and weekend pickups at no extra charge."
    ],
    brother1: {
      name: "Dave",
      role: "Co-Owner & Muscle",
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

    terrainModifiers: [
      {
        id: "ground_floor",
        name: "Ground Floor / Garage / Driveway",
        description: "Standard ground-level access",
        fee: 0,
        isDefault: true
      },
      {
        id: "stairs_1_flight",
        name: "1 Flight of Stairs",
        description: "Basement or second-floor access",
        fee: 20
      },
      {
        id: "stairs_2_flights",
        name: "2+ Flights of Stairs",
        description: "Multi-story apartment or attic access",
        fee: 40
      },
      {
        id: "sharp_corners",
        name: "Tight Hallways / Sharp Turns",
        description: "Requires careful maneuvering or door removal",
        fee: 25
      },
      {
        id: "long_carry",
        name: "Long Carry (>100 ft)",
        description: "Extended distance from home to truck",
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
        { id: "upright_piano", name: "Upright Piano", minPrice: 90, maxPrice: 130 },
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
    "Major appliances (refrigerators, washers, dryers, stoves)",
    "Televisions, electronics, and small appliances",
    "Attic, basement, and garage cleanouts",
    "Yard debris, branches, and outdoor equipment",
    "Remodeling and construction debris (wood, drywall)",
    "Exercise equipment and general household clutter"
  ],

  whatWeDontTake: [
    "Wet paint, stains, and chemical solvents",
    "Motor oil, gasoline, and hazardous automotive fluids",
    "Asbestos, medical waste, and biohazards",
    "Pressurized gas or propane tanks",
    "Explosives and hazardous industrial materials"
    "Single items exceeding 400 lbs (Grand Pianos, )"
  ],

  // ---------------------------------------------------------------------------
  // 6. FREQUENTLY ASKED QUESTIONS
  // ---------------------------------------------------------------------------
  faqs: [
    {
      question: "Do you offer evening and weekend pickups?",
      answer: "Yes. We know taking time off work is inconvenient, so we schedule evening appointments (after 5:00 PM) as well as Saturday and Sunday pickups at standard rates."
    },
    {
      question: "How does the pricing estimate work?",
      answer: "Our online calculator provides an estimated price range based on the items you select and the access conditions (such as stairs). When we arrive on site, we confirm the exact price before starting any work."
    },
    {
      question: "Do items need to be moved to the curb or driveway?",
      answer: "No. We handle removal directly from where items are located, including basements, attics, and upstairs rooms. If you choose to stage items outside beforehand, let us know for our base ground-level rate."
    },
    {
      question: "How quickly can you schedule a pickup?",
      answer: "We typically have same-day or next-day availability across Monroe County. You can submit a request online or call us directly to check current availability."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept credit/debit cards, cash, check, Venmo, Zelle, and Apple Pay once the job is finished."
    }
  ],

  // ---------------------------------------------------------------------------
  // 7. FORM SUBMISSION (FORMSUBMIT.CO WITH 100% FREE PHOTO ATTACHMENTS)
  // ---------------------------------------------------------------------------
  form: {
    service: "formsubmit",
    // Put the destination email address where you want to receive quotes and photos:
    destinationEmail: "ca606fed5293c6697a97b74df5efc509",
    notificationSubject: "New Junk Removal Quote Request - Rochester Hauling Brothers"
  }
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
