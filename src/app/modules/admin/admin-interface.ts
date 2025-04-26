import { TProfileStatus } from '../../interface/TProfileStatus';
import { TRole } from '../../interface/TRole';

export type TAddress = {
  presentAddress: string;
  permanentAddress: string;
};

export type TAdmin = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  nid: string;
  address: TAddress;
  role: TRole;
  status: TProfileStatus;
  profileImageUrl: string;
  isDeleted: boolean;
  password: string;
  isPasswordChanged: boolean;
};
