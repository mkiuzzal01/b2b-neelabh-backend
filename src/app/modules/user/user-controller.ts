import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user-service';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';

const createStackHolder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { password, role, stakeholder } = req.body;
    const creator = req.user.id;
    const file = req.file;
    const result = await userService.createStackHolderBD(
      password,
      role,
      stakeholder,
      creator,
      file,
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
    const file = req.file;

    const result = await userService.createSellerIntoBD(
      password,
      seller,
      creator,
      file,
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Seller created successfully',
      data: result,
    });
  },
);

const updatedSeller: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const creator = req.params.id;
    const payload = req.body;
    const result = await userService.updateUserIntoDB(payload, creator);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'user update successfully',
      data: result,
    });
  },
);

const adminDashboardOverview: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.adminDashboardOverviewFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin dashboard overview fetched successfully',
    data: result,
  });
});

const sellerDashboardOverview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const sellerId = req.user.id;
    const result = await userService.sellerDashboardOverviewFromDB(sellerId);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Seller dashboard overview fetched successfully',
      data: result,
    });
  },
);

export const userController = {
  createStackHolder,
  createSeller,
  updatedSeller,
  adminDashboardOverview,
  sellerDashboardOverview,
};
