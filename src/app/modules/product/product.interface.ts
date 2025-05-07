import { Types } from 'mongoose';

export type TStatus = 'in-stock' | 'out-of-stock' | 'upcoming';
export type TActivity = 'in-stock' | 'market-launch';

export type TProductVariant = {
  name: string;
  attributes: {
    value: string;
    quantity: number;
  }[];
};

export type TCategories = {
  mainCategory: Types.ObjectId;
  category: Types.ObjectId;
  subCategory: Types.ObjectId;
};

export type TProduct = {
  creatorId?: string;
  productCode: string;
  title: string;
  slug?: string;
  subTitle?: string;
  variants: TProductVariant[];
  price: number;
  discount: number;
  rating?: number;
  categories: TCategories;
  description: string;
  status: TStatus;
  activity: TActivity;
  isDeleted: boolean;
};
