"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategory = exports.Category = exports.SubCategory = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
// ---------------- SubCategory Schema ----------------
const SubCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { timestamps: true });
SubCategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLocaleLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
        this.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
    }
    next();
});
SubCategorySchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.name) {
        update.name = update.name.toLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
        update.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
        this.setUpdate(update);
    }
    next();
});
// ---------------- Category Schema ----------------
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, trim: true, lowercase: true },
}, { timestamps: true });
CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLocaleLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
        this.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
    }
    next();
});
CategorySchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.name) {
        update.name = update.name.toLocaleLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
        update.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
        this.setUpdate(update);
    }
    next();
});
// ---------------- MainCategory Schema ----------------
const MainCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, lowercase: true },
    image: { type: String },
    slug: { type: String, trim: true, unique: true, lowercase: true },
    category: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    ],
    subCategory: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
    ],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
MainCategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.name = this.name.toLocaleLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${this.name}h234h4cxxz67sdseddferffv`;
        this.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
    }
    next();
});
MainCategorySchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update === null || update === void 0 ? void 0 : update.name) {
        update.name = update.name.toLocaleLowerCase();
        const makeSlug = `h6564gvdewe433vbfdsf${update.name}h234h4cxxz67sdseddferffv`;
        update.slug = (0, slugify_1.default)(makeSlug, { lower: true, strict: true });
        this.setUpdate(update);
    }
    next();
});
// ---------------- Export Models ----------------
exports.SubCategory = (0, mongoose_1.model)('SubCategory', SubCategorySchema);
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
exports.MainCategory = (0, mongoose_1.model)('MainCategory', MainCategorySchema);
