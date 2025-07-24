"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariantValidation = void 0;
const zod_1 = require("zod");
const product_variant_model_1 = require("./product-variant.model");
// Base validation schema that matches Mongoose model
const variantValueSchema = zod_1.z.object({
    value: zod_1.z
        .string({
        required_error: 'Value is required',
        invalid_type_error: 'Value must be a string',
    })
        .min(1, 'Value cannot be empty')
        .trim(),
});
const productVariantBaseSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Variant name is required',
        invalid_type_error: 'Variant name must be a string',
    })
        .min(1, 'Variant name is required')
        .max(50, 'Variant name cannot exceed 50 characters')
        .transform((val) => val.trim().toLowerCase()),
    values: zod_1.z
        .array(variantValueSchema, {
        required_error: 'At least one variant value is required',
        invalid_type_error: 'Values must be an array',
    })
        .min(1, 'At least one variant value is required'),
});
// Create validation
const createProductVariantSchema = productVariantBaseSchema.refine((data) => __awaiter(void 0, void 0, void 0, function* () { return !(yield product_variant_model_1.ProductVariant.exists({ name: data.name })); }), {
    message: 'Variant name already exists',
    path: ['name'],
});
// Update validation
const updateProductVariantSchema = productVariantBaseSchema
    .partial()
    .superRefine((data, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.name) {
        const exists = yield product_variant_model_1.ProductVariant.exists({ name: data.name });
        if (exists) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'Variant name already exists',
                path: ['name'],
            });
        }
    }
    if (data.values && data.values.length === 0) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'At least one variant value is required',
            path: ['values'],
        });
    }
    if (Object.keys(data).length === 0) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'At least one field must be provided for update',
            path: ['body'],
        });
    }
}));
exports.ProductVariantValidation = {
    createProductVariantSchema,
    updateProductVariantSchema,
};
