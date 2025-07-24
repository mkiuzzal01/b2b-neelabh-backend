"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = exports.photoSchema = exports.Folder = exports.folderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.folderSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Folder = (0, mongoose_1.model)('Folder', exports.folderSchema);
exports.photoSchema = new mongoose_1.Schema({
    folderId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    photoName: { type: String, unique: true },
    photo: {
        publicId: { type: String, required: true },
        url: { type: String, required: true },
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.Photo = (0, mongoose_1.model)('Photo', exports.photoSchema);
