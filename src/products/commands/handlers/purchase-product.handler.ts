import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseProductCommand } from '../purchase-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../products/entities/product.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@CommandHandler(PurchaseProductCommand)
export class PurchaseProductHandler
  implements ICommandHandler<PurchaseProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: PurchaseProductCommand): Promise<any> {
    const { id, purchaseProductDto } = command;
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found.');
    }
    if (product.quantity < purchaseProductDto.quantity) {
      throw new BadRequestException(
        'Insufficient quantity available for purchase',
      );
    }
    product.quantity -= purchaseProductDto.quantity;
    const updatedProduct = this.productRepository.save(product);

    // TODO: record history
    return updatedProduct;
  }
}
