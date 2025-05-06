import { Types } from 'mongoose';
import { TRequisitionType } from '../../interface/TRequisitionType';
import { TRequisitionStatus } from '../../interface/TRequisitionStatus';

export type TRequisition = {
  creatorId: Types.ObjectId;
  title: string;
  slug?: string;
  subTitle: string;
  type: TRequisitionType;
  stats?: TRequisitionStatus;
};
