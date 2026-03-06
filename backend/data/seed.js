require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/userModel');
const usersData = require('./users');

const seedUsers = async () => {
    try {
        await connectDB();
        
        const count = await User.countDocuments();
        
        if (count === 0) {
            const formattedUsers = usersData.map(({ id, ...rest }) => rest);
            
            await User.insertMany(formattedUsers);
            console.log(`Succès : ${formattedUsers.length} utilisateurs de test insérés !`);
        } else {
            console.log('Info : La collection contient déjà des données. Aucun import effectué.');
        }
        
        await mongoose.connection.close();
        console.log('Connexion MongoDB fermée.');
    } catch (err) {
        console.error(`Erreur d'import : ${err.message}`);
        process.exit(1);
    }
};

seedUsers();