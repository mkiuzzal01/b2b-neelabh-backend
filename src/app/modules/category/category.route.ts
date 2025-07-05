import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

const router = Router();

// ======================= Main Category Routes =======================

router.get('/all-main-category', categoryController.getAllMainCategories);

router.get(
  '/single-main-category/:slug',
  categoryController.singleMainCategory,
);

router.post(
  '/create-main-category',
  validationRequest(categoryValidation.createMainCategory),
  categoryController.createMainCategory,
);

router.patch(
  '/update-main-category/:slug',
  validationRequest(categoryValidation.updateMainCategory),
  categoryController.updateMainCategory,
);

router.delete(
  '/delete-main-category/:id',
  categoryController.deleteMainCategory,
);

// ======================= Category Routes =======================

router.get('/all-category', categoryController.getAllCategories);

router.get('/single-category/:slug', categoryController.getSingleCategory);

router.post(
  '/create-category',
  validationRequest(categoryValidation.createCategory),
  categoryController.createCategory,
);

router.patch(
  '/update-category/:slug',
  validationRequest(categoryValidation.updateCategory),
  categoryController.updateCategory,
);

router.delete('/delete-category/:id', categoryController.deleteCategory);

// ======================= Sub Category Routes =======================

router.get('/all-sub-category', categoryController.getAllSubCategories);

router.get(
  '/single-sub-category/:slug',
  categoryController.getSingleSubCategory,
);

router.post(
  '/create-sub-category',
  validationRequest(categoryValidation.createSubCategory),
  categoryController.createSubCategory,
);

router.patch(
  '/update-sub-category/:slug',
  validationRequest(categoryValidation.updateSubCategory),
  categoryController.updateSubCategory,
);

router.delete('/delete-sub-category/:id', categoryController.deleteSubCategory);

export const categoryRoute = router;
