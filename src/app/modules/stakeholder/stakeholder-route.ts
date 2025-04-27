import { Router } from 'express';
import { stakeholderValidation } from './stakeholder-validation';
import { stakeholderController } from './stakeholder-controller';
import validationRequest from '../../middlewares/validationRequest';

const router = Router();

router.patch(
  '/update-stakeholder/:id',
  validationRequest(stakeholderValidation.updateStakeholderValidation),
  stakeholderController.updateStakeholder,
);

router.get('/get-all-stakeholders', stakeholderController.getAllStakeholder);

router.get(
  '/get-single-stakeholder/:id',
  stakeholderController.getSingleStakeholder,
);
