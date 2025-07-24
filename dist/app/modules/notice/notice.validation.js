"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoticeZodSchema = exports.createNoticeZodSchema = void 0;
const zod_1 = require("zod");
exports.createNoticeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .min(3, 'Title must be at least 3 characters')
            .optional(),
        subTitle: zod_1.z.string().optional(),
        description: zod_1.z
            .string({
            required_error: 'Description is required',
        })
            .min(10, 'Description must be at least 10 characters'),
    }),
});
exports.updateNoticeZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters').optional(),
        subTitle: zod_1.z.string().optional(),
        description: zod_1.z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .optional(),
    }),
});
