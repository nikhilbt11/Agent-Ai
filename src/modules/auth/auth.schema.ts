import { z } from "zod";

export const registerSchema = z.object({
  businessName: z.string().min(2),
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});