import status from 'http-status';
import AppError from '../../errors/AppError';
import { Category, MainCategory, SubCategory } from './category.model';
import { TCategory, TMainCategory, TSubCategory } from './category.interface';
import { generateSlug } from '../utils/generateSlug';
import { startSession } from 'mongoose';

// ================= Main Category =================

const getAllMainCategoryFromDB = async () => {
  return await MainCategory.find().populate('category');
};

const getMainCategoryByIdFromDB = async (id: string) => {
  const result = await MainCategory.findById(id).populate('category');
  if (!result) throw new AppError(status.NOT_FOUND, 'Main category not found');
  return result;
};

const createMainCategoryIntoDB = async (mainCategory: TMainCategory) => {
  const slug = mainCategory.slug
    ? generateSlug(mainCategory.slug)
    : generateSlug(mainCategory.name);

  const isExist = await MainCategory.findOne({ slug });
  if (isExist)
    throw new AppError(status.CONFLICT, 'Main category already exists');

  return await MainCategory.create({
    ...mainCategory,
    name: mainCategory.name.trim(),
    slug,
  });
};

const updateMainCategoryIntoDB = async (
  id: string,
  payload: Partial<TMainCategory>,
) => {
  const isExist = await MainCategory.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Main category not found');

  return await MainCategory.findByIdAndUpdate(
    id,
    {
      ...payload,
      ...(payload.name && { name: payload.name.trim() }),
      ...(payload.slug && { slug: payload.slug.trim().toLowerCase() }),
    },
    { new: true, runValidators: true },
  );
};

const deleteMainCategoryFromDB = async (id: string) => {
  const isExist = await MainCategory.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Main category not found');

  return await MainCategory.findByIdAndDelete(id);
};

// ================= Category =================

const getAllCategoryFromDB = async () => {
  return await Category.find().populate('mainCategory').populate('subCategory');
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id)
    .populate('mainCategory')
    .populate('subCategory');
  if (!result) throw new AppError(status.NOT_FOUND, 'Category not found');
  return result;
};

const createCategoryIntoDB = async (payload: TCategory) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const isExist = await Category.findOne({ slug: payload.slug }).session(
      session,
    );
    if (isExist) throw new AppError(status.CONFLICT, 'Category already exists');

    const isExistMainCategory = await MainCategory.findById(
      payload.mainCategory,
    ).session(session);
    if (!isExistMainCategory) {
      throw new AppError(status.NOT_FOUND, 'Main category not found');
    }

    const isExistSubCategory = await SubCategory.findById(
      payload.subCategory,
    ).session(session);
    if (!isExistSubCategory) {
      throw new AppError(status.NOT_FOUND, 'Sub category not found');
    }

    const newCategory = await Category.create([payload], { session });
    if (!newCategory?.length) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Failed to create category',
      );
    }

    await MainCategory.findByIdAndUpdate(
      payload.mainCategory,
      { $push: { category: newCategory[0]._id } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return newCategory[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const updateCategoryIntoBD = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Category not found');

  return await Category.findByIdAndUpdate(
    id,
    {
      ...payload,
      ...(payload.name && { name: payload.name.trim() }),
      ...(payload.slug && { slug: payload.slug.trim().toLowerCase() }),
    },
    { new: true, runValidators: true },
  );
};

const deleteCategoryFromDB = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Category not found');

  return await Category.findByIdAndDelete(id);
};

// ================= Sub Category =================

const getAllSubCategoryFromDB = async () => {
  return await SubCategory.find();
};

const getSingleSubCategoryFromDB = async (id: string) => {
  const result = await SubCategory.findById(id);
  if (!result) throw new AppError(status.NOT_FOUND, 'Sub-category not found');
  return result;
};

const createSubCategoryIntoDB = async (subCategory: TSubCategory) => {
  const slug = subCategory.slug
    ? generateSlug(subCategory.slug)
    : generateSlug(subCategory.name);

  const isExist = await SubCategory.findOne({ slug });
  if (isExist)
    throw new AppError(status.CONFLICT, 'Sub-category already exists');

  return await SubCategory.create({
    ...subCategory,
    name: subCategory.name.trim(),
    slug,
  });
};

const updateSubCategoryIntoDB = async (
  id: string,
  payload: Partial<TSubCategory>,
) => {
  const isExist = await SubCategory.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Sub-category not found');

  return await SubCategory.findByIdAndUpdate(
    id,
    {
      ...payload,
      ...(payload.name && { name: payload.name.trim() }),
      ...(payload.slug && { slug: payload.slug.trim().toLowerCase() }),
    },
    { new: true, runValidators: true },
  );
};

const deleteSubCategoryFromDB = async (id: string) => {
  const isExist = await SubCategory.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Sub-category not found');

  return await SubCategory.findByIdAndDelete(id);
};

// ================= Exports =================

export const categoryService = {
  // Main Category
  createMainCategoryIntoDB,
  getAllMainCategoryFromDB,
  getMainCategoryByIdFromDB,
  updateMainCategoryIntoDB,
  deleteMainCategoryFromDB,

  // Category
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoBD,
  deleteCategoryFromDB,

  // Sub Category
  createSubCategoryIntoDB,
  getAllSubCategoryFromDB,
  getSingleSubCategoryFromDB,
  updateSubCategoryIntoDB,
  deleteSubCategoryFromDB,
};
