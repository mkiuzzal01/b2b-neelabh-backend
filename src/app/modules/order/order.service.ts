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
  const isExistProduct = await Product.findById(payload.productId);

  if (!isExistProduct) {
    throw new AppError(status.NOT_FOUND, 'The product not found');
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
    throw new AppError(status.NOT_MODIFIED, 'The order already precessed');
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
};

export const orderService = {
  allOrderFromDB,
  singleOrderFromDB,
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderFromDB,
};
