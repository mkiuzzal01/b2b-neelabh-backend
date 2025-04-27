import { TProfileStatus } from '../../interface/TProfileStatus';
import { TRole } from '../../interface/TRole';

export type TUser = {
  email: string;
  role: TRole;
  status: TProfileStatus;
  password: string;
  isPasswordChanged: {
    type: boolean;
    default: false;
  };
  isDeleted: {
    type: boolean;
    default: false;
  };
};
