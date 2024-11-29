import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductHistory } from '../entities/product-history.entity';
import { Product } from 'products/entities/product.entity';

@Injectable()
export class ProductHistoryService {
  constructor(
    @InjectRepository(ProductHistory)
    private readonly productHistoryRepository: Repository<ProductHistory>,
  ) {}

  async recordProductHistory(product: Product, changeReason: string) {
    const history = this.productHistoryRepository.create({
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productQuantity: product.quantity,
      productCreatedAt: product.createdAt,
      productUpdatedAt: product.updatedAt,
      productDeletedAt: product.deletedAt,
      changeReason: changeReason,
    });
    await this.productHistoryRepository.save(history);
  }
}
