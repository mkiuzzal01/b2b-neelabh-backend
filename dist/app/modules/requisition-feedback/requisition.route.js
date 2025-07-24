"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = exports.requisitionRouter = void 0;
const express_1 = require("express");
const requisition_controller_1 = require("./requisition.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const requisition_validation_1 = require("./requisition.validation");
const auth_1 = require("../../middlewares/auth");
const AccessRole_1 = require("../../interface/AccessRole");
const route = (0, express_1.Router)();
route.get('/all-requisition', requisition_controller_1.requisitionController.allRequisition);
route.get('/single-requisition/:id', requisition_controller_1.requisitionController.singleRequisition);
route.post('/create-requisition', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SELLER), (0, validationRequest_1.default)(requisition_validation_1.createRequisitionValidationSchema), requisition_controller_1.requisitionController.createRequisition);
route.patch('/update-requisition/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SELLER), (0, validationRequest_1.default)(requisition_validation_1.updateRequisitionValidationSchema), requisition_controller_1.requisitionController.updateRequisition);
route.delete('/delete-requisition/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SELLER), requisition_controller_1.requisitionController.deleteRequisition);
exports.requisitionRouter = route;
// feedback:
route.get('/all-feedback', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN), requisition_controller_1.feedbackController.allFeedback);
route.get('/single-feedback/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN), requisition_controller_1.feedbackController.singleFeedback);
route.post('/create-feedback', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.ADMIN), (0, validationRequest_1.default)(requisition_validation_1.createFeedbackValidationSchema), requisition_controller_1.feedbackController.createFeedback);
route.patch('/update-feedback/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.ADMIN), (0, validationRequest_1.default)(requisition_validation_1.updateFeedbackValidationSchema), requisition_controller_1.feedbackController.updateFeedback);
route.delete('/delete-feedback/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.ADMIN), requisition_controller_1.feedbackController.deleteFeedback);
exports.feedbackRouter = route;
