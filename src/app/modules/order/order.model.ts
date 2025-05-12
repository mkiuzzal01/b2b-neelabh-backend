import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import { orderStatus, paymentStatus } from './order.constant';

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
    totalPrice: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
      enum: orderStatus,
      default: 'PENDING',
    },
    transactionId: {
      type: String,
    },
    referenceCode: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: paymentStatus,
      default: 'IN-COMPLETE',
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', function (next) {
  this.orderVariant = this.orderVariant.map((variant) => ({
    ...variant,
    name: variant.name.toLowerCase(),
    attributes: variant.attributes.map((attr) => ({
      ...attr,
      value: attr.value.toLowerCase(),
    })),
  }));
  next();
});

export const Order = model<TOrder>('Order', orderSchema);
