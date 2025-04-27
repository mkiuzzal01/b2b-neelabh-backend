import { model, Schema } from 'mongoose';
import { TAdmin } from './stakeholder-interface';
import { gender } from './stakeholder-constant';

const stakeholderSchema = new Schema<TAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, required: false },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nid: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
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
    profileImageUrl: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Stakeholder = model<TAdmin>('Stakeholder', stakeholderSchema);
