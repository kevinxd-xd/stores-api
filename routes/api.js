const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/request.js')


// Routes
router.get('/link/:url', async (req, res) => {
    const link = decodeURIComponent(req.params.url);
    const getData = await request.getSource(link);
    res.send(getData);
});

module.exports = router;