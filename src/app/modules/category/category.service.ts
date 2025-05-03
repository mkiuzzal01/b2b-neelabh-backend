import status from 'http-status';
import AppError from '../../errors/AppError';
import { Category } from './category.model';
import { TCategory } from './category.interface';

const getCategoriesFromDB = async () => {
  const result = await Category.find()
    .populate('subCategory')
    .populate('mainCategory');
  return result;
};

const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id)
    .populate('subCategory')
    .populate('mainCategory');
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'The category was not found');
  }
  return result;
};

const createCategoryIntoDB = async (category: TCategory) => {
  const isExist = await Category.findOne({ slug: category.slug });
  if (isExist) {
    throw new AppError(status.CONFLICT, 'Category already exists');
  }

  const result = await Category.create({
    ...category,
    name: category.name.trim(),
    slug: category.slug.trim().toLowerCase().split('-'),
  });

  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'Category not found');
  }

  const updateData: Partial<TCategory> = {};

  if (payload.name) {
    updateData.name = payload.name.trim();
  }

  if (payload.slug) {
    updateData.slug = payload.slug.trim().toLowerCase();
  }

  if (payload.image) {
    updateData.image = payload.image;
  }

  if (payload.subCategory) {
    updateData.subCategory = payload.subCategory;
  }

  if (payload.mainCategory) {
    updateData.mainCategory = payload.mainCategory;
  }

  if (typeof payload.isActive === 'boolean') {
    updateData.isActive = payload.isActive;
  }

  const result = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'Category not found');
  }

  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
