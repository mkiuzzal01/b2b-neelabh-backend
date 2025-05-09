import { Schema, model } from 'mongoose';
import { TFeedback, TRequisition } from './requisition.interface';
import { requisitionStatus, requisitionType } from './requisition.constant';
import slugify from 'slugify';

const requisitionSchema = new Schema<TRequisition>(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String },
    subTitle: { type: String },
    type: {
      type: String,
      required: true,
      enum: requisitionType,
    },
    description: {
      type: String,
    },
    stats: {
      type: String,
      enum: requisitionStatus,
      default: 'pending',
    },
    feedbackId: {
      type: Schema.Types.ObjectId,
      ref: 'Feedback',
    },
  },
  { timestamps: true },
);

requisitionSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    const slugText = this.title + this.subTitle;
    this.slug = slugify(slugText, { lower: true, strict: true });
  }
  next();
});

export const Requisition = model<TRequisition>(
  'Requisition',
  requisitionSchema,
);

const feedBackSchema = new Schema<TFeedback>({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
  requisitionId: { type: Schema.Types.ObjectId, ref: 'Requisition' },
  description: { type: String, required: true },
});

export const Feedback = model<TFeedback>('Feedback', feedBackSchema);
