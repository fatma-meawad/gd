require("dotenv").config();
const { Pool } = require("pg");

const database = process.env.NODE_ENV === "test" ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: database,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // SSL for production only
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

