import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export function requiresAuth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      status: "failed",
      message: "No Authorization header provided",
    });
  }
  try {
    const [authorization, token] = req.headers.authorization.split(" ");
    if (authorization !== "Bearer") {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Authorization Header",
      });
    }

    const secret = process.env.JWT_SECRET as string;

    req.user = jwt.verify(token, secret);

    return next();
  } catch (err) {
    return res.status(403).json({
      status: "failed",
      message: "Authorization Error",
    });
  }
}
