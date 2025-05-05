import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import {
  Category,
  MainCategory,
  SubCategory,
} from '../category/category.model';

const updateProductIntoBD = async (id: string, payload: Partial<TProduct>) => {
  const isExitsProduct = await Product.findById({ _id: id });

  if (!isExitsProduct) {
    throw new AppError(status.CONFLICT, 'The product not found');
  }

  const isExistMainCategory = await MainCategory.findById({
    _id: payload.categories?.mainCategory,
  });

  if (!isExistMainCategory) {
    throw new AppError(status.NOT_FOUND, 'The main category not found');
  }

  const isExistCategory = await Category.findById({
    _id: payload.categories?.category,
  });
  if (!isExistCategory) {
    throw new AppError(status.NOT_FOUND, 'The category not found');
  }

  const isExitsSubCategory = await SubCategory.findById({
    _id: payload.categories?.subCategory,
  });

  if (!isExitsSubCategory) {
    throw new AppError(status.NOT_FOUND, 'The sub category not found');
  }

  const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllProductFromBD = async () => {
  const result = await Product.find().populate([
    { path: 'categories.mainCategory' },
    { path: 'categories.category' },
    { path: 'categories.subCategory' },
  ]);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate([
    { path: 'categories.mainCategory' },
    { path: 'categories.category' },
    { path: 'categories.subCategory' },
  ]);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  await Product.findByIdAndDelete(id);
  return null;
};

export const productService = {
  updateProductIntoBD,
  getAllProductFromBD,
  getSingleProductFromDB,
  deleteProductFromDB,
};
