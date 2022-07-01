const express = require('express')
const router = express.Router()

// Necessary Controllers
const request = require('../controllers/uniqlorequest.js')

// Routes
router.use('', async (req, res) => {
    const pid = req.query.pid;
    const getData = await request.getUniqlo(pid);
    res.send(getData);
});

module.exports = router;