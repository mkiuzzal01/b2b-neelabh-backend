import { model, Schema } from 'mongoose';
import { TNotice } from './notice.interface';
import slugify from 'slugify';

const NoticeSchema = new Schema<TNotice>(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

NoticeSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Notice = model<TNotice>('Notice', NoticeSchema);
