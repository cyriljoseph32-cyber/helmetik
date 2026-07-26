import { z } from "zod";

/** Shared validation schemas used by both the client form and the API route. */

const phone = z
  .string()
  .trim()
  .min(6, "invalidPhone")
  .max(32)
  .regex(/^[+()\-\s\d]+$/, "invalidPhone");

export const contactSchema = z.object({
  kind: z.literal("contact"),
  name: z.string().trim().min(2, "required").max(80),
  email: z.string().trim().email("invalidEmail").max(120),
  area: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(10, "tooShort").max(2000),
  // Honeypot — must be empty. Bots fill it.
  company_website: z.string().max(0).optional().default(""),
});

export const hostSchema = z.object({
  kind: z.literal("host"),
  name: z.string().trim().min(2, "required").max(80),
  business: z.string().trim().min(2, "required").max(120),
  venueType: z.string().trim().min(1, "required").max(60),
  area: z.string().trim().min(1, "required").max(40),
  phone,
  message: z.string().trim().max(2000).optional().default(""),
  company_website: z.string().max(0).optional().default(""),
});

export const submissionSchema = z.discriminatedUnion("kind", [
  contactSchema,
  hostSchema,
]);

export type ContactInput = z.infer<typeof contactSchema>;
export type HostInput = z.infer<typeof hostSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
