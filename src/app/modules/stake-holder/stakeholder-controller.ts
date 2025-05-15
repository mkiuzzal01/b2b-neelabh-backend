import { RequestHandler } from 'express';
import { stakeholderService } from './stakeholder-service';
import sendResponse from '../utils/sendResponse';
import { status } from 'http-status';

const getAllStakeholder: RequestHandler = async (req, res) => {
  const { query } = req;
  const result = await stakeholderService.allStakeholdersFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All stakeholders retrieved successfully',
    data: result,
  });
};

const getSingleStakeholder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const result = await stakeholderService.singleStakeholderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single stakeholder retrieved successfully',
    data: result,
  });
};
const updateStakeholder: RequestHandler = async (req, res) => {
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

const deleteStakeHolder: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const result = await stakeholderService.deleteStakeHolderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Stakeholder deleted successfully',
    data: result,
  });
};

export const stakeholderController = {
  getAllStakeholder,
  getSingleStakeholder,
  updateStakeholder,
  deleteStakeHolder,
};
