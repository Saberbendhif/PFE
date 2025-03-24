const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userControllers');

// Route pour l'inscription
router.post('/signup', authController.signup);

// Route pour la connexion
router.post('/signin', authController.signin);

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
