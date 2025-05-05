import { Types } from 'mongoose';
import { TProfileStatus } from '../../interface/TProfileStatus';
import { TRole } from '../../interface/TRole';
import { TPaymentMethod } from '../../interface/TPaymentMethod';
import { TBankName } from '../../interface/TBankName';
import { TAccountStatus } from '../../interface/TAccountStatus';

export type TUser = {
  email: string;
  role: TRole;
  status: TProfileStatus;
  password: string;
  isPasswordChanged: boolean;
  isDeleted: boolean;
};

export type TBankAccountInfo = {
  userId: Types.ObjectId;
  accountHolderName: string;
  accountNumber: string;
  paymentMethod: TPaymentMethod;
  bankName: TBankName;
  balance: number;
  status: TAccountStatus;
};
