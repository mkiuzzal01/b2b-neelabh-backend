import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

const router = Router();

router.get('/get-categories', categoryController.getCategories);
router.get('/get-category/:id', categoryController.getCategoryById);

router.post(
  '/create-category',
  validationRequest(categoryValidation.createCategoryValidationSchema),
  categoryController.createCategory,
);

router.patch(
  '/update-category/:id',
  validationRequest(categoryValidation.updateCategoryValidationSchema),
  categoryController.updateCategory,
);

router.delete('/delete-category/:id', categoryController.deleteCategory);

export const categoryRoute = router;
