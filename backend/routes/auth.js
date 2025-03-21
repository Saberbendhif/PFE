const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Route pour l'inscription
router.post('/signup', authController.signup);

// Route pour la connexion
router.post('/signin', authController.signin);

module.exports = router;
