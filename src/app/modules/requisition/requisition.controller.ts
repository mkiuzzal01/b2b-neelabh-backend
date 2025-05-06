import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { feedbackServices, requisitionService } from './requisition.service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

const createRequisition: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await requisitionService.createRequisitionIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The requisition create successfully',
    data: result,
  });
});
const updateRequisition: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await requisitionService.updateRequisitionIntoDB(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The requisition update successfully',
    data: result,
  });
});
const allRequisition: RequestHandler = catchAsync(async (req, res) => {
  const result = await requisitionService.allRequisitionFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All requisition retrieve successfully',
    data: result,
  });
});
const singleRequisition: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await requisitionService.singleRequisitionFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The single requisition fetch successfully',
    data: result,
  });
});
const deleteRequisition: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await requisitionService.deleteRequisitionFrom(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The requisition delete successfully',
    data: result,
  });
});

export const requisitionController = {
  createRequisition,
  updateRequisition,
  allRequisition,
  singleRequisition,
  deleteRequisition,
};

//feedback controller:

const createFeedback = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await feedbackServices.createFeedbackIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The feedback created successfully',
    data: result,
  });
});

const updateFeedback = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await feedbackServices.updateFeedbackIntoDB(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The feedback updated successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await feedbackServices.deleteFeedbackFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The feedback deleted successfully',
    data: result,
  });
});

const allFeedback = catchAsync(async (req, res) => {
  const result = await feedbackServices.allFeedbackFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All feedback retrieve successfully',
    data: result,
  });
});

const singleFeedback = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await feedbackServices.singleFeedbackFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The feedback retrieve successfully',
    data: result,
  });
});

export const feedbackController = {
  createFeedback,
  updateFeedback,
  deleteFeedback,
  allFeedback,
  singleFeedback,
};
