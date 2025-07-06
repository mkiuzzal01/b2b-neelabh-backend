import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ProductVariantValidation } from './product-variant.validation';
import { productVariantController } from './product-variant.controller';

const router = Router();

router.post(
  '/create-product-variant',
  validationRequest(
    ProductVariantValidation.createProductVariantValidationSchema,
  ),
  productVariantController.createProductVariant,
);

router.patch(
  '/update-product-variant/:slug',
  validationRequest(ProductVariantValidation.updateProductVariantValidation),
  productVariantController.updateSingleProductVariant,
);

router.get('/all-product-variant', productVariantController.allProductVariant);

router.get(
  '/single-product-variant/:slug',
  productVariantController.singleProductVariant,
);

router.delete(
  '/delete-product-variant/:id',
  productVariantController.deleteSingleProductVariant,
);

export const productVariantRoute = router;
