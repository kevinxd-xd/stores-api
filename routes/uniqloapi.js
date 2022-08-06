const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/requests/uniqlorequest.js')

// Routes
router.use('', async (req, res) => {
    const pid = req.query.pid;
    const getData = await request.getUniqlo(pid);
    if (getData != null) {
        res.status(200).send(getData);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router;