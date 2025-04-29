import { model, Schema } from 'mongoose';
import { TProductVariant } from './product-variant.interface';

const productVariantSchema = new Schema<TProductVariant>({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  attributes: {
    type: [String],
    required: true,
  },
});

//to lowercase attributes
productVariantSchema.pre('save', function (next) {
  this.attributes = this.attributes.map((attr: string) => attr.toLowerCase());
  next();
});

export const ProductVariant = model<TProductVariant>(
  'ProductVariant',
  productVariantSchema,
);
