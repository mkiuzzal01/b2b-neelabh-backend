/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import { TSubCategory, TCategory, TMainCategory } from './category.interface';

// ---------------- SubCategory Schema ----------------
const SubCategorySchema = new Schema<TSubCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
  },
  { timestamps: true },
);

SubCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.toLocaleLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
    this.slug = slugify(makeSlug, { lower: true, strict: true });
  }
  next();
});

SubCategorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Record<string, unknown>;
  if (update?.name) {
    update.name = (update.name as string).toLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
    update.slug = slugify(makeSlug, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

// ---------------- Category Schema ----------------
const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
  },
  { timestamps: true },
);

CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.toLocaleLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
    this.slug = slugify(makeSlug, { lower: true, strict: true });
  }
  next();
});

CategorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  if (update?.name) {
    update.name = update.name.toLocaleLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
    update.slug = slugify(makeSlug, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

// ---------------- MainCategory Schema ----------------
const MainCategorySchema = new Schema<TMainCategory>(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    image: { type: String },
    slug: { type: String, trim: true, unique: true, lowercase: true },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    subCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

MainCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.name = this.name.toLocaleLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
    this.slug = slugify(makeSlug, { lower: true, strict: true });
  }
  next();
});

MainCategorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  if (update?.name) {
    update.name = update.name.toLocaleLowerCase();
    const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
    update.slug = slugify(makeSlug, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

// ---------------- Export Models ----------------
export const SubCategory = model<TSubCategory>(
  'SubCategory',
  SubCategorySchema,
);
export const Category = model<TCategory>('Category', CategorySchema);
export const MainCategory = model<TMainCategory>(
  'MainCategory',
  MainCategorySchema,
);
