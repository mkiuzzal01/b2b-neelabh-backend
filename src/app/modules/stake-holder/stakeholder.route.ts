import { Router } from 'express';
import { stakeholderController } from './stakeholder.controller';
import validationRequest from '../../middlewares/validationRequest';
import { stakeholderValidation } from './stakeholder.validation';

const router = Router();
router.get('/all-stakeholder', stakeholderController.getAllStakeholder);

router.get(
  '/single-stakeholder/:id',
  stakeholderController.getSingleStakeholder,
);
router.patch(
  '/update-stakeholder/:id',
  validationRequest(stakeholderValidation.updateStakeholderValidation),
  stakeholderController.updateStakeholder,
);

router.delete(
  '/delete-stakeholder/:id',
  stakeholderController.deleteStakeHolder,
);

export const stakeholderRoute = router;
