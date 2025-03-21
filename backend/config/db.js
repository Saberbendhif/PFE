const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mon_projet', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1); // Arrête le programme en cas d'erreur
  }
};

module.exports = connectDB;