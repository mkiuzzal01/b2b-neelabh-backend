"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stakeholder = void 0;
const mongoose_1 = require("mongoose");
const stakeholder_constant_1 = require("./stakeholder.constant");
const validator_1 = __importDefault(require("validator"));
const slugify_1 = __importDefault(require("slugify"));
const stakeholderNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, 'First name can not more then 20 characters'],
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return value === firstNameStr;
            },
            message: '{VALUE} is not in capitalize format',
        },
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: '{VALUE} is not valid',
        },
    },
});
const stakeholderSchema = new mongoose_1.Schema({
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: 'User',
    },
    name: stakeholderNameSchema,
    slug: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    nid: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        enum: {
            values: stakeholder_constant_1.gender,
            message: '{VALUE} is not valid',
        },
        required: true,
    },
    dateOfJoining: { type: Date, required: true },
    address: {
        presentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true },
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
stakeholderSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
stakeholderSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        const fullName = `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
        this.slug = (0, slugify_1.default)(fullName.trim(), { lower: true, strict: true });
    }
    next();
});
exports.Stakeholder = (0, mongoose_1.model)('Stakeholder', stakeholderSchema);
