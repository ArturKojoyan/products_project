import { ResultSetHeader } from "mysql2";

export default interface User extends ResultSetHeader {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dob: Date;
  photo: string;
  createdAt?: any;
} 
