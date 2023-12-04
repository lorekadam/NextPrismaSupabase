import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(40),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = LoginFormSchema.merge(
  z.object({
    confirmPassword: z.string().min(6).max(40),
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
