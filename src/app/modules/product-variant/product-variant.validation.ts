import { z } from 'zod';
import { ProductVariant } from './product-variant.model';

// Base validation schema that matches Mongoose model
const variantValueSchema = z.object({
  value: z
    .string({
      required_error: 'Value is required',
      invalid_type_error: 'Value must be a string',
    })
    .min(1, 'Value cannot be empty')
    .trim(),
});

const productVariantBaseSchema = z.object({
  name: z
    .string({
      required_error: 'Variant name is required',
      invalid_type_error: 'Variant name must be a string',
    })
    .min(1, 'Variant name is required')
    .max(50, 'Variant name cannot exceed 50 characters')
    .transform((val) => val.trim().toLowerCase()),
  values: z
    .array(variantValueSchema, {
      required_error: 'At least one variant value is required',
      invalid_type_error: 'Values must be an array',
    })
    .min(1, 'At least one variant value is required'),
});

// Create validation
const createProductVariantSchema = productVariantBaseSchema.refine(
  async (data) => !(await ProductVariant.exists({ name: data.name })),
  {
    message: 'Variant name already exists',
    path: ['name'],
  },
);

// Update validation
const updateProductVariantSchema = productVariantBaseSchema
  .partial()
  .superRefine(async (data, ctx) => {
    if (data.name) {
      const exists = await ProductVariant.exists({ name: data.name });
      if (exists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Variant name already exists',
          path: ['name'],
        });
      }
    }

    if (data.values && data.values.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one variant value is required',
        path: ['values'],
      });
    }

    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one field must be provided for update',
        path: ['body'],
      });
    }
  });

export const ProductVariantValidation = {
  createProductVariantSchema,
  updateProductVariantSchema,
};
