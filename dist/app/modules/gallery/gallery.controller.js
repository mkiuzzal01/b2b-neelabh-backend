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
exports.galleryController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const gallery_service_1 = require("./gallery.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// this is folder controller:
const allFolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield gallery_service_1.galleryService.allFolderFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All folder retrieve successfully',
        data: result,
    });
}));
const singleFolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield gallery_service_1.galleryService.singleFolderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single folder fetch successfully',
        data: result,
    });
}));
const createFolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield gallery_service_1.galleryService.createFolderIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This is folder created successfully',
        data: result,
    });
}));
const updateFolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield gallery_service_1.galleryService.updateFolderIntoDB(data, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This is folder updated successfully',
        data: result,
    });
}));
const deleteFolder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // before deleting image from cloudinary:
    // the delete the database:
    const result = yield gallery_service_1.galleryService.deleteFolderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This is folder deleted successfully',
        data: result,
    });
}));
// this is photo controller:
const allPhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield gallery_service_1.galleryService.allPhotoFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All photo retrieve successfully',
        data: result,
    });
}));
const singlePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield gallery_service_1.galleryService.singlePhotoFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single photo fetch successfully',
        data: result,
    });
}));
const createPhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const files = req.files;
    const result = yield gallery_service_1.galleryService.createPhotoIntoDB(data, files);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Photos created successfully',
        data: result,
    });
}));
const updatePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    const result = yield gallery_service_1.galleryService.updatePhotoIntoDB(data, id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This is photo updated successfully',
        data: result,
    });
}));
const deletePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield gallery_service_1.galleryService.deletePhotoFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'This is photo  deleted successfully',
        data: result,
    });
}));
exports.galleryController = {
    allFolder,
    singleFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    allPhoto,
    singlePhoto,
    createPhoto,
    updatePhoto,
    deletePhoto,
};
