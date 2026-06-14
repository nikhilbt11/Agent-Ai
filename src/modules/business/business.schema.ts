import { z } from "zod";

export const createBusinessSchema = z.object({
  name: z.string().min(2),
  phoneNumber: z.string().min(10),
  description: z.string().optional(),
});

export type CreateBusinessDto =
  z.infer<typeof createBusinessSchema>;