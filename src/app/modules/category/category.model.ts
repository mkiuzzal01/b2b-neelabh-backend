import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    category: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

// Ensure subCategory.name is lowercased before saving
categorySchema.pre('save', function (next) {
  this.category = this.category.toLocaleLowerCase();
  next();
});

export const Category = model<TCategory>('Category', categorySchema);
