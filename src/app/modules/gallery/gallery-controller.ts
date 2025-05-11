import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import { galleryService } from './gallery-service';
import sendResponse from '../utils/sendResponse';
import status from 'http-status';

// this is folder controller:

const allFolder: RequestHandler = catchAsync(async (req, res) => {
  const result = await galleryService.allFolderFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All folder retrieve successfully',
    data: result,
  });
});

const singleFolder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await galleryService.singleFolderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single folder fetch successfully',
    data: result,
  });
});

const createFolder: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await galleryService.createFolderIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is folder created successfully',
    data: result,
  });
});

const updateFolder: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await galleryService.updateFolderIntoDB(data, id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is folder updated successfully',
    data: result,
  });
});

const deleteFolder: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await galleryService.deleteFolderFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is folder deleted successfully',
    data: result,
  });
});

// this is photo controller:

const allPhoto: RequestHandler = catchAsync(async (req, res) => {
  const result = await galleryService.allPhotoFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All photo retrieve successfully',
    data: result,
  });
});

const singlePhoto: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await galleryService.singlePhotoFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single photo fetch successfully',
    data: result,
  });
});

const createPhoto: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await galleryService.createPhotoIntoDB(data);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is photo created successfully',
    data: result,
  });
});

const updatePhoto: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const result = await galleryService.updatePhotoIntoDB(data, id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is photo updated successfully',
    data: result,
  });
});

const deletePhoto: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await galleryService.deletePhotoFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'This is photo  deleted successfully',
    data: result,
  });
});

export const galleryController = {
  allFolder,
  singleFolder,
  createFolder,
  updateFolder,
  deleteFolder,
  allPhoto,
  singlePhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
