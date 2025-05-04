import { Router } from 'express';
import { userRoute } from '../modules/user/user-route';
import { stakeholderRoute } from '../modules/stake-holder/stakeholder-route';
import { sellerRoute } from '../modules/seller/seller-route';
import { categoryRoute } from '../modules/category/category.route';
import { productVariantRoute } from '../modules/product-variant/product-variant-route';
import { ProductRoute } from '../modules/product/product.route';

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
  {
    path: '/product-variant',
    route: productVariantRoute,
  },
  {
    path: '/product',
    route: ProductRoute,
  },
];

routeModule.forEach((route) => router.use(route.path, route?.route));

export default router;
