import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    category: z
      .string()
      .min(1, 'Category is required')
      .transform((str) => str.toLowerCase()),
    subCategory: z
      .array(z.string().transform((str) => str.toLowerCase()))
      .min(1, 'Subcategory is required'),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    category: z
      .string()
      .transform((str) => str.toLowerCase())
      .optional(),
    subCategory: z
      .array(z.string().transform((str) => str.toLowerCase()))
      .min(1, 'At least one attribute is required')
      .optional(),
  }),
});
export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
