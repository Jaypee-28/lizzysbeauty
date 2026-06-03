import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional().or(z.literal("")),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute").default(60),
  fullPrice: z.coerce.number().min(0, "Price must be greater than or equal to 0").default(0),
  depositPercentage: z.coerce.number().min(0).max(100, "Deposit cannot exceed 100%").default(50),
  isActive: z.boolean().optional().default(true),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

export const updateServiceSchema = serviceSchema.partial();
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
