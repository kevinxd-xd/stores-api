const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/shopifyrequest.js')


// Routes
router.get('', async (req, res) => {
    const link = decodeURIComponent(req.query.url);
    const getData = await request.getSource(link);
    if (getData != null) {
        res.status(200).send(getData);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router;