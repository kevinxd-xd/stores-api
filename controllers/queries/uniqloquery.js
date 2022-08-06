const db = require('../../db/index.js')
const UniqloProduct = require('../../model/uniqloprod');

module.exports = {
    /**
     * Gets the entry matching the PID provided from Uniqlo
     * @param {string} link - pass in a pid and will return the uniqloprod that matches that PID
     */
    async getUniqloEntry(PID) {
        try {
            const res = await db.connect.query(`SELECT * FROM product_uniqlo WHERE pid='${PID}';`);
            if (res.rowCount < 1) {
                return "No entries found";
            }
            else {
                const uniqloEntry = res.rows[0];
                return new UniqloProduct(uniqloEntry.pid, uniqloEntry.url, uniqloEntry.salestatus, uniqloEntry.sizes, uniqloEntry.stockLevel, uniqloEntry.pic);
            }
        }
        catch (err) {
            console.log(err.stack);
        }
    },

    /**
     * This method inserts a uniqloprod object into the database
     * @param {uniqloprod} prod - uniqloprod object that contains all of the info needed to insert into the database
     */
    async insertUniqloEntry(prod) {
        try {
            const command = `INSERT into product_uniqlo (pid, url, salestatus, sizes, stocklevel, pic) VALUES ($1, $2, $3, $4, $5, $6);`
            const values = [prod.pid, prod.url, prod.salestatus, prod.sizes, prod.stockLevel, prod.pic];
            const res = db.connect.query(command, values);
            console.log("Successfully inserted entry!");
        }
        catch (err) {
            console.log(err.stack)
        }
    },
}