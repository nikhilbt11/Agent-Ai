import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verify-token";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token =
    authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded =
      verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};