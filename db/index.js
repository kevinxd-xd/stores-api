require('dotenv').config( {path: '../.env'} )
const { Pool } = require('pg')

const pool = new Pool()

module.exports = {
    connect: pool
}
