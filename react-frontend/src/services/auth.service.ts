import api from "../http";
import axios, { AxiosResponse } from "axios";

interface AuthResponse {
  message: string;
  accessToken: string;
}

export async function login(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return api.post("/auth/login", { email, password });
}

export async function registration(
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> {
  return api.post("/auth/register", { email, password });
}

export async function logout(): Promise<void> {
  return api.post("/auth/logout");
}

export async function checkAuth(): Promise<AxiosResponse<AuthResponse>> {
  return axios.post(
    "auth/verifyToken",
    {},
    {
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    }
  );
}
