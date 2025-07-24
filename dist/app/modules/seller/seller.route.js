"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerRoute = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const seller_validation_1 = require("./seller.validation");
const seller_controller_1 = require("./seller.controller");
const router = (0, express_1.Router)();
router.get('/all-seller', seller_controller_1.sellerController.allSeller);
router.get('/single-seller/:id', seller_controller_1.sellerController.singleSeller);
router.patch('/update-seller/:id', (0, validationRequest_1.default)(seller_validation_1.sellerValidation.updateSellerValidation), seller_controller_1.sellerController.updateSeller);
router.delete('/delete-seller/:id', seller_controller_1.sellerController.deleteSeller);
exports.sellerRoute = router;
