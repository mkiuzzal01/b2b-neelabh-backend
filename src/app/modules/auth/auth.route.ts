import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const route = Router();

route.get(
  '/login',
  validationRequest(authValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const authRouter = route;
