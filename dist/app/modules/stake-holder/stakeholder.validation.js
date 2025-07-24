"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeholderValidation = void 0;
const zod_1 = require("zod");
const stakeholder_constant_1 = require("./stakeholder.constant");
const nameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: 'First name is required' })
        .max(20, 'First name cannot exceed 20 characters')
        .regex(/^[A-Z][a-z]*$/, 'First name must start with a capital letter'),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string({ required_error: 'Last name is required' })
        .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});
const addressSchema = zod_1.z.object({
    presentAddress: zod_1.z.string({ required_error: 'Present address is required' }),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
    }),
});
const stakeholderBaseSchema = zod_1.z.object({
    name: nameSchema,
    email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    phone: zod_1.z.string({ required_error: 'Phone is required' }),
    nid: zod_1.z.string({ required_error: 'NID is required' }),
    dateOfBirth: zod_1.z
        .string({ required_error: 'Date of birth is required' })
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    gender: zod_1.z.enum(stakeholder_constant_1.gender, { required_error: 'Gender is required' }),
    dateOfJoining: zod_1.z
        .string({ required_error: 'Date of joining is required' })
        .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    address: addressSchema,
    profileImage: zod_1.z.object({
        publicId: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    isDeleted: zod_1.z.boolean().default(false).optional(),
});
const createStakeholderValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters long'),
        stakeholder: stakeholderBaseSchema,
    }),
});
const updateStakeholderValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(6).optional(),
        stakeholder: stakeholderBaseSchema.deepPartial(),
    }),
});
exports.stakeholderValidation = {
    createStakeholderValidation,
    updateStakeholderValidation,
};
