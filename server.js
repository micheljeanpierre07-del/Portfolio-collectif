// server.js
// Serveur d'application Node.js / Express
// Rôles :
//   1) Servir le build de production généré par Vite (dossier "dist")
//   2) Exposer la route API POST /api/contact (réception + validation + persistance JSON)

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

app.use(express.json());

// --- Middleware statique : sert le build de production Vite ---
app.use(express.static(path.join(__dirname, 'dist')));

// --- Utilitaires de persistance ---
function readMessages() {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) return [];
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Erreur de lecture de messages.json :', err);
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Route API : réception du formulaire de contact ---
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};

  // Validation de la présence des champs
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Les champs "name", "email" et "message" sont obligatoires.',
    });
  }

  // Validation du format de l'e-mail
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "Le format de l'adresse e-mail est invalide.",
    });
  }

  const newEntry = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };

  const messages = readMessages();
  messages.push(newEntry);
  writeMessages(messages);

  return res.status(201).json({
    success: true,
    message: 'Message reçu avec succès. Merci de nous avoir contactés !',
    data: newEntry,
  });
});

// (Optionnel — utile en développement) Lister les messages reçus
app.get('/api/contact', (req, res) => {
  res.json(readMessages());
});

// --- Fallback SPA : toute autre route renvoie index.html (React Router prend le relais) ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
