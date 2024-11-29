import { PurchaseProductDto } from '../dto/purchase-product.dto';

export class PurchaseProductCommand {
  constructor(
    public readonly id: string,
    public readonly purchaseProductDto: PurchaseProductDto,
  ) {}
}
