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
  user: Types.ObjectId;
  name: TName;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  paymentMethod: TPaymentMethod;
  bankName: TBankName;
  bankAccountNumber: string;
  address: TAddress;
  profileImageUrl: string;
  isDeleted: {
    type: boolean;
    default: false;
  };
};
