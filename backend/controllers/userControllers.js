const User = require('../models/User');

// 🔹 Récupérer tous les utilisateurs depuis MongoDB
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Erreur serveur', error });
  }
};

// 🔹 Récupérer un utilisateur par ID depuis MongoDB
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Erreur serveur', error });
  }
};

// 🔹 Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    res.json({ msg: 'Utilisateur mis à jour', updatedUser });
  } catch (error) {
    res.status(500).json({ msg: 'Erreur serveur', error });
  }
};

// 🔹 Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }
    res.json({ msg: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ msg: 'Erreur serveur', error });
  }
};
