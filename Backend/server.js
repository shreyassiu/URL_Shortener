const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Serve static files from the dist folder
app.use(express.static(path.join(__dirname, '/dist')));

// API Routes
app.use('/api', require('./routes/url'));

// Handle all other routes by serving the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 