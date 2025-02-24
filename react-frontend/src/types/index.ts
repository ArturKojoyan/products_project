export type EmptyObject = Record<string, never>;

export type UserT = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  photo?: string;
};

export type ProductT = {
  id?: number;
  name: string;
  price: number;
  discount_price: number;
  description: string;
  photo?: string;
  user_id?: number;
};

export type ProductsT = Array<ProductT>;
