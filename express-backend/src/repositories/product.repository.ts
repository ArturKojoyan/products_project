import { pool } from "../db";
import Product from "../models/product.model";
import { Product as ProductType } from "../types";

interface IProductRepository {
  createProduct(product: ProductType): Promise<Product>;
  getProductById(productId: number): Promise<Product>;
  getAllProducts(): Promise<Array<Product>>;
  // update(productId: number, product: ProductType): Promise<number>;
}

class ProductRepository implements IProductRepository {
  async createProduct(product: ProductType): Promise<Product> {
    const { name, price, discount_price, description, userId } = product;
    try {
      const [data] = await pool.query<Product>(
        `INSERT INTO products (name, price, discount_price, description, user_id)
            VALUES (?,?,?,?,?);`,
        [name, price, discount_price, description, userId]
      );
      const productId = data.insertId;
      return await this.getProductById(productId);
    } catch (err) {
      console.log(err, "Error in createUser service");
      throw err;
    }
  }

  async getProductById(productId: number): Promise<Product> {
    try {
      const [rows] = await pool.query<[Product]>(
        `SELECT * FROM products WHERE id = ?;`,
        [productId]
      );
      return rows[0] ?? {};
    } catch (err) {
      console.log(err, "Error in getProductById service");
      throw err;
    }
  }

  async getAllProducts(): Promise<Array<Product>> {
    try {
      const [rows] = await pool.query<[Product]>("SELECT * FROM products;");
      return rows;
    } catch (err) {
      console.log(err, "Error in getAllProducts service");
      throw err;
    }
  }

  async getSpecificProducts(userId: string): Promise<Array<Product>> {
    try {
      const [rows] = await pool.query<[Product]>(
        `SELECT * FROM products WHERE user_id = ?;`,
        [userId]
      );
      return rows;
    } catch (err) {
      console.log(err, "Error in getSpecificProducts service");
      throw err;
    }
  }
}

export default new ProductRepository();
