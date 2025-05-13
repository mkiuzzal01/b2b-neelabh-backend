import { TOrderStatus } from '../../interface/TOrderStatus';

export const orderStatus = [
  'PENDING',
  'PROCESSING',
  'READY_FOR_PICKUP',
  'DISPATCHED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'DELIVERY_FAILED',
  'RETURN_REQUESTED',
  'RETURNED',
  'CANCELLED',
] as const;

export const allowedStatusTransitions: Record<TOrderStatus, TOrderStatus[]> = {
  PENDING: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['READY_FOR_PICKUP', 'CANCELLED'],
  READY_FOR_PICKUP: ['DISPATCHED'],
  DISPATCHED: ['OUT_FOR_DELIVERY'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'DELIVERY_FAILED'],
  DELIVERED: ['RETURN_REQUESTED'],
  DELIVERY_FAILED: ['RETURN_REQUESTED'],
  RETURN_REQUESTED: ['RETURNED'],
  RETURNED: [],
  CANCELLED: [],
};

export const paymentStatus = ['IN-COMPLETE', 'COMPLETED'] as const;
export const orderSearchableField = ['orderStatus'];
