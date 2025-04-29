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
  const result = await ProductVariant.findByIdAndUpdate(id, {
    payload,
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
