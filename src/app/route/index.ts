import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import { stakeholderRoute } from '../modules/stake-holder/stakeholder.route';
import { sellerRoute } from '../modules/seller/seller.route';
import { categoryRoute } from '../modules/category/category.route';
// import { productVariantRoute } from '../modules/product-variant/product-variant.route';
import { ProductRoute } from '../modules/product/product.route';
import { noticeRouter } from '../modules/notice/notice.route';
import {
  feedbackRouter,
  requisitionRouter,
} from '../modules/requisition-feedback/requisition.route';
import { authRouter } from '../modules/auth/auth.route';
// import { orderRoute } from '../modules/order/order.route';
import { galleryRouter } from '../modules/gallery/gallery.route';

const router = Router();

const routeModule = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/stakeholder',
    route: stakeholderRoute,
  },
  {
    path: '/seller',
    route: sellerRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  // {
  //   path: '/product-variant',
  //   route: productVariantRoute,
  // },
  {
    path: '/product',
    route: ProductRoute,
  },
  {
    path: '/notice',
    route: noticeRouter,
  },
  {
    path: '/requisition',
    route: requisitionRouter,
  },
  {
    path: '/feedback',
    route: feedbackRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  // {
  //   path: '/order',
  //   route: orderRoute,
  // },
  {
    path: '/gallery',
    route: galleryRouter,
  },
];

routeModule.forEach((route) => router.use(route.path, route?.route));

export default router;
