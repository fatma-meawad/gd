const { Pool } = require("pg");
const path = require("path");
require("dotenv-flow").config({ path: path.resolve(__dirname) });

console.log(process.env.NODE_ENV);
console.log(process.env.POSTGRES_DB_TEST);

const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const user =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_USER_TEST
    : process.env.POSTGRES_USER;

const password =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_PASSWORD_TEST
    : process.env.POSTGRES_PASSWORD;

const connectionString = `postgresql://${user}:${password}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
console.log(connectionString);
const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
