import jwt from "jsonwebtoken";

export const generateToken = (
  userId: string,
  businessId: string
) => {
  return jwt.sign(
    {
      userId,
      businessId,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};