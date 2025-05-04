import { Router } from 'express';
import { productController } from './product.controller';
import validationRequest from '../../middlewares/validationRequest';
import { productValidation } from './product.validation';

const router = Router();

router.get('/all-product', productController.getAllProduct);
router.get('/single-product/:id', productController.getSingleProduct);
router.patch(
  '/update-product/:id',
  validationRequest(productValidation.updateProductValidationSchema),
  productController.updateProduct,
);

router.delete('/delete-product/:id', productController.deleteProduct);

export const ProductRoute = router;
