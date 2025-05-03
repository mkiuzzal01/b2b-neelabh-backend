import { z } from 'zod';

// SubCategory Validation Schema
const subCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

// Category Validation Schema
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  subCategory: z.string().min(1, 'SubCategory ID is required'),
  mainCategory: z.string().min(1, 'MainCategory ID is required'),
  isActive: z.boolean().optional(),
});

// MainCategory Validation Schema
const mainCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  category: z.string().optional(),
});

// Exported validation object
export const categoryValidation = {
  createMainCategory: z.object({ body: mainCategorySchema }),
  createCategory: z.object({ body: categorySchema }),
  createSubCategory: z.object({ body: subCategorySchema }),

  updateSubCategory: z.object({ body: subCategorySchema.partial() }),
  updateCategory: z.object({ body: categorySchema.partial() }),
  updateMainCategory: z.object({ body: mainCategorySchema.partial() }),
};
