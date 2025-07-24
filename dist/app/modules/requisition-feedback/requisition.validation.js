"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedbackValidationSchema = exports.createFeedbackValidationSchema = exports.updateRequisitionValidationSchema = exports.createRequisitionValidationSchema = void 0;
const zod_1 = require("zod");
const requisition_constant_1 = require("./requisition.constant");
exports.createRequisitionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Title is required'),
        subTitle: zod_1.z.string().optional(),
        type: zod_1.z.enum(requisition_constant_1.requisitionType),
        description: zod_1.z.string(),
        stats: zod_1.z.enum(requisition_constant_1.requisitionStatus).default('pending').optional(),
    }),
});
exports.updateRequisitionValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        subTitle: zod_1.z.string().optional(),
        type: zod_1.z.enum(requisition_constant_1.requisitionType).optional(),
        description: zod_1.z.string().optional(),
        stats: zod_1.z.enum(requisition_constant_1.requisitionStatus).default('pending').optional(),
    }),
});
exports.createFeedbackValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        requisitionId: zod_1.z.string(),
        description: zod_1.z.string(),
    }),
});
exports.updateFeedbackValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        creatorId: zod_1.z.string().optional(),
        requisitionId: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
