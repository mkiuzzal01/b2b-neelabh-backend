import { z } from 'zod';
import { productActivity, productStatus } from './product.constant';

export const productVariantValidationSchema = z.object({
  colors: z.array(z.string()).min(1, 'At least one color is required'),
  sizeWithQuantity: z
    .record(z.string(), z.number())
    .refine((obj) => Object.keys(obj).length > 0, {
      message: 'At least one size with quantity is required',
    }),
});

export const categoryValidationSchema = z.object({
  mainCategory: z.string(),
  subCategories: z
    .array(z.string())
    .min(1, 'At least one subcategory is required'),
});

export const createProductValidationSchema = z.object({
  body: z.object({
    productCode: z.string().min(1, 'Product code is required'),
    title: z.string().min(1, 'Title is required'),
    subTitle: z.string().optional(),
    variants: z
      .array(productVariantValidationSchema)
      .min(1, 'At least one variant is required'),
    price: z.number().min(0, 'Price must be greater than or equal to 0'),
    discount: z.number().min(0, 'Discount must be greater than or equal to 0'),
    rating: z.number().optional(),
    category: z.string().min(1, 'Category is required'),
    subCategory: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(productStatus).default('in-stock'),
    activity: z.enum(productActivity).default('in-stock'),
    isDeleted: z.boolean().default(false),
  }),
});

export const productValidation = {
  createProductValidationSchema,
};
