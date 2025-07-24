"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccount = exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const slugify_1 = __importDefault(require("slugify"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: user_constant_1.role,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: user_constant_1.profileStatus,
        default: 'active',
    },
    password: {
        type: String,
        required: true,
    },
    isPasswordChanged: {
        type: Boolean,
        default: false,
    },
    passwordChangeAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    slug: { type: String },
}, { timestamps: true });
//make slug:
userSchema.pre('save', function (next) {
    const slugText = `${this.status}hadaf${this.role}${this.email}/code/fbb`;
    this.slug = (0, slugify_1.default)(slugText.trim(), { lower: true, strict: true });
    next();
});
//hash password before saving:
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// hide password after saving:
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
//check password is match:
userSchema.statics.isPasswordMatch = function (plaintextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plaintextPassword, hashedPassword);
    });
};
//check password change time and jwt token issue time:
userSchema.statics.isJwtIssuedBeforePasswordChange = function (passwordChangeTime, tokenIssuedTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const passChangeTime = (passwordChangeTime === null || passwordChangeTime === void 0 ? void 0 : passwordChangeTime.getTime()) / 1000;
        return passChangeTime > tokenIssuedTime;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
//for bank account info:
const bankAccountInfoSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    accountNumber: { type: String, unique: true, required: true },
    // transitionId: { type: String, unique: true },
    paymentMethod: { type: String, required: true },
    bankName: { type: String, required: true },
    balance: { type: Number, default: 0 },
    status: { type: String, default: 'active' },
}, { timestamps: true });
exports.BankAccount = (0, mongoose_1.model)('BankAccountInfo', bankAccountInfoSchema);
