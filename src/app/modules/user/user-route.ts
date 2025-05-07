import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stake-holder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';
import { productValidation } from '../product/product.validation';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';

const router = Router();

router.post(
  '/create-stakeholder',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  validationRequest(stakeholderValidation.createStakeholderValidation),
  userController.createStackHolder,
);

router.post(
  '/create-seller',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  validationRequest(sellerValidation.createSellerValidation),
  userController.createSeller,
);

router.post(
  '/create-product',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  validationRequest(productValidation.createProductValidationSchema),
  userController.createProduct,
);

export const userRoute = router;
