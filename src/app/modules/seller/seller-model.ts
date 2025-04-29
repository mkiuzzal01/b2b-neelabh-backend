import { model, Schema } from 'mongoose';
import { TBankAccountInfo, TSeller } from './seller-interface';
import { gender } from '../stake-holder/stakeholder-constant';

const sellerSchema = new Schema<TSeller>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: false },
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
});

export const Seller = model<TSeller>('Seller', sellerSchema);

//for bank account info:
const bankAccountInfoSchema = new Schema<TBankAccountInfo>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    accountNumber: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    bankName: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const BankAccountInfo = model<TBankAccountInfo>(
  'BankAccountInfo',
  bankAccountInfoSchema,
);
