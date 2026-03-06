const userModel = require('../models/userModel');

const userController = {
    getAllUsers: (req, res) => {
        try {
            const users = userModel.getAll();
            const count = Array.isArray(users) ? users.length : 0;
            if (count === 0) return res.status(404).json({success: false, count, message: 'Aucun utilisateur existant'});
            res.status(200).json({success: true, count, data: users});
        } catch (err) {
            res.status(500).json({error: 'Erreur serveur'});
        }
    },

    getUserById: (req, res) => {
        try {
            const id = Number(req.params.id);
            const user = userModel.getById(id);
            if (!user) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
            res.json(user);
        } catch (err) {
            res.status(500).json({error: 'Erreur serveur'});
        }
    },

    createUser: (req, res) => {
        try {
            const {name, email, role} = req.body;
            if (!name || !email || !role) return res.status(400).json({success: false, message: 'Champs manquants'});
            const newUser = userModel.create({name, email, role});
            res.status(201).json({success: true, data: newUser});
        } catch (err) {
            res.status(500).json({error: 'Erreur serveur'});
        }
    },

    updateUser: (req, res) => {
        try {
            const id = Number(req.params.id);
            const {name, email, role} = req.body;
            const updatedUser = userModel.update(id, {name, email, role});
            if (!updatedUser) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
            res.json({success: true, data: updatedUser});
        } catch (err) {
            res.status(500).json({error: 'Erreur serveur'});
        }
    },

    deleteUser: (req, res) => {
        try {
            const id = Number(req.params.id);
            const deletedUser = userModel.remove(id);
            if (!deletedUser) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
            res.status(204).json();
        } catch (err) {
            res.status(500).json({error: 'Erreur serveur'});
        }
    }
};

module.exports = userController;