import { z } from 'zod';
import { gender } from '../stakeholder/stakeholder-constant';
import { bankName, paymentMethod } from './seller-constant';

const createSellerValidationSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User ID is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
      middleName: z.string().optional(),
    }),
    email: z.string({ required_error: 'Email is required' }).email(),
    phone: z.string({ required_error: 'Phone number is required' }),
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
    address: z.object({
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
    }),
    paymentMethod: z.enum(paymentMethod, {
      required_error: 'Payment method is required',
    }),
    bankName: z.enum(bankName, { required_error: 'Bank name is required' }),
    profileImageUrl: z
      .string({ required_error: 'Profile image URL is required' })
      .url(),
    isDeleted: z.boolean().default(false),
  }),
});

export const sellerValidation = {
  createSellerValidationSchema,
};
