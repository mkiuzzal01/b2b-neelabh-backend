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
exports.sellerController = void 0;
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const seller_service_1 = require("./seller.service");
const http_status_1 = __importDefault(require("http-status"));
const allSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield seller_service_1.sellerService.allSellersFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All sellers retrieved successfully',
        data: result,
    });
});
const singleSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield seller_service_1.sellerService.singleSellerFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single seller retrieved successfully',
        data: result,
    });
});
const updateSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield seller_service_1.sellerService.updateSellerIntoDB(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Seller updated successfully',
        data: result,
    });
});
const deleteSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_service_1.sellerService.deleteSellerFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'the product deleted successfully',
        data: result,
    });
});
exports.sellerController = {
    allSeller,
    singleSeller,
    updateSeller,
    deleteSeller,
};
