// Environment variables loader
import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.DATABASE_URL!,
};