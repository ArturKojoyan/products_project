import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: any;
}

function checkAuth(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.access_token; // Get token from cookies

  if (token) {
    try {
      // verify and get data from token
      const authUser = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      req.user = authUser;
      next();
    } catch (err) {
      res
        .status(401)
        .json({ error: err, message: '"Invalid or expired token."' });
    }
  } else {
    res.status(403).json({ message: "Access token is not provided!" });
  }
}

export default checkAuth;
