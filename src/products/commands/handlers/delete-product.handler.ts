import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../delete-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../products/entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProductHistoryService } from 'products/services/product-history.service';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly productHistoryService: ProductHistoryService,
  ) {}

  async execute(command: DeleteProductCommand): Promise<any> {
    const { id } = command;
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found.');
    }
    await this.productRepository.softDelete(id);
    await this.productHistoryService.recordProductHistory(product, 'DELETED');
  }
}
