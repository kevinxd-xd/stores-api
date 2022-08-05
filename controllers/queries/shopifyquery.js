const db = require('../../db/index.js')

module.exports = {
    /**
     * Gets the entry matching the link provided
     * @param {string} link - pass in a link and will return the shopifyprod that matches that link
     */
    async getShopEntry(link) {
        db.connect.query(`SELECT * FROM product_shopify WHERE url='${link}';`, (err, res) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                console.log(res.rows[0]);
            }
        });
    },

    /**
     * This method inserts a shopifyprod object into the database
     * @param {shopifyprod} prod - shopifyprod object that contains all of the info needed to insert into the database
     */
    // INSERT into product_shopify (url, respsrc, vars, subnames, picurl, prodname) VALUES (${prod.URL}, ${prod.source}, ARRAY ${prod.vars}, ARRAY ${prod.subnames}, ${prod.pic}, ${prod.prodName}
    async insertShopEntry(prod) {
        const command = `INSERT into product_shopify (url, vars, subnames, picurl, prodname) VALUES ($1, $2, $3, $4, $5);`
        const values = [prod.URL, prod.vars, prod.subnames, prod.pic, prod.prodName];
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