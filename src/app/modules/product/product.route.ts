import { Router } from 'express';
import { productController } from './product.controller';
import validationRequest from '../../middlewares/validationRequest';
import { productValidation } from './product.validation';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { auth } from '../../middlewares/auth';

const router = Router();

router.get('/all-product', productController.getAllProduct);
router.get('/single-product/:id', productController.getSingleProduct);
router.post(
  '/create-product',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN, ACCESS_ROLE.SELLER),
  validationRequest(productValidation.createProductValidationSchema),
  productController.createProduct,
);
router.patch(
  '/update-product/:id',
  validationRequest(productValidation.updateProductValidationSchema),
  productController.updateProduct,
);

router.delete('/delete-product/:id', productController.deleteProduct);

export const ProductRoute = router;
