import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';

const route = Router();

route.get(
  '/login',
  auth(ACCESS_ROLE.SELLER),
  validationRequest(authValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const authRouter = route;
