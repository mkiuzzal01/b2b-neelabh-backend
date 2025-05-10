import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

const allOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await orderService.allOrderFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All order retrieve successfully',
    data: result,
  });
});

const singleOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await orderService.singleOrderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The order fetch successfully',
    data: result,
  });
});

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const sellerId = req.user.id;
  const result = await orderService.createOrderIntoDB(data, sellerId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The order fetch successfully',
    data: result,
  });
});

const updateOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await orderService.updateOrderIntoDB(data, id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The order fetch successfully',
    data: result,
  });
});

const deleteOrder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await orderService.deleteOrderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The order delete successfully',
    data: result,
  });
});

export const orderController = {
  allOrder,
  singleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
