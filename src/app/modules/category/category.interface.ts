import { Types } from 'mongoose';

export interface TSubCategory {
  name: string;
  slug?: string;
}

export interface TCategory {
  name: string;
  slug?: string;
  subCategory: Types.ObjectId;
  mainCategory: Types.ObjectId;
  isActive?: boolean;
}

export interface TMainCategory {
  name: string;
  image?: string;
  slug?: string;
  category?: Types.ObjectId;
}
