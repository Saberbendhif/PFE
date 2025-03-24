const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Charger les variables d'environnement

// Inscription (signup)
exports.signup = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utilisateur déjà existant' });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer et sauvegarder l'utilisateur
    user = new User({
      name,
      email,
      role,
      password: hashedPassword
    });
    await user.save();

    // Générer un token JWT avec l'ID et le rôle de l'utilisateur
    const payload = {
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ msg: 'Utilisateur créé avec succès', token });
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
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};
