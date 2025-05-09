import { z } from 'zod';
import { requisitionStatus, requisitionType } from './requisition.constant';

export const createRequisitionValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subTitle: z.string().optional(),
    type: z.enum(requisitionType),
    description: z.string(),
    stats: z.enum(requisitionStatus).default('pending').optional(),
  }),
});

export const updateRequisitionValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    subTitle: z.string().optional(),
    type: z.enum(requisitionType).optional(),
    description: z.string().optional(),
    stats: z.enum(requisitionStatus).default('pending').optional(),
  }),
});

export const createFeedbackValidationSchema = z.object({
  body: z.object({
    requisitionId: z.string(),
    description: z.string(),
  }),
});

export const updateFeedbackValidationSchema = z.object({
  body: z.object({
    creatorId: z.string().optional(),
    requisitionId: z.string().optional(),
    description: z.string().optional(),
  }),
});
