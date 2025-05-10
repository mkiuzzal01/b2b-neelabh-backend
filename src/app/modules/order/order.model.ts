import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderVariant: [
      {
        name: { type: String, required: true },
        attributes: [
          {
            value: { type: String, required: true },
            quantity: { type: Number, required: true },
            _id: false,
          },
        ],
        _id: false,
      },
    ],
    deliveryAddress: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      sub_district: { type: String, required: true },
      localArea: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        'PENDING',
        'PROCESSING',
        'READY_FOR_PICKUP',
        'DISPATCHED',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'DELIVERY_FAILED',
        'RETURN_REQUESTED',
        'RETURNED',
        'CANCELLED',
      ],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
