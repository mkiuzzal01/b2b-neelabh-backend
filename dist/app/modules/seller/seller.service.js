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
exports.sellerService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const seller_model_1 = require("./seller.model");
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const seller_constant_1 = require("./seller.constant");
const stakeholder_model_1 = require("../stake-holder/stakeholder.model");
const allSellersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(seller_model_1.Seller.find().populate('userId').populate('bankAccountInfo'), query)
        .search(seller_constant_1.sellerSearchableField)
        .fields()
        .filter()
        .paginate()
        .sort();
    const meta = yield queryBuilder.countTotal();
    const result = yield queryBuilder.modelQuery;
    return { meta, result };
});
const singleSellerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = yield seller_model_1.Seller.findOne({ userId: id })
        .populate('creator', 'email role status')
        .populate('userId', 'email role status')
        .populate('bankAccountInfo')
        .lean();
    if (!seller) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found');
    }
    const creatorProfile = yield stakeholder_model_1.Stakeholder.findOne({
        userId: seller.creator,
    })
        .select('name email phone')
        .lean();
    const result = Object.assign(Object.assign({}, seller), { creatorProfile });
    return result;
});
const updateSellerIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const existingSeller = yield seller_model_1.Seller.findOne({ userId: id });
    if (!existingSeller) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This seller not found');
    }
    const updateFields = {};
    if (payload === null || payload === void 0 ? void 0 : payload.name) {
        if ((_a = existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.name) === null || _a === void 0 ? void 0 : _a.firstName)
            updateFields['name.firstName'] = (_b = payload === null || payload === void 0 ? void 0 : payload.name) === null || _b === void 0 ? void 0 : _b.firstName;
        if ((_c = existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.name) === null || _c === void 0 ? void 0 : _c.middleName)
            updateFields['name.middleName'] = (_d = payload === null || payload === void 0 ? void 0 : payload.name) === null || _d === void 0 ? void 0 : _d.middleName;
        if ((_e = existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.name) === null || _e === void 0 ? void 0 : _e.lastName)
            updateFields['name.lastName'] = (_f = payload === null || payload === void 0 ? void 0 : payload.name) === null || _f === void 0 ? void 0 : _f.lastName;
    }
    if (existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.phone) {
        updateFields['phone'] = payload === null || payload === void 0 ? void 0 : payload.phone;
    }
    if ((_g = existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.address) === null || _g === void 0 ? void 0 : _g.presentAddress) {
        updateFields['address.presentAddress'] = (_h = payload === null || payload === void 0 ? void 0 : payload.address) === null || _h === void 0 ? void 0 : _h.presentAddress;
    }
    if (existingSeller === null || existingSeller === void 0 ? void 0 : existingSeller.profileImage) {
        updateFields['profileImageUrl'] = payload === null || payload === void 0 ? void 0 : payload.profileImage;
    }
    const updatedSeller = yield seller_model_1.Seller.findOneAndUpdate({ userId: id }, updateFields, {
        new: true,
        runValidators: true,
    });
    return updatedSeller;
});
const deleteSellerFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistStakeHolder = yield seller_model_1.Seller.findById(id);
    if (!isExistStakeHolder) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this stake holder not found');
    }
    yield user_model_1.BankAccount.findOneAndUpdate({ userId: isExistStakeHolder.userId }, {
        status: 'deactivate',
    }, {
        new: true,
        runValidators: true,
    });
    yield seller_model_1.Seller.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
    return null;
});
exports.sellerService = {
    allSellersFromDB,
    singleSellerFromDB,
    updateSellerIntoDB,
    deleteSellerFromDB,
};
