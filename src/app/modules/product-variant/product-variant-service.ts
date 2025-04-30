/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ProductVariant } from './product-variant-model';
import { TProductVariant } from './product-variant.interface';

//get the all  product info:
const gelAllProductVariantFromDB = async () => {
  const result = await ProductVariant.find();
  return result;
};

//get the single product info:
const getSingleProductVariantFromDB = async (id: string) => {
  const result = await ProductVariant.findById(id);
  return result;
};

//create the product variant:
const createProductVariantIntoDB = async (payload: TProductVariant) => {
  const isExist = await ProductVariant.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(status.BAD_REQUEST, 'The product variant already exist');
  }

  const result = await ProductVariant.create(payload);
  return result;
};

//update the product variant:
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
      attr.value.toLocaleLowerCase(),
    );

    const newAttributes = payload.attributes
      .map((attr) => attr.value.trim().toLowerCase())
      .filter((attr) => !existingAttributes.includes(attr))
      .map((attr) => ({ value: attr }));

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

//delete the product:
const deleteSingleProductVariantFromDB = async (
  id: string,
  payload: Partial<TProductVariant>,
) => {
  const existingVariant = await ProductVariant.findById(id);
  if (!existingVariant) {
    throw new AppError(status.NOT_FOUND, 'Product variant not found');
  }

  if (payload.name && payload.name.trim() !== '') {
    const deletedVariant = await ProductVariant.findByIdAndDelete(id);
    return deletedVariant;
  }

  if (payload.attributes && payload.attributes.length > 0) {
    const attributeValuesToDelete = payload.attributes.map((attr) =>
      attr.value.trim().toLowerCase(),
    );

    await ProductVariant.updateOne(
      { _id: id },
      {
        $pull: {
          attributes: {
            value: { $in: attributeValuesToDelete },
          },
        },
      },
    );
  }

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
