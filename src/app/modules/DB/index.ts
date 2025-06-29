import config from '../../config';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { User } from '../user/user.model';

const superUser = {
  email: config.super_admin_email,
  password: config.super_admin_pass,
  role: ACCESS_ROLE.SUPER_ADMIN,
  isPasswordChanged: false,
  status: 'active',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({
    role: ACCESS_ROLE.SUPER_ADMIN,
  });

  if (!isSuperAdminExist) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
