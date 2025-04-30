/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ProductVariant } from './product-variant-model';
import { TProductVariant } from './product-variant.interface';

const createProductVariantIntoDB = async (payload: TProductVariant) => {
  const isExist = await ProductVariant.findOne({ name: payload.name });
  if (!isExist) {
    throw new AppError(status.BAD_REQUEST, 'The product variant already exist');
  }
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
): Promise<TProductVariant | null> => {
  const existingVariant = await ProductVariant.findById(id);

  if (!existingVariant) {
    throw new AppError(
      status.NOT_FOUND,
      `Product Variant with ID ${id} not found`,
    );
  }

  const updateQuery: any = {};

  // Update name
  if (payload.name && payload.name.trim() !== '') {
    updateQuery.name = payload.name.trim().toLowerCase();
  }

  // Add new attributes
  if (payload.attributes && payload.attributes.length > 0) {
    const existingAttributes = existingVariant.attributes.map((attr) =>
      attr.toLowerCase(),
    );

    const newAttributes = payload.attributes
      .map((attr) => attr.trim().toLowerCase())
      .filter((attr) => !existingAttributes.includes(attr));

    if (newAttributes.length > 0) {
      updateQuery.$addToSet = {
        attributes: { $each: newAttributes },
      };
    }
  }

  const updatedVariant = await ProductVariant.findByIdAndUpdate(
    id,
    updateQuery,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedVariant;
};

const deleteSingleProductVariantFromDB = async (
  id: string,
  data: Partial<TProductVariant>,
) => {
  const existingVariant = await ProductVariant.findById(id);
  if (!existingVariant) {
    throw new AppError(status.NOT_FOUND, 'Product variant not found');
  }

  //If name is not empty, delete the whole variant
  if (data.name && data.name.trim() !== '') {
    const deletedVariant = await ProductVariant.findByIdAndDelete(id);
    return deletedVariant;
  }

  //If name is empty, only delete matching attributes
  if (data.attributes && data.attributes.length > 0) {
    await ProductVariant.updateOne(
      { _id: id },
      {
        $pull: {
          attributes: { $in: data.attributes },
        },
      },
    );
  }

  // Return the updated document
  const updatedVariant = await ProductVariant.findById(id);
  return updatedVariant;
};

export const ProductVariantService = {
  createProductVariantIntoDB,
  gelAllProductVariantFromDB,
  getSingleProductVariantFromDB,
  updateSingleProductVariantIntoDB,
  deleteSingleProductVariantFromDB,
};
