import { z } from 'zod';
import { profileStatus, role } from './user-constant';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .max(20, {
        message: ' Password must be at most 20 characters long',
      })
      .optional(),
    role: z.enum(role, { required_error: 'Role is required' }).optional(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    status: z.enum(profileStatus, { required_error: 'user status is require' }),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
