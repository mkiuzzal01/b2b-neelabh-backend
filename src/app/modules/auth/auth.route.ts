import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { authValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const route = Router();

route.post(
  '/login',
  validationRequest(authValidation.loginValidationSchema),
  AuthController.login,
);

route.post(
  '/refresh-token',
  validationRequest(authValidation.refreshTokenValidation),
  AuthController.refreshToken,
);

// route.post('/change-password');

// route.post('/forgot-password');

// route.post('/reset-password');

export const authRouter = route;
