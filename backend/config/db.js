const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connecté: ${db.connection.host}`);
    } catch (err) {
        console.error(`Erreur: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;