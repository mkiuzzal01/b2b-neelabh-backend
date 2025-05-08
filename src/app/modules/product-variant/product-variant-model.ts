import { model, Schema } from 'mongoose';
import { TProductVariant } from './product-variant.interface';

const productVariantSchema = new Schema<TProductVariant>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    attributes: [
      {
        value: { type: String, required: true },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

//make to lowercase
productVariantSchema.pre('save', function (next) {
  if (this.name) {
    this.name = this.name.toLowerCase();
  }
  if (this.attributes && Array.isArray(this.attributes)) {
    this.attributes = this.attributes.map((attr) => ({
      value: attr.value.toLowerCase(),
    }));
  }

  next();
});

export const ProductVariant = model<TProductVariant>(
  'ProductVariant',
  productVariantSchema,
);
