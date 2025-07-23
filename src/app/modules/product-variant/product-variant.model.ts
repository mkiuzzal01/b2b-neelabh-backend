import { model, Schema } from 'mongoose';
import { IProductVariant, IVariantValue } from './product-variant.interface';

const variantValueSchema = new Schema<IVariantValue>(
  {
    value: {
      type: String,
      required: [true, 'Value is required'],
      trim: true,
    },
  },
  { _id: false },
);

const productVariantSchema = new Schema<IProductVariant>(
  {
    name: {
      type: String,
      required: [true, 'Variant name is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    values: {
      type: [variantValueSchema],
      required: [true, 'At least one variant value is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  },
);

export const ProductVariant = model<IProductVariant>(
  'ProductVariant',
  productVariantSchema,
);
