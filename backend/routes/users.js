const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../data/users');

// GET /api/users
router.get('/', (req, res) => {
  try {
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;

