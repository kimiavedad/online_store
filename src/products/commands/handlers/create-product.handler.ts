import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../products/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async execute({ createProductDto }: CreateProductCommand): Promise<any> {
    const { name, price, quantity } = createProductDto;
    const product = this.productRepository.create({ name, price, quantity });
    // TODO:  record product history
    return await this.productRepository.save(product);
  }
}
