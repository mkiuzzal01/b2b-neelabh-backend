import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { productService } from './product.service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

const createProduct: RequestHandler = catchAsync(async (req, res) => {
  const product = req.body;
  const creator = req.user.id;
  const result = await productService.createProductIntoBD(product, creator);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await productService.updateProductIntoBD(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product updated successfully ',
    data: result,
  });
});

const getAllProduct: RequestHandler = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await productService.getAllProductFromBD(query);
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
  const result = await productService.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product delete successfully ',
    data: result,
  });
});

export const productController = {
  createProduct,
  updateProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
};
