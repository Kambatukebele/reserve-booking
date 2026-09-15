import * as z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().optional(),
  duration: z.number().int().positive(),
  price: z.int().positive(),
});

export const updateServiceSchema = z.object({
  name: z.string().min(5).max(50).optional(),
  description: z.string().optional(),
  duration: z.number().int().positive().optional(),
  price: z.int().positive().optional(),
});
