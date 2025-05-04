import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { productService } from './product.service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await productService.getSingleProductFromDB(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product updated successfully ',
    data: result,
  });
});

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const result = await productService.getAllProductFromBD();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the all product retrieve successfully ',
    data: result,
  });
});
const getSingleProduct: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product retrieve successfully ',
    data: result,
  });
});
const deleteProduct: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product delete successfully ',
    data: result,
  });
});

export const productController = {
  updateProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
};
