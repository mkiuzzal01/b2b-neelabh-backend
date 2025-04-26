import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';

export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { password } = req.body;
  const { data } = req.body;
  const result = await userService.createStackHolderBD(password, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
};

export const createProductionManager: RequestHandler = async (
  req: Request,
  res: Response,
) => {};

export const createAccountant: RequestHandler = async (
  req: Request,
  res: Response,
) => {};
export const createSeller: RequestHandler = async (
  req: Request,
  res: Response,
) => {};

export const userController = {
  createAdmin,
  createProductionManager,
  createAccountant,
  createSeller,
};
