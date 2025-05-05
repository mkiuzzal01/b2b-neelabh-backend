import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { sellerValidation } from './seller-validation';
import { sellerController } from './seller-controller';

const router = Router();

router.get('/all-seller', sellerController.getAllSellers);
router.get('/single-seller/:id', sellerController.getSingleSeller);
router.patch(
  '/update-seller/:id',
  validationRequest(sellerValidation.updateSellerValidation),
  sellerController.updateSeller,
);
router.get('/delete-seller/:id', sellerController.deleteSeller);

export const sellerRoute = router;
