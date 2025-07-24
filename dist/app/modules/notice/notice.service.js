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
exports.noticeService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const notice_model_1 = require("./notice.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const notice_constant_1 = require("./notice.constant");
const allNoticeFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const noticeQuery = new QueryBuilder_1.default(notice_model_1.Notice.find(), query)
        .search(notice_constant_1.noticeSearchableField)
        .fields()
        .sort()
        .paginate()
        .filter();
    const meta = yield noticeQuery.countTotal();
    const result = yield noticeQuery.modelQuery;
    return { meta, result };
});
const singleNoticeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.Notice.findById(id);
    return result;
});
const createNoticeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notice_model_1.Notice.create(payload);
    return result;
});
const updateNoticeIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield notice_model_1.Notice.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This is notice not  found');
    }
    const result = yield notice_model_1.Notice.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteNoticeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield notice_model_1.Notice.findByIdAndDelete(id);
    return null;
});
exports.noticeService = {
    createNoticeIntoDB,
    updateNoticeIntoDb,
    allNoticeFromDB,
    singleNoticeFromDB,
    deleteNoticeIntoDB,
};
