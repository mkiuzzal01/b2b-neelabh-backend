import { Router } from 'express';
import { userController } from './user-controller';
import { userValidation } from './user-validation';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();

router.post(
  '/create-admin',
  validationRequest(userValidation.userValidationSchema),
  userController.createAdmin,
);
router.post(
  '/create-production-manager',
  userController.createProductionManager,
);
router.post('/create-accountant', userController.createAccountant);
router.post('/create-seller', userController.createSeller);

export const userRoute = router;
