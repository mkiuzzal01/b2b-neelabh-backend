import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import status from 'http-status';
import config from '../config';
import catchAsync from '../modules/utils/catchAsync';
import { User } from '../modules/user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TRole } from '../modules/user/user.interface';

export const auth = (...requiredRole: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized');
    }

    //verified token with decode:
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;
    } catch {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }
    //verification of role and authorization :
    const { role, id, iat } = decoded;

    const isUserExist = await User.findById(id);

    if (!isUserExist) {
      throw new AppError(status.NOT_FOUND, 'User not found');
    }

    const isDeleted = isUserExist?.isDeleted;
    if (isDeleted === true) {
      throw new AppError(status.FORBIDDEN, 'User is deleted');
    }
    const userStatus = isUserExist?.status;

    if (userStatus === 'blocked') {
      throw new AppError(status.FORBIDDEN, 'User is blocked');
    }

    //check password change time and token issue time:
    const checkTime = await User.isJwtIssuedBeforePasswordChange(
      isUserExist?.passwordChangeAt as Date,
      iat as number,
    );

    if (checkTime) {
      throw new AppError(status.FORBIDDEN, 'Token has expired or is invalid');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'you are not authorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
