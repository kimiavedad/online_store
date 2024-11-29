import { CreateProductHandler } from './create-product.handler';
import { DeleteProductHandler } from './delete-product.handler';
import { PurchaseProductHandler } from './purchase-product.handler';

export const CommandHandlers = [
  CreateProductHandler,
  DeleteProductHandler,
  PurchaseProductHandler,
];
