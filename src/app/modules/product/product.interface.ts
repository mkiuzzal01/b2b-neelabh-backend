import { Types } from 'mongoose';

export type TStatus = 'in-stock' | 'out-of-stock' | 'upcoming';
export type TActivity = 'in-stock' | 'market-launch';

export type TProductVariant = {
  name: string;
  attributes: {
    value: string;
    quantity: number | string;
  }[];
};

export type TCategories = {
  mainCategory: Types.ObjectId;
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
};

export type TProduct = {
  creatorId?: Types.ObjectId;
  productCode: string;
  title: string;
  subTitle?: string;
  totalQuantity: number | string;
  slug?: string;
  variants: TProductVariant[];
  price: number | string;
  discount: number | string;
  parentageForSeller: number | string;
  rating?: number | string;
  categories: TCategories;
  description: string;
  status: TStatus;
  activity: TActivity;
  optionalLinks?: string;
  productImage: Types.ObjectId;
  isDeleted: boolean;
};
