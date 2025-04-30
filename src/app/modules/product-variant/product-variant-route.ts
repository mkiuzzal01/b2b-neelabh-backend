import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { ProductVariantValidation } from './product-variant-validation';
import { productVariantController } from './product-variant-controller';

const router = Router();

router.post(
  '/crate-product-variant',
  validationRequest(
    ProductVariantValidation.createProductVariantValidationSchema,
  ),
  productVariantController.createProductVariant,
);

router.patch(
  '/update-product-variant/:id',
  validationRequest(ProductVariantValidation.updateProductVariantValidation),
  productVariantController.updateSingleProductVariant,
);

router.get(
  '/all-product-variant',
  productVariantController.getAllProductVariant,
);

router.get(
  '/get-single-product-variant/:id',
  productVariantController.getSingleProductVariant,
);

router.delete(
  '/delete-single-product-variant/:id',
  validationRequest(ProductVariantValidation.updateProductVariantValidation),
  productVariantController.deleteSingleProductVariant,
);

export const productVariantRoute = router;
