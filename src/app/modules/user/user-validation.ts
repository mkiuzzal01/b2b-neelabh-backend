import { z } from 'zod';
import { role } from './user-constant';

export const userValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20, {
      message: ' Password must be at most 20 characters long',
    })
    .optional(),
  role: z.enum(role, { required_error: 'Role is required' }).optional(),
});

export const userValidation = {
  userValidationSchema,
};
