import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GROQ_API_KEY not found");
}

const groq = new Groq({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generateTrip(prompt: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 1,
  });

  return completion.choices[0]?.message?.content || "";
}
