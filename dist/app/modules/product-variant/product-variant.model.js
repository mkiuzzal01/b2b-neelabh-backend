"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariant = void 0;
const mongoose_1 = require("mongoose");
const variantValueSchema = new mongoose_1.Schema({
    value: {
        type: String,
        required: [true, 'Value is required'],
        trim: true,
    },
}, { _id: false });
const productVariantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Variant name is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    values: {
        type: [variantValueSchema],
        required: [true, 'At least one variant value is required'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
            return ret;
        },
    },
});
exports.ProductVariant = (0, mongoose_1.model)('ProductVariant', productVariantSchema);
