import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DisplayProductQuery } from '../display-product.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(DisplayProductQuery)
export class DisplayProductHandler
  implements IQueryHandler<DisplayProductQuery>
{
  constructor(
    @InjectRepository(Product)
    private productRespository: Repository<Product>,
  ) {}

  async execute(query: DisplayProductQuery): Promise<Product> {
    const { id } = query;
    const product = await this.productRespository.findOne({ where: { id } });
    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
