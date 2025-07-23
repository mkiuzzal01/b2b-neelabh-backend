// import { RequestHandler } from 'express';
// import catchAsync from '../utils/catchAsync';
// import { orderService } from './order.service';
// import sendResponse from '../utils/sendResponse';
// import status from 'http-status';

// const allOrder: RequestHandler = catchAsync(async (req, res) => {
//   const { query } = req;
//   const result = await orderService.allOrderFromDB(query);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'All order retrieve successfully',
//     data: result,
//   });
// });

// const singleOrder: RequestHandler = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await orderService.singleOrderFromDB(id);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The order fetch successfully',
//     data: result,
//   });
// });

// const createOrder: RequestHandler = catchAsync(async (req, res) => {
//   const data = req.body;
//   const sellerId = req.user.id;
//   const result = await orderService.createOrderIntoDB(data, sellerId);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The order create successfully',
//     data: result,
//   });
// });

// const updateOrder: RequestHandler = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await orderService.updateOrderIntoDB(data, id);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The order update successfully',
//     data: result,
//   });
// });

// const changeOrderStatus: RequestHandler = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await orderService.changeStatusOfOrderIntoDB(data, id);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The status update successfully',
//     data: result,
//   });
// });

// const sellerPayment: RequestHandler = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await orderService.sellerPaymentIntoDB(data, id);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The seller payment successfully',
//     data: result,
//   });
// });

// const deleteOrder: RequestHandler = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   const result = await orderService.deleteOrderFromDB(id);
//   sendResponse(res, {
//     statusCode: status.OK,
//     success: true,
//     message: 'The order delete successfully',
//     data: result,
//   });
// });

// export const orderController = {
//   allOrder,
//   singleOrder,
//   createOrder,
//   updateOrder,
//   changeOrderStatus,
//   sellerPayment,
//   deleteOrder,
// };
