import { Schema, model } from 'mongoose';
import { TRequisition } from './requisition.interface';
import { requisitionStatus, requisitionType } from './requisition.constant';

const requisitionSchema = new Schema<TRequisition>(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    subTitle: { type: String },
    type: {
      type: String,
      required: true,
      enum: requisitionType,
    },
    stats: {
      type: String,
      required: true,
      enum: requisitionStatus,
    },
  },
  { timestamps: true },
);

export const Requisition = model<TRequisition>(
  'Requisition',
  requisitionSchema,
);
