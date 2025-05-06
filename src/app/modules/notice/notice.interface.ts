import { Types } from 'mongoose';

export type TNotice = {
  creatorId?: Types.ObjectId;
  title: string;
  slug?: string;
  subTitle: string;
  description: string;
};
