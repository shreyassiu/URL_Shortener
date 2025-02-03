const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const Url = require('../models/Url');

// Create short URL
router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    
    try {
        // Check if the URL already exists
        let url = await Url.findOne({ longUrl });
        
        if (url) {
            return res.json(url);
        }

        // Create URL code
        const urlCode = shortid.generate();
        // Use request object to construct the URL dynamically
        const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;

        // Create new URL
        url = new Url({
            urlCode,
            longUrl,
            shortUrl,
            createdAt: new Date()
        });

        await url.save();
        res.json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// Redirect to long URL
router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });
        
        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('URL not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

module.exports = router; 