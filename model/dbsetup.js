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

    await db.connect.query(`CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);
      
      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
      
      CREATE INDEX "IDX_session_expire" ON "session" ("expire")
    ;`);

    await db.connect.query(
        `CREATE TABLE users(
            id              serial,
            username        text,
            discriminator   integer,
            discord_id      text
    );`);
    process.exit(0);
}

setup();

