import { Schema, model } from 'mongoose';
import { TRequisition } from './requisition.interface';
import { requisitionStatus, requisitionType } from './requisition.constant';
import slugify from 'slugify';

const requisitionSchema = new Schema<TRequisition>(
  {
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String },
    subTitle: { type: String },
    type: {
      type: String,
      required: true,
      enum: requisitionType,
    },
    stats: {
      type: String,
      enum: requisitionStatus,
      default: 'pending',
    },
  },
  { timestamps: true },
);

requisitionSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Requisition = model<TRequisition>(
  'Requisition',
  requisitionSchema,
);
