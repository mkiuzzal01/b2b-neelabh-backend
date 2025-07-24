"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const route = (0, express_1.Router)();
route.post('/login', (0, validationRequest_1.default)(auth_validation_1.authValidation.loginValidationSchema), auth_controller_1.AuthController.login);
route.post('/refresh-token', (0, validationRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidation), auth_controller_1.AuthController.refreshToken);
// route.post('/change-password');
// route.post('/forgot-password');
// route.post('/reset-password');
exports.authRouter = route;
