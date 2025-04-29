import { Request, RequestHandler, Response } from 'express';
import { stakeholderService } from './stakeholder-service';
import sendResponse from '../utils/sendResponse';
import { status } from 'http-status';

const updateStakeholder: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const { stakeholder } = req.body;
  const result = await stakeholderService.updateStakeholderIntoDB(
    id,
    stakeholder,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Stakeholder updated successfully',
    data: result,
  });
};

const getAllStakeholder: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const result = await stakeholderService.getAllStakeholdersFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All stakeholders retrieved successfully',
    data: result,
  });
};

const getSingleStakeholder: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;
  const result = await stakeholderService.getSingleStakeholderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single stakeholder retrieved successfully',
    data: result,
  });
};

export const stakeholderController = {
  updateStakeholder,
  getAllStakeholder,
  getSingleStakeholder,
};
