import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stake-holder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { userValidation } from './user-validation';

const router = Router();

router.post(
  '/create-stakeholder',
  auth(ACCESS_ROLE.SUPER_ADMIN),
  validationRequest(stakeholderValidation.createStakeholderValidation),
  userController.createStackHolder,
);

router.post(
  '/create-seller',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  validationRequest(sellerValidation.createSellerValidation),
  userController.createSeller,
);

router.patch(
  '/update-user/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN),
  validationRequest(userValidation.updateUserValidationSchema),
  userController.updatedSeller,
);

export const userRoute = router;
