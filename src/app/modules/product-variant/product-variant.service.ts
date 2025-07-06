/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { ProductVariant } from './product-variant.model';
import { TProductVariant } from './product-variant.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { variantSearchableField } from './product-variant.constant';

const allProductVariantFromDB = async (query: Record<string, unknown>) => {
  const variantQuery = new QueryBuilder(ProductVariant.find().lean(), query)
    .search(variantSearchableField)
    .paginate();

  const meta = await variantQuery.countTotal();
  const result = await variantQuery.modelQuery;

  return { meta, result };
};

const singleProductVariantFromDB = async (slug: string) => {
  const variant = await ProductVariant.findOne({ slug }).lean();
  if (!variant) {
    throw new AppError(status.NOT_FOUND, 'Product Variant not found');
  }
  return variant;
};

const createProductVariantIntoDB = async (payload: TProductVariant) => {
  const isExist = await ProductVariant.findOne({ name: payload.name });

  if (isExist) {
    throw new AppError(
      status.BAD_REQUEST,
      'The product variant already exists',
    );
  }

  const createdVariant = await ProductVariant.create(payload);
  return createdVariant.toObject();
};

const updateSingleProductVariantIntoDB = async (
  slug: string,
  payload: Partial<TProductVariant>,
): Promise<TProductVariant | null> => {
  const existingVariant = await ProductVariant.findOne({ slug });

  if (!existingVariant) {
    throw new AppError(status.NOT_FOUND, 'Product Variant not found');
  }

  const updateQuery: Record<string, any> = {};

  if (payload.name?.trim()) {
    updateQuery.name = payload.name.trim().toLowerCase();
  }

  if (Array.isArray(payload.attributes)) {
    const cleanedAttributes = payload.attributes
      .map((attr) => attr?.value?.trim().toLowerCase())
      .filter(Boolean)
      .map((value) => ({ value }));

    updateQuery.attributes = cleanedAttributes;
  }

  const updatedVariant = await ProductVariant.findOneAndUpdate(
    { slug },
    updateQuery,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedVariant?.toObject?.() ?? updatedVariant;
};

const deleteSingleProductVariantFromDB = async (id: string) => {
  const variant = await ProductVariant.findById(id);
  if (!variant) {
    throw new AppError(status.NOT_FOUND, 'Product Variant not found');
  }

  const deleted = await ProductVariant.findByIdAndDelete(id);
  return deleted?.toObject?.() ?? deleted;
};

export const ProductVariantService = {
  allProductVariantFromDB,
  singleProductVariantFromDB,
  createProductVariantIntoDB,
  updateSingleProductVariantIntoDB,
  deleteSingleProductVariantFromDB,
};
