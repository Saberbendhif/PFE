const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription (signup)
exports.signup = async (req, res) => {
  const { name, email,role, password, } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }

    // Créer un nouvel utilisateur
    user = new User({
      name,
      email,
      role,
      password,
    });

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder dans la base de données
    await user.save();
    res.status(201).json({ msg: 'Utilisateur créé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};

// Connexion (signin)
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Identifiants incorrects' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Identifiants incorrects' });
    }

    // Générer un token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      'secret_key', // Remplacez par une clé secrète sécurisée
      { expiresIn: '1h' }, // Le token expire après 1 heure
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};
