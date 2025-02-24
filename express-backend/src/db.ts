import mysql, { PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const pool = mysql.createPool(access);

// Call this function manually to add tables
async function createTables() {
  const query1 = `CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    dob date,
    photo VARCHAR(255),
    created TIMESTAMP DEFAULT now()
  );`;
  const query2 = `CREATE TABLE products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    discount_price INTEGER,
    photo VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    created TIMESTAMP DEFAULT now(),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`;

  await pool.query(query1);
  await pool.query(query2);
}

// Call this function manually to delete tables
async function dropTables() {
  const drop1 = `DROP TABLE products`;
  const drop2 = `DROP TABLE users`;

  await pool.query(drop1);
  await pool.query(drop2);
}

(async function migrate() {
  // await createTables();
  // await dropTables();
})();
