import { Router } from 'express';
import { requisitionController } from './requisition.controller';
import validationRequest from '../../middlewares/validationRequest';
import {
  createRequisitionValidationSchema,
  updateRequisitionValidationSchema,
} from './requisition.validation';

const route = Router();

route.get('/all-requisition', requisitionController.allRequisition);
route.get('/single-requisition', requisitionController.singleRequisition);
route.post(
  '/create-requisition',
  validationRequest(createRequisitionValidationSchema),
  requisitionController.createRequisition,
);
route.patch(
  '/update-requisition',
  validationRequest(updateRequisitionValidationSchema),
  requisitionController.updateRequisition,
);
route.delete('/delete-requisition', requisitionController.deleteRequisition);

export const requisitionRouter = route;
