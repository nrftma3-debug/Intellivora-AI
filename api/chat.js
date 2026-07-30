// /api/chat.js
// Intellivora AI Chatbot - Vercel Serverless Function

export default async function handler(req, res) {

  // CORS settings
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required"
      });
    }


    const apiKey = process.env.ANTHROPIC_API_KEY;


    if (!apiKey) {
      return res.status(500).json({
        error: "Missing API Key"
      });
    }


    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },


        body: JSON.stringify({

          model: "claude-3-5-sonnet-20241022",

          max_tokens: 500,


          system: `
You are Intellivora AI's official assistant.

Rules:
- Always reply in English only.
- Be professional, friendly and helpful.
- Explain Intellivora AI services clearly.
- Help users with AI automation, chatbots, websites and business solutions.
- Keep answers concise.
- Do not use Urdu or any other language unless the user specifically requests it.
          `,


          messages: messages

        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      console.error(
        "Anthropic Error:",
        data
      );

      return res.status(500).json({
        error: "AI service error"
      });

    }


    const reply =
      data.content?.[0]?.text ||
      "Sorry, I could not generate a response.";


    return res.status(200).json({
      reply
    });


  } catch (error) {


    console.error(
      "Server Error:",
      error
    );


    return res.status(500).json({
      error: "Something went wrong"
    });

  }

}
