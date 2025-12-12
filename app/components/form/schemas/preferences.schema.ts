import { z } from "zod";

export const preferencesSchema = z.object({
  category: z.string().min(1, "Category is required"),

  // interests: z
    // .string()
    // .min(1, "Select at least one interest"),
    interests: z.array(z.string()).nonempty("Choose at least one interest"),


  avatar: z.any().optional(),
});

export type PreferencesType = z.infer<typeof preferencesSchema>;
