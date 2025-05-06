import { Router } from 'express';
import {
  feedbackController,
  requisitionController,
} from './requisition.controller';
import validationRequest from '../../middlewares/validationRequest';
import {
  createFeedbackValidationSchema,
  createRequisitionValidationSchema,
  updateFeedbackValidationSchema,
  updateRequisitionValidationSchema,
} from './requisition.validation';

const route = Router();

route.get('/all-requisition', requisitionController.allRequisition);
route.get('/single-requisition/:id', requisitionController.singleRequisition);
route.post(
  '/create-requisition',
  validationRequest(createRequisitionValidationSchema),
  requisitionController.createRequisition,
);
route.patch(
  '/update-requisition/:id',
  validationRequest(updateRequisitionValidationSchema),
  requisitionController.updateRequisition,
);
route.delete(
  '/delete-requisition/:id',
  requisitionController.deleteRequisition,
);

export const requisitionRouter = route;

// feedback:
route.get('/all-feedback', feedbackController.allFeedback);
route.get('/single-feedback/:id', feedbackController.singleFeedback);
route.post(
  '/create-feedback',
  validationRequest(createFeedbackValidationSchema),
  feedbackController.createFeedback,
);
route.patch(
  '/update-feedback/:id',
  validationRequest(updateFeedbackValidationSchema),
  feedbackController.updateFeedback,
);
route.delete('/delete-feedback/:id', feedbackController.deleteFeedback);

export const feedbackRouter = route;
