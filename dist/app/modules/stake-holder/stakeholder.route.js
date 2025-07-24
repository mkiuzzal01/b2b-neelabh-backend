"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakeholderRoute = void 0;
const express_1 = require("express");
const stakeholder_controller_1 = require("./stakeholder.controller");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const stakeholder_validation_1 = require("./stakeholder.validation");
const router = (0, express_1.Router)();
router.get('/all-stakeholder', stakeholder_controller_1.stakeholderController.getAllStakeholder);
router.get('/single-stakeholder/:id', stakeholder_controller_1.stakeholderController.getSingleStakeholder);
router.patch('/update-stakeholder/:id', (0, validationRequest_1.default)(stakeholder_validation_1.stakeholderValidation.updateStakeholderValidation), stakeholder_controller_1.stakeholderController.updateStakeholder);
router.delete('/delete-stakeholder/:id', stakeholder_controller_1.stakeholderController.deleteStakeHolder);
exports.stakeholderRoute = router;
