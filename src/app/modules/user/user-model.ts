import { model, Schema } from 'mongoose';
import { TBankAccountInfo, TUser } from './user-interface';
import { profileStatus } from './user-constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: profileStatus,
      default: 'active',
    },
    password: {
      type: String,
      required: true,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//hash password before saving:
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// hide password after saving:
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);

//for bank account info:
const bankAccountInfoSchema = new Schema<TBankAccountInfo>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    accountNumber: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    bankName: { type: String, required: true },
    balance: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

export const BankAccountInfo = model<TBankAccountInfo>(
  'BankAccountInfo',
  bankAccountInfoSchema,
);
