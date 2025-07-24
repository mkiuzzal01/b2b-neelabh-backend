"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const mongoose_1 = require("mongoose");
const stakeholder_constant_1 = require("../stake-holder/stakeholder.constant");
const slugify_1 = __importDefault(require("slugify"));
const sellerSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    name: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
    },
    slug: { type: String },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    nid: {
        type: String,
        unique: true,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: stakeholder_constant_1.gender,
        required: true,
    },
    dateOfJoining: { type: Date, required: true },
    address: {
        presentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true },
    },
    bankAccountInfo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'BankAccountInfo',
        required: true,
    },
    profileImage: {
        publicId: { type: String },
        url: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
}, {
    toJSON: {
        virtuals: true,
    },
});
// virtual
sellerSchema.virtual('fullName').get(function () {
    var _a, _b, _c;
    return `${(_a = this === null || this === void 0 ? void 0 : this.name) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = this === null || this === void 0 ? void 0 : this.name) === null || _b === void 0 ? void 0 : _b.middleName} ${(_c = this === null || this === void 0 ? void 0 : this.name) === null || _c === void 0 ? void 0 : _c.lastName}`;
});
sellerSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        const fullName = `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
        this.slug = (0, slugify_1.default)(fullName.trim(), { lower: true, strict: true });
    }
    next();
});
exports.Seller = (0, mongoose_1.model)('Seller', sellerSchema);
