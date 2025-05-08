import { z } from 'zod';
import { productStatus, productActivity } from './product.constant';

const productAttributeSchema = z.object({
  value: z.string().min(1, 'Attribute value is required'),
  quantity: z.number().min(0, 'Quantity must be at least 0').optional(),
});

const productVariantSchema = z.object({
  name: z.string().min(1, 'Variant name is required'),
  attributes: z
    .array(productAttributeSchema)
    .min(1, 'At least one attribute is required'),
});

const categoriesSchema = z.object({
  mainCategory: z.string().min(1, 'Main category is required'),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().min(1, 'Subcategory is required'),
});

const baseProductSchema = z.object({
  productCode: z.string().min(1, 'Product code is required'),
  title: z.string().min(1, 'Title is required'),
  subTitle: z.string().optional(),
  variants: z
    .array(productVariantSchema)
    .min(1, 'At least one variant is required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  discount: z.number().min(0, 'Discount must be greater than or equal to 0'),
  rating: z.number().optional(),
  categories: categoriesSchema,
  description: z.string().min(1, 'Description is required'),
  status: z.enum(productStatus).default('in-stock'),
  activity: z.enum(productActivity).default('in-stock'),
  isDeleted: z.boolean().default(false),
});

export const createProductValidationSchema = z.object({
  body: baseProductSchema,
});

export const updateProductValidationSchema = z.object({
  body: baseProductSchema.partial(),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
