"use server";

import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export async function submitForm(data: FormData) {
  const parsed = FormSchema.safeParse({
    name: data.get("name"),
    email: data.get("email"),
  });

  if (!parsed.success) {
    return { error: parsed.error.format() };
  }

  // save to db / send mail / whatever
  console.log("Form data:", parsed.data);

  return { success: true };
}
