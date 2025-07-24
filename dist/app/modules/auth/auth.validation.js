"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email is required.' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'refresh token is required' }),
    }),
});
exports.authValidation = {
    loginValidationSchema,
    refreshTokenValidation,
};
