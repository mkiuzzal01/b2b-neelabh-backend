import { model, Schema } from 'mongoose';
import { TProductVariant } from './product-variant.interface';

const productVariantSchema = new Schema<TProductVariant>({
  name: { type: String, required: true },
  attributes: { type: [String], required: true },
});

export const ProductVariant = model<TProductVariant>(
  'ProductVariant',
  productVariantSchema,
);
