import express from 'express';

const app = express();
const port = 3010;

const API_KEY = '12345';

const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(403).json({ error: 'Clé API manquante' });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Clé API invalide' });
  }

  next();
};

app.get('/api/private-data', apiKeyMiddleware, (req, res) => {
  res.json({ message: 'Voici des données privées!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
