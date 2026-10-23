export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
    const GEMINI_API_KEY = "AQ.Ab8RN6Ken9dLZJ1J2af-_qNtnbiJ-NDsMWtXgK__Snuu2keHEQ";
    const body = await request.json();
    const riddle = body.riddle || "";
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: riddle }] }],
          generationConfig: { temperature: 0, maxOutputTokens: 50 },
        }),
      }
    );
    const data = await geminiRes.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\s+/g, "") || "";
    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  },
};
