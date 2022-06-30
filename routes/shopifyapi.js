const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/shopifyrequest.js')


// Routes
router.get('', async (req, res) => {
    const link = decodeURIComponent(req.query.url);
    const getData = await request.getSource(link);
    res.send(getData);
});

module.exports = router;