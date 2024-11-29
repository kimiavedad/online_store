import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../delete-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../products/entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute(command: DeleteProductCommand): Promise<any> {
    const { id } = command;
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found.');
    }
    await this.productRepository.softDelete(id);
    // TODO: record history
  }
}
