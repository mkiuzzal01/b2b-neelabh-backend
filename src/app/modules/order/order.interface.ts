import { Types } from 'mongoose';
import { TProductVariant } from '../product/product.interface';
import { TOrderStatus } from '../../interface/TOrderStatus';
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
  status: TOrderStatus;
};
