import status from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user-model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { createToken, verifyToken } from '../utils/token';

const loginUser = async (payload: TLoginUser) => {
  const isExist = await User.findOne({ email: payload.email });

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'The user not found');
  }
  const isDeleted = isExist?.isDeleted;
  if (isDeleted === true) {
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

  //generate access token:
  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.jwt_access_token_expiration as string,
  );

  //generate refresh token:
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.jwt_refresh_token_expiration as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isExist?.isPasswordChanged,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, 'you are not authorized');
  }

  //verified token with decode:
  const decoded = verifyToken(token, config.refresh_token_secret as string);

  //verification of role and authorization:
  const { id, iat } = decoded;

  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, 'user not found');
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted === true) {
    throw new AppError(status.FORBIDDEN, 'user is deleted');
  }
  const userStatus = isUserExist?.status;

  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'user is blocked');
  }

  //check password change time and token issue time:
  const checkTime = await User.isJwtIssuedBeforePasswordChange(
    isUserExist?.passwordChangeAt as Date,
    iat as number,
  );

  if (checkTime) {
    throw new AppError(status.FORBIDDEN, 'Token has expired or is invalid');
  }

  //create jwt payload:
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.jwt_access_token_expiration as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
