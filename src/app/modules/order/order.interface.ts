import { Types } from 'mongoose';
import { TProductVariant } from '../product/product.interface';
import { TOrderStatus } from '../../interface/TOrderStatus';
import { TPaymentStatus } from '../../interface/TPaymentStatus';

export type deliveryAddress = {
  division: string;
  district: string;
  sub_district: string;
  localArea: string;
};

export type TOrder = {
  productId: Types.ObjectId;
  sellerId: Types.ObjectId;
  orderVariant: TProductVariant[];
  deliveryAddress: deliveryAddress;
  totalPrice: number;
  orderStatus: TOrderStatus;
  transactionId?: string;
  referenceCode?: string;
  sellerProfit?: number;
  paymentStatus: TPaymentStatus;
};
