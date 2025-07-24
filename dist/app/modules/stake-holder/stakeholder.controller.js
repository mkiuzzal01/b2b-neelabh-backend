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
exports.stakeholderController = void 0;
const stakeholder_service_1 = require("./stakeholder.service");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const http_status_1 = require("http-status");
const getAllStakeholder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const result = yield stakeholder_service_1.stakeholderService.allStakeholdersFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.status.OK,
        success: true,
        message: 'All stakeholders retrieved successfully',
        data: result,
    });
});
const getSingleStakeholder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield stakeholder_service_1.stakeholderService.singleStakeholderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.status.OK,
        success: true,
        message: 'Single stakeholder retrieved successfully',
        data: result,
    });
});
const updateStakeholder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { stakeholder } = req.body;
    const result = yield stakeholder_service_1.stakeholderService.updateStakeholderIntoDB(id, stakeholder);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.status.OK,
        success: true,
        message: 'Stakeholder updated successfully',
        data: result,
    });
});
const deleteStakeHolder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield stakeholder_service_1.stakeholderService.deleteStakeHolderFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.status.OK,
        success: true,
        message: 'Stakeholder deleted successfully',
        data: result,
    });
});
exports.stakeholderController = {
    getAllStakeholder,
    getSingleStakeholder,
    updateStakeholder,
    deleteStakeHolder,
};
