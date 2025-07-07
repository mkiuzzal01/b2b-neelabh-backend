import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import { TProduct, TProductVariant, TCategories } from './product.interface';
import { productStatus, productActivity } from './product.constant';

export const categoriesSchema = new Schema<TCategories>(
  {
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategory',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
  },
  { _id: false },
);

export const variantSchema = new Schema<TProductVariant>(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    attributes: [
      {
        value: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
  },
  { _id: false },
);

const productSchema = new Schema<TProduct>(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    productCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    slug: { type: String },
    totalQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    parentageForSeller: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    categories: categoriesSchema,
    variants: [variantSchema],
    description: { type: String, required: true },
    status: {
      type: String,
      enum: productStatus,
      default: 'in-stock',
    },
    activity: {
      type: String,
      enum: productActivity,
      default: 'in-stock',
    },
    optionalLinks: {
      type: String,
      default: '',
      trim: true,
    },
    productImage: {
      type: Schema.Types.ObjectId,
      ref: 'Photo',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('subTitle')) {
    const slugText = `${this.title || ''} ${this.subTitle || ''} || ''}`;
    this.slug = slugify(slugText, { lower: true, strict: true });
  }
  next();
});

export const Product = model<TProduct>('Product', productSchema);
