const express = require('express');
const router = express.Router();
const users = require('../data/users');

// GET /api/users
router.get('/', (req, res) => {
    try {
        const count = Array.isArray(users) ? users.length : 0;
        if (count === 0) return res.status(404).json({success: false, count, message: 'Aucun utilisateur existant'});
        res.status(200).json({success: true, count, data: users});
    } catch (err) {
        res.status(500).json({error: 'Erreur serveur'});
    }
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Erreur serveur'});
    }
});

router.post('/', (req, res) => {
    try {
        const {name, email, role} = req.body;
        if (!name || !email || !role) return res.status(400).json({success: false, message: 'Champs manquants'});
        const newUser = {
            id: users.length + 1,
            name,
            email,
            role,
            createdAt: new Date().toISOString().split('T')[0]
        };
        users.push(newUser);
        res.status(201).json({success: true, data: newUser});
    } catch (err) {
        res.status(500).json({error: 'Erreur serveur'});
    }
});

router.put('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
        
        const {name, email, role} = req.body;
        
        if (name !== undefined) users[userIndex].name = name;
        if (email !== undefined) users[userIndex].email = email;
        if (role !== undefined) users[userIndex].role = role;

        res.json({success: true, data: users[userIndex]});
    } catch (err) {
        res.status(500).json({error: 'Erreur serveur'});
    }
})

router.delete('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) return res.status(404).json({success: false, message: 'Utilisateur non trouvé'});
        const deletedUser = users.splice(userIndex, 1);
        res.status(204).json();
    } catch (err) {
        res.status(500).json({error: 'Erreur serveur'});
    }
})

module.exports = router;