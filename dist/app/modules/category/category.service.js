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
exports.categoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
// ================= Main Category =================
const getAllMainCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const mainCategoryQuery = new QueryBuilder_1.default(category_model_1.MainCategory.find(), query)
        .search(category_constant_1.mainCategorySearchableField)
        .filter()
        .paginate();
    const meta = yield mainCategoryQuery.countTotal();
    const result = yield mainCategoryQuery.modelQuery
        .populate('category')
        .populate('subCategory')
        .lean();
    return { meta, result };
});
const singleMainCategoryFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.MainCategory.findOne({ slug })
        .populate('category')
        .populate('subCategory')
        .lean();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main category not found');
    return result;
});
const createMainCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.MainCategory.findOne({
        name: payload.name.toLocaleLowerCase(),
    });
    if (isExist)
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Main category already exists');
    const categoryIds = payload.category || [];
    for (const catId of categoryIds) {
        const found = yield category_model_1.Category.findById(catId);
        if (!found) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Category not found for ID: ${catId}`);
        }
    }
    const subCategoryIds = payload.subCategory || [];
    for (const subId of subCategoryIds) {
        const found = yield category_model_1.SubCategory.findById(subId);
        if (!found) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Sub-category not found for ID: ${subId}`);
        }
    }
    return yield category_model_1.MainCategory.create(payload);
});
const updateMainCategoryIntoDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isExist = yield category_model_1.MainCategory.findOne({ slug });
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main category not found');
    if ((_a = payload.category) === null || _a === void 0 ? void 0 : _a.length) {
        for (const catId of payload.category) {
            const found = yield category_model_1.Category.findById(catId);
            if (!found) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Category not found for ID: ${catId}`);
            }
        }
    }
    if ((_b = payload.subCategory) === null || _b === void 0 ? void 0 : _b.length) {
        for (const subId of payload.subCategory) {
            const found = yield category_model_1.SubCategory.findById(subId);
            if (!found) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Sub-category not found for ID: ${subId}`);
            }
        }
    }
    const result = yield category_model_1.MainCategory.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteMainCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.Types.ObjectId(id);
    const exists = yield category_model_1.MainCategory.findById(objectId);
    if (!exists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main category not found');
    }
    yield category_model_1.MainCategory.deleteOne({ _id: objectId });
    return null;
});
// ================= Category =================
const getAllCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find(), query)
        .search(category_constant_1.categorySearchableField)
        .paginate();
    const result = yield categoryQuery.modelQuery.lean();
    const meta = yield categoryQuery.countTotal();
    return { result, meta };
});
const getSingleCategoryFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ slug }).lean();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    return result;
});
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const isExist = yield category_model_1.Category.findOne({
            name: payload.name.toLocaleLowerCase(),
        }).session(session);
        if (isExist)
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'Category already exists');
        const newCategory = yield category_model_1.Category.create([payload], { session });
        if (!(newCategory === null || newCategory === void 0 ? void 0 : newCategory.length)) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to create category');
        }
        yield session.commitTransaction();
        session.endSession();
        return newCategory[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateCategoryIntoBD = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findOne({ slug });
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    return yield category_model_1.Category.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    yield category_model_1.MainCategory.updateMany({ category: id }, { $pull: { category: id } });
    yield category_model_1.Category.deleteOne({ _id: id });
    return null;
});
// ================= Sub Category =================
const getAllSubCategoryFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategoryQuery = new QueryBuilder_1.default(category_model_1.SubCategory.find(), query)
        .search(category_constant_1.subCategorySearchableField)
        .filter()
        .paginate();
    const meta = yield subCategoryQuery.countTotal();
    const result = yield subCategoryQuery.modelQuery.lean();
    return { meta, result };
});
const getSingleSubCategoryFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.SubCategory.findOne({ slug }).lean();
    if (!result)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub-category not found');
    return result;
});
const createSubCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.SubCategory.findOne({ name: payload.name });
    if (isExist)
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Sub-category already exists');
    return yield category_model_1.SubCategory.create(payload);
});
const updateSubCategoryIntoDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.SubCategory.findOne({ slug });
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub-category not found');
    return yield category_model_1.SubCategory.findOneAndUpdate({ slug }, payload, {
        new: true,
        runValidators: true,
    });
});
const deleteSubCategoryFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.SubCategory.findById({ _id });
    if (!isExist)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub-category not found');
    yield category_model_1.SubCategory.findByIdAndDelete({ _id });
    return null;
});
// ================= Exports =================
exports.categoryService = {
    createMainCategoryIntoDB,
    getAllMainCategoryFromDB,
    singleMainCategoryFromDB,
    updateMainCategoryIntoDB,
    deleteMainCategoryFromDB,
    createCategoryIntoDB,
    getAllCategoryFromDB,
    getSingleCategoryFromDB,
    updateCategoryIntoBD,
    deleteCategoryFromDB,
    createSubCategoryIntoDB,
    getAllSubCategoryFromDB,
    getSingleSubCategoryFromDB,
    updateSubCategoryIntoDB,
    deleteSubCategoryFromDB,
};
