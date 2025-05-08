import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import {
  Category,
  MainCategory,
  SubCategory,
} from '../category/category.model';
import mongoose from 'mongoose';
import { ProductVariant } from '../product-variant/product-variant-model';

const createProductIntoBD = async (payload: TProduct, creatorId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isExitsProduct = await Product.findOne({
      productCode: payload.productCode,
    });

    if (isExitsProduct) {
      throw new AppError(status.CONFLICT, 'The products code already exits');
    }

    const isExistMainCategory = await MainCategory.findById({
      _id: payload.categories.mainCategory,
    });

    if (!isExistMainCategory) {
      throw new AppError(status.NOT_FOUND, 'The main category not found');
    }

    const isExistCategory = await Category.findById({
      _id: payload.categories.category,
    });
    if (!isExistCategory) {
      throw new AppError(status.NOT_FOUND, 'The category not found');
    }

    const isExitsSubCategory = await SubCategory.findById({
      _id: payload.categories.subCategory,
    });

    if (!isExitsSubCategory) {
      throw new AppError(status.NOT_FOUND, 'The sub category not found');
    }

    //create or update variant:
    for (const variant of payload.variants) {
      const variantName = variant.name.toLowerCase();

      // Normalize attribute values
      const incomingAttributes = variant.attributes.map((attr) => ({
        value: attr.value.toLowerCase(),
      }));

      const existing = await ProductVariant.findOne({ name: variantName });

      if (existing) {
        const existingValues = existing.attributes.map((attr) => attr.value);
        const newAttributes = incomingAttributes.filter(
          (attr) => !existingValues.includes(attr.value),
        );

        if (newAttributes.length > 0) {
          await ProductVariant.updateOne(
            { name: variantName },
            {
              $addToSet: {
                attributes: { $each: newAttributes },
              },
            },
          );
        }
      } else {
        // Create new variant
        await ProductVariant.create({
          name: variantName,
          attributes: incomingAttributes,
        });
      }
    }

    payload.creatorId = new mongoose.Types.ObjectId(creatorId);

    const newProduct = await Product.create([payload], { session });
    if (!newProduct.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create product');
    }

    await session.commitTransaction();
    session.endSession();

    return newProduct[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

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
  await Product.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return null;
};

export const productService = {
  createProductIntoBD,
  updateProductIntoBD,
  getAllProductFromBD,
  getSingleProductFromDB,
  deleteProductFromDB,
};
