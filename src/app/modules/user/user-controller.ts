import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';

const createStackHolder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, role, stakeholder } = req.body;
    const creator = req.user.id;
    const result = await userService.createStackHolderBD(
      password,
      role,
      stakeholder,
      creator,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Stack holder created successfully',
      data: result,
    });
  },
);

const createSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, seller } = req.body;
    const creator = req.user.id;
    const result = await userService.createSellerIntoBD(
      password,
      seller,
      creator,
    );
    sendResponse(res, {
      statusCode: status.OK,
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
