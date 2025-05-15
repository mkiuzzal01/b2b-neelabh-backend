import { Types } from 'mongoose';
import { TGender } from '../../interface/TGender';
import { TImage } from '../../interface/TImage';

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
  creatorId?: string;
  userId?: Types.ObjectId;
  name: TStakeHolderName;
  slug?: string;
  email: string;
  phone: string;
  nid: string;
  dateOfBirth: Date;
  gender: TGender;
  dateOfJoining: Date;
  address: TStakeHolderAddress;
  profileImage: TImage;
  isDeleted: boolean;
};
