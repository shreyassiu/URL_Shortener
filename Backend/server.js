const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/url'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 