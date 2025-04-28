import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { sellerService } from './seller-service';
import status from 'http-status';

const updateSeller: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { seller } = req.body;
  const result = await sellerService.updateSellerIntoDB(id, seller);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Seller updated successfully',
    data: result,
  });
};

const getAllSellers: RequestHandler = async (req: Request, res: Response) => {
  const result = await sellerService.getAllSellersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All sellers retrieved successfully',
    data: result,
  });
};

const getSingleSeller: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await sellerService.getSingleSellerFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single seller retrieved successfully',
    data: result,
  });
};

export const sellerController = {
  updateSeller,
  getAllSellers,
  getSingleSeller,
};
