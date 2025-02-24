import type { Response } from "express";
import productRepository from "../repositories/product.repository";
import type { CustomRequest } from "../middlewares/checkAuth";

async function createProduct(req: CustomRequest, res: Response) {
  let { name, price, discount_price, description } = req.body;
  const { id: userId } = req.user;
  console.log("🚀 ~ createProduct ~ userId:", userId);

  if (!userId) {
    res.status(403).json({ message: "Not authorized!" });
    return;
  }

  if (!name || !price || !description) {
    res
      .status(400)
      .json({ message: "name, price and description fields are required!" });
    return;
  }
  if (discount_price) {
    discount_price = Number(discount_price);
  }

  try {
    const product = await productRepository.createProduct({
      name,
      price: Number(price),
      discount_price: discount_price,
      description,
      userId,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getProductById(req: CustomRequest, res: Response) {
  const { productId } = req.params;
  if (!productId) {
    res.status(400).json({ error: "productId is required!" });
  }
  try {
    const product = await productRepository.getProductById(+productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getAllProducts(req: CustomRequest, res: Response) {
  const { owner } = req.query;
  console.log("🚀 ~ getAllProducts ~ owner:", owner);
  let products;
  try {
    if (owner) {
      products = await productRepository.getSpecificProducts(String(owner));
    } else {
      products = await productRepository.getAllProducts();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export default {
  createProduct,
  getProductById,
  getAllProducts,
};
