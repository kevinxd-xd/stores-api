const db = require('../../db/index.js')

const perms = async function checkUserPerms(req, res, next) {
    if (req.session.user) {
        const command = `SELECT * FROM users WHERE discord_id = $1;`;
        const value = [req.session.user.id];
        const response = await db.connect.query(command, value);
        if (response.rowCount < 1 || !response.rows[0].permission) {
            res.end("Permission denied");
        }
        else {
            return next();
        }
    }
    else {
        res.redirect('/api/login');
    }
}

module.exports = perms;