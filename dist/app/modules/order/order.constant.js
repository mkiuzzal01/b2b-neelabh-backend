"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSearchableField = exports.paymentStatus = exports.allowedStatusTransitions = exports.orderStatus = void 0;
exports.orderStatus = [
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
];
exports.allowedStatusTransitions = {
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
exports.paymentStatus = ['IN-COMPLETE', 'COMPLETED'];
exports.orderSearchableField = ['orderStatus'];
