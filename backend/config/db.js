require("dotenv").config();
const Sequelize = require("sequelize");
console.log("Environment Variables:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
});
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    port: process.env.DB_PORT,
    timestamps: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      defaultScope: {
        attributes: {
          //exclude: ["createdAt", "updatedAt"]
        },
      },
    },
  }
);

const db = {};

sequelize.authenticate()
  .then(() => {
    console.log("Connected");
  }).catch((err) => {
    console.log(err)
  })

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
