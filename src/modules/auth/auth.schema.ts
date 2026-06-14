import { z } from "zod";

export const registerSchema = z.object({
  businessName: z.string().trim().min(2).max(100),
  businessEmail: z.email(),
  businessPhone: z.string().trim().min(10).max(20),

  name: z.string().trim().min(2).max(100),

  email: z.email(),

  password: z
    .string()
    .min(8)
    .max(100),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;