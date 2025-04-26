import { z } from 'zod';

const createStakeholderValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required' }),
    user: z.string({ required_error: 'User ID is required' }),
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
      middleName: z.string().optional(),
    }),
    email: z.string({ required_error: 'Email is required' }).email(),
    phone: z.string({ required_error: 'Phone is required' }),
    nid: z.string({ required_error: 'NID is required' }),
    address: z.object({
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
    }),
    profileImageUrl: z
      .string({ required_error: 'Profile Image URL is required' })
      .url()
      .optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const stakeholderValidation = {
  createStakeholderValidation,
};
