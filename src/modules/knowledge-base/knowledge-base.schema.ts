// Define your knowledge base schema here
import { z } from "zod";

export const createKnowledgeBaseSchema =
  z.object({
    title: z.string().min(2).max(200),

    content: z.string().min(10),

    category: z.string().optional(),

    tags: z.array(z.string()).default([]),
  });

export type CreateKnowledgeBaseDto =
  z.infer<typeof createKnowledgeBaseSchema>;