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
exports.feedbackServices = exports.requisitionService = void 0;
const requisition_model_1 = require("./requisition.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const requisition_constant_1 = require("./requisition.constant");
const allRequisitionFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const requisitionQuery = new QueryBuilder_1.default(requisition_model_1.Requisition.find().populate('feedbackId'), query)
        .search(requisition_constant_1.requisitionSearchableField)
        .fields()
        .filter()
        .paginate()
        .sort();
    const meta = yield requisitionQuery.countTotal();
    const result = yield requisitionQuery.modelQuery;
    return { meta, result };
});
const singleRequisitionFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield requisition_model_1.Requisition.findById(id).populate('feedbackId');
    return result;
});
const createRequisitionIntoDB = (payload, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const ObjectId = new mongoose_1.default.Types.ObjectId(creatorId);
    payload.creatorId = ObjectId;
    const result = yield requisition_model_1.Requisition.create(payload);
    return result;
});
const updateRequisitionIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield requisition_model_1.Requisition.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.OK, 'This requisition not found');
    }
    const result = yield requisition_model_1.Requisition.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRequisitionFrom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield requisition_model_1.Requisition.findByIdAndDelete(id);
    return null;
});
exports.requisitionService = {
    createRequisitionIntoDB,
    updateRequisitionIntoDB,
    allRequisitionFromDB,
    singleRequisitionFromDB,
    deleteRequisitionFrom,
};
//feedback:
const allFeedbackFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield requisition_model_1.Feedback.find()
        .populate('creatorId')
        .populate('requisitionId');
    return result;
});
const singleFeedbackFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield requisition_model_1.Feedback.findById(id)
        .populate('creatorId')
        .populate('requisitionId');
    return result;
});
const updateFeedbackIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield requisition_model_1.Feedback.findById(id);
    if (!isExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This is not found');
    }
    const result = yield requisition_model_1.Feedback.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const createFeedbackIntoDB = (payload, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isExistRequisition = yield requisition_model_1.Requisition.findById(payload.requisitionId).session(session);
        if (!isExistRequisition) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requisition not found');
        }
        payload.creatorId = new mongoose_1.default.Types.ObjectId(creatorId);
        const feedback = yield requisition_model_1.Feedback.create([payload], { session });
        if (!feedback.length) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create feedback');
        }
        yield requisition_model_1.Requisition.findByIdAndUpdate(payload.requisitionId, { feedbackId: feedback[0]._id }, { new: true, runValidators: true, session });
        yield session.commitTransaction();
        session.endSession();
        return feedback[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const deleteFeedbackFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistFeedback = yield requisition_model_1.Feedback.findById(id);
    if (!isExistFeedback) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The feedback not found');
    }
    yield requisition_model_1.Requisition.findOneAndUpdate(isExistFeedback.requisitionId, { feedbackId: null }, {
        new: true,
        runValidators: true,
    });
    yield requisition_model_1.Feedback.findByIdAndDelete(id);
    return null;
});
exports.feedbackServices = {
    allFeedbackFromDB,
    singleFeedbackFromDB,
    updateFeedbackIntoDB,
    createFeedbackIntoDB,
    deleteFeedbackFromDB,
};
