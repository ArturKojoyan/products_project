import { pool } from "../db";

export async function getUsers() {
  try {
    const [data] = await pool.query("SELECT * FROM users;");
    return data;
  } catch (err) {
    console.log(err, "Error in getUsers service");
    throw err;
  }
}

export async function findUserById(id: number) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?;`, [id]);
    return rows;
  } catch (err) {
    console.log(err, "Error in findUserById service");
    throw err;
  }
}

export async function findUserByEmail(email: string) {
  try {
    const [data] = await pool.query(`SELECT * FROM users WHERE email = ?;`, [
      email,
    ]);
    return data;
  } catch (err) {
    console.log(err, "Error in findUserByEmail service");
  }
}

export async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  hashedPass: string,
  dob: string,
  photo: string
) {
  try {
    const [data] = await pool.query(
      `INSERT INTO users (email, firstName, lastName, password, dob, photo)
      VALUES (?,?,?,?,?,?);`,
      [email, firstName, lastName, hashedPass, dob, photo]
    );
    console.log(data, "result");
  } catch (err) {
    throw err;
  }
}

export async function updateUser(userId: number) {
  try {
    const [data] = await pool.query(
      `
      UPDATE users
      SET column1 = value1, column2 = value2, ...
      WHERE id = ?;
    `,
      [userId]
    );
  } catch (err) {
    console.log(err, "Error in updateUser service");
    throw err;
  }
}

export default { getUsers, createUser, updateUser, findUserById };
