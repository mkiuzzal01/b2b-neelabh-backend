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
exports.categoryController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
// =================== Main Category Controllers ===================
const createMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    const result = yield category_service_1.categoryService.createMainCategoryIntoDB(category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Main category created successfully',
        data: result,
    });
}));
const getAllMainCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getAllMainCategoryFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Main categories retrieved successfully',
        data: result,
    });
}));
const singleMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield category_service_1.categoryService.singleMainCategoryFromDB(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Main category retrieved successfully',
        data: result,
    });
}));
const updateMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const updates = req.body;
    const result = yield category_service_1.categoryService.updateMainCategoryIntoDB(slug, updates);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Main category updated successfully',
        data: result,
    });
}));
const deleteMainCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryService.deleteMainCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Main category deleted successfully',
        data: result,
    });
}));
// =================== Category Controllers ===================
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield category_service_1.categoryService.createCategoryIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Category created successfully',
        data: result,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield category_service_1.categoryService.getAllCategoryFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Categories retrieved successfully',
        data: result,
    });
}));
const getSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield category_service_1.categoryService.getSingleCategoryFromDB(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category retrieved successfully',
        data: result,
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const updates = req.body;
    const result = yield category_service_1.categoryService.updateCategoryIntoBD(slug, updates);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category updated successfully',
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryService.deleteCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result,
    });
}));
// =================== Sub Category Controllers ===================
const createSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategory = req.body;
    const result = yield category_service_1.categoryService.createSubCategoryIntoDB(subCategory);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Subcategory created successfully',
        data: result,
    });
}));
const getAllSubCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.categoryService.getAllSubCategoryFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Subcategories retrieved successfully',
        data: result,
    });
}));
const getSingleSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield category_service_1.categoryService.getSingleSubCategoryFromDB(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Subcategory retrieved successfully',
        data: result,
    });
}));
const updateSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const updates = req.body;
    const result = yield category_service_1.categoryService.updateSubCategoryIntoDB(slug, updates);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Subcategory updated successfully',
        data: result,
    });
}));
const deleteSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield category_service_1.categoryService.deleteSubCategoryFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Subcategory deleted successfully',
        data: result,
    });
}));
exports.categoryController = {
    // Main Category
    createMainCategory,
    getAllMainCategories,
    singleMainCategory,
    updateMainCategory,
    deleteMainCategory,
    // Category
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    // Sub Category
    createSubCategory,
    getAllSubCategories,
    getSingleSubCategory,
    updateSubCategory,
    deleteSubCategory,
};
