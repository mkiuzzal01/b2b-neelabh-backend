import { z } from 'zod';

const createProductVariantValidationSchema = z.object({
  body: z.object({
    name: z.string().transform((str) => str.toLowerCase()),
    attributes: z
      .array(z.string().transform((str) => str.toLowerCase()))
      .min(1, 'At least one attribute is required'),
  }),
});

const updateProductVariantValidation = z.object({
  body: z.object({
    name: z
      .string()
      .transform((str) => str.toLowerCase())
      .optional(),
    attributes: z
      .array(z.string().transform((str) => str.toLowerCase()))
      .min(1, 'At least one attribute is required')
      .optional(),
  }),
});

export const ProductVariantValidation = {
  createProductVariantValidationSchema,
  updateProductVariantValidation,
};
