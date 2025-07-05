import { RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import status from 'http-status';
import { categoryService } from './category.service';
import sendResponse from '../utils/sendResponse';

// =================== Main Category Controllers ===================

const createMainCategory: RequestHandler = catchAsync(async (req, res) => {
  const category = req.body;
  const result = await categoryService.createMainCategoryIntoDB(category);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Main category created successfully',
    data: result,
  });
});

const getAllMainCategories: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.getAllMainCategoryFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Main categories retrieved successfully',
    data: result,
  });
});

const singleMainCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await categoryService.singleMainCategoryFromDB(slug);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Main category retrieved successfully',
    data: result,
  });
});

const updateMainCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;
  const result = await categoryService.updateMainCategoryIntoDB(slug, updates);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Main category updated successfully',
    data: result,
  });
});

const deleteMainCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteMainCategoryFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Main category deleted successfully',
    data: result,
  });
});

// =================== Category Controllers ===================

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await categoryService.createCategoryIntoDB(data);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories: RequestHandler = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await categoryService.getAllCategoryFromDB(query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

const getSingleCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await categoryService.getSingleCategoryFromDB(slug);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;
  const result = await categoryService.updateCategoryIntoBD(slug, updates);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategoryFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

// =================== Sub Category Controllers ===================

const createSubCategory: RequestHandler = catchAsync(async (req, res) => {
  const subCategory = req.body;
  const result = await categoryService.createSubCategoryIntoDB(subCategory);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Subcategory created successfully',
    data: result,
  });
});

const getAllSubCategories: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryService.getAllSubCategoryFromDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subcategories retrieved successfully',
    data: result,
  });
});

const getSingleSubCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await categoryService.getSingleSubCategoryFromDB(slug);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subcategory retrieved successfully',
    data: result,
  });
});

const updateSubCategory: RequestHandler = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;
  const result = await categoryService.updateSubCategoryIntoDB(slug, updates);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subcategory updated successfully',
    data: result,
  });
});

const deleteSubCategory: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteSubCategoryFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Subcategory deleted successfully',
    data: result,
  });
});

export const categoryController = {
  // Main Category
  createMainCategory,
  getAllMainCategories,
  singleMainCategory,
  updateMainCategory,
  deleteMainCategory,

  // Category
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,

  // Sub Category
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
