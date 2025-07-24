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
exports.stakeholderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const stakeholder_model_1 = require("./stakeholder.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const stakeholder_constant_1 = require("./stakeholder.constant");
const allStakeholdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(stakeholder_model_1.Stakeholder.find().populate('userId'), query)
        .search(stakeholder_constant_1.searchableFields)
        .fields()
        .filter()
        .paginate()
        .sort();
    const meta = yield queryBuilder.countTotal();
    const result = yield queryBuilder.modelQuery;
    return { meta, result };
});
const singleStakeholderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stakeholder_model_1.Stakeholder.findOne({ userId: id })
        .populate('creator')
        .populate('userId');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This is stake holder not found');
    }
    return result;
});
const updateStakeholderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExistUser = yield stakeholder_model_1.Stakeholder.findById(id);
    if (!isExistUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This stake holder not found');
    }
    const updateFields = {};
    if (payload.name) {
        if (payload.name.firstName)
            updateFields['name.firstName'] = payload.name.firstName;
        if (payload.name.middleName)
            updateFields['name.middleName'] = payload.name.middleName;
        if (payload.name.lastName)
            updateFields['name.lastName'] = payload.name.lastName;
    }
    if (payload.phone) {
        updateFields['phone'] = payload.phone;
    }
    if ((_a = payload.address) === null || _a === void 0 ? void 0 : _a.presentAddress) {
        updateFields['address.presentAddress'] = payload.address.presentAddress;
    }
    if (payload.profileImage) {
        updateFields['profileImageUrl'] = payload.profileImage;
    }
    const result = yield stakeholder_model_1.Stakeholder.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteStakeHolderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistStakeHolder = yield stakeholder_model_1.Stakeholder.findById(id);
    if (!isExistStakeHolder) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this stake holder not found');
    }
    yield stakeholder_model_1.Stakeholder.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
    return null;
});
exports.stakeholderService = {
    allStakeholdersFromDB,
    singleStakeholderFromDB,
    updateStakeholderIntoDB,
    deleteStakeHolderFromDB,
};
