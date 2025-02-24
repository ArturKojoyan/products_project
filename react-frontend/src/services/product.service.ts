import type { AxiosResponse } from "axios";
import api from "../http";
import { ProductT } from "../types";

export function createProduct(
  payload: ProductT
): Promise<AxiosResponse<ProductT>> {
  return api.post("/products", payload);
}

export function getAllProducts(
  userId?: number
): Promise<AxiosResponse<Array<ProductT>>> {
  return api.get(`/products${userId ? `?owner=${userId}` : ""}`);
}

export function getProductById(
  productId: string
): Promise<AxiosResponse<ProductT>> {
  return api.get(`/products/${productId}`);
}
