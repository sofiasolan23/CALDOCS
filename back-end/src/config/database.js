// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;


const { Sequelize } = require('sequelize');
require('dotenv').config();

const pool = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false, // Opcional: desactiva el logging de SQL en la consola
});

module.exports = pool;


// const { Sequelize } = require("sequelize");
// const dotenv = require( 'dotenv');
// dotenv.config();

// const pool = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.HOST_DB,
//     dialect: process.env.DIALECT_DB,
//   }
// );

// module.exports = pool;