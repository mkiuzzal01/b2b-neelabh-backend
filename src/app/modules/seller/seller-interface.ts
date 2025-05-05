import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';

export type TAddress = {
  presentAddress: string;
  permanentAddress: string;
};

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
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
