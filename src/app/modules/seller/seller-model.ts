import { model, Schema } from 'mongoose';
import { TSeller } from './seller-interface';
import { gender } from '../stake-holder/stakeholder-constant';
import slugify from 'slugify';

const sellerSchema = new Schema<TSeller>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    nid: {
      type: String,
      unique: true,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    dateOfJoining: { type: Date, required: true },
    address: {
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
    },
    bankAccountInfo: {
      type: Schema.Types.ObjectId,
      ref: 'BankAccountInfo',
      required: true,
    },
    profileImageUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
sellerSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// sellerSchema.pre('save', function (next) {
//   if (this.isModified('fullName')) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });

export const Seller = model<TSeller>('Seller', sellerSchema);
