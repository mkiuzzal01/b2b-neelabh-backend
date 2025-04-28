import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';
import { TPaymentMethod } from '../../interface/TPaymentMethod';
import { TBankName } from '../../interface/TBankName';

export type TAddress = {
  presentAddress: string;
  permanentAddress: string;
};

export type TName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type TSeller = {
  userId: Types.ObjectId;
  name: TName;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  bankAccountInfo: Types.ObjectId;
  address: TAddress;
  profileImageUrl: string;
  isDeleted: boolean;
};

export type TBankAccountInfo = {
  userId: Types.ObjectId;
  accountHolderName: string;
  accountNumber: string;
  paymentMethod: TPaymentMethod;
  bankName: TBankName;
  balance: number;
};
