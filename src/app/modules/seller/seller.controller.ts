import { Request, RequestHandler, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { sellerService } from './seller.service';
import status from 'http-status';

const allSeller: RequestHandler = async (req: Request, res: Response) => {
  const { query } = req;
  const result = await sellerService.allSellersFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All sellers retrieved successfully',
    data: result,
  });
};

const singleSeller: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await sellerService.singleSellerFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single seller retrieved successfully',
    data: result,
  });
};

const updateSeller: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await sellerService.updateSellerIntoDB(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Seller updated successfully',
    data: result,
  });
};

const deleteSeller: RequestHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await sellerService.deleteSellerFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'the product deleted successfully',
    data: result,
  });
};

export const sellerController = {
  allSeller,
  singleSeller,
  updateSeller,
  deleteSeller,
};
