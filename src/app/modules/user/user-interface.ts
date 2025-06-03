/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { TProfileStatus } from '../../interface/TProfileStatus';
import { TPaymentMethod } from '../../interface/TPaymentMethod';
import { TBankName } from '../../interface/TBankName';
import { TAccountStatus } from '../../interface/TAccountStatus';
import { ACCESS_ROLE } from '../../interface/AccessRole';

export type TRole = (typeof ACCESS_ROLE)[keyof typeof ACCESS_ROLE];

export interface TUser {
  email: string;
  role: TRole;
  status: TProfileStatus;
  password: string;
  isPasswordChanged: boolean;
  passwordChangeAt?: Date;
  isDeleted: boolean;
}

export type TBankAccountInfo = {
  userId: Types.ObjectId;
  accountNumber: string;
  // transitionId?: string;
  accountHolderName: string;
  paymentMethod: TPaymentMethod;
  bankName: TBankName;
  balance: number;
  status: TAccountStatus;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatch(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJwtIssuedBeforePasswordChange(
    passwordChangeTime: Date,
    tokenIssuedTime: number,
  ): Promise<boolean>;
}
