const express = require('express');
const router = express.Router();

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;

router.post('/', async (req, res) => {
  try {
    const { base64, mediaType } = req.body;
    if (!base64) return res.status(400).json({ error: 'No image provided' });

    if (!CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'AI service not configured' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        system: 'Analyze the food in the image. Respond ONLY with JSON: {"name":"...","benefits":[...],"cookingTip":"..."}',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'Analyze this food photo.' },
            { type: 'image', source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: base64 } }
          ]
        }]
      })
    });
    const data = await response.json();
    const rawText = (data.content || []).map(b => b.text || '').join('').trim();
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    res.json(parsed);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

module.exports = router;