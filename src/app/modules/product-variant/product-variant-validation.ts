import { z } from 'zod';

const createProductVariantValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Variant name is required'),
    attributes: z
      .array(
        z.object({
          value: z.string().min(1, 'Attribute value is required'),
        }),
      )
      .min(1, 'At least one attribute is required'),
  }),
});

const updateProductVariantValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    attributes: z
      .array(
        z.object({
          value: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const ProductVariantValidation = {
  createProductVariantValidationSchema,
  updateProductVariantValidation,
};
