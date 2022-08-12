require('dotenv').config( {path: './.env'} )
const express = require('express')
const db = require('../db/index');
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/**
 * This method will check if the user session is authenticated
 */
async function isAuthenticated(req, res, next) {
    if (req.session.access_token && req.session.token_type) {
        // Continue in the route that called this middleware
        next();
    }
    else {
        //Move on to the next route, exiting out of the current route
        next('route');
    }
};

/**
 * This route calls the middleware to check if there is a user in this session
 */
router.get('/', isAuthenticated, async (req, res) => {
    res.end(`You are logged in! Welcome back ${req.session.user.username}!`);
});

router.get('/', async (req, res) => {
    req.session.save(async (err) => {
        if (err) {
            return next(err);
        }
        else {
            res.redirect(process.env.DISCORD_OAUTH2);
        }
    })
});

router.get('/verify', async (req, res) => {
    try {
        // Fetch Access Token
        const accessCredentials = await postCodeDiscord(req);
        req.session.access_token = accessCredentials.user.access_token;
        req.session.token_type = accessCredentials.user.token_type;
        // Fetch user info with access token that we recived
        const user = await getDiscordUserInfo(accessCredentials);
        await addUserDB(user);
        req.session.user = {
            id: user.data.id,
            username: user.data.username
        };

        // Check against our database for user
        req.session.save(async (err) => {
            if (err) {
                return next(err);
            }
            else {
                res.redirect("/api/login");
            }
        });
    }
    catch (err) {
        console.log(err.stack);
    }
});

/**
 * This method will make POST to discord with the code in exchange for a token type and access token
 * @param {request} req request object received from express router
 * @returns 
 */
async function postCodeDiscord(req) {
    try {
        const tokenResponseData = await fetch('https://discord.com/api/oauth2/token', {
            method: 'post',
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: `${req.query.code}`,
                grant_type: 'authorization_code',
                redirect_uri: `${req.protocol}://${req.get('host')}/api/login/verify`,
                scope: 'identify',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    
        const oauthData =  {
            user: await tokenResponseData.json(),
            status: tokenResponseData.status
        };
        
        return oauthData;
    }
    catch (err) {
        console.log(err.stack);
    }

}

/**
 * This method will request user info from the Discord API with the access token
 * @param {JSON} oauthData - a json with access token type and the access token itself
 * @returns info about discord user
 */
async function getDiscordUserInfo(oauthData) {
    try {
        const userData = await fetch('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${oauthData.user.token_type} ${oauthData.user.access_token}`,
            },
        });

        const userInfo = {
            data: await userData.json(),
            status: userData.status
        };

        return userInfo;
    }
    catch (err) {
        console.log(err.stack);
    }
}

/**
 * This method will add a user into the database to track after they login
 */
async function addUserDB(userData) {
    try {
        const command = `INSERT INTO users (username, discriminator, discord_id, permission) VALUES ($1, $2, $3, true)`;
        const values = [userData.data.username, userData.data.discriminator, userData.data.id];
        await db.connect.query(command, values);
    }
    catch (err) {
        console.log(err.stack);
    }
}

module.exports = router;