import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '15mb' }));

  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Endpoint to enhance or refine custom video prompts with Gemini
  app.post('/api/gemini/generate-prompt', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY not configured. Falling back to built-in prompt architecture engine.',
        });
      }

      const { prompt, systemInstruction } = req.body;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            systemInstruction ||
            'You are an expert AI Director and Google Flow Prompt Architect for room renovation & space transformation time-lapse videos using Veo3.',
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err.message || 'Error generating prompt with Gemini' });
    }
  });

  // Endpoint for interactive Gemini AI Director chat / brainstorming
  app.post('/api/gemini/assistant', async (req, res) => {
    try {
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY not configured.',
        });
      }

      const { userMessage, currentConfig } = req.body;
      const promptText = `User Request: "${userMessage}"
Current Context: Room: ${currentConfig?.selectedRoom?.nameTh || 'ไม่ระบุ'}, Style: ${currentConfig?.selectedStyle?.nameTh || 'ไม่ระบุ'}, Condition: ${currentConfig?.selectedCondition?.titleTh || 'ไม่ระบุ'}.

Please provide expert director advice in Thai for creating a space makeover time-lapse on Google Flow / Veo3, adhering strictly to:
- Cozy Industrial-Japandi / polished micro-cement / light oak wood floor / large window with rice field view
- Continuity rule: ⚠️ Use last frame anchor at 10s
- Asian woman in earth-tone clothes
- ASMR audio cues
Keep your response inspiring, concise, and structured.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction:
            'You are an expert AI Director and Google Flow Prompt Architect specializing in interior transformation time-lapse videos. Reply warmly in Thai.',
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini Assistant Error:', err);
      res.status(500).json({ error: err.message || 'Error communicating with Gemini AI' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      model: 'gemini-3.8-flash',
    });
  });

  // Vite integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
