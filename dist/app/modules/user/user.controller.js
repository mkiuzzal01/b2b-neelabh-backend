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
exports.userController = void 0;
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const createStackHolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, stakeholder } = req.body;
    const creator = req.user.id;
    const role = stakeholder.role;
    const result = yield user_service_1.userService.createStackHolderBD(password, role, stakeholder, creator);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Stack holder created successfully',
        data: result,
    });
}));
const createSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, seller } = req.body;
    const creator = req.user.id;
    const result = yield user_service_1.userService.createSellerIntoBD(password, seller, creator);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Seller created successfully',
        data: result,
    });
}));
const updatedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield user_service_1.userService.updateUserIntoDB(payload, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user update successfully',
        data: result,
    });
}));
const allUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield user_service_1.userService.allUserFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All users retrieved successfully',
        data: result,
    });
}));
const singleUserBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield user_service_1.userService.singleUserBySlugFromDB(slug);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user retrieve successfully',
        data: result,
    });
}));
const singleUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userService.singleUserByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user retrieve successfully',
        data: result,
    });
}));
const adminDashboardOverview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.adminDashboardOverviewFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin dashboard overview fetched successfully',
        data: result,
    });
}));
const sellerDashboardOverview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerId = req.user.id;
    const result = yield user_service_1.userService.sellerDashboardOverviewFromDB(sellerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Seller dashboard overview fetched successfully',
        data: result,
    });
}));
exports.userController = {
    createStackHolder,
    createSeller,
    updatedUser,
    allUsers,
    singleUserById,
    singleUserBySlug,
    adminDashboardOverview,
    sellerDashboardOverview,
};
