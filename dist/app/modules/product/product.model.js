"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.variantSchema = exports.categoriesSchema = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const product_constant_1 = require("./product.constant");
exports.categoriesSchema = new mongoose_1.Schema({
    mainCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'MainCategory',
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
}, { _id: false });
exports.variantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    attributes: [
        {
            value: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 0,
            },
        },
    ],
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    productCode: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    subTitle: { type: String },
    slug: { type: String },
    totalQuantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    parentageForSeller: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    categories: exports.categoriesSchema,
    variants: [exports.variantSchema],
    description: { type: String, required: true },
    status: {
        type: String,
        enum: product_constant_1.productStatus,
        default: 'in-stock',
    },
    activity: {
        type: String,
        enum: product_constant_1.productActivity,
        default: 'in-stock',
    },
    optionalLinks: {
        type: String,
        default: '',
        trim: true,
    },
    productImage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Photo',
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
productSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isModified('subTitle')) {
        const slugText = `${this.title || ''} ${this.subTitle || ''} || ''}`;
        this.slug = (0, slugify_1.default)(slugText, { lower: true, strict: true });
    }
    next();
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
