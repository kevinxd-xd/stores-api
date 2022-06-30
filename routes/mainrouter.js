const express = require('express')
const router = express.Router()

//Other routers
const ShopifyAPIRouter = require('./shopifyapi')
const UniqloAPIRouter = require('./uniqloapi.js')

router.use('/shopify', ShopifyAPIRouter);
router.use('/uniqlo', UniqloAPIRouter);

module.exports = router;