import { z } from 'zod';
import { orderStatus } from './order.constant';

const productVariantSchema = z.object({
  name: z.string().toLowerCase().min(1, 'Variant name is required'),
  attributes: z
    .array(
      z.object({
        value: z.string().min(1, 'Attribute value is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
      }),
    )
    .min(1, 'At least one attribute is required'),
});
const deliveryAddressSchema = z.object({
  division: z.string().min(1, 'Division is required'),
  district: z.string().min(1, 'District is required'),
  sub_district: z.string().min(1, 'Sub-district is required'),
  localArea: z.string().min(1, 'Local area is required'),
});

export const createOrderSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'productId is required' }),
    orderVariant: z
      .array(productVariantSchema)
      .min(1, 'At least one product variant is required'),
    deliveryAddress: deliveryAddressSchema,
    status: z.enum(orderStatus).optional().default('PENDING'),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    productId: z.string(),
    orderVariant: z.array(productVariantSchema).optional(),
    deliveryAddress: deliveryAddressSchema.partial().optional(),
    status: z.enum(orderStatus).optional(),
  }),
});
