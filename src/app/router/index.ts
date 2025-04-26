import { Router } from 'express';
import { userRoute } from '../modules/user/user-route';
const router = Router();

const routeModule = [
  {
    path: '/user',
    route: userRoute,
  },
];

routeModule.forEach((route) => router.use(route.path, route?.route));

export default router;
