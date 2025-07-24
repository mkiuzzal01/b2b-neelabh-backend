"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .max(20, {
            message: ' Password must be at most 20 characters long',
        })
            .optional(),
        role: zod_1.z.enum(user_constant_1.role, { required_error: 'Role is required' }).optional(),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(user_constant_1.role, { required_error: 'Role is required' }).optional(),
        status: zod_1.z
            .enum(user_constant_1.profileStatus, { required_error: 'user status is require' })
            .optional(),
        isDeleted: (0, zod_1.boolean)().optional(),
    }),
});
exports.userValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
