import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stake-holder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { userValidation } from './user-validation';
// import { upload } from '../../utils/sendImageToCloudinary';

const route = Router();

route.post(
  '/create-stakeholder',
  auth(ACCESS_ROLE.SUPER_ADMIN),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validationRequest(stakeholderValidation.createStakeholderValidation),
  userController.createStackHolder,
);

route.post(
  '/create-seller',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validationRequest(sellerValidation.createSellerValidation),
  userController.createSeller,
);

route.patch(
  '/update-user/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN),
  validationRequest(userValidation.updateUserValidationSchema),
  userController.updatedSeller,
);

route.get(
  '/all-user',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  userController.allUsers,
);

route.get(
  '/single-user/:id',
  auth(
    ACCESS_ROLE.SUPER_ADMIN,
    ACCESS_ROLE.ADMIN,
    ACCESS_ROLE.ACCOUNTANT,
    ACCESS_ROLE.PRODUCT_MANAGER,
    ACCESS_ROLE.SELLER,
  ),
  userController.singleUser,
);

route.get(
  '/admin-dashboard-overview',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  userController.adminDashboardOverview,
);

route.get(
  '/seller-dashboard-overview',
  auth(ACCESS_ROLE.SELLER),
  userController.sellerDashboardOverview,
);

export const userRoute = route;
