const db = require('../../db/index.js')

module.exports = {
    /**
     * Gets the entry matching the PID provided from Uniqlo
     * @param {string} link - pass in a pid and will return the uniqloprod that matches that PID
     */
    async getUniqloEntry(PID) {
        db.connect.query(`SELECT * FROM product_uniqlo WHERE pid='${PID}';`, (err, res) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                console.log(res.rows[0]);
            }
        });
    },

    /**
     * This method inserts a uniqloprod object into the database
     * @param {uniqloprod} prod - uniqloprod object that contains all of the info needed to insert into the database
     */
    // INSERT into product_shopify (url, respsrc, vars, subnames, picurl, prodname) VALUES (${prod.URL}, ${prod.source}, ARRAY ${prod.vars}, ARRAY ${prod.subnames}, ${prod.pic}, ${prod.prodName}
    async insertUniqloEntry(prod) {
        const command = `INSERT into product_uniqlo (pid, url, salestatus, sizes, stocklevel, pic) VALUES ($1, $2, $3, $4, $5, $6);`
        const values = [prod.pid, prod.url, prod.salestatus, prod.sizes, prod.stockLevel, prod.pic];
        db.connect.query(command, values, (err, res) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                console.log(res);
                console.log(res.rows[0]);
            }
        });
    },
}