const db = require('../../db/index.js')

module.exports = {
    /**
     * READ
     * Gets the entry matching the PID provided from Uniqlo
     * @param {string} PID - pass in a pid and will return the uniqloprod that matches that PID
     */
    async getUniqloEntry(PID) {
        try {
            const res = await db.connect.query(`SELECT * FROM product_uniqlo WHERE pid='${PID}';`);
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
            return null;
        }
    },

    /**
     * CREATE
     * This method inserts a uniqloprod object into the database
     * @param {uniqloprod} prod - uniqloprod object that contains all of the info needed to insert into the database
     */
    async insertUniqloEntry(prod) {
        try {
            const command = `INSERT into product_uniqlo (pid, url, salestatus, sizes, stocklevel, pic) VALUES ($1, $2, $3, $4, $5, $6);`
            const values = [prod.pid, prod.url, prod.salestatus, prod.sizes, prod.stocklevel, prod.pic];
            const res = await db.connect.query(command, values);
            console.log("Successfully inserted entry!");
        }
        catch (err) {
            if (err.code == "23505") {
                console.log("Duplicate entry was found! Insert failed...");
                return null;
            }
            else {
                console.log(err.stack);
                return null;
            }
        }
    },

    /**
     * UPDATE
     * This method updates a matching uniqlo pid in the database
     * @param {uniqloprod} prod 
     * @returns status of the request - uniqloprod object that contains all of the info needed to insert into the database
     */
    async updateUniqloEntry(prod) {
        try {
            const command = `UPDATE product_uniqlo SET pid = $1, url = $2, salestatus = $3, sizes = $4, stocklevel = $5, pic = $6 WHERE pid = $1 RETURNING pid;`
            const values = [prod.pid, prod.url, prod.salestatus, prod.sizes, prod.stocklevel, prod.pic];
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
            return null;
        }
    },

    /**
     * DELETE
     * This method will delete the corresponding row that has the same pid
     * @param {string} pid - pass in a pid and will delete the entry that matches that pid
     */
     async deleteUniqloEntry(pid) {
        try {
            console.log("Attempting to delete entry...");
            const command = `DELETE FROM product_uniqlo WHERE pid= $1`;
            const values = [pid];
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