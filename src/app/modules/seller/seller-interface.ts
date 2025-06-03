import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';
// import { TImage } from '../../interface/TImage';

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
  creatorId?: string;
  userId: Types.ObjectId;
  name: TName;
  slug?: string;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  bankAccountInfo: Types.ObjectId;
  address: TAddress;
  // profileImage: TImage;
  isDeleted: boolean;
};
