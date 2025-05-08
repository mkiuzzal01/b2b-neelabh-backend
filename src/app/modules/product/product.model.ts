import { model, Schema } from 'mongoose';
import { TCategories, TProduct, TProductVariant } from './product.interface';
import { productActivity, productStatus } from './product.constant';
import slugify from 'slugify';

export const categoriesSchema = new Schema<TCategories>({
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
});

export const variantSchema = new Schema<TProductVariant>(
  {
    name: { type: String, required: true },
    attributes: [
      {
        value: { type: String, required: true },
        quantity: { type: Number },
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
    slug: { type: String },
    subTitle: { type: String },
    variants: [variantSchema],
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number },
    categories: categoriesSchema,
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
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const slugText = this.title + this.subTitle;
    this.slug = slugify(slugText, { lower: true, strict: true });
  }
  next();
});

variantSchema.pre('save', function (next) {
  this.name.toLocaleLowerCase();
  this.attributes.map((val) => val.value.toLocaleLowerCase());
  next();
});

export const Product = model<TProduct>('Product', productSchema);
