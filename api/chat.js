// api/chat.js
// Vercel Serverless Function — powers the website chat widget using the Anthropic Claude API.
//
// SETUP:
// 1. Get an API key from https://console.anthropic.com/
// 2. In Vercel Dashboard -> your project -> Settings -> Environment Variables,
//    add: ANTHROPIC_API_KEY = sk-ant-xxxxxxxx
// 3. Redeploy. This function will then be live at: https://<your-domain>/api/chat

const SYSTEM_PROMPT = `You are IntelliVora AI Assistant, the website chat assistant for Intellivora AI.

You ONLY know the public information about this company shown below. You do not have access to
any private accounts, backend systems, or confidential data. If asked about private/hidden data,
politely say you only know public website information.

Company info:
- Intellivora AI builds website chatbots, business automations, workflow integrations, and
  aerospace/drone services.
- Services: website chat systems, WhatsApp assistants, appointment booking, support/FAQ
  workflows, lead capture, CRM automation, invoicing automation, aerospace/drone mission support
  (drone navigation, coordinated UAV systems, satellite image analysis, predictive maintenance,
  aerospace digital twins).
- Pricing:
  • Starter Automation — $499/mo: website chatbot, basic email/CRM automation, WhatsApp integration.
  • Pro Business Automation — $1,499/mo: omni-channel bots, complex workflows, AI receptionist, auto invoicing.
  • Enterprise & Aerospace Custom — Custom quote: custom AI agents, digital twins, drone systems,
    mission-grade integrations.
- Contact: book a consultation via the contact section, or email intellivoraai@gmail.com.

Keep replies concise (2-5 sentences), friendly, and helpful. If a question is unrelated to
Intellivora AI's services, politely redirect back to what you can help with.`;

module.exports = async function handler(req, res) {
  // CORS (safe defaults — restrict origin if you want to lock this down to your own domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Missing "message" in request body.' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Server misconfigured: ANTHROPIC_API_KEY is not set in environment variables.'
      });
    }

    // history: optional array of {role: 'user'|'assistant', content: string} for multi-turn context
    const messages = Array.isArray(history)
      ? history
          .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .slice(-10) // keep last 10 turns max, to control token usage
      : [];

    messages.push({ role: 'user', content: message.trim() });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'Upstream AI service error.' });
    }

    const data = await response.json();
    const reply = (data.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim();

    return res.status(200).json({ reply: reply || "Sorry, I couldn't generate a response. Please try again." });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
