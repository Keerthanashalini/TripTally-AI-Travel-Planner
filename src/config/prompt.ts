export interface TripForm {
  departure: string;
  destination: string;
  duration: number;
  travelType: string;
  budget: string;
  interest: string;
  activityLevel: string;
}

export interface Template {
  instruction: string;
  parameters: {
    departure: string;
    destination: string;
    duration: string;
    travelType: string;
    budget: string;
    interest: string;
    activityLevel: string;
  };
  output_format: string;
}

export const generateTemplate = (tripForm: TripForm): Template => ({
  instruction: `
Create a ${tripForm.duration}-day travel itinerary that is well-structured, realistic, and enjoyable based on the following information.

The itinerary must include:
- A balanced daily schedule based on the user's activity level
- Tourist attractions, local food, and cultural experiences
- Estimated entrance fees (in local currency)
- Suitable transportation based on the budget and travel type
- Hotel recommendations based on the user's preferences
- Useful travel tips for the destination

Generate everything in clear and natural English.
`.trim(),

  parameters: {
    departure: tripForm.departure,
    destination: tripForm.destination,
    duration: `${tripForm.duration} days`,
    travelType: tripForm.travelType,
    budget: tripForm.budget,
    interest: tripForm.interest,
    activityLevel: tripForm.activityLevel,
  },

  output_format: `
Return ONLY valid JSON (no markdown, no explanation).

The JSON must contain:

- summary
- daily_plan
  - day
  - transportation
  - activities
    - time
    - location
    - activity
    - recomendations (array of nearby places or restaurants)
    - estimated_cost
    - notes (optional)

- hotel_recommendation(array of at least 3 hotels)
  - name
  - type
  - price_range
  - notes

- travel_tips (array of strings)

Generate every value in English only.
`.trim(),
});

export const generatePromptText = (template: Template): string => {
  return `
${template.instruction}

Parameters:
- Departure: ${template.parameters.departure}
- Destination: ${template.parameters.destination}
- Duration: ${template.parameters.duration}
- Travel Type: ${template.parameters.travelType}
- Budget: ${template.parameters.budget}
- Interest: ${template.parameters.interest}
- Activity Level: ${template.parameters.activityLevel}

Output Format:
${template.output_format}
`.trim();
};
