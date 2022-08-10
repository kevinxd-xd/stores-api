require('dotenv').config( {path: '../.env'} )
const db = require('../db/index')

async function setup() {
    // Create the shopify table
    await db.connect.query(
        `CREATE TABLE product_shopify(
            url         text,
            vars        text[],
            subnames    text[],
            picurl      text,
            prodname    text
    );`);

    // Create the uniqlo table
    await db.connect.query(
        `CREATE TABLE product_uniqlo(
            pid         text,
            url         text,
            salestatus  boolean,
            sizes       text[],
            stocklevel  text[],
            pic         text[]
    );`);

    process.exit(0);
}

setup();

