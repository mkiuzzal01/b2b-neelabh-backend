import mongoose from 'mongoose';

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
  id: string;
  user: mongoose.Types.ObjectId;
  name: TName;
  email: string;
  phone: string;
  nid: string;
  address: TAddress;
  profileImageUrl: string;
  isDeleted: {
    type: boolean;
    default: false;
  };
};
