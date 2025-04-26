import { Router } from 'express';
import { userController } from './user-controller';
import { userValidation } from './user-validation';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();

router.post(
  '/create-stakeholder',
  validationRequest(userValidation.userValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
