import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { categoryService } from './category.service';

export const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { category, subCategory } = req.body;
    const result = await categoryService.createCategoryIntoDB(
      category,
      subCategory,
    );
    res.status(200).json({
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  },
);

export const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.getCategoriesFromDB();
    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: result,
    });
  },
);

export const getCategoryById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.getCategoryByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: result,
    });
  },
);

export const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { category, subCategory } = req.body;
    const result = await categoryService.updateCategoryIntoDB(
      id,
      category,
      subCategory,
    );
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  },
);

export const deleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.deleteCategoryFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  },
);

export const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
