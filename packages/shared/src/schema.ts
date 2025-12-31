import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const userSchema = createUserSchema.extend({
  id: z.number(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;
