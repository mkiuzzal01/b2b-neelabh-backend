"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const NoticeSchema = new mongoose_1.Schema({
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
NoticeSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = (0, slugify_1.default)(this.title, { lower: true, strict: true });
    }
    next();
});
exports.Notice = (0, mongoose_1.model)('Notice', NoticeSchema);
