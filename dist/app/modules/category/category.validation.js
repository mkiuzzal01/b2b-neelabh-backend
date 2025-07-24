"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const zod_1 = require("zod");
// =================== SubCategory Validation ===================
const subCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Sub-category name is required'),
});
// =================== Category Validation ===================
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Category name is required'),
});
// =================== MainCategory Validation ===================
const mainCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Main category name is required'),
    image: zod_1.z.string().url('Invalid image URL').optional(),
    category: zod_1.z
        .array(zod_1.z.string().min(1, 'Each category ID must be a non-empty string'))
        .optional(),
    subCategory: zod_1.z
        .array(zod_1.z.string().min(1, 'Each sub-category ID must be a non-empty string'))
        .optional(),
    isActive: zod_1.z.boolean().optional(),
});
// =================== Exported Validation Schemas ===================
exports.categoryValidation = {
    createMainCategory: zod_1.z.object({
        body: mainCategorySchema,
    }),
    createCategory: zod_1.z.object({
        body: categorySchema,
    }),
    createSubCategory: zod_1.z.object({
        body: subCategorySchema,
    }),
    updateMainCategory: zod_1.z.object({
        body: mainCategorySchema.partial(),
    }),
    updateCategory: zod_1.z.object({
        body: categorySchema.partial(),
    }),
    updateSubCategory: zod_1.z.object({
        body: subCategorySchema.partial(),
    }),
};
