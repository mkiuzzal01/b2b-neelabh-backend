// import status from 'http-status';
// import AppError from '../../errors/AppError';
// import { ProductVariant } from './product-variant.model';
// import { TProductVariants } from './product-variant.interface';

// const createVariantIntoDB = async (payload: TProductVariants) => {
//   // console.log(payload);
//   // const variants = payload.map(variant => ({
//   //   name: variant.name.toLowerCase().trim(),
//   //   values: variant.values.map(v => ({ value: v.value.trim() }))
//   // }));

//   // const existingNames = (await ProductVariant.find({
//   //   name: { $in: variants.map(v => v.name) }
//   // })).map(v => v.name);

//   // if (existingNames.length) {
//   //   throw new AppError(
//   //     status.CONFLICT,
//   //     `These variants already exist: ${existingNames.join(', ')}`
//   //   );
//   // }

//   const result = await ProductVariant.insertMany(payload);

//   return result;
// };

// // const allVariantFromDB = async (query: Record<string, unknown>) => {
// //   return await ProductVariant.find();
// // };

// const getVariantByNameFromDB = async (name: string) => {
//   const variant = await ProductVariant.findOne({
//     name: name.toLowerCase().trim(),
//   });
//   if (!variant) throw new AppError(status.NOT_FOUND, 'Variant not found');
//   return variant;
// };

// // const updateVariantIntoDB = async (
// //   name: string,
// //   payload: Partial<IProductVariant>,
// // ) => {};

// const deleteVariantFromDB = async (name: string) => {
//   const deleted = await ProductVariant.findOneAndDelete({
//     name: name.toLowerCase().trim(),
//   });
//   if (!deleted) throw new AppError(status.NOT_FOUND, 'Variant not found');
//   return deleted;
// };

// export const variantService = {
//   createVariantIntoDB,
//   allVariantFromDB,
//   getVariantByNameFromDB,
//   // updateVariantIntoDB,
//   deleteVariantFromDB,
// };
