import { Router } from 'express';
import { userController } from './user-controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stakeholder/stakeholder-validation';
import { sellerValidation } from '../seller/seller-validation';

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

export const userRoute = router;
