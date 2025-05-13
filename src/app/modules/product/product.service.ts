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
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableField } from './product.constant';

const createProductIntoBD = async (payload: TProduct, creatorId: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      const [existingProduct, mainCat, cat, subCat] = await Promise.all([
        Product.findOne({ productCode: payload.productCode }).session(session),
        MainCategory.findById(payload.categories.mainCategory).session(session),
        Category.findById(payload.categories.category).session(session),
        SubCategory.findById(payload.categories.subCategory).session(session),
      ]);

      if (existingProduct) {
        throw new AppError(status.CONFLICT, 'Product code already exists');
      }
      if (!mainCat) {
        throw new AppError(status.NOT_FOUND, 'Main category not found');
      }
      if (!cat) {
        throw new AppError(status.NOT_FOUND, 'Category not found');
      }
      if (!subCat) {
        throw new AppError(status.NOT_FOUND, 'Sub-category not found');
      }

      const sumOfVariants = payload.variants.reduce(
        (sum, v) =>
          sum + v.attributes.reduce((s2, attr) => s2 + (attr.quantity ?? 0), 0),
        0,
      );

      if (sumOfVariants !== payload.totalQuantity) {
        throw new AppError(
          status.BAD_REQUEST,
          'The product variant and quantities not equal',
        );
      }

      const bulkOps = payload.variants.map((variant) => {
        const name = variant.name.toLowerCase();
        const attrs = variant.attributes.map((a) => ({
          value: a.value.toLowerCase(),
        }));

        return {
          updateOne: {
            filter: { name },
            update: {
              $setOnInsert: { name },
              $addToSet: { attributes: { $each: attrs } },
            },
            upsert: true,
          },
        };
      });

      if (bulkOps.length) {
        await ProductVariant.bulkWrite(bulkOps, { session });
      }

      const product = new Product({
        ...payload,
        creatorId: new mongoose.Types.ObjectId(creatorId),
      });
      await product.save({ session });

      return product;
    });
  } finally {
    session.endSession();
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

  if (payload.variants && payload.totalQuantity) {
    const sumOfVariants = payload.variants.reduce(
      (sum, v) =>
        sum + v.attributes.reduce((s2, attr) => s2 + (attr.quantity ?? 0), 0),
      0,
    );

    if (sumOfVariants !== payload.totalQuantity) {
      throw new AppError(
        status.BAD_REQUEST,
        'The product variant and quantities not equal',
      );
    }
  }

  const result = await Product.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getAllProductFromBD = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find().populate([
      { path: 'categories.mainCategory' },
      { path: 'categories.category' },
      { path: 'categories.subCategory' },
    ]),
    query,
  )
    .search(productSearchableField)
    .fields()
    .filter()
    .paginate()
    .sort();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;
  return { meta, result };
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
