require('dotenv').config( {path: './.env'} )
const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/queries/uniqloquery')

// Routes
router.use('', async (req, res) => {
    const pid = req.query.pid;
    const getData = await request.getUniqloEntry(pid);
    if (getData != null) {
        res.status(200).send(getData);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router;