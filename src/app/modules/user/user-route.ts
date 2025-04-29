import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stake-holder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';
import { productValidation } from '../product/product.validation';

const router = Router();

router.post(
  '/create-stakeholder',
  validationRequest(stakeholderValidation.createStakeholderValidation),
  userController.createStackHolder,
);

router.post(
  '/create-seller',
  validationRequest(sellerValidation.createSellerValidationSchema),
  userController.createSeller,
);

router.post(
  '/create-product',
  validationRequest(productValidation.createProductValidationSchema),
  userController.createProduct,
);

export const userRoute = router;
