"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = exports.updateProductValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
const product_constant_1 = require("./product.constant");
const productAttributeSchema = zod_1.z.object({
    value: zod_1.z.string().min(1, 'Attribute value is required'),
    quantity: zod_1.z.string().min(0, 'Quantity must be at least 0').optional(),
});
const productVariantSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Variant name is required'),
    attributes: zod_1.z
        .array(productAttributeSchema)
        .min(1, 'At least one attribute is required'),
});
const categoriesSchema = zod_1.z.object({
    mainCategory: zod_1.z.string().min(1, 'Main category is required'),
    category: zod_1.z.string().min(1, 'Category is required'),
    subCategory: zod_1.z.string().min(1, 'Subcategory is required'),
});
const baseProductSchema = zod_1.z.object({
    productCode: zod_1.z.string().min(1, 'Product code is required'),
    title: zod_1.z.string().min(1, 'Title is required'),
    subTitle: zod_1.z.string().optional(),
    variants: zod_1.z
        .array(productVariantSchema)
        .min(1, 'At least one variant is required'),
    price: zod_1.z.string().min(0, 'Price must be greater than or equal to 0'),
    discount: zod_1.z.string().min(0, 'Discount must be greater than or equal to 0'),
    parentageForSeller: zod_1.z.string().min(1, 'Seller percentage is require'),
    rating: zod_1.z.number().optional(),
    categories: categoriesSchema,
    description: zod_1.z.string().min(1, 'Description is required'),
    status: zod_1.z.enum(product_constant_1.productStatus).default('in-stock'),
    activity: zod_1.z.enum(product_constant_1.productActivity).default('in-stock'),
    optionalLinks: zod_1.z.string(),
    productImage: zod_1.z.string().min(1, 'Product image is required'),
    isDeleted: zod_1.z.boolean().default(false),
});
exports.createProductValidationSchema = zod_1.z.object({
    body: baseProductSchema,
});
exports.updateProductValidationSchema = zod_1.z.object({
    body: baseProductSchema.partial(),
});
exports.productValidation = {
    createProductValidationSchema: exports.createProductValidationSchema,
    updateProductValidationSchema: exports.updateProductValidationSchema,
};
