import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stake-holder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';

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

export const userRoute = router;
