import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';
import catchAsync from '../utils/catchAsync';

export const createStackHolder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, role, stakeholder } = req.body;
    const result = await userService.createStackHolderBD(
      password,
      role,
      stakeholder,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Stack holder created successfully',
      data: result,
    });
  },
);

export const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, seller } = req.body;
    const result = await userService.createSellerIntoBD(password, seller);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Seller created successfully',
      data: result,
    });
  },
);

export const userController = {
  createStackHolder,
  createSeller,
};
