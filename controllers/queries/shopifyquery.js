const db = require('../../db/index.js')

module.exports = {
    /**
     * READ
     * Gets the entry matching the link provided
     * @param {string} link - pass in a link and will return the shopifyprod that matches that link
     */
    async getShopEntry(link) {
        try {
            const command = `SELECT * FROM product_shopify WHERE url= $1;`;
            const values = [link];
            const res = await db.connect.query(command,values);
            if (res.rowCount < 1) {
                console.log("No entry was found...");
                return null;
            }
            else {
                console.log("Successfully found at least 1 entry!");
                return res.rows[0];
            }
        }
        catch (err) {
            console.log("An error occured! No entry was found...");
        }
    },

    /**
     * CREATE
     * This method inserts a shopifyprod object into the database
     * @param {shopifyprod} prod - a shopifyprod object with all the necessary fields
     */
    async insertShopEntry(prod) {
        try {
            const command = `INSERT INTO product_shopify (url, vars, subnames, picurl, prodname) VALUES ($1, $2, $3, $4, $5);`
            const values = [prod.URL, prod.vars, prod.subnames, prod.picurl, prod.prodname];
            const res = await db.connect.query(command, values);
            console.log("Successfully inserted entry!");
            return 200;
        }
        catch (err) {
            if (err.code == "23505") {
                console.log("Duplicate entry was found! Insert failed...");
            }
            else {
                console.log(err.stack);
            }
        }
    },

    /**
     * UPDATE
     * This method updates a shopifyprod object that already exists in the database
     * @param {shopifyprod} prod - a shopifyprod object with all the necessary fields
     */
    async updateShopEntry(prod) {
        try {
            const command = `UPDATE product_shopify SET url = $1, vars = $2, subnames = $3, picurl = $4, prodname = $5 WHERE url = $1 RETURNING prodname;`
            const values = [prod.URL, prod.vars, prod.subnames, prod.picurl, prod.prodname];
            console.log("Attempting to update entry");
            const resp = await db.connect.query(command, values);
            
            if (resp.rowCount < 1) {
                console.log("Update failed...");
                return null;
            }
            else { 
                console.log("Succesfully updated entry!");
                return 200;
            }
        }
        catch (err) {
            console.log("An error occured, update failed...");
            console.log(err.stack);
        }
    },

    /**
     * DELETE
     * This method will delete the corresponding row that has the same link
     * @param {string} link - pass in a link and will delete the entry that matches that link
     */
    async deleteShopEntry(link) {
        try {
            console.log("Attempting to delete entry...");
            const command = `DELETE FROM product_shopify WHERE url= $1`;
            const values = [link];
            const resp = await db.connect.query(command, values);
            console.log("Succesfully deleted entry!");
            return 200;
        }
        catch (err) {
            console.log("An error occured, delete failed...");
            console.log(err.stack);
        }
    }
}