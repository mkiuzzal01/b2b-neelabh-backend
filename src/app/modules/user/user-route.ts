import { Router } from 'express';
import { userController } from './user-controller';
import { userValidation } from './user-validation';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from '../stakeholder/stakeholder-validation';

const router = Router();

router.post(
  '/create-stakeholder',
  validationRequest(stakeholderValidation.createStakeholderValidation),
  userController.createStackHolder,
);

router.post(
  '/create-seller',
  validationRequest(userValidation.userValidationSchema),
  userController.createSeller,
);

export const userRoute = router;
