import { model, Schema } from 'mongoose';
import { TAdmin } from './stakeholder-interface';

const stakeholderSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      middleName: { type: String, required: false },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nid: { type: String, required: true },
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
