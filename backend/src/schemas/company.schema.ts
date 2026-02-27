import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(3, "Company name is required"),
  numberOfShareholders: z
    .number()
    .int("Number of shareholders must be an integer")
    .positive("Number of shareholders must be greater than 0"),
  totalCapital: z
    .number()
    .positive("Total capital must be greater than 0"),
});

export const addShareholdersSchema = z.object({
  companyId: z.string().min(3, "Company ID is required"),
  shareholders: z
    .array(
      z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters long"),
        lastName: z.string().min(2, "Last name must be at least 2 characters long"),
        nationality: z.string().min(2, "Nationality must be at least 2 characters long"),
      })
    )
    .min(1, "At least one shareholder is required"),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type AddShareholdersInput = z.infer<typeof addShareholdersSchema>;
