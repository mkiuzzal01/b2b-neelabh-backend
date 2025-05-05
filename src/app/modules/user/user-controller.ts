import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';

export const createStackHolder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, role, stakeholder } = req.body;
    const result = await userService.createStackHolderBD(
      password,
      role,
      stakeholder,
    );
    sendResponse(res, {
      statusCode: status.OK,
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
      statusCode: status.OK,
      success: true,
      message: 'Seller created successfully',
      data: result,
    });
  },
);

export const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const product = req.body;
    const result = await userService.createProductIntoBD(product);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  },
);

export const userController = {
  createStackHolder,
  createSeller,
  createProduct,
};
