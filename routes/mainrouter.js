const express = require('express')
const router = express.Router()

//Other routers
const ShopifyAPIRouter = require('./shopifyapi.js')
const UniqloAPIRouter = require('./uniqloapi.js')
const AuthAPIRouter = require('./auth.js')
const AuthCheck = require('../controllers/queries/permissionquery.js')

router.use('/login', AuthAPIRouter);
// Auth check added here so it does not affect login endpoint
router.use(AuthCheck);
router.use('/shopify', ShopifyAPIRouter);
router.use('/uniqlo', UniqloAPIRouter);

module.exports = router;