import { Types } from 'mongoose';
import { TRequisitionType } from '../../interface/TRequisitionType';
import { TRequisitionStatus } from '../../interface/TRequisitionStatus';

export type TRequisition = {
  creatorId: Types.ObjectId;
  title: string;
  slug?: string;
  subTitle: string;
  type: TRequisitionType;
  description: string;
  stats?: TRequisitionStatus;
  feedbackId?: Types.ObjectId;
};

export type TFeedback = {
  creatorId: Types.ObjectId;
  requisitionId: Types.ObjectId;
  description: string;
};
