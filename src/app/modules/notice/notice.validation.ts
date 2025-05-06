import { z } from 'zod';

export const createNoticeZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(3, 'Title must be at least 3 characters')
      .optional(),
    subTitle: z.string().optional(),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(10, 'Description must be at least 10 characters'),
  }),
});

export const updateNoticeZodSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').optional(),
    subTitle: z.string().optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .optional(),
  }),
});
