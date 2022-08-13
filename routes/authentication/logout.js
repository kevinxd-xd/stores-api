const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    // Sets the account details to null
    req.session.access_token = null;
    req.session.token_type = null;
    
    req.session.save(async (err) => {
        if (err) next(err)
        req.session.regenerate((err) => {
            if (err) next(err)
            res.redirect('/');
        })
    })

});

module.exports = router;