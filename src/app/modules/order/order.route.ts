import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { ACCESS_ROLE } from '../../interface/AccessRole';
import { orderController } from './order.controller';
import validationRequest from '../../middlewares/validationRequest';
import { createOrderSchema, updateOrderSchema } from './order.validation';

const route = Router();

route.get(
  '/all-order',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  orderController.allOrder,
);

route.get(
  '/single-order/:id',
  auth(ACCESS_ROLE.SUPER_ADMIN, ACCESS_ROLE.ADMIN),
  orderController.singleOrder,
);

route.post(
  '/create-order',
  auth(ACCESS_ROLE.SELLER),
  validationRequest(createOrderSchema),
  orderController.createOrder,
);

route.patch(
  '/update-order/:id',
  auth(ACCESS_ROLE.SELLER),
  validationRequest(updateOrderSchema),
  orderController.updateOrder,
);

route.delete(
  '/delete-order/:id',
  auth(ACCESS_ROLE.SELLER),
  orderController.deleteOrder,
);

export const orderRoute = route;
