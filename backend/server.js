require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});