/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from './order.model';
import { TOrder } from './order.interface';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Product } from '../product/product.model';
import { allowedStatusTransitions } from './order.constant';

const allOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

const singleOrderFromDB = async (id: string) => {
  const result = await Order.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The order  not found');
  }
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
      attrMap.set(attr.value.trim().toLowerCase(), attr.quantity ?? 0);
    }
    variantMap.set(variant.name.trim().toLowerCase(), attrMap);
  }

  let totalOrderedQuantity = 0;

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

      totalOrderedQuantity += attr.quantity;
    }
  }

  const basePrice = product.price;
  const discount = product.discount || 0;
  const discountedPrice = basePrice - (basePrice * discount) / 100;
  const totalPrice = Number(
    (discountedPrice * totalOrderedQuantity).toFixed(2),
  );

  payload.sellerId = new mongoose.Types.ObjectId(sellerId);
  payload.totalPrice = totalPrice;

  const result = await Order.create(payload);
  return result;
};

const updateOrderIntoDB = async (payload: Partial<TOrder>, id: string) => {
  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  if (existingOrder.orderStatus !== 'PENDING') {
    throw new AppError(
      status.NOT_IMPLEMENTED,
      'Order has already been processed',
    );
  }

  const product = await Product.findById(existingOrder.productId);
  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Associated product not found');
  }

  let totalOrderedQuantity = 0;
  if (payload.orderVariant) {
    // Sort and standardize variants
    const sortedVariants = payload.orderVariant
      .map((variant) => ({
        name: variant.name.trim(),
        attributes: variant.attributes
          .map((attr) => ({
            value: attr.value.trim(),
            quantity: attr.quantity,
          }))
          .sort((a, b) => a.value.localeCompare(b.value)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    payload.orderVariant = sortedVariants;

    // Create a variant availability map from product
    const variantMap = new Map<string, Map<string, number>>();

    for (const variant of product.variants) {
      const attrMap = new Map<string, number>();
      for (const attr of variant.attributes) {
        attrMap.set(attr.value.toLowerCase(), attr.quantity ?? 0);
      }
      variantMap.set(variant.name.toLowerCase(), attrMap);
    }

    // Validate and calculate total quantity
    for (const orderVariant of sortedVariants) {
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

        totalOrderedQuantity += attr.quantity;
      }
    }
  }

  // Recalculate price if quantity was updated
  if (payload.orderVariant || totalOrderedQuantity > 0) {
    const basePrice = product.price;
    const discount = product.discount || 0;
    const discountedPrice = basePrice - (basePrice * discount) / 100;
    const totalPrice = Number(
      (discountedPrice * totalOrderedQuantity).toFixed(2),
    );
    payload.totalPrice = totalPrice;
  }

  const updatedOrder = await Order.findByIdAndUpdate(payload, {
    new: true,
    runValidators: true,
  });

  return updatedOrder;
};

const changeStatusOfOrderIntoDB = async (
  payload: Partial<TOrder>,
  id: string,
) => {
  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }
  if (
    payload.orderStatus &&
    payload.orderStatus !== existingOrder.orderStatus
  ) {
    const allowedNextStatuses =
      allowedStatusTransitions[existingOrder.orderStatus];

    if (!allowedNextStatuses.includes(payload.orderStatus)) {
      throw new AppError(
        status.BAD_REQUEST,
        `Invalid status transition from "${existingOrder.orderStatus}" to "${payload.orderStatus}"`,
      );
    }
  }
  const result = await Order.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const sellerPaymentIntoDB = async (payload: Partial<TOrder>, id: string) => {
  const existingOrder = await Order.findById(id).populate('productId');

  if (!existingOrder) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  if (existingOrder.orderStatus !== 'DELIVERED') {
    throw new AppError(
      status.BAD_REQUEST,
      'Product has not been delivered yet',
    );
  }

  if (existingOrder.paymentStatus === 'COMPLETED') {
    throw new AppError(
      status.BAD_REQUEST,
      'This product seller payment already complete',
    );
  }

  const percentageForSeller =
    (existingOrder.productId as any).parentageForSeller ?? 0;

  if (typeof percentageForSeller !== 'number' || percentageForSeller <= 0) {
    throw new AppError(status.BAD_REQUEST, 'Invalid seller percentage');
  }

  const sellerProfit = Math.round(
    (existingOrder.totalPrice * percentageForSeller) / 100,
  );

  payload.referenceCode = existingOrder.referenceCode;
  payload.transactionId = existingOrder.transactionId;
  payload.paymentStatus = existingOrder.paymentStatus;
  payload.sellerProfit = sellerProfit;

  const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedOrder;
};

const deleteOrderFromDB = async (id: string) => {
  const isExistOrder = await Order.findById(id);
  if (!isExistOrder) {
    throw new AppError(status.NOT_FOUND, 'The order  not found');
  }
  if (isExistOrder.orderStatus != 'PENDING') {
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
  changeStatusOfOrderIntoDB,
  sellerPaymentIntoDB,
  deleteOrderFromDB,
};
