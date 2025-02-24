import { pool } from "../db";

export async function getAllPosts() {
  try {
    const [data] = await pool.query("SELECT * FROM posts;");
    console.log("🚀 ~ getAllPosts ~ data:", data);
    return data;
  } catch (err) {
    console.log(err, "error in getAllPosts");
  }
}

export default { getAllPosts };
