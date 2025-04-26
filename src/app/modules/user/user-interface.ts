import { TRole } from '../../interface/TRole';

export type TUser = {
  userId: string;
  email: string;
  role: TRole;
  status: string;
  password: string;
  isPasswordChanged: boolean;
  isDeleted: boolean;
};
