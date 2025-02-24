import { ResultSetHeader } from "mysql2";
import User from "../models/user.model";
import { User as UserType } from "../types";
import { pool } from "../db";

interface IUserRepository {
  createUser(user: UserType): Promise<User>;
  getUserById(userId: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User>;
  update(userId: number, user: User): Promise<number>;
}

class UserRepository implements IUserRepository {
  async createUser(user: UserType): Promise<User> {
    const { email, password } = user;
    try {
      const [data] = await pool.query<User>(
        `INSERT INTO users (email, password)
          VALUES (?,?);`,
        [email, password]
      );
      console.log(data, "result");
      const userId = data.insertId;
      return await this.getUserById(userId);
    } catch (err) {
      throw err;
    }
  }

  async getUserById(userId: number): Promise<User> {
    console.log("🚀 ~ UserRepository ~ getUserById ~ userId:", userId);
    try {
      const [rows] = await pool.query<[User]>(
        `SELECT * FROM users WHERE id = ?;`,
        [userId]
      );
      console.log(rows, "found user");
      return { ...rows[0], password: "" };
    } catch (err) {
      console.log(err, "Error in findUserById service");
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const [rows] = await pool.query<[User]>(
        `SELECT * FROM users WHERE email = ?;`,
        [email.toLowerCase()] // first lowercase the email then search
      );
      console.log(rows, "found user");
      return rows[0];
    } catch (err) {
      console.log(err, "Error in findUserByEmail service");
      throw err;
    }
  }

  async update(userId: number, user: Partial<UserType>): Promise<User | any> {
    console.log("🚀 ~ UserRepository ~ update ~ user:", user);
    try {
      const [rows] = await pool.query<ResultSetHeader>(
        "UPDATE users SET firstName = ?, lastName = ?, email = ?, dob = ? WHERE id = ?",
        [user.firstName, user.lastName, user.email, user.dob, userId]
      );
      console.log("🚀 ~ UserRepository ~ update ~ rows:", rows);

      // Check if the update was successful
      if (rows.affectedRows > 0) {
        // Fetch the updated user data
        const user = await this.getUserById(userId);
        console.log("🚀 ~ UserRepository ~ update ~ user:", user);
        return user;
      } else {
        console.error("Update failed or no rows affected");
      }

      return rows;
    } catch (err) {
      console.log("🚀 ~ UserRepository ~ update ~ err:", err);
      throw err;
    }
  }
}

export default new UserRepository();
