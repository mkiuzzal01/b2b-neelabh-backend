import { z } from 'zod';
import { requisitionStatus, requisitionType } from './requisition.constant';

export const createRequisitionValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subTitle: z.string().optional(),
    type: z.enum(requisitionType),
    stats: z.enum(requisitionStatus),
  }),
});

export const updateRequisitionValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    subTitle: z.string().optional(),
    type: z.enum(requisitionType).optional(),
    stats: z.enum(requisitionStatus).optional(),
  }),
});
