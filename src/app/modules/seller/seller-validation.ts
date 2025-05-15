import { z } from 'zod';
import { gender } from '../stake-holder/stakeholder-constant';
import { bankName, paymentMethod } from './seller-constant';

const nameSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'Last name is required' }),
});

const addressSchema = z.object({
  presentAddress: z.string({ required_error: 'Present address is required' }),
  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
});

const bankAccountInfoSchema = z.object({
  paymentMethod: z.enum(paymentMethod, {
    required_error: 'Payment method is required',
  }),
  bankName: z.enum(bankName, {
    required_error: 'Bank name is required',
  }),
  accountNumber: z
    .string({ required_error: 'Bank account number is required' })
    .min(12, { message: 'Bank account number must be at least 12 digits' }),
});

const sellerBaseSchema = z.object({
  name: nameSchema,
  email: z.string({ required_error: 'Email is required' }).email(),
  phone: z.string({ required_error: 'Phone number is required' }),
  nid: z.string({ required_error: 'NID is required' }),
  dateOfBirth: z
    .string({ required_error: 'Date of birth is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  gender: z.enum(gender, { required_error: 'Gender is required' }),
  dateOfJoining: z
    .string({ required_error: 'Date of joining is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),
  address: addressSchema,
  bankAccountInfo: bankAccountInfoSchema,
  isDeleted: z.boolean().default(false).optional(),
});

const createSellerValidation = z.object({
  body: z.object({
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
    seller: sellerBaseSchema,
  }),
});

const updateSellerValidation = z.object({
  body: z.object({
    password: z.string().min(6).optional(),
    seller: sellerBaseSchema.deepPartial(),
  }),
});

export const sellerValidation = {
  createSellerValidation,
  updateSellerValidation,
};
