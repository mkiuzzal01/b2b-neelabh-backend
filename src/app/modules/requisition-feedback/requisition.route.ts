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
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';

const route = Router();

route.get('/all-requisition', requisitionController.allRequisition);
route.get('/single-requisition/:id', requisitionController.singleRequisition);
route.post(
  '/create-requisition',
  auth(ACCESS_ROLE.SELLER),
  validationRequest(createRequisitionValidationSchema),
  requisitionController.createRequisition,
);
route.patch(
  '/update-requisition/:id',
  auth(ACCESS_ROLE.SELLER),
  validationRequest(updateRequisitionValidationSchema),
  requisitionController.updateRequisition,
);
route.delete(
  '/delete-requisition/:id',
  auth(ACCESS_ROLE.SELLER),
  requisitionController.deleteRequisition,
);

export const requisitionRouter = route;

// feedback:
route.get(
  '/all-feedback',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  feedbackController.allFeedback,
);
route.get(
  '/single-feedback/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  feedbackController.singleFeedback,
);
route.post(
  '/create-feedback',
  auth(ACCESS_ROLE.ADMIN),
  validationRequest(createFeedbackValidationSchema),
  feedbackController.createFeedback,
);
route.patch(
  '/update-feedback/:id',
  auth(ACCESS_ROLE.ADMIN),
  validationRequest(updateFeedbackValidationSchema),
  feedbackController.updateFeedback,
);
route.delete(
  '/delete-feedback/:id',
  auth(ACCESS_ROLE.ADMIN),
  feedbackController.deleteFeedback,
);

export const feedbackRouter = route;
