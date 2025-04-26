import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20, {
      message: ' Password must be at most 20 characters long',
    })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
