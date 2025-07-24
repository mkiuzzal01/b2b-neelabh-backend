"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRouter = void 0;
const express_1 = require("express");
const gallery_controller_1 = require("./gallery.controller");
const auth_1 = require("../../middlewares/auth");
const AccessRole_1 = require("../../interface/AccessRole");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const route = (0, express_1.Router)();
//this is folder:
route.get('/all-folder', gallery_controller_1.galleryController.allFolder);
route.get('/single-folder/:id', gallery_controller_1.galleryController.singleFolder);
route.post('/create-folder', gallery_controller_1.galleryController.createFolder);
route.patch('/update-folder/:id', gallery_controller_1.galleryController.updateFolder);
route.delete('/delete-folder/:id', gallery_controller_1.galleryController.deleteFolder);
//this is photo route:
route.get('/all-photo', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN, AccessRole_1.ACCESS_ROLE.PRODUCT_MANAGER, AccessRole_1.ACCESS_ROLE.SELLER), gallery_controller_1.galleryController.allPhoto);
route.get('/single-photo/:id', gallery_controller_1.galleryController.singlePhoto);
route.post('/create-photo', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN), sendImageToCloudinary_1.upload.array('files', 10), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, gallery_controller_1.galleryController.createPhoto);
route.patch('/update-photo/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN), gallery_controller_1.galleryController.updatePhoto);
route.delete('/delete-photo/:id', (0, auth_1.auth)(AccessRole_1.ACCESS_ROLE.SUPER_ADMIN, AccessRole_1.ACCESS_ROLE.ADMIN), gallery_controller_1.galleryController.deletePhoto);
exports.galleryRouter = route;
