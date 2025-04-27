import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';

export type TAddress = {
  presentAddress: string;
  permanentAddress: string;
};

export type TName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type TAdmin = {
  user: Types.ObjectId;
  name: TName;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  address: TAddress;
  profileImageUrl: string;
  isDeleted: {
    type: boolean;
    default: false;
  };
};
