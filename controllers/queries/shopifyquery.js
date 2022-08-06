const db = require('../../db/index.js')
const ShopifyProduct = require('../../model/shopifyprod');

module.exports = {
    /**
     * Gets the entry matching the link provided
     * @param {string} link - pass in a link and will return the shopifyprod that matches that link
     */
    async getShopEntry(link) {
        try {
            const res = await db.connect.query(`SELECT * FROM product_shopify WHERE url='${link}';`);
            if (res.rowCount < 1) {
                return "No entries found";
            }
            else {
                const shopEntry = res.rows[0];
                return new ShopifyProduct(shopEntry.url, shopEntry.vars, shopEntry.subnames, shopEntry.picurl, shopEntry.prodname);
            }
        }
        catch (err) {
            console.log(err.stack);
        }
    },

    /**
     * This method inserts a shopifyprod object into the database
     * @param {shopifyprod} prod - shopifyprod object that contains all of the info needed to insert into the database
     */
    async insertShopEntry(prod) {
        try {
            const command = `INSERT into product_shopify (url, vars, subnames, picurl, prodname) VALUES ($1, $2, $3, $4, $5);`
            const values = [prod.URL, prod.vars, prod.subnames, prod.pic, prod.prodName];
            const res = db.connect.query(command, values);
            console.log("Successfully inserted entry!");
        }
        catch (err) {
            console.log(err.stack);
        }
    },
}