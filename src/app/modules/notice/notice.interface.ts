import { Types } from 'mongoose';

export type TNotice = {
  creatorId: Types.ObjectId;
  title: string;
  subTitle: string;
  description: string;
};
