import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepo from "../repositories/user.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  setAccessTokenInCookie,
  setRefreshTokenInCookie,
} from "../helpers";

let refreshTokens: string[] = [];

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      res
        .status(400)
        .json({ message: "Invalid credentials: user is not found!" });
      return;
    }
    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      res
        .status(400)
        .json({ message: "Invalid credentials: password is not correct!" });
      return;
    }
    const { password: _, ...payload } = user;
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    refreshTokens.push(refreshToken);

    setAccessTokenInCookie(res, accessToken);
    setRefreshTokenInCookie(res, refreshToken);

    res
      .status(200)
      .json({ message: "User successfully logged in!", accessToken });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "email and password are required!" });
  }

  const user = await userRepo.getUserByEmail(email);
  if (user) {
    res
      .status(400)
      .json({ message: "User with inputted email already exists!" });
    return;
  }

  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = await userRepo.createUser({ email, password: hashedPass });
    const { password: _, ...payload } = newUser;

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    refreshTokens.push(refreshToken);

    setAccessTokenInCookie(res, accessToken);
    setRefreshTokenInCookie(res, refreshToken);

    res.status(201).json({
      message: "User successfully created!",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function logout(req: Request, res: Response) {

  res.clearCookie("access_token"); // Clear access token
  res.clearCookie("refresh_token"); // Clear refresh token
  res.status(200).json({ message: "Logged out successfully!" });
}

async function verifyToken(req: Request, res: Response) {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    res.status(403).json({ message: "You are not authenticated!" });
    return;
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({ message: "Refresh token is not valid!" });
    return;
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);
    refreshTokens.push(newRefreshToken);

    // update cookie with new access token
    setAccessTokenInCookie(res, newAccessToken);
    setRefreshTokenInCookie(res, newRefreshToken);

    res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (err) {
    throw err;
  }
}

export default { login, logout, register, verifyToken };
