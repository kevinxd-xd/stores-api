require('dotenv').config( {path: './.env'} )
const express = require('express')
const router = express.Router()

// Necessary Controllers
const query = require('../../controllers/queries/uniqloquery')
const request = require('../../controllers/requests/uniqlorequest')

// Routes
router.get('/get', async (req, res) => {
    const pid = req.query.pid;
    const getData = await query.getUniqloEntry(pid);
    if (getData != null) {
        res.status(200).send(getData);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

router.post('/add', async (req, res) => {
    const pid = req.query.pid;
    // Check if it already exists in db first
    const check = await query.getUniqloEntry(pid);
    if (check) {
        res.status(200).send(check);
    }
    else {
        const resp = await request.getUniqlo(pid);
        if (resp != null) {
            await query.insertUniqloEntry(resp);
            res.status(200).send(resp);
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
});

module.exports = router;