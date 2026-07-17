export const emojiMap: Record<string, string> = {
  Relaxed: "🛌",
  Balanced: "🚶‍♂️",
  Busy: "🏃‍♀️",
  Culinary: "🍽️",
  Shopping: "🛍️",
  Nature: "🏞️",
  History: "🏛️",
  Economy: "💸",
  "Mid-range": "💵",
  Luxury: "💎",
  Solo: "🧍",
  Couple: "👫",
  Family: "👨‍👩‍👧‍👦",
  "3 Days": "📅",
  "5 Days": "🗓️",
  "7 Days": "📆",
  Jakarta: "🌇",
  Surabaya: "🌆",
  Bandung: "🌄",
  Medan: "🏙️",
  Makassar: "🌊",
};

export const budgets = ["Economy", "Mid-range", "Luxury"] as const;
export const travelTypes = ["Solo", "Couple", "Family"] as const;
export const durations = ["3 Days", "5 Days", "7 Days"] as const;
export const activityLevels = ["Relaxed", "Balanced", "Busy"] as const;
export const interests = ["Culinary", "Shopping", "Nature", "History"] as const;
export const cities = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  "Makassar",
] as const;

export type Budget = (typeof budgets)[number];
export type TravelType = (typeof travelTypes)[number];
export type Duration = (typeof durations)[number];
export type ActivityLevel = (typeof activityLevels)[number];
export type Interest = (typeof interests)[number];
export type City = (typeof cities)[number];

export interface Field {
  name: keyof TripFormInitial;
  label: string;
  options: readonly string[];
}

export const fields: Field[] = [
  {
    name: "departure",
    label: "Where are you departing from?",
    options: cities,
  },
  { name: "destination", label: "What's your destination?", options: cities },
  {
    name: "duration",
    label: "Almost done — how long do you want to travel?",
    options: durations,
  },
  {
    name: "travelType",
    label: "Who are you traveling with?",
    options: travelTypes,
  },
  {
    name: "budget",
    label: "Almost there — choose your budget",
    options: budgets,
  },
  {
    name: "interest",
    label: "What are you most interested in?",
    options: interests,
  },
  {
    name: "activityLevel",
    label: "Finally, choose your preferred activity level",
    options: activityLevels,
  },
];

// 🔷 Initial form state
export interface TripFormInitial {
  departure: City | "";
  destination: City | "";
  duration: Duration | "";
  travelType: TravelType | "";
  budget: Budget | "";
  interest: Interest | "";
  activityLevel: ActivityLevel | "";
}

export const tripFormInitial: TripFormInitial = {
  departure: "",
  destination: "",
  duration: "",
  travelType: "",
  budget: "",
  interest: "",
  activityLevel: "",
};
