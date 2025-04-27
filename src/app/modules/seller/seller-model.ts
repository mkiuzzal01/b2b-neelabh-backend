import { model, Schema } from 'mongoose';
import { TSeller } from './seller-interface';
import { bankName, paymentMethod } from './seller-constant';
import { gender } from '../stakeholder/stakeholder-constant';

const sellerSchema = new Schema<TSeller>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  paymentMethod: {
    type: String,
    enum: paymentMethod,
    required: true,
  },
  bankName: {
    type: String,
    enum: bankName,
    required: true,
  },
  profileImageUrl: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const Seller = model<TSeller>('Seller', sellerSchema);
