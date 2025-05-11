/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from './order.model';
import { TOrder } from './order.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Product } from '../product/product.model';

const allOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

const singleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  return result;
};

const createOrderIntoDB = async (payload: TOrder, sellerId: string) => {
  const product = await Product.findById(payload.productId);

  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Product not found');
  }

  const variantMap = new Map<string, Map<string, number>>();

  for (const variant of product.variants) {
    const attrMap = new Map<string, number>();
    for (const attr of variant.attributes) {
      attrMap.set(attr.value.toLowerCase(), attr.quantity);
    }
    variantMap.set(variant.name.toLowerCase(), attrMap);
  }

  for (const orderVariant of payload.orderVariant) {
    const variantName = orderVariant.name.toLowerCase();
    const productAttrMap = variantMap.get(variantName);

    if (!productAttrMap) {
      throw new AppError(
        status.BAD_REQUEST,
        `Variant "${orderVariant.name}" not found in product`,
      );
    }

    for (const attr of orderVariant.attributes) {
      const attrValue = attr.value.toLowerCase();
      const availableQty = productAttrMap.get(attrValue);

      if (availableQty === undefined) {
        throw new AppError(
          status.BAD_REQUEST,
          `Value "${attr.value}" not found in variant "${orderVariant.name}"`,
        );
      }

      if (availableQty < attr.quantity) {
        throw new AppError(
          status.BAD_REQUEST,
          `Insufficient quantity for "${attr.value}" in "${orderVariant.name}". Available: ${availableQty}, Requested: ${attr.quantity}`,
        );
      }
    }
  }

  payload.sellerId = new mongoose.Types.ObjectId(sellerId);

  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (payload: Partial<TOrder>, id: string) => {
  const isExistOrder = await Order.findById(id);
  if (!isExistOrder) {
    throw new AppError(status.NOT_FOUND, 'The order  not found');
  }
  if (isExistOrder.status != 'PENDING') {
    throw new AppError(status.NOT_IMPLEMENTED, 'The order already precessed');
  }

  const result = await Order.findByIdAndUpdate(isExistOrder._id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOrderFromDB = async (id: string) => {
  const isExistOrder = await Order.findById(id);
  if (!isExistOrder) {
    throw new AppError(status.NOT_FOUND, 'The order  not found');
  }
  if (isExistOrder.status != 'PENDING') {
    throw new AppError(
      status.NOT_MODIFIED,
      'The order already precessed. so it is not delete',
    );
  }

  await Order.findByIdAndDelete(id);
  return null;
};

export const orderService = {
  allOrderFromDB,
  singleOrderFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
