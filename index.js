/**
 * Picoo Pinger - Part of the Antavion Ecosystem
 * Keeps Render services alive 24/7 using Cloudflare Workers.
 */

export default {
  // 1. Apne URLs yahan dalo
  urlsToPing: [
    "https://music-5vhr.onrender.com", 
    // "https://another-app.onrender.com", 
  ],

  // Automated Cron Trigger logic
  async scheduled(event, env, ctx) {
    ctx.waitUntil(this.handlePings());
  },

  // Manual Trigger & Status Dashboard
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);

    if (pathname === "/ping") {
      const results = await this.handlePings();
      return new Response(`🚀 Pulse Sent!\n\n${results.join("\n")}`, { 
        status: 200,
        headers: { "Content-Type": "text/plain" }
      });
    }

    const statusHtml = `
      <html>
        <body style="font-family: sans-serif; background: #0f0f12; color: #e0e0e0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0;">
          <h1 style="color: #ff80ab;">🛸 Picoo Pinger</h1>
          <p>Status: <span style="color: #00e676;">Operational</span></p>
          <div style="background: #1c1c21; padding: 20px; border-radius: 12px; border: 1px solid #333;">
            <strong>Monitoring:</strong><br>
            ${this.urlsToPing.map(u => `<div style="margin-top: 8px; font-size: 0.9em;">🔗 ${u}</div>`).join('')}
          </div>
          <a href="/ping" style="margin-top: 20px; padding: 10px 20px; background: #ff80ab; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">Manual Force Ping</a>
          <p style="margin-top: 30px; font-size: 0.8em; color: #666;">Part of Antavion Ecosystem</p>
        </body>
      </html>
    `;

    return new Response(statusHtml, {
      status: 200,
      headers: { "Content-Type": "text/html" }
    });
  },

  async handlePings() {
    const results = await Promise.all(
      this.urlsToPing.map(async (url) => {
        try {
          const res = await fetch(url, { headers: { "User-Agent": "Picoo-Pinger/1.0" } });
          return `✅ ${url} -> ${res.status}`;
        } catch (err) {
          return `❌ ${url} -> Failed: ${err.message}`;
        }
      })
    );
    return results;
  }
};
