import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
}; 