import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user-model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const isExist = await User.isUserExistByCustomField(payload.email);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'The user not found');
  }
  const isDeleted = isExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, 'The user is deleted');
  }

  const userStatus = isExist?.status;
  if (userStatus == 'blocked') {
    throw new AppError(status.NOT_FOUND, 'The user is block');
  }

  // check the password:
  const isPasswordIsMatch = await User.isPasswordMatch(
    payload.password,
    isExist.password,
  );

  if (!isPasswordIsMatch) {
    throw new AppError(status.FORBIDDEN, 'The user password not match');
  }

  //send access token and refresh token:
  const jwtPayload = {
    id: isExist._id,
    role: isExist.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret as string,
    {
      expiresIn: '5d',
    },
  );

  return {
    accessToken,
    needsPasswordChange: isExist?.isPasswordChanged,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
