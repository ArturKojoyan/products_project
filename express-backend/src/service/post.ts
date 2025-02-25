import { pool } from "../db";

export async function getAllPosts() {
  try {
    const [data] = await pool.query("SELECT * FROM posts;");
    return data;
  } catch (err) {
    console.log(err, "error in getAllPosts");
  }
}

export default { getAllPosts };
