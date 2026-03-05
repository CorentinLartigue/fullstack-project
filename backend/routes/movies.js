const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function readMovies() {
    const filePath = path.join(__dirname, '../data/movies.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// GET /api/movies
router.get('/', (req, res) => {
    try {
        const movies = readMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({error: 'Impossible de lire movies.json'});
    }
});

// GET /api/movies/:id
router.get('/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        const movies = readMovies();
        const movie = movies.find((m) => m.id === id);

        if (!movie) {
            return res.status(404).json({error: 'Movie not found'});
        }

        res.json(movie);
    } catch (error) {
        res.status(500).json({error: 'Erreur serveur'});
    }
});

module.exports = router;
