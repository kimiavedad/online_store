import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductHistory } from './entities/product-history.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRespository: Repository<Product>,

    @InjectRepository(ProductHistory)
    private productHistoryRepository: Repository<ProductHistory>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRespository.create(createProductDto);
    const createdProduct = await this.productRespository.save(product);
    await this.recordProductHistory(createdProduct, 'CREATED');
    return createdProduct;
  }

  async display(id: string): Promise<Product> {
    const product = await this.productRespository.findOne({ where: { id } });
    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async purchase(
    id: string,
    purchaseProductDto: PurchaseProductDto,
  ): Promise<Product> {
    const product = await this.productRespository.findOne({ where: { id } });

    if (
      !product ||
      product.isDeleted ||
      product.quantity < purchaseProductDto.quantity
    ) {
      throw new NotFoundException(
        'Product not available or insufficient quantity',
      );
    }
    product.quantity -= purchaseProductDto.quantity;
    const updatedProduct = this.productRespository.save(product);

    await this.recordProductHistory(product, 'PURCHASED');
    return updatedProduct;
  }

  async delete(id: string) {
    const product = await this.productRespository.findOne({ where: { id } });
    if (!product || product.isDeleted) {
      throw new NotFoundException('Product not found.');
    }
    await this.productRespository.softDelete(id);
    await this.recordProductHistory(product, 'DELETED');
  }

  private async recordProductHistory(product: Product, changeReason: string) {
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
