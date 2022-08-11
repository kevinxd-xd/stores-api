const express = require('express')
const cors = require('cors')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db/index.js')
const mainRouter = require('./routes/mainrouter.js');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

const sessSettings = {
    store: new pgSession ({ 
        pool: db.connect,
        tableName: 'session'
    }),
    name: 'Session_ID',
    secret: crypto.randomBytes(16).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie : {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: false,
        secure: false
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(session(sessSettings));

// Set up router to api file
app.use('/api', mainRouter);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
});