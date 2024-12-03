const { Pool } = require("pg");
const path = require("path");
require("dotenv-flow").config({ path: path.resolve(__dirname) });

const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_PRODUCT_DB_TEST
    : process.env.POSTGRES_PRODUCT_DB;

const user =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_PRODUCT_USER_TEST
    : process.env.POSTGRES_PRODUCT_USER;

const password =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_PRODUCT_PASSWORD_TEST
    : process.env.POSTGRES_PRODUCT_PASSWORD;

const connectionString = `postgresql://${user}:${password}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
