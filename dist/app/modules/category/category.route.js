"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
// ======================= Main Category Routes =======================
router.get('/all-main-category', category_controller_1.categoryController.getAllMainCategories);
router.get('/single-main-category/:slug', category_controller_1.categoryController.singleMainCategory);
router.post('/create-main-category', (0, validationRequest_1.default)(category_validation_1.categoryValidation.createMainCategory), category_controller_1.categoryController.createMainCategory);
router.patch('/update-main-category/:slug', (0, validationRequest_1.default)(category_validation_1.categoryValidation.updateMainCategory), category_controller_1.categoryController.updateMainCategory);
router.delete('/delete-main-category/:id', category_controller_1.categoryController.deleteMainCategory);
// ======================= Category Routes =======================
router.get('/all-category', category_controller_1.categoryController.getAllCategories);
router.get('/single-category/:slug', category_controller_1.categoryController.getSingleCategory);
router.post('/create-category', (0, validationRequest_1.default)(category_validation_1.categoryValidation.createCategory), category_controller_1.categoryController.createCategory);
router.patch('/update-category/:slug', (0, validationRequest_1.default)(category_validation_1.categoryValidation.updateCategory), category_controller_1.categoryController.updateCategory);
router.delete('/delete-category/:id', category_controller_1.categoryController.deleteCategory);
// ======================= Sub Category Routes =======================
router.get('/all-sub-category', category_controller_1.categoryController.getAllSubCategories);
router.get('/single-sub-category/:slug', category_controller_1.categoryController.getSingleSubCategory);
router.post('/create-sub-category', (0, validationRequest_1.default)(category_validation_1.categoryValidation.createSubCategory), category_controller_1.categoryController.createSubCategory);
router.patch('/update-sub-category/:slug', (0, validationRequest_1.default)(category_validation_1.categoryValidation.updateSubCategory), category_controller_1.categoryController.updateSubCategory);
router.delete('/delete-sub-category/:id', category_controller_1.categoryController.deleteSubCategory);
exports.categoryRoute = router;
