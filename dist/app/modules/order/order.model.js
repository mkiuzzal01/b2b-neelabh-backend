"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const orderSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    sellerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderVariant: [
        {
            name: { type: String, required: true },
            attributes: [
                {
                    value: { type: String, required: true },
                    quantity: { type: Number, required: true },
                    _id: false,
                },
            ],
            _id: false,
        },
    ],
    deliveryAddress: {
        division: { type: String, required: true },
        district: { type: String, required: true },
        sub_district: { type: String, required: true },
        localArea: { type: String, required: true },
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    orderStatus: {
        type: String,
        enum: order_constant_1.orderStatus,
        default: 'PENDING',
    },
    transactionId: {
        type: String,
    },
    referenceCode: {
        type: String,
    },
    sellerProfit: {
        type: Number,
    },
    paymentStatus: {
        type: String,
        enum: order_constant_1.paymentStatus,
        default: 'IN-COMPLETE',
    },
}, {
    timestamps: true,
});
orderSchema.pre('save', function (next) {
    this.orderVariant = this.orderVariant.map((variant) => (Object.assign(Object.assign({}, variant), { name: variant.name.toLowerCase(), attributes: variant.attributes.map((attr) => (Object.assign(Object.assign({}, attr), { value: attr.value.toLowerCase() }))) })));
    next();
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
