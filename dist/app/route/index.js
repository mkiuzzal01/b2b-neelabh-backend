"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const stakeholder_route_1 = require("../modules/stake-holder/stakeholder.route");
const seller_route_1 = require("../modules/seller/seller.route");
const category_route_1 = require("../modules/category/category.route");
// import { productVariantRoute } from '../modules/product-variant/product-variant.route';
const product_route_1 = require("../modules/product/product.route");
const notice_route_1 = require("../modules/notice/notice.route");
const requisition_route_1 = require("../modules/requisition-feedback/requisition.route");
const auth_route_1 = require("../modules/auth/auth.route");
// import { orderRoute } from '../modules/order/order.route';
const gallery_route_1 = require("../modules/gallery/gallery.route");
const router = (0, express_1.Router)();
const routeModule = [
    {
        path: '/user',
        route: user_route_1.userRoute,
    },
    {
        path: '/stakeholder',
        route: stakeholder_route_1.stakeholderRoute,
    },
    {
        path: '/seller',
        route: seller_route_1.sellerRoute,
    },
    {
        path: '/category',
        route: category_route_1.categoryRoute,
    },
    // {
    //   path: '/product-variant',
    //   route: productVariantRoute,
    // },
    {
        path: '/product',
        route: product_route_1.ProductRoute,
    },
    {
        path: '/notice',
        route: notice_route_1.noticeRouter,
    },
    {
        path: '/requisition',
        route: requisition_route_1.requisitionRouter,
    },
    {
        path: '/feedback',
        route: requisition_route_1.feedbackRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
    // {
    //   path: '/order',
    //   route: orderRoute,
    // },
    {
        path: '/gallery',
        route: gallery_route_1.galleryRouter,
    },
];
routeModule.forEach((route) => router.use(route.path, route === null || route === void 0 ? void 0 : route.route));
exports.default = router;
