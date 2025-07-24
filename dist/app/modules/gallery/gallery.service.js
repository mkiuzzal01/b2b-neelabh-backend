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
exports.galleryService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const gallery_model_1 = require("./gallery.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const deleteImageFromCloudinary_1 = require("../../utils/deleteImageFromCloudinary");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const gallery_constant_1 = require("./gallery.constant");
//this is for folder:
const allFolderFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const folderQuery = new QueryBuilder_1.default(gallery_model_1.Folder.find(), query).search(gallery_constant_1.folderSearchableField);
    const meta = yield folderQuery.countTotal();
    const result = yield folderQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const singleFolderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Folder.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The folder not found');
    }
    return result;
});
const createFolderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Folder.create(payload);
    return result;
});
const updateFolderIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Folder.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The folder not found');
    }
    return result;
});
const deleteFolderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Folder.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The folder not found');
    }
    return null;
});
//this is for image:
const allPhotoFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const imageQuery = new QueryBuilder_1.default(gallery_model_1.Photo.find(), query)
        .search(gallery_constant_1.photoSearchableFields)
        .fields()
        .filter()
        .paginate()
        .sort();
    const meta = yield imageQuery.countTotal();
    const result = yield imageQuery.modelQuery;
    return { meta, result };
});
const singlePhotoFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistPhoto = yield gallery_model_1.Photo.findById(id);
    if (!isExistPhoto) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The photo not found');
    }
    return isExistPhoto;
});
const createPhotoIntoDB = (payload, files) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistFolder = yield gallery_model_1.Folder.findById(payload.folderId);
    if (!isExistFolder) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The folder not found');
    }
    const docs = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const name = payload.photoName[i] || file.originalname;
        const { secure_url, public_id } = (yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(name, file.path));
        docs.push({
            folderId: payload.folderId,
            photoName: name,
            photo: {
                publicId: public_id,
                url: secure_url,
            },
        });
    }
    const result = yield gallery_model_1.Photo.insertMany(docs);
    return result;
});
const updatePhotoIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Photo.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The photo not found');
    }
    return result;
});
const deletePhotoFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gallery_model_1.Photo.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'The photo not found');
    }
    //delete image from cloudinary:
    yield (0, deleteImageFromCloudinary_1.deleteImageFromCloudinary)(result.photo.publicId);
    //then delete the database:
    yield gallery_model_1.Photo.findByIdAndDelete(id);
    return null;
});
exports.galleryService = {
    allFolderFromDB,
    singleFolderFromDB,
    createFolderIntoDB,
    updateFolderIntoDB,
    deleteFolderFromDB,
    //this is photo service:
    createPhotoIntoDB,
    updatePhotoIntoDB,
    deletePhotoFromDB,
    allPhotoFromDB,
    singlePhotoFromDB,
};
