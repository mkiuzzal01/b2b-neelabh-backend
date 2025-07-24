"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSellerSchema = exports.changeOrderStatusSchema = exports.updateOrderSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const productVariantSchema = zod_1.z.object({
    name: zod_1.z.string().toLowerCase().min(1, 'Variant name is required'),
    attributes: zod_1.z
        .array(zod_1.z.object({
        value: zod_1.z.string().min(1, 'Attribute value is required'),
        quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    }))
        .min(1, 'At least one attribute is required'),
});
const deliveryAddressSchema = zod_1.z.object({
    division: zod_1.z.string().min(1, 'Division is required'),
    district: zod_1.z.string().min(1, 'District is required'),
    sub_district: zod_1.z.string().min(1, 'Sub-district is required'),
    localArea: zod_1.z.string().min(1, 'Local area is required'),
});
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string({ required_error: 'productId is required' }),
        orderVariant: zod_1.z
            .array(productVariantSchema)
            .min(1, 'At least one product variant is required'),
        deliveryAddress: deliveryAddressSchema,
        status: zod_1.z.enum(order_constant_1.orderStatus).optional().default('PENDING'),
    }),
});
exports.updateOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        orderVariant: zod_1.z.array(productVariantSchema).optional(),
        deliveryAddress: deliveryAddressSchema.partial().optional(),
        status: zod_1.z.enum(order_constant_1.orderStatus).optional(),
    }),
});
exports.changeOrderStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(order_constant_1.orderStatus).optional(),
    }),
});
exports.paymentSellerSchema = zod_1.z.object({
    body: zod_1.z.object({
        paymentStatus: zod_1.z.enum(order_constant_1.paymentStatus).optional(),
        transactionId: zod_1.z.string(),
        referenceCode: zod_1.z.string(),
    }),
});
