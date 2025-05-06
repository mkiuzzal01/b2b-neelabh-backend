import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import {
  createNoticeZodSchema,
  updateNoticeZodSchema,
} from './notice.validation';
import { noticeController } from './notice.controller';

const route = Router();

route.get('/all-notice', noticeController.allNotice);
route.get('/single-notice/:id', noticeController.singleNotice);
route.post(
  '/create-notice',
  validationRequest(createNoticeZodSchema),
  noticeController.createNotice,
);

route.patch(
  '/update-notice/:id',
  validationRequest(updateNoticeZodSchema),
  noticeController.updateNotice,
);
route.delete('/delete-notice/:id', noticeController.deleteNotice);

export const noticeRouter = route;
