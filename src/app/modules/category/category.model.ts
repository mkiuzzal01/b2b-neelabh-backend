import { Schema } from 'mongoose';
import { TCategory } from './category.interface';

export const createCategorySchema = new Schema<TCategory>(
  {
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
