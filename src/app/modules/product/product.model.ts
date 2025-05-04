import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { productActivity, productStatus } from './product.constant';

export const CategoriesSchema = {
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
};

export const VariantSchema = new Schema(
  {
    name: { type: String, required: true },
    attributes: [
      {
        value: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { _id: false },
);

const createProductSchema = new Schema<TProduct>(
  {
    productCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    variants: [VariantSchema],
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number },
    categories: CategoriesSchema,
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

export const Product = model<TProduct>('Product', createProductSchema);
