/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (category: TCategory) => {
  const isExist = await Category.findOne({ category: category.category });
  if (isExist) {
    throw new Error('Category already exists');
  }

  const result = await Category.create(category);
  return result;
};

const getCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};

const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id);
  if (!result) {
    throw new AppError(status.BAD_REQUEST, 'the category not found');
  }
  return result;
};

const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new Error('Category not found');
  }

  const updateCategory: any = {};

  if (payload.category && payload.category.trim() === '') {
    updateCategory.category = payload.category.trim();
  }

  if (payload.subCategory && payload.subCategory.length > 0) {
    const existingSubCategory = isExist.subCategory.map((sub) =>
      sub.toLowerCase(),
    );

    const newSubCategory = payload.subCategory
      .map((sub) => sub.toLowerCase())
      .filter((sub) => !existingSubCategory.includes(sub));

    if (newSubCategory.length > 0) {
      updateCategory.$addToSet = {
        subCategory: { $each: newSubCategory },
      };
    }
  }

  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCategoryFromDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const isExist = await Category.findById(id);
  if (!isExist) {
    throw new Error('Category not found');
  }

  const result = await Category.deleteOne({ id });
  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
