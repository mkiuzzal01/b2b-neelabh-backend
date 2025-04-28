import { TProfileStatus } from '../../interface/TProfileStatus';
import { TRole } from '../../interface/TRole';

export type TUser = {
  email: string;
  role: TRole;
  status: TProfileStatus;
  password: string;
  isPasswordChanged: boolean;
  isDeleted: boolean;
};
