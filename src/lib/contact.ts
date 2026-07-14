import { z } from "zod";

/**
 * Shared client/server schema for the contact form (the site's single
 * conversion path). The API route (Phase 2) validates against this too.
 */
export const budgetOptions = [
  "Under $1K",
  "$1K–$5K",
  "$5K–$15K",
  "$15K+",
  "Not sure yet",
] as const;

export const projectTypeOptions = [
  "Voice agent",
  "Document automation",
  "RAG / support agent",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please tell me your name."),
  email: z.email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps me reply usefully."),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.enum(budgetOptions).optional(),
  projectType: z.enum(projectTypeOptions).optional(),
  /** Honeypot — humans never see or fill this field. */
  website: z.literal("").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
