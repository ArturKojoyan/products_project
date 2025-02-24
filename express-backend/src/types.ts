export type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  dob?: Date;
  photo?: string;
  createdAt?: any;
};

export type Product = {
  name: string;
  price: number;
  discount_price?: number;
  photo?: string;
  description: string;
  userId: number;
};
