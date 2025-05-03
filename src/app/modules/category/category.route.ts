import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

const router = Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.post(
  '/create',
  validationRequest(categoryValidation.createCategory),
  categoryController.createCategory,
);

router.patch(
  '/update/:id',
  validationRequest(categoryValidation.updateCategory),
  categoryController.updateCategory,
);

router.delete('/:id', categoryController.deleteCategory);

export const categoryRoute = router;
