export type TOrderStatus =
  | 'PENDING' // Order placed, awaiting confirmation
  | 'PROCESSING' // Order confirmed and being prepared
  | 'READY_FOR_PICKUP' // Order packed and ready for pickup by delivery partner
  | 'DISPATCHED' // Handed over to delivery partner
  | 'OUT_FOR_DELIVERY' // Currently being delivered to customer
  | 'DELIVERED' // Successfully delivered
  | 'DELIVERY_FAILED' // Delivery attempt unsuccessful
  | 'RETURN_REQUESTED' // Customer requested return
  | 'RETURNED' // Order returned and received
  | 'CANCELLED';
