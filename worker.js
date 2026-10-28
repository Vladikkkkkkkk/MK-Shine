function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoint for form submissions
    if (url.pathname === '/api/send') {
      if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders });
      }

      if (request.method === 'POST') {
        try {
          const data = await request.json();
          const { name, email, phone, service, message } = data;

          if (!name || !phone) {
            return new Response(
              JSON.stringify({ error: 'Name and phone are required' }),
              { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
          }

          const botToken = env.TELEGRAM_BOT_TOKEN;
          const chatId = env.TELEGRAM_CHAT_ID;

          if (!botToken || !chatId) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment secrets');
            return new Response(
              JSON.stringify({ 
                error: 'Missing Cloudflare secrets (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID)' 
              }),
              { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
          }

          const safeName = escapeHtml(name);
          const safeEmail = escapeHtml(email || 'Not provided');
          const safePhone = escapeHtml(phone);
          const safeService = escapeHtml(service || 'Not selected');
          const safeMessage = escapeHtml(message || 'No message provided');

          // Message template for Telegram
          const text = `
🔥 <b>New Lead from MK Shine!</b>

👤 <b>Name:</b> ${safeName}
📧 <b>Email:</b> ${safeEmail}
📞 <b>Phone:</b> ${safePhone}
🧽 <b>Service:</b> ${safeService}
💬 <b>Message:</b> ${safeMessage}
          `.trim();

          const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
          const tgResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: text,
              parse_mode: 'HTML'
            })
          });

          if (!tgResponse.ok) {
            const errText = await tgResponse.text();
            console.error('Telegram API error:', errText);
            return new Response(
              JSON.stringify({ 
                error: `Telegram API error (${tgResponse.status})` 
              }),
              { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
            );
          }

          return new Response(
            JSON.stringify({ success: true }),
            { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        } catch (err) {
          return new Response(
            JSON.stringify({ error: 'Invalid request' }),
            { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
          );
        }
      }

      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }

    // Block direct access to server configuration and worker source code
    if (
      url.pathname === '/worker.js' ||
      url.pathname === '/_worker.js' ||
      url.pathname.startsWith('/wrangler') ||
      url.pathname.startsWith('/.')
    ) {
      return new Response('Not Found', { status: 404 });
    }

    // Serve static site assets (HTML, CSS, JS, media)
    return env.ASSETS.fetch(request);
  }
};
