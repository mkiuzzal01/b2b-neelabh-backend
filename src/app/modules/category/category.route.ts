import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { categoryValidation } from './category.validation';
import { categoryService } from './category.service';

const route = Router();

route.get(
  '/create-category',
  validationRequest(categoryValidation.createCategoryValidationSchema),
  categoryService.createCategoryIntoDB,
);

route.get('/get-categories', categoryService.getCategoriesFromDB);

route.get('/get-category/:id', categoryService.getCategoryByIdFromDB);

route.patch(
  '/update-category/:id',
  validationRequest(categoryValidation.createCategoryValidationSchema),
  categoryService.updateCategoryIntoDB,
);

route.delete('/delete-category/:id', categoryService.deleteCategoryFromDB);

export const categoryRoute = route;
