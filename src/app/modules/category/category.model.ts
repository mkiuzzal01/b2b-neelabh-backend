import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

export const categorySchema = new Schema<TCategory>(
  {
    category: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    subCategory: {
      type: [String],
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

//to lowercase sub-category:
categorySchema.pre('save', function (next) {
  this.subCategory = this.subCategory.map((subCat: string) =>
    subCat.toLowerCase(),
  );
  next();
});

export const Category = model<TCategory>('Category', categorySchema);
