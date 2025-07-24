"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.Requisition = void 0;
const mongoose_1 = require("mongoose");
const requisition_constant_1 = require("./requisition.constant");
const slugify_1 = __importDefault(require("slugify"));
const requisitionSchema = new mongoose_1.Schema({
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String },
    subTitle: { type: String },
    type: {
        type: String,
        required: true,
        enum: requisition_constant_1.requisitionType,
    },
    description: {
        type: String,
    },
    stats: {
        type: String,
        enum: requisition_constant_1.requisitionStatus,
        default: 'pending',
    },
    feedbackId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Feedback',
    },
}, { timestamps: true });
requisitionSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        const slugText = this.title + this.subTitle;
        this.slug = (0, slugify_1.default)(slugText, { lower: true, strict: true });
    }
    next();
});
exports.Requisition = (0, mongoose_1.model)('Requisition', requisitionSchema);
const feedBackSchema = new mongoose_1.Schema({
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    requisitionId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Requisition' },
    description: { type: String, required: true },
});
exports.Feedback = (0, mongoose_1.model)('Feedback', feedBackSchema);
