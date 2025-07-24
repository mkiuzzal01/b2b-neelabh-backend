"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerValidation = void 0;
const zod_1 = require("zod");
const stakeholder_constant_1 = require("../stake-holder/stakeholder.constant");
const seller_constant_1 = require("./seller.constant");
const user_constant_1 = require("../user/user.constant");
const nameSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: 'First name is required' }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string({ required_error: 'Last name is required' }),
});
const addressSchema = zod_1.z.object({
    presentAddress: zod_1.z.string({ required_error: 'Present address is required' }),
    permanentAddress: zod_1.z.string({
        required_error: 'Permanent address is required',
    }),
});
const bankAccountInfoSchema = zod_1.z.object({
    paymentMethod: zod_1.z.enum(seller_constant_1.paymentMethod, {
        required_error: 'Payment method is required',
    }),
    bankName: zod_1.z.enum(seller_constant_1.bankName, {
        required_error: 'Bank name is required',
    }),
    accountNumber: zod_1.z
        .string({ required_error: 'Bank account number is required' })
        .min(12, { message: 'Bank account number must be at least 12 digits' }),
});
const sellerBaseSchema = zod_1.z.object({
    name: nameSchema,
    email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    phone: zod_1.z.string({ required_error: 'Phone number is required' }),
    nid: zod_1.z.string({ required_error: 'NID is required' }),
    dateOfBirth: zod_1.z
        .string({ required_error: 'Date of birth is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    gender: zod_1.z.enum(stakeholder_constant_1.gender, { required_error: 'Gender is required' }),
    dateOfJoining: zod_1.z
        .string({ required_error: 'Date of joining is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    address: addressSchema,
    bankAccountInfo: bankAccountInfoSchema,
    profileImage: zod_1.z.object({
        publicId: zod_1.z.string(),
        url: zod_1.z.string(),
    }),
    isDeleted: zod_1.z.boolean().default(false).optional(),
    profileStatus: zod_1.z.enum(user_constant_1.profileStatus).optional(),
    role: zod_1.z.enum(user_constant_1.role).optional(),
});
const createSellerValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password must be at least 6 characters long'),
        seller: sellerBaseSchema,
    }),
});
const updateSellerValidation = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(6).optional(),
        seller: sellerBaseSchema.deepPartial(),
    }),
});
exports.sellerValidation = {
    createSellerValidation,
    updateSellerValidation,
};
