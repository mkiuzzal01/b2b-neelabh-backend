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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const token_1 = require("../utils/token");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: payload.email });
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user not found');
    }
    const isDeleted = isExist === null || isExist === void 0 ? void 0 : isExist.isDeleted;
    if (isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user is deleted');
    }
    const userStatus = isExist === null || isExist === void 0 ? void 0 : isExist.status;
    if (userStatus == 'blocked') {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The user is block');
    }
    // check the password:
    const isPasswordIsMatch = yield user_model_1.User.isPasswordMatch(payload.password, isExist.password);
    if (!isPasswordIsMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'The user password not match');
    }
    //send access token and refresh token:
    const jwtPayload = {
        id: isExist._id,
        role: isExist.role,
    };
    //generate access token:
    const accessToken = (0, token_1.createToken)(jwtPayload, config_1.default.access_token_secret, config_1.default.jwt_access_token_expiration);
    //generate refresh token:
    const refreshToken = (0, token_1.createToken)(jwtPayload, config_1.default.refresh_token_secret, config_1.default.jwt_refresh_token_expiration);
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: isExist === null || isExist === void 0 ? void 0 : isExist.isPasswordChanged,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorized');
    }
    //verified token with decode:
    const decoded = (0, token_1.verifyToken)(token, config_1.default.refresh_token_secret);
    //verification of role and authorization:
    const { id, iat } = decoded;
    const isUserExist = yield user_model_1.User.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'user not found');
    }
    const isDeleted = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.isDeleted;
    if (isDeleted === true) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'user is deleted');
    }
    const userStatus = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'user is blocked');
    }
    //check password change time and token issue time:
    const checkTime = yield user_model_1.User.isJwtIssuedBeforePasswordChange(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.passwordChangeAt, iat);
    if (checkTime) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Token has expired or is invalid');
    }
    //create jwt payload:
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = (0, token_1.createToken)(jwtPayload, config_1.default.access_token_secret, config_1.default.jwt_access_token_expiration);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUser,
    refreshToken,
};
