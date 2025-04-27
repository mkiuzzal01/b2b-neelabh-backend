import { z } from 'zod';

const createStakeholderNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot exceed 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});

const createStakeholderAddressSchema = z.object({
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
});

const createStakeholderValidation = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
    stakeholder: z.object({
      name: createStakeholderNameSchema,
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
      address: createStakeholderAddressSchema,
      profileImageUrl: z
        .string({ required_error: 'Profile image URL is required' })
        .url(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

const updateStakeholderValidation = createStakeholderValidation.partial();

export const stakeholderValidation = {
  createStakeholderValidation,
  updateStakeholderValidation,
};
