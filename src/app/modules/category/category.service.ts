import status from 'http-status';
import AppError from '../../errors/AppError';
import { Category, MainCategory, SubCategory } from './category.model';
import { TCategory, TMainCategory, TSubCategory } from './category.interface';
import { startSession, Types } from 'mongoose';
import slugify from 'slugify';

// ================= Main Category =================

const getAllMainCategoryFromDB = async () => {
  const result = await MainCategory.find().populate('category');
  return result;
};

const getMainCategoryByIdFromDB = async (id: string) => {
  const result = await MainCategory.findById(id).populate('category');
  if (!result) throw new AppError(status.NOT_FOUND, 'Main category not found');
  return result;
};

const createMainCategoryIntoDB = async (payload: TMainCategory) => {
  const isExist = await MainCategory.findOne({
    name: payload.name.toLocaleLowerCase(),
  });
  if (isExist)
    throw new AppError(status.CONFLICT, 'Main category already exists');

  return await MainCategory.create({
    ...payload,
    name: payload.name.trim().toLocaleLowerCase(),
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
      name: payload.name?.toLocaleLowerCase(),
      slug: slugify(payload.name as string, { lower: true, strict: true }),
    },
    { new: true, runValidators: true },
  );
};

const deleteMainCategoryFromDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);

  const exists = await MainCategory.findById(objectId);
  if (!exists) {
    throw new AppError(status.NOT_FOUND, 'Main category not found');
  }

  // Safely remove the reference
  await Category.updateMany(
    { mainCategory: objectId },
    { $set: { mainCategory: null } },
  );

  await MainCategory.deleteOne({ _id: objectId });

  return null;
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

    const isExist = await Category.findOne({
      name: payload.name.toLocaleLowerCase(),
    }).session(session);

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
      isExistMainCategory._id,
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
      name: payload.name?.toLocaleLowerCase(),
      slug: slugify(payload.name as string, { lower: true, strict: true }),
    },
    { new: true, runValidators: true },
  );
};

const deleteCategoryFromDB = async (id: string) => {
  const isExist = await Category.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Category not found');

  //delete main category:
  await MainCategory.findByIdAndUpdate(isExist.mainCategory, {
    $pull: { category: isExist?._id },
  });

  //delete category:
  await Category.deleteOne({ _id: id });
  return null;
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
  id: string,
  payload: Partial<TSubCategory>,
) => {
  const isExist = await SubCategory.findById(id);
  if (!isExist) throw new AppError(status.NOT_FOUND, 'Sub-category not found');

  return await SubCategory.findByIdAndUpdate(
    id,
    {
      ...payload,
      name: payload.name?.trim().toLocaleLowerCase(),
      slug: slugify(payload.name as string, { lower: true, strict: true }),
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
