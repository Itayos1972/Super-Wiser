const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));   // מגיש את ה-HTML

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system, max_tokens } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: max_tokens || 1000,
      system: system,
      messages: messages,
    });
    res.json(response);
  } catch (error) {
    console.error("Claude Error:", error);
    res.status(500).json({ error: error.message });
  }
});
    const { model, messages, system, max_tokens } = req.body;

    const response = await anthropic.messages.create({
      model: model || "claude-3-5-haiku-20241022",   // מודל תקין וזול
      max_tokens: max_tokens || 1000,
      system: system,
      messages: messages,
    });

    res.json(response);
  } catch (error) {
    console.error("Claude Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Super Wiser רץ על פורט ${PORT}`);
});
