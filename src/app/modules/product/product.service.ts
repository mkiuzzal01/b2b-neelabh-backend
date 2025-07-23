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
import { ProductVariant } from '../product-variant/product-variant.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableField } from './product.constant';

const createProductIntoBD = async (payload: TProduct, creatorId: string) => {
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      const { productCode, categories, variants, totalQuantity } = payload;

      // Validate required fields
      if (!variants || variants.length === 0) {
        throw new AppError(
          status.BAD_REQUEST,
          'At least one variant is required',
        );
      }

      // Check if product code exists
      const existingProduct = await Product.findOne({ productCode }).session(
        session,
      );
      if (existingProduct) {
        throw new AppError(status.CONFLICT, 'Product code already exists');
      }

      // Validate categories
      const [mainCat, cat, subCat] = await Promise.all([
        MainCategory.findById(categories.mainCategory).session(session),
        Category.findById(categories.category).session(session),
        SubCategory.findById(categories.subCategory).session(session),
      ]);

      if (!mainCat) {
        throw new AppError(status.NOT_FOUND, 'Main category not found');
      }
      if (!cat) {
        throw new AppError(status.NOT_FOUND, 'Category not found');
      }
      if (!subCat) {
        throw new AppError(status.NOT_FOUND, 'Sub-category not found');
      }

      // Calculate sum of all variant quantities
      const calculatedTotalQuantity = variants.reduce((sum, variant) => {
        return (
          sum +
          variant.attributes.reduce((acc, attr) => {
            const qty = Number(attr.quantity);
            if (isNaN(qty) || qty < 0) {
              throw new AppError(
                status.BAD_REQUEST,
                `Invalid quantity "${attr.quantity}" in variant "${variant.name}"`,
              );
            }
            return acc + qty;
          }, 0)
        );
      }, 0);

      // Validate total quantity matches sum of variants
      if (
        totalQuantity !== undefined &&
        totalQuantity !== calculatedTotalQuantity
      ) {
        throw new AppError(
          status.BAD_REQUEST,
          `Total quantity (${totalQuantity}) does not match sum of variant quantities (${calculatedTotalQuantity})`,
        );
      }

      // Update or create product variants
      const bulkVariantOps = variants.map((variant) => ({
        updateOne: {
          filter: { name: variant.name.toLowerCase() },
          update: {
            $setOnInsert: { name: variant.name.toLowerCase() },
            $addToSet: {
              attributes: {
                $each: variant.attributes.map((a) => ({
                  value: a.value.toLowerCase(),
                })),
              },
            },
          },
          upsert: true,
        },
      }));

      if (bulkVariantOps.length > 0) {
        await ProductVariant.bulkWrite(bulkVariantOps, { session });
      }

      // Create the product with calculated total quantity
      const product = new Product({
        ...payload,
        totalQuantity: calculatedTotalQuantity, // Use calculated value
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
  const session = await mongoose.startSession();

  try {
    return await session.withTransaction(async () => {
      const existingProduct = await Product.findById(id).session(session);
      if (!existingProduct) {
        throw new AppError(status.NOT_FOUND, 'Product not found');
      }

      // Validate categories if they're being updated
      if (payload.categories) {
        const [mainCat, cat, subCat] = await Promise.all([
          MainCategory.findById(payload.categories.mainCategory).session(
            session,
          ),
          Category.findById(payload.categories.category).session(session),
          SubCategory.findById(payload.categories.subCategory).session(session),
        ]);

        if (!mainCat) {
          throw new AppError(status.NOT_FOUND, 'Main category not found');
        }
        if (!cat) {
          throw new AppError(status.NOT_FOUND, 'Category not found');
        }
        if (!subCat) {
          throw new AppError(status.NOT_FOUND, 'Sub-category not found');
        }
      }

      // Validate variants and quantities if they're being updated
      if (payload.variants) {
        const calculatedTotalQuantity = payload.variants.reduce(
          (sum, variant) => {
            return (
              sum +
              variant.attributes.reduce((acc, attr) => {
                const qty = Number(attr.quantity);
                if (isNaN(qty) || qty < 0) {
                  throw new AppError(
                    status.BAD_REQUEST,
                    `Invalid quantity "${attr.quantity}" in variant "${variant.name}"`,
                  );
                }
                return acc + qty;
              }, 0)
            );
          },
          0,
        );

        // If totalQuantity is provided, validate it matches the sum
        if (
          payload.totalQuantity !== undefined &&
          payload.totalQuantity !== calculatedTotalQuantity
        ) {
          throw new AppError(
            status.BAD_REQUEST,
            `Total quantity (${payload.totalQuantity}) does not match sum of variant quantities (${calculatedTotalQuantity})`,
          );
        }

        // Update the totalQuantity in payload to ensure consistency
        payload.totalQuantity = calculatedTotalQuantity;

        // Update product variants
        const bulkVariantOps = payload.variants.map((variant) => ({
          updateOne: {
            filter: { name: variant.name.toLowerCase() },
            update: {
              $setOnInsert: { name: variant.name.toLowerCase() },
              $addToSet: {
                attributes: {
                  $each: variant.attributes.map((a) => ({
                    value: a.value.toLowerCase(),
                  })),
                },
              },
            },
            upsert: true,
          },
        }));

        if (bulkVariantOps.length > 0) {
          await ProductVariant.bulkWrite(bulkVariantOps, { session });
        }
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
        session,
      });

      return updatedProduct;
    });
  } finally {
    session.endSession();
  }
};

const allProductFromBD = async (query: Record<string, unknown>) => {
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

const singleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate([
    { path: 'categories.mainCategory' },
    { path: 'categories.category' },
    { path: 'categories.subCategory' },
    { path: 'Photo' },
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
  allProductFromBD,
  singleProductFromDB,
  deleteProductFromDB,
};
