import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface Payload extends JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function generateAccessToken(payload: Payload | any) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "30m", // 30 min
  });
}

export function generateRefreshToken(payload: Payload | any) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string);
}

export function setAccessTokenInCookie(res: Response, token: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only set cookies over HTTPS in production
    maxAge: 1800000, // (30 min)
    sameSite: "strict" as const, // prevents the browser from sending cookies on cross-origin requests
  };

  res.cookie("access_token", token, cookieOptions);
}

export function setRefreshTokenInCookie(res: Response, token: string) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set as secure in production
    maxAge: 604800000, // 7 days
    sameSite: "strict" as const,
  };

  res.cookie("refresh_token", token, cookieOptions);
}
