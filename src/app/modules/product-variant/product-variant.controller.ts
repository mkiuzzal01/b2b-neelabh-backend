import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { ProductVariantService } from './product-variant.service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

const createProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const variant = req.body;
    const result =
      await ProductVariantService.createProductVariantIntoDB(variant);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Variant created successfully',
      success: true,
      data: result,
    });
  },
);

const allProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { query } = req;
    const result = await ProductVariantService.allProductVariantFromDB(query);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Variant retrieve successfully',
      success: true,
      data: result,
    });
  },
);

const singleProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await ProductVariantService.singleProductVariantFromDB(slug);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Single variant updated successfully',
      success: true,
      data: result,
    });
  },
);

const updateSingleProductVariant: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { slug } = req.params;
  const data = req.body;
  const result = await ProductVariantService.updateSingleProductVariantIntoDB(
    slug,
    data,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The product updated successfully',
    data: result,
  });
};

const deleteSingleProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ProductVariantService.deleteSingleProductVariantFromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'The product variant deleted successfully',
      data: result,
    });
  },
);

export const productVariantController = {
  createProductVariant,
  allProductVariant,
  singleProductVariant,
  updateSingleProductVariant,
  deleteSingleProductVariant,
};
