import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../create-product.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../../products/entities/product.entity';
import { ProductHistoryService } from 'products/services/product-history.service';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly productHistoryService: ProductHistoryService,
  ) {}

  async execute({ createProductDto }: CreateProductCommand): Promise<any> {
    const { name, price, quantity } = createProductDto;
    const product = this.productRepository.create({ name, price, quantity });
    const createdProduct = await this.productRepository.save(product);
    await this.productHistoryService.recordProductHistory(
      createdProduct,
      'CREATED',
    );
    return createdProduct;
  }
}
