import { z } from "zod";

export const chatSchema = z.object({
  customerPhone: z.string(),
  message: z.string().min(1),
});