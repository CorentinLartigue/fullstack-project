const mongoose = require('mongoose');
const User = require('../models/userModel');

const userController = {
    // GET /api/users
    getAllUsers: async (req, res) => {
        try {
            const filter = {};
            if (req.query.role) {
                filter.role = req.query.role;
            }

            const users = await User.find(filter);
            const count = users.length;
            
            if (count === 0) {
                return res.status(404).json({
                    success: false, 
                    count, 
                    message: 'Aucun utilisateur existant'
                });
            }

            res.status(200).json({
                success: true, 
                count, 
                data: users
            });
        } catch (err) {
            res.status(500).json({ error: 'Erreur serveur', message: err.message });
        }
    },

    // GET /api/users/:id
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Format ID invalide' 
                });
            }

            const user = await User.findById(id);
            
            if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Utilisateur non trouvé' 
                });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Erreur serveur', message: err.message });
        }
    },

    // POST /api/users
    createUser: async (req, res) => {
        try {
            const { name, email, role } = req.body;
            
            if (!name || !email) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Champs name et email obligatoires' 
                });
            }
            
            const newUser = await User.create({ name, email, role });
            res.status(201).json({ success: true, data: newUser });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Email déjà utilisé' 
                });
            }
            res.status(500).json({ error: 'Erreur serveur', message: err.message });
        }
    },

    // PUT /api/users/:id
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Format ID invalide' 
                });
            }

            const { _id, createdAt, ...updateData } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true }
            );
            
            if (!updatedUser) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Utilisateur non trouvé' 
                });
            }

            res.json({ success: true, data: updatedUser });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(409).json({ 
                    success: false, 
                    message: 'Email déjà utilisé' 
                });
            }
            res.status(500).json({ error: 'Erreur serveur', message: err.message });
        }
    },

    // DELETE /api/users/:id
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Format ID invalide' 
                });
            }

            const deletedUser = await User.findByIdAndDelete(id);
            
            if (!deletedUser) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Utilisateur non trouvé' 
                });
            }

            res.status(204).json();
        } catch (err) {
            res.status(500).json({ error: 'Erreur serveur', message: err.message });
        }
    }
};

module.exports = userController;