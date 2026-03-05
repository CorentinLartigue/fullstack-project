const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 5000

app.use(cors())

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`)
})

function readMovies() {
    const filePath = path.join(__dirname, 'movies.json')
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/movies', (req, res) => {
    try {
        const movies = readMovies()
        res.json(movies)
    } catch (error) {
        res.status(500).json({ error: 'Impossible de lire movies.json' })
    }
})

app.get('/api/movies/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const movies = readMovies()
        const movie = movies.find((m) => m.id === id)

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' })
        }

        res.json(movie)
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' })
    }
})
