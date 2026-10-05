const express = require("express");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me";

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <meta name="viewport" content="width=device-width">
        <title>FuckGram</title>
      </head>
      <body style="background:#10131a;color:white;font-family:Arial;padding:30px">
        <h1>FuckGram</h1>
        <p>Server is running.</p>
        <p>Health: <a href="/api/health">/api/health</a></p>
      </body>
    </html>
  `);
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "FuckGram",
    version: "1.0.0"
  });
});

app.post("/api/admin/login", (req, res) => {
  if (req.body?.password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      ok: false,
      error: "Неверный пароль"
    });
  }

  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`FuckGram listening on port ${PORT}`);
});
