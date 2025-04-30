import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { ProductVariantService } from './product-variant-service';
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

const getAllProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductVariantService.gelAllProductVariantFromDB();
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Variant retrieve successfully',
      success: true,
      data: result,
    });
  },
);

const getSingleProductVariant: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ProductVariantService.getSingleProductVariantFromDB(id);
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
  const id = req.params.id;
  const data = req.body;

  const result = await ProductVariantService.updateSingleProductVariantIntoDB(
    id,
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
    const data = req.body;

    const result = await ProductVariantService.deleteSingleProductVariantFromDB(
      id,
      data,
    );
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
  getAllProductVariant,
  getSingleProductVariant,
  updateSingleProductVariant,
  deleteSingleProductVariant,
};
