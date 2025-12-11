import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  country: z.string().optional(),
  age: z
    .string()
    .min(1, "Age is required")
    .refine((val) => Number(val) >= 18 && Number(val) <= 100, {
      message: "Age must be between 18–100",
    }),
});

export type PersonalInfoType = z.infer<typeof personalInfoSchema>;
