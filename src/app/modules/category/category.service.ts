import status from 'http-status';
import AppError from '../../errors/AppError';
import { Category, MainCategory, SubCategory } from './category.model';
import { TCategory, TMainCategory, TSubCategory } from './category.interface';
import { startSession, Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  mainCategorySearchableField,
  subCategorySearchableField,
} from './category.constant';

// ================= Main Category =================

const getAllMainCategoryFromDB = async (query: Record<string, unknown>) => {
  const mainCategoryQuery = new QueryBuilder(MainCategory.find(), query)
    .search(mainCategorySearchableField)
    .filter()
    .paginate();

  const meta = await mainCategoryQuery.countTotal();
  const result = await mainCategoryQuery.modelQuery
    .populate('category')
    .populate('subCategory'); // ✅ include subCategory

  return { meta, result };
};

const singleMainCategoryFromDB = async (slug: string) => {
  const result = await MainCategory.findOne({ slug })
    .populate('category')
    .populate('subCategory'); // ✅ include subCategory
  if (!result) throw new AppError(status.NOT_FOUND, 'Main category not found');
  return result;
};

const createMainCategoryIntoDB = async (payload: TMainCategory) => {
  const isExist = await MainCategory.findOne({
    name: payload.name.toLocaleLowerCase(),
  });
  if (isExist)
    throw new AppError(status.CONFLICT, 'Main category already exists');

  // Validate category IDs
  const categoryIds = payload.category || [];
  for (const catId of categoryIds) {
    const found = await Category.findById(catId);
    if (!found) {
      throw new AppError(
        status.NOT_FOUND,
        `Category not found for ID: ${catId}`,
      );
    }
  }

  // ✅ Validate subCategory IDs
  const subCategoryIds = payload.subCategory || [];
  for (const subId of subCategoryIds) {
    const found = await SubCategory.findById(subId);
    if (!found) {
      throw new AppError(
        status.NOT_FOUND,
        `Sub-category not found for ID: ${subId}`,
      );
    }
  }

  return await MainCategory.create({
    ...payload,
    name: payload.name.trim().toLocaleLowerCase(),
  });
};

const updateMainCategoryIntoDB = async (
  slug: string,
  payload: Partial<TMainCategory>,
) => {
  const isExist = await MainCategory.findOne({ slug });
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Main category not found');

  // Validate new category IDs if provided
  if (payload.category?.length) {
    for (const catId of payload.category) {
      const found = await Category.findById(catId);
      if (!found) {
        throw new AppError(
          status.NOT_FOUND,
          `Category not found for ID: ${catId}`,
        );
      }
    }
  }

  // ✅ Validate new subCategory IDs if provided
  if (payload.subCategory?.length) {
    for (const subId of payload.subCategory) {
      const found = await SubCategory.findById(subId);
      if (!found) {
        throw new AppError(
          status.NOT_FOUND,
          `Sub-category not found for ID: ${subId}`,
        );
      }
    }
  }

  const result = await MainCategory.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteMainCategoryFromDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);
  const exists = await MainCategory.findById(objectId);
  if (!exists) {
    throw new AppError(status.NOT_FOUND, 'Main category not found');
  }

  await MainCategory.deleteOne({ _id: objectId });

  return null;
};

// ================= Category =================

const getAllCategoryFromDB = async () => {
  return await Category.find();
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  if (!result) throw new AppError(status.NOT_FOUND, 'Category not found');
  return result;
};

const createCategoryIntoDB = async (payload: TCategory) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const isExist = await Category.findOne({
      name: payload.name.toLocaleLowerCase(),
    }).session(session);

    if (isExist) throw new AppError(status.CONFLICT, 'Category already exists');

    const newCategory = await Category.create(
      [
        {
          ...payload,
          name: payload.name.trim().toLocaleLowerCase(),
        },
      ],
      { session },
    );

    if (!newCategory?.length) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Failed to create category',
      );
    }

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
  slug: string,
  payload: Partial<TCategory>,
) => {
  const isExist = await Category.findOne({ slug });
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Category not found');

  return await Category.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteCategoryFromDB = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Category not found');

  // Remove reference from MainCategory
  await MainCategory.updateMany({ category: id }, { $pull: { category: id } });

  await Category.deleteOne({ _id: id });
  return null;
};

// ================= Sub Category =================

const getAllSubCategoryFromDB = async (query: Record<string, unknown>) => {
  const subCategoryQuery = new QueryBuilder(SubCategory.find(), query)
    .search(subCategorySearchableField)
    .filter()
    .paginate();
  const meta = await subCategoryQuery.countTotal();
  const result = await subCategoryQuery.modelQuery;
  return { meta, result };
};

const getSingleSubCategoryFromDB = async (slug: string) => {
  const result = await SubCategory.findOne({ slug });
  if (!result) throw new AppError(status.NOT_FOUND, 'Sub-category not found');
  return result;
};

const createSubCategoryIntoDB = async (payload: TSubCategory) => {
  const isExist = await SubCategory.findOne({ name: payload.name });
  if (isExist)
    throw new AppError(status.CONFLICT, 'Sub-category already exists');

  return await SubCategory.create({
    ...payload,
    name: payload.name.trim().toLocaleLowerCase(),
  });
};

const updateSubCategoryIntoDB = async (
  slug: string,
  payload: Partial<TSubCategory>,
) => {
  const isExist = await SubCategory.findOne({ slug });
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Sub-category not found');

  return await SubCategory.findOneAndUpdate({ slug }, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteSubCategoryFromDB = async (slug: string) => {
  const isExist = await SubCategory.findOne({ slug });
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Sub-category not found');
  await SubCategory.findOneAndDelete({ slug });
  return null;
};

// ================= Exports =================

export const categoryService = {
  // Main Category
  createMainCategoryIntoDB,
  getAllMainCategoryFromDB,
  singleMainCategoryFromDB,
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
