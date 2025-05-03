import { z } from 'zod';

const subCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
});

const categorySchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
  slug: z.string().min(1),
  subCategory: z.string().min(1),
  mainCategory: z.string().min(1),
  isActive: z.boolean().optional(),
});

const mainCategorySchema = z.object({
  name: z.string().min(1),
  image: z.string().optional(),
  slug: z.string().min(1),
  category: z.string().min(1),
});

export const categoryValidation = {
  createSubCategory: z.object({ body: subCategorySchema }),
  createCategory: z.object({ body: categorySchema }),
  createMainCategory: z.object({ body: mainCategorySchema }),
  updateSubCategory: z.object({ body: subCategorySchema }).partial(),
  updateCategory: z.object({ body: categorySchema }).partial(),
  updateMainCategory: z.object({ body: mainCategorySchema }).partial(),
};
