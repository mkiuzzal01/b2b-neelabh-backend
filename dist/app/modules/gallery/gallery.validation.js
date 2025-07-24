"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhotoZodSchema = exports.createPhotoZodSchema = exports.updateFolderZodSchema = exports.createFolderZodSchema = void 0;
const zod_1 = require("zod");
exports.createFolderZodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Folder name is required'),
});
exports.updateFolderZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createPhotoZodSchema = zod_1.z.object({
    folderId: zod_1.z.string().min(1, 'Folder ID is required'),
    photoName: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().url('Invalid photo URL').min(1, 'Photo URL is required'),
});
exports.updatePhotoZodSchema = zod_1.z.object({
    folderId: zod_1.z.string().optional(),
    photoName: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().url('Invalid photo URL').optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
