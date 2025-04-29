import { z } from 'zod';

const createProductVariantValidationSchema = z.object({
  name: z.string(),
  attributes: z.array(z.string()).min(1, 'At least one attribute is required'),
});

const updateProductVariantValidation =
  createProductVariantValidationSchema.partial();

export const ProductVariantValidation = {
  createProductVariantValidationSchema,
  updateProductVariantValidation,
};
