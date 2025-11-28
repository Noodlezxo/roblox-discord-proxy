// index.js - Migrated Discord Proxy (Post-Glitch)
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json({ strict: false }));

app.post('/webhooks/:id/:token', async (req, res) => {
  try {
    const { id, token } = req.params;
    const response = await fetch(`https://discord.com/api/webhooks/${id}/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy live on port ${port} (Glitch migrant)`);
});
