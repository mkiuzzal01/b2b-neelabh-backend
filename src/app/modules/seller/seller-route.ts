import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { sellerValidation } from './seller-validation';
import { sellerController } from './seller-controller';

const router = Router();

router.patch(
  '/update-seller/:id',
  validationRequest(sellerValidation.updateSellerValidationSchema),
  sellerController.updateSeller,
);
router.get('/get-all-sellers', sellerController.getAllSellers);
router.get('/get-single-seller/:id', sellerController.getSingleSeller);
