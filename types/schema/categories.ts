import { z } from 'zod';

export const CategoryFormSchema = z.object({
  name: z.string().min(2).max(80),
});

export type CategoryFormType = z.infer<typeof CategoryFormSchema>;
