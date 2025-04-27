import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';

export type TStakeHolderAddress = {
  presentAddress: string;
  permanentAddress: string;
};

export type TStakeHolderName = {
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type TStakeHolder = {
  user: Types.ObjectId;
  name: TStakeHolderName;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  address: TStakeHolderAddress;
  profileImageUrl: string;
  isDeleted: {
    type: boolean;
    default: false;
  };
};
