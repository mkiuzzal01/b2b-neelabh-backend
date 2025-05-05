import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import { TSubCategory, TCategory, TMainCategory } from './category.interface';

// SubCategory Schema
const SubCategorySchema = new Schema<TSubCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  },
);

SubCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Category Schema
const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategory',
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.toLocaleLowerCase();
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// MainCategory Schema
const MainCategorySchema = new Schema<TMainCategory>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String },
    slug: { type: String, trim: true, unique: true, lowercase: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  },
);

MainCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Models
export const SubCategory = model<TSubCategory>(
  'SubCategory',
  SubCategorySchema,
);
export const Category = model<TCategory>('Category', CategorySchema);
export const MainCategory = model<TMainCategory>(
  'MainCategory',
  MainCategorySchema,
);
