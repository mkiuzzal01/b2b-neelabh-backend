import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';
import { noticeService } from './notice.service';

const allNotice: RequestHandler = catchAsync(async (req, res) => {
  const result = await noticeService.allNoticeFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The all notice retrieve successfully',
    data: result,
  });
});
const singleNotice: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await noticeService.singleNoticeFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The all notice retrieve successfully',
    data: result,
  });
});

const createNotice: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await noticeService.createNoticeIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The all notice retrieve successfully',
    data: result,
  });
});
const updateNotice: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await noticeService.updateNoticeIntoDb(id, data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The all notice retrieve successfully',
    data: result,
  });
});
const deleteNotice: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await noticeService.deleteNoticeIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'The all notice retrieve successfully',
    data: result,
  });
});
export const noticeController = {
  allNotice,
  singleNotice,
  createNotice,
  updateNotice,
  deleteNotice,
};
