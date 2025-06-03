import { model, Schema } from 'mongoose';
import { TBankAccountInfo, TUser, UserModel } from './user-interface';
import { profileStatus, role } from './user-constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: role,
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
    passwordChangeAt: {
      type: Date,
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

//check password is match:
userSchema.statics.isPasswordMatch = async function (
  plaintextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};

//check password change time and jwt token issue time:
userSchema.statics.isJwtIssuedBeforePasswordChange = async function (
  passwordChangeTime: Date,
  tokenIssuedTime: number,
) {
  const passChangeTime = passwordChangeTime?.getTime() / 1000;
  return passChangeTime > tokenIssuedTime;
};

export const User = model<TUser, UserModel>('User', userSchema);

//for bank account info:
const bankAccountInfoSchema = new Schema<TBankAccountInfo>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    accountNumber: { type: String, unique: true, required: true },
    // transitionId: { type: String, unique: true },
    paymentMethod: { type: String, required: true },
    bankName: { type: String, required: true },
    balance: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
  },
  { timestamps: true },
);

export const BankAccount = model<TBankAccountInfo>(
  'BankAccountInfo',
  bankAccountInfoSchema,
);
