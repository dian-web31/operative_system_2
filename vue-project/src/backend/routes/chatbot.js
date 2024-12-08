// src/backend/routes/chatbot.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Cambiar la API_KEY y la URL según el proveedor
const API_KEY = 'TU_API_KEY';
const MODEL_URL = 'https://api.openai.com/v1/completions';

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      MODEL_URL,
      {
        model: 'text-davinci-003',
        prompt: message,
        max_tokens: 150,
      },
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener respuesta del modelo' });
  }
});

module.exports = router;
