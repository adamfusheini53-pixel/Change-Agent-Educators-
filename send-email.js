export default async function handler(req, res) {

  // ===== SECURE CORS (Production Only) =====
  res.setHeader("Access-Control-Allow-Origin", "https://change-agent-educators.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message)
    return res.status(400).json({ error: "Missing fields" });

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: "Invalid email format" });

  const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
  if (!SENDGRID_KEY)
    return res.status(500).json({ error: "Missing SendGrid key" });

  const payload = {
    personalizations: [{ to: [{ email: "adamfusheini53@gmail.com" }] }],
    from: { email },
    subject: subject || `Website contact from ${name}`,
    content: [
      {
        type: "text/html",
        value: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        `
      }
    ]
  };

  try {
    const r = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(500).json({ error: "SendGrid error", detail: txt });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}