import { ResultSetHeader } from "mysql2";

export default interface Product extends ResultSetHeader {
  name: string;
  price: number;
  discount_price: number;
  description: string;
  photo: string;
}
