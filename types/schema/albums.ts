import { z } from 'zod';

export const MIN_YEAR = 1900;
export const MAX_YEAR = 2030;

export const AlbumFormSchema = z.object({
  name: z.string().min(2).max(80),
  tracks: z.number().int().min(1).max(100),
  year: z.number().int().min(MIN_YEAR).max(MAX_YEAR),
});

export type AlbumFormType = z.infer<typeof AlbumFormSchema>;
