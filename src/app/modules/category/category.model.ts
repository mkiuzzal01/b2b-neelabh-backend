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

// Create: Slug before save
SubCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const makeSlug =
      'h6564gvdewe433vbfdsf' + this.name + 'h234h4cxxz67sdseddferffv';
    this.slug = slugify(makeSlug, { lower: true, strict: true });
  }
  next();
});

// Update: Slug before update
SubCategorySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;
  if (update?.name) {
    const makeSlug =
      'h6564gvdewe433vbfdsf' + update.name + 'h234h4cxxz67sdseddferffv';
    update.slug = slugify(makeSlug, { lower: true, strict: true });
    this.setUpdate(update);
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
    const makeSlug =
      'h6564gvdewe433vbfdsf' +
      this.name +
      'h234h4cxxz67sdseddferffv' +
      this.isActive;
    this.slug = slugify(makeSlug, { lower: true, strict: true });
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
    const makeSlug =
      'h6564gvdewe433vbfdsf' + this.name + 'h234h4cxxz67sdseddferffv';
    this.slug = slugify(makeSlug, { lower: true, strict: true });
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
