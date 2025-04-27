import { z } from 'zod';

const createStakeholderValidation = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
      middleName: z.string().optional(),
    }),
    email: z.string({ required_error: 'Email is required' }).email(),
    phone: z.string({ required_error: 'Phone is required' }),
    nid: z.string({ required_error: 'NID is required' }),
    dateOfBirth: z
      .string({ required_error: 'Date of birth is required' })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
    }),
    dateOfJoining: z
      .string({ required_error: 'Date of joining is required' })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }),
    address: z.object({
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
    }),
    profileImageUrl: z
      .string({ required_error: 'Profile image URL is required' })
      .url(),
    isDeleted: z.boolean().optional().default(false),
    user: z.string().optional(),
  }),
});

export const stakeholderValidation = {
  createStakeholderValidation,
};
