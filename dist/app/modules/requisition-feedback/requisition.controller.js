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
exports.feedbackController = exports.requisitionController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const requisition_service_1 = require("./requisition.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createRequisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const creator = req.user.id;
    const result = yield requisition_service_1.requisitionService.createRequisitionIntoDB(data, creator);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The requisition create successfully',
        data: result,
    });
}));
const updateRequisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield requisition_service_1.requisitionService.updateRequisitionIntoDB(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The requisition update successfully',
        data: result,
    });
}));
const allRequisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield requisition_service_1.requisitionService.allRequisitionFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All requisition retrieve successfully',
        data: result,
    });
}));
const singleRequisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield requisition_service_1.requisitionService.singleRequisitionFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The single requisition fetch successfully',
        data: result,
    });
}));
const deleteRequisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield requisition_service_1.requisitionService.deleteRequisitionFrom(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The requisition delete successfully',
        data: result,
    });
}));
exports.requisitionController = {
    createRequisition,
    updateRequisition,
    allRequisition,
    singleRequisition,
    deleteRequisition,
};
//feedback controller:
const createFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const creatorId = req.user.id;
    const result = yield requisition_service_1.feedbackServices.createFeedbackIntoDB(data, creatorId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The feedback created successfully',
        data: result,
    });
}));
const updateFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield requisition_service_1.feedbackServices.updateFeedbackIntoDB(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The feedback updated successfully',
        data: result,
    });
}));
const deleteFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield requisition_service_1.feedbackServices.deleteFeedbackFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The feedback deleted successfully',
        data: result,
    });
}));
const allFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield requisition_service_1.feedbackServices.allFeedbackFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All feedback retrieve successfully',
        data: result,
    });
}));
const singleFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield requisition_service_1.feedbackServices.singleFeedbackFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'The feedback retrieve successfully',
        data: result,
    });
}));
exports.feedbackController = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    allFeedback,
    singleFeedback,
};
