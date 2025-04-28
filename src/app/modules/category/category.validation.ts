import { z } from 'zod';

export const createCategoryValidationSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  subCategory: z.array(z.string()).min(1, 'Subcategory is required'),
});

export const categoryValidation = {
  createCategoryValidationSchema,
};
