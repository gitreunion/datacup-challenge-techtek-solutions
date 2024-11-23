const express = require("express");
const ollama = require("ollama");

const router = express.Router();

router.post("/chat", async (req, res) => {
  const body = req.body; // Suppression du typage TypeScript, non nécessaire en JS.

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const response = await ollama.chat({
    model: process.env.OLLAMA_MODEL || "llama3",
    messages: [{ role: "user", content: body.message }],
    stream: true,
  });

  for await (const part of response) {
    res.write(part.message.content);
  }

  res.end();
});

module.exports = router;
