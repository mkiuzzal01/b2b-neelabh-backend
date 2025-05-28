import status from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AuthServices } from './auth.service';
import { RequestHandler } from 'express';
import config from '../../config';

const login: RequestHandler = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needsPasswordChange } =
    await AuthServices.loginUser(req.body);

  //set the refresh token in cookies:
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user is logged  in successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: {
      result,
    },
  });
});

export const AuthController = {
  login,
  refreshToken,
};
