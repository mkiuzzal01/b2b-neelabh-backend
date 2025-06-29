import { RequestHandler } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from './user.service';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';

const createStackHolder: RequestHandler = catchAsync(async (req, res) => {
  const { password, stakeholder } = req.body;
  const creator = req.user.id;
  const role = stakeholder.role;
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
});

const createSeller: RequestHandler = catchAsync(async (req, res) => {
  const { password, seller } = req.body;
  const creator = req.user.id;
  const result = await userService.createSellerIntoBD(
    password,
    seller,
    creator,
    // file,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });
});

const updatedUser: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await userService.updateUserIntoDB(payload, id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user update successfully',
    data: result,
  });
});

const allUsers: RequestHandler = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await userService.allUserFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All users retrieved successfully',
    data: result,
  });
});

const singleUserBySlug: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await userService.singleUserBySlugFromDB(slug);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user retrieve successfully',
    data: result,
  });
});

const singleUserById: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.singleUserByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'user retrieve successfully',
    data: result,
  });
});

const adminDashboardOverview: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.adminDashboardOverviewFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin dashboard overview fetched successfully',
    data: result,
  });
});

const sellerDashboardOverview: RequestHandler = catchAsync(async (req, res) => {
  const sellerId = req.user.id;
  const result = await userService.sellerDashboardOverviewFromDB(sellerId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Seller dashboard overview fetched successfully',
    data: result,
  });
});

export const userController = {
  createStackHolder,
  createSeller,
  updatedUser,
  allUsers,
  singleUserById,
  singleUserBySlug,
  adminDashboardOverview,
  sellerDashboardOverview,
};
