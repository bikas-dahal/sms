import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginForm = z.infer<typeof LoginSchema>;




export const RegisterSchema = z.object({
  name: z.string().max(30),
  surname: z.string().max(15),
  phone: z.string().max(15),
  password: z.string().min(6, "Password must be at least 6 characters!")
})

export type RegisterType = z.infer<typeof RegisterSchema>
