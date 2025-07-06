import { model, Schema } from 'mongoose';
import { TProductVariant } from './product-variant.interface';
import slugify from 'slugify';

const productVariantSchema = new Schema<TProductVariant>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
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
  const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
  this.slug = slugify(makeSlug, { lower: true, strict: true });

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
