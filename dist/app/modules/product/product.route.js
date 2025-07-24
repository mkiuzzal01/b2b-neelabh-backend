"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const product_validation_1 = require("./product.validation");
const AccessRole_1 = require("../../interface/AccessRole");
const auth_1 = require("../../middlewares/auth");
const route = (0, express_1.Router)();
route.get('/all-product', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN, AccessRole_1.ACCESS_ROLE.PRODUCT_MANAGER, AccessRole_1.ACCESS_ROLE.SELLER), product_controller_1.productController.allProduct);
route.get('/single-product/:id', product_controller_1.productController.singleProduct);
route.post('/create-product', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN, AccessRole_1.ACCESS_ROLE.SELLER), (0, validationRequest_1.default)(product_validation_1.productValidation.createProductValidationSchema), product_controller_1.productController.createProduct);
route.patch('/update-product/:id', (0, validationRequest_1.default)(product_validation_1.productValidation.updateProductValidationSchema), product_controller_1.productController.updateProduct);
route.delete('/delete-product/:id', product_controller_1.productController.deleteProduct);
exports.ProductRoute = route;
