import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';

export const createAdmin: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { password, data } = req.body;
  const result = await userService.createStackHolderBD(password, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
};

export const createSeller: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { password, data } = req.body;
  const result = await userService.sellerIntoBD(password, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });
};

export const userController = {
  createStackHolder,
  createSeller,
};
