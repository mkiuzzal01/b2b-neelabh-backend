import { z } from 'zod';

// =================== 🔸 SubCategory Validation ===================
const subCategorySchema = z.object({
  name: z.string().min(1, 'Sub-category name is required'),
});

// =================== 🔹 Category Validation ===================
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

// =================== 🔷 MainCategory Validation ===================
const mainCategorySchema = z.object({
  name: z.string().min(1, 'Main category name is required'),
  image: z.string().url('Invalid image URL').optional(),
  category: z
    .array(z.string().min(1, 'Each category ID must be a non-empty string'))
    .optional(),
  subCategory: z
    .array(z.string().min(1, 'Each sub-category ID must be a non-empty string'))
    .optional(),
  isActive: z.boolean().optional(),
});

// =================== ✅ Exported Validation Schemas ===================
export const categoryValidation = {
  // CREATE
  createMainCategory: z.object({
    body: mainCategorySchema.extend({
      subCategory: z
        .array(z.string().min(1, 'Each sub-category ID is required'))
        .min(1, 'At least one sub-category is required'),
    }),
  }),
  createCategory: z.object({
    body: categorySchema,
  }),
  createSubCategory: z.object({
    body: subCategorySchema,
  }),

  // UPDATE (partial for flexibility)
  updateMainCategory: z.object({
    body: mainCategorySchema.partial(),
  }),
  updateCategory: z.object({
    body: categorySchema.partial(),
  }),
  updateSubCategory: z.object({
    body: subCategorySchema.partial(),
  }),
};
