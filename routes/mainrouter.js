const express = require('express')
const router = express.Router()

//Other routers
const ShopifyAPIRouter = require('./sites/shopifyapi.js')
const UniqloAPIRouter = require('./sites/uniqloapi.js')
const LoginAPIRouter = require('./authentication/auth.js')
const LogoutAPIRouter = require('./authentication/logout.js')
const AuthCheck = require('../controllers/queries/permissionquery.js')

router.use('/login', LoginAPIRouter);
// Uncomment the line below to enable auth check for these endpoints
// router.use(AuthCheck);
router.use('/shopify', ShopifyAPIRouter);
router.use('/uniqlo', UniqloAPIRouter);
router.use('/logout', LogoutAPIRouter);

module.exports = router;