import { z } from 'zod';
import { gender } from './stakeholder.constant';

const nameSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .max(20, 'First name cannot exceed 20 characters')
    .regex(/^[A-Z][a-z]*$/, 'First name must start with a capital letter'),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});

const addressSchema = z.object({
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
});

const stakeholderBaseSchema = z.object({
  name: nameSchema,
  email: z.string({ required_error: 'Email is required' }).email(),
  phone: z.string({ required_error: 'Phone is required' }),
  nid: z.string({ required_error: 'NID is required' }),
  dateOfBirth: z
    .string({ required_error: 'Date of birth is required' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  gender: z.enum(gender, { required_error: 'Gender is required' }),
  dateOfJoining: z
    .string({ required_error: 'Date of joining is required' })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
  address: addressSchema,
  profileImage: z.object({
    publicId: z.string(),
    url: z.string(),
  }),
  isDeleted: z.boolean().default(false).optional(),
});

const createStakeholderValidation = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    stakeholder: stakeholderBaseSchema,
  }),
});

const updateStakeholderValidation = z.object({
  body: z.object({
    password: z.string().min(6).optional(),
    stakeholder: stakeholderBaseSchema.deepPartial(),
  }),
});

export const stakeholderValidation = {
  createStakeholderValidation,
  updateStakeholderValidation,
};
