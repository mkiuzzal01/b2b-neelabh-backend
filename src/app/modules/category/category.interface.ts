import { Types } from 'mongoose';

export interface TSubCategory {
  name: string;
  slug?: string;
}

export interface TCategory {
  name: string;
  slug?: string;
}

export interface TMainCategory {
  name: string;
  image?: string;
  category: Types.ObjectId[];
  subCategory?: Types.ObjectId[];
  slug?: string;
  isActive?: boolean;
}
