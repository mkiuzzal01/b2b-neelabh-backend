"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noticeRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const notice_validation_1 = require("./notice.validation");
const notice_controller_1 = require("./notice.controller");
const route = (0, express_1.Router)();
route.get('/all-notice', notice_controller_1.noticeController.allNotice);
route.get('/single-notice/:id', notice_controller_1.noticeController.singleNotice);
route.post('/create-notice', (0, validationRequest_1.default)(notice_validation_1.createNoticeZodSchema), notice_controller_1.noticeController.createNotice);
route.patch('/update-notice/:id', (0, validationRequest_1.default)(notice_validation_1.updateNoticeZodSchema), notice_controller_1.noticeController.updateNotice);
route.delete('/delete-notice/:id', notice_controller_1.noticeController.deleteNotice);
exports.noticeRouter = route;
