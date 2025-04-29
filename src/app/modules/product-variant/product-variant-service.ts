/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ProductVariant } from './product-variant-model';
import { TProductVariant } from './product-variant.interface';

const createProductVariantIntoDB = async (payload: TProductVariant) => {
  const result = await ProductVariant.create(payload);
  return result;
};
const gelAllProductVariantFromDB = async () => {
  const result = await ProductVariant.find();
  return result;
};
const getSingleProductVariantFromDB = async (id: string) => {
  const result = await ProductVariant.findById(id);
  return result;
};

const updateSingleProductVariantIntoDB = async (
  id: string,
  payload: Partial<TProductVariant>,
) => {
  // Step 1: Fetch existing document
  const existingVariant = await ProductVariant.findById(id);
  if (!existingVariant) {
    throw new AppError(
      status.BAD_REQUEST,
      `Product Variant with ID ${id} not found`,
    );
  }

  // Step 2: Check if any new attribute already exists
  if (payload.attributes && payload.attributes.length > 0) {
    const duplicates = payload.attributes.filter((attr) =>
      existingVariant.attributes.includes(attr.toLowerCase()),
    );

    if (duplicates.length > 0) {
      throw new AppError(status.BAD_REQUEST, 'Already exists attribute');
    }
  }

  const updateData: any = {};

  if (payload.name) {
    updateData.name = payload.name.toLowerCase();
  }

  if (payload.attributes && payload.attributes.length > 0) {
    updateData.$addToSet = {
      attributes: {
        $each: payload.attributes.map((attr) => attr.toLowerCase()),
      },
    };
  }

  // Perform update
  const result = await ProductVariant.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return result;
};

const deleteSingleProductVariantFromDB = async (id: string) => {
  const result = await ProductVariant.findByIdAndDelete(id);
  return result;
};

export const ProductVariantService = {
  createProductVariantIntoDB,
  gelAllProductVariantFromDB,
  getSingleProductVariantFromDB,
  updateSingleProductVariantIntoDB,
  deleteSingleProductVariantFromDB,
};
