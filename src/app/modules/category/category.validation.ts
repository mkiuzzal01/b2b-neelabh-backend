import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    category: z.string().min(1, 'Category is required'),
    subCategory: z.array(z.string()).min(1, 'Subcategory is required'),
  }),
});

const updateCategoryValidationSchema = createCategoryValidationSchema.partial();

export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
