/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (category: TCategory) => {
  try {
    const result = await Category.create(category);
    return result;
  } catch (error: any) {
    return error;
  }
};

const getCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};
const getCategoryByIdFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};
const updateCategoryIntoDB = async (id: string, payload: TCategory) => {
  const result = await Category.findByIdAndUpdate(id, {
    payload,
  });
  return result;
};
const deleteCategoryFromDB = async (id: string) => {
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
