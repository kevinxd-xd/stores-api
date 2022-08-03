const db = require('../../db/index.js')

module.exports = {
    async getShopEntry(link) {
        db.connect.query(`SELECT 1 FROM shopifyprod WHERE url = ${link}`, (err, res) => {

        });
    },

    async insertShopEntry(link) {
        db.connect.query('INSERT ...', (err, res) => {
        
        });
    },

}