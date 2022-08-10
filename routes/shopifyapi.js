require('dotenv').config( {path: './.env'} )
const express = require('express')
const router = express.Router()

// Necessary Controllers
const query = require('../controllers/queries/shopifyquery')
const request = require('../controllers/requests/shopifyrequest')

// Routes
router.get('/get', async (req, res) => {
    const link = decodeURIComponent(req.query.url);
    const getData = await query.getShopEntry(link);
    if (getData != null) {
        res.status(200).send(getData);
    }
    else {
        res.status(400).send('Bad Request');
    }
});

router.post('/add', async (req, res) => {
    const link = decodeURIComponent(req.query.url);
    // Check if it already exists in db first
    const checkData = await query.getShopEntry(link);
    if (checkData) {
        res.status(200).send(checkData);
    }
    else {
        const resp = await request.getSource(link);
        if (resp != null) {
            //Insert into db
            await query.insertShopEntry(resp);
            res.status(200).send(resp);
        }
        else {
            res.status(400).send('Bad Request');
        }
    }
});

router.delete('/delete', async (req, res) => {
    // Will be implemented later
    res.send("Not available yet");
});

module.exports = router;