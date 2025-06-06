import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { productActivity, productStatus } from './product.constant';

const createProductSchema = new Schema<TProduct>(
  {
    productCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    variants: [
      {
        name: { type: String, required: true },
        attribute: { type: Object, required: true },
      },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    rating: { type: Number },
    category: {
      type: Schema.ObjectId,
      unique: true,
      required: true,
      ref: 'Category',
    },
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
