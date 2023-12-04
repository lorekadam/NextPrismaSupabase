import { Role } from '@prisma/client';
import { z } from 'zod';

export const ProfileFormSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.custom<Role>(),
});

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
