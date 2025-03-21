const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
// Connexion à la base de données
connectDB();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);

// Démarrage du serveur
const port = 4000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
