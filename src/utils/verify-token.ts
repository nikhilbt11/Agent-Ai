import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  businessId: string;
}

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
};