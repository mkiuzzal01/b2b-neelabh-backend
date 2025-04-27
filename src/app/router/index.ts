import { Router } from 'express';
import { userRoute } from '../modules/user/user-route';
import { stakeholderRoute } from '../modules/stakeholder/stakeholder-route';
import { sellerRoute } from '../modules/seller/seller-route';
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
];

routeModule.forEach((route) => router.use(route.path, route?.route));

export default router;
